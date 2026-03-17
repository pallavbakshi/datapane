"""Tests for Sprint 1-3 features: convenience blocks, Diff, themes, save_report options, CLI, magic."""
import os
import re

import pandas as pd
import pytest

import datainpane as dip
from datainpane.processors import ConvertXML, Pipeline, PreProcessView, ViewState
from datainpane.processors.file_store import B64FileEntry
from datainpane.processors.types import Formatting, Theme, Width, FontChoice, TextAlignment


def _to_xml(view: dip.Blocks) -> str:
    s = ViewState(blocks=view, file_entry_klass=B64FileEntry)
    state = Pipeline(s).pipe(PreProcessView()).pipe(ConvertXML()).state
    return state.view_xml


# ---- Sprint 1: Callout ----

class TestCallout:
    def test_callout_default(self):
        block = dip.Callout("Hello world")
        view = dip.Blocks(block)
        xml = _to_xml(view)
        assert "Hello world" in xml

    @pytest.mark.parametrize("callout_type", ["note", "tip", "warning", "error", "info", "success"])
    def test_callout_types(self, callout_type):
        block = dip.Callout("message", type=callout_type)
        view = dip.Blocks(block)
        xml = _to_xml(view)
        assert "message" in xml

    def test_callout_custom_title(self):
        block = dip.Callout("text", title="Custom Title")
        view = dip.Blocks(block)
        xml = _to_xml(view)
        assert "Custom Title" in xml

    def test_callout_aria_alert(self):
        block = dip.Callout("alert text", type="error")
        assert 'role="alert"' in block.content

    def test_callout_css_variables(self):
        block = dip.Callout("text", type="warning")
        assert "--dip-callout-warn-bg" in block.content

    def test_callout_escapes_html(self):
        block = dip.Callout("<script>alert('xss')</script>")
        assert "<script>" not in block.content
        assert "&lt;script&gt;" in block.content


# ---- Sprint 1: Progress ----

class TestProgress:
    def test_progress_basic(self):
        block = dip.Progress(0.5)
        view = dip.Blocks(block)
        xml = _to_xml(view)
        assert "50%" in xml

    def test_progress_with_label(self):
        block = dip.Progress(0.75, label="Completion")
        assert "Completion" in block.content

    def test_progress_clamped(self):
        block = dip.Progress(1.5)
        assert "100%" in block.content

        block2 = dip.Progress(-0.5)
        assert "0%" in block2.content

    def test_progress_custom_color(self):
        block = dip.Progress(0.5, color="#22c55e")
        assert "#22c55e" in block.content

    def test_progress_aria_attributes(self):
        block = dip.Progress(0.42, label="Training")
        content = block.content
        assert 'role="progressbar"' in content
        assert 'aria-valuenow="42"' in content
        assert 'aria-valuemin="0"' in content
        assert 'aria-valuemax="100"' in content

    def test_progress_css_variables(self):
        block = dip.Progress(0.5)
        assert "--dip-progress-bg" in block.content


# ---- Sprint 1: Charts ----

class TestCharts:
    @pytest.fixture
    def sample_df(self):
        return pd.DataFrame({"month": ["Jan", "Feb", "Mar"], "revenue": [100, 150, 200]})

    def test_bar_chart(self, sample_df):
        block = dip.BarChart(sample_df, x="month", y="revenue")
        view = dip.Blocks(block)
        xml = _to_xml(view)
        assert "vegalite" in xml.lower() or "vl.json" in xml

    def test_line_chart(self, sample_df):
        block = dip.LineChart(sample_df, x="month", y="revenue")
        view = dip.Blocks(block)
        xml = _to_xml(view)
        assert "vegalite" in xml.lower() or "vl.json" in xml

    def test_area_chart(self, sample_df):
        block = dip.AreaChart(sample_df, x="month", y="revenue")
        view = dip.Blocks(block)
        _to_xml(view)

    def test_scatter_chart(self, sample_df):
        block = dip.ScatterChart(sample_df, x="month", y="revenue")
        view = dip.Blocks(block)
        _to_xml(view)

    def test_chart_defaults_columns(self, sample_df):
        block = dip.BarChart(sample_df)
        view = dip.Blocks(block)
        _to_xml(view)

    def test_chart_with_color(self):
        df = pd.DataFrame({"x": [1, 2, 3, 1, 2, 3], "y": [1, 2, 3, 4, 5, 6], "c": ["a", "a", "a", "b", "b", "b"]})
        block = dip.BarChart(df, x="x", y="y", color="c")
        view = dip.Blocks(block)
        _to_xml(view)

    def test_chart_with_title(self, sample_df):
        block = dip.LineChart(sample_df, title="Monthly Revenue")
        view = dip.Blocks(block)
        _to_xml(view)


# ---- Sprint 1: Diff ----

class TestDiff:
    def test_diff_basic(self):
        old = pd.DataFrame({"name": ["Alice", "Bob"], "score": [85, 92]})
        new = pd.DataFrame({"name": ["Alice", "Bob"], "score": [90, 92]})
        block = dip.Diff(old, new)
        view = dip.Blocks(block)
        xml = _to_xml(view)
        assert "Alice" in xml

    def test_diff_added_row(self):
        old = pd.DataFrame({"name": ["Alice"], "score": [85]})
        new = pd.DataFrame({"name": ["Alice", "Bob"], "score": [85, 92]})
        block = dip.Diff(old, new)
        assert "Bob" in block.content
        assert "added" in block.content

    def test_diff_removed_row(self):
        old = pd.DataFrame({"name": ["Alice", "Bob"], "score": [85, 92]})
        new = pd.DataFrame({"name": ["Alice"], "score": [85]})
        block = dip.Diff(old, new)
        assert "removed" in block.content

    def test_diff_changed_value(self):
        old = pd.DataFrame({"val": [10]})
        new = pd.DataFrame({"val": [20]})
        block = dip.Diff(old, new)
        content = block.content
        assert "10" in content
        assert "20" in content

    def test_diff_aria_roles(self):
        old = pd.DataFrame({"a": [1]})
        new = pd.DataFrame({"a": [2]})
        block = dip.Diff(old, new)
        assert 'role="table"' in block.content
        assert 'role="row"' in block.content
        assert 'role="cell"' in block.content

    def test_diff_css_variables(self):
        old = pd.DataFrame({"a": [1]})
        new = pd.DataFrame({"a": [2]})
        block = dip.Diff(old, new)
        assert "--dip-diff-chg-bg" in block.content

    def test_diff_identical(self):
        df = pd.DataFrame({"a": [1, 2], "b": ["x", "y"]})
        block = dip.Diff(df, df)
        assert "changed" not in block.content
        assert "added" not in block.content
        assert "removed" not in block.content


# ---- Sprint 2: Themes ----

class TestThemes:
    def test_formatting_defaults(self):
        fmt = Formatting()
        css = fmt.to_css()
        assert "--dp-accent-color" in css
        assert "--dp-bg-color" in css

    def test_from_theme(self):
        fmt = Formatting.from_theme(Theme.DARK)
        assert fmt.bg_color == "#1a1a2e"
        assert fmt.light_prose is True

    @pytest.mark.parametrize("theme", list(Theme))
    def test_all_themes(self, theme):
        fmt = Formatting.from_theme(theme)
        css = fmt.to_css()
        assert "--dp-accent-color" in css

    def test_from_theme_with_overrides(self):
        fmt = Formatting.from_theme(Theme.OCEAN, width=Width.FULL)
        assert fmt.width == Width.FULL
        assert fmt.accent_color == "#0284c7"

    def test_custom_css(self):
        fmt = Formatting(custom_css="h1 { color: red; }")
        css = fmt.to_css()
        assert "h1 { color: red; }" in css

    def test_font_choice_enum(self):
        fmt = Formatting(font=FontChoice.MONOSPACE)
        css = fmt.to_css()
        assert "monospace" in css

    def test_font_choice_string(self):
        fmt = Formatting(font="Comic Sans MS")
        css = fmt.to_css()
        assert "Comic Sans MS" in css


# ---- Sprint 2: save_report features ----

class TestSaveReportFeatures:
    def test_save_with_toc(self, tmp_path):
        path = tmp_path / "toc.html"
        view = dip.Blocks(
            dip.Page(dip.Text("Content 1"), title="Introduction"),
            dip.Page(dip.Text("Content 2"), title="Analysis"),
        )
        dip.save_report(view, path=str(path), toc=True)
        html = path.read_text()
        assert 'id="dip-toc"' in html
        assert 'role="navigation"' in html

    def test_save_with_toc_group_labels(self, tmp_path):
        path = tmp_path / "toc_groups.html"
        view = dip.Blocks(
            dip.Group(dip.Text("A"), label="Section A"),
            dip.Group(dip.Text("B"), label="Section B"),
        )
        dip.save_report(view, path=str(path), toc=True)
        html = path.read_text()
        assert "Section A" in html
        assert "Section B" in html

    def test_save_with_header_footer(self, tmp_path):
        path = tmp_path / "branded.html"
        fmt = Formatting(
            header="<strong>ACME Corp</strong>",
            footer="Copyright 2026",
        )
        dip.save_report([dip.Text("body")], path=str(path), formatting=fmt)
        html = path.read_text()
        assert "ACME Corp" in html
        assert "Copyright 2026" in html
        assert 'role="banner"' in html
        assert 'role="contentinfo"' in html

    def test_save_with_dark_toggle(self, tmp_path):
        path = tmp_path / "dark.html"
        fmt = Formatting(dark_mode_toggle=True)
        dip.save_report([dip.Text("body")], path=str(path), formatting=fmt)
        html = path.read_text()
        assert "dip-dark-toggle" in html
        assert "dipToggleDark" in html
        assert 'aria-label="Toggle dark mode"' in html

    def test_dark_toggle_css_variables(self, tmp_path):
        path = tmp_path / "dark_vars.html"
        fmt = Formatting(dark_mode_toggle=True)
        dip.save_report([dip.Text("body")], path=str(path), formatting=fmt)
        html = path.read_text()
        # Dark toggle should define overrides for all themed components
        assert "--dip-callout-note-bg" in html
        assert "--dip-diff-add-bg" in html
        assert "--dip-progress-bg" in html

    def test_save_with_theme_formatting(self, tmp_path):
        path = tmp_path / "themed.html"
        fmt = Formatting.from_theme(Theme.NAVY_APRICOT, width=Width.FULL)
        dip.save_report([dip.Text("styled")], path=str(path), formatting=fmt)
        assert path.exists()

    def test_save_basic_still_works(self, tmp_path):
        path = tmp_path / "basic.html"
        dip.save_report([dip.Text("basic")], path=str(path))
        assert path.exists()
        html = path.read_text()
        # Should NOT have TOC, header, footer, dark toggle by default
        assert 'id="dip-toc"' not in html
        assert 'id="dip-header"' not in html
        assert 'id="dip-footer"' not in html
        assert "dip-dark-toggle" not in html

    def test_block_types_tracking(self, tmp_path):
        path = tmp_path / "tracked.html"
        df = pd.DataFrame({"a": [1, 2]})
        view = dip.Blocks(dip.Text("hello"), dip.Table(df))
        dip.save_report(view, path=str(path))
        html = path.read_text()
        assert "dpBlockTypes" in html

    def test_css_variable_defaults_present(self, tmp_path):
        path = tmp_path / "vars.html"
        dip.save_report([dip.Text("body")], path=str(path))
        html = path.read_text()
        assert "--dip-surface" in html
        assert "--dip-border" in html
        assert "--dip-callout-note-bg" in html

    def test_main_landmark(self, tmp_path):
        path = tmp_path / "main.html"
        dip.save_report([dip.Text("body")], path=str(path))
        html = path.read_text()
        assert 'role="main"' in html

    def test_build_report_with_toc(self, tmp_path):
        view = dip.Blocks(
            dip.Group(dip.Text("A"), label="Part 1"),
            dip.Group(dip.Text("B"), label="Part 2"),
        )
        dip.build_report(view, name="TocBuild", dest=str(tmp_path), toc=True, overwrite=True)
        index = tmp_path / "TocBuild" / "index.html"
        assert index.exists()
        html = index.read_text()
        assert "Part 1" in html


# ---- Sprint 3: CLI ----

class TestCLI:
    def test_cli_version(self):
        from datainpane.cli.main import main
        assert main(["--version"]) == 0

    def test_cli_no_args(self):
        from datainpane.cli.main import main
        assert main([]) == 0

    def test_cli_build_missing_file(self):
        from datainpane.cli.main import main
        assert main(["build", "nonexistent.py"]) == 1

    def test_cli_build_not_py(self, tmp_path):
        from datainpane.cli.main import main
        txt = tmp_path / "test.txt"
        txt.write_text("hello")
        assert main(["build", str(txt)]) == 1

    def test_cli_serve_missing_file(self):
        from datainpane.cli.main import main
        assert main(["serve", "nonexistent.py"]) == 1


# ---- Sprint 3: CDN cache ----

class TestCDNCache:
    def test_assets_to_inline(self):
        from datainpane.processors.cdn_cache import assets_to_inline
        assets = {
            "report/index.css": "body { color: red; }",
            "report/tailwind.css": ".flex { display: flex; }",
            "report/index.es.js": "export function mountReport() {}",
        }
        result = assets_to_inline(assets)
        assert result["inline_index_css"] == "body { color: red; }"
        assert result["inline_tailwind_css"] == ".flex { display: flex; }"
        assert len(result["inline_js_b64"]) > 0


# ---- Sprint 3: Polars support ----

class TestPolarsSupport:
    def test_polars_to_df(self):
        try:
            import polars as pl
        except ImportError:
            pytest.skip("polars not installed")

        from datainpane.common.df_processor import to_df

        pldf = pl.DataFrame({"a": [1, 2, 3], "b": ["x", "y", "z"]})
        result = to_df(pldf)
        assert isinstance(result, pd.DataFrame)
        assert list(result.columns) == ["a", "b"]
        assert len(result) == 3

    def test_polars_lazyframe(self):
        try:
            import polars as pl
        except ImportError:
            pytest.skip("polars not installed")

        from datainpane.common.df_processor import to_df

        lf = pl.LazyFrame({"x": [10, 20]})
        result = to_df(lf)
        assert isinstance(result, pd.DataFrame)
        assert len(result) == 2


# ---- Community issue fixes ----

class TestTableCellLimit:
    def test_default_limit(self):
        from datainpane.blocks.wrappers import TABLE_CELL_LIMIT
        assert TABLE_CELL_LIMIT == 250

    def test_auto_wrap_small_df(self):
        from datainpane.blocks.wrappers import convert_to_block
        df = pd.DataFrame({"a": range(10), "b": range(10)})  # 20 cells
        block = convert_to_block(df)
        assert type(block).__name__ == "Table"

    def test_auto_wrap_large_df(self):
        from datainpane.blocks.wrappers import convert_to_block
        df = pd.DataFrame({f"c{i}": range(100) for i in range(5)})  # 500 cells
        block = convert_to_block(df)
        assert type(block).__name__ == "DataTable"

    def test_custom_limit(self):
        import datainpane.blocks.wrappers as w
        old = w.TABLE_CELL_LIMIT
        try:
            w.TABLE_CELL_LIMIT = 1000
            df = pd.DataFrame({f"c{i}": range(100) for i in range(5)})  # 500 cells
            block = w.convert_to_block(df)
            assert type(block).__name__ == "Table"
        finally:
            w.TABLE_CELL_LIMIT = old


class TestPlotShowActions:
    def test_show_actions_default(self):
        import altair as alt
        df = pd.DataFrame({"x": [1, 2], "y": [3, 4]})
        chart = alt.Chart(df).mark_point().encode(x="x", y="y")
        plot = dip.Plot(chart)
        spec = plot.data.to_dict()
        assert "usermeta" not in spec

    def test_hide_actions(self):
        import altair as alt
        df = pd.DataFrame({"x": [1, 2], "y": [3, 4]})
        chart = alt.Chart(df).mark_point().encode(x="x", y="y")
        plot = dip.Plot(chart, show_actions=False)
        spec = plot.data.to_dict()
        assert spec["usermeta"]["embedOptions"]["actions"] is False

    def test_hide_actions_renders(self, tmp_path):
        import altair as alt
        df = pd.DataFrame({"x": [1, 2], "y": [3, 4]})
        chart = alt.Chart(df).mark_point().encode(x="x", y="y")
        path = tmp_path / "no_actions.html"
        dip.save_report([dip.Plot(chart, show_actions=False)], path=str(path))
        assert path.exists()


class TestSVGSupport:
    def test_media_svg_string(self):
        svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40"/></svg>'
        block = dip.Media(data=svg)
        assert block.data == svg
        assert block.file is None

    def test_media_svg_renders(self, tmp_path):
        svg = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10"/></svg>'
        path = tmp_path / "svg.html"
        dip.save_report([dip.Media(data=svg)], path=str(path))
        assert path.exists()

    def test_media_requires_file_or_data(self):
        with pytest.raises(dip.DPClientError):
            dip.Media()


class TestMultiPageExport:
    def test_save_pages(self, tmp_path):
        view = dip.Blocks(
            dip.Page(dip.Text("Page 1"), title="Intro"),
            dip.Page(dip.Text("Page 2"), title="Data"),
        )
        paths = dip.save_report_pages(view, dest=str(tmp_path), name="Report")
        assert len(paths) == 2
        assert all(os.path.exists(p) for p in paths)
        assert "Intro" in paths[0]
        assert "Data" in paths[1]

    def test_save_pages_no_pages(self, tmp_path):
        view = dip.Blocks(dip.Text("No pages here"))
        paths = dip.save_report_pages(view, dest=str(tmp_path), name="Single")
        assert len(paths) == 1
        assert "Single.html" in paths[0]


class TestTemplates:
    def test_dashboard(self):
        blocks = [
            dip.BigNumber(heading="A", value="1"),
            dip.BigNumber(heading="B", value="2"),
        ]
        view = dip.templates.dashboard(blocks)
        assert isinstance(view, dip.Blocks)

    def test_titled_pages(self):
        blocks = [
            dip.Text("# Section 1"),
            dip.Text("Content 1"),
            dip.Text("# Section 2"),
            dip.Text("Content 2"),
        ]
        view = dip.templates.titled_pages(blocks)
        assert isinstance(view, dip.Blocks)

    def test_descriptive_pages(self):
        df = pd.DataFrame({"a": [1, 2]})
        blocks = [
            dip.Text("Intro"),
            dip.Table(df),
            dip.Text("Analysis"),
            dip.Table(df),
        ]
        view = dip.templates.descriptive_pages(blocks)
        assert isinstance(view, dip.Blocks)

    def test_titled_pages_renders(self, tmp_path):
        blocks = [
            dip.Text("# Overview"),
            dip.Text("Content"),
            dip.Text("# Details"),
            dip.Text("More content"),
        ]
        view = dip.templates.titled_pages(blocks)
        path = tmp_path / "titled.html"
        dip.save_report(view, path=str(path))
        assert path.exists()

    def test_dashboard_renders(self, tmp_path):
        blocks = [
            dip.BigNumber(heading="Users", value="10k"),
            dip.BigNumber(heading="Revenue", value="$1M"),
        ]
        view = dip.templates.dashboard(blocks)
        path = tmp_path / "dashboard.html"
        dip.save_report(view, path=str(path))
        assert path.exists()


class TestMatplotlibCropping:
    def test_tight_layout_applied(self, tmp_path):
        import matplotlib.pyplot as plt

        fig, axes = plt.subplots(2, 2, figsize=(10, 8))
        for ax in axes.flat:
            ax.plot([1, 2, 3], [1, 4, 9])
            ax.set_title("Subplot")
            ax.set_xlabel("X label")
            ax.set_ylabel("Y label")

        path = tmp_path / "mpl.html"
        dip.save_report([dip.Plot(fig)], path=str(path))
        assert path.exists()
        assert path.stat().st_size > 100
        plt.close(fig)

    def test_scale_sets_dpi(self, tmp_path):
        import matplotlib.pyplot as plt

        fig, ax = plt.subplots()
        ax.plot([1, 2, 3], [1, 2, 3])

        path = tmp_path / "mpl_hires.html"
        dip.save_report([dip.Plot(fig, scale=2.0)], path=str(path))
        assert path.exists()
        plt.close(fig)

    def test_savefig_kw(self, tmp_path):
        import matplotlib.pyplot as plt

        fig, ax = plt.subplots()
        ax.plot([1, 2, 3], [1, 2, 3])

        path = tmp_path / "mpl_custom.html"
        dip.save_report(
            [dip.Plot(fig, savefig_kw={"dpi": 150, "pad_inches": 0.5})],
            path=str(path),
        )
        assert path.exists()
        plt.close(fig)

    def test_axes_object(self, tmp_path):
        import matplotlib.pyplot as plt

        fig, ax = plt.subplots()
        ax.bar(["A", "B", "C"], [10, 20, 15])

        path = tmp_path / "mpl_axes.html"
        dip.save_report([dip.Plot(ax)], path=str(path))
        assert path.exists()
        plt.close(fig)
