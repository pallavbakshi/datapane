var i = Object.defineProperty;
var a = (e, t, s) => t in e ? i(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var r = (e, t, s) => (a(e, typeof t != "symbol" ? t + "" : t, s), s);
import { S as h } from "./sxsy.9ae7042d.es.js";
import "./single_marker.12867f9e.es.js";
import "./base_marker.215ae696.es.js";
import "./buffer.ac3ad2d2.es.js";
import "./Bokeh.a8fd047d.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
class o extends h {
  constructor(s, _) {
    super(s, _);
    r(this, "glyph");
    this.glyph = _;
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
r(o, "__name__", "HexTileGL");
export {
  o as HexTileGL
};
