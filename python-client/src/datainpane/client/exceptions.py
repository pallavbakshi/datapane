from __future__ import annotations

from datainpane.common import DPError


def add_help_text(x: str) -> str:
    return f"{x}\nPlease run with `dip.enable_logging()`, restart your Jupyter kernel/Python instance, and/or visit https://www.github.com/datainpane/datainpane"


class DPClientError(DPError):
    def __str__(self):
        # update the error message with help text
        return add_help_text(super().__str__())


class IncompatibleVersionError(DPClientError):
    pass


class UnsupportedResourceError(DPClientError):
    pass


class ReportTooLargeError(DPClientError):
    pass


class InvalidTokenError(DPClientError):
    pass


class UnsupportedFeatureError(DPClientError):
    pass


class InvalidReportError(DPClientError):
    pass


class ViewError(DPClientError):
    pass


class MissingCloudPackagesError(DPClientError):
    def __init__(self, *a, **kw):
        # quick hack until we setup a conda meta-package for cloud
        self.args = (
            "Cloud packages not found, please run `pip install datainpane[cloud]` or `conda install -c conda-forge nbconvert flit-core`",
        )
