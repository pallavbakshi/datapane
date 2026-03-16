from __future__ import annotations

from datainpane.common import DPError


def add_help_text(x: str) -> str:
    return f"{x}\nPlease run with `dip.enable_logging()`, restart your Jupyter kernel/Python instance, and/or visit https://www.github.com/pallavbakshi/datainpane"


class DPClientError(DPError):
    def __str__(self):
        # update the error message with help text
        return add_help_text(super().__str__())


class InvalidReportError(DPClientError):
    pass
