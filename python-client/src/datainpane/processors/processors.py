from __future__ import annotations

import json
import logging
import os
import typing as t
from abc import ABC
from copy import copy
from os import path as osp
from pathlib import Path
from uuid import uuid4

import importlib.resources as ir
from lxml import etree

from datainpane import blocks as b
from datainpane._vendor.simple_template import SimpleTemplate
from datainpane.client.exceptions import InvalidReportError
from datainpane.client.utils import display_msg, log, open_in_browser
from datainpane.common import HTML, NPath, timestamp, validate_view_doc
from datainpane.common.viewxml_utils import ElementT, local_view_resources
from datainpane.view import PreProcess, XMLBuilder

from .types import BaseProcessor, Formatting


class PreProcessView(BaseProcessor):
    """Optimisations to improve the layout of the view using the Block-API"""

    def __init__(self, *, is_finalised: bool = True) -> None:
        self.is_finalised = is_finalised
        super().__init__()

    def __call__(self, _: t.Any) -> None:
        # AST checks
        if len(self.s.blocks.blocks) == 0:
            raise InvalidReportError("Empty blocks object - must contain at least one block")

        # convert Page -> Select + Group
        v = copy(self.s.blocks)
        if all(isinstance(blk, b.Page) for blk in v.blocks):
            # convert to top-level Select
            p: b.Page  # noqa: F842
            v.blocks = [
                b.Select(
                    blocks=[b.Group(blocks=p.blocks, label=p.title, name=p.name) for p in v.blocks],
                    type=b.SelectType.TABS,
                )
            ]

        # Block-API visitors
        pp = PreProcess(is_finalised=self.is_finalised)
        v.accept(pp)
        v1 = pp.root
        # v1 = copy(v)

        # update the processor state
        self.s.blocks = v1

        return None


class ConvertXML(BaseProcessor):
    """Convert the View AST into an XML fragment"""

    local_post_xslt = etree.parse(str(local_view_resources / "local_post_process.xslt"))
    local_post_transform = etree.XSLT(local_post_xslt)

    def __init__(self, *, pretty_print: bool = False, fragment: bool = False) -> None:
        self.pretty_print: bool = pretty_print
        self.fragment: bool = fragment
        super().__init__()

    def __call__(self, _: t.Any) -> ElementT:
        initial_doc = self.convert_xml()
        transformed_doc = self.post_transforms(initial_doc)

        # convert to string
        view_xml_str: str = etree.tounicode(transformed_doc, pretty_print=self.pretty_print)
        # s1 = dc.replace(s, view_xml=view_xml_str)
        self.s.view_xml = view_xml_str

        if log.isEnabledFor(logging.DEBUG):
            log.debug(etree.tounicode(transformed_doc, pretty_print=True))

        # return the doc for further processing (xml str stored in state)
        return transformed_doc

    def convert_xml(self) -> ElementT:
        # create initial state
        builder_state = XMLBuilder(store=self.s.store)
        self.s.blocks.accept(builder_state)
        return builder_state.get_root(self.fragment)

    def post_transforms(self, view_doc: ElementT) -> ElementT:
        # TODO - post-xml transformations, essentially xslt / lxml-based DOM operations
        # post_process via xslt
        processed_view_doc: ElementT = self.local_post_transform(view_doc)

        # TODO - custom lxml-based transforms go here...

        # validate post all transformations
        validate_view_doc(xml_doc=processed_view_doc)
        return processed_view_doc


###############################################################################
# HTML Exporting Processors
class BaseExportHTML(BaseProcessor, ABC):
    """Provides shared logic for writing an app to local disk"""

    # Type is `ir.abc.Traversable` which extends `Path`,
    # but the former isn't compatible with `shutil`
    template_dir: Path = t.cast(Path, ir.files("datainpane.resources.html_templates"))
    template: SimpleTemplate
    template_name: str

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        # TODO (JB) - why doesn't altering TEMPLATE_PATH work as described in docs? Need to pass dir to `lookup` kwarg instead
        cls.template = SimpleTemplate(name=cls.template_name, lookup=[str(cls.template_dir)])

    def get_cdn(self) -> str:
        from datainpane import __version__

        if cdn_base := os.getenv("DIP_CDN_BASE"):
            return cdn_base
        # Serve built report assets via jsDelivr from the GitHub repo
        repo = os.getenv("DIP_CDN_REPO", "pallavbakshi/datainpane")
        ref = os.getenv("DIP_CDN_REF", f"v{__version__}")
        return f"https://cdn.jsdelivr.net/gh/{repo}@{ref}/web-components/dist"

    def escape_json_htmlsafe(self, obj: t.Any) -> str:
        """Escape JSON object for embedding in SimpleTemplate templates."""

        # Taken from Jinja2's |tojson pipe function
        # (https://github.com/pallets/jinja/blob/b7cb6ee6675b12a027c5e7518f832b2926dfe293/src/jinja2/utils.py#L628)
        return (
            json.dumps(obj)
            .replace("<", "\\u003c")
            .replace(">", "\\u003e")
            .replace("&", "\\u0026")
            .replace("'", "\\u0027")
        )

    def _extract_toc(self) -> list[dict[str, t.Any]]:
        """Extract table of contents entries from the block tree."""
        entries: list[dict[str, t.Any]] = []
        if not self.s:
            return entries

        def _get_label(block) -> str | None:
            return block._attributes.get("label")

        def _walk(block, depth=0):
            if isinstance(block, b.Page):
                entries.append({"title": block.title or block.name or "Untitled", "level": 1})
                for child in getattr(block, "blocks", []):
                    _walk(child, depth + 1)
            elif isinstance(block, b.Select):
                for child in getattr(block, "blocks", []):
                    _walk(child, depth)
            elif isinstance(block, b.Group):
                label = _get_label(block)
                if label:
                    entries.append({"title": label, "level": min(depth + 1, 3)})
                for child in getattr(block, "blocks", []):
                    _walk(child, depth + 1)
            elif hasattr(block, "blocks"):
                for child in block.blocks:
                    _walk(child, depth + 1)

        for block in self.s.blocks.blocks:
            _walk(block)

        return entries

    def _render_toc_html(self, entries: list[dict[str, t.Any]]) -> str:
        """Render TOC entries as an HTML sidebar."""
        import html as html_mod

        if not entries:
            return ""

        items = []
        for entry in entries:
            indent = 12 * (entry["level"] - 1)
            title = html_mod.escape(entry["title"])
            items.append(
                f'<li style="padding-left:{indent}px">'
                f'<a href="#" class="dip-toc-link" style="color:inherit;text-decoration:none;'
                f'display:block;padding:4px 0;font-size:13px;opacity:0.85"'
                f' data-toc-title="{title}">{title}</a></li>'
            )

        return f"""<nav id="dip-toc" role="navigation" aria-label="Table of contents" style="
            position:fixed;top:0;left:0;width:220px;height:100vh;
            overflow-y:auto;padding:20px 16px;
            background:var(--dip-surface);border-right:1px solid var(--dip-border);
            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
            z-index:1000;box-sizing:border-box;color:var(--dip-text);
        ">
            <div style="font-weight:700;font-size:14px;margin-bottom:12px">Contents</div>
            <ul style="list-style:none;margin:0;padding:0">
                {''.join(items)}
            </ul>
        </nav>
        <script>
        document.querySelectorAll('.dip-toc-link').forEach(function(link) {{
            link.addEventListener('click', function(e) {{
                e.preventDefault();
                var title = this.dataset.tocTitle;
                var headings = document.querySelectorAll('h1,h2,h3,[data-block-label]');
                for (var i = 0; i < headings.length; i++) {{
                    var el = headings[i];
                    var text = el.dataset && el.dataset.blockLabel || el.textContent.trim();
                    if (text === title) {{
                        el.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
                        break;
                    }}
                }}
            }});
        }});
        </script>"""

    def _render_dark_toggle_html(self) -> str:
        """Render a floating dark mode toggle button with CSS variable overrides."""
        return """<button id="dip-dark-toggle" title="Toggle dark mode" aria-label="Toggle dark mode" style="
            position:fixed;bottom:20px;right:20px;z-index:9999;
            width:40px;height:40px;border-radius:50%;border:1px solid var(--dip-border);
            background:var(--dip-surface);cursor:pointer;font-size:18px;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 2px 8px rgba(0,0,0,0.12);transition:all 0.2s;
            color:var(--dip-text);
        " onclick="dipToggleDark()">&#x263D;</button>
        <style>
        /* Dark mode: override CSS variables for all themed components */
        body.dip-dark {
            --dip-bg-color: #1a1a2e;
            --dip-surface: #1e1e32;
            --dip-surface-alt: #2d2d44;
            --dip-border: #3d3d5c;
            --dip-text: #e2e8f0;
            --dip-text-muted: #94a3b8;
            /* Callout */
            --dip-callout-note-bg: #1e293b; --dip-callout-note-border: #60a5fa; --dip-callout-note-text: #bfdbfe;
            --dip-callout-tip-bg: #14291e;  --dip-callout-tip-border: #4ade80;  --dip-callout-tip-text: #bbf7d0;
            --dip-callout-warn-bg: #422006; --dip-callout-warn-border: #fbbf24; --dip-callout-warn-text: #fef3c7;
            --dip-callout-err-bg: #450a0a;  --dip-callout-err-border: #f87171;  --dip-callout-err-text: #fecaca;
            /* Diff */
            --dip-diff-add-bg: #14532d;  --dip-diff-add-text: #bbf7d0;
            --dip-diff-rm-bg: #7f1d1d;   --dip-diff-rm-text: #fecaca;
            --dip-diff-chg-bg: #78350f;  --dip-diff-chg-text: #fef3c7;
            --dip-diff-header-bg: #2d2d44;
            /* Progress */
            --dip-progress-bg: #3d3d5c;
            --dip-progress-label: #cbd5e1;
            background: #1a1a2e !important;
            color: #e2e8f0 !important;
        }
        body.dip-dark .prose, body.dip-dark .prose * { color: #e2e8f0 !important; }
        body.dip-dark #report { filter: invert(0.88) hue-rotate(180deg); }
        body.dip-dark #report img, body.dip-dark #report video,
        body.dip-dark #report canvas, body.dip-dark #report svg:not([class*="icon"]) {
            filter: invert(1) hue-rotate(180deg);
        }
        </style>
        <script>
        function dipToggleDark(){
            document.body.classList.toggle('dip-dark');
            localStorage.setItem('dip-dark-mode', document.body.classList.contains('dip-dark'));
        }
        if(localStorage.getItem('dip-dark-mode')==='true') document.body.classList.add('dip-dark');
        </script>"""

    def _collect_block_types(self) -> set[str]:
        """Collect the set of block type names used in the report."""
        types: set[str] = set()
        if not self.s:
            return types

        def _walk(block):
            types.add(type(block).__name__)
            for child in getattr(block, "blocks", []):
                _walk(child)

        for block in self.s.blocks.blocks:
            _walk(block)
        return types

    def _write_html_template(
        self,
        name: str,
        formatting: Formatting | None = None,
        app_runner: bool = False,
        offline: bool = False,
        toc: bool = False,
    ) -> tuple[str, str]:
        """Internal method to write the ViewXML and assets into a HTML container and associated files"""
        name = name or "app"
        formatting = formatting or Formatting()

        report_id: str = uuid4().hex

        # TODO - split this out?
        vs = self.s
        if vs:
            assets = vs.store.as_dict() or {}
            view_xml = vs.view_xml
        else:
            assets = {}
            view_xml = ""

        # Offline mode: fetch and inline CDN assets
        cdn_base = self.get_cdn()
        inline_vars: dict[str, str] = {
            "inline_index_css": "",
            "inline_tailwind_css": "",
            "inline_js_b64": "",
        }
        if offline:
            from .cdn_cache import assets_to_inline, fetch_cdn_assets
            cdn_assets = fetch_cdn_assets(cdn_base)
            inline_vars = assets_to_inline(cdn_assets)

        # TOC generation
        toc_html = ""
        if toc:
            toc_entries = self._extract_toc()
            toc_html = self._render_toc_html(toc_entries)

        # Dark mode toggle
        dark_toggle_html = ""
        if formatting.dark_mode_toggle:
            dark_toggle_html = self._render_dark_toggle_html()

        # Block type tracking for tree-shaking
        block_types = sorted(self._collect_block_types())

        app_data = dict(view_xml=view_xml, assets=assets)
        html = self.template.render(
            # Escape JS multi-line strings
            app_data=self.escape_json_htmlsafe(app_data),
            report_width_class=formatting.width.to_css(),
            report_name=name,
            report_date=timestamp(),
            css_header=formatting.to_css(),
            is_light_prose=json.dumps(formatting.light_prose),
            events=False,
            report_id=report_id,
            cdn_base=cdn_base,
            app_runner=app_runner,
            # New Sprint 2 variables
            offline=offline,
            toc_html=toc_html,
            header=formatting.header,
            footer=formatting.footer,
            dark_toggle_html=dark_toggle_html,
            block_types=json.dumps(block_types),
            **inline_vars,
        )

        return html, report_id


class ExportHTMLInlineAssets(BaseExportHTML):
    """
    Export a view into a single HTML file containing:
    - View XML - embedded
    - Assetes - embedded as b64 data-uris
    """

    template_name = "local_template.html"

    def __init__(
        self,
        path: str,
        open: bool = False,
        name: str = "app",
        formatting: Formatting | None = None,
        offline: bool = False,
        toc: bool = False,
    ):
        self.path = path
        self.open = open
        self.name = name
        self.formatting = formatting
        self.offline = offline
        self.toc = toc

    def __call__(self, _: t.Any) -> str:
        html, report_id = self._write_html_template(
            name=self.name, formatting=self.formatting, offline=self.offline, toc=self.toc,
        )

        Path(self.path).write_text(html, encoding="utf-8")

        display_msg(f"App saved to ./{self.path}")

        if self.open:
            path_uri = f"file://{osp.realpath(osp.expanduser(self.path))}"
            open_in_browser(path_uri)

        return report_id


class ExportHTMLFileAssets(BaseExportHTML):
    """
    Export a view into a single HTML file on disk, containing
    - View XML - embedded
    - Assets - referenced as remote resources
    """

    template_name = "local_template.html"

    def __init__(self, app_dir: Path, name: str = "app", formatting: Formatting | None = None, toc: bool = False):
        self.app_dir = app_dir
        self.name = name
        self.formatting = formatting
        self.toc = toc

    def __call__(self, dest: NPath | None = None) -> Path:
        html, report_id = self._write_html_template(
            name=self.name,
            formatting=self.formatting,
            toc=self.toc,
        )

        index_path = self.app_dir / "index.html"
        index_path.write_text(html, encoding="utf-8")
        display_msg(f"Built app in {self.app_dir}")
        return self.app_dir


class ExportHTMLStringInlineAssets(BaseExportHTML):
    """
    Export the View as an in-memory string representing a resizable HTML fragment, containing
    - View XML - embedded
    - Assetes - embedded as b64 data-uris
    """

    template_name = "ipython_template.html"

    def __init__(
        self,
        name: str = "Stringified App",
        formatting: Formatting | None = None,
    ):
        self.name = name
        self.formatting = formatting

    def __call__(self, _: t.Any) -> HTML:
        html, report_id = self._write_html_template(name=self.name, formatting=self.formatting)

        return HTML(html)
