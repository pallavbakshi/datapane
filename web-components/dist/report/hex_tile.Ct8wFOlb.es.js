var h = Object.defineProperty;
var r = (t, s, e) => s in t ? h(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var _ = (t, s, e) => r(t, typeof s != "symbol" ? s + "" : s, e);
import { S as i } from "./sxsy.CT5Zu5aa.es.js";
class l extends i {
  constructor(e, a) {
    super(e, a);
    _(this, "glyph");
    this.glyph = a;
  }
  get marker_type() {
    return "hex_tile";
  }
  _set_data() {
    super._set_data(), this.glyph.model.orientation == "pointytop" ? (this._angles.set_from_scalar(0.5 * Math.PI), this._widths.set_from_scalar(this.glyph.svy[0] * 2), this._heights.set_from_scalar(this.glyph.svx[4] * 4 / Math.sqrt(3))) : (this._angles.set_from_scalar(0), this._widths.set_from_scalar(this.glyph.svx[0] * 2), this._heights.set_from_scalar(this.glyph.svy[4] * 4 / Math.sqrt(3)));
  }
  _set_once() {
    super._set_once(), this._auxs.set_from_scalar(0);
  }
}
_(l, "__name__", "HexTileGL");
export {
  l as HexTileGL
};
