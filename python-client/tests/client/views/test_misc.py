"""Tests for the API that can run locally (due to design or mocked out)"""
from pathlib import Path

import pytest
from glom import glom

import datainpane as dip
from datainpane.builtins import gen_df, gen_plot


def test_markdown_format(datadir: Path):
    text = """
# My wicked markdown

{{plot}}

As above we do ...

{{select}}

Here's the dataset used...

{{}}
"""

    table_asset = gen_df()
    plot_asset = dip.Plot(data=gen_plot(), caption="Plot Asset")
    select_asset = dip.Select(dip.Text("Hello"), "World")

    # missing context
    with pytest.raises(dip.DPClientError):
        dip.Text(text).format(table_asset, plot=plot_asset, select1=select_asset)
    with pytest.raises(dip.DPClientError):
        dip.Text(text).format(plot=plot_asset, select=select_asset)

    # test string
    group = dip.Text(text).format(table_asset, plot=plot_asset, select=select_asset)
    assert isinstance(group, dip.Group)
    assert glom(group, ("blocks", ["_tag"])) == ["Text", "Plot", "Text", "Select", "Text", "Table"]

    # test file
    group = dip.Text(file=datadir / "report.md").format(table_asset, plot=plot_asset, select=select_asset)
    assert isinstance(group, dip.Group)
    assert glom(group, ("blocks", ["_tag"])) == ["Text", "Plot", "Text", "Select", "Text", "Table"]
    assert "file-input" in dip.Blocks(group).get_dom_str()
    assert "file-input" in glom(group, "blocks.0.content")
