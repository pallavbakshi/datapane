var e = Object.defineProperty;
var i = (p, t, r) => t in p ? e(p, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : p[t] = r;
var s = (p, t, r) => (i(p, typeof t != "symbol" ? t + "" : t, r), r);
import { R as _ } from "./radial.8887331d.es.js";
import "./sxsy.9ae7042d.es.js";
import "./single_marker.12867f9e.es.js";
import "./base_marker.215ae696.es.js";
import "./buffer.ac3ad2d2.es.js";
import "./Bokeh.a8fd047d.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
class a extends _ {
  constructor(r, o) {
    super(r, o);
    s(this, "glyph");
    this.glyph = o;
  }
  get marker_type() {
    return "ngon";
  }
  _set_data() {
    super._set_data(), this._angles.set_from_prop(this.glyph.angle), this._auxs.set_from_prop(this.glyph.n);
  }
}
s(a, "__name__", "NgonGL");
export {
  a as NgonGL
};
