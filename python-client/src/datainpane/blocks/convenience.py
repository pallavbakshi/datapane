"""Convenience blocks: Callout, Progress, BarChart, LineChart, AreaChart, ScatterChart."""
from __future__ import annotations

import typing as t

import pandas as pd

from .base import BlockId
from .text import HTML, EmbeddedTextBlock


# ---------------------------------------------------------------------------
# Callout / Alert
# ---------------------------------------------------------------------------

_CALLOUT_STYLES = {
    "note":    {"icon": "&#x1F4DD;",          "var": "note"},
    "tip":     {"icon": "&#x1F4A1;",          "var": "tip"},
    "warning": {"icon": "&#x26A0;&#xFE0F;",   "var": "warn"},
    "error":   {"icon": "&#x274C;",            "var": "err"},
    "info":    {"icon": "&#x2139;&#xFE0F;",    "var": "note"},
    "success": {"icon": "&#x2705;",            "var": "tip"},
}


def Callout(
    text: str,
    type: str = "note",
    title: str | None = None,
    name: BlockId = None,
    label: str = None,
) -> HTML:
    """A styled callout / alert box.

    Args:
        text: The message text (supports basic HTML)
        type: One of "note", "tip", "warning", "error", "info", "success"
        title: Optional title (defaults to the type name capitalized)
        name: A unique name for the block (optional)
        label: A label used when displaying the block (optional)

    Example::

        dip.Callout("Remember to validate your data!", type="warning")
        dip.Callout("Pipeline completed.", type="success", title="Done")
    """
    import html as html_mod

    style = _CALLOUT_STYLES.get(type, _CALLOUT_STYLES["note"])
    title = title or type.capitalize()
    v = style["var"]

    html_str = f"""<div role="alert" aria-label="{html_mod.escape(title)}" style="
        background:var(--dip-callout-{v}-bg);
        border-left:4px solid var(--dip-callout-{v}-border);
        border-radius:6px;
        padding:14px 18px;
        margin:8px 0;
        color:var(--dip-callout-{v}-text);
        font-size:14px;
        line-height:1.6;
    ">
        <div style="font-weight:600;margin-bottom:4px">
            {style['icon']} {html_mod.escape(title)}
        </div>
        <div>{html_mod.escape(text)}</div>
    </div>"""

    return HTML(html_str, name=name, label=label)


# ---------------------------------------------------------------------------
# Progress Bar
# ---------------------------------------------------------------------------

def Progress(
    value: float,
    label: str | None = None,
    color: str = "#FB923C",
    name: BlockId = None,
) -> HTML:
    """A visual progress bar.

    Args:
        value: Progress value between 0.0 and 1.0
        label: Optional label text
        color: Bar color (default: apricot)
        name: A unique name for the block (optional)

    Example::

        dip.Progress(0.75, label="Completion")
        dip.Progress(0.42, label="Training", color="#22c55e")
    """
    pct = max(0.0, min(1.0, value)) * 100
    pct_text = f"{pct:.0f}%"
    aria_label = f"{label}: {pct_text}" if label else pct_text
    label_html = f'<div style="font-size:13px;font-weight:500;margin-bottom:6px;color:var(--dip-progress-label)">{label}</div>' if label else ""

    html_str = f"""{label_html}<div role="progressbar" aria-valuenow="{pct:.0f}"
        aria-valuemin="0" aria-valuemax="100" aria-label="{aria_label}" style="
        background:var(--dip-progress-bg);
        border-radius:8px;
        overflow:hidden;
        height:24px;
        position:relative;
    ">
        <div style="
            background:{color};
            width:{pct}%;
            height:100%;
            border-radius:8px;
            transition:width 0.3s;
            display:flex;
            align-items:center;
            justify-content:flex-end;
            padding-right:8px;
        ">
            <span style="font-size:11px;font-weight:600;color:{'#fff' if pct > 15 else 'var(--dip-progress-label)'}">{pct_text}</span>
        </div>
    </div>"""

    return HTML(html_str, name=name)


# ---------------------------------------------------------------------------
# Simple Charts (thin wrappers around Altair)
# ---------------------------------------------------------------------------

def _make_chart(
    df: pd.DataFrame,
    mark: str,
    x: str | None,
    y: str | None,
    color: str | None,
    title: str | None,
    chart_color: str,
    name: BlockId,
    label: str | None,
):
    """Internal helper to create a Plot block from a DataFrame."""
    import altair as alt

    from .asset import Plot

    cols = df.columns.tolist()
    x = x or cols[0]
    y = y or (cols[1] if len(cols) > 1 else cols[0])

    base = alt.Chart(df)
    if mark == "bar":
        chart = base.mark_bar(color=chart_color)
    elif mark == "line":
        chart = base.mark_line(point=True, color=chart_color)
    elif mark == "area":
        chart = base.mark_area(color=chart_color, opacity=0.5).mark_area(
            line={"color": chart_color}, color=chart_color, opacity=0.4
        )
    elif mark == "point":
        chart = base.mark_circle(color=chart_color, size=60)
    else:
        chart = base.mark_bar(color=chart_color)

    chart = chart.encode(x=x, y=y)

    if color:
        chart = chart.encode(color=color)

    if title:
        chart = chart.properties(title=title)

    return Plot(chart, name=name, label=label)


def BarChart(
    df: pd.DataFrame,
    x: str | None = None,
    y: str | None = None,
    color: str | None = None,
    title: str | None = None,
    bar_color: str = "#FB923C",
    name: BlockId = None,
    label: str = None,
):
    """Quick bar chart from a DataFrame.

    Args:
        df: DataFrame with the data
        x: Column name for x-axis (default: first column)
        y: Column name for y-axis (default: second column)
        color: Column name for color encoding (optional)
        title: Chart title (optional)
        bar_color: Color of the bars (default: apricot)
        name: A unique name for the block (optional)
        label: A label used when displaying the block (optional)

    Example::

        dip.BarChart(df, x="month", y="revenue")
    """
    return _make_chart(df, "bar", x, y, color, title, bar_color, name, label)


def LineChart(
    df: pd.DataFrame,
    x: str | None = None,
    y: str | None = None,
    color: str | None = None,
    title: str | None = None,
    line_color: str = "#1E293B",
    name: BlockId = None,
    label: str = None,
):
    """Quick line chart from a DataFrame.

    Args:
        df: DataFrame with the data
        x: Column name for x-axis (default: first column)
        y: Column name for y-axis (default: second column)
        color: Column name for color encoding (optional)
        title: Chart title (optional)
        line_color: Color of the line (default: navy)
        name: A unique name for the block (optional)
        label: A label used when displaying the block (optional)

    Example::

        dip.LineChart(df, x="date", y="temperature")
    """
    return _make_chart(df, "line", x, y, color, title, line_color, name, label)


def AreaChart(
    df: pd.DataFrame,
    x: str | None = None,
    y: str | None = None,
    color: str | None = None,
    title: str | None = None,
    area_color: str = "#3b82f6",
    name: BlockId = None,
    label: str = None,
):
    """Quick area chart from a DataFrame.

    Example::

        dip.AreaChart(df, x="month", y="revenue")
    """
    return _make_chart(df, "area", x, y, color, title, area_color, name, label)


def ScatterChart(
    df: pd.DataFrame,
    x: str | None = None,
    y: str | None = None,
    color: str | None = None,
    title: str | None = None,
    point_color: str = "#FB923C",
    name: BlockId = None,
    label: str = None,
):
    """Quick scatter chart from a DataFrame.

    Example::

        dip.ScatterChart(df, x="height", y="weight", color="species")
    """
    return _make_chart(df, "point", x, y, color, title, point_color, name, label)
