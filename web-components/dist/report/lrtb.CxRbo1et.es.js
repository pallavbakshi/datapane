var f = Object.defineProperty;
var z = (_, r, s) => r in _ ? f(_, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : _[r] = s;
var d = (_, r, s) => z(_, typeof r != "symbol" ? r + "" : r, s);
import { S as u } from "./single_marker.B8D3z0tZ.es.js";
const { abs: g } = Math;
class x extends u {
  constructor(s, e) {
    super(s, e);
    d(this, "glyph");
    this.glyph = e;
  }
  get marker_type() {
    return this._border_radius_nonzero ? "round_rect" : "rect";
  }
  _set_data() {
    const s = this.nvertices, e = this._centers.get_sized_array(s * 2), c = this._widths.get_sized_array(s), l = this._heights.get_sized_array(s), { sleft: p, sright: b, stop: m, sbottom: y } = this.glyph, { missing_point: h } = u;
    for (let t = 0; t < s; t++) {
      const i = p[t], o = b[t], a = m[t], n = y[t];
      isFinite(i + o + a + n) ? (e[2 * t] = (i + o) / 2, e[2 * t + 1] = (a + n) / 2, c[t] = g(o - i), l[t] = g(a - n)) : (e[2 * t] = h, e[2 * t + 1] = h, c[t] = h, l[t] = h);
    }
    if (this._centers.update(), this._widths.update(), this._heights.update(), this._angles.set_from_scalar(0), this.glyph.border_radius != null) {
      const { top_left: t, top_right: i, bottom_right: o, bottom_left: a } = this.glyph.border_radius;
      this._border_radius = [t, i, o, a], this._border_radius_nonzero = Math.max(...this._border_radius) > 0;
    } else
      this._border_radius = [0, 0, 0, 0], this._border_radius_nonzero = !1;
  }
  _set_once() {
    super._set_once(), this._auxs.set_from_scalar(0);
  }
}
d(x, "__name__", "LRTBGL");
export {
  x as LRTBGL
};
