# Data In Pane

> **Forked from [Datapane](https://github.com/datapane/datapane)** -- the original open-source Python library for building reports, created by the Datapane team (2019-2023). When the original project was discontinued, we forked it, modernized all dependencies, and rebranded it as **Data In Pane** so the community can keep using and building on it.

## What it does

Build interactive, self-contained HTML reports in Python. Wrap pandas DataFrames, plots (Bokeh, Altair, Plotly, Folium, Matplotlib), markdown, and files into shareable HTML reports -- no server required.

## Quick install

```
pip install datainpane
```

## Quick example

```python
import datainpane as dip
import pandas as pd

df = pd.DataFrame({"x": [1, 2, 3, 4], "y": [10, 20, 30, 40]})

view = dip.Blocks(
    dip.Text("## My Report"),
    dip.DataTable(df),
    dip.BigNumber(heading="Total", value="100"),
)
dip.save_report(view, path="report.html")
```

## Layout example

Combine Groups, Selects, formulas, and more for richer layouts.

```python
view = dip.Blocks(
    dip.Formula("x^2 + y^2 = z^2"),
    dip.Group(
        dip.BigNumber(heading="Accuracy", value="84%", change="2%", is_upward_change=True),
        dip.BigNumber(heading="Count", value=100),
        columns=2,
    ),
    dip.Select(
        dip.Plot(fig, label="Chart"),
        dip.DataTable(df, label="Data"),
    ),
)
dip.save_report(view, path="layout.html")
```

## What's new in the fork

- Python 3.12+ required
- pandas 2.x/3.x support (uncapped)
- Bokeh 3.x support
- Migrated from Poetry to uv
- Node 20+ for web components
- Dead cloud code removed
- CDN switched to jsDelivr (served from GitHub)
- Rebranded: `import datainpane as dip`

## Requirements

Python >= 3.12

## License

Apache 2.0 (same as the original Datapane project).
