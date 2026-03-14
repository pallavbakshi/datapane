var i = Object.defineProperty;
var p = (e, r, t) => r in e ? i(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var o = (e, r, t) => (p(e, typeof r != "symbol" ? r + "" : r, t), t);
import { R as m } from "./radial.8887331d.es.js";
import "./sxsy.9ae7042d.es.js";
import "./single_marker.12867f9e.es.js";
import "./base_marker.215ae696.es.js";
import "./buffer.ac3ad2d2.es.js";
import "./Bokeh.a8fd047d.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
class _ extends m {
  constructor(t, s) {
    super(t, s);
    o(this, "glyph");
    this.glyph = s;
  }
  get marker_type() {
    return "circle";
  }
  _set_once() {
    super._set_once(), this._angles.set_from_scalar(0);
  }
}
o(_, "__name__", "CircleGL");
export {
  _ as CircleGL
};
