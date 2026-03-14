from __future__ import annotations

import logging
import typing as t
from collections.abc import Mapping
from datetime import timedelta
from os import PathLike
from pathlib import Path

# Typedefs
# A JSON-serialisable config object
SDict = dict[str, t.Any]
SSDict = dict[str, str]
SList = list[str]
# NOTE - mypy cannot handle recursive types like this currently. Will review in the future
JSON = str | int | float | bool | None | Mapping[str, "JSON"] | list["JSON"]  # type: ignore
JDict = SDict  # should be JSON
JList = list[JSON]  # type: ignore
MIME = t.NewType("MIME", str)
URL = t.NewType("URL", str)
HTML = t.NewType("HTML", str)
NPath = Path | PathLike | str
Hash = t.NewType("Hash", str)
EnumType = int  # alias for enum values

# Constants
# NOTE - PKL_MIMETYPE and ARROW_MIMETYPE are custom mimetypes
PKL_MIMETYPE = MIME("application/vnd.pickle+binary")
ARROW_MIMETYPE = MIME("application/vnd.apache.arrow+binary")
ARROW_EXT = ".arrow"
TD_1_HOUR = timedelta(hours=1)
TD_1_DAY = timedelta(days=1)
SECS_1_HOUR: int = int(TD_1_HOUR.total_seconds())
SECS_1_WEEK: int = int(timedelta(weeks=1).total_seconds())
SIZE_1_MB: int = 1024 * 1024


# Errors
class DPError(Exception):
    """Base DP Error"""

    pass


log = logging.getLogger("datainpane")
