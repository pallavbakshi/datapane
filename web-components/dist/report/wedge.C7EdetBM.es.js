var a = Object.defineProperty;
var h = (e, t, s) => t in e ? a(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var r = (e, t, s) => h(e, typeof t != "symbol" ? t + "" : t, s);
import { S as i } from "./sxsy.BVvl9_ht.es.js";
class n extends i {
  constructor(s, _) {
    super(s, _);
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
r(n, "__name__", "WedgeGL");
export {
  n as WedgeGL
};
