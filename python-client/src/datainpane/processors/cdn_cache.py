"""CDN asset fetcher and cache for offline report generation."""
from __future__ import annotations

import base64
import hashlib
import urllib.request
from pathlib import Path

from datainpane.client import DPClientError


_CACHE_DIR = Path.home() / ".cache" / "datainpane" / "cdn"

_CDN_ASSETS = [
    "report/index.css",
    "report/tailwind.css",
    "report/index.es.js",
]


def fetch_cdn_assets(cdn_base: str) -> dict[str, str]:
    """Fetch CDN assets and return as {filename: content} dict.

    Results are cached on disk keyed by a hash of the CDN base URL,
    so subsequent calls with the same CDN version are instant.
    """
    cache_key = hashlib.sha256(cdn_base.encode()).hexdigest()[:16]
    cache_dir = _CACHE_DIR / cache_key
    assets: dict[str, str] = {}

    # Try cache first
    if cache_dir.is_dir():
        try:
            for asset_path in _CDN_ASSETS:
                filename = asset_path.replace("/", "_")
                cached = cache_dir / filename
                assets[asset_path] = cached.read_text(encoding="utf-8")
            return assets
        except FileNotFoundError:
            pass  # cache incomplete, re-fetch

    # Fetch from CDN
    cache_dir.mkdir(parents=True, exist_ok=True)
    for asset_path in _CDN_ASSETS:
        url = f"{cdn_base}/{asset_path}"
        try:
            with urllib.request.urlopen(url, timeout=30) as resp:
                content = resp.read().decode("utf-8")
        except Exception as e:
            raise DPClientError(
                f"Failed to fetch CDN asset for offline mode: {url}\n"
                f"Error: {e}\n"
                f"Run once with network access to cache assets, or set DIP_CDN_BASE "
                f"to a local directory."
            ) from e

        # Cache to disk
        filename = asset_path.replace("/", "_")
        (cache_dir / filename).write_text(content, encoding="utf-8")
        assets[asset_path] = content

    return assets


def assets_to_inline(assets: dict[str, str]) -> dict[str, str]:
    """Convert fetched assets into template variables for inline embedding.

    Returns dict with keys: inline_index_css, inline_tailwind_css, inline_js_b64
    """
    return {
        "inline_index_css": assets.get("report/index.css", ""),
        "inline_tailwind_css": assets.get("report/tailwind.css", ""),
        "inline_js_b64": base64.b64encode(
            assets.get("report/index.es.js", "").encode("utf-8")
        ).decode("ascii"),
    }
