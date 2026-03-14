var a = Object.defineProperty;
var i = (e, s, t) => s in e ? a(e, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[s] = t;
var r = (e, s, t) => (i(e, typeof s != "symbol" ? s + "" : s, t), t);
import { S as h } from "./sxsy.9ae7042d.es.js";
import { f as o } from "./Bokeh.a8fd047d.es.js";
class p extends h {
  constructor(t, _) {
    super(t, _);
    r(this, "glyph");
    this.glyph = _;
  }
  get size() {
    return this._widths;
  }
  _set_data() {
    super._set_data(), this.size.set_from_array(o(this.glyph.sradius, 2));
  }
  _set_once() {
    super._set_once(), this._heights.set_from_scalar(0);
  }
}
r(p, "__name__", "RadialGL");
export {
  p as R
};
