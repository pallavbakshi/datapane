var a = Object.defineProperty;
var i = (r, s, t) => s in r ? a(r, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[s] = t;
var e = (r, s, t) => i(r, typeof s != "symbol" ? s + "" : s, t);
import { S as u } from "./sxsy.B1Fwb6eK.es.js";
class n extends u {
  constructor(t, _) {
    super(t, _);
    e(this, "glyph");
    this.glyph = _;
  }
  get marker_type() {
    return "annulus";
  }
  get outer_radius() {
    return this._widths;
  }
  get inner_radius() {
    return this._heights;
  }
  _set_data() {
    super._set_data(), this.outer_radius.set_from_array(this.glyph.souter_radius), this.inner_radius.set_from_array(this.glyph.sinner_radius);
  }
  _set_once() {
    super._set_once(), this._angles.set_from_scalar(0), this._auxs.set_from_scalar(0);
  }
}
e(n, "__name__", "AnnulusGL");
export {
  n as AnnulusGL
};
