var w = Object.defineProperty;
var y = (o, i, t) => i in o ? w(o, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[i] = t;
var f = (o, i, t) => (y(o, typeof i != "symbol" ? i + "" : i, t), t);
import { U as u, F as c } from "./buffer.ac3ad2d2.es.js";
import { S as m } from "./single_line.87bac3e8.es.js";
import "./Bokeh.a8fd047d.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
import "./base_line.c2a05a95.es.js";
class d extends m {
  constructor(t, e) {
    super(t, e);
    f(this, "glyph");
    this.glyph = e;
  }
  draw(t, e, n) {
    this._draw_impl(t, n, e.glglyph);
  }
  _get_show_buffer(t, e) {
    const n = e._show;
    let _ = n;
    if (t.length != n.length - 1) {
      const p = this.glyph.parent.nonselection_glyph == this.glyph, a = n.length, l = n.get_sized_array(a);
      this._show == null && (this._show = new u(this.regl_wrapper));
      const r = this._show.get_sized_array(a);
      r.fill(0);
      let s = t[0];
      p && s > 0 && (r[s] = l[s]);
      for (let g = 1; g < t.length; g++) {
        const h = t[g];
        h == s + 1 ? r[h] = l[h] : p && (r[s + 1] = l[s + 1], r[h] = l[h]), s = h;
      }
      p && s != a - 2 && (r[s + 1] = l[s + 1]), this._show.update(), _ = this._show;
    }
    return _;
  }
  _get_visuals() {
    return this.glyph.visuals.line;
  }
  _set_data_points() {
    const t = this.glyph.sx, e = this.glyph.sy, n = t.length;
    this._points == null && (this._points = new c(this.regl_wrapper));
    const _ = this._points.get_sized_array((n + 2) * 2);
    return this._set_points_single(_, t, e), this._points.update(), _;
  }
}
f(d, "__name__", "LineGL");
export {
  d as LineGL
};
