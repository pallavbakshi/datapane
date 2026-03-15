from __future__ import annotations

import logging
import typing as t
from os import PathLike
from pathlib import Path

# Typedefs
SSDict = dict[str, str]
MIME = t.NewType("MIME", str)
HTML = t.NewType("HTML", str)
NPath = Path | PathLike | str

# Constants
ARROW_MIMETYPE = MIME("application/vnd.apache.arrow+binary")
ARROW_EXT = ".arrow"


# Errors
class DPError(Exception):
    """Base DP Error"""

    pass


log = logging.getLogger("datainpane")
