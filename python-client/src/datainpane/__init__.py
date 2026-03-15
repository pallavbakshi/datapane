# Copyright 2020 StackHut Limited (trading as Data In Pane)
# SPDX-License-Identifier: Apache-2.0
__version__ = "0.17.0"


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
    Attachment,
    BigNumber,
    Block,
    Code,
    DataTable,
    Embed,
    Empty,
    Formula,
    Group,
    Media,
    Page,
    Plot,
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
    Width,
    build_report,
    save_report,
    stringify_report,
)
from .view import App, Blocks, Report, View

# Other useful re-exports
# ruff: noqa: I001
from . import builtins  # isort:skip  otherwise circular import issue

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
    "DataTable",
    "Media",
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
    "build_report",
    "stringify_report",
    "X",
    "Page",
    "View",
    "Width",
    "FontChoice",
    "Formatting",
    "TextAlignment",
]


set_dp_mode(DPMode.LIBRARY)

# TODO - do we want to init only in jupyter / interactive / etc.
# only init fully in library-mode, as framework and app init explicitly
if get_dp_mode() == DPMode.LIBRARY and not IN_PYTEST:
    from .client.config import init

    init()
