"""Tests for the API that can run locally (due to design or mocked out)"""
import os
import typing as t
from pathlib import Path

import pandas as pd
import pytest
from dominate.tags import h2
from glom import glom
from lxml.etree import DocumentInvalid

import datainpane as dip
from datainpane.blocks import BaseBlock
from datainpane.builtins import gen_df, gen_plot
from datainpane.client.exceptions import DPClientError
from datainpane.common.viewxml_utils import load_doc, validate_view_doc
from datainpane.processors import ConvertXML, Pipeline, PreProcessView, ViewState
from datainpane.processors.file_store import B64FileEntry
from datainpane.processors.types import mk_null_pipe

################################################################################
# Helpers
md_block_id = dip.Text(text="# Test markdown block <hello/> \n Test **content**", name="test-id-1")
md_block = dip.Text(text="# Test markdown block <hello/> \n Test **content**")
str_md_block = "Simple string Markdown"


def element_to_str(e: BaseBlock) -> str:
    # NOTE - this validates as well
    return mk_null_pipe(dip.Blocks(e)).pipe(ConvertXML(pretty_print=True)).state.view_xml


def num_blocks(view_str: str) -> int:
    x = "count(/View//*)"
    return int(load_doc(view_str).xpath(x))


def _view_to_xml_and_files(app_or_view: t.Union[dip.Blocks, dip.App]) -> ViewState:
    """Create a viewstate resulting from converting the View to XML & in-mem B64 files"""
    s = ViewState(blocks=app_or_view, file_entry_klass=B64FileEntry)
    return Pipeline(s).pipe(PreProcessView()).pipe(ConvertXML()).state


def assert_view(
    view: t.Union[dip.App, dip.Blocks], expected_attachments: int = None, expected_num_blocks: int = None
) -> t.Tuple[str, t.List[t.BinaryIO]]:
    state = _view_to_xml_and_files(view)
    view_xml = state.view_xml
    attachments = state.store.file_list
    if expected_attachments:
        assert len(attachments) == expected_attachments
    if expected_num_blocks:
        assert num_blocks(view_xml) == expected_num_blocks
    assert validate_view_doc(xml_str=view_xml)
    return (view_xml, attachments)


################################################################################
# Generators
def gen_view_simple() -> dip.Blocks:
    return dip.Blocks(
        blocks=[
            md_block_id,
            str_md_block,
        ]
    )


def gen_view_complex_no_files() -> dip.Blocks:
    """Generate a complex layout view with simple elements"""
    select = dip.Select(blocks=[md_block, md_block], type=dip.SelectType.TABS)
    group = dip.Group(md_block, md_block, columns=2)
    toggle = dip.Toggle(md_block, md_block)

    return dip.Blocks(
        dip.Page(
            blocks=[
                dip.Group(md_block, md_block, columns=2),
                dip.Select(blocks=[md_block, group, toggle], type=dip.SelectType.DROPDOWN),
            ],
            title="Page Uno",
        ),
        dip.Page(
            blocks=[
                dip.Group(select, select, toggle, columns=2),
                dip.Select(blocks=[md_block, md_block, md_block], type=dip.SelectType.TABS),
            ],
            title="Page Duo",
        ),
        dip.Page(
            blocks=[
                dip.Group(group, group, columns=2),
                dip.Select(blocks=[select, select], type=dip.SelectType.TABS),
            ],
            title="Page Tres",
        ),
    )


def gen_view_complex_with_files(datadir: Path, single_file: bool = False, local_report: bool = False) -> dip.Blocks:
    # Asset tests
    lis = [1, 2, 3]
    small_df = gen_df()
    big_df = gen_df(10000)

    # text
    # md_block
    html_block = dip.HTML(html="<h1>Hello World</h1>")
    html_block_1 = dip.HTML(html=h2("Hello World"))
    code_block = dip.Code(code="print('hello')", language="python")
    formula_block = dip.Formula(formula=r"\frac{1}{\sqrt{x^2 + 1}}")
    big_number = dip.BigNumber(heading="Tests written", value=1234)
    big_number_1 = dip.BigNumber(heading="Real Tests written :)", value=11, change=2, is_upward_change=True)
    embed_block = dip.Embed(url="https://www.youtube.com/watch?v=JDe14ulcfLA")
    divider_block = dip.Text("---")
    empty_block = dip.Empty(name="empty-block")

    # assets
    plot_asset = dip.Plot(data=gen_plot(), caption="Plot Asset")
    list_asset = dip.Attachment(data=lis, filename="List Asset")
    img_asset = dip.Media(file=datadir / "datainpane-icon-192x192.png")

    # tables
    table_asset = dip.Table(data=small_df, caption="Test Basic Table")
    # local reports don't support DataTable
    dt_asset = (
        table_asset if local_report else dip.DataTable(df=big_df, name="big-table-block", caption="Test DataTable")
    )

    if single_file:
        return dip.Blocks(dip.Group(blocks=[md_block, dt_asset]))
    else:
        return dip.Blocks(
            dip.Page(
                dip.Select(
                    md_block, html_block, html_block_1, code_block, formula_block, embed_block, type=dip.SelectType.TABS
                ),
                dip.Group(big_number, big_number_1, columns=2),
                dip.Toggle(md_block, html_block, label="Test Toggle"),
            ),
            dip.Page(
                plot_asset,
                divider_block,
                empty_block,
                list_asset,
                img_asset,
                table_asset,
                dt_asset,
                dip.Empty("empty"),
            ),
        )


################################################################################
# View Tests
def test_gen_view_single():
    # view with single block
    view = dip.Blocks("test block")
    assert_view(view, 0)
    assert len(view.blocks) == 1
    assert isinstance(view.blocks[0], dip.Text)


def test_gen_view_simple():
    view = gen_view_simple()
    assert_view(view, 0, 2)
    # TODO - replace accessors here with glom / boltons / toolz
    assert len(view.blocks) == 2
    assert isinstance(view.blocks[1], dip.Text)
    assert view.blocks[0].name == "test-id-1"


def test_gen_view_nested_mixed():
    view = dip.Blocks(
        dip.Group(
            md_block_id,
            str_md_block,
        ),
        "Simple string Markdown #2",
    )

    assert_view(view, 0, 4)
    assert len(glom(view, "blocks")) == 2
    assert isinstance(glom(view, "blocks.0"), dip.Group)
    assert isinstance(view.blocks[0], dip.Group)
    assert isinstance(view.blocks[1], dip.Text)
    assert glom(view, "blocks.0.blocks.0.name") == "test-id-1"


def test_gen_view_primitives(datadir: Path):
    # check we don't allow arbitary python primitives - must be pickled directly via dip.Attachment
    with pytest.raises(DPClientError):
        _ = dip.Blocks([1, 2, 3]).get_dom()

    view = dip.Blocks(
        "Simple string Markdown #2",  # Markdown
        gen_df(),  # Table
        gen_plot(),  # Plot
        datadir / "datainpane-icon-192x192.png",  # Attachment
    )
    assert_view(view, 3)
    assert glom(view, ("blocks", ["_tag"])) == ["Text", "Table", "Plot", "Attachment"]


def test_gen_failing_views():
    # nested pages
    with pytest.raises(DPClientError):
        v = dip.Blocks(dip.Page(dip.Page(md_block)))
        _view_to_xml_and_files(v)
    # we only transform top-level pages
    with pytest.raises(DocumentInvalid):
        v = dip.Blocks(dip.Group(dip.Page(md_block)))
        _view_to_xml_and_files(v)

    # page/pages with 0 objects
    with pytest.raises(DPClientError):
        v = dip.Blocks(dip.Page(blocks=[]))
        _view_to_xml_and_files(v)

    # select with 1 object
    with pytest.raises(DPClientError):
        v = dip.Blocks(dip.Page(dip.Select(blocks=[md_block])))
        _view_to_xml_and_files(v)

    # empty text block
    with pytest.raises(AssertionError):
        v = dip.Blocks(dip.Text(" "))
        _view_to_xml_and_files(v)

    # empty df
    with pytest.raises(DPClientError):
        v = dip.Blocks(dip.DataTable(pd.DataFrame()))
        _view_to_xml_and_files(v)

    # invalid names
    with pytest.raises(DocumentInvalid):
        v = dip.Blocks(dip.Text("a", name="my-name"), dip.Text("a", name="my-name"))
        _view_to_xml_and_files(v)

    with pytest.raises(DPClientError):
        dip.Blocks(dip.Text("a", name="3-invalid-name"))


def test_gen_view_nested_blocks():
    s = "# Test markdown block <hello/> \n Test **content**"
    view = dip.Blocks(
        blocks=[
            dip.Group(dip.Text(s, name="test-id-1"), "Simple string Markdown", label="test-group-label"),
            dip.Select(
                blocks=[
                    dip.Text(s, name="test-id-2", label="test-block-label"),
                    "Simple string Markdown",
                ],
                label="test-select-label",
            ),
            dip.Toggle(
                blocks=[
                    dip.Text(s, name="test-id-3"),
                    "Simple string Markdown",
                ],
                label="test-toggle-label",
            ),
        ]
    )

    # No additional wrapper block
    assert len(view.blocks) == 3
    assert isinstance(view.blocks[0], dip.Group)
    assert isinstance(view.blocks[1], dip.Select)
    assert isinstance(view.blocks[2], dip.Toggle)
    assert isinstance(view.blocks[1].blocks[1], dip.Text)
    assert glom(view, ("blocks", ["_attributes.label"])) == [
        "test-group-label",
        "test-select-label",
        "test-toggle-label",
    ]
    assert glom(view, "blocks.0.blocks.0.name") == "test-id-1"
    assert glom(view, "blocks.1.blocks.0._attributes.label") == "test-block-label"
    assert_view(view, 0)


def test_gen_view_complex_no_files():
    view = gen_view_complex_no_files()
    assert_view(view, 0)
    assert len(view.blocks) == 3


def test_gen_view_with_files(datadir: Path):
    view = gen_view_complex_with_files(datadir)
    assert_view(view, 5, 25)


################################################################################
# Local saving
@pytest.mark.skipif("CI" in os.environ, reason="Currently depends on building fe-components first")
def test_save_report_simple(datadir: Path, monkeypatch):  # noqa: ANN
    monkeypatch.chdir(datadir)
    view = gen_view_simple()
    dip.save_report(view, path="test_out.html", name="My Test Report")


@pytest.mark.skipif("CI" in os.environ, reason="Currently depends on building fe-components first")
def test_save_report_with_files(datadir: Path, monkeypatch):  # noqa: ANN
    monkeypatch.chdir(datadir)
    view = gen_view_complex_with_files(datadir, local_report=True)
    dip.save_report(view, path="test_out.html", name="Even better report")
