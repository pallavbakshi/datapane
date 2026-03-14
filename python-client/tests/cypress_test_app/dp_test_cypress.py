import datainpane as dip
import datainpane.blocks.text

file_param = dip.Params.get("__FILE__")
str_param = dip.Params.get("__STRING__REQUIRED__")
int_param = dip.Params.get("__INT__")
float_param = dip.Params.get("__FLOAT__")

app = dip.App(
    datainpane.blocks.inline_text.Text(str_param),
    datainpane.blocks.inline_text.Text(str(int_param)),
    datainpane.blocks.inline_text.Text(str(float_param)),
    datainpane.blocks.inline_text.Text(file_param.read_text()),
)

dip.upload_report(app, name="params-test-report", overwrite=True)
