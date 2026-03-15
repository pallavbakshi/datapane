"""
Shared code used by client and dp-server
NOTE - this module should not depend on any client or server specific code and is imported first
"""
# Copyright 2020 StackHut Limited (trading as Datapane)
# SPDX-License-Identifier: Apache-2.0
# flake8: noqa:F401
from .datafiles import ArrowFormat
from .dp_types import (
    HTML,
    DPError,
    NPath,
    SSDict,
)
from .ops_utils import timestamp
from .utils import guess_type, utf_read_text
from .viewxml_utils import ViewXML, validate_view_doc
