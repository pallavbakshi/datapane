var i = Object.defineProperty;
var a = (s, r, t) => r in s ? i(s, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[r] = t;
var e = (s, r, t) => (a(s, typeof r != "symbol" ? r + "" : r, t), t);
import { S as u } from "./sxsy.9ae7042d.es.js";
import "./single_marker.12867f9e.es.js";
import "./base_marker.215ae696.es.js";
import "./buffer.ac3ad2d2.es.js";
import "./Bokeh.a8fd047d.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
class o extends u {
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
e(o, "__name__", "AnnulusGL");
export {
  o as AnnulusGL
};
