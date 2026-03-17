# Copyright 2020 StackHut Limited (trading as Data In Pane)
# SPDX-License-Identifier: Apache-2.0
__version__ = "0.18.0"


# Public API re-exports
from .client import (  # isort:skip  otherwise circular import issue
    IN_PYTEST,
    DPClientError,
    DPMode,
    enable_logging,
    print_debug_info,
    get_dp_mode,
    set_dp_mode,
)  # isort:skip  otherwise circular import issue

from .blocks import (
    HTML,
    AreaChart,
    Attachment,
    BarChart,
    BigNumber,
    Block,
    Callout,
    Code,
    DataTable,
    Diff,
    Embed,
    Empty,
    Formula,
    Group,
    LineChart,
    Media,
    Page,
    Plot,
    Progress,
    ScatterChart,
    Select,
    SelectType,
    Table,
    Text,
    Toggle,
    VAlign,
    wrap_block,
)
from .processors import (
    FontChoice,
    Formatting,
    TextAlignment,
    Theme,
    Width,
    build_report,
    save_pdf,
    save_report,
    save_report_pages,
    stringify_report,
)
from .view import App, Blocks, Report, View

# Other useful re-exports
# ruff: noqa: I001
from . import builtins  # isort:skip  otherwise circular import issue
from . import templates  # isort:skip

X = wrap_block

__all__ = [
    "App",
    "Report",
    "DPClientError",
    "builtins",
    "enable_logging",
    "print_debug_info",
    "Block",
    "Attachment",
    "BigNumber",
    "Empty",
    "AreaChart",
    "BarChart",
    "Callout",
    "DataTable",
    "Diff",
    "LineChart",
    "Media",
    "Progress",
    "ScatterChart",
    "Plot",
    "Table",
    "Select",
    "SelectType",
    "Formula",
    "HTML",
    "Code",
    "Embed",
    "Group",
    "Text",
    "Toggle",
    "VAlign",
    "Blocks",
    "save_report",
    "save_report_pages",
    "save_pdf",
    "build_report",
    "stringify_report",
    "X",
    "Page",
    "View",
    "Width",
    "FontChoice",
    "Formatting",
    "TextAlignment",
    "Theme",
]


set_dp_mode(DPMode.LIBRARY)

# TODO - do we want to init only in jupyter / interactive / etc.
# only init fully in library-mode, as framework and app init explicitly
if get_dp_mode() == DPMode.LIBRARY and not IN_PYTEST:
    from .client.config import init

    init()


def load_ipython_extension(ipython):
    """Enable %%dip cell magic via %load_ext datainpane"""
    from .ipython.magic import load_ipython_extension as _load
    _load(ipython)
