var g = Object.defineProperty;
var y = (s, e, t) => e in s ? g(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var r = (s, e, t) => y(s, typeof e != "symbol" ? e + "" : e, t);
import { h as m, e as v, f as p, b } from "./Bokeh.BVL2ab0j.es.js";
class w {
  constructor(e, t) {
    r(this, "regl_wrapper");
    r(this, "glyph");
    r(this, "nvertices", 0);
    r(this, "size_changed", !1);
    r(this, "data_changed", !1);
    r(this, "data_mapped", !1);
    r(this, "visuals_changed", !1);
    this.regl_wrapper = e, this.glyph = t;
  }
  set_data_changed() {
    const { data_size: e } = this.glyph;
    e != this.nvertices && (this.nvertices = e, this.size_changed = !0), this.data_changed = !0;
  }
  set_data_mapped() {
    this.data_mapped = !0;
  }
  set_visuals_changed() {
    this.visuals_changed = !0;
  }
  render(e, t, i) {
    if (t.length == 0)
      return;
    const { width: a, height: _ } = this.glyph.renderer.plot_view.canvas_view.webgl.canvas, { pixel_ratio: l } = this.glyph.renderer.plot_view.canvas_view, n = {
      pixel_ratio: l,
      // Needed to scale antialiasing
      width: a / l,
      height: _ / l
    };
    this.draw(t, i, n);
  }
}
r(w, "__name__", "BaseGLGlyph");
function F(s, e, t, i, a) {
  for (let _ = 0; _ < t; _++) {
    const l = s[_], n = e[_];
    isFinite(l + n) ? (a[2 * _] = l, a[2 * _ + 1] = n) : (a[2 * _] = i, a[2 * _ + 1] = i);
  }
}
const z = { butt: 0, round: 1, square: 2 }, S = { miter: 0, round: 1, bevel: 2 }, E = {
  blank: 0,
  dot: 1,
  ring: 2,
  horizontal_line: 3,
  vertical_line: 4,
  cross: 5,
  horizontal_dash: 6,
  vertical_dash: 7,
  spiral: 8,
  right_diagonal_line: 9,
  left_diagonal_line: 10,
  diagonal_cross: 11,
  right_diagonal_dash: 12,
  left_diagonal_dash: 13,
  horizontal_wave: 14,
  vertical_wave: 15,
  criss_cross: 16
};
function x(s) {
  return E[m[s] ?? s] ?? 0;
}
function N(s) {
  switch (s) {
    case "dash":
      return 1;
    case "dot":
      return 2;
    case "diamond":
    case "diamond_cross":
    case "diamond_dot":
      return 3;
    case "hex":
    case "hex_tile":
      return 4;
    case "square_pin":
      return 5;
    case "inverted_triangle":
    case "ngon":
    case "triangle":
    case "triangle_dot":
      return 6;
    case "triangle_pin":
      return 7;
    case "star":
    case "star_dot":
      return 8;
    default:
      return 0;
  }
}
class d {
  constructor(e, t = 1) {
    r(this, "regl_wrapper");
    r(this, "buffer");
    r(this, "array");
    r(this, "is_scalar");
    // Number of buffer elements per rendered primitive, e.g. for RGBA buffers this is 4
    // as a single color is 4 x uint8 = 32-bit in total.
    r(this, "elements_per_primitive");
    this.regl_wrapper = e, this.is_scalar = !0, this.elements_per_primitive = t;
  }
  // Return array if already know it exists and is the correct length.
  get_array() {
    return b(this.array != null, "WrappedBuffer not yet initialised"), this.array;
  }
  // Return array of correct size, creating it if necessary.
  // Must call update() when finished setting the array values.
  get_sized_array(e) {
    return (this.array == null || this.array.length != e) && (this.array = this.new_array(e)), this.array;
  }
  is_normalized() {
    return !1;
  }
  get length() {
    return this.array != null ? this.array.length : 0;
  }
  set_from_array(e) {
    const t = e.length, i = this.get_sized_array(t);
    for (let a = 0; a < t; a++)
      i[a] = e[a];
    this.update();
  }
  set_from_prop(e) {
    const t = e.is_Scalar() ? 1 : e.length, i = this.get_sized_array(t);
    for (let a = 0; a < t; a++)
      i[a] = e.get(a);
    this.update(e.is_Scalar());
  }
  set_from_scalar(e) {
    this.get_sized_array(1).fill(e), this.update(!0);
  }
  // Return a ReGL AttributeConfig that corresponds to one value for each glyph
  // or the same value for a number of glyphs.  A buffer passed to ReGL for
  // instanced rendering can be used for multiple rendering calls and the
  // important attributes for this are the offset (in bytes) into the buffer
  // and the divisor, which is the number of instances rendered before the
  // offset is advanced to the next buffer element.
  // to_attribute_config() is used for the common case of a single render call
  // per buffer with visual properties that are either scalar or vector.
  // Visual properties of scatter markers are an good example, and scalar_divisor
  // would be the number of markers rendered.
  to_attribute_config(e = 0, t = 1) {
    return {
      buffer: this.buffer,
      divisor: this.is_scalar ? t : 1,
      normalized: this.is_normalized(),
      offset: e * this.bytes_per_element()
    };
  }
  // to_attribute_config_nested() is used for the more complicated case in
  // which the vectorisation is nested, such as rendering multi_lines where
  // each visual property has a single buffer that is used multiple times, once
  // for each of the constituent lines.  Vector properties are therefore
  // constant for each constituent line (composed of multiple rendered
  // instances) but change between lines.
  to_attribute_config_nested(e = 0, t = 1) {
    return {
      buffer: this.buffer,
      divisor: t * this.elements_per_primitive,
      normalized: this.is_normalized(),
      offset: this.is_scalar ? 0 : e * this.bytes_per_element() * this.elements_per_primitive
    };
  }
  // Update ReGL buffer with data contained in array in preparation for passing
  // it to the GPU.  This function must be called after get_sized_array().
  update(e = !1) {
    this.buffer == null ? this.buffer = this.regl_wrapper.buffer({
      usage: "dynamic",
      data: this.array
    }) : this.buffer({ data: this.array }), this.is_scalar = e;
  }
}
r(d, "__name__", "WrappedBuffer");
class B extends d {
  bytes_per_element() {
    return Float32Array.BYTES_PER_ELEMENT;
  }
  new_array(e) {
    return new Float32Array(e);
  }
}
r(B, "__name__", "Float32Buffer");
class u extends d {
  bytes_per_element() {
    return Uint8Array.BYTES_PER_ELEMENT;
  }
  new_array(e) {
    return new Uint8Array(e);
  }
  set_from_color(e, t) {
    const i = e.is_Scalar(), a = i && t.is_Scalar(), _ = a ? 1 : e.length;
    if (!i) {
      const n = e, h = new Uint8Array(n.copy_buffer());
      for (let c = 0; c < _; c++) {
        const o = t.get(c);
        h[4 * c + 3] = v(o * h[4 * c + 3]);
      }
      this.array = h, this.update(a);
      return;
    }
    const l = this.get_sized_array(4 * _);
    for (let n = 0; n < _; n++) {
      const [h, c, o, f] = p(e.get(n), t.get(n));
      l[4 * n] = h, l[4 * n + 1] = c, l[4 * n + 2] = o, l[4 * n + 3] = f;
    }
    this.update(a);
  }
  set_from_hatch_pattern(e) {
    const t = e.is_Scalar() ? 1 : e.length, i = this.get_sized_array(t);
    for (let a = 0; a < t; a++)
      i[a] = x(e.get(a));
    this.update(e.is_Scalar());
  }
  set_from_line_cap(e) {
    const t = e.is_Scalar() ? 1 : e.length, i = this.get_sized_array(t);
    for (let a = 0; a < t; a++)
      i[a] = z[e.get(a)];
    this.update(e.is_Scalar());
  }
  set_from_line_join(e) {
    const t = e.is_Scalar() ? 1 : e.length, i = this.get_sized_array(t);
    for (let a = 0; a < t; a++)
      i[a] = S[e.get(a)];
    this.update(e.is_Scalar());
  }
}
r(u, "__name__", "Uint8Buffer");
class U extends u {
  is_normalized() {
    return !0;
  }
}
r(U, "__name__", "NormalizedUint8Buffer");
export {
  w as B,
  B as F,
  U as N,
  u as U,
  F as i,
  N as m
};
