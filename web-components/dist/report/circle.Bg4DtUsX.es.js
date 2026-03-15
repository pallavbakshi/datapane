var a = Object.defineProperty;
var c = (r, e, s) => e in r ? a(r, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[e] = s;
var t = (r, e, s) => c(r, typeof e != "symbol" ? e + "" : e, s);
import { R as o } from "./radial.Dh-6HKPo.es.js";
class i extends o {
  constructor(s, _) {
    super(s, _);
    t(this, "glyph");
    this.glyph = _;
  }
  get marker_type() {
    return "circle";
  }
  _set_once() {
    super._set_once(), this._angles.set_from_scalar(0);
  }
}
t(i, "__name__", "CircleGL");
export {
  i as CircleGL
};
