var a = Object.defineProperty;
var i = (t, s, e) => s in t ? a(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var r = (t, s, e) => i(t, typeof s != "symbol" ? s + "" : s, e);
import { S as h } from "./sxsy.0b_RqnVX.es.js";
import { d as o } from "./Bokeh.BNEVseFJ.es.js";
class p extends h {
  constructor(e, _) {
    super(e, _);
    r(this, "glyph");
    this.glyph = _;
  }
  // TODO: should be 'radius'
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
