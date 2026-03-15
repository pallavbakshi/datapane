var w = Object.defineProperty;
var y = (h, i, s) => i in h ? w(h, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : h[i] = s;
var f = (h, i, s) => y(h, typeof i != "symbol" ? i + "" : i, s);
import { U as u, F as c } from "./buffer.CbKKF7hz.es.js";
import { S as m } from "./single_line.DYS7chFw.es.js";
class d extends m {
  constructor(s, e) {
    super(s, e);
    f(this, "glyph");
    this.glyph = e;
  }
  draw(s, e, n) {
    this._draw_impl(s, n, e.glglyph);
  }
  _get_show_buffer(s, e) {
    const n = e._show;
    let r = n;
    if (s.length != n.length - 1) {
      const a = this.glyph.parent.nonselection_glyph == this.glyph, p = n.length, l = n.get_sized_array(p);
      this._show == null && (this._show = new u(this.regl_wrapper));
      const o = this._show.get_sized_array(p);
      o.fill(0);
      let t = s[0];
      a && t > 0 && (o[t] = l[t]);
      for (let g = 1; g < s.length; g++) {
        const _ = s[g];
        _ == t + 1 ? o[_] = l[_] : a && (o[t + 1] = l[t + 1], o[_] = l[_]), t = _;
      }
      a && t != p - 2 && (o[t + 1] = l[t + 1]), this._show.update(), r = this._show;
    }
    return r;
  }
  _get_visuals() {
    return this.glyph.visuals.line;
  }
  _set_data_points() {
    const s = this.glyph.sx, e = this.glyph.sy, n = s.length;
    this._points == null && (this._points = new c(this.regl_wrapper));
    const r = this._points.get_sized_array((n + 2) * 2);
    return this._set_points_single(r, s, e), this._points.update(), r;
  }
}
f(d, "__name__", "LineGL");
export {
  d as LineGL
};
