(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[888], {
    5851: function(t, e, r) {
        "use strict";
        r.d(e, {
            i: function() {
                return n
            }
        });
        let n = "abi/5.6.4"
    },
    4243: function(t, e, r) {
        "use strict";
        r.d(e, {
            R: function() {
                return R
            },
            $: function() {
                return O
            }
        });
        var n = r(6441)
          , i = r(6881)
          , o = r(1581)
          , s = r(5851)
          , a = r(1184)
          , u = r(9485);
        class l extends a.XI {
            constructor(t) {
                super("address", "address", t, !1)
            }
            defaultValue() {
                return "0x0000000000000000000000000000000000000000"
            }
            encode(t, e) {
                try {
                    e = (0,
                    u.getAddress)(e)
                } catch (r) {
                    this._throwError(r.message, e)
                }
                return t.writeValue(e)
            }
            decode(t) {
                return (0,
                u.getAddress)((0,
                n.hexZeroPad)(t.readValue().toHexString(), 20))
            }
        }
        class h extends a.XI {
            constructor(t) {
                super(t.name, t.type, void 0, t.dynamic),
                this.coder = t
            }
            defaultValue() {
                return this.coder.defaultValue()
            }
            encode(t, e) {
                return this.coder.encode(t, e)
            }
            decode(t) {
                return this.coder.decode(t)
            }
        }
        let f = new o.Logger(s.i);
        function c(t, e, r) {
            let n = null;
            if (Array.isArray(r))
                n = r;
            else if (r && "object" == typeof r) {
                let i = {};
                n = e.map(t=>{
                    let e = t.localName;
                    return e || f.throwError("cannot encode object for signature with missing names", o.Logger.errors.INVALID_ARGUMENT, {
                        argument: "values",
                        coder: t,
                        value: r
                    }),
                    i[e] && f.throwError("cannot encode object for signature with duplicate names", o.Logger.errors.INVALID_ARGUMENT, {
                        argument: "values",
                        coder: t,
                        value: r
                    }),
                    i[e] = !0,
                    r[e]
                }
                )
            } else
                f.throwArgumentError("invalid tuple value", "tuple", r);
            e.length !== n.length && f.throwArgumentError("types/value length mismatch", "tuple", r);
            let s = new a.QV(t.wordSize)
              , u = new a.QV(t.wordSize)
              , l = [];
            return e.forEach((t,e)=>{
                let r = n[e];
                if (t.dynamic) {
                    let i = u.length;
                    t.encode(u, r);
                    let o = s.writeUpdatableValue();
                    l.push(t=>{
                        o(t + i)
                    }
                    )
                } else
                    t.encode(s, r)
            }
            ),
            l.forEach(t=>{
                t(s.length)
            }
            ),
            t.appendWriter(s) + t.appendWriter(u)
        }
        function d(t, e) {
            let r = []
              , n = t.subReader(0);
            e.forEach(e=>{
                let i = null;
                if (e.dynamic) {
                    let s = t.readValue()
                      , a = n.subReader(s.toNumber());
                    try {
                        i = e.decode(a)
                    } catch (u) {
                        if (u.code === o.Logger.errors.BUFFER_OVERRUN)
                            throw u;
                        (i = u).baseType = e.name,
                        i.name = e.localName,
                        i.type = e.type
                    }
                } else
                    try {
                        i = e.decode(t)
                    } catch (l) {
                        if (l.code === o.Logger.errors.BUFFER_OVERRUN)
                            throw l;
                        (i = l).baseType = e.name,
                        i.name = e.localName,
                        i.type = e.type
                    }
                void 0 != i && r.push(i)
            }
            );
            let i = e.reduce((t,e)=>{
                let r = e.localName;
                return r && (t[r] || (t[r] = 0),
                t[r]++),
                t
            }
            , {});
            e.forEach((t,e)=>{
                let n = t.localName;
                if (!n || 1 !== i[n] || ("length" === n && (n = "_length"),
                null != r[n]))
                    return;
                let o = r[e];
                o instanceof Error ? Object.defineProperty(r, n, {
                    enumerable: !0,
                    get() {
                        throw o
                    }
                }) : r[n] = o
            }
            );
            for (let s = 0; s < r.length; s++) {
                let a = r[s];
                a instanceof Error && Object.defineProperty(r, s, {
                    enumerable: !0,
                    get() {
                        throw a
                    }
                })
            }
            return Object.freeze(r)
        }
        class p extends a.XI {
            constructor(t, e, r) {
                let n = t.type + "[" + (e >= 0 ? e : "") + "]"
                  , i = -1 === e || t.dynamic;
                super("array", n, r, i),
                this.coder = t,
                this.length = e
            }
            defaultValue() {
                let t = this.coder.defaultValue()
                  , e = [];
                for (let r = 0; r < this.length; r++)
                    e.push(t);
                return e
            }
            encode(t, e) {
                Array.isArray(e) || this._throwError("expected array value", e);
                let r = this.length;
                -1 === r && (r = e.length,
                t.writeValue(e.length)),
                f.checkArgumentCount(e.length, r, "coder array" + (this.localName ? " " + this.localName : ""));
                let n = [];
                for (let i = 0; i < e.length; i++)
                    n.push(this.coder);
                return c(t, n, e)
            }
            decode(t) {
                let e = this.length;
                -1 === e && 32 * (e = t.readValue().toNumber()) > t._data.length && f.throwError("insufficient data length", o.Logger.errors.BUFFER_OVERRUN, {
                    length: t._data.length,
                    count: e
                });
                let r = [];
                for (let n = 0; n < e; n++)
                    r.push(new h(this.coder));
                return t.coerce(this.name, d(t, r))
            }
        }
        class m extends a.XI {
            constructor(t) {
                super("bool", "bool", t, !1)
            }
            defaultValue() {
                return !1
            }
            encode(t, e) {
                return t.writeValue(e ? 1 : 0)
            }
            decode(t) {
                return t.coerce(this.type, !t.readValue().isZero())
            }
        }
        class g extends a.XI {
            constructor(t, e) {
                super(t, t, e, !0)
            }
            defaultValue() {
                return "0x"
            }
            encode(t, e) {
                return e = (0,
                n.arrayify)(e),
                t.writeValue(e.length) + t.writeBytes(e)
            }
            decode(t) {
                return t.readBytes(t.readValue().toNumber(), !0)
            }
        }
        class y extends g {
            constructor(t) {
                super("bytes", t)
            }
            decode(t) {
                return t.coerce(this.name, (0,
                n.hexlify)(super.decode(t)))
            }
        }
        class v extends a.XI {
            constructor(t, e) {
                let r = "bytes" + String(t);
                super(r, r, e, !1),
                this.size = t
            }
            defaultValue() {
                return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + 2 * this.size)
            }
            encode(t, e) {
                let r = (0,
                n.arrayify)(e);
                return r.length !== this.size && this._throwError("incorrect data length", e),
                t.writeBytes(r)
            }
            decode(t) {
                return t.coerce(this.name, (0,
                n.hexlify)(t.readBytes(this.size)))
            }
        }
        class b extends a.XI {
            constructor(t) {
                super("null", "", t, !1)
            }
            defaultValue() {
                return null
            }
            encode(t, e) {
                return null != e && this._throwError("not null", e),
                t.writeBytes([])
            }
            decode(t) {
                return t.readBytes(0),
                t.coerce(this.name, null)
            }
        }
        var w = r(2593)
          , E = r(1046);
        class _ extends a.XI {
            constructor(t, e, r) {
                let n = (e ? "int" : "uint") + 8 * t;
                super(n, n, r, !1),
                this.size = t,
                this.signed = e
            }
            defaultValue() {
                return 0
            }
            encode(t, e) {
                let r = w.O$.from(e)
                  , n = E.Bz.mask(8 * t.wordSize);
                if (this.signed) {
                    let i = n.mask(8 * this.size - 1);
                    (r.gt(i) || r.lt(i.add(E.fh).mul(E.tL))) && this._throwError("value out-of-bounds", e)
                } else
                    (r.lt(E._Y) || r.gt(n.mask(8 * this.size))) && this._throwError("value out-of-bounds", e);
                return r = r.toTwos(8 * this.size).mask(8 * this.size),
                this.signed && (r = r.fromTwos(8 * this.size).toTwos(8 * t.wordSize)),
                t.writeValue(r)
            }
            decode(t) {
                let e = t.readValue().mask(8 * this.size);
                return this.signed && (e = e.fromTwos(8 * this.size)),
                t.coerce(this.name, e)
            }
        }
        var x = r(9251);
        class A extends g {
            constructor(t) {
                super("string", t)
            }
            defaultValue() {
                return ""
            }
            encode(t, e) {
                return super.encode(t, (0,
                x.Y0)(e))
            }
            decode(t) {
                return (0,
                x.ZN)(super.decode(t))
            }
        }
        class k extends a.XI {
            constructor(t, e) {
                let r = !1
                  , n = [];
                t.forEach(t=>{
                    t.dynamic && (r = !0),
                    n.push(t.type)
                }
                );
                let i = "tuple(" + n.join(",") + ")";
                super("tuple", i, e, r),
                this.coders = t
            }
            defaultValue() {
                let t = [];
                this.coders.forEach(e=>{
                    t.push(e.defaultValue())
                }
                );
                let e = this.coders.reduce((t,e)=>{
                    let r = e.localName;
                    return r && (t[r] || (t[r] = 0),
                    t[r]++),
                    t
                }
                , {});
                return this.coders.forEach((r,n)=>{
                    let i = r.localName;
                    i && 1 === e[i] && ("length" === i && (i = "_length"),
                    null == t[i] && (t[i] = t[n]))
                }
                ),
                Object.freeze(t)
            }
            encode(t, e) {
                return c(t, this.coders, e)
            }
            decode(t) {
                return t.coerce(this.name, d(t, this.coders))
            }
        }
        var N = r(1388);
        let M = new o.Logger(s.i)
          , P = RegExp(/^bytes([0-9]*)$/)
          , S = RegExp(/^(u?int)([0-9]*)$/);
        class R {
            constructor(t) {
                (0,
                i.defineReadOnly)(this, "coerceFunc", t || null)
            }
            _getCoder(t) {
                switch (t.baseType) {
                case "address":
                    return new l(t.name);
                case "bool":
                    return new m(t.name);
                case "string":
                    return new A(t.name);
                case "bytes":
                    return new y(t.name);
                case "array":
                    return new p(this._getCoder(t.arrayChildren),t.arrayLength,t.name);
                case "tuple":
                    return new k((t.components || []).map(t=>this._getCoder(t)),t.name);
                case "":
                    return new b(t.name)
                }
                let e = t.type.match(S);
                if (e) {
                    let r = parseInt(e[2] || "256");
                    return (0 === r || r > 256 || r % 8 != 0) && M.throwArgumentError("invalid " + e[1] + " bit length", "param", t),
                    new _(r / 8,"int" === e[1],t.name)
                }
                if (e = t.type.match(P)) {
                    let n = parseInt(e[1]);
                    return (0 === n || n > 32) && M.throwArgumentError("invalid bytes length", "param", t),
                    new v(n,t.name)
                }
                return M.throwArgumentError("invalid type", "type", t.type)
            }
            _getWordSize() {
                return 32
            }
            _getReader(t, e) {
                return new a.Ej(t,this._getWordSize(),this.coerceFunc,e)
            }
            _getWriter() {
                return new a.QV(this._getWordSize())
            }
            getDefaultValue(t) {
                let e = t.map(t=>this._getCoder(N._R.from(t)))
                  , r = new k(e,"_");
                return r.defaultValue()
            }
            encode(t, e) {
                t.length !== e.length && M.throwError("types/values length mismatch", o.Logger.errors.INVALID_ARGUMENT, {
                    count: {
                        types: t.length,
                        values: e.length
                    },
                    value: {
                        types: t,
                        values: e
                    }
                });
                let r = t.map(t=>this._getCoder(N._R.from(t)))
                  , n = new k(r,"_")
                  , i = this._getWriter();
                return n.encode(i, e),
                i.data
            }
            decode(t, e, r) {
                let i = t.map(t=>this._getCoder(N._R.from(t)))
                  , o = new k(i,"_");
                return o.decode(this._getReader((0,
                n.arrayify)(e), r))
            }
        }
        let O = new R
    },
    1184: function(t, e, r) {
        "use strict";
        r.d(e, {
            BR: function() {
                return l
            },
            Ej: function() {
                return c
            },
            QV: function() {
                return f
            },
            XI: function() {
                return h
            }
        });
        var n = r(6441)
          , i = r(2593)
          , o = r(6881)
          , s = r(1581)
          , a = r(5851);
        let u = new s.Logger(a.i);
        function l(t) {
            let e = []
              , r = function(t, n) {
                if (Array.isArray(n))
                    for (let i in n) {
                        let o = t.slice();
                        o.push(i);
                        try {
                            r(o, n[i])
                        } catch (s) {
                            e.push({
                                path: o,
                                error: s
                            })
                        }
                    }
            };
            return r([], t),
            e
        }
        class h {
            constructor(t, e, r, n) {
                this.name = t,
                this.type = e,
                this.localName = r,
                this.dynamic = n
            }
            _throwError(t, e) {
                u.throwArgumentError(t, this.localName, e)
            }
        }
        class f {
            constructor(t) {
                (0,
                o.defineReadOnly)(this, "wordSize", t || 32),
                this._data = [],
                this._dataLength = 0,
                this._padding = new Uint8Array(t)
            }
            get data() {
                return (0,
                n.hexConcat)(this._data)
            }
            get length() {
                return this._dataLength
            }
            _writeData(t) {
                return this._data.push(t),
                this._dataLength += t.length,
                t.length
            }
            appendWriter(t) {
                return this._writeData((0,
                n.concat)(t._data))
            }
            writeBytes(t) {
                let e = (0,
                n.arrayify)(t)
                  , r = e.length % this.wordSize;
                return r && (e = (0,
                n.concat)([e, this._padding.slice(r)])),
                this._writeData(e)
            }
            _getValue(t) {
                let e = (0,
                n.arrayify)(i.O$.from(t));
                return e.length > this.wordSize && u.throwError("value out-of-bounds", s.Logger.errors.BUFFER_OVERRUN, {
                    length: this.wordSize,
                    offset: e.length
                }),
                e.length % this.wordSize && (e = (0,
                n.concat)([this._padding.slice(e.length % this.wordSize), e])),
                e
            }
            writeValue(t) {
                return this._writeData(this._getValue(t))
            }
            writeUpdatableValue() {
                let t = this._data.length;
                return this._data.push(this._padding),
                this._dataLength += this.wordSize,
                e=>{
                    this._data[t] = this._getValue(e)
                }
            }
        }
        class c {
            constructor(t, e, r, i) {
                (0,
                o.defineReadOnly)(this, "_data", (0,
                n.arrayify)(t)),
                (0,
                o.defineReadOnly)(this, "wordSize", e || 32),
                (0,
                o.defineReadOnly)(this, "_coerceFunc", r),
                (0,
                o.defineReadOnly)(this, "allowLoose", i),
                this._offset = 0
            }
            get data() {
                return (0,
                n.hexlify)(this._data)
            }
            get consumed() {
                return this._offset
            }
            static coerce(t, e) {
                let r = t.match("^u?int([0-9]+)$");
                return r && 48 >= parseInt(r[1]) && (e = e.toNumber()),
                e
            }
            coerce(t, e) {
                return this._coerceFunc ? this._coerceFunc(t, e) : c.coerce(t, e)
            }
            _peekBytes(t, e, r) {
                let n = Math.ceil(e / this.wordSize) * this.wordSize;
                return this._offset + n > this._data.length && (this.allowLoose && r && this._offset + e <= this._data.length ? n = e : u.throwError("data out-of-bounds", s.Logger.errors.BUFFER_OVERRUN, {
                    length: this._data.length,
                    offset: this._offset + n
                })),
                this._data.slice(this._offset, this._offset + n)
            }
            subReader(t) {
                return new c(this._data.slice(this._offset + t),this.wordSize,this._coerceFunc,this.allowLoose)
            }
            readBytes(t, e) {
                let r = this._peekBytes(0, t, !!e);
                return this._offset += r.length,
                r.slice(0, t)
            }
            readValue() {
                return i.O$.from(this.readBytes(this.wordSize))
            }
        }
    },
    1388: function(t, e, r) {
        "use strict";
        r.d(e, {
            HY: function() {
                return y
            },
            IC: function() {
                return k
            },
            QV: function() {
                return v
            },
            Xg: function() {
                return _
            },
            YW: function() {
                return x
            },
            _R: function() {
                return m
            },
            pc: function() {
                return d
            }
        });
        var n = r(2593)
          , i = r(6881)
          , o = r(1581)
          , s = r(5851);
        let a = new o.Logger(s.i)
          , u = {}
          , l = {
            calldata: !0,
            memory: !0,
            storage: !0
        }
          , h = {
            calldata: !0,
            memory: !0
        };
        function f(t, e) {
            if ("bytes" === t || "string" === t) {
                if (l[e])
                    return !0
            } else if ("address" === t) {
                if ("payable" === e)
                    return !0
            } else if ((t.indexOf("[") >= 0 || "tuple" === t) && h[e])
                return !0;
            return (l[e] || "payable" === e) && a.throwArgumentError("invalid modifier", "name", e),
            !1
        }
        function c(t, e) {
            for (let r in e)
                (0,
                i.defineReadOnly)(t, r, e[r])
        }
        let d = Object.freeze({
            sighash: "sighash",
            minimal: "minimal",
            full: "full",
            json: "json"
        })
          , p = RegExp(/^(.*)\[([0-9]*)\]$/);
        class m {
            constructor(t, e) {
                t !== u && a.throwError("use fromString", o.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "new ParamType()"
                }),
                c(this, e);
                let r = this.type.match(p);
                r ? c(this, {
                    arrayLength: parseInt(r[2] || "-1"),
                    arrayChildren: m.fromObject({
                        type: r[1],
                        components: this.components
                    }),
                    baseType: "array"
                }) : c(this, {
                    arrayLength: null,
                    arrayChildren: null,
                    baseType: null != this.components ? "tuple" : this.type
                }),
                this._isParamType = !0,
                Object.freeze(this)
            }
            format(t) {
                if (t || (t = d.sighash),
                d[t] || a.throwArgumentError("invalid format type", "format", t),
                t === d.json) {
                    let e = {
                        type: "tuple" === this.baseType ? "tuple" : this.type,
                        name: this.name || void 0
                    };
                    return "boolean" == typeof this.indexed && (e.indexed = this.indexed),
                    this.components && (e.components = this.components.map(e=>JSON.parse(e.format(t)))),
                    JSON.stringify(e)
                }
                let r = "";
                return "array" === this.baseType ? (r += this.arrayChildren.format(t),
                r += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]") : "tuple" === this.baseType ? (t !== d.sighash && (r += this.type),
                r += "(" + this.components.map(e=>e.format(t)).join(t === d.full ? ", " : ",") + ")") : r += this.type,
                t !== d.sighash && (!0 === this.indexed && (r += " indexed"),
                t === d.full && this.name && (r += " " + this.name)),
                r
            }
            static from(t, e) {
                return "string" == typeof t ? m.fromString(t, e) : m.fromObject(t)
            }
            static fromObject(t) {
                return m.isParamType(t) ? t : new m(u,{
                    name: t.name || null,
                    type: N(t.type),
                    indexed: null == t.indexed ? null : !!t.indexed,
                    components: t.components ? t.components.map(m.fromObject) : null
                })
            }
            static fromString(t, e) {
                var r;
                return r = function(t, e) {
                    let r = t;
                    function n(e) {
                        a.throwArgumentError(`unexpected character at position ${e}`, "param", t)
                    }
                    function i(t) {
                        let r = {
                            type: "",
                            name: "",
                            parent: t,
                            state: {
                                allowType: !0
                            }
                        };
                        return e && (r.indexed = !1),
                        r
                    }
                    t = t.replace(/\s/g, " ");
                    let o = {
                        type: "",
                        name: "",
                        state: {
                            allowType: !0
                        }
                    }
                      , s = o;
                    for (let u = 0; u < t.length; u++) {
                        let l = t[u];
                        switch (l) {
                        case "(":
                            s.state.allowType && "" === s.type ? s.type = "tuple" : s.state.allowParams || n(u),
                            s.state.allowType = !1,
                            s.type = N(s.type),
                            s.components = [i(s)],
                            s = s.components[0];
                            break;
                        case ")":
                            delete s.state,
                            "indexed" === s.name && (e || n(u),
                            s.indexed = !0,
                            s.name = ""),
                            f(s.type, s.name) && (s.name = ""),
                            s.type = N(s.type);
                            let h = s;
                            (s = s.parent) || n(u),
                            delete h.parent,
                            s.state.allowParams = !1,
                            s.state.allowName = !0,
                            s.state.allowArray = !0;
                            break;
                        case ",":
                            delete s.state,
                            "indexed" === s.name && (e || n(u),
                            s.indexed = !0,
                            s.name = ""),
                            f(s.type, s.name) && (s.name = ""),
                            s.type = N(s.type);
                            let c = i(s.parent);
                            s.parent.components.push(c),
                            delete s.parent,
                            s = c;
                            break;
                        case " ":
                            s.state.allowType && "" !== s.type && (s.type = N(s.type),
                            delete s.state.allowType,
                            s.state.allowName = !0,
                            s.state.allowParams = !0),
                            s.state.allowName && "" !== s.name && ("indexed" === s.name ? (e || n(u),
                            s.indexed && n(u),
                            s.indexed = !0,
                            s.name = "") : f(s.type, s.name) ? s.name = "" : s.state.allowName = !1);
                            break;
                        case "[":
                            s.state.allowArray || n(u),
                            s.type += l,
                            s.state.allowArray = !1,
                            s.state.allowName = !1,
                            s.state.readArray = !0;
                            break;
                        case "]":
                            s.state.readArray || n(u),
                            s.type += l,
                            s.state.readArray = !1,
                            s.state.allowArray = !0,
                            s.state.allowName = !0;
                            break;
                        default:
                            s.state.allowType ? (s.type += l,
                            s.state.allowParams = !0,
                            s.state.allowArray = !0) : s.state.allowName ? (s.name += l,
                            delete s.state.allowArray) : s.state.readArray ? s.type += l : n(u)
                        }
                    }
                    return s.parent && a.throwArgumentError("unexpected eof", "param", t),
                    delete o.state,
                    "indexed" === s.name ? (e || n(r.length - 7),
                    s.indexed && n(r.length - 7),
                    s.indexed = !0,
                    s.name = "") : f(s.type, s.name) && (s.name = ""),
                    o.type = N(o.type),
                    o
                }(t, !!e),
                m.fromObject({
                    name: r.name,
                    type: r.type,
                    indexed: r.indexed,
                    components: r.components
                })
            }
            static isParamType(t) {
                return !!(null != t && t._isParamType)
            }
        }
        function g(t, e) {
            return (function(t) {
                t = t.trim();
                let e = []
                  , r = ""
                  , n = 0;
                for (let i = 0; i < t.length; i++) {
                    let o = t[i];
                    "," === o && 0 === n ? (e.push(r),
                    r = "") : (r += o,
                    "(" === o ? n++ : ")" === o && -1 == --n && a.throwArgumentError("unbalanced parenthesis", "value", t))
                }
                return r && e.push(r),
                e
            }
            )(t).map(t=>m.fromString(t, e))
        }
        class y {
            constructor(t, e) {
                t !== u && a.throwError("use a static from method", o.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "new Fragment()"
                }),
                c(this, e),
                this._isFragment = !0,
                Object.freeze(this)
            }
            static from(t) {
                return y.isFragment(t) ? t : "string" == typeof t ? y.fromString(t) : y.fromObject(t)
            }
            static fromObject(t) {
                if (y.isFragment(t))
                    return t;
                switch (t.type) {
                case "function":
                    return x.fromObject(t);
                case "event":
                    return v.fromObject(t);
                case "constructor":
                    return _.fromObject(t);
                case "error":
                    return k.fromObject(t);
                case "fallback":
                case "receive":
                    return null
                }
                return a.throwArgumentError("invalid fragment object", "value", t)
            }
            static fromString(t) {
                return "event" === (t = (t = (t = t.replace(/\s/g, " ")).replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ")).trim()).split(" ")[0] ? v.fromString(t.substring(5).trim()) : "function" === t.split(" ")[0] ? x.fromString(t.substring(8).trim()) : "constructor" === t.split("(")[0].trim() ? _.fromString(t.trim()) : "error" === t.split(" ")[0] ? k.fromString(t.substring(5).trim()) : a.throwArgumentError("unsupported fragment", "value", t)
            }
            static isFragment(t) {
                return !!(t && t._isFragment)
            }
        }
        class v extends y {
            format(t) {
                if (t || (t = d.sighash),
                d[t] || a.throwArgumentError("invalid format type", "format", t),
                t === d.json)
                    return JSON.stringify({
                        type: "event",
                        anonymous: this.anonymous,
                        name: this.name,
                        inputs: this.inputs.map(e=>JSON.parse(e.format(t)))
                    });
                let e = "";
                return t !== d.sighash && (e += "event "),
                e += this.name + "(" + this.inputs.map(e=>e.format(t)).join(t === d.full ? ", " : ",") + ") ",
                t !== d.sighash && this.anonymous && (e += "anonymous "),
                e.trim()
            }
            static from(t) {
                return "string" == typeof t ? v.fromString(t) : v.fromObject(t)
            }
            static fromObject(t) {
                if (v.isEventFragment(t))
                    return t;
                "event" !== t.type && a.throwArgumentError("invalid event object", "value", t);
                let e = {
                    name: P(t.name),
                    anonymous: t.anonymous,
                    inputs: t.inputs ? t.inputs.map(m.fromObject) : [],
                    type: "event"
                };
                return new v(u,e)
            }
            static fromString(t) {
                let e = t.match(S);
                e || a.throwArgumentError("invalid event string", "value", t);
                let r = !1;
                return e[3].split(" ").forEach(t=>{
                    switch (t.trim()) {
                    case "anonymous":
                        r = !0;
                        break;
                    case "":
                        break;
                    default:
                        a.warn("unknown modifier: " + t)
                    }
                }
                ),
                v.fromObject({
                    name: e[1].trim(),
                    anonymous: r,
                    inputs: g(e[2], !0),
                    type: "event"
                })
            }
            static isEventFragment(t) {
                return t && t._isFragment && "event" === t.type
            }
        }
        function b(t, e) {
            e.gas = null;
            let r = t.split("@");
            return 1 !== r.length ? (r.length > 2 && a.throwArgumentError("invalid human-readable ABI signature", "value", t),
            r[1].match(/^[0-9]+$/) || a.throwArgumentError("invalid human-readable ABI signature gas", "value", t),
            e.gas = n.O$.from(r[1]),
            r[0]) : t
        }
        function w(t, e) {
            e.constant = !1,
            e.payable = !1,
            e.stateMutability = "nonpayable",
            t.split(" ").forEach(t=>{
                switch (t.trim()) {
                case "constant":
                    e.constant = !0;
                    break;
                case "payable":
                    e.payable = !0,
                    e.stateMutability = "payable";
                    break;
                case "nonpayable":
                    e.payable = !1,
                    e.stateMutability = "nonpayable";
                    break;
                case "pure":
                    e.constant = !0,
                    e.stateMutability = "pure";
                    break;
                case "view":
                    e.constant = !0,
                    e.stateMutability = "view";
                    break;
                case "external":
                case "public":
                case "":
                    break;
                default:
                    console.log("unknown modifier: " + t)
                }
            }
            )
        }
        function E(t) {
            let e = {
                constant: !1,
                payable: !0,
                stateMutability: "payable"
            };
            return null != t.stateMutability ? (e.stateMutability = t.stateMutability,
            e.constant = "view" === e.stateMutability || "pure" === e.stateMutability,
            null != t.constant && !!t.constant !== e.constant && a.throwArgumentError("cannot have constant function with mutability " + e.stateMutability, "value", t),
            e.payable = "payable" === e.stateMutability,
            null != t.payable && !!t.payable !== e.payable && a.throwArgumentError("cannot have payable function with mutability " + e.stateMutability, "value", t)) : null != t.payable ? (e.payable = !!t.payable,
            null != t.constant || e.payable || "constructor" === t.type || a.throwArgumentError("unable to determine stateMutability", "value", t),
            e.constant = !!t.constant,
            e.constant ? e.stateMutability = "view" : e.stateMutability = e.payable ? "payable" : "nonpayable",
            e.payable && e.constant && a.throwArgumentError("cannot have constant payable function", "value", t)) : null != t.constant ? (e.constant = !!t.constant,
            e.payable = !e.constant,
            e.stateMutability = e.constant ? "view" : "payable") : "constructor" !== t.type && a.throwArgumentError("unable to determine stateMutability", "value", t),
            e
        }
        class _ extends y {
            format(t) {
                if (t || (t = d.sighash),
                d[t] || a.throwArgumentError("invalid format type", "format", t),
                t === d.json)
                    return JSON.stringify({
                        type: "constructor",
                        stateMutability: "nonpayable" !== this.stateMutability ? this.stateMutability : void 0,
                        payable: this.payable,
                        gas: this.gas ? this.gas.toNumber() : void 0,
                        inputs: this.inputs.map(e=>JSON.parse(e.format(t)))
                    });
                t === d.sighash && a.throwError("cannot format a constructor for sighash", o.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "format(sighash)"
                });
                let e = "constructor(" + this.inputs.map(e=>e.format(t)).join(t === d.full ? ", " : ",") + ") ";
                return this.stateMutability && "nonpayable" !== this.stateMutability && (e += this.stateMutability + " "),
                e.trim()
            }
            static from(t) {
                return "string" == typeof t ? _.fromString(t) : _.fromObject(t)
            }
            static fromObject(t) {
                if (_.isConstructorFragment(t))
                    return t;
                "constructor" !== t.type && a.throwArgumentError("invalid constructor object", "value", t);
                let e = E(t);
                e.constant && a.throwArgumentError("constructor cannot be constant", "value", t);
                let r = {
                    name: null,
                    type: t.type,
                    inputs: t.inputs ? t.inputs.map(m.fromObject) : [],
                    payable: e.payable,
                    stateMutability: e.stateMutability,
                    gas: t.gas ? n.O$.from(t.gas) : null
                };
                return new _(u,r)
            }
            static fromString(t) {
                let e = {
                    type: "constructor"
                }
                  , r = (t = b(t, e)).match(S);
                return r && "constructor" === r[1].trim() || a.throwArgumentError("invalid constructor string", "value", t),
                e.inputs = g(r[2].trim(), !1),
                w(r[3].trim(), e),
                _.fromObject(e)
            }
            static isConstructorFragment(t) {
                return t && t._isFragment && "constructor" === t.type
            }
        }
        class x extends _ {
            format(t) {
                if (t || (t = d.sighash),
                d[t] || a.throwArgumentError("invalid format type", "format", t),
                t === d.json)
                    return JSON.stringify({
                        type: "function",
                        name: this.name,
                        constant: this.constant,
                        stateMutability: "nonpayable" !== this.stateMutability ? this.stateMutability : void 0,
                        payable: this.payable,
                        gas: this.gas ? this.gas.toNumber() : void 0,
                        inputs: this.inputs.map(e=>JSON.parse(e.format(t))),
                        outputs: this.outputs.map(e=>JSON.parse(e.format(t)))
                    });
                let e = "";
                return t !== d.sighash && (e += "function "),
                e += this.name + "(" + this.inputs.map(e=>e.format(t)).join(t === d.full ? ", " : ",") + ") ",
                t !== d.sighash && (this.stateMutability ? "nonpayable" !== this.stateMutability && (e += this.stateMutability + " ") : this.constant && (e += "view "),
                this.outputs && this.outputs.length && (e += "returns (" + this.outputs.map(e=>e.format(t)).join(", ") + ") "),
                null != this.gas && (e += "@" + this.gas.toString() + " ")),
                e.trim()
            }
            static from(t) {
                return "string" == typeof t ? x.fromString(t) : x.fromObject(t)
            }
            static fromObject(t) {
                if (x.isFunctionFragment(t))
                    return t;
                "function" !== t.type && a.throwArgumentError("invalid function object", "value", t);
                let e = E(t)
                  , r = {
                    type: t.type,
                    name: P(t.name),
                    constant: e.constant,
                    inputs: t.inputs ? t.inputs.map(m.fromObject) : [],
                    outputs: t.outputs ? t.outputs.map(m.fromObject) : [],
                    payable: e.payable,
                    stateMutability: e.stateMutability,
                    gas: t.gas ? n.O$.from(t.gas) : null
                };
                return new x(u,r)
            }
            static fromString(t) {
                let e = {
                    type: "function"
                }
                  , r = (t = b(t, e)).split(" returns ");
                r.length > 2 && a.throwArgumentError("invalid function string", "value", t);
                let n = r[0].match(S);
                if (n || a.throwArgumentError("invalid function signature", "value", t),
                e.name = n[1].trim(),
                e.name && P(e.name),
                e.inputs = g(n[2], !1),
                w(n[3].trim(), e),
                r.length > 1) {
                    let i = r[1].match(S);
                    ("" != i[1].trim() || "" != i[3].trim()) && a.throwArgumentError("unexpected tokens", "value", t),
                    e.outputs = g(i[2], !1)
                } else
                    e.outputs = [];
                return x.fromObject(e)
            }
            static isFunctionFragment(t) {
                return t && t._isFragment && "function" === t.type
            }
        }
        function A(t) {
            let e = t.format();
            return ("Error(string)" === e || "Panic(uint256)" === e) && a.throwArgumentError(`cannot specify user defined ${e} error`, "fragment", t),
            t
        }
        class k extends y {
            format(t) {
                if (t || (t = d.sighash),
                d[t] || a.throwArgumentError("invalid format type", "format", t),
                t === d.json)
                    return JSON.stringify({
                        type: "error",
                        name: this.name,
                        inputs: this.inputs.map(e=>JSON.parse(e.format(t)))
                    });
                let e = "";
                return t !== d.sighash && (e += "error "),
                (e += this.name + "(" + this.inputs.map(e=>e.format(t)).join(t === d.full ? ", " : ",") + ") ").trim()
            }
            static from(t) {
                return "string" == typeof t ? k.fromString(t) : k.fromObject(t)
            }
            static fromObject(t) {
                if (k.isErrorFragment(t))
                    return t;
                "error" !== t.type && a.throwArgumentError("invalid error object", "value", t);
                let e = {
                    type: t.type,
                    name: P(t.name),
                    inputs: t.inputs ? t.inputs.map(m.fromObject) : []
                };
                return A(new k(u,e))
            }
            static fromString(t) {
                let e = {
                    type: "error"
                }
                  , r = t.match(S);
                return r || a.throwArgumentError("invalid error signature", "value", t),
                e.name = r[1].trim(),
                e.name && P(e.name),
                e.inputs = g(r[2], !1),
                A(k.fromObject(e))
            }
            static isErrorFragment(t) {
                return t && t._isFragment && "error" === t.type
            }
        }
        function N(t) {
            return t.match(/^uint($|[^1-9])/) ? t = "uint256" + t.substring(4) : t.match(/^int($|[^1-9])/) && (t = "int256" + t.substring(3)),
            t
        }
        let M = RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
        function P(t) {
            return t && t.match(M) || a.throwArgumentError(`invalid identifier "${t}"`, "value", t),
            t
        }
        let S = RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$")
    },
    8198: function(t, e, r) {
        "use strict";
        r.d(e, {
            CC: function() {
                return p
            },
            Hk: function() {
                return y
            },
            vU: function() {
                return w
            },
            vk: function() {
                return m
            }
        });
        var n = r(9485)
          , i = r(2593)
          , o = r(6441)
          , s = r(2046)
          , a = r(8197)
          , u = r(6881)
          , l = r(4243)
          , h = r(1388)
          , f = r(1581)
          , c = r(5851);
        let d = new f.Logger(c.i);
        class p extends u.Description {
        }
        class m extends u.Description {
        }
        class g extends u.Description {
        }
        class y extends u.Description {
            static isIndexed(t) {
                return !!(t && t._isIndexed)
            }
        }
        let v = {
            "0x08c379a0": {
                signature: "Error(string)",
                name: "Error",
                inputs: ["string"],
                reason: !0
            },
            "0x4e487b71": {
                signature: "Panic(uint256)",
                name: "Panic",
                inputs: ["uint256"]
            }
        };
        function b(t, e) {
            let r = Error(`deferred error during ABI decoding triggered accessing ${t}`);
            return r.error = e,
            r
        }
        class w {
            constructor(t) {
                let e = [];
                e = "string" == typeof t ? JSON.parse(t) : t,
                (0,
                u.defineReadOnly)(this, "fragments", e.map(t=>h.HY.from(t)).filter(t=>null != t)),
                (0,
                u.defineReadOnly)(this, "_abiCoder", (0,
                u.getStatic)(new.target, "getAbiCoder")()),
                (0,
                u.defineReadOnly)(this, "functions", {}),
                (0,
                u.defineReadOnly)(this, "errors", {}),
                (0,
                u.defineReadOnly)(this, "events", {}),
                (0,
                u.defineReadOnly)(this, "structs", {}),
                this.fragments.forEach(t=>{
                    let e = null;
                    switch (t.type) {
                    case "constructor":
                        if (this.deploy) {
                            d.warn("duplicate definition - constructor");
                            return
                        }
                        (0,
                        u.defineReadOnly)(this, "deploy", t);
                        return;
                    case "function":
                        e = this.functions;
                        break;
                    case "event":
                        e = this.events;
                        break;
                    case "error":
                        e = this.errors;
                        break;
                    default:
                        return
                    }
                    let r = t.format();
                    if (e[r]) {
                        d.warn("duplicate definition - " + r);
                        return
                    }
                    e[r] = t
                }
                ),
                this.deploy || (0,
                u.defineReadOnly)(this, "deploy", h.Xg.from({
                    payable: !1,
                    type: "constructor"
                })),
                (0,
                u.defineReadOnly)(this, "_isInterface", !0)
            }
            format(t) {
                t || (t = h.pc.full),
                t === h.pc.sighash && d.throwArgumentError("interface does not support formatting sighash", "format", t);
                let e = this.fragments.map(e=>e.format(t));
                return t === h.pc.json ? JSON.stringify(e.map(t=>JSON.parse(t))) : e
            }
            static getAbiCoder() {
                return l.$
            }
            static getAddress(t) {
                return (0,
                n.getAddress)(t)
            }
            static getSighash(t) {
                return (0,
                o.hexDataSlice)((0,
                s.id)(t.format()), 0, 4)
            }
            static getEventTopic(t) {
                return (0,
                s.id)(t.format())
            }
            getFunction(t) {
                if ((0,
                o.isHexString)(t)) {
                    for (let e in this.functions)
                        if (t === this.getSighash(e))
                            return this.functions[e];
                    d.throwArgumentError("no matching function", "sighash", t)
                }
                if (-1 === t.indexOf("(")) {
                    let r = t.trim()
                      , n = Object.keys(this.functions).filter(t=>t.split("(")[0] === r);
                    return 0 === n.length ? d.throwArgumentError("no matching function", "name", r) : n.length > 1 && d.throwArgumentError("multiple matching functions", "name", r),
                    this.functions[n[0]]
                }
                let i = this.functions[h.YW.fromString(t).format()];
                return i || d.throwArgumentError("no matching function", "signature", t),
                i
            }
            getEvent(t) {
                if ((0,
                o.isHexString)(t)) {
                    let e = t.toLowerCase();
                    for (let r in this.events)
                        if (e === this.getEventTopic(r))
                            return this.events[r];
                    d.throwArgumentError("no matching event", "topichash", e)
                }
                if (-1 === t.indexOf("(")) {
                    let n = t.trim()
                      , i = Object.keys(this.events).filter(t=>t.split("(")[0] === n);
                    return 0 === i.length ? d.throwArgumentError("no matching event", "name", n) : i.length > 1 && d.throwArgumentError("multiple matching events", "name", n),
                    this.events[i[0]]
                }
                let s = this.events[h.QV.fromString(t).format()];
                return s || d.throwArgumentError("no matching event", "signature", t),
                s
            }
            getError(t) {
                if ((0,
                o.isHexString)(t)) {
                    let e = (0,
                    u.getStatic)(this.constructor, "getSighash");
                    for (let r in this.errors) {
                        let n = this.errors[r];
                        if (t === e(n))
                            return this.errors[r]
                    }
                    d.throwArgumentError("no matching error", "sighash", t)
                }
                if (-1 === t.indexOf("(")) {
                    let i = t.trim()
                      , s = Object.keys(this.errors).filter(t=>t.split("(")[0] === i);
                    return 0 === s.length ? d.throwArgumentError("no matching error", "name", i) : s.length > 1 && d.throwArgumentError("multiple matching errors", "name", i),
                    this.errors[s[0]]
                }
                let a = this.errors[h.YW.fromString(t).format()];
                return a || d.throwArgumentError("no matching error", "signature", t),
                a
            }
            getSighash(t) {
                if ("string" == typeof t)
                    try {
                        t = this.getFunction(t)
                    } catch (r) {
                        try {
                            t = this.getError(t)
                        } catch (e) {
                            throw r
                        }
                    }
                return (0,
                u.getStatic)(this.constructor, "getSighash")(t)
            }
            getEventTopic(t) {
                return "string" == typeof t && (t = this.getEvent(t)),
                (0,
                u.getStatic)(this.constructor, "getEventTopic")(t)
            }
            _decodeParams(t, e) {
                return this._abiCoder.decode(t, e)
            }
            _encodeParams(t, e) {
                return this._abiCoder.encode(t, e)
            }
            encodeDeploy(t) {
                return this._encodeParams(this.deploy.inputs, t || [])
            }
            decodeErrorResult(t, e) {
                "string" == typeof t && (t = this.getError(t));
                let r = (0,
                o.arrayify)(e);
                return (0,
                o.hexlify)(r.slice(0, 4)) !== this.getSighash(t) && d.throwArgumentError(`data signature does not match error ${t.name}.`, "data", (0,
                o.hexlify)(r)),
                this._decodeParams(t.inputs, r.slice(4))
            }
            encodeErrorResult(t, e) {
                return "string" == typeof t && (t = this.getError(t)),
                (0,
                o.hexlify)((0,
                o.concat)([this.getSighash(t), this._encodeParams(t.inputs, e || [])]))
            }
            decodeFunctionData(t, e) {
                "string" == typeof t && (t = this.getFunction(t));
                let r = (0,
                o.arrayify)(e);
                return (0,
                o.hexlify)(r.slice(0, 4)) !== this.getSighash(t) && d.throwArgumentError(`data signature does not match function ${t.name}.`, "data", (0,
                o.hexlify)(r)),
                this._decodeParams(t.inputs, r.slice(4))
            }
            encodeFunctionData(t, e) {
                return "string" == typeof t && (t = this.getFunction(t)),
                (0,
                o.hexlify)((0,
                o.concat)([this.getSighash(t), this._encodeParams(t.inputs, e || [])]))
            }
            decodeFunctionResult(t, e) {
                "string" == typeof t && (t = this.getFunction(t));
                let r = (0,
                o.arrayify)(e)
                  , n = null
                  , i = ""
                  , s = null
                  , a = null
                  , u = null;
                switch (r.length % this._abiCoder._getWordSize()) {
                case 0:
                    try {
                        return this._abiCoder.decode(t.outputs, r)
                    } catch (l) {}
                    break;
                case 4:
                    {
                        let h = (0,
                        o.hexlify)(r.slice(0, 4))
                          , c = v[h];
                        if (c)
                            s = this._abiCoder.decode(c.inputs, r.slice(4)),
                            a = c.name,
                            u = c.signature,
                            c.reason && (n = s[0]),
                            "Error" === a ? i = `; VM Exception while processing transaction: reverted with reason string ${JSON.stringify(s[0])}` : "Panic" === a && (i = `; VM Exception while processing transaction: reverted with panic code ${s[0]}`);
                        else
                            try {
                                let p = this.getError(h);
                                s = this._abiCoder.decode(p.inputs, r.slice(4)),
                                a = p.name,
                                u = p.format()
                            } catch (m) {}
                    }
                }
                return d.throwError("call revert exception" + i, f.Logger.errors.CALL_EXCEPTION, {
                    method: t.format(),
                    data: (0,
                    o.hexlify)(e),
                    errorArgs: s,
                    errorName: a,
                    errorSignature: u,
                    reason: n
                })
            }
            encodeFunctionResult(t, e) {
                return "string" == typeof t && (t = this.getFunction(t)),
                (0,
                o.hexlify)(this._abiCoder.encode(t.outputs, e || []))
            }
            encodeFilterTopics(t, e) {
                "string" == typeof t && (t = this.getEvent(t)),
                e.length > t.inputs.length && d.throwError("too many arguments for " + t.format(), f.Logger.errors.UNEXPECTED_ARGUMENT, {
                    argument: "values",
                    value: e
                });
                let r = [];
                t.anonymous || r.push(this.getEventTopic(t));
                let n = (t,e)=>"string" === t.type ? (0,
                s.id)(e) : "bytes" === t.type ? (0,
                a.keccak256)((0,
                o.hexlify)(e)) : ("bool" === t.type && "boolean" == typeof e && (e = e ? "0x01" : "0x00"),
                t.type.match(/^u?int/) && (e = i.O$.from(e).toHexString()),
                "address" === t.type && this._abiCoder.encode(["address"], [e]),
                (0,
                o.hexZeroPad)((0,
                o.hexlify)(e), 32));
                for (e.forEach((e,i)=>{
                    let o = t.inputs[i];
                    if (!o.indexed) {
                        null != e && d.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + o.name, e);
                        return
                    }
                    null == e ? r.push(null) : "array" === o.baseType || "tuple" === o.baseType ? d.throwArgumentError("filtering with tuples or arrays not supported", "contract." + o.name, e) : Array.isArray(e) ? r.push(e.map(t=>n(o, t))) : r.push(n(o, e))
                }
                ); r.length && null === r[r.length - 1]; )
                    r.pop();
                return r
            }
            encodeEventLog(t, e) {
                "string" == typeof t && (t = this.getEvent(t));
                let r = []
                  , n = []
                  , i = [];
                return t.anonymous || r.push(this.getEventTopic(t)),
                e.length !== t.inputs.length && d.throwArgumentError("event arguments/values mismatch", "values", e),
                t.inputs.forEach((t,o)=>{
                    let u = e[o];
                    if (t.indexed) {
                        if ("string" === t.type)
                            r.push((0,
                            s.id)(u));
                        else if ("bytes" === t.type)
                            r.push((0,
                            a.keccak256)(u));
                        else if ("tuple" === t.baseType || "array" === t.baseType)
                            throw Error("not implemented");
                        else
                            r.push(this._abiCoder.encode([t.type], [u]))
                    } else
                        n.push(t),
                        i.push(u)
                }
                ),
                {
                    data: this._abiCoder.encode(n, i),
                    topics: r
                }
            }
            decodeEventLog(t, e, r) {
                if ("string" == typeof t && (t = this.getEvent(t)),
                null != r && !t.anonymous) {
                    let n = this.getEventTopic(t);
                    (0,
                    o.isHexString)(r[0], 32) && r[0].toLowerCase() === n || d.throwError("fragment/topic mismatch", f.Logger.errors.INVALID_ARGUMENT, {
                        argument: "topics[0]",
                        expected: n,
                        value: r[0]
                    }),
                    r = r.slice(1)
                }
                let i = []
                  , s = []
                  , a = [];
                t.inputs.forEach((t,e)=>{
                    t.indexed ? "string" === t.type || "bytes" === t.type || "tuple" === t.baseType || "array" === t.baseType ? (i.push(h._R.fromObject({
                        type: "bytes32",
                        name: t.name
                    })),
                    a.push(!0)) : (i.push(t),
                    a.push(!1)) : (s.push(t),
                    a.push(!1))
                }
                );
                let u = null != r ? this._abiCoder.decode(i, (0,
                o.concat)(r)) : null
                  , l = this._abiCoder.decode(s, e, !0)
                  , c = []
                  , p = 0
                  , m = 0;
                t.inputs.forEach((t,e)=>{
                    if (t.indexed) {
                        if (null == u)
                            c[e] = new y({
                                _isIndexed: !0,
                                hash: null
                            });
                        else if (a[e])
                            c[e] = new y({
                                _isIndexed: !0,
                                hash: u[m++]
                            });
                        else
                            try {
                                c[e] = u[m++]
                            } catch (r) {
                                c[e] = r
                            }
                    } else
                        try {
                            c[e] = l[p++]
                        } catch (n) {
                            c[e] = n
                        }
                    if (t.name && null == c[t.name]) {
                        let i = c[e];
                        i instanceof Error ? Object.defineProperty(c, t.name, {
                            enumerable: !0,
                            get() {
                                throw b(`property ${JSON.stringify(t.name)}`, i)
                            }
                        }) : c[t.name] = i
                    }
                }
                );
                for (let g = 0; g < c.length; g++) {
                    let v = c[g];
                    v instanceof Error && Object.defineProperty(c, g, {
                        enumerable: !0,
                        get() {
                            throw b(`index ${g}`, v)
                        }
                    })
                }
                return Object.freeze(c)
            }
            parseTransaction(t) {
                let e = this.getFunction(t.data.substring(0, 10).toLowerCase());
                return e ? new m({
                    args: this._abiCoder.decode(e.inputs, "0x" + t.data.substring(10)),
                    functionFragment: e,
                    name: e.name,
                    signature: e.format(),
                    sighash: this.getSighash(e),
                    value: i.O$.from(t.value || "0")
                }) : null
            }
            parseLog(t) {
                let e = this.getEvent(t.topics[0]);
                return !e || e.anonymous ? null : new p({
                    eventFragment: e,
                    name: e.name,
                    signature: e.format(),
                    topic: this.getEventTopic(e),
                    args: this.decodeEventLog(e, t.data, t.topics)
                })
            }
            parseError(t) {
                let e = (0,
                o.hexlify)(t)
                  , r = this.getError(e.substring(0, 10).toLowerCase());
                return r ? new g({
                    args: this._abiCoder.decode(r.inputs, "0x" + e.substring(10)),
                    errorFragment: r,
                    name: r.name,
                    signature: r.format(),
                    sighash: this.getSighash(r)
                }) : null
            }
            static isInterface(t) {
                return !!(t && t._isInterface)
            }
        }
    },
    1556: function(t, e, r) {
        "use strict";
        r.d(e, {
            Sg: function() {
                return a
            },
            zt: function() {
                return u
            }
        });
        var n = r(2593)
          , i = r(6881)
          , o = r(1581);
        let s = new o.Logger("abstract-provider/5.6.1");
        class a extends i.Description {
            static isForkEvent(t) {
                return !!(t && t._isForkEvent)
            }
        }
        class u {
            constructor() {
                s.checkAbstract(new.target, u),
                (0,
                i.defineReadOnly)(this, "_isProvider", !0)
            }
            getFeeData() {
                var t, e, r, o;
                return t = this,
                e = void 0,
                r = void 0,
                o = function*() {
                    let {block: t, gasPrice: e} = yield(0,
                    i.resolveProperties)({
                        block: this.getBlock("latest"),
                        gasPrice: this.getGasPrice().catch(t=>null)
                    })
                      , r = null
                      , o = null;
                    return t && t.baseFeePerGas && (o = n.O$.from("1500000000"),
                    r = t.baseFeePerGas.mul(2).add(o)),
                    {
                        maxFeePerGas: r,
                        maxPriorityFeePerGas: o,
                        gasPrice: e
                    }
                }
                ,
                new (r || (r = Promise))(function(n, i) {
                    function s(t) {
                        try {
                            u(o.next(t))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(t) {
                        try {
                            u(o.throw(t))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function u(t) {
                        var e;
                        t.done ? n(t.value) : ((e = t.value)instanceof r ? e : new r(function(t) {
                            t(e)
                        }
                        )).then(s, a)
                    }
                    u((o = o.apply(t, e || [])).next())
                }
                )
            }
            addListener(t, e) {
                return this.on(t, e)
            }
            removeListener(t, e) {
                return this.off(t, e)
            }
            static isProvider(t) {
                return !!(t && t._isProvider)
            }
        }
    },
    8088: function(t, e, r) {
        "use strict";
        r.d(e, {
            E: function() {
                return l
            },
            b: function() {
                return h
            }
        });
        var n = r(6881)
          , i = r(1581)
          , o = function(t, e, r, n) {
            return new (r || (r = Promise))(function(i, o) {
                function s(t) {
                    try {
                        u(n.next(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function a(t) {
                    try {
                        u(n.throw(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function u(t) {
                    var e;
                    t.done ? i(t.value) : ((e = t.value)instanceof r ? e : new r(function(t) {
                        t(e)
                    }
                    )).then(s, a)
                }
                u((n = n.apply(t, e || [])).next())
            }
            )
        };
        let s = new i.Logger("abstract-signer/5.6.2")
          , a = ["accessList", "ccipReadEnabled", "chainId", "customData", "data", "from", "gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "type", "value"]
          , u = [i.Logger.errors.INSUFFICIENT_FUNDS, i.Logger.errors.NONCE_EXPIRED, i.Logger.errors.REPLACEMENT_UNDERPRICED];
        class l {
            constructor() {
                s.checkAbstract(new.target, l),
                (0,
                n.defineReadOnly)(this, "_isSigner", !0)
            }
            getBalance(t) {
                return o(this, void 0, void 0, function*() {
                    return this._checkProvider("getBalance"),
                    yield this.provider.getBalance(this.getAddress(), t)
                })
            }
            getTransactionCount(t) {
                return o(this, void 0, void 0, function*() {
                    return this._checkProvider("getTransactionCount"),
                    yield this.provider.getTransactionCount(this.getAddress(), t)
                })
            }
            estimateGas(t) {
                return o(this, void 0, void 0, function*() {
                    this._checkProvider("estimateGas");
                    let e = yield(0,
                    n.resolveProperties)(this.checkTransaction(t));
                    return yield this.provider.estimateGas(e)
                })
            }
            call(t, e) {
                return o(this, void 0, void 0, function*() {
                    this._checkProvider("call");
                    let r = yield(0,
                    n.resolveProperties)(this.checkTransaction(t));
                    return yield this.provider.call(r, e)
                })
            }
            sendTransaction(t) {
                return o(this, void 0, void 0, function*() {
                    this._checkProvider("sendTransaction");
                    let e = yield this.populateTransaction(t)
                      , r = yield this.signTransaction(e);
                    return yield this.provider.sendTransaction(r)
                })
            }
            getChainId() {
                return o(this, void 0, void 0, function*() {
                    this._checkProvider("getChainId");
                    let t = yield this.provider.getNetwork();
                    return t.chainId
                })
            }
            getGasPrice() {
                return o(this, void 0, void 0, function*() {
                    return this._checkProvider("getGasPrice"),
                    yield this.provider.getGasPrice()
                })
            }
            getFeeData() {
                return o(this, void 0, void 0, function*() {
                    return this._checkProvider("getFeeData"),
                    yield this.provider.getFeeData()
                })
            }
            resolveName(t) {
                return o(this, void 0, void 0, function*() {
                    return this._checkProvider("resolveName"),
                    yield this.provider.resolveName(t)
                })
            }
            checkTransaction(t) {
                for (let e in t)
                    -1 === a.indexOf(e) && s.throwArgumentError("invalid transaction key: " + e, "transaction", t);
                let r = (0,
                n.shallowCopy)(t);
                return null == r.from ? r.from = this.getAddress() : r.from = Promise.all([Promise.resolve(r.from), this.getAddress()]).then(e=>(e[0].toLowerCase() !== e[1].toLowerCase() && s.throwArgumentError("from address mismatch", "transaction", t),
                e[0])),
                r
            }
            populateTransaction(t) {
                return o(this, void 0, void 0, function*() {
                    let e = yield(0,
                    n.resolveProperties)(this.checkTransaction(t));
                    null != e.to && (e.to = Promise.resolve(e.to).then(t=>o(this, void 0, void 0, function*() {
                        if (null == t)
                            return null;
                        let e = yield this.resolveName(t);
                        return null == e && s.throwArgumentError("provided ENS name resolves to null", "tx.to", t),
                        e
                    })),
                    e.to.catch(t=>{}
                    ));
                    let r = null != e.maxFeePerGas || null != e.maxPriorityFeePerGas;
                    if (null != e.gasPrice && (2 === e.type || r) ? s.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", t) : (0 === e.type || 1 === e.type) && r && s.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", t),
                    (2 === e.type || null == e.type) && null != e.maxFeePerGas && null != e.maxPriorityFeePerGas)
                        e.type = 2;
                    else if (0 === e.type || 1 === e.type)
                        null == e.gasPrice && (e.gasPrice = this.getGasPrice());
                    else {
                        let a = yield this.getFeeData();
                        if (null == e.type) {
                            if (null != a.maxFeePerGas && null != a.maxPriorityFeePerGas) {
                                if (e.type = 2,
                                null != e.gasPrice) {
                                    let l = e.gasPrice;
                                    delete e.gasPrice,
                                    e.maxFeePerGas = l,
                                    e.maxPriorityFeePerGas = l
                                } else
                                    null == e.maxFeePerGas && (e.maxFeePerGas = a.maxFeePerGas),
                                    null == e.maxPriorityFeePerGas && (e.maxPriorityFeePerGas = a.maxPriorityFeePerGas)
                            } else
                                null != a.gasPrice ? (r && s.throwError("network does not support EIP-1559", i.Logger.errors.UNSUPPORTED_OPERATION, {
                                    operation: "populateTransaction"
                                }),
                                null == e.gasPrice && (e.gasPrice = a.gasPrice),
                                e.type = 0) : s.throwError("failed to get consistent fee data", i.Logger.errors.UNSUPPORTED_OPERATION, {
                                    operation: "signer.getFeeData"
                                })
                        } else
                            2 === e.type && (null == e.maxFeePerGas && (e.maxFeePerGas = a.maxFeePerGas),
                            null == e.maxPriorityFeePerGas && (e.maxPriorityFeePerGas = a.maxPriorityFeePerGas))
                    }
                    return null == e.nonce && (e.nonce = this.getTransactionCount("pending")),
                    null == e.gasLimit && (e.gasLimit = this.estimateGas(e).catch(t=>{
                        if (u.indexOf(t.code) >= 0)
                            throw t;
                        return s.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", i.Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
                            error: t,
                            tx: e
                        })
                    }
                    )),
                    null == e.chainId ? e.chainId = this.getChainId() : e.chainId = Promise.all([Promise.resolve(e.chainId), this.getChainId()]).then(e=>(0 !== e[1] && e[0] !== e[1] && s.throwArgumentError("chainId address mismatch", "transaction", t),
                    e[0])),
                    yield(0,
                    n.resolveProperties)(e)
                })
            }
            _checkProvider(t) {
                this.provider || s.throwError("missing provider", i.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: t || "_checkProvider"
                })
            }
            static isSigner(t) {
                return !!(t && t._isSigner)
            }
        }
        class h extends l {
            constructor(t, e) {
                super(),
                (0,
                n.defineReadOnly)(this, "address", t),
                (0,
                n.defineReadOnly)(this, "provider", e || null)
            }
            getAddress() {
                return Promise.resolve(this.address)
            }
            _fail(t, e) {
                return Promise.resolve().then(()=>{
                    s.throwError(t, i.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: e
                    })
                }
                )
            }
            signMessage(t) {
                return this._fail("VoidSigner cannot sign messages", "signMessage")
            }
            signTransaction(t) {
                return this._fail("VoidSigner cannot sign transactions", "signTransaction")
            }
            _signTypedData(t, e, r) {
                return this._fail("VoidSigner cannot sign typed data", "signTypedData")
            }
            connect(t) {
                return new h(this.address,t)
            }
        }
    },
    9485: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            getAddress: function() {
                return m
            },
            getContractAddress: function() {
                return v
            },
            getCreate2Address: function() {
                return b
            },
            getIcapAddress: function() {
                return y
            },
            isAddress: function() {
                return g
            }
        });
        var n = r(6441)
          , i = r(2593)
          , o = r(8197)
          , s = r(9052)
          , a = r(1581);
        let u = new a.Logger("address/5.6.1");
        function l(t) {
            (0,
            n.isHexString)(t, 20) || u.throwArgumentError("invalid address", "address", t),
            t = t.toLowerCase();
            let e = t.substring(2).split("")
              , r = new Uint8Array(40);
            for (let i = 0; i < 40; i++)
                r[i] = e[i].charCodeAt(0);
            let s = (0,
            n.arrayify)((0,
            o.keccak256)(r));
            for (let a = 0; a < 40; a += 2)
                s[a >> 1] >> 4 >= 8 && (e[a] = e[a].toUpperCase()),
                (15 & s[a >> 1]) >= 8 && (e[a + 1] = e[a + 1].toUpperCase());
            return "0x" + e.join("")
        }
        let h = {};
        for (let f = 0; f < 10; f++)
            h[String(f)] = String(f);
        for (let c = 0; c < 26; c++)
            h[String.fromCharCode(65 + c)] = String(10 + c);
        let d = Math.floor(Math.log10 ? Math.log10(9007199254740991) : Math.log(9007199254740991) / Math.LN10);
        function p(t) {
            let e = (t = (t = t.toUpperCase()).substring(4) + t.substring(0, 2) + "00").split("").map(t=>h[t]).join("");
            for (; e.length >= d; ) {
                let r = e.substring(0, d);
                e = parseInt(r, 10) % 97 + e.substring(r.length)
            }
            let n = String(98 - parseInt(e, 10) % 97);
            for (; n.length < 2; )
                n = "0" + n;
            return n
        }
        function m(t) {
            let e = null;
            if ("string" != typeof t && u.throwArgumentError("invalid address", "address", t),
            t.match(/^(0x)?[0-9a-fA-F]{40}$/))
                "0x" !== t.substring(0, 2) && (t = "0x" + t),
                e = l(t),
                t.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && e !== t && u.throwArgumentError("bad address checksum", "address", t);
            else if (t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
                for (t.substring(2, 4) !== p(t) && u.throwArgumentError("bad icap checksum", "address", t),
                e = (0,
                i.g$)(t.substring(4)); e.length < 40; )
                    e = "0" + e;
                e = l("0x" + e)
            } else
                u.throwArgumentError("invalid address", "address", t);
            return e
        }
        function g(t) {
            try {
                return m(t),
                !0
            } catch (e) {}
            return !1
        }
        function y(t) {
            let e = (0,
            i.t2)(m(t).substring(2)).toUpperCase();
            for (; e.length < 30; )
                e = "0" + e;
            return "XE" + p("XE00" + e) + e
        }
        function v(t) {
            let e = null;
            try {
                e = m(t.from)
            } catch (r) {
                u.throwArgumentError("missing from address", "transaction", t)
            }
            let a = (0,
            n.stripZeros)((0,
            n.arrayify)(i.O$.from(t.nonce).toHexString()));
            return m((0,
            n.hexDataSlice)((0,
            o.keccak256)((0,
            s.encode)([e, a])), 12))
        }
        function b(t, e, r) {
            return 32 !== (0,
            n.hexDataLength)(e) && u.throwArgumentError("salt must be 32 bytes", "salt", e),
            32 !== (0,
            n.hexDataLength)(r) && u.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", r),
            m((0,
            n.hexDataSlice)((0,
            o.keccak256)((0,
            n.concat)(["0xff", m(t), e, r])), 12))
        }
    },
    9567: function(t, e, r) {
        "use strict";
        r.d(e, {
            J: function() {
                return i
            },
            c: function() {
                return o
            }
        });
        var n = r(6441);
        function i(t) {
            t = atob(t);
            let e = [];
            for (let r = 0; r < t.length; r++)
                e.push(t.charCodeAt(r));
            return (0,
            n.arrayify)(e)
        }
        function o(t) {
            t = (0,
            n.arrayify)(t);
            let e = "";
            for (let r = 0; r < t.length; r++)
                e += String.fromCharCode(t[r]);
            return btoa(e)
        }
    },
    7727: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            Base32: function() {
                return s
            },
            Base58: function() {
                return a
            },
            BaseX: function() {
                return o
            }
        });
        var n = r(6441)
          , i = r(6881);
        class o {
            constructor(t) {
                (0,
                i.defineReadOnly)(this, "alphabet", t),
                (0,
                i.defineReadOnly)(this, "base", t.length),
                (0,
                i.defineReadOnly)(this, "_alphabetMap", {}),
                (0,
                i.defineReadOnly)(this, "_leader", t.charAt(0));
                for (let e = 0; e < t.length; e++)
                    this._alphabetMap[t.charAt(e)] = e
            }
            encode(t) {
                let e = (0,
                n.arrayify)(t);
                if (0 === e.length)
                    return "";
                let r = [0];
                for (let i = 0; i < e.length; ++i) {
                    let o = e[i];
                    for (let s = 0; s < r.length; ++s)
                        o += r[s] << 8,
                        r[s] = o % this.base,
                        o = o / this.base | 0;
                    for (; o > 0; )
                        r.push(o % this.base),
                        o = o / this.base | 0
                }
                let a = "";
                for (let u = 0; 0 === e[u] && u < e.length - 1; ++u)
                    a += this._leader;
                for (let l = r.length - 1; l >= 0; --l)
                    a += this.alphabet[r[l]];
                return a
            }
            decode(t) {
                if ("string" != typeof t)
                    throw TypeError("Expected String");
                let e = [];
                if (0 === t.length)
                    return new Uint8Array(e);
                e.push(0);
                for (let r = 0; r < t.length; r++) {
                    let i = this._alphabetMap[t[r]];
                    if (void 0 === i)
                        throw Error("Non-base" + this.base + " character");
                    let o = i;
                    for (let s = 0; s < e.length; ++s)
                        o += e[s] * this.base,
                        e[s] = 255 & o,
                        o >>= 8;
                    for (; o > 0; )
                        e.push(255 & o),
                        o >>= 8
                }
                for (let a = 0; t[a] === this._leader && a < t.length - 1; ++a)
                    e.push(0);
                return (0,
                n.arrayify)(new Uint8Array(e.reverse()))
            }
        }
        let s = new o("abcdefghijklmnopqrstuvwxyz234567")
          , a = new o("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
    },
    8794: function(t, e, r) {
        "use strict";
        r.d(e, {
            i: function() {
                return n
            }
        });
        let n = "bignumber/5.6.2"
    },
    2593: function(t, e, r) {
        "use strict";
        r.d(e, {
            O$: function() {
                return d
            },
            Zm: function() {
                return f
            },
            g$: function() {
                return v
            },
            t2: function() {
                return b
            }
        });
        var n = r(3550)
          , i = r.n(n)
          , o = r(6441)
          , s = r(1581)
          , a = r(8794)
          , u = i().BN;
        let l = new s.Logger(a.i)
          , h = {};
        function f(t) {
            return null != t && (d.isBigNumber(t) || "number" == typeof t && t % 1 == 0 || "string" == typeof t && !!t.match(/^-?[0-9]+$/) || (0,
            o.isHexString)(t) || "bigint" == typeof t || (0,
            o.isBytes)(t))
        }
        let c = !1;
        class d {
            constructor(t, e) {
                t !== h && l.throwError("cannot call constructor directly; use BigNumber.from", s.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "new (BigNumber)"
                }),
                this._hex = e,
                this._isBigNumber = !0,
                Object.freeze(this)
            }
            fromTwos(t) {
                return m(g(this).fromTwos(t))
            }
            toTwos(t) {
                return m(g(this).toTwos(t))
            }
            abs() {
                return "-" === this._hex[0] ? d.from(this._hex.substring(1)) : this
            }
            add(t) {
                return m(g(this).add(g(t)))
            }
            sub(t) {
                return m(g(this).sub(g(t)))
            }
            div(t) {
                let e = d.from(t);
                return e.isZero() && y("division-by-zero", "div"),
                m(g(this).div(g(t)))
            }
            mul(t) {
                return m(g(this).mul(g(t)))
            }
            mod(t) {
                let e = g(t);
                return e.isNeg() && y("division-by-zero", "mod"),
                m(g(this).umod(e))
            }
            pow(t) {
                let e = g(t);
                return e.isNeg() && y("negative-power", "pow"),
                m(g(this).pow(e))
            }
            and(t) {
                let e = g(t);
                return (this.isNegative() || e.isNeg()) && y("unbound-bitwise-result", "and"),
                m(g(this).and(e))
            }
            or(t) {
                let e = g(t);
                return (this.isNegative() || e.isNeg()) && y("unbound-bitwise-result", "or"),
                m(g(this).or(e))
            }
            xor(t) {
                let e = g(t);
                return (this.isNegative() || e.isNeg()) && y("unbound-bitwise-result", "xor"),
                m(g(this).xor(e))
            }
            mask(t) {
                return (this.isNegative() || t < 0) && y("negative-width", "mask"),
                m(g(this).maskn(t))
            }
            shl(t) {
                return (this.isNegative() || t < 0) && y("negative-width", "shl"),
                m(g(this).shln(t))
            }
            shr(t) {
                return (this.isNegative() || t < 0) && y("negative-width", "shr"),
                m(g(this).shrn(t))
            }
            eq(t) {
                return g(this).eq(g(t))
            }
            lt(t) {
                return g(this).lt(g(t))
            }
            lte(t) {
                return g(this).lte(g(t))
            }
            gt(t) {
                return g(this).gt(g(t))
            }
            gte(t) {
                return g(this).gte(g(t))
            }
            isNegative() {
                return "-" === this._hex[0]
            }
            isZero() {
                return g(this).isZero()
            }
            toNumber() {
                try {
                    return g(this).toNumber()
                } catch (t) {
                    y("overflow", "toNumber", this.toString())
                }
                return null
            }
            toBigInt() {
                try {
                    return BigInt(this.toString())
                } catch (t) {}
                return l.throwError("this platform does not support BigInt", s.Logger.errors.UNSUPPORTED_OPERATION, {
                    value: this.toString()
                })
            }
            toString() {
                return arguments.length > 0 && (10 === arguments[0] ? c || (c = !0,
                l.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : 16 === arguments[0] ? l.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", s.Logger.errors.UNEXPECTED_ARGUMENT, {}) : l.throwError("BigNumber.toString does not accept parameters", s.Logger.errors.UNEXPECTED_ARGUMENT, {})),
                g(this).toString(10)
            }
            toHexString() {
                return this._hex
            }
            toJSON(t) {
                return {
                    type: "BigNumber",
                    hex: this.toHexString()
                }
            }
            static from(t) {
                if (t instanceof d)
                    return t;
                if ("string" == typeof t)
                    return t.match(/^-?0x[0-9a-f]+$/i) ? new d(h,p(t)) : t.match(/^-?[0-9]+$/) ? new d(h,p(new u(t))) : l.throwArgumentError("invalid BigNumber string", "value", t);
                if ("number" == typeof t)
                    return t % 1 && y("underflow", "BigNumber.from", t),
                    (t >= 9007199254740991 || t <= -9007199254740991) && y("overflow", "BigNumber.from", t),
                    d.from(String(t));
                if ("bigint" == typeof t)
                    return d.from(t.toString());
                if ((0,
                o.isBytes)(t))
                    return d.from((0,
                    o.hexlify)(t));
                if (t) {
                    if (t.toHexString) {
                        let e = t.toHexString();
                        if ("string" == typeof e)
                            return d.from(e)
                    } else {
                        let r = t._hex;
                        if (null == r && "BigNumber" === t.type && (r = t.hex),
                        "string" == typeof r && ((0,
                        o.isHexString)(r) || "-" === r[0] && (0,
                        o.isHexString)(r.substring(1))))
                            return d.from(r)
                    }
                }
                return l.throwArgumentError("invalid BigNumber value", "value", t)
            }
            static isBigNumber(t) {
                return !!(t && t._isBigNumber)
            }
        }
        function p(t) {
            if ("string" != typeof t)
                return p(t.toString(16));
            if ("-" === t[0])
                return ("-" === (t = t.substring(1))[0] && l.throwArgumentError("invalid hex", "value", t),
                "0x00" === (t = p(t))) ? t : "-" + t;
            if ("0x" !== t.substring(0, 2) && (t = "0x" + t),
            "0x" === t)
                return "0x00";
            for (t.length % 2 && (t = "0x0" + t.substring(2)); t.length > 4 && "0x00" === t.substring(0, 4); )
                t = "0x" + t.substring(4);
            return t
        }
        function m(t) {
            return d.from(p(t))
        }
        function g(t) {
            let e = d.from(t).toHexString();
            return "-" === e[0] ? new u("-" + e.substring(3),16) : new u(e.substring(2),16)
        }
        function y(t, e, r) {
            let n = {
                fault: t,
                operation: e
            };
            return null != r && (n.value = r),
            l.throwError(t, s.Logger.errors.NUMERIC_FAULT, n)
        }
        function v(t) {
            return new u(t,36).toString(16)
        }
        function b(t) {
            return new u(t,16).toString(36)
        }
    },
    6441: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            arrayify: function() {
                return h
            },
            concat: function() {
                return f
            },
            hexConcat: function() {
                return b
            },
            hexDataLength: function() {
                return y
            },
            hexDataSlice: function() {
                return v
            },
            hexStripZeros: function() {
                return E
            },
            hexValue: function() {
                return w
            },
            hexZeroPad: function() {
                return _
            },
            hexlify: function() {
                return g
            },
            isBytes: function() {
                return l
            },
            isBytesLike: function() {
                return a
            },
            isHexString: function() {
                return p
            },
            joinSignature: function() {
                return A
            },
            splitSignature: function() {
                return x
            },
            stripZeros: function() {
                return c
            },
            zeroPad: function() {
                return d
            }
        });
        var n = r(1581);
        let i = new n.Logger("bytes/5.6.1");
        function o(t) {
            return !!t.toHexString
        }
        function s(t) {
            return t.slice || (t.slice = function() {
                let e = Array.prototype.slice.call(arguments);
                return s(new Uint8Array(Array.prototype.slice.apply(t, e)))
            }
            ),
            t
        }
        function a(t) {
            return p(t) && !(t.length % 2) || l(t)
        }
        function u(t) {
            return "number" == typeof t && t == t && t % 1 == 0
        }
        function l(t) {
            if (null == t)
                return !1;
            if (t.constructor === Uint8Array)
                return !0;
            if ("string" == typeof t || !u(t.length) || t.length < 0)
                return !1;
            for (let e = 0; e < t.length; e++) {
                let r = t[e];
                if (!u(r) || r < 0 || r >= 256)
                    return !1
            }
            return !0
        }
        function h(t, e) {
            if (e || (e = {}),
            "number" == typeof t) {
                i.checkSafeUint53(t, "invalid arrayify value");
                let r = [];
                for (; t; )
                    r.unshift(255 & t),
                    t = parseInt(String(t / 256));
                return 0 === r.length && r.push(0),
                s(new Uint8Array(r))
            }
            if (e.allowMissingPrefix && "string" == typeof t && "0x" !== t.substring(0, 2) && (t = "0x" + t),
            o(t) && (t = t.toHexString()),
            p(t)) {
                let n = t.substring(2);
                n.length % 2 && ("left" === e.hexPad ? n = "0" + n : "right" === e.hexPad ? n += "0" : i.throwArgumentError("hex data is odd-length", "value", t));
                let a = [];
                for (let u = 0; u < n.length; u += 2)
                    a.push(parseInt(n.substring(u, u + 2), 16));
                return s(new Uint8Array(a))
            }
            return l(t) ? s(new Uint8Array(t)) : i.throwArgumentError("invalid arrayify value", "value", t)
        }
        function f(t) {
            let e = t.map(t=>h(t))
              , r = e.reduce((t,e)=>t + e.length, 0)
              , n = new Uint8Array(r);
            return e.reduce((t,e)=>(n.set(e, t),
            t + e.length), 0),
            s(n)
        }
        function c(t) {
            let e = h(t);
            if (0 === e.length)
                return e;
            let r = 0;
            for (; r < e.length && 0 === e[r]; )
                r++;
            return r && (e = e.slice(r)),
            e
        }
        function d(t, e) {
            (t = h(t)).length > e && i.throwArgumentError("value out of range", "value", arguments[0]);
            let r = new Uint8Array(e);
            return r.set(t, e - t.length),
            s(r)
        }
        function p(t, e) {
            return "string" == typeof t && !!t.match(/^0x[0-9A-Fa-f]*$/) && (!e || t.length === 2 + 2 * e)
        }
        let m = "0123456789abcdef";
        function g(t, e) {
            if (e || (e = {}),
            "number" == typeof t) {
                i.checkSafeUint53(t, "invalid hexlify value");
                let r = "";
                for (; t; )
                    r = m[15 & t] + r,
                    t = Math.floor(t / 16);
                return r.length ? (r.length % 2 && (r = "0" + r),
                "0x" + r) : "0x00"
            }
            if ("bigint" == typeof t)
                return (t = t.toString(16)).length % 2 ? "0x0" + t : "0x" + t;
            if (e.allowMissingPrefix && "string" == typeof t && "0x" !== t.substring(0, 2) && (t = "0x" + t),
            o(t))
                return t.toHexString();
            if (p(t))
                return t.length % 2 && ("left" === e.hexPad ? t = "0x0" + t.substring(2) : "right" === e.hexPad ? t += "0" : i.throwArgumentError("hex data is odd-length", "value", t)),
                t.toLowerCase();
            if (l(t)) {
                let n = "0x";
                for (let s = 0; s < t.length; s++) {
                    let a = t[s];
                    n += m[(240 & a) >> 4] + m[15 & a]
                }
                return n
            }
            return i.throwArgumentError("invalid hexlify value", "value", t)
        }
        function y(t) {
            if ("string" != typeof t)
                t = g(t);
            else if (!p(t) || t.length % 2)
                return null;
            return (t.length - 2) / 2
        }
        function v(t, e, r) {
            return ("string" != typeof t ? t = g(t) : (!p(t) || t.length % 2) && i.throwArgumentError("invalid hexData", "value", t),
            e = 2 + 2 * e,
            null != r) ? "0x" + t.substring(e, 2 + 2 * r) : "0x" + t.substring(e)
        }
        function b(t) {
            let e = "0x";
            return t.forEach(t=>{
                e += g(t).substring(2)
            }
            ),
            e
        }
        function w(t) {
            let e = E(g(t, {
                hexPad: "left"
            }));
            return "0x" === e ? "0x0" : e
        }
        function E(t) {
            "string" != typeof t && (t = g(t)),
            p(t) || i.throwArgumentError("invalid hex string", "value", t),
            t = t.substring(2);
            let e = 0;
            for (; e < t.length && "0" === t[e]; )
                e++;
            return "0x" + t.substring(e)
        }
        function _(t, e) {
            for ("string" != typeof t ? t = g(t) : p(t) || i.throwArgumentError("invalid hex string", "value", t),
            t.length > 2 * e + 2 && i.throwArgumentError("value out of range", "value", arguments[1]); t.length < 2 * e + 2; )
                t = "0x0" + t.substring(2);
            return t
        }
        function x(t) {
            let e = {
                r: "0x",
                s: "0x",
                _vs: "0x",
                recoveryParam: 0,
                v: 0,
                yParityAndS: "0x",
                compact: "0x"
            };
            if (a(t)) {
                let r = h(t);
                64 === r.length ? (e.v = 27 + (r[32] >> 7),
                r[32] &= 127,
                e.r = g(r.slice(0, 32)),
                e.s = g(r.slice(32, 64))) : 65 === r.length ? (e.r = g(r.slice(0, 32)),
                e.s = g(r.slice(32, 64)),
                e.v = r[64]) : i.throwArgumentError("invalid signature string", "signature", t),
                e.v < 27 && (0 === e.v || 1 === e.v ? e.v += 27 : i.throwArgumentError("signature invalid v byte", "signature", t)),
                e.recoveryParam = 1 - e.v % 2,
                e.recoveryParam && (r[32] |= 128),
                e._vs = g(r.slice(32, 64))
            } else {
                if (e.r = t.r,
                e.s = t.s,
                e.v = t.v,
                e.recoveryParam = t.recoveryParam,
                e._vs = t._vs,
                null != e._vs) {
                    let n = d(h(e._vs), 32);
                    e._vs = g(n);
                    let o = n[0] >= 128 ? 1 : 0;
                    null == e.recoveryParam ? e.recoveryParam = o : e.recoveryParam !== o && i.throwArgumentError("signature recoveryParam mismatch _vs", "signature", t),
                    n[0] &= 127;
                    let s = g(n);
                    null == e.s ? e.s = s : e.s !== s && i.throwArgumentError("signature v mismatch _vs", "signature", t)
                }
                if (null == e.recoveryParam)
                    null == e.v ? i.throwArgumentError("signature missing v and recoveryParam", "signature", t) : 0 === e.v || 1 === e.v ? e.recoveryParam = e.v : e.recoveryParam = 1 - e.v % 2;
                else if (null == e.v)
                    e.v = 27 + e.recoveryParam;
                else {
                    let u = 0 === e.v || 1 === e.v ? e.v : 1 - e.v % 2;
                    e.recoveryParam !== u && i.throwArgumentError("signature recoveryParam mismatch v", "signature", t)
                }
                null != e.r && p(e.r) ? e.r = _(e.r, 32) : i.throwArgumentError("signature missing or invalid r", "signature", t),
                null != e.s && p(e.s) ? e.s = _(e.s, 32) : i.throwArgumentError("signature missing or invalid s", "signature", t);
                let l = h(e.s);
                l[0] >= 128 && i.throwArgumentError("signature s out of range", "signature", t),
                e.recoveryParam && (l[0] |= 128);
                let f = g(l);
                e._vs && (p(e._vs) || i.throwArgumentError("signature invalid _vs", "signature", t),
                e._vs = _(e._vs, 32)),
                null == e._vs ? e._vs = f : e._vs !== f && i.throwArgumentError("signature _vs mismatch v and s", "signature", t)
            }
            return e.yParityAndS = e._vs,
            e.compact = e.r + e.yParityAndS.substring(2),
            e
        }
        function A(t) {
            return g(f([(t = x(t)).r, t.s, t.recoveryParam ? "0x1c" : "0x1b"]))
        }
    },
    1046: function(t, e, r) {
        "use strict";
        r.d(e, {
            Bz: function() {
                return a
            },
            _Y: function() {
                return o
            },
            fh: function() {
                return s
            },
            tL: function() {
                return i
            }
        });
        var n = r(2593);
        let i = n.O$.from(-1)
          , o = n.O$.from(0)
          , s = n.O$.from(1)
          , a = n.O$.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    },
    7218: function(t, e, r) {
        "use strict";
        r.d(e, {
            R: function() {
                return n
            }
        });
        let n = "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    5644: function(t, e, r) {
        "use strict";
        r.d(e, {
            i: function() {
                return n
            }
        });
        let n = "hash/5.6.1"
    },
    2046: function(t, e, r) {
        "use strict";
        r.d(e, {
            id: function() {
                return o
            }
        });
        var n = r(8197)
          , i = r(9251);
        function o(t) {
            return (0,
            n.keccak256)((0,
            i.Y0)(t))
        }
    },
    4706: function(t, e, r) {
        "use strict";
        r.d(e, {
            Kn: function() {
                return p
            },
            VM: function() {
                return d
            },
            r1: function() {
                return c
            }
        });
        var n = r(6441)
          , i = r(5637)
          , o = r(9251)
          , s = r(8197)
          , a = r(1581)
          , u = r(5644);
        let l = new a.Logger(u.i)
          , h = new Uint8Array(32);
        h.fill(0);
        let f = RegExp("^((.*)\\.)?([^.]+)$");
        function c(t) {
            try {
                let e = t.split(".");
                for (let r = 0; r < e.length; r++)
                    if (0 === (0,
                    i.Ll)(e[r]).length)
                        throw Error("empty");
                return !0
            } catch (n) {}
            return !1
        }
        function d(t) {
            "string" != typeof t && l.throwArgumentError("invalid ENS name; not a string", "name", t);
            let e = t
              , r = h;
            for (; e.length; ) {
                let a = e.match(f);
                (null == a || "" === a[2]) && l.throwArgumentError("invalid ENS address; missing component", "name", t);
                let u = (0,
                o.Y0)((0,
                i.Ll)(a[3]));
                r = (0,
                s.keccak256)((0,
                n.concat)([r, (0,
                s.keccak256)(u)])),
                e = a[2] || ""
            }
            return (0,
            n.hexlify)(r)
        }
        function p(t) {
            return (0,
            n.hexlify)((0,
            n.concat)(t.split(".").map(t=>{
                let e = (0,
                o.Y0)("_" + (0,
                i.Ll)(t));
                return e[0] = e.length - 1,
                e
            }
            ))) + "00"
        }
    },
    7827: function(t, e, r) {
        "use strict";
        r.d(e, {
            E: function() {
                return k
            }
        });
        var n = r(9485)
          , i = r(2593)
          , o = r(6441)
          , s = r(8197)
          , a = r(6881)
          , u = r(1581)
          , l = r(5644)
          , h = r(2046);
        let f = new u.Logger(l.i)
          , c = new Uint8Array(32);
        c.fill(0);
        let d = i.O$.from(-1)
          , p = i.O$.from(0)
          , m = i.O$.from(1)
          , g = i.O$.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
          , y = (0,
        o.hexZeroPad)(m.toHexString(), 32)
          , v = (0,
        o.hexZeroPad)(p.toHexString(), 32)
          , b = {
            name: "string",
            version: "string",
            chainId: "uint256",
            verifyingContract: "address",
            salt: "bytes32"
        }
          , w = ["name", "version", "chainId", "verifyingContract", "salt"];
        function E(t) {
            return function(e) {
                return "string" != typeof e && f.throwArgumentError(`invalid domain value for ${JSON.stringify(t)}`, `domain.${t}`, e),
                e
            }
        }
        let _ = {
            name: E("name"),
            version: E("version"),
            chainId: function(t) {
                try {
                    return i.O$.from(t).toString()
                } catch (e) {}
                return f.throwArgumentError('invalid domain value for "chainId"', "domain.chainId", t)
            },
            verifyingContract: function(t) {
                try {
                    return (0,
                    n.getAddress)(t).toLowerCase()
                } catch (e) {}
                return f.throwArgumentError('invalid domain value "verifyingContract"', "domain.verifyingContract", t)
            },
            salt: function(t) {
                try {
                    let e = (0,
                    o.arrayify)(t);
                    if (32 !== e.length)
                        throw Error("bad length");
                    return (0,
                    o.hexlify)(e)
                } catch (r) {}
                return f.throwArgumentError('invalid domain value "salt"', "domain.salt", t)
            }
        };
        function x(t) {
            {
                let e = t.match(/^(u?)int(\d*)$/);
                if (e) {
                    let r = "" === e[1]
                      , a = parseInt(e[2] || "256");
                    (a % 8 != 0 || a > 256 || e[2] && e[2] !== String(a)) && f.throwArgumentError("invalid numeric width", "type", t);
                    let u = g.mask(r ? a - 1 : a)
                      , l = r ? u.add(m).mul(d) : p;
                    return function(e) {
                        let r = i.O$.from(e);
                        return (r.lt(l) || r.gt(u)) && f.throwArgumentError(`value out-of-bounds for ${t}`, "value", e),
                        (0,
                        o.hexZeroPad)(r.toTwos(256).toHexString(), 32)
                    }
                }
            }
            {
                let b = t.match(/^bytes(\d+)$/);
                if (b) {
                    let w = parseInt(b[1]);
                    return (0 === w || w > 32 || b[1] !== String(w)) && f.throwArgumentError("invalid bytes width", "type", t),
                    function(e) {
                        let r = (0,
                        o.arrayify)(e);
                        return r.length !== w && f.throwArgumentError(`invalid length for ${t}`, "value", e),
                        function(t) {
                            let e = (0,
                            o.arrayify)(t)
                              , r = e.length % 32;
                            return r ? (0,
                            o.hexConcat)([e, c.slice(r)]) : (0,
                            o.hexlify)(e)
                        }(e)
                    }
                }
            }
            switch (t) {
            case "address":
                return function(t) {
                    return (0,
                    o.hexZeroPad)((0,
                    n.getAddress)(t), 32)
                }
                ;
            case "bool":
                return function(t) {
                    return t ? y : v
                }
                ;
            case "bytes":
                return function(t) {
                    return (0,
                    s.keccak256)(t)
                }
                ;
            case "string":
                return function(t) {
                    return (0,
                    h.id)(t)
                }
            }
            return null
        }
        function A(t, e) {
            return `${t}(${e.map(({name: t, type: e})=>e + " " + t).join(",")})`
        }
        class k {
            constructor(t) {
                (0,
                a.defineReadOnly)(this, "types", Object.freeze((0,
                a.deepCopy)(t))),
                (0,
                a.defineReadOnly)(this, "_encoderCache", {}),
                (0,
                a.defineReadOnly)(this, "_types", {});
                let e = {}
                  , r = {}
                  , n = {};
                for (let i in Object.keys(t).forEach(t=>{
                    e[t] = {},
                    r[t] = [],
                    n[t] = {}
                }
                ),
                t) {
                    let o = {};
                    t[i].forEach(n=>{
                        o[n.name] && f.throwArgumentError(`duplicate variable name ${JSON.stringify(n.name)} in ${JSON.stringify(i)}`, "types", t),
                        o[n.name] = !0;
                        let s = n.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
                        s === i && f.throwArgumentError(`circular type reference to ${JSON.stringify(s)}`, "types", t);
                        let a = x(s);
                        a || (r[s] || f.throwArgumentError(`unknown type ${JSON.stringify(s)}`, "types", t),
                        r[s].push(i),
                        e[i][s] = !0)
                    }
                    )
                }
                let s = Object.keys(r).filter(t=>0 === r[t].length);
                for (let u in 0 === s.length ? f.throwArgumentError("missing primary type", "types", t) : s.length > 1 && f.throwArgumentError(`ambiguous primary types or unused types: ${s.map(t=>JSON.stringify(t)).join(", ")}`, "types", t),
                (0,
                a.defineReadOnly)(this, "primaryType", s[0]),
                !function i(o, s) {
                    s[o] && f.throwArgumentError(`circular type reference to ${JSON.stringify(o)}`, "types", t),
                    s[o] = !0,
                    Object.keys(e[o]).forEach(t=>{
                        r[t] && (i(t, s),
                        Object.keys(s).forEach(e=>{
                            n[e][t] = !0
                        }
                        ))
                    }
                    ),
                    delete s[o]
                }(this.primaryType, {}),
                n) {
                    let l = Object.keys(n[u]);
                    l.sort(),
                    this._types[u] = A(u, t[u]) + l.map(e=>A(e, t[e])).join("")
                }
            }
            getEncoder(t) {
                let e = this._encoderCache[t];
                return e || (e = this._encoderCache[t] = this._getEncoder(t)),
                e
            }
            _getEncoder(t) {
                {
                    let e = x(t);
                    if (e)
                        return e
                }
                let r = t.match(/^(.*)(\x5b(\d*)\x5d)$/);
                if (r) {
                    let n = r[1]
                      , i = this.getEncoder(n)
                      , a = parseInt(r[3]);
                    return t=>{
                        a >= 0 && t.length !== a && f.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", t);
                        let e = t.map(i);
                        return this._types[n] && (e = e.map(s.keccak256)),
                        (0,
                        s.keccak256)((0,
                        o.hexConcat)(e))
                    }
                }
                let u = this.types[t];
                if (u) {
                    let l = (0,
                    h.id)(this._types[t]);
                    return t=>{
                        let e = u.map(({name: e, type: r})=>{
                            let n = this.getEncoder(r)(t[e]);
                            return this._types[r] ? (0,
                            s.keccak256)(n) : n
                        }
                        );
                        return e.unshift(l),
                        (0,
                        o.hexConcat)(e)
                    }
                }
                return f.throwArgumentError(`unknown type: ${t}`, "type", t)
            }
            encodeType(t) {
                let e = this._types[t];
                return e || f.throwArgumentError(`unknown type: ${JSON.stringify(t)}`, "name", t),
                e
            }
            encodeData(t, e) {
                return this.getEncoder(t)(e)
            }
            hashStruct(t, e) {
                return (0,
                s.keccak256)(this.encodeData(t, e))
            }
            encode(t) {
                return this.encodeData(this.primaryType, t)
            }
            hash(t) {
                return this.hashStruct(this.primaryType, t)
            }
            _visit(t, e, r) {
                {
                    let n = x(t);
                    if (n)
                        return r(t, e)
                }
                let i = t.match(/^(.*)(\x5b(\d*)\x5d)$/);
                if (i) {
                    let o = i[1]
                      , s = parseInt(i[3]);
                    return s >= 0 && e.length !== s && f.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", e),
                    e.map(t=>this._visit(o, t, r))
                }
                let a = this.types[t];
                return a ? a.reduce((t,{name: n, type: i})=>(t[n] = this._visit(i, e[n], r),
                t), {}) : f.throwArgumentError(`unknown type: ${t}`, "type", t)
            }
            visit(t, e) {
                return this._visit(this.primaryType, t, e)
            }
            static from(t) {
                return new k(t)
            }
            static getPrimaryType(t) {
                return k.from(t).primaryType
            }
            static hashStruct(t, e, r) {
                return k.from(e).hashStruct(t, r)
            }
            static hashDomain(t) {
                let e = [];
                for (let r in t) {
                    let n = b[r];
                    n || f.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(r)}`, "domain", t),
                    e.push({
                        name: r,
                        type: n
                    })
                }
                return e.sort((t,e)=>w.indexOf(t.name) - w.indexOf(e.name)),
                k.hashStruct("EIP712Domain", {
                    EIP712Domain: e
                }, t)
            }
            static encode(t, e, r) {
                return (0,
                o.hexConcat)(["0x1901", k.hashDomain(t), k.from(e).hash(r)])
            }
            static hash(t, e, r) {
                return (0,
                s.keccak256)(k.encode(t, e, r))
            }
            static resolveNames(t, e, r, n) {
                var i, s, u, l;
                return i = this,
                s = void 0,
                u = void 0,
                l = function*() {
                    t = (0,
                    a.shallowCopy)(t);
                    let i = {};
                    t.verifyingContract && !(0,
                    o.isHexString)(t.verifyingContract, 20) && (i[t.verifyingContract] = "0x");
                    let s = k.from(e);
                    for (let u in s.visit(r, (t,e)=>("address" !== t || (0,
                    o.isHexString)(e, 20) || (i[e] = "0x"),
                    e)),
                    i)
                        i[u] = yield n(u);
                    return t.verifyingContract && i[t.verifyingContract] && (t.verifyingContract = i[t.verifyingContract]),
                    r = s.visit(r, (t,e)=>"address" === t && i[e] ? i[e] : e),
                    {
                        domain: t,
                        value: r
                    }
                }
                ,
                new (u || (u = Promise))(function(t, e) {
                    function r(t) {
                        try {
                            o(l.next(t))
                        } catch (r) {
                            e(r)
                        }
                    }
                    function n(t) {
                        try {
                            o(l.throw(t))
                        } catch (r) {
                            e(r)
                        }
                    }
                    function o(e) {
                        var i;
                        e.done ? t(e.value) : ((i = e.value)instanceof u ? i : new u(function(t) {
                            t(i)
                        }
                        )).then(r, n)
                    }
                    o((l = l.apply(i, s || [])).next())
                }
                )
            }
            static getPayload(t, e, r) {
                k.hashDomain(t);
                let n = {}
                  , s = [];
                w.forEach(e=>{
                    let r = t[e];
                    null != r && (n[e] = _[e](r),
                    s.push({
                        name: e,
                        type: b[e]
                    }))
                }
                );
                let u = k.from(e)
                  , l = (0,
                a.shallowCopy)(e);
                return l.EIP712Domain ? f.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", e) : l.EIP712Domain = s,
                u.encode(r),
                {
                    types: l,
                    domain: n,
                    primaryType: u.primaryType,
                    message: u.visit(r, (t,e)=>{
                        if (t.match(/^bytes(\d*)/))
                            return (0,
                            o.hexlify)((0,
                            o.arrayify)(e));
                        if (t.match(/^u?int/))
                            return i.O$.from(e).toString();
                        switch (t) {
                        case "address":
                            return e.toLowerCase();
                        case "bool":
                            return !!e;
                        case "string":
                            return "string" != typeof e && f.throwArgumentError("invalid string", "value", e),
                            e
                        }
                        return f.throwArgumentError("unsupported type", "type", t)
                    }
                    )
                }
            }
        }
    },
    8197: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            keccak256: function() {
                return s
            }
        });
        var n = r(1094)
          , i = r.n(n)
          , o = r(6441);
        function s(t) {
            return "0x" + i().keccak_256((0,
            o.arrayify)(t))
        }
    },
    1581: function(t, e, r) {
        "use strict";
        var n, i, o, s;
        r.r(e),
        r.d(e, {
            ErrorCode: function() {
                return i
            },
            LogLevel: function() {
                return n
            },
            Logger: function() {
                return p
            }
        });
        let a = !1
          , u = !1
          , l = {
            debug: 1,
            default: 2,
            info: 2,
            warning: 3,
            error: 4,
            off: 5
        }
          , h = l.default
          , f = null
          , c = function() {
            try {
                let t = [];
                if (["NFD", "NFC", "NFKD", "NFKC"].forEach(e=>{
                    try {
                        if ("test" !== "test".normalize(e))
                            throw Error("bad normalize")
                    } catch (r) {
                        t.push(e)
                    }
                }
                ),
                t.length)
                    throw Error("missing " + t.join(", "));
                if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
                    throw Error("broken implementation")
            } catch (e) {
                return e.message
            }
            return null
        }();
        (o = n || (n = {})).DEBUG = "DEBUG",
        o.INFO = "INFO",
        o.WARNING = "WARNING",
        o.ERROR = "ERROR",
        o.OFF = "OFF",
        (s = i || (i = {})).UNKNOWN_ERROR = "UNKNOWN_ERROR",
        s.NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
        s.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION",
        s.NETWORK_ERROR = "NETWORK_ERROR",
        s.SERVER_ERROR = "SERVER_ERROR",
        s.TIMEOUT = "TIMEOUT",
        s.BUFFER_OVERRUN = "BUFFER_OVERRUN",
        s.NUMERIC_FAULT = "NUMERIC_FAULT",
        s.MISSING_NEW = "MISSING_NEW",
        s.INVALID_ARGUMENT = "INVALID_ARGUMENT",
        s.MISSING_ARGUMENT = "MISSING_ARGUMENT",
        s.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT",
        s.CALL_EXCEPTION = "CALL_EXCEPTION",
        s.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
        s.NONCE_EXPIRED = "NONCE_EXPIRED",
        s.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED",
        s.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT",
        s.TRANSACTION_REPLACED = "TRANSACTION_REPLACED";
        let d = "0123456789abcdef";
        class p {
            constructor(t) {
                Object.defineProperty(this, "version", {
                    enumerable: !0,
                    value: t,
                    writable: !1
                })
            }
            _log(t, e) {
                let r = t.toLowerCase();
                null == l[r] && this.throwArgumentError("invalid log level name", "logLevel", t),
                h > l[r] || console.log.apply(console, e)
            }
            debug(...t) {
                this._log(p.levels.DEBUG, t)
            }
            info(...t) {
                this._log(p.levels.INFO, t)
            }
            warn(...t) {
                this._log(p.levels.WARNING, t)
            }
            makeError(t, e, r) {
                if (u)
                    return this.makeError("censored error", e, {});
                e || (e = p.errors.UNKNOWN_ERROR),
                r || (r = {});
                let n = [];
                Object.keys(r).forEach(t=>{
                    let e = r[t];
                    try {
                        if (e instanceof Uint8Array) {
                            let i = "";
                            for (let o = 0; o < e.length; o++)
                                i += d[e[o] >> 4],
                                i += d[15 & e[o]];
                            n.push(t + "=Uint8Array(0x" + i + ")")
                        } else
                            n.push(t + "=" + JSON.stringify(e))
                    } catch (s) {
                        n.push(t + "=" + JSON.stringify(r[t].toString()))
                    }
                }
                ),
                n.push(`code=${e}`),
                n.push(`version=${this.version}`);
                let o = t
                  , s = "";
                switch (e) {
                case i.NUMERIC_FAULT:
                    {
                        s = "NUMERIC_FAULT";
                        let a = t;
                        switch (a) {
                        case "overflow":
                        case "underflow":
                        case "division-by-zero":
                            s += "-" + a;
                            break;
                        case "negative-power":
                        case "negative-width":
                            s += "-unsupported";
                            break;
                        case "unbound-bitwise-result":
                            s += "-unbound-result"
                        }
                        break
                    }
                case i.CALL_EXCEPTION:
                case i.INSUFFICIENT_FUNDS:
                case i.MISSING_NEW:
                case i.NONCE_EXPIRED:
                case i.REPLACEMENT_UNDERPRICED:
                case i.TRANSACTION_REPLACED:
                case i.UNPREDICTABLE_GAS_LIMIT:
                    s = e
                }
                s && (t += " [ See: https://links.ethers.org/v5-errors-" + s + " ]"),
                n.length && (t += " (" + n.join(", ") + ")");
                let l = Error(t);
                return l.reason = o,
                l.code = e,
                Object.keys(r).forEach(function(t) {
                    l[t] = r[t]
                }),
                l
            }
            throwError(t, e, r) {
                throw this.makeError(t, e, r)
            }
            throwArgumentError(t, e, r) {
                return this.throwError(t, p.errors.INVALID_ARGUMENT, {
                    argument: e,
                    value: r
                })
            }
            assert(t, e, r, n) {
                t || this.throwError(e, r, n)
            }
            assertArgument(t, e, r, n) {
                t || this.throwArgumentError(e, r, n)
            }
            checkNormalize(t) {
                null == t && (t = "platform missing String.prototype.normalize"),
                c && this.throwError("platform missing String.prototype.normalize", p.errors.UNSUPPORTED_OPERATION, {
                    operation: "String.prototype.normalize",
                    form: c
                })
            }
            checkSafeUint53(t, e) {
                "number" == typeof t && (null == e && (e = "value not safe"),
                (t < 0 || t >= 9007199254740991) && this.throwError(e, p.errors.NUMERIC_FAULT, {
                    operation: "checkSafeInteger",
                    fault: "out-of-safe-range",
                    value: t
                }),
                t % 1 && this.throwError(e, p.errors.NUMERIC_FAULT, {
                    operation: "checkSafeInteger",
                    fault: "non-integer",
                    value: t
                }))
            }
            checkArgumentCount(t, e, r) {
                r = r ? ": " + r : "",
                t < e && this.throwError("missing argument" + r, p.errors.MISSING_ARGUMENT, {
                    count: t,
                    expectedCount: e
                }),
                t > e && this.throwError("too many arguments" + r, p.errors.UNEXPECTED_ARGUMENT, {
                    count: t,
                    expectedCount: e
                })
            }
            checkNew(t, e) {
                (t === Object || null == t) && this.throwError("missing new", p.errors.MISSING_NEW, {
                    name: e.name
                })
            }
            checkAbstract(t, e) {
                t === e ? this.throwError("cannot instantiate abstract class " + JSON.stringify(e.name) + " directly; use a sub-class", p.errors.UNSUPPORTED_OPERATION, {
                    name: t.name,
                    operation: "new"
                }) : (t === Object || null == t) && this.throwError("missing new", p.errors.MISSING_NEW, {
                    name: e.name
                })
            }
            static globalLogger() {
                return f || (f = new p("logger/5.6.0")),
                f
            }
            static setCensorship(t, e) {
                if (!t && e && this.globalLogger().throwError("cannot permanently disable censorship", p.errors.UNSUPPORTED_OPERATION, {
                    operation: "setCensorship"
                }),
                a) {
                    if (!t)
                        return;
                    this.globalLogger().throwError("error censorship permanent", p.errors.UNSUPPORTED_OPERATION, {
                        operation: "setCensorship"
                    })
                }
                u = !!t,
                a = !!e
            }
            static setLogLevel(t) {
                let e = l[t.toLowerCase()];
                if (null == e) {
                    p.globalLogger().warn("invalid log level - " + t);
                    return
                }
                h = e
            }
            static from(t) {
                return new p(t)
            }
        }
        p.errors = i,
        p.levels = n
    },
    6881: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            Description: function() {
                return c
            },
            checkProperties: function() {
                return u
            },
            deepCopy: function() {
                return f
            },
            defineReadOnly: function() {
                return o
            },
            getStatic: function() {
                return s
            },
            resolveProperties: function() {
                return a
            },
            shallowCopy: function() {
                return l
            }
        });
        var n = r(1581);
        let i = new n.Logger("properties/5.6.0");
        function o(t, e, r) {
            Object.defineProperty(t, e, {
                enumerable: !0,
                value: r,
                writable: !1
            })
        }
        function s(t, e) {
            for (let r = 0; r < 32; r++) {
                if (t[e])
                    return t[e];
                if (!t.prototype || "object" != typeof t.prototype)
                    break;
                t = Object.getPrototypeOf(t.prototype).constructor
            }
            return null
        }
        function a(t) {
            var e, r, n, i;
            return e = this,
            r = void 0,
            n = void 0,
            i = function*() {
                let e = Object.keys(t).map(e=>{
                    let r = t[e];
                    return Promise.resolve(r).then(t=>({
                        key: e,
                        value: t
                    }))
                }
                )
                  , r = yield Promise.all(e);
                return r.reduce((t,e)=>(t[e.key] = e.value,
                t), {})
            }
            ,
            new (n || (n = Promise))(function(t, o) {
                function s(t) {
                    try {
                        u(i.next(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function a(t) {
                    try {
                        u(i.throw(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function u(e) {
                    var r;
                    e.done ? t(e.value) : ((r = e.value)instanceof n ? r : new n(function(t) {
                        t(r)
                    }
                    )).then(s, a)
                }
                u((i = i.apply(e, r || [])).next())
            }
            )
        }
        function u(t, e) {
            t && "object" == typeof t || i.throwArgumentError("invalid object", "object", t),
            Object.keys(t).forEach(r=>{
                e[r] || i.throwArgumentError("invalid object key - " + r, "transaction:" + r, t)
            }
            )
        }
        function l(t) {
            let e = {};
            for (let r in t)
                e[r] = t[r];
            return e
        }
        let h = {
            bigint: !0,
            boolean: !0,
            function: !0,
            number: !0,
            string: !0
        };
        function f(t) {
            return function(t) {
                if (function t(e) {
                    if (null == e || h[typeof e])
                        return !0;
                    if (Array.isArray(e) || "object" == typeof e) {
                        if (!Object.isFrozen(e))
                            return !1;
                        let r = Object.keys(e);
                        for (let n = 0; n < r.length; n++) {
                            let o = null;
                            try {
                                o = e[r[n]]
                            } catch (s) {
                                continue
                            }
                            if (!t(o))
                                return !1
                        }
                        return !0
                    }
                    return i.throwArgumentError(`Cannot deepCopy ${typeof e}`, "object", e)
                }(t))
                    return t;
                if (Array.isArray(t))
                    return Object.freeze(t.map(t=>f(t)));
                if ("object" == typeof t) {
                    let e = {};
                    for (let r in t) {
                        let n = t[r];
                        void 0 !== n && o(e, r, f(n))
                    }
                    return e
                }
                return i.throwArgumentError(`Cannot deepCopy ${typeof t}`, "object", t)
            }(t)
        }
        class c {
            constructor(t) {
                for (let e in t)
                    this[e] = f(t[e])
            }
        }
    },
    4216: function(t, e, r) {
        "use strict";
        r.d(e, {
            i: function() {
                return n
            }
        });
        let n = "providers/5.6.8"
    },
    2263: function(t, e, r) {
        "use strict";
        r.d(e, {
            Zk: function() {
                return K
            }
        });
        var n = r(1556)
          , i = r(9567)
          , o = r(7727)
          , s = r(2593)
          , a = r(6441)
          , u = r(7218)
          , l = r(4706)
          , h = r(1581);
        let f = new h.Logger("networks/5.6.4");
        function c(t) {
            let e = function(e, r) {
                null == r && (r = {});
                let n = [];
                if (e.InfuraProvider && "-" !== r.infura)
                    try {
                        n.push(new e.InfuraProvider(t,r.infura))
                    } catch (i) {}
                if (e.EtherscanProvider && "-" !== r.etherscan)
                    try {
                        n.push(new e.EtherscanProvider(t,r.etherscan))
                    } catch (o) {}
                if (e.AlchemyProvider && "-" !== r.alchemy)
                    try {
                        n.push(new e.AlchemyProvider(t,r.alchemy))
                    } catch (s) {}
                if (e.PocketProvider && "-" !== r.pocket)
                    try {
                        let a = new e.PocketProvider(t,r.pocket);
                        a.network && -1 === ["goerli", "ropsten", "rinkeby"].indexOf(a.network.name) && n.push(a)
                    } catch (u) {}
                if (e.CloudflareProvider && "-" !== r.cloudflare)
                    try {
                        n.push(new e.CloudflareProvider(t))
                    } catch (l) {}
                if (e.AnkrProvider && "-" !== r.ankr)
                    try {
                        let h = new e.AnkrProvider(t,r.ankr);
                        h.network && -1 === ["ropsten"].indexOf(h.network.name) && n.push(h)
                    } catch (f) {}
                if (0 === n.length)
                    return null;
                if (e.FallbackProvider) {
                    let c = 1;
                    return null != r.quorum ? c = r.quorum : "homestead" === t && (c = 2),
                    new e.FallbackProvider(n,c)
                }
                return n[0]
            };
            return e.renetwork = function(t) {
                return c(t)
            }
            ,
            e
        }
        function d(t, e) {
            let r = function(r, n) {
                return r.JsonRpcProvider ? new r.JsonRpcProvider(t,e) : null
            };
            return r.renetwork = function(e) {
                return d(t, e)
            }
            ,
            r
        }
        let p = {
            chainId: 1,
            ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
            name: "homestead",
            _defaultProvider: c("homestead")
        }
          , m = {
            chainId: 3,
            ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
            name: "ropsten",
            _defaultProvider: c("ropsten")
        }
          , g = {
            chainId: 63,
            name: "classicMordor",
            _defaultProvider: d("https://www.ethercluster.com/mordor", "classicMordor")
        }
          , y = {
            unspecified: {
                chainId: 0,
                name: "unspecified"
            },
            homestead: p,
            mainnet: p,
            morden: {
                chainId: 2,
                name: "morden"
            },
            ropsten: m,
            testnet: m,
            rinkeby: {
                chainId: 4,
                ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                name: "rinkeby",
                _defaultProvider: c("rinkeby")
            },
            kovan: {
                chainId: 42,
                name: "kovan",
                _defaultProvider: c("kovan")
            },
            goerli: {
                chainId: 5,
                ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                name: "goerli",
                _defaultProvider: c("goerli")
            },
            kintsugi: {
                chainId: 1337702,
                name: "kintsugi"
            },
            classic: {
                chainId: 61,
                name: "classic",
                _defaultProvider: d("https://www.ethercluster.com/etc", "classic")
            },
            classicMorden: {
                chainId: 62,
                name: "classicMorden"
            },
            classicMordor: g,
            classicTestnet: g,
            classicKotti: {
                chainId: 6,
                name: "classicKotti",
                _defaultProvider: d("https://www.ethercluster.com/kotti", "classicKotti")
            },
            xdai: {
                chainId: 100,
                name: "xdai"
            },
            matic: {
                chainId: 137,
                name: "matic",
                _defaultProvider: c("matic")
            },
            maticmum: {
                chainId: 80001,
                name: "maticmum"
            },
            optimism: {
                chainId: 10,
                name: "optimism",
                _defaultProvider: c("optimism")
            },
            "optimism-kovan": {
                chainId: 69,
                name: "optimism-kovan"
            },
            "optimism-goerli": {
                chainId: 420,
                name: "optimism-goerli"
            },
            arbitrum: {
                chainId: 42161,
                name: "arbitrum"
            },
            "arbitrum-rinkeby": {
                chainId: 421611,
                name: "arbitrum-rinkeby"
            },
            bnb: {
                chainId: 56,
                name: "bnb"
            },
            bnbt: {
                chainId: 97,
                name: "bnbt"
            }
        };
        var v = r(6881)
          , b = r(2006)
          , w = r(9251)
          , E = r(7707)
          , _ = r(2882)
          , x = r.n(_)
          , A = r(4216)
          , k = r(9485)
          , N = r(3875);
        let M = new h.Logger(A.i);
        class P {
            constructor() {
                this.formats = this.getDefaultFormats()
            }
            getDefaultFormats() {
                let t = {}
                  , e = this.address.bind(this)
                  , r = this.bigNumber.bind(this)
                  , n = this.blockTag.bind(this)
                  , i = this.data.bind(this)
                  , o = this.hash.bind(this)
                  , s = this.hex.bind(this)
                  , a = this.number.bind(this)
                  , u = this.type.bind(this)
                  , l = t=>this.data(t, !0);
                return t.transaction = {
                    hash: o,
                    type: u,
                    accessList: P.allowNull(this.accessList.bind(this), null),
                    blockHash: P.allowNull(o, null),
                    blockNumber: P.allowNull(a, null),
                    transactionIndex: P.allowNull(a, null),
                    confirmations: P.allowNull(a, null),
                    from: e,
                    gasPrice: P.allowNull(r),
                    maxPriorityFeePerGas: P.allowNull(r),
                    maxFeePerGas: P.allowNull(r),
                    gasLimit: r,
                    to: P.allowNull(e, null),
                    value: r,
                    nonce: a,
                    data: i,
                    r: P.allowNull(this.uint256),
                    s: P.allowNull(this.uint256),
                    v: P.allowNull(a),
                    creates: P.allowNull(e, null),
                    raw: P.allowNull(i)
                },
                t.transactionRequest = {
                    from: P.allowNull(e),
                    nonce: P.allowNull(a),
                    gasLimit: P.allowNull(r),
                    gasPrice: P.allowNull(r),
                    maxPriorityFeePerGas: P.allowNull(r),
                    maxFeePerGas: P.allowNull(r),
                    to: P.allowNull(e),
                    value: P.allowNull(r),
                    data: P.allowNull(l),
                    type: P.allowNull(a),
                    accessList: P.allowNull(this.accessList.bind(this), null)
                },
                t.receiptLog = {
                    transactionIndex: a,
                    blockNumber: a,
                    transactionHash: o,
                    address: e,
                    topics: P.arrayOf(o),
                    data: i,
                    logIndex: a,
                    blockHash: o
                },
                t.receipt = {
                    to: P.allowNull(this.address, null),
                    from: P.allowNull(this.address, null),
                    contractAddress: P.allowNull(e, null),
                    transactionIndex: a,
                    root: P.allowNull(s),
                    gasUsed: r,
                    logsBloom: P.allowNull(i),
                    blockHash: o,
                    transactionHash: o,
                    logs: P.arrayOf(this.receiptLog.bind(this)),
                    blockNumber: a,
                    confirmations: P.allowNull(a, null),
                    cumulativeGasUsed: r,
                    effectiveGasPrice: P.allowNull(r),
                    status: P.allowNull(a),
                    type: u
                },
                t.block = {
                    hash: P.allowNull(o),
                    parentHash: o,
                    number: a,
                    timestamp: a,
                    nonce: P.allowNull(s),
                    difficulty: this.difficulty.bind(this),
                    gasLimit: r,
                    gasUsed: r,
                    miner: P.allowNull(e),
                    extraData: i,
                    transactions: P.allowNull(P.arrayOf(o)),
                    baseFeePerGas: P.allowNull(r)
                },
                t.blockWithTransactions = (0,
                v.shallowCopy)(t.block),
                t.blockWithTransactions.transactions = P.allowNull(P.arrayOf(this.transactionResponse.bind(this))),
                t.filter = {
                    fromBlock: P.allowNull(n, void 0),
                    toBlock: P.allowNull(n, void 0),
                    blockHash: P.allowNull(o, void 0),
                    address: P.allowNull(e, void 0),
                    topics: P.allowNull(this.topics.bind(this), void 0)
                },
                t.filterLog = {
                    blockNumber: P.allowNull(a),
                    blockHash: P.allowNull(o),
                    transactionIndex: a,
                    removed: P.allowNull(this.boolean.bind(this)),
                    address: e,
                    data: P.allowFalsish(i, "0x"),
                    topics: P.arrayOf(o),
                    transactionHash: o,
                    logIndex: a
                },
                t
            }
            accessList(t) {
                return (0,
                N.accessListify)(t || [])
            }
            number(t) {
                return "0x" === t ? 0 : s.O$.from(t).toNumber()
            }
            type(t) {
                return "0x" === t || null == t ? 0 : s.O$.from(t).toNumber()
            }
            bigNumber(t) {
                return s.O$.from(t)
            }
            boolean(t) {
                if ("boolean" == typeof t)
                    return t;
                if ("string" == typeof t) {
                    if ("true" === (t = t.toLowerCase()))
                        return !0;
                    if ("false" === t)
                        return !1
                }
                throw Error("invalid boolean - " + t)
            }
            hex(t, e) {
                return "string" == typeof t && (e || "0x" === t.substring(0, 2) || (t = "0x" + t),
                (0,
                a.isHexString)(t)) ? t.toLowerCase() : M.throwArgumentError("invalid hash", "value", t)
            }
            data(t, e) {
                let r = this.hex(t, e);
                if (r.length % 2 != 0)
                    throw Error("invalid data; odd-length - " + t);
                return r
            }
            address(t) {
                return (0,
                k.getAddress)(t)
            }
            callAddress(t) {
                if (!(0,
                a.isHexString)(t, 32))
                    return null;
                let e = (0,
                k.getAddress)((0,
                a.hexDataSlice)(t, 12));
                return "0x0000000000000000000000000000000000000000" === e ? null : e
            }
            contractAddress(t) {
                return (0,
                k.getContractAddress)(t)
            }
            blockTag(t) {
                if (null == t)
                    return "latest";
                if ("earliest" === t)
                    return "0x0";
                if ("latest" === t || "pending" === t)
                    return t;
                if ("number" == typeof t || (0,
                a.isHexString)(t))
                    return (0,
                    a.hexValue)(t);
                throw Error("invalid blockTag")
            }
            hash(t, e) {
                let r = this.hex(t, e);
                return 32 !== (0,
                a.hexDataLength)(r) ? M.throwArgumentError("invalid hash", "value", t) : r
            }
            difficulty(t) {
                if (null == t)
                    return null;
                let e = s.O$.from(t);
                try {
                    return e.toNumber()
                } catch (r) {}
                return null
            }
            uint256(t) {
                if (!(0,
                a.isHexString)(t))
                    throw Error("invalid uint256");
                return (0,
                a.hexZeroPad)(t, 32)
            }
            _block(t, e) {
                null != t.author && null == t.miner && (t.miner = t.author);
                let r = null != t._difficulty ? t._difficulty : t.difficulty
                  , n = P.check(e, t);
                return n._difficulty = null == r ? null : s.O$.from(r),
                n
            }
            block(t) {
                return this._block(t, this.formats.block)
            }
            blockWithTransactions(t) {
                return this._block(t, this.formats.blockWithTransactions)
            }
            transactionRequest(t) {
                return P.check(this.formats.transactionRequest, t)
            }
            transactionResponse(t) {
                null != t.gas && null == t.gasLimit && (t.gasLimit = t.gas),
                t.to && s.O$.from(t.to).isZero() && (t.to = "0x0000000000000000000000000000000000000000"),
                null != t.input && null == t.data && (t.data = t.input),
                null == t.to && null == t.creates && (t.creates = this.contractAddress(t)),
                (1 === t.type || 2 === t.type) && null == t.accessList && (t.accessList = []);
                let e = P.check(this.formats.transaction, t);
                if (null != t.chainId) {
                    let r = t.chainId;
                    (0,
                    a.isHexString)(r) && (r = s.O$.from(r).toNumber()),
                    e.chainId = r
                } else {
                    let n = t.networkId;
                    null == n && null == e.v && (n = t.chainId),
                    (0,
                    a.isHexString)(n) && (n = s.O$.from(n).toNumber()),
                    "number" != typeof n && null != e.v && ((n = (e.v - 35) / 2) < 0 && (n = 0),
                    n = parseInt(n)),
                    "number" != typeof n && (n = 0),
                    e.chainId = n
                }
                return e.blockHash && "x" === e.blockHash.replace(/0/g, "") && (e.blockHash = null),
                e
            }
            transaction(t) {
                return (0,
                N.parse)(t)
            }
            receiptLog(t) {
                return P.check(this.formats.receiptLog, t)
            }
            receipt(t) {
                let e = P.check(this.formats.receipt, t);
                if (null != e.root) {
                    if (e.root.length <= 4) {
                        let r = s.O$.from(e.root).toNumber();
                        0 === r || 1 === r ? (null != e.status && e.status !== r && M.throwArgumentError("alt-root-status/status mismatch", "value", {
                            root: e.root,
                            status: e.status
                        }),
                        e.status = r,
                        delete e.root) : M.throwArgumentError("invalid alt-root-status", "value.root", e.root)
                    } else
                        66 !== e.root.length && M.throwArgumentError("invalid root hash", "value.root", e.root)
                }
                return null != e.status && (e.byzantium = !0),
                e
            }
            topics(t) {
                return Array.isArray(t) ? t.map(t=>this.topics(t)) : null != t ? this.hash(t, !0) : null
            }
            filter(t) {
                return P.check(this.formats.filter, t)
            }
            filterLog(t) {
                return P.check(this.formats.filterLog, t)
            }
            static check(t, e) {
                let r = {};
                for (let n in t)
                    try {
                        let i = t[n](e[n]);
                        void 0 !== i && (r[n] = i)
                    } catch (o) {
                        throw o.checkKey = n,
                        o.checkValue = e[n],
                        o
                    }
                return r
            }
            static allowNull(t, e) {
                return function(r) {
                    return null == r ? e : t(r)
                }
            }
            static allowFalsish(t, e) {
                return function(r) {
                    return r ? t(r) : e
                }
            }
            static arrayOf(t) {
                return function(e) {
                    if (!Array.isArray(e))
                        throw Error("not an array");
                    let r = [];
                    return e.forEach(function(e) {
                        r.push(t(e))
                    }),
                    r
                }
            }
        }
        var S = function(t, e, r, n) {
            return new (r || (r = Promise))(function(i, o) {
                function s(t) {
                    try {
                        u(n.next(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function a(t) {
                    try {
                        u(n.throw(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function u(t) {
                    var e;
                    t.done ? i(t.value) : ((e = t.value)instanceof r ? e : new r(function(t) {
                        t(e)
                    }
                    )).then(s, a)
                }
                u((n = n.apply(t, e || [])).next())
            }
            )
        };
        let R = new h.Logger(A.i);
        function O(t) {
            return null == t ? "null" : (32 !== (0,
            a.hexDataLength)(t) && R.throwArgumentError("invalid topic", "topic", t),
            t.toLowerCase())
        }
        function T(t) {
            for (t = t.slice(); t.length > 0 && null == t[t.length - 1]; )
                t.pop();
            return t.map(t=>{
                if (!Array.isArray(t))
                    return O(t);
                {
                    let e = {};
                    t.forEach(t=>{
                        e[O(t)] = !0
                    }
                    );
                    let r = Object.keys(e);
                    return r.sort(),
                    r.join("|")
                }
            }
            ).join("&")
        }
        function I(t) {
            if ("string" == typeof t) {
                if (t = t.toLowerCase(),
                32 === (0,
                a.hexDataLength)(t))
                    return "tx:" + t;
                if (-1 === t.indexOf(":"))
                    return t
            } else if (Array.isArray(t))
                return "filter:*:" + T(t);
            else if (n.Sg.isForkEvent(t))
                throw R.warn("not implemented"),
                Error("not implemented");
            else if (t && "object" == typeof t)
                return "filter:" + (t.address || "*") + ":" + T(t.topics || []);
            throw Error("invalid event - " + t)
        }
        function L() {
            return new Date().getTime()
        }
        function C(t) {
            return new Promise(e=>{
                setTimeout(e, t)
            }
            )
        }
        let B = ["block", "network", "pending", "poll"];
        class F {
            constructor(t, e, r) {
                (0,
                v.defineReadOnly)(this, "tag", t),
                (0,
                v.defineReadOnly)(this, "listener", e),
                (0,
                v.defineReadOnly)(this, "once", r),
                this._lastBlockNumber = -2,
                this._inflight = !1
            }
            get event() {
                switch (this.type) {
                case "tx":
                    return this.hash;
                case "filter":
                    return this.filter
                }
                return this.tag
            }
            get type() {
                return this.tag.split(":")[0]
            }
            get hash() {
                let t = this.tag.split(":");
                return "tx" !== t[0] ? null : t[1]
            }
            get filter() {
                var t;
                let e = this.tag.split(":");
                if ("filter" !== e[0])
                    return null;
                let r = e[1]
                  , n = "" === (t = e[2]) ? [] : t.split(/&/g).map(t=>{
                    if ("" === t)
                        return [];
                    let e = t.split("|").map(t=>"null" === t ? null : t);
                    return 1 === e.length ? e[0] : e
                }
                )
                  , i = {};
                return n.length > 0 && (i.topics = n),
                r && "*" !== r && (i.address = r),
                i
            }
            pollable() {
                return this.tag.indexOf(":") >= 0 || B.indexOf(this.tag) >= 0
            }
        }
        let U = {
            0: {
                symbol: "btc",
                p2pkh: 0,
                p2sh: 5,
                prefix: "bc"
            },
            2: {
                symbol: "ltc",
                p2pkh: 48,
                p2sh: 50,
                prefix: "ltc"
            },
            3: {
                symbol: "doge",
                p2pkh: 30,
                p2sh: 22
            },
            60: {
                symbol: "eth",
                ilk: "eth"
            },
            61: {
                symbol: "etc",
                ilk: "eth"
            },
            700: {
                symbol: "xdai",
                ilk: "eth"
            }
        };
        function D(t) {
            return (0,
            a.hexZeroPad)(s.O$.from(t).toHexString(), 32)
        }
        function j(t) {
            return o.Base58.encode((0,
            a.concat)([t, (0,
            a.hexDataSlice)((0,
            b.JQ)((0,
            b.JQ)(t)), 0, 4)]))
        }
        let z = RegExp("^(ipfs)://(.*)$", "i")
          , $ = [RegExp("^(https)://(.*)$", "i"), RegExp("^(data):(.*)$", "i"), z, RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")];
        function q(t, e) {
            try {
                return (0,
                w.ZN)(G(t, e))
            } catch (r) {}
            return null
        }
        function G(t, e) {
            if ("0x" === t)
                return null;
            let r = s.O$.from((0,
            a.hexDataSlice)(t, e, e + 32)).toNumber()
              , n = s.O$.from((0,
            a.hexDataSlice)(t, r, r + 32)).toNumber();
            return (0,
            a.hexDataSlice)(t, r + 32, r + 32 + n)
        }
        function V(t) {
            return t.match(/^ipfs:\/\/ipfs\//i) ? t = t.substring(12) : t.match(/^ipfs:\/\//i) ? t = t.substring(7) : R.throwArgumentError("unsupported IPFS format", "link", t),
            `https://gateway.ipfs.io/ipfs/${t}`
        }
        function H(t) {
            let e = (0,
            a.arrayify)(t);
            if (e.length > 32)
                throw Error("internal; should not happen");
            let r = new Uint8Array(32);
            return r.set(e, 32 - e.length),
            r
        }
        function J(t) {
            let e = []
              , r = 0;
            for (let n = 0; n < t.length; n++)
                e.push(null),
                r += 32;
            for (let i = 0; i < t.length; i++) {
                let o = (0,
                a.arrayify)(t[i]);
                e[i] = H(r),
                e.push(H(o.length)),
                e.push(function(t) {
                    if (t.length % 32 == 0)
                        return t;
                    let e = new Uint8Array(32 * Math.ceil(t.length / 32));
                    return e.set(t),
                    e
                }(o)),
                r += 32 + 32 * Math.ceil(o.length / 32)
            }
            return (0,
            a.hexConcat)(e)
        }
        class Z {
            constructor(t, e, r, n) {
                (0,
                v.defineReadOnly)(this, "provider", t),
                (0,
                v.defineReadOnly)(this, "name", r),
                (0,
                v.defineReadOnly)(this, "address", t.formatter.address(e)),
                (0,
                v.defineReadOnly)(this, "_resolvedAddress", n)
            }
            supportsWildcard() {
                return this._supportsEip2544 || (this._supportsEip2544 = this.provider.call({
                    to: this.address,
                    data: "0x01ffc9a79061b92300000000000000000000000000000000000000000000000000000000"
                }).then(t=>s.O$.from(t).eq(1)).catch(t=>{
                    if (t.code === h.Logger.errors.CALL_EXCEPTION)
                        return !1;
                    throw this._supportsEip2544 = null,
                    t
                }
                )),
                this._supportsEip2544
            }
            _fetch(t, e) {
                return S(this, void 0, void 0, function*() {
                    let r = {
                        to: this.address,
                        ccipReadEnabled: !0,
                        data: (0,
                        a.hexConcat)([t, (0,
                        l.VM)(this.name), e || "0x"])
                    }
                      , n = !1;
                    (yield this.supportsWildcard()) && (n = !0,
                    r.data = (0,
                    a.hexConcat)(["0x9061b923", J([(0,
                    l.Kn)(this.name), r.data])]));
                    try {
                        let i = yield this.provider.call(r);
                        return (0,
                        a.arrayify)(i).length % 32 == 4 && R.throwError("resolver threw error", h.Logger.errors.CALL_EXCEPTION, {
                            transaction: r,
                            data: i
                        }),
                        n && (i = G(i, 0)),
                        i
                    } catch (o) {
                        if (o.code === h.Logger.errors.CALL_EXCEPTION)
                            return null;
                        throw o
                    }
                })
            }
            _fetchBytes(t, e) {
                return S(this, void 0, void 0, function*() {
                    let r = yield this._fetch(t, e);
                    return null != r ? G(r, 0) : null
                })
            }
            _getAddress(t, e) {
                let r = U[String(t)];
                if (null == r && R.throwError(`unsupported coin type: ${t}`, h.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: `getAddress(${t})`
                }),
                "eth" === r.ilk)
                    return this.provider.formatter.address(e);
                let n = (0,
                a.arrayify)(e);
                if (null != r.p2pkh) {
                    let i = e.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
                    if (i) {
                        let o = parseInt(i[1], 16);
                        if (i[2].length === 2 * o && o >= 1 && o <= 75)
                            return j((0,
                            a.concat)([[r.p2pkh], "0x" + i[2]]))
                    }
                }
                if (null != r.p2sh) {
                    let s = e.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
                    if (s) {
                        let u = parseInt(s[1], 16);
                        if (s[2].length === 2 * u && u >= 1 && u <= 75)
                            return j((0,
                            a.concat)([[r.p2sh], "0x" + s[2]]))
                    }
                }
                if (null != r.prefix) {
                    let l = n[1]
                      , f = n[0];
                    if (0 === f ? 20 !== l && 32 !== l && (f = -1) : f = -1,
                    f >= 0 && n.length === 2 + l && l >= 1 && l <= 75) {
                        let c = x().toWords(n.slice(2));
                        return c.unshift(f),
                        x().encode(r.prefix, c)
                    }
                }
                return null
            }
            getAddress(t) {
                return S(this, void 0, void 0, function*() {
                    if (null == t && (t = 60),
                    60 === t)
                        try {
                            let e = yield this._fetch("0x3b3b57de");
                            if ("0x" === e || e === u.R)
                                return null;
                            return this.provider.formatter.callAddress(e)
                        } catch (r) {
                            if (r.code === h.Logger.errors.CALL_EXCEPTION)
                                return null;
                            throw r
                        }
                    let n = yield this._fetchBytes("0xf1cb7e06", D(t));
                    if (null == n || "0x" === n)
                        return null;
                    let i = this._getAddress(t, n);
                    return null == i && R.throwError("invalid or unsupported coin data", h.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: `getAddress(${t})`,
                        coinType: t,
                        data: n
                    }),
                    i
                })
            }
            getAvatar() {
                return S(this, void 0, void 0, function*() {
                    let t = [{
                        type: "name",
                        content: this.name
                    }];
                    try {
                        let e = yield this.getText("avatar");
                        if (null == e)
                            return null;
                        for (let r = 0; r < $.length; r++) {
                            let n = e.match($[r]);
                            if (null == n)
                                continue;
                            let i = n[1].toLowerCase();
                            switch (i) {
                            case "https":
                                return t.push({
                                    type: "url",
                                    content: e
                                }),
                                {
                                    linkage: t,
                                    url: e
                                };
                            case "data":
                                return t.push({
                                    type: "data",
                                    content: e
                                }),
                                {
                                    linkage: t,
                                    url: e
                                };
                            case "ipfs":
                                return t.push({
                                    type: "ipfs",
                                    content: e
                                }),
                                {
                                    linkage: t,
                                    url: V(e)
                                };
                            case "erc721":
                            case "erc1155":
                                {
                                    let o = "erc721" === i ? "0xc87b56dd" : "0x0e89341c";
                                    t.push({
                                        type: i,
                                        content: e
                                    });
                                    let u = this._resolvedAddress || (yield this.getAddress())
                                      , l = (n[2] || "").split("/");
                                    if (2 !== l.length)
                                        return null;
                                    let h = yield this.provider.formatter.address(l[0])
                                      , f = (0,
                                    a.hexZeroPad)(s.O$.from(l[1]).toHexString(), 32);
                                    if ("erc721" === i) {
                                        let c = this.provider.formatter.callAddress((yield this.provider.call({
                                            to: h,
                                            data: (0,
                                            a.hexConcat)(["0x6352211e", f])
                                        })));
                                        if (u !== c)
                                            return null;
                                        t.push({
                                            type: "owner",
                                            content: c
                                        })
                                    } else if ("erc1155" === i) {
                                        let d = s.O$.from((yield this.provider.call({
                                            to: h,
                                            data: (0,
                                            a.hexConcat)(["0x00fdd58e", (0,
                                            a.hexZeroPad)(u, 32), f])
                                        })));
                                        if (d.isZero())
                                            return null;
                                        t.push({
                                            type: "balance",
                                            content: d.toString()
                                        })
                                    }
                                    let p = {
                                        to: this.provider.formatter.address(l[0]),
                                        data: (0,
                                        a.hexConcat)([o, f])
                                    }
                                      , m = q((yield this.provider.call(p)), 0);
                                    if (null == m)
                                        return null;
                                    t.push({
                                        type: "metadata-url-base",
                                        content: m
                                    }),
                                    "erc1155" === i && (m = m.replace("{id}", f.substring(2)),
                                    t.push({
                                        type: "metadata-url-expanded",
                                        content: m
                                    })),
                                    m.match(/^ipfs:/i) && (m = V(m)),
                                    t.push({
                                        type: "metadata-url",
                                        content: m
                                    });
                                    let g = yield(0,
                                    E.fetchJson)(m);
                                    if (!g)
                                        return null;
                                    t.push({
                                        type: "metadata",
                                        content: JSON.stringify(g)
                                    });
                                    let y = g.image;
                                    if ("string" != typeof y)
                                        return null;
                                    if (y.match(/^(https:\/\/|data:)/i))
                                        ;
                                    else {
                                        let v = y.match(z);
                                        if (null == v)
                                            return null;
                                        t.push({
                                            type: "url-ipfs",
                                            content: y
                                        }),
                                        y = V(y)
                                    }
                                    return t.push({
                                        type: "url",
                                        content: y
                                    }),
                                    {
                                        linkage: t,
                                        url: y
                                    }
                                }
                            }
                        }
                    } catch (b) {}
                    return null
                })
            }
            getContentHash() {
                return S(this, void 0, void 0, function*() {
                    let t = yield this._fetchBytes("0xbc1c58d1");
                    if (null == t || "0x" === t)
                        return null;
                    let e = t.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
                    if (e) {
                        let r = parseInt(e[3], 16);
                        if (e[4].length === 2 * r)
                            return "ipfs://" + o.Base58.encode("0x" + e[1])
                    }
                    let n = t.match(/^0xe5010172(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
                    if (n) {
                        let s = parseInt(n[3], 16);
                        if (n[4].length === 2 * s)
                            return "ipns://" + o.Base58.encode("0x" + n[1])
                    }
                    let a = t.match(/^0xe40101fa011b20([0-9a-f]*)$/);
                    if (a && 64 === a[1].length)
                        return "bzz://" + a[1];
                    let u = t.match(/^0x90b2c605([0-9a-f]*)$/);
                    if (u && 68 === u[1].length) {
                        let l = {
                            "=": "",
                            "+": "-",
                            "/": "_"
                        }
                          , f = (0,
                        i.c)("0x" + u[1]).replace(/[=+\/]/g, t=>l[t]);
                        return "sia://" + f
                    }
                    return R.throwError("invalid or unsupported content hash data", h.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: "getContentHash()",
                        data: t
                    })
                })
            }
            getText(t) {
                return S(this, void 0, void 0, function*() {
                    let e = (0,
                    w.Y0)(t);
                    (e = (0,
                    a.concat)([D(64), D(e.length), e])).length % 32 != 0 && (e = (0,
                    a.concat)([e, (0,
                    a.hexZeroPad)("0x", 32 - t.length % 32)]));
                    let r = yield this._fetchBytes("0x59d1d43c", (0,
                    a.hexlify)(e));
                    return null == r || "0x" === r ? null : (0,
                    w.ZN)(r)
                })
            }
        }
        let W = null
          , X = 1;
        class K extends n.zt {
            constructor(t) {
                if (super(),
                this._events = [],
                this._emitted = {
                    block: -2
                },
                this.disableCcipRead = !1,
                this.formatter = new.target.getFormatter(),
                (0,
                v.defineReadOnly)(this, "anyNetwork", "any" === t),
                this.anyNetwork && (t = this.detectNetwork()),
                t instanceof Promise)
                    this._networkPromise = t,
                    t.catch(t=>{}
                    ),
                    this._ready().catch(t=>{}
                    );
                else {
                    let e = (0,
                    v.getStatic)(new.target, "getNetwork")(t);
                    e ? ((0,
                    v.defineReadOnly)(this, "_network", e),
                    this.emit("network", e, null)) : R.throwArgumentError("invalid network", "network", t)
                }
                this._maxInternalBlockNumber = -1024,
                this._lastBlockNumber = -2,
                this._maxFilterBlockRange = 10,
                this._pollingInterval = 4e3,
                this._fastQueryDate = 0
            }
            _ready() {
                return S(this, void 0, void 0, function*() {
                    if (null == this._network) {
                        let t = null;
                        if (this._networkPromise)
                            try {
                                t = yield this._networkPromise
                            } catch (e) {}
                        null == t && (t = yield this.detectNetwork()),
                        t || R.throwError("no network detected", h.Logger.errors.UNKNOWN_ERROR, {}),
                        null == this._network && (this.anyNetwork ? this._network = t : (0,
                        v.defineReadOnly)(this, "_network", t),
                        this.emit("network", t, null))
                    }
                    return this._network
                })
            }
            get ready() {
                return (0,
                E.poll)(()=>this._ready().then(t=>t, t=>{
                    if (t.code !== h.Logger.errors.NETWORK_ERROR || "noNetwork" !== t.event)
                        throw t
                }
                ))
            }
            static getFormatter() {
                return null == W && (W = new P),
                W
            }
            static getNetwork(t) {
                return function(t) {
                    if (null == t)
                        return null;
                    if ("number" == typeof t) {
                        for (let e in y) {
                            let r = y[e];
                            if (r.chainId === t)
                                return {
                                    name: r.name,
                                    chainId: r.chainId,
                                    ensAddress: r.ensAddress || null,
                                    _defaultProvider: r._defaultProvider || null
                                }
                        }
                        return {
                            chainId: t,
                            name: "unknown"
                        }
                    }
                    if ("string" == typeof t) {
                        let n = y[t];
                        return null == n ? null : {
                            name: n.name,
                            chainId: n.chainId,
                            ensAddress: n.ensAddress,
                            _defaultProvider: n._defaultProvider || null
                        }
                    }
                    let i = y[t.name];
                    if (!i)
                        return "number" != typeof t.chainId && f.throwArgumentError("invalid network chainId", "network", t),
                        t;
                    0 !== t.chainId && t.chainId !== i.chainId && f.throwArgumentError("network chainId mismatch", "network", t);
                    let o = t._defaultProvider || null;
                    if (null == o && i._defaultProvider) {
                        var s;
                        o = (s = i._defaultProvider) && "function" == typeof s.renetwork ? i._defaultProvider.renetwork(t) : i._defaultProvider
                    }
                    return {
                        name: t.name,
                        chainId: i.chainId,
                        ensAddress: t.ensAddress || i.ensAddress || null,
                        _defaultProvider: o
                    }
                }(null == t ? "homestead" : t)
            }
            ccipReadFetch(t, e, r) {
                return S(this, void 0, void 0, function*() {
                    if (this.disableCcipRead || 0 === r.length)
                        return null;
                    let n = t.to.toLowerCase()
                      , i = e.toLowerCase()
                      , o = [];
                    for (let s = 0; s < r.length; s++) {
                        let a = r[s]
                          , u = a.replace("{sender}", n).replace("{data}", i)
                          , l = a.indexOf("{data}") >= 0 ? null : JSON.stringify({
                            data: i,
                            sender: n
                        })
                          , f = yield(0,
                        E.fetchJson)({
                            url: u,
                            errorPassThrough: !0
                        }, l, (t,e)=>(t.status = e.statusCode,
                        t));
                        if (f.data)
                            return f.data;
                        let c = f.message || "unknown error";
                        if (f.status >= 400 && f.status < 500)
                            return R.throwError(`response not found during CCIP fetch: ${c}`, h.Logger.errors.SERVER_ERROR, {
                                url: a,
                                errorMessage: c
                            });
                        o.push(c)
                    }
                    return R.throwError(`error encountered during CCIP fetch: ${o.map(t=>JSON.stringify(t)).join(", ")}`, h.Logger.errors.SERVER_ERROR, {
                        urls: r,
                        errorMessages: o
                    })
                })
            }
            _getInternalBlockNumber(t) {
                return S(this, void 0, void 0, function*() {
                    if (yield this._ready(),
                    t > 0)
                        for (; this._internalBlockNumber; ) {
                            let e = this._internalBlockNumber;
                            try {
                                let r = yield e;
                                if (L() - r.respTime <= t)
                                    return r.blockNumber;
                                break
                            } catch (n) {
                                if (this._internalBlockNumber === e)
                                    break
                            }
                        }
                    let i = L()
                      , o = (0,
                    v.resolveProperties)({
                        blockNumber: this.perform("getBlockNumber", {}),
                        networkError: this.getNetwork().then(t=>null, t=>t)
                    }).then(({blockNumber: t, networkError: e})=>{
                        if (e)
                            throw this._internalBlockNumber === o && (this._internalBlockNumber = null),
                            e;
                        let r = L();
                        return (t = s.O$.from(t).toNumber()) < this._maxInternalBlockNumber && (t = this._maxInternalBlockNumber),
                        this._maxInternalBlockNumber = t,
                        this._setFastBlockNumber(t),
                        {
                            blockNumber: t,
                            reqTime: i,
                            respTime: r
                        }
                    }
                    );
                    return this._internalBlockNumber = o,
                    o.catch(t=>{
                        this._internalBlockNumber === o && (this._internalBlockNumber = null)
                    }
                    ),
                    (yield o).blockNumber
                })
            }
            poll() {
                return S(this, void 0, void 0, function*() {
                    let t = X++
                      , e = []
                      , r = null;
                    try {
                        r = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2)
                    } catch (n) {
                        this.emit("error", n);
                        return
                    }
                    if (this._setFastBlockNumber(r),
                    this.emit("poll", t, r),
                    r === this._lastBlockNumber) {
                        this.emit("didPoll", t);
                        return
                    }
                    if (-2 === this._emitted.block && (this._emitted.block = r - 1),
                    Math.abs(this._emitted.block - r) > 1e3)
                        R.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${r})`),
                        this.emit("error", R.makeError("network block skew detected", h.Logger.errors.NETWORK_ERROR, {
                            blockNumber: r,
                            event: "blockSkew",
                            previousBlockNumber: this._emitted.block
                        })),
                        this.emit("block", r);
                    else
                        for (let i = this._emitted.block + 1; i <= r; i++)
                            this.emit("block", i);
                    this._emitted.block !== r && (this._emitted.block = r,
                    Object.keys(this._emitted).forEach(t=>{
                        if ("block" === t)
                            return;
                        let e = this._emitted[t];
                        "pending" !== e && r - e > 12 && delete this._emitted[t]
                    }
                    )),
                    -2 === this._lastBlockNumber && (this._lastBlockNumber = r - 1),
                    this._events.forEach(t=>{
                        switch (t.type) {
                        case "tx":
                            {
                                let n = t.hash
                                  , i = this.getTransactionReceipt(n).then(t=>(t && null != t.blockNumber && (this._emitted["t:" + n] = t.blockNumber,
                                this.emit(n, t)),
                                null)).catch(t=>{
                                    this.emit("error", t)
                                }
                                );
                                e.push(i);
                                break
                            }
                        case "filter":
                            if (!t._inflight) {
                                t._inflight = !0;
                                let o = t.filter;
                                o.fromBlock = t._lastBlockNumber + 1,
                                o.toBlock = r,
                                o.toBlock - this._maxFilterBlockRange > o.fromBlock && (o.fromBlock = o.toBlock - this._maxFilterBlockRange);
                                let s = this.getLogs(o).then(e=>{
                                    t._inflight = !1,
                                    0 !== e.length && e.forEach(e=>{
                                        e.blockNumber > t._lastBlockNumber && (t._lastBlockNumber = e.blockNumber),
                                        this._emitted["b:" + e.blockHash] = e.blockNumber,
                                        this._emitted["t:" + e.transactionHash] = e.blockNumber,
                                        this.emit(o, e)
                                    }
                                    )
                                }
                                ).catch(e=>{
                                    this.emit("error", e),
                                    t._inflight = !1
                                }
                                );
                                e.push(s)
                            }
                        }
                    }
                    ),
                    this._lastBlockNumber = r,
                    Promise.all(e).then(()=>{
                        this.emit("didPoll", t)
                    }
                    ).catch(t=>{
                        this.emit("error", t)
                    }
                    )
                })
            }
            resetEventsBlock(t) {
                this._lastBlockNumber = t - 1,
                this.polling && this.poll()
            }
            get network() {
                return this._network
            }
            detectNetwork() {
                return S(this, void 0, void 0, function*() {
                    return R.throwError("provider does not support network detection", h.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: "provider.detectNetwork"
                    })
                })
            }
            getNetwork() {
                return S(this, void 0, void 0, function*() {
                    let t = yield this._ready()
                      , e = yield this.detectNetwork();
                    if (t.chainId !== e.chainId) {
                        if (this.anyNetwork)
                            return this._network = e,
                            this._lastBlockNumber = -2,
                            this._fastBlockNumber = null,
                            this._fastBlockNumberPromise = null,
                            this._fastQueryDate = 0,
                            this._emitted.block = -2,
                            this._maxInternalBlockNumber = -1024,
                            this._internalBlockNumber = null,
                            this.emit("network", e, t),
                            yield C(0),
                            this._network;
                        let r = R.makeError("underlying network changed", h.Logger.errors.NETWORK_ERROR, {
                            event: "changed",
                            network: t,
                            detectedNetwork: e
                        });
                        throw this.emit("error", r),
                        r
                    }
                    return t
                })
            }
            get blockNumber() {
                return this._getInternalBlockNumber(100 + this.pollingInterval / 2).then(t=>{
                    this._setFastBlockNumber(t)
                }
                , t=>{}
                ),
                null != this._fastBlockNumber ? this._fastBlockNumber : -1
            }
            get polling() {
                return null != this._poller
            }
            set polling(t) {
                t && !this._poller ? (this._poller = setInterval(()=>{
                    this.poll()
                }
                , this.pollingInterval),
                this._bootstrapPoll || (this._bootstrapPoll = setTimeout(()=>{
                    this.poll(),
                    this._bootstrapPoll = setTimeout(()=>{
                        this._poller || this.poll(),
                        this._bootstrapPoll = null
                    }
                    , this.pollingInterval)
                }
                , 0))) : !t && this._poller && (clearInterval(this._poller),
                this._poller = null)
            }
            get pollingInterval() {
                return this._pollingInterval
            }
            set pollingInterval(t) {
                if ("number" != typeof t || t <= 0 || parseInt(String(t)) != t)
                    throw Error("invalid polling interval");
                this._pollingInterval = t,
                this._poller && (clearInterval(this._poller),
                this._poller = setInterval(()=>{
                    this.poll()
                }
                , this._pollingInterval))
            }
            _getFastBlockNumber() {
                let t = L();
                return t - this._fastQueryDate > 2 * this._pollingInterval && (this._fastQueryDate = t,
                this._fastBlockNumberPromise = this.getBlockNumber().then(t=>((null == this._fastBlockNumber || t > this._fastBlockNumber) && (this._fastBlockNumber = t),
                this._fastBlockNumber))),
                this._fastBlockNumberPromise
            }
            _setFastBlockNumber(t) {
                (null == this._fastBlockNumber || !(t < this._fastBlockNumber)) && (this._fastQueryDate = L(),
                (null == this._fastBlockNumber || t > this._fastBlockNumber) && (this._fastBlockNumber = t,
                this._fastBlockNumberPromise = Promise.resolve(t)))
            }
            waitForTransaction(t, e, r) {
                return S(this, void 0, void 0, function*() {
                    return this._waitForTransaction(t, null == e ? 1 : e, r || 0, null)
                })
            }
            _waitForTransaction(t, e, r, n) {
                return S(this, void 0, void 0, function*() {
                    let i = yield this.getTransactionReceipt(t);
                    return (i ? i.confirmations : 0) >= e ? i : new Promise((i,o)=>{
                        let s = []
                          , a = !1
                          , u = function() {
                            return !!a || (a = !0,
                            s.forEach(t=>{
                                t()
                            }
                            ),
                            !1)
                        }
                          , l = t=>{
                            t.confirmations < e || u() || i(t)
                        }
                        ;
                        if (this.on(t, l),
                        s.push(()=>{
                            this.removeListener(t, l)
                        }
                        ),
                        n) {
                            let f = n.startBlock
                              , c = null
                              , d = r=>S(this, void 0, void 0, function*() {
                                a || (yield C(1e3),
                                this.getTransactionCount(n.from).then(i=>S(this, void 0, void 0, function*() {
                                    if (!a) {
                                        if (i <= n.nonce)
                                            f = r;
                                        else {
                                            {
                                                let s = yield this.getTransaction(t);
                                                if (s && null != s.blockNumber)
                                                    return
                                            }
                                            for (null == c && (c = f - 3) < n.startBlock && (c = n.startBlock); c <= r; ) {
                                                if (a)
                                                    return;
                                                let l = yield this.getBlockWithTransactions(c);
                                                for (let p = 0; p < l.transactions.length; p++) {
                                                    let m = l.transactions[p];
                                                    if (m.hash === t)
                                                        return;
                                                    if (m.from === n.from && m.nonce === n.nonce) {
                                                        if (a)
                                                            return;
                                                        let g = yield this.waitForTransaction(m.hash, e);
                                                        if (u())
                                                            return;
                                                        let y = "replaced";
                                                        m.data === n.data && m.to === n.to && m.value.eq(n.value) ? y = "repriced" : "0x" === m.data && m.from === m.to && m.value.isZero() && (y = "cancelled"),
                                                        o(R.makeError("transaction was replaced", h.Logger.errors.TRANSACTION_REPLACED, {
                                                            cancelled: "replaced" === y || "cancelled" === y,
                                                            reason: y,
                                                            replacement: this._wrapTransaction(m),
                                                            hash: t,
                                                            receipt: g
                                                        }));
                                                        return
                                                    }
                                                }
                                                c++
                                            }
                                        }
                                        a || this.once("block", d)
                                    }
                                }), t=>{
                                    a || this.once("block", d)
                                }
                                ))
                            });
                            if (a)
                                return;
                            this.once("block", d),
                            s.push(()=>{
                                this.removeListener("block", d)
                            }
                            )
                        }
                        if ("number" == typeof r && r > 0) {
                            let p = setTimeout(()=>{
                                u() || o(R.makeError("timeout exceeded", h.Logger.errors.TIMEOUT, {
                                    timeout: r
                                }))
                            }
                            , r);
                            p.unref && p.unref(),
                            s.push(()=>{
                                clearTimeout(p)
                            }
                            )
                        }
                    }
                    )
                })
            }
            getBlockNumber() {
                return S(this, void 0, void 0, function*() {
                    return this._getInternalBlockNumber(0)
                })
            }
            getGasPrice() {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let t = yield this.perform("getGasPrice", {});
                    try {
                        return s.O$.from(t)
                    } catch (e) {
                        return R.throwError("bad result from backend", h.Logger.errors.SERVER_ERROR, {
                            method: "getGasPrice",
                            result: t,
                            error: e
                        })
                    }
                })
            }
            getBalance(t, e) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let r = yield(0,
                    v.resolveProperties)({
                        address: this._getAddress(t),
                        blockTag: this._getBlockTag(e)
                    })
                      , n = yield this.perform("getBalance", r);
                    try {
                        return s.O$.from(n)
                    } catch (i) {
                        return R.throwError("bad result from backend", h.Logger.errors.SERVER_ERROR, {
                            method: "getBalance",
                            params: r,
                            result: n,
                            error: i
                        })
                    }
                })
            }
            getTransactionCount(t, e) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let r = yield(0,
                    v.resolveProperties)({
                        address: this._getAddress(t),
                        blockTag: this._getBlockTag(e)
                    })
                      , n = yield this.perform("getTransactionCount", r);
                    try {
                        return s.O$.from(n).toNumber()
                    } catch (i) {
                        return R.throwError("bad result from backend", h.Logger.errors.SERVER_ERROR, {
                            method: "getTransactionCount",
                            params: r,
                            result: n,
                            error: i
                        })
                    }
                })
            }
            getCode(t, e) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let r = yield(0,
                    v.resolveProperties)({
                        address: this._getAddress(t),
                        blockTag: this._getBlockTag(e)
                    })
                      , n = yield this.perform("getCode", r);
                    try {
                        return (0,
                        a.hexlify)(n)
                    } catch (i) {
                        return R.throwError("bad result from backend", h.Logger.errors.SERVER_ERROR, {
                            method: "getCode",
                            params: r,
                            result: n,
                            error: i
                        })
                    }
                })
            }
            getStorageAt(t, e, r) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let n = yield(0,
                    v.resolveProperties)({
                        address: this._getAddress(t),
                        blockTag: this._getBlockTag(r),
                        position: Promise.resolve(e).then(t=>(0,
                        a.hexValue)(t))
                    })
                      , i = yield this.perform("getStorageAt", n);
                    try {
                        return (0,
                        a.hexlify)(i)
                    } catch (o) {
                        return R.throwError("bad result from backend", h.Logger.errors.SERVER_ERROR, {
                            method: "getStorageAt",
                            params: n,
                            result: i,
                            error: o
                        })
                    }
                })
            }
            _wrapTransaction(t, e, r) {
                if (null != e && 32 !== (0,
                a.hexDataLength)(e))
                    throw Error("invalid response - sendTransaction");
                let n = t;
                return null != e && t.hash !== e && R.throwError("Transaction hash mismatch from Provider.sendTransaction.", h.Logger.errors.UNKNOWN_ERROR, {
                    expectedHash: t.hash,
                    returnedHash: e
                }),
                n.wait = (e,n)=>S(this, void 0, void 0, function*() {
                    let i;
                    null == e && (e = 1),
                    null == n && (n = 0),
                    0 !== e && null != r && (i = {
                        data: t.data,
                        from: t.from,
                        nonce: t.nonce,
                        to: t.to,
                        value: t.value,
                        startBlock: r
                    });
                    let o = yield this._waitForTransaction(t.hash, e, n, i);
                    return null == o && 0 === e ? null : (this._emitted["t:" + t.hash] = o.blockNumber,
                    0 === o.status && R.throwError("transaction failed", h.Logger.errors.CALL_EXCEPTION, {
                        transactionHash: t.hash,
                        transaction: t,
                        receipt: o
                    }),
                    o)
                }),
                n
            }
            sendTransaction(t) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let e = yield Promise.resolve(t).then(t=>(0,
                    a.hexlify)(t))
                      , r = this.formatter.transaction(t);
                    null == r.confirmations && (r.confirmations = 0);
                    let n = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                    try {
                        let i = yield this.perform("sendTransaction", {
                            signedTransaction: e
                        });
                        return this._wrapTransaction(r, i, n)
                    } catch (o) {
                        throw o.transaction = r,
                        o.transactionHash = r.hash,
                        o
                    }
                })
            }
            _getTransactionRequest(t) {
                return S(this, void 0, void 0, function*() {
                    let e = yield t
                      , r = {};
                    return ["from", "to"].forEach(t=>{
                        null != e[t] && (r[t] = Promise.resolve(e[t]).then(t=>t ? this._getAddress(t) : null))
                    }
                    ),
                    ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach(t=>{
                        null != e[t] && (r[t] = Promise.resolve(e[t]).then(t=>t ? s.O$.from(t) : null))
                    }
                    ),
                    ["type"].forEach(t=>{
                        null != e[t] && (r[t] = Promise.resolve(e[t]).then(t=>null != t ? t : null))
                    }
                    ),
                    e.accessList && (r.accessList = this.formatter.accessList(e.accessList)),
                    ["data"].forEach(t=>{
                        null != e[t] && (r[t] = Promise.resolve(e[t]).then(t=>t ? (0,
                        a.hexlify)(t) : null))
                    }
                    ),
                    this.formatter.transactionRequest((yield(0,
                    v.resolveProperties)(r)))
                })
            }
            _getFilter(t) {
                return S(this, void 0, void 0, function*() {
                    t = yield t;
                    let e = {};
                    return null != t.address && (e.address = this._getAddress(t.address)),
                    ["blockHash", "topics"].forEach(r=>{
                        null != t[r] && (e[r] = t[r])
                    }
                    ),
                    ["fromBlock", "toBlock"].forEach(r=>{
                        null != t[r] && (e[r] = this._getBlockTag(t[r]))
                    }
                    ),
                    this.formatter.filter((yield(0,
                    v.resolveProperties)(e)))
                })
            }
            _call(t, e, r) {
                return S(this, void 0, void 0, function*() {
                    r >= 10 && R.throwError("CCIP read exceeded maximum redirections", h.Logger.errors.SERVER_ERROR, {
                        redirects: r,
                        transaction: t
                    });
                    let n = t.to
                      , i = yield this.perform("call", {
                        transaction: t,
                        blockTag: e
                    });
                    if (r >= 0 && "latest" === e && null != n && "0x556f1830" === i.substring(0, 10) && (0,
                    a.hexDataLength)(i) % 32 == 4)
                        try {
                            let o = (0,
                            a.hexDataSlice)(i, 4)
                              , u = (0,
                            a.hexDataSlice)(o, 0, 32);
                            s.O$.from(u).eq(n) || R.throwError("CCIP Read sender did not match", h.Logger.errors.CALL_EXCEPTION, {
                                name: "OffchainLookup",
                                signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
                                transaction: t,
                                data: i
                            });
                            let l = []
                              , f = s.O$.from((0,
                            a.hexDataSlice)(o, 32, 64)).toNumber()
                              , c = s.O$.from((0,
                            a.hexDataSlice)(o, f, f + 32)).toNumber()
                              , d = (0,
                            a.hexDataSlice)(o, f + 32);
                            for (let p = 0; p < c; p++) {
                                let m = q(d, 32 * p);
                                null == m && R.throwError("CCIP Read contained corrupt URL string", h.Logger.errors.CALL_EXCEPTION, {
                                    name: "OffchainLookup",
                                    signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
                                    transaction: t,
                                    data: i
                                }),
                                l.push(m)
                            }
                            let g = G(o, 64);
                            s.O$.from((0,
                            a.hexDataSlice)(o, 100, 128)).isZero() || R.throwError("CCIP Read callback selector included junk", h.Logger.errors.CALL_EXCEPTION, {
                                name: "OffchainLookup",
                                signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
                                transaction: t,
                                data: i
                            });
                            let y = (0,
                            a.hexDataSlice)(o, 96, 100)
                              , v = G(o, 128)
                              , b = yield this.ccipReadFetch(t, g, l);
                            null == b && R.throwError("CCIP Read disabled or provided no URLs", h.Logger.errors.CALL_EXCEPTION, {
                                name: "OffchainLookup",
                                signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
                                transaction: t,
                                data: i
                            });
                            let w = {
                                to: n,
                                data: (0,
                                a.hexConcat)([y, J([b, v])])
                            };
                            return this._call(w, e, r + 1)
                        } catch (E) {
                            if (E.code === h.Logger.errors.SERVER_ERROR)
                                throw E
                        }
                    try {
                        return (0,
                        a.hexlify)(i)
                    } catch (_) {
                        return R.throwError("bad result from backend", h.Logger.errors.SERVER_ERROR, {
                            method: "call",
                            params: {
                                transaction: t,
                                blockTag: e
                            },
                            result: i,
                            error: _
                        })
                    }
                })
            }
            call(t, e) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let r = yield(0,
                    v.resolveProperties)({
                        transaction: this._getTransactionRequest(t),
                        blockTag: this._getBlockTag(e),
                        ccipReadEnabled: Promise.resolve(t.ccipReadEnabled)
                    });
                    return this._call(r.transaction, r.blockTag, r.ccipReadEnabled ? 0 : -1)
                })
            }
            estimateGas(t) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let e = yield(0,
                    v.resolveProperties)({
                        transaction: this._getTransactionRequest(t)
                    })
                      , r = yield this.perform("estimateGas", e);
                    try {
                        return s.O$.from(r)
                    } catch (n) {
                        return R.throwError("bad result from backend", h.Logger.errors.SERVER_ERROR, {
                            method: "estimateGas",
                            params: e,
                            result: r,
                            error: n
                        })
                    }
                })
            }
            _getAddress(t) {
                return S(this, void 0, void 0, function*() {
                    "string" != typeof (t = yield t) && R.throwArgumentError("invalid address or ENS name", "name", t);
                    let e = yield this.resolveName(t);
                    return null == e && R.throwError("ENS name not configured", h.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: `resolveName(${JSON.stringify(t)})`
                    }),
                    e
                })
            }
            _getBlock(t, e) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork(),
                    t = yield t;
                    let r = -128
                      , n = {
                        includeTransactions: !!e
                    };
                    if ((0,
                    a.isHexString)(t, 32))
                        n.blockHash = t;
                    else
                        try {
                            n.blockTag = yield this._getBlockTag(t),
                            (0,
                            a.isHexString)(n.blockTag) && (r = parseInt(n.blockTag.substring(2), 16))
                        } catch (i) {
                            R.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", t)
                        }
                    return (0,
                    E.poll)(()=>S(this, void 0, void 0, function*() {
                        let t = yield this.perform("getBlock", n);
                        if (null == t)
                            return null != n.blockHash && null == this._emitted["b:" + n.blockHash] || null != n.blockTag && r > this._emitted.block ? null : void 0;
                        if (e) {
                            let i = null;
                            for (let o = 0; o < t.transactions.length; o++) {
                                let s = t.transactions[o];
                                if (null == s.blockNumber)
                                    s.confirmations = 0;
                                else if (null == s.confirmations) {
                                    null == i && (i = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval));
                                    let a = i - s.blockNumber + 1;
                                    a <= 0 && (a = 1),
                                    s.confirmations = a
                                }
                            }
                            let u = this.formatter.blockWithTransactions(t);
                            return u.transactions = u.transactions.map(t=>this._wrapTransaction(t)),
                            u
                        }
                        return this.formatter.block(t)
                    }), {
                        oncePoll: this
                    })
                })
            }
            getBlock(t) {
                return this._getBlock(t, !1)
            }
            getBlockWithTransactions(t) {
                return this._getBlock(t, !0)
            }
            getTransaction(t) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork(),
                    t = yield t;
                    let e = {
                        transactionHash: this.formatter.hash(t, !0)
                    };
                    return (0,
                    E.poll)(()=>S(this, void 0, void 0, function*() {
                        let r = yield this.perform("getTransaction", e);
                        if (null == r)
                            return null == this._emitted["t:" + t] ? null : void 0;
                        let n = this.formatter.transactionResponse(r);
                        if (null == n.blockNumber)
                            n.confirmations = 0;
                        else if (null == n.confirmations) {
                            let i = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval)
                              , o = i - n.blockNumber + 1;
                            o <= 0 && (o = 1),
                            n.confirmations = o
                        }
                        return this._wrapTransaction(n)
                    }), {
                        oncePoll: this
                    })
                })
            }
            getTransactionReceipt(t) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork(),
                    t = yield t;
                    let e = {
                        transactionHash: this.formatter.hash(t, !0)
                    };
                    return (0,
                    E.poll)(()=>S(this, void 0, void 0, function*() {
                        let r = yield this.perform("getTransactionReceipt", e);
                        if (null == r)
                            return null == this._emitted["t:" + t] ? null : void 0;
                        if (null == r.blockHash)
                            return;
                        let n = this.formatter.receipt(r);
                        if (null == n.blockNumber)
                            n.confirmations = 0;
                        else if (null == n.confirmations) {
                            let i = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval)
                              , o = i - n.blockNumber + 1;
                            o <= 0 && (o = 1),
                            n.confirmations = o
                        }
                        return n
                    }), {
                        oncePoll: this
                    })
                })
            }
            getLogs(t) {
                return S(this, void 0, void 0, function*() {
                    yield this.getNetwork();
                    let e = yield(0,
                    v.resolveProperties)({
                        filter: this._getFilter(t)
                    })
                      , r = yield this.perform("getLogs", e);
                    return r.forEach(t=>{
                        null == t.removed && (t.removed = !1)
                    }
                    ),
                    P.arrayOf(this.formatter.filterLog.bind(this.formatter))(r)
                })
            }
            getEtherPrice() {
                return S(this, void 0, void 0, function*() {
                    return yield this.getNetwork(),
                    this.perform("getEtherPrice", {})
                })
            }
            _getBlockTag(t) {
                return S(this, void 0, void 0, function*() {
                    if ("number" == typeof (t = yield t) && t < 0) {
                        t % 1 && R.throwArgumentError("invalid BlockTag", "blockTag", t);
                        let e = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                        return (e += t) < 0 && (e = 0),
                        this.formatter.blockTag(e)
                    }
                    return this.formatter.blockTag(t)
                })
            }
            getResolver(t) {
                return S(this, void 0, void 0, function*() {
                    let e = t;
                    for (; ; ) {
                        if ("" === e || "." === e || "eth" !== t && "eth" === e)
                            return null;
                        let r = yield this._getResolver(e, "getResolver");
                        if (null != r) {
                            let n = new Z(this,r,t);
                            if (e !== t && !(yield n.supportsWildcard()))
                                return null;
                            return n
                        }
                        e = e.split(".").slice(1).join(".")
                    }
                })
            }
            _getResolver(t, e) {
                return S(this, void 0, void 0, function*() {
                    null == e && (e = "ENS");
                    let r = yield this.getNetwork();
                    r.ensAddress || R.throwError("network does not support ENS", h.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: e,
                        network: r.name
                    });
                    try {
                        let n = yield this.call({
                            to: r.ensAddress,
                            data: "0x0178b8bf" + (0,
                            l.VM)(t).substring(2)
                        });
                        return this.formatter.callAddress(n)
                    } catch (i) {}
                    return null
                })
            }
            resolveName(t) {
                return S(this, void 0, void 0, function*() {
                    t = yield t;
                    try {
                        return Promise.resolve(this.formatter.address(t))
                    } catch (e) {
                        if ((0,
                        a.isHexString)(t))
                            throw e
                    }
                    "string" != typeof t && R.throwArgumentError("invalid ENS name", "name", t);
                    let r = yield this.getResolver(t);
                    return r ? yield r.getAddress() : null
                })
            }
            lookupAddress(t) {
                return S(this, void 0, void 0, function*() {
                    t = yield t,
                    t = this.formatter.address(t);
                    let e = t.substring(2).toLowerCase() + ".addr.reverse"
                      , r = yield this._getResolver(e, "lookupAddress");
                    if (null == r)
                        return null;
                    let n = q((yield this.call({
                        to: r,
                        data: "0x691f3431" + (0,
                        l.VM)(e).substring(2)
                    })), 0)
                      , i = yield this.resolveName(n);
                    return i != t ? null : n
                })
            }
            getAvatar(t) {
                return S(this, void 0, void 0, function*() {
                    let e = null;
                    if ((0,
                    a.isHexString)(t)) {
                        let r = this.formatter.address(t)
                          , n = r.substring(2).toLowerCase() + ".addr.reverse"
                          , i = yield this._getResolver(n, "getAvatar");
                        if (!i)
                            return null;
                        e = new Z(this,i,n);
                        try {
                            let o = yield e.getAvatar();
                            if (o)
                                return o.url
                        } catch (s) {
                            if (s.code !== h.Logger.errors.CALL_EXCEPTION)
                                throw s
                        }
                        try {
                            let u = q((yield this.call({
                                to: i,
                                data: "0x691f3431" + (0,
                                l.VM)(n).substring(2)
                            })), 0);
                            e = yield this.getResolver(u)
                        } catch (f) {
                            if (f.code !== h.Logger.errors.CALL_EXCEPTION)
                                throw f;
                            return null
                        }
                    } else if (!(e = yield this.getResolver(t)))
                        return null;
                    let c = yield e.getAvatar();
                    return null == c ? null : c.url
                })
            }
            perform(t, e) {
                return R.throwError(t + " not implemented", h.Logger.errors.NOT_IMPLEMENTED, {
                    operation: t
                })
            }
            _startEvent(t) {
                this.polling = this._events.filter(t=>t.pollable()).length > 0
            }
            _stopEvent(t) {
                this.polling = this._events.filter(t=>t.pollable()).length > 0
            }
            _addEventListener(t, e, r) {
                let n = new F(I(t),e,r);
                return this._events.push(n),
                this._startEvent(n),
                this
            }
            on(t, e) {
                return this._addEventListener(t, e, !1)
            }
            once(t, e) {
                return this._addEventListener(t, e, !0)
            }
            emit(t, ...e) {
                let r = !1
                  , n = []
                  , i = I(t);
                return this._events = this._events.filter(t=>t.tag !== i || (setTimeout(()=>{
                    t.listener.apply(this, e)
                }
                , 0),
                r = !0,
                !t.once || (n.push(t),
                !1))),
                n.forEach(t=>{
                    this._stopEvent(t)
                }
                ),
                r
            }
            listenerCount(t) {
                if (!t)
                    return this._events.length;
                let e = I(t);
                return this._events.filter(t=>t.tag === e).length
            }
            listeners(t) {
                if (null == t)
                    return this._events.map(t=>t.listener);
                let e = I(t);
                return this._events.filter(t=>t.tag === e).map(t=>t.listener)
            }
            off(t, e) {
                if (null == e)
                    return this.removeAllListeners(t);
                let r = []
                  , n = !1
                  , i = I(t);
                return this._events = this._events.filter(t=>t.tag !== i || t.listener != e || !!n || (n = !0,
                r.push(t),
                !1)),
                r.forEach(t=>{
                    this._stopEvent(t)
                }
                ),
                this
            }
            removeAllListeners(t) {
                let e = [];
                if (null == t)
                    e = this._events,
                    this._events = [];
                else {
                    let r = I(t);
                    this._events = this._events.filter(t=>t.tag !== r || (e.push(t),
                    !1))
                }
                return e.forEach(t=>{
                    this._stopEvent(t)
                }
                ),
                this
            }
        }
    },
    4956: function(t, e, r) {
        "use strict";
        r.d(e, {
            Q: function() {
                return R
            }
        });
        var n = r(6881)
          , i = r(1581)
          , o = r(4216)
          , s = r(8088)
          , a = r(2593)
          , u = r(6441)
          , l = r(7827)
          , h = r(9251)
          , f = r(3875)
          , c = r(7707)
          , d = r(2263)
          , p = function(t, e, r, n) {
            return new (r || (r = Promise))(function(i, o) {
                function s(t) {
                    try {
                        u(n.next(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function a(t) {
                    try {
                        u(n.throw(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function u(t) {
                    var e;
                    t.done ? i(t.value) : ((e = t.value)instanceof r ? e : new r(function(t) {
                        t(e)
                    }
                    )).then(s, a)
                }
                u((n = n.apply(t, e || [])).next())
            }
            )
        };
        let m = new i.Logger(o.i)
          , g = ["call", "estimateGas"];
        function y(t, e) {
            if (null == t)
                return null;
            if ("string" == typeof t.message && t.message.match("reverted")) {
                let r = (0,
                u.isHexString)(t.data) ? t.data : null;
                if (!e || r)
                    return {
                        message: t.message,
                        data: r
                    }
            }
            if ("object" == typeof t) {
                for (let n in t) {
                    let i = y(t[n], e);
                    if (i)
                        return i
                }
                return null
            }
            if ("string" == typeof t)
                try {
                    return y(JSON.parse(t), e)
                } catch (o) {}
            return null
        }
        function v(t, e, r) {
            let n = r.transaction || r.signedTransaction;
            if ("call" === t) {
                let o = y(e, !0);
                if (o)
                    return o.data;
                m.throwError("missing revert data in call exception; Transaction reverted without a reason string", i.Logger.errors.CALL_EXCEPTION, {
                    data: "0x",
                    transaction: n,
                    error: e
                })
            }
            if ("estimateGas" === t) {
                let s = y(e.body, !1);
                null == s && (s = y(e, !1)),
                s && m.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", i.Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
                    reason: s.message,
                    method: t,
                    transaction: n,
                    error: e
                })
            }
            let a = e.message;
            throw e.code === i.Logger.errors.SERVER_ERROR && e.error && "string" == typeof e.error.message ? a = e.error.message : "string" == typeof e.body ? a = e.body : "string" == typeof e.responseText && (a = e.responseText),
            (a = (a || "").toLowerCase()).match(/insufficient funds|base fee exceeds gas limit/i) && m.throwError("insufficient funds for intrinsic transaction cost", i.Logger.errors.INSUFFICIENT_FUNDS, {
                error: e,
                method: t,
                transaction: n
            }),
            a.match(/nonce (is )?too low/i) && m.throwError("nonce has already been used", i.Logger.errors.NONCE_EXPIRED, {
                error: e,
                method: t,
                transaction: n
            }),
            a.match(/replacement transaction underpriced|transaction gas price.*too low/i) && m.throwError("replacement fee too low", i.Logger.errors.REPLACEMENT_UNDERPRICED, {
                error: e,
                method: t,
                transaction: n
            }),
            a.match(/only replay-protected/i) && m.throwError("legacy pre-eip-155 transactions not supported", i.Logger.errors.UNSUPPORTED_OPERATION, {
                error: e,
                method: t,
                transaction: n
            }),
            g.indexOf(t) >= 0 && a.match(/gas required exceeds allowance|always failing transaction|execution reverted/) && m.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", i.Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
                error: e,
                method: t,
                transaction: n
            }),
            e
        }
        function b(t) {
            return new Promise(function(e) {
                setTimeout(e, t)
            }
            )
        }
        function w(t) {
            if (t.error) {
                let e = Error(t.error.message);
                throw e.code = t.error.code,
                e.data = t.error.data,
                e
            }
            return t.result
        }
        function E(t) {
            return t ? t.toLowerCase() : t
        }
        let _ = {};
        class x extends s.E {
            constructor(t, e, r) {
                if (super(),
                t !== _)
                    throw Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
                (0,
                n.defineReadOnly)(this, "provider", e),
                null == r && (r = 0),
                "string" == typeof r ? ((0,
                n.defineReadOnly)(this, "_address", this.provider.formatter.address(r)),
                (0,
                n.defineReadOnly)(this, "_index", null)) : "number" == typeof r ? ((0,
                n.defineReadOnly)(this, "_index", r),
                (0,
                n.defineReadOnly)(this, "_address", null)) : m.throwArgumentError("invalid address or index", "addressOrIndex", r)
            }
            connect(t) {
                return m.throwError("cannot alter JSON-RPC Signer connection", i.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "connect"
                })
            }
            connectUnchecked() {
                return new A(_,this.provider,this._address || this._index)
            }
            getAddress() {
                return this._address ? Promise.resolve(this._address) : this.provider.send("eth_accounts", []).then(t=>(t.length <= this._index && m.throwError("unknown account #" + this._index, i.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "getAddress"
                }),
                this.provider.formatter.address(t[this._index])))
            }
            sendUncheckedTransaction(t) {
                t = (0,
                n.shallowCopy)(t);
                let e = this.getAddress().then(t=>(t && (t = t.toLowerCase()),
                t));
                if (null == t.gasLimit) {
                    let r = (0,
                    n.shallowCopy)(t);
                    r.from = e,
                    t.gasLimit = this.provider.estimateGas(r)
                }
                return null != t.to && (t.to = Promise.resolve(t.to).then(t=>p(this, void 0, void 0, function*() {
                    if (null == t)
                        return null;
                    let e = yield this.provider.resolveName(t);
                    return null == e && m.throwArgumentError("provided ENS name resolves to null", "tx.to", t),
                    e
                }))),
                (0,
                n.resolveProperties)({
                    tx: (0,
                    n.resolveProperties)(t),
                    sender: e
                }).then(({tx: e, sender: r})=>{
                    null != e.from ? e.from.toLowerCase() !== r && m.throwArgumentError("from address mismatch", "transaction", t) : e.from = r;
                    let n = this.provider.constructor.hexlifyTransaction(e, {
                        from: !0
                    });
                    return this.provider.send("eth_sendTransaction", [n]).then(t=>t, t=>v("sendTransaction", t, n))
                }
                )
            }
            signTransaction(t) {
                return m.throwError("signing transactions is unsupported", i.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "signTransaction"
                })
            }
            sendTransaction(t) {
                return p(this, void 0, void 0, function*() {
                    let e = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval)
                      , r = yield this.sendUncheckedTransaction(t);
                    try {
                        return yield(0,
                        c.poll)(()=>p(this, void 0, void 0, function*() {
                            let t = yield this.provider.getTransaction(r);
                            if (null !== t)
                                return this.provider._wrapTransaction(t, r, e)
                        }), {
                            oncePoll: this.provider
                        })
                    } catch (n) {
                        throw n.transactionHash = r,
                        n
                    }
                })
            }
            signMessage(t) {
                return p(this, void 0, void 0, function*() {
                    let e = "string" == typeof t ? (0,
                    h.Y0)(t) : t
                      , r = yield this.getAddress();
                    return yield this.provider.send("personal_sign", [(0,
                    u.hexlify)(e), r.toLowerCase()])
                })
            }
            _legacySignMessage(t) {
                return p(this, void 0, void 0, function*() {
                    let e = "string" == typeof t ? (0,
                    h.Y0)(t) : t
                      , r = yield this.getAddress();
                    return yield this.provider.send("eth_sign", [r.toLowerCase(), (0,
                    u.hexlify)(e)])
                })
            }
            _signTypedData(t, e, r) {
                return p(this, void 0, void 0, function*() {
                    let n = yield l.E.resolveNames(t, e, r, t=>this.provider.resolveName(t))
                      , i = yield this.getAddress();
                    return yield this.provider.send("eth_signTypedData_v4", [i.toLowerCase(), JSON.stringify(l.E.getPayload(n.domain, e, n.value))])
                })
            }
            unlock(t) {
                return p(this, void 0, void 0, function*() {
                    let e = this.provider
                      , r = yield this.getAddress();
                    return e.send("personal_unlockAccount", [r.toLowerCase(), t, null])
                })
            }
        }
        class A extends x {
            sendTransaction(t) {
                return this.sendUncheckedTransaction(t).then(t=>({
                    hash: t,
                    nonce: null,
                    gasLimit: null,
                    gasPrice: null,
                    data: null,
                    value: null,
                    chainId: null,
                    confirmations: 0,
                    from: null,
                    wait: e=>this.provider.waitForTransaction(t, e)
                }))
            }
        }
        let k = {
            chainId: !0,
            data: !0,
            gasLimit: !0,
            gasPrice: !0,
            nonce: !0,
            to: !0,
            value: !0,
            type: !0,
            accessList: !0,
            maxFeePerGas: !0,
            maxPriorityFeePerGas: !0
        };
        class N extends d.Zk {
            constructor(t, e) {
                let r = e;
                null == r && (r = new Promise((t,e)=>{
                    setTimeout(()=>{
                        this.detectNetwork().then(e=>{
                            t(e)
                        }
                        , t=>{
                            e(t)
                        }
                        )
                    }
                    , 0)
                }
                )),
                super(r),
                t || (t = (0,
                n.getStatic)(this.constructor, "defaultUrl")()),
                "string" == typeof t ? (0,
                n.defineReadOnly)(this, "connection", Object.freeze({
                    url: t
                })) : (0,
                n.defineReadOnly)(this, "connection", Object.freeze((0,
                n.shallowCopy)(t))),
                this._nextId = 42
            }
            get _cache() {
                return null == this._eventLoopCache && (this._eventLoopCache = {}),
                this._eventLoopCache
            }
            static defaultUrl() {
                return "http://localhost:8545"
            }
            detectNetwork() {
                return this._cache.detectNetwork || (this._cache.detectNetwork = this._uncachedDetectNetwork(),
                setTimeout(()=>{
                    this._cache.detectNetwork = null
                }
                , 0)),
                this._cache.detectNetwork
            }
            _uncachedDetectNetwork() {
                return p(this, void 0, void 0, function*() {
                    yield b(0);
                    let t = null;
                    try {
                        t = yield this.send("eth_chainId", [])
                    } catch (r) {
                        try {
                            t = yield this.send("net_version", [])
                        } catch (e) {}
                    }
                    if (null != t) {
                        let o = (0,
                        n.getStatic)(this.constructor, "getNetwork");
                        try {
                            return o(a.O$.from(t).toNumber())
                        } catch (s) {
                            return m.throwError("could not detect network", i.Logger.errors.NETWORK_ERROR, {
                                chainId: t,
                                event: "invalidNetwork",
                                serverError: s
                            })
                        }
                    }
                    return m.throwError("could not detect network", i.Logger.errors.NETWORK_ERROR, {
                        event: "noNetwork"
                    })
                })
            }
            getSigner(t) {
                return new x(_,this,t)
            }
            getUncheckedSigner(t) {
                return this.getSigner(t).connectUnchecked()
            }
            listAccounts() {
                return this.send("eth_accounts", []).then(t=>t.map(t=>this.formatter.address(t)))
            }
            send(t, e) {
                let r = {
                    method: t,
                    params: e,
                    id: this._nextId++,
                    jsonrpc: "2.0"
                };
                this.emit("debug", {
                    action: "request",
                    request: (0,
                    n.deepCopy)(r),
                    provider: this
                });
                let i = ["eth_chainId", "eth_blockNumber"].indexOf(t) >= 0;
                if (i && this._cache[t])
                    return this._cache[t];
                let o = (0,
                c.fetchJson)(this.connection, JSON.stringify(r), w).then(t=>(this.emit("debug", {
                    action: "response",
                    request: r,
                    response: t,
                    provider: this
                }),
                t), t=>{
                    throw this.emit("debug", {
                        action: "response",
                        error: t,
                        request: r,
                        provider: this
                    }),
                    t
                }
                );
                return i && (this._cache[t] = o,
                setTimeout(()=>{
                    this._cache[t] = null
                }
                , 0)),
                o
            }
            prepareRequest(t, e) {
                switch (t) {
                case "getBlockNumber":
                    return ["eth_blockNumber", []];
                case "getGasPrice":
                    return ["eth_gasPrice", []];
                case "getBalance":
                    return ["eth_getBalance", [E(e.address), e.blockTag]];
                case "getTransactionCount":
                    return ["eth_getTransactionCount", [E(e.address), e.blockTag]];
                case "getCode":
                    return ["eth_getCode", [E(e.address), e.blockTag]];
                case "getStorageAt":
                    return ["eth_getStorageAt", [E(e.address), (0,
                    u.hexZeroPad)(e.position, 32), e.blockTag]];
                case "sendTransaction":
                    return ["eth_sendRawTransaction", [e.signedTransaction]];
                case "getBlock":
                    if (e.blockTag)
                        return ["eth_getBlockByNumber", [e.blockTag, !!e.includeTransactions]];
                    if (e.blockHash)
                        return ["eth_getBlockByHash", [e.blockHash, !!e.includeTransactions]];
                    break;
                case "getTransaction":
                    return ["eth_getTransactionByHash", [e.transactionHash]];
                case "getTransactionReceipt":
                    return ["eth_getTransactionReceipt", [e.transactionHash]];
                case "call":
                    {
                        let r = (0,
                        n.getStatic)(this.constructor, "hexlifyTransaction");
                        return ["eth_call", [r(e.transaction, {
                            from: !0
                        }), e.blockTag]]
                    }
                case "estimateGas":
                    {
                        let i = (0,
                        n.getStatic)(this.constructor, "hexlifyTransaction");
                        return ["eth_estimateGas", [i(e.transaction, {
                            from: !0
                        })]]
                    }
                case "getLogs":
                    return e.filter && null != e.filter.address && (e.filter.address = E(e.filter.address)),
                    ["eth_getLogs", [e.filter]]
                }
                return null
            }
            perform(t, e) {
                return p(this, void 0, void 0, function*() {
                    if ("call" === t || "estimateGas" === t) {
                        let r = e.transaction;
                        if (r && null != r.type && a.O$.from(r.type).isZero() && null == r.maxFeePerGas && null == r.maxPriorityFeePerGas) {
                            let o = yield this.getFeeData();
                            null == o.maxFeePerGas && null == o.maxPriorityFeePerGas && ((e = (0,
                            n.shallowCopy)(e)).transaction = (0,
                            n.shallowCopy)(r),
                            delete e.transaction.type)
                        }
                    }
                    let s = this.prepareRequest(t, e);
                    null == s && m.throwError(t + " not implemented", i.Logger.errors.NOT_IMPLEMENTED, {
                        operation: t
                    });
                    try {
                        return yield this.send(s[0], s[1])
                    } catch (u) {
                        return v(t, u, e)
                    }
                })
            }
            _startEvent(t) {
                "pending" === t.tag && this._startPending(),
                super._startEvent(t)
            }
            _startPending() {
                if (null != this._pendingFilter)
                    return;
                let t = this
                  , e = this.send("eth_newPendingTransactionFilter", []);
                this._pendingFilter = e,
                e.then(function(r) {
                    return function n() {
                        t.send("eth_getFilterChanges", [r]).then(function(r) {
                            if (t._pendingFilter != e)
                                return null;
                            let n = Promise.resolve();
                            return r.forEach(function(e) {
                                t._emitted["t:" + e.toLowerCase()] = "pending",
                                n = n.then(function() {
                                    return t.getTransaction(e).then(function(e) {
                                        return t.emit("pending", e),
                                        null
                                    })
                                })
                            }),
                            n.then(function() {
                                return b(1e3)
                            })
                        }).then(function() {
                            if (t._pendingFilter != e) {
                                t.send("eth_uninstallFilter", [r]);
                                return
                            }
                            return setTimeout(function() {
                                n()
                            }, 0),
                            null
                        }).catch(t=>{}
                        )
                    }(),
                    r
                }).catch(t=>{}
                )
            }
            _stopEvent(t) {
                "pending" === t.tag && 0 === this.listenerCount("pending") && (this._pendingFilter = null),
                super._stopEvent(t)
            }
            static hexlifyTransaction(t, e) {
                let r = (0,
                n.shallowCopy)(k);
                if (e)
                    for (let i in e)
                        e[i] && (r[i] = !0);
                (0,
                n.checkProperties)(t, r);
                let o = {};
                return ["chainId", "gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach(function(e) {
                    if (null == t[e])
                        return;
                    let r = (0,
                    u.hexValue)(a.O$.from(t[e]));
                    "gasLimit" === e && (e = "gas"),
                    o[e] = r
                }),
                ["from", "to", "data"].forEach(function(e) {
                    null != t[e] && (o[e] = (0,
                    u.hexlify)(t[e]))
                }),
                t.accessList && (o.accessList = (0,
                f.accessListify)(t.accessList)),
                o
            }
        }
        let M = new i.Logger(o.i)
          , P = 1;
        function S(t, e) {
            let r = "Web3LegacyFetcher";
            return function(t, i) {
                let o = {
                    method: t,
                    params: i,
                    id: P++,
                    jsonrpc: "2.0"
                };
                return new Promise((t,i)=>{
                    this.emit("debug", {
                        action: "request",
                        fetcher: r,
                        request: (0,
                        n.deepCopy)(o),
                        provider: this
                    }),
                    e(o, (e,n)=>{
                        if (e)
                            return this.emit("debug", {
                                action: "response",
                                fetcher: r,
                                error: e,
                                request: o,
                                provider: this
                            }),
                            i(e);
                        if (this.emit("debug", {
                            action: "response",
                            fetcher: r,
                            request: o,
                            response: n,
                            provider: this
                        }),
                        n.error) {
                            let s = Error(n.error.message);
                            return s.code = n.error.code,
                            s.data = n.error.data,
                            i(s)
                        }
                        t(n.result)
                    }
                    )
                }
                )
            }
        }
        class R extends N {
            constructor(t, e) {
                null == t && M.throwArgumentError("missing provider", "provider", t);
                let r = null
                  , i = null
                  , o = null;
                "function" == typeof t ? (r = "unknown:",
                i = t) : (((r = t.host || t.path || "") || !t.isMetaMask || (r = "metamask"),
                o = t,
                t.request) ? ("" === r && (r = "eip-1193:"),
                i = function(e, r) {
                    null == r && (r = []);
                    let i = {
                        method: e,
                        params: r
                    };
                    return this.emit("debug", {
                        action: "request",
                        fetcher: "Eip1193Fetcher",
                        request: (0,
                        n.deepCopy)(i),
                        provider: this
                    }),
                    t.request(i).then(t=>(this.emit("debug", {
                        action: "response",
                        fetcher: "Eip1193Fetcher",
                        request: i,
                        response: t,
                        provider: this
                    }),
                    t), t=>{
                        throw this.emit("debug", {
                            action: "response",
                            fetcher: "Eip1193Fetcher",
                            request: i,
                            error: t,
                            provider: this
                        }),
                        t
                    }
                    )
                }
                ) : t.sendAsync ? i = S(t, t.sendAsync.bind(t)) : t.send ? i = S(t, t.send.bind(t)) : M.throwArgumentError("unsupported provider", "provider", t),
                r || (r = "unknown:")),
                super(r, e),
                (0,
                n.defineReadOnly)(this, "jsonRpcFetchFunc", i),
                (0,
                n.defineReadOnly)(this, "provider", o)
            }
            send(t, e) {
                return this.jsonRpcFetchFunc(t, e)
            }
        }
    },
    9052: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            decode: function() {
                return f
            },
            encode: function() {
                return u
            }
        });
        var n = r(6441)
          , i = r(1581);
        let o = new i.Logger("rlp/5.6.1");
        function s(t) {
            let e = [];
            for (; t; )
                e.unshift(255 & t),
                t >>= 8;
            return e
        }
        function a(t, e, r) {
            let n = 0;
            for (let i = 0; i < r; i++)
                n = 256 * n + t[e + i];
            return n
        }
        function u(t) {
            return (0,
            n.hexlify)(function t(e) {
                if (Array.isArray(e)) {
                    let r = [];
                    if (e.forEach(function(e) {
                        r = r.concat(t(e))
                    }),
                    r.length <= 55)
                        return r.unshift(192 + r.length),
                        r;
                    let i = s(r.length);
                    return i.unshift(247 + i.length),
                    i.concat(r)
                }
                (0,
                n.isBytesLike)(e) || o.throwArgumentError("RLP object must be BytesLike", "object", e);
                let a = Array.prototype.slice.call((0,
                n.arrayify)(e));
                if (1 === a.length && a[0] <= 127)
                    return a;
                if (a.length <= 55)
                    return a.unshift(128 + a.length),
                    a;
                let u = s(a.length);
                return u.unshift(183 + u.length),
                u.concat(a)
            }(t))
        }
        function l(t, e, r, n) {
            let s = [];
            for (; r < e + 1 + n; ) {
                let a = h(t, r);
                s.push(a.result),
                (r += a.consumed) > e + 1 + n && o.throwError("child data too short", i.Logger.errors.BUFFER_OVERRUN, {})
            }
            return {
                consumed: 1 + n,
                result: s
            }
        }
        function h(t, e) {
            if (0 === t.length && o.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {}),
            t[e] >= 248) {
                let r = t[e] - 247;
                e + 1 + r > t.length && o.throwError("data short segment too short", i.Logger.errors.BUFFER_OVERRUN, {});
                let s = a(t, e + 1, r);
                return e + 1 + r + s > t.length && o.throwError("data long segment too short", i.Logger.errors.BUFFER_OVERRUN, {}),
                l(t, e, e + 1 + r, r + s)
            }
            if (t[e] >= 192) {
                let u = t[e] - 192;
                return e + 1 + u > t.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {}),
                l(t, e, e + 1, u)
            }
            if (t[e] >= 184) {
                let h = t[e] - 183;
                e + 1 + h > t.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {});
                let f = a(t, e + 1, h);
                e + 1 + h + f > t.length && o.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {});
                let c = (0,
                n.hexlify)(t.slice(e + 1 + h, e + 1 + h + f));
                return {
                    consumed: 1 + h + f,
                    result: c
                }
            }
            if (t[e] >= 128) {
                let d = t[e] - 128;
                e + 1 + d > t.length && o.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {});
                let p = (0,
                n.hexlify)(t.slice(e + 1, e + 1 + d));
                return {
                    consumed: 1 + d,
                    result: p
                }
            }
            return {
                consumed: 1,
                result: (0,
                n.hexlify)(t[e])
            }
        }
        function f(t) {
            let e = (0,
            n.arrayify)(t)
              , r = h(e, 0);
            return r.consumed !== e.length && o.throwArgumentError("invalid rlp data", "data", t),
            r.result
        }
    },
    2006: function(t, e, r) {
        "use strict";
        r.d(e, {
            Gy: function() {
                return c
            },
            bP: function() {
                return l
            },
            JQ: function() {
                return h
            },
            o: function() {
                return f
            }
        });
        var n = r(3715)
          , i = r.n(n)
          , o = r(6441)
          , s = r(1261)
          , a = r(1581);
        let u = new a.Logger("sha2/5.6.1");
        function l(t) {
            return "0x" + i().ripemd160().update((0,
            o.arrayify)(t)).digest("hex")
        }
        function h(t) {
            return "0x" + i().sha256().update((0,
            o.arrayify)(t)).digest("hex")
        }
        function f(t) {
            return "0x" + i().sha512().update((0,
            o.arrayify)(t)).digest("hex")
        }
        function c(t, e, r) {
            return s.p[t] || u.throwError("unsupported algorithm " + t, a.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "hmac",
                algorithm: t
            }),
            "0x" + i().hmac(i()[t], (0,
            o.arrayify)(e)).update((0,
            o.arrayify)(r)).digest("hex")
        }
    },
    1261: function(t, e, r) {
        "use strict";
        var n, i;
        r.d(e, {
            p: function() {
                return n
            }
        }),
        (i = n || (n = {})).sha256 = "sha256",
        i.sha512 = "sha512"
    },
    7669: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            SigningKey: function() {
                return $
            },
            computePublicKey: function() {
                return G
            },
            recoverPublicKey: function() {
                return q
            }
        });
        var n = r(3550)
          , i = r.n(n)
          , o = r(3715)
          , s = r.n(o);
        function a(t, e, r) {
            return t(r = {
                path: e,
                exports: {},
                require: function(t, e) {
                    return function() {
                        throw Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                    }(t, null == e ? r.path : e)
                }
            }, r.exports),
            r.exports
        }
        function u(t, e) {
            if (!t)
                throw Error(e || "Assertion failed")
        }
        "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== r.g ? r.g : "undefined" != typeof self && self,
        u.equal = function(t, e, r) {
            if (t != e)
                throw Error(r || "Assertion failed: " + t + " != " + e)
        }
        ;
        var l = a(function(t, e) {
            var r = e;
            function n(t) {
                return 1 === t.length ? "0" + t : t
            }
            function i(t) {
                for (var e = "", r = 0; r < t.length; r++)
                    e += n(t[r].toString(16));
                return e
            }
            r.toArray = function(t, e) {
                if (Array.isArray(t))
                    return t.slice();
                if (!t)
                    return [];
                var r = [];
                if ("string" != typeof t) {
                    for (var n = 0; n < t.length; n++)
                        r[n] = 0 | t[n];
                    return r
                }
                if ("hex" === e) {
                    (t = t.replace(/[^a-z0-9]+/ig, "")).length % 2 != 0 && (t = "0" + t);
                    for (var n = 0; n < t.length; n += 2)
                        r.push(parseInt(t[n] + t[n + 1], 16))
                } else
                    for (var n = 0; n < t.length; n++) {
                        var i = t.charCodeAt(n)
                          , o = i >> 8
                          , s = 255 & i;
                        o ? r.push(o, s) : r.push(s)
                    }
                return r
            }
            ,
            r.zero2 = n,
            r.toHex = i,
            r.encode = function(t, e) {
                return "hex" === e ? i(t) : t
            }
        })
          , h = a(function(t, e) {
            var r = e;
            r.assert = u,
            r.toArray = l.toArray,
            r.zero2 = l.zero2,
            r.toHex = l.toHex,
            r.encode = l.encode,
            r.getNAF = function(t, e, r) {
                var n = Array(Math.max(t.bitLength(), r) + 1);
                n.fill(0);
                for (var i = 1 << e + 1, o = t.clone(), s = 0; s < n.length; s++) {
                    var a, u = o.andln(i - 1);
                    o.isOdd() ? (a = u > (i >> 1) - 1 ? (i >> 1) - u : u,
                    o.isubn(a)) : a = 0,
                    n[s] = a,
                    o.iushrn(1)
                }
                return n
            }
            ,
            r.getJSF = function(t, e) {
                var r = [[], []];
                t = t.clone(),
                e = e.clone();
                for (var n = 0, i = 0; t.cmpn(-n) > 0 || e.cmpn(-i) > 0; ) {
                    var o, s, a, u = t.andln(3) + n & 3, l = e.andln(3) + i & 3;
                    3 === u && (u = -1),
                    3 === l && (l = -1),
                    s = (1 & u) == 0 ? 0 : (3 == (o = t.andln(7) + n & 7) || 5 === o) && 2 === l ? -u : u,
                    r[0].push(s),
                    a = (1 & l) == 0 ? 0 : (3 == (o = e.andln(7) + i & 7) || 5 === o) && 2 === u ? -l : l,
                    r[1].push(a),
                    2 * n === s + 1 && (n = 1 - n),
                    2 * i === a + 1 && (i = 1 - i),
                    t.iushrn(1),
                    e.iushrn(1)
                }
                return r
            }
            ,
            r.cachedProperty = function(t, e, r) {
                var n = "_" + e;
                t.prototype[e] = function() {
                    return void 0 !== this[n] ? this[n] : this[n] = r.call(this)
                }
            }
            ,
            r.parseBytes = function(t) {
                return "string" == typeof t ? r.toArray(t, "hex") : t
            }
            ,
            r.intFromLE = function(t) {
                return new (i())(t,"hex","le")
            }
        })
          , f = h.getNAF
          , c = h.getJSF
          , d = h.assert;
        function p(t, e) {
            this.type = t,
            this.p = new (i())(e.p,16),
            this.red = e.prime ? i().red(e.prime) : i().mont(this.p),
            this.zero = new (i())(0).toRed(this.red),
            this.one = new (i())(1).toRed(this.red),
            this.two = new (i())(2).toRed(this.red),
            this.n = e.n && new (i())(e.n,16),
            this.g = e.g && this.pointFromJSON(e.g, e.gRed),
            this._wnafT1 = [, , , , ],
            this._wnafT2 = [, , , , ],
            this._wnafT3 = [, , , , ],
            this._wnafT4 = [, , , , ],
            this._bitLength = this.n ? this.n.bitLength() : 0;
            var r = this.n && this.p.div(this.n);
            !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0,
            this.redN = this.n.toRed(this.red))
        }
        function m(t, e) {
            this.curve = t,
            this.type = e,
            this.precomputed = null
        }
        p.prototype.point = function() {
            throw Error("Not implemented")
        }
        ,
        p.prototype.validate = function() {
            throw Error("Not implemented")
        }
        ,
        p.prototype._fixedNafMul = function(t, e) {
            d(t.precomputed);
            var r, n, i = t._getDoubles(), o = f(e, 1, this._bitLength), s = (1 << i.step + 1) - (i.step % 2 == 0 ? 2 : 1);
            s /= 3;
            var a = [];
            for (r = 0; r < o.length; r += i.step) {
                n = 0;
                for (var u = r + i.step - 1; u >= r; u--)
                    n = (n << 1) + o[u];
                a.push(n)
            }
            for (var l = this.jpoint(null, null, null), h = this.jpoint(null, null, null), c = s; c > 0; c--) {
                for (r = 0; r < a.length; r++)
                    (n = a[r]) === c ? h = h.mixedAdd(i.points[r]) : n === -c && (h = h.mixedAdd(i.points[r].neg()));
                l = l.add(h)
            }
            return l.toP()
        }
        ,
        p.prototype._wnafMul = function(t, e) {
            var r = 4
              , n = t._getNAFPoints(r);
            r = n.wnd;
            for (var i = n.points, o = f(e, r, this._bitLength), s = this.jpoint(null, null, null), a = o.length - 1; a >= 0; a--) {
                for (var u = 0; a >= 0 && 0 === o[a]; a--)
                    u++;
                if (a >= 0 && u++,
                s = s.dblp(u),
                a < 0)
                    break;
                var l = o[a];
                d(0 !== l),
                s = "affine" === t.type ? l > 0 ? s.mixedAdd(i[l - 1 >> 1]) : s.mixedAdd(i[-l - 1 >> 1].neg()) : l > 0 ? s.add(i[l - 1 >> 1]) : s.add(i[-l - 1 >> 1].neg())
            }
            return "affine" === t.type ? s.toP() : s
        }
        ,
        p.prototype._wnafMulAdd = function(t, e, r, n, i) {
            var o, s, a, u = this._wnafT1, l = this._wnafT2, h = this._wnafT3, d = 0;
            for (o = 0; o < n; o++) {
                var p = (a = e[o])._getNAFPoints(t);
                u[o] = p.wnd,
                l[o] = p.points
            }
            for (o = n - 1; o >= 1; o -= 2) {
                var m = o - 1
                  , g = o;
                if (1 !== u[m] || 1 !== u[g]) {
                    h[m] = f(r[m], u[m], this._bitLength),
                    h[g] = f(r[g], u[g], this._bitLength),
                    d = Math.max(h[m].length, d),
                    d = Math.max(h[g].length, d);
                    continue
                }
                var y = [e[m], null, null, e[g]];
                0 === e[m].y.cmp(e[g].y) ? (y[1] = e[m].add(e[g]),
                y[2] = e[m].toJ().mixedAdd(e[g].neg())) : 0 === e[m].y.cmp(e[g].y.redNeg()) ? (y[1] = e[m].toJ().mixedAdd(e[g]),
                y[2] = e[m].add(e[g].neg())) : (y[1] = e[m].toJ().mixedAdd(e[g]),
                y[2] = e[m].toJ().mixedAdd(e[g].neg()));
                var v = [-3, -1, -5, -7, 0, 7, 5, 1, 3]
                  , b = c(r[m], r[g]);
                for (s = 0,
                d = Math.max(b[0].length, d),
                h[m] = Array(d),
                h[g] = Array(d); s < d; s++) {
                    var w = 0 | b[0][s]
                      , E = 0 | b[1][s];
                    h[m][s] = v[(w + 1) * 3 + (E + 1)],
                    h[g][s] = 0,
                    l[m] = y
                }
            }
            var _ = this.jpoint(null, null, null)
              , x = this._wnafT4;
            for (o = d; o >= 0; o--) {
                for (var A = 0; o >= 0; ) {
                    var k = !0;
                    for (s = 0; s < n; s++)
                        x[s] = 0 | h[s][o],
                        0 !== x[s] && (k = !1);
                    if (!k)
                        break;
                    A++,
                    o--
                }
                if (o >= 0 && A++,
                _ = _.dblp(A),
                o < 0)
                    break;
                for (s = 0; s < n; s++) {
                    var N = x[s];
                    0 !== N && (N > 0 ? a = l[s][N - 1 >> 1] : N < 0 && (a = l[s][-N - 1 >> 1].neg()),
                    _ = "affine" === a.type ? _.mixedAdd(a) : _.add(a))
                }
            }
            for (o = 0; o < n; o++)
                l[o] = null;
            return i ? _ : _.toP()
        }
        ,
        p.BasePoint = m,
        m.prototype.eq = function() {
            throw Error("Not implemented")
        }
        ,
        m.prototype.validate = function() {
            return this.curve.validate(this)
        }
        ,
        p.prototype.decodePoint = function(t, e) {
            t = h.toArray(t, e);
            var r = this.p.byteLength();
            if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * r)
                return 6 === t[0] ? d(t[t.length - 1] % 2 == 0) : 7 === t[0] && d(t[t.length - 1] % 2 == 1),
                this.point(t.slice(1, 1 + r), t.slice(1 + r, 1 + 2 * r));
            if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r)
                return this.pointFromX(t.slice(1, 1 + r), 3 === t[0]);
            throw Error("Unknown point format")
        }
        ,
        m.prototype.encodeCompressed = function(t) {
            return this.encode(t, !0)
        }
        ,
        m.prototype._encode = function(t) {
            var e = this.curve.p.byteLength()
              , r = this.getX().toArray("be", e);
            return t ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", e))
        }
        ,
        m.prototype.encode = function(t, e) {
            return h.encode(this._encode(e), t)
        }
        ,
        m.prototype.precompute = function(t) {
            if (this.precomputed)
                return this;
            var e = {
                doubles: null,
                naf: null,
                beta: null
            };
            return e.naf = this._getNAFPoints(8),
            e.doubles = this._getDoubles(4, t),
            e.beta = this._getBeta(),
            this.precomputed = e,
            this
        }
        ,
        m.prototype._hasDoubles = function(t) {
            if (!this.precomputed)
                return !1;
            var e = this.precomputed.doubles;
            return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
        }
        ,
        m.prototype._getDoubles = function(t, e) {
            if (this.precomputed && this.precomputed.doubles)
                return this.precomputed.doubles;
            for (var r = [this], n = this, i = 0; i < e; i += t) {
                for (var o = 0; o < t; o++)
                    n = n.dbl();
                r.push(n)
            }
            return {
                step: t,
                points: r
            }
        }
        ,
        m.prototype._getNAFPoints = function(t) {
            if (this.precomputed && this.precomputed.naf)
                return this.precomputed.naf;
            for (var e = [this], r = (1 << t) - 1, n = 1 === r ? null : this.dbl(), i = 1; i < r; i++)
                e[i] = e[i - 1].add(n);
            return {
                wnd: t,
                points: e
            }
        }
        ,
        m.prototype._getBeta = function() {
            return null
        }
        ,
        m.prototype.dblp = function(t) {
            for (var e = this, r = 0; r < t; r++)
                e = e.dbl();
            return e
        }
        ;
        var g = a(function(t) {
            "function" == typeof Object.create ? t.exports = function(t, e) {
                e && (t.super_ = e,
                t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            }
            : t.exports = function(t, e) {
                if (e) {
                    t.super_ = e;
                    var r = function() {};
                    r.prototype = e.prototype,
                    t.prototype = new r,
                    t.prototype.constructor = t
                }
            }
        })
          , y = h.assert;
        function v(t) {
            p.call(this, "short", t),
            this.a = new (i())(t.a,16).toRed(this.red),
            this.b = new (i())(t.b,16).toRed(this.red),
            this.tinv = this.two.redInvm(),
            this.zeroA = 0 === this.a.fromRed().cmpn(0),
            this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3),
            this.endo = this._getEndomorphism(t),
            this._endoWnafT1 = [, , , , ],
            this._endoWnafT2 = [, , , , ]
        }
        function b(t, e, r, n) {
            p.BasePoint.call(this, t, "affine"),
            null === e && null === r ? (this.x = null,
            this.y = null,
            this.inf = !0) : (this.x = new (i())(e,16),
            this.y = new (i())(r,16),
            n && (this.x.forceRed(this.curve.red),
            this.y.forceRed(this.curve.red)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            this.inf = !1)
        }
        function w(t, e, r, n) {
            p.BasePoint.call(this, t, "jacobian"),
            null === e && null === r && null === n ? (this.x = this.curve.one,
            this.y = this.curve.one,
            this.z = new (i())(0)) : (this.x = new (i())(e,16),
            this.y = new (i())(r,16),
            this.z = new (i())(n,16)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)),
            this.zOne = this.z === this.curve.one
        }
        g(v, p),
        v.prototype._getEndomorphism = function(t) {
            if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
                if (t.beta)
                    e = new (i())(t.beta,16).toRed(this.red);
                else {
                    var e, r, n, o = this._getEndoRoots(this.p);
                    e = (e = 0 > o[0].cmp(o[1]) ? o[0] : o[1]).toRed(this.red)
                }
                if (t.lambda)
                    r = new (i())(t.lambda,16);
                else {
                    var s = this._getEndoRoots(this.n);
                    0 === this.g.mul(s[0]).x.cmp(this.g.x.redMul(e)) ? r = s[0] : (r = s[1],
                    y(0 === this.g.mul(r).x.cmp(this.g.x.redMul(e))))
                }
                return n = t.basis ? t.basis.map(function(t) {
                    return {
                        a: new (i())(t.a,16),
                        b: new (i())(t.b,16)
                    }
                }) : this._getEndoBasis(r),
                {
                    beta: e,
                    lambda: r,
                    basis: n
                }
            }
        }
        ,
        v.prototype._getEndoRoots = function(t) {
            var e = t === this.p ? this.red : i().mont(t)
              , r = new (i())(2).toRed(e).redInvm()
              , n = r.redNeg()
              , o = new (i())(3).toRed(e).redNeg().redSqrt().redMul(r);
            return [n.redAdd(o).fromRed(), n.redSub(o).fromRed()]
        }
        ,
        v.prototype._getEndoBasis = function(t) {
            for (var e, r, n, o, s, a, u, l, h, f = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), c = t, d = this.n.clone(), p = new (i())(1), m = new (i())(0), g = new (i())(0), y = new (i())(1), v = 0; 0 !== c.cmpn(0); ) {
                var b = d.div(c);
                l = d.sub(b.mul(c)),
                h = g.sub(b.mul(p));
                var w = y.sub(b.mul(m));
                if (!n && 0 > l.cmp(f))
                    e = u.neg(),
                    r = p,
                    n = l.neg(),
                    o = h;
                else if (n && 2 == ++v)
                    break;
                u = l,
                d = c,
                c = l,
                g = p,
                p = h,
                y = m,
                m = w
            }
            s = l.neg(),
            a = h;
            var E = n.sqr().add(o.sqr());
            return s.sqr().add(a.sqr()).cmp(E) >= 0 && (s = e,
            a = r),
            n.negative && (n = n.neg(),
            o = o.neg()),
            s.negative && (s = s.neg(),
            a = a.neg()),
            [{
                a: n,
                b: o
            }, {
                a: s,
                b: a
            }]
        }
        ,
        v.prototype._endoSplit = function(t) {
            var e = this.endo.basis
              , r = e[0]
              , n = e[1]
              , i = n.b.mul(t).divRound(this.n)
              , o = r.b.neg().mul(t).divRound(this.n)
              , s = i.mul(r.a)
              , a = o.mul(n.a)
              , u = i.mul(r.b)
              , l = o.mul(n.b);
            return {
                k1: t.sub(s).sub(a),
                k2: u.add(l).neg()
            }
        }
        ,
        v.prototype.pointFromX = function(t, e) {
            (t = new (i())(t,16)).red || (t = t.toRed(this.red));
            var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b)
              , n = r.redSqrt();
            if (0 !== n.redSqr().redSub(r).cmp(this.zero))
                throw Error("invalid point");
            var o = n.fromRed().isOdd();
            return (e && !o || !e && o) && (n = n.redNeg()),
            this.point(t, n)
        }
        ,
        v.prototype.validate = function(t) {
            if (t.inf)
                return !0;
            var e = t.x
              , r = t.y
              , n = this.a.redMul(e)
              , i = e.redSqr().redMul(e).redIAdd(n).redIAdd(this.b);
            return 0 === r.redSqr().redISub(i).cmpn(0)
        }
        ,
        v.prototype._endoWnafMulAdd = function(t, e, r) {
            for (var n = this._endoWnafT1, i = this._endoWnafT2, o = 0; o < t.length; o++) {
                var s = this._endoSplit(e[o])
                  , a = t[o]
                  , u = a._getBeta();
                s.k1.negative && (s.k1.ineg(),
                a = a.neg(!0)),
                s.k2.negative && (s.k2.ineg(),
                u = u.neg(!0)),
                n[2 * o] = a,
                n[2 * o + 1] = u,
                i[2 * o] = s.k1,
                i[2 * o + 1] = s.k2
            }
            for (var l = this._wnafMulAdd(1, n, i, 2 * o, r), h = 0; h < 2 * o; h++)
                n[h] = null,
                i[h] = null;
            return l
        }
        ,
        g(b, p.BasePoint),
        v.prototype.point = function(t, e, r) {
            return new b(this,t,e,r)
        }
        ,
        v.prototype.pointFromJSON = function(t, e) {
            return b.fromJSON(this, t, e)
        }
        ,
        b.prototype._getBeta = function() {
            if (this.curve.endo) {
                var t = this.precomputed;
                if (t && t.beta)
                    return t.beta;
                var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
                if (t) {
                    var r = this.curve
                      , n = function(t) {
                        return r.point(t.x.redMul(r.endo.beta), t.y)
                    };
                    t.beta = e,
                    e.precomputed = {
                        beta: null,
                        naf: t.naf && {
                            wnd: t.naf.wnd,
                            points: t.naf.points.map(n)
                        },
                        doubles: t.doubles && {
                            step: t.doubles.step,
                            points: t.doubles.points.map(n)
                        }
                    }
                }
                return e
            }
        }
        ,
        b.prototype.toJSON = function() {
            return this.precomputed ? [this.x, this.y, this.precomputed && {
                doubles: this.precomputed.doubles && {
                    step: this.precomputed.doubles.step,
                    points: this.precomputed.doubles.points.slice(1)
                },
                naf: this.precomputed.naf && {
                    wnd: this.precomputed.naf.wnd,
                    points: this.precomputed.naf.points.slice(1)
                }
            }] : [this.x, this.y]
        }
        ,
        b.fromJSON = function(t, e, r) {
            "string" == typeof e && (e = JSON.parse(e));
            var n = t.point(e[0], e[1], r);
            if (!e[2])
                return n;
            function i(e) {
                return t.point(e[0], e[1], r)
            }
            var o = e[2];
            return n.precomputed = {
                beta: null,
                doubles: o.doubles && {
                    step: o.doubles.step,
                    points: [n].concat(o.doubles.points.map(i))
                },
                naf: o.naf && {
                    wnd: o.naf.wnd,
                    points: [n].concat(o.naf.points.map(i))
                }
            },
            n
        }
        ,
        b.prototype.inspect = function() {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
        }
        ,
        b.prototype.isInfinity = function() {
            return this.inf
        }
        ,
        b.prototype.add = function(t) {
            if (this.inf)
                return t;
            if (t.inf)
                return this;
            if (this.eq(t))
                return this.dbl();
            if (this.neg().eq(t) || 0 === this.x.cmp(t.x))
                return this.curve.point(null, null);
            var e = this.y.redSub(t.y);
            0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
            var r = e.redSqr().redISub(this.x).redISub(t.x)
              , n = e.redMul(this.x.redSub(r)).redISub(this.y);
            return this.curve.point(r, n)
        }
        ,
        b.prototype.dbl = function() {
            if (this.inf)
                return this;
            var t = this.y.redAdd(this.y);
            if (0 === t.cmpn(0))
                return this.curve.point(null, null);
            var e = this.curve.a
              , r = this.x.redSqr()
              , n = t.redInvm()
              , i = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(n)
              , o = i.redSqr().redISub(this.x.redAdd(this.x))
              , s = i.redMul(this.x.redSub(o)).redISub(this.y);
            return this.curve.point(o, s)
        }
        ,
        b.prototype.getX = function() {
            return this.x.fromRed()
        }
        ,
        b.prototype.getY = function() {
            return this.y.fromRed()
        }
        ,
        b.prototype.mul = function(t) {
            return (t = new (i())(t,16),
            this.isInfinity()) ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t)
        }
        ,
        b.prototype.mulAdd = function(t, e, r) {
            var n = [this, e]
              , i = [t, r];
            return this.curve.endo ? this.curve._endoWnafMulAdd(n, i) : this.curve._wnafMulAdd(1, n, i, 2)
        }
        ,
        b.prototype.jmulAdd = function(t, e, r) {
            var n = [this, e]
              , i = [t, r];
            return this.curve.endo ? this.curve._endoWnafMulAdd(n, i, !0) : this.curve._wnafMulAdd(1, n, i, 2, !0)
        }
        ,
        b.prototype.eq = function(t) {
            return this === t || this.inf === t.inf && (this.inf || 0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))
        }
        ,
        b.prototype.neg = function(t) {
            if (this.inf)
                return this;
            var e = this.curve.point(this.x, this.y.redNeg());
            if (t && this.precomputed) {
                var r = this.precomputed
                  , n = function(t) {
                    return t.neg()
                };
                e.precomputed = {
                    naf: r.naf && {
                        wnd: r.naf.wnd,
                        points: r.naf.points.map(n)
                    },
                    doubles: r.doubles && {
                        step: r.doubles.step,
                        points: r.doubles.points.map(n)
                    }
                }
            }
            return e
        }
        ,
        b.prototype.toJ = function() {
            return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
        }
        ,
        g(w, p.BasePoint),
        v.prototype.jpoint = function(t, e, r) {
            return new w(this,t,e,r)
        }
        ,
        w.prototype.toP = function() {
            if (this.isInfinity())
                return this.curve.point(null, null);
            var t = this.z.redInvm()
              , e = t.redSqr()
              , r = this.x.redMul(e)
              , n = this.y.redMul(e).redMul(t);
            return this.curve.point(r, n)
        }
        ,
        w.prototype.neg = function() {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
        }
        ,
        w.prototype.add = function(t) {
            if (this.isInfinity())
                return t;
            if (t.isInfinity())
                return this;
            var e = t.z.redSqr()
              , r = this.z.redSqr()
              , n = this.x.redMul(e)
              , i = t.x.redMul(r)
              , o = this.y.redMul(e.redMul(t.z))
              , s = t.y.redMul(r.redMul(this.z))
              , a = n.redSub(i)
              , u = o.redSub(s);
            if (0 === a.cmpn(0))
                return 0 !== u.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var l = a.redSqr()
              , h = l.redMul(a)
              , f = n.redMul(l)
              , c = u.redSqr().redIAdd(h).redISub(f).redISub(f)
              , d = u.redMul(f.redISub(c)).redISub(o.redMul(h))
              , p = this.z.redMul(t.z).redMul(a);
            return this.curve.jpoint(c, d, p)
        }
        ,
        w.prototype.mixedAdd = function(t) {
            if (this.isInfinity())
                return t.toJ();
            if (t.isInfinity())
                return this;
            var e = this.z.redSqr()
              , r = this.x
              , n = t.x.redMul(e)
              , i = this.y
              , o = t.y.redMul(e).redMul(this.z)
              , s = r.redSub(n)
              , a = i.redSub(o);
            if (0 === s.cmpn(0))
                return 0 !== a.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var u = s.redSqr()
              , l = u.redMul(s)
              , h = r.redMul(u)
              , f = a.redSqr().redIAdd(l).redISub(h).redISub(h)
              , c = a.redMul(h.redISub(f)).redISub(i.redMul(l))
              , d = this.z.redMul(s);
            return this.curve.jpoint(f, c, d)
        }
        ,
        w.prototype.dblp = function(t) {
            if (0 === t || this.isInfinity())
                return this;
            if (!t)
                return this.dbl();
            if (this.curve.zeroA || this.curve.threeA) {
                var e, r = this;
                for (e = 0; e < t; e++)
                    r = r.dbl();
                return r
            }
            var n = this.curve.a
              , i = this.curve.tinv
              , o = this.x
              , s = this.y
              , a = this.z
              , u = a.redSqr().redSqr()
              , l = s.redAdd(s);
            for (e = 0; e < t; e++) {
                var h = o.redSqr()
                  , f = l.redSqr()
                  , c = f.redSqr()
                  , d = h.redAdd(h).redIAdd(h).redIAdd(n.redMul(u))
                  , p = o.redMul(f)
                  , m = d.redSqr().redISub(p.redAdd(p))
                  , g = p.redISub(m)
                  , y = d.redMul(g);
                y = y.redIAdd(y).redISub(c);
                var v = l.redMul(a);
                e + 1 < t && (u = u.redMul(c)),
                o = m,
                a = v,
                l = y
            }
            return this.curve.jpoint(o, l.redMul(i), a)
        }
        ,
        w.prototype.dbl = function() {
            return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
        }
        ,
        w.prototype._zeroDbl = function() {
            if (this.zOne) {
                var t, e, r, n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), s = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
                s = s.redIAdd(s);
                var a = n.redAdd(n).redIAdd(n)
                  , u = a.redSqr().redISub(s).redISub(s)
                  , l = o.redIAdd(o);
                l = (l = l.redIAdd(l)).redIAdd(l),
                t = u,
                e = a.redMul(s.redISub(u)).redISub(l),
                r = this.y.redAdd(this.y)
            } else {
                var h = this.x.redSqr()
                  , f = this.y.redSqr()
                  , c = f.redSqr()
                  , d = this.x.redAdd(f).redSqr().redISub(h).redISub(c);
                d = d.redIAdd(d);
                var p = h.redAdd(h).redIAdd(h)
                  , m = p.redSqr()
                  , g = c.redIAdd(c);
                g = (g = g.redIAdd(g)).redIAdd(g),
                t = m.redISub(d).redISub(d),
                e = p.redMul(d.redISub(t)).redISub(g),
                r = (r = this.y.redMul(this.z)).redIAdd(r)
            }
            return this.curve.jpoint(t, e, r)
        }
        ,
        w.prototype._threeDbl = function() {
            if (this.zOne) {
                var t, e, r, n = this.x.redSqr(), i = this.y.redSqr(), o = i.redSqr(), s = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
                s = s.redIAdd(s);
                var a = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a)
                  , u = a.redSqr().redISub(s).redISub(s);
                t = u;
                var l = o.redIAdd(o);
                l = (l = l.redIAdd(l)).redIAdd(l),
                e = a.redMul(s.redISub(u)).redISub(l),
                r = this.y.redAdd(this.y)
            } else {
                var h = this.z.redSqr()
                  , f = this.y.redSqr()
                  , c = this.x.redMul(f)
                  , d = this.x.redSub(h).redMul(this.x.redAdd(h));
                d = d.redAdd(d).redIAdd(d);
                var p = c.redIAdd(c)
                  , m = (p = p.redIAdd(p)).redAdd(p);
                t = d.redSqr().redISub(m),
                r = this.y.redAdd(this.z).redSqr().redISub(f).redISub(h);
                var g = f.redSqr();
                g = (g = (g = g.redIAdd(g)).redIAdd(g)).redIAdd(g),
                e = d.redMul(p.redISub(t)).redISub(g)
            }
            return this.curve.jpoint(t, e, r)
        }
        ,
        w.prototype._dbl = function() {
            var t = this.curve.a
              , e = this.x
              , r = this.y
              , n = this.z
              , i = n.redSqr().redSqr()
              , o = e.redSqr()
              , s = r.redSqr()
              , a = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(i))
              , u = e.redAdd(e)
              , l = (u = u.redIAdd(u)).redMul(s)
              , h = a.redSqr().redISub(l.redAdd(l))
              , f = l.redISub(h)
              , c = s.redSqr();
            c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c);
            var d = a.redMul(f).redISub(c)
              , p = r.redAdd(r).redMul(n);
            return this.curve.jpoint(h, d, p)
        }
        ,
        w.prototype.trpl = function() {
            if (!this.curve.zeroA)
                return this.dbl().add(this);
            var t = this.x.redSqr()
              , e = this.y.redSqr()
              , r = this.z.redSqr()
              , n = e.redSqr()
              , i = t.redAdd(t).redIAdd(t)
              , o = i.redSqr()
              , s = this.x.redAdd(e).redSqr().redISub(t).redISub(n)
              , a = (s = (s = (s = s.redIAdd(s)).redAdd(s).redIAdd(s)).redISub(o)).redSqr()
              , u = n.redIAdd(n);
            u = (u = (u = u.redIAdd(u)).redIAdd(u)).redIAdd(u);
            var l = i.redIAdd(s).redSqr().redISub(o).redISub(a).redISub(u)
              , h = e.redMul(l);
            h = (h = h.redIAdd(h)).redIAdd(h);
            var f = this.x.redMul(a).redISub(h);
            f = (f = f.redIAdd(f)).redIAdd(f);
            var c = this.y.redMul(l.redMul(u.redISub(l)).redISub(s.redMul(a)));
            c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c);
            var d = this.z.redAdd(s).redSqr().redISub(r).redISub(a);
            return this.curve.jpoint(f, c, d)
        }
        ,
        w.prototype.mul = function(t, e) {
            return t = new (i())(t,e),
            this.curve._wnafMul(this, t)
        }
        ,
        w.prototype.eq = function(t) {
            if ("affine" === t.type)
                return this.eq(t.toJ());
            if (this === t)
                return !0;
            var e = this.z.redSqr()
              , r = t.z.redSqr();
            if (0 !== this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0))
                return !1;
            var n = e.redMul(this.z)
              , i = r.redMul(t.z);
            return 0 === this.y.redMul(i).redISub(t.y.redMul(n)).cmpn(0)
        }
        ,
        w.prototype.eqXToP = function(t) {
            var e = this.z.redSqr()
              , r = t.toRed(this.curve.red).redMul(e);
            if (0 === this.x.cmp(r))
                return !0;
            for (var n = t.clone(), i = this.curve.redN.redMul(e); ; ) {
                if (n.iadd(this.curve.n),
                n.cmp(this.curve.p) >= 0)
                    return !1;
                if (r.redIAdd(i),
                0 === this.x.cmp(r))
                    return !0
            }
        }
        ,
        w.prototype.inspect = function() {
            return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
        }
        ,
        w.prototype.isInfinity = function() {
            return 0 === this.z.cmpn(0)
        }
        ;
        var E = a(function(t, e) {
            var r = e;
            r.base = p,
            r.short = v,
            r.mont = null,
            r.edwards = null
        })
          , _ = a(function(t, e) {
            var r, n = e, i = h.assert;
            function o(t) {
                "short" === t.type ? this.curve = new E.short(t) : "edwards" === t.type ? this.curve = new E.edwards(t) : this.curve = new E.mont(t),
                this.g = this.curve.g,
                this.n = this.curve.n,
                this.hash = t.hash,
                i(this.g.validate(), "Invalid curve"),
                i(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
            }
            function a(t, e) {
                Object.defineProperty(n, t, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        var r = new o(e);
                        return Object.defineProperty(n, t, {
                            configurable: !0,
                            enumerable: !0,
                            value: r
                        }),
                        r
                    }
                })
            }
            n.PresetCurve = o,
            a("p192", {
                type: "short",
                prime: "p192",
                p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
                a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
                b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
                n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
                hash: s().sha256,
                gRed: !1,
                g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
            }),
            a("p224", {
                type: "short",
                prime: "p224",
                p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
                a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
                b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
                n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
                hash: s().sha256,
                gRed: !1,
                g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
            }),
            a("p256", {
                type: "short",
                prime: null,
                p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
                a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
                b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
                n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
                hash: s().sha256,
                gRed: !1,
                g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
            }),
            a("p384", {
                type: "short",
                prime: null,
                p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
                a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
                b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
                n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
                hash: s().sha384,
                gRed: !1,
                g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
            }),
            a("p521", {
                type: "short",
                prime: null,
                p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
                a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
                b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
                n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
                hash: s().sha512,
                gRed: !1,
                g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
            }),
            a("curve25519", {
                type: "mont",
                prime: "p25519",
                p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
                a: "76d06",
                b: "1",
                n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
                hash: s().sha256,
                gRed: !1,
                g: ["9"]
            }),
            a("ed25519", {
                type: "edwards",
                prime: "p25519",
                p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
                a: "-1",
                c: "1",
                d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
                n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
                hash: s().sha256,
                gRed: !1,
                g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
            });
            try {
                r = null.crash()
            } catch (u) {
                r = void 0
            }
            a("secp256k1", {
                type: "short",
                prime: "k256",
                p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
                a: "0",
                b: "7",
                n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
                h: "1",
                hash: s().sha256,
                beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
                lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
                basis: [{
                    a: "3086d221a7d46bcde86c90e49284eb15",
                    b: "-e4437ed6010e88286f547fa90abfe4c3"
                }, {
                    a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
                    b: "3086d221a7d46bcde86c90e49284eb15"
                }],
                gRed: !1,
                g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", r]
            })
        });
        function x(t) {
            if (!(this instanceof x))
                return new x(t);
            this.hash = t.hash,
            this.predResist = !!t.predResist,
            this.outLen = this.hash.outSize,
            this.minEntropy = t.minEntropy || this.hash.hmacStrength,
            this._reseed = null,
            this.reseedInterval = null,
            this.K = null,
            this.V = null;
            var e = l.toArray(t.entropy, t.entropyEnc || "hex")
              , r = l.toArray(t.nonce, t.nonceEnc || "hex")
              , n = l.toArray(t.pers, t.persEnc || "hex");
            u(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"),
            this._init(e, r, n)
        }
        x.prototype._init = function(t, e, r) {
            var n = t.concat(e).concat(r);
            this.K = Array(this.outLen / 8),
            this.V = Array(this.outLen / 8);
            for (var i = 0; i < this.V.length; i++)
                this.K[i] = 0,
                this.V[i] = 1;
            this._update(n),
            this._reseed = 1,
            this.reseedInterval = 281474976710656
        }
        ,
        x.prototype._hmac = function() {
            return new (s()).hmac(this.hash,this.K)
        }
        ,
        x.prototype._update = function(t) {
            var e = this._hmac().update(this.V).update([0]);
            t && (e = e.update(t)),
            this.K = e.digest(),
            this.V = this._hmac().update(this.V).digest(),
            t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(),
            this.V = this._hmac().update(this.V).digest())
        }
        ,
        x.prototype.reseed = function(t, e, r, n) {
            "string" != typeof e && (n = r,
            r = e,
            e = null),
            t = l.toArray(t, e),
            r = l.toArray(r, n),
            u(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"),
            this._update(t.concat(r || [])),
            this._reseed = 1
        }
        ,
        x.prototype.generate = function(t, e, r, n) {
            if (this._reseed > this.reseedInterval)
                throw Error("Reseed is required");
            "string" != typeof e && (n = r,
            r = e,
            e = null),
            r && (r = l.toArray(r, n || "hex"),
            this._update(r));
            for (var i = []; i.length < t; )
                this.V = this._hmac().update(this.V).digest(),
                i = i.concat(this.V);
            var o = i.slice(0, t);
            return this._update(r),
            this._reseed++,
            l.encode(o, e)
        }
        ;
        var A = h.assert;
        function k(t, e) {
            this.ec = t,
            this.priv = null,
            this.pub = null,
            e.priv && this._importPrivate(e.priv, e.privEnc),
            e.pub && this._importPublic(e.pub, e.pubEnc)
        }
        k.fromPublic = function(t, e, r) {
            return e instanceof k ? e : new k(t,{
                pub: e,
                pubEnc: r
            })
        }
        ,
        k.fromPrivate = function(t, e, r) {
            return e instanceof k ? e : new k(t,{
                priv: e,
                privEnc: r
            })
        }
        ,
        k.prototype.validate = function() {
            var t = this.getPublic();
            return t.isInfinity() ? {
                result: !1,
                reason: "Invalid public key"
            } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {
                result: !0,
                reason: null
            } : {
                result: !1,
                reason: "Public key * N != O"
            } : {
                result: !1,
                reason: "Public key is not a point"
            }
        }
        ,
        k.prototype.getPublic = function(t, e) {
            return ("string" == typeof t && (e = t,
            t = null),
            this.pub || (this.pub = this.ec.g.mul(this.priv)),
            e) ? this.pub.encode(e, t) : this.pub
        }
        ,
        k.prototype.getPrivate = function(t) {
            return "hex" === t ? this.priv.toString(16, 2) : this.priv
        }
        ,
        k.prototype._importPrivate = function(t, e) {
            this.priv = new (i())(t,e || 16),
            this.priv = this.priv.umod(this.ec.curve.n)
        }
        ,
        k.prototype._importPublic = function(t, e) {
            if (t.x || t.y) {
                "mont" === this.ec.curve.type ? A(t.x, "Need x coordinate") : ("short" === this.ec.curve.type || "edwards" === this.ec.curve.type) && A(t.x && t.y, "Need both x and y coordinate"),
                this.pub = this.ec.curve.point(t.x, t.y);
                return
            }
            this.pub = this.ec.curve.decodePoint(t, e)
        }
        ,
        k.prototype.derive = function(t) {
            return t.validate() || A(t.validate(), "public point not validated"),
            t.mul(this.priv).getX()
        }
        ,
        k.prototype.sign = function(t, e, r) {
            return this.ec.sign(t, this, e, r)
        }
        ,
        k.prototype.verify = function(t, e) {
            return this.ec.verify(t, e, this)
        }
        ,
        k.prototype.inspect = function() {
            return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
        }
        ;
        var N = h.assert;
        function M(t, e) {
            if (t instanceof M)
                return t;
            this._importDER(t, e) || (N(t.r && t.s, "Signature without r or s"),
            this.r = new (i())(t.r,16),
            this.s = new (i())(t.s,16),
            void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam)
        }
        function P() {
            this.place = 0
        }
        function S(t, e) {
            var r = t[e.place++];
            if (!(128 & r))
                return r;
            var n = 15 & r;
            if (0 === n || n > 4)
                return !1;
            for (var i = 0, o = 0, s = e.place; o < n; o++,
            s++)
                i <<= 8,
                i |= t[s],
                i >>>= 0;
            return !(i <= 127) && (e.place = s,
            i)
        }
        function R(t) {
            for (var e = 0, r = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < r; )
                e++;
            return 0 === e ? t : t.slice(e)
        }
        function O(t, e) {
            if (e < 128) {
                t.push(e);
                return
            }
            var r = 1 + (Math.log(e) / Math.LN2 >>> 3);
            for (t.push(128 | r); --r; )
                t.push(e >>> (r << 3) & 255);
            t.push(e)
        }
        M.prototype._importDER = function(t, e) {
            t = h.toArray(t, e);
            var r = new P;
            if (48 !== t[r.place++])
                return !1;
            var n = S(t, r);
            if (!1 === n || n + r.place !== t.length || 2 !== t[r.place++])
                return !1;
            var o = S(t, r);
            if (!1 === o)
                return !1;
            var s = t.slice(r.place, o + r.place);
            if (r.place += o,
            2 !== t[r.place++])
                return !1;
            var a = S(t, r);
            if (!1 === a || t.length !== a + r.place)
                return !1;
            var u = t.slice(r.place, a + r.place);
            if (0 === s[0]) {
                if (!(128 & s[1]))
                    return !1;
                s = s.slice(1)
            }
            if (0 === u[0]) {
                if (!(128 & u[1]))
                    return !1;
                u = u.slice(1)
            }
            return this.r = new (i())(s),
            this.s = new (i())(u),
            this.recoveryParam = null,
            !0
        }
        ,
        M.prototype.toDER = function(t) {
            var e = this.r.toArray()
              , r = this.s.toArray();
            for (128 & e[0] && (e = [0].concat(e)),
            128 & r[0] && (r = [0].concat(r)),
            e = R(e),
            r = R(r); !r[0] && !(128 & r[1]); )
                r = r.slice(1);
            var n = [2];
            O(n, e.length),
            (n = n.concat(e)).push(2),
            O(n, r.length);
            var i = n.concat(r)
              , o = [48];
            return O(o, i.length),
            o = o.concat(i),
            h.encode(o, t)
        }
        ;
        var T = function() {
            throw Error("unsupported")
        }
          , I = h.assert;
        function L(t) {
            if (!(this instanceof L))
                return new L(t);
            "string" == typeof t && (I(Object.prototype.hasOwnProperty.call(_, t), "Unknown curve " + t),
            t = _[t]),
            t instanceof _.PresetCurve && (t = {
                curve: t
            }),
            this.curve = t.curve.curve,
            this.n = this.curve.n,
            this.nh = this.n.ushrn(1),
            this.g = this.curve.g,
            this.g = t.curve.g,
            this.g.precompute(t.curve.n.bitLength() + 1),
            this.hash = t.hash || t.curve.hash
        }
        L.prototype.keyPair = function(t) {
            return new k(this,t)
        }
        ,
        L.prototype.keyFromPrivate = function(t, e) {
            return k.fromPrivate(this, t, e)
        }
        ,
        L.prototype.keyFromPublic = function(t, e) {
            return k.fromPublic(this, t, e)
        }
        ,
        L.prototype.genKeyPair = function(t) {
            t || (t = {});
            for (var e = new x({
                hash: this.hash,
                pers: t.pers,
                persEnc: t.persEnc || "utf8",
                entropy: t.entropy || T(this.hash.hmacStrength),
                entropyEnc: t.entropy && t.entropyEnc || "utf8",
                nonce: this.n.toArray()
            }), r = this.n.byteLength(), n = this.n.sub(new (i())(2)); ; ) {
                var o = new (i())(e.generate(r));
                if (!(o.cmp(n) > 0))
                    return o.iaddn(1),
                    this.keyFromPrivate(o)
            }
        }
        ,
        L.prototype._truncateToN = function(t, e) {
            var r = 8 * t.byteLength() - this.n.bitLength();
            return (r > 0 && (t = t.ushrn(r)),
            !e && t.cmp(this.n) >= 0) ? t.sub(this.n) : t
        }
        ,
        L.prototype.sign = function(t, e, r, n) {
            "object" == typeof r && (n = r,
            r = null),
            n || (n = {}),
            e = this.keyFromPrivate(e, r),
            t = this._truncateToN(new (i())(t,16));
            for (var o = this.n.byteLength(), s = e.getPrivate().toArray("be", o), a = t.toArray("be", o), u = new x({
                hash: this.hash,
                entropy: s,
                nonce: a,
                pers: n.pers,
                persEnc: n.persEnc || "utf8"
            }), l = this.n.sub(new (i())(1)), h = 0; ; h++) {
                var f = n.k ? n.k(h) : new (i())(u.generate(this.n.byteLength()));
                if (!(0 >= (f = this._truncateToN(f, !0)).cmpn(1) || f.cmp(l) >= 0)) {
                    var c = this.g.mul(f);
                    if (!c.isInfinity()) {
                        var d = c.getX()
                          , p = d.umod(this.n);
                        if (0 !== p.cmpn(0)) {
                            var m = f.invm(this.n).mul(p.mul(e.getPrivate()).iadd(t));
                            if (0 !== (m = m.umod(this.n)).cmpn(0)) {
                                var g = (c.getY().isOdd() ? 1 : 0) | (0 !== d.cmp(p) ? 2 : 0);
                                return n.canonical && m.cmp(this.nh) > 0 && (m = this.n.sub(m),
                                g ^= 1),
                                new M({
                                    r: p,
                                    s: m,
                                    recoveryParam: g
                                })
                            }
                        }
                    }
                }
            }
        }
        ,
        L.prototype.verify = function(t, e, r, n) {
            t = this._truncateToN(new (i())(t,16)),
            r = this.keyFromPublic(r, n);
            var o, s = (e = new M(e,"hex")).r, a = e.s;
            if (0 > s.cmpn(1) || s.cmp(this.n) >= 0 || 0 > a.cmpn(1) || a.cmp(this.n) >= 0)
                return !1;
            var u = a.invm(this.n)
              , l = u.mul(t).umod(this.n)
              , h = u.mul(s).umod(this.n);
            return this.curve._maxwellTrick ? !(o = this.g.jmulAdd(l, r.getPublic(), h)).isInfinity() && o.eqXToP(s) : !(o = this.g.mulAdd(l, r.getPublic(), h)).isInfinity() && 0 === o.getX().umod(this.n).cmp(s)
        }
        ,
        L.prototype.recoverPubKey = function(t, e, r, n) {
            I((3 & r) === r, "The recovery param is more than two bits"),
            e = new M(e,n);
            var o = this.n
              , s = new (i())(t)
              , a = e.r
              , u = e.s
              , l = 1 & r
              , h = r >> 1;
            if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && h)
                throw Error("Unable to find sencond key candinate");
            a = h ? this.curve.pointFromX(a.add(this.curve.n), l) : this.curve.pointFromX(a, l);
            var f = e.r.invm(o)
              , c = o.sub(s).mul(f).umod(o)
              , d = u.mul(f).umod(o);
            return this.g.mulAdd(c, a, d)
        }
        ,
        L.prototype.getKeyRecoveryParam = function(t, e, r, n) {
            if (null !== (e = new M(e,n)).recoveryParam)
                return e.recoveryParam;
            for (var i, o = 0; o < 4; o++) {
                try {
                    i = this.recoverPubKey(t, e, o)
                } catch (s) {
                    continue
                }
                if (i.eq(r))
                    return o
            }
            throw Error("Unable to find valid recovery factor")
        }
        ;
        var C = a(function(t, e) {
            var r = e;
            r.version = "6.5.4",
            r.utils = h,
            r.rand = function() {
                throw Error("unsupported")
            }
            ,
            r.curve = E,
            r.curves = _,
            r.ec = L,
            r.eddsa = null
        }).ec
          , B = r(6441)
          , F = r(6881)
          , U = r(1581);
        let D = new U.Logger("signing-key/5.6.2")
          , j = null;
        function z() {
            return j || (j = new C("secp256k1")),
            j
        }
        class $ {
            constructor(t) {
                (0,
                F.defineReadOnly)(this, "curve", "secp256k1"),
                (0,
                F.defineReadOnly)(this, "privateKey", (0,
                B.hexlify)(t)),
                32 !== (0,
                B.hexDataLength)(this.privateKey) && D.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
                let e = z().keyFromPrivate((0,
                B.arrayify)(this.privateKey));
                (0,
                F.defineReadOnly)(this, "publicKey", "0x" + e.getPublic(!1, "hex")),
                (0,
                F.defineReadOnly)(this, "compressedPublicKey", "0x" + e.getPublic(!0, "hex")),
                (0,
                F.defineReadOnly)(this, "_isSigningKey", !0)
            }
            _addPoint(t) {
                let e = z().keyFromPublic((0,
                B.arrayify)(this.publicKey))
                  , r = z().keyFromPublic((0,
                B.arrayify)(t));
                return "0x" + e.pub.add(r.pub).encodeCompressed("hex")
            }
            signDigest(t) {
                let e = z().keyFromPrivate((0,
                B.arrayify)(this.privateKey))
                  , r = (0,
                B.arrayify)(t);
                32 !== r.length && D.throwArgumentError("bad digest length", "digest", t);
                let n = e.sign(r, {
                    canonical: !0
                });
                return (0,
                B.splitSignature)({
                    recoveryParam: n.recoveryParam,
                    r: (0,
                    B.hexZeroPad)("0x" + n.r.toString(16), 32),
                    s: (0,
                    B.hexZeroPad)("0x" + n.s.toString(16), 32)
                })
            }
            computeSharedSecret(t) {
                let e = z().keyFromPrivate((0,
                B.arrayify)(this.privateKey))
                  , r = z().keyFromPublic((0,
                B.arrayify)(G(t)));
                return (0,
                B.hexZeroPad)("0x" + e.derive(r.getPublic()).toString(16), 32)
            }
            static isSigningKey(t) {
                return !!(t && t._isSigningKey)
            }
        }
        function q(t, e) {
            let r = (0,
            B.splitSignature)(e)
              , n = {
                r: (0,
                B.arrayify)(r.r),
                s: (0,
                B.arrayify)(r.s)
            };
            return "0x" + z().recoverPubKey((0,
            B.arrayify)(t), n, r.recoveryParam).encode("hex", !1)
        }
        function G(t, e) {
            let r = (0,
            B.arrayify)(t);
            if (32 === r.length) {
                let n = new $(r);
                return e ? "0x" + z().keyFromPrivate(r).getPublic(!0, "hex") : n.publicKey
            }
            return 33 === r.length ? e ? (0,
            B.hexlify)(r) : "0x" + z().keyFromPublic(r).getPublic(!1, "hex") : 65 === r.length ? e ? "0x" + z().keyFromPublic(r).getPublic(!0, "hex") : (0,
            B.hexlify)(r) : D.throwArgumentError("invalid public or private key", "key", "[REDACTED]")
        }
    },
    5637: function(t, e, r) {
        "use strict";
        r.d(e, {
            Ll: function() {
                return p
            }
        });
        var n = r(9251);
        function i(t, e) {
            e || (e = function(t) {
                return [parseInt(t, 16)]
            }
            );
            let r = 0
              , n = {};
            return t.split(",").forEach(t=>{
                let i = t.split(":");
                n[r += parseInt(i[0], 16)] = e(i[1])
            }
            ),
            n
        }
        function o(t) {
            let e = 0;
            return t.split(",").map(t=>{
                let r = t.split("-");
                return 1 === r.length ? r[1] = "0" : "" === r[1] && (r[1] = "1"),
                {
                    l: e + parseInt(r[0], 16),
                    h: e = parseInt(r[1], 16)
                }
            }
            )
        }
        function s(t, e) {
            let r = 0;
            for (let n = 0; n < e.length; n++) {
                let i = e[n];
                if (t >= (r += i.l) && t <= r + i.h && (t - r) % (i.d || 1) == 0) {
                    if (i.e && -1 !== i.e.indexOf(t - r))
                        continue;
                    return i
                }
            }
            return null
        }
        let a = o("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d")
          , u = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map(t=>parseInt(t, 16))
          , l = [{
            h: 25,
            s: 32,
            l: 65
        }, {
            h: 30,
            s: 32,
            e: [23],
            l: 127
        }, {
            h: 54,
            s: 1,
            e: [48],
            l: 64,
            d: 2
        }, {
            h: 14,
            s: 1,
            l: 57,
            d: 2
        }, {
            h: 44,
            s: 1,
            l: 17,
            d: 2
        }, {
            h: 10,
            s: 1,
            e: [2, 6, 8],
            l: 61,
            d: 2
        }, {
            h: 16,
            s: 1,
            l: 68,
            d: 2
        }, {
            h: 84,
            s: 1,
            e: [18, 24, 66],
            l: 19,
            d: 2
        }, {
            h: 26,
            s: 32,
            e: [17],
            l: 435
        }, {
            h: 22,
            s: 1,
            l: 71,
            d: 2
        }, {
            h: 15,
            s: 80,
            l: 40
        }, {
            h: 31,
            s: 32,
            l: 16
        }, {
            h: 32,
            s: 1,
            l: 80,
            d: 2
        }, {
            h: 52,
            s: 1,
            l: 42,
            d: 2
        }, {
            h: 12,
            s: 1,
            l: 55,
            d: 2
        }, {
            h: 40,
            s: 1,
            e: [38],
            l: 15,
            d: 2
        }, {
            h: 14,
            s: 1,
            l: 48,
            d: 2
        }, {
            h: 37,
            s: 48,
            l: 49
        }, {
            h: 148,
            s: 1,
            l: 6351,
            d: 2
        }, {
            h: 88,
            s: 1,
            l: 160,
            d: 2
        }, {
            h: 15,
            s: 16,
            l: 704
        }, {
            h: 25,
            s: 26,
            l: 854
        }, {
            h: 25,
            s: 32,
            l: 55915
        }, {
            h: 37,
            s: 40,
            l: 1247
        }, {
            h: 25,
            s: -119711,
            l: 53248
        }, {
            h: 25,
            s: -119763,
            l: 52
        }, {
            h: 25,
            s: -119815,
            l: 52
        }, {
            h: 25,
            s: -119867,
            e: [1, 4, 5, 7, 8, 11, 12, 17],
            l: 52
        }, {
            h: 25,
            s: -119919,
            l: 52
        }, {
            h: 24,
            s: -119971,
            e: [2, 7, 8, 17],
            l: 52
        }, {
            h: 24,
            s: -120023,
            e: [2, 7, 13, 15, 16, 17],
            l: 52
        }, {
            h: 25,
            s: -120075,
            l: 52
        }, {
            h: 25,
            s: -120127,
            l: 52
        }, {
            h: 25,
            s: -120179,
            l: 52
        }, {
            h: 25,
            s: -120231,
            l: 52
        }, {
            h: 25,
            s: -120283,
            l: 52
        }, {
            h: 25,
            s: -120335,
            l: 52
        }, {
            h: 24,
            s: -119543,
            e: [17],
            l: 56
        }, {
            h: 24,
            s: -119601,
            e: [17],
            l: 58
        }, {
            h: 24,
            s: -119659,
            e: [17],
            l: 58
        }, {
            h: 24,
            s: -119717,
            e: [17],
            l: 58
        }, {
            h: 24,
            s: -119775,
            e: [17],
            l: 58
        }]
          , h = i("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3")
          , f = i("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7")
          , c = i("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", function(t) {
            if (t.length % 4 != 0)
                throw Error("bad data");
            let e = [];
            for (let r = 0; r < t.length; r += 4)
                e.push(parseInt(t.substring(r, r + 4), 16));
            return e
        })
          , d = o("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
        function p(t) {
            if (t.match(/^[a-z0-9-]*$/i) && t.length <= 59)
                return t.toLowerCase();
            let e = (0,
            n.XL)(t);
            e = e.map(t=>u.indexOf(t) >= 0 || t >= 65024 && t <= 65039 ? [] : function(t) {
                let e = s(t, l);
                if (e)
                    return [t + e.s];
                let r = h[t];
                if (r)
                    return r;
                let n = f[t];
                return n ? [t + n[0]] : c[t] || null
            }(t) || [t]).reduce((t,e)=>(e.forEach(e=>{
                t.push(e)
            }
            ),
            t), []),
            (e = (0,
            n.XL)((0,
            n.uu)(e), n.Uj.NFKC)).forEach(t=>{
                if (s(t, d))
                    throw Error("STRINGPREP_CONTAINS_PROHIBITED")
            }
            ),
            e.forEach(t=>{
                if (s(t, a))
                    throw Error("STRINGPREP_CONTAINS_UNASSIGNED")
            }
            );
            let r = (0,
            n.uu)(e);
            if ("-" === r.substring(0, 1) || "--" === r.substring(2, 4) || "-" === r.substring(r.length - 1))
                throw Error("invalid hyphen");
            if (r.length > 63)
                throw Error("too long");
            return r
        }
    },
    9251: function(t, e, r) {
        "use strict";
        r.d(e, {
            Uj: function() {
                return o
            },
            te: function() {
                return f
            },
            Uw: function() {
                return s
            },
            U$: function() {
                return m
            },
            uu: function() {
                return g
            },
            Y0: function() {
                return d
            },
            XL: function() {
                return v
            },
            ZN: function() {
                return y
            }
        });
        var n, i, o, s, a = r(6441), u = r(1581);
        let l = new u.Logger("strings/5.6.1");
        function h(t, e, r, n, i) {
            if (t === s.BAD_PREFIX || t === s.UNEXPECTED_CONTINUE) {
                let o = 0;
                for (let a = e + 1; a < r.length && r[a] >> 6 == 2; a++)
                    o++;
                return o
            }
            return t === s.OVERRUN ? r.length - e - 1 : 0
        }
        (n = o || (o = {})).current = "",
        n.NFC = "NFC",
        n.NFD = "NFD",
        n.NFKC = "NFKC",
        n.NFKD = "NFKD",
        (i = s || (s = {})).UNEXPECTED_CONTINUE = "unexpected continuation byte",
        i.BAD_PREFIX = "bad codepoint prefix",
        i.OVERRUN = "string overrun",
        i.MISSING_CONTINUE = "missing continuation byte",
        i.OUT_OF_RANGE = "out of UTF-8 range",
        i.UTF16_SURROGATE = "UTF-16 surrogate",
        i.OVERLONG = "overlong representation";
        let f = Object.freeze({
            error: function(t, e, r, n, i) {
                return l.throwArgumentError(`invalid codepoint at offset ${e}; ${t}`, "bytes", r)
            },
            ignore: h,
            replace: function(t, e, r, n, i) {
                return t === s.OVERLONG ? (n.push(i),
                0) : (n.push(65533),
                h(t, e, r, n, i))
            }
        });
        function c(t, e) {
            null == e && (e = f.error),
            t = (0,
            a.arrayify)(t);
            let r = []
              , n = 0;
            for (; n < t.length; ) {
                let i = t[n++];
                if (i >> 7 == 0) {
                    r.push(i);
                    continue
                }
                let o = null
                  , u = null;
                if ((224 & i) == 192)
                    o = 1,
                    u = 127;
                else if ((240 & i) == 224)
                    o = 2,
                    u = 2047;
                else if ((248 & i) == 240)
                    o = 3,
                    u = 65535;
                else {
                    (192 & i) == 128 ? n += e(s.UNEXPECTED_CONTINUE, n - 1, t, r) : n += e(s.BAD_PREFIX, n - 1, t, r);
                    continue
                }
                if (n - 1 + o >= t.length) {
                    n += e(s.OVERRUN, n - 1, t, r);
                    continue
                }
                let l = i & (1 << 8 - o - 1) - 1;
                for (let h = 0; h < o; h++) {
                    let c = t[n];
                    if ((192 & c) != 128) {
                        n += e(s.MISSING_CONTINUE, n, t, r),
                        l = null;
                        break
                    }
                    l = l << 6 | 63 & c,
                    n++
                }
                if (null !== l) {
                    if (l > 1114111) {
                        n += e(s.OUT_OF_RANGE, n - 1 - o, t, r, l);
                        continue
                    }
                    if (l >= 55296 && l <= 57343) {
                        n += e(s.UTF16_SURROGATE, n - 1 - o, t, r, l);
                        continue
                    }
                    if (l <= u) {
                        n += e(s.OVERLONG, n - 1 - o, t, r, l);
                        continue
                    }
                    r.push(l)
                }
            }
            return r
        }
        function d(t, e=o.current) {
            e != o.current && (l.checkNormalize(),
            t = t.normalize(e));
            let r = [];
            for (let n = 0; n < t.length; n++) {
                let i = t.charCodeAt(n);
                if (i < 128)
                    r.push(i);
                else if (i < 2048)
                    r.push(i >> 6 | 192),
                    r.push(63 & i | 128);
                else if ((64512 & i) == 55296) {
                    n++;
                    let s = t.charCodeAt(n);
                    if (n >= t.length || (64512 & s) != 56320)
                        throw Error("invalid utf-8 string");
                    let u = 65536 + ((1023 & i) << 10) + (1023 & s);
                    r.push(u >> 18 | 240),
                    r.push(u >> 12 & 63 | 128),
                    r.push(u >> 6 & 63 | 128),
                    r.push(63 & u | 128)
                } else
                    r.push(i >> 12 | 224),
                    r.push(i >> 6 & 63 | 128),
                    r.push(63 & i | 128)
            }
            return (0,
            a.arrayify)(r)
        }
        function p(t) {
            let e = "0000" + t.toString(16);
            return "\\u" + e.substring(e.length - 4)
        }
        function m(t, e) {
            return '"' + c(t, e).map(t=>{
                if (t < 256) {
                    switch (t) {
                    case 8:
                        return "\\b";
                    case 9:
                        return "\\t";
                    case 10:
                        return "\\n";
                    case 13:
                        return "\\r";
                    case 34:
                        return '\\"';
                    case 92:
                        return "\\\\"
                    }
                    if (t >= 32 && t < 127)
                        return String.fromCharCode(t)
                }
                return t <= 65535 ? p(t) : p(((t -= 65536) >> 10 & 1023) + 55296) + p((1023 & t) + 56320)
            }
            ).join("") + '"'
        }
        function g(t) {
            return t.map(t=>t <= 65535 ? String.fromCharCode(t) : String.fromCharCode(((t -= 65536) >> 10 & 1023) + 55296, (1023 & t) + 56320)).join("")
        }
        function y(t, e) {
            return g(c(t, e))
        }
        function v(t, e=o.current) {
            return c(d(t, e))
        }
    },
    3875: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            TransactionTypes: function() {
                return i
            },
            accessListify: function() {
                return x
            },
            computeAddress: function() {
                return b
            },
            parse: function() {
                return S
            },
            recoverAddress: function() {
                return w
            },
            serialize: function() {
                return M
            }
        });
        var n, i, o = r(9485), s = r(2593), a = r(6441), u = r(1046), l = r(8197), h = r(6881), f = r(9052), c = r(7669), d = r(1581);
        let p = new d.Logger("transactions/5.6.2");
        function m(t) {
            return "0x" === t ? null : (0,
            o.getAddress)(t)
        }
        function g(t) {
            return "0x" === t ? u._Y : s.O$.from(t)
        }
        (n = i || (i = {}))[n.legacy = 0] = "legacy",
        n[n.eip2930 = 1] = "eip2930",
        n[n.eip1559 = 2] = "eip1559";
        let y = [{
            name: "nonce",
            maxLength: 32,
            numeric: !0
        }, {
            name: "gasPrice",
            maxLength: 32,
            numeric: !0
        }, {
            name: "gasLimit",
            maxLength: 32,
            numeric: !0
        }, {
            name: "to",
            length: 20
        }, {
            name: "value",
            maxLength: 32,
            numeric: !0
        }, {
            name: "data"
        }]
          , v = {
            chainId: !0,
            data: !0,
            gasLimit: !0,
            gasPrice: !0,
            nonce: !0,
            to: !0,
            type: !0,
            value: !0
        };
        function b(t) {
            let e = (0,
            c.computePublicKey)(t);
            return (0,
            o.getAddress)((0,
            a.hexDataSlice)((0,
            l.keccak256)((0,
            a.hexDataSlice)(e, 1)), 12))
        }
        function w(t, e) {
            return b((0,
            c.recoverPublicKey)((0,
            a.arrayify)(t), e))
        }
        function E(t, e) {
            let r = (0,
            a.stripZeros)(s.O$.from(t).toHexString());
            return r.length > 32 && p.throwArgumentError("invalid length for " + e, "transaction:" + e, t),
            r
        }
        function _(t, e) {
            return {
                address: (0,
                o.getAddress)(t),
                storageKeys: (e || []).map((e,r)=>(32 !== (0,
                a.hexDataLength)(e) && p.throwArgumentError("invalid access list storageKey", `accessList[${t}:${r}]`, e),
                e.toLowerCase()))
            }
        }
        function x(t) {
            if (Array.isArray(t))
                return t.map((t,e)=>Array.isArray(t) ? (t.length > 2 && p.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${e}]`, t),
                _(t[0], t[1])) : _(t.address, t.storageKeys));
            let e = Object.keys(t).map(e=>{
                let r = t[e].reduce((t,e)=>(t[e] = !0,
                t), {});
                return _(e, Object.keys(r).sort())
            }
            );
            return e.sort((t,e)=>t.address.localeCompare(e.address)),
            e
        }
        function A(t) {
            return x(t).map(t=>[t.address, t.storageKeys])
        }
        function k(t, e) {
            if (null != t.gasPrice) {
                let r = s.O$.from(t.gasPrice)
                  , n = s.O$.from(t.maxFeePerGas || 0);
                r.eq(n) || p.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
                    gasPrice: r,
                    maxFeePerGas: n
                })
            }
            let i = [E(t.chainId || 0, "chainId"), E(t.nonce || 0, "nonce"), E(t.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"), E(t.maxFeePerGas || 0, "maxFeePerGas"), E(t.gasLimit || 0, "gasLimit"), null != t.to ? (0,
            o.getAddress)(t.to) : "0x", E(t.value || 0, "value"), t.data || "0x", A(t.accessList || [])];
            if (e) {
                let u = (0,
                a.splitSignature)(e);
                i.push(E(u.recoveryParam, "recoveryParam")),
                i.push((0,
                a.stripZeros)(u.r)),
                i.push((0,
                a.stripZeros)(u.s))
            }
            return (0,
            a.hexConcat)(["0x02", f.encode(i)])
        }
        function N(t, e) {
            let r = [E(t.chainId || 0, "chainId"), E(t.nonce || 0, "nonce"), E(t.gasPrice || 0, "gasPrice"), E(t.gasLimit || 0, "gasLimit"), null != t.to ? (0,
            o.getAddress)(t.to) : "0x", E(t.value || 0, "value"), t.data || "0x", A(t.accessList || [])];
            if (e) {
                let n = (0,
                a.splitSignature)(e);
                r.push(E(n.recoveryParam, "recoveryParam")),
                r.push((0,
                a.stripZeros)(n.r)),
                r.push((0,
                a.stripZeros)(n.s))
            }
            return (0,
            a.hexConcat)(["0x01", f.encode(r)])
        }
        function M(t, e) {
            if (null == t.type || 0 === t.type)
                return null != t.accessList && p.throwArgumentError("untyped transactions do not support accessList; include type: 1", "transaction", t),
                function(t, e) {
                    (0,
                    h.checkProperties)(t, v);
                    let r = [];
                    y.forEach(function(e) {
                        let n = t[e.name] || []
                          , i = {};
                        e.numeric && (i.hexPad = "left"),
                        n = (0,
                        a.arrayify)((0,
                        a.hexlify)(n, i)),
                        e.length && n.length !== e.length && n.length > 0 && p.throwArgumentError("invalid length for " + e.name, "transaction:" + e.name, n),
                        e.maxLength && (n = (0,
                        a.stripZeros)(n)).length > e.maxLength && p.throwArgumentError("invalid length for " + e.name, "transaction:" + e.name, n),
                        r.push((0,
                        a.hexlify)(n))
                    });
                    let n = 0;
                    if (null != t.chainId ? "number" != typeof (n = t.chainId) && p.throwArgumentError("invalid transaction.chainId", "transaction", t) : e && !(0,
                    a.isBytesLike)(e) && e.v > 28 && (n = Math.floor((e.v - 35) / 2)),
                    0 !== n && (r.push((0,
                    a.hexlify)(n)),
                    r.push("0x"),
                    r.push("0x")),
                    !e)
                        return f.encode(r);
                    let i = (0,
                    a.splitSignature)(e)
                      , o = 27 + i.recoveryParam;
                    return 0 !== n ? (r.pop(),
                    r.pop(),
                    r.pop(),
                    o += 2 * n + 8,
                    i.v > 28 && i.v !== o && p.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", e)) : i.v !== o && p.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", e),
                    r.push((0,
                    a.hexlify)(o)),
                    r.push((0,
                    a.stripZeros)((0,
                    a.arrayify)(i.r))),
                    r.push((0,
                    a.stripZeros)((0,
                    a.arrayify)(i.s))),
                    f.encode(r)
                }(t, e);
            switch (t.type) {
            case 1:
                return N(t, e);
            case 2:
                return k(t, e)
            }
            return p.throwError(`unsupported transaction type: ${t.type}`, d.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "serializeTransaction",
                transactionType: t.type
            })
        }
        function P(t, e, r) {
            try {
                let n = g(e[0]).toNumber();
                if (0 !== n && 1 !== n)
                    throw Error("bad recid");
                t.v = n
            } catch (i) {
                p.throwArgumentError("invalid v for transaction type: 1", "v", e[0])
            }
            t.r = (0,
            a.hexZeroPad)(e[1], 32),
            t.s = (0,
            a.hexZeroPad)(e[2], 32);
            try {
                let o = (0,
                l.keccak256)(r(t));
                t.from = w(o, {
                    r: t.r,
                    s: t.s,
                    recoveryParam: t.v
                })
            } catch (s) {}
        }
        function S(t) {
            let e = (0,
            a.arrayify)(t);
            if (e[0] > 127)
                return function(t) {
                    let e = f.decode(t);
                    9 !== e.length && 6 !== e.length && p.throwArgumentError("invalid raw transaction", "rawTransaction", t);
                    let r = {
                        nonce: g(e[0]).toNumber(),
                        gasPrice: g(e[1]),
                        gasLimit: g(e[2]),
                        to: m(e[3]),
                        value: g(e[4]),
                        data: e[5],
                        chainId: 0
                    };
                    if (6 === e.length)
                        return r;
                    try {
                        r.v = s.O$.from(e[6]).toNumber()
                    } catch (n) {
                        return r
                    }
                    if (r.r = (0,
                    a.hexZeroPad)(e[7], 32),
                    r.s = (0,
                    a.hexZeroPad)(e[8], 32),
                    s.O$.from(r.r).isZero() && s.O$.from(r.s).isZero())
                        r.chainId = r.v,
                        r.v = 0;
                    else {
                        r.chainId = Math.floor((r.v - 35) / 2),
                        r.chainId < 0 && (r.chainId = 0);
                        let i = r.v - 27
                          , o = e.slice(0, 6);
                        0 !== r.chainId && (o.push((0,
                        a.hexlify)(r.chainId)),
                        o.push("0x"),
                        o.push("0x"),
                        i -= 2 * r.chainId + 8);
                        let u = (0,
                        l.keccak256)(f.encode(o));
                        try {
                            r.from = w(u, {
                                r: (0,
                                a.hexlify)(r.r),
                                s: (0,
                                a.hexlify)(r.s),
                                recoveryParam: i
                            })
                        } catch (h) {}
                        r.hash = (0,
                        l.keccak256)(t)
                    }
                    return r.type = null,
                    r
                }(e);
            switch (e[0]) {
            case 1:
                return function(t) {
                    let e = f.decode(t.slice(1));
                    8 !== e.length && 11 !== e.length && p.throwArgumentError("invalid component count for transaction type: 1", "payload", (0,
                    a.hexlify)(t));
                    let r = {
                        type: 1,
                        chainId: g(e[0]).toNumber(),
                        nonce: g(e[1]).toNumber(),
                        gasPrice: g(e[2]),
                        gasLimit: g(e[3]),
                        to: m(e[4]),
                        value: g(e[5]),
                        data: e[6],
                        accessList: x(e[7])
                    };
                    return 8 === e.length || (r.hash = (0,
                    l.keccak256)(t),
                    P(r, e.slice(8), N)),
                    r
                }(e);
            case 2:
                return function(t) {
                    let e = f.decode(t.slice(1));
                    9 !== e.length && 12 !== e.length && p.throwArgumentError("invalid component count for transaction type: 2", "payload", (0,
                    a.hexlify)(t));
                    let r = g(e[2])
                      , n = g(e[3])
                      , i = {
                        type: 2,
                        chainId: g(e[0]).toNumber(),
                        nonce: g(e[1]).toNumber(),
                        maxPriorityFeePerGas: r,
                        maxFeePerGas: n,
                        gasPrice: null,
                        gasLimit: g(e[4]),
                        to: m(e[5]),
                        value: g(e[6]),
                        data: e[7],
                        accessList: x(e[8])
                    };
                    return 9 === e.length || (i.hash = (0,
                    l.keccak256)(t),
                    P(i, e.slice(9), k)),
                    i
                }(e)
            }
            return p.throwError(`unsupported transaction type: ${e[0]}`, d.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "parseTransaction",
                transactionType: e[0]
            })
        }
    },
    7707: function(t, e, r) {
        "use strict";
        r.r(e),
        r.d(e, {
            _fetchData: function() {
                return f
            },
            fetchJson: function() {
                return c
            },
            poll: function() {
                return d
            }
        });
        var n = r(9567)
          , i = r(6441)
          , o = r(6881)
          , s = r(9251)
          , a = r(1581);
        let u = new a.Logger("web/5.6.1");
        function l(t) {
            return new Promise(e=>{
                setTimeout(e, t)
            }
            )
        }
        function h(t, e) {
            if (null == t)
                return null;
            if ("string" == typeof t)
                return t;
            if ((0,
            i.isBytesLike)(t)) {
                if (e && ("text" === e.split("/")[0] || "application/json" === e.split(";")[0].trim()))
                    try {
                        return (0,
                        s.ZN)(t)
                    } catch (r) {}
                return (0,
                i.hexlify)(t)
            }
            return t
        }
        function f(t, e, r) {
            let o = "object" == typeof t && null != t.throttleLimit ? t.throttleLimit : 12;
            u.assertArgument(o > 0 && o % 1 == 0, "invalid connection throttle limit", "connection.throttleLimit", o);
            let f = "object" == typeof t ? t.throttleCallback : null
              , c = "object" == typeof t && "number" == typeof t.throttleSlotInterval ? t.throttleSlotInterval : 100;
            u.assertArgument(c > 0 && c % 1 == 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", c);
            let d = "object" == typeof t && !!t.errorPassThrough
              , p = {}
              , m = null
              , g = {
                method: "GET"
            }
              , y = !1
              , v = 12e4;
            if ("string" == typeof t)
                m = t;
            else if ("object" == typeof t) {
                if ((null == t || null == t.url) && u.throwArgumentError("missing URL", "connection.url", t),
                m = t.url,
                "number" == typeof t.timeout && t.timeout > 0 && (v = t.timeout),
                t.headers)
                    for (let b in t.headers)
                        p[b.toLowerCase()] = {
                            key: b,
                            value: String(t.headers[b])
                        },
                        ["if-none-match", "if-modified-since"].indexOf(b.toLowerCase()) >= 0 && (y = !0);
                if (g.allowGzip = !!t.allowGzip,
                null != t.user && null != t.password) {
                    "https:" !== m.substring(0, 6) && !0 !== t.allowInsecureAuthentication && u.throwError("basic authentication requires a secure https url", a.Logger.errors.INVALID_ARGUMENT, {
                        argument: "url",
                        url: m,
                        user: t.user,
                        password: "[REDACTED]"
                    });
                    let w = t.user + ":" + t.password;
                    p.authorization = {
                        key: "Authorization",
                        value: "Basic " + (0,
                        n.c)((0,
                        s.Y0)(w))
                    }
                }
                null != t.skipFetchSetup && (g.skipFetchSetup = !!t.skipFetchSetup)
            }
            let E = RegExp("^data:([a-z0-9-]+/[a-z0-9-]+);base64,(.*)$", "i")
              , _ = m ? m.match(E) : null;
            if (_)
                try {
                    let x = {
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {
                            "content-type": _[1]
                        },
                        body: (0,
                        n.J)(_[2])
                    }
                      , A = x.body;
                    return r && (A = r(x.body, x)),
                    Promise.resolve(A)
                } catch (k) {
                    u.throwError("processing response error", a.Logger.errors.SERVER_ERROR, {
                        body: h(_[1], _[2]),
                        error: k,
                        requestBody: null,
                        requestMethod: "GET",
                        url: m
                    })
                }
            e && (g.method = "POST",
            g.body = e,
            null == p["content-type"] && (p["content-type"] = {
                key: "Content-Type",
                value: "application/octet-stream"
            }),
            null == p["content-length"] && (p["content-length"] = {
                key: "Content-Length",
                value: String(e.length)
            }));
            let N = {};
            Object.keys(p).forEach(t=>{
                let e = p[t];
                N[e.key] = e.value
            }
            ),
            g.headers = N;
            let M = function() {
                let t = null
                  , e = new Promise(function(e, r) {
                    v && (t = setTimeout(()=>{
                        null != t && (t = null,
                        r(u.makeError("timeout", a.Logger.errors.TIMEOUT, {
                            requestBody: h(g.body, N["content-type"]),
                            requestMethod: g.method,
                            timeout: v,
                            url: m
                        })))
                    }
                    , v))
                }
                )
                  , r = function() {
                    null != t && (clearTimeout(t),
                    t = null)
                };
                return {
                    promise: e,
                    cancel: r
                }
            }()
              , P = function() {
                var t, e, n, s;
                return t = this,
                e = void 0,
                n = void 0,
                s = function*() {
                    for (let t = 0; t < o; t++) {
                        let e = null;
                        try {
                            if (e = yield function(t, e) {
                                var r, n, o, s;
                                return r = this,
                                n = void 0,
                                o = void 0,
                                s = function*() {
                                    null == e && (e = {});
                                    let r = {
                                        method: e.method || "GET",
                                        headers: e.headers || {},
                                        body: e.body || void 0
                                    };
                                    !0 !== e.skipFetchSetup && (r.mode = "cors",
                                    r.cache = "no-cache",
                                    r.credentials = "same-origin",
                                    r.redirect = "follow",
                                    r.referrer = "client");
                                    let n = yield fetch(t, r)
                                      , o = yield n.arrayBuffer()
                                      , s = {};
                                    return n.headers.forEach ? n.headers.forEach((t,e)=>{
                                        s[e.toLowerCase()] = t
                                    }
                                    ) : n.headers.keys().forEach(t=>{
                                        s[t.toLowerCase()] = n.headers.get(t)
                                    }
                                    ),
                                    {
                                        headers: s,
                                        statusCode: n.status,
                                        statusMessage: n.statusText,
                                        body: (0,
                                        i.arrayify)(new Uint8Array(o))
                                    }
                                }
                                ,
                                new (o || (o = Promise))(function(t, e) {
                                    function i(t) {
                                        try {
                                            u(s.next(t))
                                        } catch (r) {
                                            e(r)
                                        }
                                    }
                                    function a(t) {
                                        try {
                                            u(s.throw(t))
                                        } catch (r) {
                                            e(r)
                                        }
                                    }
                                    function u(e) {
                                        var r;
                                        e.done ? t(e.value) : ((r = e.value)instanceof o ? r : new o(function(t) {
                                            t(r)
                                        }
                                        )).then(i, a)
                                    }
                                    u((s = s.apply(r, n || [])).next())
                                }
                                )
                            }(m, g),
                            t < o) {
                                if (301 === e.statusCode || 302 === e.statusCode) {
                                    let n = e.headers.location || "";
                                    if ("GET" === g.method && n.match(/^https:/)) {
                                        m = e.headers.location;
                                        continue
                                    }
                                } else if (429 === e.statusCode) {
                                    let s = !0;
                                    if (f && (s = yield f(t, m)),
                                    s) {
                                        let p = e.headers["retry-after"];
                                        yield l("string" == typeof p && p.match(/^[1-9][0-9]*$/) ? 1e3 * parseInt(p) : c * parseInt(String(Math.random() * Math.pow(2, t))));
                                        continue
                                    }
                                }
                            }
                        } catch (v) {
                            null == (e = v.response) && (M.cancel(),
                            u.throwError("missing response", a.Logger.errors.SERVER_ERROR, {
                                requestBody: h(g.body, N["content-type"]),
                                requestMethod: g.method,
                                serverError: v,
                                url: m
                            }))
                        }
                        let b = e.body;
                        if (y && 304 === e.statusCode ? b = null : !d && (e.statusCode < 200 || e.statusCode >= 300) && (M.cancel(),
                        u.throwError("bad response", a.Logger.errors.SERVER_ERROR, {
                            status: e.statusCode,
                            headers: e.headers,
                            body: h(b, e.headers ? e.headers["content-type"] : null),
                            requestBody: h(g.body, N["content-type"]),
                            requestMethod: g.method,
                            url: m
                        })),
                        r)
                            try {
                                let w = yield r(b, e);
                                return M.cancel(),
                                w
                            } catch (x) {
                                if (x.throttleRetry && t < o) {
                                    let E = !0;
                                    if (f && (E = yield f(t, m)),
                                    E) {
                                        let _ = c * parseInt(String(Math.random() * Math.pow(2, t)));
                                        yield l(_);
                                        continue
                                    }
                                }
                                M.cancel(),
                                u.throwError("processing response error", a.Logger.errors.SERVER_ERROR, {
                                    body: h(b, e.headers ? e.headers["content-type"] : null),
                                    error: x,
                                    requestBody: h(g.body, N["content-type"]),
                                    requestMethod: g.method,
                                    url: m
                                })
                            }
                        return M.cancel(),
                        b
                    }
                    return u.throwError("failed response", a.Logger.errors.SERVER_ERROR, {
                        requestBody: h(g.body, N["content-type"]),
                        requestMethod: g.method,
                        url: m
                    })
                }
                ,
                new (n || (n = Promise))(function(r, i) {
                    function o(t) {
                        try {
                            u(s.next(t))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function a(t) {
                        try {
                            u(s.throw(t))
                        } catch (e) {
                            i(e)
                        }
                    }
                    function u(t) {
                        var e;
                        t.done ? r(t.value) : ((e = t.value)instanceof n ? e : new n(function(t) {
                            t(e)
                        }
                        )).then(o, a)
                    }
                    u((s = s.apply(t, e || [])).next())
                }
                )
            }();
            return Promise.race([M.promise, P])
        }
        function c(t, e, r) {
            let n = (t,e)=>{
                let n = null;
                if (null != t)
                    try {
                        n = JSON.parse((0,
                        s.ZN)(t))
                    } catch (i) {
                        u.throwError("invalid JSON", a.Logger.errors.SERVER_ERROR, {
                            body: t,
                            error: i
                        })
                    }
                return r && (n = r(n, e)),
                n
            }
              , i = null;
            if (null != e) {
                i = (0,
                s.Y0)(e);
                let l = "string" == typeof t ? {
                    url: t
                } : (0,
                o.shallowCopy)(t);
                if (l.headers) {
                    let h = 0 !== Object.keys(l.headers).filter(t=>"content-type" === t.toLowerCase()).length;
                    h || (l.headers = (0,
                    o.shallowCopy)(l.headers),
                    l.headers["content-type"] = "application/json")
                } else
                    l.headers = {
                        "content-type": "application/json"
                    };
                t = l
            }
            return f(t, i, n)
        }
        function d(t, e) {
            return e || (e = {}),
            null == (e = (0,
            o.shallowCopy)(e)).floor && (e.floor = 0),
            null == e.ceiling && (e.ceiling = 1e4),
            null == e.interval && (e.interval = 250),
            new Promise(function(r, n) {
                let i = null
                  , o = !1
                  , s = ()=>!o && (o = !0,
                i && clearTimeout(i),
                !0);
                e.timeout && (i = setTimeout(()=>{
                    s() && n(Error("timeout"))
                }
                , e.timeout));
                let a = e.retryLimit
                  , u = 0;
                !function i() {
                    return t().then(function(t) {
                        if (void 0 !== t)
                            s() && r(t);
                        else if (e.oncePoll)
                            e.oncePoll.once("poll", i);
                        else if (e.onceBlock)
                            e.onceBlock.once("block", i);
                        else if (!o) {
                            if (++u > a) {
                                s() && n(Error("retry limit reached"));
                                return
                            }
                            let l = e.interval * parseInt(String(Math.random() * Math.pow(2, u)));
                            l < e.floor && (l = e.floor),
                            l > e.ceiling && (l = e.ceiling),
                            setTimeout(i, l)
                        }
                        return null
                    }, function(t) {
                        s() && n(t)
                    })
                }()
            }
            )
        }
    },
    2882: function(t) {
        "use strict";
        for (var e = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", r = {}, n = 0; n < e.length; n++) {
            var i = e.charAt(n);
            if (void 0 !== r[i])
                throw TypeError(i + " is ambiguous");
            r[i] = n
        }
        function o(t) {
            var e = t >> 25;
            return (33554431 & t) << 5 ^ 996825010 & -(e >> 0 & 1) ^ 642813549 & -(e >> 1 & 1) ^ 513874426 & -(e >> 2 & 1) ^ 1027748829 & -(e >> 3 & 1) ^ 705979059 & -(e >> 4 & 1)
        }
        function s(t) {
            for (var e = 1, r = 0; r < t.length; ++r) {
                var n = t.charCodeAt(r);
                if (n < 33 || n > 126)
                    return "Invalid prefix (" + t + ")";
                e = o(e) ^ n >> 5
            }
            for (r = 0,
            e = o(e); r < t.length; ++r) {
                var i = t.charCodeAt(r);
                e = o(e) ^ 31 & i
            }
            return e
        }
        function a(t, e) {
            if (e = e || 90,
            t.length < 8)
                return t + " too short";
            if (t.length > e)
                return "Exceeds length limit";
            var n = t.toLowerCase()
              , i = t.toUpperCase();
            if (t !== n && t !== i)
                return "Mixed-case string " + t;
            var a = (t = n).lastIndexOf("1");
            if (-1 === a)
                return "No separator character for " + t;
            if (0 === a)
                return "Missing prefix for " + t;
            var u = t.slice(0, a)
              , l = t.slice(a + 1);
            if (l.length < 6)
                return "Data too short";
            var h = s(u);
            if ("string" == typeof h)
                return h;
            for (var f = [], c = 0; c < l.length; ++c) {
                var d = l.charAt(c)
                  , p = r[d];
                if (void 0 === p)
                    return "Unknown character " + d;
                h = o(h) ^ p,
                c + 6 >= l.length || f.push(p)
            }
            return 1 !== h ? "Invalid checksum for " + t : {
                prefix: u,
                words: f
            }
        }
        function u(t, e, r, n) {
            for (var i = 0, o = 0, s = (1 << r) - 1, a = [], u = 0; u < t.length; ++u)
                for (i = i << e | t[u],
                o += e; o >= r; )
                    a.push(i >> (o -= r) & s);
            if (n)
                o > 0 && a.push(i << r - o & s);
            else {
                if (o >= e)
                    return "Excess padding";
                if (i << r - o & s)
                    return "Non-zero padding"
            }
            return a
        }
        t.exports = {
            decodeUnsafe: function() {
                var t = a.apply(null, arguments);
                if ("object" == typeof t)
                    return t
            },
            decode: function(t) {
                var e = a.apply(null, arguments);
                if ("object" == typeof e)
                    return e;
                throw Error(e)
            },
            encode: function(t, r, n) {
                if (n = n || 90,
                t.length + 7 + r.length > n)
                    throw TypeError("Exceeds length limit");
                var i = s(t = t.toLowerCase());
                if ("string" == typeof i)
                    throw Error(i);
                for (var a = t + "1", u = 0; u < r.length; ++u) {
                    var l = r[u];
                    if (l >> 5 != 0)
                        throw Error("Non 5-bit word");
                    i = o(i) ^ l,
                    a += e.charAt(l)
                }
                for (u = 0; u < 6; ++u)
                    i = o(i);
                for (i ^= 1,
                u = 0; u < 6; ++u) {
                    var h = i >> (5 - u) * 5 & 31;
                    a += e.charAt(h)
                }
                return a
            },
            toWordsUnsafe: function(t) {
                var e = u(t, 8, 5, !0);
                if (Array.isArray(e))
                    return e
            },
            toWords: function(t) {
                var e = u(t, 8, 5, !0);
                if (Array.isArray(e))
                    return e;
                throw Error(e)
            },
            fromWordsUnsafe: function(t) {
                var e = u(t, 5, 8, !1);
                if (Array.isArray(e))
                    return e
            },
            fromWords: function(t) {
                var e = u(t, 5, 8, !1);
                if (Array.isArray(e))
                    return e;
                throw Error(e)
            }
        }
    },
    3550: function(t, e, r) {
        !function(t, e) {
            "use strict";
            function n(t, e) {
                if (!t)
                    throw Error(e || "Assertion failed")
            }
            function i(t, e) {
                t.super_ = e;
                var r = function() {};
                r.prototype = e.prototype,
                t.prototype = new r,
                t.prototype.constructor = t
            }
            function o(t, e, r) {
                if (o.isBN(t))
                    return t;
                this.negative = 0,
                this.words = null,
                this.length = 0,
                this.red = null,
                null !== t && (("le" === e || "be" === e) && (r = e,
                e = 10),
                this._init(t || 0, e || 10, r || "be"))
            }
            "object" == typeof t ? t.exports = o : e.BN = o,
            o.BN = o,
            o.wordSize = 26;
            try {
                d = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : r(6601).Buffer
            } catch (s) {}
            function a(t, e) {
                var r = t.charCodeAt(e);
                return r >= 48 && r <= 57 ? r - 48 : r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : void n(!1, "Invalid character in " + t)
            }
            function u(t, e, r) {
                var n = a(t, r);
                return r - 1 >= e && (n |= a(t, r - 1) << 4),
                n
            }
            function l(t, e, r, i) {
                for (var o = 0, s = 0, a = Math.min(t.length, r), u = e; u < a; u++) {
                    var l = t.charCodeAt(u) - 48;
                    o *= i,
                    s = l >= 49 ? l - 49 + 10 : l >= 17 ? l - 17 + 10 : l,
                    n(l >= 0 && s < i, "Invalid character"),
                    o += s
                }
                return o
            }
            function h(t, e) {
                t.words = e.words,
                t.length = e.length,
                t.negative = e.negative,
                t.red = e.red
            }
            if (o.isBN = function(t) {
                return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
            }
            ,
            o.max = function(t, e) {
                return t.cmp(e) > 0 ? t : e
            }
            ,
            o.min = function(t, e) {
                return 0 > t.cmp(e) ? t : e
            }
            ,
            o.prototype._init = function(t, e, r) {
                if ("number" == typeof t)
                    return this._initNumber(t, e, r);
                if ("object" == typeof t)
                    return this._initArray(t, e, r);
                "hex" === e && (e = 16),
                n(e === (0 | e) && e >= 2 && e <= 36);
                var i = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] && (i++,
                this.negative = 1),
                i < t.length && (16 === e ? this._parseHex(t, i, r) : (this._parseBase(t, e, i),
                "le" === r && this._initArray(this.toArray(), e, r)))
            }
            ,
            o.prototype._initNumber = function(t, e, r) {
                t < 0 && (this.negative = 1,
                t = -t),
                t < 67108864 ? (this.words = [67108863 & t],
                this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863],
                this.length = 2) : (n(t < 9007199254740992),
                this.words = [67108863 & t, t / 67108864 & 67108863, 1],
                this.length = 3),
                "le" === r && this._initArray(this.toArray(), e, r)
            }
            ,
            o.prototype._initArray = function(t, e, r) {
                if (n("number" == typeof t.length),
                t.length <= 0)
                    return this.words = [0],
                    this.length = 1,
                    this;
                this.length = Math.ceil(t.length / 3),
                this.words = Array(this.length);
                for (var i, o, s = 0; s < this.length; s++)
                    this.words[s] = 0;
                var a = 0;
                if ("be" === r)
                    for (s = t.length - 1,
                    i = 0; s >= 0; s -= 3)
                        o = t[s] | t[s - 1] << 8 | t[s - 2] << 16,
                        this.words[i] |= o << a & 67108863,
                        this.words[i + 1] = o >>> 26 - a & 67108863,
                        (a += 24) >= 26 && (a -= 26,
                        i++);
                else if ("le" === r)
                    for (s = 0,
                    i = 0; s < t.length; s += 3)
                        o = t[s] | t[s + 1] << 8 | t[s + 2] << 16,
                        this.words[i] |= o << a & 67108863,
                        this.words[i + 1] = o >>> 26 - a & 67108863,
                        (a += 24) >= 26 && (a -= 26,
                        i++);
                return this._strip()
            }
            ,
            o.prototype._parseHex = function(t, e, r) {
                this.length = Math.ceil((t.length - e) / 6),
                this.words = Array(this.length);
                for (var n, i = 0; i < this.length; i++)
                    this.words[i] = 0;
                var o = 0
                  , s = 0;
                if ("be" === r)
                    for (i = t.length - 1; i >= e; i -= 2)
                        n = u(t, e, i) << o,
                        this.words[s] |= 67108863 & n,
                        o >= 18 ? (o -= 18,
                        s += 1,
                        this.words[s] |= n >>> 26) : o += 8;
                else {
                    var a = t.length - e;
                    for (i = a % 2 == 0 ? e + 1 : e; i < t.length; i += 2)
                        n = u(t, e, i) << o,
                        this.words[s] |= 67108863 & n,
                        o >= 18 ? (o -= 18,
                        s += 1,
                        this.words[s] |= n >>> 26) : o += 8
                }
                this._strip()
            }
            ,
            o.prototype._parseBase = function(t, e, r) {
                this.words = [0],
                this.length = 1;
                for (var n = 0, i = 1; i <= 67108863; i *= e)
                    n++;
                n--,
                i = i / e | 0;
                for (var o = t.length - r, s = o % n, a = Math.min(o, o - s) + r, u = 0, h = r; h < a; h += n)
                    u = l(t, h, h + n, e),
                    this.imuln(i),
                    this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                if (0 !== s) {
                    var f = 1;
                    for (u = l(t, h, t.length, e),
                    h = 0; h < s; h++)
                        f *= e;
                    this.imuln(f),
                    this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                }
                this._strip()
            }
            ,
            o.prototype.copy = function(t) {
                t.words = Array(this.length);
                for (var e = 0; e < this.length; e++)
                    t.words[e] = this.words[e];
                t.length = this.length,
                t.negative = this.negative,
                t.red = this.red
            }
            ,
            o.prototype._move = function(t) {
                h(t, this)
            }
            ,
            o.prototype.clone = function() {
                var t = new o(null);
                return this.copy(t),
                t
            }
            ,
            o.prototype._expand = function(t) {
                for (; this.length < t; )
                    this.words[this.length++] = 0;
                return this
            }
            ,
            o.prototype._strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                    this.length--;
                return this._normSign()
            }
            ,
            o.prototype._normSign = function() {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0),
                this
            }
            ,
            "undefined" != typeof Symbol && "function" == typeof Symbol.for)
                try {
                    o.prototype[Symbol.for("nodejs.util.inspect.custom")] = c
                } catch (f) {
                    o.prototype.inspect = c
                }
            else
                o.prototype.inspect = c;
            function c() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            }
            var d, p = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], m = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], g = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
            function y(t, e, r) {
                r.negative = e.negative ^ t.negative;
                var n = t.length + e.length | 0;
                r.length = n,
                n = n - 1 | 0;
                var i = 0 | t.words[0]
                  , o = 0 | e.words[0]
                  , s = i * o
                  , a = 67108863 & s
                  , u = s / 67108864 | 0;
                r.words[0] = a;
                for (var l = 1; l < n; l++) {
                    for (var h = u >>> 26, f = 67108863 & u, c = Math.min(l, e.length - 1), d = Math.max(0, l - t.length + 1); d <= c; d++) {
                        var p = l - d | 0;
                        h += (s = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + f) / 67108864 | 0,
                        f = 67108863 & s
                    }
                    r.words[l] = 0 | f,
                    u = 0 | h
                }
                return 0 !== u ? r.words[l] = 0 | u : r.length--,
                r._strip()
            }
            o.prototype.toString = function(t, e) {
                if (e = 0 | e || 1,
                16 === (t = t || 10) || "hex" === t) {
                    r = "";
                    for (var r, i = 0, o = 0, s = 0; s < this.length; s++) {
                        var a = this.words[s]
                          , u = ((a << i | o) & 16777215).toString(16);
                        o = a >>> 24 - i & 16777215,
                        (i += 2) >= 26 && (i -= 26,
                        s--),
                        r = 0 !== o || s !== this.length - 1 ? p[6 - u.length] + u + r : u + r
                    }
                    for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; )
                        r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r),
                    r
                }
                if (t === (0 | t) && t >= 2 && t <= 36) {
                    var l = m[t]
                      , h = g[t];
                    r = "";
                    var f = this.clone();
                    for (f.negative = 0; !f.isZero(); ) {
                        var c = f.modrn(h).toString(t);
                        r = (f = f.idivn(h)).isZero() ? c + r : p[l - c.length] + c + r
                    }
                    for (this.isZero() && (r = "0" + r); r.length % e != 0; )
                        r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r),
                    r
                }
                n(!1, "Base should be between 2 and 36")
            }
            ,
            o.prototype.toNumber = function() {
                var t = this.words[0];
                return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"),
                0 !== this.negative ? -t : t
            }
            ,
            o.prototype.toJSON = function() {
                return this.toString(16, 2)
            }
            ,
            d && (o.prototype.toBuffer = function(t, e) {
                return this.toArrayLike(d, t, e)
            }
            ),
            o.prototype.toArray = function(t, e) {
                return this.toArrayLike(Array, t, e)
            }
            ,
            o.prototype.toArrayLike = function(t, e, r) {
                this._strip();
                var i = this.byteLength()
                  , o = r || Math.max(1, i);
                n(i <= o, "byte array longer than desired length"),
                n(o > 0, "Requested array length <= 0");
                var s = t.allocUnsafe ? t.allocUnsafe(o) : new t(o);
                return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, i),
                s
            }
            ,
            o.prototype._toArrayLikeLE = function(t, e) {
                for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
                    var s = this.words[i] << o | n;
                    t[r++] = 255 & s,
                    r < t.length && (t[r++] = s >> 8 & 255),
                    r < t.length && (t[r++] = s >> 16 & 255),
                    6 === o ? (r < t.length && (t[r++] = s >> 24 & 255),
                    n = 0,
                    o = 0) : (n = s >>> 24,
                    o += 2)
                }
                if (r < t.length)
                    for (t[r++] = n; r < t.length; )
                        t[r++] = 0
            }
            ,
            o.prototype._toArrayLikeBE = function(t, e) {
                for (var r = t.length - 1, n = 0, i = 0, o = 0; i < this.length; i++) {
                    var s = this.words[i] << o | n;
                    t[r--] = 255 & s,
                    r >= 0 && (t[r--] = s >> 8 & 255),
                    r >= 0 && (t[r--] = s >> 16 & 255),
                    6 === o ? (r >= 0 && (t[r--] = s >> 24 & 255),
                    n = 0,
                    o = 0) : (n = s >>> 24,
                    o += 2)
                }
                if (r >= 0)
                    for (t[r--] = n; r >= 0; )
                        t[r--] = 0
            }
            ,
            Math.clz32 ? o.prototype._countBits = function(t) {
                return 32 - Math.clz32(t)
            }
            : o.prototype._countBits = function(t) {
                var e = t
                  , r = 0;
                return e >= 4096 && (r += 13,
                e >>>= 13),
                e >= 64 && (r += 7,
                e >>>= 7),
                e >= 8 && (r += 4,
                e >>>= 4),
                e >= 2 && (r += 2,
                e >>>= 2),
                r + e
            }
            ,
            o.prototype._zeroBits = function(t) {
                if (0 === t)
                    return 26;
                var e = t
                  , r = 0;
                return (8191 & e) == 0 && (r += 13,
                e >>>= 13),
                (127 & e) == 0 && (r += 7,
                e >>>= 7),
                (15 & e) == 0 && (r += 4,
                e >>>= 4),
                (3 & e) == 0 && (r += 2,
                e >>>= 2),
                (1 & e) == 0 && r++,
                r
            }
            ,
            o.prototype.bitLength = function() {
                var t = this.words[this.length - 1]
                  , e = this._countBits(t);
                return (this.length - 1) * 26 + e
            }
            ,
            o.prototype.zeroBits = function() {
                if (this.isZero())
                    return 0;
                for (var t = 0, e = 0; e < this.length; e++) {
                    var r = this._zeroBits(this.words[e]);
                    if (t += r,
                    26 !== r)
                        break
                }
                return t
            }
            ,
            o.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }
            ,
            o.prototype.toTwos = function(t) {
                return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
            }
            ,
            o.prototype.fromTwos = function(t) {
                return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
            }
            ,
            o.prototype.isNeg = function() {
                return 0 !== this.negative
            }
            ,
            o.prototype.neg = function() {
                return this.clone().ineg()
            }
            ,
            o.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1),
                this
            }
            ,
            o.prototype.iuor = function(t) {
                for (; this.length < t.length; )
                    this.words[this.length++] = 0;
                for (var e = 0; e < t.length; e++)
                    this.words[e] = this.words[e] | t.words[e];
                return this._strip()
            }
            ,
            o.prototype.ior = function(t) {
                return n((this.negative | t.negative) == 0),
                this.iuor(t)
            }
            ,
            o.prototype.or = function(t) {
                return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
            }
            ,
            o.prototype.uor = function(t) {
                return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
            }
            ,
            o.prototype.iuand = function(t) {
                var e;
                e = this.length > t.length ? t : this;
                for (var r = 0; r < e.length; r++)
                    this.words[r] = this.words[r] & t.words[r];
                return this.length = e.length,
                this._strip()
            }
            ,
            o.prototype.iand = function(t) {
                return n((this.negative | t.negative) == 0),
                this.iuand(t)
            }
            ,
            o.prototype.and = function(t) {
                return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
            }
            ,
            o.prototype.uand = function(t) {
                return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
            }
            ,
            o.prototype.iuxor = function(t) {
                this.length > t.length ? (e = this,
                r = t) : (e = t,
                r = this);
                for (var e, r, n = 0; n < r.length; n++)
                    this.words[n] = e.words[n] ^ r.words[n];
                if (this !== e)
                    for (; n < e.length; n++)
                        this.words[n] = e.words[n];
                return this.length = e.length,
                this._strip()
            }
            ,
            o.prototype.ixor = function(t) {
                return n((this.negative | t.negative) == 0),
                this.iuxor(t)
            }
            ,
            o.prototype.xor = function(t) {
                return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
            }
            ,
            o.prototype.uxor = function(t) {
                return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
            }
            ,
            o.prototype.inotn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = 0 | Math.ceil(t / 26)
                  , r = t % 26;
                this._expand(e),
                r > 0 && e--;
                for (var i = 0; i < e; i++)
                    this.words[i] = 67108863 & ~this.words[i];
                return r > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - r),
                this._strip()
            }
            ,
            o.prototype.notn = function(t) {
                return this.clone().inotn(t)
            }
            ,
            o.prototype.setn = function(t, e) {
                n("number" == typeof t && t >= 0);
                var r = t / 26 | 0
                  , i = t % 26;
                return this._expand(r + 1),
                e ? this.words[r] = this.words[r] | 1 << i : this.words[r] = this.words[r] & ~(1 << i),
                this._strip()
            }
            ,
            o.prototype.iadd = function(t) {
                if (0 !== this.negative && 0 === t.negative)
                    return this.negative = 0,
                    e = this.isub(t),
                    this.negative ^= 1,
                    this._normSign();
                if (0 === this.negative && 0 !== t.negative)
                    return t.negative = 0,
                    e = this.isub(t),
                    t.negative = 1,
                    e._normSign();
                this.length > t.length ? (r = this,
                n = t) : (r = t,
                n = this);
                for (var e, r, n, i = 0, o = 0; o < n.length; o++)
                    e = (0 | r.words[o]) + (0 | n.words[o]) + i,
                    this.words[o] = 67108863 & e,
                    i = e >>> 26;
                for (; 0 !== i && o < r.length; o++)
                    e = (0 | r.words[o]) + i,
                    this.words[o] = 67108863 & e,
                    i = e >>> 26;
                if (this.length = r.length,
                0 !== i)
                    this.words[this.length] = i,
                    this.length++;
                else if (r !== this)
                    for (; o < r.length; o++)
                        this.words[o] = r.words[o];
                return this
            }
            ,
            o.prototype.add = function(t) {
                var e;
                return 0 !== t.negative && 0 === this.negative ? (t.negative = 0,
                e = this.sub(t),
                t.negative ^= 1,
                e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0,
                e = t.sub(this),
                this.negative = 1,
                e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
            }
            ,
            o.prototype.isub = function(t) {
                if (0 !== t.negative) {
                    t.negative = 0;
                    var e, r, n = this.iadd(t);
                    return t.negative = 1,
                    n._normSign()
                }
                if (0 !== this.negative)
                    return this.negative = 0,
                    this.iadd(t),
                    this.negative = 1,
                    this._normSign();
                var i = this.cmp(t);
                if (0 === i)
                    return this.negative = 0,
                    this.length = 1,
                    this.words[0] = 0,
                    this;
                i > 0 ? (e = this,
                r = t) : (e = t,
                r = this);
                for (var o = 0, s = 0; s < r.length; s++)
                    o = (n = (0 | e.words[s]) - (0 | r.words[s]) + o) >> 26,
                    this.words[s] = 67108863 & n;
                for (; 0 !== o && s < e.length; s++)
                    o = (n = (0 | e.words[s]) + o) >> 26,
                    this.words[s] = 67108863 & n;
                if (0 === o && s < e.length && e !== this)
                    for (; s < e.length; s++)
                        this.words[s] = e.words[s];
                return this.length = Math.max(this.length, s),
                e !== this && (this.negative = 1),
                this._strip()
            }
            ,
            o.prototype.sub = function(t) {
                return this.clone().isub(t)
            }
            ;
            var v = function(t, e, r) {
                var n, i, o, s = t.words, a = e.words, u = r.words, l = 0, h = 0 | s[0], f = 8191 & h, c = h >>> 13, d = 0 | s[1], p = 8191 & d, m = d >>> 13, g = 0 | s[2], y = 8191 & g, v = g >>> 13, b = 0 | s[3], w = 8191 & b, E = b >>> 13, _ = 0 | s[4], x = 8191 & _, A = _ >>> 13, k = 0 | s[5], N = 8191 & k, M = k >>> 13, P = 0 | s[6], S = 8191 & P, R = P >>> 13, O = 0 | s[7], T = 8191 & O, I = O >>> 13, L = 0 | s[8], C = 8191 & L, B = L >>> 13, F = 0 | s[9], U = 8191 & F, D = F >>> 13, j = 0 | a[0], z = 8191 & j, $ = j >>> 13, q = 0 | a[1], G = 8191 & q, V = q >>> 13, H = 0 | a[2], J = 8191 & H, Z = H >>> 13, W = 0 | a[3], X = 8191 & W, K = W >>> 13, Y = 0 | a[4], Q = 8191 & Y, tt = Y >>> 13, te = 0 | a[5], tr = 8191 & te, tn = te >>> 13, ti = 0 | a[6], to = 8191 & ti, ts = ti >>> 13, ta = 0 | a[7], tu = 8191 & ta, tl = ta >>> 13, th = 0 | a[8], tf = 8191 & th, tc = th >>> 13, td = 0 | a[9], tp = 8191 & td, tm = td >>> 13;
                r.negative = t.negative ^ e.negative,
                r.length = 19;
                var tg = (l + (n = Math.imul(f, z)) | 0) + ((8191 & (i = (i = Math.imul(f, $)) + Math.imul(c, z) | 0)) << 13) | 0;
                l = ((o = Math.imul(c, $)) + (i >>> 13) | 0) + (tg >>> 26) | 0,
                tg &= 67108863,
                n = Math.imul(p, z),
                i = (i = Math.imul(p, $)) + Math.imul(m, z) | 0,
                o = Math.imul(m, $);
                var ty = (l + (n = n + Math.imul(f, G) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, V) | 0) + Math.imul(c, G) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, V) | 0) + (i >>> 13) | 0) + (ty >>> 26) | 0,
                ty &= 67108863,
                n = Math.imul(y, z),
                i = (i = Math.imul(y, $)) + Math.imul(v, z) | 0,
                o = Math.imul(v, $),
                n = n + Math.imul(p, G) | 0,
                i = (i = i + Math.imul(p, V) | 0) + Math.imul(m, G) | 0,
                o = o + Math.imul(m, V) | 0;
                var tv = (l + (n = n + Math.imul(f, J) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, Z) | 0) + Math.imul(c, J) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, Z) | 0) + (i >>> 13) | 0) + (tv >>> 26) | 0,
                tv &= 67108863,
                n = Math.imul(w, z),
                i = (i = Math.imul(w, $)) + Math.imul(E, z) | 0,
                o = Math.imul(E, $),
                n = n + Math.imul(y, G) | 0,
                i = (i = i + Math.imul(y, V) | 0) + Math.imul(v, G) | 0,
                o = o + Math.imul(v, V) | 0,
                n = n + Math.imul(p, J) | 0,
                i = (i = i + Math.imul(p, Z) | 0) + Math.imul(m, J) | 0,
                o = o + Math.imul(m, Z) | 0;
                var tb = (l + (n = n + Math.imul(f, X) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, K) | 0) + Math.imul(c, X) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, K) | 0) + (i >>> 13) | 0) + (tb >>> 26) | 0,
                tb &= 67108863,
                n = Math.imul(x, z),
                i = (i = Math.imul(x, $)) + Math.imul(A, z) | 0,
                o = Math.imul(A, $),
                n = n + Math.imul(w, G) | 0,
                i = (i = i + Math.imul(w, V) | 0) + Math.imul(E, G) | 0,
                o = o + Math.imul(E, V) | 0,
                n = n + Math.imul(y, J) | 0,
                i = (i = i + Math.imul(y, Z) | 0) + Math.imul(v, J) | 0,
                o = o + Math.imul(v, Z) | 0,
                n = n + Math.imul(p, X) | 0,
                i = (i = i + Math.imul(p, K) | 0) + Math.imul(m, X) | 0,
                o = o + Math.imul(m, K) | 0;
                var tw = (l + (n = n + Math.imul(f, Q) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, tt) | 0) + Math.imul(c, Q) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, tt) | 0) + (i >>> 13) | 0) + (tw >>> 26) | 0,
                tw &= 67108863,
                n = Math.imul(N, z),
                i = (i = Math.imul(N, $)) + Math.imul(M, z) | 0,
                o = Math.imul(M, $),
                n = n + Math.imul(x, G) | 0,
                i = (i = i + Math.imul(x, V) | 0) + Math.imul(A, G) | 0,
                o = o + Math.imul(A, V) | 0,
                n = n + Math.imul(w, J) | 0,
                i = (i = i + Math.imul(w, Z) | 0) + Math.imul(E, J) | 0,
                o = o + Math.imul(E, Z) | 0,
                n = n + Math.imul(y, X) | 0,
                i = (i = i + Math.imul(y, K) | 0) + Math.imul(v, X) | 0,
                o = o + Math.imul(v, K) | 0,
                n = n + Math.imul(p, Q) | 0,
                i = (i = i + Math.imul(p, tt) | 0) + Math.imul(m, Q) | 0,
                o = o + Math.imul(m, tt) | 0;
                var tE = (l + (n = n + Math.imul(f, tr) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, tn) | 0) + Math.imul(c, tr) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, tn) | 0) + (i >>> 13) | 0) + (tE >>> 26) | 0,
                tE &= 67108863,
                n = Math.imul(S, z),
                i = (i = Math.imul(S, $)) + Math.imul(R, z) | 0,
                o = Math.imul(R, $),
                n = n + Math.imul(N, G) | 0,
                i = (i = i + Math.imul(N, V) | 0) + Math.imul(M, G) | 0,
                o = o + Math.imul(M, V) | 0,
                n = n + Math.imul(x, J) | 0,
                i = (i = i + Math.imul(x, Z) | 0) + Math.imul(A, J) | 0,
                o = o + Math.imul(A, Z) | 0,
                n = n + Math.imul(w, X) | 0,
                i = (i = i + Math.imul(w, K) | 0) + Math.imul(E, X) | 0,
                o = o + Math.imul(E, K) | 0,
                n = n + Math.imul(y, Q) | 0,
                i = (i = i + Math.imul(y, tt) | 0) + Math.imul(v, Q) | 0,
                o = o + Math.imul(v, tt) | 0,
                n = n + Math.imul(p, tr) | 0,
                i = (i = i + Math.imul(p, tn) | 0) + Math.imul(m, tr) | 0,
                o = o + Math.imul(m, tn) | 0;
                var t_ = (l + (n = n + Math.imul(f, to) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, ts) | 0) + Math.imul(c, to) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, ts) | 0) + (i >>> 13) | 0) + (t_ >>> 26) | 0,
                t_ &= 67108863,
                n = Math.imul(T, z),
                i = (i = Math.imul(T, $)) + Math.imul(I, z) | 0,
                o = Math.imul(I, $),
                n = n + Math.imul(S, G) | 0,
                i = (i = i + Math.imul(S, V) | 0) + Math.imul(R, G) | 0,
                o = o + Math.imul(R, V) | 0,
                n = n + Math.imul(N, J) | 0,
                i = (i = i + Math.imul(N, Z) | 0) + Math.imul(M, J) | 0,
                o = o + Math.imul(M, Z) | 0,
                n = n + Math.imul(x, X) | 0,
                i = (i = i + Math.imul(x, K) | 0) + Math.imul(A, X) | 0,
                o = o + Math.imul(A, K) | 0,
                n = n + Math.imul(w, Q) | 0,
                i = (i = i + Math.imul(w, tt) | 0) + Math.imul(E, Q) | 0,
                o = o + Math.imul(E, tt) | 0,
                n = n + Math.imul(y, tr) | 0,
                i = (i = i + Math.imul(y, tn) | 0) + Math.imul(v, tr) | 0,
                o = o + Math.imul(v, tn) | 0,
                n = n + Math.imul(p, to) | 0,
                i = (i = i + Math.imul(p, ts) | 0) + Math.imul(m, to) | 0,
                o = o + Math.imul(m, ts) | 0;
                var tx = (l + (n = n + Math.imul(f, tu) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, tl) | 0) + Math.imul(c, tu) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, tl) | 0) + (i >>> 13) | 0) + (tx >>> 26) | 0,
                tx &= 67108863,
                n = Math.imul(C, z),
                i = (i = Math.imul(C, $)) + Math.imul(B, z) | 0,
                o = Math.imul(B, $),
                n = n + Math.imul(T, G) | 0,
                i = (i = i + Math.imul(T, V) | 0) + Math.imul(I, G) | 0,
                o = o + Math.imul(I, V) | 0,
                n = n + Math.imul(S, J) | 0,
                i = (i = i + Math.imul(S, Z) | 0) + Math.imul(R, J) | 0,
                o = o + Math.imul(R, Z) | 0,
                n = n + Math.imul(N, X) | 0,
                i = (i = i + Math.imul(N, K) | 0) + Math.imul(M, X) | 0,
                o = o + Math.imul(M, K) | 0,
                n = n + Math.imul(x, Q) | 0,
                i = (i = i + Math.imul(x, tt) | 0) + Math.imul(A, Q) | 0,
                o = o + Math.imul(A, tt) | 0,
                n = n + Math.imul(w, tr) | 0,
                i = (i = i + Math.imul(w, tn) | 0) + Math.imul(E, tr) | 0,
                o = o + Math.imul(E, tn) | 0,
                n = n + Math.imul(y, to) | 0,
                i = (i = i + Math.imul(y, ts) | 0) + Math.imul(v, to) | 0,
                o = o + Math.imul(v, ts) | 0,
                n = n + Math.imul(p, tu) | 0,
                i = (i = i + Math.imul(p, tl) | 0) + Math.imul(m, tu) | 0,
                o = o + Math.imul(m, tl) | 0;
                var tA = (l + (n = n + Math.imul(f, tf) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, tc) | 0) + Math.imul(c, tf) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, tc) | 0) + (i >>> 13) | 0) + (tA >>> 26) | 0,
                tA &= 67108863,
                n = Math.imul(U, z),
                i = (i = Math.imul(U, $)) + Math.imul(D, z) | 0,
                o = Math.imul(D, $),
                n = n + Math.imul(C, G) | 0,
                i = (i = i + Math.imul(C, V) | 0) + Math.imul(B, G) | 0,
                o = o + Math.imul(B, V) | 0,
                n = n + Math.imul(T, J) | 0,
                i = (i = i + Math.imul(T, Z) | 0) + Math.imul(I, J) | 0,
                o = o + Math.imul(I, Z) | 0,
                n = n + Math.imul(S, X) | 0,
                i = (i = i + Math.imul(S, K) | 0) + Math.imul(R, X) | 0,
                o = o + Math.imul(R, K) | 0,
                n = n + Math.imul(N, Q) | 0,
                i = (i = i + Math.imul(N, tt) | 0) + Math.imul(M, Q) | 0,
                o = o + Math.imul(M, tt) | 0,
                n = n + Math.imul(x, tr) | 0,
                i = (i = i + Math.imul(x, tn) | 0) + Math.imul(A, tr) | 0,
                o = o + Math.imul(A, tn) | 0,
                n = n + Math.imul(w, to) | 0,
                i = (i = i + Math.imul(w, ts) | 0) + Math.imul(E, to) | 0,
                o = o + Math.imul(E, ts) | 0,
                n = n + Math.imul(y, tu) | 0,
                i = (i = i + Math.imul(y, tl) | 0) + Math.imul(v, tu) | 0,
                o = o + Math.imul(v, tl) | 0,
                n = n + Math.imul(p, tf) | 0,
                i = (i = i + Math.imul(p, tc) | 0) + Math.imul(m, tf) | 0,
                o = o + Math.imul(m, tc) | 0;
                var tk = (l + (n = n + Math.imul(f, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(f, tm) | 0) + Math.imul(c, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(c, tm) | 0) + (i >>> 13) | 0) + (tk >>> 26) | 0,
                tk &= 67108863,
                n = Math.imul(U, G),
                i = (i = Math.imul(U, V)) + Math.imul(D, G) | 0,
                o = Math.imul(D, V),
                n = n + Math.imul(C, J) | 0,
                i = (i = i + Math.imul(C, Z) | 0) + Math.imul(B, J) | 0,
                o = o + Math.imul(B, Z) | 0,
                n = n + Math.imul(T, X) | 0,
                i = (i = i + Math.imul(T, K) | 0) + Math.imul(I, X) | 0,
                o = o + Math.imul(I, K) | 0,
                n = n + Math.imul(S, Q) | 0,
                i = (i = i + Math.imul(S, tt) | 0) + Math.imul(R, Q) | 0,
                o = o + Math.imul(R, tt) | 0,
                n = n + Math.imul(N, tr) | 0,
                i = (i = i + Math.imul(N, tn) | 0) + Math.imul(M, tr) | 0,
                o = o + Math.imul(M, tn) | 0,
                n = n + Math.imul(x, to) | 0,
                i = (i = i + Math.imul(x, ts) | 0) + Math.imul(A, to) | 0,
                o = o + Math.imul(A, ts) | 0,
                n = n + Math.imul(w, tu) | 0,
                i = (i = i + Math.imul(w, tl) | 0) + Math.imul(E, tu) | 0,
                o = o + Math.imul(E, tl) | 0,
                n = n + Math.imul(y, tf) | 0,
                i = (i = i + Math.imul(y, tc) | 0) + Math.imul(v, tf) | 0,
                o = o + Math.imul(v, tc) | 0;
                var tN = (l + (n = n + Math.imul(p, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p, tm) | 0) + Math.imul(m, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(m, tm) | 0) + (i >>> 13) | 0) + (tN >>> 26) | 0,
                tN &= 67108863,
                n = Math.imul(U, J),
                i = (i = Math.imul(U, Z)) + Math.imul(D, J) | 0,
                o = Math.imul(D, Z),
                n = n + Math.imul(C, X) | 0,
                i = (i = i + Math.imul(C, K) | 0) + Math.imul(B, X) | 0,
                o = o + Math.imul(B, K) | 0,
                n = n + Math.imul(T, Q) | 0,
                i = (i = i + Math.imul(T, tt) | 0) + Math.imul(I, Q) | 0,
                o = o + Math.imul(I, tt) | 0,
                n = n + Math.imul(S, tr) | 0,
                i = (i = i + Math.imul(S, tn) | 0) + Math.imul(R, tr) | 0,
                o = o + Math.imul(R, tn) | 0,
                n = n + Math.imul(N, to) | 0,
                i = (i = i + Math.imul(N, ts) | 0) + Math.imul(M, to) | 0,
                o = o + Math.imul(M, ts) | 0,
                n = n + Math.imul(x, tu) | 0,
                i = (i = i + Math.imul(x, tl) | 0) + Math.imul(A, tu) | 0,
                o = o + Math.imul(A, tl) | 0,
                n = n + Math.imul(w, tf) | 0,
                i = (i = i + Math.imul(w, tc) | 0) + Math.imul(E, tf) | 0,
                o = o + Math.imul(E, tc) | 0;
                var tM = (l + (n = n + Math.imul(y, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(y, tm) | 0) + Math.imul(v, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(v, tm) | 0) + (i >>> 13) | 0) + (tM >>> 26) | 0,
                tM &= 67108863,
                n = Math.imul(U, X),
                i = (i = Math.imul(U, K)) + Math.imul(D, X) | 0,
                o = Math.imul(D, K),
                n = n + Math.imul(C, Q) | 0,
                i = (i = i + Math.imul(C, tt) | 0) + Math.imul(B, Q) | 0,
                o = o + Math.imul(B, tt) | 0,
                n = n + Math.imul(T, tr) | 0,
                i = (i = i + Math.imul(T, tn) | 0) + Math.imul(I, tr) | 0,
                o = o + Math.imul(I, tn) | 0,
                n = n + Math.imul(S, to) | 0,
                i = (i = i + Math.imul(S, ts) | 0) + Math.imul(R, to) | 0,
                o = o + Math.imul(R, ts) | 0,
                n = n + Math.imul(N, tu) | 0,
                i = (i = i + Math.imul(N, tl) | 0) + Math.imul(M, tu) | 0,
                o = o + Math.imul(M, tl) | 0,
                n = n + Math.imul(x, tf) | 0,
                i = (i = i + Math.imul(x, tc) | 0) + Math.imul(A, tf) | 0,
                o = o + Math.imul(A, tc) | 0;
                var tP = (l + (n = n + Math.imul(w, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w, tm) | 0) + Math.imul(E, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(E, tm) | 0) + (i >>> 13) | 0) + (tP >>> 26) | 0,
                tP &= 67108863,
                n = Math.imul(U, Q),
                i = (i = Math.imul(U, tt)) + Math.imul(D, Q) | 0,
                o = Math.imul(D, tt),
                n = n + Math.imul(C, tr) | 0,
                i = (i = i + Math.imul(C, tn) | 0) + Math.imul(B, tr) | 0,
                o = o + Math.imul(B, tn) | 0,
                n = n + Math.imul(T, to) | 0,
                i = (i = i + Math.imul(T, ts) | 0) + Math.imul(I, to) | 0,
                o = o + Math.imul(I, ts) | 0,
                n = n + Math.imul(S, tu) | 0,
                i = (i = i + Math.imul(S, tl) | 0) + Math.imul(R, tu) | 0,
                o = o + Math.imul(R, tl) | 0,
                n = n + Math.imul(N, tf) | 0,
                i = (i = i + Math.imul(N, tc) | 0) + Math.imul(M, tf) | 0,
                o = o + Math.imul(M, tc) | 0;
                var tS = (l + (n = n + Math.imul(x, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(x, tm) | 0) + Math.imul(A, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(A, tm) | 0) + (i >>> 13) | 0) + (tS >>> 26) | 0,
                tS &= 67108863,
                n = Math.imul(U, tr),
                i = (i = Math.imul(U, tn)) + Math.imul(D, tr) | 0,
                o = Math.imul(D, tn),
                n = n + Math.imul(C, to) | 0,
                i = (i = i + Math.imul(C, ts) | 0) + Math.imul(B, to) | 0,
                o = o + Math.imul(B, ts) | 0,
                n = n + Math.imul(T, tu) | 0,
                i = (i = i + Math.imul(T, tl) | 0) + Math.imul(I, tu) | 0,
                o = o + Math.imul(I, tl) | 0,
                n = n + Math.imul(S, tf) | 0,
                i = (i = i + Math.imul(S, tc) | 0) + Math.imul(R, tf) | 0,
                o = o + Math.imul(R, tc) | 0;
                var tR = (l + (n = n + Math.imul(N, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(N, tm) | 0) + Math.imul(M, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(M, tm) | 0) + (i >>> 13) | 0) + (tR >>> 26) | 0,
                tR &= 67108863,
                n = Math.imul(U, to),
                i = (i = Math.imul(U, ts)) + Math.imul(D, to) | 0,
                o = Math.imul(D, ts),
                n = n + Math.imul(C, tu) | 0,
                i = (i = i + Math.imul(C, tl) | 0) + Math.imul(B, tu) | 0,
                o = o + Math.imul(B, tl) | 0,
                n = n + Math.imul(T, tf) | 0,
                i = (i = i + Math.imul(T, tc) | 0) + Math.imul(I, tf) | 0,
                o = o + Math.imul(I, tc) | 0;
                var tO = (l + (n = n + Math.imul(S, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(S, tm) | 0) + Math.imul(R, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(R, tm) | 0) + (i >>> 13) | 0) + (tO >>> 26) | 0,
                tO &= 67108863,
                n = Math.imul(U, tu),
                i = (i = Math.imul(U, tl)) + Math.imul(D, tu) | 0,
                o = Math.imul(D, tl),
                n = n + Math.imul(C, tf) | 0,
                i = (i = i + Math.imul(C, tc) | 0) + Math.imul(B, tf) | 0,
                o = o + Math.imul(B, tc) | 0;
                var tT = (l + (n = n + Math.imul(T, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(T, tm) | 0) + Math.imul(I, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(I, tm) | 0) + (i >>> 13) | 0) + (tT >>> 26) | 0,
                tT &= 67108863,
                n = Math.imul(U, tf),
                i = (i = Math.imul(U, tc)) + Math.imul(D, tf) | 0,
                o = Math.imul(D, tc);
                var tI = (l + (n = n + Math.imul(C, tp) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(C, tm) | 0) + Math.imul(B, tp) | 0)) << 13) | 0;
                l = ((o = o + Math.imul(B, tm) | 0) + (i >>> 13) | 0) + (tI >>> 26) | 0,
                tI &= 67108863;
                var tL = (l + (n = Math.imul(U, tp)) | 0) + ((8191 & (i = (i = Math.imul(U, tm)) + Math.imul(D, tp) | 0)) << 13) | 0;
                return l = ((o = Math.imul(D, tm)) + (i >>> 13) | 0) + (tL >>> 26) | 0,
                tL &= 67108863,
                u[0] = tg,
                u[1] = ty,
                u[2] = tv,
                u[3] = tb,
                u[4] = tw,
                u[5] = tE,
                u[6] = t_,
                u[7] = tx,
                u[8] = tA,
                u[9] = tk,
                u[10] = tN,
                u[11] = tM,
                u[12] = tP,
                u[13] = tS,
                u[14] = tR,
                u[15] = tO,
                u[16] = tT,
                u[17] = tI,
                u[18] = tL,
                0 !== l && (u[19] = l,
                r.length++),
                r
            };
            function b(t, e, r) {
                r.negative = e.negative ^ t.negative,
                r.length = t.length + e.length;
                for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
                    var s = i;
                    i = 0;
                    for (var a = 67108863 & n, u = Math.min(o, e.length - 1), l = Math.max(0, o - t.length + 1); l <= u; l++) {
                        var h = o - l
                          , f = (0 | t.words[h]) * (0 | e.words[l])
                          , c = 67108863 & f;
                        s = s + (f / 67108864 | 0) | 0,
                        a = 67108863 & (c = c + a | 0),
                        i += (s = s + (c >>> 26) | 0) >>> 26,
                        s &= 67108863
                    }
                    r.words[o] = a,
                    n = s,
                    s = i
                }
                return 0 !== n ? r.words[o] = n : r.length--,
                r._strip()
            }
            function w(t, e) {
                this.x = t,
                this.y = e
            }
            Math.imul || (v = y),
            o.prototype.mulTo = function(t, e) {
                var r, n = this.length + t.length;
                return 10 === this.length && 10 === t.length ? v(this, t, e) : n < 63 ? y(this, t, e) : b(this, t, e)
            }
            ,
            w.prototype.makeRBT = function(t) {
                for (var e = Array(t), r = o.prototype._countBits(t) - 1, n = 0; n < t; n++)
                    e[n] = this.revBin(n, r, t);
                return e
            }
            ,
            w.prototype.revBin = function(t, e, r) {
                if (0 === t || t === r - 1)
                    return t;
                for (var n = 0, i = 0; i < e; i++)
                    n |= (1 & t) << e - i - 1,
                    t >>= 1;
                return n
            }
            ,
            w.prototype.permute = function(t, e, r, n, i, o) {
                for (var s = 0; s < o; s++)
                    n[s] = e[t[s]],
                    i[s] = r[t[s]]
            }
            ,
            w.prototype.transform = function(t, e, r, n, i, o) {
                this.permute(o, t, e, r, n, i);
                for (var s = 1; s < i; s <<= 1)
                    for (var a = s << 1, u = Math.cos(2 * Math.PI / a), l = Math.sin(2 * Math.PI / a), h = 0; h < i; h += a)
                        for (var f = u, c = l, d = 0; d < s; d++) {
                            var p = r[h + d]
                              , m = n[h + d]
                              , g = r[h + d + s]
                              , y = n[h + d + s]
                              , v = f * g - c * y;
                            y = f * y + c * g,
                            g = v,
                            r[h + d] = p + g,
                            n[h + d] = m + y,
                            r[h + d + s] = p - g,
                            n[h + d + s] = m - y,
                            d !== a && (v = u * f - l * c,
                            c = u * c + l * f,
                            f = v)
                        }
            }
            ,
            w.prototype.guessLen13b = function(t, e) {
                var r = 1 | Math.max(e, t)
                  , n = 1 & r
                  , i = 0;
                for (r = r / 2 | 0; r; r >>>= 1)
                    i++;
                return 1 << i + 1 + n
            }
            ,
            w.prototype.conjugate = function(t, e, r) {
                if (!(r <= 1))
                    for (var n = 0; n < r / 2; n++) {
                        var i = t[n];
                        t[n] = t[r - n - 1],
                        t[r - n - 1] = i,
                        i = e[n],
                        e[n] = -e[r - n - 1],
                        e[r - n - 1] = -i
                    }
            }
            ,
            w.prototype.normalize13b = function(t, e) {
                for (var r = 0, n = 0; n < e / 2; n++) {
                    var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
                    t[n] = 67108863 & i,
                    r = i < 67108864 ? 0 : i / 67108864 | 0
                }
                return t
            }
            ,
            w.prototype.convert13b = function(t, e, r, i) {
                for (var o = 0, s = 0; s < e; s++)
                    o += 0 | t[s],
                    r[2 * s] = 8191 & o,
                    o >>>= 13,
                    r[2 * s + 1] = 8191 & o,
                    o >>>= 13;
                for (s = 2 * e; s < i; ++s)
                    r[s] = 0;
                n(0 === o),
                n((-8192 & o) == 0)
            }
            ,
            w.prototype.stub = function(t) {
                for (var e = Array(t), r = 0; r < t; r++)
                    e[r] = 0;
                return e
            }
            ,
            w.prototype.mulp = function(t, e, r) {
                var n = 2 * this.guessLen13b(t.length, e.length)
                  , i = this.makeRBT(n)
                  , o = this.stub(n)
                  , s = Array(n)
                  , a = Array(n)
                  , u = Array(n)
                  , l = Array(n)
                  , h = Array(n)
                  , f = Array(n)
                  , c = r.words;
                c.length = n,
                this.convert13b(t.words, t.length, s, n),
                this.convert13b(e.words, e.length, l, n),
                this.transform(s, o, a, u, n, i),
                this.transform(l, o, h, f, n, i);
                for (var d = 0; d < n; d++) {
                    var p = a[d] * h[d] - u[d] * f[d];
                    u[d] = a[d] * f[d] + u[d] * h[d],
                    a[d] = p
                }
                return this.conjugate(a, u, n),
                this.transform(a, u, c, o, n, i),
                this.conjugate(c, o, n),
                this.normalize13b(c, n),
                r.negative = t.negative ^ e.negative,
                r.length = t.length + e.length,
                r._strip()
            }
            ,
            o.prototype.mul = function(t) {
                var e = new o(null);
                return e.words = Array(this.length + t.length),
                this.mulTo(t, e)
            }
            ,
            o.prototype.mulf = function(t) {
                var e = new o(null);
                return e.words = Array(this.length + t.length),
                b(this, t, e)
            }
            ,
            o.prototype.imul = function(t) {
                return this.clone().mulTo(t, this)
            }
            ,
            o.prototype.imuln = function(t) {
                var e = t < 0;
                e && (t = -t),
                n("number" == typeof t),
                n(t < 67108864);
                for (var r = 0, i = 0; i < this.length; i++) {
                    var o = (0 | this.words[i]) * t
                      , s = (67108863 & o) + (67108863 & r);
                    r >>= 26,
                    r += o / 67108864 | 0,
                    r += s >>> 26,
                    this.words[i] = 67108863 & s
                }
                return 0 !== r && (this.words[i] = r,
                this.length++),
                e ? this.ineg() : this
            }
            ,
            o.prototype.muln = function(t) {
                return this.clone().imuln(t)
            }
            ,
            o.prototype.sqr = function() {
                return this.mul(this)
            }
            ,
            o.prototype.isqr = function() {
                return this.imul(this.clone())
            }
            ,
            o.prototype.pow = function(t) {
                var e = function(t) {
                    for (var e = Array(t.bitLength()), r = 0; r < e.length; r++) {
                        var n = r / 26 | 0
                          , i = r % 26;
                        e[r] = t.words[n] >>> i & 1
                    }
                    return e
                }(t);
                if (0 === e.length)
                    return new o(1);
                for (var r = this, n = 0; n < e.length && 0 === e[n]; n++,
                r = r.sqr())
                    ;
                if (++n < e.length)
                    for (var i = r.sqr(); n < e.length; n++,
                    i = i.sqr())
                        0 !== e[n] && (r = r.mul(i));
                return r
            }
            ,
            o.prototype.iushln = function(t) {
                n("number" == typeof t && t >= 0);
                var e, r = t % 26, i = (t - r) / 26, o = 67108863 >>> 26 - r << 26 - r;
                if (0 !== r) {
                    var s = 0;
                    for (e = 0; e < this.length; e++) {
                        var a = this.words[e] & o
                          , u = (0 | this.words[e]) - a << r;
                        this.words[e] = u | s,
                        s = a >>> 26 - r
                    }
                    s && (this.words[e] = s,
                    this.length++)
                }
                if (0 !== i) {
                    for (e = this.length - 1; e >= 0; e--)
                        this.words[e + i] = this.words[e];
                    for (e = 0; e < i; e++)
                        this.words[e] = 0;
                    this.length += i
                }
                return this._strip()
            }
            ,
            o.prototype.ishln = function(t) {
                return n(0 === this.negative),
                this.iushln(t)
            }
            ,
            o.prototype.iushrn = function(t, e, r) {
                n("number" == typeof t && t >= 0),
                i = e ? (e - e % 26) / 26 : 0;
                var i, o = t % 26, s = Math.min((t - o) / 26, this.length), a = 67108863 ^ 67108863 >>> o << o, u = r;
                if (i -= s,
                i = Math.max(0, i),
                u) {
                    for (var l = 0; l < s; l++)
                        u.words[l] = this.words[l];
                    u.length = s
                }
                if (0 === s)
                    ;
                else if (this.length > s)
                    for (this.length -= s,
                    l = 0; l < this.length; l++)
                        this.words[l] = this.words[l + s];
                else
                    this.words[0] = 0,
                    this.length = 1;
                var h = 0;
                for (l = this.length - 1; l >= 0 && (0 !== h || l >= i); l--) {
                    var f = 0 | this.words[l];
                    this.words[l] = h << 26 - o | f >>> o,
                    h = f & a
                }
                return u && 0 !== h && (u.words[u.length++] = h),
                0 === this.length && (this.words[0] = 0,
                this.length = 1),
                this._strip()
            }
            ,
            o.prototype.ishrn = function(t, e, r) {
                return n(0 === this.negative),
                this.iushrn(t, e, r)
            }
            ,
            o.prototype.shln = function(t) {
                return this.clone().ishln(t)
            }
            ,
            o.prototype.ushln = function(t) {
                return this.clone().iushln(t)
            }
            ,
            o.prototype.shrn = function(t) {
                return this.clone().ishrn(t)
            }
            ,
            o.prototype.ushrn = function(t) {
                return this.clone().iushrn(t)
            }
            ,
            o.prototype.testn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26
                  , r = (t - e) / 26;
                return !(this.length <= r) && !!(this.words[r] & 1 << e)
            }
            ,
            o.prototype.imaskn = function(t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26
                  , r = (t - e) / 26;
                return (n(0 === this.negative, "imaskn works only with positive numbers"),
                this.length <= r) ? this : (0 !== e && r++,
                this.length = Math.min(r, this.length),
                0 !== e && (this.words[this.length - 1] &= 67108863 ^ 67108863 >>> e << e),
                this._strip())
            }
            ,
            o.prototype.maskn = function(t) {
                return this.clone().imaskn(t)
            }
            ,
            o.prototype.iaddn = function(t) {
                return (n("number" == typeof t),
                n(t < 67108864),
                t < 0) ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (0 | this.words[0]),
                this.negative = 0,
                this) : (this.negative = 0,
                this.isubn(t),
                this.negative = 1,
                this) : this._iaddn(t)
            }
            ,
            o.prototype._iaddn = function(t) {
                this.words[0] += t;
                for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
                    this.words[e] -= 67108864,
                    e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                return this.length = Math.max(this.length, e + 1),
                this
            }
            ,
            o.prototype.isubn = function(t) {
                if (n("number" == typeof t),
                n(t < 67108864),
                t < 0)
                    return this.iaddn(-t);
                if (0 !== this.negative)
                    return this.negative = 0,
                    this.iaddn(t),
                    this.negative = 1,
                    this;
                if (this.words[0] -= t,
                1 === this.length && this.words[0] < 0)
                    this.words[0] = -this.words[0],
                    this.negative = 1;
                else
                    for (var e = 0; e < this.length && this.words[e] < 0; e++)
                        this.words[e] += 67108864,
                        this.words[e + 1] -= 1;
                return this._strip()
            }
            ,
            o.prototype.addn = function(t) {
                return this.clone().iaddn(t)
            }
            ,
            o.prototype.subn = function(t) {
                return this.clone().isubn(t)
            }
            ,
            o.prototype.iabs = function() {
                return this.negative = 0,
                this
            }
            ,
            o.prototype.abs = function() {
                return this.clone().iabs()
            }
            ,
            o.prototype._ishlnsubmul = function(t, e, r) {
                var i, o, s = t.length + r;
                this._expand(s);
                var a = 0;
                for (i = 0; i < t.length; i++) {
                    o = (0 | this.words[i + r]) + a;
                    var u = (0 | t.words[i]) * e;
                    o -= 67108863 & u,
                    a = (o >> 26) - (u / 67108864 | 0),
                    this.words[i + r] = 67108863 & o
                }
                for (; i < this.length - r; i++)
                    a = (o = (0 | this.words[i + r]) + a) >> 26,
                    this.words[i + r] = 67108863 & o;
                if (0 === a)
                    return this._strip();
                for (n(-1 === a),
                a = 0,
                i = 0; i < this.length; i++)
                    a = (o = -(0 | this.words[i]) + a) >> 26,
                    this.words[i] = 67108863 & o;
                return this.negative = 1,
                this._strip()
            }
            ,
            o.prototype._wordDiv = function(t, e) {
                var r, n = this.length - t.length, i = this.clone(), s = t, a = 0 | s.words[s.length - 1];
                0 != (n = 26 - this._countBits(a)) && (s = s.ushln(n),
                i.iushln(n),
                a = 0 | s.words[s.length - 1]);
                var u = i.length - s.length;
                if ("mod" !== e) {
                    (r = new o(null)).length = u + 1,
                    r.words = Array(r.length);
                    for (var l = 0; l < r.length; l++)
                        r.words[l] = 0
                }
                var h = i.clone()._ishlnsubmul(s, 1, u);
                0 === h.negative && (i = h,
                r && (r.words[u] = 1));
                for (var f = u - 1; f >= 0; f--) {
                    var c = (0 | i.words[s.length + f]) * 67108864 + (0 | i.words[s.length + f - 1]);
                    for (c = Math.min(c / a | 0, 67108863),
                    i._ishlnsubmul(s, c, f); 0 !== i.negative; )
                        c--,
                        i.negative = 0,
                        i._ishlnsubmul(s, 1, f),
                        i.isZero() || (i.negative ^= 1);
                    r && (r.words[f] = c)
                }
                return r && r._strip(),
                i._strip(),
                "div" !== e && 0 !== n && i.iushrn(n),
                {
                    div: r || null,
                    mod: i
                }
            }
            ,
            o.prototype.divmod = function(t, e, r) {
                var i, s, a;
                return (n(!t.isZero()),
                this.isZero()) ? {
                    div: new o(0),
                    mod: new o(0)
                } : 0 !== this.negative && 0 === t.negative ? (a = this.neg().divmod(t, e),
                "mod" !== e && (i = a.div.neg()),
                "div" !== e && (s = a.mod.neg(),
                r && 0 !== s.negative && s.iadd(t)),
                {
                    div: i,
                    mod: s
                }) : 0 === this.negative && 0 !== t.negative ? (a = this.divmod(t.neg(), e),
                "mod" !== e && (i = a.div.neg()),
                {
                    div: i,
                    mod: a.mod
                }) : (this.negative & t.negative) != 0 ? (a = this.neg().divmod(t.neg(), e),
                "div" !== e && (s = a.mod.neg(),
                r && 0 !== s.negative && s.isub(t)),
                {
                    div: a.div,
                    mod: s
                }) : t.length > this.length || 0 > this.cmp(t) ? {
                    div: new o(0),
                    mod: this
                } : 1 === t.length ? "div" === e ? {
                    div: this.divn(t.words[0]),
                    mod: null
                } : "mod" === e ? {
                    div: null,
                    mod: new o(this.modrn(t.words[0]))
                } : {
                    div: this.divn(t.words[0]),
                    mod: new o(this.modrn(t.words[0]))
                } : this._wordDiv(t, e)
            }
            ,
            o.prototype.div = function(t) {
                return this.divmod(t, "div", !1).div
            }
            ,
            o.prototype.mod = function(t) {
                return this.divmod(t, "mod", !1).mod
            }
            ,
            o.prototype.umod = function(t) {
                return this.divmod(t, "mod", !0).mod
            }
            ,
            o.prototype.divRound = function(t) {
                var e = this.divmod(t);
                if (e.mod.isZero())
                    return e.div;
                var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod
                  , n = t.ushrn(1)
                  , i = t.andln(1)
                  , o = r.cmp(n);
                return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
            }
            ,
            o.prototype.modrn = function(t) {
                var e = t < 0;
                e && (t = -t),
                n(t <= 67108863);
                for (var r = 67108864 % t, i = 0, o = this.length - 1; o >= 0; o--)
                    i = (r * i + (0 | this.words[o])) % t;
                return e ? -i : i
            }
            ,
            o.prototype.modn = function(t) {
                return this.modrn(t)
            }
            ,
            o.prototype.idivn = function(t) {
                var e = t < 0;
                e && (t = -t),
                n(t <= 67108863);
                for (var r = 0, i = this.length - 1; i >= 0; i--) {
                    var o = (0 | this.words[i]) + 67108864 * r;
                    this.words[i] = o / t | 0,
                    r = o % t
                }
                return this._strip(),
                e ? this.ineg() : this
            }
            ,
            o.prototype.divn = function(t) {
                return this.clone().idivn(t)
            }
            ,
            o.prototype.egcd = function(t) {
                n(0 === t.negative),
                n(!t.isZero());
                var e = this
                  , r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var i = new o(1), s = new o(0), a = new o(0), u = new o(1), l = 0; e.isEven() && r.isEven(); )
                    e.iushrn(1),
                    r.iushrn(1),
                    ++l;
                for (var h = r.clone(), f = e.clone(); !e.isZero(); ) {
                    for (var c = 0, d = 1; (e.words[0] & d) == 0 && c < 26; ++c,
                    d <<= 1)
                        ;
                    if (c > 0)
                        for (e.iushrn(c); c-- > 0; )
                            (i.isOdd() || s.isOdd()) && (i.iadd(h),
                            s.isub(f)),
                            i.iushrn(1),
                            s.iushrn(1);
                    for (var p = 0, m = 1; (r.words[0] & m) == 0 && p < 26; ++p,
                    m <<= 1)
                        ;
                    if (p > 0)
                        for (r.iushrn(p); p-- > 0; )
                            (a.isOdd() || u.isOdd()) && (a.iadd(h),
                            u.isub(f)),
                            a.iushrn(1),
                            u.iushrn(1);
                    e.cmp(r) >= 0 ? (e.isub(r),
                    i.isub(a),
                    s.isub(u)) : (r.isub(e),
                    a.isub(i),
                    u.isub(s))
                }
                return {
                    a: a,
                    b: u,
                    gcd: r.iushln(l)
                }
            }
            ,
            o.prototype._invmp = function(t) {
                n(0 === t.negative),
                n(!t.isZero());
                var e, r = this, i = t.clone();
                r = 0 !== r.negative ? r.umod(t) : r.clone();
                for (var s = new o(1), a = new o(0), u = i.clone(); r.cmpn(1) > 0 && i.cmpn(1) > 0; ) {
                    for (var l = 0, h = 1; (r.words[0] & h) == 0 && l < 26; ++l,
                    h <<= 1)
                        ;
                    if (l > 0)
                        for (r.iushrn(l); l-- > 0; )
                            s.isOdd() && s.iadd(u),
                            s.iushrn(1);
                    for (var f = 0, c = 1; (i.words[0] & c) == 0 && f < 26; ++f,
                    c <<= 1)
                        ;
                    if (f > 0)
                        for (i.iushrn(f); f-- > 0; )
                            a.isOdd() && a.iadd(u),
                            a.iushrn(1);
                    r.cmp(i) >= 0 ? (r.isub(i),
                    s.isub(a)) : (i.isub(r),
                    a.isub(s))
                }
                return 0 > (e = 0 === r.cmpn(1) ? s : a).cmpn(0) && e.iadd(t),
                e
            }
            ,
            o.prototype.gcd = function(t) {
                if (this.isZero())
                    return t.abs();
                if (t.isZero())
                    return this.abs();
                var e = this.clone()
                  , r = t.clone();
                e.negative = 0,
                r.negative = 0;
                for (var n = 0; e.isEven() && r.isEven(); n++)
                    e.iushrn(1),
                    r.iushrn(1);
                for (; ; ) {
                    for (; e.isEven(); )
                        e.iushrn(1);
                    for (; r.isEven(); )
                        r.iushrn(1);
                    var i = e.cmp(r);
                    if (i < 0) {
                        var o = e;
                        e = r,
                        r = o
                    } else if (0 === i || 0 === r.cmpn(1))
                        break;
                    e.isub(r)
                }
                return r.iushln(n)
            }
            ,
            o.prototype.invm = function(t) {
                return this.egcd(t).a.umod(t)
            }
            ,
            o.prototype.isEven = function() {
                return (1 & this.words[0]) == 0
            }
            ,
            o.prototype.isOdd = function() {
                return (1 & this.words[0]) == 1
            }
            ,
            o.prototype.andln = function(t) {
                return this.words[0] & t
            }
            ,
            o.prototype.bincn = function(t) {
                n("number" == typeof t);
                var e = t % 26
                  , r = (t - e) / 26
                  , i = 1 << e;
                if (this.length <= r)
                    return this._expand(r + 1),
                    this.words[r] |= i,
                    this;
                for (var o = i, s = r; 0 !== o && s < this.length; s++) {
                    var a = 0 | this.words[s];
                    a += o,
                    o = a >>> 26,
                    a &= 67108863,
                    this.words[s] = a
                }
                return 0 !== o && (this.words[s] = o,
                this.length++),
                this
            }
            ,
            o.prototype.isZero = function() {
                return 1 === this.length && 0 === this.words[0]
            }
            ,
            o.prototype.cmpn = function(t) {
                var e, r = t < 0;
                if (0 !== this.negative && !r)
                    return -1;
                if (0 === this.negative && r)
                    return 1;
                if (this._strip(),
                this.length > 1)
                    e = 1;
                else {
                    r && (t = -t),
                    n(t <= 67108863, "Number is too big");
                    var i = 0 | this.words[0];
                    e = i === t ? 0 : i < t ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -e : e
            }
            ,
            o.prototype.cmp = function(t) {
                if (0 !== this.negative && 0 === t.negative)
                    return -1;
                if (0 === this.negative && 0 !== t.negative)
                    return 1;
                var e = this.ucmp(t);
                return 0 !== this.negative ? 0 | -e : e
            }
            ,
            o.prototype.ucmp = function(t) {
                if (this.length > t.length)
                    return 1;
                if (this.length < t.length)
                    return -1;
                for (var e = 0, r = this.length - 1; r >= 0; r--) {
                    var n = 0 | this.words[r]
                      , i = 0 | t.words[r];
                    if (n !== i) {
                        n < i ? e = -1 : n > i && (e = 1);
                        break
                    }
                }
                return e
            }
            ,
            o.prototype.gtn = function(t) {
                return 1 === this.cmpn(t)
            }
            ,
            o.prototype.gt = function(t) {
                return 1 === this.cmp(t)
            }
            ,
            o.prototype.gten = function(t) {
                return this.cmpn(t) >= 0
            }
            ,
            o.prototype.gte = function(t) {
                return this.cmp(t) >= 0
            }
            ,
            o.prototype.ltn = function(t) {
                return -1 === this.cmpn(t)
            }
            ,
            o.prototype.lt = function(t) {
                return -1 === this.cmp(t)
            }
            ,
            o.prototype.lten = function(t) {
                return 0 >= this.cmpn(t)
            }
            ,
            o.prototype.lte = function(t) {
                return 0 >= this.cmp(t)
            }
            ,
            o.prototype.eqn = function(t) {
                return 0 === this.cmpn(t)
            }
            ,
            o.prototype.eq = function(t) {
                return 0 === this.cmp(t)
            }
            ,
            o.red = function(t) {
                return new M(t)
            }
            ,
            o.prototype.toRed = function(t) {
                return n(!this.red, "Already a number in reduction context"),
                n(0 === this.negative, "red works only with positives"),
                t.convertTo(this)._forceRed(t)
            }
            ,
            o.prototype.fromRed = function() {
                return n(this.red, "fromRed works only with numbers in reduction context"),
                this.red.convertFrom(this)
            }
            ,
            o.prototype._forceRed = function(t) {
                return this.red = t,
                this
            }
            ,
            o.prototype.forceRed = function(t) {
                return n(!this.red, "Already a number in reduction context"),
                this._forceRed(t)
            }
            ,
            o.prototype.redAdd = function(t) {
                return n(this.red, "redAdd works only with red numbers"),
                this.red.add(this, t)
            }
            ,
            o.prototype.redIAdd = function(t) {
                return n(this.red, "redIAdd works only with red numbers"),
                this.red.iadd(this, t)
            }
            ,
            o.prototype.redSub = function(t) {
                return n(this.red, "redSub works only with red numbers"),
                this.red.sub(this, t)
            }
            ,
            o.prototype.redISub = function(t) {
                return n(this.red, "redISub works only with red numbers"),
                this.red.isub(this, t)
            }
            ,
            o.prototype.redShl = function(t) {
                return n(this.red, "redShl works only with red numbers"),
                this.red.shl(this, t)
            }
            ,
            o.prototype.redMul = function(t) {
                return n(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, t),
                this.red.mul(this, t)
            }
            ,
            o.prototype.redIMul = function(t) {
                return n(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, t),
                this.red.imul(this, t)
            }
            ,
            o.prototype.redSqr = function() {
                return n(this.red, "redSqr works only with red numbers"),
                this.red._verify1(this),
                this.red.sqr(this)
            }
            ,
            o.prototype.redISqr = function() {
                return n(this.red, "redISqr works only with red numbers"),
                this.red._verify1(this),
                this.red.isqr(this)
            }
            ,
            o.prototype.redSqrt = function() {
                return n(this.red, "redSqrt works only with red numbers"),
                this.red._verify1(this),
                this.red.sqrt(this)
            }
            ,
            o.prototype.redInvm = function() {
                return n(this.red, "redInvm works only with red numbers"),
                this.red._verify1(this),
                this.red.invm(this)
            }
            ,
            o.prototype.redNeg = function() {
                return n(this.red, "redNeg works only with red numbers"),
                this.red._verify1(this),
                this.red.neg(this)
            }
            ,
            o.prototype.redPow = function(t) {
                return n(this.red && !t.red, "redPow(normalNum)"),
                this.red._verify1(this),
                this.red.pow(this, t)
            }
            ;
            var E = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };
            function _(t, e) {
                this.name = t,
                this.p = new o(e,16),
                this.n = this.p.bitLength(),
                this.k = new o(1).iushln(this.n).isub(this.p),
                this.tmp = this._tmp()
            }
            function x() {
                _.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }
            function A() {
                _.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }
            function k() {
                _.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }
            function N() {
                _.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }
            function M(t) {
                if ("string" == typeof t) {
                    var e = o._prime(t);
                    this.m = e.p,
                    this.prime = e
                } else
                    n(t.gtn(1), "modulus must be greater than 1"),
                    this.m = t,
                    this.prime = null
            }
            function P(t) {
                M.call(this, t),
                this.shift = this.m.bitLength(),
                this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26),
                this.r = new o(1).iushln(this.shift),
                this.r2 = this.imod(this.r.sqr()),
                this.rinv = this.r._invmp(this.m),
                this.minv = this.rinv.mul(this.r).isubn(1).div(this.m),
                this.minv = this.minv.umod(this.r),
                this.minv = this.r.sub(this.minv)
            }
            _.prototype._tmp = function() {
                var t = new o(null);
                return t.words = Array(Math.ceil(this.n / 13)),
                t
            }
            ,
            _.prototype.ireduce = function(t) {
                var e, r = t;
                do
                    this.split(r, this.tmp),
                    e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength();
                while (e > this.n);
                var n = e < this.n ? -1 : r.ucmp(this.p);
                return 0 === n ? (r.words[0] = 0,
                r.length = 1) : n > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip(),
                r
            }
            ,
            _.prototype.split = function(t, e) {
                t.iushrn(this.n, 0, e)
            }
            ,
            _.prototype.imulK = function(t) {
                return t.imul(this.k)
            }
            ,
            i(x, _),
            x.prototype.split = function(t, e) {
                for (var r = Math.min(t.length, 9), n = 0; n < r; n++)
                    e.words[n] = t.words[n];
                if (e.length = r,
                t.length <= 9) {
                    t.words[0] = 0,
                    t.length = 1;
                    return
                }
                var i = t.words[9];
                for (n = 10,
                e.words[e.length++] = 4194303 & i; n < t.length; n++) {
                    var o = 0 | t.words[n];
                    t.words[n - 10] = (4194303 & o) << 4 | i >>> 22,
                    i = o
                }
                i >>>= 22,
                t.words[n - 10] = i,
                0 === i && t.length > 10 ? t.length -= 10 : t.length -= 9
            }
            ,
            x.prototype.imulK = function(t) {
                t.words[t.length] = 0,
                t.words[t.length + 1] = 0,
                t.length += 2;
                for (var e = 0, r = 0; r < t.length; r++) {
                    var n = 0 | t.words[r];
                    e += 977 * n,
                    t.words[r] = 67108863 & e,
                    e = 64 * n + (e / 67108864 | 0)
                }
                return 0 === t.words[t.length - 1] && (t.length--,
                0 === t.words[t.length - 1] && t.length--),
                t
            }
            ,
            i(A, _),
            i(k, _),
            i(N, _),
            N.prototype.imulK = function(t) {
                for (var e = 0, r = 0; r < t.length; r++) {
                    var n = (0 | t.words[r]) * 19 + e
                      , i = 67108863 & n;
                    n >>>= 26,
                    t.words[r] = i,
                    e = n
                }
                return 0 !== e && (t.words[t.length++] = e),
                t
            }
            ,
            o._prime = function(t) {
                var e;
                if (E[t])
                    return E[t];
                if ("k256" === t)
                    e = new x;
                else if ("p224" === t)
                    e = new A;
                else if ("p192" === t)
                    e = new k;
                else if ("p25519" === t)
                    e = new N;
                else
                    throw Error("Unknown prime " + t);
                return E[t] = e,
                e
            }
            ,
            M.prototype._verify1 = function(t) {
                n(0 === t.negative, "red works only with positives"),
                n(t.red, "red works only with red numbers")
            }
            ,
            M.prototype._verify2 = function(t, e) {
                n((t.negative | e.negative) == 0, "red works only with positives"),
                n(t.red && t.red === e.red, "red works only with red numbers")
            }
            ,
            M.prototype.imod = function(t) {
                return this.prime ? this.prime.ireduce(t)._forceRed(this) : (h(t, t.umod(this.m)._forceRed(this)),
                t)
            }
            ,
            M.prototype.neg = function(t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }
            ,
            M.prototype.add = function(t, e) {
                this._verify2(t, e);
                var r = t.add(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m),
                r._forceRed(this)
            }
            ,
            M.prototype.iadd = function(t, e) {
                this._verify2(t, e);
                var r = t.iadd(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m),
                r
            }
            ,
            M.prototype.sub = function(t, e) {
                this._verify2(t, e);
                var r = t.sub(e);
                return 0 > r.cmpn(0) && r.iadd(this.m),
                r._forceRed(this)
            }
            ,
            M.prototype.isub = function(t, e) {
                this._verify2(t, e);
                var r = t.isub(e);
                return 0 > r.cmpn(0) && r.iadd(this.m),
                r
            }
            ,
            M.prototype.shl = function(t, e) {
                return this._verify1(t),
                this.imod(t.ushln(e))
            }
            ,
            M.prototype.imul = function(t, e) {
                return this._verify2(t, e),
                this.imod(t.imul(e))
            }
            ,
            M.prototype.mul = function(t, e) {
                return this._verify2(t, e),
                this.imod(t.mul(e))
            }
            ,
            M.prototype.isqr = function(t) {
                return this.imul(t, t.clone())
            }
            ,
            M.prototype.sqr = function(t) {
                return this.mul(t, t)
            }
            ,
            M.prototype.sqrt = function(t) {
                if (t.isZero())
                    return t.clone();
                var e = this.m.andln(3);
                if (n(e % 2 == 1),
                3 === e) {
                    var r = this.m.add(new o(1)).iushrn(2);
                    return this.pow(t, r)
                }
                for (var i = this.m.subn(1), s = 0; !i.isZero() && 0 === i.andln(1); )
                    s++,
                    i.iushrn(1);
                n(!i.isZero());
                var a = new o(1).toRed(this)
                  , u = a.redNeg()
                  , l = this.m.subn(1).iushrn(1)
                  , h = this.m.bitLength();
                for (h = new o(2 * h * h).toRed(this); 0 !== this.pow(h, l).cmp(u); )
                    h.redIAdd(u);
                for (var f = this.pow(h, i), c = this.pow(t, i.addn(1).iushrn(1)), d = this.pow(t, i), p = s; 0 !== d.cmp(a); ) {
                    for (var m = d, g = 0; 0 !== m.cmp(a); g++)
                        m = m.redSqr();
                    n(g < p);
                    var y = this.pow(f, new o(1).iushln(p - g - 1));
                    c = c.redMul(y),
                    f = y.redSqr(),
                    d = d.redMul(f),
                    p = g
                }
                return c
            }
            ,
            M.prototype.invm = function(t) {
                var e = t._invmp(this.m);
                return 0 !== e.negative ? (e.negative = 0,
                this.imod(e).redNeg()) : this.imod(e)
            }
            ,
            M.prototype.pow = function(t, e) {
                if (e.isZero())
                    return new o(1).toRed(this);
                if (0 === e.cmpn(1))
                    return t.clone();
                var r = Array(16);
                r[0] = new o(1).toRed(this),
                r[1] = t;
                for (var n = 2; n < r.length; n++)
                    r[n] = this.mul(r[n - 1], t);
                var i = r[0]
                  , s = 0
                  , a = 0
                  , u = e.bitLength() % 26;
                for (0 === u && (u = 26),
                n = e.length - 1; n >= 0; n--) {
                    for (var l = e.words[n], h = u - 1; h >= 0; h--) {
                        var f = l >> h & 1;
                        if (i !== r[0] && (i = this.sqr(i)),
                        0 === f && 0 === s) {
                            a = 0;
                            continue
                        }
                        s <<= 1,
                        s |= f,
                        (4 == ++a || 0 === n && 0 === h) && (i = this.mul(i, r[s]),
                        a = 0,
                        s = 0)
                    }
                    u = 26
                }
                return i
            }
            ,
            M.prototype.convertTo = function(t) {
                var e = t.umod(this.m);
                return e === t ? e.clone() : e
            }
            ,
            M.prototype.convertFrom = function(t) {
                var e = t.clone();
                return e.red = null,
                e
            }
            ,
            o.mont = function(t) {
                return new P(t)
            }
            ,
            i(P, M),
            P.prototype.convertTo = function(t) {
                return this.imod(t.ushln(this.shift))
            }
            ,
            P.prototype.convertFrom = function(t) {
                var e = this.imod(t.mul(this.rinv));
                return e.red = null,
                e
            }
            ,
            P.prototype.imul = function(t, e) {
                if (t.isZero() || e.isZero())
                    return t.words[0] = 0,
                    t.length = 1,
                    t;
                var r = t.imul(e)
                  , n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
                  , i = r.isub(n).iushrn(this.shift)
                  , o = i;
                return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : 0 > i.cmpn(0) && (o = i.iadd(this.m)),
                o._forceRed(this)
            }
            ,
            P.prototype.mul = function(t, e) {
                if (t.isZero() || e.isZero())
                    return new o(0)._forceRed(this);
                var r = t.mul(e)
                  , n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
                  , i = r.isub(n).iushrn(this.shift)
                  , s = i;
                return i.cmp(this.m) >= 0 ? s = i.isub(this.m) : 0 > i.cmpn(0) && (s = i.iadd(this.m)),
                s._forceRed(this)
            }
            ,
            P.prototype.invm = function(t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }(t = r.nmd(t), this)
    },
    3715: function(t, e, r) {
        var n = e;
        n.utils = r(6436),
        n.common = r(5772),
        n.sha = r(9041),
        n.ripemd = r(2949),
        n.hmac = r(2344),
        n.sha1 = n.sha.sha1,
        n.sha256 = n.sha.sha256,
        n.sha224 = n.sha.sha224,
        n.sha384 = n.sha.sha384,
        n.sha512 = n.sha.sha512,
        n.ripemd160 = n.ripemd.ripemd160
    },
    5772: function(t, e, r) {
        "use strict";
        var n = r(6436)
          , i = r(9746);
        function o() {
            this.pending = null,
            this.pendingTotal = 0,
            this.blockSize = this.constructor.blockSize,
            this.outSize = this.constructor.outSize,
            this.hmacStrength = this.constructor.hmacStrength,
            this.padLength = this.constructor.padLength / 8,
            this.endian = "big",
            this._delta8 = this.blockSize / 8,
            this._delta32 = this.blockSize / 32
        }
        e.BlockHash = o,
        o.prototype.update = function(t, e) {
            if (t = n.toArray(t, e),
            this.pending ? this.pending = this.pending.concat(t) : this.pending = t,
            this.pendingTotal += t.length,
            this.pending.length >= this._delta8) {
                var r = (t = this.pending).length % this._delta8;
                this.pending = t.slice(t.length - r, t.length),
                0 === this.pending.length && (this.pending = null),
                t = n.join32(t, 0, t.length - r, this.endian);
                for (var i = 0; i < t.length; i += this._delta32)
                    this._update(t, i, i + this._delta32)
            }
            return this
        }
        ,
        o.prototype.digest = function(t) {
            return this.update(this._pad()),
            i(null === this.pending),
            this._digest(t)
        }
        ,
        o.prototype._pad = function() {
            var t = this.pendingTotal
              , e = this._delta8
              , r = e - (t + this.padLength) % e
              , n = Array(r + this.padLength);
            n[0] = 128;
            for (var i = 1; i < r; i++)
                n[i] = 0;
            if (t <<= 3,
            "big" === this.endian) {
                for (var o = 8; o < this.padLength; o++)
                    n[i++] = 0;
                n[i++] = 0,
                n[i++] = 0,
                n[i++] = 0,
                n[i++] = 0,
                n[i++] = t >>> 24 & 255,
                n[i++] = t >>> 16 & 255,
                n[i++] = t >>> 8 & 255,
                n[i++] = 255 & t
            } else
                for (o = 8,
                n[i++] = 255 & t,
                n[i++] = t >>> 8 & 255,
                n[i++] = t >>> 16 & 255,
                n[i++] = t >>> 24 & 255,
                n[i++] = 0,
                n[i++] = 0,
                n[i++] = 0,
                n[i++] = 0; o < this.padLength; o++)
                    n[i++] = 0;
            return n
        }
    },
    2344: function(t, e, r) {
        "use strict";
        var n = r(6436)
          , i = r(9746);
        function o(t, e, r) {
            if (!(this instanceof o))
                return new o(t,e,r);
            this.Hash = t,
            this.blockSize = t.blockSize / 8,
            this.outSize = t.outSize / 8,
            this.inner = null,
            this.outer = null,
            this._init(n.toArray(e, r))
        }
        t.exports = o,
        o.prototype._init = function(t) {
            t.length > this.blockSize && (t = new this.Hash().update(t).digest()),
            i(t.length <= this.blockSize);
            for (var e = t.length; e < this.blockSize; e++)
                t.push(0);
            for (e = 0; e < t.length; e++)
                t[e] ^= 54;
            for (e = 0,
            this.inner = new this.Hash().update(t); e < t.length; e++)
                t[e] ^= 106;
            this.outer = new this.Hash().update(t)
        }
        ,
        o.prototype.update = function(t, e) {
            return this.inner.update(t, e),
            this
        }
        ,
        o.prototype.digest = function(t) {
            return this.outer.update(this.inner.digest()),
            this.outer.digest(t)
        }
    },
    2949: function(t, e, r) {
        "use strict";
        var n = r(6436)
          , i = r(5772)
          , o = n.rotl32
          , s = n.sum32
          , a = n.sum32_3
          , u = n.sum32_4
          , l = i.BlockHash;
        function h() {
            if (!(this instanceof h))
                return new h;
            l.call(this),
            this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            this.endian = "little"
        }
        function f(t, e, r, n) {
            return t <= 15 ? e ^ r ^ n : t <= 31 ? e & r | ~e & n : t <= 47 ? (e | ~r) ^ n : t <= 63 ? e & n | r & ~n : e ^ (r | ~n)
        }
        n.inherits(h, l),
        e.ripemd160 = h,
        h.blockSize = 512,
        h.outSize = 160,
        h.hmacStrength = 192,
        h.padLength = 64,
        h.prototype._update = function(t, e) {
            for (var r = this.h[0], n = this.h[1], i = this.h[2], l = this.h[3], h = this.h[4], g = r, y = n, v = i, b = l, w = h, E = 0; E < 80; E++) {
                var _, x, A = s(o(u(r, f(E, n, i, l), t[c[E] + e], (_ = E) <= 15 ? 0 : _ <= 31 ? 1518500249 : _ <= 47 ? 1859775393 : _ <= 63 ? 2400959708 : 2840853838), p[E]), h);
                r = h,
                h = l,
                l = o(i, 10),
                i = n,
                n = A,
                A = s(o(u(g, f(79 - E, y, v, b), t[d[E] + e], (x = E) <= 15 ? 1352829926 : x <= 31 ? 1548603684 : x <= 47 ? 1836072691 : x <= 63 ? 2053994217 : 0), m[E]), w),
                g = w,
                w = b,
                b = o(v, 10),
                v = y,
                y = A
            }
            A = a(this.h[1], i, b),
            this.h[1] = a(this.h[2], l, w),
            this.h[2] = a(this.h[3], h, g),
            this.h[3] = a(this.h[4], r, y),
            this.h[4] = a(this.h[0], n, v),
            this.h[0] = A
        }
        ,
        h.prototype._digest = function(t) {
            return "hex" === t ? n.toHex32(this.h, "little") : n.split32(this.h, "little")
        }
        ;
        var c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]
          , d = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]
          , p = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]
          , m = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
    },
    9041: function(t, e, r) {
        "use strict";
        e.sha1 = r(4761),
        e.sha224 = r(799),
        e.sha256 = r(9344),
        e.sha384 = r(772),
        e.sha512 = r(5900)
    },
    4761: function(t, e, r) {
        "use strict";
        var n = r(6436)
          , i = r(5772)
          , o = r(7038)
          , s = n.rotl32
          , a = n.sum32
          , u = n.sum32_5
          , l = o.ft_1
          , h = i.BlockHash
          , f = [1518500249, 1859775393, 2400959708, 3395469782];
        function c() {
            if (!(this instanceof c))
                return new c;
            h.call(this),
            this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            this.W = Array(80)
        }
        n.inherits(c, h),
        t.exports = c,
        c.blockSize = 512,
        c.outSize = 160,
        c.hmacStrength = 80,
        c.padLength = 64,
        c.prototype._update = function(t, e) {
            for (var r = this.W, n = 0; n < 16; n++)
                r[n] = t[e + n];
            for (; n < r.length; n++)
                r[n] = s(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1);
            var i = this.h[0]
              , o = this.h[1]
              , h = this.h[2]
              , c = this.h[3]
              , d = this.h[4];
            for (n = 0; n < r.length; n++) {
                var p = ~~(n / 20)
                  , m = u(s(i, 5), l(p, o, h, c), d, r[n], f[p]);
                d = c,
                c = h,
                h = s(o, 30),
                o = i,
                i = m
            }
            this.h[0] = a(this.h[0], i),
            this.h[1] = a(this.h[1], o),
            this.h[2] = a(this.h[2], h),
            this.h[3] = a(this.h[3], c),
            this.h[4] = a(this.h[4], d)
        }
        ,
        c.prototype._digest = function(t) {
            return "hex" === t ? n.toHex32(this.h, "big") : n.split32(this.h, "big")
        }
    },
    799: function(t, e, r) {
        "use strict";
        var n = r(6436)
          , i = r(9344);
        function o() {
            if (!(this instanceof o))
                return new o;
            i.call(this),
            this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
        }
        n.inherits(o, i),
        t.exports = o,
        o.blockSize = 512,
        o.outSize = 224,
        o.hmacStrength = 192,
        o.padLength = 64,
        o.prototype._digest = function(t) {
            return "hex" === t ? n.toHex32(this.h.slice(0, 7), "big") : n.split32(this.h.slice(0, 7), "big")
        }
    },
    9344: function(t, e, r) {
        "use strict";
        var n = r(6436)
          , i = r(5772)
          , o = r(7038)
          , s = r(9746)
          , a = n.sum32
          , u = n.sum32_4
          , l = n.sum32_5
          , h = o.ch32
          , f = o.maj32
          , c = o.s0_256
          , d = o.s1_256
          , p = o.g0_256
          , m = o.g1_256
          , g = i.BlockHash
          , y = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
        function v() {
            if (!(this instanceof v))
                return new v;
            g.call(this),
            this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
            this.k = y,
            this.W = Array(64)
        }
        n.inherits(v, g),
        t.exports = v,
        v.blockSize = 512,
        v.outSize = 256,
        v.hmacStrength = 192,
        v.padLength = 64,
        v.prototype._update = function(t, e) {
            for (var r = this.W, n = 0; n < 16; n++)
                r[n] = t[e + n];
            for (; n < r.length; n++)
                r[n] = u(m(r[n - 2]), r[n - 7], p(r[n - 15]), r[n - 16]);
            var i = this.h[0]
              , o = this.h[1]
              , g = this.h[2]
              , y = this.h[3]
              , v = this.h[4]
              , b = this.h[5]
              , w = this.h[6]
              , E = this.h[7];
            for (s(this.k.length === r.length),
            n = 0; n < r.length; n++) {
                var _ = l(E, d(v), h(v, b, w), this.k[n], r[n])
                  , x = a(c(i), f(i, o, g));
                E = w,
                w = b,
                b = v,
                v = a(y, _),
                y = g,
                g = o,
                o = i,
                i = a(_, x)
            }
            this.h[0] = a(this.h[0], i),
            this.h[1] = a(this.h[1], o),
            this.h[2] = a(this.h[2], g),
            this.h[3] = a(this.h[3], y),
            this.h[4] = a(this.h[4], v),
            this.h[5] = a(this.h[5], b),
            this.h[6] = a(this.h[6], w),
            this.h[7] = a(this.h[7], E)
        }
        ,
        v.prototype._digest = function(t) {
            return "hex" === t ? n.toHex32(this.h, "big") : n.split32(this.h, "big")
        }
    },
    772: function(t, e, r) {
        "use strict";
        var n = r(6436)
          , i = r(5900);
        function o() {
            if (!(this instanceof o))
                return new o;
            i.call(this),
            this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
        }
        n.inherits(o, i),
        t.exports = o,
        o.blockSize = 1024,
        o.outSize = 384,
        o.hmacStrength = 192,
        o.padLength = 128,
        o.prototype._digest = function(t) {
            return "hex" === t ? n.toHex32(this.h.slice(0, 12), "big") : n.split32(this.h.slice(0, 12), "big")
        }
    },
    5900: function(t, e, r) {
        "use strict";
        var n = r(6436)
          , i = r(5772)
          , o = r(9746)
          , s = n.rotr64_hi
          , a = n.rotr64_lo
          , u = n.shr64_hi
          , l = n.shr64_lo
          , h = n.sum64
          , f = n.sum64_hi
          , c = n.sum64_lo
          , d = n.sum64_4_hi
          , p = n.sum64_4_lo
          , m = n.sum64_5_hi
          , g = n.sum64_5_lo
          , y = i.BlockHash
          , v = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
        function b() {
            if (!(this instanceof b))
                return new b;
            y.call(this),
            this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209],
            this.k = v,
            this.W = Array(160)
        }
        n.inherits(b, y),
        t.exports = b,
        b.blockSize = 1024,
        b.outSize = 512,
        b.hmacStrength = 192,
        b.padLength = 128,
        b.prototype._prepareBlock = function(t, e) {
            for (var r = this.W, n = 0; n < 32; n++)
                r[n] = t[e + n];
            for (; n < r.length; n += 2) {
                var i = function(t, e) {
                    var r = s(t, e, 19) ^ s(e, t, 29) ^ u(t, e, 6);
                    return r < 0 && (r += 4294967296),
                    r
                }(r[n - 4], r[n - 3])
                  , o = function(t, e) {
                    var r = a(t, e, 19) ^ a(e, t, 29) ^ l(t, e, 6);
                    return r < 0 && (r += 4294967296),
                    r
                }(r[n - 4], r[n - 3])
                  , h = r[n - 14]
                  , f = r[n - 13]
                  , c = function(t, e) {
                    var r = s(t, e, 1) ^ s(t, e, 8) ^ u(t, e, 7);
                    return r < 0 && (r += 4294967296),
                    r
                }(r[n - 30], r[n - 29])
                  , m = function(t, e) {
                    var r = a(t, e, 1) ^ a(t, e, 8) ^ l(t, e, 7);
                    return r < 0 && (r += 4294967296),
                    r
                }(r[n - 30], r[n - 29])
                  , g = r[n - 32]
                  , y = r[n - 31];
                r[n] = d(i, o, h, f, c, m, g, y),
                r[n + 1] = p(i, o, h, f, c, m, g, y)
            }
        }
        ,
        b.prototype._update = function(t, e) {
            this._prepareBlock(t, e);
            var r = this.W
              , n = this.h[0]
              , i = this.h[1]
              , u = this.h[2]
              , l = this.h[3]
              , d = this.h[4]
              , p = this.h[5]
              , y = this.h[6]
              , v = this.h[7]
              , b = this.h[8]
              , w = this.h[9]
              , E = this.h[10]
              , _ = this.h[11]
              , x = this.h[12]
              , A = this.h[13]
              , k = this.h[14]
              , N = this.h[15];
            o(this.k.length === r.length);
            for (var M = 0; M < r.length; M += 2) {
                var P = k
                  , S = N
                  , R = function(t, e) {
                    var r = s(t, e, 14) ^ s(t, e, 18) ^ s(e, t, 9);
                    return r < 0 && (r += 4294967296),
                    r
                }(b, w)
                  , O = function(t, e) {
                    var r = a(t, e, 14) ^ a(t, e, 18) ^ a(e, t, 9);
                    return r < 0 && (r += 4294967296),
                    r
                }(b, w)
                  , T = function(t, e, r, n, i) {
                    var o = t & r ^ ~t & i;
                    return o < 0 && (o += 4294967296),
                    o
                }(b, 0, E, 0, x, A)
                  , I = function(t, e, r, n, i, o) {
                    var s = e & n ^ ~e & o;
                    return s < 0 && (s += 4294967296),
                    s
                }(0, w, 0, _, 0, A)
                  , L = this.k[M]
                  , C = this.k[M + 1]
                  , B = r[M]
                  , F = r[M + 1]
                  , U = m(P, S, R, O, T, I, L, C, B, F)
                  , D = g(P, S, R, O, T, I, L, C, B, F);
                P = function(t, e) {
                    var r = s(t, e, 28) ^ s(e, t, 2) ^ s(e, t, 7);
                    return r < 0 && (r += 4294967296),
                    r
                }(n, i),
                S = function(t, e) {
                    var r = a(t, e, 28) ^ a(e, t, 2) ^ a(e, t, 7);
                    return r < 0 && (r += 4294967296),
                    r
                }(n, i),
                R = function(t, e, r, n, i) {
                    var o = t & r ^ t & i ^ r & i;
                    return o < 0 && (o += 4294967296),
                    o
                }(n, 0, u, 0, d, p),
                O = function(t, e, r, n, i, o) {
                    var s = e & n ^ e & o ^ n & o;
                    return s < 0 && (s += 4294967296),
                    s
                }(0, i, 0, l, 0, p);
                var j = f(P, S, R, O)
                  , z = c(P, S, R, O);
                k = x,
                N = A,
                x = E,
                A = _,
                E = b,
                _ = w,
                b = f(y, v, U, D),
                w = c(v, v, U, D),
                y = d,
                v = p,
                d = u,
                p = l,
                u = n,
                l = i,
                n = f(U, D, j, z),
                i = c(U, D, j, z)
            }
            h(this.h, 0, n, i),
            h(this.h, 2, u, l),
            h(this.h, 4, d, p),
            h(this.h, 6, y, v),
            h(this.h, 8, b, w),
            h(this.h, 10, E, _),
            h(this.h, 12, x, A),
            h(this.h, 14, k, N)
        }
        ,
        b.prototype._digest = function(t) {
            return "hex" === t ? n.toHex32(this.h, "big") : n.split32(this.h, "big")
        }
    },
    7038: function(t, e, r) {
        "use strict";
        var n = r(6436).rotr32;
        function i(t, e, r) {
            return t & e ^ t & r ^ e & r
        }
        e.ft_1 = function(t, e, r, n) {
            return 0 === t ? e & r ^ ~e & n : 1 === t || 3 === t ? e ^ r ^ n : 2 === t ? i(e, r, n) : void 0
        }
        ,
        e.ch32 = function(t, e, r) {
            return t & e ^ ~t & r
        }
        ,
        e.maj32 = i,
        e.p32 = function(t, e, r) {
            return t ^ e ^ r
        }
        ,
        e.s0_256 = function(t) {
            return n(t, 2) ^ n(t, 13) ^ n(t, 22)
        }
        ,
        e.s1_256 = function(t) {
            return n(t, 6) ^ n(t, 11) ^ n(t, 25)
        }
        ,
        e.g0_256 = function(t) {
            return n(t, 7) ^ n(t, 18) ^ t >>> 3
        }
        ,
        e.g1_256 = function(t) {
            return n(t, 17) ^ n(t, 19) ^ t >>> 10
        }
    },
    6436: function(t, e, r) {
        "use strict";
        var n = r(9746)
          , i = r(5717);
        function o(t) {
            return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0
        }
        function s(t) {
            return 1 === t.length ? "0" + t : t
        }
        function a(t) {
            if (7 === t.length)
                return "0" + t;
            if (6 === t.length)
                return "00" + t;
            if (5 === t.length)
                return "000" + t;
            if (4 === t.length)
                return "0000" + t;
            if (3 === t.length)
                return "00000" + t;
            if (2 === t.length)
                return "000000" + t;
            if (1 === t.length)
                return "0000000" + t;
            else
                return t
        }
        e.inherits = i,
        e.toArray = function(t, e) {
            if (Array.isArray(t))
                return t.slice();
            if (!t)
                return [];
            var r = [];
            if ("string" == typeof t) {
                if (e) {
                    if ("hex" === e)
                        for ((t = t.replace(/[^a-z0-9]+/ig, "")).length % 2 != 0 && (t = "0" + t),
                        i = 0; i < t.length; i += 2)
                            r.push(parseInt(t[i] + t[i + 1], 16))
                } else
                    for (var n = 0, i = 0; i < t.length; i++) {
                        var o, s, a = t.charCodeAt(i);
                        a < 128 ? r[n++] = a : a < 2048 ? (r[n++] = a >> 6 | 192,
                        r[n++] = 63 & a | 128) : (o = t,
                        s = i,
                        (64512 & o.charCodeAt(s)) != 55296 || s < 0 || s + 1 >= o.length ? 1 : (64512 & o.charCodeAt(s + 1)) != 56320) ? (r[n++] = a >> 12 | 224,
                        r[n++] = a >> 6 & 63 | 128,
                        r[n++] = 63 & a | 128) : (a = 65536 + ((1023 & a) << 10) + (1023 & t.charCodeAt(++i)),
                        r[n++] = a >> 18 | 240,
                        r[n++] = a >> 12 & 63 | 128,
                        r[n++] = a >> 6 & 63 | 128,
                        r[n++] = 63 & a | 128)
                    }
            } else
                for (i = 0; i < t.length; i++)
                    r[i] = 0 | t[i];
            return r
        }
        ,
        e.toHex = function(t) {
            for (var e = "", r = 0; r < t.length; r++)
                e += s(t[r].toString(16));
            return e
        }
        ,
        e.htonl = o,
        e.toHex32 = function(t, e) {
            for (var r = "", n = 0; n < t.length; n++) {
                var i = t[n];
                "little" === e && (i = o(i)),
                r += a(i.toString(16))
            }
            return r
        }
        ,
        e.zero2 = s,
        e.zero8 = a,
        e.join32 = function(t, e, r, i) {
            var o, s = r - e;
            n(s % 4 == 0);
            for (var a = Array(s / 4), u = 0, l = e; u < a.length; u++,
            l += 4)
                o = "big" === i ? t[l] << 24 | t[l + 1] << 16 | t[l + 2] << 8 | t[l + 3] : t[l + 3] << 24 | t[l + 2] << 16 | t[l + 1] << 8 | t[l],
                a[u] = o >>> 0;
            return a
        }
        ,
        e.split32 = function(t, e) {
            for (var r = Array(4 * t.length), n = 0, i = 0; n < t.length; n++,
            i += 4) {
                var o = t[n];
                "big" === e ? (r[i] = o >>> 24,
                r[i + 1] = o >>> 16 & 255,
                r[i + 2] = o >>> 8 & 255,
                r[i + 3] = 255 & o) : (r[i + 3] = o >>> 24,
                r[i + 2] = o >>> 16 & 255,
                r[i + 1] = o >>> 8 & 255,
                r[i] = 255 & o)
            }
            return r
        }
        ,
        e.rotr32 = function(t, e) {
            return t >>> e | t << 32 - e
        }
        ,
        e.rotl32 = function(t, e) {
            return t << e | t >>> 32 - e
        }
        ,
        e.sum32 = function(t, e) {
            return t + e >>> 0
        }
        ,
        e.sum32_3 = function(t, e, r) {
            return t + e + r >>> 0
        }
        ,
        e.sum32_4 = function(t, e, r, n) {
            return t + e + r + n >>> 0
        }
        ,
        e.sum32_5 = function(t, e, r, n, i) {
            return t + e + r + n + i >>> 0
        }
        ,
        e.sum64 = function(t, e, r, n) {
            var i = t[e]
              , o = n + t[e + 1] >>> 0;
            t[e] = (o < n ? 1 : 0) + r + i >>> 0,
            t[e + 1] = o
        }
        ,
        e.sum64_hi = function(t, e, r, n) {
            return (e + n >>> 0 < e ? 1 : 0) + t + r >>> 0
        }
        ,
        e.sum64_lo = function(t, e, r, n) {
            return e + n >>> 0
        }
        ,
        e.sum64_4_hi = function(t, e, r, n, i, o, s, a) {
            var u, l = e;
            return u = 0 + ((l = l + n >>> 0) < e ? 1 : 0),
            u += (l = l + o >>> 0) < o ? 1 : 0,
            t + r + i + s + (u += (l = l + a >>> 0) < a ? 1 : 0) >>> 0
        }
        ,
        e.sum64_4_lo = function(t, e, r, n, i, o, s, a) {
            return e + n + o + a >>> 0
        }
        ,
        e.sum64_5_hi = function(t, e, r, n, i, o, s, a, u, l) {
            var h, f = e;
            return h = 0 + ((f = f + n >>> 0) < e ? 1 : 0),
            h += (f = f + o >>> 0) < o ? 1 : 0,
            h += (f = f + a >>> 0) < a ? 1 : 0,
            t + r + i + s + u + (h += (f = f + l >>> 0) < l ? 1 : 0) >>> 0
        }
        ,
        e.sum64_5_lo = function(t, e, r, n, i, o, s, a, u, l) {
            return e + n + o + a + l >>> 0
        }
        ,
        e.rotr64_hi = function(t, e, r) {
            return (e << 32 - r | t >>> r) >>> 0
        }
        ,
        e.rotr64_lo = function(t, e, r) {
            return (t << 32 - r | e >>> r) >>> 0
        }
        ,
        e.shr64_hi = function(t, e, r) {
            return t >>> r
        }
        ,
        e.shr64_lo = function(t, e, r) {
            return (t << 32 - r | e >>> r) >>> 0
        }
    },
    5717: function(t) {
        "function" == typeof Object.create ? t.exports = function(t, e) {
            e && (t.super_ = e,
            t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }))
        }
        : t.exports = function(t, e) {
            if (e) {
                t.super_ = e;
                var r = function() {};
                r.prototype = e.prototype,
                t.prototype = new r,
                t.prototype.constructor = t
            }
        }
    },
    1094: function(t, e, r) {
        var n, i = r(3454);
        !function() {
            "use strict";
            var o = "input is invalid type"
              , s = "object" == typeof window
              , a = s ? window : {};
            a.JS_SHA3_NO_WINDOW && (s = !1);
            var u = !s && "object" == typeof self;
            !a.JS_SHA3_NO_NODE_JS && "object" == typeof i && i.versions && i.versions.node ? a = r.g : u && (a = self);
            var l = !a.JS_SHA3_NO_COMMON_JS && t.exports
              , h = r.amdO
              , f = !a.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer
              , c = "0123456789abcdef".split("")
              , d = [4, 1024, 262144, 67108864]
              , p = [0, 8, 16, 24]
              , m = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]
              , g = [224, 256, 384, 512]
              , y = [128, 256]
              , v = ["hex", "buffer", "arrayBuffer", "array", "digest"]
              , b = {
                128: 168,
                256: 136
            };
            (a.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
            ),
            f && (a.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(t) {
                return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer
            }
            );
            for (var w = function(t, e, r) {
                return function(n) {
                    return new C(t,e,t).update(n)[r]()
                }
            }, E = function(t, e, r) {
                return function(n, i) {
                    return new C(t,e,i).update(n)[r]()
                }
            }, _ = function(t, e, r) {
                return function(e, n, i, o) {
                    return M["cshake" + t].update(e, n, i, o)[r]()
                }
            }, x = function(t, e, r) {
                return function(e, n, i, o) {
                    return M["kmac" + t].update(e, n, i, o)[r]()
                }
            }, A = function(t, e, r, n) {
                for (var i = 0; i < v.length; ++i) {
                    var o = v[i];
                    t[o] = e(r, n, o)
                }
                return t
            }, k = function(t, e) {
                var r = w(t, e, "hex");
                return r.create = function() {
                    return new C(t,e,t)
                }
                ,
                r.update = function(t) {
                    return r.create().update(t)
                }
                ,
                A(r, w, t, e)
            }, N = [{
                name: "keccak",
                padding: [1, 256, 65536, 16777216],
                bits: g,
                createMethod: k
            }, {
                name: "sha3",
                padding: [6, 1536, 393216, 100663296],
                bits: g,
                createMethod: k
            }, {
                name: "shake",
                padding: [31, 7936, 2031616, 520093696],
                bits: y,
                createMethod: function(t, e) {
                    var r = E(t, e, "hex");
                    return r.create = function(r) {
                        return new C(t,e,r)
                    }
                    ,
                    r.update = function(t, e) {
                        return r.create(e).update(t)
                    }
                    ,
                    A(r, E, t, e)
                }
            }, {
                name: "cshake",
                padding: d,
                bits: y,
                createMethod: function(t, e) {
                    var r = b[t]
                      , n = _(t, e, "hex");
                    return n.create = function(n, i, o) {
                        return i || o ? new C(t,e,n).bytepad([i, o], r) : M["shake" + t].create(n)
                    }
                    ,
                    n.update = function(t, e, r, i) {
                        return n.create(e, r, i).update(t)
                    }
                    ,
                    A(n, _, t, e)
                }
            }, {
                name: "kmac",
                padding: d,
                bits: y,
                createMethod: function(t, e) {
                    var r = b[t]
                      , n = x(t, e, "hex");
                    return n.create = function(n, i, o) {
                        return new B(t,e,i).bytepad(["KMAC", o], r).bytepad([n], r)
                    }
                    ,
                    n.update = function(t, e, r, i) {
                        return n.create(t, r, i).update(e)
                    }
                    ,
                    A(n, x, t, e)
                }
            }], M = {}, P = [], S = 0; S < N.length; ++S)
                for (var R = N[S], O = R.bits, T = 0; T < O.length; ++T) {
                    var I = R.name + "_" + O[T];
                    if (P.push(I),
                    M[I] = R.createMethod(O[T], R.padding),
                    "sha3" !== R.name) {
                        var L = R.name + O[T];
                        P.push(L),
                        M[L] = M[I]
                    }
                }
            function C(t, e, r) {
                this.blocks = [],
                this.s = [],
                this.padding = e,
                this.outputBits = r,
                this.reset = !0,
                this.finalized = !1,
                this.block = 0,
                this.start = 0,
                this.blockCount = 1600 - (t << 1) >> 5,
                this.byteCount = this.blockCount << 2,
                this.outputBlocks = r >> 5,
                this.extraBytes = (31 & r) >> 3;
                for (var n = 0; n < 50; ++n)
                    this.s[n] = 0
            }
            function B(t, e, r) {
                C.call(this, t, e, r)
            }
            C.prototype.update = function(t) {
                if (this.finalized)
                    throw Error("finalize already called");
                var e, r = typeof t;
                if ("string" !== r) {
                    if ("object" === r) {
                        if (null === t)
                            throw Error(o);
                        if (f && t.constructor === ArrayBuffer)
                            t = new Uint8Array(t);
                        else if (!Array.isArray(t) && (!f || !ArrayBuffer.isView(t)))
                            throw Error(o)
                    } else
                        throw Error(o);
                    e = !0
                }
                for (var n, i, s = this.blocks, a = this.byteCount, u = t.length, l = this.blockCount, h = 0, c = this.s; h < u; ) {
                    if (this.reset)
                        for (n = 1,
                        this.reset = !1,
                        s[0] = this.block; n < l + 1; ++n)
                            s[n] = 0;
                    if (e)
                        for (n = this.start; h < u && n < a; ++h)
                            s[n >> 2] |= t[h] << p[3 & n++];
                    else
                        for (n = this.start; h < u && n < a; ++h)
                            (i = t.charCodeAt(h)) < 128 ? s[n >> 2] |= i << p[3 & n++] : i < 2048 ? (s[n >> 2] |= (192 | i >> 6) << p[3 & n++],
                            s[n >> 2] |= (128 | 63 & i) << p[3 & n++]) : i < 55296 || i >= 57344 ? (s[n >> 2] |= (224 | i >> 12) << p[3 & n++],
                            s[n >> 2] |= (128 | i >> 6 & 63) << p[3 & n++],
                            s[n >> 2] |= (128 | 63 & i) << p[3 & n++]) : (i = 65536 + ((1023 & i) << 10 | 1023 & t.charCodeAt(++h)),
                            s[n >> 2] |= (240 | i >> 18) << p[3 & n++],
                            s[n >> 2] |= (128 | i >> 12 & 63) << p[3 & n++],
                            s[n >> 2] |= (128 | i >> 6 & 63) << p[3 & n++],
                            s[n >> 2] |= (128 | 63 & i) << p[3 & n++]);
                    if (this.lastByteIndex = n,
                    n >= a) {
                        for (this.start = n - a,
                        this.block = s[l],
                        n = 0; n < l; ++n)
                            c[n] ^= s[n];
                        F(c),
                        this.reset = !0
                    } else
                        this.start = n
                }
                return this
            }
            ,
            C.prototype.encode = function(t, e) {
                var r = 255 & t
                  , n = 1
                  , i = [r];
                for (t >>= 8,
                r = 255 & t; r > 0; )
                    i.unshift(r),
                    t >>= 8,
                    r = 255 & t,
                    ++n;
                return e ? i.push(n) : i.unshift(n),
                this.update(i),
                i.length
            }
            ,
            C.prototype.encodeString = function(t) {
                var e, r = typeof t;
                if ("string" !== r) {
                    if ("object" === r) {
                        if (null === t)
                            throw Error(o);
                        if (f && t.constructor === ArrayBuffer)
                            t = new Uint8Array(t);
                        else if (!Array.isArray(t) && (!f || !ArrayBuffer.isView(t)))
                            throw Error(o)
                    } else
                        throw Error(o);
                    e = !0
                }
                var n = 0
                  , i = t.length;
                if (e)
                    n = i;
                else
                    for (var s = 0; s < t.length; ++s) {
                        var a = t.charCodeAt(s);
                        a < 128 ? n += 1 : a < 2048 ? n += 2 : a < 55296 || a >= 57344 ? n += 3 : (a = 65536 + ((1023 & a) << 10 | 1023 & t.charCodeAt(++s)),
                        n += 4)
                    }
                return n += this.encode(8 * n),
                this.update(t),
                n
            }
            ,
            C.prototype.bytepad = function(t, e) {
                for (var r = this.encode(e), n = 0; n < t.length; ++n)
                    r += this.encodeString(t[n]);
                var i = e - r % e
                  , o = [];
                return o.length = i,
                this.update(o),
                this
            }
            ,
            C.prototype.finalize = function() {
                if (!this.finalized) {
                    this.finalized = !0;
                    var t = this.blocks
                      , e = this.lastByteIndex
                      , r = this.blockCount
                      , n = this.s;
                    if (t[e >> 2] |= this.padding[3 & e],
                    this.lastByteIndex === this.byteCount)
                        for (e = 1,
                        t[0] = t[r]; e < r + 1; ++e)
                            t[e] = 0;
                    for (t[r - 1] |= 2147483648,
                    e = 0; e < r; ++e)
                        n[e] ^= t[e];
                    F(n)
                }
            }
            ,
            C.prototype.toString = C.prototype.hex = function() {
                this.finalize();
                for (var t, e = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, s = 0, a = ""; s < n; ) {
                    for (o = 0; o < e && s < n; ++o,
                    ++s)
                        a += c[(t = r[o]) >> 4 & 15] + c[15 & t] + c[t >> 12 & 15] + c[t >> 8 & 15] + c[t >> 20 & 15] + c[t >> 16 & 15] + c[t >> 28 & 15] + c[t >> 24 & 15];
                    s % e == 0 && (F(r),
                    o = 0)
                }
                return i && (a += c[(t = r[o]) >> 4 & 15] + c[15 & t],
                i > 1 && (a += c[t >> 12 & 15] + c[t >> 8 & 15]),
                i > 2 && (a += c[t >> 20 & 15] + c[t >> 16 & 15])),
                a
            }
            ,
            C.prototype.arrayBuffer = function() {
                this.finalize();
                var t, e = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, s = 0, a = this.outputBits >> 3;
                t = new ArrayBuffer(i ? n + 1 << 2 : a);
                for (var u = new Uint32Array(t); s < n; ) {
                    for (o = 0; o < e && s < n; ++o,
                    ++s)
                        u[s] = r[o];
                    s % e == 0 && F(r)
                }
                return i && (u[o] = r[o],
                t = t.slice(0, a)),
                t
            }
            ,
            C.prototype.buffer = C.prototype.arrayBuffer,
            C.prototype.digest = C.prototype.array = function() {
                this.finalize();
                for (var t, e, r = this.blockCount, n = this.s, i = this.outputBlocks, o = this.extraBytes, s = 0, a = 0, u = []; a < i; ) {
                    for (s = 0; s < r && a < i; ++s,
                    ++a)
                        t = a << 2,
                        e = n[s],
                        u[t] = 255 & e,
                        u[t + 1] = e >> 8 & 255,
                        u[t + 2] = e >> 16 & 255,
                        u[t + 3] = e >> 24 & 255;
                    a % r == 0 && F(n)
                }
                return o && (t = a << 2,
                e = n[s],
                u[t] = 255 & e,
                o > 1 && (u[t + 1] = e >> 8 & 255),
                o > 2 && (u[t + 2] = e >> 16 & 255)),
                u
            }
            ,
            B.prototype = new C,
            B.prototype.finalize = function() {
                return this.encode(this.outputBits, !0),
                C.prototype.finalize.call(this)
            }
            ;
            var F = function(t) {
                var e, r, n, i, o, s, a, u, l, h, f, c, d, p, g, y, v, b, w, E, _, x, A, k, N, M, P, S, R, O, T, I, L, C, B, F, U, D, j, z, $, q, G, V, H, J, Z, W, X, K, Y, Q, tt, te, tr, tn, ti, to, ts, ta, tu, tl, th;
                for (n = 0; n < 48; n += 2)
                    i = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
                    o = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
                    s = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
                    a = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
                    u = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
                    l = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
                    h = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
                    f = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
                    c = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
                    d = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49],
                    e = c ^ (s << 1 | a >>> 31),
                    r = d ^ (a << 1 | s >>> 31),
                    t[0] ^= e,
                    t[1] ^= r,
                    t[10] ^= e,
                    t[11] ^= r,
                    t[20] ^= e,
                    t[21] ^= r,
                    t[30] ^= e,
                    t[31] ^= r,
                    t[40] ^= e,
                    t[41] ^= r,
                    e = i ^ (u << 1 | l >>> 31),
                    r = o ^ (l << 1 | u >>> 31),
                    t[2] ^= e,
                    t[3] ^= r,
                    t[12] ^= e,
                    t[13] ^= r,
                    t[22] ^= e,
                    t[23] ^= r,
                    t[32] ^= e,
                    t[33] ^= r,
                    t[42] ^= e,
                    t[43] ^= r,
                    e = s ^ (h << 1 | f >>> 31),
                    r = a ^ (f << 1 | h >>> 31),
                    t[4] ^= e,
                    t[5] ^= r,
                    t[14] ^= e,
                    t[15] ^= r,
                    t[24] ^= e,
                    t[25] ^= r,
                    t[34] ^= e,
                    t[35] ^= r,
                    t[44] ^= e,
                    t[45] ^= r,
                    e = u ^ (c << 1 | d >>> 31),
                    r = l ^ (d << 1 | c >>> 31),
                    t[6] ^= e,
                    t[7] ^= r,
                    t[16] ^= e,
                    t[17] ^= r,
                    t[26] ^= e,
                    t[27] ^= r,
                    t[36] ^= e,
                    t[37] ^= r,
                    t[46] ^= e,
                    t[47] ^= r,
                    e = h ^ (i << 1 | o >>> 31),
                    r = f ^ (o << 1 | i >>> 31),
                    t[8] ^= e,
                    t[9] ^= r,
                    t[18] ^= e,
                    t[19] ^= r,
                    t[28] ^= e,
                    t[29] ^= r,
                    t[38] ^= e,
                    t[39] ^= r,
                    t[48] ^= e,
                    t[49] ^= r,
                    p = t[0],
                    g = t[1],
                    J = t[11] << 4 | t[10] >>> 28,
                    Z = t[10] << 4 | t[11] >>> 28,
                    S = t[20] << 3 | t[21] >>> 29,
                    R = t[21] << 3 | t[20] >>> 29,
                    ta = t[31] << 9 | t[30] >>> 23,
                    tu = t[30] << 9 | t[31] >>> 23,
                    q = t[40] << 18 | t[41] >>> 14,
                    G = t[41] << 18 | t[40] >>> 14,
                    C = t[2] << 1 | t[3] >>> 31,
                    B = t[3] << 1 | t[2] >>> 31,
                    y = t[13] << 12 | t[12] >>> 20,
                    v = t[12] << 12 | t[13] >>> 20,
                    W = t[22] << 10 | t[23] >>> 22,
                    X = t[23] << 10 | t[22] >>> 22,
                    O = t[33] << 13 | t[32] >>> 19,
                    T = t[32] << 13 | t[33] >>> 19,
                    tl = t[42] << 2 | t[43] >>> 30,
                    th = t[43] << 2 | t[42] >>> 30,
                    te = t[5] << 30 | t[4] >>> 2,
                    tr = t[4] << 30 | t[5] >>> 2,
                    F = t[14] << 6 | t[15] >>> 26,
                    U = t[15] << 6 | t[14] >>> 26,
                    b = t[25] << 11 | t[24] >>> 21,
                    w = t[24] << 11 | t[25] >>> 21,
                    K = t[34] << 15 | t[35] >>> 17,
                    Y = t[35] << 15 | t[34] >>> 17,
                    I = t[45] << 29 | t[44] >>> 3,
                    L = t[44] << 29 | t[45] >>> 3,
                    k = t[6] << 28 | t[7] >>> 4,
                    N = t[7] << 28 | t[6] >>> 4,
                    tn = t[17] << 23 | t[16] >>> 9,
                    ti = t[16] << 23 | t[17] >>> 9,
                    D = t[26] << 25 | t[27] >>> 7,
                    j = t[27] << 25 | t[26] >>> 7,
                    E = t[36] << 21 | t[37] >>> 11,
                    _ = t[37] << 21 | t[36] >>> 11,
                    Q = t[47] << 24 | t[46] >>> 8,
                    tt = t[46] << 24 | t[47] >>> 8,
                    V = t[8] << 27 | t[9] >>> 5,
                    H = t[9] << 27 | t[8] >>> 5,
                    M = t[18] << 20 | t[19] >>> 12,
                    P = t[19] << 20 | t[18] >>> 12,
                    to = t[29] << 7 | t[28] >>> 25,
                    ts = t[28] << 7 | t[29] >>> 25,
                    z = t[38] << 8 | t[39] >>> 24,
                    $ = t[39] << 8 | t[38] >>> 24,
                    x = t[48] << 14 | t[49] >>> 18,
                    A = t[49] << 14 | t[48] >>> 18,
                    t[0] = p ^ ~y & b,
                    t[1] = g ^ ~v & w,
                    t[10] = k ^ ~M & S,
                    t[11] = N ^ ~P & R,
                    t[20] = C ^ ~F & D,
                    t[21] = B ^ ~U & j,
                    t[30] = V ^ ~J & W,
                    t[31] = H ^ ~Z & X,
                    t[40] = te ^ ~tn & to,
                    t[41] = tr ^ ~ti & ts,
                    t[2] = y ^ ~b & E,
                    t[3] = v ^ ~w & _,
                    t[12] = M ^ ~S & O,
                    t[13] = P ^ ~R & T,
                    t[22] = F ^ ~D & z,
                    t[23] = U ^ ~j & $,
                    t[32] = J ^ ~W & K,
                    t[33] = Z ^ ~X & Y,
                    t[42] = tn ^ ~to & ta,
                    t[43] = ti ^ ~ts & tu,
                    t[4] = b ^ ~E & x,
                    t[5] = w ^ ~_ & A,
                    t[14] = S ^ ~O & I,
                    t[15] = R ^ ~T & L,
                    t[24] = D ^ ~z & q,
                    t[25] = j ^ ~$ & G,
                    t[34] = W ^ ~K & Q,
                    t[35] = X ^ ~Y & tt,
                    t[44] = to ^ ~ta & tl,
                    t[45] = ts ^ ~tu & th,
                    t[6] = E ^ ~x & p,
                    t[7] = _ ^ ~A & g,
                    t[16] = O ^ ~I & k,
                    t[17] = T ^ ~L & N,
                    t[26] = z ^ ~q & C,
                    t[27] = $ ^ ~G & B,
                    t[36] = K ^ ~Q & V,
                    t[37] = Y ^ ~tt & H,
                    t[46] = ta ^ ~tl & te,
                    t[47] = tu ^ ~th & tr,
                    t[8] = x ^ ~p & y,
                    t[9] = A ^ ~g & v,
                    t[18] = I ^ ~k & M,
                    t[19] = L ^ ~N & P,
                    t[28] = q ^ ~C & F,
                    t[29] = G ^ ~B & U,
                    t[38] = Q ^ ~V & J,
                    t[39] = tt ^ ~H & Z,
                    t[48] = tl ^ ~te & tn,
                    t[49] = th ^ ~tr & ti,
                    t[0] ^= m[n],
                    t[1] ^= m[n + 1]
            };
            if (l)
                t.exports = M;
            else {
                for (S = 0; S < P.length; ++S)
                    a[P[S]] = M[P[S]];
                h && void 0 !== (n = (function() {
                    return M
                }
                ).call(e, r, e, t)) && (t.exports = n)
            }
        }()
    },
    9746: function(t) {
        function e(t, e) {
            if (!t)
                throw Error(e || "Assertion failed")
        }
        t.exports = e,
        e.equal = function(t, e, r) {
            if (t != e)
                throw Error(r || "Assertion failed: " + t + " != " + e)
        }
    },
    3454: function(t, e, r) {
        "use strict";
        var n, i;
        t.exports = (null == (n = r.g.process) ? void 0 : n.env) && "object" == typeof (null == (i = r.g.process) ? void 0 : i.env) ? r.g.process : r(7663)
    },
    6840: function(t, e, r) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/_app", function() {
            return r(3847)
        }
        ])
    },
    7095: function(t, e, r) {
        "use strict";
        r.d(e, {
            g5: function() {
                return o
            },
            pn: function() {
                return i
            },
            xk: function() {
                return n
            }
        });
        let n = {
            testnet: "0x31490DcE803D63bF9f6C29f375D593D30751D717",
            goerli: "0x9BB672882DbD8590067541Ae3d442CB180DEcDB3",
            mainnet: "",
            fuji: "0x31490DcE803D63bF9f6C29f375D593D30751D717",
            avalanche: ""
        }
          , i = "goerli"
          , o = {
            goerli: {
                chainId: 5,
                chainName: "Goerli",
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
                blockExplorerUrls: ["https://goerli.etherscan.io"]
            },
            mainnet: {
                chainId: 1,
                chainName: "Ethereum",
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
                blockExplorerUrls: ["https://etherscan.io"]
            },
            fuji: {
                chainId: 43113,
                chainName: "Fuji",
                nativeCurrency: {
                    name: "AVAX",
                    symbol: "AVAX",
                    decimals: 18
                },
                rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                blockExplorerUrls: ["https://testnet.snowtrace.io"]
            },
            avalanche: {
                chainId: 43114,
                chainName: "Avalanche",
                nativeCurrency: {
                    name: "AVAX",
                    symbol: "AVAX",
                    decimals: 18
                },
                rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                blockExplorerUrls: ["https://snowtrace.io/"]
            }
        }
    },
    115: function(t, e, r) {
        "use strict";
        r.d(e, {
            J: function() {
                return i
            }
        });
        var n = r(7294);
        let i = (0,
        n.createContext)(null)
    },
    712: function(t, e, r) {
        "use strict";
        r.d(e, {
            N: function() {
                return i
            }
        });
        var n = r(7294);
        let i = (0,
        n.createContext)({
            resolveName: async t=>t
        })
    },
    3847: function(t, e, r) {
        "use strict";
        r.r(e);
        var n = r(5893);
        r(2531);
        var i = r(9008)
          , o = r.n(i)
          , s = r(7294)
          , a = r(4956)
          , u = r(5526)
          , l = r(1661)
          , h = r(7095)
          , f = r(115)
          , c = r(1163)
          , d = r(712);
        let p = [[5, "Goerli"]];
        e.default = function(t) {
            let {Component: e, pageProps: r} = t
              , [i,m] = (0,
            s.useState)("init")
              , [g,y] = (0,
            s.useState)(null)
              , [v,b] = (0,
            s.useState)(null)
              , w = (0,
            s.useMemo)(()=>{
                let t = {};
                return {
                    resolveName: async e=>(console.log("resolve", e),
                    t[e] || (t[e] = new Promise(async t=>{
                        let r = await fetch("/api/name-by-account?account=".concat(e))
                          , n = await r.json();
                        t(n.result)
                    }
                    )),
                    await t[e])
                }
            }
            , []);
            function E(t) {
                b(t),
                sessionStorage.setItem("social-contracts-ethereum-address", t)
            }
            (0,
            s.useEffect)(()=>{
                let t = sessionStorage.getItem("social-contracts-ethereum-address");
                t && b(t)
            }
            , []),
            (0,
            s.useEffect)(()=>{
                if ("connected" !== i)
                    return;
                let t = t=>{
                    E(t[0])
                }
                ;
                return window.ethereum.on("accountsChanged", t),
                ()=>{
                    window.ethereum.removeListener("accountsChanged", t)
                }
            }
            , [i]);
            let _ = ()=>{
                (async()=>{
                    let t = window.ethereum;
                    if (t)
                        try {
                            let e = await t.request({
                                method: "eth_requestAccounts"
                            })
                              , r = e[0].toLowerCase();
                            E(r)
                        } catch (n) {}
                }
                )()
            }
              , x = (0,
            s.useCallback)(()=>{
                (async()=>{
                    let t;
                    try {
                        t = new a.Q(window.ethereum)
                    } catch (e) {
                        t = new u.Fo
                    }
                    let r = t=>{
                        let e = (0,
                        l.m7)(t.chainId);
                        if (!e) {
                            m("wrong_network"),
                            y(null);
                            return
                        }
                        let r = p.map(t=>{
                            let[e] = t;
                            return e
                        }
                        );
                        if (!r.includes(t.chainId)) {
                            m("wrong_network"),
                            y(null);
                            return
                        }
                        v ? (m("connected"),
                        y({
                            name: e,
                            id: t.chainId
                        })) : (m("wallet_available"),
                        y(null))
                    }
                    ;
                    if (t instanceof u.Fo)
                        m("wallet_not_available");
                    else {
                        t.on("error", t=>{
                            r(t.detectedNetwork)
                        }
                        );
                        try {
                            r(await t.getNetwork())
                        } catch (n) {}
                    }
                }
                )()
            }
            , [v]);
            (0,
            s.useEffect)(()=>(console.log("fetchnetwork"),
            x(),
            window.ethereum && window.ethereum.on("chainChanged", x),
            ()=>{
                window.ethereum && window.ethereum.removeListener("chainChanged", x)
            }
            ), [x]);
            let A = (0,
            s.useMemo)(()=>{
                let t, e, r;
                try {
                    t = new a.Q(window.ethereum)
                } catch (n) {
                    t = new u.Fo
                }
                return g && "connected" === i ? (e = (0,
                u.f3)(t.getSigner(), g.name),
                r = (0,
                l.Vb)(g.name)) : (e = (0,
                u.f3)(t),
                r = (0,
                l.Vb)(h.pn)),
                {
                    ethereumAddress: v,
                    walletNetwork: g,
                    network: r,
                    provider: t,
                    contractInstance: e,
                    walletState: i
                }
            }
            , [v, g, i])
              , {asPath: k} = (0,
            c.useRouter)()
              , N = k.split("/")[1].split("#")[0];
            return (0,
            n.jsx)(n.Fragment, {
                children: (0,
                n.jsxs)(f.J.Provider, {
                    value: A,
                    children: [(0,
                    n.jsxs)(o(), {
                        children: [(0,
                        n.jsx)("title", {
                            children: "Social Contracts"
                        }), (0,
                        n.jsx)("meta", {
                            name: "description",
                            content: "NFTs tracing their collectors’ collection graph to project future acquisitions"
                        }), (0,
                        n.jsx)("link", {
                            rel: "icon",
                            href: "/favicon.ico"
                        }), (0,
                        n.jsx)("meta", {
                            name: "twitter:card",
                            content: "summary_large_image"
                        }), (0,
                        n.jsx)("meta", {
                            name: "twitter:site",
                            content: "@arikan"
                        }), (0,
                        n.jsx)("meta", {
                            name: "twitter:title",
                            content: "Social Contracts"
                        }, "twitter-title"), (0,
                        n.jsx)("meta", {
                            name: "twitter:description",
                            content: "NFTs tracing their collectors’ collection graph to project future acquisitions"
                        }), (0,
                        n.jsx)("meta", {
                            name: "twitter:image",
                            content: "https://socialcontracts.jpg.space/SocialContracts-Card.png"
                        }, "twitter-image"), (0,
                        n.jsx)("meta", {
                            property: "og:type",
                            content: "website"
                        }), (0,
                        n.jsx)("meta", {
                            property: "og:title",
                            content: "Social Contracts"
                        }, "og-title"), (0,
                        n.jsx)("meta", {
                            property: "og:description",
                            content: "NFTs tracing their collectors’ collection graph to project future acquisitions"
                        }), (0,
                        n.jsx)("meta", {
                            property: "og:url",
                            content: "https://socialcontracts.jpg.space"
                        }, "og-url"), (0,
                        n.jsx)("meta", {
                            property: "og:image",
                            content: "https://socialcontracts.jpg.space/SocialContracts-Card.png"
                        }, "og-image")]
                    }), (0,
                    n.jsx)("div", {
                        className: "wrapper h-100 ".concat(N),
                        children: (0,
                        n.jsx)(d.N.Provider, {
                            value: w,
                            children: (0,
                            n.jsx)(e, {
                                ...r,
                                walletState: i,
                                network: g,
                                account: v,
                                onConnectWalletButtonClick: _
                            })
                        })
                    })]
                })
            })
        }
    },
    5526: function(t, e, r) {
        "use strict";
        r.d(e, {
            Fo: function() {
                return L
            },
            f3: function() {
                return F
            },
            oN: function() {
                return T
            },
            xW: function() {
                return C
            }
        });
        var n = r(8088)
          , i = r(2263)
          , o = r(2593)
          , s = r(4956)
          , a = r(1184)
          , u = r(8198)
          , l = r(1556)
          , h = r(9485)
          , f = r(6441)
          , c = r(6881)
          , d = r(3875)
          , p = r(1581)
          , m = function(t, e, r, n) {
            return new (r || (r = Promise))(function(i, o) {
                function s(t) {
                    try {
                        u(n.next(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function a(t) {
                    try {
                        u(n.throw(t))
                    } catch (e) {
                        o(e)
                    }
                }
                function u(t) {
                    var e;
                    t.done ? i(t.value) : ((e = t.value)instanceof r ? e : new r(function(t) {
                        t(e)
                    }
                    )).then(s, a)
                }
                u((n = n.apply(t, e || [])).next())
            }
            )
        };
        let g = new p.Logger("contracts/5.6.2");
        function y(t, e) {
            return m(this, void 0, void 0, function*() {
                let r = yield e;
                "string" != typeof r && g.throwArgumentError("invalid address or ENS name", "name", r);
                try {
                    return (0,
                    h.getAddress)(r)
                } catch (n) {}
                t || g.throwError("a provider or signer is needed to resolve ENS names", p.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "resolveName"
                });
                let i = yield t.resolveName(r);
                return null == i && g.throwArgumentError("resolver or addr is not configured for ENS name", "name", r),
                i
            })
        }
        function v(t, e, r) {
            return m(this, void 0, void 0, function*() {
                let n = {};
                r.length === e.inputs.length + 1 && "object" == typeof r[r.length - 1] && (n = (0,
                c.shallowCopy)(r.pop())),
                g.checkArgumentCount(r.length, e.inputs.length, "passed to contract"),
                t.signer ? n.from ? n.from = (0,
                c.resolveProperties)({
                    override: y(t.signer, n.from),
                    signer: t.signer.getAddress()
                }).then(t=>m(this, void 0, void 0, function*() {
                    return (0,
                    h.getAddress)(t.signer) !== t.override && g.throwError("Contract with a Signer cannot override from", p.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: "overrides.from"
                    }),
                    t.override
                })) : n.from = t.signer.getAddress() : n.from && (n.from = y(t.provider, n.from));
                let i = yield(0,
                c.resolveProperties)({
                    args: function t(e, r, n) {
                        return m(this, void 0, void 0, function*() {
                            return Array.isArray(n) ? yield Promise.all(n.map((n,i)=>t(e, Array.isArray(r) ? r[i] : r[n.name], n))) : "address" === n.type ? yield y(e, r) : "tuple" === n.type ? yield t(e, r, n.components) : "array" === n.baseType ? Array.isArray(r) ? yield Promise.all(r.map(r=>t(e, r, n.arrayChildren))) : Promise.reject(g.makeError("invalid value for array", p.Logger.errors.INVALID_ARGUMENT, {
                                argument: "value",
                                value: r
                            })) : r
                        })
                    }(t.signer || t.provider, r, e.inputs),
                    address: t.resolvedAddress,
                    overrides: (0,
                    c.resolveProperties)(n) || {}
                })
                  , s = t.interface.encodeFunctionData(e, i.args)
                  , a = {
                    data: s,
                    to: i.address
                }
                  , u = i.overrides;
                if (null != u.nonce && (a.nonce = o.O$.from(u.nonce).toNumber()),
                null != u.gasLimit && (a.gasLimit = o.O$.from(u.gasLimit)),
                null != u.gasPrice && (a.gasPrice = o.O$.from(u.gasPrice)),
                null != u.maxFeePerGas && (a.maxFeePerGas = o.O$.from(u.maxFeePerGas)),
                null != u.maxPriorityFeePerGas && (a.maxPriorityFeePerGas = o.O$.from(u.maxPriorityFeePerGas)),
                null != u.from && (a.from = u.from),
                null != u.type && (a.type = u.type),
                null != u.accessList && (a.accessList = (0,
                d.accessListify)(u.accessList)),
                null == a.gasLimit && null != e.gas) {
                    let l = 21e3
                      , v = (0,
                    f.arrayify)(s);
                    for (let b = 0; b < v.length; b++)
                        l += 4,
                        v[b] && (l += 64);
                    a.gasLimit = o.O$.from(e.gas).add(l)
                }
                if (u.value) {
                    let w = o.O$.from(u.value);
                    w.isZero() || e.payable || g.throwError("non-payable method cannot override value", p.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: "overrides.value",
                        value: n.value
                    }),
                    a.value = w
                }
                u.customData && (a.customData = (0,
                c.shallowCopy)(u.customData)),
                u.ccipReadEnabled && (a.ccipReadEnabled = !!u.ccipReadEnabled),
                delete n.nonce,
                delete n.gasLimit,
                delete n.gasPrice,
                delete n.from,
                delete n.value,
                delete n.type,
                delete n.accessList,
                delete n.maxFeePerGas,
                delete n.maxPriorityFeePerGas,
                delete n.customData,
                delete n.ccipReadEnabled;
                let E = Object.keys(n).filter(t=>null != n[t]);
                return E.length && g.throwError(`cannot override ${E.map(t=>JSON.stringify(t)).join(",")}`, p.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "overrides",
                    overrides: E
                }),
                a
            })
        }
        function b(t, e, r) {
            let n = t.signer || t.provider;
            return function(...i) {
                return m(this, void 0, void 0, function*() {
                    let o;
                    if (i.length === e.inputs.length + 1 && "object" == typeof i[i.length - 1]) {
                        let s = (0,
                        c.shallowCopy)(i.pop());
                        null != s.blockTag && (o = yield s.blockTag),
                        delete s.blockTag,
                        i.push(s)
                    }
                    null != t.deployTransaction && (yield t._deployed(o));
                    let a = yield v(t, e, i)
                      , u = yield n.call(a, o);
                    try {
                        let l = t.interface.decodeFunctionResult(e, u);
                        return r && 1 === e.outputs.length && (l = l[0]),
                        l
                    } catch (h) {
                        throw h.code === p.Logger.errors.CALL_EXCEPTION && (h.address = t.address,
                        h.args = i,
                        h.transaction = a),
                        h
                    }
                })
            }
        }
        function w(t, e, r) {
            return e.constant ? b(t, e, r) : function(...r) {
                return m(this, void 0, void 0, function*() {
                    t.signer || g.throwError("sending a transaction requires a signer", p.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: "sendTransaction"
                    }),
                    null != t.deployTransaction && (yield t._deployed());
                    let n = yield v(t, e, r)
                      , i = yield t.signer.sendTransaction(n);
                    return function(t, e) {
                        let r = e.wait.bind(e);
                        e.wait = e=>r(e).then(e=>(e.events = e.logs.map(r=>{
                            let n = (0,
                            c.deepCopy)(r)
                              , i = null;
                            try {
                                i = t.interface.parseLog(r)
                            } catch (o) {}
                            return i && (n.args = i.args,
                            n.decode = (e,r)=>t.interface.decodeEventLog(i.eventFragment, e, r),
                            n.event = i.name,
                            n.eventSignature = i.signature),
                            n.removeListener = ()=>t.provider,
                            n.getBlock = ()=>t.provider.getBlock(e.blockHash),
                            n.getTransaction = ()=>t.provider.getTransaction(e.transactionHash),
                            n.getTransactionReceipt = ()=>Promise.resolve(e),
                            n
                        }
                        ),
                        e))
                    }(t, i),
                    i
                })
            }
        }
        function E(t) {
            return t.address && (null == t.topics || 0 === t.topics.length) ? "*" : (t.address || "*") + "@" + (t.topics ? t.topics.map(t=>Array.isArray(t) ? t.join("|") : t).join(":") : "")
        }
        class _ {
            constructor(t, e) {
                (0,
                c.defineReadOnly)(this, "tag", t),
                (0,
                c.defineReadOnly)(this, "filter", e),
                this._listeners = []
            }
            addListener(t, e) {
                this._listeners.push({
                    listener: t,
                    once: e
                })
            }
            removeListener(t) {
                let e = !1;
                this._listeners = this._listeners.filter(r=>!!e || r.listener !== t || (e = !0,
                !1))
            }
            removeAllListeners() {
                this._listeners = []
            }
            listeners() {
                return this._listeners.map(t=>t.listener)
            }
            listenerCount() {
                return this._listeners.length
            }
            run(t) {
                let e = this.listenerCount();
                return this._listeners = this._listeners.filter(e=>{
                    let r = t.slice();
                    return setTimeout(()=>{
                        e.listener.apply(this, r)
                    }
                    , 0),
                    !e.once
                }
                ),
                e
            }
            prepareEvent(t) {}
            getEmit(t) {
                return [t]
            }
        }
        class x extends _ {
            constructor() {
                super("error", null)
            }
        }
        class A extends _ {
            constructor(t, e, r, n) {
                let i = {
                    address: t
                }
                  , o = e.getEventTopic(r);
                n ? (o !== n[0] && g.throwArgumentError("topic mismatch", "topics", n),
                i.topics = n.slice()) : i.topics = [o],
                super(E(i), i),
                (0,
                c.defineReadOnly)(this, "address", t),
                (0,
                c.defineReadOnly)(this, "interface", e),
                (0,
                c.defineReadOnly)(this, "fragment", r)
            }
            prepareEvent(t) {
                super.prepareEvent(t),
                t.event = this.fragment.name,
                t.eventSignature = this.fragment.format(),
                t.decode = (t,e)=>this.interface.decodeEventLog(this.fragment, t, e);
                try {
                    t.args = this.interface.decodeEventLog(this.fragment, t.data, t.topics)
                } catch (e) {
                    t.args = null,
                    t.decodeError = e
                }
            }
            getEmit(t) {
                let e = (0,
                a.BR)(t.args);
                if (e.length)
                    throw e[0].error;
                let r = (t.args || []).slice();
                return r.push(t),
                r
            }
        }
        class k extends _ {
            constructor(t, e) {
                super("*", {
                    address: t
                }),
                (0,
                c.defineReadOnly)(this, "address", t),
                (0,
                c.defineReadOnly)(this, "interface", e)
            }
            prepareEvent(t) {
                super.prepareEvent(t);
                try {
                    let e = this.interface.parseLog(t);
                    t.event = e.name,
                    t.eventSignature = e.signature,
                    t.decode = (t,r)=>this.interface.decodeEventLog(e.eventFragment, t, r),
                    t.args = e.args
                } catch (r) {}
            }
        }
        class N {
            constructor(t, e, r) {
                (0,
                c.defineReadOnly)(this, "interface", (0,
                c.getStatic)(new.target, "getInterface")(e)),
                null == r ? ((0,
                c.defineReadOnly)(this, "provider", null),
                (0,
                c.defineReadOnly)(this, "signer", null)) : n.E.isSigner(r) ? ((0,
                c.defineReadOnly)(this, "provider", r.provider || null),
                (0,
                c.defineReadOnly)(this, "signer", r)) : l.zt.isProvider(r) ? ((0,
                c.defineReadOnly)(this, "provider", r),
                (0,
                c.defineReadOnly)(this, "signer", null)) : g.throwArgumentError("invalid signer or provider", "signerOrProvider", r),
                (0,
                c.defineReadOnly)(this, "callStatic", {}),
                (0,
                c.defineReadOnly)(this, "estimateGas", {}),
                (0,
                c.defineReadOnly)(this, "functions", {}),
                (0,
                c.defineReadOnly)(this, "populateTransaction", {}),
                (0,
                c.defineReadOnly)(this, "filters", {});
                {
                    let i = {};
                    Object.keys(this.interface.events).forEach(t=>{
                        let e = this.interface.events[t];
                        (0,
                        c.defineReadOnly)(this.filters, t, (...t)=>({
                            address: this.address,
                            topics: this.interface.encodeFilterTopics(e, t)
                        })),
                        i[e.name] || (i[e.name] = []),
                        i[e.name].push(t)
                    }
                    ),
                    Object.keys(i).forEach(t=>{
                        let e = i[t];
                        1 === e.length ? (0,
                        c.defineReadOnly)(this.filters, t, this.filters[e[0]]) : g.warn(`Duplicate definition of ${t} (${e.join(", ")})`)
                    }
                    )
                }
                if ((0,
                c.defineReadOnly)(this, "_runningEvents", {}),
                (0,
                c.defineReadOnly)(this, "_wrappedEmits", {}),
                null == t && g.throwArgumentError("invalid contract address or ENS name", "addressOrName", t),
                (0,
                c.defineReadOnly)(this, "address", t),
                this.provider)
                    (0,
                    c.defineReadOnly)(this, "resolvedAddress", y(this.provider, t));
                else
                    try {
                        (0,
                        c.defineReadOnly)(this, "resolvedAddress", Promise.resolve((0,
                        h.getAddress)(t)))
                    } catch (o) {
                        g.throwError("provider is required to use ENS name as contract address", p.Logger.errors.UNSUPPORTED_OPERATION, {
                            operation: "new Contract"
                        })
                    }
                this.resolvedAddress.catch(t=>{}
                );
                let s = {}
                  , a = {};
                Object.keys(this.interface.functions).forEach(t=>{
                    let e = this.interface.functions[t];
                    if (a[t]) {
                        g.warn(`Duplicate ABI entry for ${JSON.stringify(t)}`);
                        return
                    }
                    a[t] = !0;
                    {
                        let r = e.name;
                        s[`%${r}`] || (s[`%${r}`] = []),
                        s[`%${r}`].push(t)
                    }
                    if (null == this[t] && (0,
                    c.defineReadOnly)(this, t, w(this, e, !0)),
                    null == this.functions[t] && (0,
                    c.defineReadOnly)(this.functions, t, w(this, e, !1)),
                    null == this.callStatic[t] && (0,
                    c.defineReadOnly)(this.callStatic, t, b(this, e, !0)),
                    null == this.populateTransaction[t]) {
                        var n;
                        (0,
                        c.defineReadOnly)(this.populateTransaction, t, (n = this,
                        function(...t) {
                            return v(n, e, t)
                        }
                        ))
                    }
                    null == this.estimateGas[t] && (0,
                    c.defineReadOnly)(this.estimateGas, t, function(t, e) {
                        let r = t.signer || t.provider;
                        return function(...n) {
                            return m(this, void 0, void 0, function*() {
                                r || g.throwError("estimate require a provider or signer", p.Logger.errors.UNSUPPORTED_OPERATION, {
                                    operation: "estimateGas"
                                });
                                let i = yield v(t, e, n);
                                return yield r.estimateGas(i)
                            })
                        }
                    }(this, e))
                }
                ),
                Object.keys(s).forEach(t=>{
                    let e = s[t];
                    if (e.length > 1)
                        return;
                    t = t.substring(1);
                    let r = e[0];
                    try {
                        null == this[t] && (0,
                        c.defineReadOnly)(this, t, this[r])
                    } catch (n) {}
                    null == this.functions[t] && (0,
                    c.defineReadOnly)(this.functions, t, this.functions[r]),
                    null == this.callStatic[t] && (0,
                    c.defineReadOnly)(this.callStatic, t, this.callStatic[r]),
                    null == this.populateTransaction[t] && (0,
                    c.defineReadOnly)(this.populateTransaction, t, this.populateTransaction[r]),
                    null == this.estimateGas[t] && (0,
                    c.defineReadOnly)(this.estimateGas, t, this.estimateGas[r])
                }
                )
            }
            static getContractAddress(t) {
                return (0,
                h.getContractAddress)(t)
            }
            static getInterface(t) {
                return u.vU.isInterface(t) ? t : new u.vU(t)
            }
            deployed() {
                return this._deployed()
            }
            _deployed(t) {
                return this._deployedPromise || (this.deployTransaction ? this._deployedPromise = this.deployTransaction.wait().then(()=>this) : this._deployedPromise = this.provider.getCode(this.address, t).then(t=>("0x" === t && g.throwError("contract not deployed", p.Logger.errors.UNSUPPORTED_OPERATION, {
                    contractAddress: this.address,
                    operation: "getDeployed"
                }),
                this))),
                this._deployedPromise
            }
            fallback(t) {
                this.signer || g.throwError("sending a transactions require a signer", p.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "sendTransaction(fallback)"
                });
                let e = (0,
                c.shallowCopy)(t || {});
                return ["from", "to"].forEach(function(t) {
                    null != e[t] && g.throwError("cannot override " + t, p.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: t
                    })
                }),
                e.to = this.resolvedAddress,
                this.deployed().then(()=>this.signer.sendTransaction(e))
            }
            connect(t) {
                "string" == typeof t && (t = new n.b(t,this.provider));
                let e = new this.constructor(this.address,this.interface,t);
                return this.deployTransaction && (0,
                c.defineReadOnly)(e, "deployTransaction", this.deployTransaction),
                e
            }
            attach(t) {
                return new this.constructor(t,this.interface,this.signer || this.provider)
            }
            static isIndexed(t) {
                return u.Hk.isIndexed(t)
            }
            _normalizeRunningEvent(t) {
                return this._runningEvents[t.tag] ? this._runningEvents[t.tag] : t
            }
            _getRunningEvent(t) {
                if ("string" == typeof t) {
                    if ("error" === t)
                        return this._normalizeRunningEvent(new x);
                    if ("event" === t)
                        return this._normalizeRunningEvent(new _("event",null));
                    if ("*" === t)
                        return this._normalizeRunningEvent(new k(this.address,this.interface));
                    let e = this.interface.getEvent(t);
                    return this._normalizeRunningEvent(new A(this.address,this.interface,e))
                }
                if (t.topics && t.topics.length > 0) {
                    try {
                        let r = t.topics[0];
                        if ("string" != typeof r)
                            throw Error("invalid topic");
                        let n = this.interface.getEvent(r);
                        return this._normalizeRunningEvent(new A(this.address,this.interface,n,t.topics))
                    } catch (i) {}
                    let o = {
                        address: this.address,
                        topics: t.topics
                    };
                    return this._normalizeRunningEvent(new _(E(o),o))
                }
                return this._normalizeRunningEvent(new k(this.address,this.interface))
            }
            _checkRunningEvents(t) {
                if (0 === t.listenerCount()) {
                    delete this._runningEvents[t.tag];
                    let e = this._wrappedEmits[t.tag];
                    e && t.filter && (this.provider.off(t.filter, e),
                    delete this._wrappedEmits[t.tag])
                }
            }
            _wrapEvent(t, e, r) {
                let n = (0,
                c.deepCopy)(e);
                return n.removeListener = ()=>{
                    r && (t.removeListener(r),
                    this._checkRunningEvents(t))
                }
                ,
                n.getBlock = ()=>this.provider.getBlock(e.blockHash),
                n.getTransaction = ()=>this.provider.getTransaction(e.transactionHash),
                n.getTransactionReceipt = ()=>this.provider.getTransactionReceipt(e.transactionHash),
                t.prepareEvent(n),
                n
            }
            _addEventListener(t, e, r) {
                if (this.provider || g.throwError("events require a provider or a signer with a provider", p.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "once"
                }),
                t.addListener(e, r),
                this._runningEvents[t.tag] = t,
                !this._wrappedEmits[t.tag]) {
                    let n = r=>{
                        let n = this._wrapEvent(t, r, e);
                        if (null == n.decodeError)
                            try {
                                let i = t.getEmit(n);
                                this.emit(t.filter, ...i)
                            } catch (o) {
                                n.decodeError = o.error
                            }
                        null != t.filter && this.emit("event", n),
                        null != n.decodeError && this.emit("error", n.decodeError, n)
                    }
                    ;
                    this._wrappedEmits[t.tag] = n,
                    null != t.filter && this.provider.on(t.filter, n)
                }
            }
            queryFilter(t, e, r) {
                let n = this._getRunningEvent(t)
                  , i = (0,
                c.shallowCopy)(n.filter);
                return "string" == typeof e && (0,
                f.isHexString)(e, 32) ? (null != r && g.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", r),
                i.blockHash = e) : (i.fromBlock = null != e ? e : 0,
                i.toBlock = null != r ? r : "latest"),
                this.provider.getLogs(i).then(t=>t.map(t=>this._wrapEvent(n, t, null)))
            }
            on(t, e) {
                return this._addEventListener(this._getRunningEvent(t), e, !1),
                this
            }
            once(t, e) {
                return this._addEventListener(this._getRunningEvent(t), e, !0),
                this
            }
            emit(t, ...e) {
                if (!this.provider)
                    return !1;
                let r = this._getRunningEvent(t)
                  , n = r.run(e) > 0;
                return this._checkRunningEvents(r),
                n
            }
            listenerCount(t) {
                return this.provider ? null == t ? Object.keys(this._runningEvents).reduce((t,e)=>t + this._runningEvents[e].listenerCount(), 0) : this._getRunningEvent(t).listenerCount() : 0
            }
            listeners(t) {
                if (!this.provider)
                    return [];
                if (null == t) {
                    let e = [];
                    for (let r in this._runningEvents)
                        this._runningEvents[r].listeners().forEach(t=>{
                            e.push(t)
                        }
                        );
                    return e
                }
                return this._getRunningEvent(t).listeners()
            }
            removeAllListeners(t) {
                if (!this.provider)
                    return this;
                if (null == t) {
                    for (let e in this._runningEvents) {
                        let r = this._runningEvents[e];
                        r.removeAllListeners(),
                        this._checkRunningEvents(r)
                    }
                    return this
                }
                let n = this._getRunningEvent(t);
                return n.removeAllListeners(),
                this._checkRunningEvents(n),
                this
            }
            off(t, e) {
                if (!this.provider)
                    return this;
                let r = this._getRunningEvent(t);
                return r.removeListener(e),
                this._checkRunningEvents(r),
                this
            }
            removeListener(t, e) {
                return this.off(t, e)
            }
        }
        class M extends N {
        }
        var P = r(7095)
          , S = JSON.parse('[{"inputs":[{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"string","name":"_baseuri","type":"string"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"uint256","name":"_mintFee","type":"uint256"},{"internalType":"address payable","name":"_feeAddress","type":"address"},{"internalType":"uint8","name":"_mintPerAddressLimit","type":"uint8"},{"internalType":"uint256","name":"_mintFeeDiscounted","type":"uint256"},{"internalType":"address","name":"_canoniconContract","type":"address"},{"internalType":"uint256","name":"_splitRate","type":"uint256"},{"internalType":"address payable","name":"_splitAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PaymentReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressMintedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getMintBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getProvenance","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isDiscounted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_mintAmount","type":"uint8"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintFeeDiscounted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPerAddressLimit","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"provenance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"releasable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"released","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"splitRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"account","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
        r(1661);
        let R = {
            testnet: S,
            goerli: S,
            mainnet: S,
            fuji: S,
            avalanche: S
        }
          , O = t=>R[t]
          , T = async()=>Boolean(window.ethereum) && await B().listAccounts().then(t=>t.length > 0);
        class I extends n.E {
            connect() {
                return this
            }
            getAddress() {
                return Promise.resolve("")
            }
            signMessage() {
                return Promise.resolve("")
            }
            signTransaction() {
                return Promise.resolve("")
            }
        }
        class L extends i.Zk {
            call(t, e) {
                return Promise.resolve("")
            }
            emit(t) {
                for (var e = arguments.length, r = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
                    r[n - 1] = arguments[n];
                return !1
            }
            estimateGas(t) {
                return Promise.resolve(o.O$.from(0))
            }
            getBalance(t, e) {
                return Promise.resolve(o.O$.from(0))
            }
            getBlock(t) {
                return Promise.resolve({
                    _difficulty: o.O$.from(0),
                    transactions: [],
                    hash: "",
                    parentHash: "",
                    number: 0,
                    timestamp: 0,
                    nonce: "",
                    difficulty: 0,
                    gasLimit: o.O$.from(0),
                    gasUsed: o.O$.from(0),
                    miner: "",
                    extraData: "",
                    baseFeePerGas: null
                })
            }
            getBlockNumber() {
                return Promise.resolve(0)
            }
            getBlockWithTransactions(t) {
                return Promise.resolve({
                    _difficulty: o.O$.from(0),
                    transactions: [],
                    hash: "",
                    parentHash: "",
                    number: 0,
                    timestamp: 0,
                    nonce: "",
                    difficulty: 0,
                    gasLimit: o.O$.from(0),
                    gasUsed: o.O$.from(0),
                    miner: "",
                    extraData: "",
                    baseFeePerGas: null
                })
            }
            getCode(t, e) {
                return Promise.resolve("")
            }
            getGasPrice() {
                return Promise.resolve(o.O$.from(0))
            }
            getSigner() {
                return new I
            }
            listAccounts() {
                return Promise.resolve([])
            }
            constructor() {
                super("testnet")
            }
        }
        let C = function(t, e) {
            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                interval: 500,
                blocksToWait: 1
            }
              , {interval: n, blocksToWait: i} = r
              , o = async function(e, r, s) {
                try {
                    let a = t.getTransactionReceipt(e);
                    if (a) {
                        if (i > 0) {
                            let u = await a;
                            if (u && u.blockNumber)
                                try {
                                    let l = await t.getBlock(u.blockNumber)
                                      , h = await t.getBlock("latest");
                                    if (h.number - l.number >= i) {
                                        let f = await t.getTransaction(e);
                                        null != f.blockNumber ? r(u) : s(Error("Transaction with hash: " + e + " ended up in an uncle block."))
                                    } else
                                        setTimeout(function() {
                                            o(e, r, s)
                                        }, n)
                                } catch (c) {
                                    setTimeout(function() {
                                        o(e, r, s)
                                    }, n)
                                }
                            else
                                setTimeout(function() {
                                    o(e, r, s)
                                }, n)
                        } else
                            r(a)
                    } else
                        setTimeout(function() {
                            o(e, r, s)
                        }, n)
                } catch (d) {
                    s(d)
                }
            };
            if (!Array.isArray(e))
                return new Promise(function(t, r) {
                    o(e, t, r)
                }
                );
            {
                let s = [];
                return e.forEach(function(e) {
                    s.push(C(t, e, r))
                }),
                Promise.all(s)
            }
        }
          , B = ()=>{
            try {
                return new s.Q(window.ethereum)
            } catch (t) {
                return new L
            }
        }
          , F = function(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : P.pn;
            return new M(P.xk[e],O(e),t)
        }
    },
    1661: function(t, e, r) {
        "use strict";
        r.d(e, {
            Vb: function() {
                return i
            },
            jY: function() {
                return s
            },
            m7: function() {
                return o
            }
        });
        var n = r(7095);
        let i = t=>n.g5[t]
          , o = t=>{
            switch (t) {
            case 5:
                return "goerli";
            case 1:
                return "mainnet";
            case 43113:
                return "testnet";
            case 43114:
                return "avalanche";
            default:
                return null
            }
        }
          , s = t=>("testnet" === t && (t = "goerli"),
        n.g5[t].blockExplorerUrls[0])
    },
    2531: function() {},
    7663: function(t) {
        !function() {
            var e = {
                229: function(t) {
                    var e, r, n, i = t.exports = {};
                    function o() {
                        throw Error("setTimeout has not been defined")
                    }
                    function s() {
                        throw Error("clearTimeout has not been defined")
                    }
                    function a(t) {
                        if (e === setTimeout)
                            return setTimeout(t, 0);
                        if ((e === o || !e) && setTimeout)
                            return e = setTimeout,
                            setTimeout(t, 0);
                        try {
                            return e(t, 0)
                        } catch (n) {
                            try {
                                return e.call(null, t, 0)
                            } catch (r) {
                                return e.call(this, t, 0)
                            }
                        }
                    }
                    !function() {
                        try {
                            e = "function" == typeof setTimeout ? setTimeout : o
                        } catch (t) {
                            e = o
                        }
                        try {
                            r = "function" == typeof clearTimeout ? clearTimeout : s
                        } catch (n) {
                            r = s
                        }
                    }();
                    var u = []
                      , l = !1
                      , h = -1;
                    function f() {
                        l && n && (l = !1,
                        n.length ? u = n.concat(u) : h = -1,
                        u.length && c())
                    }
                    function c() {
                        if (!l) {
                            var t = a(f);
                            l = !0;
                            for (var e = u.length; e; ) {
                                for (n = u,
                                u = []; ++h < e; )
                                    n && n[h].run();
                                h = -1,
                                e = u.length
                            }
                            n = null,
                            l = !1,
                            function(t) {
                                if (r === clearTimeout)
                                    return clearTimeout(t);
                                if ((r === s || !r) && clearTimeout)
                                    return r = clearTimeout,
                                    clearTimeout(t);
                                try {
                                    r(t)
                                } catch (n) {
                                    try {
                                        return r.call(null, t)
                                    } catch (e) {
                                        return r.call(this, t)
                                    }
                                }
                            }(t)
                        }
                    }
                    function d(t, e) {
                        this.fun = t,
                        this.array = e
                    }
                    function p() {}
                    i.nextTick = function(t) {
                        var e = Array(arguments.length - 1);
                        if (arguments.length > 1)
                            for (var r = 1; r < arguments.length; r++)
                                e[r - 1] = arguments[r];
                        u.push(new d(t,e)),
                        1 !== u.length || l || a(c)
                    }
                    ,
                    d.prototype.run = function() {
                        this.fun.apply(null, this.array)
                    }
                    ,
                    i.title = "browser",
                    i.browser = !0,
                    i.env = {},
                    i.argv = [],
                    i.version = "",
                    i.versions = {},
                    i.on = p,
                    i.addListener = p,
                    i.once = p,
                    i.off = p,
                    i.removeListener = p,
                    i.removeAllListeners = p,
                    i.emit = p,
                    i.prependListener = p,
                    i.prependOnceListener = p,
                    i.listeners = function(t) {
                        return []
                    }
                    ,
                    i.binding = function(t) {
                        throw Error("process.binding is not supported")
                    }
                    ,
                    i.cwd = function() {
                        return "/"
                    }
                    ,
                    i.chdir = function(t) {
                        throw Error("process.chdir is not supported")
                    }
                    ,
                    i.umask = function() {
                        return 0
                    }
                }
            }
              , r = {};
            function n(t) {
                var i = r[t];
                if (void 0 !== i)
                    return i.exports;
                var o = r[t] = {
                    exports: {}
                }
                  , s = !0;
                try {
                    e[t](o, o.exports, n),
                    s = !1
                } finally {
                    s && delete r[t]
                }
                return o.exports
            }
            n.ab = "//";
            var i = n(229);
            t.exports = i
        }()
    },
    9008: function(t, e, r) {
        t.exports = r(3121)
    },
    1163: function(t, e, r) {
        t.exports = r(880)
    },
    6601: function() {}
}, function(t) {
    var e = function(e) {
        return t(t.s = e)
    };
    t.O(0, [774, 179], function() {
        return e(6840),
        e(880)
    }),
    _N_E = t.O()
}
]);
