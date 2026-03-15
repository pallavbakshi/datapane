var uo = Object.defineProperty;
var lo = (i, t, e) => t in i ? uo(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var Ri = (i, t, e) => lo(i, typeof t != "symbol" ? t + "" : t, e);
function B(i, t, e, n) {
  function r(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function a(d) {
      try {
        l(n.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        l(n.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function l(d) {
      d.done ? s(d.value) : r(d.value).then(a, c);
    }
    l((n = n.apply(i, t || [])).next());
  });
}
function In(i) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && i[t], n = 0;
  if (e) return e.call(i);
  if (i && typeof i.length == "number") return {
    next: function() {
      return i && n >= i.length && (i = void 0), { value: i && i[n++], done: !i };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function D(i) {
  return this instanceof D ? (this.v = i, this) : new D(i);
}
function wt(i, t, e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e.apply(i, t || []), r, s = [];
  return r = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", o), r[Symbol.asyncIterator] = function() {
    return this;
  }, r;
  function o(N) {
    return function(Y) {
      return Promise.resolve(Y).then(N, f);
    };
  }
  function a(N, Y) {
    n[N] && (r[N] = function(Gt) {
      return new Promise(function(Li, Ct) {
        s.push([N, Gt, Li, Ct]) > 1 || c(N, Gt);
      });
    }, Y && (r[N] = Y(r[N])));
  }
  function c(N, Y) {
    try {
      l(n[N](Y));
    } catch (Gt) {
      $(s[0][3], Gt);
    }
  }
  function l(N) {
    N.value instanceof D ? Promise.resolve(N.value.v).then(d, f) : $(s[0][2], N);
  }
  function d(N) {
    c("next", N);
  }
  function f(N) {
    c("throw", N);
  }
  function $(N, Y) {
    N(Y), s.shift(), s.length && c(s[0][0], s[0][1]);
  }
}
function $e(i) {
  var t, e;
  return t = {}, n("next"), n("throw", function(r) {
    throw r;
  }), n("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function n(r, s) {
    t[r] = i[r] ? function(o) {
      return (e = !e) ? { value: D(i[r](o)), done: !1 } : s ? s(o) : o;
    } : s;
  }
}
function ce(i) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = i[Symbol.asyncIterator], e;
  return t ? t.call(i) : (i = typeof In == "function" ? In(i) : i[Symbol.iterator](), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
    return this;
  }, e);
  function n(s) {
    e[s] = i[s] && function(o) {
      return new Promise(function(a, c) {
        o = i[s](o), r(a, c, o.done, o.value);
      });
    };
  }
  function r(s, o, a, c) {
    Promise.resolve(c).then(function(l) {
      s({ value: l, done: a });
    }, o);
  }
}
const ho = new TextDecoder("utf-8"), ji = (i) => ho.decode(i), fo = new TextEncoder(), tn = (i) => fo.encode(i), po = (i) => typeof i == "number", yo = (i) => typeof i == "boolean", H = (i) => typeof i == "function", ht = (i) => i != null && Object(i) === i, Ue = (i) => ht(i) && H(i.then), Ni = (i) => ht(i) && H(i[Symbol.iterator]), en = (i) => ht(i) && H(i[Symbol.asyncIterator]), $i = (i) => ht(i) && ht(i.schema), tr = (i) => ht(i) && "done" in i && "value" in i, er = (i) => ht(i) && H(i.stat) && po(i.fd), ir = (i) => ht(i) && nn(i.body), nr = (i) => "_getDOMStream" in i && "_getNodeStream" in i, nn = (i) => ht(i) && H(i.cancel) && H(i.getReader) && !nr(i), rr = (i) => ht(i) && H(i.read) && H(i.pipe) && yo(i.readable) && !nr(i), mo = (i) => ht(i) && H(i.clear) && H(i.bytes) && H(i.position) && H(i.setPosition) && H(i.capacity) && H(i.getBufferIdentifier) && H(i.createLong), rn = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : ArrayBuffer;
function go(i) {
  const t = i[0] ? [i[0]] : [];
  let e, n, r, s;
  for (let o, a, c = 0, l = 0, d = i.length; ++c < d; ) {
    if (o = t[l], a = i[c], !o || !a || o.buffer !== a.buffer || a.byteOffset < o.byteOffset) {
      a && (t[++l] = a);
      continue;
    }
    if ({ byteOffset: e, byteLength: r } = o, { byteOffset: n, byteLength: s } = a, e + r < n || n + s < e) {
      a && (t[++l] = a);
      continue;
    }
    t[l] = new Uint8Array(o.buffer, e, n - e + s);
  }
  return t;
}
function Sn(i, t, e = 0, n = t.byteLength) {
  const r = i.byteLength, s = new Uint8Array(i.buffer, i.byteOffset, r), o = new Uint8Array(t.buffer, t.byteOffset, Math.min(n, r));
  return s.set(o, e), i;
}
function St(i, t) {
  const e = go(i), n = e.reduce((d, f) => d + f.byteLength, 0);
  let r, s, o, a = 0, c = -1;
  const l = Math.min(t || Number.POSITIVE_INFINITY, n);
  for (const d = e.length; ++c < d; ) {
    if (r = e[c], s = r.subarray(0, Math.min(r.length, l - a)), l <= a + s.length) {
      s.length < r.length ? e[c] = r.subarray(s.length) : s.length === r.length && c++, o ? Sn(o, s, a) : o = s;
      break;
    }
    Sn(o || (o = new Uint8Array(l)), s, a), a += s.length;
  }
  return [o || new Uint8Array(0), e.slice(c), n - (o ? o.byteLength : 0)];
}
function x(i, t) {
  let e = tr(t) ? t.value : t;
  return e instanceof i ? i === Uint8Array ? new i(e.buffer, e.byteOffset, e.byteLength) : e : e ? (typeof e == "string" && (e = tn(e)), e instanceof ArrayBuffer ? new i(e) : e instanceof rn ? new i(e) : mo(e) ? x(i, e.bytes()) : ArrayBuffer.isView(e) ? e.byteLength <= 0 ? new i(0) : new i(e.buffer, e.byteOffset, e.byteLength / i.BYTES_PER_ELEMENT) : i.from(e)) : new i(0);
}
const we = (i) => x(Int32Array, i), Bn = (i) => x(BigInt64Array, i), O = (i) => x(Uint8Array, i), Wi = (i) => (i.next(), i);
function* bo(i, t) {
  const e = function* (r) {
    yield r;
  }, n = typeof t == "string" || ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof rn ? e(t) : Ni(t) ? t : e(t);
  return yield* Wi((function* (r) {
    let s = null;
    do
      s = r.next(yield x(i, s));
    while (!s.done);
  })(n[Symbol.iterator]())), new i();
}
const _o = (i) => bo(Uint8Array, i);
function sr(i, t) {
  return wt(this, arguments, function* () {
    if (Ue(t))
      return yield D(yield D(yield* $e(ce(sr(i, yield D(t))))));
    const n = function(o) {
      return wt(this, arguments, function* () {
        yield yield D(yield D(o));
      });
    }, r = function(o) {
      return wt(this, arguments, function* () {
        yield D(yield* $e(ce(Wi((function* (a) {
          let c = null;
          do
            c = a.next(yield c == null ? void 0 : c.value);
          while (!c.done);
        })(o[Symbol.iterator]())))));
      });
    }, s = typeof t == "string" || ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof rn ? n(t) : Ni(t) ? r(t) : en(t) ? t : n(t);
    return yield D(
      // otherwise if AsyncIterable, use it
      yield* $e(ce(Wi((function(o) {
        return wt(this, arguments, function* () {
          let a = null;
          do
            a = yield D(o.next(yield yield D(x(i, a))));
          while (!a.done);
        });
      })(s[Symbol.asyncIterator]()))))
    ), yield D(new i());
  });
}
const vo = (i) => sr(Uint8Array, i);
function wo(i, t) {
  let e = 0;
  const n = i.length;
  if (n !== t.length)
    return !1;
  if (n > 0)
    do
      if (i[e] !== t[e])
        return !1;
    while (++e < n);
  return !0;
}
const nt = {
  fromIterable(i) {
    return ke(Io(i));
  },
  fromAsyncIterable(i) {
    return ke(So(i));
  },
  fromDOMStream(i) {
    return ke(Bo(i));
  },
  fromNodeStream(i) {
    return ke(Ao(i));
  },
  // @ts-ignore
  toDOMStream(i, t) {
    throw new Error('"toDOMStream" not available in this environment');
  },
  // @ts-ignore
  toNodeStream(i, t) {
    throw new Error('"toNodeStream" not available in this environment');
  }
}, ke = (i) => (i.next(), i);
function* Io(i) {
  let t, e = !1, n = [], r, s, o, a = 0;
  function c() {
    return s === "peek" ? St(n, o)[0] : ([r, n, a] = St(n, o), r);
  }
  ({ cmd: s, size: o } = (yield null) || { cmd: "read", size: 0 });
  const l = _o(i)[Symbol.iterator]();
  try {
    do
      if ({ done: t, value: r } = Number.isNaN(o - a) ? l.next() : l.next(o - a), !t && r.byteLength > 0 && (n.push(r), a += r.byteLength), t || o <= a)
        do
          ({ cmd: s, size: o } = yield c());
        while (o < a);
    while (!t);
  } catch (d) {
    (e = !0) && typeof l.throw == "function" && l.throw(d);
  } finally {
    e === !1 && typeof l.return == "function" && l.return(null);
  }
  return null;
}
function So(i) {
  return wt(this, arguments, function* () {
    let e, n = !1, r = [], s, o, a, c = 0;
    function l() {
      return o === "peek" ? St(r, a)[0] : ([s, r, c] = St(r, a), s);
    }
    ({ cmd: o, size: a } = (yield yield D(null)) || { cmd: "read", size: 0 });
    const d = vo(i)[Symbol.asyncIterator]();
    try {
      do
        if ({ done: e, value: s } = Number.isNaN(a - c) ? yield D(d.next()) : yield D(d.next(a - c)), !e && s.byteLength > 0 && (r.push(s), c += s.byteLength), e || a <= c)
          do
            ({ cmd: o, size: a } = yield yield D(l()));
          while (a < c);
      while (!e);
    } catch (f) {
      (n = !0) && typeof d.throw == "function" && (yield D(d.throw(f)));
    } finally {
      n === !1 && typeof d.return == "function" && (yield D(d.return(new Uint8Array(0))));
    }
    return yield D(null);
  });
}
function Bo(i) {
  return wt(this, arguments, function* () {
    let e = !1, n = !1, r = [], s, o, a, c = 0;
    function l() {
      return o === "peek" ? St(r, a)[0] : ([s, r, c] = St(r, a), s);
    }
    ({ cmd: o, size: a } = (yield yield D(null)) || { cmd: "read", size: 0 });
    const d = new Do(i);
    try {
      do
        if ({ done: e, value: s } = Number.isNaN(a - c) ? yield D(d.read()) : yield D(d.read(a - c)), !e && s.byteLength > 0 && (r.push(O(s)), c += s.byteLength), e || a <= c)
          do
            ({ cmd: o, size: a } = yield yield D(l()));
          while (a < c);
      while (!e);
    } catch (f) {
      (n = !0) && (yield D(d.cancel(f)));
    } finally {
      n === !1 ? yield D(d.cancel()) : i.locked && d.releaseLock();
    }
    return yield D(null);
  });
}
class Do {
  constructor(t) {
    this.source = t, this.reader = null, this.reader = this.source.getReader(), this.reader.closed.catch(() => {
    });
  }
  get closed() {
    return this.reader ? this.reader.closed.catch(() => {
    }) : Promise.resolve();
  }
  releaseLock() {
    this.reader && this.reader.releaseLock(), this.reader = null;
  }
  cancel(t) {
    return B(this, void 0, void 0, function* () {
      const { reader: e, source: n } = this;
      e && (yield e.cancel(t).catch(() => {
      })), n && n.locked && this.releaseLock();
    });
  }
  read(t) {
    return B(this, void 0, void 0, function* () {
      if (t === 0)
        return { done: this.reader == null, value: new Uint8Array(0) };
      const e = yield this.reader.read();
      return !e.done && (e.value = O(e)), e;
    });
  }
}
const xi = (i, t) => {
  const e = (r) => n([t, r]);
  let n;
  return [t, e, new Promise((r) => (n = r) && i.once(t, e))];
};
function Ao(i) {
  return wt(this, arguments, function* () {
    const e = [];
    let n = "error", r = !1, s = null, o, a, c = 0, l = [], d;
    function f() {
      return o === "peek" ? St(l, a)[0] : ([d, l, c] = St(l, a), d);
    }
    if ({ cmd: o, size: a } = (yield yield D(null)) || { cmd: "read", size: 0 }, i.isTTY)
      return yield yield D(new Uint8Array(0)), yield D(null);
    try {
      e[0] = xi(i, "end"), e[1] = xi(i, "error");
      do {
        if (e[2] = xi(i, "readable"), [n, s] = yield D(Promise.race(e.map((N) => N[2]))), n === "error")
          break;
        if ((r = n === "end") || (Number.isFinite(a - c) ? (d = O(i.read(a - c)), d.byteLength < a - c && (d = O(i.read()))) : d = O(i.read()), d.byteLength > 0 && (l.push(d), c += d.byteLength)), r || a <= c)
          do
            ({ cmd: o, size: a } = yield yield D(f()));
          while (a < c);
      } while (!r);
    } finally {
      yield D($(e, n === "error" ? s : null));
    }
    return yield D(null);
    function $(N, Y) {
      return d = l = null, new Promise((Gt, Li) => {
        for (const [Ct, co] of N)
          i.off(Ct, co);
        try {
          const Ct = i.destroy;
          Ct && Ct.call(i, Y), Y = void 0;
        } catch (Ct) {
          Y = Ct || Y;
        } finally {
          Y != null ? Li(Y) : Gt();
        }
      });
    }
  });
}
var j;
(function(i) {
  i[i.V1 = 0] = "V1", i[i.V2 = 1] = "V2", i[i.V3 = 2] = "V3", i[i.V4 = 3] = "V4", i[i.V5 = 4] = "V5";
})(j || (j = {}));
var X;
(function(i) {
  i[i.Sparse = 0] = "Sparse", i[i.Dense = 1] = "Dense";
})(X || (X = {}));
var J;
(function(i) {
  i[i.HALF = 0] = "HALF", i[i.SINGLE = 1] = "SINGLE", i[i.DOUBLE = 2] = "DOUBLE";
})(J || (J = {}));
var at;
(function(i) {
  i[i.DAY = 0] = "DAY", i[i.MILLISECOND = 1] = "MILLISECOND";
})(at || (at = {}));
var b;
(function(i) {
  i[i.SECOND = 0] = "SECOND", i[i.MILLISECOND = 1] = "MILLISECOND", i[i.MICROSECOND = 2] = "MICROSECOND", i[i.NANOSECOND = 3] = "NANOSECOND";
})(b || (b = {}));
var Bt;
(function(i) {
  i[i.YEAR_MONTH = 0] = "YEAR_MONTH", i[i.DAY_TIME = 1] = "DAY_TIME", i[i.MONTH_DAY_NANO = 2] = "MONTH_DAY_NANO";
})(Bt || (Bt = {}));
const Ci = 2, bt = 4, Nt = 4, T = 4, Vt = new Int32Array(2), Dn = new Float32Array(Vt.buffer), An = new Float64Array(Vt.buffer), Pe = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
var Yi;
(function(i) {
  i[i.UTF8_BYTES = 1] = "UTF8_BYTES", i[i.UTF16_STRING = 2] = "UTF16_STRING";
})(Yi || (Yi = {}));
let fe = class or {
  /**
   * Create a new ByteBuffer with a given array of bytes (`Uint8Array`)
   */
  constructor(t) {
    this.bytes_ = t, this.position_ = 0, this.text_decoder_ = new TextDecoder();
  }
  /**
   * Create and allocate a new ByteBuffer with a given size.
   */
  static allocate(t) {
    return new or(new Uint8Array(t));
  }
  clear() {
    this.position_ = 0;
  }
  /**
   * Get the underlying `Uint8Array`.
   */
  bytes() {
    return this.bytes_;
  }
  /**
   * Get the buffer's position.
   */
  position() {
    return this.position_;
  }
  /**
   * Set the buffer's position.
   */
  setPosition(t) {
    this.position_ = t;
  }
  /**
   * Get the buffer's capacity.
   */
  capacity() {
    return this.bytes_.length;
  }
  readInt8(t) {
    return this.readUint8(t) << 24 >> 24;
  }
  readUint8(t) {
    return this.bytes_[t];
  }
  readInt16(t) {
    return this.readUint16(t) << 16 >> 16;
  }
  readUint16(t) {
    return this.bytes_[t] | this.bytes_[t + 1] << 8;
  }
  readInt32(t) {
    return this.bytes_[t] | this.bytes_[t + 1] << 8 | this.bytes_[t + 2] << 16 | this.bytes_[t + 3] << 24;
  }
  readUint32(t) {
    return this.readInt32(t) >>> 0;
  }
  readInt64(t) {
    return BigInt.asIntN(64, BigInt(this.readUint32(t)) + (BigInt(this.readUint32(t + 4)) << BigInt(32)));
  }
  readUint64(t) {
    return BigInt.asUintN(64, BigInt(this.readUint32(t)) + (BigInt(this.readUint32(t + 4)) << BigInt(32)));
  }
  readFloat32(t) {
    return Vt[0] = this.readInt32(t), Dn[0];
  }
  readFloat64(t) {
    return Vt[Pe ? 0 : 1] = this.readInt32(t), Vt[Pe ? 1 : 0] = this.readInt32(t + 4), An[0];
  }
  writeInt8(t, e) {
    this.bytes_[t] = e;
  }
  writeUint8(t, e) {
    this.bytes_[t] = e;
  }
  writeInt16(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8;
  }
  writeUint16(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8;
  }
  writeInt32(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8, this.bytes_[t + 2] = e >> 16, this.bytes_[t + 3] = e >> 24;
  }
  writeUint32(t, e) {
    this.bytes_[t] = e, this.bytes_[t + 1] = e >> 8, this.bytes_[t + 2] = e >> 16, this.bytes_[t + 3] = e >> 24;
  }
  writeInt64(t, e) {
    this.writeInt32(t, Number(BigInt.asIntN(32, e))), this.writeInt32(t + 4, Number(BigInt.asIntN(32, e >> BigInt(32))));
  }
  writeUint64(t, e) {
    this.writeUint32(t, Number(BigInt.asUintN(32, e))), this.writeUint32(t + 4, Number(BigInt.asUintN(32, e >> BigInt(32))));
  }
  writeFloat32(t, e) {
    Dn[0] = e, this.writeInt32(t, Vt[0]);
  }
  writeFloat64(t, e) {
    An[0] = e, this.writeInt32(t, Vt[Pe ? 0 : 1]), this.writeInt32(t + 4, Vt[Pe ? 1 : 0]);
  }
  /**
   * Return the file identifier.   Behavior is undefined for FlatBuffers whose
   * schema does not include a file_identifier (likely points at padding or the
   * start of a the root vtable).
   */
  getBufferIdentifier() {
    if (this.bytes_.length < this.position_ + bt + Nt)
      throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
    let t = "";
    for (let e = 0; e < Nt; e++)
      t += String.fromCharCode(this.readInt8(this.position_ + bt + e));
    return t;
  }
  /**
   * Look up a field in the vtable, return an offset into the object, or 0 if the
   * field is not present.
   */
  __offset(t, e) {
    const n = t - this.readInt32(t);
    return e < this.readInt16(n) ? this.readInt16(n + e) : 0;
  }
  /**
   * Initialize any Table-derived type to point to the union at the given offset.
   */
  __union(t, e) {
    return t.bb_pos = e + this.readInt32(e), t.bb = this, t;
  }
  /**
   * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
   * This allocates a new string and converts to wide chars upon each access.
   *
   * To avoid the conversion to string, pass Encoding.UTF8_BYTES as the
   * "optionalEncoding" argument. This is useful for avoiding conversion when
   * the data will just be packaged back up in another FlatBuffer later on.
   *
   * @param offset
   * @param opt_encoding Defaults to UTF16_STRING
   */
  __string(t, e) {
    t += this.readInt32(t);
    const n = this.readInt32(t);
    t += bt;
    const r = this.bytes_.subarray(t, t + n);
    return e === Yi.UTF8_BYTES ? r : this.text_decoder_.decode(r);
  }
  /**
   * Handle unions that can contain string as its member, if a Table-derived type then initialize it,
   * if a string then return a new one
   *
   * WARNING: strings are immutable in JS so we can't change the string that the user gave us, this
   * makes the behaviour of __union_with_string different compared to __union
   */
  __union_with_string(t, e) {
    return typeof t == "string" ? this.__string(e) : this.__union(t, e);
  }
  /**
   * Retrieve the relative offset stored at "offset"
   */
  __indirect(t) {
    return t + this.readInt32(t);
  }
  /**
   * Get the start of data of a vector whose offset is stored at "offset" in this object.
   */
  __vector(t) {
    return t + this.readInt32(t) + bt;
  }
  /**
   * Get the length of a vector whose offset is stored at "offset" in this object.
   */
  __vector_len(t) {
    return this.readInt32(t + this.readInt32(t));
  }
  __has_identifier(t) {
    if (t.length != Nt)
      throw new Error("FlatBuffers: file identifier must be length " + Nt);
    for (let e = 0; e < Nt; e++)
      if (t.charCodeAt(e) != this.readInt8(this.position() + bt + e))
        return !1;
    return !0;
  }
  /**
   * A helper function for generating list for obj api
   */
  createScalarList(t, e) {
    const n = [];
    for (let r = 0; r < e; ++r) {
      const s = t(r);
      s !== null && n.push(s);
    }
    return n;
  }
  /**
   * A helper function for generating list for obj api
   * @param listAccessor function that accepts an index and return data at that index
   * @param listLength listLength
   * @param res result list
   */
  createObjList(t, e) {
    const n = [];
    for (let r = 0; r < e; ++r) {
      const s = t(r);
      s !== null && n.push(s.unpack());
    }
    return n;
  }
}, ar = class cr {
  /**
   * Create a FlatBufferBuilder.
   */
  constructor(t) {
    this.minalign = 1, this.vtable = null, this.vtable_in_use = 0, this.isNested = !1, this.object_start = 0, this.vtables = [], this.vector_num_elems = 0, this.force_defaults = !1, this.string_maps = null, this.text_encoder = new TextEncoder();
    let e;
    t ? e = t : e = 1024, this.bb = fe.allocate(e), this.space = e;
  }
  clear() {
    this.bb.clear(), this.space = this.bb.capacity(), this.minalign = 1, this.vtable = null, this.vtable_in_use = 0, this.isNested = !1, this.object_start = 0, this.vtables = [], this.vector_num_elems = 0, this.force_defaults = !1, this.string_maps = null;
  }
  /**
   * In order to save space, fields that are set to their default value
   * don't get serialized into the buffer. Forcing defaults provides a
   * way to manually disable this optimization.
   *
   * @param forceDefaults true always serializes default values
   */
  forceDefaults(t) {
    this.force_defaults = t;
  }
  /**
   * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
   * called finish(). The actual data starts at the ByteBuffer's current position,
   * not necessarily at 0.
   */
  dataBuffer() {
    return this.bb;
  }
  /**
   * Get the bytes representing the FlatBuffer. Only call this after you've
   * called finish().
   */
  asUint8Array() {
    return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
  }
  /**
   * Prepare to write an element of `size` after `additional_bytes` have been
   * written, e.g. if you write a string, you need to align such the int length
   * field is aligned to 4 bytes, and the string data follows it directly. If all
   * you need to do is alignment, `additional_bytes` will be 0.
   *
   * @param size This is the of the new element to write
   * @param additional_bytes The padding size
   */
  prep(t, e) {
    t > this.minalign && (this.minalign = t);
    const n = ~(this.bb.capacity() - this.space + e) + 1 & t - 1;
    for (; this.space < n + t + e; ) {
      const r = this.bb.capacity();
      this.bb = cr.growByteBuffer(this.bb), this.space += this.bb.capacity() - r;
    }
    this.pad(n);
  }
  pad(t) {
    for (let e = 0; e < t; e++)
      this.bb.writeInt8(--this.space, 0);
  }
  writeInt8(t) {
    this.bb.writeInt8(this.space -= 1, t);
  }
  writeInt16(t) {
    this.bb.writeInt16(this.space -= 2, t);
  }
  writeInt32(t) {
    this.bb.writeInt32(this.space -= 4, t);
  }
  writeInt64(t) {
    this.bb.writeInt64(this.space -= 8, t);
  }
  writeFloat32(t) {
    this.bb.writeFloat32(this.space -= 4, t);
  }
  writeFloat64(t) {
    this.bb.writeFloat64(this.space -= 8, t);
  }
  /**
   * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int8` to add the buffer.
   */
  addInt8(t) {
    this.prep(1, 0), this.writeInt8(t);
  }
  /**
   * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int16` to add the buffer.
   */
  addInt16(t) {
    this.prep(2, 0), this.writeInt16(t);
  }
  /**
   * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int32` to add the buffer.
   */
  addInt32(t) {
    this.prep(4, 0), this.writeInt32(t);
  }
  /**
   * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `int64` to add the buffer.
   */
  addInt64(t) {
    this.prep(8, 0), this.writeInt64(t);
  }
  /**
   * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `float32` to add the buffer.
   */
  addFloat32(t) {
    this.prep(4, 0), this.writeFloat32(t);
  }
  /**
   * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
   * @param value The `float64` to add the buffer.
   */
  addFloat64(t) {
    this.prep(8, 0), this.writeFloat64(t);
  }
  addFieldInt8(t, e, n) {
    (this.force_defaults || e != n) && (this.addInt8(e), this.slot(t));
  }
  addFieldInt16(t, e, n) {
    (this.force_defaults || e != n) && (this.addInt16(e), this.slot(t));
  }
  addFieldInt32(t, e, n) {
    (this.force_defaults || e != n) && (this.addInt32(e), this.slot(t));
  }
  addFieldInt64(t, e, n) {
    (this.force_defaults || e !== n) && (this.addInt64(e), this.slot(t));
  }
  addFieldFloat32(t, e, n) {
    (this.force_defaults || e != n) && (this.addFloat32(e), this.slot(t));
  }
  addFieldFloat64(t, e, n) {
    (this.force_defaults || e != n) && (this.addFloat64(e), this.slot(t));
  }
  addFieldOffset(t, e, n) {
    (this.force_defaults || e != n) && (this.addOffset(e), this.slot(t));
  }
  /**
   * Structs are stored inline, so nothing additional is being added. `d` is always 0.
   */
  addFieldStruct(t, e, n) {
    e != n && (this.nested(e), this.slot(t));
  }
  /**
   * Structures are always stored inline, they need to be created right
   * where they're used.  You'll get this assertion failure if you
   * created it elsewhere.
   */
  nested(t) {
    if (t != this.offset())
      throw new TypeError("FlatBuffers: struct must be serialized inline.");
  }
  /**
   * Should not be creating any other object, string or vector
   * while an object is being constructed
   */
  notNested() {
    if (this.isNested)
      throw new TypeError("FlatBuffers: object serialization must not be nested.");
  }
  /**
   * Set the current vtable at `voffset` to the current location in the buffer.
   */
  slot(t) {
    this.vtable !== null && (this.vtable[t] = this.offset());
  }
  /**
   * @returns Offset relative to the end of the buffer.
   */
  offset() {
    return this.bb.capacity() - this.space;
  }
  /**
   * Doubles the size of the backing ByteBuffer and copies the old data towards
   * the end of the new buffer (since we build the buffer backwards).
   *
   * @param bb The current buffer with the existing data
   * @returns A new byte buffer with the old data copied
   * to it. The data is located at the end of the buffer.
   *
   * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
   * it a uint8Array we need to suppress the type check:
   * @suppress {checkTypes}
   */
  static growByteBuffer(t) {
    const e = t.capacity();
    if (e & 3221225472)
      throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
    const n = e << 1, r = fe.allocate(n);
    return r.setPosition(n - e), r.bytes().set(t.bytes(), n - e), r;
  }
  /**
   * Adds on offset, relative to where it will be written.
   *
   * @param offset The offset to add.
   */
  addOffset(t) {
    this.prep(bt, 0), this.writeInt32(this.offset() - t + bt);
  }
  /**
   * Start encoding a new object in the buffer.  Users will not usually need to
   * call this directly. The FlatBuffers compiler will generate helper methods
   * that call this method internally.
   */
  startObject(t) {
    this.notNested(), this.vtable == null && (this.vtable = []), this.vtable_in_use = t;
    for (let e = 0; e < t; e++)
      this.vtable[e] = 0;
    this.isNested = !0, this.object_start = this.offset();
  }
  /**
   * Finish off writing the object that is under construction.
   *
   * @returns The offset to the object inside `dataBuffer`
   */
  endObject() {
    if (this.vtable == null || !this.isNested)
      throw new Error("FlatBuffers: endObject called without startObject");
    this.addInt32(0);
    const t = this.offset();
    let e = this.vtable_in_use - 1;
    for (; e >= 0 && this.vtable[e] == 0; e--)
      ;
    const n = e + 1;
    for (; e >= 0; e--)
      this.addInt16(this.vtable[e] != 0 ? t - this.vtable[e] : 0);
    const r = 2;
    this.addInt16(t - this.object_start);
    const s = (n + r) * Ci;
    this.addInt16(s);
    let o = 0;
    const a = this.space;
    t: for (e = 0; e < this.vtables.length; e++) {
      const c = this.bb.capacity() - this.vtables[e];
      if (s == this.bb.readInt16(c)) {
        for (let l = Ci; l < s; l += Ci)
          if (this.bb.readInt16(a + l) != this.bb.readInt16(c + l))
            continue t;
        o = this.vtables[e];
        break;
      }
    }
    return o ? (this.space = this.bb.capacity() - t, this.bb.writeInt32(this.space, o - t)) : (this.vtables.push(this.offset()), this.bb.writeInt32(this.bb.capacity() - t, this.offset() - t)), this.isNested = !1, t;
  }
  /**
   * Finalize a buffer, poiting to the given `root_table`.
   */
  finish(t, e, n) {
    const r = n ? T : 0;
    if (e) {
      const s = e;
      if (this.prep(this.minalign, bt + Nt + r), s.length != Nt)
        throw new TypeError("FlatBuffers: file identifier must be length " + Nt);
      for (let o = Nt - 1; o >= 0; o--)
        this.writeInt8(s.charCodeAt(o));
    }
    this.prep(this.minalign, bt + r), this.addOffset(t), r && this.addInt32(this.bb.capacity() - this.space), this.bb.setPosition(this.space);
  }
  /**
   * Finalize a size prefixed buffer, pointing to the given `root_table`.
   */
  finishSizePrefixed(t, e) {
    this.finish(t, e, !0);
  }
  /**
   * This checks a required field has been set in a given table that has
   * just been constructed.
   */
  requiredField(t, e) {
    const n = this.bb.capacity() - t, r = n - this.bb.readInt32(n);
    if (!(e < this.bb.readInt16(r) && this.bb.readInt16(r + e) != 0))
      throw new TypeError("FlatBuffers: field " + e + " must be set");
  }
  /**
   * Start a new array/vector of objects.  Users usually will not call
   * this directly. The FlatBuffers compiler will create a start/end
   * method for vector types in generated code.
   *
   * @param elem_size The size of each element in the array
   * @param num_elems The number of elements in the array
   * @param alignment The alignment of the array
   */
  startVector(t, e, n) {
    this.notNested(), this.vector_num_elems = e, this.prep(bt, t * e), this.prep(n, t * e);
  }
  /**
   * Finish off the creation of an array and all its elements. The array must be
   * created with `startVector`.
   *
   * @returns The offset at which the newly created array
   * starts.
   */
  endVector() {
    return this.writeInt32(this.vector_num_elems), this.offset();
  }
  /**
   * Encode the string `s` in the buffer using UTF-8. If the string passed has
   * already been seen, we return the offset of the already written string
   *
   * @param s The string to encode
   * @return The offset in the buffer where the encoded string starts
   */
  createSharedString(t) {
    if (!t)
      return 0;
    if (this.string_maps || (this.string_maps = /* @__PURE__ */ new Map()), this.string_maps.has(t))
      return this.string_maps.get(t);
    const e = this.createString(t);
    return this.string_maps.set(t, e), e;
  }
  /**
   * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
   * instead of a string, it is assumed to contain valid UTF-8 encoded data.
   *
   * @param s The string to encode
   * @return The offset in the buffer where the encoded string starts
   */
  createString(t) {
    if (t == null)
      return 0;
    let e;
    return t instanceof Uint8Array ? e = t : e = this.text_encoder.encode(t), this.addInt8(0), this.startVector(1, e.length, 1), this.bb.setPosition(this.space -= e.length), this.bb.bytes().set(e, this.space), this.endVector();
  }
  /**
   * Create a byte vector.
   *
   * @param v The bytes to add
   * @returns The offset in the buffer where the byte vector starts
   */
  createByteVector(t) {
    return t == null ? 0 : (this.startVector(1, t.length, 1), this.bb.setPosition(this.space -= t.length), this.bb.bytes().set(t, this.space), this.endVector());
  }
  /**
   * A helper function to pack an object
   *
   * @returns offset of obj
   */
  createObjectOffset(t) {
    return t === null ? 0 : typeof t == "string" ? this.createString(t) : t.pack(this);
  }
  /**
   * A helper function to pack a list of object
   *
   * @returns list of offsets of each non null object
   */
  createObjectOffsetList(t) {
    const e = [];
    for (let n = 0; n < t.length; ++n) {
      const r = t[n];
      if (r !== null)
        e.push(this.createObjectOffset(r));
      else
        throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");
    }
    return e;
  }
  createStructOffsetList(t, e) {
    return e(this, t.length), this.createObjectOffsetList(t.slice().reverse()), this.endVector();
  }
};
var Qe;
(function(i) {
  i[i.BUFFER = 0] = "BUFFER";
})(Qe || (Qe = {}));
var ti;
(function(i) {
  i[i.LZ4_FRAME = 0] = "LZ4_FRAME", i[i.ZSTD = 1] = "ZSTD";
})(ti || (ti = {}));
class kt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBodyCompression(t, e) {
    return (e || new kt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBodyCompression(t, e) {
    return t.setPosition(t.position() + T), (e || new kt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Compressor library.
   * For LZ4_FRAME, each compressed buffer must consist of a single frame.
   */
  codec() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt8(this.bb_pos + t) : ti.LZ4_FRAME;
  }
  /**
   * Indicates the way the record batch body was compressed
   */
  method() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt8(this.bb_pos + t) : Qe.BUFFER;
  }
  static startBodyCompression(t) {
    t.startObject(2);
  }
  static addCodec(t, e) {
    t.addFieldInt8(0, e, ti.LZ4_FRAME);
  }
  static addMethod(t, e) {
    t.addFieldInt8(1, e, Qe.BUFFER);
  }
  static endBodyCompression(t) {
    return t.endObject();
  }
  static createBodyCompression(t, e, n) {
    return kt.startBodyCompression(t), kt.addCodec(t, e), kt.addMethod(t, n), kt.endBodyCompression(t);
  }
}
class ur {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * The relative offset into the shared memory page where the bytes for this
   * buffer starts
   */
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * The absolute length (in bytes) of the memory buffer. The memory is found
   * from offset (inclusive) to offset + length (non-inclusive). When building
   * messages using the encapsulated IPC message, padding bytes may be written
   * after a buffer, but such padding bytes do not need to be accounted for in
   * the size here.
   */
  length() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createBuffer(t, e, n) {
    return t.prep(8, 16), t.writeInt64(BigInt(n ?? 0)), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}
let lr = class {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * The number of value slots in the Arrow array at this level of a nested
   * tree
   */
  length() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * The number of observed nulls. Fields with null_count == 0 may choose not
   * to write their physical validity bitmap out as a materialized buffer,
   * instead setting the length of the bitmap buffer to 0.
   */
  nullCount() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createFieldNode(t, e, n) {
    return t.prep(8, 16), t.writeInt64(BigInt(n ?? 0)), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}, At = class Ji {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsRecordBatch(t, e) {
    return (e || new Ji()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRecordBatch(t, e) {
    return t.setPosition(t.position() + T), (e || new Ji()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * number of records / rows. The arrays in the batch should all have this
   * length
   */
  length() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  /**
   * Nodes correspond to the pre-ordered flattened logical schema
   */
  nodes(t, e) {
    const n = this.bb.__offset(this.bb_pos, 6);
    return n ? (e || new lr()).__init(this.bb.__vector(this.bb_pos + n) + t * 16, this.bb) : null;
  }
  nodesLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Buffers correspond to the pre-ordered flattened buffer tree
   *
   * The number of buffers appended to this list depends on the schema. For
   * example, most primitive arrays will have 2 buffers, 1 for the validity
   * bitmap and 1 for the values. For struct arrays, there will only be a
   * single buffer for the validity (nulls) bitmap
   */
  buffers(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new ur()).__init(this.bb.__vector(this.bb_pos + n) + t * 16, this.bb) : null;
  }
  buffersLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Optional compression of the message body
   */
  compression(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? (t || new kt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  static startRecordBatch(t) {
    t.startObject(4);
  }
  static addLength(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addNodes(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static startNodesVector(t, e) {
    t.startVector(16, e, 8);
  }
  static addBuffers(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static startBuffersVector(t, e) {
    t.startVector(16, e, 8);
  }
  static addCompression(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endRecordBatch(t) {
    return t.endObject();
  }
}, qt = class Hi {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDictionaryBatch(t, e) {
    return (e || new Hi()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDictionaryBatch(t, e) {
    return t.setPosition(t.position() + T), (e || new Hi()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  data(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new At()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * If isDelta is true the values in the dictionary are to be appended to a
   * dictionary with the indicated id. If isDelta is false this dictionary
   * should replace the existing dictionary.
   */
  isDelta() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startDictionaryBatch(t) {
    t.startObject(3);
  }
  static addId(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addData(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addIsDelta(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endDictionaryBatch(t) {
    return t.endObject();
  }
};
var pe;
(function(i) {
  i[i.Little = 0] = "Little", i[i.Big = 1] = "Big";
})(pe || (pe = {}));
var ei;
(function(i) {
  i[i.DenseArray = 0] = "DenseArray";
})(ei || (ei = {}));
class et {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsInt(t, e) {
    return (e || new et()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInt(t, e) {
    return t.setPosition(t.position() + T), (e || new et()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isSigned() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startInt(t) {
    t.startObject(2);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsSigned(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endInt(t) {
    return t.endObject();
  }
  static createInt(t, e, n) {
    return et.startInt(t), et.addBitWidth(t, e), et.addIsSigned(t, n), et.endInt(t);
  }
}
class Mt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDictionaryEncoding(t, e) {
    return (e || new Mt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDictionaryEncoding(t, e) {
    return t.setPosition(t.position() + T), (e || new Mt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * The known dictionary id in the application where this data is used. In
   * the file or streaming formats, the dictionary ids are found in the
   * DictionaryBatch messages
   */
  id() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  /**
   * The dictionary indices are constrained to be non-negative integers. If
   * this field is null, the indices must be signed int32. To maximize
   * cross-language compatibility and performance, implementations are
   * recommended to prefer signed integer types over unsigned integer types
   * and to avoid uint64 indices unless they are required by an application.
   */
  indexType(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new et()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * By default, dictionaries are not ordered, or the order does not have
   * semantic meaning. In some statistical, applications, dictionary-encoding
   * is used to represent ordered categorical data, and we provide a way to
   * preserve that metadata here
   */
  isOrdered() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  dictionaryKind() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt16(this.bb_pos + t) : ei.DenseArray;
  }
  static startDictionaryEncoding(t) {
    t.startObject(4);
  }
  static addId(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addIndexType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addIsOrdered(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addDictionaryKind(t, e) {
    t.addFieldInt16(3, e, ei.DenseArray);
  }
  static endDictionaryEncoding(t) {
    return t.endObject();
  }
}
class W {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsKeyValue(t, e) {
    return (e || new W()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsKeyValue(t, e) {
    return t.setPosition(t.position() + T), (e || new W()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key(t) {
    const e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  value(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  static startKeyValue(t) {
    t.startObject(2);
  }
  static addKey(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addValue(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endKeyValue(t) {
    return t.endObject();
  }
  static createKeyValue(t, e, n) {
    return W.startKeyValue(t), W.addKey(t, e), W.addValue(t, n), W.endKeyValue(t);
  }
}
let Fn = class Ie {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBinary(t, e) {
    return (e || new Ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBinary(t, e) {
    return t.setPosition(t.position() + T), (e || new Ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startBinary(t) {
    t.startObject(0);
  }
  static endBinary(t) {
    return t.endObject();
  }
  static createBinary(t) {
    return Ie.startBinary(t), Ie.endBinary(t);
  }
}, On = class Se {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBool(t, e) {
    return (e || new Se()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBool(t, e) {
    return t.setPosition(t.position() + T), (e || new Se()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startBool(t) {
    t.startObject(0);
  }
  static endBool(t) {
    return t.endObject();
  }
  static createBool(t) {
    return Se.startBool(t), Se.endBool(t);
  }
}, We = class Xt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDate(t, e) {
    return (e || new Xt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDate(t, e) {
    return t.setPosition(t.position() + T), (e || new Xt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : at.MILLISECOND;
  }
  static startDate(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, at.MILLISECOND);
  }
  static endDate(t) {
    return t.endObject();
  }
  static createDate(t, e) {
    return Xt.startDate(t), Xt.addUnit(t, e), Xt.endDate(t);
  }
}, Qt = class zt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDecimal(t, e) {
    return (e || new zt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDecimal(t, e) {
    return t.setPosition(t.position() + T), (e || new zt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Total number of decimal digits
   */
  precision() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  /**
   * Number of digits after the decimal point "."
   */
  scale() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  /**
   * Number of bits per value. The only accepted widths are 128 and 256.
   * We use bitWidth for consistency with Int::bitWidth.
   */
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 128;
  }
  static startDecimal(t) {
    t.startObject(3);
  }
  static addPrecision(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addScale(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(2, e, 128);
  }
  static endDecimal(t) {
    return t.endObject();
  }
  static createDecimal(t, e, n, r) {
    return zt.startDecimal(t), zt.addPrecision(t, e), zt.addScale(t, n), zt.addBitWidth(t, r), zt.endDecimal(t);
  }
}, Ye = class te {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDuration(t, e) {
    return (e || new te()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDuration(t, e) {
    return t.setPosition(t.position() + T), (e || new te()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : b.MILLISECOND;
  }
  static startDuration(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, b.MILLISECOND);
  }
  static endDuration(t) {
    return t.endObject();
  }
  static createDuration(t, e) {
    return te.startDuration(t), te.addUnit(t, e), te.endDuration(t);
  }
}, Je = class ee {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFixedSizeBinary(t, e) {
    return (e || new ee()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedSizeBinary(t, e) {
    return t.setPosition(t.position() + T), (e || new ee()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Number of bytes per value
   */
  byteWidth() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startFixedSizeBinary(t) {
    t.startObject(1);
  }
  static addByteWidth(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endFixedSizeBinary(t) {
    return t.endObject();
  }
  static createFixedSizeBinary(t, e) {
    return ee.startFixedSizeBinary(t), ee.addByteWidth(t, e), ee.endFixedSizeBinary(t);
  }
}, He = class ie {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFixedSizeList(t, e) {
    return (e || new ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedSizeList(t, e) {
    return t.setPosition(t.position() + T), (e || new ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Number of list items per value
   */
  listSize() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startFixedSizeList(t) {
    t.startObject(1);
  }
  static addListSize(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endFixedSizeList(t) {
    return t.endObject();
  }
  static createFixedSizeList(t, e) {
    return ie.startFixedSizeList(t), ie.addListSize(t, e), ie.endFixedSizeList(t);
  }
};
class _t {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFloatingPoint(t, e) {
    return (e || new _t()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFloatingPoint(t, e) {
    return t.setPosition(t.position() + T), (e || new _t()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  precision() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : J.HALF;
  }
  static startFloatingPoint(t) {
    t.startObject(1);
  }
  static addPrecision(t, e) {
    t.addFieldInt16(0, e, J.HALF);
  }
  static endFloatingPoint(t) {
    return t.endObject();
  }
  static createFloatingPoint(t, e) {
    return _t.startFloatingPoint(t), _t.addPrecision(t, e), _t.endFloatingPoint(t);
  }
}
class vt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsInterval(t, e) {
    return (e || new vt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInterval(t, e) {
    return t.setPosition(t.position() + T), (e || new vt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : Bt.YEAR_MONTH;
  }
  static startInterval(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, Bt.YEAR_MONTH);
  }
  static endInterval(t) {
    return t.endObject();
  }
  static createInterval(t, e) {
    return vt.startInterval(t), vt.addUnit(t, e), vt.endInterval(t);
  }
}
let Nn = class Be {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsLargeBinary(t, e) {
    return (e || new Be()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLargeBinary(t, e) {
    return t.setPosition(t.position() + T), (e || new Be()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startLargeBinary(t) {
    t.startObject(0);
  }
  static endLargeBinary(t) {
    return t.endObject();
  }
  static createLargeBinary(t) {
    return Be.startLargeBinary(t), Be.endLargeBinary(t);
  }
}, Mn = class De {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsLargeUtf8(t, e) {
    return (e || new De()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLargeUtf8(t, e) {
    return t.setPosition(t.position() + T), (e || new De()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startLargeUtf8(t) {
    t.startObject(0);
  }
  static endLargeUtf8(t) {
    return t.endObject();
  }
  static createLargeUtf8(t) {
    return De.startLargeUtf8(t), De.endLargeUtf8(t);
  }
}, Un = class Ae {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsList(t, e) {
    return (e || new Ae()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsList(t, e) {
    return t.setPosition(t.position() + T), (e || new Ae()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startList(t) {
    t.startObject(0);
  }
  static endList(t) {
    return t.endObject();
  }
  static createList(t) {
    return Ae.startList(t), Ae.endList(t);
  }
}, Ke = class ne {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsMap(t, e) {
    return (e || new ne()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMap(t, e) {
    return t.setPosition(t.position() + T), (e || new ne()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * Set to true if the keys within each value are sorted
   */
  keysSorted() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  static startMap(t) {
    t.startObject(1);
  }
  static addKeysSorted(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endMap(t) {
    return t.endObject();
  }
  static createMap(t, e) {
    return ne.startMap(t), ne.addKeysSorted(t, e), ne.endMap(t);
  }
}, Tn = class Fe {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsNull(t, e) {
    return (e || new Fe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNull(t, e) {
    return t.setPosition(t.position() + T), (e || new Fe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startNull(t) {
    t.startObject(0);
  }
  static endNull(t) {
    return t.endObject();
  }
  static createNull(t) {
    return Fe.startNull(t), Fe.endNull(t);
  }
};
class Jt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsStruct_(t, e) {
    return (e || new Jt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStruct_(t, e) {
    return t.setPosition(t.position() + T), (e || new Jt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startStruct_(t) {
    t.startObject(0);
  }
  static endStruct_(t) {
    return t.endObject();
  }
  static createStruct_(t) {
    return Jt.startStruct_(t), Jt.endStruct_(t);
  }
}
class rt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsTime(t, e) {
    return (e || new rt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTime(t, e) {
    return t.setPosition(t.position() + T), (e || new rt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : b.MILLISECOND;
  }
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 32;
  }
  static startTime(t) {
    t.startObject(2);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, b.MILLISECOND);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(1, e, 32);
  }
  static endTime(t) {
    return t.endObject();
  }
  static createTime(t, e, n) {
    return rt.startTime(t), rt.addUnit(t, e), rt.addBitWidth(t, n), rt.endTime(t);
  }
}
class st {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsTimestamp(t, e) {
    return (e || new st()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimestamp(t, e) {
    return t.setPosition(t.position() + T), (e || new st()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : b.SECOND;
  }
  timezone(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  static startTimestamp(t) {
    t.startObject(2);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, b.SECOND);
  }
  static addTimezone(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTimestamp(t) {
    return t.endObject();
  }
  static createTimestamp(t, e, n) {
    return st.startTimestamp(t), st.addUnit(t, e), st.addTimezone(t, n), st.endTimestamp(t);
  }
}
class q {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsUnion(t, e) {
    return (e || new q()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnion(t, e) {
    return t.setPosition(t.position() + T), (e || new q()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mode() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : X.Sparse;
  }
  typeIds(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4) : 0;
  }
  typeIdsLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  typeIdsArray() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t)) : null;
  }
  static startUnion(t) {
    t.startObject(2);
  }
  static addMode(t, e) {
    t.addFieldInt16(0, e, X.Sparse);
  }
  static addTypeIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createTypeIdsVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addInt32(e[n]);
    return t.endVector();
  }
  static startTypeIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endUnion(t) {
    return t.endObject();
  }
  static createUnion(t, e, n) {
    return q.startUnion(t), q.addMode(t, e), q.addTypeIds(t, n), q.endUnion(t);
  }
}
let Ln = class Oe {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsUtf8(t, e) {
    return (e || new Oe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUtf8(t, e) {
    return t.setPosition(t.position() + T), (e || new Oe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startUtf8(t) {
    t.startObject(0);
  }
  static endUtf8(t) {
    return t.endObject();
  }
  static createUtf8(t) {
    return Oe.startUtf8(t), Oe.endUtf8(t);
  }
};
var E;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Null = 1] = "Null", i[i.Int = 2] = "Int", i[i.FloatingPoint = 3] = "FloatingPoint", i[i.Binary = 4] = "Binary", i[i.Utf8 = 5] = "Utf8", i[i.Bool = 6] = "Bool", i[i.Decimal = 7] = "Decimal", i[i.Date = 8] = "Date", i[i.Time = 9] = "Time", i[i.Timestamp = 10] = "Timestamp", i[i.Interval = 11] = "Interval", i[i.List = 12] = "List", i[i.Struct_ = 13] = "Struct_", i[i.Union = 14] = "Union", i[i.FixedSizeBinary = 15] = "FixedSizeBinary", i[i.FixedSizeList = 16] = "FixedSizeList", i[i.Map = 17] = "Map", i[i.Duration = 18] = "Duration", i[i.LargeBinary = 19] = "LargeBinary", i[i.LargeUtf8 = 20] = "LargeUtf8", i[i.LargeList = 21] = "LargeList", i[i.RunEndEncoded = 22] = "RunEndEncoded";
})(E || (E = {}));
let it = class Ge {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsField(t, e) {
    return (e || new Ge()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsField(t, e) {
    return t.setPosition(t.position() + T), (e || new Ge()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    const e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  /**
   * Whether or not this field can contain nulls. Should be true in general.
   */
  nullable() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  typeType() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : E.NONE;
  }
  /**
   * This is the type of the decoded value if the field is dictionary encoded.
   */
  type(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : null;
  }
  /**
   * Present only if the field is dictionary encoded.
   */
  dictionary(t) {
    const e = this.bb.__offset(this.bb_pos, 12);
    return e ? (t || new Mt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  /**
   * children apply only to nested data types like Struct, List and Union. For
   * primitive types children will have length 0.
   */
  children(t, e) {
    const n = this.bb.__offset(this.bb_pos, 14);
    return n ? (e || new Ge()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  childrenLength() {
    const t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * User-defined metadata
   */
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 16);
    return n ? (e || new W()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startField(t) {
    t.startObject(7);
  }
  static addName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addNullable(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addTypeType(t, e) {
    t.addFieldInt8(2, e, E.NONE);
  }
  static addType(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addDictionary(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addChildren(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createChildrenVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startChildrenVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endField(t) {
    return t.endObject();
  }
}, mt = class Dt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsSchema(t, e) {
    return (e || new Dt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSchema(t, e) {
    return t.setPosition(t.position() + T), (e || new Dt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  /**
   * endianness of the buffer
   * it is Little Endian by default
   * if endianness doesn't match the underlying system then the vectors need to be converted
   */
  endianness() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : pe.Little;
  }
  fields(t, e) {
    const n = this.bb.__offset(this.bb_pos, 6);
    return n ? (e || new it()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  fieldsLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new W()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * Features used in the stream/file.
   */
  features(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt64(this.bb.__vector(this.bb_pos + e) + t * 8) : BigInt(0);
  }
  featuresLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSchema(t) {
    t.startObject(4);
  }
  static addEndianness(t, e) {
    t.addFieldInt16(0, e, pe.Little);
  }
  static addFields(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createFieldsVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startFieldsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addFeatures(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createFeaturesVector(t, e) {
    t.startVector(8, e.length, 8);
    for (let n = e.length - 1; n >= 0; n--)
      t.addInt64(e[n]);
    return t.endVector();
  }
  static startFeaturesVector(t, e) {
    t.startVector(8, e, 8);
  }
  static endSchema(t) {
    return t.endObject();
  }
  static finishSchemaBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedSchemaBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
  static createSchema(t, e, n, r, s) {
    return Dt.startSchema(t), Dt.addEndianness(t, e), Dt.addFields(t, n), Dt.addCustomMetadata(t, r), Dt.addFeatures(t, s), Dt.endSchema(t);
  }
};
var M;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Schema = 1] = "Schema", i[i.DictionaryBatch = 2] = "DictionaryBatch", i[i.RecordBatch = 3] = "RecordBatch", i[i.Tensor = 4] = "Tensor", i[i.SparseTensor = 5] = "SparseTensor";
})(M || (M = {}));
var u;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Null = 1] = "Null", i[i.Int = 2] = "Int", i[i.Float = 3] = "Float", i[i.Binary = 4] = "Binary", i[i.Utf8 = 5] = "Utf8", i[i.Bool = 6] = "Bool", i[i.Decimal = 7] = "Decimal", i[i.Date = 8] = "Date", i[i.Time = 9] = "Time", i[i.Timestamp = 10] = "Timestamp", i[i.Interval = 11] = "Interval", i[i.List = 12] = "List", i[i.Struct = 13] = "Struct", i[i.Union = 14] = "Union", i[i.FixedSizeBinary = 15] = "FixedSizeBinary", i[i.FixedSizeList = 16] = "FixedSizeList", i[i.Map = 17] = "Map", i[i.Duration = 18] = "Duration", i[i.LargeBinary = 19] = "LargeBinary", i[i.LargeUtf8 = 20] = "LargeUtf8", i[i.Dictionary = -1] = "Dictionary", i[i.Int8 = -2] = "Int8", i[i.Int16 = -3] = "Int16", i[i.Int32 = -4] = "Int32", i[i.Int64 = -5] = "Int64", i[i.Uint8 = -6] = "Uint8", i[i.Uint16 = -7] = "Uint16", i[i.Uint32 = -8] = "Uint32", i[i.Uint64 = -9] = "Uint64", i[i.Float16 = -10] = "Float16", i[i.Float32 = -11] = "Float32", i[i.Float64 = -12] = "Float64", i[i.DateDay = -13] = "DateDay", i[i.DateMillisecond = -14] = "DateMillisecond", i[i.TimestampSecond = -15] = "TimestampSecond", i[i.TimestampMillisecond = -16] = "TimestampMillisecond", i[i.TimestampMicrosecond = -17] = "TimestampMicrosecond", i[i.TimestampNanosecond = -18] = "TimestampNanosecond", i[i.TimeSecond = -19] = "TimeSecond", i[i.TimeMillisecond = -20] = "TimeMillisecond", i[i.TimeMicrosecond = -21] = "TimeMicrosecond", i[i.TimeNanosecond = -22] = "TimeNanosecond", i[i.DenseUnion = -23] = "DenseUnion", i[i.SparseUnion = -24] = "SparseUnion", i[i.IntervalDayTime = -25] = "IntervalDayTime", i[i.IntervalYearMonth = -26] = "IntervalYearMonth", i[i.DurationSecond = -27] = "DurationSecond", i[i.DurationMillisecond = -28] = "DurationMillisecond", i[i.DurationMicrosecond = -29] = "DurationMicrosecond", i[i.DurationNanosecond = -30] = "DurationNanosecond";
})(u || (u = {}));
var Ft;
(function(i) {
  i[i.OFFSET = 0] = "OFFSET", i[i.DATA = 1] = "DATA", i[i.VALIDITY = 2] = "VALIDITY", i[i.TYPE = 3] = "TYPE";
})(Ft || (Ft = {}));
const Fo = void 0;
function Te(i) {
  if (i === null)
    return "null";
  if (i === Fo)
    return "undefined";
  switch (typeof i) {
    case "number":
      return `${i}`;
    case "bigint":
      return `${i}`;
    case "string":
      return `"${i}"`;
  }
  return typeof i[Symbol.toPrimitive] == "function" ? i[Symbol.toPrimitive]("string") : ArrayBuffer.isView(i) ? i instanceof BigInt64Array || i instanceof BigUint64Array ? `[${[...i].map((t) => Te(t))}]` : `[${i}]` : ArrayBuffer.isView(i) ? `[${i}]` : JSON.stringify(i, (t, e) => typeof e == "bigint" ? `${e}` : e);
}
function z(i) {
  if (typeof i == "bigint" && (i < Number.MIN_SAFE_INTEGER || i > Number.MAX_SAFE_INTEGER))
    throw new TypeError(`${i} is not safe to convert to a number.`);
  return Number(i);
}
function dr(i, t) {
  return z(i / t) + z(i % t) / z(t);
}
const Oo = Symbol.for("isArrowBigNum");
function pt(i, ...t) {
  return t.length === 0 ? Object.setPrototypeOf(x(this.TypedArray, i), this.constructor.prototype) : Object.setPrototypeOf(new this.TypedArray(i, ...t), this.constructor.prototype);
}
pt.prototype[Oo] = !0;
pt.prototype.toJSON = function() {
  return `"${Re(this)}"`;
};
pt.prototype.valueOf = function(i) {
  return hr(this, i);
};
pt.prototype.toString = function() {
  return Re(this);
};
pt.prototype[Symbol.toPrimitive] = function(i = "default") {
  switch (i) {
    case "number":
      return hr(this);
    case "string":
      return Re(this);
    case "default":
      return Uo(this);
  }
  return Re(this);
};
function ue(...i) {
  return pt.apply(this, i);
}
function le(...i) {
  return pt.apply(this, i);
}
function Le(...i) {
  return pt.apply(this, i);
}
Object.setPrototypeOf(ue.prototype, Object.create(Int32Array.prototype));
Object.setPrototypeOf(le.prototype, Object.create(Uint32Array.prototype));
Object.setPrototypeOf(Le.prototype, Object.create(Uint32Array.prototype));
Object.assign(ue.prototype, pt.prototype, { constructor: ue, signed: !0, TypedArray: Int32Array, BigIntArray: BigInt64Array });
Object.assign(le.prototype, pt.prototype, { constructor: le, signed: !1, TypedArray: Uint32Array, BigIntArray: BigUint64Array });
Object.assign(Le.prototype, pt.prototype, { constructor: Le, signed: !0, TypedArray: Uint32Array, BigIntArray: BigUint64Array });
const No = BigInt(4294967296) * BigInt(4294967296), Mo = No - BigInt(1);
function hr(i, t) {
  const { buffer: e, byteOffset: n, byteLength: r, signed: s } = i, o = new BigUint64Array(e, n, r / 8), a = s && o.at(-1) & BigInt(1) << BigInt(63);
  let c = BigInt(0), l = 0;
  if (a) {
    for (const d of o)
      c |= (d ^ Mo) * (BigInt(1) << BigInt(64 * l++));
    c *= BigInt(-1), c -= BigInt(1);
  } else
    for (const d of o)
      c |= d * (BigInt(1) << BigInt(64 * l++));
  if (typeof t == "number") {
    const d = BigInt(Math.pow(10, t)), f = c / d, $ = c % d;
    return z(f) + z($) / z(d);
  }
  return z(c);
}
function Re(i) {
  if (i.byteLength === 8)
    return `${new i.BigIntArray(i.buffer, i.byteOffset, 1)[0]}`;
  if (!i.signed)
    return Ei(i);
  let t = new Uint16Array(i.buffer, i.byteOffset, i.byteLength / 2);
  if (new Int16Array([t.at(-1)])[0] >= 0)
    return Ei(i);
  t = t.slice();
  let n = 1;
  for (let s = 0; s < t.length; s++) {
    const o = t[s], a = ~o + n;
    t[s] = a, n &= o === 0 ? 1 : 0;
  }
  return `-${Ei(t)}`;
}
function Uo(i) {
  return i.byteLength === 8 ? new i.BigIntArray(i.buffer, i.byteOffset, 1)[0] : Re(i);
}
function Ei(i) {
  let t = "";
  const e = new Uint32Array(2);
  let n = new Uint16Array(i.buffer, i.byteOffset, i.byteLength / 2);
  const r = new Uint32Array((n = new Uint16Array(n).reverse()).buffer);
  let s = -1;
  const o = n.length - 1;
  do {
    for (e[0] = n[s = 0]; s < o; )
      n[s++] = e[1] = e[0] / 10, e[0] = (e[0] - e[1] * 10 << 16) + n[s];
    n[s] = e[1] = e[0] / 10, e[0] = e[0] - e[1] * 10, t = `${e[0]}${t}`;
  } while (r[0] || r[1] || r[2] || r[3]);
  return t ?? "0";
}
class sn {
  /** @nocollapse */
  static new(t, e) {
    switch (e) {
      case !0:
        return new ue(t);
      case !1:
        return new le(t);
    }
    switch (t.constructor) {
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case BigInt64Array:
        return new ue(t);
    }
    return t.byteLength === 16 ? new Le(t) : new le(t);
  }
  /** @nocollapse */
  static signed(t) {
    return new ue(t);
  }
  /** @nocollapse */
  static unsigned(t) {
    return new le(t);
  }
  /** @nocollapse */
  static decimal(t) {
    return new Le(t);
  }
  constructor(t, e) {
    return sn.new(t, e);
  }
}
var fr, pr, yr, mr, gr, br, _r, vr, wr, Ir, Sr, Br, Dr, Ar, Fr, Or, Nr, Mr, Ur, Tr, Lr, Rr;
class h {
  /** @nocollapse */
  static isNull(t) {
    return (t == null ? void 0 : t.typeId) === u.Null;
  }
  /** @nocollapse */
  static isInt(t) {
    return (t == null ? void 0 : t.typeId) === u.Int;
  }
  /** @nocollapse */
  static isFloat(t) {
    return (t == null ? void 0 : t.typeId) === u.Float;
  }
  /** @nocollapse */
  static isBinary(t) {
    return (t == null ? void 0 : t.typeId) === u.Binary;
  }
  /** @nocollapse */
  static isLargeBinary(t) {
    return (t == null ? void 0 : t.typeId) === u.LargeBinary;
  }
  /** @nocollapse */
  static isUtf8(t) {
    return (t == null ? void 0 : t.typeId) === u.Utf8;
  }
  /** @nocollapse */
  static isLargeUtf8(t) {
    return (t == null ? void 0 : t.typeId) === u.LargeUtf8;
  }
  /** @nocollapse */
  static isBool(t) {
    return (t == null ? void 0 : t.typeId) === u.Bool;
  }
  /** @nocollapse */
  static isDecimal(t) {
    return (t == null ? void 0 : t.typeId) === u.Decimal;
  }
  /** @nocollapse */
  static isDate(t) {
    return (t == null ? void 0 : t.typeId) === u.Date;
  }
  /** @nocollapse */
  static isTime(t) {
    return (t == null ? void 0 : t.typeId) === u.Time;
  }
  /** @nocollapse */
  static isTimestamp(t) {
    return (t == null ? void 0 : t.typeId) === u.Timestamp;
  }
  /** @nocollapse */
  static isInterval(t) {
    return (t == null ? void 0 : t.typeId) === u.Interval;
  }
  /** @nocollapse */
  static isDuration(t) {
    return (t == null ? void 0 : t.typeId) === u.Duration;
  }
  /** @nocollapse */
  static isList(t) {
    return (t == null ? void 0 : t.typeId) === u.List;
  }
  /** @nocollapse */
  static isStruct(t) {
    return (t == null ? void 0 : t.typeId) === u.Struct;
  }
  /** @nocollapse */
  static isUnion(t) {
    return (t == null ? void 0 : t.typeId) === u.Union;
  }
  /** @nocollapse */
  static isFixedSizeBinary(t) {
    return (t == null ? void 0 : t.typeId) === u.FixedSizeBinary;
  }
  /** @nocollapse */
  static isFixedSizeList(t) {
    return (t == null ? void 0 : t.typeId) === u.FixedSizeList;
  }
  /** @nocollapse */
  static isMap(t) {
    return (t == null ? void 0 : t.typeId) === u.Map;
  }
  /** @nocollapse */
  static isDictionary(t) {
    return (t == null ? void 0 : t.typeId) === u.Dictionary;
  }
  /** @nocollapse */
  static isDenseUnion(t) {
    return h.isUnion(t) && t.mode === X.Dense;
  }
  /** @nocollapse */
  static isSparseUnion(t) {
    return h.isUnion(t) && t.mode === X.Sparse;
  }
  constructor(t) {
    this.typeId = t;
  }
}
fr = Symbol.toStringTag;
h[fr] = ((i) => (i.children = null, i.ArrayType = Array, i.OffsetArrayType = Int32Array, i[Symbol.toStringTag] = "DataType"))(h.prototype);
class jt extends h {
  constructor() {
    super(u.Null);
  }
  toString() {
    return "Null";
  }
}
pr = Symbol.toStringTag;
jt[pr] = ((i) => i[Symbol.toStringTag] = "Null")(jt.prototype);
class Ht extends h {
  constructor(t, e) {
    super(u.Int), this.isSigned = t, this.bitWidth = e;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 8:
        return this.isSigned ? Int8Array : Uint8Array;
      case 16:
        return this.isSigned ? Int16Array : Uint16Array;
      case 32:
        return this.isSigned ? Int32Array : Uint32Array;
      case 64:
        return this.isSigned ? BigInt64Array : BigUint64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `${this.isSigned ? "I" : "Ui"}nt${this.bitWidth}`;
  }
}
yr = Symbol.toStringTag;
Ht[yr] = ((i) => (i.isSigned = null, i.bitWidth = null, i[Symbol.toStringTag] = "Int"))(Ht.prototype);
class xe extends Ht {
  constructor() {
    super(!0, 32);
  }
  get ArrayType() {
    return Int32Array;
  }
}
Object.defineProperty(xe.prototype, "ArrayType", { value: Int32Array });
class ii extends h {
  constructor(t) {
    super(u.Float), this.precision = t;
  }
  get ArrayType() {
    switch (this.precision) {
      case J.HALF:
        return Uint16Array;
      case J.SINGLE:
        return Float32Array;
      case J.DOUBLE:
        return Float64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `Float${this.precision << 5 || 16}`;
  }
}
mr = Symbol.toStringTag;
ii[mr] = ((i) => (i.precision = null, i[Symbol.toStringTag] = "Float"))(ii.prototype);
class ni extends h {
  constructor() {
    super(u.Binary);
  }
  toString() {
    return "Binary";
  }
}
gr = Symbol.toStringTag;
ni[gr] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Binary"))(ni.prototype);
class ri extends h {
  constructor() {
    super(u.LargeBinary);
  }
  toString() {
    return "LargeBinary";
  }
}
br = Symbol.toStringTag;
ri[br] = ((i) => (i.ArrayType = Uint8Array, i.OffsetArrayType = BigInt64Array, i[Symbol.toStringTag] = "LargeBinary"))(ri.prototype);
class si extends h {
  constructor() {
    super(u.Utf8);
  }
  toString() {
    return "Utf8";
  }
}
_r = Symbol.toStringTag;
si[_r] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Utf8"))(si.prototype);
class oi extends h {
  constructor() {
    super(u.LargeUtf8);
  }
  toString() {
    return "LargeUtf8";
  }
}
vr = Symbol.toStringTag;
oi[vr] = ((i) => (i.ArrayType = Uint8Array, i.OffsetArrayType = BigInt64Array, i[Symbol.toStringTag] = "LargeUtf8"))(oi.prototype);
class ai extends h {
  constructor() {
    super(u.Bool);
  }
  toString() {
    return "Bool";
  }
}
wr = Symbol.toStringTag;
ai[wr] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Bool"))(ai.prototype);
class ci extends h {
  constructor(t, e, n = 128) {
    super(u.Decimal), this.scale = t, this.precision = e, this.bitWidth = n;
  }
  toString() {
    return `Decimal[${this.precision}e${this.scale > 0 ? "+" : ""}${this.scale}]`;
  }
}
Ir = Symbol.toStringTag;
ci[Ir] = ((i) => (i.scale = null, i.precision = null, i.ArrayType = Uint32Array, i[Symbol.toStringTag] = "Decimal"))(ci.prototype);
class ui extends h {
  constructor(t) {
    super(u.Date), this.unit = t;
  }
  toString() {
    return `Date${(this.unit + 1) * 32}<${at[this.unit]}>`;
  }
  get ArrayType() {
    return this.unit === at.DAY ? Int32Array : BigInt64Array;
  }
}
Sr = Symbol.toStringTag;
ui[Sr] = ((i) => (i.unit = null, i[Symbol.toStringTag] = "Date"))(ui.prototype);
class li extends h {
  constructor(t, e) {
    super(u.Time), this.unit = t, this.bitWidth = e;
  }
  toString() {
    return `Time${this.bitWidth}<${b[this.unit]}>`;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 32:
        return Int32Array;
      case 64:
        return BigInt64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
}
Br = Symbol.toStringTag;
li[Br] = ((i) => (i.unit = null, i.bitWidth = null, i[Symbol.toStringTag] = "Time"))(li.prototype);
class di extends h {
  constructor(t, e) {
    super(u.Timestamp), this.unit = t, this.timezone = e;
  }
  toString() {
    return `Timestamp<${b[this.unit]}${this.timezone ? `, ${this.timezone}` : ""}>`;
  }
}
Dr = Symbol.toStringTag;
di[Dr] = ((i) => (i.unit = null, i.timezone = null, i.ArrayType = BigInt64Array, i[Symbol.toStringTag] = "Timestamp"))(di.prototype);
class hi extends h {
  constructor(t) {
    super(u.Interval), this.unit = t;
  }
  toString() {
    return `Interval<${Bt[this.unit]}>`;
  }
}
Ar = Symbol.toStringTag;
hi[Ar] = ((i) => (i.unit = null, i.ArrayType = Int32Array, i[Symbol.toStringTag] = "Interval"))(hi.prototype);
class fi extends h {
  constructor(t) {
    super(u.Duration), this.unit = t;
  }
  toString() {
    return `Duration<${b[this.unit]}>`;
  }
}
Fr = Symbol.toStringTag;
fi[Fr] = ((i) => (i.unit = null, i.ArrayType = BigInt64Array, i[Symbol.toStringTag] = "Duration"))(fi.prototype);
class pi extends h {
  constructor(t) {
    super(u.List), this.children = [t];
  }
  toString() {
    return `List<${this.valueType}>`;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
}
Or = Symbol.toStringTag;
pi[Or] = ((i) => (i.children = null, i[Symbol.toStringTag] = "List"))(pi.prototype);
class K extends h {
  constructor(t) {
    super(u.Struct), this.children = t;
  }
  toString() {
    return `Struct<{${this.children.map((t) => `${t.name}:${t.type}`).join(", ")}}>`;
  }
}
Nr = Symbol.toStringTag;
K[Nr] = ((i) => (i.children = null, i[Symbol.toStringTag] = "Struct"))(K.prototype);
class yi extends h {
  constructor(t, e, n) {
    super(u.Union), this.mode = t, this.children = n, this.typeIds = e = Int32Array.from(e), this.typeIdToChildIndex = e.reduce((r, s, o) => (r[s] = o) && r || r, /* @__PURE__ */ Object.create(null));
  }
  toString() {
    return `${this[Symbol.toStringTag]}<${this.children.map((t) => `${t.type}`).join(" | ")}>`;
  }
}
Mr = Symbol.toStringTag;
yi[Mr] = ((i) => (i.mode = null, i.typeIds = null, i.children = null, i.typeIdToChildIndex = null, i.ArrayType = Int8Array, i[Symbol.toStringTag] = "Union"))(yi.prototype);
class mi extends h {
  constructor(t) {
    super(u.FixedSizeBinary), this.byteWidth = t;
  }
  toString() {
    return `FixedSizeBinary[${this.byteWidth}]`;
  }
}
Ur = Symbol.toStringTag;
mi[Ur] = ((i) => (i.byteWidth = null, i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "FixedSizeBinary"))(mi.prototype);
class gi extends h {
  constructor(t, e) {
    super(u.FixedSizeList), this.listSize = t, this.children = [e];
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
  toString() {
    return `FixedSizeList[${this.listSize}]<${this.valueType}>`;
  }
}
Tr = Symbol.toStringTag;
gi[Tr] = ((i) => (i.children = null, i.listSize = null, i[Symbol.toStringTag] = "FixedSizeList"))(gi.prototype);
class bi extends h {
  constructor(t, e = !1) {
    var n, r, s;
    if (super(u.Map), this.children = [t], this.keysSorted = e, t && (t.name = "entries", !((n = t == null ? void 0 : t.type) === null || n === void 0) && n.children)) {
      const o = (r = t == null ? void 0 : t.type) === null || r === void 0 ? void 0 : r.children[0];
      o && (o.name = "key");
      const a = (s = t == null ? void 0 : t.type) === null || s === void 0 ? void 0 : s.children[1];
      a && (a.name = "value");
    }
  }
  get keyType() {
    return this.children[0].type.children[0].type;
  }
  get valueType() {
    return this.children[0].type.children[1].type;
  }
  get childType() {
    return this.children[0].type;
  }
  toString() {
    return `Map<{${this.children[0].type.children.map((t) => `${t.name}:${t.type}`).join(", ")}}>`;
  }
}
Lr = Symbol.toStringTag;
bi[Lr] = ((i) => (i.children = null, i.keysSorted = null, i[Symbol.toStringTag] = "Map_"))(bi.prototype);
const To = /* @__PURE__ */ ((i) => () => ++i)(-1);
class ye extends h {
  constructor(t, e, n, r) {
    super(u.Dictionary), this.indices = e, this.dictionary = t, this.isOrdered = r || !1, this.id = n == null ? To() : z(n);
  }
  get children() {
    return this.dictionary.children;
  }
  get valueType() {
    return this.dictionary;
  }
  get ArrayType() {
    return this.dictionary.ArrayType;
  }
  toString() {
    return `Dictionary<${this.indices}, ${this.dictionary}>`;
  }
}
Rr = Symbol.toStringTag;
ye[Rr] = ((i) => (i.id = null, i.indices = null, i.isOrdered = null, i.dictionary = null, i[Symbol.toStringTag] = "Dictionary"))(ye.prototype);
function Ot(i) {
  const t = i;
  switch (i.typeId) {
    case u.Decimal:
      return i.bitWidth / 32;
    case u.Interval:
      return 1 + t.unit;
    // case Type.Int: return 1 + +((t as Int_).bitWidth > 32);
    // case Type.Time: return 1 + +((t as Time_).bitWidth > 32);
    case u.FixedSizeList:
      return t.listSize;
    case u.FixedSizeBinary:
      return t.byteWidth;
    default:
      return 1;
  }
}
class F {
  visitMany(t, ...e) {
    return t.map((n, r) => this.visit(n, ...e.map((s) => s[r])));
  }
  visit(...t) {
    return this.getVisitFn(t[0], !1).apply(this, t);
  }
  getVisitFn(t, e = !0) {
    return Lo(this, t, e);
  }
  getVisitFnByTypeId(t, e = !0) {
    return re(this, t, e);
  }
  visitNull(t, ...e) {
    return null;
  }
  visitBool(t, ...e) {
    return null;
  }
  visitInt(t, ...e) {
    return null;
  }
  visitFloat(t, ...e) {
    return null;
  }
  visitUtf8(t, ...e) {
    return null;
  }
  visitLargeUtf8(t, ...e) {
    return null;
  }
  visitBinary(t, ...e) {
    return null;
  }
  visitLargeBinary(t, ...e) {
    return null;
  }
  visitFixedSizeBinary(t, ...e) {
    return null;
  }
  visitDate(t, ...e) {
    return null;
  }
  visitTimestamp(t, ...e) {
    return null;
  }
  visitTime(t, ...e) {
    return null;
  }
  visitDecimal(t, ...e) {
    return null;
  }
  visitList(t, ...e) {
    return null;
  }
  visitStruct(t, ...e) {
    return null;
  }
  visitUnion(t, ...e) {
    return null;
  }
  visitDictionary(t, ...e) {
    return null;
  }
  visitInterval(t, ...e) {
    return null;
  }
  visitDuration(t, ...e) {
    return null;
  }
  visitFixedSizeList(t, ...e) {
    return null;
  }
  visitMap(t, ...e) {
    return null;
  }
}
function Lo(i, t, e = !0) {
  return typeof t == "number" ? re(i, t, e) : typeof t == "string" && t in u ? re(i, u[t], e) : t && t instanceof h ? re(i, Rn(t), e) : t != null && t.type && t.type instanceof h ? re(i, Rn(t.type), e) : re(i, u.NONE, e);
}
function re(i, t, e = !0) {
  let n = null;
  switch (t) {
    case u.Null:
      n = i.visitNull;
      break;
    case u.Bool:
      n = i.visitBool;
      break;
    case u.Int:
      n = i.visitInt;
      break;
    case u.Int8:
      n = i.visitInt8 || i.visitInt;
      break;
    case u.Int16:
      n = i.visitInt16 || i.visitInt;
      break;
    case u.Int32:
      n = i.visitInt32 || i.visitInt;
      break;
    case u.Int64:
      n = i.visitInt64 || i.visitInt;
      break;
    case u.Uint8:
      n = i.visitUint8 || i.visitInt;
      break;
    case u.Uint16:
      n = i.visitUint16 || i.visitInt;
      break;
    case u.Uint32:
      n = i.visitUint32 || i.visitInt;
      break;
    case u.Uint64:
      n = i.visitUint64 || i.visitInt;
      break;
    case u.Float:
      n = i.visitFloat;
      break;
    case u.Float16:
      n = i.visitFloat16 || i.visitFloat;
      break;
    case u.Float32:
      n = i.visitFloat32 || i.visitFloat;
      break;
    case u.Float64:
      n = i.visitFloat64 || i.visitFloat;
      break;
    case u.Utf8:
      n = i.visitUtf8;
      break;
    case u.LargeUtf8:
      n = i.visitLargeUtf8;
      break;
    case u.Binary:
      n = i.visitBinary;
      break;
    case u.LargeBinary:
      n = i.visitLargeBinary;
      break;
    case u.FixedSizeBinary:
      n = i.visitFixedSizeBinary;
      break;
    case u.Date:
      n = i.visitDate;
      break;
    case u.DateDay:
      n = i.visitDateDay || i.visitDate;
      break;
    case u.DateMillisecond:
      n = i.visitDateMillisecond || i.visitDate;
      break;
    case u.Timestamp:
      n = i.visitTimestamp;
      break;
    case u.TimestampSecond:
      n = i.visitTimestampSecond || i.visitTimestamp;
      break;
    case u.TimestampMillisecond:
      n = i.visitTimestampMillisecond || i.visitTimestamp;
      break;
    case u.TimestampMicrosecond:
      n = i.visitTimestampMicrosecond || i.visitTimestamp;
      break;
    case u.TimestampNanosecond:
      n = i.visitTimestampNanosecond || i.visitTimestamp;
      break;
    case u.Time:
      n = i.visitTime;
      break;
    case u.TimeSecond:
      n = i.visitTimeSecond || i.visitTime;
      break;
    case u.TimeMillisecond:
      n = i.visitTimeMillisecond || i.visitTime;
      break;
    case u.TimeMicrosecond:
      n = i.visitTimeMicrosecond || i.visitTime;
      break;
    case u.TimeNanosecond:
      n = i.visitTimeNanosecond || i.visitTime;
      break;
    case u.Decimal:
      n = i.visitDecimal;
      break;
    case u.List:
      n = i.visitList;
      break;
    case u.Struct:
      n = i.visitStruct;
      break;
    case u.Union:
      n = i.visitUnion;
      break;
    case u.DenseUnion:
      n = i.visitDenseUnion || i.visitUnion;
      break;
    case u.SparseUnion:
      n = i.visitSparseUnion || i.visitUnion;
      break;
    case u.Dictionary:
      n = i.visitDictionary;
      break;
    case u.Interval:
      n = i.visitInterval;
      break;
    case u.IntervalDayTime:
      n = i.visitIntervalDayTime || i.visitInterval;
      break;
    case u.IntervalYearMonth:
      n = i.visitIntervalYearMonth || i.visitInterval;
      break;
    case u.Duration:
      n = i.visitDuration;
      break;
    case u.DurationSecond:
      n = i.visitDurationSecond || i.visitDuration;
      break;
    case u.DurationMillisecond:
      n = i.visitDurationMillisecond || i.visitDuration;
      break;
    case u.DurationMicrosecond:
      n = i.visitDurationMicrosecond || i.visitDuration;
      break;
    case u.DurationNanosecond:
      n = i.visitDurationNanosecond || i.visitDuration;
      break;
    case u.FixedSizeList:
      n = i.visitFixedSizeList;
      break;
    case u.Map:
      n = i.visitMap;
      break;
  }
  if (typeof n == "function")
    return n;
  if (!e)
    return () => null;
  throw new Error(`Unrecognized type '${u[t]}'`);
}
function Rn(i) {
  switch (i.typeId) {
    case u.Null:
      return u.Null;
    case u.Int: {
      const { bitWidth: t, isSigned: e } = i;
      switch (t) {
        case 8:
          return e ? u.Int8 : u.Uint8;
        case 16:
          return e ? u.Int16 : u.Uint16;
        case 32:
          return e ? u.Int32 : u.Uint32;
        case 64:
          return e ? u.Int64 : u.Uint64;
      }
      return u.Int;
    }
    case u.Float:
      switch (i.precision) {
        case J.HALF:
          return u.Float16;
        case J.SINGLE:
          return u.Float32;
        case J.DOUBLE:
          return u.Float64;
      }
      return u.Float;
    case u.Binary:
      return u.Binary;
    case u.LargeBinary:
      return u.LargeBinary;
    case u.Utf8:
      return u.Utf8;
    case u.LargeUtf8:
      return u.LargeUtf8;
    case u.Bool:
      return u.Bool;
    case u.Decimal:
      return u.Decimal;
    case u.Time:
      switch (i.unit) {
        case b.SECOND:
          return u.TimeSecond;
        case b.MILLISECOND:
          return u.TimeMillisecond;
        case b.MICROSECOND:
          return u.TimeMicrosecond;
        case b.NANOSECOND:
          return u.TimeNanosecond;
      }
      return u.Time;
    case u.Timestamp:
      switch (i.unit) {
        case b.SECOND:
          return u.TimestampSecond;
        case b.MILLISECOND:
          return u.TimestampMillisecond;
        case b.MICROSECOND:
          return u.TimestampMicrosecond;
        case b.NANOSECOND:
          return u.TimestampNanosecond;
      }
      return u.Timestamp;
    case u.Date:
      switch (i.unit) {
        case at.DAY:
          return u.DateDay;
        case at.MILLISECOND:
          return u.DateMillisecond;
      }
      return u.Date;
    case u.Interval:
      switch (i.unit) {
        case Bt.DAY_TIME:
          return u.IntervalDayTime;
        case Bt.YEAR_MONTH:
          return u.IntervalYearMonth;
      }
      return u.Interval;
    case u.Duration:
      switch (i.unit) {
        case b.SECOND:
          return u.DurationSecond;
        case b.MILLISECOND:
          return u.DurationMillisecond;
        case b.MICROSECOND:
          return u.DurationMicrosecond;
        case b.NANOSECOND:
          return u.DurationNanosecond;
      }
      return u.Duration;
    case u.Map:
      return u.Map;
    case u.List:
      return u.List;
    case u.Struct:
      return u.Struct;
    case u.Union:
      switch (i.mode) {
        case X.Dense:
          return u.DenseUnion;
        case X.Sparse:
          return u.SparseUnion;
      }
      return u.Union;
    case u.FixedSizeBinary:
      return u.FixedSizeBinary;
    case u.FixedSizeList:
      return u.FixedSizeList;
    case u.Dictionary:
      return u.Dictionary;
  }
  throw new Error(`Unrecognized type '${u[i.typeId]}'`);
}
F.prototype.visitInt8 = null;
F.prototype.visitInt16 = null;
F.prototype.visitInt32 = null;
F.prototype.visitInt64 = null;
F.prototype.visitUint8 = null;
F.prototype.visitUint16 = null;
F.prototype.visitUint32 = null;
F.prototype.visitUint64 = null;
F.prototype.visitFloat16 = null;
F.prototype.visitFloat32 = null;
F.prototype.visitFloat64 = null;
F.prototype.visitDateDay = null;
F.prototype.visitDateMillisecond = null;
F.prototype.visitTimestampSecond = null;
F.prototype.visitTimestampMillisecond = null;
F.prototype.visitTimestampMicrosecond = null;
F.prototype.visitTimestampNanosecond = null;
F.prototype.visitTimeSecond = null;
F.prototype.visitTimeMillisecond = null;
F.prototype.visitTimeMicrosecond = null;
F.prototype.visitTimeNanosecond = null;
F.prototype.visitDenseUnion = null;
F.prototype.visitSparseUnion = null;
F.prototype.visitIntervalDayTime = null;
F.prototype.visitIntervalYearMonth = null;
F.prototype.visitDuration = null;
F.prototype.visitDurationSecond = null;
F.prototype.visitDurationMillisecond = null;
F.prototype.visitDurationMicrosecond = null;
F.prototype.visitDurationNanosecond = null;
const xr = new Float64Array(1), Zt = new Uint32Array(xr.buffer);
function Cr(i) {
  const t = (i & 31744) >> 10, e = (i & 1023) / 1024, n = Math.pow(-1, (i & 32768) >> 15);
  switch (t) {
    case 31:
      return n * (e ? Number.NaN : 1 / 0);
    case 0:
      return n * (e ? 6103515625e-14 * e : 0);
  }
  return n * Math.pow(2, t - 15) * (1 + e);
}
function Ro(i) {
  if (i !== i)
    return 32256;
  xr[0] = i;
  const t = (Zt[1] & 2147483648) >> 16 & 65535;
  let e = Zt[1] & 2146435072, n = 0;
  return e >= 1089470464 ? Zt[0] > 0 ? e = 31744 : (e = (e & 2080374784) >> 16, n = (Zt[1] & 1048575) >> 10) : e <= 1056964608 ? (n = 1048576 + (Zt[1] & 1048575), n = 1048576 + (n << (e >> 20) - 998) >> 21, e = 0) : (e = e - 1056964608 >> 10, n = (Zt[1] & 1048575) + 512 >> 10), t | e | n & 65535;
}
class _ extends F {
}
function I(i) {
  return (t, e, n) => {
    if (t.setValid(e, n != null))
      return i(t, e, n);
  };
}
const xo = (i, t, e) => {
  i[t] = Math.floor(e / 864e5);
}, Er = (i, t, e, n) => {
  if (e + 1 < t.length) {
    const r = z(t[e]), s = z(t[e + 1]);
    i.set(n.subarray(0, s - r), r);
  }
}, Co = ({ offset: i, values: t }, e, n) => {
  const r = i + e;
  n ? t[r >> 3] |= 1 << r % 8 : t[r >> 3] &= ~(1 << r % 8);
}, Rt = ({ values: i }, t, e) => {
  i[t] = e;
}, on = ({ values: i }, t, e) => {
  i[t] = e;
}, zr = ({ values: i }, t, e) => {
  i[t] = Ro(e);
}, Eo = (i, t, e) => {
  switch (i.type.precision) {
    case J.HALF:
      return zr(i, t, e);
    case J.SINGLE:
    case J.DOUBLE:
      return on(i, t, e);
  }
}, Vr = ({ values: i }, t, e) => {
  xo(i, t, e.valueOf());
}, kr = ({ values: i }, t, e) => {
  i[t] = BigInt(e);
}, zo = ({ stride: i, values: t }, e, n) => {
  t.set(n.subarray(0, i), i * e);
}, Pr = ({ values: i, valueOffsets: t }, e, n) => Er(i, t, e, n), jr = ({ values: i, valueOffsets: t }, e, n) => Er(i, t, e, tn(n)), Vo = (i, t, e) => {
  i.type.unit === at.DAY ? Vr(i, t, e) : kr(i, t, e);
}, $r = ({ values: i }, t, e) => {
  i[t] = BigInt(e / 1e3);
}, Wr = ({ values: i }, t, e) => {
  i[t] = BigInt(e);
}, Yr = ({ values: i }, t, e) => {
  i[t] = BigInt(e * 1e3);
}, Jr = ({ values: i }, t, e) => {
  i[t] = BigInt(e * 1e6);
}, ko = (i, t, e) => {
  switch (i.type.unit) {
    case b.SECOND:
      return $r(i, t, e);
    case b.MILLISECOND:
      return Wr(i, t, e);
    case b.MICROSECOND:
      return Yr(i, t, e);
    case b.NANOSECOND:
      return Jr(i, t, e);
  }
}, Hr = ({ values: i }, t, e) => {
  i[t] = e;
}, Kr = ({ values: i }, t, e) => {
  i[t] = e;
}, Gr = ({ values: i }, t, e) => {
  i[t] = e;
}, Zr = ({ values: i }, t, e) => {
  i[t] = e;
}, Po = (i, t, e) => {
  switch (i.type.unit) {
    case b.SECOND:
      return Hr(i, t, e);
    case b.MILLISECOND:
      return Kr(i, t, e);
    case b.MICROSECOND:
      return Gr(i, t, e);
    case b.NANOSECOND:
      return Zr(i, t, e);
  }
}, jo = ({ values: i, stride: t }, e, n) => {
  i.set(n.subarray(0, t), t * e);
}, $o = (i, t, e) => {
  const n = i.children[0], r = i.valueOffsets, s = ct.getVisitFn(n);
  if (Array.isArray(e))
    for (let o = -1, a = r[t], c = r[t + 1]; a < c; )
      s(n, a++, e[++o]);
  else
    for (let o = -1, a = r[t], c = r[t + 1]; a < c; )
      s(n, a++, e.get(++o));
}, Wo = (i, t, e) => {
  const n = i.children[0], { valueOffsets: r } = i, s = ct.getVisitFn(n);
  let { [t]: o, [t + 1]: a } = r;
  const c = e instanceof Map ? e.entries() : Object.entries(e);
  for (const l of c)
    if (s(n, o, l), ++o >= a)
      break;
}, Yo = (i, t) => (e, n, r, s) => n && e(n, i, t[s]), Jo = (i, t) => (e, n, r, s) => n && e(n, i, t.get(s)), Ho = (i, t) => (e, n, r, s) => n && e(n, i, t.get(r.name)), Ko = (i, t) => (e, n, r, s) => n && e(n, i, t[r.name]), Go = (i, t, e) => {
  const n = i.type.children.map((s) => ct.getVisitFn(s.type)), r = e instanceof Map ? Ho(t, e) : e instanceof C ? Jo(t, e) : Array.isArray(e) ? Yo(t, e) : Ko(t, e);
  i.type.children.forEach((s, o) => r(n[o], i.children[o], s, o));
}, Zo = (i, t, e) => {
  i.type.mode === X.Dense ? qr(i, t, e) : Xr(i, t, e);
}, qr = (i, t, e) => {
  const n = i.type.typeIdToChildIndex[i.typeIds[t]], r = i.children[n];
  ct.visit(r, i.valueOffsets[t], e);
}, Xr = (i, t, e) => {
  const n = i.type.typeIdToChildIndex[i.typeIds[t]], r = i.children[n];
  ct.visit(r, t, e);
}, qo = (i, t, e) => {
  var n;
  (n = i.dictionary) === null || n === void 0 || n.set(i.values[t], e);
}, Xo = (i, t, e) => {
  i.type.unit === Bt.DAY_TIME ? Qr(i, t, e) : ts(i, t, e);
}, Qr = ({ values: i }, t, e) => {
  i.set(e.subarray(0, 2), 2 * t);
}, ts = ({ values: i }, t, e) => {
  i[t] = e[0] * 12 + e[1] % 12;
}, es = ({ values: i }, t, e) => {
  i[t] = e;
}, is = ({ values: i }, t, e) => {
  i[t] = e;
}, ns = ({ values: i }, t, e) => {
  i[t] = e;
}, rs = ({ values: i }, t, e) => {
  i[t] = e;
}, Qo = (i, t, e) => {
  switch (i.type.unit) {
    case b.SECOND:
      return es(i, t, e);
    case b.MILLISECOND:
      return is(i, t, e);
    case b.MICROSECOND:
      return ns(i, t, e);
    case b.NANOSECOND:
      return rs(i, t, e);
  }
}, ta = (i, t, e) => {
  const { stride: n } = i, r = i.children[0], s = ct.getVisitFn(r);
  if (Array.isArray(e))
    for (let o = -1, a = t * n; ++o < n; )
      s(r, a + o, e[o]);
  else
    for (let o = -1, a = t * n; ++o < n; )
      s(r, a + o, e.get(o));
};
_.prototype.visitBool = I(Co);
_.prototype.visitInt = I(Rt);
_.prototype.visitInt8 = I(Rt);
_.prototype.visitInt16 = I(Rt);
_.prototype.visitInt32 = I(Rt);
_.prototype.visitInt64 = I(Rt);
_.prototype.visitUint8 = I(Rt);
_.prototype.visitUint16 = I(Rt);
_.prototype.visitUint32 = I(Rt);
_.prototype.visitUint64 = I(Rt);
_.prototype.visitFloat = I(Eo);
_.prototype.visitFloat16 = I(zr);
_.prototype.visitFloat32 = I(on);
_.prototype.visitFloat64 = I(on);
_.prototype.visitUtf8 = I(jr);
_.prototype.visitLargeUtf8 = I(jr);
_.prototype.visitBinary = I(Pr);
_.prototype.visitLargeBinary = I(Pr);
_.prototype.visitFixedSizeBinary = I(zo);
_.prototype.visitDate = I(Vo);
_.prototype.visitDateDay = I(Vr);
_.prototype.visitDateMillisecond = I(kr);
_.prototype.visitTimestamp = I(ko);
_.prototype.visitTimestampSecond = I($r);
_.prototype.visitTimestampMillisecond = I(Wr);
_.prototype.visitTimestampMicrosecond = I(Yr);
_.prototype.visitTimestampNanosecond = I(Jr);
_.prototype.visitTime = I(Po);
_.prototype.visitTimeSecond = I(Hr);
_.prototype.visitTimeMillisecond = I(Kr);
_.prototype.visitTimeMicrosecond = I(Gr);
_.prototype.visitTimeNanosecond = I(Zr);
_.prototype.visitDecimal = I(jo);
_.prototype.visitList = I($o);
_.prototype.visitStruct = I(Go);
_.prototype.visitUnion = I(Zo);
_.prototype.visitDenseUnion = I(qr);
_.prototype.visitSparseUnion = I(Xr);
_.prototype.visitDictionary = I(qo);
_.prototype.visitInterval = I(Xo);
_.prototype.visitIntervalDayTime = I(Qr);
_.prototype.visitIntervalYearMonth = I(ts);
_.prototype.visitDuration = I(Qo);
_.prototype.visitDurationSecond = I(es);
_.prototype.visitDurationMillisecond = I(is);
_.prototype.visitDurationMicrosecond = I(ns);
_.prototype.visitDurationNanosecond = I(rs);
_.prototype.visitFixedSizeList = I(ta);
_.prototype.visitMap = I(Wo);
const ct = new _(), ut = Symbol.for("parent"), de = Symbol.for("rowIndex");
class an {
  constructor(t, e) {
    return this[ut] = t, this[de] = e, new Proxy(this, na);
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const t = this[de], e = this[ut], n = e.type.children, r = {};
    for (let s = -1, o = n.length; ++s < o; )
      r[n[s].name] = Q.visit(e.children[s], t);
    return r;
  }
  toString() {
    return `{${[...this].map(([t, e]) => `${Te(t)}: ${Te(e)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
  [Symbol.iterator]() {
    return new ea(this[ut], this[de]);
  }
}
class ea {
  constructor(t, e) {
    this.childIndex = 0, this.children = t.children, this.rowIndex = e, this.childFields = t.type.children, this.numChildren = this.childFields.length;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const t = this.childIndex;
    return t < this.numChildren ? (this.childIndex = t + 1, {
      done: !1,
      value: [
        this.childFields[t].name,
        Q.visit(this.children[t], this.rowIndex)
      ]
    }) : { done: !0, value: null };
  }
}
Object.defineProperties(an.prototype, {
  [Symbol.toStringTag]: { enumerable: !1, configurable: !1, value: "Row" },
  [ut]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [de]: { writable: !0, enumerable: !1, configurable: !1, value: -1 }
});
class ia {
  isExtensible() {
    return !1;
  }
  deleteProperty() {
    return !1;
  }
  preventExtensions() {
    return !0;
  }
  ownKeys(t) {
    return t[ut].type.children.map((e) => e.name);
  }
  has(t, e) {
    return t[ut].type.children.some((n) => n.name === e);
  }
  getOwnPropertyDescriptor(t, e) {
    if (t[ut].type.children.some((n) => n.name === e))
      return { writable: !0, enumerable: !0, configurable: !0 };
  }
  get(t, e) {
    if (Reflect.has(t, e))
      return t[e];
    const n = t[ut].type.children.findIndex((r) => r.name === e);
    if (n !== -1) {
      const r = Q.visit(t[ut].children[n], t[de]);
      return Reflect.set(t, e, r), r;
    }
  }
  set(t, e, n) {
    const r = t[ut].type.children.findIndex((s) => s.name === e);
    return r !== -1 ? (ct.visit(t[ut].children[r], t[de], n), Reflect.set(t, e, n)) : Reflect.has(t, e) || typeof e == "symbol" ? Reflect.set(t, e, n) : !1;
  }
}
const na = new ia();
class p extends F {
}
function v(i) {
  return (t, e) => t.getValid(e) ? i(t, e) : null;
}
const ra = (i, t) => 864e5 * i[t], sa = (i, t) => null, ss = (i, t, e) => {
  if (e + 1 >= t.length)
    return null;
  const n = z(t[e]), r = z(t[e + 1]);
  return i.subarray(n, r);
}, oa = ({ offset: i, values: t }, e) => {
  const n = i + e;
  return (t[n >> 3] & 1 << n % 8) !== 0;
}, os = ({ values: i }, t) => ra(i, t), as = ({ values: i }, t) => z(i[t]), Wt = ({ stride: i, values: t }, e) => t[i * e], aa = ({ stride: i, values: t }, e) => Cr(t[i * e]), cs = ({ values: i }, t) => i[t], ca = ({ stride: i, values: t }, e) => t.subarray(i * e, i * (e + 1)), us = ({ values: i, valueOffsets: t }, e) => ss(i, t, e), ls = ({ values: i, valueOffsets: t }, e) => {
  const n = ss(i, t, e);
  return n !== null ? ji(n) : null;
}, ua = ({ values: i }, t) => i[t], la = ({ type: i, values: t }, e) => i.precision !== J.HALF ? t[e] : Cr(t[e]), da = (i, t) => i.type.unit === at.DAY ? os(i, t) : as(i, t), ds = ({ values: i }, t) => 1e3 * z(i[t]), hs = ({ values: i }, t) => z(i[t]), fs = ({ values: i }, t) => dr(i[t], BigInt(1e3)), ps = ({ values: i }, t) => dr(i[t], BigInt(1e6)), ha = (i, t) => {
  switch (i.type.unit) {
    case b.SECOND:
      return ds(i, t);
    case b.MILLISECOND:
      return hs(i, t);
    case b.MICROSECOND:
      return fs(i, t);
    case b.NANOSECOND:
      return ps(i, t);
  }
}, ys = ({ values: i }, t) => i[t], ms = ({ values: i }, t) => i[t], gs = ({ values: i }, t) => i[t], bs = ({ values: i }, t) => i[t], fa = (i, t) => {
  switch (i.type.unit) {
    case b.SECOND:
      return ys(i, t);
    case b.MILLISECOND:
      return ms(i, t);
    case b.MICROSECOND:
      return gs(i, t);
    case b.NANOSECOND:
      return bs(i, t);
  }
}, pa = ({ values: i, stride: t }, e) => sn.decimal(i.subarray(t * e, t * (e + 1))), ya = (i, t) => {
  const { valueOffsets: e, stride: n, children: r } = i, { [t * n]: s, [t * n + 1]: o } = e, c = r[0].slice(s, o - s);
  return new C([c]);
}, ma = (i, t) => {
  const { valueOffsets: e, children: n } = i, { [t]: r, [t + 1]: s } = e, o = n[0];
  return new cn(o.slice(r, s - r));
}, ga = (i, t) => new an(i, t), ba = (i, t) => i.type.mode === X.Dense ? _s(i, t) : vs(i, t), _s = (i, t) => {
  const e = i.type.typeIdToChildIndex[i.typeIds[t]], n = i.children[e];
  return Q.visit(n, i.valueOffsets[t]);
}, vs = (i, t) => {
  const e = i.type.typeIdToChildIndex[i.typeIds[t]], n = i.children[e];
  return Q.visit(n, t);
}, _a = (i, t) => {
  var e;
  return (e = i.dictionary) === null || e === void 0 ? void 0 : e.get(i.values[t]);
}, va = (i, t) => i.type.unit === Bt.DAY_TIME ? ws(i, t) : Is(i, t), ws = ({ values: i }, t) => i.subarray(2 * t, 2 * (t + 1)), Is = ({ values: i }, t) => {
  const e = i[t], n = new Int32Array(2);
  return n[0] = Math.trunc(e / 12), n[1] = Math.trunc(e % 12), n;
}, Ss = ({ values: i }, t) => i[t], Bs = ({ values: i }, t) => i[t], Ds = ({ values: i }, t) => i[t], As = ({ values: i }, t) => i[t], wa = (i, t) => {
  switch (i.type.unit) {
    case b.SECOND:
      return Ss(i, t);
    case b.MILLISECOND:
      return Bs(i, t);
    case b.MICROSECOND:
      return Ds(i, t);
    case b.NANOSECOND:
      return As(i, t);
  }
}, Ia = (i, t) => {
  const { stride: e, children: n } = i, s = n[0].slice(t * e, e);
  return new C([s]);
};
p.prototype.visitNull = v(sa);
p.prototype.visitBool = v(oa);
p.prototype.visitInt = v(ua);
p.prototype.visitInt8 = v(Wt);
p.prototype.visitInt16 = v(Wt);
p.prototype.visitInt32 = v(Wt);
p.prototype.visitInt64 = v(cs);
p.prototype.visitUint8 = v(Wt);
p.prototype.visitUint16 = v(Wt);
p.prototype.visitUint32 = v(Wt);
p.prototype.visitUint64 = v(cs);
p.prototype.visitFloat = v(la);
p.prototype.visitFloat16 = v(aa);
p.prototype.visitFloat32 = v(Wt);
p.prototype.visitFloat64 = v(Wt);
p.prototype.visitUtf8 = v(ls);
p.prototype.visitLargeUtf8 = v(ls);
p.prototype.visitBinary = v(us);
p.prototype.visitLargeBinary = v(us);
p.prototype.visitFixedSizeBinary = v(ca);
p.prototype.visitDate = v(da);
p.prototype.visitDateDay = v(os);
p.prototype.visitDateMillisecond = v(as);
p.prototype.visitTimestamp = v(ha);
p.prototype.visitTimestampSecond = v(ds);
p.prototype.visitTimestampMillisecond = v(hs);
p.prototype.visitTimestampMicrosecond = v(fs);
p.prototype.visitTimestampNanosecond = v(ps);
p.prototype.visitTime = v(fa);
p.prototype.visitTimeSecond = v(ys);
p.prototype.visitTimeMillisecond = v(ms);
p.prototype.visitTimeMicrosecond = v(gs);
p.prototype.visitTimeNanosecond = v(bs);
p.prototype.visitDecimal = v(pa);
p.prototype.visitList = v(ya);
p.prototype.visitStruct = v(ga);
p.prototype.visitUnion = v(ba);
p.prototype.visitDenseUnion = v(_s);
p.prototype.visitSparseUnion = v(vs);
p.prototype.visitDictionary = v(_a);
p.prototype.visitInterval = v(va);
p.prototype.visitIntervalDayTime = v(ws);
p.prototype.visitIntervalYearMonth = v(Is);
p.prototype.visitDuration = v(wa);
p.prototype.visitDurationSecond = v(Ss);
p.prototype.visitDurationMillisecond = v(Bs);
p.prototype.visitDurationMicrosecond = v(Ds);
p.prototype.visitDurationNanosecond = v(As);
p.prototype.visitFixedSizeList = v(Ia);
p.prototype.visitMap = v(ma);
const Q = new p(), se = Symbol.for("keys"), he = Symbol.for("vals"), oe = Symbol.for("kKeysAsStrings"), Ki = Symbol.for("_kKeysAsStrings");
class cn {
  constructor(t) {
    return this[se] = new C([t.children[0]]).memoize(), this[he] = t.children[1], new Proxy(this, new Ba());
  }
  /** @ignore */
  get [oe]() {
    return this[Ki] || (this[Ki] = Array.from(this[se].toArray(), String));
  }
  [Symbol.iterator]() {
    return new Sa(this[se], this[he]);
  }
  get size() {
    return this[se].length;
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const t = this[se], e = this[he], n = {};
    for (let r = -1, s = t.length; ++r < s; )
      n[t.get(r)] = Q.visit(e, r);
    return n;
  }
  toString() {
    return `{${[...this].map(([t, e]) => `${Te(t)}: ${Te(e)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}
class Sa {
  constructor(t, e) {
    this.keys = t, this.vals = e, this.keyIndex = 0, this.numKeys = t.length;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const t = this.keyIndex;
    return t === this.numKeys ? { done: !0, value: null } : (this.keyIndex++, {
      done: !1,
      value: [
        this.keys.get(t),
        Q.visit(this.vals, t)
      ]
    });
  }
}
class Ba {
  isExtensible() {
    return !1;
  }
  deleteProperty() {
    return !1;
  }
  preventExtensions() {
    return !0;
  }
  ownKeys(t) {
    return t[oe];
  }
  has(t, e) {
    return t[oe].includes(e);
  }
  getOwnPropertyDescriptor(t, e) {
    if (t[oe].indexOf(e) !== -1)
      return { writable: !0, enumerable: !0, configurable: !0 };
  }
  get(t, e) {
    if (Reflect.has(t, e))
      return t[e];
    const n = t[oe].indexOf(e);
    if (n !== -1) {
      const r = Q.visit(Reflect.get(t, he), n);
      return Reflect.set(t, e, r), r;
    }
  }
  set(t, e, n) {
    const r = t[oe].indexOf(e);
    return r !== -1 ? (ct.visit(Reflect.get(t, he), r, n), Reflect.set(t, e, n)) : Reflect.has(t, e) ? Reflect.set(t, e, n) : !1;
  }
}
Object.defineProperties(cn.prototype, {
  [Symbol.toStringTag]: { enumerable: !1, configurable: !1, value: "Row" },
  [se]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [he]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [Ki]: { writable: !0, enumerable: !1, configurable: !1, value: null }
});
let xn;
function Fs(i, t, e, n) {
  const { length: r = 0 } = i;
  let s = typeof t != "number" ? 0 : t, o = typeof e != "number" ? r : e;
  return s < 0 && (s = (s % r + r) % r), o < 0 && (o = (o % r + r) % r), o < s && (xn = s, s = o, o = xn), o > r && (o = r), n ? n(i, s, o) : [s, o];
}
const un = (i, t) => i < 0 ? t + i : i, Cn = (i) => i !== i;
function _e(i) {
  if (typeof i !== "object" || i === null)
    return Cn(i) ? Cn : (e) => e === i;
  if (i instanceof Date) {
    const e = i.valueOf();
    return (n) => n instanceof Date ? n.valueOf() === e : !1;
  }
  return ArrayBuffer.isView(i) ? (e) => e ? wo(i, e) : !1 : i instanceof Map ? Aa(i) : Array.isArray(i) ? Da(i) : i instanceof C ? Fa(i) : Oa(i, !0);
}
function Da(i) {
  const t = [];
  for (let e = -1, n = i.length; ++e < n; )
    t[e] = _e(i[e]);
  return Mi(t);
}
function Aa(i) {
  let t = -1;
  const e = [];
  for (const n of i.values())
    e[++t] = _e(n);
  return Mi(e);
}
function Fa(i) {
  const t = [];
  for (let e = -1, n = i.length; ++e < n; )
    t[e] = _e(i.get(e));
  return Mi(t);
}
function Oa(i, t = !1) {
  const e = Object.keys(i);
  if (!t && e.length === 0)
    return () => !1;
  const n = [];
  for (let r = -1, s = e.length; ++r < s; )
    n[r] = _e(i[e[r]]);
  return Mi(n, e);
}
function Mi(i, t) {
  return (e) => {
    if (!e || typeof e != "object")
      return !1;
    switch (e.constructor) {
      case Array:
        return Na(i, e);
      case Map:
        return En(i, e, e.keys());
      case cn:
      case an:
      case Object:
      case void 0:
        return En(i, e, t || Object.keys(e));
    }
    return e instanceof C ? Ma(i, e) : !1;
  };
}
function Na(i, t) {
  const e = i.length;
  if (t.length !== e)
    return !1;
  for (let n = -1; ++n < e; )
    if (!i[n](t[n]))
      return !1;
  return !0;
}
function Ma(i, t) {
  const e = i.length;
  if (t.length !== e)
    return !1;
  for (let n = -1; ++n < e; )
    if (!i[n](t.get(n)))
      return !1;
  return !0;
}
function En(i, t, e) {
  const n = e[Symbol.iterator](), r = t instanceof Map ? t.keys() : Object.keys(t)[Symbol.iterator](), s = t instanceof Map ? t.values() : Object.values(t)[Symbol.iterator]();
  let o = 0;
  const a = i.length;
  let c = s.next(), l = n.next(), d = r.next();
  for (; o < a && !l.done && !d.done && !c.done && !(l.value !== d.value || !i[o](c.value)); ++o, l = n.next(), d = r.next(), c = s.next())
    ;
  return o === a && l.done && d.done && c.done ? !0 : (n.return && n.return(), r.return && r.return(), s.return && s.return(), !1);
}
function Os(i, t, e, n) {
  return (e & 1 << n) !== 0;
}
function Ua(i, t, e, n) {
  return (e & 1 << n) >> n;
}
function zn(i, t, e) {
  const n = e.byteLength + 7 & -8;
  if (i > 0 || e.byteLength < n) {
    const r = new Uint8Array(n);
    return r.set(i % 8 === 0 ? e.subarray(i >> 3) : (
      // Otherwise iterate each bit from the offset and return a new one
      Gi(new ln(e, i, t, null, Os)).subarray(0, n)
    )), r;
  }
  return e;
}
function Gi(i) {
  const t = [];
  let e = 0, n = 0, r = 0;
  for (const o of i)
    o && (r |= 1 << n), ++n === 8 && (t[e++] = r, r = n = 0);
  (e === 0 || n > 0) && (t[e++] = r);
  const s = new Uint8Array(t.length + 7 & -8);
  return s.set(t), s;
}
class ln {
  constructor(t, e, n, r, s) {
    this.bytes = t, this.length = n, this.context = r, this.get = s, this.bit = e % 8, this.byteIndex = e >> 3, this.byte = t[this.byteIndex++], this.index = 0;
  }
  next() {
    return this.index < this.length ? (this.bit === 8 && (this.bit = 0, this.byte = this.bytes[this.byteIndex++]), {
      value: this.get(this.context, this.index++, this.byte, this.bit++)
    }) : { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
function Zi(i, t, e) {
  if (e - t <= 0)
    return 0;
  if (e - t < 8) {
    let s = 0;
    for (const o of new ln(i, t, e - t, i, Ua))
      s += o;
    return s;
  }
  const n = e >> 3 << 3, r = t + (t % 8 === 0 ? 0 : 8 - t % 8);
  return (
    // Get the popcnt of bits between the left hand side, and the next highest multiple of 8
    Zi(i, t, r) + // Get the popcnt of bits between the right hand side, and the next lowest multiple of 8
    Zi(i, n, e) + // Get the popcnt of all bits between the left and right hand sides' multiples of 8
    Ta(i, r >> 3, n - r >> 3)
  );
}
function Ta(i, t, e) {
  let n = 0, r = Math.trunc(t);
  const s = new DataView(i.buffer, i.byteOffset, i.byteLength), o = e === void 0 ? i.byteLength : r + e;
  for (; o - r >= 4; )
    n += zi(s.getUint32(r)), r += 4;
  for (; o - r >= 2; )
    n += zi(s.getUint16(r)), r += 2;
  for (; o - r >= 1; )
    n += zi(s.getUint8(r)), r += 1;
  return n;
}
function zi(i) {
  let t = Math.trunc(i);
  return t = t - (t >>> 1 & 1431655765), t = (t & 858993459) + (t >>> 2 & 858993459), (t + (t >>> 4) & 252645135) * 16843009 >>> 24;
}
const La = -1;
class L {
  get typeId() {
    return this.type.typeId;
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get buffers() {
    return [this.valueOffsets, this.values, this.nullBitmap, this.typeIds];
  }
  get nullable() {
    if (this._nullCount !== 0) {
      const { type: t } = this;
      return h.isSparseUnion(t) ? this.children.some((e) => e.nullable) : h.isDenseUnion(t) ? this.children.some((e) => e.nullable) : this.nullBitmap && this.nullBitmap.byteLength > 0;
    }
    return !0;
  }
  get byteLength() {
    let t = 0;
    const { valueOffsets: e, values: n, nullBitmap: r, typeIds: s } = this;
    return e && (t += e.byteLength), n && (t += n.byteLength), r && (t += r.byteLength), s && (t += s.byteLength), this.children.reduce((o, a) => o + a.byteLength, t);
  }
  get nullCount() {
    if (h.isUnion(this.type))
      return this.children.reduce((n, r) => n + r.nullCount, 0);
    let t = this._nullCount, e;
    return t <= La && (e = this.nullBitmap) && (this._nullCount = t = e.length === 0 ? (
      // no null bitmap, so all values are valid
      0
    ) : this.length - Zi(e, this.offset, this.offset + this.length)), t;
  }
  constructor(t, e, n, r, s, o = [], a) {
    this.type = t, this.children = o, this.dictionary = a, this.offset = Math.floor(Math.max(e || 0, 0)), this.length = Math.floor(Math.max(n || 0, 0)), this._nullCount = Math.floor(Math.max(r || 0, -1));
    let c;
    s instanceof L ? (this.stride = s.stride, this.values = s.values, this.typeIds = s.typeIds, this.nullBitmap = s.nullBitmap, this.valueOffsets = s.valueOffsets) : (this.stride = Ot(t), s && ((c = s[0]) && (this.valueOffsets = c), (c = s[1]) && (this.values = c), (c = s[2]) && (this.nullBitmap = c), (c = s[3]) && (this.typeIds = c)));
  }
  getValid(t) {
    const { type: e } = this;
    if (h.isUnion(e)) {
      const n = e, r = this.children[n.typeIdToChildIndex[this.typeIds[t]]], s = n.mode === X.Dense ? this.valueOffsets[t] : t;
      return r.getValid(s);
    }
    if (this.nullable && this.nullCount > 0) {
      const n = this.offset + t;
      return (this.nullBitmap[n >> 3] & 1 << n % 8) !== 0;
    }
    return !0;
  }
  setValid(t, e) {
    let n;
    const { type: r } = this;
    if (h.isUnion(r)) {
      const s = r, o = this.children[s.typeIdToChildIndex[this.typeIds[t]]], a = s.mode === X.Dense ? this.valueOffsets[t] : t;
      n = o.getValid(a), o.setValid(a, e);
    } else {
      let { nullBitmap: s } = this;
      const { offset: o, length: a } = this, c = o + t, l = 1 << c % 8, d = c >> 3;
      (!s || s.byteLength <= d) && (s = new Uint8Array((o + a + 63 & -64) >> 3).fill(255), this.nullCount > 0 ? (s.set(zn(o, a, this.nullBitmap), 0), Object.assign(this, { nullBitmap: s })) : Object.assign(this, { nullBitmap: s, _nullCount: 0 }));
      const f = s[d];
      n = (f & l) !== 0, s[d] = e ? f | l : f & ~l;
    }
    return n !== !!e && (this._nullCount = this.nullCount + (e ? -1 : 1)), e;
  }
  clone(t = this.type, e = this.offset, n = this.length, r = this._nullCount, s = this, o = this.children) {
    return new L(t, e, n, r, s, o, this.dictionary);
  }
  slice(t, e) {
    const { stride: n, typeId: r, children: s } = this, o = +(this._nullCount === 0) - 1, a = r === 16 ? n : 1, c = this._sliceBuffers(t, e, n, r);
    return this.clone(
      this.type,
      this.offset + t,
      e,
      o,
      c,
      // Don't slice children if we have value offsets (the variable-width types)
      s.length === 0 || this.valueOffsets ? s : this._sliceChildren(s, a * t, a * e)
    );
  }
  _changeLengthAndBackfillNullBitmap(t) {
    if (this.typeId === u.Null)
      return this.clone(this.type, 0, t, 0);
    const { length: e, nullCount: n } = this, r = new Uint8Array((t + 63 & -64) >> 3).fill(255, 0, e >> 3);
    r[e >> 3] = (1 << e - (e & -8)) - 1, n > 0 && r.set(zn(this.offset, e, this.nullBitmap), 0);
    const s = this.buffers;
    return s[Ft.VALIDITY] = r, this.clone(this.type, 0, t, n + (t - e), s);
  }
  _sliceBuffers(t, e, n, r) {
    let s;
    const { buffers: o } = this;
    return (s = o[Ft.TYPE]) && (o[Ft.TYPE] = s.subarray(t, t + e)), (s = o[Ft.OFFSET]) && (o[Ft.OFFSET] = s.subarray(t, t + e + 1)) || // Otherwise if no offsets, slice the data buffer. Don't slice the data vector for Booleans, since the offset goes by bits not bytes
    (s = o[Ft.DATA]) && (o[Ft.DATA] = r === 6 ? s : s.subarray(n * t, n * (t + e))), o;
  }
  _sliceChildren(t, e, n) {
    return t.map((r) => r.slice(e, n));
  }
}
L.prototype.children = Object.freeze([]);
class Me extends F {
  visit(t) {
    return this.getVisitFn(t.type).call(this, t);
  }
  visitNull(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["length"]: r = 0 } = t;
    return new L(e, n, r, r);
  }
  visitBool(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length >> 3, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitInt(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitFloat(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitUtf8(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.data), s = O(t.nullBitmap), o = we(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, a, c, [o, r, s]);
  }
  visitLargeUtf8(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.data), s = O(t.nullBitmap), o = Bn(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, a, c, [o, r, s]);
  }
  visitBinary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.data), s = O(t.nullBitmap), o = we(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, a, c, [o, r, s]);
  }
  visitLargeBinary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.data), s = O(t.nullBitmap), o = Bn(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, a, c, [o, r, s]);
  }
  visitFixedSizeBinary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length / Ot(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitDate(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length / Ot(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitTimestamp(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length / Ot(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitTime(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length / Ot(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitDecimal(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length / Ot(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitList(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: r } = t, s = O(t.nullBitmap), o = we(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, a, c, [o, void 0, s], [r]);
  }
  visitStruct(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["children"]: r = [] } = t, s = O(t.nullBitmap), { length: o = r.reduce((c, { length: l }) => Math.max(c, l), 0), nullCount: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, void 0, s], r);
  }
  visitUnion(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["children"]: r = [] } = t, s = x(e.ArrayType, t.typeIds), { ["length"]: o = s.length, ["nullCount"]: a = -1 } = t;
    if (h.isSparseUnion(e))
      return new L(e, n, o, a, [void 0, void 0, void 0, s], r);
    const c = we(t.valueOffsets);
    return new L(e, n, o, a, [c, void 0, void 0, s], r);
  }
  visitDictionary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.indices.ArrayType, t.data), { ["dictionary"]: o = new C([new Me().visit({ type: e.dictionary })]) } = t, { ["length"]: a = s.length, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, a, c, [void 0, s, r], [], o);
  }
  visitInterval(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length / Ot(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitDuration(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = O(t.nullBitmap), s = x(e.ArrayType, t.data), { ["length"]: o = s.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, s, r]);
  }
  visitFixedSizeList(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: r = new Me().visit({ type: e.valueType }) } = t, s = O(t.nullBitmap), { ["length"]: o = r.length / Ot(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, o, a, [void 0, void 0, s], [r]);
  }
  visitMap(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: r = new Me().visit({ type: e.childType }) } = t, s = O(t.nullBitmap), o = we(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new L(e, n, a, c, [o, void 0, s], [r]);
  }
}
const Ra = new Me();
function A(i) {
  return Ra.visit(i);
}
class Vn {
  constructor(t = 0, e) {
    this.numChunks = t, this.getChunkIterator = e, this.chunkIndex = 0, this.chunkIterator = this.getChunkIterator(0);
  }
  next() {
    for (; this.chunkIndex < this.numChunks; ) {
      const t = this.chunkIterator.next();
      if (!t.done)
        return t;
      ++this.chunkIndex < this.numChunks && (this.chunkIterator = this.getChunkIterator(this.chunkIndex));
    }
    return { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
function xa(i) {
  return i.some((t) => t.nullable);
}
function Ns(i) {
  return i.reduce((t, e) => t + e.nullCount, 0);
}
function Ms(i) {
  return i.reduce((t, e, n) => (t[n + 1] = t[n] + e.length, t), new Uint32Array(i.length + 1));
}
function Us(i, t, e, n) {
  const r = [];
  for (let s = -1, o = i.length; ++s < o; ) {
    const a = i[s], c = t[s], { length: l } = a;
    if (c >= n)
      break;
    if (e >= c + l)
      continue;
    if (c >= e && c + l <= n) {
      r.push(a);
      continue;
    }
    const d = Math.max(0, e - c), f = Math.min(n - c, l);
    r.push(a.slice(d, f - d));
  }
  return r.length === 0 && r.push(i[0].slice(0, 0)), r;
}
function dn(i, t, e, n) {
  let r = 0, s = 0, o = t.length - 1;
  do {
    if (r >= o - 1)
      return e < t[o] ? n(i, r, e - t[r]) : null;
    s = r + Math.trunc((o - r) * 0.5), e < t[s] ? o = s : r = s;
  } while (r < o);
}
function hn(i, t) {
  return i.getValid(t);
}
function _i(i) {
  function t(e, n, r) {
    return i(e[n], r);
  }
  return function(e) {
    const n = this.data;
    return dn(n, this._offsets, e, t);
  };
}
function Ts(i) {
  let t;
  function e(n, r, s) {
    return i(n[r], s, t);
  }
  return function(n, r) {
    const s = this.data;
    t = r;
    const o = dn(s, this._offsets, n, e);
    return t = void 0, o;
  };
}
function Ls(i) {
  let t;
  function e(n, r, s) {
    let o = s, a = 0, c = 0;
    for (let l = r - 1, d = n.length; ++l < d; ) {
      const f = n[l];
      if (~(a = i(f, t, o)))
        return c + a;
      o = 0, c += f.length;
    }
    return -1;
  }
  return function(n, r) {
    t = n;
    const s = this.data, o = typeof r != "number" ? e(s, 0, 0) : dn(s, this._offsets, r, e);
    return t = void 0, o;
  };
}
class y extends F {
}
function Ca(i, t) {
  return t === null && i.length > 0 ? 0 : -1;
}
function Ea(i, t) {
  const { nullBitmap: e } = i;
  if (!e || i.nullCount <= 0)
    return -1;
  let n = 0;
  for (const r of new ln(e, i.offset + (t || 0), i.length, e, Os)) {
    if (!r)
      return n;
    ++n;
  }
  return -1;
}
function S(i, t, e) {
  if (t === void 0)
    return -1;
  if (t === null)
    switch (i.typeId) {
      // Unions don't have a nullBitmap of its own, so compare the `searchElement` to `get()`.
      case u.Union:
        break;
      // Dictionaries do have a nullBitmap, but their dictionary could also have null elements.
      case u.Dictionary:
        break;
      // All other types can iterate the null bitmap
      default:
        return Ea(i, e);
    }
  const n = Q.getVisitFn(i), r = _e(t);
  for (let s = (e || 0) - 1, o = i.length; ++s < o; )
    if (r(n(i, s)))
      return s;
  return -1;
}
function Rs(i, t, e) {
  const n = Q.getVisitFn(i), r = _e(t);
  for (let s = (e || 0) - 1, o = i.length; ++s < o; )
    if (r(n(i, s)))
      return s;
  return -1;
}
y.prototype.visitNull = Ca;
y.prototype.visitBool = S;
y.prototype.visitInt = S;
y.prototype.visitInt8 = S;
y.prototype.visitInt16 = S;
y.prototype.visitInt32 = S;
y.prototype.visitInt64 = S;
y.prototype.visitUint8 = S;
y.prototype.visitUint16 = S;
y.prototype.visitUint32 = S;
y.prototype.visitUint64 = S;
y.prototype.visitFloat = S;
y.prototype.visitFloat16 = S;
y.prototype.visitFloat32 = S;
y.prototype.visitFloat64 = S;
y.prototype.visitUtf8 = S;
y.prototype.visitLargeUtf8 = S;
y.prototype.visitBinary = S;
y.prototype.visitLargeBinary = S;
y.prototype.visitFixedSizeBinary = S;
y.prototype.visitDate = S;
y.prototype.visitDateDay = S;
y.prototype.visitDateMillisecond = S;
y.prototype.visitTimestamp = S;
y.prototype.visitTimestampSecond = S;
y.prototype.visitTimestampMillisecond = S;
y.prototype.visitTimestampMicrosecond = S;
y.prototype.visitTimestampNanosecond = S;
y.prototype.visitTime = S;
y.prototype.visitTimeSecond = S;
y.prototype.visitTimeMillisecond = S;
y.prototype.visitTimeMicrosecond = S;
y.prototype.visitTimeNanosecond = S;
y.prototype.visitDecimal = S;
y.prototype.visitList = S;
y.prototype.visitStruct = S;
y.prototype.visitUnion = S;
y.prototype.visitDenseUnion = Rs;
y.prototype.visitSparseUnion = Rs;
y.prototype.visitDictionary = S;
y.prototype.visitInterval = S;
y.prototype.visitIntervalDayTime = S;
y.prototype.visitIntervalYearMonth = S;
y.prototype.visitDuration = S;
y.prototype.visitDurationSecond = S;
y.prototype.visitDurationMillisecond = S;
y.prototype.visitDurationMicrosecond = S;
y.prototype.visitDurationNanosecond = S;
y.prototype.visitFixedSizeList = S;
y.prototype.visitMap = S;
const vi = new y();
class m extends F {
}
function w(i) {
  const { type: t } = i;
  if (i.nullCount === 0 && i.stride === 1 && // Don't defer to native iterator for timestamps since Numbers are expected
  // (DataType.isTimestamp(type)) && type.unit === TimeUnit.MILLISECOND ||
  (h.isInt(t) && t.bitWidth !== 64 || h.isTime(t) && t.bitWidth !== 64 || h.isFloat(t) && t.precision !== J.HALF))
    return new Vn(i.data.length, (n) => {
      const r = i.data[n];
      return r.values.subarray(0, r.length)[Symbol.iterator]();
    });
  let e = 0;
  return new Vn(i.data.length, (n) => {
    const s = i.data[n].length, o = i.slice(e, e + s);
    return e += s, new za(o);
  });
}
class za {
  constructor(t) {
    this.vector = t, this.index = 0;
  }
  next() {
    return this.index < this.vector.length ? {
      value: this.vector.get(this.index++)
    } : { done: !0, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
}
m.prototype.visitNull = w;
m.prototype.visitBool = w;
m.prototype.visitInt = w;
m.prototype.visitInt8 = w;
m.prototype.visitInt16 = w;
m.prototype.visitInt32 = w;
m.prototype.visitInt64 = w;
m.prototype.visitUint8 = w;
m.prototype.visitUint16 = w;
m.prototype.visitUint32 = w;
m.prototype.visitUint64 = w;
m.prototype.visitFloat = w;
m.prototype.visitFloat16 = w;
m.prototype.visitFloat32 = w;
m.prototype.visitFloat64 = w;
m.prototype.visitUtf8 = w;
m.prototype.visitLargeUtf8 = w;
m.prototype.visitBinary = w;
m.prototype.visitLargeBinary = w;
m.prototype.visitFixedSizeBinary = w;
m.prototype.visitDate = w;
m.prototype.visitDateDay = w;
m.prototype.visitDateMillisecond = w;
m.prototype.visitTimestamp = w;
m.prototype.visitTimestampSecond = w;
m.prototype.visitTimestampMillisecond = w;
m.prototype.visitTimestampMicrosecond = w;
m.prototype.visitTimestampNanosecond = w;
m.prototype.visitTime = w;
m.prototype.visitTimeSecond = w;
m.prototype.visitTimeMillisecond = w;
m.prototype.visitTimeMicrosecond = w;
m.prototype.visitTimeNanosecond = w;
m.prototype.visitDecimal = w;
m.prototype.visitList = w;
m.prototype.visitStruct = w;
m.prototype.visitUnion = w;
m.prototype.visitDenseUnion = w;
m.prototype.visitSparseUnion = w;
m.prototype.visitDictionary = w;
m.prototype.visitInterval = w;
m.prototype.visitIntervalDayTime = w;
m.prototype.visitIntervalYearMonth = w;
m.prototype.visitDuration = w;
m.prototype.visitDurationSecond = w;
m.prototype.visitDurationMillisecond = w;
m.prototype.visitDurationMicrosecond = w;
m.prototype.visitDurationNanosecond = w;
m.prototype.visitFixedSizeList = w;
m.prototype.visitMap = w;
const fn = new m();
var xs;
const Cs = {}, Es = {};
class C {
  constructor(t) {
    var e, n, r;
    const s = t[0] instanceof C ? t.flatMap((a) => a.data) : t;
    if (s.length === 0 || s.some((a) => !(a instanceof L)))
      throw new TypeError("Vector constructor expects an Array of Data instances.");
    const o = (e = s[0]) === null || e === void 0 ? void 0 : e.type;
    switch (s.length) {
      case 0:
        this._offsets = [0];
        break;
      case 1: {
        const { get: a, set: c, indexOf: l } = Cs[o.typeId], d = s[0];
        this.isValid = (f) => hn(d, f), this.get = (f) => a(d, f), this.set = (f, $) => c(d, f, $), this.indexOf = (f) => l(d, f), this._offsets = [0, d.length];
        break;
      }
      default:
        Object.setPrototypeOf(this, Es[o.typeId]), this._offsets = Ms(s);
        break;
    }
    this.data = s, this.type = o, this.stride = Ot(o), this.numChildren = (r = (n = o.children) === null || n === void 0 ? void 0 : n.length) !== null && r !== void 0 ? r : 0, this.length = this._offsets.at(-1);
  }
  /**
   * The aggregate size (in bytes) of this Vector's buffers and/or child Vectors.
   */
  get byteLength() {
    return this.data.reduce((t, e) => t + e.byteLength, 0);
  }
  /**
   * Whether this Vector's elements can contain null values.
   */
  get nullable() {
    return xa(this.data);
  }
  /**
   * The number of null elements in this Vector.
   */
  get nullCount() {
    return Ns(this.data);
  }
  /**
   * The Array or TypedArray constructor used for the JS representation
   *  of the element's values in {@link Vector.prototype.toArray `toArray()`}.
   */
  get ArrayType() {
    return this.type.ArrayType;
  }
  /**
   * The name that should be printed when the Vector is logged in a message.
   */
  get [Symbol.toStringTag]() {
    return `${this.VectorName}<${this.type[Symbol.toStringTag]}>`;
  }
  /**
   * The name of this Vector.
   */
  get VectorName() {
    return `${u[this.type.typeId]}Vector`;
  }
  /**
   * Check whether an element is null.
   * @param index The index at which to read the validity bitmap.
   */
  // @ts-ignore
  isValid(t) {
    return !1;
  }
  /**
   * Get an element value by position.
   * @param index The index of the element to read.
   */
  // @ts-ignore
  get(t) {
    return null;
  }
  /**
   * Get an element value by position.
   * @param index The index of the element to read. A negative index will count back from the last element.
   */
  at(t) {
    return this.get(un(t, this.length));
  }
  /**
   * Set an element value by position.
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  // @ts-ignore
  set(t, e) {
  }
  /**
   * Retrieve the index of the first occurrence of a value in an Vector.
   * @param element The value to locate in the Vector.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  // @ts-ignore
  indexOf(t, e) {
    return -1;
  }
  includes(t, e) {
    return this.indexOf(t, e) > -1;
  }
  /**
   * Iterator for the Vector's elements.
   */
  [Symbol.iterator]() {
    return fn.visit(this);
  }
  /**
   * Combines two or more Vectors of the same type.
   * @param others Additional Vectors to add to the end of this Vector.
   */
  concat(...t) {
    return new C(this.data.concat(t.flatMap((e) => e.data).flat(Number.POSITIVE_INFINITY)));
  }
  /**
   * Return a zero-copy sub-section of this Vector.
   * @param start The beginning of the specified portion of the Vector.
   * @param end The end of the specified portion of the Vector. This is exclusive of the element at the index 'end'.
   */
  slice(t, e) {
    return new C(Fs(this, t, e, ({ data: n, _offsets: r }, s, o) => Us(n, r, s, o)));
  }
  toJSON() {
    return [...this];
  }
  /**
   * Return a JavaScript Array or TypedArray of the Vector's elements.
   *
   * @note If this Vector contains a single Data chunk and the Vector's type is a
   *  primitive numeric type corresponding to one of the JavaScript TypedArrays, this
   *  method returns a zero-copy slice of the underlying TypedArray values. If there's
   *  more than one chunk, the resulting TypedArray will be a copy of the data from each
   *  chunk's underlying TypedArray values.
   *
   * @returns An Array or TypedArray of the Vector's elements, based on the Vector's DataType.
   */
  toArray() {
    const { type: t, data: e, length: n, stride: r, ArrayType: s } = this;
    switch (t.typeId) {
      case u.Int:
      case u.Float:
      case u.Decimal:
      case u.Time:
      case u.Timestamp:
        switch (e.length) {
          case 0:
            return new s();
          case 1:
            return e[0].values.subarray(0, n * r);
          default:
            return e.reduce((o, { values: a, length: c }) => (o.array.set(a.subarray(0, c * r), o.offset), o.offset += c * r, o), { array: new s(n * r), offset: 0 }).array;
        }
    }
    return [...this];
  }
  /**
   * Returns a string representation of the Vector.
   *
   * @returns A string representation of the Vector.
   */
  toString() {
    return `[${[...this].join(",")}]`;
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    var e;
    return this.getChildAt((e = this.type.children) === null || e === void 0 ? void 0 : e.findIndex((n) => n.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    return t > -1 && t < this.numChildren ? new C(this.data.map(({ children: e }) => e[t])) : null;
  }
  get isMemoized() {
    return h.isDictionary(this.type) ? this.data[0].dictionary.isMemoized : !1;
  }
  /**
   * Adds memoization to the Vector's {@link get} method. For dictionary
   * vectors, this method return a vector that memoizes only the dictionary
   * values.
   *
   * Memoization is very useful when decoding a value is expensive such as
   * Utf8. The memoization creates a cache of the size of the Vector and
   * therefore increases memory usage.
   *
   * @returns A new vector that memoizes calls to {@link get}.
   */
  memoize() {
    if (h.isDictionary(this.type)) {
      const t = new wi(this.data[0].dictionary), e = this.data.map((n) => {
        const r = n.clone();
        return r.dictionary = t, r;
      });
      return new C(e);
    }
    return new wi(this);
  }
  /**
   * Returns a vector without memoization of the {@link get} method. If this
   * vector is not memoized, this method returns this vector.
   *
   * @returns A new vector without memoization.
   */
  unmemoize() {
    if (h.isDictionary(this.type) && this.isMemoized) {
      const t = this.data[0].dictionary.unmemoize(), e = this.data.map((n) => {
        const r = n.clone();
        return r.dictionary = t, r;
      });
      return new C(e);
    }
    return this;
  }
}
xs = Symbol.toStringTag;
C[xs] = ((i) => {
  i.type = h.prototype, i.data = [], i.length = 0, i.stride = 1, i.numChildren = 0, i._offsets = new Uint32Array([0]), i[Symbol.isConcatSpreadable] = !0;
  const t = Object.keys(u).map((e) => u[e]).filter((e) => typeof e == "number" && e !== u.NONE);
  for (const e of t) {
    const n = Q.getVisitFnByTypeId(e), r = ct.getVisitFnByTypeId(e), s = vi.getVisitFnByTypeId(e);
    Cs[e] = { get: n, set: r, indexOf: s }, Es[e] = Object.create(i, {
      isValid: { value: _i(hn) },
      get: { value: _i(Q.getVisitFnByTypeId(e)) },
      set: { value: Ts(ct.getVisitFnByTypeId(e)) },
      indexOf: { value: Ls(vi.getVisitFnByTypeId(e)) }
    });
  }
  return "Vector";
})(C.prototype);
class wi extends C {
  constructor(t) {
    super(t.data);
    const e = this.get, n = this.set, r = this.slice, s = new Array(this.length);
    Object.defineProperty(this, "get", {
      value(o) {
        const a = s[o];
        if (a !== void 0)
          return a;
        const c = e.call(this, o);
        return s[o] = c, c;
      }
    }), Object.defineProperty(this, "set", {
      value(o, a) {
        n.call(this, o, a), s[o] = a;
      }
    }), Object.defineProperty(this, "slice", {
      value: (o, a) => new wi(r.call(this, o, a))
    }), Object.defineProperty(this, "isMemoized", { value: !0 }), Object.defineProperty(this, "unmemoize", {
      value: () => new C(this.data)
    }), Object.defineProperty(this, "memoize", {
      value: () => this
    });
  }
}
class qi {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  /**
   * Index to the start of the RecordBlock (note this is past the Message header)
   */
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * Length of the metadata
   */
  metaDataLength() {
    return this.bb.readInt32(this.bb_pos + 8);
  }
  /**
   * Length of the data (this is aligned so there can be a gap between this and
   * the metadata).
   */
  bodyLength() {
    return this.bb.readInt64(this.bb_pos + 16);
  }
  static sizeOf() {
    return 24;
  }
  static createBlock(t, e, n, r) {
    return t.prep(8, 24), t.writeInt64(BigInt(r ?? 0)), t.pad(4), t.writeInt32(n), t.writeInt64(BigInt(e ?? 0)), t.offset();
  }
}
class tt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFooter(t, e) {
    return (e || new tt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFooter(t, e) {
    return t.setPosition(t.position() + T), (e || new tt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : j.V1;
  }
  schema(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new mt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  dictionaries(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new qi()).__init(this.bb.__vector(this.bb_pos + n) + t * 24, this.bb) : null;
  }
  dictionariesLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  recordBatches(t, e) {
    const n = this.bb.__offset(this.bb_pos, 10);
    return n ? (e || new qi()).__init(this.bb.__vector(this.bb_pos + n) + t * 24, this.bb) : null;
  }
  recordBatchesLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  /**
   * User-defined metadata
   */
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 12);
    return n ? (e || new W()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFooter(t) {
    t.startObject(5);
  }
  static addVersion(t, e) {
    t.addFieldInt16(0, e, j.V1);
  }
  static addSchema(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addDictionaries(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static startDictionariesVector(t, e) {
    t.startVector(24, e, 8);
  }
  static addRecordBatches(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static startRecordBatchesVector(t, e) {
    t.startVector(24, e, 8);
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endFooter(t) {
    return t.endObject();
  }
  static finishFooterBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedFooterBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
}
class U {
  constructor(t = [], e, n, r = j.V5) {
    this.fields = t || [], this.metadata = e || /* @__PURE__ */ new Map(), n || (n = Xi(this.fields)), this.dictionaries = n, this.metadataVersion = r;
  }
  get [Symbol.toStringTag]() {
    return "Schema";
  }
  get names() {
    return this.fields.map((t) => t.name);
  }
  toString() {
    return `Schema<{ ${this.fields.map((t, e) => `${e}: ${t}`).join(", ")} }>`;
  }
  /**
   * Construct a new Schema containing only specified fields.
   *
   * @param fieldNames Names of fields to keep.
   * @returns A new Schema of fields matching the specified names.
   */
  select(t) {
    const e = new Set(t), n = this.fields.filter((r) => e.has(r.name));
    return new U(n, this.metadata);
  }
  /**
   * Construct a new Schema containing only fields at the specified indices.
   *
   * @param fieldIndices Indices of fields to keep.
   * @returns A new Schema of fields at the specified indices.
   */
  selectAt(t) {
    const e = t.map((n) => this.fields[n]).filter(Boolean);
    return new U(e, this.metadata);
  }
  assign(...t) {
    const e = t[0] instanceof U ? t[0] : Array.isArray(t[0]) ? new U(t[0]) : new U(t), n = [...this.fields], r = je(je(/* @__PURE__ */ new Map(), this.metadata), e.metadata), s = e.fields.filter((a) => {
      const c = n.findIndex((l) => l.name === a.name);
      return ~c ? (n[c] = a.clone({
        metadata: je(je(/* @__PURE__ */ new Map(), n[c].metadata), a.metadata)
      })) && !1 : !0;
    }), o = Xi(s, /* @__PURE__ */ new Map());
    return new U([...n, ...s], r, new Map([...this.dictionaries, ...o]));
  }
}
U.prototype.fields = null;
U.prototype.metadata = null;
U.prototype.dictionaries = null;
class V {
  /** @nocollapse */
  static new(...t) {
    let [e, n, r, s] = t;
    return t[0] && typeof t[0] == "object" && ({ name: e } = t[0], n === void 0 && (n = t[0].type), r === void 0 && (r = t[0].nullable), s === void 0 && (s = t[0].metadata)), new V(`${e}`, n, r, s);
  }
  constructor(t, e, n = !1, r) {
    this.name = t, this.type = e, this.nullable = n, this.metadata = r || /* @__PURE__ */ new Map();
  }
  get typeId() {
    return this.type.typeId;
  }
  get [Symbol.toStringTag]() {
    return "Field";
  }
  toString() {
    return `${this.name}: ${this.type}`;
  }
  clone(...t) {
    let [e, n, r, s] = t;
    return !t[0] || typeof t[0] != "object" ? [e = this.name, n = this.type, r = this.nullable, s = this.metadata] = t : { name: e = this.name, type: n = this.type, nullable: r = this.nullable, metadata: s = this.metadata } = t[0], V.new(e, n, r, s);
  }
}
V.prototype.type = null;
V.prototype.name = null;
V.prototype.nullable = null;
V.prototype.metadata = null;
function je(i, t) {
  return new Map([...i || /* @__PURE__ */ new Map(), ...t || /* @__PURE__ */ new Map()]);
}
function Xi(i, t = /* @__PURE__ */ new Map()) {
  for (let e = -1, n = i.length; ++e < n; ) {
    const s = i[e].type;
    if (h.isDictionary(s)) {
      if (!t.has(s.id))
        t.set(s.id, s.dictionary);
      else if (t.get(s.id) !== s.dictionary)
        throw new Error("Cannot create Schema containing two different dictionaries with the same Id");
    }
    s.children && s.children.length > 0 && Xi(s.children, t);
  }
  return t;
}
var Va = ar, ka = fe;
class pn {
  /** @nocollapse */
  static decode(t) {
    t = new ka(O(t));
    const e = tt.getRootAsFooter(t), n = U.decode(e.schema(), /* @__PURE__ */ new Map(), e.version());
    return new Pa(n, e);
  }
  /** @nocollapse */
  static encode(t) {
    const e = new Va(), n = U.encode(e, t.schema);
    tt.startRecordBatchesVector(e, t.numRecordBatches);
    for (const o of [...t.recordBatches()].slice().reverse())
      me.encode(e, o);
    const r = e.endVector();
    tt.startDictionariesVector(e, t.numDictionaries);
    for (const o of [...t.dictionaryBatches()].slice().reverse())
      me.encode(e, o);
    const s = e.endVector();
    return tt.startFooter(e), tt.addSchema(e, n), tt.addVersion(e, j.V5), tt.addRecordBatches(e, r), tt.addDictionaries(e, s), tt.finishFooterBuffer(e, tt.endFooter(e)), e.asUint8Array();
  }
  get numRecordBatches() {
    return this._recordBatches.length;
  }
  get numDictionaries() {
    return this._dictionaryBatches.length;
  }
  constructor(t, e = j.V5, n, r) {
    this.schema = t, this.version = e, n && (this._recordBatches = n), r && (this._dictionaryBatches = r);
  }
  *recordBatches() {
    for (let t, e = -1, n = this.numRecordBatches; ++e < n; )
      (t = this.getRecordBatch(e)) && (yield t);
  }
  *dictionaryBatches() {
    for (let t, e = -1, n = this.numDictionaries; ++e < n; )
      (t = this.getDictionaryBatch(e)) && (yield t);
  }
  getRecordBatch(t) {
    return t >= 0 && t < this.numRecordBatches && this._recordBatches[t] || null;
  }
  getDictionaryBatch(t) {
    return t >= 0 && t < this.numDictionaries && this._dictionaryBatches[t] || null;
  }
}
class Pa extends pn {
  get numRecordBatches() {
    return this._footer.recordBatchesLength();
  }
  get numDictionaries() {
    return this._footer.dictionariesLength();
  }
  constructor(t, e) {
    super(t, e.version()), this._footer = e;
  }
  getRecordBatch(t) {
    if (t >= 0 && t < this.numRecordBatches) {
      const e = this._footer.recordBatches(t);
      if (e)
        return me.decode(e);
    }
    return null;
  }
  getDictionaryBatch(t) {
    if (t >= 0 && t < this.numDictionaries) {
      const e = this._footer.dictionaries(t);
      if (e)
        return me.decode(e);
    }
    return null;
  }
}
class me {
  /** @nocollapse */
  static decode(t) {
    return new me(t.metaDataLength(), t.bodyLength(), t.offset());
  }
  /** @nocollapse */
  static encode(t, e) {
    const { metaDataLength: n } = e, r = BigInt(e.offset), s = BigInt(e.bodyLength);
    return qi.createBlock(t, r, n, s);
  }
  constructor(t, e, n) {
    this.metaDataLength = t, this.offset = z(n), this.bodyLength = z(e);
  }
}
const P = Object.freeze({ done: !0, value: void 0 });
class kn {
  constructor(t) {
    this._json = t;
  }
  get schema() {
    return this._json.schema;
  }
  get batches() {
    return this._json.batches || [];
  }
  get dictionaries() {
    return this._json.dictionaries || [];
  }
}
class zs {
  tee() {
    return this._getDOMStream().tee();
  }
  pipe(t, e) {
    return this._getNodeStream().pipe(t, e);
  }
  pipeTo(t, e) {
    return this._getDOMStream().pipeTo(t, e);
  }
  pipeThrough(t, e) {
    return this._getDOMStream().pipeThrough(t, e);
  }
  _getDOMStream() {
    return this._DOMStream || (this._DOMStream = this.toDOMStream());
  }
  _getNodeStream() {
    return this._nodeStream || (this._nodeStream = this.toNodeStream());
  }
}
class ja extends zs {
  constructor() {
    super(), this._values = [], this.resolvers = [], this._closedPromise = new Promise((t) => this._closedPromiseResolve = t);
  }
  get closed() {
    return this._closedPromise;
  }
  cancel(t) {
    return B(this, void 0, void 0, function* () {
      yield this.return(t);
    });
  }
  write(t) {
    this._ensureOpen() && (this.resolvers.length <= 0 ? this._values.push(t) : this.resolvers.shift().resolve({ done: !1, value: t }));
  }
  abort(t) {
    this._closedPromiseResolve && (this.resolvers.length <= 0 ? this._error = { error: t } : this.resolvers.shift().reject({ done: !0, value: t }));
  }
  close() {
    if (this._closedPromiseResolve) {
      const { resolvers: t } = this;
      for (; t.length > 0; )
        t.shift().resolve(P);
      this._closedPromiseResolve(), this._closedPromiseResolve = void 0;
    }
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  toDOMStream(t) {
    return nt.toDOMStream(this._closedPromiseResolve || this._error ? this : this._values, t);
  }
  toNodeStream(t) {
    return nt.toNodeStream(this._closedPromiseResolve || this._error ? this : this._values, t);
  }
  throw(t) {
    return B(this, void 0, void 0, function* () {
      return yield this.abort(t), P;
    });
  }
  return(t) {
    return B(this, void 0, void 0, function* () {
      return yield this.close(), P;
    });
  }
  read(t) {
    return B(this, void 0, void 0, function* () {
      return (yield this.next(t, "read")).value;
    });
  }
  peek(t) {
    return B(this, void 0, void 0, function* () {
      return (yield this.next(t, "peek")).value;
    });
  }
  next(...t) {
    return this._values.length > 0 ? Promise.resolve({ done: !1, value: this._values.shift() }) : this._error ? Promise.reject({ done: !0, value: this._error.error }) : this._closedPromiseResolve ? new Promise((e, n) => {
      this.resolvers.push({ resolve: e, reject: n });
    }) : Promise.resolve(P);
  }
  _ensureOpen() {
    if (this._closedPromiseResolve)
      return !0;
    throw new Error("AsyncQueue is closed");
  }
}
class $a extends ja {
  write(t) {
    if ((t = O(t)).byteLength > 0)
      return super.write(t);
  }
  toString(t = !1) {
    return t ? ji(this.toUint8Array(!0)) : this.toUint8Array(!1).then(ji);
  }
  toUint8Array(t = !1) {
    return t ? St(this._values)[0] : B(this, void 0, void 0, function* () {
      var e, n, r, s;
      const o = [];
      let a = 0;
      try {
        for (var c = !0, l = ce(this), d; d = yield l.next(), e = d.done, !e; c = !0) {
          s = d.value, c = !1;
          const f = s;
          o.push(f), a += f.byteLength;
        }
      } catch (f) {
        n = { error: f };
      } finally {
        try {
          !c && !e && (r = l.return) && (yield r.call(l));
        } finally {
          if (n) throw n.error;
        }
      }
      return St(o, a)[0];
    });
  }
}
class Ii {
  constructor(t) {
    t && (this.source = new Wa(nt.fromIterable(t)));
  }
  [Symbol.iterator]() {
    return this;
  }
  next(t) {
    return this.source.next(t);
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  peek(t) {
    return this.source.peek(t);
  }
  read(t) {
    return this.source.read(t);
  }
}
class ge {
  constructor(t) {
    t instanceof ge ? this.source = t.source : t instanceof $a ? this.source = new Yt(nt.fromAsyncIterable(t)) : rr(t) ? this.source = new Yt(nt.fromNodeStream(t)) : nn(t) ? this.source = new Yt(nt.fromDOMStream(t)) : ir(t) ? this.source = new Yt(nt.fromDOMStream(t.body)) : Ni(t) ? this.source = new Yt(nt.fromIterable(t)) : Ue(t) ? this.source = new Yt(nt.fromAsyncIterable(t)) : en(t) && (this.source = new Yt(nt.fromAsyncIterable(t)));
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next(t) {
    return this.source.next(t);
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  get closed() {
    return this.source.closed;
  }
  cancel(t) {
    return this.source.cancel(t);
  }
  peek(t) {
    return this.source.peek(t);
  }
  read(t) {
    return this.source.read(t);
  }
}
class Wa {
  constructor(t) {
    this.source = t;
  }
  cancel(t) {
    this.return(t);
  }
  peek(t) {
    return this.next(t, "peek").value;
  }
  read(t) {
    return this.next(t, "read").value;
  }
  next(t, e = "read") {
    return this.source.next({ cmd: e, size: t });
  }
  throw(t) {
    return Object.create(this.source.throw && this.source.throw(t) || P);
  }
  return(t) {
    return Object.create(this.source.return && this.source.return(t) || P);
  }
}
class Yt {
  constructor(t) {
    this.source = t, this._closedPromise = new Promise((e) => this._closedPromiseResolve = e);
  }
  cancel(t) {
    return B(this, void 0, void 0, function* () {
      yield this.return(t);
    });
  }
  get closed() {
    return this._closedPromise;
  }
  read(t) {
    return B(this, void 0, void 0, function* () {
      return (yield this.next(t, "read")).value;
    });
  }
  peek(t) {
    return B(this, void 0, void 0, function* () {
      return (yield this.next(t, "peek")).value;
    });
  }
  next(t) {
    return B(this, arguments, void 0, function* (e, n = "read") {
      return yield this.source.next({ cmd: n, size: e });
    });
  }
  throw(t) {
    return B(this, void 0, void 0, function* () {
      const e = this.source.throw && (yield this.source.throw(t)) || P;
      return this._closedPromiseResolve && this._closedPromiseResolve(), this._closedPromiseResolve = void 0, Object.create(e);
    });
  }
  return(t) {
    return B(this, void 0, void 0, function* () {
      const e = this.source.return && (yield this.source.return(t)) || P;
      return this._closedPromiseResolve && this._closedPromiseResolve(), this._closedPromiseResolve = void 0, Object.create(e);
    });
  }
}
class Pn extends Ii {
  constructor(t, e) {
    super(), this.position = 0, this.buffer = O(t), this.size = e === void 0 ? this.buffer.byteLength : e;
  }
  readInt32(t) {
    const { buffer: e, byteOffset: n } = this.readAt(t, 4);
    return new DataView(e, n).getInt32(0, !0);
  }
  seek(t) {
    return this.position = Math.min(t, this.size), t < this.size;
  }
  read(t) {
    const { buffer: e, size: n, position: r } = this;
    return e && r < n ? (typeof t != "number" && (t = Number.POSITIVE_INFINITY), this.position = Math.min(n, r + Math.min(n - r, t)), e.subarray(r, this.position)) : null;
  }
  readAt(t, e) {
    const n = this.buffer, r = Math.min(this.size, t + e);
    return n ? n.subarray(t, r) : new Uint8Array(e);
  }
  close() {
    this.buffer && (this.buffer = null);
  }
  throw(t) {
    return this.close(), { done: !0, value: t };
  }
  return(t) {
    return this.close(), { done: !0, value: t };
  }
}
class Si extends ge {
  constructor(t, e) {
    super(), this.position = 0, this._handle = t, typeof e == "number" ? this.size = e : this._pending = B(this, void 0, void 0, function* () {
      this.size = (yield t.stat()).size, delete this._pending;
    });
  }
  readInt32(t) {
    return B(this, void 0, void 0, function* () {
      const { buffer: e, byteOffset: n } = yield this.readAt(t, 4);
      return new DataView(e, n).getInt32(0, !0);
    });
  }
  seek(t) {
    return B(this, void 0, void 0, function* () {
      return this._pending && (yield this._pending), this.position = Math.min(t, this.size), t < this.size;
    });
  }
  read(t) {
    return B(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: e, size: n, position: r } = this;
      if (e && r < n) {
        typeof t != "number" && (t = Number.POSITIVE_INFINITY);
        let s = r, o = 0, a = 0;
        const c = Math.min(n, s + Math.min(n - s, t)), l = new Uint8Array(Math.max(0, (this.position = c) - s));
        for (; (s += a) < c && (o += a) < l.byteLength; )
          ({ bytesRead: a } = yield e.read(l, o, l.byteLength - o, s));
        return l;
      }
      return null;
    });
  }
  readAt(t, e) {
    return B(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: n, size: r } = this;
      if (n && t + e < r) {
        const s = Math.min(r, t + e), o = new Uint8Array(s - t);
        return (yield n.read(o, 0, e, t)).buffer;
      }
      return new Uint8Array(e);
    });
  }
  close() {
    return B(this, void 0, void 0, function* () {
      const t = this._handle;
      this._handle = null, t && (yield t.close());
    });
  }
  throw(t) {
    return B(this, void 0, void 0, function* () {
      return yield this.close(), { done: !0, value: t };
    });
  }
  return(t) {
    return B(this, void 0, void 0, function* () {
      return yield this.close(), { done: !0, value: t };
    });
  }
}
const Ya = 65536;
function ae(i) {
  return i < 0 && (i = 4294967295 + i + 1), `0x${i.toString(16)}`;
}
const be = 8, yn = [
  1,
  10,
  100,
  1e3,
  1e4,
  1e5,
  1e6,
  1e7,
  1e8
];
class Vs {
  constructor(t) {
    this.buffer = t;
  }
  high() {
    return this.buffer[1];
  }
  low() {
    return this.buffer[0];
  }
  _times(t) {
    const e = new Uint32Array([
      this.buffer[1] >>> 16,
      this.buffer[1] & 65535,
      this.buffer[0] >>> 16,
      this.buffer[0] & 65535
    ]), n = new Uint32Array([
      t.buffer[1] >>> 16,
      t.buffer[1] & 65535,
      t.buffer[0] >>> 16,
      t.buffer[0] & 65535
    ]);
    let r = e[3] * n[3];
    this.buffer[0] = r & 65535;
    let s = r >>> 16;
    return r = e[2] * n[3], s += r, r = e[3] * n[2] >>> 0, s += r, this.buffer[0] += s << 16, this.buffer[1] = s >>> 0 < r ? Ya : 0, this.buffer[1] += s >>> 16, this.buffer[1] += e[1] * n[3] + e[2] * n[2] + e[3] * n[1], this.buffer[1] += e[0] * n[3] + e[1] * n[2] + e[2] * n[1] + e[3] * n[0] << 16, this;
  }
  _plus(t) {
    const e = this.buffer[0] + t.buffer[0] >>> 0;
    this.buffer[1] += t.buffer[1], e < this.buffer[0] >>> 0 && ++this.buffer[1], this.buffer[0] = e;
  }
  lessThan(t) {
    return this.buffer[1] < t.buffer[1] || this.buffer[1] === t.buffer[1] && this.buffer[0] < t.buffer[0];
  }
  equals(t) {
    return this.buffer[1] === t.buffer[1] && this.buffer[0] == t.buffer[0];
  }
  greaterThan(t) {
    return t.lessThan(this);
  }
  hex() {
    return `${ae(this.buffer[1])} ${ae(this.buffer[0])}`;
  }
}
class R extends Vs {
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(2)) {
    return R.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(2)) {
    return R.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(2)) {
    const n = t.length, r = new R(e);
    for (let s = 0; s < n; ) {
      const o = be < n - s ? be : n - s, a = new R(new Uint32Array([Number.parseInt(t.slice(s, s + o), 10), 0])), c = new R(new Uint32Array([yn[o], 0]));
      r.times(c), r.plus(a), s += o;
    }
    return r;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 2);
    for (let n = -1, r = t.length; ++n < r; )
      R.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 2 * n * 4, 2));
    return e;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new R(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new R(new Uint32Array(t.buffer)).plus(e);
  }
}
class Z extends Vs {
  negate() {
    return this.buffer[0] = ~this.buffer[0] + 1, this.buffer[1] = ~this.buffer[1], this.buffer[0] == 0 && ++this.buffer[1], this;
  }
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  lessThan(t) {
    const e = this.buffer[1] << 0, n = t.buffer[1] << 0;
    return e < n || e === n && this.buffer[0] < t.buffer[0];
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(2)) {
    return Z.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(2)) {
    return Z.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(2)) {
    const n = t.startsWith("-"), r = t.length, s = new Z(e);
    for (let o = n ? 1 : 0; o < r; ) {
      const a = be < r - o ? be : r - o, c = new Z(new Uint32Array([Number.parseInt(t.slice(o, o + a), 10), 0])), l = new Z(new Uint32Array([yn[a], 0]));
      s.times(l), s.plus(c), o += a;
    }
    return n ? s.negate() : s;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 2);
    for (let n = -1, r = t.length; ++n < r; )
      Z.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 2 * n * 4, 2));
    return e;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new Z(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new Z(new Uint32Array(t.buffer)).plus(e);
  }
}
class gt {
  constructor(t) {
    this.buffer = t;
  }
  high() {
    return new Z(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
  }
  low() {
    return new Z(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset, 2));
  }
  negate() {
    return this.buffer[0] = ~this.buffer[0] + 1, this.buffer[1] = ~this.buffer[1], this.buffer[2] = ~this.buffer[2], this.buffer[3] = ~this.buffer[3], this.buffer[0] == 0 && ++this.buffer[1], this.buffer[1] == 0 && ++this.buffer[2], this.buffer[2] == 0 && ++this.buffer[3], this;
  }
  times(t) {
    const e = new R(new Uint32Array([this.buffer[3], 0])), n = new R(new Uint32Array([this.buffer[2], 0])), r = new R(new Uint32Array([this.buffer[1], 0])), s = new R(new Uint32Array([this.buffer[0], 0])), o = new R(new Uint32Array([t.buffer[3], 0])), a = new R(new Uint32Array([t.buffer[2], 0])), c = new R(new Uint32Array([t.buffer[1], 0])), l = new R(new Uint32Array([t.buffer[0], 0]));
    let d = R.multiply(s, l);
    this.buffer[0] = d.low();
    const f = new R(new Uint32Array([d.high(), 0]));
    return d = R.multiply(r, l), f.plus(d), d = R.multiply(s, c), f.plus(d), this.buffer[1] = f.low(), this.buffer[3] = f.lessThan(d) ? 1 : 0, this.buffer[2] = f.high(), new R(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2)).plus(R.multiply(n, l)).plus(R.multiply(r, c)).plus(R.multiply(s, a)), this.buffer[3] += R.multiply(e, l).plus(R.multiply(n, c)).plus(R.multiply(r, a)).plus(R.multiply(s, o)).low(), this;
  }
  plus(t) {
    const e = new Uint32Array(4);
    return e[3] = this.buffer[3] + t.buffer[3] >>> 0, e[2] = this.buffer[2] + t.buffer[2] >>> 0, e[1] = this.buffer[1] + t.buffer[1] >>> 0, e[0] = this.buffer[0] + t.buffer[0] >>> 0, e[0] < this.buffer[0] >>> 0 && ++e[1], e[1] < this.buffer[1] >>> 0 && ++e[2], e[2] < this.buffer[2] >>> 0 && ++e[3], this.buffer[3] = e[3], this.buffer[2] = e[2], this.buffer[1] = e[1], this.buffer[0] = e[0], this;
  }
  hex() {
    return `${ae(this.buffer[3])} ${ae(this.buffer[2])} ${ae(this.buffer[1])} ${ae(this.buffer[0])}`;
  }
  /** @nocollapse */
  static multiply(t, e) {
    return new gt(new Uint32Array(t.buffer)).times(e);
  }
  /** @nocollapse */
  static add(t, e) {
    return new gt(new Uint32Array(t.buffer)).plus(e);
  }
  /** @nocollapse */
  static from(t, e = new Uint32Array(4)) {
    return gt.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  /** @nocollapse */
  static fromNumber(t, e = new Uint32Array(4)) {
    return gt.fromString(t.toString(), e);
  }
  /** @nocollapse */
  static fromString(t, e = new Uint32Array(4)) {
    const n = t.startsWith("-"), r = t.length, s = new gt(e);
    for (let o = n ? 1 : 0; o < r; ) {
      const a = be < r - o ? be : r - o, c = new gt(new Uint32Array([Number.parseInt(t.slice(o, o + a), 10), 0, 0, 0])), l = new gt(new Uint32Array([yn[a], 0, 0, 0]));
      s.times(l), s.plus(c), o += a;
    }
    return n ? s.negate() : s;
  }
  /** @nocollapse */
  static convertArray(t) {
    const e = new Uint32Array(t.length * 4);
    for (let n = -1, r = t.length; ++n < r; )
      gt.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 16 * n, 4));
    return e;
  }
}
class ks extends F {
  constructor(t, e, n, r, s = j.V5) {
    super(), this.nodesIndex = -1, this.buffersIndex = -1, this.bytes = t, this.nodes = e, this.buffers = n, this.dictionaries = r, this.metadataVersion = s;
  }
  visit(t) {
    return super.visit(t instanceof V ? t.type : t);
  }
  visitNull(t, { length: e } = this.nextFieldNode()) {
    return A({ type: t, length: e });
  }
  visitBool(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitInt(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitFloat(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitUtf8(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitLargeUtf8(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitBinary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitLargeBinary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitFixedSizeBinary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitDate(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitTimestamp(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitTime(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitDecimal(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitList(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), child: this.visit(t.children[0]) });
  }
  visitStruct(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), children: this.visitMany(t.children) });
  }
  visitUnion(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return this.metadataVersion < j.V5 && this.readNullBitmap(t, n), t.mode === X.Sparse ? this.visitSparseUnion(t, { length: e, nullCount: n }) : this.visitDenseUnion(t, { length: e, nullCount: n });
  }
  visitDenseUnion(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, typeIds: this.readTypeIds(t), valueOffsets: this.readOffsets(t), children: this.visitMany(t.children) });
  }
  visitSparseUnion(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, typeIds: this.readTypeIds(t), children: this.visitMany(t.children) });
  }
  visitDictionary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t.indices), dictionary: this.readDictionary(t) });
  }
  visitInterval(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitDuration(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitFixedSizeList(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), child: this.visit(t.children[0]) });
  }
  visitMap(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return A({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), child: this.visit(t.children[0]) });
  }
  nextFieldNode() {
    return this.nodes[++this.nodesIndex];
  }
  nextBufferRange() {
    return this.buffers[++this.buffersIndex];
  }
  readNullBitmap(t, e, n = this.nextBufferRange()) {
    return e > 0 && this.readData(t, n) || new Uint8Array(0);
  }
  readOffsets(t, e) {
    return this.readData(t, e);
  }
  readTypeIds(t, e) {
    return this.readData(t, e);
  }
  readData(t, { length: e, offset: n } = this.nextBufferRange()) {
    return this.bytes.subarray(n, n + e);
  }
  readDictionary(t) {
    return this.dictionaries.get(t.id);
  }
}
class Ja extends ks {
  constructor(t, e, n, r, s) {
    super(new Uint8Array(0), e, n, r, s), this.sources = t;
  }
  readNullBitmap(t, e, { offset: n } = this.nextBufferRange()) {
    return e <= 0 ? new Uint8Array(0) : Gi(this.sources[n]);
  }
  readOffsets(t, { offset: e } = this.nextBufferRange()) {
    return x(Uint8Array, x(t.OffsetArrayType, this.sources[e]));
  }
  readTypeIds(t, { offset: e } = this.nextBufferRange()) {
    return x(Uint8Array, x(t.ArrayType, this.sources[e]));
  }
  readData(t, { offset: e } = this.nextBufferRange()) {
    const { sources: n } = this;
    return h.isTimestamp(t) || (h.isInt(t) || h.isTime(t)) && t.bitWidth === 64 || h.isDuration(t) || h.isDate(t) && t.unit === at.MILLISECOND ? x(Uint8Array, Z.convertArray(n[e])) : h.isDecimal(t) ? x(Uint8Array, gt.convertArray(n[e])) : h.isBinary(t) || h.isLargeBinary(t) || h.isFixedSizeBinary(t) ? Ha(n[e]) : h.isBool(t) ? Gi(n[e]) : h.isUtf8(t) || h.isLargeUtf8(t) ? tn(n[e].join("")) : x(Uint8Array, x(t.ArrayType, n[e].map((r) => +r)));
  }
}
function Ha(i) {
  const t = i.join(""), e = new Uint8Array(t.length / 2);
  for (let n = 0; n < t.length; n += 2)
    e[n >> 1] = Number.parseInt(t.slice(n, n + 2), 16);
  return e;
}
class g extends F {
  compareSchemas(t, e) {
    return t === e || e instanceof t.constructor && this.compareManyFields(t.fields, e.fields);
  }
  compareManyFields(t, e) {
    return t === e || Array.isArray(t) && Array.isArray(e) && t.length === e.length && t.every((n, r) => this.compareFields(n, e[r]));
  }
  compareFields(t, e) {
    return t === e || e instanceof t.constructor && t.name === e.name && t.nullable === e.nullable && this.visit(t.type, e.type);
  }
}
function G(i, t) {
  return t instanceof i.constructor;
}
function Kt(i, t) {
  return i === t || G(i, t);
}
function xt(i, t) {
  return i === t || G(i, t) && i.bitWidth === t.bitWidth && i.isSigned === t.isSigned;
}
function Ui(i, t) {
  return i === t || G(i, t) && i.precision === t.precision;
}
function Ka(i, t) {
  return i === t || G(i, t) && i.byteWidth === t.byteWidth;
}
function mn(i, t) {
  return i === t || G(i, t) && i.unit === t.unit;
}
function Ce(i, t) {
  return i === t || G(i, t) && i.unit === t.unit && i.timezone === t.timezone;
}
function Ee(i, t) {
  return i === t || G(i, t) && i.unit === t.unit && i.bitWidth === t.bitWidth;
}
function Ga(i, t) {
  return i === t || G(i, t) && i.children.length === t.children.length && $t.compareManyFields(i.children, t.children);
}
function Za(i, t) {
  return i === t || G(i, t) && i.children.length === t.children.length && $t.compareManyFields(i.children, t.children);
}
function gn(i, t) {
  return i === t || G(i, t) && i.mode === t.mode && i.typeIds.every((e, n) => e === t.typeIds[n]) && $t.compareManyFields(i.children, t.children);
}
function qa(i, t) {
  return i === t || G(i, t) && i.id === t.id && i.isOrdered === t.isOrdered && $t.visit(i.indices, t.indices) && $t.visit(i.dictionary, t.dictionary);
}
function bn(i, t) {
  return i === t || G(i, t) && i.unit === t.unit;
}
function ze(i, t) {
  return i === t || G(i, t) && i.unit === t.unit;
}
function Xa(i, t) {
  return i === t || G(i, t) && i.listSize === t.listSize && i.children.length === t.children.length && $t.compareManyFields(i.children, t.children);
}
function Qa(i, t) {
  return i === t || G(i, t) && i.keysSorted === t.keysSorted && i.children.length === t.children.length && $t.compareManyFields(i.children, t.children);
}
g.prototype.visitNull = Kt;
g.prototype.visitBool = Kt;
g.prototype.visitInt = xt;
g.prototype.visitInt8 = xt;
g.prototype.visitInt16 = xt;
g.prototype.visitInt32 = xt;
g.prototype.visitInt64 = xt;
g.prototype.visitUint8 = xt;
g.prototype.visitUint16 = xt;
g.prototype.visitUint32 = xt;
g.prototype.visitUint64 = xt;
g.prototype.visitFloat = Ui;
g.prototype.visitFloat16 = Ui;
g.prototype.visitFloat32 = Ui;
g.prototype.visitFloat64 = Ui;
g.prototype.visitUtf8 = Kt;
g.prototype.visitLargeUtf8 = Kt;
g.prototype.visitBinary = Kt;
g.prototype.visitLargeBinary = Kt;
g.prototype.visitFixedSizeBinary = Ka;
g.prototype.visitDate = mn;
g.prototype.visitDateDay = mn;
g.prototype.visitDateMillisecond = mn;
g.prototype.visitTimestamp = Ce;
g.prototype.visitTimestampSecond = Ce;
g.prototype.visitTimestampMillisecond = Ce;
g.prototype.visitTimestampMicrosecond = Ce;
g.prototype.visitTimestampNanosecond = Ce;
g.prototype.visitTime = Ee;
g.prototype.visitTimeSecond = Ee;
g.prototype.visitTimeMillisecond = Ee;
g.prototype.visitTimeMicrosecond = Ee;
g.prototype.visitTimeNanosecond = Ee;
g.prototype.visitDecimal = Kt;
g.prototype.visitList = Ga;
g.prototype.visitStruct = Za;
g.prototype.visitUnion = gn;
g.prototype.visitDenseUnion = gn;
g.prototype.visitSparseUnion = gn;
g.prototype.visitDictionary = qa;
g.prototype.visitInterval = bn;
g.prototype.visitIntervalDayTime = bn;
g.prototype.visitIntervalYearMonth = bn;
g.prototype.visitDuration = ze;
g.prototype.visitDurationSecond = ze;
g.prototype.visitDurationMillisecond = ze;
g.prototype.visitDurationMicrosecond = ze;
g.prototype.visitDurationNanosecond = ze;
g.prototype.visitFixedSizeList = Xa;
g.prototype.visitMap = Qa;
const $t = new g();
function tc(i, t) {
  return $t.compareSchemas(i, t);
}
function Vi(i, t) {
  return ec(i, t.map((e) => e.data.concat()));
}
function ec(i, t) {
  const e = [...i.fields], n = [], r = { numBatches: t.reduce((f, $) => Math.max(f, $.length), 0) };
  let s = 0, o = 0, a = -1;
  const c = t.length;
  let l, d = [];
  for (; r.numBatches-- > 0; ) {
    for (o = Number.POSITIVE_INFINITY, a = -1; ++a < c; )
      d[a] = l = t[a].shift(), o = Math.min(o, l ? l.length : o);
    Number.isFinite(o) && (d = ic(e, o, d, t, r), o > 0 && (n[s++] = A({
      type: new K(e),
      length: o,
      nullCount: 0,
      children: d.slice()
    })));
  }
  return [
    i = i.assign(e),
    n.map((f) => new lt(i, f))
  ];
}
function ic(i, t, e, n, r) {
  var s;
  const o = (t + 63 & -64) >> 3;
  for (let a = -1, c = n.length; ++a < c; ) {
    const l = e[a], d = l == null ? void 0 : l.length;
    if (d >= t)
      d === t ? e[a] = l : (e[a] = l.slice(0, t), r.numBatches = Math.max(r.numBatches, n[a].unshift(l.slice(t, d - t))));
    else {
      const f = i[a];
      i[a] = f.clone({ nullable: !0 }), e[a] = (s = l == null ? void 0 : l._changeLengthAndBackfillNullBitmap(t)) !== null && s !== void 0 ? s : A({
        type: f.type,
        length: t,
        nullCount: t,
        nullBitmap: new Uint8Array(o)
      });
    }
  }
  return e;
}
var Ps;
class ot {
  constructor(...t) {
    var e, n;
    if (t.length === 0)
      return this.batches = [], this.schema = new U([]), this._offsets = [0], this;
    let r, s;
    t[0] instanceof U && (r = t.shift()), t.at(-1) instanceof Uint32Array && (s = t.pop());
    const o = (c) => {
      if (c) {
        if (c instanceof lt)
          return [c];
        if (c instanceof ot)
          return c.batches;
        if (c instanceof L) {
          if (c.type instanceof K)
            return [new lt(new U(c.type.children), c)];
        } else {
          if (Array.isArray(c))
            return c.flatMap((l) => o(l));
          if (typeof c[Symbol.iterator] == "function")
            return [...c].flatMap((l) => o(l));
          if (typeof c == "object") {
            const l = Object.keys(c), d = l.map((N) => new C([c[N]])), f = r ?? new U(l.map((N, Y) => new V(String(N), d[Y].type, d[Y].nullable))), [, $] = Vi(f, d);
            return $.length === 0 ? [new lt(c)] : $;
          }
        }
      }
      return [];
    }, a = t.flatMap((c) => o(c));
    if (r = (n = r ?? ((e = a[0]) === null || e === void 0 ? void 0 : e.schema)) !== null && n !== void 0 ? n : new U([]), !(r instanceof U))
      throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
    for (const c of a) {
      if (!(c instanceof lt))
        throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
      if (!tc(r, c.schema))
        throw new TypeError("Table and inner RecordBatch schemas must be equivalent.");
    }
    this.schema = r, this.batches = a, this._offsets = s ?? Ms(this.data);
  }
  /**
   * The contiguous {@link RecordBatch `RecordBatch`} chunks of the Table rows.
   */
  get data() {
    return this.batches.map(({ data: t }) => t);
  }
  /**
   * The number of columns in this Table.
   */
  get numCols() {
    return this.schema.fields.length;
  }
  /**
   * The number of rows in this Table.
   */
  get numRows() {
    return this.data.reduce((t, e) => t + e.length, 0);
  }
  /**
   * The number of null rows in this Table.
   */
  get nullCount() {
    return this._nullCount === -1 && (this._nullCount = Ns(this.data)), this._nullCount;
  }
  /**
   * Check whether an element is null.
   *
   * @param index The index at which to read the validity bitmap.
   */
  // @ts-ignore
  isValid(t) {
    return !1;
  }
  /**
   * Get an element value by position.
   *
   * @param index The index of the element to read.
   */
  // @ts-ignore
  get(t) {
    return null;
  }
  /**
    * Get an element value by position.
    * @param index The index of the element to read. A negative index will count back from the last element.
    */
  // @ts-ignore
  at(t) {
    return this.get(un(t, this.numRows));
  }
  /**
   * Set an element value by position.
   *
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  // @ts-ignore
  set(t, e) {
  }
  /**
   * Retrieve the index of the first occurrence of a value in an Vector.
   *
   * @param element The value to locate in the Vector.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  // @ts-ignore
  indexOf(t, e) {
    return -1;
  }
  /**
   * Iterator for rows in this Table.
   */
  [Symbol.iterator]() {
    return this.batches.length > 0 ? fn.visit(new C(this.data)) : new Array(0)[Symbol.iterator]();
  }
  /**
   * Return a JavaScript Array of the Table rows.
   *
   * @returns An Array of Table rows.
   */
  toArray() {
    return [...this];
  }
  /**
   * Returns a string representation of the Table rows.
   *
   * @returns A string representation of the Table rows.
   */
  toString() {
    return `[
  ${this.toArray().join(`,
  `)}
]`;
  }
  /**
   * Combines two or more Tables of the same schema.
   *
   * @param others Additional Tables to add to the end of this Tables.
   */
  concat(...t) {
    const e = this.schema, n = this.data.concat(t.flatMap(({ data: r }) => r));
    return new ot(e, n.map((r) => new lt(e, r)));
  }
  /**
   * Return a zero-copy sub-section of this Table.
   *
   * @param begin The beginning of the specified portion of the Table.
   * @param end The end of the specified portion of the Table. This is exclusive of the element at the index 'end'.
   */
  slice(t, e) {
    const n = this.schema;
    [t, e] = Fs({ length: this.numRows }, t, e);
    const r = Us(this.data, this._offsets, t, e);
    return new ot(n, r.map((s) => new lt(n, s)));
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   *
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    return this.getChildAt(this.schema.fields.findIndex((e) => e.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   *
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    if (t > -1 && t < this.schema.fields.length) {
      const e = this.data.map((n) => n.children[t]);
      if (e.length === 0) {
        const { type: n } = this.schema.fields[t], r = A({ type: n, length: 0, nullCount: 0 });
        e.push(r._changeLengthAndBackfillNullBitmap(this.numRows));
      }
      return new C(e);
    }
    return null;
  }
  /**
   * Sets a child Vector by name.
   *
   * @param name The name of the child to overwrite.
   * @returns A new Table with the supplied child for the specified name.
   */
  setChild(t, e) {
    var n;
    return this.setChildAt((n = this.schema.fields) === null || n === void 0 ? void 0 : n.findIndex((r) => r.name === t), e);
  }
  setChildAt(t, e) {
    let n = this.schema, r = [...this.batches];
    if (t > -1 && t < this.numCols) {
      e || (e = new C([A({ type: new jt(), length: this.numRows })]));
      const s = n.fields.slice(), o = s[t].clone({ type: e.type }), a = this.schema.fields.map((c, l) => this.getChildAt(l));
      [s[t], a[t]] = [o, e], [n, r] = Vi(n, a);
    }
    return new ot(n, r);
  }
  /**
   * Construct a new Table containing only specified columns.
   *
   * @param columnNames Names of columns to keep.
   * @returns A new Table of columns matching the specified names.
   */
  select(t) {
    const e = this.schema.fields.reduce((n, r, s) => n.set(r.name, s), /* @__PURE__ */ new Map());
    return this.selectAt(t.map((n) => e.get(n)).filter((n) => n > -1));
  }
  /**
   * Construct a new Table containing only columns at the specified indices.
   *
   * @param columnIndices Indices of columns to keep.
   * @returns A new Table of columns at the specified indices.
   */
  selectAt(t) {
    const e = this.schema.selectAt(t), n = this.batches.map((r) => r.selectAt(t));
    return new ot(e, n);
  }
  assign(t) {
    const e = this.schema.fields, [n, r] = t.schema.fields.reduce((a, c, l) => {
      const [d, f] = a, $ = e.findIndex((N) => N.name === c.name);
      return ~$ ? f[$] = l : d.push(l), a;
    }, [[], []]), s = this.schema.assign(t.schema), o = [
      ...e.map((a, c) => [c, r[c]]).map(([a, c]) => c === void 0 ? this.getChildAt(a) : t.getChildAt(c)),
      ...n.map((a) => t.getChildAt(a))
    ].filter(Boolean);
    return new ot(...Vi(s, o));
  }
}
Ps = Symbol.toStringTag;
ot[Ps] = ((i) => (i.schema = null, i.batches = [], i._offsets = new Uint32Array([0]), i._nullCount = -1, i[Symbol.isConcatSpreadable] = !0, i.isValid = _i(hn), i.get = _i(Q.getVisitFn(u.Struct)), i.set = Ts(ct.getVisitFn(u.Struct)), i.indexOf = Ls(vi.getVisitFn(u.Struct)), "Table"))(ot.prototype);
var js;
let lt = class Ne {
  constructor(...t) {
    switch (t.length) {
      case 2: {
        if ([this.schema] = t, !(this.schema instanceof U))
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        if ([
          ,
          this.data = A({
            nullCount: 0,
            type: new K(this.schema.fields),
            children: this.schema.fields.map((e) => A({ type: e.type, nullCount: 0 }))
          })
        ] = t, !(this.data instanceof L))
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        [this.schema, this.data] = jn(this.schema, this.data.children);
        break;
      }
      case 1: {
        const [e] = t, { fields: n, children: r, length: s } = Object.keys(e).reduce((c, l, d) => (c.children[d] = e[l], c.length = Math.max(c.length, e[l].length), c.fields[d] = V.new({ name: l, type: e[l].type, nullable: !0 }), c), {
          length: 0,
          fields: new Array(),
          children: new Array()
        }), o = new U(n), a = A({ type: new K(n), length: s, children: r, nullCount: 0 });
        [this.schema, this.data] = jn(o, a.children, s);
        break;
      }
      default:
        throw new TypeError("RecordBatch constructor expects an Object mapping names to child Data, or a [Schema, Data] pair.");
    }
  }
  get dictionaries() {
    return this._dictionaries || (this._dictionaries = $s(this.schema.fields, this.data.children));
  }
  /**
   * The number of columns in this RecordBatch.
   */
  get numCols() {
    return this.schema.fields.length;
  }
  /**
   * The number of rows in this RecordBatch.
   */
  get numRows() {
    return this.data.length;
  }
  /**
   * The number of null rows in this RecordBatch.
   */
  get nullCount() {
    return this.data.nullCount;
  }
  /**
   * Check whether an row is null.
   * @param index The index at which to read the validity bitmap.
   */
  isValid(t) {
    return this.data.getValid(t);
  }
  /**
   * Get a row by position.
   * @param index The index of the row to read.
   */
  get(t) {
    return Q.visit(this.data, t);
  }
  /**
    * Get a row value by position.
    * @param index The index of the row to read. A negative index will count back from the last row.
    */
  at(t) {
    return this.get(un(t, this.numRows));
  }
  /**
   * Set a row by position.
   * @param index The index of the row to write.
   * @param value The value to set.
   */
  set(t, e) {
    return ct.visit(this.data, t, e);
  }
  /**
   * Retrieve the index of the first occurrence of a row in an RecordBatch.
   * @param element The row to locate in the RecordBatch.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  indexOf(t, e) {
    return vi.visit(this.data, t, e);
  }
  /**
   * Iterator for rows in this RecordBatch.
   */
  [Symbol.iterator]() {
    return fn.visit(new C([this.data]));
  }
  /**
   * Return a JavaScript Array of the RecordBatch rows.
   * @returns An Array of RecordBatch rows.
   */
  toArray() {
    return [...this];
  }
  /**
   * Combines two or more RecordBatch of the same schema.
   * @param others Additional RecordBatch to add to the end of this RecordBatch.
   */
  concat(...t) {
    return new ot(this.schema, [this, ...t]);
  }
  /**
   * Return a zero-copy sub-section of this RecordBatch.
   * @param start The beginning of the specified portion of the RecordBatch.
   * @param end The end of the specified portion of the RecordBatch. This is exclusive of the row at the index 'end'.
   */
  slice(t, e) {
    const [n] = new C([this.data]).slice(t, e).data;
    return new Ne(this.schema, n);
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   * @param name The name of the child to retrieve.
   */
  getChild(t) {
    var e;
    return this.getChildAt((e = this.schema.fields) === null || e === void 0 ? void 0 : e.findIndex((n) => n.name === t));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   * @param index The index of the child to retrieve.
   */
  getChildAt(t) {
    return t > -1 && t < this.schema.fields.length ? new C([this.data.children[t]]) : null;
  }
  /**
   * Sets a child Vector by name.
   * @param name The name of the child to overwrite.
   * @returns A new RecordBatch with the new child for the specified name.
   */
  setChild(t, e) {
    var n;
    return this.setChildAt((n = this.schema.fields) === null || n === void 0 ? void 0 : n.findIndex((r) => r.name === t), e);
  }
  setChildAt(t, e) {
    let n = this.schema, r = this.data;
    if (t > -1 && t < this.numCols) {
      e || (e = new C([A({ type: new jt(), length: this.numRows })]));
      const s = n.fields.slice(), o = r.children.slice(), a = s[t].clone({ type: e.type });
      [s[t], o[t]] = [a, e.data[0]], n = new U(s, new Map(this.schema.metadata)), r = A({ type: new K(s), children: o });
    }
    return new Ne(n, r);
  }
  /**
   * Construct a new RecordBatch containing only specified columns.
   *
   * @param columnNames Names of columns to keep.
   * @returns A new RecordBatch of columns matching the specified names.
   */
  select(t) {
    const e = this.schema.select(t), n = new K(e.fields), r = [];
    for (const s of t) {
      const o = this.schema.fields.findIndex((a) => a.name === s);
      ~o && (r[o] = this.data.children[o]);
    }
    return new Ne(e, A({ type: n, length: this.numRows, children: r }));
  }
  /**
   * Construct a new RecordBatch containing only columns at the specified indices.
   *
   * @param columnIndices Indices of columns to keep.
   * @returns A new RecordBatch of columns matching at the specified indices.
   */
  selectAt(t) {
    const e = this.schema.selectAt(t), n = t.map((s) => this.data.children[s]).filter(Boolean), r = A({ type: new K(e.fields), length: this.numRows, children: n });
    return new Ne(e, r);
  }
};
js = Symbol.toStringTag;
lt[js] = ((i) => (i._nullCount = -1, i[Symbol.isConcatSpreadable] = !0, "RecordBatch"))(lt.prototype);
function jn(i, t, e = t.reduce((n, r) => Math.max(n, r.length), 0)) {
  var n;
  const r = [...i.fields], s = [...t], o = (e + 63 & -64) >> 3;
  for (const [a, c] of i.fields.entries()) {
    const l = t[a];
    (!l || l.length !== e) && (r[a] = c.clone({ nullable: !0 }), s[a] = (n = l == null ? void 0 : l._changeLengthAndBackfillNullBitmap(e)) !== null && n !== void 0 ? n : A({
      type: c.type,
      length: e,
      nullCount: e,
      nullBitmap: new Uint8Array(o)
    }));
  }
  return [
    i.assign(r),
    A({ type: new K(r), length: e, children: s })
  ];
}
function $s(i, t, e = /* @__PURE__ */ new Map()) {
  var n, r;
  if (((n = i == null ? void 0 : i.length) !== null && n !== void 0 ? n : 0) > 0 && (i == null ? void 0 : i.length) === (t == null ? void 0 : t.length))
    for (let s = -1, o = i.length; ++s < o; ) {
      const { type: a } = i[s], c = t[s];
      for (const l of [c, ...((r = c == null ? void 0 : c.dictionary) === null || r === void 0 ? void 0 : r.data) || []])
        $s(a.children, l == null ? void 0 : l.children, e);
      if (h.isDictionary(a)) {
        const { id: l } = a;
        if (!e.has(l))
          c != null && c.dictionary && e.set(l, c.dictionary);
        else if (e.get(l) !== c.dictionary)
          throw new Error("Cannot create Schema containing two different dictionaries with the same Id");
      }
    }
  return e;
}
class Ws extends lt {
  constructor(t) {
    const e = t.fields.map((r) => A({ type: r.type })), n = A({ type: new K(t.fields), nullCount: 0, children: e });
    super(t, n);
  }
}
let Et = class yt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsMessage(t, e) {
    return (e || new yt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMessage(t, e) {
    return t.setPosition(t.position() + T), (e || new yt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : j.V1;
  }
  headerType() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : M.NONE;
  }
  header(t) {
    const e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : null;
  }
  bodyLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 12);
    return n ? (e || new W()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startMessage(t) {
    t.startObject(5);
  }
  static addVersion(t, e) {
    t.addFieldInt16(0, e, j.V1);
  }
  static addHeaderType(t, e) {
    t.addFieldInt8(1, e, M.NONE);
  }
  static addHeader(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBodyLength(t, e) {
    t.addFieldInt64(3, e, BigInt("0"));
  }
  static addCustomMetadata(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createCustomMetadataVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let n = e.length - 1; n >= 0; n--)
      t.addOffset(e[n]);
    return t.endVector();
  }
  static startCustomMetadataVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endMessage(t) {
    return t.endObject();
  }
  static finishMessageBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedMessageBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
  static createMessage(t, e, n, r, s, o) {
    return yt.startMessage(t), yt.addVersion(t, e), yt.addHeaderType(t, n), yt.addHeader(t, r), yt.addBodyLength(t, s), yt.addCustomMetadata(t, o), yt.endMessage(t);
  }
};
class nc extends F {
  visit(t, e) {
    return t == null || e == null ? void 0 : super.visit(t, e);
  }
  visitNull(t, e) {
    return Tn.startNull(e), Tn.endNull(e);
  }
  visitInt(t, e) {
    return et.startInt(e), et.addBitWidth(e, t.bitWidth), et.addIsSigned(e, t.isSigned), et.endInt(e);
  }
  visitFloat(t, e) {
    return _t.startFloatingPoint(e), _t.addPrecision(e, t.precision), _t.endFloatingPoint(e);
  }
  visitBinary(t, e) {
    return Fn.startBinary(e), Fn.endBinary(e);
  }
  visitLargeBinary(t, e) {
    return Nn.startLargeBinary(e), Nn.endLargeBinary(e);
  }
  visitBool(t, e) {
    return On.startBool(e), On.endBool(e);
  }
  visitUtf8(t, e) {
    return Ln.startUtf8(e), Ln.endUtf8(e);
  }
  visitLargeUtf8(t, e) {
    return Mn.startLargeUtf8(e), Mn.endLargeUtf8(e);
  }
  visitDecimal(t, e) {
    return Qt.startDecimal(e), Qt.addScale(e, t.scale), Qt.addPrecision(e, t.precision), Qt.addBitWidth(e, t.bitWidth), Qt.endDecimal(e);
  }
  visitDate(t, e) {
    return We.startDate(e), We.addUnit(e, t.unit), We.endDate(e);
  }
  visitTime(t, e) {
    return rt.startTime(e), rt.addUnit(e, t.unit), rt.addBitWidth(e, t.bitWidth), rt.endTime(e);
  }
  visitTimestamp(t, e) {
    const n = t.timezone && e.createString(t.timezone) || void 0;
    return st.startTimestamp(e), st.addUnit(e, t.unit), n !== void 0 && st.addTimezone(e, n), st.endTimestamp(e);
  }
  visitInterval(t, e) {
    return vt.startInterval(e), vt.addUnit(e, t.unit), vt.endInterval(e);
  }
  visitDuration(t, e) {
    return Ye.startDuration(e), Ye.addUnit(e, t.unit), Ye.endDuration(e);
  }
  visitList(t, e) {
    return Un.startList(e), Un.endList(e);
  }
  visitStruct(t, e) {
    return Jt.startStruct_(e), Jt.endStruct_(e);
  }
  visitUnion(t, e) {
    q.startTypeIdsVector(e, t.typeIds.length);
    const n = q.createTypeIdsVector(e, t.typeIds);
    return q.startUnion(e), q.addMode(e, t.mode), q.addTypeIds(e, n), q.endUnion(e);
  }
  visitDictionary(t, e) {
    const n = this.visit(t.indices, e);
    return Mt.startDictionaryEncoding(e), Mt.addId(e, BigInt(t.id)), Mt.addIsOrdered(e, t.isOrdered), n !== void 0 && Mt.addIndexType(e, n), Mt.endDictionaryEncoding(e);
  }
  visitFixedSizeBinary(t, e) {
    return Je.startFixedSizeBinary(e), Je.addByteWidth(e, t.byteWidth), Je.endFixedSizeBinary(e);
  }
  visitFixedSizeList(t, e) {
    return He.startFixedSizeList(e), He.addListSize(e, t.listSize), He.endFixedSizeList(e);
  }
  visitMap(t, e) {
    return Ke.startMap(e), Ke.addKeysSorted(e, t.keysSorted), Ke.endMap(e);
  }
}
const ki = new nc();
function rc(i, t = /* @__PURE__ */ new Map()) {
  return new U(oc(i, t), Ze(i.metadata), t);
}
function Ys(i) {
  return new ft(i.count, Js(i.columns), Hs(i.columns));
}
function sc(i) {
  return new Lt(Ys(i.data), i.id, i.isDelta);
}
function oc(i, t) {
  return (i.fields || []).filter(Boolean).map((e) => V.fromJSON(e, t));
}
function $n(i, t) {
  return (i.children || []).filter(Boolean).map((e) => V.fromJSON(e, t));
}
function Js(i) {
  return (i || []).reduce((t, e) => [
    ...t,
    new ve(e.count, ac(e.VALIDITY)),
    ...Js(e.children)
  ], []);
}
function Hs(i, t = []) {
  for (let e = -1, n = (i || []).length; ++e < n; ) {
    const r = i[e];
    r.VALIDITY && t.push(new Ut(t.length, r.VALIDITY.length)), r.TYPE_ID && t.push(new Ut(t.length, r.TYPE_ID.length)), r.OFFSET && t.push(new Ut(t.length, r.OFFSET.length)), r.DATA && t.push(new Ut(t.length, r.DATA.length)), t = Hs(r.children, t);
  }
  return t;
}
function ac(i) {
  return (i || []).reduce((t, e) => t + +(e === 0), 0);
}
function cc(i, t) {
  let e, n, r, s, o, a;
  return !t || !(s = i.dictionary) ? (o = Yn(i, $n(i, t)), r = new V(i.name, o, i.nullable, Ze(i.metadata))) : t.has(e = s.id) ? (n = (n = s.indexType) ? Wn(n) : new xe(), a = new ye(t.get(e), n, e, s.isOrdered), r = new V(i.name, a, i.nullable, Ze(i.metadata))) : (n = (n = s.indexType) ? Wn(n) : new xe(), t.set(e, o = Yn(i, $n(i, t))), a = new ye(o, n, e, s.isOrdered), r = new V(i.name, a, i.nullable, Ze(i.metadata))), r || null;
}
function Ze(i = []) {
  return new Map(i.map(({ key: t, value: e }) => [t, e]));
}
function Wn(i) {
  return new Ht(i.isSigned, i.bitWidth);
}
function Yn(i, t) {
  const e = i.type.name;
  switch (e) {
    case "NONE":
      return new jt();
    case "null":
      return new jt();
    case "binary":
      return new ni();
    case "largebinary":
      return new ri();
    case "utf8":
      return new si();
    case "largeutf8":
      return new oi();
    case "bool":
      return new ai();
    case "list":
      return new pi((t || [])[0]);
    case "struct":
      return new K(t || []);
    case "struct_":
      return new K(t || []);
  }
  switch (e) {
    case "int": {
      const n = i.type;
      return new Ht(n.isSigned, n.bitWidth);
    }
    case "floatingpoint": {
      const n = i.type;
      return new ii(J[n.precision]);
    }
    case "decimal": {
      const n = i.type;
      return new ci(n.scale, n.precision, n.bitWidth);
    }
    case "date": {
      const n = i.type;
      return new ui(at[n.unit]);
    }
    case "time": {
      const n = i.type;
      return new li(b[n.unit], n.bitWidth);
    }
    case "timestamp": {
      const n = i.type;
      return new di(b[n.unit], n.timezone);
    }
    case "interval": {
      const n = i.type;
      return new hi(Bt[n.unit]);
    }
    case "duration": {
      const n = i.type;
      return new fi(b[n.unit]);
    }
    case "union": {
      const n = i.type, [r, ...s] = (n.mode + "").toLowerCase(), o = r.toUpperCase() + s.join("");
      return new yi(X[o], n.typeIds || [], t || []);
    }
    case "fixedsizebinary": {
      const n = i.type;
      return new mi(n.byteWidth);
    }
    case "fixedsizelist": {
      const n = i.type;
      return new gi(n.listSize, (t || [])[0]);
    }
    case "map": {
      const n = i.type;
      return new bi((t || [])[0], n.keysSorted);
    }
  }
  throw new Error(`Unrecognized type: "${e}"`);
}
var uc = ar, lc = fe;
class dt {
  /** @nocollapse */
  static fromJSON(t, e) {
    const n = new dt(0, j.V5, e);
    return n._createHeader = dc(t, e), n;
  }
  /** @nocollapse */
  static decode(t) {
    t = new lc(O(t));
    const e = Et.getRootAsMessage(t), n = e.bodyLength(), r = e.version(), s = e.headerType(), o = new dt(n, r, s);
    return o._createHeader = hc(e, s), o;
  }
  /** @nocollapse */
  static encode(t) {
    const e = new uc();
    let n = -1;
    return t.isSchema() ? n = U.encode(e, t.header()) : t.isRecordBatch() ? n = ft.encode(e, t.header()) : t.isDictionaryBatch() && (n = Lt.encode(e, t.header())), Et.startMessage(e), Et.addVersion(e, j.V5), Et.addHeader(e, n), Et.addHeaderType(e, t.headerType), Et.addBodyLength(e, BigInt(t.bodyLength)), Et.finishMessageBuffer(e, Et.endMessage(e)), e.asUint8Array();
  }
  /** @nocollapse */
  static from(t, e = 0) {
    if (t instanceof U)
      return new dt(0, j.V5, M.Schema, t);
    if (t instanceof ft)
      return new dt(e, j.V5, M.RecordBatch, t);
    if (t instanceof Lt)
      return new dt(e, j.V5, M.DictionaryBatch, t);
    throw new Error(`Unrecognized Message header: ${t}`);
  }
  get type() {
    return this.headerType;
  }
  get version() {
    return this._version;
  }
  get headerType() {
    return this._headerType;
  }
  get bodyLength() {
    return this._bodyLength;
  }
  header() {
    return this._createHeader();
  }
  isSchema() {
    return this.headerType === M.Schema;
  }
  isRecordBatch() {
    return this.headerType === M.RecordBatch;
  }
  isDictionaryBatch() {
    return this.headerType === M.DictionaryBatch;
  }
  constructor(t, e, n, r) {
    this._version = e, this._headerType = n, this.body = new Uint8Array(0), r && (this._createHeader = () => r), this._bodyLength = z(t);
  }
}
class ft {
  get nodes() {
    return this._nodes;
  }
  get length() {
    return this._length;
  }
  get buffers() {
    return this._buffers;
  }
  constructor(t, e, n) {
    this._nodes = e, this._buffers = n, this._length = z(t);
  }
}
class Lt {
  get id() {
    return this._id;
  }
  get data() {
    return this._data;
  }
  get isDelta() {
    return this._isDelta;
  }
  get length() {
    return this.data.length;
  }
  get nodes() {
    return this.data.nodes;
  }
  get buffers() {
    return this.data.buffers;
  }
  constructor(t, e, n = !1) {
    this._data = t, this._isDelta = n, this._id = z(e);
  }
}
class Ut {
  constructor(t, e) {
    this.offset = z(t), this.length = z(e);
  }
}
class ve {
  constructor(t, e) {
    this.length = z(t), this.nullCount = z(e);
  }
}
function dc(i, t) {
  return (() => {
    switch (t) {
      case M.Schema:
        return U.fromJSON(i);
      case M.RecordBatch:
        return ft.fromJSON(i);
      case M.DictionaryBatch:
        return Lt.fromJSON(i);
    }
    throw new Error(`Unrecognized Message type: { name: ${M[t]}, type: ${t} }`);
  });
}
function hc(i, t) {
  return (() => {
    switch (t) {
      case M.Schema:
        return U.decode(i.header(new mt()), /* @__PURE__ */ new Map(), i.version());
      case M.RecordBatch:
        return ft.decode(i.header(new At()), i.version());
      case M.DictionaryBatch:
        return Lt.decode(i.header(new qt()), i.version());
    }
    throw new Error(`Unrecognized Message type: { name: ${M[t]}, type: ${t} }`);
  });
}
V.encode = Sc;
V.decode = wc;
V.fromJSON = cc;
U.encode = Ic;
U.decode = fc;
U.fromJSON = rc;
ft.encode = Bc;
ft.decode = pc;
ft.fromJSON = Ys;
Lt.encode = Dc;
Lt.decode = yc;
Lt.fromJSON = sc;
ve.encode = Ac;
ve.decode = gc;
Ut.encode = Fc;
Ut.decode = mc;
function fc(i, t = /* @__PURE__ */ new Map(), e = j.V5) {
  const n = vc(i, t);
  return new U(n, qe(i), t, e);
}
function pc(i, t = j.V5) {
  if (i.compression() !== null)
    throw new Error("Record batch compression not implemented");
  return new ft(i.length(), bc(i), _c(i, t));
}
function yc(i, t = j.V5) {
  return new Lt(ft.decode(i.data(), t), i.id(), i.isDelta());
}
function mc(i) {
  return new Ut(i.offset(), i.length());
}
function gc(i) {
  return new ve(i.length(), i.nullCount());
}
function bc(i) {
  const t = [];
  for (let e, n = -1, r = -1, s = i.nodesLength(); ++n < s; )
    (e = i.nodes(n)) && (t[++r] = ve.decode(e));
  return t;
}
function _c(i, t) {
  const e = [];
  for (let n, r = -1, s = -1, o = i.buffersLength(); ++r < o; )
    (n = i.buffers(r)) && (t < j.V4 && (n.bb_pos += 8 * (r + 1)), e[++s] = Ut.decode(n));
  return e;
}
function vc(i, t) {
  const e = [];
  for (let n, r = -1, s = -1, o = i.fieldsLength(); ++r < o; )
    (n = i.fields(r)) && (e[++s] = V.decode(n, t));
  return e;
}
function Jn(i, t) {
  const e = [];
  for (let n, r = -1, s = -1, o = i.childrenLength(); ++r < o; )
    (n = i.children(r)) && (e[++s] = V.decode(n, t));
  return e;
}
function wc(i, t) {
  let e, n, r, s, o, a;
  return !t || !(a = i.dictionary()) ? (r = Kn(i, Jn(i, t)), n = new V(i.name(), r, i.nullable(), qe(i))) : t.has(e = z(a.id())) ? (s = (s = a.indexType()) ? Hn(s) : new xe(), o = new ye(t.get(e), s, e, a.isOrdered()), n = new V(i.name(), o, i.nullable(), qe(i))) : (s = (s = a.indexType()) ? Hn(s) : new xe(), t.set(e, r = Kn(i, Jn(i, t))), o = new ye(r, s, e, a.isOrdered()), n = new V(i.name(), o, i.nullable(), qe(i))), n || null;
}
function qe(i) {
  const t = /* @__PURE__ */ new Map();
  if (i)
    for (let e, n, r = -1, s = Math.trunc(i.customMetadataLength()); ++r < s; )
      (e = i.customMetadata(r)) && (n = e.key()) != null && t.set(n, e.value());
  return t;
}
function Hn(i) {
  return new Ht(i.isSigned(), i.bitWidth());
}
function Kn(i, t) {
  const e = i.typeType();
  switch (e) {
    case E.NONE:
      return new jt();
    case E.Null:
      return new jt();
    case E.Binary:
      return new ni();
    case E.LargeBinary:
      return new ri();
    case E.Utf8:
      return new si();
    case E.LargeUtf8:
      return new oi();
    case E.Bool:
      return new ai();
    case E.List:
      return new pi((t || [])[0]);
    case E.Struct_:
      return new K(t || []);
  }
  switch (e) {
    case E.Int: {
      const n = i.type(new et());
      return new Ht(n.isSigned(), n.bitWidth());
    }
    case E.FloatingPoint: {
      const n = i.type(new _t());
      return new ii(n.precision());
    }
    case E.Decimal: {
      const n = i.type(new Qt());
      return new ci(n.scale(), n.precision(), n.bitWidth());
    }
    case E.Date: {
      const n = i.type(new We());
      return new ui(n.unit());
    }
    case E.Time: {
      const n = i.type(new rt());
      return new li(n.unit(), n.bitWidth());
    }
    case E.Timestamp: {
      const n = i.type(new st());
      return new di(n.unit(), n.timezone());
    }
    case E.Interval: {
      const n = i.type(new vt());
      return new hi(n.unit());
    }
    case E.Duration: {
      const n = i.type(new Ye());
      return new fi(n.unit());
    }
    case E.Union: {
      const n = i.type(new q());
      return new yi(n.mode(), n.typeIdsArray() || [], t || []);
    }
    case E.FixedSizeBinary: {
      const n = i.type(new Je());
      return new mi(n.byteWidth());
    }
    case E.FixedSizeList: {
      const n = i.type(new He());
      return new gi(n.listSize(), (t || [])[0]);
    }
    case E.Map: {
      const n = i.type(new Ke());
      return new bi((t || [])[0], n.keysSorted());
    }
  }
  throw new Error(`Unrecognized type: "${E[e]}" (${e})`);
}
function Ic(i, t) {
  const e = t.fields.map((s) => V.encode(i, s));
  mt.startFieldsVector(i, e.length);
  const n = mt.createFieldsVector(i, e), r = t.metadata && t.metadata.size > 0 ? mt.createCustomMetadataVector(i, [...t.metadata].map(([s, o]) => {
    const a = i.createString(`${s}`), c = i.createString(`${o}`);
    return W.startKeyValue(i), W.addKey(i, a), W.addValue(i, c), W.endKeyValue(i);
  })) : -1;
  return mt.startSchema(i), mt.addFields(i, n), mt.addEndianness(i, Oc ? pe.Little : pe.Big), r !== -1 && mt.addCustomMetadata(i, r), mt.endSchema(i);
}
function Sc(i, t) {
  let e = -1, n = -1, r = -1;
  const s = t.type;
  let o = t.typeId;
  h.isDictionary(s) ? (o = s.dictionary.typeId, r = ki.visit(s, i), n = ki.visit(s.dictionary, i)) : n = ki.visit(s, i);
  const a = (s.children || []).map((d) => V.encode(i, d)), c = it.createChildrenVector(i, a), l = t.metadata && t.metadata.size > 0 ? it.createCustomMetadataVector(i, [...t.metadata].map(([d, f]) => {
    const $ = i.createString(`${d}`), N = i.createString(`${f}`);
    return W.startKeyValue(i), W.addKey(i, $), W.addValue(i, N), W.endKeyValue(i);
  })) : -1;
  return t.name && (e = i.createString(t.name)), it.startField(i), it.addType(i, n), it.addTypeType(i, o), it.addChildren(i, c), it.addNullable(i, !!t.nullable), e !== -1 && it.addName(i, e), r !== -1 && it.addDictionary(i, r), l !== -1 && it.addCustomMetadata(i, l), it.endField(i);
}
function Bc(i, t) {
  const e = t.nodes || [], n = t.buffers || [];
  At.startNodesVector(i, e.length);
  for (const o of e.slice().reverse())
    ve.encode(i, o);
  const r = i.endVector();
  At.startBuffersVector(i, n.length);
  for (const o of n.slice().reverse())
    Ut.encode(i, o);
  const s = i.endVector();
  return At.startRecordBatch(i), At.addLength(i, BigInt(t.length)), At.addNodes(i, r), At.addBuffers(i, s), At.endRecordBatch(i);
}
function Dc(i, t) {
  const e = ft.encode(i, t.data);
  return qt.startDictionaryBatch(i), qt.addId(i, BigInt(t.id)), qt.addIsDelta(i, t.isDelta), qt.addData(i, e), qt.endDictionaryBatch(i);
}
function Ac(i, t) {
  return lr.createFieldNode(i, BigInt(t.length), BigInt(t.nullCount));
}
function Fc(i, t) {
  return ur.createBuffer(i, BigInt(t.offset), BigInt(t.length));
}
const Oc = (() => {
  const i = new ArrayBuffer(2);
  return new DataView(i).setInt16(
    0,
    256,
    !0
    /* littleEndian */
  ), new Int16Array(i)[0] === 256;
})(), _n = (i) => `Expected ${M[i]} Message in stream, but was null or length 0.`, vn = (i) => `Header pointer of flatbuffer-encoded ${M[i]} Message is null or length 0.`, Ks = (i, t) => `Expected to read ${i} metadata bytes, but only read ${t}.`, Gs = (i, t) => `Expected to read ${i} bytes for message body, but only read ${t}.`;
class Zs {
  constructor(t) {
    this.source = t instanceof Ii ? t : new Ii(t);
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let t;
    return (t = this.readMetadataLength()).done || t.value === -1 && (t = this.readMetadataLength()).done || (t = this.readMetadata(t.value)).done ? P : t;
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  readMessage(t) {
    let e;
    if ((e = this.next()).done)
      return null;
    if (t != null && e.value.headerType !== t)
      throw new Error(_n(t));
    return e.value;
  }
  readMessageBody(t) {
    if (t <= 0)
      return new Uint8Array(0);
    const e = O(this.source.read(t));
    if (e.byteLength < t)
      throw new Error(Gs(t, e.byteLength));
    return (
      /* 1. */
      e.byteOffset % 8 === 0 && /* 2. */
      e.byteOffset + e.byteLength <= e.buffer.byteLength ? e : e.slice()
    );
  }
  readSchema(t = !1) {
    const e = M.Schema, n = this.readMessage(e), r = n == null ? void 0 : n.header();
    if (t && !r)
      throw new Error(vn(e));
    return r;
  }
  readMetadataLength() {
    const t = this.source.read(Ti), e = t && new fe(t), n = (e == null ? void 0 : e.readInt32(0)) || 0;
    return { done: n === 0, value: n };
  }
  readMetadata(t) {
    const e = this.source.read(t);
    if (!e)
      return P;
    if (e.byteLength < t)
      throw new Error(Ks(t, e.byteLength));
    return { done: !1, value: dt.decode(e) };
  }
}
class Nc {
  constructor(t, e) {
    this.source = t instanceof ge ? t : er(t) ? new Si(t, e) : new ge(t);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next() {
    return B(this, void 0, void 0, function* () {
      let t;
      return (t = yield this.readMetadataLength()).done || t.value === -1 && (t = yield this.readMetadataLength()).done || (t = yield this.readMetadata(t.value)).done ? P : t;
    });
  }
  throw(t) {
    return B(this, void 0, void 0, function* () {
      return yield this.source.throw(t);
    });
  }
  return(t) {
    return B(this, void 0, void 0, function* () {
      return yield this.source.return(t);
    });
  }
  readMessage(t) {
    return B(this, void 0, void 0, function* () {
      let e;
      if ((e = yield this.next()).done)
        return null;
      if (t != null && e.value.headerType !== t)
        throw new Error(_n(t));
      return e.value;
    });
  }
  readMessageBody(t) {
    return B(this, void 0, void 0, function* () {
      if (t <= 0)
        return new Uint8Array(0);
      const e = O(yield this.source.read(t));
      if (e.byteLength < t)
        throw new Error(Gs(t, e.byteLength));
      return (
        /* 1. */
        e.byteOffset % 8 === 0 && /* 2. */
        e.byteOffset + e.byteLength <= e.buffer.byteLength ? e : e.slice()
      );
    });
  }
  readSchema() {
    return B(this, arguments, void 0, function* (t = !1) {
      const e = M.Schema, n = yield this.readMessage(e), r = n == null ? void 0 : n.header();
      if (t && !r)
        throw new Error(vn(e));
      return r;
    });
  }
  readMetadataLength() {
    return B(this, void 0, void 0, function* () {
      const t = yield this.source.read(Ti), e = t && new fe(t), n = (e == null ? void 0 : e.readInt32(0)) || 0;
      return { done: n === 0, value: n };
    });
  }
  readMetadata(t) {
    return B(this, void 0, void 0, function* () {
      const e = yield this.source.read(t);
      if (!e)
        return P;
      if (e.byteLength < t)
        throw new Error(Ks(t, e.byteLength));
      return { done: !1, value: dt.decode(e) };
    });
  }
}
class Mc extends Zs {
  constructor(t) {
    super(new Uint8Array(0)), this._schema = !1, this._body = [], this._batchIndex = 0, this._dictionaryIndex = 0, this._json = t instanceof kn ? t : new kn(t);
  }
  next() {
    const { _json: t } = this;
    if (!this._schema)
      return this._schema = !0, { done: !1, value: dt.fromJSON(t.schema, M.Schema) };
    if (this._dictionaryIndex < t.dictionaries.length) {
      const e = t.dictionaries[this._dictionaryIndex++];
      return this._body = e.data.columns, { done: !1, value: dt.fromJSON(e, M.DictionaryBatch) };
    }
    if (this._batchIndex < t.batches.length) {
      const e = t.batches[this._batchIndex++];
      return this._body = e.columns, { done: !1, value: dt.fromJSON(e, M.RecordBatch) };
    }
    return this._body = [], P;
  }
  readMessageBody(t) {
    return e(this._body);
    function e(n) {
      return (n || []).reduce((r, s) => [
        ...r,
        ...s.VALIDITY && [s.VALIDITY] || [],
        ...s.TYPE_ID && [s.TYPE_ID] || [],
        ...s.OFFSET && [s.OFFSET] || [],
        ...s.DATA && [s.DATA] || [],
        ...e(s.children)
      ], []);
    }
  }
  readMessage(t) {
    let e;
    if ((e = this.next()).done)
      return null;
    if (t != null && e.value.headerType !== t)
      throw new Error(_n(t));
    return e.value;
  }
  readSchema() {
    const t = M.Schema, e = this.readMessage(t), n = e == null ? void 0 : e.header();
    if (!e || !n)
      throw new Error(vn(t));
    return n;
  }
}
const Ti = 4, Qi = "ARROW1", Bi = new Uint8Array(Qi.length);
for (let i = 0; i < Qi.length; i += 1)
  Bi[i] = Qi.codePointAt(i);
function wn(i, t = 0) {
  for (let e = -1, n = Bi.length; ++e < n; )
    if (Bi[e] !== i[t + e])
      return !1;
  return !0;
}
const Ve = Bi.length, qs = Ve + Ti, Uc = Ve * 2 + Ti;
class Tt extends zs {
  constructor(t) {
    super(), this._impl = t;
  }
  get closed() {
    return this._impl.closed;
  }
  get schema() {
    return this._impl.schema;
  }
  get autoDestroy() {
    return this._impl.autoDestroy;
  }
  get dictionaries() {
    return this._impl.dictionaries;
  }
  get numDictionaries() {
    return this._impl.numDictionaries;
  }
  get numRecordBatches() {
    return this._impl.numRecordBatches;
  }
  get footer() {
    return this._impl.isFile() ? this._impl.footer : null;
  }
  isSync() {
    return this._impl.isSync();
  }
  isAsync() {
    return this._impl.isAsync();
  }
  isFile() {
    return this._impl.isFile();
  }
  isStream() {
    return this._impl.isStream();
  }
  next() {
    return this._impl.next();
  }
  throw(t) {
    return this._impl.throw(t);
  }
  return(t) {
    return this._impl.return(t);
  }
  cancel() {
    return this._impl.cancel();
  }
  reset(t) {
    return this._impl.reset(t), this._DOMStream = void 0, this._nodeStream = void 0, this;
  }
  open(t) {
    const e = this._impl.open(t);
    return Ue(e) ? e.then(() => this) : this;
  }
  readRecordBatch(t) {
    return this._impl.isFile() ? this._impl.readRecordBatch(t) : null;
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
  toDOMStream() {
    return nt.toDOMStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this });
  }
  toNodeStream() {
    return nt.toNodeStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this }, { objectMode: !0 });
  }
  /** @nocollapse */
  // @ts-ignore
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  /** @nocollapse */
  static throughDOM(t, e) {
    throw new Error('"throughDOM" not available in this environment');
  }
  /** @nocollapse */
  static from(t) {
    return t instanceof Tt ? t : $i(t) ? xc(t) : er(t) ? zc(t) : Ue(t) ? B(this, void 0, void 0, function* () {
      return yield Tt.from(yield t);
    }) : ir(t) || nn(t) || rr(t) || en(t) ? Ec(new ge(t)) : Cc(new Ii(t));
  }
  /** @nocollapse */
  static readAll(t) {
    return t instanceof Tt ? t.isSync() ? Gn(t) : Zn(t) : $i(t) || ArrayBuffer.isView(t) || Ni(t) || tr(t) ? Gn(t) : Zn(t);
  }
}
class Di extends Tt {
  constructor(t) {
    super(t), this._impl = t;
  }
  readAll() {
    return [...this];
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return wt(this, arguments, function* () {
      yield D(yield* $e(ce(this[Symbol.iterator]())));
    });
  }
}
class Ai extends Tt {
  constructor(t) {
    super(t), this._impl = t;
  }
  readAll() {
    return B(this, void 0, void 0, function* () {
      var t, e, n, r;
      const s = new Array();
      try {
        for (var o = !0, a = ce(this), c; c = yield a.next(), t = c.done, !t; o = !0) {
          r = c.value, o = !1;
          const l = r;
          s.push(l);
        }
      } catch (l) {
        e = { error: l };
      } finally {
        try {
          !o && !t && (n = a.return) && (yield n.call(a));
        } finally {
          if (e) throw e.error;
        }
      }
      return s;
    });
  }
  [Symbol.iterator]() {
    throw new Error("AsyncRecordBatchStreamReader is not Iterable");
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
}
class Xs extends Di {
  constructor(t) {
    super(t), this._impl = t;
  }
}
class Tc extends Ai {
  constructor(t) {
    super(t), this._impl = t;
  }
}
class Qs {
  get numDictionaries() {
    return this._dictionaryIndex;
  }
  get numRecordBatches() {
    return this._recordBatchIndex;
  }
  constructor(t = /* @__PURE__ */ new Map()) {
    this.closed = !1, this.autoDestroy = !0, this._dictionaryIndex = 0, this._recordBatchIndex = 0, this.dictionaries = t;
  }
  isSync() {
    return !1;
  }
  isAsync() {
    return !1;
  }
  isFile() {
    return !1;
  }
  isStream() {
    return !1;
  }
  reset(t) {
    return this._dictionaryIndex = 0, this._recordBatchIndex = 0, this.schema = t, this.dictionaries = /* @__PURE__ */ new Map(), this;
  }
  _loadRecordBatch(t, e) {
    const n = this._loadVectors(t, e, this.schema.fields), r = A({ type: new K(this.schema.fields), length: t.length, children: n });
    return new lt(this.schema, r);
  }
  _loadDictionaryBatch(t, e) {
    const { id: n, isDelta: r } = t, { dictionaries: s, schema: o } = this, a = s.get(n), c = o.dictionaries.get(n), l = this._loadVectors(t.data, e, [c]);
    return (a && r ? a.concat(new C(l)) : new C(l)).memoize();
  }
  _loadVectors(t, e, n) {
    return new ks(e, t.nodes, t.buffers, this.dictionaries, this.schema.metadataVersion).visitMany(n);
  }
}
class Fi extends Qs {
  constructor(t, e) {
    super(e), this._reader = $i(t) ? new Mc(this._handle = t) : new Zs(this._handle = t);
  }
  isSync() {
    return !0;
  }
  isStream() {
    return !0;
  }
  [Symbol.iterator]() {
    return this;
  }
  cancel() {
    !this.closed && (this.closed = !0) && (this.reset()._reader.return(), this._reader = null, this.dictionaries = null);
  }
  open(t) {
    return this.closed || (this.autoDestroy = eo(this, t), this.schema || (this.schema = this._reader.readSchema()) || this.cancel()), this;
  }
  throw(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0) ? this.reset()._reader.throw(t) : P;
  }
  return(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0) ? this.reset()._reader.return(t) : P;
  }
  next() {
    if (this.closed)
      return P;
    let t;
    const { _reader: e } = this;
    for (; t = this._readNextMessageAndValidate(); )
      if (t.isSchema())
        this.reset(t.header());
      else if (t.isRecordBatch()) {
        this._recordBatchIndex++;
        const n = t.header(), r = e.readMessageBody(t.bodyLength);
        return { done: !1, value: this._loadRecordBatch(n, r) };
      } else if (t.isDictionaryBatch()) {
        this._dictionaryIndex++;
        const n = t.header(), r = e.readMessageBody(t.bodyLength), s = this._loadDictionaryBatch(n, r);
        this.dictionaries.set(n.id, s);
      }
    return this.schema && this._recordBatchIndex === 0 ? (this._recordBatchIndex++, { done: !1, value: new Ws(this.schema) }) : this.return();
  }
  _readNextMessageAndValidate(t) {
    return this._reader.readMessage(t);
  }
}
class Oi extends Qs {
  constructor(t, e) {
    super(e), this._reader = new Nc(this._handle = t);
  }
  isAsync() {
    return !0;
  }
  isStream() {
    return !0;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  cancel() {
    return B(this, void 0, void 0, function* () {
      !this.closed && (this.closed = !0) && (yield this.reset()._reader.return(), this._reader = null, this.dictionaries = null);
    });
  }
  open(t) {
    return B(this, void 0, void 0, function* () {
      return this.closed || (this.autoDestroy = eo(this, t), this.schema || (this.schema = yield this._reader.readSchema()) || (yield this.cancel())), this;
    });
  }
  throw(t) {
    return B(this, void 0, void 0, function* () {
      return !this.closed && this.autoDestroy && (this.closed = !0) ? yield this.reset()._reader.throw(t) : P;
    });
  }
  return(t) {
    return B(this, void 0, void 0, function* () {
      return !this.closed && this.autoDestroy && (this.closed = !0) ? yield this.reset()._reader.return(t) : P;
    });
  }
  next() {
    return B(this, void 0, void 0, function* () {
      if (this.closed)
        return P;
      let t;
      const { _reader: e } = this;
      for (; t = yield this._readNextMessageAndValidate(); )
        if (t.isSchema())
          yield this.reset(t.header());
        else if (t.isRecordBatch()) {
          this._recordBatchIndex++;
          const n = t.header(), r = yield e.readMessageBody(t.bodyLength);
          return { done: !1, value: this._loadRecordBatch(n, r) };
        } else if (t.isDictionaryBatch()) {
          this._dictionaryIndex++;
          const n = t.header(), r = yield e.readMessageBody(t.bodyLength), s = this._loadDictionaryBatch(n, r);
          this.dictionaries.set(n.id, s);
        }
      return this.schema && this._recordBatchIndex === 0 ? (this._recordBatchIndex++, { done: !1, value: new Ws(this.schema) }) : yield this.return();
    });
  }
  _readNextMessageAndValidate(t) {
    return B(this, void 0, void 0, function* () {
      return yield this._reader.readMessage(t);
    });
  }
}
class to extends Fi {
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  constructor(t, e) {
    super(t instanceof Pn ? t : new Pn(t), e);
  }
  isSync() {
    return !0;
  }
  isFile() {
    return !0;
  }
  open(t) {
    if (!this.closed && !this._footer) {
      this.schema = (this._footer = this._readFooter()).schema;
      for (const e of this._footer.dictionaryBatches())
        e && this._readDictionaryBatch(this._dictionaryIndex++);
    }
    return super.open(t);
  }
  readRecordBatch(t) {
    var e;
    if (this.closed)
      return null;
    this._footer || this.open();
    const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(t);
    if (n && this._handle.seek(n.offset)) {
      const r = this._reader.readMessage(M.RecordBatch);
      if (r != null && r.isRecordBatch()) {
        const s = r.header(), o = this._reader.readMessageBody(r.bodyLength);
        return this._loadRecordBatch(s, o);
      }
    }
    return null;
  }
  _readDictionaryBatch(t) {
    var e;
    const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getDictionaryBatch(t);
    if (n && this._handle.seek(n.offset)) {
      const r = this._reader.readMessage(M.DictionaryBatch);
      if (r != null && r.isDictionaryBatch()) {
        const s = r.header(), o = this._reader.readMessageBody(r.bodyLength), a = this._loadDictionaryBatch(s, o);
        this.dictionaries.set(s.id, a);
      }
    }
  }
  _readFooter() {
    const { _handle: t } = this, e = t.size - qs, n = t.readInt32(e), r = t.readAt(e - n, n);
    return pn.decode(r);
  }
  _readNextMessageAndValidate(t) {
    var e;
    if (this._footer || this.open(), this._footer && this._recordBatchIndex < this.numRecordBatches) {
      const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(this._recordBatchIndex);
      if (n && this._handle.seek(n.offset))
        return this._reader.readMessage(t);
    }
    return null;
  }
}
class Lc extends Oi {
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  constructor(t, ...e) {
    const n = typeof e[0] != "number" ? e.shift() : void 0, r = e[0] instanceof Map ? e.shift() : void 0;
    super(t instanceof Si ? t : new Si(t, n), r);
  }
  isFile() {
    return !0;
  }
  isAsync() {
    return !0;
  }
  open(t) {
    const e = Object.create(null, {
      open: { get: () => super.open }
    });
    return B(this, void 0, void 0, function* () {
      if (!this.closed && !this._footer) {
        this.schema = (this._footer = yield this._readFooter()).schema;
        for (const n of this._footer.dictionaryBatches())
          n && (yield this._readDictionaryBatch(this._dictionaryIndex++));
      }
      return yield e.open.call(this, t);
    });
  }
  readRecordBatch(t) {
    return B(this, void 0, void 0, function* () {
      var e;
      if (this.closed)
        return null;
      this._footer || (yield this.open());
      const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(t);
      if (n && (yield this._handle.seek(n.offset))) {
        const r = yield this._reader.readMessage(M.RecordBatch);
        if (r != null && r.isRecordBatch()) {
          const s = r.header(), o = yield this._reader.readMessageBody(r.bodyLength);
          return this._loadRecordBatch(s, o);
        }
      }
      return null;
    });
  }
  _readDictionaryBatch(t) {
    return B(this, void 0, void 0, function* () {
      var e;
      const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getDictionaryBatch(t);
      if (n && (yield this._handle.seek(n.offset))) {
        const r = yield this._reader.readMessage(M.DictionaryBatch);
        if (r != null && r.isDictionaryBatch()) {
          const s = r.header(), o = yield this._reader.readMessageBody(r.bodyLength), a = this._loadDictionaryBatch(s, o);
          this.dictionaries.set(s.id, a);
        }
      }
    });
  }
  _readFooter() {
    return B(this, void 0, void 0, function* () {
      const { _handle: t } = this;
      t._pending && (yield t._pending);
      const e = t.size - qs, n = yield t.readInt32(e), r = yield t.readAt(e - n, n);
      return pn.decode(r);
    });
  }
  _readNextMessageAndValidate(t) {
    return B(this, void 0, void 0, function* () {
      if (this._footer || (yield this.open()), this._footer && this._recordBatchIndex < this.numRecordBatches) {
        const e = this._footer.getRecordBatch(this._recordBatchIndex);
        if (e && (yield this._handle.seek(e.offset)))
          return yield this._reader.readMessage(t);
      }
      return null;
    });
  }
}
class Rc extends Fi {
  constructor(t, e) {
    super(t, e);
  }
  _loadVectors(t, e, n) {
    return new Ja(e, t.nodes, t.buffers, this.dictionaries, this.schema.metadataVersion).visitMany(n);
  }
}
function eo(i, t) {
  return t && typeof t.autoDestroy == "boolean" ? t.autoDestroy : i.autoDestroy;
}
function* Gn(i) {
  const t = Tt.from(i);
  try {
    if (!t.open({ autoDestroy: !1 }).closed)
      do
        yield t;
      while (!t.reset().open().closed);
  } finally {
    t.cancel();
  }
}
function Zn(i) {
  return wt(this, arguments, function* () {
    const e = yield D(Tt.from(i));
    try {
      if (!(yield D(e.open({ autoDestroy: !1 }))).closed)
        do
          yield yield D(e);
        while (!(yield D(e.reset().open())).closed);
    } finally {
      yield D(e.cancel());
    }
  });
}
function xc(i) {
  return new Di(new Rc(i));
}
function Cc(i) {
  const t = i.peek(Ve + 7 & -8);
  return t && t.byteLength >= 4 ? wn(t) ? new Xs(new to(i.read())) : new Di(new Fi(i)) : new Di(new Fi((function* () {
  })()));
}
function Ec(i) {
  return B(this, void 0, void 0, function* () {
    const t = yield i.peek(Ve + 7 & -8);
    return t && t.byteLength >= 4 ? wn(t) ? new Xs(new to(yield i.read())) : new Ai(new Oi(i)) : new Ai(new Oi((function() {
      return wt(this, arguments, function* () {
      });
    })()));
  });
}
function zc(i) {
  return B(this, void 0, void 0, function* () {
    const { size: t } = yield i.stat(), e = new Si(i, t);
    return t >= Uc && wn(yield e.readAt(0, Ve + 7 & -8)) ? new Tc(new Lc(e)) : new Ai(new Oi(e));
  });
}
function io(i) {
  const t = Tt.from(i);
  return Ue(t) ? t.then((e) => io(e)) : t.isAsync() ? t.readAll().then((e) => new ot(e)) : new ot(t.readAll());
}
function k(i) {
  return i != null && typeof i == "object" && i["@@functional/placeholder"] === !0;
}
function It(i) {
  return function t(e) {
    return arguments.length === 0 || k(e) ? t : i.apply(this, arguments);
  };
}
function Pt(i) {
  return function t(e, n) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return k(e) ? t : It(function(r) {
          return i(e, r);
        });
      default:
        return k(e) && k(n) ? t : k(e) ? It(function(r) {
          return i(r, n);
        }) : k(n) ? It(function(r) {
          return i(e, r);
        }) : i(e, n);
    }
  };
}
function no(i, t) {
  switch (i) {
    case 0:
      return function() {
        return t.apply(this, arguments);
      };
    case 1:
      return function(e) {
        return t.apply(this, arguments);
      };
    case 2:
      return function(e, n) {
        return t.apply(this, arguments);
      };
    case 3:
      return function(e, n, r) {
        return t.apply(this, arguments);
      };
    case 4:
      return function(e, n, r, s) {
        return t.apply(this, arguments);
      };
    case 5:
      return function(e, n, r, s, o) {
        return t.apply(this, arguments);
      };
    case 6:
      return function(e, n, r, s, o, a) {
        return t.apply(this, arguments);
      };
    case 7:
      return function(e, n, r, s, o, a, c) {
        return t.apply(this, arguments);
      };
    case 8:
      return function(e, n, r, s, o, a, c, l) {
        return t.apply(this, arguments);
      };
    case 9:
      return function(e, n, r, s, o, a, c, l, d) {
        return t.apply(this, arguments);
      };
    case 10:
      return function(e, n, r, s, o, a, c, l, d, f) {
        return t.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}
function ro(i) {
  return function t(e, n, r) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return k(e) ? t : Pt(function(s, o) {
          return i(e, s, o);
        });
      case 2:
        return k(e) && k(n) ? t : k(e) ? Pt(function(s, o) {
          return i(s, n, o);
        }) : k(n) ? Pt(function(s, o) {
          return i(e, s, o);
        }) : It(function(s) {
          return i(e, n, s);
        });
      default:
        return k(e) && k(n) && k(r) ? t : k(e) && k(n) ? Pt(function(s, o) {
          return i(s, o, r);
        }) : k(e) && k(r) ? Pt(function(s, o) {
          return i(s, n, o);
        }) : k(n) && k(r) ? Pt(function(s, o) {
          return i(e, s, o);
        }) : k(e) ? It(function(s) {
          return i(s, n, r);
        }) : k(n) ? It(function(s) {
          return i(e, s, r);
        }) : k(r) ? It(function(s) {
          return i(e, n, s);
        }) : i(e, n, r);
    }
  };
}
const so = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function oo(i) {
  return Object.prototype.toString.call(i) === "[object String]";
}
var Vc = /* @__PURE__ */ It(function(t) {
  return so(t) ? !0 : !t || typeof t != "object" || oo(t) ? !1 : t.length === 0 ? !0 : t.length > 0 ? t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1) : !1;
}), kc = /* @__PURE__ */ (function() {
  function i(t) {
    this.f = t;
  }
  return i.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  }, i.prototype["@@transducer/result"] = function(t) {
    return t;
  }, i.prototype["@@transducer/step"] = function(t, e) {
    return this.f(t, e);
  }, i;
})();
function Pc(i) {
  return new kc(i);
}
var jc = /* @__PURE__ */ Pt(function(t, e) {
  return no(t.length, function() {
    return t.apply(e, arguments);
  });
});
function $c(i, t, e) {
  for (var n = 0, r = e.length; n < r; ) {
    if (t = i["@@transducer/step"](t, e[n]), t && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"];
      break;
    }
    n += 1;
  }
  return i["@@transducer/result"](t);
}
function qn(i, t, e) {
  for (var n = e.next(); !n.done; ) {
    if (t = i["@@transducer/step"](t, n.value), t && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"];
      break;
    }
    n = e.next();
  }
  return i["@@transducer/result"](t);
}
function Xn(i, t, e, n) {
  return i["@@transducer/result"](e[n](jc(i["@@transducer/step"], i), t));
}
var Qn = typeof Symbol < "u" ? Symbol.iterator : "@@iterator";
function Wc(i, t, e) {
  if (typeof i == "function" && (i = Pc(i)), Vc(e))
    return $c(i, t, e);
  if (typeof e["fantasy-land/reduce"] == "function")
    return Xn(i, t, e, "fantasy-land/reduce");
  if (e[Qn] != null)
    return qn(i, t, e[Qn]());
  if (typeof e.next == "function")
    return qn(i, t, e);
  if (typeof e.reduce == "function")
    return Xn(i, t, e, "reduce");
  throw new TypeError("reduce: list must be array or iterable");
}
var Yc = /* @__PURE__ */ ro(Wc);
function Jc(i, t) {
  return function() {
    return t.call(this, i.apply(this, arguments));
  };
}
function ao(i, t) {
  return function() {
    var e = arguments.length;
    if (e === 0)
      return t();
    var n = arguments[e - 1];
    return so(n) || typeof n[i] != "function" ? t.apply(this, arguments) : n[i].apply(n, Array.prototype.slice.call(arguments, 0, e - 1));
  };
}
var Hc = /* @__PURE__ */ ro(
  /* @__PURE__ */ ao("slice", function(t, e, n) {
    return Array.prototype.slice.call(n, t, e);
  })
), Kc = /* @__PURE__ */ It(
  /* @__PURE__ */ ao(
    "tail",
    /* @__PURE__ */ Hc(1, 1 / 0)
  )
);
function Gc() {
  if (arguments.length === 0)
    throw new Error("pipe requires at least one argument");
  return no(arguments[0].length, Yc(Jc, arguments[0], Kc(arguments)));
}
var Zc = /* @__PURE__ */ It(function(t) {
  return oo(t) ? t.split("").reverse().join("") : Array.prototype.slice.call(t, 0).reverse();
});
function Pi() {
  if (arguments.length === 0)
    throw new Error("compose requires at least one argument");
  return Gc.apply(this, Zc(arguments));
}
var qc = /* @__PURE__ */ Pt(function(t, e) {
  for (var n = {}, r = 0; r < t.length; )
    t[r] in e && (n[t[r]] = e[t[r]]), r += 1;
  return n;
});
class Xc {
  constructor(t) {
    Ri(this, "fieldNames", []);
    Ri(this, "coerceRow", (t) => qc(this.fieldNames, t));
    for (const e of t)
      h.isTimestamp(e) ? this.composeTimestampField(e) : h.isInt(e) ? this.composeIntField(e) : h.isFloat(e) && this.composeFloatField(e), this.fieldNames.push(e.name);
  }
  composeIntField(t) {
    t.type.bitWidth >= 64 && (this.coerceRow = Pi((e) => e, this.coerceRow));
  }
  composeFloatField(t) {
    this.coerceRow = Pi((e) => {
      const n = e[t.name];
      return n && (e[t.name] = parseFloat(n)), e;
    }, this.coerceRow);
  }
  composeTimestampField(t) {
    // only handle UTC or local timetamps
    (t.type.timezone === null || t.type.timezone === "UTC") && (this.coerceRow = Pi((e) => {
      const n = e[t.name];
      return n && (e[t.name] = new Date(n).toISOString()), e;
    }, this.coerceRow));
  }
}
const Xe = (i) => {
  switch (i.typeId) {
    case u.Null:
      return "null";
    case u.Int:
      return "integer";
    case u.Float:
      return i.precision === J.DOUBLE ? "double" : "float";
    case u.Binary:
    case u.FixedSizeBinary:
      return "binary";
    case u.Utf8:
      return "string";
    case u.Bool:
      return "boolean";
    case u.Decimal:
      return "decimal";
    case u.Date:
      return "date";
    case u.Time:
      return "time";
    case u.Timestamp:
      return "timestamp";
    case u.Interval:
      return "interval";
    case u.List:
    case u.FixedSizeList:
      return `[${Xe(i.children[0].type)}]`;
    case u.Struct:
      return "struct";
    case u.Union:
      return i.children.map((t) => Xe(t.type)).filter((t) => t !== "null").join(" or ");
    case u.Map:
      return "map";
    case u.Dictionary:
      return h.isUtf8(i.valueType) ? "category" : Xe(i.valueType);
    default:
      return i.toString();
  }
}, Qc = (i) => i.fields.map((t) => ({
  name: t.name,
  type: Xe(t.type)
})), iu = (i) => {
  const t = [], e = io(i), n = new Xc(e.schema.fields);
  for (const r of e)
    t.push(n.coerceRow(r));
  return {
    schema: Qc(e.schema),
    data: t,
    // For now we want to disable sanddance for datasets containing int64 columns
    containsBigInt: e.schema.fields.some(
      (r) => r.type.bitWidth && r.type.bitWidth >= 64
    )
  };
};
export {
  iu as apiResponseToArrow
};
