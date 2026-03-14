var b = Object.defineProperty;
var F = (p, h, s) => h in p ? b(p, h, { enumerable: !0, configurable: !0, writable: !0, value: s }) : p[h] = s;
var y = (p, h, s) => (F(p, typeof h != "symbol" ? h + "" : h, s), s);
import { U as k, F as z } from "./buffer.ac3ad2d2.es.js";
import { S as L } from "./single_line.87bac3e8.es.js";
import { u as S, b as v } from "./Bokeh.a8fd047d.es.js";
import "./base_line.c2a05a95.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
class B extends L {
  constructor(s, o) {
    super(s, o);
    y(this, "glyph");
    this.glyph = o;
  }
  draw(s, o, l) {
    this._draw_impl(s, l, o.glglyph);
  }
  _get_show_buffer(s, o) {
    const l = o._show;
    let c = l;
    const f = this.glyph.model.mode, n = l.length, { pad_before: g, pad_after: w } = this.glyph.model, r = (g != 0 ? 1 : 0) + (w != 0 ? 1 : 0), t = n - 1 - r, i = f == "center" ? (t + 2) / 3 : (t + 1) / 2;
    if (s.length != i) {
      const _ = l.get_sized_array(n);
      this._show == null && (this._show = new k(this.regl_wrapper));
      const e = this._show.get_sized_array(n);
      e.fill(0);
      const a = f == "center" ? 1 : 0, m = g != 0 ? 1 : 0;
      if (s.length > 1)
        for (let u = 0; u < s.length; u++) {
          const N = s[u], x = s[u + 1], d = N * (2 + a) + 1 + m;
          N == x - 1 && (e[d] = _[d], e[d + 1] = _[d + 1], e[d + 1 + a] = _[d + 1 + a]);
        }
      this._show.update(), c = this._show;
    }
    return c;
  }
  _get_visuals() {
    return this.glyph.visuals.line;
  }
  _set_data_points() {
    const s = this.glyph.sx, o = this.glyph.sy, l = this.glyph.model.mode, { pad_before: c, pad_after: f } = this.glyph.model, n = s.length, g = n > 2 && s[0] == s[n - 1] && o[0] == o[n - 1] && isFinite(s[0]) && isFinite(o[0]), r = (l == "center" ? 3 * n - 2 : 2 * n - 1) + (c != 0 ? 1 : 0) + (f != 0 ? 1 : 0);
    this._points == null && (this._points = new z(this.regl_wrapper));
    const t = this._points.get_sized_array((r + 2) * 2);
    let i = 2;
    if (c != 0) {
      const e = this.glyph.renderer.xscale.s_compute(this.glyph.x[0] - c);
      t[i++] = e, t[i++] = o[0];
    }
    let _ = isFinite(s[0] + o[0]);
    t[i++] = _ ? s[0] : NaN, t[i++] = o[0];
    for (let e = 0; e < n - 1; e++) {
      const a = isFinite(s[e + 1] + o[e + 1]);
      switch (l) {
        case "before":
          t[i++] = _ && a ? s[e] : NaN, t[i++] = o[e + 1], t[i++] = a ? s[e + 1] : NaN, t[i++] = o[e + 1];
          break;
        case "after":
          t[i++] = _ && a ? s[e + 1] : NaN, t[i++] = o[e], t[i++] = a ? s[e + 1] : NaN, t[i++] = o[e + 1];
          break;
        case "center":
          if (_ && a) {
            const m = (s[e] + s[e + 1]) / 2;
            t[i++] = m, t[i++] = o[e], t[i++] = m, t[i++] = o[e + 1], t[i++] = s[e + 1], t[i++] = o[e + 1];
          } else
            t[i++] = _ ? s[e] : NaN, t[i++] = o[e], t[i++] = NaN, t[i++] = NaN, t[i++] = a ? s[e + 1] : NaN, t[i++] = o[e + 1];
          break;
        default:
          S();
      }
      _ = a;
    }
    if (f != 0) {
      const e = this.glyph.renderer.xscale.s_compute(this.glyph.x[n - 1] + f);
      t[i++] = e, t[i++] = o[n - 1];
    }
    return v(i == r * 2 + 2), g ? (t[0] = t[2 * r - 2], t[1] = t[2 * r - 1], t[2 * r + 2] = t[4], t[2 * r + 3] = t[5]) : (t[0] = 0, t[1] = 0, t[2 * r + 2] = 0, t[2 * r + 3] = 0), this._points.update(), t;
  }
}
y(B, "__name__", "StepGL");
export {
  B as StepGL
};
