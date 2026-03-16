"""Tests for CDN URL generation and report HTML output."""
import os

import datainpane as dip


def test_cdn_url_default():
    """Default CDN should use jsDelivr with the package version."""
    from datainpane.processors.processors import ExportHTMLInlineAssets

    exporter = ExportHTMLInlineAssets.__new__(ExportHTMLInlineAssets)
    # Clear any env overrides
    env_vars = ["DIP_CDN_BASE", "DIP_CDN_REPO", "DIP_CDN_REF"]
    saved = {k: os.environ.pop(k, None) for k in env_vars}

    try:
        cdn = exporter.get_cdn()
        assert "cdn.jsdelivr.net" in cdn
        assert "datainpane/datainpane" in cdn
        assert dip.__version__ in cdn
    finally:
        for k, v in saved.items():
            if v is not None:
                os.environ[k] = v


def test_cdn_url_env_override():
    """DIP_CDN_BASE should override the entire CDN URL."""
    from datainpane.processors.processors import ExportHTMLInlineAssets

    exporter = ExportHTMLInlineAssets.__new__(ExportHTMLInlineAssets)
    saved = os.environ.get("DIP_CDN_BASE")

    try:
        os.environ["DIP_CDN_BASE"] = "https://my-cdn.example.com/assets"
        cdn = exporter.get_cdn()
        assert cdn == "https://my-cdn.example.com/assets"
    finally:
        if saved is not None:
            os.environ["DIP_CDN_BASE"] = saved
        else:
            os.environ.pop("DIP_CDN_BASE", None)


def test_cdn_url_repo_override():
    """DIP_CDN_REPO should change the GitHub repo in jsDelivr URL."""
    from datainpane.processors.processors import ExportHTMLInlineAssets

    exporter = ExportHTMLInlineAssets.__new__(ExportHTMLInlineAssets)
    env_vars = ["DIP_CDN_BASE", "DIP_CDN_REPO", "DIP_CDN_REF"]
    saved = {k: os.environ.pop(k, None) for k in env_vars}

    try:
        os.environ["DIP_CDN_REPO"] = "myuser/myrepo"
        cdn = exporter.get_cdn()
        assert "myuser/myrepo" in cdn
        assert "cdn.jsdelivr.net" in cdn
    finally:
        for k, v in saved.items():
            if v is not None:
                os.environ[k] = v


def test_saved_report_has_cdn_urls(tmp_path):
    """A saved report HTML should reference the CDN for JS/CSS."""
    view = dip.Blocks(dip.Text("# Test"))
    path = tmp_path / "test.html"
    dip.save_report(view, path=str(path))

    html = path.read_text()
    assert "cdn.jsdelivr.net" in html
    assert "index.css" in html
    assert "tailwind.css" in html
    assert "index.es.js" in html
    # Should NOT reference the dead datapane CDN
    assert "datapane-cdn.com" not in html


def test_saved_report_has_inline_favicon(tmp_path):
    """The favicon should be an SVG data URI, not an external reference."""
    view = dip.Blocks(dip.Text("# Test"))
    path = tmp_path / "test.html"
    dip.save_report(view, path=str(path))

    html = path.read_text()
    assert "data:image/svg+xml;base64," in html
    # Should NOT reference external icon URLs
    assert "datapane-icon" not in html
    assert "datainpane-icon" not in html
