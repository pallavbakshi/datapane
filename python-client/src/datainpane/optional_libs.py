"""
Dynamic handling for optional libraries - this module is imported on demand
"""
from __future__ import annotations

# flake8: noqa:F811 isort:skip_file
from packaging import version as v
from packaging.specifiers import SpecifierSet

from datainpane.client import log

# NOTE - need to update this and keep in sync with JS
BOKEH_V_SPECIFIER = SpecifierSet(">=3.0.0")
PLOTLY_V_SPECIFIER = SpecifierSet(">=4.0.0")
FOLIUM_V_SPECIFIER = SpecifierSet(">=0.12.0")


def _check_version(name: str, _v: v.Version, ss: SpecifierSet):
    if _v not in ss:
        log.warning(
            f"{name} version {_v} is not supported, these plots may not display correctly, please install version {ss}"
        )


# Optional Plotting library import handling
# Matplotlib
try:
    from matplotlib.axes import Axes
    from matplotlib.figure import Figure
    from numpy import ndarray

    HAVE_MATPLOTLIB = True
except Exception:
    log.debug("No matplotlib found")
    HAVE_MATPLOTLIB = False

# Folium
try:
    import folium
    from folium import Map

    _check_version("Folium", v.Version(folium.__version__), FOLIUM_V_SPECIFIER)
    HAVE_FOLIUM = True
except Exception:
    HAVE_FOLIUM = False
    log.debug("No folium found")

# Bokeh
try:
    import bokeh
    from bokeh.layouts import LayoutDOM as BLayout
    from bokeh.plotting import figure as BFigure

    _check_version("Bokeh", v.Version(bokeh.__version__), BOKEH_V_SPECIFIER)
    HAVE_BOKEH = True
except Exception:
    HAVE_BOKEH = False
    log.debug("No Bokeh found (Bokeh 2.x is incompatible with NumPy 2.x)")

# Plotly
try:
    import plotly
    from plotly.graph_objects import Figure as PFigure

    _check_version("Plotly", v.Version(plotly.__version__), PLOTLY_V_SPECIFIER)
    HAVE_PLOTLY = True
except Exception:
    HAVE_PLOTLY = False
    log.debug("No Plotly Found")

# Great Tables
try:
    from great_tables import GT

    HAVE_GREAT_TABLES = True
except Exception:
    HAVE_GREAT_TABLES = False
    log.debug("No great_tables found")
