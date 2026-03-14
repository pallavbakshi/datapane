var x = Object.defineProperty;
var m = (g, h, e) => h in g ? x(g, h, { enumerable: !0, configurable: !0, writable: !0, value: e }) : g[h] = e;
var y = (g, h, e) => (m(g, typeof h != "symbol" ? h + "" : h, e), e);
import { B as b } from "./base_line.c2a05a95.es.js";
import { F as w, U as v } from "./buffer.ac3ad2d2.es.js";
import "./Bokeh.a8fd047d.es.js";
import "../vue.esm-browser.prod.js";
import "./index.95d725f4.es.js";
class z extends b {
  constructor(e, a) {
    super(e, a);
    y(this, "glyph");
    this.glyph = a;
  }
  draw(e, a, f) {
    this.visuals_changed && (this._set_visuals(), this.visuals_changed = !1);
    const n = a.glglyph, r = n.data_changed || n.data_mapped;
    r && n._set_data(n.data_changed), (r && n._is_dashed || this._is_dashed) && n._set_length(), r && (n.data_changed = !1, n.data_mapped = !1);
    const { data_size: _ } = this.glyph;
    let t = null, o = null;
    _ > 1 && ([t, o] = this.regl_wrapper.framebuffer_and_texture);
    let i = 0, c = -1;
    for (const s of e) {
      for (let p = c + 1; p < s; p++) {
        const d = a.sxs.get(p).length;
        i += (d + 2) * 2;
      }
      const l = a.sxs.get(s).length, u = l - 1;
      if (t != null && this.regl_wrapper.clear_framebuffer(t), this._draw_single(n, f, s, i, u, t), t != null) {
        const p = {
          scissor: this.regl_wrapper.scissor,
          viewport: this.regl_wrapper.viewport,
          framebuffer_tex: o
        };
        this.regl_wrapper.accumulate()(p);
      }
      i += (l + 2) * 2, c = s;
    }
  }
  _get_visuals() {
    return this.glyph.visuals.line;
  }
  _set_data(e) {
    const a = this.glyph.data_size, f = this.glyph.sxs.data.length;
    this._points == null && (this._points = new w(this.regl_wrapper));
    const n = this._points.get_sized_array((f + 2 * a) * 2);
    let r = 0;
    for (let _ = 0; _ < a; _++) {
      const t = this.glyph.sxs.get(_), o = this.glyph.sys.get(_), i = t.length, c = n.subarray(r, r + (i + 2) * 2);
      this._set_points_single(c, t, o), r += (i + 2) * 2;
    }
    if (this._points.update(), e) {
      this._show == null && (this._show = new v(this.regl_wrapper));
      const _ = this._show.get_sized_array(f + a);
      let t = 0, o = 0;
      for (let i = 0; i < a; i++) {
        const s = this.glyph.sxs.get(i).length, l = n.subarray(t, t + (s + 2) * 2), u = _.subarray(o, o + s + 1);
        this._set_show_single(u, l), t += (s + 2) * 2, o += s + 1;
      }
      this._show.update();
    }
  }
  _set_length() {
    const e = this.glyph.data_size, a = this.glyph.sxs.data.length, f = this._points.get_array(), n = this._show.get_array();
    this._length_so_far == null && (this._length_so_far = new w(this.regl_wrapper));
    const r = this._length_so_far.get_sized_array(a - e);
    let _ = 0, t = 0, o = 0;
    for (let i = 0; i < e; i++) {
      const s = this.glyph.sxs.get(i).length, l = s - 1, u = f.subarray(_, _ + (s + 2) * 2), p = n.subarray(t, t + s + 1), d = r.subarray(o, o + l);
      this._set_length_single(d, u, p), _ += (s + 2) * 2, t += s + 1, o += l;
    }
    this._length_so_far.update();
  }
}
y(z, "__name__", "MultiLineGL");
export {
  z as MultiLineGL
};
