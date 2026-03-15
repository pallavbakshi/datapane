var a = Object.defineProperty;
var p = (s, t, e) => t in s ? a(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var r = (s, t, e) => p(s, typeof t != "symbol" ? t + "" : t, e);
import { R as o } from "./radial.D_0X1POt.es.js";
class n extends o {
  constructor(e, _) {
    super(e, _);
    r(this, "glyph");
    this.glyph = _;
  }
  get marker_type() {
    return "ngon";
  }
  _set_data() {
    super._set_data(), this._angles.set_from_prop(this.glyph.angle), this._auxs.set_from_prop(this.glyph.n);
  }
}
r(n, "__name__", "NgonGL");
export {
  n as NgonGL
};
