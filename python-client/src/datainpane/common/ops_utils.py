from __future__ import annotations

import datetime


def timestamp(x: datetime.datetime | None = None) -> str:
    """Return ISO timestamp for a datetime"""
    x = x or datetime.datetime.now(datetime.UTC)
    return f'{x.isoformat(timespec="seconds")}{"" if x.tzinfo else "Z"}'
