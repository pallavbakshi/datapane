import os

import pandas as pd

import datainpane as dip
import datainpane.blocks.asset
import datainpane.blocks.text

# basic report creation, with params and env vars
df = pd.DataFrame.from_dict({"x": [4, 3, 2, 1], "y": [10.5, 20.5, 30.5, 40.5]})
blocks = [datainpane.blocks.inline_text.Text(f"Dummy Markdown block - {dip.Params['p1']}"), datainpane.blocks.asset.DataTable(df), datainpane.blocks.inline_text.Text(f"Text block with env var: {os.environ['ENV_VAR']}")]

# test running as main or by datainpane runner
if dip.ON_DATAPANE:
    print("on datainpane")
if __name__ == "__datainpane__":  # same as dip.by_datainpane
    print("by datainpane")
    report = dip.App(blocks=blocks)
    report.upload(name="dip_report", description="Description", overwrite=True)
