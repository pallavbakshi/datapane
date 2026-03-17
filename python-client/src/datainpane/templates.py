"""Reusable report layout templates.

Usage::

    import datainpane as dip

    blocks = [dip.BigNumber(...), dip.Plot(...), dip.DataTable(...)]
    view = dip.templates.dashboard(blocks)
    dip.save_report(view, "dashboard.html")
"""
from __future__ import annotations

from datainpane import blocks as b
from datainpane.view import Blocks
from datainpane.ipython.templates import (
    DashboardTemplate,
    DescriptivePagesTemplate,
    TitledPagesTemplate,
)


def dashboard(blocks: list) -> Blocks:
    """Arrange blocks in a dashboard layout.

    BigNumbers are placed in a 3-column row on top,
    followed by plots in a 2-column grid and tables below.

    Example::

        view = dip.templates.dashboard([
            dip.BigNumber(heading="Users", value="10k"),
            dip.BigNumber(heading="Revenue", value="$1.2M"),
            dip.Plot(chart),
            dip.DataTable(df),
        ])
    """
    wrapped = [b.wrap_block(x) for x in blocks]
    t = DashboardTemplate(wrapped)
    t.validate()
    t.transform()
    return Blocks(*t.blocks)


def titled_pages(blocks: list) -> Blocks:
    """Split blocks into Pages whenever a ``# Heading`` is encountered.

    Text blocks starting with ``# `` begin a new page whose title
    is taken from the heading.

    Example::

        view = dip.templates.titled_pages([
            dip.Text("# Overview"),
            dip.DataTable(df),
            dip.Text("# Details"),
            dip.Plot(chart),
        ])
    """
    wrapped = [b.wrap_block(x) for x in blocks]
    t = TitledPagesTemplate(wrapped)
    t.validate()
    t.transform()
    return Blocks(*t.blocks)


def descriptive_pages(blocks: list) -> Blocks:
    """Split blocks into Pages at narrative boundaries.

    A new page starts whenever a text block is followed by a
    non-text block (plot, table, etc.).

    Example::

        view = dip.templates.descriptive_pages([
            dip.Text("Introduction text..."),
            dip.DataTable(df1),
            dip.Text("Analysis text..."),
            dip.Plot(chart),
        ])
    """
    wrapped = [b.wrap_block(x) for x in blocks]
    t = DescriptivePagesTemplate(wrapped)
    t.validate()
    t.transform()
    return Blocks(*t.blocks)
