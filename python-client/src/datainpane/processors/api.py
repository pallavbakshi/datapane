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

__all__ = ["save_report", "save_pdf", "build_report", "stringify_report", "save_report_pages"]


################################################################################
# exported public API
def build_report(
    blocks: BlocksT,
    name: str = "Report",
    dest: NPath | None = None,
    formatting: Formatting | None = None,
    overwrite: bool = False,
    toc: bool = False,
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
        toc: Generate a table of contents from Page/Group labels (default: False)
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
        .pipe(ExportHTMLFileAssets(app_dir=app_dir, name=name, formatting=formatting, toc=toc))
        .result
    )


def save_report(
    blocks: BlocksT,
    path: str,
    open: bool = False,
    name: str = "Report",
    formatting: Formatting | None = None,
    offline: bool = False,
    toc: bool = False,
) -> None:
    """Save the app document to a local HTML file

    Args:
        blocks: The `Blocks` object or a list of Blocks
        path: File path to store the document
        open: Open in your browser after creating (default: False)
        name: Name of the document (optional: uses path if not provided)
        formatting: Sets the basic app styling
        offline: Bundle all JS/CSS inline for fully offline viewing (default: False)
        toc: Generate a table of contents from Page/Group labels (default: False)
    """

    s = ViewState(blocks=Blocks.wrap_blocks(blocks), file_entry_klass=B64FileEntry)
    _: str = (
        Pipeline(s)
        .pipe(PreProcessView(is_finalised=True))
        .pipe(ConvertXML())
        .pipe(ExportHTMLInlineAssets(path=path, open=open, name=name, formatting=formatting, offline=offline, toc=toc))
        .result
    )


def save_pdf(
    blocks: BlocksT,
    path: str,
    name: str = "Report",
    formatting: Formatting | None = None,
    landscape: bool = True,
    wait_for_js: bool = True,
) -> None:
    """Save the report as a high-quality PDF file.

    Uses A4 landscape by default for best dashboard rendering.
    Requires: ``uv add datainpane[pdf]`` then ``playwright install chromium``

    Args:
        blocks: The ``Blocks`` object or a list of Blocks
        path: File path to store the PDF
        name: Name of the document
        formatting: Sets the basic styling
        landscape: Use landscape orientation (default: True)
        wait_for_js: Wait for JS rendering (charts, tables). Default True.
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
    from http.server import HTTPServer, SimpleHTTPRequestHandler

    # A4 dimensions
    if landscape:
        page_width, page_height = "297mm", "210mm"
        margin_lr, margin_tb = 15, 12
    else:
        page_width, page_height = "210mm", "297mm"
        margin_lr, margin_tb = 10, 15

    # Calculate viewport to match PDF content area at 2x DPI for crisp rendering
    _mm_to_px = 96 / 25.4
    _content_w_mm = float(page_width.replace("mm", "")) - (margin_lr * 2)
    _viewport_w = int(_content_w_mm * _mm_to_px)

    # Locate web-components dist (for local serving without CDN)
    _dist_dir = Path(__file__).resolve().parents[4] / "web-components" / "dist"
    if not _dist_dir.is_dir():
        _dist_dir = None

    # Build static HTML tables from any DataTable blocks to replace revogrid
    _pdf_table_css, _pdf_table_js = _build_static_table_overrides(blocks)

    with tempfile.TemporaryDirectory() as tmp_dir:
        tmp_path = Path(tmp_dir)

        if _dist_dir:
            (tmp_path / "dist").symlink_to(_dist_dir)
            cdn_base = "/dist"
        else:
            cdn_base = None

        import os
        old_cdn = os.environ.get("DIP_CDN_BASE")
        try:
            if cdn_base:
                os.environ["DIP_CDN_BASE"] = cdn_base
            save_report(blocks, path=str(tmp_path / "report.html"), name=name, formatting=formatting)
        finally:
            if old_cdn is not None:
                os.environ["DIP_CDN_BASE"] = old_cdn
            elif "DIP_CDN_BASE" in os.environ:
                del os.environ["DIP_CDN_BASE"]

        class _Handler(SimpleHTTPRequestHandler):
            def __init__(self, *args, **kwargs):
                super().__init__(*args, directory=tmp_dir, **kwargs)
            def log_message(self, format, *args):
                pass

        server = HTTPServer(("127.0.0.1", 0), _Handler)
        port = server.server_address[1]
        threading.Thread(target=server.serve_forever, daemon=True).start()

        try:
            with sync_playwright() as p:
                browser = p.chromium.launch()
                page = browser.new_page(
                    viewport={"width": _viewport_w, "height": 800},
                    device_scale_factor=2,
                )

                page.goto(
                    f"http://127.0.0.1:{port}/report.html",
                    wait_until="networkidle",
                    timeout=30000,
                )

                if wait_for_js:
                    page.wait_for_timeout(3000)

                # Replace revogrid DataTables with static HTML tables
                if _pdf_table_js:
                    page.evaluate(_pdf_table_js)

                # PDF-specific styling
                page.add_style_tag(content=f"""
                    /* Hide interactive controls */
                    [data-cy=btn-run-query], [data-cy=btn-reset-data],
                    [data-cy=btn-open-query], [data-cy=dropdown-export],
                    .query-container, .cm-container,
                    [data-cy=block-datatable] > div:first-child,
                    nav,
                    .vega-actions, .vega-embed summary,
                    .modebar-container
                    {{ display: none !important; }}

                    /* PDF typography */
                    body {{ font-size: 14px; }}

                    {_pdf_table_css}
                """)

                page.pdf(
                    path=path,
                    width=page_width,
                    height=page_height,
                    print_background=True,
                    margin={
                        "top": f"{margin_tb}mm",
                        "bottom": f"{margin_tb}mm",
                        "left": f"{margin_lr}mm",
                        "right": f"{margin_lr}mm",
                    },
                )
                browser.close()
        finally:
            server.shutdown()

    from datainpane.client.utils import display_msg
    display_msg(f"PDF saved to ./{path}")


def _build_static_table_overrides(blocks: BlocksT) -> tuple[str, str]:
    """Build CSS and JS to replace revogrid DataTables with static HTML tables in PDF.

    Returns (css, js) strings. The JS replaces each [data-cy=block-datatable]
    element's innerHTML with a styled <table>.
    """
    import json

    from datainpane.blocks import DataTable
    from datainpane.view import Blocks

    # Collect all DataFrames from DataTable blocks
    wrapped = Blocks.wrap_blocks(blocks)
    tables = []

    def _find_datatables(block):
        if isinstance(block, DataTable):
            tables.append(block.data)
        for child in getattr(block, "blocks", []):
            _find_datatables(child)

    for block in wrapped.blocks:
        _find_datatables(block)

    if not tables:
        return "", ""

    # Build JS that replaces each DataTable with a static HTML table
    replacements = []
    for df in tables:
        # Render DataFrame to clean HTML
        html = df.to_html(
            index=False,
            classes="dip-pdf-table",
            border=0,
            max_rows=100,
            escape=True,
        )
        replacements.append(json.dumps(html))

    js = """
    (function() {
        const tables = document.querySelectorAll('[data-cy=block-datatable]');
        const htmls = [%s];
        tables.forEach((el, i) => {
            if (i < htmls.length) {
                el.innerHTML = htmls[i];
            }
        });
    })();
    """ % ",".join(replacements)

    css = """
    /* Static PDF table styling */
    .dip-pdf-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
        margin: 0.5em 0;
    }
    .dip-pdf-table th {
        background: #f1f5f9;
        font-weight: 600;
        text-align: left;
        padding: 8px 12px;
        border-bottom: 2px solid #e2e8f0;
        white-space: nowrap;
    }
    .dip-pdf-table td {
        padding: 6px 12px;
        border-bottom: 1px solid #e2e8f0;
    }
    .dip-pdf-table tr:last-child td {
        border-bottom: none;
    }
    """

    return css, js


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


def save_report_pages(
    blocks: BlocksT,
    dest: str = ".",
    name: str = "Report",
    formatting: Formatting | None = None,
    offline: bool = False,
) -> list[str]:
    """Save each Page as a separate HTML file.

    If ``blocks`` contains ``Page`` blocks, each page is saved as an individual
    HTML file named ``{dest}/{name} - {page_title}.html``.  If there are no
    ``Page`` blocks the entire report is saved as a single file.

    Args:
        blocks: The ``Blocks`` object or a list of Blocks
        dest: Directory to write the HTML files into (default: current dir)
        name: Base name for the files
        formatting: Sets the basic app styling
        offline: Bundle all JS/CSS inline for fully offline viewing

    Returns:
        List of file paths that were created.
    """
    from datainpane.blocks import Page

    wrapped = Blocks.wrap_blocks(blocks)
    pages = [b for b in wrapped.blocks if isinstance(b, Page)]

    if not pages:
        # No Page blocks — fall back to single-file export
        path = str(Path(dest) / f"{name}.html")
        save_report(blocks, path=path, name=name, formatting=formatting, offline=offline)
        return [path]

    paths: list[str] = []
    dest_dir = Path(dest)
    dest_dir.mkdir(parents=True, exist_ok=True)

    for page in pages:
        page_title = page.title or page.name or f"Page {len(paths) + 1}"
        safe_title = "".join(c if c.isalnum() or c in " -_" else "_" for c in page_title)
        path = str(dest_dir / f"{name} - {safe_title}.html")
        page_blocks = Blocks(*page.blocks)
        save_report(page_blocks, path=path, name=page_title, formatting=formatting, offline=offline)
        paths.append(path)

    from datainpane.client.utils import display_msg
    display_msg(f"Saved {len(paths)} pages to {dest}/")
    return paths
