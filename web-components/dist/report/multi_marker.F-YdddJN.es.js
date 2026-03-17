var y = Object.defineProperty;
var c = (_, t, s) => t in _ ? y(_, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : _[t] = s;
var r = (_, t, s) => c(_, typeof t != "symbol" ? t + "" : t, s);
import { B as g } from "./base_marker.CtSsUvtm.es.js";
import { i as f } from "./buffer.CL49nSux.es.js";
import { M as d } from "./Bokeh.DokG02HM.es.js";
class k extends g {
  constructor(s, a) {
    super(s, a);
    r(this, "glyph");
    // data properties, either all or none are set.
    r(this, "_marker_types");
    r(this, "_unique_marker_types");
    this.glyph = a;
  }
  draw(s, a, l) {
    const e = a.glglyph;
    (e.data_changed || e.data_mapped) && (e.set_data(), e.data_changed = !1, e.data_mapped = !1), this.visuals_changed && (this._set_visuals(), this.visuals_changed = !1);
    const i = e.nvertices, m = e._unique_marker_types.length;
    for (const n of e._unique_marker_types) {
      if (n == null)
        continue;
      let o = i;
      const u = this._show.length, p = this._show.get_sized_array(i);
      if (m > 1 || s.length < i) {
        this._show_all = !1, p.fill(0), o = 0;
        for (let h = 0; h < s.length; h++)
          (m == 1 || e._marker_types.get(h) == n) && (p[s[h]] = 255, o++);
      } else (!this._show_all || u != i) && (this._show_all = !0, p.fill(255));
      this._show.update(), o != 0 && this._draw_one_marker_type(n, l, e);
    }
  }
  _get_visuals() {
    return this.glyph.visuals;
  }
  _set_data() {
    const s = this.nvertices, a = this._centers.get_sized_array(2 * s);
    f(this.glyph.sx, this.glyph.sy, s, g.missing_point, a), this._centers.update(), this._widths.set_from_prop(this.glyph.size), this._angles.set_from_prop(this.glyph.angle), this._marker_types = this.glyph.marker, this._unique_marker_types = this._marker_types.unique().filter((l) => d.valid(l));
  }
  _set_once() {
    super._set_once(), this._heights.set_from_scalar(0), this._auxs.set_from_scalar(0);
  }
}
r(k, "__name__", "MultiMarkerGL");
export {
  k as MultiMarkerGL
};
