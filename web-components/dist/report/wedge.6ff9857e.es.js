var a = Object.defineProperty;
var i = (s, t, e) => t in s ? a(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var r = (s, t, e) => (i(s, typeof t != "symbol" ? t + "" : t, e), e);
import { S as p } from "./sxsy.9ae7042d.es.js";
import "./single_marker.12867f9e.es.js";
import "./base_marker.215ae696.es.js";
import "./buffer.ac3ad2d2.es.js";
import "./Bokeh.a8fd047d.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
class h extends p {
  constructor(e, _) {
    super(e, _);
    r(this, "glyph");
    this.glyph = _;
  }
  get marker_type() {
    return "wedge";
  }
  get radius() {
    return this._widths;
  }
  get start_angle() {
    return this._angles;
  }
  get end_angle() {
    return this._auxs;
  }
  _set_data() {
    super._set_data(), this.radius.set_from_array(this.glyph.sradius), this.glyph.model.direction == "anticlock" ? (this.start_angle.set_from_prop(this.glyph.start_angle), this.end_angle.set_from_prop(this.glyph.end_angle)) : (this.start_angle.set_from_prop(this.glyph.end_angle), this.end_angle.set_from_prop(this.glyph.start_angle));
  }
  _set_once() {
    super._set_once(), this._heights.set_from_scalar(0);
  }
}
r(h, "__name__", "WedgeGL");
export {
  h as WedgeGL
};
