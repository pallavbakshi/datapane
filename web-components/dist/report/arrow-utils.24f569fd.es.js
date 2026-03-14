var Ts = Object.defineProperty;
var Ms = (i, t, e) => t in i ? Ts(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var Oi = (i, t, e) => (Ms(i, typeof t != "symbol" ? t + "" : t, e), e);
function p(i, t, e, n) {
  function r(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function a(d) {
      try {
        u(n.next(d));
      } catch (h) {
        o(h);
      }
    }
    function c(d) {
      try {
        u(n.throw(d));
      } catch (h) {
        o(h);
      }
    }
    function u(d) {
      d.done ? s(d.value) : r(d.value).then(a, c);
    }
    u((n = n.apply(i, t || [])).next());
  });
}
function hn(i) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && i[t], n = 0;
  if (e)
    return e.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function() {
        return i && n >= i.length && (i = void 0), { value: i && i[n++], done: !i };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function S(i) {
  return this instanceof S ? (this.v = i, this) : new S(i);
}
function Ot(i, t, e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e.apply(i, t || []), r, s = [];
  return r = {}, o("next"), o("throw"), o("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r;
  function o(A) {
    n[A] && (r[A] = function(j) {
      return new Promise(function(nt, Fi) {
        s.push([A, j, nt, Fi]) > 1 || a(A, j);
      });
    });
  }
  function a(A, j) {
    try {
      c(n[A](j));
    } catch (nt) {
      h(s[0][3], nt);
    }
  }
  function c(A) {
    A.value instanceof S ? Promise.resolve(A.value.v).then(u, d) : h(s[0][2], A);
  }
  function u(A) {
    a("next", A);
  }
  function d(A) {
    a("throw", A);
  }
  function h(A, j) {
    A(j), s.shift(), s.length && a(s[0][0], s[0][1]);
  }
}
function je(i) {
  var t, e;
  return t = {}, n("next"), n("throw", function(r) {
    throw r;
  }), n("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function n(r, s) {
    t[r] = i[r] ? function(o) {
      return (e = !e) ? { value: S(i[r](o)), done: !1 } : s ? s(o) : o;
    } : s;
  }
}
function le(i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = i[Symbol.asyncIterator], e;
  return t ? t.call(i) : (i = typeof hn == "function" ? hn(i) : i[Symbol.iterator](), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
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
    Promise.resolve(c).then(function(u) {
      s({ value: u, done: a });
    }, o);
  }
}
const Ls = new TextDecoder("utf-8"), Ri = (i) => Ls.decode(i), Us = new TextEncoder(), $i = (i) => Us.encode(i), [Le, zc] = (() => {
  const i = () => {
    throw new Error("BigInt64Array is not available in this environment");
  };
  class t {
    static get BYTES_PER_ELEMENT() {
      return 8;
    }
    static of() {
      throw i();
    }
    static from() {
      throw i();
    }
    constructor() {
      throw i();
    }
  }
  return typeof BigInt64Array < "u" ? [BigInt64Array, !0] : [t, !1];
})(), [Ue, kc] = (() => {
  const i = () => {
    throw new Error("BigUint64Array is not available in this environment");
  };
  class t {
    static get BYTES_PER_ELEMENT() {
      return 8;
    }
    static of() {
      throw i();
    }
    static from() {
      throw i();
    }
    constructor() {
      throw i();
    }
  }
  return typeof BigUint64Array < "u" ? [BigUint64Array, !0] : [t, !1];
})(), Rs = (i) => typeof i == "number", xs = (i) => typeof i == "boolean", H = (i) => typeof i == "function", ft = (i) => i != null && Object(i) === i, Fe = (i) => ft(i) && H(i.then), wi = (i) => ft(i) && H(i[Symbol.iterator]), Wi = (i) => ft(i) && H(i[Symbol.asyncIterator]), xi = (i) => ft(i) && ft(i.schema), xn = (i) => ft(i) && "done" in i && "value" in i, En = (i) => ft(i) && H(i.stat) && Rs(i.fd), Cn = (i) => ft(i) && Yi(i.body), Vn = (i) => "_getDOMStream" in i && "_getNodeStream" in i, Yi = (i) => ft(i) && H(i.cancel) && H(i.getReader) && !Vn(i), zn = (i) => ft(i) && H(i.read) && H(i.pipe) && xs(i.readable) && !Vn(i), Es = (i) => ft(i) && H(i.clear) && H(i.bytes) && H(i.position) && H(i.setPosition) && H(i.capacity) && H(i.getBufferIdentifier) && H(i.createLong), Ji = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : ArrayBuffer;
function Cs(i) {
  const t = i[0] ? [i[0]] : [];
  let e, n, r, s;
  for (let o, a, c = 0, u = 0, d = i.length; ++c < d; ) {
    if (o = t[u], a = i[c], !o || !a || o.buffer !== a.buffer || a.byteOffset < o.byteOffset) {
      a && (t[++u] = a);
      continue;
    }
    if ({ byteOffset: e, byteLength: r } = o, { byteOffset: n, byteLength: s } = a, e + r < n || n + s < e) {
      a && (t[++u] = a);
      continue;
    }
    t[u] = new Uint8Array(o.buffer, e, n - e + s);
  }
  return t;
}
function fn(i, t, e = 0, n = t.byteLength) {
  const r = i.byteLength, s = new Uint8Array(i.buffer, i.byteOffset, r), o = new Uint8Array(t.buffer, t.byteOffset, Math.min(n, r));
  return s.set(o, e), i;
}
function Nt(i, t) {
  const e = Cs(i), n = e.reduce((d, h) => d + h.byteLength, 0);
  let r, s, o, a = 0, c = -1;
  const u = Math.min(t || Number.POSITIVE_INFINITY, n);
  for (const d = e.length; ++c < d; ) {
    if (r = e[c], s = r.subarray(0, Math.min(r.length, u - a)), u <= a + s.length) {
      s.length < r.length ? e[c] = r.subarray(s.length) : s.length === r.length && c++, o ? fn(o, s, a) : o = s;
      break;
    }
    fn(o || (o = new Uint8Array(u)), s, a), a += s.length;
  }
  return [o || new Uint8Array(0), e.slice(c), n - (o ? o.byteLength : 0)];
}
function R(i, t) {
  let e = xn(t) ? t.value : t;
  return e instanceof i ? i === Uint8Array ? new i(e.buffer, e.byteOffset, e.byteLength) : e : e ? (typeof e == "string" && (e = $i(e)), e instanceof ArrayBuffer ? new i(e) : e instanceof Ji ? new i(e) : Es(e) ? R(i, e.bytes()) : ArrayBuffer.isView(e) ? e.byteLength <= 0 ? new i(0) : new i(e.buffer, e.byteOffset, e.byteLength / i.BYTES_PER_ELEMENT) : i.from(e)) : new i(0);
}
const Be = (i) => R(Int32Array, i), N = (i) => R(Uint8Array, i), Ei = (i) => (i.next(), i);
function* Vs(i, t) {
  const e = function* (r) {
    yield r;
  }, n = typeof t == "string" || ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof Ji ? e(t) : wi(t) ? t : e(t);
  return yield* Ei(function* (r) {
    let s = null;
    do
      s = r.next(yield R(i, s));
    while (!s.done);
  }(n[Symbol.iterator]())), new i();
}
const zs = (i) => Vs(Uint8Array, i);
function kn(i, t) {
  return Ot(this, arguments, function* () {
    if (Fe(t))
      return yield S(yield S(yield* je(le(kn(i, yield S(t))))));
    const n = function(o) {
      return Ot(this, arguments, function* () {
        yield yield S(yield S(o));
      });
    }, r = function(o) {
      return Ot(this, arguments, function* () {
        yield S(yield* je(le(Ei(function* (a) {
          let c = null;
          do
            c = a.next(yield c == null ? void 0 : c.value);
          while (!c.done);
        }(o[Symbol.iterator]())))));
      });
    }, s = typeof t == "string" || ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof Ji ? n(t) : wi(t) ? r(t) : Wi(t) ? t : n(t);
    return yield S(
      yield* je(le(Ei(function(o) {
        return Ot(this, arguments, function* () {
          let a = null;
          do
            a = yield S(o.next(yield yield S(R(i, a))));
          while (!a.done);
        });
      }(s[Symbol.asyncIterator]()))))
    ), yield S(new i());
  });
}
const ks = (i) => kn(Uint8Array, i);
function js(i, t) {
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
const rt = {
  fromIterable(i) {
    return Ve(Ps(i));
  },
  fromAsyncIterable(i) {
    return Ve($s(i));
  },
  fromDOMStream(i) {
    return Ve(Ws(i));
  },
  fromNodeStream(i) {
    return Ve(Js(i));
  },
  toDOMStream(i, t) {
    throw new Error('"toDOMStream" not available in this environment');
  },
  toNodeStream(i, t) {
    throw new Error('"toNodeStream" not available in this environment');
  }
}, Ve = (i) => (i.next(), i);
function* Ps(i) {
  let t, e = !1, n = [], r, s, o, a = 0;
  function c() {
    return s === "peek" ? Nt(n, o)[0] : ([r, n, a] = Nt(n, o), r);
  }
  ({ cmd: s, size: o } = yield null);
  const u = zs(i)[Symbol.iterator]();
  try {
    do
      if ({ done: t, value: r } = Number.isNaN(o - a) ? u.next() : u.next(o - a), !t && r.byteLength > 0 && (n.push(r), a += r.byteLength), t || o <= a)
        do
          ({ cmd: s, size: o } = yield c());
        while (o < a);
    while (!t);
  } catch (d) {
    (e = !0) && typeof u.throw == "function" && u.throw(d);
  } finally {
    e === !1 && typeof u.return == "function" && u.return(null);
  }
  return null;
}
function $s(i) {
  return Ot(this, arguments, function* () {
    let e, n = !1, r = [], s, o, a, c = 0;
    function u() {
      return o === "peek" ? Nt(r, a)[0] : ([s, r, c] = Nt(r, a), s);
    }
    ({ cmd: o, size: a } = yield yield S(null));
    const d = ks(i)[Symbol.asyncIterator]();
    try {
      do
        if ({ done: e, value: s } = Number.isNaN(a - c) ? yield S(d.next()) : yield S(d.next(a - c)), !e && s.byteLength > 0 && (r.push(s), c += s.byteLength), e || a <= c)
          do
            ({ cmd: o, size: a } = yield yield S(u()));
          while (a < c);
      while (!e);
    } catch (h) {
      (n = !0) && typeof d.throw == "function" && (yield S(d.throw(h)));
    } finally {
      n === !1 && typeof d.return == "function" && (yield S(d.return(new Uint8Array(0))));
    }
    return yield S(null);
  });
}
function Ws(i) {
  return Ot(this, arguments, function* () {
    let e = !1, n = !1, r = [], s, o, a, c = 0;
    function u() {
      return o === "peek" ? Nt(r, a)[0] : ([s, r, c] = Nt(r, a), s);
    }
    ({ cmd: o, size: a } = yield yield S(null));
    const d = new Ys(i);
    try {
      do
        if ({ done: e, value: s } = Number.isNaN(a - c) ? yield S(d.read()) : yield S(d.read(a - c)), !e && s.byteLength > 0 && (r.push(N(s)), c += s.byteLength), e || a <= c)
          do
            ({ cmd: o, size: a } = yield yield S(u()));
          while (a < c);
      while (!e);
    } catch (h) {
      (n = !0) && (yield S(d.cancel(h)));
    } finally {
      n === !1 ? yield S(d.cancel()) : i.locked && d.releaseLock();
    }
    return yield S(null);
  });
}
class Ys {
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
    return p(this, void 0, void 0, function* () {
      const { reader: e, source: n } = this;
      e && (yield e.cancel(t).catch(() => {
      })), n && n.locked && this.releaseLock();
    });
  }
  read(t) {
    return p(this, void 0, void 0, function* () {
      if (t === 0)
        return { done: this.reader == null, value: new Uint8Array(0) };
      const e = yield this.reader.read();
      return !e.done && (e.value = N(e)), e;
    });
  }
}
const Di = (i, t) => {
  const e = (r) => n([t, r]);
  let n;
  return [t, e, new Promise((r) => (n = r) && i.once(t, e))];
};
function Js(i) {
  return Ot(this, arguments, function* () {
    const e = [];
    let n = "error", r = !1, s = null, o, a, c = 0, u = [], d;
    function h() {
      return o === "peek" ? Nt(u, a)[0] : ([d, u, c] = Nt(u, a), d);
    }
    if ({ cmd: o, size: a } = yield yield S(null), i.isTTY)
      return yield yield S(new Uint8Array(0)), yield S(null);
    try {
      e[0] = Di(i, "end"), e[1] = Di(i, "error");
      do {
        if (e[2] = Di(i, "readable"), [n, s] = yield S(Promise.race(e.map((j) => j[2]))), n === "error")
          break;
        if ((r = n === "end") || (Number.isFinite(a - c) ? (d = N(i.read(a - c)), d.byteLength < a - c && (d = N(i.read()))) : d = N(i.read()), d.byteLength > 0 && (u.push(d), c += d.byteLength)), r || a <= c)
          do
            ({ cmd: o, size: a } = yield yield S(h()));
          while (a < c);
      } while (!r);
    } finally {
      yield S(A(e, n === "error" ? s : null));
    }
    return yield S(null);
    function A(j, nt) {
      return d = u = null, new Promise((Fi, Ds) => {
        for (const [se, Ns] of j)
          i.off(se, Ns);
        try {
          const se = i.destroy;
          se && se.call(i, nt), nt = void 0;
        } catch (se) {
          nt = se || nt;
        } finally {
          nt != null ? Ds(nt) : Fi();
        }
      });
    }
  });
}
var lt;
(function(i) {
  i[i.V1 = 0] = "V1", i[i.V2 = 1] = "V2", i[i.V3 = 2] = "V3", i[i.V4 = 3] = "V4", i[i.V5 = 4] = "V5";
})(lt || (lt = {}));
var pt;
(function(i) {
  i[i.Sparse = 0] = "Sparse", i[i.Dense = 1] = "Dense";
})(pt || (pt = {}));
var G;
(function(i) {
  i[i.HALF = 0] = "HALF", i[i.SINGLE = 1] = "SINGLE", i[i.DOUBLE = 2] = "DOUBLE";
})(G || (G = {}));
var Vt;
(function(i) {
  i[i.DAY = 0] = "DAY", i[i.MILLISECOND = 1] = "MILLISECOND";
})(Vt || (Vt = {}));
var D;
(function(i) {
  i[i.SECOND = 0] = "SECOND", i[i.MILLISECOND = 1] = "MILLISECOND", i[i.MICROSECOND = 2] = "MICROSECOND", i[i.NANOSECOND = 3] = "NANOSECOND";
})(D || (D = {}));
var Yt;
(function(i) {
  i[i.YEAR_MONTH = 0] = "YEAR_MONTH", i[i.DAY_TIME = 1] = "DAY_TIME", i[i.MONTH_DAY_NANO = 2] = "MONTH_DAY_NANO";
})(Yt || (Yt = {}));
var L;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Schema = 1] = "Schema", i[i.DictionaryBatch = 2] = "DictionaryBatch", i[i.RecordBatch = 3] = "RecordBatch", i[i.Tensor = 4] = "Tensor", i[i.SparseTensor = 5] = "SparseTensor";
})(L || (L = {}));
var l;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Null = 1] = "Null", i[i.Int = 2] = "Int", i[i.Float = 3] = "Float", i[i.Binary = 4] = "Binary", i[i.Utf8 = 5] = "Utf8", i[i.Bool = 6] = "Bool", i[i.Decimal = 7] = "Decimal", i[i.Date = 8] = "Date", i[i.Time = 9] = "Time", i[i.Timestamp = 10] = "Timestamp", i[i.Interval = 11] = "Interval", i[i.List = 12] = "List", i[i.Struct = 13] = "Struct", i[i.Union = 14] = "Union", i[i.FixedSizeBinary = 15] = "FixedSizeBinary", i[i.FixedSizeList = 16] = "FixedSizeList", i[i.Map = 17] = "Map", i[i.Dictionary = -1] = "Dictionary", i[i.Int8 = -2] = "Int8", i[i.Int16 = -3] = "Int16", i[i.Int32 = -4] = "Int32", i[i.Int64 = -5] = "Int64", i[i.Uint8 = -6] = "Uint8", i[i.Uint16 = -7] = "Uint16", i[i.Uint32 = -8] = "Uint32", i[i.Uint64 = -9] = "Uint64", i[i.Float16 = -10] = "Float16", i[i.Float32 = -11] = "Float32", i[i.Float64 = -12] = "Float64", i[i.DateDay = -13] = "DateDay", i[i.DateMillisecond = -14] = "DateMillisecond", i[i.TimestampSecond = -15] = "TimestampSecond", i[i.TimestampMillisecond = -16] = "TimestampMillisecond", i[i.TimestampMicrosecond = -17] = "TimestampMicrosecond", i[i.TimestampNanosecond = -18] = "TimestampNanosecond", i[i.TimeSecond = -19] = "TimeSecond", i[i.TimeMillisecond = -20] = "TimeMillisecond", i[i.TimeMicrosecond = -21] = "TimeMicrosecond", i[i.TimeNanosecond = -22] = "TimeNanosecond", i[i.DenseUnion = -23] = "DenseUnion", i[i.SparseUnion = -24] = "SparseUnion", i[i.IntervalDayTime = -25] = "IntervalDayTime", i[i.IntervalYearMonth = -26] = "IntervalYearMonth";
})(l || (l = {}));
var Mt;
(function(i) {
  i[i.OFFSET = 0] = "OFFSET", i[i.DATA = 1] = "DATA", i[i.VALIDITY = 2] = "VALIDITY", i[i.TYPE = 3] = "TYPE";
})(Mt || (Mt = {}));
const Hs = void 0;
function Oe(i) {
  if (i === null)
    return "null";
  if (i === Hs)
    return "undefined";
  switch (typeof i) {
    case "number":
      return `${i}`;
    case "bigint":
      return `${i}`;
    case "string":
      return `"${i}"`;
  }
  return typeof i[Symbol.toPrimitive] == "function" ? i[Symbol.toPrimitive]("string") : ArrayBuffer.isView(i) ? i instanceof Le || i instanceof Ue ? `[${[...i].map((t) => Oe(t))}]` : `[${i}]` : ArrayBuffer.isView(i) ? `[${i}]` : JSON.stringify(i, (t, e) => typeof e == "bigint" ? `${e}` : e);
}
const Ks = Symbol.for("isArrowBigNum");
function bt(i, ...t) {
  return t.length === 0 ? Object.setPrototypeOf(R(this.TypedArray, i), this.constructor.prototype) : Object.setPrototypeOf(new this.TypedArray(i, ...t), this.constructor.prototype);
}
bt.prototype[Ks] = !0;
bt.prototype.toJSON = function() {
  return `"${Ye(this)}"`;
};
bt.prototype.valueOf = function() {
  return jn(this);
};
bt.prototype.toString = function() {
  return Ye(this);
};
bt.prototype[Symbol.toPrimitive] = function(i = "default") {
  switch (i) {
    case "number":
      return jn(this);
    case "string":
      return Ye(this);
    case "default":
      return Gs(this);
  }
  return Ye(this);
};
function ue(...i) {
  return bt.apply(this, i);
}
function de(...i) {
  return bt.apply(this, i);
}
function De(...i) {
  return bt.apply(this, i);
}
Object.setPrototypeOf(ue.prototype, Object.create(Int32Array.prototype));
Object.setPrototypeOf(de.prototype, Object.create(Uint32Array.prototype));
Object.setPrototypeOf(De.prototype, Object.create(Uint32Array.prototype));
Object.assign(ue.prototype, bt.prototype, { constructor: ue, signed: !0, TypedArray: Int32Array, BigIntArray: Le });
Object.assign(de.prototype, bt.prototype, { constructor: de, signed: !1, TypedArray: Uint32Array, BigIntArray: Ue });
Object.assign(De.prototype, bt.prototype, { constructor: De, signed: !0, TypedArray: Uint32Array, BigIntArray: Ue });
function jn(i) {
  const { buffer: t, byteOffset: e, length: n, signed: r } = i, s = new Ue(t, e, n), o = r && s[s.length - 1] & BigInt(1) << BigInt(63);
  let a = BigInt(o ? 1 : 0), c = BigInt(0);
  if (o) {
    for (const u of s)
      a += ~u * (BigInt(1) << BigInt(32) * c++);
    a *= BigInt(-1);
  } else
    for (const u of s)
      a += u * (BigInt(1) << BigInt(32) * c++);
  return a;
}
const Ye = (i) => i.byteLength === 8 ? `${new i.BigIntArray(i.buffer, i.byteOffset, 1)[0]}` : Pn(i), Gs = (i) => i.byteLength === 8 ? new i.BigIntArray(i.buffer, i.byteOffset, 1)[0] : Pn(i);
function Pn(i) {
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
  return t != null ? t : "0";
}
class Hi {
  static new(t, e) {
    switch (e) {
      case !0:
        return new ue(t);
      case !1:
        return new de(t);
    }
    switch (t.constructor) {
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case Le:
        return new ue(t);
    }
    return t.byteLength === 16 ? new De(t) : new de(t);
  }
  static signed(t) {
    return new ue(t);
  }
  static unsigned(t) {
    return new de(t);
  }
  static decimal(t) {
    return new De(t);
  }
  constructor(t, e) {
    return Hi.new(t, e);
  }
}
function yt(i) {
  if (typeof i == "bigint" && (i < Number.MIN_SAFE_INTEGER || i > Number.MAX_SAFE_INTEGER))
    throw new TypeError(`${i} is not safe to convert to a number.`);
  return Number(i);
}
var $n, Wn, Yn, Jn, Hn, Kn, Gn, Zn, qn, Xn, Qn, tr, er, ir, nr, rr, sr, or, ar;
class f {
  static isNull(t) {
    return (t == null ? void 0 : t.typeId) === l.Null;
  }
  static isInt(t) {
    return (t == null ? void 0 : t.typeId) === l.Int;
  }
  static isFloat(t) {
    return (t == null ? void 0 : t.typeId) === l.Float;
  }
  static isBinary(t) {
    return (t == null ? void 0 : t.typeId) === l.Binary;
  }
  static isUtf8(t) {
    return (t == null ? void 0 : t.typeId) === l.Utf8;
  }
  static isBool(t) {
    return (t == null ? void 0 : t.typeId) === l.Bool;
  }
  static isDecimal(t) {
    return (t == null ? void 0 : t.typeId) === l.Decimal;
  }
  static isDate(t) {
    return (t == null ? void 0 : t.typeId) === l.Date;
  }
  static isTime(t) {
    return (t == null ? void 0 : t.typeId) === l.Time;
  }
  static isTimestamp(t) {
    return (t == null ? void 0 : t.typeId) === l.Timestamp;
  }
  static isInterval(t) {
    return (t == null ? void 0 : t.typeId) === l.Interval;
  }
  static isList(t) {
    return (t == null ? void 0 : t.typeId) === l.List;
  }
  static isStruct(t) {
    return (t == null ? void 0 : t.typeId) === l.Struct;
  }
  static isUnion(t) {
    return (t == null ? void 0 : t.typeId) === l.Union;
  }
  static isFixedSizeBinary(t) {
    return (t == null ? void 0 : t.typeId) === l.FixedSizeBinary;
  }
  static isFixedSizeList(t) {
    return (t == null ? void 0 : t.typeId) === l.FixedSizeList;
  }
  static isMap(t) {
    return (t == null ? void 0 : t.typeId) === l.Map;
  }
  static isDictionary(t) {
    return (t == null ? void 0 : t.typeId) === l.Dictionary;
  }
  static isDenseUnion(t) {
    return f.isUnion(t) && t.mode === pt.Dense;
  }
  static isSparseUnion(t) {
    return f.isUnion(t) && t.mode === pt.Sparse;
  }
  get typeId() {
    return l.NONE;
  }
}
$n = Symbol.toStringTag;
f[$n] = ((i) => (i.children = null, i.ArrayType = Array, i[Symbol.toStringTag] = "DataType"))(f.prototype);
class Jt extends f {
  toString() {
    return "Null";
  }
  get typeId() {
    return l.Null;
  }
}
Wn = Symbol.toStringTag;
Jt[Wn] = ((i) => i[Symbol.toStringTag] = "Null")(Jt.prototype);
class Ht extends f {
  constructor(t, e) {
    super(), this.isSigned = t, this.bitWidth = e;
  }
  get typeId() {
    return l.Int;
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
        return this.isSigned ? Le : Ue;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `${this.isSigned ? "I" : "Ui"}nt${this.bitWidth}`;
  }
}
Yn = Symbol.toStringTag;
Ht[Yn] = ((i) => (i.isSigned = null, i.bitWidth = null, i[Symbol.toStringTag] = "Int"))(Ht.prototype);
class Ne extends Ht {
  constructor() {
    super(!0, 32);
  }
  get ArrayType() {
    return Int32Array;
  }
}
Object.defineProperty(Ne.prototype, "ArrayType", { value: Int32Array });
class Te extends f {
  constructor(t) {
    super(), this.precision = t;
  }
  get typeId() {
    return l.Float;
  }
  get ArrayType() {
    switch (this.precision) {
      case G.HALF:
        return Uint16Array;
      case G.SINGLE:
        return Float32Array;
      case G.DOUBLE:
        return Float64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `Float${this.precision << 5 || 16}`;
  }
}
Jn = Symbol.toStringTag;
Te[Jn] = ((i) => (i.precision = null, i[Symbol.toStringTag] = "Float"))(Te.prototype);
class Je extends f {
  constructor() {
    super();
  }
  get typeId() {
    return l.Binary;
  }
  toString() {
    return "Binary";
  }
}
Hn = Symbol.toStringTag;
Je[Hn] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Binary"))(Je.prototype);
class He extends f {
  constructor() {
    super();
  }
  get typeId() {
    return l.Utf8;
  }
  toString() {
    return "Utf8";
  }
}
Kn = Symbol.toStringTag;
He[Kn] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Utf8"))(He.prototype);
class Ke extends f {
  constructor() {
    super();
  }
  get typeId() {
    return l.Bool;
  }
  toString() {
    return "Bool";
  }
}
Gn = Symbol.toStringTag;
Ke[Gn] = ((i) => (i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "Bool"))(Ke.prototype);
class Ge extends f {
  constructor(t, e, n = 128) {
    super(), this.scale = t, this.precision = e, this.bitWidth = n;
  }
  get typeId() {
    return l.Decimal;
  }
  toString() {
    return `Decimal[${this.precision}e${this.scale > 0 ? "+" : ""}${this.scale}]`;
  }
}
Zn = Symbol.toStringTag;
Ge[Zn] = ((i) => (i.scale = null, i.precision = null, i.ArrayType = Uint32Array, i[Symbol.toStringTag] = "Decimal"))(Ge.prototype);
class Ze extends f {
  constructor(t) {
    super(), this.unit = t;
  }
  get typeId() {
    return l.Date;
  }
  toString() {
    return `Date${(this.unit + 1) * 32}<${Vt[this.unit]}>`;
  }
}
qn = Symbol.toStringTag;
Ze[qn] = ((i) => (i.unit = null, i.ArrayType = Int32Array, i[Symbol.toStringTag] = "Date"))(Ze.prototype);
class Me extends f {
  constructor(t, e) {
    super(), this.unit = t, this.bitWidth = e;
  }
  get typeId() {
    return l.Time;
  }
  toString() {
    return `Time${this.bitWidth}<${D[this.unit]}>`;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 32:
        return Int32Array;
      case 64:
        return Le;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
}
Xn = Symbol.toStringTag;
Me[Xn] = ((i) => (i.unit = null, i.bitWidth = null, i[Symbol.toStringTag] = "Time"))(Me.prototype);
class qe extends f {
  constructor(t, e) {
    super(), this.unit = t, this.timezone = e;
  }
  get typeId() {
    return l.Timestamp;
  }
  toString() {
    return `Timestamp<${D[this.unit]}${this.timezone ? `, ${this.timezone}` : ""}>`;
  }
}
Qn = Symbol.toStringTag;
qe[Qn] = ((i) => (i.unit = null, i.timezone = null, i.ArrayType = Int32Array, i[Symbol.toStringTag] = "Timestamp"))(qe.prototype);
class Xe extends f {
  constructor(t) {
    super(), this.unit = t;
  }
  get typeId() {
    return l.Interval;
  }
  toString() {
    return `Interval<${Yt[this.unit]}>`;
  }
}
tr = Symbol.toStringTag;
Xe[tr] = ((i) => (i.unit = null, i.ArrayType = Int32Array, i[Symbol.toStringTag] = "Interval"))(Xe.prototype);
class Qe extends f {
  constructor(t) {
    super(), this.children = [t];
  }
  get typeId() {
    return l.List;
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
er = Symbol.toStringTag;
Qe[er] = ((i) => (i.children = null, i[Symbol.toStringTag] = "List"))(Qe.prototype);
class K extends f {
  constructor(t) {
    super(), this.children = t;
  }
  get typeId() {
    return l.Struct;
  }
  toString() {
    return `Struct<{${this.children.map((t) => `${t.name}:${t.type}`).join(", ")}}>`;
  }
}
ir = Symbol.toStringTag;
K[ir] = ((i) => (i.children = null, i[Symbol.toStringTag] = "Struct"))(K.prototype);
class ti extends f {
  constructor(t, e, n) {
    super(), this.mode = t, this.children = n, this.typeIds = e = Int32Array.from(e), this.typeIdToChildIndex = e.reduce((r, s, o) => (r[s] = o) && r || r, /* @__PURE__ */ Object.create(null));
  }
  get typeId() {
    return l.Union;
  }
  toString() {
    return `${this[Symbol.toStringTag]}<${this.children.map((t) => `${t.type}`).join(" | ")}>`;
  }
}
nr = Symbol.toStringTag;
ti[nr] = ((i) => (i.mode = null, i.typeIds = null, i.children = null, i.typeIdToChildIndex = null, i.ArrayType = Int8Array, i[Symbol.toStringTag] = "Union"))(ti.prototype);
class ei extends f {
  constructor(t) {
    super(), this.byteWidth = t;
  }
  get typeId() {
    return l.FixedSizeBinary;
  }
  toString() {
    return `FixedSizeBinary[${this.byteWidth}]`;
  }
}
rr = Symbol.toStringTag;
ei[rr] = ((i) => (i.byteWidth = null, i.ArrayType = Uint8Array, i[Symbol.toStringTag] = "FixedSizeBinary"))(ei.prototype);
class ii extends f {
  constructor(t, e) {
    super(), this.listSize = t, this.children = [e];
  }
  get typeId() {
    return l.FixedSizeList;
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
sr = Symbol.toStringTag;
ii[sr] = ((i) => (i.children = null, i.listSize = null, i[Symbol.toStringTag] = "FixedSizeList"))(ii.prototype);
class ni extends f {
  constructor(t, e = !1) {
    super(), this.children = [t], this.keysSorted = e;
  }
  get typeId() {
    return l.Map;
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
or = Symbol.toStringTag;
ni[or] = ((i) => (i.children = null, i.keysSorted = null, i[Symbol.toStringTag] = "Map_"))(ni.prototype);
const Zs = ((i) => () => ++i)(-1);
class ye extends f {
  constructor(t, e, n, r) {
    super(), this.indices = e, this.dictionary = t, this.isOrdered = r || !1, this.id = n == null ? Zs() : yt(n);
  }
  get typeId() {
    return l.Dictionary;
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
ar = Symbol.toStringTag;
ye[ar] = ((i) => (i.id = null, i.indices = null, i.isOrdered = null, i.dictionary = null, i[Symbol.toStringTag] = "Dictionary"))(ye.prototype);
function Lt(i) {
  const t = i;
  switch (i.typeId) {
    case l.Decimal:
      return i.bitWidth / 32;
    case l.Timestamp:
      return 2;
    case l.Date:
      return 1 + t.unit;
    case l.Interval:
      return 1 + t.unit;
    case l.FixedSizeList:
      return t.listSize;
    case l.FixedSizeBinary:
      return t.byteWidth;
    default:
      return 1;
  }
}
class O {
  visitMany(t, ...e) {
    return t.map((n, r) => this.visit(n, ...e.map((s) => s[r])));
  }
  visit(...t) {
    return this.getVisitFn(t[0], !1).apply(this, t);
  }
  getVisitFn(t, e = !0) {
    return qs(this, t, e);
  }
  getVisitFnByTypeId(t, e = !0) {
    return ae(this, t, e);
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
  visitBinary(t, ...e) {
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
  visitFixedSizeList(t, ...e) {
    return null;
  }
  visitMap(t, ...e) {
    return null;
  }
}
function qs(i, t, e = !0) {
  return typeof t == "number" ? ae(i, t, e) : typeof t == "string" && t in l ? ae(i, l[t], e) : t && t instanceof f ? ae(i, pn(t), e) : (t == null ? void 0 : t.type) && t.type instanceof f ? ae(i, pn(t.type), e) : ae(i, l.NONE, e);
}
function ae(i, t, e = !0) {
  let n = null;
  switch (t) {
    case l.Null:
      n = i.visitNull;
      break;
    case l.Bool:
      n = i.visitBool;
      break;
    case l.Int:
      n = i.visitInt;
      break;
    case l.Int8:
      n = i.visitInt8 || i.visitInt;
      break;
    case l.Int16:
      n = i.visitInt16 || i.visitInt;
      break;
    case l.Int32:
      n = i.visitInt32 || i.visitInt;
      break;
    case l.Int64:
      n = i.visitInt64 || i.visitInt;
      break;
    case l.Uint8:
      n = i.visitUint8 || i.visitInt;
      break;
    case l.Uint16:
      n = i.visitUint16 || i.visitInt;
      break;
    case l.Uint32:
      n = i.visitUint32 || i.visitInt;
      break;
    case l.Uint64:
      n = i.visitUint64 || i.visitInt;
      break;
    case l.Float:
      n = i.visitFloat;
      break;
    case l.Float16:
      n = i.visitFloat16 || i.visitFloat;
      break;
    case l.Float32:
      n = i.visitFloat32 || i.visitFloat;
      break;
    case l.Float64:
      n = i.visitFloat64 || i.visitFloat;
      break;
    case l.Utf8:
      n = i.visitUtf8;
      break;
    case l.Binary:
      n = i.visitBinary;
      break;
    case l.FixedSizeBinary:
      n = i.visitFixedSizeBinary;
      break;
    case l.Date:
      n = i.visitDate;
      break;
    case l.DateDay:
      n = i.visitDateDay || i.visitDate;
      break;
    case l.DateMillisecond:
      n = i.visitDateMillisecond || i.visitDate;
      break;
    case l.Timestamp:
      n = i.visitTimestamp;
      break;
    case l.TimestampSecond:
      n = i.visitTimestampSecond || i.visitTimestamp;
      break;
    case l.TimestampMillisecond:
      n = i.visitTimestampMillisecond || i.visitTimestamp;
      break;
    case l.TimestampMicrosecond:
      n = i.visitTimestampMicrosecond || i.visitTimestamp;
      break;
    case l.TimestampNanosecond:
      n = i.visitTimestampNanosecond || i.visitTimestamp;
      break;
    case l.Time:
      n = i.visitTime;
      break;
    case l.TimeSecond:
      n = i.visitTimeSecond || i.visitTime;
      break;
    case l.TimeMillisecond:
      n = i.visitTimeMillisecond || i.visitTime;
      break;
    case l.TimeMicrosecond:
      n = i.visitTimeMicrosecond || i.visitTime;
      break;
    case l.TimeNanosecond:
      n = i.visitTimeNanosecond || i.visitTime;
      break;
    case l.Decimal:
      n = i.visitDecimal;
      break;
    case l.List:
      n = i.visitList;
      break;
    case l.Struct:
      n = i.visitStruct;
      break;
    case l.Union:
      n = i.visitUnion;
      break;
    case l.DenseUnion:
      n = i.visitDenseUnion || i.visitUnion;
      break;
    case l.SparseUnion:
      n = i.visitSparseUnion || i.visitUnion;
      break;
    case l.Dictionary:
      n = i.visitDictionary;
      break;
    case l.Interval:
      n = i.visitInterval;
      break;
    case l.IntervalDayTime:
      n = i.visitIntervalDayTime || i.visitInterval;
      break;
    case l.IntervalYearMonth:
      n = i.visitIntervalYearMonth || i.visitInterval;
      break;
    case l.FixedSizeList:
      n = i.visitFixedSizeList;
      break;
    case l.Map:
      n = i.visitMap;
      break;
  }
  if (typeof n == "function")
    return n;
  if (!e)
    return () => null;
  throw new Error(`Unrecognized type '${l[t]}'`);
}
function pn(i) {
  switch (i.typeId) {
    case l.Null:
      return l.Null;
    case l.Int: {
      const { bitWidth: t, isSigned: e } = i;
      switch (t) {
        case 8:
          return e ? l.Int8 : l.Uint8;
        case 16:
          return e ? l.Int16 : l.Uint16;
        case 32:
          return e ? l.Int32 : l.Uint32;
        case 64:
          return e ? l.Int64 : l.Uint64;
      }
      return l.Int;
    }
    case l.Float:
      switch (i.precision) {
        case G.HALF:
          return l.Float16;
        case G.SINGLE:
          return l.Float32;
        case G.DOUBLE:
          return l.Float64;
      }
      return l.Float;
    case l.Binary:
      return l.Binary;
    case l.Utf8:
      return l.Utf8;
    case l.Bool:
      return l.Bool;
    case l.Decimal:
      return l.Decimal;
    case l.Time:
      switch (i.unit) {
        case D.SECOND:
          return l.TimeSecond;
        case D.MILLISECOND:
          return l.TimeMillisecond;
        case D.MICROSECOND:
          return l.TimeMicrosecond;
        case D.NANOSECOND:
          return l.TimeNanosecond;
      }
      return l.Time;
    case l.Timestamp:
      switch (i.unit) {
        case D.SECOND:
          return l.TimestampSecond;
        case D.MILLISECOND:
          return l.TimestampMillisecond;
        case D.MICROSECOND:
          return l.TimestampMicrosecond;
        case D.NANOSECOND:
          return l.TimestampNanosecond;
      }
      return l.Timestamp;
    case l.Date:
      switch (i.unit) {
        case Vt.DAY:
          return l.DateDay;
        case Vt.MILLISECOND:
          return l.DateMillisecond;
      }
      return l.Date;
    case l.Interval:
      switch (i.unit) {
        case Yt.DAY_TIME:
          return l.IntervalDayTime;
        case Yt.YEAR_MONTH:
          return l.IntervalYearMonth;
      }
      return l.Interval;
    case l.Map:
      return l.Map;
    case l.List:
      return l.List;
    case l.Struct:
      return l.Struct;
    case l.Union:
      switch (i.mode) {
        case pt.Dense:
          return l.DenseUnion;
        case pt.Sparse:
          return l.SparseUnion;
      }
      return l.Union;
    case l.FixedSizeBinary:
      return l.FixedSizeBinary;
    case l.FixedSizeList:
      return l.FixedSizeList;
    case l.Dictionary:
      return l.Dictionary;
  }
  throw new Error(`Unrecognized type '${l[i.typeId]}'`);
}
O.prototype.visitInt8 = null;
O.prototype.visitInt16 = null;
O.prototype.visitInt32 = null;
O.prototype.visitInt64 = null;
O.prototype.visitUint8 = null;
O.prototype.visitUint16 = null;
O.prototype.visitUint32 = null;
O.prototype.visitUint64 = null;
O.prototype.visitFloat16 = null;
O.prototype.visitFloat32 = null;
O.prototype.visitFloat64 = null;
O.prototype.visitDateDay = null;
O.prototype.visitDateMillisecond = null;
O.prototype.visitTimestampSecond = null;
O.prototype.visitTimestampMillisecond = null;
O.prototype.visitTimestampMicrosecond = null;
O.prototype.visitTimestampNanosecond = null;
O.prototype.visitTimeSecond = null;
O.prototype.visitTimeMillisecond = null;
O.prototype.visitTimeMicrosecond = null;
O.prototype.visitTimeNanosecond = null;
O.prototype.visitDenseUnion = null;
O.prototype.visitSparseUnion = null;
O.prototype.visitIntervalDayTime = null;
O.prototype.visitIntervalYearMonth = null;
const cr = new Float64Array(1), oe = new Uint32Array(cr.buffer);
function lr(i) {
  const t = (i & 31744) >> 10, e = (i & 1023) / 1024, n = Math.pow(-1, (i & 32768) >> 15);
  switch (t) {
    case 31:
      return n * (e ? Number.NaN : 1 / 0);
    case 0:
      return n * (e ? 6103515625e-14 * e : 0);
  }
  return n * Math.pow(2, t - 15) * (1 + e);
}
function Xs(i) {
  if (i !== i)
    return 32256;
  cr[0] = i;
  const t = (oe[1] & 2147483648) >> 16 & 65535;
  let e = oe[1] & 2146435072, n = 0;
  return e >= 1089470464 ? oe[0] > 0 ? e = 31744 : (e = (e & 2080374784) >> 16, n = (oe[1] & 1048575) >> 10) : e <= 1056964608 ? (n = 1048576 + (oe[1] & 1048575), n = 1048576 + (n << (e >> 20) - 998) >> 21, e = 0) : (e = e - 1056964608 >> 10, n = (oe[1] & 1048575) + 512 >> 10), t | e | n & 65535;
}
class _ extends O {
}
function I(i) {
  return (t, e, n) => {
    if (t.setValid(e, n != null))
      return i(t, e, n);
  };
}
const Qs = (i, t, e) => {
  i[t] = Math.trunc(e / 864e5);
}, Ki = (i, t, e) => {
  i[t] = Math.trunc(e % 4294967296), i[t + 1] = Math.trunc(e / 4294967296);
}, to = (i, t, e) => {
  i[t] = Math.trunc(e * 1e3 % 4294967296), i[t + 1] = Math.trunc(e * 1e3 / 4294967296);
}, eo = (i, t, e) => {
  i[t] = Math.trunc(e * 1e6 % 4294967296), i[t + 1] = Math.trunc(e * 1e6 / 4294967296);
}, ur = (i, t, e, n) => {
  if (e + 1 < t.length) {
    const { [e]: r, [e + 1]: s } = t;
    i.set(n.subarray(0, s - r), r);
  }
}, io = ({ offset: i, values: t }, e, n) => {
  const r = i + e;
  n ? t[r >> 3] |= 1 << r % 8 : t[r >> 3] &= ~(1 << r % 8);
}, kt = ({ values: i }, t, e) => {
  i[t] = e;
}, Gi = ({ values: i }, t, e) => {
  i[t] = e;
}, dr = ({ values: i }, t, e) => {
  i[t] = Xs(e);
}, no = (i, t, e) => {
  switch (i.type.precision) {
    case G.HALF:
      return dr(i, t, e);
    case G.SINGLE:
    case G.DOUBLE:
      return Gi(i, t, e);
  }
}, hr = ({ values: i }, t, e) => {
  Qs(i, t, e.valueOf());
}, fr = ({ values: i }, t, e) => {
  Ki(i, t * 2, e.valueOf());
}, ro = ({ stride: i, values: t }, e, n) => {
  t.set(n.subarray(0, i), i * e);
}, so = ({ values: i, valueOffsets: t }, e, n) => ur(i, t, e, n), oo = ({ values: i, valueOffsets: t }, e, n) => {
  ur(i, t, e, $i(n));
}, ao = (i, t, e) => {
  i.type.unit === Vt.DAY ? hr(i, t, e) : fr(i, t, e);
}, pr = ({ values: i }, t, e) => Ki(i, t * 2, e / 1e3), yr = ({ values: i }, t, e) => Ki(i, t * 2, e), mr = ({ values: i }, t, e) => to(i, t * 2, e), br = ({ values: i }, t, e) => eo(i, t * 2, e), co = (i, t, e) => {
  switch (i.type.unit) {
    case D.SECOND:
      return pr(i, t, e);
    case D.MILLISECOND:
      return yr(i, t, e);
    case D.MICROSECOND:
      return mr(i, t, e);
    case D.NANOSECOND:
      return br(i, t, e);
  }
}, gr = ({ values: i }, t, e) => {
  i[t] = e;
}, _r = ({ values: i }, t, e) => {
  i[t] = e;
}, vr = ({ values: i }, t, e) => {
  i[t] = e;
}, wr = ({ values: i }, t, e) => {
  i[t] = e;
}, lo = (i, t, e) => {
  switch (i.type.unit) {
    case D.SECOND:
      return gr(i, t, e);
    case D.MILLISECOND:
      return _r(i, t, e);
    case D.MICROSECOND:
      return vr(i, t, e);
    case D.NANOSECOND:
      return wr(i, t, e);
  }
}, uo = ({ values: i, stride: t }, e, n) => {
  i.set(n.subarray(0, t), t * e);
}, ho = (i, t, e) => {
  const n = i.children[0], r = i.valueOffsets, s = ut.getVisitFn(n);
  if (Array.isArray(e))
    for (let o = -1, a = r[t], c = r[t + 1]; a < c; )
      s(n, a++, e[++o]);
  else
    for (let o = -1, a = r[t], c = r[t + 1]; a < c; )
      s(n, a++, e.get(++o));
}, fo = (i, t, e) => {
  const n = i.children[0], { valueOffsets: r } = i, s = ut.getVisitFn(n);
  let { [t]: o, [t + 1]: a } = r;
  const c = e instanceof Map ? e.entries() : Object.entries(e);
  for (const u of c)
    if (s(n, o, u), ++o >= a)
      break;
}, po = (i, t) => (e, n, r, s) => n && e(n, i, t[s]), yo = (i, t) => (e, n, r, s) => n && e(n, i, t.get(s)), mo = (i, t) => (e, n, r, s) => n && e(n, i, t.get(r.name)), bo = (i, t) => (e, n, r, s) => n && e(n, i, t[r.name]), go = (i, t, e) => {
  const n = i.type.children.map((s) => ut.getVisitFn(s.type)), r = e instanceof Map ? mo(t, e) : e instanceof U ? yo(t, e) : Array.isArray(e) ? po(t, e) : bo(t, e);
  i.type.children.forEach((s, o) => r(n[o], i.children[o], s, o));
}, _o = (i, t, e) => {
  i.type.mode === pt.Dense ? Ir(i, t, e) : Sr(i, t, e);
}, Ir = (i, t, e) => {
  const n = i.type.typeIdToChildIndex[i.typeIds[t]], r = i.children[n];
  ut.visit(r, i.valueOffsets[t], e);
}, Sr = (i, t, e) => {
  const n = i.type.typeIdToChildIndex[i.typeIds[t]], r = i.children[n];
  ut.visit(r, t, e);
}, vo = (i, t, e) => {
  var n;
  (n = i.dictionary) === null || n === void 0 || n.set(i.values[t], e);
}, wo = (i, t, e) => {
  i.type.unit === Yt.DAY_TIME ? Br(i, t, e) : Ar(i, t, e);
}, Br = ({ values: i }, t, e) => {
  i.set(e.subarray(0, 2), 2 * t);
}, Ar = ({ values: i }, t, e) => {
  i[t] = e[0] * 12 + e[1] % 12;
}, Io = (i, t, e) => {
  const { stride: n } = i, r = i.children[0], s = ut.getVisitFn(r);
  if (Array.isArray(e))
    for (let o = -1, a = t * n; ++o < n; )
      s(r, a + o, e[o]);
  else
    for (let o = -1, a = t * n; ++o < n; )
      s(r, a + o, e.get(o));
};
_.prototype.visitBool = I(io);
_.prototype.visitInt = I(kt);
_.prototype.visitInt8 = I(kt);
_.prototype.visitInt16 = I(kt);
_.prototype.visitInt32 = I(kt);
_.prototype.visitInt64 = I(kt);
_.prototype.visitUint8 = I(kt);
_.prototype.visitUint16 = I(kt);
_.prototype.visitUint32 = I(kt);
_.prototype.visitUint64 = I(kt);
_.prototype.visitFloat = I(no);
_.prototype.visitFloat16 = I(dr);
_.prototype.visitFloat32 = I(Gi);
_.prototype.visitFloat64 = I(Gi);
_.prototype.visitUtf8 = I(oo);
_.prototype.visitBinary = I(so);
_.prototype.visitFixedSizeBinary = I(ro);
_.prototype.visitDate = I(ao);
_.prototype.visitDateDay = I(hr);
_.prototype.visitDateMillisecond = I(fr);
_.prototype.visitTimestamp = I(co);
_.prototype.visitTimestampSecond = I(pr);
_.prototype.visitTimestampMillisecond = I(yr);
_.prototype.visitTimestampMicrosecond = I(mr);
_.prototype.visitTimestampNanosecond = I(br);
_.prototype.visitTime = I(lo);
_.prototype.visitTimeSecond = I(gr);
_.prototype.visitTimeMillisecond = I(_r);
_.prototype.visitTimeMicrosecond = I(vr);
_.prototype.visitTimeNanosecond = I(wr);
_.prototype.visitDecimal = I(uo);
_.prototype.visitList = I(ho);
_.prototype.visitStruct = I(go);
_.prototype.visitUnion = I(_o);
_.prototype.visitDenseUnion = I(Ir);
_.prototype.visitSparseUnion = I(Sr);
_.prototype.visitDictionary = I(vo);
_.prototype.visitInterval = I(wo);
_.prototype.visitIntervalDayTime = I(Br);
_.prototype.visitIntervalYearMonth = I(Ar);
_.prototype.visitFixedSizeList = I(Io);
_.prototype.visitMap = I(fo);
const ut = new _(), dt = Symbol.for("parent"), he = Symbol.for("rowIndex");
class Zi {
  constructor(t, e) {
    return this[dt] = t, this[he] = e, new Proxy(this, new Bo());
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const t = this[he], e = this[dt], n = e.type.children, r = {};
    for (let s = -1, o = n.length; ++s < o; )
      r[n[s].name] = Q.visit(e.children[s], t);
    return r;
  }
  toString() {
    return `{${[...this].map(([t, e]) => `${Oe(t)}: ${Oe(e)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
  [Symbol.iterator]() {
    return new So(this[dt], this[he]);
  }
}
class So {
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
Object.defineProperties(Zi.prototype, {
  [Symbol.toStringTag]: { enumerable: !1, configurable: !1, value: "Row" },
  [dt]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [he]: { writable: !0, enumerable: !1, configurable: !1, value: -1 }
});
class Bo {
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
    return t[dt].type.children.map((e) => e.name);
  }
  has(t, e) {
    return t[dt].type.children.findIndex((n) => n.name === e) !== -1;
  }
  getOwnPropertyDescriptor(t, e) {
    if (t[dt].type.children.findIndex((n) => n.name === e) !== -1)
      return { writable: !0, enumerable: !0, configurable: !0 };
  }
  get(t, e) {
    if (Reflect.has(t, e))
      return t[e];
    const n = t[dt].type.children.findIndex((r) => r.name === e);
    if (n !== -1) {
      const r = Q.visit(t[dt].children[n], t[he]);
      return Reflect.set(t, e, r), r;
    }
  }
  set(t, e, n) {
    const r = t[dt].type.children.findIndex((s) => s.name === e);
    return r !== -1 ? (ut.visit(t[dt].children[r], t[he], n), Reflect.set(t, e, n)) : Reflect.has(t, e) || typeof e == "symbol" ? Reflect.set(t, e, n) : !1;
  }
}
class y extends O {
}
function v(i) {
  return (t, e) => t.getValid(e) ? i(t, e) : null;
}
const Ao = (i, t) => 864e5 * i[t], qi = (i, t) => 4294967296 * i[t + 1] + (i[t] >>> 0), Fo = (i, t) => 4294967296 * (i[t + 1] / 1e3) + (i[t] >>> 0) / 1e3, Oo = (i, t) => 4294967296 * (i[t + 1] / 1e6) + (i[t] >>> 0) / 1e6, Fr = (i) => new Date(i), Do = (i, t) => Fr(Ao(i, t)), No = (i, t) => Fr(qi(i, t)), To = (i, t) => null, Or = (i, t, e) => {
  if (e + 1 >= t.length)
    return null;
  const n = t[e], r = t[e + 1];
  return i.subarray(n, r);
}, Mo = ({ offset: i, values: t }, e) => {
  const n = i + e;
  return (t[n >> 3] & 1 << n % 8) !== 0;
}, Dr = ({ values: i }, t) => Do(i, t), Nr = ({ values: i }, t) => No(i, t * 2), Zt = ({ stride: i, values: t }, e) => t[i * e], Lo = ({ stride: i, values: t }, e) => lr(t[i * e]), Tr = ({ values: i }, t) => i[t], Uo = ({ stride: i, values: t }, e) => t.subarray(i * e, i * (e + 1)), Ro = ({ values: i, valueOffsets: t }, e) => Or(i, t, e), xo = ({ values: i, valueOffsets: t }, e) => {
  const n = Or(i, t, e);
  return n !== null ? Ri(n) : null;
}, Eo = ({ values: i }, t) => i[t], Co = ({ type: i, values: t }, e) => i.precision !== G.HALF ? t[e] : lr(t[e]), Vo = (i, t) => i.type.unit === Vt.DAY ? Dr(i, t) : Nr(i, t), Mr = ({ values: i }, t) => 1e3 * qi(i, t * 2), Lr = ({ values: i }, t) => qi(i, t * 2), Ur = ({ values: i }, t) => Fo(i, t * 2), Rr = ({ values: i }, t) => Oo(i, t * 2), zo = (i, t) => {
  switch (i.type.unit) {
    case D.SECOND:
      return Mr(i, t);
    case D.MILLISECOND:
      return Lr(i, t);
    case D.MICROSECOND:
      return Ur(i, t);
    case D.NANOSECOND:
      return Rr(i, t);
  }
}, xr = ({ values: i }, t) => i[t], Er = ({ values: i }, t) => i[t], Cr = ({ values: i }, t) => i[t], Vr = ({ values: i }, t) => i[t], ko = (i, t) => {
  switch (i.type.unit) {
    case D.SECOND:
      return xr(i, t);
    case D.MILLISECOND:
      return Er(i, t);
    case D.MICROSECOND:
      return Cr(i, t);
    case D.NANOSECOND:
      return Vr(i, t);
  }
}, jo = ({ values: i, stride: t }, e) => Hi.decimal(i.subarray(t * e, t * (e + 1))), Po = (i, t) => {
  const { valueOffsets: e, stride: n, children: r } = i, { [t * n]: s, [t * n + 1]: o } = e, c = r[0].slice(s, o - s);
  return new U([c]);
}, $o = (i, t) => {
  const { valueOffsets: e, children: n } = i, { [t]: r, [t + 1]: s } = e, o = n[0];
  return new Xi(o.slice(r, s - r));
}, Wo = (i, t) => new Zi(i, t), Yo = (i, t) => i.type.mode === pt.Dense ? zr(i, t) : kr(i, t), zr = (i, t) => {
  const e = i.type.typeIdToChildIndex[i.typeIds[t]], n = i.children[e];
  return Q.visit(n, i.valueOffsets[t]);
}, kr = (i, t) => {
  const e = i.type.typeIdToChildIndex[i.typeIds[t]], n = i.children[e];
  return Q.visit(n, t);
}, Jo = (i, t) => {
  var e;
  return (e = i.dictionary) === null || e === void 0 ? void 0 : e.get(i.values[t]);
}, Ho = (i, t) => i.type.unit === Yt.DAY_TIME ? jr(i, t) : Pr(i, t), jr = ({ values: i }, t) => i.subarray(2 * t, 2 * (t + 1)), Pr = ({ values: i }, t) => {
  const e = i[t], n = new Int32Array(2);
  return n[0] = Math.trunc(e / 12), n[1] = Math.trunc(e % 12), n;
}, Ko = (i, t) => {
  const { stride: e, children: n } = i, s = n[0].slice(t * e, e);
  return new U([s]);
};
y.prototype.visitNull = v(To);
y.prototype.visitBool = v(Mo);
y.prototype.visitInt = v(Eo);
y.prototype.visitInt8 = v(Zt);
y.prototype.visitInt16 = v(Zt);
y.prototype.visitInt32 = v(Zt);
y.prototype.visitInt64 = v(Tr);
y.prototype.visitUint8 = v(Zt);
y.prototype.visitUint16 = v(Zt);
y.prototype.visitUint32 = v(Zt);
y.prototype.visitUint64 = v(Tr);
y.prototype.visitFloat = v(Co);
y.prototype.visitFloat16 = v(Lo);
y.prototype.visitFloat32 = v(Zt);
y.prototype.visitFloat64 = v(Zt);
y.prototype.visitUtf8 = v(xo);
y.prototype.visitBinary = v(Ro);
y.prototype.visitFixedSizeBinary = v(Uo);
y.prototype.visitDate = v(Vo);
y.prototype.visitDateDay = v(Dr);
y.prototype.visitDateMillisecond = v(Nr);
y.prototype.visitTimestamp = v(zo);
y.prototype.visitTimestampSecond = v(Mr);
y.prototype.visitTimestampMillisecond = v(Lr);
y.prototype.visitTimestampMicrosecond = v(Ur);
y.prototype.visitTimestampNanosecond = v(Rr);
y.prototype.visitTime = v(ko);
y.prototype.visitTimeSecond = v(xr);
y.prototype.visitTimeMillisecond = v(Er);
y.prototype.visitTimeMicrosecond = v(Cr);
y.prototype.visitTimeNanosecond = v(Vr);
y.prototype.visitDecimal = v(jo);
y.prototype.visitList = v(Po);
y.prototype.visitStruct = v(Wo);
y.prototype.visitUnion = v(Yo);
y.prototype.visitDenseUnion = v(zr);
y.prototype.visitSparseUnion = v(kr);
y.prototype.visitDictionary = v(Jo);
y.prototype.visitInterval = v(Ho);
y.prototype.visitIntervalDayTime = v(jr);
y.prototype.visitIntervalYearMonth = v(Pr);
y.prototype.visitFixedSizeList = v(Ko);
y.prototype.visitMap = v($o);
const Q = new y(), _t = Symbol.for("keys"), fe = Symbol.for("vals");
class Xi {
  constructor(t) {
    return this[_t] = new U([t.children[0]]).memoize(), this[fe] = t.children[1], new Proxy(this, new Zo());
  }
  [Symbol.iterator]() {
    return new Go(this[_t], this[fe]);
  }
  get size() {
    return this[_t].length;
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const t = this[_t], e = this[fe], n = {};
    for (let r = -1, s = t.length; ++r < s; )
      n[t.get(r)] = Q.visit(e, r);
    return n;
  }
  toString() {
    return `{${[...this].map(([t, e]) => `${Oe(t)}: ${Oe(e)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}
class Go {
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
class Zo {
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
    return t[_t].toArray().map(String);
  }
  has(t, e) {
    return t[_t].includes(e);
  }
  getOwnPropertyDescriptor(t, e) {
    if (t[_t].indexOf(e) !== -1)
      return { writable: !0, enumerable: !0, configurable: !0 };
  }
  get(t, e) {
    if (Reflect.has(t, e))
      return t[e];
    const n = t[_t].indexOf(e);
    if (n !== -1) {
      const r = Q.visit(Reflect.get(t, fe), n);
      return Reflect.set(t, e, r), r;
    }
  }
  set(t, e, n) {
    const r = t[_t].indexOf(e);
    return r !== -1 ? (ut.visit(Reflect.get(t, fe), r, n), Reflect.set(t, e, n)) : Reflect.has(t, e) ? Reflect.set(t, e, n) : !1;
  }
}
Object.defineProperties(Xi.prototype, {
  [Symbol.toStringTag]: { enumerable: !1, configurable: !1, value: "Row" },
  [_t]: { writable: !0, enumerable: !1, configurable: !1, value: null },
  [fe]: { writable: !0, enumerable: !1, configurable: !1, value: null }
});
let yn;
function $r(i, t, e, n) {
  const { length: r = 0 } = i;
  let s = typeof t != "number" ? 0 : t, o = typeof e != "number" ? r : e;
  return s < 0 && (s = (s % r + r) % r), o < 0 && (o = (o % r + r) % r), o < s && (yn = s, s = o, o = yn), o > r && (o = r), n ? n(i, s, o) : [s, o];
}
const mn = (i) => i !== i;
function Ie(i) {
  if (typeof i !== "object" || i === null)
    return mn(i) ? mn : (e) => e === i;
  if (i instanceof Date) {
    const e = i.valueOf();
    return (n) => n instanceof Date ? n.valueOf() === e : !1;
  }
  return ArrayBuffer.isView(i) ? (e) => e ? js(i, e) : !1 : i instanceof Map ? Xo(i) : Array.isArray(i) ? qo(i) : i instanceof U ? Qo(i) : ta(i, !0);
}
function qo(i) {
  const t = [];
  for (let e = -1, n = i.length; ++e < n; )
    t[e] = Ie(i[e]);
  return Ii(t);
}
function Xo(i) {
  let t = -1;
  const e = [];
  for (const n of i.values())
    e[++t] = Ie(n);
  return Ii(e);
}
function Qo(i) {
  const t = [];
  for (let e = -1, n = i.length; ++e < n; )
    t[e] = Ie(i.get(e));
  return Ii(t);
}
function ta(i, t = !1) {
  const e = Object.keys(i);
  if (!t && e.length === 0)
    return () => !1;
  const n = [];
  for (let r = -1, s = e.length; ++r < s; )
    n[r] = Ie(i[e[r]]);
  return Ii(n, e);
}
function Ii(i, t) {
  return (e) => {
    if (!e || typeof e != "object")
      return !1;
    switch (e.constructor) {
      case Array:
        return ea(i, e);
      case Map:
        return bn(i, e, e.keys());
      case Xi:
      case Zi:
      case Object:
      case void 0:
        return bn(i, e, t || Object.keys(e));
    }
    return e instanceof U ? ia(i, e) : !1;
  };
}
function ea(i, t) {
  const e = i.length;
  if (t.length !== e)
    return !1;
  for (let n = -1; ++n < e; )
    if (!i[n](t[n]))
      return !1;
  return !0;
}
function ia(i, t) {
  const e = i.length;
  if (t.length !== e)
    return !1;
  for (let n = -1; ++n < e; )
    if (!i[n](t.get(n)))
      return !1;
  return !0;
}
function bn(i, t, e) {
  const n = e[Symbol.iterator](), r = t instanceof Map ? t.keys() : Object.keys(t)[Symbol.iterator](), s = t instanceof Map ? t.values() : Object.values(t)[Symbol.iterator]();
  let o = 0;
  const a = i.length;
  let c = s.next(), u = n.next(), d = r.next();
  for (; o < a && !u.done && !d.done && !c.done && !(u.value !== d.value || !i[o](c.value)); ++o, u = n.next(), d = r.next(), c = s.next())
    ;
  return o === a && u.done && d.done && c.done ? !0 : (n.return && n.return(), r.return && r.return(), s.return && s.return(), !1);
}
function Wr(i, t, e, n) {
  return (e & 1 << n) !== 0;
}
function na(i, t, e, n) {
  return (e & 1 << n) >> n;
}
function ra(i, t, e) {
  const n = e.byteLength + 7 & -8;
  if (i > 0 || e.byteLength < n) {
    const r = new Uint8Array(n);
    return r.set(i % 8 === 0 ? e.subarray(i >> 3) : Ci(new Qi(e, i, t, null, Wr)).subarray(0, n)), r;
  }
  return e;
}
function Ci(i) {
  const t = [];
  let e = 0, n = 0, r = 0;
  for (const o of i)
    o && (r |= 1 << n), ++n === 8 && (t[e++] = r, r = n = 0);
  (e === 0 || n > 0) && (t[e++] = r);
  const s = new Uint8Array(t.length + 7 & -8);
  return s.set(t), s;
}
class Qi {
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
function Vi(i, t, e) {
  if (e - t <= 0)
    return 0;
  if (e - t < 8) {
    let s = 0;
    for (const o of new Qi(i, t, e - t, i, na))
      s += o;
    return s;
  }
  const n = e >> 3 << 3, r = t + (t % 8 === 0 ? 0 : 8 - t % 8);
  return Vi(i, t, r) + Vi(i, n, e) + sa(i, r >> 3, n - r >> 3);
}
function sa(i, t, e) {
  let n = 0, r = Math.trunc(t);
  const s = new DataView(i.buffer, i.byteOffset, i.byteLength), o = e === void 0 ? i.byteLength : r + e;
  for (; o - r >= 4; )
    n += Ni(s.getUint32(r)), r += 4;
  for (; o - r >= 2; )
    n += Ni(s.getUint16(r)), r += 2;
  for (; o - r >= 1; )
    n += Ni(s.getUint8(r)), r += 1;
  return n;
}
function Ni(i) {
  let t = Math.trunc(i);
  return t = t - (t >>> 1 & 1431655765), t = (t & 858993459) + (t >>> 2 & 858993459), (t + (t >>> 4) & 252645135) * 16843009 >>> 24;
}
const oa = -1;
class E {
  get typeId() {
    return this.type.typeId;
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get buffers() {
    return [this.valueOffsets, this.values, this.nullBitmap, this.typeIds];
  }
  get byteLength() {
    let t = 0;
    const { valueOffsets: e, values: n, nullBitmap: r, typeIds: s } = this;
    return e && (t += e.byteLength), n && (t += n.byteLength), r && (t += r.byteLength), s && (t += s.byteLength), this.children.reduce((o, a) => o + a.byteLength, t);
  }
  get nullCount() {
    let t = this._nullCount, e;
    return t <= oa && (e = this.nullBitmap) && (this._nullCount = t = this.length - Vi(e, this.offset, this.offset + this.length)), t;
  }
  constructor(t, e, n, r, s, o = [], a) {
    this.type = t, this.children = o, this.dictionary = a, this.offset = Math.floor(Math.max(e || 0, 0)), this.length = Math.floor(Math.max(n || 0, 0)), this._nullCount = Math.floor(Math.max(r || 0, -1));
    let c;
    s instanceof E ? (this.stride = s.stride, this.values = s.values, this.typeIds = s.typeIds, this.nullBitmap = s.nullBitmap, this.valueOffsets = s.valueOffsets) : (this.stride = Lt(t), s && ((c = s[0]) && (this.valueOffsets = c), (c = s[1]) && (this.values = c), (c = s[2]) && (this.nullBitmap = c), (c = s[3]) && (this.typeIds = c))), this.nullable = this._nullCount !== 0 && this.nullBitmap && this.nullBitmap.byteLength > 0;
  }
  getValid(t) {
    if (this.nullable && this.nullCount > 0) {
      const e = this.offset + t;
      return (this.nullBitmap[e >> 3] & 1 << e % 8) !== 0;
    }
    return !0;
  }
  setValid(t, e) {
    if (!this.nullable)
      return e;
    if (!this.nullBitmap || this.nullBitmap.byteLength <= t >> 3) {
      const { nullBitmap: c } = this._changeLengthAndBackfillNullBitmap(this.length);
      Object.assign(this, { nullBitmap: c, _nullCount: 0 });
    }
    const { nullBitmap: n, offset: r } = this, s = r + t >> 3, o = (r + t) % 8, a = n[s] >> o & 1;
    return e ? a === 0 && (n[s] |= 1 << o, this._nullCount = this.nullCount + 1) : a === 1 && (n[s] &= ~(1 << o), this._nullCount = this.nullCount - 1), e;
  }
  clone(t = this.type, e = this.offset, n = this.length, r = this._nullCount, s = this, o = this.children) {
    return new E(t, e, n, r, s, o, this.dictionary);
  }
  slice(t, e) {
    const { stride: n, typeId: r, children: s } = this, o = +(this._nullCount === 0) - 1, a = r === 16 ? n : 1, c = this._sliceBuffers(t, e, n, r);
    return this.clone(
      this.type,
      this.offset + t,
      e,
      o,
      c,
      s.length === 0 || this.valueOffsets ? s : this._sliceChildren(s, a * t, a * e)
    );
  }
  _changeLengthAndBackfillNullBitmap(t) {
    if (this.typeId === l.Null)
      return this.clone(this.type, 0, t, 0);
    const { length: e, nullCount: n } = this, r = new Uint8Array((t + 63 & -64) >> 3).fill(255, 0, e >> 3);
    r[e >> 3] = (1 << e - (e & -8)) - 1, n > 0 && r.set(ra(this.offset, e, this.nullBitmap), 0);
    const s = this.buffers;
    return s[Mt.VALIDITY] = r, this.clone(this.type, 0, t, n + (t - e), s);
  }
  _sliceBuffers(t, e, n, r) {
    let s;
    const { buffers: o } = this;
    return (s = o[Mt.TYPE]) && (o[Mt.TYPE] = s.subarray(t, t + e)), (s = o[Mt.OFFSET]) && (o[Mt.OFFSET] = s.subarray(t, t + e + 1)) || (s = o[Mt.DATA]) && (o[Mt.DATA] = r === 6 ? s : s.subarray(n * t, n * (t + e))), o;
  }
  _sliceChildren(t, e, n) {
    return t.map((r) => r.slice(e, n));
  }
}
E.prototype.children = Object.freeze([]);
class Ae extends O {
  visit(t) {
    return this.getVisitFn(t.type).call(this, t);
  }
  visitNull(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["length"]: r = 0 } = t;
    return new E(e, n, r, 0);
  }
  visitBool(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length >> 3, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitInt(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitFloat(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length, ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitUtf8(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.data), s = N(t.nullBitmap), o = Be(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, a, c, [o, r, s]);
  }
  visitBinary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.data), s = N(t.nullBitmap), o = Be(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, a, c, [o, r, s]);
  }
  visitFixedSizeBinary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length / Lt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitDate(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length / Lt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitTimestamp(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length / Lt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitTime(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length / Lt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitDecimal(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length / Lt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitList(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: r } = t, s = N(t.nullBitmap), o = Be(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, a, c, [o, void 0, s], [r]);
  }
  visitStruct(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["children"]: r = [] } = t, s = N(t.nullBitmap), { length: o = r.reduce((c, { length: u }) => Math.max(c, u), 0), nullCount: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, void 0, s], r);
  }
  visitUnion(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["children"]: r = [] } = t, s = N(t.nullBitmap), o = R(e.ArrayType, t.typeIds), { ["length"]: a = o.length, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    if (f.isSparseUnion(e))
      return new E(e, n, a, c, [void 0, void 0, s, o], r);
    const u = Be(t.valueOffsets);
    return new E(e, n, a, c, [u, void 0, s, o], r);
  }
  visitDictionary(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.indices.ArrayType, t.data), { ["dictionary"]: o = new U([new Ae().visit({ type: e.dictionary })]) } = t, { ["length"]: a = s.length, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, a, c, [void 0, s, r], [], o);
  }
  visitInterval(t) {
    const { ["type"]: e, ["offset"]: n = 0 } = t, r = N(t.nullBitmap), s = R(e.ArrayType, t.data), { ["length"]: o = s.length / Lt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, s, r]);
  }
  visitFixedSizeList(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: r = new Ae().visit({ type: e.valueType }) } = t, s = N(t.nullBitmap), { ["length"]: o = r.length / Lt(e), ["nullCount"]: a = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, o, a, [void 0, void 0, s], [r]);
  }
  visitMap(t) {
    const { ["type"]: e, ["offset"]: n = 0, ["child"]: r = new Ae().visit({ type: e.childType }) } = t, s = N(t.nullBitmap), o = Be(t.valueOffsets), { ["length"]: a = o.length - 1, ["nullCount"]: c = t.nullBitmap ? -1 : 0 } = t;
    return new E(e, n, a, c, [o, void 0, s], [r]);
  }
}
function F(i) {
  return new Ae().visit(i);
}
class gn {
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
function Yr(i) {
  return i.reduce((t, e) => t + e.nullCount, 0);
}
function Jr(i) {
  return i.reduce((t, e, n) => (t[n + 1] = t[n] + e.length, t), new Uint32Array(i.length + 1));
}
function Hr(i, t, e, n) {
  const r = [];
  for (let s = -1, o = i.length; ++s < o; ) {
    const a = i[s], c = t[s], { length: u } = a;
    if (c >= n)
      break;
    if (e >= c + u)
      continue;
    if (c >= e && c + u <= n) {
      r.push(a);
      continue;
    }
    const d = Math.max(0, e - c), h = Math.min(n - c, u);
    r.push(a.slice(d, h - d));
  }
  return r.length === 0 && r.push(i[0].slice(0, 0)), r;
}
function tn(i, t, e, n) {
  let r = 0, s = 0, o = t.length - 1;
  do {
    if (r >= o - 1)
      return e < t[o] ? n(i, r, e - t[r]) : null;
    s = r + Math.trunc((o - r) * 0.5), e < t[s] ? o = s : r = s;
  } while (r < o);
}
function en(i, t) {
  return i.getValid(t);
}
function pe(i) {
  function t(e, n, r) {
    return i(e[n], r);
  }
  return function(e) {
    const n = this.data;
    return tn(n, this._offsets, e, t);
  };
}
function Kr(i) {
  let t;
  function e(n, r, s) {
    return i(n[r], s, t);
  }
  return function(n, r) {
    const s = this.data;
    t = r;
    const o = tn(s, this._offsets, n, e);
    return t = void 0, o;
  };
}
function Gr(i) {
  let t;
  function e(n, r, s) {
    let o = s, a = 0, c = 0;
    for (let u = r - 1, d = n.length; ++u < d; ) {
      const h = n[u];
      if (~(a = i(h, t, o)))
        return c + a;
      o = 0, c += h.length;
    }
    return -1;
  }
  return function(n, r) {
    t = n;
    const s = this.data, o = typeof r != "number" ? e(s, 0, 0) : tn(s, this._offsets, r, e);
    return t = void 0, o;
  };
}
class m extends O {
}
function aa(i, t) {
  return t === null && i.length > 0 ? 0 : -1;
}
function ca(i, t) {
  const { nullBitmap: e } = i;
  if (!e || i.nullCount <= 0)
    return -1;
  let n = 0;
  for (const r of new Qi(e, i.offset + (t || 0), i.length, e, Wr)) {
    if (!r)
      return n;
    ++n;
  }
  return -1;
}
function B(i, t, e) {
  if (t === void 0)
    return -1;
  if (t === null)
    return ca(i, e);
  const n = Q.getVisitFn(i), r = Ie(t);
  for (let s = (e || 0) - 1, o = i.length; ++s < o; )
    if (r(n(i, s)))
      return s;
  return -1;
}
function Zr(i, t, e) {
  const n = Q.getVisitFn(i), r = Ie(t);
  for (let s = (e || 0) - 1, o = i.length; ++s < o; )
    if (r(n(i, s)))
      return s;
  return -1;
}
m.prototype.visitNull = aa;
m.prototype.visitBool = B;
m.prototype.visitInt = B;
m.prototype.visitInt8 = B;
m.prototype.visitInt16 = B;
m.prototype.visitInt32 = B;
m.prototype.visitInt64 = B;
m.prototype.visitUint8 = B;
m.prototype.visitUint16 = B;
m.prototype.visitUint32 = B;
m.prototype.visitUint64 = B;
m.prototype.visitFloat = B;
m.prototype.visitFloat16 = B;
m.prototype.visitFloat32 = B;
m.prototype.visitFloat64 = B;
m.prototype.visitUtf8 = B;
m.prototype.visitBinary = B;
m.prototype.visitFixedSizeBinary = B;
m.prototype.visitDate = B;
m.prototype.visitDateDay = B;
m.prototype.visitDateMillisecond = B;
m.prototype.visitTimestamp = B;
m.prototype.visitTimestampSecond = B;
m.prototype.visitTimestampMillisecond = B;
m.prototype.visitTimestampMicrosecond = B;
m.prototype.visitTimestampNanosecond = B;
m.prototype.visitTime = B;
m.prototype.visitTimeSecond = B;
m.prototype.visitTimeMillisecond = B;
m.prototype.visitTimeMicrosecond = B;
m.prototype.visitTimeNanosecond = B;
m.prototype.visitDecimal = B;
m.prototype.visitList = B;
m.prototype.visitStruct = B;
m.prototype.visitUnion = B;
m.prototype.visitDenseUnion = Zr;
m.prototype.visitSparseUnion = Zr;
m.prototype.visitDictionary = B;
m.prototype.visitInterval = B;
m.prototype.visitIntervalDayTime = B;
m.prototype.visitIntervalYearMonth = B;
m.prototype.visitFixedSizeList = B;
m.prototype.visitMap = B;
const ri = new m();
class b extends O {
}
function w(i) {
  const { type: t } = i;
  if (i.nullCount === 0 && i.stride === 1 && (t.typeId === l.Timestamp || t instanceof Ht && t.bitWidth !== 64 || t instanceof Me && t.bitWidth !== 64 || t instanceof Te && t.precision !== G.HALF))
    return new gn(i.data.length, (n) => {
      const r = i.data[n];
      return r.values.subarray(0, r.length)[Symbol.iterator]();
    });
  let e = 0;
  return new gn(i.data.length, (n) => {
    const s = i.data[n].length, o = i.slice(e, e + s);
    return e += s, new la(o);
  });
}
class la {
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
b.prototype.visitNull = w;
b.prototype.visitBool = w;
b.prototype.visitInt = w;
b.prototype.visitInt8 = w;
b.prototype.visitInt16 = w;
b.prototype.visitInt32 = w;
b.prototype.visitInt64 = w;
b.prototype.visitUint8 = w;
b.prototype.visitUint16 = w;
b.prototype.visitUint32 = w;
b.prototype.visitUint64 = w;
b.prototype.visitFloat = w;
b.prototype.visitFloat16 = w;
b.prototype.visitFloat32 = w;
b.prototype.visitFloat64 = w;
b.prototype.visitUtf8 = w;
b.prototype.visitBinary = w;
b.prototype.visitFixedSizeBinary = w;
b.prototype.visitDate = w;
b.prototype.visitDateDay = w;
b.prototype.visitDateMillisecond = w;
b.prototype.visitTimestamp = w;
b.prototype.visitTimestampSecond = w;
b.prototype.visitTimestampMillisecond = w;
b.prototype.visitTimestampMicrosecond = w;
b.prototype.visitTimestampNanosecond = w;
b.prototype.visitTime = w;
b.prototype.visitTimeSecond = w;
b.prototype.visitTimeMillisecond = w;
b.prototype.visitTimeMicrosecond = w;
b.prototype.visitTimeNanosecond = w;
b.prototype.visitDecimal = w;
b.prototype.visitList = w;
b.prototype.visitStruct = w;
b.prototype.visitUnion = w;
b.prototype.visitDenseUnion = w;
b.prototype.visitSparseUnion = w;
b.prototype.visitDictionary = w;
b.prototype.visitInterval = w;
b.prototype.visitIntervalDayTime = w;
b.prototype.visitIntervalYearMonth = w;
b.prototype.visitFixedSizeList = w;
b.prototype.visitMap = w;
const nn = new b(), ua = (i, t) => i + t;
class qt extends O {
  visitNull(t, e) {
    return 0;
  }
  visitInt(t, e) {
    return t.type.bitWidth / 8;
  }
  visitFloat(t, e) {
    return t.type.ArrayType.BYTES_PER_ELEMENT;
  }
  visitBool(t, e) {
    return 1 / 8;
  }
  visitDecimal(t, e) {
    return t.type.bitWidth / 8;
  }
  visitDate(t, e) {
    return (t.type.unit + 1) * 4;
  }
  visitTime(t, e) {
    return t.type.bitWidth / 8;
  }
  visitTimestamp(t, e) {
    return t.type.unit === D.SECOND ? 4 : 8;
  }
  visitInterval(t, e) {
    return (t.type.unit + 1) * 4;
  }
  visitStruct(t, e) {
    return t.children.reduce((n, r) => n + Tt.visit(r, e), 0);
  }
  visitFixedSizeBinary(t, e) {
    return t.type.byteWidth;
  }
  visitMap(t, e) {
    return 8 + t.children.reduce((n, r) => n + Tt.visit(r, e), 0);
  }
  visitDictionary(t, e) {
    var n;
    return t.type.indices.bitWidth / 8 + (((n = t.dictionary) === null || n === void 0 ? void 0 : n.getByteLength(t.values[e])) || 0);
  }
}
const da = ({ valueOffsets: i }, t) => 8 + (i[t + 1] - i[t]), ha = ({ valueOffsets: i }, t) => 8 + (i[t + 1] - i[t]), fa = ({ valueOffsets: i, stride: t, children: e }, n) => {
  const r = e[0], { [n * t]: s } = i, { [n * t + 1]: o } = i, a = Tt.getVisitFn(r.type), c = r.slice(s, o - s);
  let u = 8;
  for (let d = -1, h = o - s; ++d < h; )
    u += a(c, d);
  return u;
}, pa = ({ stride: i, children: t }, e) => {
  const n = t[0], r = n.slice(e * i, i), s = Tt.getVisitFn(n.type);
  let o = 0;
  for (let a = -1, c = r.length; ++a < c; )
    o += s(r, a);
  return o;
}, ya = (i, t) => i.type.mode === pt.Dense ? qr(i, t) : Xr(i, t), qr = ({ type: i, children: t, typeIds: e, valueOffsets: n }, r) => {
  const s = i.typeIdToChildIndex[e[r]];
  return 8 + Tt.visit(t[s], n[r]);
}, Xr = ({ children: i }, t) => 4 + Tt.visitMany(i, i.map(() => t)).reduce(ua, 0);
qt.prototype.visitUtf8 = da;
qt.prototype.visitBinary = ha;
qt.prototype.visitList = fa;
qt.prototype.visitFixedSizeList = pa;
qt.prototype.visitUnion = ya;
qt.prototype.visitDenseUnion = qr;
qt.prototype.visitSparseUnion = Xr;
const Tt = new qt();
var Qr;
const ts = {}, es = {};
class U {
  constructor(t) {
    var e, n, r;
    const s = t[0] instanceof U ? t.flatMap((a) => a.data) : t;
    if (s.length === 0 || s.some((a) => !(a instanceof E)))
      throw new TypeError("Vector constructor expects an Array of Data instances.");
    const o = (e = s[0]) === null || e === void 0 ? void 0 : e.type;
    switch (s.length) {
      case 0:
        this._offsets = [0];
        break;
      case 1: {
        const { get: a, set: c, indexOf: u, byteLength: d } = ts[o.typeId], h = s[0];
        this.isValid = (A) => en(h, A), this.get = (A) => a(h, A), this.set = (A, j) => c(h, A, j), this.indexOf = (A) => u(h, A), this.getByteLength = (A) => d(h, A), this._offsets = [0, h.length];
        break;
      }
      default:
        Object.setPrototypeOf(this, es[o.typeId]), this._offsets = Jr(s);
        break;
    }
    this.data = s, this.type = o, this.stride = Lt(o), this.numChildren = (r = (n = o.children) === null || n === void 0 ? void 0 : n.length) !== null && r !== void 0 ? r : 0, this.length = this._offsets[this._offsets.length - 1];
  }
  get byteLength() {
    return this._byteLength === -1 && (this._byteLength = this.data.reduce((t, e) => t + e.byteLength, 0)), this._byteLength;
  }
  get nullCount() {
    return this._nullCount === -1 && (this._nullCount = Yr(this.data)), this._nullCount;
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get [Symbol.toStringTag]() {
    return `${this.VectorName}<${this.type[Symbol.toStringTag]}>`;
  }
  get VectorName() {
    return `${l[this.type.typeId]}Vector`;
  }
  isValid(t) {
    return !1;
  }
  get(t) {
    return null;
  }
  set(t, e) {
  }
  indexOf(t, e) {
    return -1;
  }
  includes(t, e) {
    return this.indexOf(t, e) > 0;
  }
  getByteLength(t) {
    return 0;
  }
  [Symbol.iterator]() {
    return nn.visit(this);
  }
  concat(...t) {
    return new U(this.data.concat(t.flatMap((e) => e.data).flat(Number.POSITIVE_INFINITY)));
  }
  slice(t, e) {
    return new U($r(this, t, e, ({ data: n, _offsets: r }, s, o) => Hr(n, r, s, o)));
  }
  toJSON() {
    return [...this];
  }
  toArray() {
    const { type: t, data: e, length: n, stride: r, ArrayType: s } = this;
    switch (t.typeId) {
      case l.Int:
      case l.Float:
      case l.Decimal:
      case l.Time:
      case l.Timestamp:
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
  toString() {
    return `[${[...this].join(",")}]`;
  }
  getChild(t) {
    var e;
    return this.getChildAt((e = this.type.children) === null || e === void 0 ? void 0 : e.findIndex((n) => n.name === t));
  }
  getChildAt(t) {
    return t > -1 && t < this.numChildren ? new U(this.data.map(({ children: e }) => e[t])) : null;
  }
  get isMemoized() {
    return f.isDictionary(this.type) ? this.data[0].dictionary.isMemoized : !1;
  }
  memoize() {
    if (f.isDictionary(this.type)) {
      const t = new si(this.data[0].dictionary), e = this.data.map((n) => {
        const r = n.clone();
        return r.dictionary = t, r;
      });
      return new U(e);
    }
    return new si(this);
  }
  unmemoize() {
    if (f.isDictionary(this.type) && this.isMemoized) {
      const t = this.data[0].dictionary.unmemoize(), e = this.data.map((n) => {
        const r = n.clone();
        return r.dictionary = t, r;
      });
      return new U(e);
    }
    return this;
  }
}
Qr = Symbol.toStringTag;
U[Qr] = ((i) => {
  i.type = f.prototype, i.data = [], i.length = 0, i.stride = 1, i.numChildren = 0, i._nullCount = -1, i._byteLength = -1, i._offsets = new Uint32Array([0]), i[Symbol.isConcatSpreadable] = !0;
  const t = Object.keys(l).map((e) => l[e]).filter((e) => typeof e == "number" && e !== l.NONE);
  for (const e of t) {
    const n = Q.getVisitFnByTypeId(e), r = ut.getVisitFnByTypeId(e), s = ri.getVisitFnByTypeId(e), o = Tt.getVisitFnByTypeId(e);
    ts[e] = { get: n, set: r, indexOf: s, byteLength: o }, es[e] = Object.create(i, {
      isValid: { value: pe(en) },
      get: { value: pe(Q.getVisitFnByTypeId(e)) },
      set: { value: Kr(ut.getVisitFnByTypeId(e)) },
      indexOf: { value: Gr(ri.getVisitFnByTypeId(e)) },
      getByteLength: { value: pe(Tt.getVisitFnByTypeId(e)) }
    });
  }
  return "Vector";
})(U.prototype);
class si extends U {
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
      value: (o, a) => new si(r.call(this, o, a))
    }), Object.defineProperty(this, "isMemoized", { value: !0 }), Object.defineProperty(this, "unmemoize", {
      value: () => new U(this.data)
    }), Object.defineProperty(this, "memoize", {
      value: () => this
    });
  }
}
class zi {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  metaDataLength() {
    return this.bb.readInt32(this.bb_pos + 8);
  }
  bodyLength() {
    return this.bb.readInt64(this.bb_pos + 16);
  }
  static sizeOf() {
    return 24;
  }
  static createBlock(t, e, n, r) {
    return t.prep(8, 24), t.writeInt64(BigInt(r != null ? r : 0)), t.pad(4), t.writeInt32(n), t.writeInt64(BigInt(e != null ? e : 0)), t.offset();
  }
}
const Ti = 2, vt = 4, Ut = 4, x = 4, Pt = new Int32Array(2), _n = new Float32Array(Pt.buffer), vn = new Float64Array(Pt.buffer), ze = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
var ki;
(function(i) {
  i[i.UTF8_BYTES = 1] = "UTF8_BYTES", i[i.UTF16_STRING = 2] = "UTF16_STRING";
})(ki || (ki = {}));
class Kt {
  constructor(t) {
    this.bytes_ = t, this.position_ = 0, this.text_decoder_ = new TextDecoder();
  }
  static allocate(t) {
    return new Kt(new Uint8Array(t));
  }
  clear() {
    this.position_ = 0;
  }
  bytes() {
    return this.bytes_;
  }
  position() {
    return this.position_;
  }
  setPosition(t) {
    this.position_ = t;
  }
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
    return Pt[0] = this.readInt32(t), _n[0];
  }
  readFloat64(t) {
    return Pt[ze ? 0 : 1] = this.readInt32(t), Pt[ze ? 1 : 0] = this.readInt32(t + 4), vn[0];
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
    _n[0] = e, this.writeInt32(t, Pt[0]);
  }
  writeFloat64(t, e) {
    vn[0] = e, this.writeInt32(t, Pt[ze ? 0 : 1]), this.writeInt32(t + 4, Pt[ze ? 1 : 0]);
  }
  getBufferIdentifier() {
    if (this.bytes_.length < this.position_ + vt + Ut)
      throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
    let t = "";
    for (let e = 0; e < Ut; e++)
      t += String.fromCharCode(this.readInt8(this.position_ + vt + e));
    return t;
  }
  __offset(t, e) {
    const n = t - this.readInt32(t);
    return e < this.readInt16(n) ? this.readInt16(n + e) : 0;
  }
  __union(t, e) {
    return t.bb_pos = e + this.readInt32(e), t.bb = this, t;
  }
  __string(t, e) {
    t += this.readInt32(t);
    const n = this.readInt32(t);
    t += vt;
    const r = this.bytes_.subarray(t, t + n);
    return e === ki.UTF8_BYTES ? r : this.text_decoder_.decode(r);
  }
  __union_with_string(t, e) {
    return typeof t == "string" ? this.__string(e) : this.__union(t, e);
  }
  __indirect(t) {
    return t + this.readInt32(t);
  }
  __vector(t) {
    return t + this.readInt32(t) + vt;
  }
  __vector_len(t) {
    return this.readInt32(t + this.readInt32(t));
  }
  __has_identifier(t) {
    if (t.length != Ut)
      throw new Error("FlatBuffers: file identifier must be length " + Ut);
    for (let e = 0; e < Ut; e++)
      if (t.charCodeAt(e) != this.readInt8(this.position() + vt + e))
        return !1;
    return !0;
  }
  createScalarList(t, e) {
    const n = [];
    for (let r = 0; r < e; ++r) {
      const s = t(r);
      s !== null && n.push(s);
    }
    return n;
  }
  createObjList(t, e) {
    const n = [];
    for (let r = 0; r < e; ++r) {
      const s = t(r);
      s !== null && n.push(s.unpack());
    }
    return n;
  }
}
class Si {
  constructor(t) {
    this.minalign = 1, this.vtable = null, this.vtable_in_use = 0, this.isNested = !1, this.object_start = 0, this.vtables = [], this.vector_num_elems = 0, this.force_defaults = !1, this.string_maps = null, this.text_encoder = new TextEncoder();
    let e;
    t ? e = t : e = 1024, this.bb = Kt.allocate(e), this.space = e;
  }
  clear() {
    this.bb.clear(), this.space = this.bb.capacity(), this.minalign = 1, this.vtable = null, this.vtable_in_use = 0, this.isNested = !1, this.object_start = 0, this.vtables = [], this.vector_num_elems = 0, this.force_defaults = !1, this.string_maps = null;
  }
  forceDefaults(t) {
    this.force_defaults = t;
  }
  dataBuffer() {
    return this.bb;
  }
  asUint8Array() {
    return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
  }
  prep(t, e) {
    t > this.minalign && (this.minalign = t);
    const n = ~(this.bb.capacity() - this.space + e) + 1 & t - 1;
    for (; this.space < n + t + e; ) {
      const r = this.bb.capacity();
      this.bb = Si.growByteBuffer(this.bb), this.space += this.bb.capacity() - r;
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
  addInt8(t) {
    this.prep(1, 0), this.writeInt8(t);
  }
  addInt16(t) {
    this.prep(2, 0), this.writeInt16(t);
  }
  addInt32(t) {
    this.prep(4, 0), this.writeInt32(t);
  }
  addInt64(t) {
    this.prep(8, 0), this.writeInt64(t);
  }
  addFloat32(t) {
    this.prep(4, 0), this.writeFloat32(t);
  }
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
  addFieldStruct(t, e, n) {
    e != n && (this.nested(e), this.slot(t));
  }
  nested(t) {
    if (t != this.offset())
      throw new Error("FlatBuffers: struct must be serialized inline.");
  }
  notNested() {
    if (this.isNested)
      throw new Error("FlatBuffers: object serialization must not be nested.");
  }
  slot(t) {
    this.vtable !== null && (this.vtable[t] = this.offset());
  }
  offset() {
    return this.bb.capacity() - this.space;
  }
  static growByteBuffer(t) {
    const e = t.capacity();
    if (e & 3221225472)
      throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
    const n = e << 1, r = Kt.allocate(n);
    return r.setPosition(n - e), r.bytes().set(t.bytes(), n - e), r;
  }
  addOffset(t) {
    this.prep(vt, 0), this.writeInt32(this.offset() - t + vt);
  }
  startObject(t) {
    this.notNested(), this.vtable == null && (this.vtable = []), this.vtable_in_use = t;
    for (let e = 0; e < t; e++)
      this.vtable[e] = 0;
    this.isNested = !0, this.object_start = this.offset();
  }
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
    const s = (n + r) * Ti;
    this.addInt16(s);
    let o = 0;
    const a = this.space;
    t:
      for (e = 0; e < this.vtables.length; e++) {
        const c = this.bb.capacity() - this.vtables[e];
        if (s == this.bb.readInt16(c)) {
          for (let u = Ti; u < s; u += Ti)
            if (this.bb.readInt16(a + u) != this.bb.readInt16(c + u))
              continue t;
          o = this.vtables[e];
          break;
        }
      }
    return o ? (this.space = this.bb.capacity() - t, this.bb.writeInt32(this.space, o - t)) : (this.vtables.push(this.offset()), this.bb.writeInt32(this.bb.capacity() - t, this.offset() - t)), this.isNested = !1, t;
  }
  finish(t, e, n) {
    const r = n ? x : 0;
    if (e) {
      const s = e;
      if (this.prep(this.minalign, vt + Ut + r), s.length != Ut)
        throw new Error("FlatBuffers: file identifier must be length " + Ut);
      for (let o = Ut - 1; o >= 0; o--)
        this.writeInt8(s.charCodeAt(o));
    }
    this.prep(this.minalign, vt + r), this.addOffset(t), r && this.addInt32(this.bb.capacity() - this.space), this.bb.setPosition(this.space);
  }
  finishSizePrefixed(t, e) {
    this.finish(t, e, !0);
  }
  requiredField(t, e) {
    const n = this.bb.capacity() - t, r = n - this.bb.readInt32(n);
    if (!(e < this.bb.readInt16(r) && this.bb.readInt16(r + e) != 0))
      throw new Error("FlatBuffers: field " + e + " must be set");
  }
  startVector(t, e, n) {
    this.notNested(), this.vector_num_elems = e, this.prep(vt, t * e), this.prep(n, t * e);
  }
  endVector() {
    return this.writeInt32(this.vector_num_elems), this.offset();
  }
  createSharedString(t) {
    if (!t)
      return 0;
    if (this.string_maps || (this.string_maps = /* @__PURE__ */ new Map()), this.string_maps.has(t))
      return this.string_maps.get(t);
    const e = this.createString(t);
    return this.string_maps.set(t, e), e;
  }
  createString(t) {
    if (t == null)
      return 0;
    let e;
    t instanceof Uint8Array ? e = t : e = this.text_encoder.encode(t), this.addInt8(0), this.startVector(1, e.length, 1), this.bb.setPosition(this.space -= e.length);
    for (let n = 0, r = this.space, s = this.bb.bytes(); n < e.length; n++)
      s[r++] = e[n];
    return this.endVector();
  }
  createObjectOffset(t) {
    return t === null ? 0 : typeof t == "string" ? this.createString(t) : t.pack(this);
  }
  createObjectOffsetList(t) {
    const e = [];
    for (let n = 0; n < t.length; ++n) {
      const r = t[n];
      if (r !== null)
        e.push(this.createObjectOffset(r));
      else
        throw new Error("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");
    }
    return e;
  }
  createStructOffsetList(t, e) {
    return e(this, t.length), this.createObjectOffsetList(t.slice().reverse()), this.endVector();
  }
}
class $ {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsKeyValue(t, e) {
    return (e || new $()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsKeyValue(t, e) {
    return t.setPosition(t.position() + x), (e || new $()).__init(t.readInt32(t.position()) + t.position(), t);
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
    return $.startKeyValue(t), $.addKey(t, e), $.addValue(t, n), $.endKeyValue(t);
  }
}
var me;
(function(i) {
  i[i.V1 = 0] = "V1", i[i.V2 = 1] = "V2", i[i.V3 = 2] = "V3", i[i.V4 = 3] = "V4", i[i.V5 = 4] = "V5";
})(me || (me = {}));
var be;
(function(i) {
  i[i.Little = 0] = "Little", i[i.Big = 1] = "Big";
})(be || (be = {}));
var oi;
(function(i) {
  i[i.DenseArray = 0] = "DenseArray";
})(oi || (oi = {}));
class it {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsInt(t, e) {
    return (e || new it()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInt(t, e) {
    return t.setPosition(t.position() + x), (e || new it()).__init(t.readInt32(t.position()) + t.position(), t);
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
    return it.startInt(t), it.addBitWidth(t, e), it.addIsSigned(t, n), it.endInt(t);
  }
}
class Rt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDictionaryEncoding(t, e) {
    return (e || new Rt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDictionaryEncoding(t, e) {
    return t.setPosition(t.position() + x), (e || new Rt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  indexType(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new it()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  isOrdered() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  dictionaryKind() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt16(this.bb_pos + t) : oi.DenseArray;
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
    t.addFieldInt16(3, e, oi.DenseArray);
  }
  static endDictionaryEncoding(t) {
    return t.endObject();
  }
}
class Qt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBinary(t, e) {
    return (e || new Qt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBinary(t, e) {
    return t.setPosition(t.position() + x), (e || new Qt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startBinary(t) {
    t.startObject(0);
  }
  static endBinary(t) {
    return t.endObject();
  }
  static createBinary(t) {
    return Qt.startBinary(t), Qt.endBinary(t);
  }
}
class te {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBool(t, e) {
    return (e || new te()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBool(t, e) {
    return t.setPosition(t.position() + x), (e || new te()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startBool(t) {
    t.startObject(0);
  }
  static endBool(t) {
    return t.endObject();
  }
  static createBool(t) {
    return te.startBool(t), te.endBool(t);
  }
}
var ai;
(function(i) {
  i[i.DAY = 0] = "DAY", i[i.MILLISECOND = 1] = "MILLISECOND";
})(ai || (ai = {}));
class wt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDate(t, e) {
    return (e || new wt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDate(t, e) {
    return t.setPosition(t.position() + x), (e || new wt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : ai.MILLISECOND;
  }
  static startDate(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, ai.MILLISECOND);
  }
  static endDate(t) {
    return t.endObject();
  }
  static createDate(t, e) {
    return wt.startDate(t), wt.addUnit(t, e), wt.endDate(t);
  }
}
class q {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDecimal(t, e) {
    return (e || new q()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDecimal(t, e) {
    return t.setPosition(t.position() + x), (e || new q()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  precision() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  scale() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
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
    return q.startDecimal(t), q.addPrecision(t, e), q.addScale(t, n), q.addBitWidth(t, r), q.endDecimal(t);
  }
}
var ge;
(function(i) {
  i[i.SECOND = 0] = "SECOND", i[i.MILLISECOND = 1] = "MILLISECOND", i[i.MICROSECOND = 2] = "MICROSECOND", i[i.NANOSECOND = 3] = "NANOSECOND";
})(ge || (ge = {}));
class It {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFixedSizeBinary(t, e) {
    return (e || new It()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedSizeBinary(t, e) {
    return t.setPosition(t.position() + x), (e || new It()).__init(t.readInt32(t.position()) + t.position(), t);
  }
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
    return It.startFixedSizeBinary(t), It.addByteWidth(t, e), It.endFixedSizeBinary(t);
  }
}
class St {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFixedSizeList(t, e) {
    return (e || new St()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixedSizeList(t, e) {
    return t.setPosition(t.position() + x), (e || new St()).__init(t.readInt32(t.position()) + t.position(), t);
  }
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
    return St.startFixedSizeList(t), St.addListSize(t, e), St.endFixedSizeList(t);
  }
}
var ci;
(function(i) {
  i[i.HALF = 0] = "HALF", i[i.SINGLE = 1] = "SINGLE", i[i.DOUBLE = 2] = "DOUBLE";
})(ci || (ci = {}));
class Bt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFloatingPoint(t, e) {
    return (e || new Bt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFloatingPoint(t, e) {
    return t.setPosition(t.position() + x), (e || new Bt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  precision() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : ci.HALF;
  }
  static startFloatingPoint(t) {
    t.startObject(1);
  }
  static addPrecision(t, e) {
    t.addFieldInt16(0, e, ci.HALF);
  }
  static endFloatingPoint(t) {
    return t.endObject();
  }
  static createFloatingPoint(t, e) {
    return Bt.startFloatingPoint(t), Bt.addPrecision(t, e), Bt.endFloatingPoint(t);
  }
}
var li;
(function(i) {
  i[i.YEAR_MONTH = 0] = "YEAR_MONTH", i[i.DAY_TIME = 1] = "DAY_TIME", i[i.MONTH_DAY_NANO = 2] = "MONTH_DAY_NANO";
})(li || (li = {}));
class At {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsInterval(t, e) {
    return (e || new At()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInterval(t, e) {
    return t.setPosition(t.position() + x), (e || new At()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : li.YEAR_MONTH;
  }
  static startInterval(t) {
    t.startObject(1);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, li.YEAR_MONTH);
  }
  static endInterval(t) {
    return t.endObject();
  }
  static createInterval(t, e) {
    return At.startInterval(t), At.addUnit(t, e), At.endInterval(t);
  }
}
class ee {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsList(t, e) {
    return (e || new ee()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsList(t, e) {
    return t.setPosition(t.position() + x), (e || new ee()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startList(t) {
    t.startObject(0);
  }
  static endList(t) {
    return t.endObject();
  }
  static createList(t) {
    return ee.startList(t), ee.endList(t);
  }
}
class Ft {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsMap(t, e) {
    return (e || new Ft()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMap(t, e) {
    return t.setPosition(t.position() + x), (e || new Ft()).__init(t.readInt32(t.position()) + t.position(), t);
  }
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
    return Ft.startMap(t), Ft.addKeysSorted(t, e), Ft.endMap(t);
  }
}
class ie {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsNull(t, e) {
    return (e || new ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNull(t, e) {
    return t.setPosition(t.position() + x), (e || new ie()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startNull(t) {
    t.startObject(0);
  }
  static endNull(t) {
    return t.endObject();
  }
  static createNull(t) {
    return ie.startNull(t), ie.endNull(t);
  }
}
class ne {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsStruct_(t, e) {
    return (e || new ne()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStruct_(t, e) {
    return t.setPosition(t.position() + x), (e || new ne()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startStruct_(t) {
    t.startObject(0);
  }
  static endStruct_(t) {
    return t.endObject();
  }
  static createStruct_(t) {
    return ne.startStruct_(t), ne.endStruct_(t);
  }
}
class ot {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsTime(t, e) {
    return (e || new ot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTime(t, e) {
    return t.setPosition(t.position() + x), (e || new ot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : ge.MILLISECOND;
  }
  bitWidth() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 32;
  }
  static startTime(t) {
    t.startObject(2);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, ge.MILLISECOND);
  }
  static addBitWidth(t, e) {
    t.addFieldInt32(1, e, 32);
  }
  static endTime(t) {
    return t.endObject();
  }
  static createTime(t, e, n) {
    return ot.startTime(t), ot.addUnit(t, e), ot.addBitWidth(t, n), ot.endTime(t);
  }
}
class at {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsTimestamp(t, e) {
    return (e || new at()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimestamp(t, e) {
    return t.setPosition(t.position() + x), (e || new at()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unit() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : ge.SECOND;
  }
  timezone(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  static startTimestamp(t) {
    t.startObject(2);
  }
  static addUnit(t, e) {
    t.addFieldInt16(0, e, ge.SECOND);
  }
  static addTimezone(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTimestamp(t) {
    return t.endObject();
  }
  static createTimestamp(t, e, n) {
    return at.startTimestamp(t), at.addUnit(t, e), at.addTimezone(t, n), at.endTimestamp(t);
  }
}
var ui;
(function(i) {
  i[i.Sparse = 0] = "Sparse", i[i.Dense = 1] = "Dense";
})(ui || (ui = {}));
class X {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsUnion(t, e) {
    return (e || new X()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnion(t, e) {
    return t.setPosition(t.position() + x), (e || new X()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mode() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : ui.Sparse;
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
    t.addFieldInt16(0, e, ui.Sparse);
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
    return X.startUnion(t), X.addMode(t, e), X.addTypeIds(t, n), X.endUnion(t);
  }
}
class re {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsUtf8(t, e) {
    return (e || new re()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUtf8(t, e) {
    return t.setPosition(t.position() + x), (e || new re()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startUtf8(t) {
    t.startObject(0);
  }
  static endUtf8(t) {
    return t.endObject();
  }
  static createUtf8(t) {
    return re.startUtf8(t), re.endUtf8(t);
  }
}
var V;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Null = 1] = "Null", i[i.Int = 2] = "Int", i[i.FloatingPoint = 3] = "FloatingPoint", i[i.Binary = 4] = "Binary", i[i.Utf8 = 5] = "Utf8", i[i.Bool = 6] = "Bool", i[i.Decimal = 7] = "Decimal", i[i.Date = 8] = "Date", i[i.Time = 9] = "Time", i[i.Timestamp = 10] = "Timestamp", i[i.Interval = 11] = "Interval", i[i.List = 12] = "List", i[i.Struct_ = 13] = "Struct_", i[i.Union = 14] = "Union", i[i.FixedSizeBinary = 15] = "FixedSizeBinary", i[i.FixedSizeList = 16] = "FixedSizeList", i[i.Map = 17] = "Map", i[i.Duration = 18] = "Duration", i[i.LargeBinary = 19] = "LargeBinary", i[i.LargeUtf8 = 20] = "LargeUtf8", i[i.LargeList = 21] = "LargeList", i[i.RunEndEncoded = 22] = "RunEndEncoded";
})(V || (V = {}));
class Y {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsField(t, e) {
    return (e || new Y()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsField(t, e) {
    return t.setPosition(t.position() + x), (e || new Y()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    const e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : null;
  }
  nullable() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? !!this.bb.readInt8(this.bb_pos + t) : !1;
  }
  typeType() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : V.NONE;
  }
  type(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : null;
  }
  dictionary(t) {
    const e = this.bb.__offset(this.bb_pos, 12);
    return e ? (t || new Rt()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  children(t, e) {
    const n = this.bb.__offset(this.bb_pos, 14);
    return n ? (e || new Y()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  childrenLength() {
    const t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 16);
    return n ? (e || new $()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
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
    t.addFieldInt8(2, e, V.NONE);
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
}
class P {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsSchema(t, e) {
    return (e || new P()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSchema(t, e) {
    return t.setPosition(t.position() + x), (e || new P()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  endianness() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : be.Little;
  }
  fields(t, e) {
    const n = this.bb.__offset(this.bb_pos, 6);
    return n ? (e || new Y()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  fieldsLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new $()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
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
    t.addFieldInt16(0, e, be.Little);
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
    return P.startSchema(t), P.addEndianness(t, e), P.addFields(t, n), P.addCustomMetadata(t, r), P.addFeatures(t, s), P.endSchema(t);
  }
}
class et {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsFooter(t, e) {
    return (e || new et()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFooter(t, e) {
    return t.setPosition(t.position() + x), (e || new et()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : me.V1;
  }
  schema(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new P()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
  dictionaries(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new zi()).__init(this.bb.__vector(this.bb_pos + n) + t * 24, this.bb) : null;
  }
  dictionariesLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  recordBatches(t, e) {
    const n = this.bb.__offset(this.bb_pos, 10);
    return n ? (e || new zi()).__init(this.bb.__vector(this.bb_pos + n) + t * 24, this.bb) : null;
  }
  recordBatchesLength() {
    const t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  customMetadata(t, e) {
    const n = this.bb.__offset(this.bb_pos, 12);
    return n ? (e || new $()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFooter(t) {
    t.startObject(5);
  }
  static addVersion(t, e) {
    t.addFieldInt16(0, e, me.V1);
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
class T {
  constructor(t = [], e, n) {
    this.fields = t || [], this.metadata = e || /* @__PURE__ */ new Map(), n || (n = ji(t)), this.dictionaries = n;
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
  select(t) {
    const e = new Set(t), n = this.fields.filter((r) => e.has(r.name));
    return new T(n, this.metadata);
  }
  selectAt(t) {
    const e = t.map((n) => this.fields[n]).filter(Boolean);
    return new T(e, this.metadata);
  }
  assign(...t) {
    const e = t[0] instanceof T ? t[0] : Array.isArray(t[0]) ? new T(t[0]) : new T(t), n = [...this.fields], r = ke(ke(/* @__PURE__ */ new Map(), this.metadata), e.metadata), s = e.fields.filter((a) => {
      const c = n.findIndex((u) => u.name === a.name);
      return ~c ? (n[c] = a.clone({
        metadata: ke(ke(/* @__PURE__ */ new Map(), n[c].metadata), a.metadata)
      })) && !1 : !0;
    }), o = ji(s, /* @__PURE__ */ new Map());
    return new T([...n, ...s], r, new Map([...this.dictionaries, ...o]));
  }
}
T.prototype.fields = null;
T.prototype.metadata = null;
T.prototype.dictionaries = null;
class C {
  static new(...t) {
    let [e, n, r, s] = t;
    return t[0] && typeof t[0] == "object" && ({ name: e } = t[0], n === void 0 && (n = t[0].type), r === void 0 && (r = t[0].nullable), s === void 0 && (s = t[0].metadata)), new C(`${e}`, n, r, s);
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
    return !t[0] || typeof t[0] != "object" ? [e = this.name, n = this.type, r = this.nullable, s = this.metadata] = t : { name: e = this.name, type: n = this.type, nullable: r = this.nullable, metadata: s = this.metadata } = t[0], C.new(e, n, r, s);
  }
}
C.prototype.type = null;
C.prototype.name = null;
C.prototype.nullable = null;
C.prototype.metadata = null;
function ke(i, t) {
  return new Map([...i || /* @__PURE__ */ new Map(), ...t || /* @__PURE__ */ new Map()]);
}
function ji(i, t = /* @__PURE__ */ new Map()) {
  for (let e = -1, n = i.length; ++e < n; ) {
    const s = i[e].type;
    if (f.isDictionary(s)) {
      if (!t.has(s.id))
        t.set(s.id, s.dictionary);
      else if (t.get(s.id) !== s.dictionary)
        throw new Error("Cannot create Schema containing two different dictionaries with the same Id");
    }
    s.children && s.children.length > 0 && ji(s.children, t);
  }
  return t;
}
var ma = Si, ba = Kt;
class rn {
  static decode(t) {
    t = new ba(N(t));
    const e = et.getRootAsFooter(t), n = T.decode(e.schema());
    return new ga(n, e);
  }
  static encode(t) {
    const e = new ma(), n = T.encode(e, t.schema);
    et.startRecordBatchesVector(e, t.numRecordBatches);
    for (const o of [...t.recordBatches()].slice().reverse())
      _e.encode(e, o);
    const r = e.endVector();
    et.startDictionariesVector(e, t.numDictionaries);
    for (const o of [...t.dictionaryBatches()].slice().reverse())
      _e.encode(e, o);
    const s = e.endVector();
    return et.startFooter(e), et.addSchema(e, n), et.addVersion(e, lt.V4), et.addRecordBatches(e, r), et.addDictionaries(e, s), et.finishFooterBuffer(e, et.endFooter(e)), e.asUint8Array();
  }
  get numRecordBatches() {
    return this._recordBatches.length;
  }
  get numDictionaries() {
    return this._dictionaryBatches.length;
  }
  constructor(t, e = lt.V4, n, r) {
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
class ga extends rn {
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
        return _e.decode(e);
    }
    return null;
  }
  getDictionaryBatch(t) {
    if (t >= 0 && t < this.numDictionaries) {
      const e = this._footer.dictionaries(t);
      if (e)
        return _e.decode(e);
    }
    return null;
  }
}
class _e {
  static decode(t) {
    return new _e(t.metaDataLength(), t.bodyLength(), t.offset());
  }
  static encode(t, e) {
    const { metaDataLength: n } = e, r = BigInt(e.offset), s = BigInt(e.bodyLength);
    return zi.createBlock(t, r, n, s);
  }
  constructor(t, e, n) {
    this.metaDataLength = t, this.offset = yt(n), this.bodyLength = yt(e);
  }
}
const k = Object.freeze({ done: !0, value: void 0 });
class wn {
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
class is {
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
class _a extends is {
  constructor() {
    super(), this._values = [], this.resolvers = [], this._closedPromise = new Promise((t) => this._closedPromiseResolve = t);
  }
  get closed() {
    return this._closedPromise;
  }
  cancel(t) {
    return p(this, void 0, void 0, function* () {
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
        t.shift().resolve(k);
      this._closedPromiseResolve(), this._closedPromiseResolve = void 0;
    }
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  toDOMStream(t) {
    return rt.toDOMStream(this._closedPromiseResolve || this._error ? this : this._values, t);
  }
  toNodeStream(t) {
    return rt.toNodeStream(this._closedPromiseResolve || this._error ? this : this._values, t);
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.abort(t), k;
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.close(), k;
    });
  }
  read(t) {
    return p(this, void 0, void 0, function* () {
      return (yield this.next(t, "read")).value;
    });
  }
  peek(t) {
    return p(this, void 0, void 0, function* () {
      return (yield this.next(t, "peek")).value;
    });
  }
  next(...t) {
    return this._values.length > 0 ? Promise.resolve({ done: !1, value: this._values.shift() }) : this._error ? Promise.reject({ done: !0, value: this._error.error }) : this._closedPromiseResolve ? new Promise((e, n) => {
      this.resolvers.push({ resolve: e, reject: n });
    }) : Promise.resolve(k);
  }
  _ensureOpen() {
    if (this._closedPromiseResolve)
      return !0;
    throw new Error("AsyncQueue is closed");
  }
}
class va extends _a {
  write(t) {
    if ((t = N(t)).byteLength > 0)
      return super.write(t);
  }
  toString(t = !1) {
    return t ? Ri(this.toUint8Array(!0)) : this.toUint8Array(!1).then(Ri);
  }
  toUint8Array(t = !1) {
    return t ? Nt(this._values)[0] : (() => p(this, void 0, void 0, function* () {
      var e, n, r, s;
      const o = [];
      let a = 0;
      try {
        for (var c = !0, u = le(this), d; d = yield u.next(), e = d.done, !e; ) {
          s = d.value, c = !1;
          try {
            const h = s;
            o.push(h), a += h.byteLength;
          } finally {
            c = !0;
          }
        }
      } catch (h) {
        n = { error: h };
      } finally {
        try {
          !c && !e && (r = u.return) && (yield r.call(u));
        } finally {
          if (n)
            throw n.error;
        }
      }
      return Nt(o, a)[0];
    }))();
  }
}
class di {
  constructor(t) {
    t && (this.source = new wa(rt.fromIterable(t)));
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
class ve {
  constructor(t) {
    t instanceof ve ? this.source = t.source : t instanceof va ? this.source = new Xt(rt.fromAsyncIterable(t)) : zn(t) ? this.source = new Xt(rt.fromNodeStream(t)) : Yi(t) ? this.source = new Xt(rt.fromDOMStream(t)) : Cn(t) ? this.source = new Xt(rt.fromDOMStream(t.body)) : wi(t) ? this.source = new Xt(rt.fromIterable(t)) : Fe(t) ? this.source = new Xt(rt.fromAsyncIterable(t)) : Wi(t) && (this.source = new Xt(rt.fromAsyncIterable(t)));
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
class wa {
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
    return Object.create(this.source.throw && this.source.throw(t) || k);
  }
  return(t) {
    return Object.create(this.source.return && this.source.return(t) || k);
  }
}
class Xt {
  constructor(t) {
    this.source = t, this._closedPromise = new Promise((e) => this._closedPromiseResolve = e);
  }
  cancel(t) {
    return p(this, void 0, void 0, function* () {
      yield this.return(t);
    });
  }
  get closed() {
    return this._closedPromise;
  }
  read(t) {
    return p(this, void 0, void 0, function* () {
      return (yield this.next(t, "read")).value;
    });
  }
  peek(t) {
    return p(this, void 0, void 0, function* () {
      return (yield this.next(t, "peek")).value;
    });
  }
  next(t, e = "read") {
    return p(this, void 0, void 0, function* () {
      return yield this.source.next({ cmd: e, size: t });
    });
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      const e = this.source.throw && (yield this.source.throw(t)) || k;
      return this._closedPromiseResolve && this._closedPromiseResolve(), this._closedPromiseResolve = void 0, Object.create(e);
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      const e = this.source.return && (yield this.source.return(t)) || k;
      return this._closedPromiseResolve && this._closedPromiseResolve(), this._closedPromiseResolve = void 0, Object.create(e);
    });
  }
}
class In extends di {
  constructor(t, e) {
    super(), this.position = 0, this.buffer = N(t), this.size = e === void 0 ? this.buffer.byteLength : e;
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
class hi extends ve {
  constructor(t, e) {
    super(), this.position = 0, this._handle = t, typeof e == "number" ? this.size = e : this._pending = (() => p(this, void 0, void 0, function* () {
      this.size = (yield t.stat()).size, delete this._pending;
    }))();
  }
  readInt32(t) {
    return p(this, void 0, void 0, function* () {
      const { buffer: e, byteOffset: n } = yield this.readAt(t, 4);
      return new DataView(e, n).getInt32(0, !0);
    });
  }
  seek(t) {
    return p(this, void 0, void 0, function* () {
      return this._pending && (yield this._pending), this.position = Math.min(t, this.size), t < this.size;
    });
  }
  read(t) {
    return p(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: e, size: n, position: r } = this;
      if (e && r < n) {
        typeof t != "number" && (t = Number.POSITIVE_INFINITY);
        let s = r, o = 0, a = 0;
        const c = Math.min(n, s + Math.min(n - s, t)), u = new Uint8Array(Math.max(0, (this.position = c) - s));
        for (; (s += a) < c && (o += a) < u.byteLength; )
          ({ bytesRead: a } = yield e.read(u, o, u.byteLength - o, s));
        return u;
      }
      return null;
    });
  }
  readAt(t, e) {
    return p(this, void 0, void 0, function* () {
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
    return p(this, void 0, void 0, function* () {
      const t = this._handle;
      this._handle = null, t && (yield t.close());
    });
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.close(), { done: !0, value: t };
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.close(), { done: !0, value: t };
    });
  }
}
const Ia = 1 << 16;
function ce(i) {
  return i < 0 && (i = 4294967295 + i + 1), `0x${i.toString(16)}`;
}
const we = 8, sn = [
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
class ns {
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
    return r = e[2] * n[3], s += r, r = e[3] * n[2] >>> 0, s += r, this.buffer[0] += s << 16, this.buffer[1] = s >>> 0 < r ? Ia : 0, this.buffer[1] += s >>> 16, this.buffer[1] += e[1] * n[3] + e[2] * n[2] + e[3] * n[1], this.buffer[1] += e[0] * n[3] + e[1] * n[2] + e[2] * n[1] + e[3] * n[0] << 16, this;
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
    return `${ce(this.buffer[1])} ${ce(this.buffer[0])}`;
  }
}
class M extends ns {
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  static from(t, e = new Uint32Array(2)) {
    return M.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  static fromNumber(t, e = new Uint32Array(2)) {
    return M.fromString(t.toString(), e);
  }
  static fromString(t, e = new Uint32Array(2)) {
    const n = t.length, r = new M(e);
    for (let s = 0; s < n; ) {
      const o = we < n - s ? we : n - s, a = new M(new Uint32Array([Number.parseInt(t.slice(s, s + o), 10), 0])), c = new M(new Uint32Array([sn[o], 0]));
      r.times(c), r.plus(a), s += o;
    }
    return r;
  }
  static convertArray(t) {
    const e = new Uint32Array(t.length * 2);
    for (let n = -1, r = t.length; ++n < r; )
      M.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 2 * n * 4, 2));
    return e;
  }
  static multiply(t, e) {
    return new M(new Uint32Array(t.buffer)).times(e);
  }
  static add(t, e) {
    return new M(new Uint32Array(t.buffer)).plus(e);
  }
}
class Z extends ns {
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
  static from(t, e = new Uint32Array(2)) {
    return Z.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  static fromNumber(t, e = new Uint32Array(2)) {
    return Z.fromString(t.toString(), e);
  }
  static fromString(t, e = new Uint32Array(2)) {
    const n = t.startsWith("-"), r = t.length, s = new Z(e);
    for (let o = n ? 1 : 0; o < r; ) {
      const a = we < r - o ? we : r - o, c = new Z(new Uint32Array([Number.parseInt(t.slice(o, o + a), 10), 0])), u = new Z(new Uint32Array([sn[a], 0]));
      s.times(u), s.plus(c), o += a;
    }
    return n ? s.negate() : s;
  }
  static convertArray(t) {
    const e = new Uint32Array(t.length * 2);
    for (let n = -1, r = t.length; ++n < r; )
      Z.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 2 * n * 4, 2));
    return e;
  }
  static multiply(t, e) {
    return new Z(new Uint32Array(t.buffer)).times(e);
  }
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
    const e = new M(new Uint32Array([this.buffer[3], 0])), n = new M(new Uint32Array([this.buffer[2], 0])), r = new M(new Uint32Array([this.buffer[1], 0])), s = new M(new Uint32Array([this.buffer[0], 0])), o = new M(new Uint32Array([t.buffer[3], 0])), a = new M(new Uint32Array([t.buffer[2], 0])), c = new M(new Uint32Array([t.buffer[1], 0])), u = new M(new Uint32Array([t.buffer[0], 0]));
    let d = M.multiply(s, u);
    this.buffer[0] = d.low();
    const h = new M(new Uint32Array([d.high(), 0]));
    return d = M.multiply(r, u), h.plus(d), d = M.multiply(s, c), h.plus(d), this.buffer[1] = h.low(), this.buffer[3] = h.lessThan(d) ? 1 : 0, this.buffer[2] = h.high(), new M(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2)).plus(M.multiply(n, u)).plus(M.multiply(r, c)).plus(M.multiply(s, a)), this.buffer[3] += M.multiply(e, u).plus(M.multiply(n, c)).plus(M.multiply(r, a)).plus(M.multiply(s, o)).low(), this;
  }
  plus(t) {
    const e = new Uint32Array(4);
    return e[3] = this.buffer[3] + t.buffer[3] >>> 0, e[2] = this.buffer[2] + t.buffer[2] >>> 0, e[1] = this.buffer[1] + t.buffer[1] >>> 0, e[0] = this.buffer[0] + t.buffer[0] >>> 0, e[0] < this.buffer[0] >>> 0 && ++e[1], e[1] < this.buffer[1] >>> 0 && ++e[2], e[2] < this.buffer[2] >>> 0 && ++e[3], this.buffer[3] = e[3], this.buffer[2] = e[2], this.buffer[1] = e[1], this.buffer[0] = e[0], this;
  }
  hex() {
    return `${ce(this.buffer[3])} ${ce(this.buffer[2])} ${ce(this.buffer[1])} ${ce(this.buffer[0])}`;
  }
  static multiply(t, e) {
    return new gt(new Uint32Array(t.buffer)).times(e);
  }
  static add(t, e) {
    return new gt(new Uint32Array(t.buffer)).plus(e);
  }
  static from(t, e = new Uint32Array(4)) {
    return gt.fromString(typeof t == "string" ? t : t.toString(), e);
  }
  static fromNumber(t, e = new Uint32Array(4)) {
    return gt.fromString(t.toString(), e);
  }
  static fromString(t, e = new Uint32Array(4)) {
    const n = t.startsWith("-"), r = t.length, s = new gt(e);
    for (let o = n ? 1 : 0; o < r; ) {
      const a = we < r - o ? we : r - o, c = new gt(new Uint32Array([Number.parseInt(t.slice(o, o + a), 10), 0, 0, 0])), u = new gt(new Uint32Array([sn[a], 0, 0, 0]));
      s.times(u), s.plus(c), o += a;
    }
    return n ? s.negate() : s;
  }
  static convertArray(t) {
    const e = new Uint32Array(t.length * 4);
    for (let n = -1, r = t.length; ++n < r; )
      gt.from(t[n], new Uint32Array(e.buffer, e.byteOffset + 4 * 4 * n, 4));
    return e;
  }
}
class rs extends O {
  constructor(t, e, n, r) {
    super(), this.nodesIndex = -1, this.buffersIndex = -1, this.bytes = t, this.nodes = e, this.buffers = n, this.dictionaries = r;
  }
  visit(t) {
    return super.visit(t instanceof C ? t.type : t);
  }
  visitNull(t, { length: e } = this.nextFieldNode()) {
    return F({ type: t, length: e });
  }
  visitBool(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitInt(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitFloat(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitUtf8(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitBinary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), data: this.readData(t) });
  }
  visitFixedSizeBinary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitDate(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitTimestamp(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitTime(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitDecimal(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitList(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), child: this.visit(t.children[0]) });
  }
  visitStruct(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), children: this.visitMany(t.children) });
  }
  visitUnion(t) {
    return t.mode === pt.Sparse ? this.visitSparseUnion(t) : this.visitDenseUnion(t);
  }
  visitDenseUnion(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), typeIds: this.readTypeIds(t), valueOffsets: this.readOffsets(t), children: this.visitMany(t.children) });
  }
  visitSparseUnion(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), typeIds: this.readTypeIds(t), children: this.visitMany(t.children) });
  }
  visitDictionary(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t.indices), dictionary: this.readDictionary(t) });
  }
  visitInterval(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), data: this.readData(t) });
  }
  visitFixedSizeList(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), child: this.visit(t.children[0]) });
  }
  visitMap(t, { length: e, nullCount: n } = this.nextFieldNode()) {
    return F({ type: t, length: e, nullCount: n, nullBitmap: this.readNullBitmap(t, n), valueOffsets: this.readOffsets(t), child: this.visit(t.children[0]) });
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
class Sa extends rs {
  constructor(t, e, n, r) {
    super(new Uint8Array(0), e, n, r), this.sources = t;
  }
  readNullBitmap(t, e, { offset: n } = this.nextBufferRange()) {
    return e <= 0 ? new Uint8Array(0) : Ci(this.sources[n]);
  }
  readOffsets(t, { offset: e } = this.nextBufferRange()) {
    return R(Uint8Array, R(Int32Array, this.sources[e]));
  }
  readTypeIds(t, { offset: e } = this.nextBufferRange()) {
    return R(Uint8Array, R(t.ArrayType, this.sources[e]));
  }
  readData(t, { offset: e } = this.nextBufferRange()) {
    const { sources: n } = this;
    return f.isTimestamp(t) || (f.isInt(t) || f.isTime(t)) && t.bitWidth === 64 || f.isDate(t) && t.unit === Vt.MILLISECOND ? R(Uint8Array, Z.convertArray(n[e])) : f.isDecimal(t) ? R(Uint8Array, gt.convertArray(n[e])) : f.isBinary(t) || f.isFixedSizeBinary(t) ? Ba(n[e]) : f.isBool(t) ? Ci(n[e]) : f.isUtf8(t) ? $i(n[e].join("")) : R(Uint8Array, R(t.ArrayType, n[e].map((r) => +r)));
  }
}
function Ba(i) {
  const t = i.join(""), e = new Uint8Array(t.length / 2);
  for (let n = 0; n < t.length; n += 2)
    e[n >> 1] = Number.parseInt(t.slice(n, n + 2), 16);
  return e;
}
class g extends O {
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
function tt(i, t) {
  return t instanceof i.constructor;
}
function Re(i, t) {
  return i === t || tt(i, t);
}
function jt(i, t) {
  return i === t || tt(i, t) && i.bitWidth === t.bitWidth && i.isSigned === t.isSigned;
}
function Bi(i, t) {
  return i === t || tt(i, t) && i.precision === t.precision;
}
function Aa(i, t) {
  return i === t || tt(i, t) && i.byteWidth === t.byteWidth;
}
function on(i, t) {
  return i === t || tt(i, t) && i.unit === t.unit;
}
function xe(i, t) {
  return i === t || tt(i, t) && i.unit === t.unit && i.timezone === t.timezone;
}
function Ee(i, t) {
  return i === t || tt(i, t) && i.unit === t.unit && i.bitWidth === t.bitWidth;
}
function Fa(i, t) {
  return i === t || tt(i, t) && i.children.length === t.children.length && Gt.compareManyFields(i.children, t.children);
}
function Oa(i, t) {
  return i === t || tt(i, t) && i.children.length === t.children.length && Gt.compareManyFields(i.children, t.children);
}
function an(i, t) {
  return i === t || tt(i, t) && i.mode === t.mode && i.typeIds.every((e, n) => e === t.typeIds[n]) && Gt.compareManyFields(i.children, t.children);
}
function Da(i, t) {
  return i === t || tt(i, t) && i.id === t.id && i.isOrdered === t.isOrdered && Gt.visit(i.indices, t.indices) && Gt.visit(i.dictionary, t.dictionary);
}
function cn(i, t) {
  return i === t || tt(i, t) && i.unit === t.unit;
}
function Na(i, t) {
  return i === t || tt(i, t) && i.listSize === t.listSize && i.children.length === t.children.length && Gt.compareManyFields(i.children, t.children);
}
function Ta(i, t) {
  return i === t || tt(i, t) && i.keysSorted === t.keysSorted && i.children.length === t.children.length && Gt.compareManyFields(i.children, t.children);
}
g.prototype.visitNull = Re;
g.prototype.visitBool = Re;
g.prototype.visitInt = jt;
g.prototype.visitInt8 = jt;
g.prototype.visitInt16 = jt;
g.prototype.visitInt32 = jt;
g.prototype.visitInt64 = jt;
g.prototype.visitUint8 = jt;
g.prototype.visitUint16 = jt;
g.prototype.visitUint32 = jt;
g.prototype.visitUint64 = jt;
g.prototype.visitFloat = Bi;
g.prototype.visitFloat16 = Bi;
g.prototype.visitFloat32 = Bi;
g.prototype.visitFloat64 = Bi;
g.prototype.visitUtf8 = Re;
g.prototype.visitBinary = Re;
g.prototype.visitFixedSizeBinary = Aa;
g.prototype.visitDate = on;
g.prototype.visitDateDay = on;
g.prototype.visitDateMillisecond = on;
g.prototype.visitTimestamp = xe;
g.prototype.visitTimestampSecond = xe;
g.prototype.visitTimestampMillisecond = xe;
g.prototype.visitTimestampMicrosecond = xe;
g.prototype.visitTimestampNanosecond = xe;
g.prototype.visitTime = Ee;
g.prototype.visitTimeSecond = Ee;
g.prototype.visitTimeMillisecond = Ee;
g.prototype.visitTimeMicrosecond = Ee;
g.prototype.visitTimeNanosecond = Ee;
g.prototype.visitDecimal = Re;
g.prototype.visitList = Fa;
g.prototype.visitStruct = Oa;
g.prototype.visitUnion = an;
g.prototype.visitDenseUnion = an;
g.prototype.visitSparseUnion = an;
g.prototype.visitDictionary = Da;
g.prototype.visitInterval = cn;
g.prototype.visitIntervalDayTime = cn;
g.prototype.visitIntervalYearMonth = cn;
g.prototype.visitFixedSizeList = Na;
g.prototype.visitMap = Ta;
const Gt = new g();
function Ma(i, t) {
  return Gt.compareSchemas(i, t);
}
function Mi(i, t) {
  return La(i, t.map((e) => e.data.concat()));
}
function La(i, t) {
  const e = [...i.fields], n = [], r = { numBatches: t.reduce((h, A) => Math.max(h, A.length), 0) };
  let s = 0, o = 0, a = -1;
  const c = t.length;
  let u, d = [];
  for (; r.numBatches-- > 0; ) {
    for (o = Number.POSITIVE_INFINITY, a = -1; ++a < c; )
      d[a] = u = t[a].shift(), o = Math.min(o, u ? u.length : o);
    Number.isFinite(o) && (d = Ua(e, o, d, t, r), o > 0 && (n[s++] = F({
      type: new K(e),
      length: o,
      nullCount: 0,
      children: d.slice()
    })));
  }
  return [
    i = i.assign(e),
    n.map((h) => new J(i, h))
  ];
}
function Ua(i, t, e, n, r) {
  var s;
  const o = (t + 63 & -64) >> 3;
  for (let a = -1, c = n.length; ++a < c; ) {
    const u = e[a], d = u == null ? void 0 : u.length;
    if (d >= t)
      d === t ? e[a] = u : (e[a] = u.slice(0, t), r.numBatches = Math.max(r.numBatches, n[a].unshift(u.slice(t, d - t))));
    else {
      const h = i[a];
      i[a] = h.clone({ nullable: !0 }), e[a] = (s = u == null ? void 0 : u._changeLengthAndBackfillNullBitmap(t)) !== null && s !== void 0 ? s : F({
        type: h.type,
        length: t,
        nullCount: t,
        nullBitmap: new Uint8Array(o)
      });
    }
  }
  return e;
}
var ss;
class ct {
  constructor(...t) {
    var e, n;
    if (t.length === 0)
      return this.batches = [], this.schema = new T([]), this._offsets = [0], this;
    let r, s;
    t[0] instanceof T && (r = t.shift()), t[t.length - 1] instanceof Uint32Array && (s = t.pop());
    const o = (c) => {
      if (c) {
        if (c instanceof J)
          return [c];
        if (c instanceof ct)
          return c.batches;
        if (c instanceof E) {
          if (c.type instanceof K)
            return [new J(new T(c.type.children), c)];
        } else {
          if (Array.isArray(c))
            return c.flatMap((u) => o(u));
          if (typeof c[Symbol.iterator] == "function")
            return [...c].flatMap((u) => o(u));
          if (typeof c == "object") {
            const u = Object.keys(c), d = u.map((j) => new U([c[j]])), h = new T(u.map((j, nt) => new C(String(j), d[nt].type))), [, A] = Mi(h, d);
            return A.length === 0 ? [new J(c)] : A;
          }
        }
      }
      return [];
    }, a = t.flatMap((c) => o(c));
    if (r = (n = r != null ? r : (e = a[0]) === null || e === void 0 ? void 0 : e.schema) !== null && n !== void 0 ? n : new T([]), !(r instanceof T))
      throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
    for (const c of a) {
      if (!(c instanceof J))
        throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
      if (!Ma(r, c.schema))
        throw new TypeError("Table and inner RecordBatch schemas must be equivalent.");
    }
    this.schema = r, this.batches = a, this._offsets = s != null ? s : Jr(this.data);
  }
  get data() {
    return this.batches.map(({ data: t }) => t);
  }
  get numCols() {
    return this.schema.fields.length;
  }
  get numRows() {
    return this.data.reduce((t, e) => t + e.length, 0);
  }
  get nullCount() {
    return this._nullCount === -1 && (this._nullCount = Yr(this.data)), this._nullCount;
  }
  isValid(t) {
    return !1;
  }
  get(t) {
    return null;
  }
  set(t, e) {
  }
  indexOf(t, e) {
    return -1;
  }
  getByteLength(t) {
    return 0;
  }
  [Symbol.iterator]() {
    return this.batches.length > 0 ? nn.visit(new U(this.data)) : new Array(0)[Symbol.iterator]();
  }
  toArray() {
    return [...this];
  }
  toString() {
    return `[
  ${this.toArray().join(`,
  `)}
]`;
  }
  concat(...t) {
    const e = this.schema, n = this.data.concat(t.flatMap(({ data: r }) => r));
    return new ct(e, n.map((r) => new J(e, r)));
  }
  slice(t, e) {
    const n = this.schema;
    [t, e] = $r({ length: this.numRows }, t, e);
    const r = Hr(this.data, this._offsets, t, e);
    return new ct(n, r.map((s) => new J(n, s)));
  }
  getChild(t) {
    return this.getChildAt(this.schema.fields.findIndex((e) => e.name === t));
  }
  getChildAt(t) {
    if (t > -1 && t < this.schema.fields.length) {
      const e = this.data.map((n) => n.children[t]);
      if (e.length === 0) {
        const { type: n } = this.schema.fields[t], r = F({ type: n, length: 0, nullCount: 0 });
        e.push(r._changeLengthAndBackfillNullBitmap(this.numRows));
      }
      return new U(e);
    }
    return null;
  }
  setChild(t, e) {
    var n;
    return this.setChildAt((n = this.schema.fields) === null || n === void 0 ? void 0 : n.findIndex((r) => r.name === t), e);
  }
  setChildAt(t, e) {
    let n = this.schema, r = [...this.batches];
    if (t > -1 && t < this.numCols) {
      e || (e = new U([F({ type: new Jt(), length: this.numRows })]));
      const s = n.fields.slice(), o = s[t].clone({ type: e.type }), a = this.schema.fields.map((c, u) => this.getChildAt(u));
      [s[t], a[t]] = [o, e], [n, r] = Mi(n, a);
    }
    return new ct(n, r);
  }
  select(t) {
    const e = this.schema.fields.reduce((n, r, s) => n.set(r.name, s), /* @__PURE__ */ new Map());
    return this.selectAt(t.map((n) => e.get(n)).filter((n) => n > -1));
  }
  selectAt(t) {
    const e = this.schema.selectAt(t), n = this.batches.map((r) => r.selectAt(t));
    return new ct(e, n);
  }
  assign(t) {
    const e = this.schema.fields, [n, r] = t.schema.fields.reduce((a, c, u) => {
      const [d, h] = a, A = e.findIndex((j) => j.name === c.name);
      return ~A ? h[A] = u : d.push(u), a;
    }, [[], []]), s = this.schema.assign(t.schema), o = [
      ...e.map((a, c) => [c, r[c]]).map(([a, c]) => c === void 0 ? this.getChildAt(a) : t.getChildAt(c)),
      ...n.map((a) => t.getChildAt(a))
    ].filter(Boolean);
    return new ct(...Mi(s, o));
  }
}
ss = Symbol.toStringTag;
ct[ss] = ((i) => (i.schema = null, i.batches = [], i._offsets = new Uint32Array([0]), i._nullCount = -1, i[Symbol.isConcatSpreadable] = !0, i.isValid = pe(en), i.get = pe(Q.getVisitFn(l.Struct)), i.set = Kr(ut.getVisitFn(l.Struct)), i.indexOf = Gr(ri.getVisitFn(l.Struct)), i.getByteLength = pe(Tt.getVisitFn(l.Struct)), "Table"))(ct.prototype);
var os;
class J {
  constructor(...t) {
    switch (t.length) {
      case 2: {
        if ([this.schema] = t, !(this.schema instanceof T))
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        if ([
          ,
          this.data = F({
            nullCount: 0,
            type: new K(this.schema.fields),
            children: this.schema.fields.map((e) => F({ type: e.type, nullCount: 0 }))
          })
        ] = t, !(this.data instanceof E))
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        [this.schema, this.data] = Sn(this.schema, this.data.children);
        break;
      }
      case 1: {
        const [e] = t, { fields: n, children: r, length: s } = Object.keys(e).reduce((c, u, d) => (c.children[d] = e[u], c.length = Math.max(c.length, e[u].length), c.fields[d] = C.new({ name: u, type: e[u].type, nullable: !0 }), c), {
          length: 0,
          fields: new Array(),
          children: new Array()
        }), o = new T(n), a = F({ type: new K(n), length: s, children: r, nullCount: 0 });
        [this.schema, this.data] = Sn(o, a.children, s);
        break;
      }
      default:
        throw new TypeError("RecordBatch constructor expects an Object mapping names to child Data, or a [Schema, Data] pair.");
    }
  }
  get dictionaries() {
    return this._dictionaries || (this._dictionaries = as(this.schema.fields, this.data.children));
  }
  get numCols() {
    return this.schema.fields.length;
  }
  get numRows() {
    return this.data.length;
  }
  get nullCount() {
    return this.data.nullCount;
  }
  isValid(t) {
    return this.data.getValid(t);
  }
  get(t) {
    return Q.visit(this.data, t);
  }
  set(t, e) {
    return ut.visit(this.data, t, e);
  }
  indexOf(t, e) {
    return ri.visit(this.data, t, e);
  }
  getByteLength(t) {
    return Tt.visit(this.data, t);
  }
  [Symbol.iterator]() {
    return nn.visit(new U([this.data]));
  }
  toArray() {
    return [...this];
  }
  concat(...t) {
    return new ct(this.schema, [this, ...t]);
  }
  slice(t, e) {
    const [n] = new U([this.data]).slice(t, e).data;
    return new J(this.schema, n);
  }
  getChild(t) {
    var e;
    return this.getChildAt((e = this.schema.fields) === null || e === void 0 ? void 0 : e.findIndex((n) => n.name === t));
  }
  getChildAt(t) {
    return t > -1 && t < this.schema.fields.length ? new U([this.data.children[t]]) : null;
  }
  setChild(t, e) {
    var n;
    return this.setChildAt((n = this.schema.fields) === null || n === void 0 ? void 0 : n.findIndex((r) => r.name === t), e);
  }
  setChildAt(t, e) {
    let n = this.schema, r = this.data;
    if (t > -1 && t < this.numCols) {
      e || (e = new U([F({ type: new Jt(), length: this.numRows })]));
      const s = n.fields.slice(), o = r.children.slice(), a = s[t].clone({ type: e.type });
      [s[t], o[t]] = [a, e.data[0]], n = new T(s, new Map(this.schema.metadata)), r = F({ type: new K(s), children: o });
    }
    return new J(n, r);
  }
  select(t) {
    const e = this.schema.select(t), n = new K(e.fields), r = [];
    for (const s of t) {
      const o = this.schema.fields.findIndex((a) => a.name === s);
      ~o && (r[o] = this.data.children[o]);
    }
    return new J(e, F({ type: n, length: this.numRows, children: r }));
  }
  selectAt(t) {
    const e = this.schema.selectAt(t), n = t.map((s) => this.data.children[s]).filter(Boolean), r = F({ type: new K(e.fields), length: this.numRows, children: n });
    return new J(e, r);
  }
}
os = Symbol.toStringTag;
J[os] = ((i) => (i._nullCount = -1, i[Symbol.isConcatSpreadable] = !0, "RecordBatch"))(J.prototype);
function Sn(i, t, e = t.reduce((n, r) => Math.max(n, r.length), 0)) {
  var n;
  const r = [...i.fields], s = [...t], o = (e + 63 & -64) >> 3;
  for (const [a, c] of i.fields.entries()) {
    const u = t[a];
    (!u || u.length !== e) && (r[a] = c.clone({ nullable: !0 }), s[a] = (n = u == null ? void 0 : u._changeLengthAndBackfillNullBitmap(e)) !== null && n !== void 0 ? n : F({
      type: c.type,
      length: e,
      nullCount: e,
      nullBitmap: new Uint8Array(o)
    }));
  }
  return [
    i.assign(r),
    F({ type: new K(r), length: e, children: s })
  ];
}
function as(i, t, e = /* @__PURE__ */ new Map()) {
  for (let n = -1, r = i.length; ++n < r; ) {
    const o = i[n].type, a = t[n];
    if (f.isDictionary(o)) {
      if (!e.has(o.id))
        a.dictionary && e.set(o.id, a.dictionary);
      else if (e.get(o.id) !== a.dictionary)
        throw new Error("Cannot create Schema containing two different dictionaries with the same Id");
    }
    o.children && o.children.length > 0 && as(o.children, a.children, e);
  }
  return e;
}
class cs extends J {
  constructor(t) {
    const e = t.fields.map((r) => F({ type: r.type })), n = F({ type: new K(t.fields), nullCount: 0, children: e });
    super(t, n);
  }
}
var fi;
(function(i) {
  i[i.BUFFER = 0] = "BUFFER";
})(fi || (fi = {}));
var pi;
(function(i) {
  i[i.LZ4_FRAME = 0] = "LZ4_FRAME", i[i.ZSTD = 1] = "ZSTD";
})(pi || (pi = {}));
class $t {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsBodyCompression(t, e) {
    return (e || new $t()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBodyCompression(t, e) {
    return t.setPosition(t.position() + x), (e || new $t()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  codec() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt8(this.bb_pos + t) : pi.LZ4_FRAME;
  }
  method() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt8(this.bb_pos + t) : fi.BUFFER;
  }
  static startBodyCompression(t) {
    t.startObject(2);
  }
  static addCodec(t, e) {
    t.addFieldInt8(0, e, pi.LZ4_FRAME);
  }
  static addMethod(t, e) {
    t.addFieldInt8(1, e, fi.BUFFER);
  }
  static endBodyCompression(t) {
    return t.endObject();
  }
  static createBodyCompression(t, e, n) {
    return $t.startBodyCompression(t), $t.addCodec(t, e), $t.addMethod(t, n), $t.endBodyCompression(t);
  }
}
class ls {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  length() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createBuffer(t, e, n) {
    return t.prep(8, 16), t.writeInt64(BigInt(n != null ? n : 0)), t.writeInt64(BigInt(e != null ? e : 0)), t.offset();
  }
}
class us {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  length() {
    return this.bb.readInt64(this.bb_pos);
  }
  nullCount() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createFieldNode(t, e, n) {
    return t.prep(8, 16), t.writeInt64(BigInt(n != null ? n : 0)), t.writeInt64(BigInt(e != null ? e : 0)), t.offset();
  }
}
class st {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsRecordBatch(t, e) {
    return (e || new st()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRecordBatch(t, e) {
    return t.setPosition(t.position() + x), (e || new st()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  length() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  nodes(t, e) {
    const n = this.bb.__offset(this.bb_pos, 6);
    return n ? (e || new us()).__init(this.bb.__vector(this.bb_pos + n) + t * 16, this.bb) : null;
  }
  nodesLength() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  buffers(t, e) {
    const n = this.bb.__offset(this.bb_pos, 8);
    return n ? (e || new ls()).__init(this.bb.__vector(this.bb_pos + n) + t * 16, this.bb) : null;
  }
  buffersLength() {
    const t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  compression(t) {
    const e = this.bb.__offset(this.bb_pos, 10);
    return e ? (t || new $t()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
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
}
class xt {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsDictionaryBatch(t, e) {
    return (e || new xt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDictionaryBatch(t, e) {
    return t.setPosition(t.position() + x), (e || new xt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  data(t) {
    const e = this.bb.__offset(this.bb_pos, 6);
    return e ? (t || new st()).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : null;
  }
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
}
var yi;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.Schema = 1] = "Schema", i[i.DictionaryBatch = 2] = "DictionaryBatch", i[i.RecordBatch = 3] = "RecordBatch", i[i.Tensor = 4] = "Tensor", i[i.SparseTensor = 5] = "SparseTensor";
})(yi || (yi = {}));
class W {
  constructor() {
    this.bb = null, this.bb_pos = 0;
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this;
  }
  static getRootAsMessage(t, e) {
    return (e || new W()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMessage(t, e) {
    return t.setPosition(t.position() + x), (e || new W()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    const t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt16(this.bb_pos + t) : me.V1;
  }
  headerType() {
    const t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : yi.NONE;
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
    return n ? (e || new $()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb) : null;
  }
  customMetadataLength() {
    const t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startMessage(t) {
    t.startObject(5);
  }
  static addVersion(t, e) {
    t.addFieldInt16(0, e, me.V1);
  }
  static addHeaderType(t, e) {
    t.addFieldInt8(1, e, yi.NONE);
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
    return W.startMessage(t), W.addVersion(t, e), W.addHeaderType(t, n), W.addHeader(t, r), W.addBodyLength(t, s), W.addCustomMetadata(t, o), W.endMessage(t);
  }
}
class Ra extends O {
  visit(t, e) {
    return t == null || e == null ? void 0 : super.visit(t, e);
  }
  visitNull(t, e) {
    return ie.startNull(e), ie.endNull(e);
  }
  visitInt(t, e) {
    return it.startInt(e), it.addBitWidth(e, t.bitWidth), it.addIsSigned(e, t.isSigned), it.endInt(e);
  }
  visitFloat(t, e) {
    return Bt.startFloatingPoint(e), Bt.addPrecision(e, t.precision), Bt.endFloatingPoint(e);
  }
  visitBinary(t, e) {
    return Qt.startBinary(e), Qt.endBinary(e);
  }
  visitBool(t, e) {
    return te.startBool(e), te.endBool(e);
  }
  visitUtf8(t, e) {
    return re.startUtf8(e), re.endUtf8(e);
  }
  visitDecimal(t, e) {
    return q.startDecimal(e), q.addScale(e, t.scale), q.addPrecision(e, t.precision), q.addBitWidth(e, t.bitWidth), q.endDecimal(e);
  }
  visitDate(t, e) {
    return wt.startDate(e), wt.addUnit(e, t.unit), wt.endDate(e);
  }
  visitTime(t, e) {
    return ot.startTime(e), ot.addUnit(e, t.unit), ot.addBitWidth(e, t.bitWidth), ot.endTime(e);
  }
  visitTimestamp(t, e) {
    const n = t.timezone && e.createString(t.timezone) || void 0;
    return at.startTimestamp(e), at.addUnit(e, t.unit), n !== void 0 && at.addTimezone(e, n), at.endTimestamp(e);
  }
  visitInterval(t, e) {
    return At.startInterval(e), At.addUnit(e, t.unit), At.endInterval(e);
  }
  visitList(t, e) {
    return ee.startList(e), ee.endList(e);
  }
  visitStruct(t, e) {
    return ne.startStruct_(e), ne.endStruct_(e);
  }
  visitUnion(t, e) {
    X.startTypeIdsVector(e, t.typeIds.length);
    const n = X.createTypeIdsVector(e, t.typeIds);
    return X.startUnion(e), X.addMode(e, t.mode), X.addTypeIds(e, n), X.endUnion(e);
  }
  visitDictionary(t, e) {
    const n = this.visit(t.indices, e);
    return Rt.startDictionaryEncoding(e), Rt.addId(e, BigInt(t.id)), Rt.addIsOrdered(e, t.isOrdered), n !== void 0 && Rt.addIndexType(e, n), Rt.endDictionaryEncoding(e);
  }
  visitFixedSizeBinary(t, e) {
    return It.startFixedSizeBinary(e), It.addByteWidth(e, t.byteWidth), It.endFixedSizeBinary(e);
  }
  visitFixedSizeList(t, e) {
    return St.startFixedSizeList(e), St.addListSize(e, t.listSize), St.endFixedSizeList(e);
  }
  visitMap(t, e) {
    return Ft.startMap(e), Ft.addKeysSorted(e, t.keysSorted), Ft.endMap(e);
  }
}
const Li = new Ra();
function xa(i, t = /* @__PURE__ */ new Map()) {
  return new T(Ca(i, t), Pe(i.customMetadata), t);
}
function ds(i) {
  return new mt(i.count, hs(i.columns), fs(i.columns));
}
function Ea(i) {
  return new zt(ds(i.data), i.id, i.isDelta);
}
function Ca(i, t) {
  return (i.fields || []).filter(Boolean).map((e) => C.fromJSON(e, t));
}
function Bn(i, t) {
  return (i.children || []).filter(Boolean).map((e) => C.fromJSON(e, t));
}
function hs(i) {
  return (i || []).reduce((t, e) => [
    ...t,
    new Se(e.count, Va(e.VALIDITY)),
    ...hs(e.children)
  ], []);
}
function fs(i, t = []) {
  for (let e = -1, n = (i || []).length; ++e < n; ) {
    const r = i[e];
    r.VALIDITY && t.push(new Et(t.length, r.VALIDITY.length)), r.TYPE && t.push(new Et(t.length, r.TYPE.length)), r.OFFSET && t.push(new Et(t.length, r.OFFSET.length)), r.DATA && t.push(new Et(t.length, r.DATA.length)), t = fs(r.children, t);
  }
  return t;
}
function Va(i) {
  return (i || []).reduce((t, e) => t + +(e === 0), 0);
}
function za(i, t) {
  let e, n, r, s, o, a;
  return !t || !(s = i.dictionary) ? (o = Fn(i, Bn(i, t)), r = new C(i.name, o, i.nullable, Pe(i.customMetadata))) : t.has(e = s.id) ? (n = (n = s.indexType) ? An(n) : new Ne(), a = new ye(t.get(e), n, e, s.isOrdered), r = new C(i.name, a, i.nullable, Pe(i.customMetadata))) : (n = (n = s.indexType) ? An(n) : new Ne(), t.set(e, o = Fn(i, Bn(i, t))), a = new ye(o, n, e, s.isOrdered), r = new C(i.name, a, i.nullable, Pe(i.customMetadata))), r || null;
}
function Pe(i) {
  return new Map(Object.entries(i || {}));
}
function An(i) {
  return new Ht(i.isSigned, i.bitWidth);
}
function Fn(i, t) {
  const e = i.type.name;
  switch (e) {
    case "NONE":
      return new Jt();
    case "null":
      return new Jt();
    case "binary":
      return new Je();
    case "utf8":
      return new He();
    case "bool":
      return new Ke();
    case "list":
      return new Qe((t || [])[0]);
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
      return new Te(G[n.precision]);
    }
    case "decimal": {
      const n = i.type;
      return new Ge(n.scale, n.precision, n.bitWidth);
    }
    case "date": {
      const n = i.type;
      return new Ze(Vt[n.unit]);
    }
    case "time": {
      const n = i.type;
      return new Me(D[n.unit], n.bitWidth);
    }
    case "timestamp": {
      const n = i.type;
      return new qe(D[n.unit], n.timezone);
    }
    case "interval": {
      const n = i.type;
      return new Xe(Yt[n.unit]);
    }
    case "union": {
      const n = i.type;
      return new ti(pt[n.mode], n.typeIds || [], t || []);
    }
    case "fixedsizebinary": {
      const n = i.type;
      return new ei(n.byteWidth);
    }
    case "fixedsizelist": {
      const n = i.type;
      return new ii(n.listSize, (t || [])[0]);
    }
    case "map": {
      const n = i.type;
      return new ni((t || [])[0], n.keysSorted);
    }
  }
  throw new Error(`Unrecognized type: "${e}"`);
}
var ka = Si, ja = Kt;
class ht {
  static fromJSON(t, e) {
    const n = new ht(0, lt.V4, e);
    return n._createHeader = Pa(t, e), n;
  }
  static decode(t) {
    t = new ja(N(t));
    const e = W.getRootAsMessage(t), n = e.bodyLength(), r = e.version(), s = e.headerType(), o = new ht(n, r, s);
    return o._createHeader = $a(e, s), o;
  }
  static encode(t) {
    const e = new ka();
    let n = -1;
    return t.isSchema() ? n = T.encode(e, t.header()) : t.isRecordBatch() ? n = mt.encode(e, t.header()) : t.isDictionaryBatch() && (n = zt.encode(e, t.header())), W.startMessage(e), W.addVersion(e, lt.V4), W.addHeader(e, n), W.addHeaderType(e, t.headerType), W.addBodyLength(e, BigInt(t.bodyLength)), W.finishMessageBuffer(e, W.endMessage(e)), e.asUint8Array();
  }
  static from(t, e = 0) {
    if (t instanceof T)
      return new ht(0, lt.V4, L.Schema, t);
    if (t instanceof mt)
      return new ht(e, lt.V4, L.RecordBatch, t);
    if (t instanceof zt)
      return new ht(e, lt.V4, L.DictionaryBatch, t);
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
    return this.headerType === L.Schema;
  }
  isRecordBatch() {
    return this.headerType === L.RecordBatch;
  }
  isDictionaryBatch() {
    return this.headerType === L.DictionaryBatch;
  }
  constructor(t, e, n, r) {
    this._version = e, this._headerType = n, this.body = new Uint8Array(0), r && (this._createHeader = () => r), this._bodyLength = yt(t);
  }
}
class mt {
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
    this._nodes = e, this._buffers = n, this._length = yt(t);
  }
}
class zt {
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
    this._data = t, this._isDelta = n, this._id = yt(e);
  }
}
class Et {
  constructor(t, e) {
    this.offset = yt(t), this.length = yt(e);
  }
}
class Se {
  constructor(t, e) {
    this.length = yt(t), this.nullCount = yt(e);
  }
}
function Pa(i, t) {
  return () => {
    switch (t) {
      case L.Schema:
        return T.fromJSON(i);
      case L.RecordBatch:
        return mt.fromJSON(i);
      case L.DictionaryBatch:
        return zt.fromJSON(i);
    }
    throw new Error(`Unrecognized Message type: { name: ${L[t]}, type: ${t} }`);
  };
}
function $a(i, t) {
  return () => {
    switch (t) {
      case L.Schema:
        return T.decode(i.header(new P()));
      case L.RecordBatch:
        return mt.decode(i.header(new st()), i.version());
      case L.DictionaryBatch:
        return zt.decode(i.header(new xt()), i.version());
    }
    throw new Error(`Unrecognized Message type: { name: ${L[t]}, type: ${t} }`);
  };
}
C.encode = tc;
C.decode = Xa;
C.fromJSON = za;
T.encode = Qa;
T.decode = Wa;
T.fromJSON = xa;
mt.encode = ec;
mt.decode = Ya;
mt.fromJSON = ds;
zt.encode = ic;
zt.decode = Ja;
zt.fromJSON = Ea;
Se.encode = nc;
Se.decode = Ka;
Et.encode = rc;
Et.decode = Ha;
function Wa(i, t = /* @__PURE__ */ new Map()) {
  const e = qa(i, t);
  return new T(e, $e(i), t);
}
function Ya(i, t = lt.V4) {
  if (i.compression() !== null)
    throw new Error("Record batch compression not implemented");
  return new mt(i.length(), Ga(i), Za(i, t));
}
function Ja(i, t = lt.V4) {
  return new zt(mt.decode(i.data(), t), i.id(), i.isDelta());
}
function Ha(i) {
  return new Et(i.offset(), i.length());
}
function Ka(i) {
  return new Se(i.length(), i.nullCount());
}
function Ga(i) {
  const t = [];
  for (let e, n = -1, r = -1, s = i.nodesLength(); ++n < s; )
    (e = i.nodes(n)) && (t[++r] = Se.decode(e));
  return t;
}
function Za(i, t) {
  const e = [];
  for (let n, r = -1, s = -1, o = i.buffersLength(); ++r < o; )
    (n = i.buffers(r)) && (t < lt.V4 && (n.bb_pos += 8 * (r + 1)), e[++s] = Et.decode(n));
  return e;
}
function qa(i, t) {
  const e = [];
  for (let n, r = -1, s = -1, o = i.fieldsLength(); ++r < o; )
    (n = i.fields(r)) && (e[++s] = C.decode(n, t));
  return e;
}
function On(i, t) {
  const e = [];
  for (let n, r = -1, s = -1, o = i.childrenLength(); ++r < o; )
    (n = i.children(r)) && (e[++s] = C.decode(n, t));
  return e;
}
function Xa(i, t) {
  let e, n, r, s, o, a;
  return !t || !(a = i.dictionary()) ? (r = Nn(i, On(i, t)), n = new C(i.name(), r, i.nullable(), $e(i))) : t.has(e = yt(a.id())) ? (s = (s = a.indexType()) ? Dn(s) : new Ne(), o = new ye(t.get(e), s, e, a.isOrdered()), n = new C(i.name(), o, i.nullable(), $e(i))) : (s = (s = a.indexType()) ? Dn(s) : new Ne(), t.set(e, r = Nn(i, On(i, t))), o = new ye(r, s, e, a.isOrdered()), n = new C(i.name(), o, i.nullable(), $e(i))), n || null;
}
function $e(i) {
  const t = /* @__PURE__ */ new Map();
  if (i)
    for (let e, n, r = -1, s = Math.trunc(i.customMetadataLength()); ++r < s; )
      (e = i.customMetadata(r)) && (n = e.key()) != null && t.set(n, e.value());
  return t;
}
function Dn(i) {
  return new Ht(i.isSigned(), i.bitWidth());
}
function Nn(i, t) {
  const e = i.typeType();
  switch (e) {
    case V.NONE:
      return new Jt();
    case V.Null:
      return new Jt();
    case V.Binary:
      return new Je();
    case V.Utf8:
      return new He();
    case V.Bool:
      return new Ke();
    case V.List:
      return new Qe((t || [])[0]);
    case V.Struct_:
      return new K(t || []);
  }
  switch (e) {
    case V.Int: {
      const n = i.type(new it());
      return new Ht(n.isSigned(), n.bitWidth());
    }
    case V.FloatingPoint: {
      const n = i.type(new Bt());
      return new Te(n.precision());
    }
    case V.Decimal: {
      const n = i.type(new q());
      return new Ge(n.scale(), n.precision(), n.bitWidth());
    }
    case V.Date: {
      const n = i.type(new wt());
      return new Ze(n.unit());
    }
    case V.Time: {
      const n = i.type(new ot());
      return new Me(n.unit(), n.bitWidth());
    }
    case V.Timestamp: {
      const n = i.type(new at());
      return new qe(n.unit(), n.timezone());
    }
    case V.Interval: {
      const n = i.type(new At());
      return new Xe(n.unit());
    }
    case V.Union: {
      const n = i.type(new X());
      return new ti(n.mode(), n.typeIdsArray() || [], t || []);
    }
    case V.FixedSizeBinary: {
      const n = i.type(new It());
      return new ei(n.byteWidth());
    }
    case V.FixedSizeList: {
      const n = i.type(new St());
      return new ii(n.listSize(), (t || [])[0]);
    }
    case V.Map: {
      const n = i.type(new Ft());
      return new ni((t || [])[0], n.keysSorted());
    }
  }
  throw new Error(`Unrecognized type: "${V[e]}" (${e})`);
}
function Qa(i, t) {
  const e = t.fields.map((s) => C.encode(i, s));
  P.startFieldsVector(i, e.length);
  const n = P.createFieldsVector(i, e), r = t.metadata && t.metadata.size > 0 ? P.createCustomMetadataVector(i, [...t.metadata].map(([s, o]) => {
    const a = i.createString(`${s}`), c = i.createString(`${o}`);
    return $.startKeyValue(i), $.addKey(i, a), $.addValue(i, c), $.endKeyValue(i);
  })) : -1;
  return P.startSchema(i), P.addFields(i, n), P.addEndianness(i, sc ? be.Little : be.Big), r !== -1 && P.addCustomMetadata(i, r), P.endSchema(i);
}
function tc(i, t) {
  let e = -1, n = -1, r = -1;
  const s = t.type;
  let o = t.typeId;
  f.isDictionary(s) ? (o = s.dictionary.typeId, r = Li.visit(s, i), n = Li.visit(s.dictionary, i)) : n = Li.visit(s, i);
  const a = (s.children || []).map((d) => C.encode(i, d)), c = Y.createChildrenVector(i, a), u = t.metadata && t.metadata.size > 0 ? Y.createCustomMetadataVector(i, [...t.metadata].map(([d, h]) => {
    const A = i.createString(`${d}`), j = i.createString(`${h}`);
    return $.startKeyValue(i), $.addKey(i, A), $.addValue(i, j), $.endKeyValue(i);
  })) : -1;
  return t.name && (e = i.createString(t.name)), Y.startField(i), Y.addType(i, n), Y.addTypeType(i, o), Y.addChildren(i, c), Y.addNullable(i, !!t.nullable), e !== -1 && Y.addName(i, e), r !== -1 && Y.addDictionary(i, r), u !== -1 && Y.addCustomMetadata(i, u), Y.endField(i);
}
function ec(i, t) {
  const e = t.nodes || [], n = t.buffers || [];
  st.startNodesVector(i, e.length);
  for (const o of e.slice().reverse())
    Se.encode(i, o);
  const r = i.endVector();
  st.startBuffersVector(i, n.length);
  for (const o of n.slice().reverse())
    Et.encode(i, o);
  const s = i.endVector();
  return st.startRecordBatch(i), st.addLength(i, BigInt(t.length)), st.addNodes(i, r), st.addBuffers(i, s), st.endRecordBatch(i);
}
function ic(i, t) {
  const e = mt.encode(i, t.data);
  return xt.startDictionaryBatch(i), xt.addId(i, BigInt(t.id)), xt.addIsDelta(i, t.isDelta), xt.addData(i, e), xt.endDictionaryBatch(i);
}
function nc(i, t) {
  return us.createFieldNode(i, BigInt(t.length), BigInt(t.nullCount));
}
function rc(i, t) {
  return ls.createBuffer(i, BigInt(t.offset), BigInt(t.length));
}
const sc = (() => {
  const i = new ArrayBuffer(2);
  return new DataView(i).setInt16(0, 256, !0), new Int16Array(i)[0] === 256;
})(), ln = (i) => `Expected ${L[i]} Message in stream, but was null or length 0.`, un = (i) => `Header pointer of flatbuffer-encoded ${L[i]} Message is null or length 0.`, ps = (i, t) => `Expected to read ${i} metadata bytes, but only read ${t}.`, ys = (i, t) => `Expected to read ${i} bytes for message body, but only read ${t}.`;
class ms {
  constructor(t) {
    this.source = t instanceof di ? t : new di(t);
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let t;
    return (t = this.readMetadataLength()).done || t.value === -1 && (t = this.readMetadataLength()).done || (t = this.readMetadata(t.value)).done ? k : t;
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
      throw new Error(ln(t));
    return e.value;
  }
  readMessageBody(t) {
    if (t <= 0)
      return new Uint8Array(0);
    const e = N(this.source.read(t));
    if (e.byteLength < t)
      throw new Error(ys(t, e.byteLength));
    return e.byteOffset % 8 === 0 && e.byteOffset + e.byteLength <= e.buffer.byteLength ? e : e.slice();
  }
  readSchema(t = !1) {
    const e = L.Schema, n = this.readMessage(e), r = n == null ? void 0 : n.header();
    if (t && !r)
      throw new Error(un(e));
    return r;
  }
  readMetadataLength() {
    const t = this.source.read(Ai), e = t && new Kt(t), n = (e == null ? void 0 : e.readInt32(0)) || 0;
    return { done: n === 0, value: n };
  }
  readMetadata(t) {
    const e = this.source.read(t);
    if (!e)
      return k;
    if (e.byteLength < t)
      throw new Error(ps(t, e.byteLength));
    return { done: !1, value: ht.decode(e) };
  }
}
class oc {
  constructor(t, e) {
    this.source = t instanceof ve ? t : En(t) ? new hi(t, e) : new ve(t);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next() {
    return p(this, void 0, void 0, function* () {
      let t;
      return (t = yield this.readMetadataLength()).done || t.value === -1 && (t = yield this.readMetadataLength()).done || (t = yield this.readMetadata(t.value)).done ? k : t;
    });
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.source.throw(t);
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      return yield this.source.return(t);
    });
  }
  readMessage(t) {
    return p(this, void 0, void 0, function* () {
      let e;
      if ((e = yield this.next()).done)
        return null;
      if (t != null && e.value.headerType !== t)
        throw new Error(ln(t));
      return e.value;
    });
  }
  readMessageBody(t) {
    return p(this, void 0, void 0, function* () {
      if (t <= 0)
        return new Uint8Array(0);
      const e = N(yield this.source.read(t));
      if (e.byteLength < t)
        throw new Error(ys(t, e.byteLength));
      return e.byteOffset % 8 === 0 && e.byteOffset + e.byteLength <= e.buffer.byteLength ? e : e.slice();
    });
  }
  readSchema(t = !1) {
    return p(this, void 0, void 0, function* () {
      const e = L.Schema, n = yield this.readMessage(e), r = n == null ? void 0 : n.header();
      if (t && !r)
        throw new Error(un(e));
      return r;
    });
  }
  readMetadataLength() {
    return p(this, void 0, void 0, function* () {
      const t = yield this.source.read(Ai), e = t && new Kt(t), n = (e == null ? void 0 : e.readInt32(0)) || 0;
      return { done: n === 0, value: n };
    });
  }
  readMetadata(t) {
    return p(this, void 0, void 0, function* () {
      const e = yield this.source.read(t);
      if (!e)
        return k;
      if (e.byteLength < t)
        throw new Error(ps(t, e.byteLength));
      return { done: !1, value: ht.decode(e) };
    });
  }
}
class ac extends ms {
  constructor(t) {
    super(new Uint8Array(0)), this._schema = !1, this._body = [], this._batchIndex = 0, this._dictionaryIndex = 0, this._json = t instanceof wn ? t : new wn(t);
  }
  next() {
    const { _json: t } = this;
    if (!this._schema)
      return this._schema = !0, { done: !1, value: ht.fromJSON(t.schema, L.Schema) };
    if (this._dictionaryIndex < t.dictionaries.length) {
      const e = t.dictionaries[this._dictionaryIndex++];
      return this._body = e.data.columns, { done: !1, value: ht.fromJSON(e, L.DictionaryBatch) };
    }
    if (this._batchIndex < t.batches.length) {
      const e = t.batches[this._batchIndex++];
      return this._body = e.columns, { done: !1, value: ht.fromJSON(e, L.RecordBatch) };
    }
    return this._body = [], k;
  }
  readMessageBody(t) {
    return e(this._body);
    function e(n) {
      return (n || []).reduce((r, s) => [
        ...r,
        ...s.VALIDITY && [s.VALIDITY] || [],
        ...s.TYPE && [s.TYPE] || [],
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
      throw new Error(ln(t));
    return e.value;
  }
  readSchema() {
    const t = L.Schema, e = this.readMessage(t), n = e == null ? void 0 : e.header();
    if (!e || !n)
      throw new Error(un(t));
    return n;
  }
}
const Ai = 4, Pi = "ARROW1", mi = new Uint8Array(Pi.length);
for (let i = 0; i < Pi.length; i += 1)
  mi[i] = Pi.codePointAt(i);
function dn(i, t = 0) {
  for (let e = -1, n = mi.length; ++e < n; )
    if (mi[e] !== i[t + e])
      return !1;
  return !0;
}
const Ce = mi.length, bs = Ce + Ai, cc = Ce * 2 + Ai;
class Ct extends is {
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
    return Fe(e) ? e.then(() => this) : this;
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
    return rt.toDOMStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this });
  }
  toNodeStream() {
    return rt.toNodeStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this }, { objectMode: !0 });
  }
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  static throughDOM(t, e) {
    throw new Error('"throughDOM" not available in this environment');
  }
  static from(t) {
    return t instanceof Ct ? t : xi(t) ? hc(t) : En(t) ? yc(t) : Fe(t) ? (() => p(this, void 0, void 0, function* () {
      return yield Ct.from(yield t);
    }))() : Cn(t) || Yi(t) || zn(t) || Wi(t) ? pc(new ve(t)) : fc(new di(t));
  }
  static readAll(t) {
    return t instanceof Ct ? t.isSync() ? Tn(t) : Mn(t) : xi(t) || ArrayBuffer.isView(t) || wi(t) || xn(t) ? Tn(t) : Mn(t);
  }
}
class bi extends Ct {
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
    return Ot(this, arguments, function* () {
      yield S(yield* je(le(this[Symbol.iterator]())));
    });
  }
}
class gi extends Ct {
  constructor(t) {
    super(t), this._impl = t;
  }
  readAll() {
    var t, e, n, r;
    return p(this, void 0, void 0, function* () {
      const s = new Array();
      try {
        for (var o = !0, a = le(this), c; c = yield a.next(), t = c.done, !t; ) {
          r = c.value, o = !1;
          try {
            const u = r;
            s.push(u);
          } finally {
            o = !0;
          }
        }
      } catch (u) {
        e = { error: u };
      } finally {
        try {
          !o && !t && (n = a.return) && (yield n.call(a));
        } finally {
          if (e)
            throw e.error;
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
class gs extends bi {
  constructor(t) {
    super(t), this._impl = t;
  }
}
class lc extends gi {
  constructor(t) {
    super(t), this._impl = t;
  }
}
class _s {
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
    const n = this._loadVectors(t, e, this.schema.fields), r = F({ type: new K(this.schema.fields), length: t.length, children: n });
    return new J(this.schema, r);
  }
  _loadDictionaryBatch(t, e) {
    const { id: n, isDelta: r } = t, { dictionaries: s, schema: o } = this, a = s.get(n);
    if (r || !a) {
      const c = o.dictionaries.get(n), u = this._loadVectors(t.data, e, [c]);
      return (a && r ? a.concat(new U(u)) : new U(u)).memoize();
    }
    return a.memoize();
  }
  _loadVectors(t, e, n) {
    return new rs(e, t.nodes, t.buffers, this.dictionaries).visitMany(n);
  }
}
class _i extends _s {
  constructor(t, e) {
    super(e), this._reader = xi(t) ? new ac(this._handle = t) : new ms(this._handle = t);
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
    return this.closed || (this.autoDestroy = ws(this, t), this.schema || (this.schema = this._reader.readSchema()) || this.cancel()), this;
  }
  throw(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0) ? this.reset()._reader.throw(t) : k;
  }
  return(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0) ? this.reset()._reader.return(t) : k;
  }
  next() {
    if (this.closed)
      return k;
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
    return this.schema && this._recordBatchIndex === 0 ? (this._recordBatchIndex++, { done: !1, value: new cs(this.schema) }) : this.return();
  }
  _readNextMessageAndValidate(t) {
    return this._reader.readMessage(t);
  }
}
class vi extends _s {
  constructor(t, e) {
    super(e), this._reader = new oc(this._handle = t);
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
    return p(this, void 0, void 0, function* () {
      !this.closed && (this.closed = !0) && (yield this.reset()._reader.return(), this._reader = null, this.dictionaries = null);
    });
  }
  open(t) {
    return p(this, void 0, void 0, function* () {
      return this.closed || (this.autoDestroy = ws(this, t), this.schema || (this.schema = yield this._reader.readSchema()) || (yield this.cancel())), this;
    });
  }
  throw(t) {
    return p(this, void 0, void 0, function* () {
      return !this.closed && this.autoDestroy && (this.closed = !0) ? yield this.reset()._reader.throw(t) : k;
    });
  }
  return(t) {
    return p(this, void 0, void 0, function* () {
      return !this.closed && this.autoDestroy && (this.closed = !0) ? yield this.reset()._reader.return(t) : k;
    });
  }
  next() {
    return p(this, void 0, void 0, function* () {
      if (this.closed)
        return k;
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
      return this.schema && this._recordBatchIndex === 0 ? (this._recordBatchIndex++, { done: !1, value: new cs(this.schema) }) : yield this.return();
    });
  }
  _readNextMessageAndValidate(t) {
    return p(this, void 0, void 0, function* () {
      return yield this._reader.readMessage(t);
    });
  }
}
class vs extends _i {
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
    super(t instanceof In ? t : new In(t), e);
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
      const r = this._reader.readMessage(L.RecordBatch);
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
      const r = this._reader.readMessage(L.DictionaryBatch);
      if (r != null && r.isDictionaryBatch()) {
        const s = r.header(), o = this._reader.readMessageBody(r.bodyLength), a = this._loadDictionaryBatch(s, o);
        this.dictionaries.set(s.id, a);
      }
    }
  }
  _readFooter() {
    const { _handle: t } = this, e = t.size - bs, n = t.readInt32(e), r = t.readAt(e - n, n);
    return rn.decode(r);
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
class uc extends vi {
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
    super(t instanceof hi ? t : new hi(t, n), r);
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
    return p(this, void 0, void 0, function* () {
      if (!this.closed && !this._footer) {
        this.schema = (this._footer = yield this._readFooter()).schema;
        for (const n of this._footer.dictionaryBatches())
          n && (yield this._readDictionaryBatch(this._dictionaryIndex++));
      }
      return yield e.open.call(this, t);
    });
  }
  readRecordBatch(t) {
    var e;
    return p(this, void 0, void 0, function* () {
      if (this.closed)
        return null;
      this._footer || (yield this.open());
      const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getRecordBatch(t);
      if (n && (yield this._handle.seek(n.offset))) {
        const r = yield this._reader.readMessage(L.RecordBatch);
        if (r != null && r.isRecordBatch()) {
          const s = r.header(), o = yield this._reader.readMessageBody(r.bodyLength);
          return this._loadRecordBatch(s, o);
        }
      }
      return null;
    });
  }
  _readDictionaryBatch(t) {
    var e;
    return p(this, void 0, void 0, function* () {
      const n = (e = this._footer) === null || e === void 0 ? void 0 : e.getDictionaryBatch(t);
      if (n && (yield this._handle.seek(n.offset))) {
        const r = yield this._reader.readMessage(L.DictionaryBatch);
        if (r != null && r.isDictionaryBatch()) {
          const s = r.header(), o = yield this._reader.readMessageBody(r.bodyLength), a = this._loadDictionaryBatch(s, o);
          this.dictionaries.set(s.id, a);
        }
      }
    });
  }
  _readFooter() {
    return p(this, void 0, void 0, function* () {
      const { _handle: t } = this;
      t._pending && (yield t._pending);
      const e = t.size - bs, n = yield t.readInt32(e), r = yield t.readAt(e - n, n);
      return rn.decode(r);
    });
  }
  _readNextMessageAndValidate(t) {
    return p(this, void 0, void 0, function* () {
      if (this._footer || (yield this.open()), this._footer && this._recordBatchIndex < this.numRecordBatches) {
        const e = this._footer.getRecordBatch(this._recordBatchIndex);
        if (e && (yield this._handle.seek(e.offset)))
          return yield this._reader.readMessage(t);
      }
      return null;
    });
  }
}
class dc extends _i {
  constructor(t, e) {
    super(t, e);
  }
  _loadVectors(t, e, n) {
    return new Sa(e, t.nodes, t.buffers, this.dictionaries).visitMany(n);
  }
}
function ws(i, t) {
  return t && typeof t.autoDestroy == "boolean" ? t.autoDestroy : i.autoDestroy;
}
function* Tn(i) {
  const t = Ct.from(i);
  try {
    if (!t.open({ autoDestroy: !1 }).closed)
      do
        yield t;
      while (!t.reset().open().closed);
  } finally {
    t.cancel();
  }
}
function Mn(i) {
  return Ot(this, arguments, function* () {
    const e = yield S(Ct.from(i));
    try {
      if (!(yield S(e.open({ autoDestroy: !1 }))).closed)
        do
          yield yield S(e);
        while (!(yield S(e.reset().open())).closed);
    } finally {
      yield S(e.cancel());
    }
  });
}
function hc(i) {
  return new bi(new dc(i));
}
function fc(i) {
  const t = i.peek(Ce + 7 & -8);
  return t && t.byteLength >= 4 ? dn(t) ? new gs(new vs(i.read())) : new bi(new _i(i)) : new bi(new _i(function* () {
  }()));
}
function pc(i) {
  return p(this, void 0, void 0, function* () {
    const t = yield i.peek(Ce + 7 & -8);
    return t && t.byteLength >= 4 ? dn(t) ? new gs(new vs(yield i.read())) : new gi(new vi(i)) : new gi(new vi(function() {
      return Ot(this, arguments, function* () {
      });
    }()));
  });
}
function yc(i) {
  return p(this, void 0, void 0, function* () {
    const { size: t } = yield i.stat(), e = new hi(i, t);
    return t >= cc && dn(yield e.readAt(0, Ce + 7 & -8)) ? new lc(new uc(e)) : new gi(new vi(e));
  });
}
function Is(i) {
  const t = Ct.from(i);
  return Fe(t) ? t.then((e) => Is(e)) : t.isAsync() ? t.readAll().then((e) => new ct(e)) : new ct(t.readAll());
}
function z(i) {
  return i != null && typeof i == "object" && i["@@functional/placeholder"] === !0;
}
function Dt(i) {
  return function t(e) {
    return arguments.length === 0 || z(e) ? t : i.apply(this, arguments);
  };
}
function Wt(i) {
  return function t(e, n) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return z(e) ? t : Dt(function(r) {
          return i(e, r);
        });
      default:
        return z(e) && z(n) ? t : z(e) ? Dt(function(r) {
          return i(r, n);
        }) : z(n) ? Dt(function(r) {
          return i(e, r);
        }) : i(e, n);
    }
  };
}
function Ss(i, t) {
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
      return function(e, n, r, s, o, a, c, u) {
        return t.apply(this, arguments);
      };
    case 9:
      return function(e, n, r, s, o, a, c, u, d) {
        return t.apply(this, arguments);
      };
    case 10:
      return function(e, n, r, s, o, a, c, u, d, h) {
        return t.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}
function Bs(i) {
  return function t(e, n, r) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return z(e) ? t : Wt(function(s, o) {
          return i(e, s, o);
        });
      case 2:
        return z(e) && z(n) ? t : z(e) ? Wt(function(s, o) {
          return i(s, n, o);
        }) : z(n) ? Wt(function(s, o) {
          return i(e, s, o);
        }) : Dt(function(s) {
          return i(e, n, s);
        });
      default:
        return z(e) && z(n) && z(r) ? t : z(e) && z(n) ? Wt(function(s, o) {
          return i(s, o, r);
        }) : z(e) && z(r) ? Wt(function(s, o) {
          return i(s, n, o);
        }) : z(n) && z(r) ? Wt(function(s, o) {
          return i(e, s, o);
        }) : z(e) ? Dt(function(s) {
          return i(s, n, r);
        }) : z(n) ? Dt(function(s) {
          return i(e, s, r);
        }) : z(r) ? Dt(function(s) {
          return i(e, n, s);
        }) : i(e, n, r);
    }
  };
}
const As = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function Fs(i) {
  return Object.prototype.toString.call(i) === "[object String]";
}
var mc = /* @__PURE__ */ Dt(function(t) {
  return As(t) ? !0 : !t || typeof t != "object" || Fs(t) ? !1 : t.length === 0 ? !0 : t.length > 0 ? t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1) : !1;
});
const bc = mc;
var gc = /* @__PURE__ */ function() {
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
}();
function _c(i) {
  return new gc(i);
}
var vc = /* @__PURE__ */ Wt(function(t, e) {
  return Ss(t.length, function() {
    return t.apply(e, arguments);
  });
});
const wc = vc;
function Ic(i, t, e) {
  for (var n = 0, r = e.length; n < r; ) {
    if (t = i["@@transducer/step"](t, e[n]), t && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"];
      break;
    }
    n += 1;
  }
  return i["@@transducer/result"](t);
}
function Ln(i, t, e) {
  for (var n = e.next(); !n.done; ) {
    if (t = i["@@transducer/step"](t, n.value), t && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"];
      break;
    }
    n = e.next();
  }
  return i["@@transducer/result"](t);
}
function Un(i, t, e, n) {
  return i["@@transducer/result"](e[n](wc(i["@@transducer/step"], i), t));
}
var Rn = typeof Symbol < "u" ? Symbol.iterator : "@@iterator";
function Sc(i, t, e) {
  if (typeof i == "function" && (i = _c(i)), bc(e))
    return Ic(i, t, e);
  if (typeof e["fantasy-land/reduce"] == "function")
    return Un(i, t, e, "fantasy-land/reduce");
  if (e[Rn] != null)
    return Ln(i, t, e[Rn]());
  if (typeof e.next == "function")
    return Ln(i, t, e);
  if (typeof e.reduce == "function")
    return Un(i, t, e, "reduce");
  throw new TypeError("reduce: list must be array or iterable");
}
var Bc = /* @__PURE__ */ Bs(Sc);
const Ac = Bc;
function Fc(i, t) {
  return function() {
    return t.call(this, i.apply(this, arguments));
  };
}
function Os(i, t) {
  return function() {
    var e = arguments.length;
    if (e === 0)
      return t();
    var n = arguments[e - 1];
    return As(n) || typeof n[i] != "function" ? t.apply(this, arguments) : n[i].apply(n, Array.prototype.slice.call(arguments, 0, e - 1));
  };
}
var Oc = /* @__PURE__ */ Bs(
  /* @__PURE__ */ Os("slice", function(t, e, n) {
    return Array.prototype.slice.call(n, t, e);
  })
);
const Dc = Oc;
var Nc = /* @__PURE__ */ Dt(
  /* @__PURE__ */ Os(
    "tail",
    /* @__PURE__ */ Dc(1, 1 / 0)
  )
);
const Tc = Nc;
function Mc() {
  if (arguments.length === 0)
    throw new Error("pipe requires at least one argument");
  return Ss(arguments[0].length, Ac(Fc, arguments[0], Tc(arguments)));
}
var Lc = /* @__PURE__ */ Dt(function(t) {
  return Fs(t) ? t.split("").reverse().join("") : Array.prototype.slice.call(t, 0).reverse();
});
const Uc = Lc;
function Ui() {
  if (arguments.length === 0)
    throw new Error("compose requires at least one argument");
  return Mc.apply(this, Uc(arguments));
}
var Rc = /* @__PURE__ */ Wt(function(t, e) {
  for (var n = {}, r = 0; r < t.length; )
    t[r] in e && (n[t[r]] = e[t[r]]), r += 1;
  return n;
});
const xc = Rc;
class Ec {
  constructor(t) {
    Oi(this, "fieldNames", []);
    Oi(this, "coerceRow", (t) => xc(this.fieldNames, t));
    for (const e of t)
      f.isTimestamp(e) ? this.composeTimestampField(e) : f.isInt(e) ? this.composeIntField(e) : f.isFloat(e) && this.composeFloatField(e), this.fieldNames.push(e.name);
  }
  composeIntField(t) {
    t.type.bitWidth >= 64 && (this.coerceRow = Ui((e) => e, this.coerceRow));
  }
  composeFloatField(t) {
    this.coerceRow = Ui((e) => {
      const n = e[t.name];
      return n && (e[t.name] = parseFloat(n)), e;
    }, this.coerceRow);
  }
  composeTimestampField(t) {
    (t.type.timezone === null || t.type.timezone === "UTC") && (this.coerceRow = Ui((e) => {
      const n = e[t.name];
      return n && (e[t.name] = new Date(n).toISOString()), e;
    }, this.coerceRow));
  }
}
const We = (i) => {
  switch (i.typeId) {
    case l.Null:
      return "null";
    case l.Int:
      return "integer";
    case l.Float:
      return i.precision === G.DOUBLE ? "double" : "float";
    case l.Binary:
    case l.FixedSizeBinary:
      return "binary";
    case l.Utf8:
      return "string";
    case l.Bool:
      return "boolean";
    case l.Decimal:
      return "decimal";
    case l.Date:
      return "date";
    case l.Time:
      return "time";
    case l.Timestamp:
      return "timestamp";
    case l.Interval:
      return "interval";
    case l.List:
    case l.FixedSizeList:
      return `[${We(i.children[0].type)}]`;
    case l.Struct:
      return "struct";
    case l.Union:
      return i.children.map((t) => We(t.type)).filter((t) => t !== "null").join(" or ");
    case l.Map:
      return "map";
    case l.Dictionary:
      return f.isUtf8(i.valueType) ? "category" : We(i.valueType);
    default:
      return i.toString();
  }
}, Cc = (i) => i.fields.map((t) => ({
  name: t.name,
  type: We(t.type)
})), jc = (i) => {
  const t = [], e = Is(i), n = new Ec(e.schema.fields);
  for (const r of e)
    t.push(n.coerceRow(r));
  return {
    schema: Cc(e.schema),
    data: t,
    containsBigInt: e.schema.fields.some(
      (r) => r.type.bitWidth && r.type.bitWidth >= 64
    )
  };
};
export {
  jc as apiResponseToArrow
};
