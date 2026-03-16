"""
Data In Pane Processors

API for processing Views, e.g. rendering it locally and publishing to a remote server
"""
from __future__ import annotations


import os
from pathlib import Path
from shutil import rmtree

from datainpane.client import DPClientError
from datainpane.common import NPath
from datainpane.view import Blocks, BlocksT

from .file_store import B64FileEntry, GzipTmpFileEntry
from .processors import (
    ConvertXML,
    ExportHTMLFileAssets,
    ExportHTMLInlineAssets,
    ExportHTMLStringInlineAssets,
    PreProcessView,
)
from .types import Formatting, Pipeline, ViewState

__all__ = ["save_report", "save_pdf", "build_report", "stringify_report"]


################################################################################
# exported public API
def build_report(
    blocks: BlocksT,
    name: str = "Report",
    dest: NPath | None = None,
    formatting: Formatting | None = None,
    overwrite: bool = False,
) -> None:
    """Build an (static) app with a directory structure, which can be served by a local http server

    !!! note
        This outputs compressed assets into the dir as well, may be an issue if self-hosting

    Args:
        blocks: The `Blocks` object or a list of Blocks
        name: The name of the app directory to be created
        dest: File path to store the app directory
        formatting: Sets the basic app styling
        overwrite: Replace existing app with the same name and destination if already exists (default: False)
    """
    # TODO(product) - unknown if we should keep this...

    # build the dest dir
    app_dir: Path = Path(dest or os.getcwd()) / name
    app_exists = app_dir.is_dir()

    if app_exists and overwrite:
        rmtree(app_dir)
    elif app_exists and not overwrite:
        raise DPClientError(f"Report exists at given path {str(app_dir)} -- set `overwrite=True` to allow overwrite")

    assets_dir = app_dir / "assets"
    assets_dir.mkdir(parents=True)

    # write the app html and assets
    s = ViewState(blocks=Blocks.wrap_blocks(blocks), file_entry_klass=GzipTmpFileEntry, dir_path=assets_dir)
    _: str = (
        Pipeline(s)
        .pipe(PreProcessView(is_finalised=True))
        .pipe(ConvertXML())
        .pipe(ExportHTMLFileAssets(app_dir=app_dir, name=name, formatting=formatting))
        .result
    )


def save_report(
    blocks: BlocksT,
    path: str,
    open: bool = False,
    name: str = "Report",
    formatting: Formatting | None = None,
) -> None:
    """Save the app document to a local HTML file

    Args:
        blocks: The `Blocks` object or a list of Blocks
        path: File path to store the document
        open: Open in your browser after creating (default: False)
        name: Name of the document (optional: uses path if not provided)
        formatting: Sets the basic app styling
    """

    s = ViewState(blocks=Blocks.wrap_blocks(blocks), file_entry_klass=B64FileEntry)
    _: str = (
        Pipeline(s)
        .pipe(PreProcessView(is_finalised=True))
        .pipe(ConvertXML())
        .pipe(ExportHTMLInlineAssets(path=path, open=open, name=name, formatting=formatting))
        .result
    )


def save_pdf(
    blocks: BlocksT,
    path: str,
    name: str = "Report",
    formatting: Formatting | None = None,
    wait_for_js: bool = True,
    page_width: str = "210mm",
    page_height: str = "297mm",
) -> None:
    """Save the report as a PDF file.

    Requires the ``pdf`` extra: ``uv add datainpane[pdf]`` (or ``pip install datainpane[pdf]``)
    and a one-time browser install: ``playwright install chromium``

    Args:
        blocks: The ``Blocks`` object or a list of Blocks
        path: File path to store the PDF
        name: Name of the document
        formatting: Sets the basic styling
        wait_for_js: Wait for JS to finish rendering (plots, tables). Default True.
        page_width: PDF page width (default: A4, "210mm")
        page_height: PDF page height (default: A4, "297mm")
    """
    import tempfile

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        raise DPClientError(
            "PDF export requires the 'pdf' extra.\n"
            "Install it with: uv add datainpane[pdf]  (or pip install datainpane[pdf])\n"
            "Then run: playwright install chromium"
        )

    import threading
    from functools import partial
    from http.server import HTTPServer, SimpleHTTPRequestHandler

    # Build the HTML report into a temp dir, then serve it via a local HTTP
    # server so the browser can load the CDN JS/CSS assets over the network.
    with tempfile.TemporaryDirectory() as tmp_dir:
        tmp_html = Path(tmp_dir) / "report.html"
        save_report(blocks, path=str(tmp_html), name=name, formatting=formatting)

        # Serve from the temp dir
        handler = partial(SimpleHTTPRequestHandler, directory=tmp_dir)
        server = HTTPServer(("127.0.0.1", 0), handler)
        port = server.server_address[1]
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()

        try:
            with sync_playwright() as p:
                browser = p.chromium.launch()
                page = browser.new_page()

                # Navigate via HTTP so the browser can also fetch CDN resources
                page.goto(
                    f"http://127.0.0.1:{port}/report.html",
                    wait_until="networkidle",
                    timeout=30000,
                )

                if wait_for_js:
                    # Wait for Vue mount + chart rendering (Bokeh, Plotly, Vega)
                    page.wait_for_timeout(3000)

                page.pdf(
                    path=path,
                    width=page_width,
                    height=page_height,
                    print_background=True,
                    margin={"top": "15mm", "bottom": "15mm", "left": "10mm", "right": "10mm"},
                )
                browser.close()
        finally:
            server.shutdown()

    from datainpane.client.utils import display_msg
    display_msg(f"PDF saved to ./{path}")


def stringify_report(
    blocks: BlocksT,
    name: str | None = None,
    formatting: Formatting | None = None,
) -> str:
    """Stringify the app document to a HTML string

    Args:
        blocks: The `Blocks` object or a list of Blocks
        name: Name of the document (optional: uses path if not provided)
        formatting: Sets the basic app styling
    """

    s = ViewState(blocks=Blocks.wrap_blocks(blocks), file_entry_klass=B64FileEntry)
    report_html: str = (
        Pipeline(s)
        .pipe(PreProcessView(is_finalised=False))
        .pipe(ConvertXML())
        .pipe(ExportHTMLStringInlineAssets(name=name, formatting=formatting))
        .result
    )

    return report_html
