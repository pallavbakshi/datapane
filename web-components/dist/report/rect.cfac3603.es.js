var h = Object.defineProperty;
var a = (s, r, t) => r in s ? h(s, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[r] = t;
var e = (s, r, t) => (a(s, typeof r != "symbol" ? r + "" : r, t), t);
import { S as p } from "./sxsy.9ae7042d.es.js";
import "./single_marker.12867f9e.es.js";
import "./base_marker.215ae696.es.js";
import "./buffer.ac3ad2d2.es.js";
import "./Bokeh.a8fd047d.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
class m extends p {
  constructor(t, _) {
    super(t, _);
    e(this, "glyph");
    this.glyph = _;
  }
  get marker_type() {
    return this._border_radius_nonzero ? "round_rect" : "rect";
  }
  _set_data() {
    super._set_data(), this._widths.set_from_array(this.glyph.swidth), this._heights.set_from_array(this.glyph.sheight), this._angles.set_from_prop(this.glyph.angle);
    const { top_left: t, top_right: _, bottom_right: o, bottom_left: i } = this.glyph.border_radius;
    this._border_radius = [t, _, o, i], this._border_radius_nonzero = Math.max(...this._border_radius) > 0;
  }
  _set_once() {
    super._set_once(), this._auxs.set_from_scalar(0);
  }
}
e(m, "__name__", "RectGL");
export {
  m as RectGL
};
