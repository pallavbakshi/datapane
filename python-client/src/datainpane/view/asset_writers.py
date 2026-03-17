"""
# TODO - optimise import handling here
# NOTE - flake8 disabled on this file, as is not a fan of multimethod overriding here
"""
from __future__ import annotations

# flake8: noqa:F811
import json
import pickle
import typing as t
from contextlib import suppress
from io import TextIOWrapper

import pandas as pd
from altair.utils import SchemaBase
from multimethod import multimethod
from pandas.io.formats.style import Styler

from datainpane import optional_libs as opt
from datainpane.client import DPClientError, log
from datainpane.common import ArrowFormat

from .xml_visitor import AssetMeta


class DPTextIOWrapper(TextIOWrapper):
    """Custom IO Wrapper that detaches before closing - see https://bugs.python.org/issue21363"""

    def __init__(self, f, *a, **kw):
        super().__init__(f, encoding="utf-8", *a, **kw)

    def __del__(self):
        # don't close the underlying stream
        with suppress(Exception):
            self.flush()
        with suppress(Exception):
            self.detach()


class AttachmentWriter:
    # pickle
    @multimethod
    def get_meta(self, x: t.Any) -> AssetMeta:
        return AssetMeta(ext=".pkl", mime="application/vnd.pickle+binary")

    @multimethod
    def get_meta(self, x: str) -> AssetMeta:
        return AssetMeta(ext=".json", mime="application/json")

    @multimethod
    def write_file(self, x: t.Any, f) -> None:
        pickle.dump(x, f)

    @multimethod
    def write_file(self, x: str, f) -> None:
        out: str = json.dumps(json.loads(x))
        f.write(out.encode())


class DataTableWriter:
    @multimethod
    def get_meta(self, x: pd.DataFrame) -> AssetMeta:
        return AssetMeta(mime=ArrowFormat.content_type, ext=ArrowFormat.ext)

    @multimethod
    def write_file(self, x: pd.DataFrame, f) -> None:
        if x.size == 0:
            raise DPClientError("Empty DataFrame provided")
        # process_df called in Arrow.save_file
        ArrowFormat.save_file(f, x)


class HTMLTableWriter:
    @multimethod
    def get_meta(self, x: pd.DataFrame | Styler) -> AssetMeta:
        return AssetMeta(mime="application/vnd.datainpane.table+html", ext=".tbl.html")

    @multimethod
    def write_file(self, x: pd.DataFrame, f) -> None:
        self._check(x)
        out = x.to_html().encode()
        f.write(out)

    @multimethod
    def write_file(self, x: Styler, f) -> None:
        self._check(x.data)
        out = x.to_html().encode()
        f.write(out)

    def _check(self, df: pd.DataFrame) -> None:
        n_cells = df.shape[0] * df.shape[1]
        if n_cells > 500:
            log.warning(
                "Table is over recommended size, consider using dp.DataTable instead or aggregating the df first"
            )


class MediaWriter:
    """Write raw media data (e.g. SVG strings) to the file store."""

    @multimethod
    def get_meta(self, x: str) -> AssetMeta:
        if x.lstrip().startswith("<svg"):
            return AssetMeta(ext=".svg", mime="image/svg+xml")
        return AssetMeta(ext=".html", mime="text/html")

    @multimethod
    def get_meta(self, x: bytes) -> AssetMeta:
        return AssetMeta(ext=".bin", mime="application/octet-stream")

    @multimethod
    def write_file(self, x: str, f) -> None:
        f.write(x.encode("utf-8"))

    @multimethod
    def write_file(self, x: bytes, f) -> None:
        f.write(x)


class PlotWriter:
    # Altair (always installed)
    @multimethod
    def get_meta(self, x: SchemaBase) -> AssetMeta:
        return AssetMeta(mime="application/vnd.vegalite.v5+json", ext=".vl.json")

    @multimethod
    def write_file(self, x: SchemaBase, f) -> None:
        json.dump(x.to_dict(), DPTextIOWrapper(f))

    if opt.HAVE_FOLIUM:

        @multimethod
        def get_meta(self, x: opt.Map) -> AssetMeta:
            return AssetMeta(mime="application/vnd.folium+html", ext=".fl.html")

        @multimethod
        def write_file(self, x: opt.Map, f) -> None:
            html: str = x.get_root().render()
            f.write(html.encode())

    if opt.HAVE_BOKEH:

        @multimethod
        def get_meta(self, x: opt.BFigure | opt.BLayout) -> AssetMeta:
            return AssetMeta(mime="application/vnd.bokeh.show+json", ext=".bokeh.json")

        @multimethod
        def write_file(self, x: opt.BFigure | opt.BLayout, f):
            from bokeh.embed import json_item

            json.dump(json_item(x), DPTextIOWrapper(f))

    if opt.HAVE_PLOTLY:

        @multimethod
        def get_meta(self, x: opt.PFigure) -> AssetMeta:
            return AssetMeta(mime="application/vnd.plotly.v1+json", ext=".pl.json")

        @multimethod
        def write_file(self, x: opt.PFigure, f):
            json.dump(x.to_json(), DPTextIOWrapper(f))

    if opt.HAVE_MATPLOTLIB:

        @multimethod
        def get_meta(self, x: opt.Axes | opt.Figure | opt.ndarray) -> AssetMeta:
            return AssetMeta(mime="image/svg+xml", ext=".svg")

        @multimethod
        def write_file(self, x: opt.Figure, f) -> None:
            # Prevent cropping on multi-axes / constrained figures
            with suppress(Exception):
                x.tight_layout()

            # Build savefig kwargs: defaults + user overrides from Plot(savefig_kw=...)
            kw: dict = dict(format="svg", bbox_inches="tight")
            scale = getattr(x, "_dp_scale", 1.0)
            if scale != 1.0:
                kw["dpi"] = int(72 * scale)
            kw.update(getattr(x, "_dp_savefig_kw", {}))

            x.savefig(DPTextIOWrapper(f), **kw)

        @multimethod
        def write_file(self, x: opt.Axes, f) -> None:
            fig = x.get_figure()
            # Propagate Plot options from Axes to Figure
            for attr in ("_dp_savefig_kw", "_dp_scale"):
                if hasattr(x, attr) and not hasattr(fig, attr):
                    setattr(fig, attr, getattr(x, attr))
            self.write_file(fig, f)

        @multimethod
        def write_file(self, x: opt.ndarray, f) -> None:
            fig = x.flatten()[0].get_figure()
            self.write_file(fig, f)
