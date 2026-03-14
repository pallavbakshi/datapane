import datainpane as dip
import datainpane.blocks.text

app = dip.App(
    datainpane.blocks.inline_text.Text("__REPORT_RENDERED__"),
)

dip.upload_report(app, name="no-params-test-report", overwrite=True)
