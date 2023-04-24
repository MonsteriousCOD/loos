/*! For license information please see dapp-interface.js.LICENSE.txt */
(()=>{
    var t = {
        50: (t,e)=>{
            "use strict";
            function r(t) {
                if (!Number.isSafeInteger(t) || t < 0)
                    throw new Error(`Wrong positive integer: ${t}`)
            }
            function n(t) {
                if ("boolean" != typeof t)
                    throw new Error(`Expected boolean, not ${t}`)
            }
            function o(t, ...e) {
                if (!(t instanceof Uint8Array))
                    throw new TypeError("Expected Uint8Array");
                if (e.length > 0 && !e.includes(t.length))
                    throw new TypeError(`Expected Uint8Array of length ${e}, not of length=${t.length}`)
            }
            function i(t) {
                if ("function" != typeof t || "function" != typeof t.create)
                    throw new Error("Hash should be wrapped by utils.wrapConstructor");
                r(t.outputLen),
                r(t.blockLen)
            }
            function s(t, e=!0) {
                if (t.destroyed)
                    throw new Error("Hash instance has been destroyed");
                if (e && t.finished)
                    throw new Error("Hash#digest() has already been called")
            }
            function a(t, e) {
                o(t);
                const r = e.outputLen;
                if (t.length < r)
                    throw new Error(`digestInto() expects output buffer of length at least ${r}`)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.output = e.exists = e.hash = e.bytes = e.bool = e.number = void 0,
            e.number = r,
            e.bool = n,
            e.bytes = o,
            e.hash = i,
            e.exists = s,
            e.output = a;
            const c = {
                number: r,
                bool: n,
                bytes: o,
                hash: i,
                exists: s,
                output: a
            };
            e.default = c
        }
        ,
        3576: (t,e,r)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.SHA2 = void 0;
            const n = r(50)
              , o = r(6849);
            class i extends o.Hash {
                constructor(t, e, r, n) {
                    super(),
                    this.blockLen = t,
                    this.outputLen = e,
                    this.padOffset = r,
                    this.isLE = n,
                    this.finished = !1,
                    this.length = 0,
                    this.pos = 0,
                    this.destroyed = !1,
                    this.buffer = new Uint8Array(t),
                    this.view = (0,
                    o.createView)(this.buffer)
                }
                update(t) {
                    n.default.exists(this);
                    const {view: e, buffer: r, blockLen: i} = this
                      , s = (t = (0,
                    o.toBytes)(t)).length;
                    for (let n = 0; n < s; ) {
                        const a = Math.min(i - this.pos, s - n);
                        if (a !== i)
                            r.set(t.subarray(n, n + a), this.pos),
                            this.pos += a,
                            n += a,
                            this.pos === i && (this.process(e, 0),
                            this.pos = 0);
                        else {
                            const e = (0,
                            o.createView)(t);
                            for (; i <= s - n; n += i)
                                this.process(e, n)
                        }
                    }
                    return this.length += t.length,
                    this.roundClean(),
                    this
                }
                digestInto(t) {
                    n.default.exists(this),
                    n.default.output(t, this),
                    this.finished = !0;
                    const {buffer: e, view: r, blockLen: i, isLE: s} = this;
                    let {pos: a} = this;
                    e[a++] = 128,
                    this.buffer.subarray(a).fill(0),
                    this.padOffset > i - a && (this.process(r, 0),
                    a = 0);
                    for (let t = a; t < i; t++)
                        e[t] = 0;
                    !function(t, e, r, n) {
                        if ("function" == typeof t.setBigUint64)
                            return t.setBigUint64(e, r, n);
                        const o = BigInt(32)
                          , i = BigInt(4294967295)
                          , s = Number(r >> o & i)
                          , a = Number(r & i)
                          , c = n ? 4 : 0
                          , u = n ? 0 : 4;
                        t.setUint32(e + c, s, n),
                        t.setUint32(e + u, a, n)
                    }(r, i - 8, BigInt(8 * this.length), s),
                    this.process(r, 0);
                    const c = (0,
                    o.createView)(t)
                      , u = this.outputLen;
                    if (u % 4)
                        throw new Error("_sha2: outputLen should be aligned to 32bit");
                    const f = u / 4
                      , h = this.get();
                    if (f > h.length)
                        throw new Error("_sha2: outputLen bigger than state");
                    for (let t = 0; t < f; t++)
                        c.setUint32(4 * t, h[t], s)
                }
                digest() {
                    const {buffer: t, outputLen: e} = this;
                    this.digestInto(t);
                    const r = t.slice(0, e);
                    return this.destroy(),
                    r
                }
                _cloneInto(t) {
                    t || (t = new this.constructor),
                    t.set(...this.get());
                    const {blockLen: e, buffer: r, length: n, finished: o, destroyed: i, pos: s} = this;
                    return t.length = n,
                    t.pos = s,
                    t.finished = o,
                    t.destroyed = i,
                    n % e && t.buffer.set(r),
                    t
                }
            }
            e.SHA2 = i
        }
        ,
        6541: (t,e)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.add = e.toBig = e.split = e.fromBig = void 0;
            const r = BigInt(2 ** 32 - 1)
              , n = BigInt(32);
            function o(t, e=!1) {
                return e ? {
                    h: Number(t & r),
                    l: Number(t >> n & r)
                } : {
                    h: 0 | Number(t >> n & r),
                    l: 0 | Number(t & r)
                }
            }
            function i(t, e=!1) {
                let r = new Uint32Array(t.length)
                  , n = new Uint32Array(t.length);
                for (let i = 0; i < t.length; i++) {
                    const {h: s, l: a} = o(t[i], e);
                    [r[i],n[i]] = [s, a]
                }
                return [r, n]
            }
            function s(t, e, r, n) {
                const o = (e >>> 0) + (n >>> 0);
                return {
                    h: t + r + (o / 2 ** 32 | 0) | 0,
                    l: 0 | o
                }
            }
            e.fromBig = o,
            e.split = i,
            e.toBig = (t,e)=>BigInt(t >>> 0) << n | BigInt(e >>> 0),
            e.add = s;
            const a = {
                fromBig: o,
                split: i,
                toBig: e.toBig,
                shrSH: (t,e,r)=>t >>> r,
                shrSL: (t,e,r)=>t << 32 - r | e >>> r,
                rotrSH: (t,e,r)=>t >>> r | e << 32 - r,
                rotrSL: (t,e,r)=>t << 32 - r | e >>> r,
                rotrBH: (t,e,r)=>t << 64 - r | e >>> r - 32,
                rotrBL: (t,e,r)=>t >>> r - 32 | e << 64 - r,
                rotr32H: (t,e)=>e,
                rotr32L: (t,e)=>t,
                rotlSH: (t,e,r)=>t << r | e >>> 32 - r,
                rotlSL: (t,e,r)=>e << r | t >>> 32 - r,
                rotlBH: (t,e,r)=>e << r - 32 | t >>> 64 - r,
                rotlBL: (t,e,r)=>t << r - 32 | e >>> 64 - r,
                add: s,
                add3L: (t,e,r)=>(t >>> 0) + (e >>> 0) + (r >>> 0),
                add3H: (t,e,r,n)=>e + r + n + (t / 2 ** 32 | 0) | 0,
                add4L: (t,e,r,n)=>(t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0),
                add4H: (t,e,r,n,o)=>e + r + n + o + (t / 2 ** 32 | 0) | 0,
                add5H: (t,e,r,n,o,i)=>e + r + n + o + i + (t / 2 ** 32 | 0) | 0,
                add5L: (t,e,r,n,o)=>(t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0) + (o >>> 0)
            };
            e.default = a
        }
        ,
        1230: (t,e)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.crypto = void 0,
            e.crypto = "object" == typeof globalThis && "crypto"in globalThis ? globalThis.crypto : void 0
        }
        ,
        7185: (t,e,r)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.hmac = void 0;
            const n = r(50)
              , o = r(6849);
            class i extends o.Hash {
                constructor(t, e) {
                    super(),
                    this.finished = !1,
                    this.destroyed = !1,
                    n.default.hash(t);
                    const r = (0,
                    o.toBytes)(e);
                    if (this.iHash = t.create(),
                    "function" != typeof this.iHash.update)
                        throw new TypeError("Expected instance of class which extends utils.Hash");
                    this.blockLen = this.iHash.blockLen,
                    this.outputLen = this.iHash.outputLen;
                    const i = this.blockLen
                      , s = new Uint8Array(i);
                    s.set(r.length > i ? t.create().update(r).digest() : r);
                    for (let t = 0; t < s.length; t++)
                        s[t] ^= 54;
                    this.iHash.update(s),
                    this.oHash = t.create();
                    for (let t = 0; t < s.length; t++)
                        s[t] ^= 106;
                    this.oHash.update(s),
                    s.fill(0)
                }
                update(t) {
                    return n.default.exists(this),
                    this.iHash.update(t),
                    this
                }
                digestInto(t) {
                    n.default.exists(this),
                    n.default.bytes(t, this.outputLen),
                    this.finished = !0,
                    this.iHash.digestInto(t),
                    this.oHash.update(t),
                    this.oHash.digestInto(t),
                    this.destroy()
                }
                digest() {
                    const t = new Uint8Array(this.oHash.outputLen);
                    return this.digestInto(t),
                    t
                }
                _cloneInto(t) {
                    t || (t = Object.create(Object.getPrototypeOf(this), {}));
                    const {oHash: e, iHash: r, finished: n, destroyed: o, blockLen: i, outputLen: s} = this;
                    return t.finished = n,
                    t.destroyed = o,
                    t.blockLen = i,
                    t.outputLen = s,
                    t.oHash = e._cloneInto(t.oHash),
                    t.iHash = r._cloneInto(t.iHash),
                    t
                }
                destroy() {
                    this.destroyed = !0,
                    this.oHash.destroy(),
                    this.iHash.destroy()
                }
            }
            e.hmac = (t,e,r)=>new i(t,e).update(r).digest(),
            e.hmac.create = (t,e)=>new i(t,e)
        }
        ,
        1383: (t,e,r)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.pbkdf2Async = e.pbkdf2 = void 0;
            const n = r(50)
              , o = r(7185)
              , i = r(6849);
            function s(t, e, r, s) {
                n.default.hash(t);
                const a = (0,
                i.checkOpts)({
                    dkLen: 32,
                    asyncTick: 10
                }, s)
                  , {c, dkLen: u, asyncTick: f} = a;
                if (n.default.number(c),
                n.default.number(u),
                n.default.number(f),
                c < 1)
                    throw new Error("PBKDF2: iterations (c) should be >= 1");
                const h = (0,
                i.toBytes)(e)
                  , l = (0,
                i.toBytes)(r)
                  , d = new Uint8Array(u)
                  , p = o.hmac.create(t, h)
                  , y = p._cloneInto().update(l);
                return {
                    c,
                    dkLen: u,
                    asyncTick: f,
                    DK: d,
                    PRF: p,
                    PRFSalt: y
                }
            }
            function a(t, e, r, n, o) {
                return t.destroy(),
                e.destroy(),
                n && n.destroy(),
                o.fill(0),
                r
            }
            e.pbkdf2 = function(t, e, r, n) {
                const {c: o, dkLen: c, DK: u, PRF: f, PRFSalt: h} = s(t, e, r, n);
                let l;
                const d = new Uint8Array(4)
                  , p = (0,
                i.createView)(d)
                  , y = new Uint8Array(f.outputLen);
                for (let t = 1, e = 0; e < c; t++,
                e += f.outputLen) {
                    const r = u.subarray(e, e + f.outputLen);
                    p.setInt32(0, t, !1),
                    (l = h._cloneInto(l)).update(d).digestInto(y),
                    r.set(y.subarray(0, r.length));
                    for (let t = 1; t < o; t++) {
                        f._cloneInto(l).update(y).digestInto(y);
                        for (let t = 0; t < r.length; t++)
                            r[t] ^= y[t]
                    }
                }
                return a(f, h, u, l, y)
            }
            ,
            e.pbkdf2Async = async function(t, e, r, n) {
                const {c: o, dkLen: c, asyncTick: u, DK: f, PRF: h, PRFSalt: l} = s(t, e, r, n);
                let d;
                const p = new Uint8Array(4)
                  , y = (0,
                i.createView)(p)
                  , g = new Uint8Array(h.outputLen);
                for (let t = 1, e = 0; e < c; t++,
                e += h.outputLen) {
                    const r = f.subarray(e, e + h.outputLen);
                    y.setInt32(0, t, !1),
                    (d = l._cloneInto(d)).update(p).digestInto(g),
                    r.set(g.subarray(0, r.length)),
                    await (0,
                    i.asyncLoop)(o - 1, u, (t=>{
                        h._cloneInto(d).update(g).digestInto(g);
                        for (let t = 0; t < r.length; t++)
                            r[t] ^= g[t]
                    }
                    ))
                }
                return a(h, l, f, d, g)
            }
        }
        ,
        3676: (t,e,r)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.sha224 = e.sha256 = void 0;
            const n = r(3576)
              , o = r(6849)
              , i = (t,e,r)=>t & e ^ t & r ^ e & r
              , s = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])
              , a = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225])
              , c = new Uint32Array(64);
            class u extends n.SHA2 {
                constructor() {
                    super(64, 32, 8, !1),
                    this.A = 0 | a[0],
                    this.B = 0 | a[1],
                    this.C = 0 | a[2],
                    this.D = 0 | a[3],
                    this.E = 0 | a[4],
                    this.F = 0 | a[5],
                    this.G = 0 | a[6],
                    this.H = 0 | a[7]
                }
                get() {
                    const {A: t, B: e, C: r, D: n, E: o, F: i, G: s, H: a} = this;
                    return [t, e, r, n, o, i, s, a]
                }
                set(t, e, r, n, o, i, s, a) {
                    this.A = 0 | t,
                    this.B = 0 | e,
                    this.C = 0 | r,
                    this.D = 0 | n,
                    this.E = 0 | o,
                    this.F = 0 | i,
                    this.G = 0 | s,
                    this.H = 0 | a
                }
                process(t, e) {
                    for (let r = 0; r < 16; r++,
                    e += 4)
                        c[r] = t.getUint32(e, !1);
                    for (let t = 16; t < 64; t++) {
                        const e = c[t - 15]
                          , r = c[t - 2]
                          , n = (0,
                        o.rotr)(e, 7) ^ (0,
                        o.rotr)(e, 18) ^ e >>> 3
                          , i = (0,
                        o.rotr)(r, 17) ^ (0,
                        o.rotr)(r, 19) ^ r >>> 10;
                        c[t] = i + c[t - 7] + n + c[t - 16] | 0
                    }
                    let {A: r, B: n, C: a, D: u, E: f, F: h, G: l, H: d} = this;
                    for (let t = 0; t < 64; t++) {
                        const e = d + ((0,
                        o.rotr)(f, 6) ^ (0,
                        o.rotr)(f, 11) ^ (0,
                        o.rotr)(f, 25)) + ((p = f) & h ^ ~p & l) + s[t] + c[t] | 0
                          , y = ((0,
                        o.rotr)(r, 2) ^ (0,
                        o.rotr)(r, 13) ^ (0,
                        o.rotr)(r, 22)) + i(r, n, a) | 0;
                        d = l,
                        l = h,
                        h = f,
                        f = u + e | 0,
                        u = a,
                        a = n,
                        n = r,
                        r = e + y | 0
                    }
                    var p;
                    r = r + this.A | 0,
                    n = n + this.B | 0,
                    a = a + this.C | 0,
                    u = u + this.D | 0,
                    f = f + this.E | 0,
                    h = h + this.F | 0,
                    l = l + this.G | 0,
                    d = d + this.H | 0,
                    this.set(r, n, a, u, f, h, l, d)
                }
                roundClean() {
                    c.fill(0)
                }
                destroy() {
                    this.set(0, 0, 0, 0, 0, 0, 0, 0),
                    this.buffer.fill(0)
                }
            }
            class f extends u {
                constructor() {
                    super(),
                    this.A = -1056596264,
                    this.B = 914150663,
                    this.C = 812702999,
                    this.D = -150054599,
                    this.E = -4191439,
                    this.F = 1750603025,
                    this.G = 1694076839,
                    this.H = -1090891868,
                    this.outputLen = 28
                }
            }
            e.sha256 = (0,
            o.wrapConstructor)((()=>new u)),
            e.sha224 = (0,
            o.wrapConstructor)((()=>new f))
        }
        ,
        7592: (t,e,r)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.sha384 = e.sha512_256 = e.sha512_224 = e.sha512 = e.SHA512 = void 0;
            const n = r(3576)
              , o = r(6541)
              , i = r(6849)
              , [s,a] = o.default.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t=>BigInt(t))))
              , c = new Uint32Array(80)
              , u = new Uint32Array(80);
            class f extends n.SHA2 {
                constructor() {
                    super(128, 64, 16, !1),
                    this.Ah = 1779033703,
                    this.Al = -205731576,
                    this.Bh = -1150833019,
                    this.Bl = -2067093701,
                    this.Ch = 1013904242,
                    this.Cl = -23791573,
                    this.Dh = -1521486534,
                    this.Dl = 1595750129,
                    this.Eh = 1359893119,
                    this.El = -1377402159,
                    this.Fh = -1694144372,
                    this.Fl = 725511199,
                    this.Gh = 528734635,
                    this.Gl = -79577749,
                    this.Hh = 1541459225,
                    this.Hl = 327033209
                }
                get() {
                    const {Ah: t, Al: e, Bh: r, Bl: n, Ch: o, Cl: i, Dh: s, Dl: a, Eh: c, El: u, Fh: f, Fl: h, Gh: l, Gl: d, Hh: p, Hl: y} = this;
                    return [t, e, r, n, o, i, s, a, c, u, f, h, l, d, p, y]
                }
                set(t, e, r, n, o, i, s, a, c, u, f, h, l, d, p, y) {
                    this.Ah = 0 | t,
                    this.Al = 0 | e,
                    this.Bh = 0 | r,
                    this.Bl = 0 | n,
                    this.Ch = 0 | o,
                    this.Cl = 0 | i,
                    this.Dh = 0 | s,
                    this.Dl = 0 | a,
                    this.Eh = 0 | c,
                    this.El = 0 | u,
                    this.Fh = 0 | f,
                    this.Fl = 0 | h,
                    this.Gh = 0 | l,
                    this.Gl = 0 | d,
                    this.Hh = 0 | p,
                    this.Hl = 0 | y
                }
                process(t, e) {
                    for (let r = 0; r < 16; r++,
                    e += 4)
                        c[r] = t.getUint32(e),
                        u[r] = t.getUint32(e += 4);
                    for (let t = 16; t < 80; t++) {
                        const e = 0 | c[t - 15]
                          , r = 0 | u[t - 15]
                          , n = o.default.rotrSH(e, r, 1) ^ o.default.rotrSH(e, r, 8) ^ o.default.shrSH(e, r, 7)
                          , i = o.default.rotrSL(e, r, 1) ^ o.default.rotrSL(e, r, 8) ^ o.default.shrSL(e, r, 7)
                          , s = 0 | c[t - 2]
                          , a = 0 | u[t - 2]
                          , f = o.default.rotrSH(s, a, 19) ^ o.default.rotrBH(s, a, 61) ^ o.default.shrSH(s, a, 6)
                          , h = o.default.rotrSL(s, a, 19) ^ o.default.rotrBL(s, a, 61) ^ o.default.shrSL(s, a, 6)
                          , l = o.default.add4L(i, h, u[t - 7], u[t - 16])
                          , d = o.default.add4H(l, n, f, c[t - 7], c[t - 16]);
                        c[t] = 0 | d,
                        u[t] = 0 | l
                    }
                    let {Ah: r, Al: n, Bh: i, Bl: f, Ch: h, Cl: l, Dh: d, Dl: p, Eh: y, El: g, Fh: w, Fl: b, Gh: m, Gl: v, Hh: E, Hl: x} = this;
                    for (let t = 0; t < 80; t++) {
                        const e = o.default.rotrSH(y, g, 14) ^ o.default.rotrSH(y, g, 18) ^ o.default.rotrBH(y, g, 41)
                          , A = o.default.rotrSL(y, g, 14) ^ o.default.rotrSL(y, g, 18) ^ o.default.rotrBL(y, g, 41)
                          , S = y & w ^ ~y & m
                          , T = g & b ^ ~g & v
                          , B = o.default.add5L(x, A, T, a[t], u[t])
                          , I = o.default.add5H(B, E, e, S, s[t], c[t])
                          , O = 0 | B
                          , U = o.default.rotrSH(r, n, 28) ^ o.default.rotrBH(r, n, 34) ^ o.default.rotrBH(r, n, 39)
                          , M = o.default.rotrSL(r, n, 28) ^ o.default.rotrBL(r, n, 34) ^ o.default.rotrBL(r, n, 39)
                          , k = r & i ^ r & h ^ i & h
                          , j = n & f ^ n & l ^ f & l;
                        E = 0 | m,
                        x = 0 | v,
                        m = 0 | w,
                        v = 0 | b,
                        w = 0 | y,
                        b = 0 | g,
                        ({h: y, l: g} = o.default.add(0 | d, 0 | p, 0 | I, 0 | O)),
                        d = 0 | h,
                        p = 0 | l,
                        h = 0 | i,
                        l = 0 | f,
                        i = 0 | r,
                        f = 0 | n;
                        const N = o.default.add3L(O, M, j);
                        r = o.default.add3H(N, I, U, k),
                        n = 0 | N
                    }
                    ({h: r, l: n} = o.default.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)),
                    ({h: i, l: f} = o.default.add(0 | this.Bh, 0 | this.Bl, 0 | i, 0 | f)),
                    ({h, l} = o.default.add(0 | this.Ch, 0 | this.Cl, 0 | h, 0 | l)),
                    ({h: d, l: p} = o.default.add(0 | this.Dh, 0 | this.Dl, 0 | d, 0 | p)),
                    ({h: y, l: g} = o.default.add(0 | this.Eh, 0 | this.El, 0 | y, 0 | g)),
                    ({h: w, l: b} = o.default.add(0 | this.Fh, 0 | this.Fl, 0 | w, 0 | b)),
                    ({h: m, l: v} = o.default.add(0 | this.Gh, 0 | this.Gl, 0 | m, 0 | v)),
                    ({h: E, l: x} = o.default.add(0 | this.Hh, 0 | this.Hl, 0 | E, 0 | x)),
                    this.set(r, n, i, f, h, l, d, p, y, g, w, b, m, v, E, x)
                }
                roundClean() {
                    c.fill(0),
                    u.fill(0)
                }
                destroy() {
                    this.buffer.fill(0),
                    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
                }
            }
            e.SHA512 = f;
            class h extends f {
                constructor() {
                    super(),
                    this.Ah = -1942145080,
                    this.Al = 424955298,
                    this.Bh = 1944164710,
                    this.Bl = -1982016298,
                    this.Ch = 502970286,
                    this.Cl = 855612546,
                    this.Dh = 1738396948,
                    this.Dl = 1479516111,
                    this.Eh = 258812777,
                    this.El = 2077511080,
                    this.Fh = 2011393907,
                    this.Fl = 79989058,
                    this.Gh = 1067287976,
                    this.Gl = 1780299464,
                    this.Hh = 286451373,
                    this.Hl = -1848208735,
                    this.outputLen = 28
                }
            }
            class l extends f {
                constructor() {
                    super(),
                    this.Ah = 573645204,
                    this.Al = -64227540,
                    this.Bh = -1621794909,
                    this.Bl = -934517566,
                    this.Ch = 596883563,
                    this.Cl = 1867755857,
                    this.Dh = -1774684391,
                    this.Dl = 1497426621,
                    this.Eh = -1775747358,
                    this.El = -1467023389,
                    this.Fh = -1101128155,
                    this.Fl = 1401305490,
                    this.Gh = 721525244,
                    this.Gl = 746961066,
                    this.Hh = 246885852,
                    this.Hl = -2117784414,
                    this.outputLen = 32
                }
            }
            class d extends f {
                constructor() {
                    super(),
                    this.Ah = -876896931,
                    this.Al = -1056596264,
                    this.Bh = 1654270250,
                    this.Bl = 914150663,
                    this.Ch = -1856437926,
                    this.Cl = 812702999,
                    this.Dh = 355462360,
                    this.Dl = -150054599,
                    this.Eh = 1731405415,
                    this.El = -4191439,
                    this.Fh = -1900787065,
                    this.Fl = 1750603025,
                    this.Gh = -619958771,
                    this.Gl = 1694076839,
                    this.Hh = 1203062813,
                    this.Hl = -1090891868,
                    this.outputLen = 48
                }
            }
            e.sha512 = (0,
            i.wrapConstructor)((()=>new f)),
            e.sha512_224 = (0,
            i.wrapConstructor)((()=>new h)),
            e.sha512_256 = (0,
            i.wrapConstructor)((()=>new l)),
            e.sha384 = (0,
            i.wrapConstructor)((()=>new d))
        }
        ,
        6849: (t,e,r)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.randomBytes = e.wrapConstructorWithOpts = e.wrapConstructor = e.checkOpts = e.Hash = e.concatBytes = e.toBytes = e.utf8ToBytes = e.asyncLoop = e.nextTick = e.hexToBytes = e.bytesToHex = e.isLE = e.rotr = e.createView = e.u32 = e.u8 = void 0;
            const n = r(1230);
            if (e.u8 = t=>new Uint8Array(t.buffer,t.byteOffset,t.byteLength),
            e.u32 = t=>new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength / 4)),
            e.createView = t=>new DataView(t.buffer,t.byteOffset,t.byteLength),
            e.rotr = (t,e)=>t << 32 - e | t >>> e,
            e.isLE = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0],
            !e.isLE)
                throw new Error("Non little-endian hardware is not supported");
            const o = Array.from({
                length: 256
            }, ((t,e)=>e.toString(16).padStart(2, "0")));
            function i(t) {
                if ("string" != typeof t)
                    throw new TypeError("utf8ToBytes expected string, got " + typeof t);
                return (new TextEncoder).encode(t)
            }
            function s(t) {
                if ("string" == typeof t && (t = i(t)),
                !(t instanceof Uint8Array))
                    throw new TypeError(`Expected input type is Uint8Array (got ${typeof t})`);
                return t
            }
            e.bytesToHex = function(t) {
                if (!(t instanceof Uint8Array))
                    throw new Error("Uint8Array expected");
                let e = "";
                for (let r = 0; r < t.length; r++)
                    e += o[t[r]];
                return e
            }
            ,
            e.hexToBytes = function(t) {
                if ("string" != typeof t)
                    throw new TypeError("hexToBytes: expected string, got " + typeof t);
                if (t.length % 2)
                    throw new Error("hexToBytes: received invalid unpadded hex");
                const e = new Uint8Array(t.length / 2);
                for (let r = 0; r < e.length; r++) {
                    const n = 2 * r
                      , o = t.slice(n, n + 2)
                      , i = Number.parseInt(o, 16);
                    if (Number.isNaN(i) || i < 0)
                        throw new Error("Invalid byte sequence");
                    e[r] = i
                }
                return e
            }
            ,
            e.nextTick = async()=>{}
            ,
            e.asyncLoop = async function(t, r, n) {
                let o = Date.now();
                for (let i = 0; i < t; i++) {
                    n(i);
                    const t = Date.now() - o;
                    t >= 0 && t < r || (await (0,
                    e.nextTick)(),
                    o += t)
                }
            }
            ,
            e.utf8ToBytes = i,
            e.toBytes = s,
            e.concatBytes = function(...t) {
                if (!t.every((t=>t instanceof Uint8Array)))
                    throw new Error("Uint8Array list expected");
                if (1 === t.length)
                    return t[0];
                const e = t.reduce(((t,e)=>t + e.length), 0)
                  , r = new Uint8Array(e);
                for (let e = 0, n = 0; e < t.length; e++) {
                    const o = t[e];
                    r.set(o, n),
                    n += o.length
                }
                return r
            }
            ,
            e.Hash = class {
                clone() {
                    return this._cloneInto()
                }
            }
            ,
            e.checkOpts = function(t, e) {
                if (void 0 !== e && ("object" != typeof e || (r = e,
                "[object Object]" !== Object.prototype.toString.call(r) || r.constructor !== Object)))
                    throw new TypeError("Options should be object or undefined");
                var r;
                return Object.assign(t, e)
            }
            ,
            e.wrapConstructor = function(t) {
                const e = e=>t().update(s(e)).digest()
                  , r = t();
                return e.outputLen = r.outputLen,
                e.blockLen = r.blockLen,
                e.create = ()=>t(),
                e
            }
            ,
            e.wrapConstructorWithOpts = function(t) {
                const e = (e,r)=>t(r).update(s(e)).digest()
                  , r = t({});
                return e.outputLen = r.outputLen,
                e.blockLen = r.blockLen,
                e.create = e=>t(e),
                e
            }
            ,
            e.randomBytes = function(t=32) {
                if (n.crypto && "function" == typeof n.crypto.getRandomValues)
                    return n.crypto.getRandomValues(new Uint8Array(t));
                throw new Error("crypto.getRandomValues must be defined")
            }
        }
        ,
        4544: (t,e)=>{
            "use strict";
            function r(t) {
                if (!Number.isSafeInteger(t))
                    throw new Error(`Wrong integer: ${t}`)
            }
            function n(...t) {
                const e = (t,e)=>r=>t(e(r));
                return {
                    encode: Array.from(t).reverse().reduce(((t,r)=>t ? e(t, r.encode) : r.encode), void 0),
                    decode: t.reduce(((t,r)=>t ? e(t, r.decode) : r.decode), void 0)
                }
            }
            function o(t) {
                return {
                    encode: e=>{
                        if (!Array.isArray(e) || e.length && "number" != typeof e[0])
                            throw new Error("alphabet.encode input should be an array of numbers");
                        return e.map((e=>{
                            if (r(e),
                            e < 0 || e >= t.length)
                                throw new Error(`Digit index outside alphabet: ${e} (alphabet: ${t.length})`);
                            return t[e]
                        }
                        ))
                    }
                    ,
                    decode: e=>{
                        if (!Array.isArray(e) || e.length && "string" != typeof e[0])
                            throw new Error("alphabet.decode input should be array of strings");
                        return e.map((e=>{
                            if ("string" != typeof e)
                                throw new Error(`alphabet.decode: not string element=${e}`);
                            const r = t.indexOf(e);
                            if (-1 === r)
                                throw new Error(`Unknown letter: "${e}". Allowed: ${t}`);
                            return r
                        }
                        ))
                    }
                }
            }
            function i(t="") {
                if ("string" != typeof t)
                    throw new Error("join separator should be string");
                return {
                    encode: e=>{
                        if (!Array.isArray(e) || e.length && "string" != typeof e[0])
                            throw new Error("join.encode input should be array of strings");
                        for (let t of e)
                            if ("string" != typeof t)
                                throw new Error(`join.encode: non-string input=${t}`);
                        return e.join(t)
                    }
                    ,
                    decode: e=>{
                        if ("string" != typeof e)
                            throw new Error("join.decode input should be string");
                        return e.split(t)
                    }
                }
            }
            function s(t, e="=") {
                if (r(t),
                "string" != typeof e)
                    throw new Error("padding chr should be string");
                return {
                    encode(r) {
                        if (!Array.isArray(r) || r.length && "string" != typeof r[0])
                            throw new Error("padding.encode input should be array of strings");
                        for (let t of r)
                            if ("string" != typeof t)
                                throw new Error(`padding.encode: non-string input=${t}`);
                        for (; r.length * t % 8; )
                            r.push(e);
                        return r
                    },
                    decode(r) {
                        if (!Array.isArray(r) || r.length && "string" != typeof r[0])
                            throw new Error("padding.encode input should be array of strings");
                        for (let t of r)
                            if ("string" != typeof t)
                                throw new Error(`padding.decode: non-string input=${t}`);
                        let n = r.length;
                        if (n * t % 8)
                            throw new Error("Invalid padding: string should have whole number of bytes");
                        for (; n > 0 && r[n - 1] === e; n--)
                            if (!((n - 1) * t % 8))
                                throw new Error("Invalid padding: string has too much padding");
                        return r.slice(0, n)
                    }
                }
            }
            function a(t) {
                if ("function" != typeof t)
                    throw new Error("normalize fn should be function");
                return {
                    encode: t=>t,
                    decode: e=>t(e)
                }
            }
            function c(t, e, n) {
                if (e < 2)
                    throw new Error(`convertRadix: wrong from=${e}, base cannot be less than 2`);
                if (n < 2)
                    throw new Error(`convertRadix: wrong to=${n}, base cannot be less than 2`);
                if (!Array.isArray(t))
                    throw new Error("convertRadix: data should be array");
                if (!t.length)
                    return [];
                let o = 0;
                const i = []
                  , s = Array.from(t);
                for (s.forEach((t=>{
                    if (r(t),
                    t < 0 || t >= e)
                        throw new Error(`Wrong integer: ${t}`)
                }
                )); ; ) {
                    let t = 0
                      , r = !0;
                    for (let i = o; i < s.length; i++) {
                        const a = s[i]
                          , c = e * t + a;
                        if (!Number.isSafeInteger(c) || e * t / e !== t || c - a != e * t)
                            throw new Error("convertRadix: carry overflow");
                        if (t = c % n,
                        s[i] = Math.floor(c / n),
                        !Number.isSafeInteger(s[i]) || s[i] * n + t !== c)
                            throw new Error("convertRadix: carry overflow");
                        r && (s[i] ? r = !1 : o = i)
                    }
                    if (i.push(t),
                    r)
                        break
                }
                for (let e = 0; e < t.length - 1 && 0 === t[e]; e++)
                    i.push(0);
                return i.reverse()
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.bytes = e.stringToBytes = e.str = e.bytesToString = e.hex = e.utf8 = e.bech32m = e.bech32 = e.base58check = e.base58xmr = e.base58xrp = e.base58flickr = e.base58 = e.base64url = e.base64 = e.base32crockford = e.base32hex = e.base32 = e.base16 = e.utils = e.assertNumber = void 0,
            e.assertNumber = r;
            const u = (t,e)=>e ? u(e, t % e) : t
              , f = (t,e)=>t + (e - u(t, e));
            function h(t, e, n, o) {
                if (!Array.isArray(t))
                    throw new Error("convertRadix2: data should be array");
                if (e <= 0 || e > 32)
                    throw new Error(`convertRadix2: wrong from=${e}`);
                if (n <= 0 || n > 32)
                    throw new Error(`convertRadix2: wrong to=${n}`);
                if (f(e, n) > 32)
                    throw new Error(`convertRadix2: carry overflow from=${e} to=${n} carryBits=${f(e, n)}`);
                let i = 0
                  , s = 0;
                const a = 2 ** n - 1
                  , c = [];
                for (const o of t) {
                    if (r(o),
                    o >= 2 ** e)
                        throw new Error(`convertRadix2: invalid data word=${o} from=${e}`);
                    if (i = i << e | o,
                    s + e > 32)
                        throw new Error(`convertRadix2: carry overflow pos=${s} from=${e}`);
                    for (s += e; s >= n; s -= n)
                        c.push((i >> s - n & a) >>> 0);
                    i &= 2 ** s - 1
                }
                if (i = i << n - s & a,
                !o && s >= e)
                    throw new Error("Excess padding");
                if (!o && i)
                    throw new Error(`Non-zero padding: ${i}`);
                return o && s > 0 && c.push(i >>> 0),
                c
            }
            function l(t) {
                return r(t),
                {
                    encode: e=>{
                        if (!(e instanceof Uint8Array))
                            throw new Error("radix.encode input should be Uint8Array");
                        return c(Array.from(e), 256, t)
                    }
                    ,
                    decode: e=>{
                        if (!Array.isArray(e) || e.length && "number" != typeof e[0])
                            throw new Error("radix.decode input should be array of strings");
                        return Uint8Array.from(c(e, t, 256))
                    }
                }
            }
            function d(t, e=!1) {
                if (r(t),
                t <= 0 || t > 32)
                    throw new Error("radix2: bits should be in (0..32]");
                if (f(8, t) > 32 || f(t, 8) > 32)
                    throw new Error("radix2: carry overflow");
                return {
                    encode: r=>{
                        if (!(r instanceof Uint8Array))
                            throw new Error("radix2.encode input should be Uint8Array");
                        return h(Array.from(r), 8, t, !e)
                    }
                    ,
                    decode: r=>{
                        if (!Array.isArray(r) || r.length && "number" != typeof r[0])
                            throw new Error("radix2.decode input should be array of strings");
                        return Uint8Array.from(h(r, t, 8, e))
                    }
                }
            }
            function p(t) {
                if ("function" != typeof t)
                    throw new Error("unsafeWrapper fn should be function");
                return function(...e) {
                    try {
                        return t.apply(null, e)
                    } catch (t) {}
                }
            }
            function y(t, e) {
                if (r(t),
                "function" != typeof e)
                    throw new Error("checksum fn should be function");
                return {
                    encode(r) {
                        if (!(r instanceof Uint8Array))
                            throw new Error("checksum.encode: input should be Uint8Array");
                        const n = e(r).slice(0, t)
                          , o = new Uint8Array(r.length + t);
                        return o.set(r),
                        o.set(n, r.length),
                        o
                    },
                    decode(r) {
                        if (!(r instanceof Uint8Array))
                            throw new Error("checksum.decode: input should be Uint8Array");
                        const n = r.slice(0, -t)
                          , o = e(n).slice(0, t)
                          , i = r.slice(-t);
                        for (let e = 0; e < t; e++)
                            if (o[e] !== i[e])
                                throw new Error("Invalid checksum");
                        return n
                    }
                }
            }
            e.utils = {
                alphabet: o,
                chain: n,
                checksum: y,
                radix: l,
                radix2: d,
                join: i,
                padding: s
            },
            e.base16 = n(d(4), o("0123456789ABCDEF"), i("")),
            e.base32 = n(d(5), o("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), s(5), i("")),
            e.base32hex = n(d(5), o("0123456789ABCDEFGHIJKLMNOPQRSTUV"), s(5), i("")),
            e.base32crockford = n(d(5), o("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), i(""), a((t=>t.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")))),
            e.base64 = n(d(6), o("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), s(6), i("")),
            e.base64url = n(d(6), o("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), s(6), i(""));
            const g = t=>n(l(58), o(t), i(""));
            e.base58 = g("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),
            e.base58flickr = g("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"),
            e.base58xrp = g("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
            const w = [0, 2, 3, 5, 6, 7, 9, 10, 11];
            e.base58xmr = {
                encode(t) {
                    let r = "";
                    for (let n = 0; n < t.length; n += 8) {
                        const o = t.subarray(n, n + 8);
                        r += e.base58.encode(o).padStart(w[o.length], "1")
                    }
                    return r
                },
                decode(t) {
                    let r = [];
                    for (let n = 0; n < t.length; n += 11) {
                        const o = t.slice(n, n + 11)
                          , i = w.indexOf(o.length)
                          , s = e.base58.decode(o);
                        for (let t = 0; t < s.length - i; t++)
                            if (0 !== s[t])
                                throw new Error("base58xmr: wrong padding");
                        r = r.concat(Array.from(s.slice(s.length - i)))
                    }
                    return Uint8Array.from(r)
                }
            },
            e.base58check = t=>n(y(4, (e=>t(t(e)))), e.base58);
            const b = n(o("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), i(""))
              , m = [996825010, 642813549, 513874426, 1027748829, 705979059];
            function v(t) {
                const e = t >> 25;
                let r = (33554431 & t) << 5;
                for (let t = 0; t < m.length; t++)
                    1 == (e >> t & 1) && (r ^= m[t]);
                return r
            }
            function E(t, e, r=1) {
                const n = t.length;
                let o = 1;
                for (let e = 0; e < n; e++) {
                    const r = t.charCodeAt(e);
                    if (r < 33 || r > 126)
                        throw new Error(`Invalid prefix (${t})`);
                    o = v(o) ^ r >> 5
                }
                o = v(o);
                for (let e = 0; e < n; e++)
                    o = v(o) ^ 31 & t.charCodeAt(e);
                for (let t of e)
                    o = v(o) ^ t;
                for (let t = 0; t < 6; t++)
                    o = v(o);
                return o ^= r,
                b.encode(h([o % 2 ** 30], 30, 5, !1))
            }
            function x(t) {
                const e = "bech32" === t ? 1 : 734539939
                  , r = d(5)
                  , n = r.decode
                  , o = r.encode
                  , i = p(n);
                function s(t, r=90) {
                    if ("string" != typeof t)
                        throw new Error("bech32.decode input should be string, not " + typeof t);
                    if (t.length < 8 || !1 !== r && t.length > r)
                        throw new TypeError(`Wrong string length: ${t.length} (${t}). Expected (8..${r})`);
                    const n = t.toLowerCase();
                    if (t !== n && t !== t.toUpperCase())
                        throw new Error("String must be lowercase or uppercase");
                    const o = (t = n).lastIndexOf("1");
                    if (0 === o || -1 === o)
                        throw new Error('Letter "1" must be present between prefix and data only');
                    const i = t.slice(0, o)
                      , s = t.slice(o + 1);
                    if (s.length < 6)
                        throw new Error("Data must be at least 6 characters long");
                    const a = b.decode(s).slice(0, -6)
                      , c = E(i, a, e);
                    if (!s.endsWith(c))
                        throw new Error(`Invalid checksum in ${t}: expected "${c}"`);
                    return {
                        prefix: i,
                        words: a
                    }
                }
                return {
                    encode: function(t, r, n=90) {
                        if ("string" != typeof t)
                            throw new Error("bech32.encode prefix should be string, not " + typeof t);
                        if (!Array.isArray(r) || r.length && "number" != typeof r[0])
                            throw new Error("bech32.encode words should be array of numbers, not " + typeof r);
                        const o = t.length + 7 + r.length;
                        if (!1 !== n && o > n)
                            throw new TypeError(`Length ${o} exceeds limit ${n}`);
                        return `${t = t.toLowerCase()}1${b.encode(r)}${E(t, r, e)}`
                    },
                    decode: s,
                    decodeToBytes: function(t) {
                        const {prefix: e, words: r} = s(t, !1);
                        return {
                            prefix: e,
                            words: r,
                            bytes: n(r)
                        }
                    },
                    decodeUnsafe: p(s),
                    fromWords: n,
                    fromWordsUnsafe: i,
                    toWords: o
                }
            }
            e.bech32 = x("bech32"),
            e.bech32m = x("bech32m"),
            e.utf8 = {
                encode: t=>(new TextDecoder).decode(t),
                decode: t=>(new TextEncoder).encode(t)
            },
            e.hex = n(d(4), o("0123456789abcdef"), i(""), a((t=>{
                if ("string" != typeof t || t.length % 2)
                    throw new TypeError(`hex.decode: expected string, got ${typeof t} with length ${t.length}`);
                return t.toLowerCase()
            }
            )));
            const A = {
                utf8: e.utf8,
                hex: e.hex,
                base16: e.base16,
                base32: e.base32,
                base64: e.base64,
                base64url: e.base64url,
                base58: e.base58,
                base58xmr: e.base58xmr
            }
              , S = `Invalid encoding type. Available types: ${Object.keys(A).join(", ")}`;
            e.bytesToString = (t,e)=>{
                if ("string" != typeof t || !A.hasOwnProperty(t))
                    throw new TypeError(S);
                if (!(e instanceof Uint8Array))
                    throw new TypeError("bytesToString() expects Uint8Array");
                return A[t].encode(e)
            }
            ,
            e.str = e.bytesToString,
            e.stringToBytes = (t,e)=>{
                if (!A.hasOwnProperty(t))
                    throw new TypeError(S);
                if ("string" != typeof e)
                    throw new TypeError("stringToBytes() expects string");
                return A[t].decode(e)
            }
            ,
            e.bytes = e.stringToBytes
        }
        ,
        6587: (t,e,r)=>{
            "use strict";
            r(50),
            r(1383),
            r(3676),
            r(7592),
            r(6849),
            r(4544)
        }
        ,
        1513: t=>{
            function e(t) {
                return /^\d+\.\d+\.\d+$/.test(t)
            }
            function r(t) {
                if (!e(t))
                    throw new Error("Invalid semver version: " + t);
                const [r,n,o] = t.split(".").map((t=>parseInt(t, 10)));
                return {
                    major: r,
                    minor: n,
                    patch: o
                }
            }
            t.exports = {
                isValid: e,
                parse: r,
                lt: function(t, e) {
                    const n = r(t)
                      , o = r(e);
                    return n.major !== o.major ? n.major < o.major : n.minor !== o.minor ? n.minor < o.minor : n.patch !== o.patch && n.patch < o.patch
                },
                lte: function(t, e) {
                    const n = r(t)
                      , o = r(e);
                    return n.major !== o.major ? n.major <= o.major : n.minor !== o.minor ? n.minor <= o.minor : n.patch === o.patch || n.patch <= o.patch
                },
                gt: function(t, e) {
                    const n = r(t)
                      , o = r(e);
                    return n.major !== o.major ? n.major > o.major : n.minor !== o.minor ? n.minor > o.minor : n.patch !== o.patch && n.patch > o.patch
                },
                gte: function(t, e) {
                    const n = r(t)
                      , o = r(e);
                    return n.major !== o.major ? n.major >= o.major : n.minor !== o.minor ? n.minor >= o.minor : n.patch === o.patch || n.patch >= o.patch
                },
                eq: function(t, e) {
                    return r(t),
                    r(e),
                    t === e
                }
            }
        }
        ,
        9674: t=>{
            "use strict";
            t.exports = function(t) {
                if (t.length >= 255)
                    throw new TypeError("Alphabet too long");
                for (var e = new Uint8Array(256), r = 0; r < e.length; r++)
                    e[r] = 255;
                for (var n = 0; n < t.length; n++) {
                    var o = t.charAt(n)
                      , i = o.charCodeAt(0);
                    if (255 !== e[i])
                        throw new TypeError(o + " is ambiguous");
                    e[i] = n
                }
                var s = t.length
                  , a = t.charAt(0)
                  , c = Math.log(s) / Math.log(256)
                  , u = Math.log(256) / Math.log(s);
                function f(t) {
                    if ("string" != typeof t)
                        throw new TypeError("Expected String");
                    if (0 === t.length)
                        return new Uint8Array;
                    for (var r = 0, n = 0, o = 0; t[r] === a; )
                        n++,
                        r++;
                    for (var i = (t.length - r) * c + 1 >>> 0, u = new Uint8Array(i); t[r]; ) {
                        var f = e[t.charCodeAt(r)];
                        if (255 === f)
                            return;
                        for (var h = 0, l = i - 1; (0 !== f || h < o) && -1 !== l; l--,
                        h++)
                            f += s * u[l] >>> 0,
                            u[l] = f % 256 >>> 0,
                            f = f / 256 >>> 0;
                        if (0 !== f)
                            throw new Error("Non-zero carry");
                        o = h,
                        r++
                    }
                    for (var d = i - o; d !== i && 0 === u[d]; )
                        d++;
                    for (var p = new Uint8Array(n + (i - d)), y = n; d !== i; )
                        p[y++] = u[d++];
                    return p
                }
                return {
                    encode: function(e) {
                        if (e instanceof Uint8Array || (ArrayBuffer.isView(e) ? e = new Uint8Array(e.buffer,e.byteOffset,e.byteLength) : Array.isArray(e) && (e = Uint8Array.from(e))),
                        !(e instanceof Uint8Array))
                            throw new TypeError("Expected Uint8Array");
                        if (0 === e.length)
                            return "";
                        for (var r = 0, n = 0, o = 0, i = e.length; o !== i && 0 === e[o]; )
                            o++,
                            r++;
                        for (var c = (i - o) * u + 1 >>> 0, f = new Uint8Array(c); o !== i; ) {
                            for (var h = e[o], l = 0, d = c - 1; (0 !== h || l < n) && -1 !== d; d--,
                            l++)
                                h += 256 * f[d] >>> 0,
                                f[d] = h % s >>> 0,
                                h = h / s >>> 0;
                            if (0 !== h)
                                throw new Error("Non-zero carry");
                            n = l,
                            o++
                        }
                        for (var p = c - n; p !== c && 0 === f[p]; )
                            p++;
                        for (var y = a.repeat(r); p < c; ++p)
                            y += t.charAt(f[p]);
                        return y
                    },
                    decodeUnsafe: f,
                    decode: function(t) {
                        var e = f(t);
                        if (e)
                            return e;
                        throw new Error("Non-base" + s + " character")
                    }
                }
            }
        }
        ,
        683: (t,e)=>{
            "use strict";
            e.byteLength = function(t) {
                var e = c(t)
                  , r = e[0]
                  , n = e[1];
                return 3 * (r + n) / 4 - n
            }
            ,
            e.toByteArray = function(t) {
                var e, r, i = c(t), s = i[0], a = i[1], u = new o(function(t, e, r) {
                    return 3 * (e + r) / 4 - r
                }(0, s, a)), f = 0, h = a > 0 ? s - 4 : s;
                for (r = 0; r < h; r += 4)
                    e = n[t.charCodeAt(r)] << 18 | n[t.charCodeAt(r + 1)] << 12 | n[t.charCodeAt(r + 2)] << 6 | n[t.charCodeAt(r + 3)],
                    u[f++] = e >> 16 & 255,
                    u[f++] = e >> 8 & 255,
                    u[f++] = 255 & e;
                return 2 === a && (e = n[t.charCodeAt(r)] << 2 | n[t.charCodeAt(r + 1)] >> 4,
                u[f++] = 255 & e),
                1 === a && (e = n[t.charCodeAt(r)] << 10 | n[t.charCodeAt(r + 1)] << 4 | n[t.charCodeAt(r + 2)] >> 2,
                u[f++] = e >> 8 & 255,
                u[f++] = 255 & e),
                u
            }
            ,
            e.fromByteArray = function(t) {
                for (var e, n = t.length, o = n % 3, i = [], s = 16383, a = 0, c = n - o; a < c; a += s)
                    i.push(u(t, a, a + s > c ? c : a + s));
                return 1 === o ? (e = t[n - 1],
                i.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1],
                i.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "=")),
                i.join("")
            }
            ;
            for (var r = [], n = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, a = i.length; s < a; ++s)
                r[s] = i[s],
                n[i.charCodeAt(s)] = s;
            function c(t) {
                var e = t.length;
                if (e % 4 > 0)
                    throw new Error("Invalid string. Length must be a multiple of 4");
                var r = t.indexOf("=");
                return -1 === r && (r = e),
                [r, r === e ? 0 : 4 - r % 4]
            }
            function u(t, e, n) {
                for (var o, i, s = [], a = e; a < n; a += 3)
                    o = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]),
                    s.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
                return s.join("")
            }
            n["-".charCodeAt(0)] = 62,
            n["_".charCodeAt(0)] = 63
        }
        ,
        8063: (t,e,r)=>{
            const n = r(9674);
            t.exports = n("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        }
        ,
        4984: (t,e,r)=>{
            "use strict";
            const n = r(683)
              , o = r(2093)
              , i = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
            e.lW = c,
            e.h2 = 50;
            const s = 2147483647;
            function a(t) {
                if (t > s)
                    throw new RangeError('The value "' + t + '" is invalid for option "size"');
                const e = new Uint8Array(t);
                return Object.setPrototypeOf(e, c.prototype),
                e
            }
            function c(t, e, r) {
                if ("number" == typeof t) {
                    if ("string" == typeof e)
                        throw new TypeError('The "string" argument must be of type string. Received type number');
                    return h(t)
                }
                return u(t, e, r)
            }
            function u(t, e, r) {
                if ("string" == typeof t)
                    return function(t, e) {
                        if ("string" == typeof e && "" !== e || (e = "utf8"),
                        !c.isEncoding(e))
                            throw new TypeError("Unknown encoding: " + e);
                        const r = 0 | y(t, e);
                        let n = a(r);
                        const o = n.write(t, e);
                        return o !== r && (n = n.slice(0, o)),
                        n
                    }(t, e);
                if (ArrayBuffer.isView(t))
                    return function(t) {
                        if (K(t, Uint8Array)) {
                            const e = new Uint8Array(t);
                            return d(e.buffer, e.byteOffset, e.byteLength)
                        }
                        return l(t)
                    }(t);
                if (null == t)
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                if (K(t, ArrayBuffer) || t && K(t.buffer, ArrayBuffer))
                    return d(t, e, r);
                if ("undefined" != typeof SharedArrayBuffer && (K(t, SharedArrayBuffer) || t && K(t.buffer, SharedArrayBuffer)))
                    return d(t, e, r);
                if ("number" == typeof t)
                    throw new TypeError('The "value" argument must not be of type number. Received type number');
                const n = t.valueOf && t.valueOf();
                if (null != n && n !== t)
                    return c.from(n, e, r);
                const o = function(t) {
                    if (c.isBuffer(t)) {
                        const e = 0 | p(t.length)
                          , r = a(e);
                        return 0 === r.length || t.copy(r, 0, 0, e),
                        r
                    }
                    return void 0 !== t.length ? "number" != typeof t.length || Q(t.length) ? a(0) : l(t) : "Buffer" === t.type && Array.isArray(t.data) ? l(t.data) : void 0
                }(t);
                if (o)
                    return o;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive])
                    return c.from(t[Symbol.toPrimitive]("string"), e, r);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
            }
            function f(t) {
                if ("number" != typeof t)
                    throw new TypeError('"size" argument must be of type number');
                if (t < 0)
                    throw new RangeError('The value "' + t + '" is invalid for option "size"')
            }
            function h(t) {
                return f(t),
                a(t < 0 ? 0 : 0 | p(t))
            }
            function l(t) {
                const e = t.length < 0 ? 0 : 0 | p(t.length)
                  , r = a(e);
                for (let n = 0; n < e; n += 1)
                    r[n] = 255 & t[n];
                return r
            }
            function d(t, e, r) {
                if (e < 0 || t.byteLength < e)
                    throw new RangeError('"offset" is outside of buffer bounds');
                if (t.byteLength < e + (r || 0))
                    throw new RangeError('"length" is outside of buffer bounds');
                let n;
                return n = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t,e) : new Uint8Array(t,e,r),
                Object.setPrototypeOf(n, c.prototype),
                n
            }
            function p(t) {
                if (t >= s)
                    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
                return 0 | t
            }
            function y(t, e) {
                if (c.isBuffer(t))
                    return t.length;
                if (ArrayBuffer.isView(t) || K(t, ArrayBuffer))
                    return t.byteLength;
                if ("string" != typeof t)
                    throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                const r = t.length
                  , n = arguments.length > 2 && !0 === arguments[2];
                if (!n && 0 === r)
                    return 0;
                let o = !1;
                for (; ; )
                    switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                        return G(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return Y(t).length;
                    default:
                        if (o)
                            return n ? -1 : G(t).length;
                        e = ("" + e).toLowerCase(),
                        o = !0
                    }
            }
            function g(t, e, r) {
                let n = !1;
                if ((void 0 === e || e < 0) && (e = 0),
                e > this.length)
                    return "";
                if ((void 0 === r || r > this.length) && (r = this.length),
                r <= 0)
                    return "";
                if ((r >>>= 0) <= (e >>>= 0))
                    return "";
                for (t || (t = "utf8"); ; )
                    switch (t) {
                    case "hex":
                        return M(this, e, r);
                    case "utf8":
                    case "utf-8":
                        return B(this, e, r);
                    case "ascii":
                        return O(this, e, r);
                    case "latin1":
                    case "binary":
                        return U(this, e, r);
                    case "base64":
                        return T(this, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return k(this, e, r);
                    default:
                        if (n)
                            throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(),
                        n = !0
                    }
            }
            function w(t, e, r) {
                const n = t[e];
                t[e] = t[r],
                t[r] = n
            }
            function b(t, e, r, n, o) {
                if (0 === t.length)
                    return -1;
                if ("string" == typeof r ? (n = r,
                r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
                Q(r = +r) && (r = o ? 0 : t.length - 1),
                r < 0 && (r = t.length + r),
                r >= t.length) {
                    if (o)
                        return -1;
                    r = t.length - 1
                } else if (r < 0) {
                    if (!o)
                        return -1;
                    r = 0
                }
                if ("string" == typeof e && (e = c.from(e, n)),
                c.isBuffer(e))
                    return 0 === e.length ? -1 : m(t, e, r, n, o);
                if ("number" == typeof e)
                    return e &= 255,
                    "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : m(t, [e], r, n, o);
                throw new TypeError("val must be string, number or Buffer")
            }
            function m(t, e, r, n, o) {
                let i, s = 1, a = t.length, c = e.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (t.length < 2 || e.length < 2)
                        return -1;
                    s = 2,
                    a /= 2,
                    c /= 2,
                    r /= 2
                }
                function u(t, e) {
                    return 1 === s ? t[e] : t.readUInt16BE(e * s)
                }
                if (o) {
                    let n = -1;
                    for (i = r; i < a; i++)
                        if (u(t, i) === u(e, -1 === n ? 0 : i - n)) {
                            if (-1 === n && (n = i),
                            i - n + 1 === c)
                                return n * s
                        } else
                            -1 !== n && (i -= i - n),
                            n = -1
                } else
                    for (r + c > a && (r = a - c),
                    i = r; i >= 0; i--) {
                        let r = !0;
                        for (let n = 0; n < c; n++)
                            if (u(t, i + n) !== u(e, n)) {
                                r = !1;
                                break
                            }
                        if (r)
                            return i
                    }
                return -1
            }
            function v(t, e, r, n) {
                r = Number(r) || 0;
                const o = t.length - r;
                n ? (n = Number(n)) > o && (n = o) : n = o;
                const i = e.length;
                let s;
                for (n > i / 2 && (n = i / 2),
                s = 0; s < n; ++s) {
                    const n = parseInt(e.substr(2 * s, 2), 16);
                    if (Q(n))
                        return s;
                    t[r + s] = n
                }
                return s
            }
            function E(t, e, r, n) {
                return W(G(e, t.length - r), t, r, n)
            }
            function x(t, e, r, n) {
                return W(function(t) {
                    const e = [];
                    for (let r = 0; r < t.length; ++r)
                        e.push(255 & t.charCodeAt(r));
                    return e
                }(e), t, r, n)
            }
            function A(t, e, r, n) {
                return W(Y(e), t, r, n)
            }
            function S(t, e, r, n) {
                return W(function(t, e) {
                    let r, n, o;
                    const i = [];
                    for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
                        r = t.charCodeAt(s),
                        n = r >> 8,
                        o = r % 256,
                        i.push(o),
                        i.push(n);
                    return i
                }(e, t.length - r), t, r, n)
            }
            function T(t, e, r) {
                return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r))
            }
            function B(t, e, r) {
                r = Math.min(t.length, r);
                const n = [];
                let o = e;
                for (; o < r; ) {
                    const e = t[o];
                    let i = null
                      , s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
                    if (o + s <= r) {
                        let r, n, a, c;
                        switch (s) {
                        case 1:
                            e < 128 && (i = e);
                            break;
                        case 2:
                            r = t[o + 1],
                            128 == (192 & r) && (c = (31 & e) << 6 | 63 & r,
                            c > 127 && (i = c));
                            break;
                        case 3:
                            r = t[o + 1],
                            n = t[o + 2],
                            128 == (192 & r) && 128 == (192 & n) && (c = (15 & e) << 12 | (63 & r) << 6 | 63 & n,
                            c > 2047 && (c < 55296 || c > 57343) && (i = c));
                            break;
                        case 4:
                            r = t[o + 1],
                            n = t[o + 2],
                            a = t[o + 3],
                            128 == (192 & r) && 128 == (192 & n) && 128 == (192 & a) && (c = (15 & e) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & a,
                            c > 65535 && c < 1114112 && (i = c))
                        }
                    }
                    null === i ? (i = 65533,
                    s = 1) : i > 65535 && (i -= 65536,
                    n.push(i >>> 10 & 1023 | 55296),
                    i = 56320 | 1023 & i),
                    n.push(i),
                    o += s
                }
                return function(t) {
                    const e = t.length;
                    if (e <= I)
                        return String.fromCharCode.apply(String, t);
                    let r = ""
                      , n = 0;
                    for (; n < e; )
                        r += String.fromCharCode.apply(String, t.slice(n, n += I));
                    return r
                }(n)
            }
            c.TYPED_ARRAY_SUPPORT = function() {
                try {
                    const t = new Uint8Array(1)
                      , e = {
                        foo: function() {
                            return 42
                        }
                    };
                    return Object.setPrototypeOf(e, Uint8Array.prototype),
                    Object.setPrototypeOf(t, e),
                    42 === t.foo()
                } catch (t) {
                    return !1
                }
            }(),
            c.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
            Object.defineProperty(c.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    if (c.isBuffer(this))
                        return this.buffer
                }
            }),
            Object.defineProperty(c.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    if (c.isBuffer(this))
                        return this.byteOffset
                }
            }),
            c.poolSize = 8192,
            c.from = function(t, e, r) {
                return u(t, e, r)
            }
            ,
            Object.setPrototypeOf(c.prototype, Uint8Array.prototype),
            Object.setPrototypeOf(c, Uint8Array),
            c.alloc = function(t, e, r) {
                return function(t, e, r) {
                    return f(t),
                    t <= 0 ? a(t) : void 0 !== e ? "string" == typeof r ? a(t).fill(e, r) : a(t).fill(e) : a(t)
                }(t, e, r)
            }
            ,
            c.allocUnsafe = function(t) {
                return h(t)
            }
            ,
            c.allocUnsafeSlow = function(t) {
                return h(t)
            }
            ,
            c.isBuffer = function(t) {
                return null != t && !0 === t._isBuffer && t !== c.prototype
            }
            ,
            c.compare = function(t, e) {
                if (K(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
                K(e, Uint8Array) && (e = c.from(e, e.offset, e.byteLength)),
                !c.isBuffer(t) || !c.isBuffer(e))
                    throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (t === e)
                    return 0;
                let r = t.length
                  , n = e.length;
                for (let o = 0, i = Math.min(r, n); o < i; ++o)
                    if (t[o] !== e[o]) {
                        r = t[o],
                        n = e[o];
                        break
                    }
                return r < n ? -1 : n < r ? 1 : 0
            }
            ,
            c.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
                }
            }
            ,
            c.concat = function(t, e) {
                if (!Array.isArray(t))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length)
                    return c.alloc(0);
                let r;
                if (void 0 === e)
                    for (e = 0,
                    r = 0; r < t.length; ++r)
                        e += t[r].length;
                const n = c.allocUnsafe(e);
                let o = 0;
                for (r = 0; r < t.length; ++r) {
                    let e = t[r];
                    if (K(e, Uint8Array))
                        o + e.length > n.length ? (c.isBuffer(e) || (e = c.from(e)),
                        e.copy(n, o)) : Uint8Array.prototype.set.call(n, e, o);
                    else {
                        if (!c.isBuffer(e))
                            throw new TypeError('"list" argument must be an Array of Buffers');
                        e.copy(n, o)
                    }
                    o += e.length
                }
                return n
            }
            ,
            c.byteLength = y,
            c.prototype._isBuffer = !0,
            c.prototype.swap16 = function() {
                const t = this.length;
                if (t % 2 != 0)
                    throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (let e = 0; e < t; e += 2)
                    w(this, e, e + 1);
                return this
            }
            ,
            c.prototype.swap32 = function() {
                const t = this.length;
                if (t % 4 != 0)
                    throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (let e = 0; e < t; e += 4)
                    w(this, e, e + 3),
                    w(this, e + 1, e + 2);
                return this
            }
            ,
            c.prototype.swap64 = function() {
                const t = this.length;
                if (t % 8 != 0)
                    throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (let e = 0; e < t; e += 8)
                    w(this, e, e + 7),
                    w(this, e + 1, e + 6),
                    w(this, e + 2, e + 5),
                    w(this, e + 3, e + 4);
                return this
            }
            ,
            c.prototype.toString = function() {
                const t = this.length;
                return 0 === t ? "" : 0 === arguments.length ? B(this, 0, t) : g.apply(this, arguments)
            }
            ,
            c.prototype.toLocaleString = c.prototype.toString,
            c.prototype.equals = function(t) {
                if (!c.isBuffer(t))
                    throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === c.compare(this, t)
            }
            ,
            c.prototype.inspect = function() {
                let t = "";
                const r = e.h2;
                return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(),
                this.length > r && (t += " ... "),
                "<Buffer " + t + ">"
            }
            ,
            i && (c.prototype[i] = c.prototype.inspect),
            c.prototype.compare = function(t, e, r, n, o) {
                if (K(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
                !c.isBuffer(t))
                    throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                if (void 0 === e && (e = 0),
                void 0 === r && (r = t ? t.length : 0),
                void 0 === n && (n = 0),
                void 0 === o && (o = this.length),
                e < 0 || r > t.length || n < 0 || o > this.length)
                    throw new RangeError("out of range index");
                if (n >= o && e >= r)
                    return 0;
                if (n >= o)
                    return -1;
                if (e >= r)
                    return 1;
                if (this === t)
                    return 0;
                let i = (o >>>= 0) - (n >>>= 0)
                  , s = (r >>>= 0) - (e >>>= 0);
                const a = Math.min(i, s)
                  , u = this.slice(n, o)
                  , f = t.slice(e, r);
                for (let t = 0; t < a; ++t)
                    if (u[t] !== f[t]) {
                        i = u[t],
                        s = f[t];
                        break
                    }
                return i < s ? -1 : s < i ? 1 : 0
            }
            ,
            c.prototype.includes = function(t, e, r) {
                return -1 !== this.indexOf(t, e, r)
            }
            ,
            c.prototype.indexOf = function(t, e, r) {
                return b(this, t, e, r, !0)
            }
            ,
            c.prototype.lastIndexOf = function(t, e, r) {
                return b(this, t, e, r, !1)
            }
            ,
            c.prototype.write = function(t, e, r, n) {
                if (void 0 === e)
                    n = "utf8",
                    r = this.length,
                    e = 0;
                else if (void 0 === r && "string" == typeof e)
                    n = e,
                    r = this.length,
                    e = 0;
                else {
                    if (!isFinite(e))
                        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e >>>= 0,
                    isFinite(r) ? (r >>>= 0,
                    void 0 === n && (n = "utf8")) : (n = r,
                    r = void 0)
                }
                const o = this.length - e;
                if ((void 0 === r || r > o) && (r = o),
                t.length > 0 && (r < 0 || e < 0) || e > this.length)
                    throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                let i = !1;
                for (; ; )
                    switch (n) {
                    case "hex":
                        return v(this, t, e, r);
                    case "utf8":
                    case "utf-8":
                        return E(this, t, e, r);
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return x(this, t, e, r);
                    case "base64":
                        return A(this, t, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return S(this, t, e, r);
                    default:
                        if (i)
                            throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(),
                        i = !0
                    }
            }
            ,
            c.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }
            ;
            const I = 4096;
            function O(t, e, r) {
                let n = "";
                r = Math.min(t.length, r);
                for (let o = e; o < r; ++o)
                    n += String.fromCharCode(127 & t[o]);
                return n
            }
            function U(t, e, r) {
                let n = "";
                r = Math.min(t.length, r);
                for (let o = e; o < r; ++o)
                    n += String.fromCharCode(t[o]);
                return n
            }
            function M(t, e, r) {
                const n = t.length;
                (!e || e < 0) && (e = 0),
                (!r || r < 0 || r > n) && (r = n);
                let o = "";
                for (let n = e; n < r; ++n)
                    o += Z[t[n]];
                return o
            }
            function k(t, e, r) {
                const n = t.slice(e, r);
                let o = "";
                for (let t = 0; t < n.length - 1; t += 2)
                    o += String.fromCharCode(n[t] + 256 * n[t + 1]);
                return o
            }
            function j(t, e, r) {
                if (t % 1 != 0 || t < 0)
                    throw new RangeError("offset is not uint");
                if (t + e > r)
                    throw new RangeError("Trying to access beyond buffer length")
            }
            function N(t, e, r, n, o, i) {
                if (!c.isBuffer(t))
                    throw new TypeError('"buffer" argument must be a Buffer instance');
                if (e > o || e < i)
                    throw new RangeError('"value" argument is out of bounds');
                if (r + n > t.length)
                    throw new RangeError("Index out of range")
            }
            function L(t, e, r, n, o) {
                H(e, n, o, t, r, 7);
                let i = Number(e & BigInt(4294967295));
                t[r++] = i,
                i >>= 8,
                t[r++] = i,
                i >>= 8,
                t[r++] = i,
                i >>= 8,
                t[r++] = i;
                let s = Number(e >> BigInt(32) & BigInt(4294967295));
                return t[r++] = s,
                s >>= 8,
                t[r++] = s,
                s >>= 8,
                t[r++] = s,
                s >>= 8,
                t[r++] = s,
                r
            }
            function _(t, e, r, n, o) {
                H(e, n, o, t, r, 7);
                let i = Number(e & BigInt(4294967295));
                t[r + 7] = i,
                i >>= 8,
                t[r + 6] = i,
                i >>= 8,
                t[r + 5] = i,
                i >>= 8,
                t[r + 4] = i;
                let s = Number(e >> BigInt(32) & BigInt(4294967295));
                return t[r + 3] = s,
                s >>= 8,
                t[r + 2] = s,
                s >>= 8,
                t[r + 1] = s,
                s >>= 8,
                t[r] = s,
                r + 8
            }
            function D(t, e, r, n, o, i) {
                if (r + n > t.length)
                    throw new RangeError("Index out of range");
                if (r < 0)
                    throw new RangeError("Index out of range")
            }
            function C(t, e, r, n, i) {
                return e = +e,
                r >>>= 0,
                i || D(t, 0, r, 4),
                o.write(t, e, r, n, 23, 4),
                r + 4
            }
            function R(t, e, r, n, i) {
                return e = +e,
                r >>>= 0,
                i || D(t, 0, r, 8),
                o.write(t, e, r, n, 52, 8),
                r + 8
            }
            c.prototype.slice = function(t, e) {
                const r = this.length;
                (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
                (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
                e < t && (e = t);
                const n = this.subarray(t, e);
                return Object.setPrototypeOf(n, c.prototype),
                n
            }
            ,
            c.prototype.readUintLE = c.prototype.readUIntLE = function(t, e, r) {
                t >>>= 0,
                e >>>= 0,
                r || j(t, e, this.length);
                let n = this[t]
                  , o = 1
                  , i = 0;
                for (; ++i < e && (o *= 256); )
                    n += this[t + i] * o;
                return n
            }
            ,
            c.prototype.readUintBE = c.prototype.readUIntBE = function(t, e, r) {
                t >>>= 0,
                e >>>= 0,
                r || j(t, e, this.length);
                let n = this[t + --e]
                  , o = 1;
                for (; e > 0 && (o *= 256); )
                    n += this[t + --e] * o;
                return n
            }
            ,
            c.prototype.readUint8 = c.prototype.readUInt8 = function(t, e) {
                return t >>>= 0,
                e || j(t, 1, this.length),
                this[t]
            }
            ,
            c.prototype.readUint16LE = c.prototype.readUInt16LE = function(t, e) {
                return t >>>= 0,
                e || j(t, 2, this.length),
                this[t] | this[t + 1] << 8
            }
            ,
            c.prototype.readUint16BE = c.prototype.readUInt16BE = function(t, e) {
                return t >>>= 0,
                e || j(t, 2, this.length),
                this[t] << 8 | this[t + 1]
            }
            ,
            c.prototype.readUint32LE = c.prototype.readUInt32LE = function(t, e) {
                return t >>>= 0,
                e || j(t, 4, this.length),
                (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }
            ,
            c.prototype.readUint32BE = c.prototype.readUInt32BE = function(t, e) {
                return t >>>= 0,
                e || j(t, 4, this.length),
                16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }
            ,
            c.prototype.readBigUInt64LE = J((function(t) {
                V(t >>>= 0, "offset");
                const e = this[t]
                  , r = this[t + 7];
                void 0 !== e && void 0 !== r || F(t, this.length - 8);
                const n = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24
                  , o = this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
                return BigInt(n) + (BigInt(o) << BigInt(32))
            }
            )),
            c.prototype.readBigUInt64BE = J((function(t) {
                V(t >>>= 0, "offset");
                const e = this[t]
                  , r = this[t + 7];
                void 0 !== e && void 0 !== r || F(t, this.length - 8);
                const n = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t]
                  , o = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
                return (BigInt(n) << BigInt(32)) + BigInt(o)
            }
            )),
            c.prototype.readIntLE = function(t, e, r) {
                t >>>= 0,
                e >>>= 0,
                r || j(t, e, this.length);
                let n = this[t]
                  , o = 1
                  , i = 0;
                for (; ++i < e && (o *= 256); )
                    n += this[t + i] * o;
                return o *= 128,
                n >= o && (n -= Math.pow(2, 8 * e)),
                n
            }
            ,
            c.prototype.readIntBE = function(t, e, r) {
                t >>>= 0,
                e >>>= 0,
                r || j(t, e, this.length);
                let n = e
                  , o = 1
                  , i = this[t + --n];
                for (; n > 0 && (o *= 256); )
                    i += this[t + --n] * o;
                return o *= 128,
                i >= o && (i -= Math.pow(2, 8 * e)),
                i
            }
            ,
            c.prototype.readInt8 = function(t, e) {
                return t >>>= 0,
                e || j(t, 1, this.length),
                128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            }
            ,
            c.prototype.readInt16LE = function(t, e) {
                t >>>= 0,
                e || j(t, 2, this.length);
                const r = this[t] | this[t + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }
            ,
            c.prototype.readInt16BE = function(t, e) {
                t >>>= 0,
                e || j(t, 2, this.length);
                const r = this[t + 1] | this[t] << 8;
                return 32768 & r ? 4294901760 | r : r
            }
            ,
            c.prototype.readInt32LE = function(t, e) {
                return t >>>= 0,
                e || j(t, 4, this.length),
                this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }
            ,
            c.prototype.readInt32BE = function(t, e) {
                return t >>>= 0,
                e || j(t, 4, this.length),
                this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }
            ,
            c.prototype.readBigInt64LE = J((function(t) {
                V(t >>>= 0, "offset");
                const e = this[t]
                  , r = this[t + 7];
                void 0 !== e && void 0 !== r || F(t, this.length - 8);
                const n = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24);
                return (BigInt(n) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
            }
            )),
            c.prototype.readBigInt64BE = J((function(t) {
                V(t >>>= 0, "offset");
                const e = this[t]
                  , r = this[t + 7];
                void 0 !== e && void 0 !== r || F(t, this.length - 8);
                const n = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
                return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r)
            }
            )),
            c.prototype.readFloatLE = function(t, e) {
                return t >>>= 0,
                e || j(t, 4, this.length),
                o.read(this, t, !0, 23, 4)
            }
            ,
            c.prototype.readFloatBE = function(t, e) {
                return t >>>= 0,
                e || j(t, 4, this.length),
                o.read(this, t, !1, 23, 4)
            }
            ,
            c.prototype.readDoubleLE = function(t, e) {
                return t >>>= 0,
                e || j(t, 8, this.length),
                o.read(this, t, !0, 52, 8)
            }
            ,
            c.prototype.readDoubleBE = function(t, e) {
                return t >>>= 0,
                e || j(t, 8, this.length),
                o.read(this, t, !1, 52, 8)
            }
            ,
            c.prototype.writeUintLE = c.prototype.writeUIntLE = function(t, e, r, n) {
                t = +t,
                e >>>= 0,
                r >>>= 0,
                n || N(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                let o = 1
                  , i = 0;
                for (this[e] = 255 & t; ++i < r && (o *= 256); )
                    this[e + i] = t / o & 255;
                return e + r
            }
            ,
            c.prototype.writeUintBE = c.prototype.writeUIntBE = function(t, e, r, n) {
                t = +t,
                e >>>= 0,
                r >>>= 0,
                n || N(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                let o = r - 1
                  , i = 1;
                for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
                    this[e + o] = t / i & 255;
                return e + r
            }
            ,
            c.prototype.writeUint8 = c.prototype.writeUInt8 = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 1, 255, 0),
                this[e] = 255 & t,
                e + 1
            }
            ,
            c.prototype.writeUint16LE = c.prototype.writeUInt16LE = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 2, 65535, 0),
                this[e] = 255 & t,
                this[e + 1] = t >>> 8,
                e + 2
            }
            ,
            c.prototype.writeUint16BE = c.prototype.writeUInt16BE = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 2, 65535, 0),
                this[e] = t >>> 8,
                this[e + 1] = 255 & t,
                e + 2
            }
            ,
            c.prototype.writeUint32LE = c.prototype.writeUInt32LE = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 4, 4294967295, 0),
                this[e + 3] = t >>> 24,
                this[e + 2] = t >>> 16,
                this[e + 1] = t >>> 8,
                this[e] = 255 & t,
                e + 4
            }
            ,
            c.prototype.writeUint32BE = c.prototype.writeUInt32BE = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 4, 4294967295, 0),
                this[e] = t >>> 24,
                this[e + 1] = t >>> 16,
                this[e + 2] = t >>> 8,
                this[e + 3] = 255 & t,
                e + 4
            }
            ,
            c.prototype.writeBigUInt64LE = J((function(t, e=0) {
                return L(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
            }
            )),
            c.prototype.writeBigUInt64BE = J((function(t, e=0) {
                return _(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
            }
            )),
            c.prototype.writeIntLE = function(t, e, r, n) {
                if (t = +t,
                e >>>= 0,
                !n) {
                    const n = Math.pow(2, 8 * r - 1);
                    N(this, t, e, r, n - 1, -n)
                }
                let o = 0
                  , i = 1
                  , s = 0;
                for (this[e] = 255 & t; ++o < r && (i *= 256); )
                    t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1),
                    this[e + o] = (t / i >> 0) - s & 255;
                return e + r
            }
            ,
            c.prototype.writeIntBE = function(t, e, r, n) {
                if (t = +t,
                e >>>= 0,
                !n) {
                    const n = Math.pow(2, 8 * r - 1);
                    N(this, t, e, r, n - 1, -n)
                }
                let o = r - 1
                  , i = 1
                  , s = 0;
                for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
                    t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1),
                    this[e + o] = (t / i >> 0) - s & 255;
                return e + r
            }
            ,
            c.prototype.writeInt8 = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 1, 127, -128),
                t < 0 && (t = 255 + t + 1),
                this[e] = 255 & t,
                e + 1
            }
            ,
            c.prototype.writeInt16LE = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 2, 32767, -32768),
                this[e] = 255 & t,
                this[e + 1] = t >>> 8,
                e + 2
            }
            ,
            c.prototype.writeInt16BE = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 2, 32767, -32768),
                this[e] = t >>> 8,
                this[e + 1] = 255 & t,
                e + 2
            }
            ,
            c.prototype.writeInt32LE = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 4, 2147483647, -2147483648),
                this[e] = 255 & t,
                this[e + 1] = t >>> 8,
                this[e + 2] = t >>> 16,
                this[e + 3] = t >>> 24,
                e + 4
            }
            ,
            c.prototype.writeInt32BE = function(t, e, r) {
                return t = +t,
                e >>>= 0,
                r || N(this, t, e, 4, 2147483647, -2147483648),
                t < 0 && (t = 4294967295 + t + 1),
                this[e] = t >>> 24,
                this[e + 1] = t >>> 16,
                this[e + 2] = t >>> 8,
                this[e + 3] = 255 & t,
                e + 4
            }
            ,
            c.prototype.writeBigInt64LE = J((function(t, e=0) {
                return L(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
            }
            )),
            c.prototype.writeBigInt64BE = J((function(t, e=0) {
                return _(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
            }
            )),
            c.prototype.writeFloatLE = function(t, e, r) {
                return C(this, t, e, !0, r)
            }
            ,
            c.prototype.writeFloatBE = function(t, e, r) {
                return C(this, t, e, !1, r)
            }
            ,
            c.prototype.writeDoubleLE = function(t, e, r) {
                return R(this, t, e, !0, r)
            }
            ,
            c.prototype.writeDoubleBE = function(t, e, r) {
                return R(this, t, e, !1, r)
            }
            ,
            c.prototype.copy = function(t, e, r, n) {
                if (!c.isBuffer(t))
                    throw new TypeError("argument should be a Buffer");
                if (r || (r = 0),
                n || 0 === n || (n = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                n > 0 && n < r && (n = r),
                n === r)
                    return 0;
                if (0 === t.length || 0 === this.length)
                    return 0;
                if (e < 0)
                    throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length)
                    throw new RangeError("Index out of range");
                if (n < 0)
                    throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length),
                t.length - e < n - r && (n = t.length - e + r);
                const o = n - r;
                return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, r, n) : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
                o
            }
            ,
            c.prototype.fill = function(t, e, r, n) {
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (n = e,
                    e = 0,
                    r = this.length) : "string" == typeof r && (n = r,
                    r = this.length),
                    void 0 !== n && "string" != typeof n)
                        throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !c.isEncoding(n))
                        throw new TypeError("Unknown encoding: " + n);
                    if (1 === t.length) {
                        const e = t.charCodeAt(0);
                        ("utf8" === n && e < 128 || "latin1" === n) && (t = e)
                    }
                } else
                    "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                if (e < 0 || this.length < e || this.length < r)
                    throw new RangeError("Out of range index");
                if (r <= e)
                    return this;
                let o;
                if (e >>>= 0,
                r = void 0 === r ? this.length : r >>> 0,
                t || (t = 0),
                "number" == typeof t)
                    for (o = e; o < r; ++o)
                        this[o] = t;
                else {
                    const i = c.isBuffer(t) ? t : c.from(t, n)
                      , s = i.length;
                    if (0 === s)
                        throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                    for (o = 0; o < r - e; ++o)
                        this[o + e] = i[o % s]
                }
                return this
            }
            ;
            const P = {};
            function z(t, e, r) {
                P[t] = class extends r {
                    constructor() {
                        super(),
                        Object.defineProperty(this, "message", {
                            value: e.apply(this, arguments),
                            writable: !0,
                            configurable: !0
                        }),
                        this.name = `${this.name} [${t}]`,
                        this.stack,
                        delete this.name
                    }
                    get code() {
                        return t
                    }
                    set code(t) {
                        Object.defineProperty(this, "code", {
                            configurable: !0,
                            enumerable: !0,
                            value: t,
                            writable: !0
                        })
                    }
                    toString() {
                        return `${this.name} [${t}]: ${this.message}`
                    }
                }
            }
            function $(t) {
                let e = ""
                  , r = t.length;
                const n = "-" === t[0] ? 1 : 0;
                for (; r >= n + 4; r -= 3)
                    e = `_${t.slice(r - 3, r)}${e}`;
                return `${t.slice(0, r)}${e}`
            }
            function H(t, e, r, n, o, i) {
                if (t > r || t < e) {
                    const n = "bigint" == typeof e ? "n" : "";
                    let o;
                    throw o = i > 3 ? 0 === e || e === BigInt(0) ? `>= 0${n} and < 2${n} ** ${8 * (i + 1)}${n}` : `>= -(2${n} ** ${8 * (i + 1) - 1}${n}) and < 2 ** ${8 * (i + 1) - 1}${n}` : `>= ${e}${n} and <= ${r}${n}`,
                    new P.ERR_OUT_OF_RANGE("value",o,t)
                }
                !function(t, e, r) {
                    V(e, "offset"),
                    void 0 !== t[e] && void 0 !== t[e + r] || F(e, t.length - (r + 1))
                }(n, o, i)
            }
            function V(t, e) {
                if ("number" != typeof t)
                    throw new P.ERR_INVALID_ARG_TYPE(e,"number",t)
            }
            function F(t, e, r) {
                if (Math.floor(t) !== t)
                    throw V(t, r),
                    new P.ERR_OUT_OF_RANGE(r || "offset","an integer",t);
                if (e < 0)
                    throw new P.ERR_BUFFER_OUT_OF_BOUNDS;
                throw new P.ERR_OUT_OF_RANGE(r || "offset",`>= ${r ? 1 : 0} and <= ${e}`,t)
            }
            z("ERR_BUFFER_OUT_OF_BOUNDS", (function(t) {
                return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
            }
            ), RangeError),
            z("ERR_INVALID_ARG_TYPE", (function(t, e) {
                return `The "${t}" argument must be of type number. Received type ${typeof e}`
            }
            ), TypeError),
            z("ERR_OUT_OF_RANGE", (function(t, e, r) {
                let n = `The value of "${t}" is out of range.`
                  , o = r;
                return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? o = $(String(r)) : "bigint" == typeof r && (o = String(r),
                (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (o = $(o)),
                o += "n"),
                n += ` It must be ${e}. Received ${o}`,
                n
            }
            ), RangeError);
            const q = /[^+/0-9A-Za-z-_]/g;
            function G(t, e) {
                let r;
                e = e || 1 / 0;
                const n = t.length;
                let o = null;
                const i = [];
                for (let s = 0; s < n; ++s) {
                    if (r = t.charCodeAt(s),
                    r > 55295 && r < 57344) {
                        if (!o) {
                            if (r > 56319) {
                                (e -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            if (s + 1 === n) {
                                (e -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            o = r;
                            continue
                        }
                        if (r < 56320) {
                            (e -= 3) > -1 && i.push(239, 191, 189),
                            o = r;
                            continue
                        }
                        r = 65536 + (o - 55296 << 10 | r - 56320)
                    } else
                        o && (e -= 3) > -1 && i.push(239, 191, 189);
                    if (o = null,
                    r < 128) {
                        if ((e -= 1) < 0)
                            break;
                        i.push(r)
                    } else if (r < 2048) {
                        if ((e -= 2) < 0)
                            break;
                        i.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((e -= 3) < 0)
                            break;
                        i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112))
                            throw new Error("Invalid code point");
                        if ((e -= 4) < 0)
                            break;
                        i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return i
            }
            function Y(t) {
                return n.toByteArray(function(t) {
                    if ((t = (t = t.split("=")[0]).trim().replace(q, "")).length < 2)
                        return "";
                    for (; t.length % 4 != 0; )
                        t += "=";
                    return t
                }(t))
            }
            function W(t, e, r, n) {
                let o;
                for (o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
                    e[o + r] = t[o];
                return o
            }
            function K(t, e) {
                return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
            }
            function Q(t) {
                return t != t
            }
            const Z = function() {
                const t = "0123456789abcdef"
                  , e = new Array(256);
                for (let r = 0; r < 16; ++r) {
                    const n = 16 * r;
                    for (let o = 0; o < 16; ++o)
                        e[n + o] = t[r] + t[o]
                }
                return e
            }();
            function J(t) {
                return "undefined" == typeof BigInt ? X : t
            }
            function X() {
                throw new Error("BigInt not supported")
            }
        }
        ,
        8774: t=>{
            "use strict";
            var e = Object.prototype.hasOwnProperty
              , r = "~";
            function n() {}
            function o(t, e, r) {
                this.fn = t,
                this.context = e,
                this.once = r || !1
            }
            function i(t, e, n, i, s) {
                if ("function" != typeof n)
                    throw new TypeError("The listener must be a function");
                var a = new o(n,i || t,s)
                  , c = r ? r + e : e;
                return t._events[c] ? t._events[c].fn ? t._events[c] = [t._events[c], a] : t._events[c].push(a) : (t._events[c] = a,
                t._eventsCount++),
                t
            }
            function s(t, e) {
                0 == --t._eventsCount ? t._events = new n : delete t._events[e]
            }
            function a() {
                this._events = new n,
                this._eventsCount = 0
            }
            Object.create && (n.prototype = Object.create(null),
            (new n).__proto__ || (r = !1)),
            a.prototype.eventNames = function() {
                var t, n, o = [];
                if (0 === this._eventsCount)
                    return o;
                for (n in t = this._events)
                    e.call(t, n) && o.push(r ? n.slice(1) : n);
                return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(t)) : o
            }
            ,
            a.prototype.listeners = function(t) {
                var e = r ? r + t : t
                  , n = this._events[e];
                if (!n)
                    return [];
                if (n.fn)
                    return [n.fn];
                for (var o = 0, i = n.length, s = new Array(i); o < i; o++)
                    s[o] = n[o].fn;
                return s
            }
            ,
            a.prototype.listenerCount = function(t) {
                var e = r ? r + t : t
                  , n = this._events[e];
                return n ? n.fn ? 1 : n.length : 0
            }
            ,
            a.prototype.emit = function(t, e, n, o, i, s) {
                var a = r ? r + t : t;
                if (!this._events[a])
                    return !1;
                var c, u, f = this._events[a], h = arguments.length;
                if (f.fn) {
                    switch (f.once && this.removeListener(t, f.fn, void 0, !0),
                    h) {
                    case 1:
                        return f.fn.call(f.context),
                        !0;
                    case 2:
                        return f.fn.call(f.context, e),
                        !0;
                    case 3:
                        return f.fn.call(f.context, e, n),
                        !0;
                    case 4:
                        return f.fn.call(f.context, e, n, o),
                        !0;
                    case 5:
                        return f.fn.call(f.context, e, n, o, i),
                        !0;
                    case 6:
                        return f.fn.call(f.context, e, n, o, i, s),
                        !0
                    }
                    for (u = 1,
                    c = new Array(h - 1); u < h; u++)
                        c[u - 1] = arguments[u];
                    f.fn.apply(f.context, c)
                } else {
                    var l, d = f.length;
                    for (u = 0; u < d; u++)
                        switch (f[u].once && this.removeListener(t, f[u].fn, void 0, !0),
                        h) {
                        case 1:
                            f[u].fn.call(f[u].context);
                            break;
                        case 2:
                            f[u].fn.call(f[u].context, e);
                            break;
                        case 3:
                            f[u].fn.call(f[u].context, e, n);
                            break;
                        case 4:
                            f[u].fn.call(f[u].context, e, n, o);
                            break;
                        default:
                            if (!c)
                                for (l = 1,
                                c = new Array(h - 1); l < h; l++)
                                    c[l - 1] = arguments[l];
                            f[u].fn.apply(f[u].context, c)
                        }
                }
                return !0
            }
            ,
            a.prototype.on = function(t, e, r) {
                return i(this, t, e, r, !1)
            }
            ,
            a.prototype.once = function(t, e, r) {
                return i(this, t, e, r, !0)
            }
            ,
            a.prototype.removeListener = function(t, e, n, o) {
                var i = r ? r + t : t;
                if (!this._events[i])
                    return this;
                if (!e)
                    return s(this, i),
                    this;
                var a = this._events[i];
                if (a.fn)
                    a.fn !== e || o && !a.once || n && a.context !== n || s(this, i);
                else {
                    for (var c = 0, u = [], f = a.length; c < f; c++)
                        (a[c].fn !== e || o && !a[c].once || n && a[c].context !== n) && u.push(a[c]);
                    u.length ? this._events[i] = 1 === u.length ? u[0] : u : s(this, i)
                }
                return this
            }
            ,
            a.prototype.removeAllListeners = function(t) {
                var e;
                return t ? (e = r ? r + t : t,
                this._events[e] && s(this, e)) : (this._events = new n,
                this._eventsCount = 0),
                this
            }
            ,
            a.prototype.off = a.prototype.removeListener,
            a.prototype.addListener = a.prototype.on,
            a.prefixed = r,
            a.EventEmitter = a,
            t.exports = a
        }
        ,
        2093: (t,e)=>{
            e.read = function(t, e, r, n, o) {
                var i, s, a = 8 * o - n - 1, c = (1 << a) - 1, u = c >> 1, f = -7, h = r ? o - 1 : 0, l = r ? -1 : 1, d = t[e + h];
                for (h += l,
                i = d & (1 << -f) - 1,
                d >>= -f,
                f += a; f > 0; i = 256 * i + t[e + h],
                h += l,
                f -= 8)
                    ;
                for (s = i & (1 << -f) - 1,
                i >>= -f,
                f += n; f > 0; s = 256 * s + t[e + h],
                h += l,
                f -= 8)
                    ;
                if (0 === i)
                    i = 1 - u;
                else {
                    if (i === c)
                        return s ? NaN : 1 / 0 * (d ? -1 : 1);
                    s += Math.pow(2, n),
                    i -= u
                }
                return (d ? -1 : 1) * s * Math.pow(2, i - n)
            }
            ,
            e.write = function(t, e, r, n, o, i) {
                var s, a, c, u = 8 * i - o - 1, f = (1 << u) - 1, h = f >> 1, l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = n ? 0 : i - 1, p = n ? 1 : -1, y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (e = Math.abs(e),
                isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0,
                s = f) : (s = Math.floor(Math.log(e) / Math.LN2),
                e * (c = Math.pow(2, -s)) < 1 && (s--,
                c *= 2),
                (e += s + h >= 1 ? l / c : l * Math.pow(2, 1 - h)) * c >= 2 && (s++,
                c /= 2),
                s + h >= f ? (a = 0,
                s = f) : s + h >= 1 ? (a = (e * c - 1) * Math.pow(2, o),
                s += h) : (a = e * Math.pow(2, h - 1) * Math.pow(2, o),
                s = 0)); o >= 8; t[r + d] = 255 & a,
                d += p,
                a /= 256,
                o -= 8)
                    ;
                for (s = s << o | a,
                u += o; u > 0; t[r + d] = 255 & s,
                d += p,
                s /= 256,
                u -= 8)
                    ;
                t[r + d - p] |= 128 * y
            }
        }
        ,
        2463: (t,e,r)=>{
            "use strict";
            const n = r(454).v4
              , o = r(8018)
              , i = function(t, e) {
                if (!(this instanceof i))
                    return new i(t,e);
                e || (e = {}),
                this.options = {
                    reviver: void 0 !== e.reviver ? e.reviver : null,
                    replacer: void 0 !== e.replacer ? e.replacer : null,
                    generator: void 0 !== e.generator ? e.generator : function() {
                        return n()
                    }
                    ,
                    version: void 0 !== e.version ? e.version : 2,
                    notificationIdNull: "boolean" == typeof e.notificationIdNull && e.notificationIdNull
                },
                this.callServer = t
            };
            t.exports = i,
            i.prototype.request = function(t, e, r, n) {
                const i = this;
                let s = null;
                const a = Array.isArray(t) && "function" == typeof e;
                if (1 === this.options.version && a)
                    throw new TypeError("JSON-RPC 1.0 does not support batching");
                if (a || !a && t && "object" == typeof t && "function" == typeof e)
                    n = e,
                    s = t;
                else {
                    "function" == typeof r && (n = r,
                    r = void 0);
                    const i = "function" == typeof n;
                    try {
                        s = o(t, e, r, {
                            generator: this.options.generator,
                            version: this.options.version,
                            notificationIdNull: this.options.notificationIdNull
                        })
                    } catch (t) {
                        if (i)
                            return n(t);
                        throw t
                    }
                    if (!i)
                        return s
                }
                let c;
                try {
                    c = JSON.stringify(s, this.options.replacer)
                } catch (t) {
                    return n(t)
                }
                return this.callServer(c, (function(t, e) {
                    i._parseResponse(t, e, n)
                }
                )),
                s
            }
            ,
            i.prototype._parseResponse = function(t, e, r) {
                if (t)
                    return void r(t);
                if (!e)
                    return r();
                let n;
                try {
                    n = JSON.parse(e, this.options.reviver)
                } catch (t) {
                    return r(t)
                }
                if (3 === r.length) {
                    if (Array.isArray(n)) {
                        const t = function(t) {
                            return void 0 !== t.error
                        }
                          , e = function(e) {
                            return !t(e)
                        };
                        return r(null, n.filter(t), n.filter(e))
                    }
                    return r(null, n.error, n.result)
                }
                r(null, n)
            }
        }
        ,
        8018: (t,e,r)=>{
            "use strict";
            const n = r(454).v4;
            t.exports = function(t, e, r, o) {
                if ("string" != typeof t)
                    throw new TypeError(t + " must be a string");
                const i = "number" == typeof (o = o || {}).version ? o.version : 2;
                if (1 !== i && 2 !== i)
                    throw new TypeError(i + " must be 1 or 2");
                const s = {
                    method: t
                };
                if (2 === i && (s.jsonrpc = "2.0"),
                e) {
                    if ("object" != typeof e && !Array.isArray(e))
                        throw new TypeError(e + " must be an object, array or omitted");
                    s.params = e
                }
                if (void 0 === r) {
                    const t = "function" == typeof o.generator ? o.generator : function() {
                        return n()
                    }
                    ;
                    s.id = t(s, o)
                } else
                    2 === i && null === r ? o.notificationIdNull && (s.id = null) : s.id = r;
                return s
            }
        }
        ,
        6057: (t,e,r)=>{
            "use strict";
            var n = r(8001);
            n(r(2357)),
            n(r(2078)),
            n(r(3649)),
            n(r(4158)),
            n(r(2982)),
            n(r(1836));
            n(r(5492)).default
        }
        ,
        5492: (t,e,r)=>{
            "use strict";
            var n = r(4984).lW
              , o = r(8001);
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = void 0;
            var i = o(r(366))
              , s = o(r(7790))
              , a = o(r(4020))
              , c = o(r(2078))
              , u = o(r(2357))
              , f = o(r(3649))
              , h = o(r(4158))
              , l = o(r(2982))
              , d = r(8774);
            var p = function(t) {
                (0,
                f.default)(w, t);
                var e, r, o, d, p, y, g = (p = w,
                y = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct)
                        return !1;
                    if (Reflect.construct.sham)
                        return !1;
                    if ("function" == typeof Proxy)
                        return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                        ))),
                        !0
                    } catch (t) {
                        return !1
                    }
                }(),
                function() {
                    var t, e = (0,
                    l.default)(p);
                    if (y) {
                        var r = (0,
                        l.default)(this).constructor;
                        t = Reflect.construct(e, arguments, r)
                    } else
                        t = e.apply(this, arguments);
                    return (0,
                    h.default)(this, t)
                }
                );
                function w(t) {
                    var e, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "ws://localhost:8080", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = arguments.length > 3 ? arguments[3] : void 0;
                    (0,
                    c.default)(this, w);
                    var i = n.autoconnect
                      , s = void 0 === i || i
                      , a = n.reconnect
                      , u = void 0 === a || a
                      , f = n.reconnect_interval
                      , h = void 0 === f ? 1e3 : f
                      , l = n.max_reconnects
                      , d = void 0 === l ? 5 : l
                      , p = function(t, e) {
                        var r = {};
                        for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
                        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                            var o = 0;
                            for (n = Object.getOwnPropertySymbols(t); o < n.length; o++)
                                e.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[o]) && (r[n[o]] = t[n[o]])
                        }
                        return r
                    }(n, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);
                    return (e = g.call(this)).webSocketFactory = t,
                    e.queue = {},
                    e.rpc_id = 0,
                    e.address = r,
                    e.autoconnect = s,
                    e.ready = !1,
                    e.reconnect = u,
                    e.reconnect_timer_id = void 0,
                    e.reconnect_interval = h,
                    e.max_reconnects = d,
                    e.rest_options = p,
                    e.current_reconnects = 0,
                    e.generate_request_id = o || function() {
                        return ++e.rpc_id
                    }
                    ,
                    e.autoconnect && e._connect(e.address, Object.assign({
                        autoconnect: e.autoconnect,
                        reconnect: e.reconnect,
                        reconnect_interval: e.reconnect_interval,
                        max_reconnects: e.max_reconnects
                    }, e.rest_options)),
                    e
                }
                return (0,
                u.default)(w, [{
                    key: "connect",
                    value: function() {
                        this.socket || this._connect(this.address, Object.assign({
                            autoconnect: this.autoconnect,
                            reconnect: this.reconnect,
                            reconnect_interval: this.reconnect_interval,
                            max_reconnects: this.max_reconnects
                        }, this.rest_options))
                    }
                }, {
                    key: "call",
                    value: function(t, e, r, n) {
                        var o = this;
                        return n || "object" !== (0,
                        a.default)(r) || (n = r,
                        r = null),
                        new Promise((function(i, s) {
                            if (!o.ready)
                                return s(new Error("socket not ready"));
                            var a = o.generate_request_id(t, e)
                              , c = {
                                jsonrpc: "2.0",
                                method: t,
                                params: e || null,
                                id: a
                            };
                            o.socket.send(JSON.stringify(c), n, (function(t) {
                                if (t)
                                    return s(t);
                                o.queue[a] = {
                                    promise: [i, s]
                                },
                                r && (o.queue[a].timeout = setTimeout((function() {
                                    delete o.queue[a],
                                    s(new Error("reply timeout"))
                                }
                                ), r))
                            }
                            ))
                        }
                        ))
                    }
                }, {
                    key: "login",
                    value: (d = (0,
                    s.default)(i.default.mark((function t(e) {
                        var r;
                        return i.default.wrap((function(t) {
                            for (; ; )
                                switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2,
                                    this.call("rpc.login", e);
                                case 2:
                                    if (r = t.sent) {
                                        t.next = 5;
                                        break
                                    }
                                    throw new Error("authentication failed");
                                case 5:
                                    return t.abrupt("return", r);
                                case 6:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t, this)
                    }
                    ))),
                    function(t) {
                        return d.apply(this, arguments)
                    }
                    )
                }, {
                    key: "listMethods",
                    value: (o = (0,
                    s.default)(i.default.mark((function t() {
                        return i.default.wrap((function(t) {
                            for (; ; )
                                switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2,
                                    this.call("__listMethods");
                                case 2:
                                    return t.abrupt("return", t.sent);
                                case 3:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t, this)
                    }
                    ))),
                    function() {
                        return o.apply(this, arguments)
                    }
                    )
                }, {
                    key: "notify",
                    value: function(t, e) {
                        var r = this;
                        return new Promise((function(n, o) {
                            if (!r.ready)
                                return o(new Error("socket not ready"));
                            var i = {
                                jsonrpc: "2.0",
                                method: t,
                                params: e || null
                            };
                            r.socket.send(JSON.stringify(i), (function(t) {
                                if (t)
                                    return o(t);
                                n()
                            }
                            ))
                        }
                        ))
                    }
                }, {
                    key: "subscribe",
                    value: (r = (0,
                    s.default)(i.default.mark((function t(e) {
                        var r;
                        return i.default.wrap((function(t) {
                            for (; ; )
                                switch (t.prev = t.next) {
                                case 0:
                                    return "string" == typeof e && (e = [e]),
                                    t.next = 3,
                                    this.call("rpc.on", e);
                                case 3:
                                    if (r = t.sent,
                                    "string" != typeof e || "ok" === r[e]) {
                                        t.next = 6;
                                        break
                                    }
                                    throw new Error("Failed subscribing to an event '" + e + "' with: " + r[e]);
                                case 6:
                                    return t.abrupt("return", r);
                                case 7:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t, this)
                    }
                    ))),
                    function(t) {
                        return r.apply(this, arguments)
                    }
                    )
                }, {
                    key: "unsubscribe",
                    value: (e = (0,
                    s.default)(i.default.mark((function t(e) {
                        var r;
                        return i.default.wrap((function(t) {
                            for (; ; )
                                switch (t.prev = t.next) {
                                case 0:
                                    return "string" == typeof e && (e = [e]),
                                    t.next = 3,
                                    this.call("rpc.off", e);
                                case 3:
                                    if (r = t.sent,
                                    "string" != typeof e || "ok" === r[e]) {
                                        t.next = 6;
                                        break
                                    }
                                    throw new Error("Failed unsubscribing from an event with: " + r);
                                case 6:
                                    return t.abrupt("return", r);
                                case 7:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t, this)
                    }
                    ))),
                    function(t) {
                        return e.apply(this, arguments)
                    }
                    )
                }, {
                    key: "close",
                    value: function(t, e) {
                        this.socket.close(t || 1e3, e)
                    }
                }, {
                    key: "_connect",
                    value: function(t, e) {
                        var r = this;
                        clearTimeout(this.reconnect_timer_id),
                        this.socket = this.webSocketFactory(t, e),
                        this.socket.addEventListener("open", (function() {
                            r.ready = !0,
                            r.emit("open"),
                            r.current_reconnects = 0
                        }
                        )),
                        this.socket.addEventListener("message", (function(t) {
                            var e = t.data;
                            e instanceof ArrayBuffer && (e = n.from(e).toString());
                            try {
                                e = JSON.parse(e)
                            } catch (t) {
                                return
                            }
                            if (e.notification && r.listeners(e.notification).length) {
                                if (!Object.keys(e.params).length)
                                    return r.emit(e.notification);
                                var o = [e.notification];
                                if (e.params.constructor === Object)
                                    o.push(e.params);
                                else
                                    for (var i = 0; i < e.params.length; i++)
                                        o.push(e.params[i]);
                                return Promise.resolve().then((function() {
                                    r.emit.apply(r, o)
                                }
                                ))
                            }
                            if (!r.queue[e.id])
                                return e.method && e.params ? Promise.resolve().then((function() {
                                    r.emit(e.method, e.params)
                                }
                                )) : void 0;
                            "error"in e == "result"in e && r.queue[e.id].promise[1](new Error('Server response malformed. Response must include either "result" or "error", but not both.')),
                            r.queue[e.id].timeout && clearTimeout(r.queue[e.id].timeout),
                            e.error ? r.queue[e.id].promise[1](e.error) : r.queue[e.id].promise[0](e.result),
                            delete r.queue[e.id]
                        }
                        )),
                        this.socket.addEventListener("error", (function(t) {
                            return r.emit("error", t)
                        }
                        )),
                        this.socket.addEventListener("close", (function(n) {
                            var o = n.code
                              , i = n.reason;
                            r.ready && setTimeout((function() {
                                return r.emit("close", o, i)
                            }
                            ), 0),
                            r.ready = !1,
                            r.socket = void 0,
                            1e3 !== o && (r.current_reconnects++,
                            r.reconnect && (r.max_reconnects > r.current_reconnects || 0 === r.max_reconnects) && (r.reconnect_timer_id = setTimeout((function() {
                                return r._connect(t, e)
                            }
                            ), r.reconnect_interval)))
                        }
                        ))
                    }
                }]),
                w
            }(d.EventEmitter);
            e.default = p
        }
        ,
        1836: (t,e,r)=>{
            "use strict";
            var n = r(8001);
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = function(t, e) {
                return new u(t,e)
            }
            ;
            var o = n(r(2078))
              , i = n(r(2357))
              , s = n(r(3649))
              , a = n(r(4158))
              , c = n(r(2982));
            var u = function(t) {
                (0,
                s.default)(u, t);
                var e, r, n = (e = u,
                r = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct)
                        return !1;
                    if (Reflect.construct.sham)
                        return !1;
                    if ("function" == typeof Proxy)
                        return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                        ))),
                        !0
                    } catch (t) {
                        return !1
                    }
                }(),
                function() {
                    var t, n = (0,
                    c.default)(e);
                    if (r) {
                        var o = (0,
                        c.default)(this).constructor;
                        t = Reflect.construct(n, arguments, o)
                    } else
                        t = n.apply(this, arguments);
                    return (0,
                    a.default)(this, t)
                }
                );
                function u(t, e, r) {
                    var i;
                    return (0,
                    o.default)(this, u),
                    (i = n.call(this)).socket = new window.WebSocket(t,r),
                    i.socket.onopen = function() {
                        return i.emit("open")
                    }
                    ,
                    i.socket.onmessage = function(t) {
                        return i.emit("message", t.data)
                    }
                    ,
                    i.socket.onerror = function(t) {
                        return i.emit("error", t)
                    }
                    ,
                    i.socket.onclose = function(t) {
                        i.emit("close", t.code, t.reason)
                    }
                    ,
                    i
                }
                return (0,
                i.default)(u, [{
                    key: "send",
                    value: function(t, e, r) {
                        var n = r || e;
                        try {
                            this.socket.send(t),
                            n()
                        } catch (t) {
                            n(t)
                        }
                    }
                }, {
                    key: "close",
                    value: function(t, e) {
                        this.socket.close(t, e)
                    }
                }, {
                    key: "addEventListener",
                    value: function(t, e, r) {
                        this.socket.addEventListener(t, e, r)
                    }
                }]),
                u
            }(r(8774).EventEmitter)
        }
        ,
        9320: (t,e,r)=>{
            !function(t) {
                "use strict";
                var e = function(t) {
                    var e, r = new Float64Array(16);
                    if (t)
                        for (e = 0; e < t.length; e++)
                            r[e] = t[e];
                    return r
                }
                  , n = function() {
                    throw new Error("no PRNG")
                }
                  , o = new Uint8Array(16)
                  , i = new Uint8Array(32);
                i[0] = 9;
                var s = e()
                  , a = e([1])
                  , c = e([56129, 1])
                  , u = e([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995])
                  , f = e([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222])
                  , h = e([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553])
                  , l = e([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214])
                  , d = e([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
                function p(t, e, r, n) {
                    t[e] = r >> 24 & 255,
                    t[e + 1] = r >> 16 & 255,
                    t[e + 2] = r >> 8 & 255,
                    t[e + 3] = 255 & r,
                    t[e + 4] = n >> 24 & 255,
                    t[e + 5] = n >> 16 & 255,
                    t[e + 6] = n >> 8 & 255,
                    t[e + 7] = 255 & n
                }
                function y(t, e, r, n, o) {
                    var i, s = 0;
                    for (i = 0; i < o; i++)
                        s |= t[e + i] ^ r[n + i];
                    return (1 & s - 1 >>> 8) - 1
                }
                function g(t, e, r, n) {
                    return y(t, e, r, n, 16)
                }
                function w(t, e, r, n) {
                    return y(t, e, r, n, 32)
                }
                function b(t, e, r, n) {
                    !function(t, e, r, n) {
                        for (var o, i = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, s = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, a = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, c = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, u = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, f = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, h = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, l = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, d = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, p = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, y = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, g = 255 & r[16] | (255 & r[17]) << 8 | (255 & r[18]) << 16 | (255 & r[19]) << 24, w = 255 & r[20] | (255 & r[21]) << 8 | (255 & r[22]) << 16 | (255 & r[23]) << 24, b = 255 & r[24] | (255 & r[25]) << 8 | (255 & r[26]) << 16 | (255 & r[27]) << 24, m = 255 & r[28] | (255 & r[29]) << 8 | (255 & r[30]) << 16 | (255 & r[31]) << 24, v = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, E = i, x = s, A = a, S = c, T = u, B = f, I = h, O = l, U = d, M = p, k = y, j = g, N = w, L = b, _ = m, D = v, C = 0; C < 20; C += 2)
                            E ^= (o = (N ^= (o = (U ^= (o = (T ^= (o = E + N | 0) << 7 | o >>> 25) + E | 0) << 9 | o >>> 23) + T | 0) << 13 | o >>> 19) + U | 0) << 18 | o >>> 14,
                            B ^= (o = (x ^= (o = (L ^= (o = (M ^= (o = B + x | 0) << 7 | o >>> 25) + B | 0) << 9 | o >>> 23) + M | 0) << 13 | o >>> 19) + L | 0) << 18 | o >>> 14,
                            k ^= (o = (I ^= (o = (A ^= (o = (_ ^= (o = k + I | 0) << 7 | o >>> 25) + k | 0) << 9 | o >>> 23) + _ | 0) << 13 | o >>> 19) + A | 0) << 18 | o >>> 14,
                            D ^= (o = (j ^= (o = (O ^= (o = (S ^= (o = D + j | 0) << 7 | o >>> 25) + D | 0) << 9 | o >>> 23) + S | 0) << 13 | o >>> 19) + O | 0) << 18 | o >>> 14,
                            E ^= (o = (S ^= (o = (A ^= (o = (x ^= (o = E + S | 0) << 7 | o >>> 25) + E | 0) << 9 | o >>> 23) + x | 0) << 13 | o >>> 19) + A | 0) << 18 | o >>> 14,
                            B ^= (o = (T ^= (o = (O ^= (o = (I ^= (o = B + T | 0) << 7 | o >>> 25) + B | 0) << 9 | o >>> 23) + I | 0) << 13 | o >>> 19) + O | 0) << 18 | o >>> 14,
                            k ^= (o = (M ^= (o = (U ^= (o = (j ^= (o = k + M | 0) << 7 | o >>> 25) + k | 0) << 9 | o >>> 23) + j | 0) << 13 | o >>> 19) + U | 0) << 18 | o >>> 14,
                            D ^= (o = (_ ^= (o = (L ^= (o = (N ^= (o = D + _ | 0) << 7 | o >>> 25) + D | 0) << 9 | o >>> 23) + N | 0) << 13 | o >>> 19) + L | 0) << 18 | o >>> 14;
                        E = E + i | 0,
                        x = x + s | 0,
                        A = A + a | 0,
                        S = S + c | 0,
                        T = T + u | 0,
                        B = B + f | 0,
                        I = I + h | 0,
                        O = O + l | 0,
                        U = U + d | 0,
                        M = M + p | 0,
                        k = k + y | 0,
                        j = j + g | 0,
                        N = N + w | 0,
                        L = L + b | 0,
                        _ = _ + m | 0,
                        D = D + v | 0,
                        t[0] = E >>> 0 & 255,
                        t[1] = E >>> 8 & 255,
                        t[2] = E >>> 16 & 255,
                        t[3] = E >>> 24 & 255,
                        t[4] = x >>> 0 & 255,
                        t[5] = x >>> 8 & 255,
                        t[6] = x >>> 16 & 255,
                        t[7] = x >>> 24 & 255,
                        t[8] = A >>> 0 & 255,
                        t[9] = A >>> 8 & 255,
                        t[10] = A >>> 16 & 255,
                        t[11] = A >>> 24 & 255,
                        t[12] = S >>> 0 & 255,
                        t[13] = S >>> 8 & 255,
                        t[14] = S >>> 16 & 255,
                        t[15] = S >>> 24 & 255,
                        t[16] = T >>> 0 & 255,
                        t[17] = T >>> 8 & 255,
                        t[18] = T >>> 16 & 255,
                        t[19] = T >>> 24 & 255,
                        t[20] = B >>> 0 & 255,
                        t[21] = B >>> 8 & 255,
                        t[22] = B >>> 16 & 255,
                        t[23] = B >>> 24 & 255,
                        t[24] = I >>> 0 & 255,
                        t[25] = I >>> 8 & 255,
                        t[26] = I >>> 16 & 255,
                        t[27] = I >>> 24 & 255,
                        t[28] = O >>> 0 & 255,
                        t[29] = O >>> 8 & 255,
                        t[30] = O >>> 16 & 255,
                        t[31] = O >>> 24 & 255,
                        t[32] = U >>> 0 & 255,
                        t[33] = U >>> 8 & 255,
                        t[34] = U >>> 16 & 255,
                        t[35] = U >>> 24 & 255,
                        t[36] = M >>> 0 & 255,
                        t[37] = M >>> 8 & 255,
                        t[38] = M >>> 16 & 255,
                        t[39] = M >>> 24 & 255,
                        t[40] = k >>> 0 & 255,
                        t[41] = k >>> 8 & 255,
                        t[42] = k >>> 16 & 255,
                        t[43] = k >>> 24 & 255,
                        t[44] = j >>> 0 & 255,
                        t[45] = j >>> 8 & 255,
                        t[46] = j >>> 16 & 255,
                        t[47] = j >>> 24 & 255,
                        t[48] = N >>> 0 & 255,
                        t[49] = N >>> 8 & 255,
                        t[50] = N >>> 16 & 255,
                        t[51] = N >>> 24 & 255,
                        t[52] = L >>> 0 & 255,
                        t[53] = L >>> 8 & 255,
                        t[54] = L >>> 16 & 255,
                        t[55] = L >>> 24 & 255,
                        t[56] = _ >>> 0 & 255,
                        t[57] = _ >>> 8 & 255,
                        t[58] = _ >>> 16 & 255,
                        t[59] = _ >>> 24 & 255,
                        t[60] = D >>> 0 & 255,
                        t[61] = D >>> 8 & 255,
                        t[62] = D >>> 16 & 255,
                        t[63] = D >>> 24 & 255
                    }(t, e, r, n)
                }
                function m(t, e, r, n) {
                    !function(t, e, r, n) {
                        for (var o, i = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, s = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, a = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, c = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, u = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, f = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, h = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, l = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, d = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, p = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, y = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, g = 255 & r[16] | (255 & r[17]) << 8 | (255 & r[18]) << 16 | (255 & r[19]) << 24, w = 255 & r[20] | (255 & r[21]) << 8 | (255 & r[22]) << 16 | (255 & r[23]) << 24, b = 255 & r[24] | (255 & r[25]) << 8 | (255 & r[26]) << 16 | (255 & r[27]) << 24, m = 255 & r[28] | (255 & r[29]) << 8 | (255 & r[30]) << 16 | (255 & r[31]) << 24, v = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, E = 0; E < 20; E += 2)
                            i ^= (o = (w ^= (o = (d ^= (o = (u ^= (o = i + w | 0) << 7 | o >>> 25) + i | 0) << 9 | o >>> 23) + u | 0) << 13 | o >>> 19) + d | 0) << 18 | o >>> 14,
                            f ^= (o = (s ^= (o = (b ^= (o = (p ^= (o = f + s | 0) << 7 | o >>> 25) + f | 0) << 9 | o >>> 23) + p | 0) << 13 | o >>> 19) + b | 0) << 18 | o >>> 14,
                            y ^= (o = (h ^= (o = (a ^= (o = (m ^= (o = y + h | 0) << 7 | o >>> 25) + y | 0) << 9 | o >>> 23) + m | 0) << 13 | o >>> 19) + a | 0) << 18 | o >>> 14,
                            v ^= (o = (g ^= (o = (l ^= (o = (c ^= (o = v + g | 0) << 7 | o >>> 25) + v | 0) << 9 | o >>> 23) + c | 0) << 13 | o >>> 19) + l | 0) << 18 | o >>> 14,
                            i ^= (o = (c ^= (o = (a ^= (o = (s ^= (o = i + c | 0) << 7 | o >>> 25) + i | 0) << 9 | o >>> 23) + s | 0) << 13 | o >>> 19) + a | 0) << 18 | o >>> 14,
                            f ^= (o = (u ^= (o = (l ^= (o = (h ^= (o = f + u | 0) << 7 | o >>> 25) + f | 0) << 9 | o >>> 23) + h | 0) << 13 | o >>> 19) + l | 0) << 18 | o >>> 14,
                            y ^= (o = (p ^= (o = (d ^= (o = (g ^= (o = y + p | 0) << 7 | o >>> 25) + y | 0) << 9 | o >>> 23) + g | 0) << 13 | o >>> 19) + d | 0) << 18 | o >>> 14,
                            v ^= (o = (m ^= (o = (b ^= (o = (w ^= (o = v + m | 0) << 7 | o >>> 25) + v | 0) << 9 | o >>> 23) + w | 0) << 13 | o >>> 19) + b | 0) << 18 | o >>> 14;
                        t[0] = i >>> 0 & 255,
                        t[1] = i >>> 8 & 255,
                        t[2] = i >>> 16 & 255,
                        t[3] = i >>> 24 & 255,
                        t[4] = f >>> 0 & 255,
                        t[5] = f >>> 8 & 255,
                        t[6] = f >>> 16 & 255,
                        t[7] = f >>> 24 & 255,
                        t[8] = y >>> 0 & 255,
                        t[9] = y >>> 8 & 255,
                        t[10] = y >>> 16 & 255,
                        t[11] = y >>> 24 & 255,
                        t[12] = v >>> 0 & 255,
                        t[13] = v >>> 8 & 255,
                        t[14] = v >>> 16 & 255,
                        t[15] = v >>> 24 & 255,
                        t[16] = h >>> 0 & 255,
                        t[17] = h >>> 8 & 255,
                        t[18] = h >>> 16 & 255,
                        t[19] = h >>> 24 & 255,
                        t[20] = l >>> 0 & 255,
                        t[21] = l >>> 8 & 255,
                        t[22] = l >>> 16 & 255,
                        t[23] = l >>> 24 & 255,
                        t[24] = d >>> 0 & 255,
                        t[25] = d >>> 8 & 255,
                        t[26] = d >>> 16 & 255,
                        t[27] = d >>> 24 & 255,
                        t[28] = p >>> 0 & 255,
                        t[29] = p >>> 8 & 255,
                        t[30] = p >>> 16 & 255,
                        t[31] = p >>> 24 & 255
                    }(t, e, r, n)
                }
                var v = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
                function E(t, e, r, n, o, i, s) {
                    var a, c, u = new Uint8Array(16), f = new Uint8Array(64);
                    for (c = 0; c < 16; c++)
                        u[c] = 0;
                    for (c = 0; c < 8; c++)
                        u[c] = i[c];
                    for (; o >= 64; ) {
                        for (b(f, u, s, v),
                        c = 0; c < 64; c++)
                            t[e + c] = r[n + c] ^ f[c];
                        for (a = 1,
                        c = 8; c < 16; c++)
                            a = a + (255 & u[c]) | 0,
                            u[c] = 255 & a,
                            a >>>= 8;
                        o -= 64,
                        e += 64,
                        n += 64
                    }
                    if (o > 0)
                        for (b(f, u, s, v),
                        c = 0; c < o; c++)
                            t[e + c] = r[n + c] ^ f[c];
                    return 0
                }
                function x(t, e, r, n, o) {
                    var i, s, a = new Uint8Array(16), c = new Uint8Array(64);
                    for (s = 0; s < 16; s++)
                        a[s] = 0;
                    for (s = 0; s < 8; s++)
                        a[s] = n[s];
                    for (; r >= 64; ) {
                        for (b(c, a, o, v),
                        s = 0; s < 64; s++)
                            t[e + s] = c[s];
                        for (i = 1,
                        s = 8; s < 16; s++)
                            i = i + (255 & a[s]) | 0,
                            a[s] = 255 & i,
                            i >>>= 8;
                        r -= 64,
                        e += 64
                    }
                    if (r > 0)
                        for (b(c, a, o, v),
                        s = 0; s < r; s++)
                            t[e + s] = c[s];
                    return 0
                }
                function A(t, e, r, n, o) {
                    var i = new Uint8Array(32);
                    m(i, n, o, v);
                    for (var s = new Uint8Array(8), a = 0; a < 8; a++)
                        s[a] = n[a + 16];
                    return x(t, e, r, s, i)
                }
                function S(t, e, r, n, o, i, s) {
                    var a = new Uint8Array(32);
                    m(a, i, s, v);
                    for (var c = new Uint8Array(8), u = 0; u < 8; u++)
                        c[u] = i[u + 16];
                    return E(t, e, r, n, o, c, a)
                }
                var T = function(t) {
                    var e, r, n, o, i, s, a, c;
                    this.buffer = new Uint8Array(16),
                    this.r = new Uint16Array(10),
                    this.h = new Uint16Array(10),
                    this.pad = new Uint16Array(8),
                    this.leftover = 0,
                    this.fin = 0,
                    e = 255 & t[0] | (255 & t[1]) << 8,
                    this.r[0] = 8191 & e,
                    r = 255 & t[2] | (255 & t[3]) << 8,
                    this.r[1] = 8191 & (e >>> 13 | r << 3),
                    n = 255 & t[4] | (255 & t[5]) << 8,
                    this.r[2] = 7939 & (r >>> 10 | n << 6),
                    o = 255 & t[6] | (255 & t[7]) << 8,
                    this.r[3] = 8191 & (n >>> 7 | o << 9),
                    i = 255 & t[8] | (255 & t[9]) << 8,
                    this.r[4] = 255 & (o >>> 4 | i << 12),
                    this.r[5] = i >>> 1 & 8190,
                    s = 255 & t[10] | (255 & t[11]) << 8,
                    this.r[6] = 8191 & (i >>> 14 | s << 2),
                    a = 255 & t[12] | (255 & t[13]) << 8,
                    this.r[7] = 8065 & (s >>> 11 | a << 5),
                    c = 255 & t[14] | (255 & t[15]) << 8,
                    this.r[8] = 8191 & (a >>> 8 | c << 8),
                    this.r[9] = c >>> 5 & 127,
                    this.pad[0] = 255 & t[16] | (255 & t[17]) << 8,
                    this.pad[1] = 255 & t[18] | (255 & t[19]) << 8,
                    this.pad[2] = 255 & t[20] | (255 & t[21]) << 8,
                    this.pad[3] = 255 & t[22] | (255 & t[23]) << 8,
                    this.pad[4] = 255 & t[24] | (255 & t[25]) << 8,
                    this.pad[5] = 255 & t[26] | (255 & t[27]) << 8,
                    this.pad[6] = 255 & t[28] | (255 & t[29]) << 8,
                    this.pad[7] = 255 & t[30] | (255 & t[31]) << 8
                };
                function B(t, e, r, n, o, i) {
                    var s = new T(i);
                    return s.update(r, n, o),
                    s.finish(t, e),
                    0
                }
                function I(t, e, r, n, o, i) {
                    var s = new Uint8Array(16);
                    return B(s, 0, r, n, o, i),
                    g(t, e, s, 0)
                }
                function O(t, e, r, n, o) {
                    var i;
                    if (r < 32)
                        return -1;
                    for (S(t, 0, e, 0, r, n, o),
                    B(t, 16, t, 32, r - 32, t),
                    i = 0; i < 16; i++)
                        t[i] = 0;
                    return 0
                }
                function U(t, e, r, n, o) {
                    var i, s = new Uint8Array(32);
                    if (r < 32)
                        return -1;
                    if (A(s, 0, 32, n, o),
                    0 !== I(e, 16, e, 32, r - 32, s))
                        return -1;
                    for (S(t, 0, e, 0, r, n, o),
                    i = 0; i < 32; i++)
                        t[i] = 0;
                    return 0
                }
                function M(t, e) {
                    var r;
                    for (r = 0; r < 16; r++)
                        t[r] = 0 | e[r]
                }
                function k(t) {
                    var e, r, n = 1;
                    for (e = 0; e < 16; e++)
                        r = t[e] + n + 65535,
                        n = Math.floor(r / 65536),
                        t[e] = r - 65536 * n;
                    t[0] += n - 1 + 37 * (n - 1)
                }
                function j(t, e, r) {
                    for (var n, o = ~(r - 1), i = 0; i < 16; i++)
                        n = o & (t[i] ^ e[i]),
                        t[i] ^= n,
                        e[i] ^= n
                }
                function N(t, r) {
                    var n, o, i, s = e(), a = e();
                    for (n = 0; n < 16; n++)
                        a[n] = r[n];
                    for (k(a),
                    k(a),
                    k(a),
                    o = 0; o < 2; o++) {
                        for (s[0] = a[0] - 65517,
                        n = 1; n < 15; n++)
                            s[n] = a[n] - 65535 - (s[n - 1] >> 16 & 1),
                            s[n - 1] &= 65535;
                        s[15] = a[15] - 32767 - (s[14] >> 16 & 1),
                        i = s[15] >> 16 & 1,
                        s[14] &= 65535,
                        j(a, s, 1 - i)
                    }
                    for (n = 0; n < 16; n++)
                        t[2 * n] = 255 & a[n],
                        t[2 * n + 1] = a[n] >> 8
                }
                function L(t, e) {
                    var r = new Uint8Array(32)
                      , n = new Uint8Array(32);
                    return N(r, t),
                    N(n, e),
                    w(r, 0, n, 0)
                }
                function _(t) {
                    var e = new Uint8Array(32);
                    return N(e, t),
                    1 & e[0]
                }
                function D(t, e) {
                    var r;
                    for (r = 0; r < 16; r++)
                        t[r] = e[2 * r] + (e[2 * r + 1] << 8);
                    t[15] &= 32767
                }
                function C(t, e, r) {
                    for (var n = 0; n < 16; n++)
                        t[n] = e[n] + r[n]
                }
                function R(t, e, r) {
                    for (var n = 0; n < 16; n++)
                        t[n] = e[n] - r[n]
                }
                function P(t, e, r) {
                    var n, o, i = 0, s = 0, a = 0, c = 0, u = 0, f = 0, h = 0, l = 0, d = 0, p = 0, y = 0, g = 0, w = 0, b = 0, m = 0, v = 0, E = 0, x = 0, A = 0, S = 0, T = 0, B = 0, I = 0, O = 0, U = 0, M = 0, k = 0, j = 0, N = 0, L = 0, _ = 0, D = r[0], C = r[1], R = r[2], P = r[3], z = r[4], $ = r[5], H = r[6], V = r[7], F = r[8], q = r[9], G = r[10], Y = r[11], W = r[12], K = r[13], Q = r[14], Z = r[15];
                    i += (n = e[0]) * D,
                    s += n * C,
                    a += n * R,
                    c += n * P,
                    u += n * z,
                    f += n * $,
                    h += n * H,
                    l += n * V,
                    d += n * F,
                    p += n * q,
                    y += n * G,
                    g += n * Y,
                    w += n * W,
                    b += n * K,
                    m += n * Q,
                    v += n * Z,
                    s += (n = e[1]) * D,
                    a += n * C,
                    c += n * R,
                    u += n * P,
                    f += n * z,
                    h += n * $,
                    l += n * H,
                    d += n * V,
                    p += n * F,
                    y += n * q,
                    g += n * G,
                    w += n * Y,
                    b += n * W,
                    m += n * K,
                    v += n * Q,
                    E += n * Z,
                    a += (n = e[2]) * D,
                    c += n * C,
                    u += n * R,
                    f += n * P,
                    h += n * z,
                    l += n * $,
                    d += n * H,
                    p += n * V,
                    y += n * F,
                    g += n * q,
                    w += n * G,
                    b += n * Y,
                    m += n * W,
                    v += n * K,
                    E += n * Q,
                    x += n * Z,
                    c += (n = e[3]) * D,
                    u += n * C,
                    f += n * R,
                    h += n * P,
                    l += n * z,
                    d += n * $,
                    p += n * H,
                    y += n * V,
                    g += n * F,
                    w += n * q,
                    b += n * G,
                    m += n * Y,
                    v += n * W,
                    E += n * K,
                    x += n * Q,
                    A += n * Z,
                    u += (n = e[4]) * D,
                    f += n * C,
                    h += n * R,
                    l += n * P,
                    d += n * z,
                    p += n * $,
                    y += n * H,
                    g += n * V,
                    w += n * F,
                    b += n * q,
                    m += n * G,
                    v += n * Y,
                    E += n * W,
                    x += n * K,
                    A += n * Q,
                    S += n * Z,
                    f += (n = e[5]) * D,
                    h += n * C,
                    l += n * R,
                    d += n * P,
                    p += n * z,
                    y += n * $,
                    g += n * H,
                    w += n * V,
                    b += n * F,
                    m += n * q,
                    v += n * G,
                    E += n * Y,
                    x += n * W,
                    A += n * K,
                    S += n * Q,
                    T += n * Z,
                    h += (n = e[6]) * D,
                    l += n * C,
                    d += n * R,
                    p += n * P,
                    y += n * z,
                    g += n * $,
                    w += n * H,
                    b += n * V,
                    m += n * F,
                    v += n * q,
                    E += n * G,
                    x += n * Y,
                    A += n * W,
                    S += n * K,
                    T += n * Q,
                    B += n * Z,
                    l += (n = e[7]) * D,
                    d += n * C,
                    p += n * R,
                    y += n * P,
                    g += n * z,
                    w += n * $,
                    b += n * H,
                    m += n * V,
                    v += n * F,
                    E += n * q,
                    x += n * G,
                    A += n * Y,
                    S += n * W,
                    T += n * K,
                    B += n * Q,
                    I += n * Z,
                    d += (n = e[8]) * D,
                    p += n * C,
                    y += n * R,
                    g += n * P,
                    w += n * z,
                    b += n * $,
                    m += n * H,
                    v += n * V,
                    E += n * F,
                    x += n * q,
                    A += n * G,
                    S += n * Y,
                    T += n * W,
                    B += n * K,
                    I += n * Q,
                    O += n * Z,
                    p += (n = e[9]) * D,
                    y += n * C,
                    g += n * R,
                    w += n * P,
                    b += n * z,
                    m += n * $,
                    v += n * H,
                    E += n * V,
                    x += n * F,
                    A += n * q,
                    S += n * G,
                    T += n * Y,
                    B += n * W,
                    I += n * K,
                    O += n * Q,
                    U += n * Z,
                    y += (n = e[10]) * D,
                    g += n * C,
                    w += n * R,
                    b += n * P,
                    m += n * z,
                    v += n * $,
                    E += n * H,
                    x += n * V,
                    A += n * F,
                    S += n * q,
                    T += n * G,
                    B += n * Y,
                    I += n * W,
                    O += n * K,
                    U += n * Q,
                    M += n * Z,
                    g += (n = e[11]) * D,
                    w += n * C,
                    b += n * R,
                    m += n * P,
                    v += n * z,
                    E += n * $,
                    x += n * H,
                    A += n * V,
                    S += n * F,
                    T += n * q,
                    B += n * G,
                    I += n * Y,
                    O += n * W,
                    U += n * K,
                    M += n * Q,
                    k += n * Z,
                    w += (n = e[12]) * D,
                    b += n * C,
                    m += n * R,
                    v += n * P,
                    E += n * z,
                    x += n * $,
                    A += n * H,
                    S += n * V,
                    T += n * F,
                    B += n * q,
                    I += n * G,
                    O += n * Y,
                    U += n * W,
                    M += n * K,
                    k += n * Q,
                    j += n * Z,
                    b += (n = e[13]) * D,
                    m += n * C,
                    v += n * R,
                    E += n * P,
                    x += n * z,
                    A += n * $,
                    S += n * H,
                    T += n * V,
                    B += n * F,
                    I += n * q,
                    O += n * G,
                    U += n * Y,
                    M += n * W,
                    k += n * K,
                    j += n * Q,
                    N += n * Z,
                    m += (n = e[14]) * D,
                    v += n * C,
                    E += n * R,
                    x += n * P,
                    A += n * z,
                    S += n * $,
                    T += n * H,
                    B += n * V,
                    I += n * F,
                    O += n * q,
                    U += n * G,
                    M += n * Y,
                    k += n * W,
                    j += n * K,
                    N += n * Q,
                    L += n * Z,
                    v += (n = e[15]) * D,
                    s += 38 * (x += n * R),
                    a += 38 * (A += n * P),
                    c += 38 * (S += n * z),
                    u += 38 * (T += n * $),
                    f += 38 * (B += n * H),
                    h += 38 * (I += n * V),
                    l += 38 * (O += n * F),
                    d += 38 * (U += n * q),
                    p += 38 * (M += n * G),
                    y += 38 * (k += n * Y),
                    g += 38 * (j += n * W),
                    w += 38 * (N += n * K),
                    b += 38 * (L += n * Q),
                    m += 38 * (_ += n * Z),
                    i = (n = (i += 38 * (E += n * C)) + (o = 1) + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    s = (n = s + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    a = (n = a + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    c = (n = c + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    u = (n = u + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    f = (n = f + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    h = (n = h + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    l = (n = l + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    d = (n = d + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    p = (n = p + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    y = (n = y + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    g = (n = g + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    w = (n = w + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    b = (n = b + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    m = (n = m + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    v = (n = v + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    i = (n = (i += o - 1 + 37 * (o - 1)) + (o = 1) + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    s = (n = s + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    a = (n = a + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    c = (n = c + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    u = (n = u + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    f = (n = f + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    h = (n = h + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    l = (n = l + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    d = (n = d + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    p = (n = p + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    y = (n = y + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    g = (n = g + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    w = (n = w + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    b = (n = b + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    m = (n = m + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    v = (n = v + o + 65535) - 65536 * (o = Math.floor(n / 65536)),
                    i += o - 1 + 37 * (o - 1),
                    t[0] = i,
                    t[1] = s,
                    t[2] = a,
                    t[3] = c,
                    t[4] = u,
                    t[5] = f,
                    t[6] = h,
                    t[7] = l,
                    t[8] = d,
                    t[9] = p,
                    t[10] = y,
                    t[11] = g,
                    t[12] = w,
                    t[13] = b,
                    t[14] = m,
                    t[15] = v
                }
                function z(t, e) {
                    P(t, e, e)
                }
                function $(t, r) {
                    var n, o = e();
                    for (n = 0; n < 16; n++)
                        o[n] = r[n];
                    for (n = 253; n >= 0; n--)
                        z(o, o),
                        2 !== n && 4 !== n && P(o, o, r);
                    for (n = 0; n < 16; n++)
                        t[n] = o[n]
                }
                function H(t, r) {
                    var n, o = e();
                    for (n = 0; n < 16; n++)
                        o[n] = r[n];
                    for (n = 250; n >= 0; n--)
                        z(o, o),
                        1 !== n && P(o, o, r);
                    for (n = 0; n < 16; n++)
                        t[n] = o[n]
                }
                function V(t, r, n) {
                    var o, i, s = new Uint8Array(32), a = new Float64Array(80), u = e(), f = e(), h = e(), l = e(), d = e(), p = e();
                    for (i = 0; i < 31; i++)
                        s[i] = r[i];
                    for (s[31] = 127 & r[31] | 64,
                    s[0] &= 248,
                    D(a, n),
                    i = 0; i < 16; i++)
                        f[i] = a[i],
                        l[i] = u[i] = h[i] = 0;
                    for (u[0] = l[0] = 1,
                    i = 254; i >= 0; --i)
                        j(u, f, o = s[i >>> 3] >>> (7 & i) & 1),
                        j(h, l, o),
                        C(d, u, h),
                        R(u, u, h),
                        C(h, f, l),
                        R(f, f, l),
                        z(l, d),
                        z(p, u),
                        P(u, h, u),
                        P(h, f, d),
                        C(d, u, h),
                        R(u, u, h),
                        z(f, u),
                        R(h, l, p),
                        P(u, h, c),
                        C(u, u, l),
                        P(h, h, u),
                        P(u, l, p),
                        P(l, f, a),
                        z(f, d),
                        j(u, f, o),
                        j(h, l, o);
                    for (i = 0; i < 16; i++)
                        a[i + 16] = u[i],
                        a[i + 32] = h[i],
                        a[i + 48] = f[i],
                        a[i + 64] = l[i];
                    var y = a.subarray(32)
                      , g = a.subarray(16);
                    return $(y, y),
                    P(g, g, y),
                    N(t, g),
                    0
                }
                function F(t, e) {
                    return V(t, e, i)
                }
                function q(t, e) {
                    return n(e, 32),
                    F(t, e)
                }
                function G(t, e, r) {
                    var n = new Uint8Array(32);
                    return V(n, r, e),
                    m(t, o, n, v)
                }
                T.prototype.blocks = function(t, e, r) {
                    for (var n, o, i, s, a, c, u, f, h, l, d, p, y, g, w, b, m, v, E, x = this.fin ? 0 : 2048, A = this.h[0], S = this.h[1], T = this.h[2], B = this.h[3], I = this.h[4], O = this.h[5], U = this.h[6], M = this.h[7], k = this.h[8], j = this.h[9], N = this.r[0], L = this.r[1], _ = this.r[2], D = this.r[3], C = this.r[4], R = this.r[5], P = this.r[6], z = this.r[7], $ = this.r[8], H = this.r[9]; r >= 16; )
                        l = h = 0,
                        l += (A += 8191 & (n = 255 & t[e + 0] | (255 & t[e + 1]) << 8)) * N,
                        l += (S += 8191 & (n >>> 13 | (o = 255 & t[e + 2] | (255 & t[e + 3]) << 8) << 3)) * (5 * H),
                        l += (T += 8191 & (o >>> 10 | (i = 255 & t[e + 4] | (255 & t[e + 5]) << 8) << 6)) * (5 * $),
                        l += (B += 8191 & (i >>> 7 | (s = 255 & t[e + 6] | (255 & t[e + 7]) << 8) << 9)) * (5 * z),
                        h = (l += (I += 8191 & (s >>> 4 | (a = 255 & t[e + 8] | (255 & t[e + 9]) << 8) << 12)) * (5 * P)) >>> 13,
                        l &= 8191,
                        l += (O += a >>> 1 & 8191) * (5 * R),
                        l += (U += 8191 & (a >>> 14 | (c = 255 & t[e + 10] | (255 & t[e + 11]) << 8) << 2)) * (5 * C),
                        l += (M += 8191 & (c >>> 11 | (u = 255 & t[e + 12] | (255 & t[e + 13]) << 8) << 5)) * (5 * D),
                        l += (k += 8191 & (u >>> 8 | (f = 255 & t[e + 14] | (255 & t[e + 15]) << 8) << 8)) * (5 * _),
                        d = h += (l += (j += f >>> 5 | x) * (5 * L)) >>> 13,
                        d += A * L,
                        d += S * N,
                        d += T * (5 * H),
                        d += B * (5 * $),
                        h = (d += I * (5 * z)) >>> 13,
                        d &= 8191,
                        d += O * (5 * P),
                        d += U * (5 * R),
                        d += M * (5 * C),
                        d += k * (5 * D),
                        h += (d += j * (5 * _)) >>> 13,
                        d &= 8191,
                        p = h,
                        p += A * _,
                        p += S * L,
                        p += T * N,
                        p += B * (5 * H),
                        h = (p += I * (5 * $)) >>> 13,
                        p &= 8191,
                        p += O * (5 * z),
                        p += U * (5 * P),
                        p += M * (5 * R),
                        p += k * (5 * C),
                        y = h += (p += j * (5 * D)) >>> 13,
                        y += A * D,
                        y += S * _,
                        y += T * L,
                        y += B * N,
                        h = (y += I * (5 * H)) >>> 13,
                        y &= 8191,
                        y += O * (5 * $),
                        y += U * (5 * z),
                        y += M * (5 * P),
                        y += k * (5 * R),
                        g = h += (y += j * (5 * C)) >>> 13,
                        g += A * C,
                        g += S * D,
                        g += T * _,
                        g += B * L,
                        h = (g += I * N) >>> 13,
                        g &= 8191,
                        g += O * (5 * H),
                        g += U * (5 * $),
                        g += M * (5 * z),
                        g += k * (5 * P),
                        w = h += (g += j * (5 * R)) >>> 13,
                        w += A * R,
                        w += S * C,
                        w += T * D,
                        w += B * _,
                        h = (w += I * L) >>> 13,
                        w &= 8191,
                        w += O * N,
                        w += U * (5 * H),
                        w += M * (5 * $),
                        w += k * (5 * z),
                        b = h += (w += j * (5 * P)) >>> 13,
                        b += A * P,
                        b += S * R,
                        b += T * C,
                        b += B * D,
                        h = (b += I * _) >>> 13,
                        b &= 8191,
                        b += O * L,
                        b += U * N,
                        b += M * (5 * H),
                        b += k * (5 * $),
                        m = h += (b += j * (5 * z)) >>> 13,
                        m += A * z,
                        m += S * P,
                        m += T * R,
                        m += B * C,
                        h = (m += I * D) >>> 13,
                        m &= 8191,
                        m += O * _,
                        m += U * L,
                        m += M * N,
                        m += k * (5 * H),
                        v = h += (m += j * (5 * $)) >>> 13,
                        v += A * $,
                        v += S * z,
                        v += T * P,
                        v += B * R,
                        h = (v += I * C) >>> 13,
                        v &= 8191,
                        v += O * D,
                        v += U * _,
                        v += M * L,
                        v += k * N,
                        E = h += (v += j * (5 * H)) >>> 13,
                        E += A * H,
                        E += S * $,
                        E += T * z,
                        E += B * P,
                        h = (E += I * R) >>> 13,
                        E &= 8191,
                        E += O * C,
                        E += U * D,
                        E += M * _,
                        E += k * L,
                        A = l = 8191 & (h = (h = ((h += (E += j * N) >>> 13) << 2) + h | 0) + (l &= 8191) | 0),
                        S = d += h >>>= 13,
                        T = p &= 8191,
                        B = y &= 8191,
                        I = g &= 8191,
                        O = w &= 8191,
                        U = b &= 8191,
                        M = m &= 8191,
                        k = v &= 8191,
                        j = E &= 8191,
                        e += 16,
                        r -= 16;
                    this.h[0] = A,
                    this.h[1] = S,
                    this.h[2] = T,
                    this.h[3] = B,
                    this.h[4] = I,
                    this.h[5] = O,
                    this.h[6] = U,
                    this.h[7] = M,
                    this.h[8] = k,
                    this.h[9] = j
                }
                ,
                T.prototype.finish = function(t, e) {
                    var r, n, o, i, s = new Uint16Array(10);
                    if (this.leftover) {
                        for (i = this.leftover,
                        this.buffer[i++] = 1; i < 16; i++)
                            this.buffer[i] = 0;
                        this.fin = 1,
                        this.blocks(this.buffer, 0, 16)
                    }
                    for (r = this.h[1] >>> 13,
                    this.h[1] &= 8191,
                    i = 2; i < 10; i++)
                        this.h[i] += r,
                        r = this.h[i] >>> 13,
                        this.h[i] &= 8191;
                    for (this.h[0] += 5 * r,
                    r = this.h[0] >>> 13,
                    this.h[0] &= 8191,
                    this.h[1] += r,
                    r = this.h[1] >>> 13,
                    this.h[1] &= 8191,
                    this.h[2] += r,
                    s[0] = this.h[0] + 5,
                    r = s[0] >>> 13,
                    s[0] &= 8191,
                    i = 1; i < 10; i++)
                        s[i] = this.h[i] + r,
                        r = s[i] >>> 13,
                        s[i] &= 8191;
                    for (s[9] -= 8192,
                    n = (1 ^ r) - 1,
                    i = 0; i < 10; i++)
                        s[i] &= n;
                    for (n = ~n,
                    i = 0; i < 10; i++)
                        this.h[i] = this.h[i] & n | s[i];
                    for (this.h[0] = 65535 & (this.h[0] | this.h[1] << 13),
                    this.h[1] = 65535 & (this.h[1] >>> 3 | this.h[2] << 10),
                    this.h[2] = 65535 & (this.h[2] >>> 6 | this.h[3] << 7),
                    this.h[3] = 65535 & (this.h[3] >>> 9 | this.h[4] << 4),
                    this.h[4] = 65535 & (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14),
                    this.h[5] = 65535 & (this.h[6] >>> 2 | this.h[7] << 11),
                    this.h[6] = 65535 & (this.h[7] >>> 5 | this.h[8] << 8),
                    this.h[7] = 65535 & (this.h[8] >>> 8 | this.h[9] << 5),
                    o = this.h[0] + this.pad[0],
                    this.h[0] = 65535 & o,
                    i = 1; i < 8; i++)
                        o = (this.h[i] + this.pad[i] | 0) + (o >>> 16) | 0,
                        this.h[i] = 65535 & o;
                    t[e + 0] = this.h[0] >>> 0 & 255,
                    t[e + 1] = this.h[0] >>> 8 & 255,
                    t[e + 2] = this.h[1] >>> 0 & 255,
                    t[e + 3] = this.h[1] >>> 8 & 255,
                    t[e + 4] = this.h[2] >>> 0 & 255,
                    t[e + 5] = this.h[2] >>> 8 & 255,
                    t[e + 6] = this.h[3] >>> 0 & 255,
                    t[e + 7] = this.h[3] >>> 8 & 255,
                    t[e + 8] = this.h[4] >>> 0 & 255,
                    t[e + 9] = this.h[4] >>> 8 & 255,
                    t[e + 10] = this.h[5] >>> 0 & 255,
                    t[e + 11] = this.h[5] >>> 8 & 255,
                    t[e + 12] = this.h[6] >>> 0 & 255,
                    t[e + 13] = this.h[6] >>> 8 & 255,
                    t[e + 14] = this.h[7] >>> 0 & 255,
                    t[e + 15] = this.h[7] >>> 8 & 255
                }
                ,
                T.prototype.update = function(t, e, r) {
                    var n, o;
                    if (this.leftover) {
                        for ((o = 16 - this.leftover) > r && (o = r),
                        n = 0; n < o; n++)
                            this.buffer[this.leftover + n] = t[e + n];
                        if (r -= o,
                        e += o,
                        this.leftover += o,
                        this.leftover < 16)
                            return;
                        this.blocks(this.buffer, 0, 16),
                        this.leftover = 0
                    }
                    if (r >= 16 && (o = r - r % 16,
                    this.blocks(t, e, o),
                    e += o,
                    r -= o),
                    r) {
                        for (n = 0; n < r; n++)
                            this.buffer[this.leftover + n] = t[e + n];
                        this.leftover += r
                    }
                }
                ;
                var Y = O
                  , W = U
                  , K = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
                function Q(t, e, r, n) {
                    for (var o, i, s, a, c, u, f, h, l, d, p, y, g, w, b, m, v, E, x, A, S, T, B, I, O, U, M = new Int32Array(16), k = new Int32Array(16), j = t[0], N = t[1], L = t[2], _ = t[3], D = t[4], C = t[5], R = t[6], P = t[7], z = e[0], $ = e[1], H = e[2], V = e[3], F = e[4], q = e[5], G = e[6], Y = e[7], W = 0; n >= 128; ) {
                        for (x = 0; x < 16; x++)
                            A = 8 * x + W,
                            M[x] = r[A + 0] << 24 | r[A + 1] << 16 | r[A + 2] << 8 | r[A + 3],
                            k[x] = r[A + 4] << 24 | r[A + 5] << 16 | r[A + 6] << 8 | r[A + 7];
                        for (x = 0; x < 80; x++)
                            if (o = j,
                            i = N,
                            s = L,
                            a = _,
                            c = D,
                            u = C,
                            f = R,
                            l = z,
                            d = $,
                            p = H,
                            y = V,
                            g = F,
                            w = q,
                            b = G,
                            B = 65535 & (T = Y),
                            I = T >>> 16,
                            O = 65535 & (S = P),
                            U = S >>> 16,
                            B += 65535 & (T = (F >>> 14 | D << 18) ^ (F >>> 18 | D << 14) ^ (D >>> 9 | F << 23)),
                            I += T >>> 16,
                            O += 65535 & (S = (D >>> 14 | F << 18) ^ (D >>> 18 | F << 14) ^ (F >>> 9 | D << 23)),
                            U += S >>> 16,
                            B += 65535 & (T = F & q ^ ~F & G),
                            I += T >>> 16,
                            O += 65535 & (S = D & C ^ ~D & R),
                            U += S >>> 16,
                            S = K[2 * x],
                            B += 65535 & (T = K[2 * x + 1]),
                            I += T >>> 16,
                            O += 65535 & S,
                            U += S >>> 16,
                            S = M[x % 16],
                            I += (T = k[x % 16]) >>> 16,
                            O += 65535 & S,
                            U += S >>> 16,
                            O += (I += (B += 65535 & T) >>> 16) >>> 16,
                            B = 65535 & (T = E = 65535 & B | I << 16),
                            I = T >>> 16,
                            O = 65535 & (S = v = 65535 & O | (U += O >>> 16) << 16),
                            U = S >>> 16,
                            B += 65535 & (T = (z >>> 28 | j << 4) ^ (j >>> 2 | z << 30) ^ (j >>> 7 | z << 25)),
                            I += T >>> 16,
                            O += 65535 & (S = (j >>> 28 | z << 4) ^ (z >>> 2 | j << 30) ^ (z >>> 7 | j << 25)),
                            U += S >>> 16,
                            I += (T = z & $ ^ z & H ^ $ & H) >>> 16,
                            O += 65535 & (S = j & N ^ j & L ^ N & L),
                            U += S >>> 16,
                            h = 65535 & (O += (I += (B += 65535 & T) >>> 16) >>> 16) | (U += O >>> 16) << 16,
                            m = 65535 & B | I << 16,
                            B = 65535 & (T = y),
                            I = T >>> 16,
                            O = 65535 & (S = a),
                            U = S >>> 16,
                            I += (T = E) >>> 16,
                            O += 65535 & (S = v),
                            U += S >>> 16,
                            N = o,
                            L = i,
                            _ = s,
                            D = a = 65535 & (O += (I += (B += 65535 & T) >>> 16) >>> 16) | (U += O >>> 16) << 16,
                            C = c,
                            R = u,
                            P = f,
                            j = h,
                            $ = l,
                            H = d,
                            V = p,
                            F = y = 65535 & B | I << 16,
                            q = g,
                            G = w,
                            Y = b,
                            z = m,
                            x % 16 == 15)
                                for (A = 0; A < 16; A++)
                                    S = M[A],
                                    B = 65535 & (T = k[A]),
                                    I = T >>> 16,
                                    O = 65535 & S,
                                    U = S >>> 16,
                                    S = M[(A + 9) % 16],
                                    B += 65535 & (T = k[(A + 9) % 16]),
                                    I += T >>> 16,
                                    O += 65535 & S,
                                    U += S >>> 16,
                                    v = M[(A + 1) % 16],
                                    B += 65535 & (T = ((E = k[(A + 1) % 16]) >>> 1 | v << 31) ^ (E >>> 8 | v << 24) ^ (E >>> 7 | v << 25)),
                                    I += T >>> 16,
                                    O += 65535 & (S = (v >>> 1 | E << 31) ^ (v >>> 8 | E << 24) ^ v >>> 7),
                                    U += S >>> 16,
                                    v = M[(A + 14) % 16],
                                    I += (T = ((E = k[(A + 14) % 16]) >>> 19 | v << 13) ^ (v >>> 29 | E << 3) ^ (E >>> 6 | v << 26)) >>> 16,
                                    O += 65535 & (S = (v >>> 19 | E << 13) ^ (E >>> 29 | v << 3) ^ v >>> 6),
                                    U += S >>> 16,
                                    U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                                    M[A] = 65535 & O | U << 16,
                                    k[A] = 65535 & B | I << 16;
                        B = 65535 & (T = z),
                        I = T >>> 16,
                        O = 65535 & (S = j),
                        U = S >>> 16,
                        S = t[0],
                        I += (T = e[0]) >>> 16,
                        O += 65535 & S,
                        U += S >>> 16,
                        U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                        t[0] = j = 65535 & O | U << 16,
                        e[0] = z = 65535 & B | I << 16,
                        B = 65535 & (T = $),
                        I = T >>> 16,
                        O = 65535 & (S = N),
                        U = S >>> 16,
                        S = t[1],
                        I += (T = e[1]) >>> 16,
                        O += 65535 & S,
                        U += S >>> 16,
                        U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                        t[1] = N = 65535 & O | U << 16,
                        e[1] = $ = 65535 & B | I << 16,
                        B = 65535 & (T = H),
                        I = T >>> 16,
                        O = 65535 & (S = L),
                        U = S >>> 16,
                        S = t[2],
                        I += (T = e[2]) >>> 16,
                        O += 65535 & S,
                        U += S >>> 16,
                        U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                        t[2] = L = 65535 & O | U << 16,
                        e[2] = H = 65535 & B | I << 16,
                        B = 65535 & (T = V),
                        I = T >>> 16,
                        O = 65535 & (S = _),
                        U = S >>> 16,
                        S = t[3],
                        I += (T = e[3]) >>> 16,
                        O += 65535 & S,
                        U += S >>> 16,
                        U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                        t[3] = _ = 65535 & O | U << 16,
                        e[3] = V = 65535 & B | I << 16,
                        B = 65535 & (T = F),
                        I = T >>> 16,
                        O = 65535 & (S = D),
                        U = S >>> 16,
                        S = t[4],
                        I += (T = e[4]) >>> 16,
                        O += 65535 & S,
                        U += S >>> 16,
                        U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                        t[4] = D = 65535 & O | U << 16,
                        e[4] = F = 65535 & B | I << 16,
                        B = 65535 & (T = q),
                        I = T >>> 16,
                        O = 65535 & (S = C),
                        U = S >>> 16,
                        S = t[5],
                        I += (T = e[5]) >>> 16,
                        O += 65535 & S,
                        U += S >>> 16,
                        U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                        t[5] = C = 65535 & O | U << 16,
                        e[5] = q = 65535 & B | I << 16,
                        B = 65535 & (T = G),
                        I = T >>> 16,
                        O = 65535 & (S = R),
                        U = S >>> 16,
                        S = t[6],
                        I += (T = e[6]) >>> 16,
                        O += 65535 & S,
                        U += S >>> 16,
                        U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                        t[6] = R = 65535 & O | U << 16,
                        e[6] = G = 65535 & B | I << 16,
                        B = 65535 & (T = Y),
                        I = T >>> 16,
                        O = 65535 & (S = P),
                        U = S >>> 16,
                        S = t[7],
                        I += (T = e[7]) >>> 16,
                        O += 65535 & S,
                        U += S >>> 16,
                        U += (O += (I += (B += 65535 & T) >>> 16) >>> 16) >>> 16,
                        t[7] = P = 65535 & O | U << 16,
                        e[7] = Y = 65535 & B | I << 16,
                        W += 128,
                        n -= 128
                    }
                    return n
                }
                function Z(t, e, r) {
                    var n, o = new Int32Array(8), i = new Int32Array(8), s = new Uint8Array(256), a = r;
                    for (o[0] = 1779033703,
                    o[1] = 3144134277,
                    o[2] = 1013904242,
                    o[3] = 2773480762,
                    o[4] = 1359893119,
                    o[5] = 2600822924,
                    o[6] = 528734635,
                    o[7] = 1541459225,
                    i[0] = 4089235720,
                    i[1] = 2227873595,
                    i[2] = 4271175723,
                    i[3] = 1595750129,
                    i[4] = 2917565137,
                    i[5] = 725511199,
                    i[6] = 4215389547,
                    i[7] = 327033209,
                    Q(o, i, e, r),
                    r %= 128,
                    n = 0; n < r; n++)
                        s[n] = e[a - r + n];
                    for (s[r] = 128,
                    s[(r = 256 - 128 * (r < 112 ? 1 : 0)) - 9] = 0,
                    p(s, r - 8, a / 536870912 | 0, a << 3),
                    Q(o, i, s, r),
                    n = 0; n < 8; n++)
                        p(t, 8 * n, o[n], i[n]);
                    return 0
                }
                function J(t, r) {
                    var n = e()
                      , o = e()
                      , i = e()
                      , s = e()
                      , a = e()
                      , c = e()
                      , u = e()
                      , h = e()
                      , l = e();
                    R(n, t[1], t[0]),
                    R(l, r[1], r[0]),
                    P(n, n, l),
                    C(o, t[0], t[1]),
                    C(l, r[0], r[1]),
                    P(o, o, l),
                    P(i, t[3], r[3]),
                    P(i, i, f),
                    P(s, t[2], r[2]),
                    C(s, s, s),
                    R(a, o, n),
                    R(c, s, i),
                    C(u, s, i),
                    C(h, o, n),
                    P(t[0], a, c),
                    P(t[1], h, u),
                    P(t[2], u, c),
                    P(t[3], a, h)
                }
                function X(t, e, r) {
                    var n;
                    for (n = 0; n < 4; n++)
                        j(t[n], e[n], r)
                }
                function tt(t, r) {
                    var n = e()
                      , o = e()
                      , i = e();
                    $(i, r[2]),
                    P(n, r[0], i),
                    P(o, r[1], i),
                    N(t, o),
                    t[31] ^= _(n) << 7
                }
                function et(t, e, r) {
                    var n, o;
                    for (M(t[0], s),
                    M(t[1], a),
                    M(t[2], a),
                    M(t[3], s),
                    o = 255; o >= 0; --o)
                        X(t, e, n = r[o / 8 | 0] >> (7 & o) & 1),
                        J(e, t),
                        J(t, t),
                        X(t, e, n)
                }
                function rt(t, r) {
                    var n = [e(), e(), e(), e()];
                    M(n[0], h),
                    M(n[1], l),
                    M(n[2], a),
                    P(n[3], h, l),
                    et(t, n, r)
                }
                function nt(t, r, o) {
                    var i, s = new Uint8Array(64), a = [e(), e(), e(), e()];
                    for (o || n(r, 32),
                    Z(s, r, 32),
                    s[0] &= 248,
                    s[31] &= 127,
                    s[31] |= 64,
                    rt(a, s),
                    tt(t, a),
                    i = 0; i < 32; i++)
                        r[i + 32] = t[i];
                    return 0
                }
                var ot = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
                function it(t, e) {
                    var r, n, o, i;
                    for (n = 63; n >= 32; --n) {
                        for (r = 0,
                        o = n - 32,
                        i = n - 12; o < i; ++o)
                            e[o] += r - 16 * e[n] * ot[o - (n - 32)],
                            r = Math.floor((e[o] + 128) / 256),
                            e[o] -= 256 * r;
                        e[o] += r,
                        e[n] = 0
                    }
                    for (r = 0,
                    o = 0; o < 32; o++)
                        e[o] += r - (e[31] >> 4) * ot[o],
                        r = e[o] >> 8,
                        e[o] &= 255;
                    for (o = 0; o < 32; o++)
                        e[o] -= r * ot[o];
                    for (n = 0; n < 32; n++)
                        e[n + 1] += e[n] >> 8,
                        t[n] = 255 & e[n]
                }
                function st(t) {
                    var e, r = new Float64Array(64);
                    for (e = 0; e < 64; e++)
                        r[e] = t[e];
                    for (e = 0; e < 64; e++)
                        t[e] = 0;
                    it(t, r)
                }
                function at(t, r, n, o) {
                    var i, s, a = new Uint8Array(64), c = new Uint8Array(64), u = new Uint8Array(64), f = new Float64Array(64), h = [e(), e(), e(), e()];
                    Z(a, o, 32),
                    a[0] &= 248,
                    a[31] &= 127,
                    a[31] |= 64;
                    var l = n + 64;
                    for (i = 0; i < n; i++)
                        t[64 + i] = r[i];
                    for (i = 0; i < 32; i++)
                        t[32 + i] = a[32 + i];
                    for (Z(u, t.subarray(32), n + 32),
                    st(u),
                    rt(h, u),
                    tt(t, h),
                    i = 32; i < 64; i++)
                        t[i] = o[i];
                    for (Z(c, t, n + 64),
                    st(c),
                    i = 0; i < 64; i++)
                        f[i] = 0;
                    for (i = 0; i < 32; i++)
                        f[i] = u[i];
                    for (i = 0; i < 32; i++)
                        for (s = 0; s < 32; s++)
                            f[i + s] += c[i] * a[s];
                    return it(t.subarray(32), f),
                    l
                }
                function ct(t, r, n, o) {
                    var i, c = new Uint8Array(32), f = new Uint8Array(64), h = [e(), e(), e(), e()], l = [e(), e(), e(), e()];
                    if (n < 64)
                        return -1;
                    if (function(t, r) {
                        var n = e()
                          , o = e()
                          , i = e()
                          , c = e()
                          , f = e()
                          , h = e()
                          , l = e();
                        return M(t[2], a),
                        D(t[1], r),
                        z(i, t[1]),
                        P(c, i, u),
                        R(i, i, t[2]),
                        C(c, t[2], c),
                        z(f, c),
                        z(h, f),
                        P(l, h, f),
                        P(n, l, i),
                        P(n, n, c),
                        H(n, n),
                        P(n, n, i),
                        P(n, n, c),
                        P(n, n, c),
                        P(t[0], n, c),
                        z(o, t[0]),
                        P(o, o, c),
                        L(o, i) && P(t[0], t[0], d),
                        z(o, t[0]),
                        P(o, o, c),
                        L(o, i) ? -1 : (_(t[0]) === r[31] >> 7 && R(t[0], s, t[0]),
                        P(t[3], t[0], t[1]),
                        0)
                    }(l, o))
                        return -1;
                    for (i = 0; i < n; i++)
                        t[i] = r[i];
                    for (i = 0; i < 32; i++)
                        t[i + 32] = o[i];
                    if (Z(f, t, n),
                    st(f),
                    et(h, l, f),
                    rt(l, r.subarray(32)),
                    J(h, l),
                    tt(c, h),
                    n -= 64,
                    w(r, 0, c, 0)) {
                        for (i = 0; i < n; i++)
                            t[i] = 0;
                        return -1
                    }
                    for (i = 0; i < n; i++)
                        t[i] = r[i + 64];
                    return n
                }
                var ut = 32
                  , ft = 24
                  , ht = ft
                  , lt = 64
                  , dt = 32
                  , pt = 64;
                function yt(t, e) {
                    if (t.length !== ut)
                        throw new Error("bad key size");
                    if (e.length !== ft)
                        throw new Error("bad nonce size")
                }
                function gt() {
                    for (var t = 0; t < arguments.length; t++)
                        if (!(arguments[t]instanceof Uint8Array))
                            throw new TypeError("unexpected type, use Uint8Array")
                }
                function wt(t) {
                    for (var e = 0; e < t.length; e++)
                        t[e] = 0
                }
                t.lowlevel = {
                    crypto_core_hsalsa20: m,
                    crypto_stream_xor: S,
                    crypto_stream: A,
                    crypto_stream_salsa20_xor: E,
                    crypto_stream_salsa20: x,
                    crypto_onetimeauth: B,
                    crypto_onetimeauth_verify: I,
                    crypto_verify_16: g,
                    crypto_verify_32: w,
                    crypto_secretbox: O,
                    crypto_secretbox_open: U,
                    crypto_scalarmult: V,
                    crypto_scalarmult_base: F,
                    crypto_box_beforenm: G,
                    crypto_box_afternm: Y,
                    crypto_box: function(t, e, r, n, o, i) {
                        var s = new Uint8Array(32);
                        return G(s, o, i),
                        Y(t, e, r, n, s)
                    },
                    crypto_box_open: function(t, e, r, n, o, i) {
                        var s = new Uint8Array(32);
                        return G(s, o, i),
                        W(t, e, r, n, s)
                    },
                    crypto_box_keypair: q,
                    crypto_hash: Z,
                    crypto_sign: at,
                    crypto_sign_keypair: nt,
                    crypto_sign_open: ct,
                    crypto_secretbox_KEYBYTES: ut,
                    crypto_secretbox_NONCEBYTES: ft,
                    crypto_secretbox_ZEROBYTES: 32,
                    crypto_secretbox_BOXZEROBYTES: 16,
                    crypto_scalarmult_BYTES: 32,
                    crypto_scalarmult_SCALARBYTES: 32,
                    crypto_box_PUBLICKEYBYTES: 32,
                    crypto_box_SECRETKEYBYTES: 32,
                    crypto_box_BEFORENMBYTES: 32,
                    crypto_box_NONCEBYTES: ht,
                    crypto_box_ZEROBYTES: 32,
                    crypto_box_BOXZEROBYTES: 16,
                    crypto_sign_BYTES: lt,
                    crypto_sign_PUBLICKEYBYTES: dt,
                    crypto_sign_SECRETKEYBYTES: pt,
                    crypto_sign_SEEDBYTES: 32,
                    crypto_hash_BYTES: 64,
                    gf: e,
                    D: u,
                    L: ot,
                    pack25519: N,
                    unpack25519: D,
                    M: P,
                    A: C,
                    S: z,
                    Z: R,
                    pow2523: H,
                    add: J,
                    set25519: M,
                    modL: it,
                    scalarmult: et,
                    scalarbase: rt
                },
                t.randomBytes = function(t) {
                    var e = new Uint8Array(t);
                    return n(e, t),
                    e
                }
                ,
                t.secretbox = function(t, e, r) {
                    gt(t, e, r),
                    yt(r, e);
                    for (var n = new Uint8Array(32 + t.length), o = new Uint8Array(n.length), i = 0; i < t.length; i++)
                        n[i + 32] = t[i];
                    return O(o, n, n.length, e, r),
                    o.subarray(16)
                }
                ,
                t.secretbox.open = function(t, e, r) {
                    gt(t, e, r),
                    yt(r, e);
                    for (var n = new Uint8Array(16 + t.length), o = new Uint8Array(n.length), i = 0; i < t.length; i++)
                        n[i + 16] = t[i];
                    return n.length < 32 || 0 !== U(o, n, n.length, e, r) ? null : o.subarray(32)
                }
                ,
                t.secretbox.keyLength = ut,
                t.secretbox.nonceLength = ft,
                t.secretbox.overheadLength = 16,
                t.scalarMult = function(t, e) {
                    if (gt(t, e),
                    32 !== t.length)
                        throw new Error("bad n size");
                    if (32 !== e.length)
                        throw new Error("bad p size");
                    var r = new Uint8Array(32);
                    return V(r, t, e),
                    r
                }
                ,
                t.scalarMult.base = function(t) {
                    if (gt(t),
                    32 !== t.length)
                        throw new Error("bad n size");
                    var e = new Uint8Array(32);
                    return F(e, t),
                    e
                }
                ,
                t.scalarMult.scalarLength = 32,
                t.scalarMult.groupElementLength = 32,
                t.box = function(e, r, n, o) {
                    var i = t.box.before(n, o);
                    return t.secretbox(e, r, i)
                }
                ,
                t.box.before = function(t, e) {
                    gt(t, e),
                    function(t, e) {
                        if (32 !== t.length)
                            throw new Error("bad public key size");
                        if (32 !== e.length)
                            throw new Error("bad secret key size")
                    }(t, e);
                    var r = new Uint8Array(32);
                    return G(r, t, e),
                    r
                }
                ,
                t.box.after = t.secretbox,
                t.box.open = function(e, r, n, o) {
                    var i = t.box.before(n, o);
                    return t.secretbox.open(e, r, i)
                }
                ,
                t.box.open.after = t.secretbox.open,
                t.box.keyPair = function() {
                    var t = new Uint8Array(32)
                      , e = new Uint8Array(32);
                    return q(t, e),
                    {
                        publicKey: t,
                        secretKey: e
                    }
                }
                ,
                t.box.keyPair.fromSecretKey = function(t) {
                    if (gt(t),
                    32 !== t.length)
                        throw new Error("bad secret key size");
                    var e = new Uint8Array(32);
                    return F(e, t),
                    {
                        publicKey: e,
                        secretKey: new Uint8Array(t)
                    }
                }
                ,
                t.box.publicKeyLength = 32,
                t.box.secretKeyLength = 32,
                t.box.sharedKeyLength = 32,
                t.box.nonceLength = ht,
                t.box.overheadLength = t.secretbox.overheadLength,
                t.sign = function(t, e) {
                    if (gt(t, e),
                    e.length !== pt)
                        throw new Error("bad secret key size");
                    var r = new Uint8Array(lt + t.length);
                    return at(r, t, t.length, e),
                    r
                }
                ,
                t.sign.open = function(t, e) {
                    if (gt(t, e),
                    e.length !== dt)
                        throw new Error("bad public key size");
                    var r = new Uint8Array(t.length)
                      , n = ct(r, t, t.length, e);
                    if (n < 0)
                        return null;
                    for (var o = new Uint8Array(n), i = 0; i < o.length; i++)
                        o[i] = r[i];
                    return o
                }
                ,
                t.sign.detached = function(e, r) {
                    for (var n = t.sign(e, r), o = new Uint8Array(lt), i = 0; i < o.length; i++)
                        o[i] = n[i];
                    return o
                }
                ,
                t.sign.detached.verify = function(t, e, r) {
                    if (gt(t, e, r),
                    e.length !== lt)
                        throw new Error("bad signature size");
                    if (r.length !== dt)
                        throw new Error("bad public key size");
                    var n, o = new Uint8Array(lt + t.length), i = new Uint8Array(lt + t.length);
                    for (n = 0; n < lt; n++)
                        o[n] = e[n];
                    for (n = 0; n < t.length; n++)
                        o[n + lt] = t[n];
                    return ct(i, o, o.length, r) >= 0
                }
                ,
                t.sign.keyPair = function() {
                    var t = new Uint8Array(dt)
                      , e = new Uint8Array(pt);
                    return nt(t, e),
                    {
                        publicKey: t,
                        secretKey: e
                    }
                }
                ,
                t.sign.keyPair.fromSecretKey = function(t) {
                    if (gt(t),
                    t.length !== pt)
                        throw new Error("bad secret key size");
                    for (var e = new Uint8Array(dt), r = 0; r < e.length; r++)
                        e[r] = t[32 + r];
                    return {
                        publicKey: e,
                        secretKey: new Uint8Array(t)
                    }
                }
                ,
                t.sign.keyPair.fromSeed = function(t) {
                    if (gt(t),
                    32 !== t.length)
                        throw new Error("bad seed size");
                    for (var e = new Uint8Array(dt), r = new Uint8Array(pt), n = 0; n < 32; n++)
                        r[n] = t[n];
                    return nt(e, r, !0),
                    {
                        publicKey: e,
                        secretKey: r
                    }
                }
                ,
                t.sign.publicKeyLength = dt,
                t.sign.secretKeyLength = pt,
                t.sign.seedLength = 32,
                t.sign.signatureLength = lt,
                t.hash = function(t) {
                    gt(t);
                    var e = new Uint8Array(64);
                    return Z(e, t, t.length),
                    e
                }
                ,
                t.hash.hashLength = 64,
                t.verify = function(t, e) {
                    return gt(t, e),
                    0 !== t.length && 0 !== e.length && t.length === e.length && 0 === y(t, 0, e, 0, t.length)
                }
                ,
                t.setPRNG = function(t) {
                    n = t
                }
                ,
                function() {
                    var e = "undefined" != typeof self ? self.crypto || self.msCrypto : null;
                    e && e.getRandomValues ? t.setPRNG((function(t, r) {
                        var n, o = new Uint8Array(r);
                        for (n = 0; n < r; n += 65536)
                            e.getRandomValues(o.subarray(n, n + Math.min(r - n, 65536)));
                        for (n = 0; n < r; n++)
                            t[n] = o[n];
                        wt(o)
                    }
                    )) : (e = r(9365)) && e.randomBytes && t.setPRNG((function(t, r) {
                        var n, o = e.randomBytes(r);
                        for (n = 0; n < r; n++)
                            t[n] = o[n];
                        wt(o)
                    }
                    ))
                }()
            }(t.exports ? t.exports : self.nacl = self.nacl || {})
        }
        ,
        454: (t,e,r)=>{
            "use strict";
            var n;
            r.d(e, {
                v4: ()=>f
            });
            var o = new Uint8Array(16);
            function i() {
                if (!n && !(n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto)))
                    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                return n(o)
            }
            const s = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
            for (var a = [], c = 0; c < 256; ++c)
                a.push((c + 256).toString(16).substr(1));
            const u = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                  , r = (a[t[e + 0]] + a[t[e + 1]] + a[t[e + 2]] + a[t[e + 3]] + "-" + a[t[e + 4]] + a[t[e + 5]] + "-" + a[t[e + 6]] + a[t[e + 7]] + "-" + a[t[e + 8]] + a[t[e + 9]] + "-" + a[t[e + 10]] + a[t[e + 11]] + a[t[e + 12]] + a[t[e + 13]] + a[t[e + 14]] + a[t[e + 15]]).toLowerCase();
                if (!function(t) {
                    return "string" == typeof t && s.test(t)
                }(r))
                    throw TypeError("Stringified UUID is invalid");
                return r
            }
              , f = function(t, e, r) {
                var n = (t = t || {}).random || (t.rng || i)();
                if (n[6] = 15 & n[6] | 64,
                n[8] = 63 & n[8] | 128,
                e) {
                    r = r || 0;
                    for (var o = 0; o < 16; ++o)
                        e[r + o] = n[o];
                    return e
                }
                return u(n)
            }
        }
        ,
        9365: ()=>{}
        ,
        4220: t=>{
            t.exports = function(t) {
                if (void 0 === t)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        7790: t=>{
            function e(t, e, r, n, o, i, s) {
                try {
                    var a = t[i](s)
                      , c = a.value
                } catch (t) {
                    return void r(t)
                }
                a.done ? e(c) : Promise.resolve(c).then(n, o)
            }
            t.exports = function(t) {
                return function() {
                    var r = this
                      , n = arguments;
                    return new Promise((function(o, i) {
                        var s = t.apply(r, n);
                        function a(t) {
                            e(s, o, i, a, c, "next", t)
                        }
                        function c(t) {
                            e(s, o, i, a, c, "throw", t)
                        }
                        a(void 0)
                    }
                    ))
                }
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        2078: t=>{
            t.exports = function(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        2357: (t,e,r)=>{
            var n = r(1926);
            function o(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var o = e[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(t, n(o.key), o)
                }
            }
            t.exports = function(t, e, r) {
                return e && o(t.prototype, e),
                r && o(t, r),
                Object.defineProperty(t, "prototype", {
                    writable: !1
                }),
                t
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        2982: t=>{
            function e(r) {
                return t.exports = e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }
                ,
                t.exports.__esModule = !0,
                t.exports.default = t.exports,
                e(r)
            }
            t.exports = e,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        3649: (t,e,r)=>{
            var n = r(1337);
            t.exports = function(t, e) {
                if ("function" != typeof e && null !== e)
                    throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }),
                Object.defineProperty(t, "prototype", {
                    writable: !1
                }),
                e && n(t, e)
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        8001: t=>{
            t.exports = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        4158: (t,e,r)=>{
            var n = r(4020).default
              , o = r(4220);
            t.exports = function(t, e) {
                if (e && ("object" === n(e) || "function" == typeof e))
                    return e;
                if (void 0 !== e)
                    throw new TypeError("Derived constructors may only return object or undefined");
                return o(t)
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        8501: (t,e,r)=>{
            var n = r(4020).default;
            function o() {
                "use strict";
                t.exports = o = function() {
                    return e
                }
                ,
                t.exports.__esModule = !0,
                t.exports.default = t.exports;
                var e = {}
                  , r = Object.prototype
                  , i = r.hasOwnProperty
                  , s = Object.defineProperty || function(t, e, r) {
                    t[e] = r.value
                }
                  , a = "function" == typeof Symbol ? Symbol : {}
                  , c = a.iterator || "@@iterator"
                  , u = a.asyncIterator || "@@asyncIterator"
                  , f = a.toStringTag || "@@toStringTag";
                function h(t, e, r) {
                    return Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }),
                    t[e]
                }
                try {
                    h({}, "")
                } catch (t) {
                    h = function(t, e, r) {
                        return t[e] = r
                    }
                }
                function l(t, e, r, n) {
                    var o = e && e.prototype instanceof y ? e : y
                      , i = Object.create(o.prototype)
                      , a = new O(n || []);
                    return s(i, "_invoke", {
                        value: S(t, r, a)
                    }),
                    i
                }
                function d(t, e, r) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, r)
                        }
                    } catch (t) {
                        return {
                            type: "throw",
                            arg: t
                        }
                    }
                }
                e.wrap = l;
                var p = {};
                function y() {}
                function g() {}
                function w() {}
                var b = {};
                h(b, c, (function() {
                    return this
                }
                ));
                var m = Object.getPrototypeOf
                  , v = m && m(m(U([])));
                v && v !== r && i.call(v, c) && (b = v);
                var E = w.prototype = y.prototype = Object.create(b);
                function x(t) {
                    ["next", "throw", "return"].forEach((function(e) {
                        h(t, e, (function(t) {
                            return this._invoke(e, t)
                        }
                        ))
                    }
                    ))
                }
                function A(t, e) {
                    function r(o, s, a, c) {
                        var u = d(t[o], t, s);
                        if ("throw" !== u.type) {
                            var f = u.arg
                              , h = f.value;
                            return h && "object" == n(h) && i.call(h, "__await") ? e.resolve(h.__await).then((function(t) {
                                r("next", t, a, c)
                            }
                            ), (function(t) {
                                r("throw", t, a, c)
                            }
                            )) : e.resolve(h).then((function(t) {
                                f.value = t,
                                a(f)
                            }
                            ), (function(t) {
                                return r("throw", t, a, c)
                            }
                            ))
                        }
                        c(u.arg)
                    }
                    var o;
                    s(this, "_invoke", {
                        value: function(t, n) {
                            function i() {
                                return new e((function(e, o) {
                                    r(t, n, e, o)
                                }
                                ))
                            }
                            return o = o ? o.then(i, i) : i()
                        }
                    })
                }
                function S(t, e, r) {
                    var n = "suspendedStart";
                    return function(o, i) {
                        if ("executing" === n)
                            throw new Error("Generator is already running");
                        if ("completed" === n) {
                            if ("throw" === o)
                                throw i;
                            return {
                                value: void 0,
                                done: !0
                            }
                        }
                        for (r.method = o,
                        r.arg = i; ; ) {
                            var s = r.delegate;
                            if (s) {
                                var a = T(s, r);
                                if (a) {
                                    if (a === p)
                                        continue;
                                    return a
                                }
                            }
                            if ("next" === r.method)
                                r.sent = r._sent = r.arg;
                            else if ("throw" === r.method) {
                                if ("suspendedStart" === n)
                                    throw n = "completed",
                                    r.arg;
                                r.dispatchException(r.arg)
                            } else
                                "return" === r.method && r.abrupt("return", r.arg);
                            n = "executing";
                            var c = d(t, e, r);
                            if ("normal" === c.type) {
                                if (n = r.done ? "completed" : "suspendedYield",
                                c.arg === p)
                                    continue;
                                return {
                                    value: c.arg,
                                    done: r.done
                                }
                            }
                            "throw" === c.type && (n = "completed",
                            r.method = "throw",
                            r.arg = c.arg)
                        }
                    }
                }
                function T(t, e) {
                    var r = e.method
                      , n = t.iterator[r];
                    if (void 0 === n)
                        return e.delegate = null,
                        "throw" === r && t.iterator.return && (e.method = "return",
                        e.arg = void 0,
                        T(t, e),
                        "throw" === e.method) || "return" !== r && (e.method = "throw",
                        e.arg = new TypeError("The iterator does not provide a '" + r + "' method")),
                        p;
                    var o = d(n, t.iterator, e.arg);
                    if ("throw" === o.type)
                        return e.method = "throw",
                        e.arg = o.arg,
                        e.delegate = null,
                        p;
                    var i = o.arg;
                    return i ? i.done ? (e[t.resultName] = i.value,
                    e.next = t.nextLoc,
                    "return" !== e.method && (e.method = "next",
                    e.arg = void 0),
                    e.delegate = null,
                    p) : i : (e.method = "throw",
                    e.arg = new TypeError("iterator result is not an object"),
                    e.delegate = null,
                    p)
                }
                function B(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]),
                    2 in t && (e.finallyLoc = t[2],
                    e.afterLoc = t[3]),
                    this.tryEntries.push(e)
                }
                function I(t) {
                    var e = t.completion || {};
                    e.type = "normal",
                    delete e.arg,
                    t.completion = e
                }
                function O(t) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }],
                    t.forEach(B, this),
                    this.reset(!0)
                }
                function U(t) {
                    if (t) {
                        var e = t[c];
                        if (e)
                            return e.call(t);
                        if ("function" == typeof t.next)
                            return t;
                        if (!isNaN(t.length)) {
                            var r = -1
                              , n = function e() {
                                for (; ++r < t.length; )
                                    if (i.call(t, r))
                                        return e.value = t[r],
                                        e.done = !1,
                                        e;
                                return e.value = void 0,
                                e.done = !0,
                                e
                            };
                            return n.next = n
                        }
                    }
                    return {
                        next: M
                    }
                }
                function M() {
                    return {
                        value: void 0,
                        done: !0
                    }
                }
                return g.prototype = w,
                s(E, "constructor", {
                    value: w,
                    configurable: !0
                }),
                s(w, "constructor", {
                    value: g,
                    configurable: !0
                }),
                g.displayName = h(w, f, "GeneratorFunction"),
                e.isGeneratorFunction = function(t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === g || "GeneratorFunction" === (e.displayName || e.name))
                }
                ,
                e.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, w) : (t.__proto__ = w,
                    h(t, f, "GeneratorFunction")),
                    t.prototype = Object.create(E),
                    t
                }
                ,
                e.awrap = function(t) {
                    return {
                        __await: t
                    }
                }
                ,
                x(A.prototype),
                h(A.prototype, u, (function() {
                    return this
                }
                )),
                e.AsyncIterator = A,
                e.async = function(t, r, n, o, i) {
                    void 0 === i && (i = Promise);
                    var s = new A(l(t, r, n, o),i);
                    return e.isGeneratorFunction(r) ? s : s.next().then((function(t) {
                        return t.done ? t.value : s.next()
                    }
                    ))
                }
                ,
                x(E),
                h(E, f, "Generator"),
                h(E, c, (function() {
                    return this
                }
                )),
                h(E, "toString", (function() {
                    return "[object Generator]"
                }
                )),
                e.keys = function(t) {
                    var e = Object(t)
                      , r = [];
                    for (var n in e)
                        r.push(n);
                    return r.reverse(),
                    function t() {
                        for (; r.length; ) {
                            var n = r.pop();
                            if (n in e)
                                return t.value = n,
                                t.done = !1,
                                t
                        }
                        return t.done = !0,
                        t
                    }
                }
                ,
                e.values = U,
                O.prototype = {
                    constructor: O,
                    reset: function(t) {
                        if (this.prev = 0,
                        this.next = 0,
                        this.sent = this._sent = void 0,
                        this.done = !1,
                        this.delegate = null,
                        this.method = "next",
                        this.arg = void 0,
                        this.tryEntries.forEach(I),
                        !t)
                            for (var e in this)
                                "t" === e.charAt(0) && i.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                    },
                    stop: function() {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type)
                            throw t.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done)
                            throw t;
                        var e = this;
                        function r(r, n) {
                            return s.type = "throw",
                            s.arg = t,
                            e.next = r,
                            n && (e.method = "next",
                            e.arg = void 0),
                            !!n
                        }
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var o = this.tryEntries[n]
                              , s = o.completion;
                            if ("root" === o.tryLoc)
                                return r("end");
                            if (o.tryLoc <= this.prev) {
                                var a = i.call(o, "catchLoc")
                                  , c = i.call(o, "finallyLoc");
                                if (a && c) {
                                    if (this.prev < o.catchLoc)
                                        return r(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc)
                                        return r(o.finallyLoc)
                                } else if (a) {
                                    if (this.prev < o.catchLoc)
                                        return r(o.catchLoc, !0)
                                } else {
                                    if (!c)
                                        throw new Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc)
                                        return r(o.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var n = this.tryEntries[r];
                            if (n.tryLoc <= this.prev && i.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                var o = n;
                                break
                            }
                        }
                        o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                        var s = o ? o.completion : {};
                        return s.type = t,
                        s.arg = e,
                        o ? (this.method = "next",
                        this.next = o.finallyLoc,
                        p) : this.complete(s)
                    },
                    complete: function(t, e) {
                        if ("throw" === t.type)
                            throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg,
                        this.method = "return",
                        this.next = "end") : "normal" === t.type && e && (this.next = e),
                        p
                    },
                    finish: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var r = this.tryEntries[e];
                            if (r.finallyLoc === t)
                                return this.complete(r.completion, r.afterLoc),
                                I(r),
                                p
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var r = this.tryEntries[e];
                            if (r.tryLoc === t) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    I(r)
                                }
                                return o
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                    delegateYield: function(t, e, r) {
                        return this.delegate = {
                            iterator: U(t),
                            resultName: e,
                            nextLoc: r
                        },
                        "next" === this.method && (this.arg = void 0),
                        p
                    }
                },
                e
            }
            t.exports = o,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        1337: t=>{
            function e(r, n) {
                return t.exports = e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e,
                    t
                }
                ,
                t.exports.__esModule = !0,
                t.exports.default = t.exports,
                e(r, n)
            }
            t.exports = e,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        6217: (t,e,r)=>{
            var n = r(4020).default;
            t.exports = function(t, e) {
                if ("object" !== n(t) || null === t)
                    return t;
                var r = t[Symbol.toPrimitive];
                if (void 0 !== r) {
                    var o = r.call(t, e || "default");
                    if ("object" !== n(o))
                        return o;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return ("string" === e ? String : Number)(t)
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        1926: (t,e,r)=>{
            var n = r(4020).default
              , o = r(6217);
            t.exports = function(t) {
                var e = o(t, "string");
                return "symbol" === n(e) ? e : String(e)
            }
            ,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        4020: t=>{
            function e(r) {
                return t.exports = e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                ,
                t.exports.__esModule = !0,
                t.exports.default = t.exports,
                e(r)
            }
            t.exports = e,
            t.exports.__esModule = !0,
            t.exports.default = t.exports
        }
        ,
        366: (t,e,r)=>{
            var n = r(8501)();
            t.exports = n;
            try {
                regeneratorRuntime = n
            } catch (t) {
                "object" == typeof globalThis ? globalThis.regeneratorRuntime = n : Function("r", "regeneratorRuntime = r")(n)
            }
        }
    }
      , e = {};
    function r(n) {
        var o = e[n];
        if (void 0 !== o)
            return o.exports;
        var i = e[n] = {
            exports: {}
        };
        return t[n](i, i.exports, r),
        i.exports
    }
    r.d = (t,e)=>{
        for (var n in e)
            r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
                enumerable: !0,
                get: e[n]
            })
    }
    ,
    r.o = (t,e)=>Object.prototype.hasOwnProperty.call(t, e),
    r.r = t=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    (()=>{
        "use strict";
        var t = {};
        r.r(t),
        r.d(t, {
            dQ: ()=>Zt,
            ci: ()=>$t,
            bytesToNumberBE: ()=>Ft,
            ty: ()=>qt,
            eV: ()=>Kt,
            n$: ()=>te,
            ql: ()=>Wt,
            hexToBytes: ()=>Vt,
            tL: ()=>Gt,
            S5: ()=>Yt,
            iY: ()=>Qt,
            FF: ()=>re
        });
        var e = {};
        r.r(e),
        r.d(e, {
            dQ: ()=>jr,
            ci: ()=>xr,
            bytesToNumberBE: ()=>Tr,
            ty: ()=>Br,
            eV: ()=>Mr,
            n$: ()=>_r,
            ql: ()=>Ur,
            hexToBytes: ()=>Sr,
            tL: ()=>Ir,
            S5: ()=>Or,
            iY: ()=>kr,
            FF: ()=>Cr
        });
        var n;
        class o extends Event {
            constructor(t) {
                super("wallet-standard:register-wallet", {
                    bubbles: !1,
                    cancelable: !1,
                    composed: !1
                }),
                n.set(this, void 0),
                function(t, e, r, n, o) {
                    if ("m" === n)
                        throw new TypeError("Private method is not writable");
                    if ("a" === n && !o)
                        throw new TypeError("Private accessor was defined without a setter");
                    if ("function" == typeof e ? t !== e || !o : !e.has(t))
                        throw new TypeError("Cannot write private member to an object whose class did not declare it");
                    "a" === n ? o.call(t, r) : o ? o.value = r : e.set(t, r)
                }(this, n, t, "f")
            }
            get detail() {
                return function(t, e, r, n) {
                    if ("a" === r && !n)
                        throw new TypeError("Private accessor was defined without a getter");
                    if ("function" == typeof e ? t !== e || !n : !e.has(t))
                        throw new TypeError("Cannot read private member from an object whose class did not declare it");
                    return "m" === r ? n : "a" === r ? n.call(t) : n ? n.value : e.get(t)
                }(this, n, "f")
            }
            get type() {
                return "wallet-standard:register-wallet"
            }
            preventDefault() {
                throw new Error("preventDefault cannot be called")
            }
            stopImmediatePropagation() {
                throw new Error("stopImmediatePropagation cannot be called")
            }
            stopPropagation() {
                throw new Error("stopPropagation cannot be called")
            }
        }
        n = new WeakMap;
        var i, s, a, c, u, f, h = function(t, e, r, n, o) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !o)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof e ? t !== e || !o : !e.has(t))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? o.call(t, r) : o ? o.value = r : e.set(t, r),
            r
        }, l = function(t, e, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof e ? t !== e || !n : !e.has(t))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(t) : n ? n.value : e.get(t)
        };
        class d {
            constructor(t) {
                i.set(this, void 0),
                s.set(this, void 0),
                a.set(this, void 0),
                c.set(this, void 0),
                u.set(this, void 0),
                f.set(this, void 0),
                new.target === d && Object.freeze(this),
                h(this, i, t.address, "f"),
                h(this, s, t.publicKey.slice(), "f"),
                h(this, a, t.chains.slice(), "f"),
                h(this, c, t.features.slice(), "f"),
                h(this, u, t.label, "f"),
                h(this, f, t.icon, "f")
            }
            get address() {
                return l(this, i, "f")
            }
            get publicKey() {
                return l(this, s, "f").slice()
            }
            get chains() {
                return l(this, a, "f").slice()
            }
            get features() {
                return l(this, c, "f").slice()
            }
            get label() {
                return l(this, u, "f")
            }
            get icon() {
                return l(this, f, "f")
            }
        }
        i = new WeakMap,
        s = new WeakMap,
        a = new WeakMap,
        c = new WeakMap,
        u = new WeakMap,
        f = new WeakMap;
        var p = "sui:devnet"
          , y = "sui:testnet"
          , g = "sui:localnet"
          , w = [p, y, g]
          , b = (r(9320),
        r(8063));
        function m(t, e) {
            for (var r, n, o, i = t.replace(/[^A-Za-z0-9+/]/g, ""), s = i.length, a = e ? Math.ceil((3 * s + 1 >> 2) / e) * e : 3 * s + 1 >> 2, c = new Uint8Array(a), u = 0, f = 0, h = 0; h < s; h++)
                if (n = 3 & h,
                u |= ((o = i.charCodeAt(h)) > 64 && o < 91 ? o - 65 : o > 96 && o < 123 ? o - 71 : o > 47 && o < 58 ? o + 4 : 43 === o ? 62 : 47 === o ? 63 : 0) << 6 * (3 - n),
                3 === n || s - h == 1) {
                    for (r = 0; r < 3 && f < a; r++,
                    f++)
                        c[f] = u >>> (16 >>> r & 24) & 255;
                    u = 0
                }
            return c
        }
        function v(t) {
            return t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : 62 === t ? 43 : 63 === t ? 47 : 65
        }
        function E(t) {
            for (var e = 2, r = "", n = t.length, o = 0, i = 0; i < n; i++)
                e = i % 3,
                i > 0 && 4 * i / 3 % 76 == 0 && (r += ""),
                o |= t[i] << (16 >>> e & 24),
                2 !== e && t.length - i != 1 || (r += String.fromCodePoint(v(o >>> 18 & 63), v(o >>> 12 & 63), v(o >>> 6 & 63), v(63 & o)),
                o = 0);
            return r.slice(0, r.length - 2 + e) + (2 === e ? "" : 1 === e ? "=" : "==")
        }
        function x(t) {
            let e = t.replace("0x", "").match(/.{1,2}/g).map((t=>parseInt(t, 16)));
            if (null === e)
                throw new Error(`Unable to parse HEX: ${t}`);
            return Uint8Array.from(e)
        }
        function A(t) {
            return t.reduce(((t,e)=>t + e.toString(16).padStart(2, "0")), "")
        }
        function S(t, e) {
            let r = new Uint8Array(e)
              , n = 0;
            for (; t > 0; )
                r[n] = Number(t % BigInt(256)),
                t /= BigInt(256),
                n += 1;
            return r
        }
        var T = t=>b.encode(t)
          , B = t=>b.decode(t)
          , I = class {
            constructor({size: t=1024, maxSize: e, allocateSize: r=1024}={}) {
                this.bytePosition = 0,
                this.size = t,
                this.maxSize = e || t,
                this.allocateSize = r,
                this.dataView = new DataView(new ArrayBuffer(t))
            }
            ensureSizeOrGrow(t) {
                const e = this.bytePosition + t;
                if (e > this.size) {
                    const t = Math.min(this.maxSize, this.size + this.allocateSize);
                    if (e > t)
                        throw new Error(`Attempting to serialize to BCS, but buffer does not have enough size. Allocated size: ${this.size}, Max size: ${this.maxSize}, Required size: ${e}`);
                    this.size = t;
                    const r = new ArrayBuffer(this.size);
                    new Uint8Array(r).set(new Uint8Array(this.dataView.buffer)),
                    this.dataView = new DataView(r)
                }
            }
            shift(t) {
                return this.bytePosition += t,
                this
            }
            write8(t) {
                return this.ensureSizeOrGrow(1),
                this.dataView.setUint8(this.bytePosition, Number(t)),
                this.shift(1)
            }
            write16(t) {
                return this.ensureSizeOrGrow(2),
                this.dataView.setUint16(this.bytePosition, Number(t), !0),
                this.shift(2)
            }
            write32(t) {
                return this.ensureSizeOrGrow(4),
                this.dataView.setUint32(this.bytePosition, Number(t), !0),
                this.shift(4)
            }
            write64(t) {
                return S(BigInt(t), 8).forEach((t=>this.write8(t))),
                this
            }
            write128(t) {
                return S(BigInt(t), 16).forEach((t=>this.write8(t))),
                this
            }
            write256(t) {
                return S(BigInt(t), 32).forEach((t=>this.write8(t))),
                this
            }
            writeULEB(t) {
                return function(t) {
                    let e = []
                      , r = 0;
                    if (0 === t)
                        return [0];
                    for (; t > 0; )
                        e[r] = 127 & t,
                        (t >>= 7) && (e[r] |= 128),
                        r += 1;
                    return e
                }(t).forEach((t=>this.write8(t))),
                this
            }
            writeVec(t, e) {
                return this.writeULEB(t.length),
                Array.from(t).forEach(((r,n)=>e(this, r, n, t.length))),
                this
            }
            *[Symbol.iterator]() {
                for (let t = 0; t < this.bytePosition; t++)
                    yield this.dataView.getUint8(t);
                return this.toBytes()
            }
            toBytes() {
                return new Uint8Array(this.dataView.buffer.slice(0, this.bytePosition))
            }
            toString(t) {
                return function(t, e) {
                    switch (e) {
                    case "base58":
                        return T(t);
                    case "base64":
                        return E(t);
                    case "hex":
                        return A(t);
                    default:
                        throw new Error("Unsupported encoding, supported values are: base64, hex")
                    }
                }(this.toBytes(), t)
            }
        }
          , O = class {
            constructor(t) {
                if (this.types = new Map,
                this.counter = 0,
                t instanceof O)
                    return this.schema = t.schema,
                    void (this.types = new Map(t.types));
                if (this.schema = t,
                this.registerAddressType(O.ADDRESS, t.addressLength, t.addressEncoding),
                this.registerVectorType(t.vectorType),
                t.types && t.types.structs)
                    for (let e of Object.keys(t.types.structs))
                        this.registerStructType(e, t.types.structs[e]);
                if (t.types && t.types.enums)
                    for (let e of Object.keys(t.types.enums))
                        this.registerEnumType(e, t.types.enums[e]);
                if (t.types && t.types.aliases)
                    for (let e of Object.keys(t.types.aliases))
                        this.registerAlias(e, t.types.aliases[e]);
                !1 !== t.withPrimitives && function(t) {
                    t.registerType(U.U8, (function(t, e) {
                        return t.write8(e)
                    }
                    ), (function(t) {
                        return t.read8()
                    }
                    ), (t=>t < 256)),
                    t.registerType(U.U16, (function(t, e) {
                        return t.write16(e)
                    }
                    ), (function(t) {
                        return t.read16()
                    }
                    ), (t=>t < 65536)),
                    t.registerType(U.U32, (function(t, e) {
                        return t.write32(e)
                    }
                    ), (function(t) {
                        return t.read32()
                    }
                    ), (t=>t <= 4294967296n)),
                    t.registerType(U.U64, (function(t, e) {
                        return t.write64(e)
                    }
                    ), (function(t) {
                        return t.read64()
                    }
                    )),
                    t.registerType(U.U128, (function(t, e) {
                        return t.write128(e)
                    }
                    ), (function(t) {
                        return t.read128()
                    }
                    )),
                    t.registerType(U.U256, (function(t, e) {
                        return t.write256(e)
                    }
                    ), (function(t) {
                        return t.read256()
                    }
                    )),
                    t.registerType(U.BOOL, (function(t, e) {
                        return t.write8(e)
                    }
                    ), (function(t) {
                        return "1" === t.read8().toString(10)
                    }
                    )),
                    t.registerType(U.STRING, (function(t, e) {
                        return t.writeVec(Array.from(e), ((t,e)=>t.write8(e.charCodeAt(0))))
                    }
                    ), (function(t) {
                        return t.readVec((t=>t.read8())).map((t=>String.fromCharCode(Number(t)))).join("")
                    }
                    ), (t=>!0)),
                    t.registerType(U.HEX, (function(t, e) {
                        return t.writeVec(Array.from(x(e)), ((t,e)=>t.write8(e)))
                    }
                    ), (function(t) {
                        let e = t.readVec((t=>t.read8()));
                        return A(new Uint8Array(e))
                    }
                    )),
                    t.registerType(U.BASE58, (function(t, e) {
                        return t.writeVec(Array.from(B(e)), ((t,e)=>t.write8(e)))
                    }
                    ), (function(t) {
                        let e = t.readVec((t=>t.read8()));
                        return T(new Uint8Array(e))
                    }
                    )),
                    t.registerType(U.BASE64, (function(t, e) {
                        return t.writeVec(Array.from(m(e)), ((t,e)=>t.write8(e)))
                    }
                    ), (function(t) {
                        let e = t.readVec((t=>t.read8()));
                        return E(new Uint8Array(e))
                    }
                    ))
                }(this)
            }
            tempKey() {
                return "bcs-struct-" + ++this.counter
            }
            ser(t, e, r) {
                if ("string" == typeof t || Array.isArray(t)) {
                    const {name: n, params: o} = this.parseTypeName(t);
                    return this.getTypeInterface(n).encode(this, e, r, o)
                }
                if ("object" == typeof t) {
                    const n = this.tempKey();
                    return new O(this).registerStructType(n, t).ser(n, e, r)
                }
                throw new Error(`Incorrect type passed into the '.ser()' function. \n${JSON.stringify(t)}`)
            }
            de(t, e, r) {
                if ("string" == typeof e) {
                    if (!r)
                        throw new Error("To pass a string to `bcs.de`, specify encoding");
                    e = function(t, e) {
                        switch (e) {
                        case "base58":
                            return B(t);
                        case "base64":
                            return m(t);
                        case "hex":
                            return x(t);
                        default:
                            throw new Error("Unsupported encoding, supported values are: base64, hex")
                        }
                    }(e, r)
                }
                if ("string" == typeof t || Array.isArray(t)) {
                    const {name: r, params: n} = this.parseTypeName(t);
                    return this.getTypeInterface(r).decode(this, e, n)
                }
                if ("object" == typeof t) {
                    const n = new O(this)
                      , o = this.tempKey();
                    return n.registerStructType(o, t).de(o, e, r)
                }
                throw new Error(`Incorrect type passed into the '.de()' function. \n${JSON.stringify(t)}`)
            }
            hasType(t) {
                return this.types.has(t)
            }
            registerAlias(t, e) {
                return this.types.set(t, e),
                this
            }
            registerType(t, e, r, n=(()=>!0)) {
                const {name: o, params: i} = this.parseTypeName(t);
                return this.types.set(o, {
                    encode(t, e, r, n) {
                        const o = i.reduce(((t,e,r)=>Object.assign(t, {
                            [e]: n[r]
                        })), {});
                        return this._encodeRaw.call(t, new I(r), e, n, o)
                    },
                    decode(t, e, r) {
                        const n = i.reduce(((t,e,n)=>Object.assign(t, {
                            [e]: r[n]
                        })), {});
                        return this._decodeRaw.call(t, new class {
                            constructor(t) {
                                this.bytePosition = 0,
                                this.dataView = new DataView(t.buffer)
                            }
                            shift(t) {
                                return this.bytePosition += t,
                                this
                            }
                            read8() {
                                let t = this.dataView.getUint8(this.bytePosition);
                                return this.shift(1),
                                t
                            }
                            read16() {
                                let t = this.dataView.getUint16(this.bytePosition, !0);
                                return this.shift(2),
                                t
                            }
                            read32() {
                                let t = this.dataView.getUint32(this.bytePosition, !0);
                                return this.shift(4),
                                t
                            }
                            read64() {
                                let t = this.read32()
                                  , e = this.read32().toString(16) + t.toString(16).padStart(8, "0");
                                return BigInt("0x" + e).toString(10)
                            }
                            read128() {
                                let t = BigInt(this.read64())
                                  , e = BigInt(this.read64()).toString(16) + t.toString(16).padStart(8, "0");
                                return BigInt("0x" + e).toString(10)
                            }
                            read256() {
                                let t = BigInt(this.read128())
                                  , e = BigInt(this.read128()).toString(16) + t.toString(16).padStart(16, "0");
                                return BigInt("0x" + e).toString(10)
                            }
                            readBytes(t) {
                                let e = this.bytePosition + this.dataView.byteOffset
                                  , r = new Uint8Array(this.dataView.buffer,e,t);
                                return this.shift(t),
                                r
                            }
                            readULEB() {
                                let t = this.bytePosition + this.dataView.byteOffset
                                  , e = new Uint8Array(this.dataView.buffer,t)
                                  , {value: r, length: n} = function(t) {
                                    let e = 0
                                      , r = 0
                                      , n = 0;
                                    for (; ; ) {
                                        let o = t[n];
                                        if (n += 1,
                                        e |= (127 & o) << r,
                                        0 == (128 & o))
                                            break;
                                        r += 7
                                    }
                                    return {
                                        value: e,
                                        length: n
                                    }
                                }(e);
                                return this.shift(n),
                                r
                            }
                            readVec(t) {
                                let e = this.readULEB()
                                  , r = [];
                                for (let n = 0; n < e; n++)
                                    r.push(t(this, n, e));
                                return r
                            }
                        }
                        (e), r, n)
                    },
                    _encodeRaw(t, r, i, s) {
                        if (n(r))
                            return e.call(this, t, r, i, s);
                        throw new Error(`Validation failed for type ${o}, data: ${r}`)
                    },
                    _decodeRaw(t, e, n) {
                        return r.call(this, t, e, n)
                    }
                }),
                this
            }
            registerAddressType(t, e, r="hex") {
                switch (r) {
                case "base64":
                    return this.registerType(t, (function(t, e) {
                        return m(e).reduce(((t,e)=>t.write8(e)), t)
                    }
                    ), (function(t) {
                        return E(t.readBytes(e))
                    }
                    ));
                case "hex":
                    return this.registerType(t, (function(t, e) {
                        return x(e).reduce(((t,e)=>t.write8(e)), t)
                    }
                    ), (function(t) {
                        return A(t.readBytes(e))
                    }
                    ));
                default:
                    throw new Error("Unsupported encoding! Use either hex or base64")
                }
            }
            registerVectorType(t) {
                let {name: e, params: r} = this.parseTypeName(t);
                if (r.length > 1)
                    throw new Error("Vector can have only one type parameter; got " + e);
                return this.registerType(t, (function(e, r, n, o) {
                    return e.writeVec(r, ((e,r)=>{
                        let i = n[0];
                        if (!i)
                            throw new Error(`Incorrect number of type parameters passed a to vector '${t}'`);
                        let {name: s, params: a} = this.parseTypeName(i);
                        if (this.hasType(s))
                            return this.getTypeInterface(s)._encodeRaw.call(this, e, r, a, o);
                        if (!(s in o))
                            throw new Error(`Unable to find a matching type definition for ${s} in vector; make sure you passed a generic`);
                        let {name: c, params: u} = this.parseTypeName(o[s]);
                        return this.getTypeInterface(c)._encodeRaw.call(this, e, r, u, o)
                    }
                    ))
                }
                ), (function(e, r, n) {
                    return e.readVec((e=>{
                        let o = r[0];
                        if (!o)
                            throw new Error(`Incorrect number of type parameters passed to a vector '${t}'`);
                        let {name: i, params: s} = this.parseTypeName(o);
                        if (this.hasType(i))
                            return this.getTypeInterface(i)._decodeRaw.call(this, e, s, n);
                        if (!(i in n))
                            throw new Error(`Unable to find a matching type definition for ${i} in vector; make sure you passed a generic`);
                        let {name: a, params: c} = this.parseTypeName(n[i]);
                        this.getTypeInterface(a)._decodeRaw.call(this, e, c, n)
                    }
                    ))
                }
                ))
            }
            registerStructType(t, e) {
                for (let t in e) {
                    let r = this.tempKey()
                      , n = e[t];
                    Array.isArray(n) || "string" == typeof n || (e[t] = r,
                    this.registerStructType(r, n))
                }
                let r = Object.freeze(e)
                  , n = Object.keys(r)
                  , {name: o, params: i} = this.parseTypeName(t);
                return this.registerType(t, (function(t, e, s, a) {
                    if (!e || e.constructor !== Object)
                        throw new Error(`Expected ${o} to be an Object, got: ${e}`);
                    if (s.length !== i.length)
                        throw new Error(`Incorrect number of generic parameters passed; expected: ${i.length}, got: ${s.length}`);
                    for (let c of n) {
                        if (!(c in e))
                            throw new Error(`Struct ${o} requires field ${c}:${r[c]}`);
                        const {name: n, params: u} = this.parseTypeName(r[c]);
                        if (i.includes(n)) {
                            const r = i.indexOf(n);
                            let {name: u, params: f} = this.parseTypeName(s[r]);
                            if (this.hasType(u)) {
                                this.getTypeInterface(u)._encodeRaw.call(this, t, e[c], f, a);
                                continue
                            }
                            if (!(u in a))
                                throw new Error(`Unable to find a matching type definition for ${u} in ${o}; make sure you passed a generic`);
                            let {name: h, params: l} = this.parseTypeName(a[u]);
                            this.getTypeInterface(h)._encodeRaw.call(this, t, e[c], l, a)
                        } else
                            this.getTypeInterface(n)._encodeRaw.call(this, t, e[c], u, a)
                    }
                    return t
                }
                ), (function(t, e, s) {
                    if (e.length !== i.length)
                        throw new Error(`Incorrect number of generic parameters passed; expected: ${i.length}, got: ${e.length}`);
                    let a = {};
                    for (let c of n) {
                        const {name: n, params: u} = this.parseTypeName(r[c]);
                        if (i.includes(n)) {
                            const r = i.indexOf(n);
                            let {name: u, params: f} = this.parseTypeName(e[r]);
                            if (this.hasType(u)) {
                                a[c] = this.getTypeInterface(u)._decodeRaw.call(this, t, f, s);
                                continue
                            }
                            if (!(u in s))
                                throw new Error(`Unable to find a matching type definition for ${u} in ${o}; make sure you passed a generic`);
                            let {name: h, params: l} = this.parseTypeName(s[u]);
                            a[c] = this.getTypeInterface(h)._decodeRaw.call(this, t, l, s)
                        } else
                            a[c] = this.getTypeInterface(n)._decodeRaw.call(this, t, u, s)
                    }
                    return a
                }
                ))
            }
            registerEnumType(t, e) {
                for (let t in e) {
                    let r = this.tempKey()
                      , n = e[t];
                    null === n || Array.isArray(n) || "string" == typeof n || (e[t] = r,
                    this.registerStructType(r, n))
                }
                let r = Object.freeze(e)
                  , n = Object.keys(r)
                  , {name: o, params: i} = this.parseTypeName(t);
                return this.registerType(t, (function(t, e, s, a) {
                    if (!e)
                        throw new Error(`Unable to write enum "${o}", missing data.\nReceived: "${e}"`);
                    if ("object" != typeof e)
                        throw new Error(`Incorrect data passed into enum "${o}", expected object with properties: "${n.join(" | ")}".\nReceived: "${JSON.stringify(e)}"`);
                    let c = Object.keys(e)[0];
                    if (void 0 === c)
                        throw new Error(`Empty object passed as invariant of the enum "${o}"`);
                    let u = n.indexOf(c);
                    if (-1 === u)
                        throw new Error(`Unknown invariant of the enum "${o}", allowed values: "${n.join(" | ")}"; received "${c}"`);
                    let f = n[u]
                      , h = r[f];
                    if (t.write8(u),
                    null === h)
                        return t;
                    let l = i.indexOf(h)
                      , d = -1 === l ? h : s[l];
                    {
                        let {name: r, params: n} = this.parseTypeName(d);
                        return this.getTypeInterface(r)._encodeRaw.call(this, t, e[c], n, a)
                    }
                }
                ), (function(t, e, s) {
                    let a = t.readULEB()
                      , c = n[a]
                      , u = r[c];
                    if (-1 === a)
                        throw new Error(`Decoding type mismatch, expected enum "${o}" invariant index, received "${a}"`);
                    if (null === u)
                        return {
                            [c]: !0
                        };
                    let f = i.indexOf(u)
                      , h = -1 === f ? u : e[f];
                    {
                        let {name: e, params: r} = this.parseTypeName(h);
                        return {
                            [c]: this.getTypeInterface(e)._decodeRaw.call(this, t, r, s)
                        }
                    }
                }
                ))
            }
            getTypeInterface(t) {
                let e = this.types.get(t);
                if ("string" == typeof e) {
                    let t = [];
                    for (; "string" == typeof e; ) {
                        if (t.includes(e))
                            throw new Error(`Recursive definition found: ${t.join(" -> ")} -> ${e}`);
                        t.push(e),
                        e = this.types.get(e)
                    }
                }
                if (void 0 === e)
                    throw new Error(`Type ${t} is not registered`);
                return e
            }
            parseTypeName(t) {
                if (Array.isArray(t)) {
                    let[e,...r] = t;
                    return {
                        name: e,
                        params: r
                    }
                }
                if ("string" != typeof t)
                    throw new Error(`Illegal type passed as a name of the type: ${t}`);
                let[e,r] = this.schema.genericSeparators || ["<", ">"]
                  , n = t.indexOf(e)
                  , o = Array.from(t).reverse().indexOf(r);
                if (-1 === n && -1 === o)
                    return {
                        name: t,
                        params: []
                    };
                if (-1 === n || -1 === o)
                    throw new Error(`Unclosed generic in name '${t}'`);
                return {
                    name: t.slice(0, n),
                    params: t.slice(n + 1, t.length - o - 1).split(",").map((t=>t.trim()))
                }
            }
        }
          , U = O;
        function M(t) {
            if (!Number.isSafeInteger(t) || t < 0)
                throw new Error(`Wrong positive integer: ${t}`)
        }
        function k(t, ...e) {
            if (!(t instanceof Uint8Array))
                throw new TypeError("Expected Uint8Array");
            if (e.length > 0 && !e.includes(t.length))
                throw new TypeError(`Expected Uint8Array of length ${e}, not of length=${t.length}`)
        }
        U.U8 = "u8",
        U.U16 = "u16",
        U.U32 = "u32",
        U.U64 = "u64",
        U.U128 = "u128",
        U.U256 = "u256",
        U.BOOL = "bool",
        U.VECTOR = "vector",
        U.ADDRESS = "address",
        U.STRING = "string",
        U.HEX = "hex-string",
        U.BASE58 = "base58-string",
        U.BASE64 = "base64-string";
        const j = {
            number: M,
            bool: function(t) {
                if ("boolean" != typeof t)
                    throw new Error(`Expected boolean, not ${t}`)
            },
            bytes: k,
            hash: function(t) {
                if ("function" != typeof t || "function" != typeof t.create)
                    throw new Error("Hash should be wrapped by utils.wrapConstructor");
                M(t.outputLen),
                M(t.blockLen)
            },
            exists: function(t, e=!0) {
                if (t.destroyed)
                    throw new Error("Hash instance has been destroyed");
                if (e && t.finished)
                    throw new Error("Hash#digest() has already been called")
            },
            output: function(t, e) {
                k(t);
                const r = e.outputLen;
                if (t.length < r)
                    throw new Error(`digestInto() expects output buffer of length at least ${r}`)
            }
        }
          , N = "object" == typeof globalThis && "crypto"in globalThis ? globalThis.crypto : void 0
          , L = t=>new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength / 4))
          , _ = t=>new DataView(t.buffer,t.byteOffset,t.byteLength)
          , D = (t,e)=>t << 32 - e | t >>> e;
        if (68 !== new Uint8Array(new Uint32Array([287454020]).buffer)[0])
            throw new Error("Non little-endian hardware is not supported");
        Array.from({
            length: 256
        }, ((t,e)=>e.toString(16).padStart(2, "0")));
        function C(t) {
            if ("string" != typeof t)
                throw new TypeError("utf8ToBytes expected string, got " + typeof t);
            return (new TextEncoder).encode(t)
        }
        function R(t) {
            if ("string" == typeof t && (t = C(t)),
            !(t instanceof Uint8Array))
                throw new TypeError(`Expected input type is Uint8Array (got ${typeof t})`);
            return t
        }
        function P(...t) {
            if (!t.every((t=>t instanceof Uint8Array)))
                throw new Error("Uint8Array list expected");
            if (1 === t.length)
                return t[0];
            const e = t.reduce(((t,e)=>t + e.length), 0)
              , r = new Uint8Array(e);
            for (let e = 0, n = 0; e < t.length; e++) {
                const o = t[e];
                r.set(o, n),
                n += o.length
            }
            return r
        }
        class z {
            clone() {
                return this._cloneInto()
            }
        }
        function $(t) {
            const e = e=>t().update(R(e)).digest()
              , r = t();
            return e.outputLen = r.outputLen,
            e.blockLen = r.blockLen,
            e.create = ()=>t(),
            e
        }
        function H(t=32) {
            if (N && "function" == typeof N.getRandomValues)
                return N.getRandomValues(new Uint8Array(t));
            throw new Error("crypto.getRandomValues must be defined")
        }
        class V extends z {
            constructor(t, e, r, n) {
                super(),
                this.blockLen = t,
                this.outputLen = e,
                this.padOffset = r,
                this.isLE = n,
                this.finished = !1,
                this.length = 0,
                this.pos = 0,
                this.destroyed = !1,
                this.buffer = new Uint8Array(t),
                this.view = _(this.buffer)
            }
            update(t) {
                j.exists(this);
                const {view: e, buffer: r, blockLen: n} = this
                  , o = (t = R(t)).length;
                for (let i = 0; i < o; ) {
                    const s = Math.min(n - this.pos, o - i);
                    if (s !== n)
                        r.set(t.subarray(i, i + s), this.pos),
                        this.pos += s,
                        i += s,
                        this.pos === n && (this.process(e, 0),
                        this.pos = 0);
                    else {
                        const e = _(t);
                        for (; n <= o - i; i += n)
                            this.process(e, i)
                    }
                }
                return this.length += t.length,
                this.roundClean(),
                this
            }
            digestInto(t) {
                j.exists(this),
                j.output(t, this),
                this.finished = !0;
                const {buffer: e, view: r, blockLen: n, isLE: o} = this;
                let {pos: i} = this;
                e[i++] = 128,
                this.buffer.subarray(i).fill(0),
                this.padOffset > n - i && (this.process(r, 0),
                i = 0);
                for (let t = i; t < n; t++)
                    e[t] = 0;
                !function(t, e, r, n) {
                    if ("function" == typeof t.setBigUint64)
                        return t.setBigUint64(e, r, n);
                    const o = BigInt(32)
                      , i = BigInt(4294967295)
                      , s = Number(r >> o & i)
                      , a = Number(r & i)
                      , c = n ? 4 : 0
                      , u = n ? 0 : 4;
                    t.setUint32(e + c, s, n),
                    t.setUint32(e + u, a, n)
                }(r, n - 8, BigInt(8 * this.length), o),
                this.process(r, 0);
                const s = _(t)
                  , a = this.outputLen;
                if (a % 4)
                    throw new Error("_sha2: outputLen should be aligned to 32bit");
                const c = a / 4
                  , u = this.get();
                if (c > u.length)
                    throw new Error("_sha2: outputLen bigger than state");
                for (let t = 0; t < c; t++)
                    s.setUint32(4 * t, u[t], o)
            }
            digest() {
                const {buffer: t, outputLen: e} = this;
                this.digestInto(t);
                const r = t.slice(0, e);
                return this.destroy(),
                r
            }
            _cloneInto(t) {
                t || (t = new this.constructor),
                t.set(...this.get());
                const {blockLen: e, buffer: r, length: n, finished: o, destroyed: i, pos: s} = this;
                return t.length = n,
                t.pos = s,
                t.finished = o,
                t.destroyed = i,
                n % e && t.buffer.set(r),
                t
            }
        }
        const F = (t,e,r)=>t & e ^ t & r ^ e & r
          , q = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])
          , G = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225])
          , Y = new Uint32Array(64);
        class W extends V {
            constructor() {
                super(64, 32, 8, !1),
                this.A = 0 | G[0],
                this.B = 0 | G[1],
                this.C = 0 | G[2],
                this.D = 0 | G[3],
                this.E = 0 | G[4],
                this.F = 0 | G[5],
                this.G = 0 | G[6],
                this.H = 0 | G[7]
            }
            get() {
                const {A: t, B: e, C: r, D: n, E: o, F: i, G: s, H: a} = this;
                return [t, e, r, n, o, i, s, a]
            }
            set(t, e, r, n, o, i, s, a) {
                this.A = 0 | t,
                this.B = 0 | e,
                this.C = 0 | r,
                this.D = 0 | n,
                this.E = 0 | o,
                this.F = 0 | i,
                this.G = 0 | s,
                this.H = 0 | a
            }
            process(t, e) {
                for (let r = 0; r < 16; r++,
                e += 4)
                    Y[r] = t.getUint32(e, !1);
                for (let t = 16; t < 64; t++) {
                    const e = Y[t - 15]
                      , r = Y[t - 2]
                      , n = D(e, 7) ^ D(e, 18) ^ e >>> 3
                      , o = D(r, 17) ^ D(r, 19) ^ r >>> 10;
                    Y[t] = o + Y[t - 7] + n + Y[t - 16] | 0
                }
                let {A: r, B: n, C: o, D: i, E: s, F: a, G: c, H: u} = this;
                for (let t = 0; t < 64; t++) {
                    const e = u + (D(s, 6) ^ D(s, 11) ^ D(s, 25)) + ((f = s) & a ^ ~f & c) + q[t] + Y[t] | 0
                      , h = (D(r, 2) ^ D(r, 13) ^ D(r, 22)) + F(r, n, o) | 0;
                    u = c,
                    c = a,
                    a = s,
                    s = i + e | 0,
                    i = o,
                    o = n,
                    n = r,
                    r = e + h | 0
                }
                var f;
                r = r + this.A | 0,
                n = n + this.B | 0,
                o = o + this.C | 0,
                i = i + this.D | 0,
                s = s + this.E | 0,
                a = a + this.F | 0,
                c = c + this.G | 0,
                u = u + this.H | 0,
                this.set(r, n, o, i, s, a, c, u)
            }
            roundClean() {
                Y.fill(0)
            }
            destroy() {
                this.set(0, 0, 0, 0, 0, 0, 0, 0),
                this.buffer.fill(0)
            }
        }
        class K extends W {
            constructor() {
                super(),
                this.A = -1056596264,
                this.B = 914150663,
                this.C = 812702999,
                this.D = -150054599,
                this.E = -4191439,
                this.F = 1750603025,
                this.G = 1694076839,
                this.H = -1090891868,
                this.outputLen = 28
            }
        }
        const Q = $((()=>new W))
          , Z = ($((()=>new K)),
        new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3]));
        class J extends z {
            constructor(t, e, r={}, n, o, i) {
                if (super(),
                this.blockLen = t,
                this.outputLen = e,
                this.length = 0,
                this.pos = 0,
                this.finished = !1,
                this.destroyed = !1,
                j.number(t),
                j.number(e),
                j.number(n),
                e < 0 || e > n)
                    throw new Error("outputLen bigger than keyLen");
                if (void 0 !== r.key && (r.key.length < 1 || r.key.length > n))
                    throw new Error(`key must be up 1..${n} byte long or undefined`);
                if (void 0 !== r.salt && r.salt.length !== o)
                    throw new Error(`salt must be ${o} byte long or undefined`);
                if (void 0 !== r.personalization && r.personalization.length !== i)
                    throw new Error(`personalization must be ${i} byte long or undefined`);
                this.buffer32 = L(this.buffer = new Uint8Array(t))
            }
            update(t) {
                j.exists(this);
                const {blockLen: e, buffer: r, buffer32: n} = this
                  , o = (t = R(t)).length;
                for (let i = 0; i < o; ) {
                    this.pos === e && (this.compress(n, 0, !1),
                    this.pos = 0);
                    const s = Math.min(e - this.pos, o - i)
                      , a = t.byteOffset + i;
                    if (s !== e || a % 4 || !(i + s < o))
                        r.set(t.subarray(i, i + s), this.pos),
                        this.pos += s,
                        this.length += s,
                        i += s;
                    else {
                        const r = new Uint32Array(t.buffer,a,Math.floor((o - i) / 4));
                        for (let t = 0; i + e < o; t += n.length,
                        i += e)
                            this.length += e,
                            this.compress(r, t, !1)
                    }
                }
                return this
            }
            digestInto(t) {
                j.exists(this),
                j.output(t, this);
                const {pos: e, buffer32: r} = this;
                this.finished = !0,
                this.buffer.subarray(e).fill(0),
                this.compress(r, 0, !0);
                const n = L(t);
                this.get().forEach(((t,e)=>n[e] = t))
            }
            digest() {
                const {buffer: t, outputLen: e} = this;
                this.digestInto(t);
                const r = t.slice(0, e);
                return this.destroy(),
                r
            }
            _cloneInto(t) {
                const {buffer: e, length: r, finished: n, destroyed: o, outputLen: i, pos: s} = this;
                return t || (t = new this.constructor({
                    dkLen: i
                })),
                t.set(...this.get()),
                t.length = r,
                t.finished = n,
                t.destroyed = o,
                t.outputLen = i,
                t.buffer.set(e),
                t.pos = s,
                t
            }
        }
        const X = BigInt(2 ** 32 - 1)
          , tt = BigInt(32);
        function et(t, e=!1) {
            return e ? {
                h: Number(t & X),
                l: Number(t >> tt & X)
            } : {
                h: 0 | Number(t >> tt & X),
                l: 0 | Number(t & X)
            }
        }
        const rt = {
            fromBig: et,
            split: function(t, e=!1) {
                let r = new Uint32Array(t.length)
                  , n = new Uint32Array(t.length);
                for (let o = 0; o < t.length; o++) {
                    const {h: i, l: s} = et(t[o], e);
                    [r[o],n[o]] = [i, s]
                }
                return [r, n]
            },
            toBig: (t,e)=>BigInt(t >>> 0) << tt | BigInt(e >>> 0),
            shrSH: (t,e,r)=>t >>> r,
            shrSL: (t,e,r)=>t << 32 - r | e >>> r,
            rotrSH: (t,e,r)=>t >>> r | e << 32 - r,
            rotrSL: (t,e,r)=>t << 32 - r | e >>> r,
            rotrBH: (t,e,r)=>t << 64 - r | e >>> r - 32,
            rotrBL: (t,e,r)=>t >>> r - 32 | e << 64 - r,
            rotr32H: (t,e)=>e,
            rotr32L: (t,e)=>t,
            rotlSH: (t,e,r)=>t << r | e >>> 32 - r,
            rotlSL: (t,e,r)=>e << r | t >>> 32 - r,
            rotlBH: (t,e,r)=>e << r - 32 | t >>> 64 - r,
            rotlBL: (t,e,r)=>t << r - 32 | e >>> 64 - r,
            add: function(t, e, r, n) {
                const o = (e >>> 0) + (n >>> 0);
                return {
                    h: t + r + (o / 2 ** 32 | 0) | 0,
                    l: 0 | o
                }
            },
            add3L: (t,e,r)=>(t >>> 0) + (e >>> 0) + (r >>> 0),
            add3H: (t,e,r,n)=>e + r + n + (t / 2 ** 32 | 0) | 0,
            add4L: (t,e,r,n)=>(t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0),
            add4H: (t,e,r,n,o)=>e + r + n + o + (t / 2 ** 32 | 0) | 0,
            add5H: (t,e,r,n,o,i)=>e + r + n + o + i + (t / 2 ** 32 | 0) | 0,
            add5L: (t,e,r,n,o)=>(t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0) + (o >>> 0)
        }
          , nt = new Uint32Array([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225])
          , ot = new Uint32Array(32);
        function it(t, e, r, n, o, i) {
            const s = o[i]
              , a = o[i + 1];
            let c = ot[2 * t]
              , u = ot[2 * t + 1]
              , f = ot[2 * e]
              , h = ot[2 * e + 1]
              , l = ot[2 * r]
              , d = ot[2 * r + 1]
              , p = ot[2 * n]
              , y = ot[2 * n + 1]
              , g = rt.add3L(c, f, s);
            u = rt.add3H(g, u, h, a),
            c = 0 | g,
            ({Dh: y, Dl: p} = {
                Dh: y ^ u,
                Dl: p ^ c
            }),
            ({Dh: y, Dl: p} = {
                Dh: rt.rotr32H(y, p),
                Dl: rt.rotr32L(y, p)
            }),
            ({h: d, l} = rt.add(d, l, y, p)),
            ({Bh: h, Bl: f} = {
                Bh: h ^ d,
                Bl: f ^ l
            }),
            ({Bh: h, Bl: f} = {
                Bh: rt.rotrSH(h, f, 24),
                Bl: rt.rotrSL(h, f, 24)
            }),
            ot[2 * t] = c,
            ot[2 * t + 1] = u,
            ot[2 * e] = f,
            ot[2 * e + 1] = h,
            ot[2 * r] = l,
            ot[2 * r + 1] = d,
            ot[2 * n] = p,
            ot[2 * n + 1] = y
        }
        function st(t, e, r, n, o, i) {
            const s = o[i]
              , a = o[i + 1];
            let c = ot[2 * t]
              , u = ot[2 * t + 1]
              , f = ot[2 * e]
              , h = ot[2 * e + 1]
              , l = ot[2 * r]
              , d = ot[2 * r + 1]
              , p = ot[2 * n]
              , y = ot[2 * n + 1]
              , g = rt.add3L(c, f, s);
            u = rt.add3H(g, u, h, a),
            c = 0 | g,
            ({Dh: y, Dl: p} = {
                Dh: y ^ u,
                Dl: p ^ c
            }),
            ({Dh: y, Dl: p} = {
                Dh: rt.rotrSH(y, p, 16),
                Dl: rt.rotrSL(y, p, 16)
            }),
            ({h: d, l} = rt.add(d, l, y, p)),
            ({Bh: h, Bl: f} = {
                Bh: h ^ d,
                Bl: f ^ l
            }),
            ({Bh: h, Bl: f} = {
                Bh: rt.rotrBH(h, f, 63),
                Bl: rt.rotrBL(h, f, 63)
            }),
            ot[2 * t] = c,
            ot[2 * t + 1] = u,
            ot[2 * e] = f,
            ot[2 * e + 1] = h,
            ot[2 * r] = l,
            ot[2 * r + 1] = d,
            ot[2 * n] = p,
            ot[2 * n + 1] = y
        }
        class at extends J {
            constructor(t={}) {
                super(128, void 0 === t.dkLen ? 64 : t.dkLen, t, 64, 16, 16),
                this.v0l = 0 | nt[0],
                this.v0h = 0 | nt[1],
                this.v1l = 0 | nt[2],
                this.v1h = 0 | nt[3],
                this.v2l = 0 | nt[4],
                this.v2h = 0 | nt[5],
                this.v3l = 0 | nt[6],
                this.v3h = 0 | nt[7],
                this.v4l = 0 | nt[8],
                this.v4h = 0 | nt[9],
                this.v5l = 0 | nt[10],
                this.v5h = 0 | nt[11],
                this.v6l = 0 | nt[12],
                this.v6h = 0 | nt[13],
                this.v7l = 0 | nt[14],
                this.v7h = 0 | nt[15];
                const e = t.key ? t.key.length : 0;
                if (this.v0l ^= this.outputLen | e << 8 | 65536 | 1 << 24,
                t.salt) {
                    const e = L(R(t.salt));
                    this.v4l ^= e[0],
                    this.v4h ^= e[1],
                    this.v5l ^= e[2],
                    this.v5h ^= e[3]
                }
                if (t.personalization) {
                    const e = L(R(t.personalization));
                    this.v6l ^= e[0],
                    this.v6h ^= e[1],
                    this.v7l ^= e[2],
                    this.v7h ^= e[3]
                }
                if (t.key) {
                    const e = new Uint8Array(this.blockLen);
                    e.set(R(t.key)),
                    this.update(e)
                }
            }
            get() {
                let {v0l: t, v0h: e, v1l: r, v1h: n, v2l: o, v2h: i, v3l: s, v3h: a, v4l: c, v4h: u, v5l: f, v5h: h, v6l: l, v6h: d, v7l: p, v7h: y} = this;
                return [t, e, r, n, o, i, s, a, c, u, f, h, l, d, p, y]
            }
            set(t, e, r, n, o, i, s, a, c, u, f, h, l, d, p, y) {
                this.v0l = 0 | t,
                this.v0h = 0 | e,
                this.v1l = 0 | r,
                this.v1h = 0 | n,
                this.v2l = 0 | o,
                this.v2h = 0 | i,
                this.v3l = 0 | s,
                this.v3h = 0 | a,
                this.v4l = 0 | c,
                this.v4h = 0 | u,
                this.v5l = 0 | f,
                this.v5h = 0 | h,
                this.v6l = 0 | l,
                this.v6h = 0 | d,
                this.v7l = 0 | p,
                this.v7h = 0 | y
            }
            compress(t, e, r) {
                this.get().forEach(((t,e)=>ot[e] = t)),
                ot.set(nt, 16);
                let {h: n, l: o} = rt.fromBig(BigInt(this.length));
                ot[24] = nt[8] ^ o,
                ot[25] = nt[9] ^ n,
                r && (ot[28] = ~ot[28],
                ot[29] = ~ot[29]);
                let i = 0;
                const s = Z;
                for (let r = 0; r < 12; r++)
                    it(0, 4, 8, 12, t, e + 2 * s[i++]),
                    st(0, 4, 8, 12, t, e + 2 * s[i++]),
                    it(1, 5, 9, 13, t, e + 2 * s[i++]),
                    st(1, 5, 9, 13, t, e + 2 * s[i++]),
                    it(2, 6, 10, 14, t, e + 2 * s[i++]),
                    st(2, 6, 10, 14, t, e + 2 * s[i++]),
                    it(3, 7, 11, 15, t, e + 2 * s[i++]),
                    st(3, 7, 11, 15, t, e + 2 * s[i++]),
                    it(0, 5, 10, 15, t, e + 2 * s[i++]),
                    st(0, 5, 10, 15, t, e + 2 * s[i++]),
                    it(1, 6, 11, 12, t, e + 2 * s[i++]),
                    st(1, 6, 11, 12, t, e + 2 * s[i++]),
                    it(2, 7, 8, 13, t, e + 2 * s[i++]),
                    st(2, 7, 8, 13, t, e + 2 * s[i++]),
                    it(3, 4, 9, 14, t, e + 2 * s[i++]),
                    st(3, 4, 9, 14, t, e + 2 * s[i++]);
                this.v0l ^= ot[0] ^ ot[16],
                this.v0h ^= ot[1] ^ ot[17],
                this.v1l ^= ot[2] ^ ot[18],
                this.v1h ^= ot[3] ^ ot[19],
                this.v2l ^= ot[4] ^ ot[20],
                this.v2h ^= ot[5] ^ ot[21],
                this.v3l ^= ot[6] ^ ot[22],
                this.v3h ^= ot[7] ^ ot[23],
                this.v4l ^= ot[8] ^ ot[24],
                this.v4h ^= ot[9] ^ ot[25],
                this.v5l ^= ot[10] ^ ot[26],
                this.v5h ^= ot[11] ^ ot[27],
                this.v6l ^= ot[12] ^ ot[28],
                this.v6h ^= ot[13] ^ ot[29],
                this.v7l ^= ot[14] ^ ot[30],
                this.v7h ^= ot[15] ^ ot[31],
                ot.fill(0)
            }
            destroy() {
                this.destroyed = !0,
                this.buffer32.fill(0),
                this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            }
        }
        const ct = function(t) {
            const e = (e,r)=>t(r).update(R(e)).digest()
              , r = t({});
            return e.outputLen = r.outputLen,
            e.blockLen = r.blockLen,
            e.create = e=>t(e),
            e
        }((t=>new at(t)));
        class ut extends TypeError {
            constructor(t, e) {
                let r;
                const {message: n, explanation: o, ...i} = t
                  , {path: s} = t
                  , a = 0 === s.length ? n : `At path: ${s.join(".")} -- ${n}`;
                super(o ?? a),
                null != o && (this.cause = a),
                Object.assign(this, i),
                this.name = this.constructor.name,
                this.failures = ()=>r ?? (r = [t, ...e()])
            }
        }
        function ft(t) {
            return "object" == typeof t && null != t
        }
        function ht(t) {
            return "symbol" == typeof t ? t.toString() : "string" == typeof t ? JSON.stringify(t) : `${t}`
        }
        function lt(t, e, r, n) {
            if (!0 === t)
                return;
            !1 === t ? t = {} : "string" == typeof t && (t = {
                message: t
            });
            const {path: o, branch: i} = e
              , {type: s} = r
              , {refinement: a, message: c=`Expected a value of type \`${s}\`${a ? ` with refinement \`${a}\`` : ""}, but received: \`${ht(n)}\``} = t;
            return {
                value: n,
                type: s,
                refinement: a,
                key: o[o.length - 1],
                path: o,
                branch: i,
                ...t,
                message: c
            }
        }
        function *dt(t, e, r, n) {
            var o;
            ft(o = t) && "function" == typeof o[Symbol.iterator] || (t = [t]);
            for (const o of t) {
                const t = lt(o, e, r, n);
                t && (yield t)
            }
        }
        function *pt(t, e, r={}) {
            const {path: n=[], branch: o=[t], coerce: i=!1, mask: s=!1} = r
              , a = {
                path: n,
                branch: o
            };
            if (i && (t = e.coercer(t, a),
            s && "type" !== e.type && ft(e.schema) && ft(t) && !Array.isArray(t)))
                for (const r in t)
                    void 0 === e.schema[r] && delete t[r];
            let c = "valid";
            for (const n of e.validator(t, a))
                n.explanation = r.message,
                c = "not_valid",
                yield[n, void 0];
            for (let[u,f,h] of e.entries(t, a)) {
                const e = pt(f, h, {
                    path: void 0 === u ? n : [...n, u],
                    branch: void 0 === u ? o : [...o, f],
                    coerce: i,
                    mask: s,
                    message: r.message
                });
                for (const r of e)
                    r[0] ? (c = null != r[0].refinement ? "not_refined" : "not_valid",
                    yield[r[0], void 0]) : i && (f = r[1],
                    void 0 === u ? t = f : t instanceof Map ? t.set(u, f) : t instanceof Set ? t.add(f) : ft(t) && (void 0 !== f || u in t) && (t[u] = f))
            }
            if ("not_valid" !== c)
                for (const n of e.refiner(t, a))
                    n.explanation = r.message,
                    c = "not_refined",
                    yield[n, void 0];
            "valid" === c && (yield[void 0, t])
        }
        class yt {
            constructor(t) {
                const {type: e, schema: r, validator: n, refiner: o, coercer: i=(t=>t), entries: s=function*() {}
                } = t;
                this.type = e,
                this.schema = r,
                this.entries = s,
                this.coercer = i,
                this.validator = n ? (t,e)=>dt(n(t, e), e, this, t) : ()=>[],
                this.refiner = o ? (t,e)=>dt(o(t, e), e, this, t) : ()=>[]
            }
            assert(t, e) {
                return gt(t, this, e)
            }
            create(t, e) {
                return wt(t, this, e)
            }
            is(t) {
                return mt(t, this)
            }
            mask(t, e) {
                return bt(t, this, e)
            }
            validate(t, e={}) {
                return vt(t, this, e)
            }
        }
        function gt(t, e, r) {
            const n = vt(t, e, {
                message: r
            });
            if (n[0])
                throw n[0]
        }
        function wt(t, e, r) {
            const n = vt(t, e, {
                coerce: !0,
                message: r
            });
            if (n[0])
                throw n[0];
            return n[1]
        }
        function bt(t, e, r) {
            const n = vt(t, e, {
                coerce: !0,
                mask: !0,
                message: r
            });
            if (n[0])
                throw n[0];
            return n[1]
        }
        function mt(t, e) {
            return !vt(t, e)[0]
        }
        function vt(t, e, r={}) {
            const n = pt(t, e, r)
              , o = function(t) {
                const {done: e, value: r} = t.next();
                return e ? void 0 : r
            }(n);
            return o[0] ? [new ut(o[0],(function*() {
                for (const t of n)
                    t[0] && (yield t[0])
            }
            )), void 0] : [void 0, o[1]]
        }
        function Et(...t) {
            const e = "type" === t[0].type
              , r = t.map((t=>t.schema))
              , n = Object.assign({}, ...r);
            return e ? function(t) {
                const e = Object.keys(t);
                return new yt({
                    type: "type",
                    schema: t,
                    *entries(r) {
                        if (ft(r))
                            for (const n of e)
                                yield[n, r[n], t[n]]
                    },
                    validator: t=>ft(t) || `Expected an object, but received: ${ht(t)}`,
                    coercer: t=>ft(t) ? {
                        ...t
                    } : t
                })
            }(n) : kt(n)
        }
        function xt(t, e) {
            return new yt({
                type: t,
                schema: null,
                validator: e
            })
        }
        function At() {
            return xt("any", (()=>!0))
        }
        function St(t) {
            return new yt({
                type: "array",
                schema: t,
                *entries(e) {
                    if (t && Array.isArray(e))
                        for (const [r,n] of e.entries())
                            yield[r, n, t]
                },
                coercer: t=>Array.isArray(t) ? t.slice() : t,
                validator: t=>Array.isArray(t) || `Expected an array value, but received: ${ht(t)}`
            })
        }
        function Tt() {
            return xt("boolean", (t=>"boolean" == typeof t))
        }
        function Bt() {
            return xt("integer", (t=>"number" == typeof t && !isNaN(t) && Number.isInteger(t) || `Expected an integer, but received: ${ht(t)}`))
        }
        function It(t) {
            const e = ht(t)
              , r = typeof t;
            return new yt({
                type: "literal",
                schema: "string" === r || "number" === r || "boolean" === r ? t : null,
                validator: r=>r === t || `Expected the literal \`${e}\`, but received: ${ht(r)}`
            })
        }
        function Ot() {
            return xt("never", (()=>!1))
        }
        function Ut(t) {
            return new yt({
                ...t,
                validator: (e,r)=>null === e || t.validator(e, r),
                refiner: (e,r)=>null === e || t.refiner(e, r)
            })
        }
        function Mt() {
            return xt("number", (t=>"number" == typeof t && !isNaN(t) || `Expected a number, but received: ${ht(t)}`))
        }
        function kt(t) {
            const e = t ? Object.keys(t) : []
              , r = Ot();
            return new yt({
                type: "object",
                schema: t || null,
                *entries(n) {
                    if (t && ft(n)) {
                        const o = new Set(Object.keys(n));
                        for (const r of e)
                            o.delete(r),
                            yield[r, n[r], t[r]];
                        for (const t of o)
                            yield[t, n[t], r]
                    }
                },
                validator: t=>ft(t) || `Expected an object, but received: ${ht(t)}`,
                coercer: t=>ft(t) ? {
                    ...t
                } : t
            })
        }
        function jt(t) {
            return new yt({
                ...t,
                validator: (e,r)=>void 0 === e || t.validator(e, r),
                refiner: (e,r)=>void 0 === e || t.refiner(e, r)
            })
        }
        function Nt(t, e) {
            return new yt({
                type: "record",
                schema: null,
                *entries(r) {
                    if (ft(r))
                        for (const n in r) {
                            const o = r[n];
                            yield[n, n, t],
                            yield[n, o, e]
                        }
                },
                validator: t=>ft(t) || `Expected an object, but received: ${ht(t)}`
            })
        }
        function Lt() {
            return xt("string", (t=>"string" == typeof t || `Expected a string, but received: ${ht(t)}`))
        }
        function _t(t) {
            const e = Ot();
            return new yt({
                type: "tuple",
                schema: null,
                *entries(r) {
                    if (Array.isArray(r)) {
                        const n = Math.max(t.length, r.length);
                        for (let o = 0; o < n; o++)
                            yield[o, r[o], t[o] || e]
                    }
                },
                validator: t=>Array.isArray(t) || `Expected an array, but received: ${ht(t)}`
            })
        }
        function Dt(t) {
            const e = t.map((t=>t.type)).join(" | ");
            return new yt({
                type: "union",
                schema: null,
                coercer(e) {
                    for (const r of t) {
                        const [t,n] = r.validate(e, {
                            coerce: !0
                        });
                        if (!t)
                            return n
                    }
                    return e
                },
                validator(r, n) {
                    const o = [];
                    for (const e of t) {
                        const [...t] = pt(r, e, n)
                          , [i] = t;
                        if (!i[0])
                            return [];
                        for (const [e] of t)
                            e && o.push(e)
                    }
                    return [`Expected the value to satisfy a union of \`${e}\`, but received: ${ht(r)}`, ...o]
                }
            })
        }
        r(1513),
        BigInt(0);
        const Ct = BigInt(1)
          , Rt = BigInt(2)
          , Pt = t=>t instanceof Uint8Array
          , zt = Array.from({
            length: 256
        }, ((t,e)=>e.toString(16).padStart(2, "0")));
        function $t(t) {
            if (!Pt(t))
                throw new Error("Uint8Array expected");
            let e = "";
            for (let r = 0; r < t.length; r++)
                e += zt[t[r]];
            return e
        }
        function Ht(t) {
            if ("string" != typeof t)
                throw new Error("hex string expected, got " + typeof t);
            return BigInt("" === t ? "0" : `0x${t}`)
        }
        function Vt(t) {
            if ("string" != typeof t)
                throw new Error("hex string expected, got " + typeof t);
            if (t.length % 2)
                throw new Error("hex string is invalid: unpadded " + t.length);
            const e = new Uint8Array(t.length / 2);
            for (let r = 0; r < e.length; r++) {
                const n = 2 * r
                  , o = t.slice(n, n + 2)
                  , i = Number.parseInt(o, 16);
                if (Number.isNaN(i) || i < 0)
                    throw new Error("invalid byte sequence");
                e[r] = i
            }
            return e
        }
        function Ft(t) {
            return Ht($t(t))
        }
        function qt(t) {
            if (!Pt(t))
                throw new Error("Uint8Array expected");
            return Ht($t(Uint8Array.from(t).reverse()))
        }
        const Gt = (t,e)=>Vt(t.toString(16).padStart(2 * e, "0"))
          , Yt = (t,e)=>Gt(t, e).reverse();
        function Wt(t, e, r) {
            let n;
            if ("string" == typeof e)
                try {
                    n = Vt(e)
                } catch (r) {
                    throw new Error(`${t} must be valid hex string, got "${e}". Cause: ${r}`)
                }
            else {
                if (!Pt(e))
                    throw new Error(`${t} must be hex string or Uint8Array`);
                n = Uint8Array.from(e)
            }
            const o = n.length;
            if ("number" == typeof r && o !== r)
                throw new Error(`${t} expected ${r} bytes, got ${o}`);
            return n
        }
        function Kt(...t) {
            const e = new Uint8Array(t.reduce(((t,e)=>t + e.length), 0));
            let r = 0;
            return t.forEach((t=>{
                if (!Pt(t))
                    throw new Error("Uint8Array expected");
                e.set(t, r),
                r += t.length
            }
            )),
            e
        }
        function Qt(t) {
            if ("string" != typeof t)
                throw new Error("utf8ToBytes expected string, got " + typeof t);
            return (new TextEncoder).encode(t)
        }
        const Zt = t=>(Rt << BigInt(t - 1)) - Ct
          , Jt = t=>new Uint8Array(t)
          , Xt = t=>Uint8Array.from(t);
        function te(t, e, r) {
            if ("number" != typeof t || t < 2)
                throw new Error("hashLen must be a number");
            if ("number" != typeof e || e < 2)
                throw new Error("qByteLen must be a number");
            if ("function" != typeof r)
                throw new Error("hmacFn must be a function");
            let n = Jt(t)
              , o = Jt(t)
              , i = 0;
            const s = ()=>{
                n.fill(1),
                o.fill(0),
                i = 0
            }
              , a = (...t)=>r(o, n, ...t)
              , c = (t=Jt())=>{
                o = a(Xt([0]), t),
                n = a(),
                0 !== t.length && (o = a(Xt([1]), t),
                n = a())
            }
              , u = ()=>{
                if (i++ >= 1e3)
                    throw new Error("drbg: tried 1000 values");
                let t = 0;
                const r = [];
                for (; t < e; ) {
                    n = a();
                    const e = n.slice();
                    r.push(e),
                    t += n.length
                }
                return Kt(...r)
            }
            ;
            return (t,e)=>{
                let r;
                for (s(),
                c(t); !(r = e(u())); )
                    c();
                return s(),
                r
            }
        }
        const ee = {
            bigint: t=>"bigint" == typeof t,
            function: t=>"function" == typeof t,
            boolean: t=>"boolean" == typeof t,
            string: t=>"string" == typeof t,
            isSafeInteger: t=>Number.isSafeInteger(t),
            array: t=>Array.isArray(t),
            field: (t,e)=>e.Fp.isValid(t),
            hash: t=>"function" == typeof t && Number.isSafeInteger(t.outputLen)
        };
        function re(t, e, r={}) {
            const n = (e,r,n)=>{
                const o = ee[r];
                if ("function" != typeof o)
                    throw new Error(`Invalid validator "${r}", expected function`);
                const i = t[e];
                if (!(n && void 0 === i || o(i, t)))
                    throw new Error(`Invalid param ${String(e)}=${i} (${typeof i}), expected ${r}`)
            }
            ;
            for (const [t,r] of Object.entries(e))
                n(t, r, !1);
            for (const [t,e] of Object.entries(r))
                n(t, e, !0);
            return t
        }
        const ne = BigInt(0)
          , oe = BigInt(1)
          , ie = BigInt(2)
          , se = BigInt(3)
          , ae = BigInt(4)
          , ce = BigInt(5)
          , ue = BigInt(8);
        function fe(t, e) {
            const r = t % e;
            return r >= ne ? r : e + r
        }
        function he(t, e, r) {
            if (r <= ne || e < ne)
                throw new Error("Expected power/modulo > 0");
            if (r === oe)
                return ne;
            let n = oe;
            for (; e > ne; )
                e & oe && (n = n * t % r),
                t = t * t % r,
                e >>= oe;
            return n
        }
        function le(t, e, r) {
            let n = t;
            for (; e-- > ne; )
                n *= n,
                n %= r;
            return n
        }
        function de(t, e) {
            if (t === ne || e <= ne)
                throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);
            let r = fe(t, e)
              , n = e
              , o = ne
              , i = oe
              , s = oe
              , a = ne;
            for (; r !== ne; ) {
                const t = n / r
                  , e = n % r
                  , c = o - s * t
                  , u = i - a * t;
                n = r,
                r = e,
                o = s,
                i = a,
                s = c,
                a = u
            }
            if (n !== oe)
                throw new Error("invert: does not exist");
            return fe(o, e)
        }
        BigInt(9),
        BigInt(16);
        const pe = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
        function ye(t) {
            return re(t, pe.reduce(((t,e)=>(t[e] = "function",
            t)), {
                ORDER: "bigint",
                MASK: "bigint",
                BYTES: "isSafeInteger",
                BITS: "isSafeInteger"
            }))
        }
        function ge(t, e) {
            const r = void 0 !== e ? e : t.toString(2).length;
            return {
                nBitLength: r,
                nByteLength: Math.ceil(r / 8)
            }
        }
        const we = BigInt(0)
          , be = BigInt(1);
        function me(t) {
            return ye(t.Fp),
            re(t, {
                n: "bigint",
                h: "bigint",
                Gx: "field",
                Gy: "field"
            }, {
                nBitLength: "isSafeInteger",
                nByteLength: "isSafeInteger"
            }),
            Object.freeze({
                ...ge(t.n, t.nBitLength),
                ...t,
                p: t.Fp.ORDER
            })
        }
        const {bytesToNumberBE: ve, hexToBytes: Ee} = t
          , xe = {
            Err: class extends Error {
                constructor(t="") {
                    super(t)
                }
            }
            ,
            _parseInt(t) {
                const {Err: e} = xe;
                if (t.length < 2 || 2 !== t[0])
                    throw new e("Invalid signature integer tag");
                const r = t[1]
                  , n = t.subarray(2, r + 2);
                if (!r || n.length !== r)
                    throw new e("Invalid signature integer: wrong length");
                if (0 === n[0] && n[1] <= 127)
                    throw new e("Invalid signature integer: trailing length");
                return {
                    d: ve(n),
                    l: t.subarray(r + 2)
                }
            },
            toSig(t) {
                const {Err: e} = xe
                  , r = "string" == typeof t ? Ee(t) : t;
                if (!(r instanceof Uint8Array))
                    throw new Error("ui8a expected");
                let n = r.length;
                if (n < 2 || 48 != r[0])
                    throw new e("Invalid signature tag");
                if (r[1] !== n - 2)
                    throw new e("Invalid signature: incorrect length");
                const {d: o, l: i} = xe._parseInt(r.subarray(2))
                  , {d: s, l: a} = xe._parseInt(i);
                if (a.length)
                    throw new e("Invalid signature: left bytes after parsing");
                return {
                    r: o,
                    s
                }
            },
            hexFromSig(t) {
                const e = t=>Number.parseInt(t[0], 16) >= 8 ? "00" + t : t
                  , r = t=>{
                    const e = t.toString(16);
                    return 1 & e.length ? `0${e}` : e
                }
                  , n = e(r(t.s))
                  , o = e(r(t.r))
                  , i = n.length / 2
                  , s = o.length / 2
                  , a = r(i)
                  , c = r(s);
                return `30${r(s + i + 4)}02${c}${o}02${a}${n}`
            }
        }
          , Ae = BigInt(0)
          , Se = BigInt(1)
          , Te = BigInt(2)
          , Be = BigInt(3)
          , Ie = BigInt(4);
        function Oe(t) {
            const e = function(t) {
                const e = me(t);
                return re(e, {
                    hash: "hash",
                    hmac: "function",
                    randomBytes: "function"
                }, {
                    bits2int: "function",
                    bits2int_modN: "function",
                    lowS: "boolean"
                }),
                Object.freeze({
                    lowS: !0,
                    ...e
                })
            }(t)
              , {Fp: r, n} = e
              , o = r.BYTES + 1
              , i = 2 * r.BYTES + 1;
            function s(t) {
                return fe(t, n)
            }
            function a(t) {
                return de(t, n)
            }
            const {ProjectivePoint: c, normPrivateKeyToScalar: u, weierstrassEquation: f, isWithinCurveOrder: h} = function(t) {
                const e = function(t) {
                    const e = me(t);
                    re(e, {
                        a: "field",
                        b: "field"
                    }, {
                        allowedPrivateKeyLengths: "array",
                        wrapPrivateKey: "boolean",
                        isTorsionFree: "function",
                        clearCofactor: "function",
                        allowInfinityPoint: "boolean",
                        fromBytes: "function",
                        toBytes: "function"
                    });
                    const {endo: r, Fp: n, a: o} = e;
                    if (r) {
                        if (!n.eql(o, n.ZERO))
                            throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
                        if ("object" != typeof r || "bigint" != typeof r.beta || "function" != typeof r.splitScalar)
                            throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")
                    }
                    return Object.freeze({
                        ...e
                    })
                }(t)
                  , {Fp: r} = e
                  , n = e.toBytes || ((t,e,n)=>{
                    const o = e.toAffine();
                    return Kt(Uint8Array.from([4]), r.toBytes(o.x), r.toBytes(o.y))
                }
                )
                  , o = e.fromBytes || (t=>{
                    const e = t.subarray(1);
                    return {
                        x: r.fromBytes(e.subarray(0, r.BYTES)),
                        y: r.fromBytes(e.subarray(r.BYTES, 2 * r.BYTES))
                    }
                }
                );
                function i(t) {
                    const {a: n, b: o} = e
                      , i = r.sqr(t)
                      , s = r.mul(i, t);
                    return r.add(r.add(s, r.mul(t, n)), o)
                }
                function s(t) {
                    return "bigint" == typeof t && Ae < t && t < e.n
                }
                function a(t) {
                    if (!s(t))
                        throw new Error("Expected valid bigint: 0 < bigint < curve.n")
                }
                function c(t) {
                    const {allowedPrivateKeyLengths: r, nByteLength: n, wrapPrivateKey: o, n: i} = e;
                    if (r && "bigint" != typeof t) {
                        if (t instanceof Uint8Array && (t = $t(t)),
                        "string" != typeof t || !r.includes(t.length))
                            throw new Error("Invalid key");
                        t = t.padStart(2 * n, "0")
                    }
                    let s;
                    try {
                        s = "bigint" == typeof t ? t : Ft(Wt("private key", t, n))
                    } catch (e) {
                        throw new Error(`private key must be ${n} bytes, hex or bigint, not ${typeof t}`)
                    }
                    return o && (s = fe(s, i)),
                    a(s),
                    s
                }
                const u = new Map;
                function f(t) {
                    if (!(t instanceof h))
                        throw new Error("ProjectivePoint expected")
                }
                class h {
                    constructor(t, e, n) {
                        if (this.px = t,
                        this.py = e,
                        this.pz = n,
                        null == t || !r.isValid(t))
                            throw new Error("x required");
                        if (null == e || !r.isValid(e))
                            throw new Error("y required");
                        if (null == n || !r.isValid(n))
                            throw new Error("z required")
                    }
                    static fromAffine(t) {
                        const {x: e, y: n} = t || {};
                        if (!t || !r.isValid(e) || !r.isValid(n))
                            throw new Error("invalid affine point");
                        if (t instanceof h)
                            throw new Error("projective point not allowed");
                        const o = t=>r.eql(t, r.ZERO);
                        return o(e) && o(n) ? h.ZERO : new h(e,n,r.ONE)
                    }
                    get x() {
                        return this.toAffine().x
                    }
                    get y() {
                        return this.toAffine().y
                    }
                    static normalizeZ(t) {
                        const e = r.invertBatch(t.map((t=>t.pz)));
                        return t.map(((t,r)=>t.toAffine(e[r]))).map(h.fromAffine)
                    }
                    static fromHex(t) {
                        const e = h.fromAffine(o(Wt("pointHex", t)));
                        return e.assertValidity(),
                        e
                    }
                    static fromPrivateKey(t) {
                        return h.BASE.multiply(c(t))
                    }
                    _setWindowSize(t) {
                        this._WINDOW_SIZE = t,
                        u.delete(this)
                    }
                    assertValidity() {
                        if (this.is0()) {
                            if (e.allowInfinityPoint)
                                return;
                            throw new Error("bad point: ZERO")
                        }
                        const {x: t, y: n} = this.toAffine();
                        if (!r.isValid(t) || !r.isValid(n))
                            throw new Error("bad point: x or y not FE");
                        const o = r.sqr(n)
                          , s = i(t);
                        if (!r.eql(o, s))
                            throw new Error("bad point: equation left != right");
                        if (!this.isTorsionFree())
                            throw new Error("bad point: not in prime-order subgroup")
                    }
                    hasEvenY() {
                        const {y: t} = this.toAffine();
                        if (r.isOdd)
                            return !r.isOdd(t);
                        throw new Error("Field doesn't support isOdd")
                    }
                    equals(t) {
                        f(t);
                        const {px: e, py: n, pz: o} = this
                          , {px: i, py: s, pz: a} = t
                          , c = r.eql(r.mul(e, a), r.mul(i, o))
                          , u = r.eql(r.mul(n, a), r.mul(s, o));
                        return c && u
                    }
                    negate() {
                        return new h(this.px,r.neg(this.py),this.pz)
                    }
                    double() {
                        const {a: t, b: n} = e
                          , o = r.mul(n, Be)
                          , {px: i, py: s, pz: a} = this;
                        let c = r.ZERO
                          , u = r.ZERO
                          , f = r.ZERO
                          , l = r.mul(i, i)
                          , d = r.mul(s, s)
                          , p = r.mul(a, a)
                          , y = r.mul(i, s);
                        return y = r.add(y, y),
                        f = r.mul(i, a),
                        f = r.add(f, f),
                        c = r.mul(t, f),
                        u = r.mul(o, p),
                        u = r.add(c, u),
                        c = r.sub(d, u),
                        u = r.add(d, u),
                        u = r.mul(c, u),
                        c = r.mul(y, c),
                        f = r.mul(o, f),
                        p = r.mul(t, p),
                        y = r.sub(l, p),
                        y = r.mul(t, y),
                        y = r.add(y, f),
                        f = r.add(l, l),
                        l = r.add(f, l),
                        l = r.add(l, p),
                        l = r.mul(l, y),
                        u = r.add(u, l),
                        p = r.mul(s, a),
                        p = r.add(p, p),
                        l = r.mul(p, y),
                        c = r.sub(c, l),
                        f = r.mul(p, d),
                        f = r.add(f, f),
                        f = r.add(f, f),
                        new h(c,u,f)
                    }
                    add(t) {
                        f(t);
                        const {px: n, py: o, pz: i} = this
                          , {px: s, py: a, pz: c} = t;
                        let u = r.ZERO
                          , l = r.ZERO
                          , d = r.ZERO;
                        const p = e.a
                          , y = r.mul(e.b, Be);
                        let g = r.mul(n, s)
                          , w = r.mul(o, a)
                          , b = r.mul(i, c)
                          , m = r.add(n, o)
                          , v = r.add(s, a);
                        m = r.mul(m, v),
                        v = r.add(g, w),
                        m = r.sub(m, v),
                        v = r.add(n, i);
                        let E = r.add(s, c);
                        return v = r.mul(v, E),
                        E = r.add(g, b),
                        v = r.sub(v, E),
                        E = r.add(o, i),
                        u = r.add(a, c),
                        E = r.mul(E, u),
                        u = r.add(w, b),
                        E = r.sub(E, u),
                        d = r.mul(p, v),
                        u = r.mul(y, b),
                        d = r.add(u, d),
                        u = r.sub(w, d),
                        d = r.add(w, d),
                        l = r.mul(u, d),
                        w = r.add(g, g),
                        w = r.add(w, g),
                        b = r.mul(p, b),
                        v = r.mul(y, v),
                        w = r.add(w, b),
                        b = r.sub(g, b),
                        b = r.mul(p, b),
                        v = r.add(v, b),
                        g = r.mul(w, v),
                        l = r.add(l, g),
                        g = r.mul(E, v),
                        u = r.mul(m, u),
                        u = r.sub(u, g),
                        g = r.mul(m, w),
                        d = r.mul(E, d),
                        d = r.add(d, g),
                        new h(u,l,d)
                    }
                    subtract(t) {
                        return this.add(t.negate())
                    }
                    is0() {
                        return this.equals(h.ZERO)
                    }
                    wNAF(t) {
                        return d.wNAFCached(this, u, t, (t=>{
                            const e = r.invertBatch(t.map((t=>t.pz)));
                            return t.map(((t,r)=>t.toAffine(e[r]))).map(h.fromAffine)
                        }
                        ))
                    }
                    multiplyUnsafe(t) {
                        const n = h.ZERO;
                        if (t === Ae)
                            return n;
                        if (a(t),
                        t === Se)
                            return this;
                        const {endo: o} = e;
                        if (!o)
                            return d.unsafeLadder(this, t);
                        let {k1neg: i, k1: s, k2neg: c, k2: u} = o.splitScalar(t)
                          , f = n
                          , l = n
                          , p = this;
                        for (; s > Ae || u > Ae; )
                            s & Se && (f = f.add(p)),
                            u & Se && (l = l.add(p)),
                            p = p.double(),
                            s >>= Se,
                            u >>= Se;
                        return i && (f = f.negate()),
                        c && (l = l.negate()),
                        l = new h(r.mul(l.px, o.beta),l.py,l.pz),
                        f.add(l)
                    }
                    multiply(t) {
                        a(t);
                        let n, o, i = t;
                        const {endo: s} = e;
                        if (s) {
                            const {k1neg: t, k1: e, k2neg: a, k2: c} = s.splitScalar(i);
                            let {p: u, f} = this.wNAF(e)
                              , {p: l, f: p} = this.wNAF(c);
                            u = d.constTimeNegate(t, u),
                            l = d.constTimeNegate(a, l),
                            l = new h(r.mul(l.px, s.beta),l.py,l.pz),
                            n = u.add(l),
                            o = f.add(p)
                        } else {
                            const {p: t, f: e} = this.wNAF(i);
                            n = t,
                            o = e
                        }
                        return h.normalizeZ([n, o])[0]
                    }
                    multiplyAndAddUnsafe(t, e, r) {
                        const n = h.BASE
                          , o = (t,e)=>e !== Ae && e !== Se && t.equals(n) ? t.multiply(e) : t.multiplyUnsafe(e)
                          , i = o(this, e).add(o(t, r));
                        return i.is0() ? void 0 : i
                    }
                    toAffine(t) {
                        const {px: e, py: n, pz: o} = this
                          , i = this.is0();
                        null == t && (t = i ? r.ONE : r.inv(o));
                        const s = r.mul(e, t)
                          , a = r.mul(n, t)
                          , c = r.mul(o, t);
                        if (i)
                            return {
                                x: r.ZERO,
                                y: r.ZERO
                            };
                        if (!r.eql(c, r.ONE))
                            throw new Error("invZ was invalid");
                        return {
                            x: s,
                            y: a
                        }
                    }
                    isTorsionFree() {
                        const {h: t, isTorsionFree: r} = e;
                        if (t === Se)
                            return !0;
                        if (r)
                            return r(h, this);
                        throw new Error("isTorsionFree() has not been declared for the elliptic curve")
                    }
                    clearCofactor() {
                        const {h: t, clearCofactor: r} = e;
                        return t === Se ? this : r ? r(h, this) : this.multiplyUnsafe(e.h)
                    }
                    toRawBytes(t=!0) {
                        return this.assertValidity(),
                        n(h, this, t)
                    }
                    toHex(t=!0) {
                        return $t(this.toRawBytes(t))
                    }
                }
                h.BASE = new h(e.Gx,e.Gy,r.ONE),
                h.ZERO = new h(r.ZERO,r.ONE,r.ZERO);
                const l = e.nBitLength
                  , d = function(t, e) {
                    const r = (t,e)=>{
                        const r = e.negate();
                        return t ? r : e
                    }
                      , n = t=>({
                        windows: Math.ceil(e / t) + 1,
                        windowSize: 2 ** (t - 1)
                    });
                    return {
                        constTimeNegate: r,
                        unsafeLadder(e, r) {
                            let n = t.ZERO
                              , o = e;
                            for (; r > we; )
                                r & be && (n = n.add(o)),
                                o = o.double(),
                                r >>= be;
                            return n
                        },
                        precomputeWindow(t, e) {
                            const {windows: r, windowSize: o} = n(e)
                              , i = [];
                            let s = t
                              , a = s;
                            for (let t = 0; t < r; t++) {
                                a = s,
                                i.push(a);
                                for (let t = 1; t < o; t++)
                                    a = a.add(s),
                                    i.push(a);
                                s = a.double()
                            }
                            return i
                        },
                        wNAF(e, o, i) {
                            const {windows: s, windowSize: a} = n(e);
                            let c = t.ZERO
                              , u = t.BASE;
                            const f = BigInt(2 ** e - 1)
                              , h = 2 ** e
                              , l = BigInt(e);
                            for (let t = 0; t < s; t++) {
                                const e = t * a;
                                let n = Number(i & f);
                                i >>= l,
                                n > a && (n -= h,
                                i += be);
                                const s = e
                                  , d = e + Math.abs(n) - 1
                                  , p = t % 2 != 0
                                  , y = n < 0;
                                0 === n ? u = u.add(r(p, o[s])) : c = c.add(r(y, o[d]))
                            }
                            return {
                                p: c,
                                f: u
                            }
                        },
                        wNAFCached(t, e, r, n) {
                            const o = t._WINDOW_SIZE || 1;
                            let i = e.get(t);
                            return i || (i = this.precomputeWindow(t, o),
                            1 !== o && e.set(t, n(i))),
                            this.wNAF(o, i, r)
                        }
                    }
                }(h, e.endo ? Math.ceil(l / 2) : l);
                return {
                    CURVE: e,
                    ProjectivePoint: h,
                    normPrivateKeyToScalar: c,
                    weierstrassEquation: i,
                    isWithinCurveOrder: s
                }
            }({
                ...e,
                toBytes(t, e, n) {
                    const o = e.toAffine()
                      , i = r.toBytes(o.x)
                      , s = Kt;
                    return n ? s(Uint8Array.from([e.hasEvenY() ? 2 : 3]), i) : s(Uint8Array.from([4]), i, r.toBytes(o.y))
                },
                fromBytes(t) {
                    const e = t.length
                      , n = t[0]
                      , s = t.subarray(1);
                    if (e !== o || 2 !== n && 3 !== n) {
                        if (e === i && 4 === n)
                            return {
                                x: r.fromBytes(s.subarray(0, r.BYTES)),
                                y: r.fromBytes(s.subarray(r.BYTES, 2 * r.BYTES))
                            };
                        throw new Error(`Point of length ${e} was invalid. Expected ${o} compressed bytes or ${i} uncompressed bytes`)
                    }
                    {
                        const t = Ft(s);
                        if (!(Ae < (a = t) && a < r.ORDER))
                            throw new Error("Point is not on curve");
                        const e = f(t);
                        let o = r.sqrt(e);
                        return 1 == (1 & n) != ((o & Se) === Se) && (o = r.neg(o)),
                        {
                            x: t,
                            y: o
                        }
                    }
                    var a
                }
            })
              , l = t=>$t(Gt(t, e.nByteLength));
            function d(t) {
                return t > n >> Se
            }
            const p = (t,e,r)=>Ft(t.slice(e, r));
            class y {
                constructor(t, e, r) {
                    this.r = t,
                    this.s = e,
                    this.recovery = r,
                    this.assertValidity()
                }
                static fromCompact(t) {
                    const r = e.nByteLength;
                    return t = Wt("compactSignature", t, 2 * r),
                    new y(p(t, 0, r),p(t, r, 2 * r))
                }
                static fromDER(t) {
                    const {r: e, s: r} = xe.toSig(Wt("DER", t));
                    return new y(e,r)
                }
                assertValidity() {
                    if (!h(this.r))
                        throw new Error("r must be 0 < r < CURVE.n");
                    if (!h(this.s))
                        throw new Error("s must be 0 < s < CURVE.n")
                }
                addRecoveryBit(t) {
                    return new y(this.r,this.s,t)
                }
                recoverPublicKey(t) {
                    const {r: n, s: o, recovery: i} = this
                      , u = m(Wt("msgHash", t));
                    if (null == i || ![0, 1, 2, 3].includes(i))
                        throw new Error("recovery id invalid");
                    const f = 2 === i || 3 === i ? n + e.n : n;
                    if (f >= r.ORDER)
                        throw new Error("recovery id 2 or 3 invalid");
                    const h = 0 == (1 & i) ? "02" : "03"
                      , d = c.fromHex(h + l(f))
                      , p = a(f)
                      , y = s(-u * p)
                      , g = s(o * p)
                      , w = c.BASE.multiplyAndAddUnsafe(d, y, g);
                    if (!w)
                        throw new Error("point at infinify");
                    return w.assertValidity(),
                    w
                }
                hasHighS() {
                    return d(this.s)
                }
                normalizeS() {
                    return this.hasHighS() ? new y(this.r,s(-this.s),this.recovery) : this
                }
                toDERRawBytes() {
                    return Vt(this.toDERHex())
                }
                toDERHex() {
                    return xe.hexFromSig({
                        r: this.r,
                        s: this.s
                    })
                }
                toCompactRawBytes() {
                    return Vt(this.toCompactHex())
                }
                toCompactHex() {
                    return l(this.r) + l(this.s)
                }
            }
            const g = {
                isValidPrivateKey(t) {
                    try {
                        return u(t),
                        !0
                    } catch (t) {
                        return !1
                    }
                },
                normPrivateKeyToScalar: u,
                randomPrivateKey: ()=>{
                    const t = function(t, e, r=!1) {
                        const n = (t = Wt("privateHash", t)).length
                          , o = ge(e).nByteLength + 8;
                        if (o < 24 || n < o || n > 1024)
                            throw new Error(`hashToPrivateScalar: expected ${o}-1024 bytes of input, got ${n}`);
                        return fe(r ? qt(t) : Ft(t), e - oe) + oe
                    }(e.randomBytes(r.BYTES + 8), n);
                    return Gt(t, e.nByteLength)
                }
                ,
                precompute: (t=8,e=c.BASE)=>(e._setWindowSize(t),
                e.multiply(BigInt(3)),
                e)
            };
            function w(t) {
                const e = t instanceof Uint8Array
                  , r = "string" == typeof t
                  , n = (e || r) && t.length;
                return e ? n === o || n === i : r ? n === 2 * o || n === 2 * i : t instanceof c
            }
            const b = e.bits2int || function(t) {
                const r = Ft(t)
                  , n = 8 * t.length - e.nBitLength;
                return n > 0 ? r >> BigInt(n) : r
            }
              , m = e.bits2int_modN || function(t) {
                return s(b(t))
            }
              , v = Zt(e.nBitLength);
            function E(t) {
                if ("bigint" != typeof t)
                    throw new Error("bigint expected");
                if (!(Ae <= t && t < v))
                    throw new Error(`bigint expected < 2^${e.nBitLength}`);
                return Gt(t, e.nByteLength)
            }
            const x = {
                lowS: e.lowS,
                prehash: !1
            }
              , A = {
                lowS: e.lowS,
                prehash: !1
            };
            return c.BASE._setWindowSize(8),
            {
                CURVE: e,
                getPublicKey: function(t, e=!0) {
                    return c.fromPrivateKey(t).toRawBytes(e)
                },
                getSharedSecret: function(t, e, r=!0) {
                    if (w(t))
                        throw new Error("first arg must be private key");
                    if (!w(e))
                        throw new Error("second arg must be public key");
                    return c.fromHex(e).multiply(u(t)).toRawBytes(r)
                },
                sign: function(t, n, o=x) {
                    const {seed: i, k2sig: f} = function(t, n, o=x) {
                        if (["recovered", "canonical"].some((t=>t in o)))
                            throw new Error("sign() legacy options not supported");
                        const {hash: i, randomBytes: f} = e;
                        let {lowS: l, prehash: p, extraEntropy: g} = o;
                        null == l && (l = !0),
                        t = Wt("msgHash", t),
                        p && (t = Wt("prehashed msgHash", i(t)));
                        const w = m(t)
                          , v = u(n)
                          , A = [E(v), E(w)];
                        if (null != g) {
                            const t = !0 === g ? f(r.BYTES) : g;
                            A.push(Wt("extraEntropy", t, r.BYTES))
                        }
                        const S = Kt(...A)
                          , T = w;
                        return {
                            seed: S,
                            k2sig: function(t) {
                                const e = b(t);
                                if (!h(e))
                                    return;
                                const r = a(e)
                                  , n = c.BASE.multiply(e).toAffine()
                                  , o = s(n.x);
                                if (o === Ae)
                                    return;
                                const i = s(r * s(T + o * v));
                                if (i === Ae)
                                    return;
                                let u = (n.x === o ? 0 : 2) | Number(n.y & Se)
                                  , f = i;
                                return l && d(i) && (f = function(t) {
                                    return d(t) ? s(-t) : t
                                }(i),
                                u ^= 1),
                                new y(o,f,u)
                            }
                        }
                    }(t, n, o);
                    return te(e.hash.outputLen, e.nByteLength, e.hmac)(i, f)
                },
                verify: function(t, r, n, o=A) {
                    const i = t;
                    if (r = Wt("msgHash", r),
                    n = Wt("publicKey", n),
                    "strict"in o)
                        throw new Error("options.strict was renamed to lowS");
                    const {lowS: u, prehash: f} = o;
                    let h, l;
                    try {
                        if ("string" == typeof i || i instanceof Uint8Array)
                            try {
                                h = y.fromDER(i)
                            } catch (t) {
                                if (!(t instanceof xe.Err))
                                    throw t;
                                h = y.fromCompact(i)
                            }
                        else {
                            if ("object" != typeof i || "bigint" != typeof i.r || "bigint" != typeof i.s)
                                throw new Error("PARSE");
                            {
                                const {r: t, s: e} = i;
                                h = new y(t,e)
                            }
                        }
                        l = c.fromHex(n)
                    } catch (t) {
                        if ("PARSE" === t.message)
                            throw new Error("signature must be Signature instance, Uint8Array or hex string");
                        return !1
                    }
                    if (u && h.hasHighS())
                        return !1;
                    f && (r = e.hash(r));
                    const {r: d, s: p} = h
                      , g = m(r)
                      , w = a(p)
                      , b = s(g * w)
                      , v = s(d * w)
                      , E = c.BASE.multiplyAndAddUnsafe(l, b, v)?.toAffine();
                    return !!E && s(E.x) === d
                },
                ProjectivePoint: c,
                Signature: y,
                utils: g
            }
        }
        const Ue = Ft;
        function Me(t, e) {
            if (t < 0 || t >= 1 << 8 * e)
                throw new Error(`bad I2OSP call: value=${t} length=${e}`);
            const r = Array.from({
                length: e
            }).fill(0);
            for (let n = e - 1; n >= 0; n--)
                r[n] = 255 & t,
                t >>>= 8;
            return new Uint8Array(r)
        }
        function ke(t, e) {
            const r = new Uint8Array(t.length);
            for (let n = 0; n < t.length; n++)
                r[n] = t[n] ^ e[n];
            return r
        }
        function je(t) {
            if (!(t instanceof Uint8Array))
                throw new Error("Uint8Array expected")
        }
        function Ne(t) {
            if (!Number.isSafeInteger(t))
                throw new Error("number expected")
        }
        function Le(t, e, r) {
            re(r, {
                DST: "string",
                p: "bigint",
                m: "isSafeInteger",
                k: "isSafeInteger",
                hash: "hash"
            });
            const {p: n, k: o, m: i, hash: s, expand: a, DST: c} = r;
            je(t),
            Ne(e);
            const u = function(t) {
                if (t instanceof Uint8Array)
                    return t;
                if ("string" == typeof t)
                    return Qt(t);
                throw new Error("DST must be Uint8Array or string")
            }(c)
              , f = n.toString(2).length
              , h = Math.ceil((f + o) / 8)
              , l = e * i * h;
            let d;
            if ("xmd" === a)
                d = function(t, e, r, n) {
                    je(t),
                    je(e),
                    Ne(r),
                    e.length > 255 && (e = n(Kt(Qt("H2C-OVERSIZE-DST-"), e)));
                    const {outputLen: o, blockLen: i} = n
                      , s = Math.ceil(r / o);
                    if (s > 255)
                        throw new Error("Invalid xmd length");
                    const a = Kt(e, Me(e.length, 1))
                      , c = Me(0, i)
                      , u = Me(r, 2)
                      , f = new Array(s)
                      , h = n(Kt(c, t, u, Me(0, 1), a));
                    f[0] = n(Kt(h, Me(1, 1), a));
                    for (let t = 1; t <= s; t++) {
                        const e = [ke(h, f[t - 1]), Me(t + 1, 1), a];
                        f[t] = n(Kt(...e))
                    }
                    return Kt(...f).slice(0, r)
                }(t, u, l, s);
            else if ("xof" === a)
                d = function(t, e, r, n, o) {
                    if (je(t),
                    je(e),
                    Ne(r),
                    e.length > 255) {
                        const t = Math.ceil(2 * n / 8);
                        e = o.create({
                            dkLen: t
                        }).update(Qt("H2C-OVERSIZE-DST-")).update(e).digest()
                    }
                    if (r > 65535 || e.length > 255)
                        throw new Error("expand_message_xof: invalid lenInBytes");
                    return o.create({
                        dkLen: r
                    }).update(t).update(Me(r, 2)).update(e).update(Me(e.length, 1)).digest()
                }(t, u, l, o, s);
            else {
                if (void 0 !== a)
                    throw new Error('expand must be "xmd", "xof" or undefined');
                d = t
            }
            const p = new Array(e);
            for (let t = 0; t < e; t++) {
                const e = new Array(i);
                for (let r = 0; r < i; r++) {
                    const o = h * (r + t * i)
                      , s = d.subarray(o, o + h);
                    e[r] = fe(Ue(s), n)
                }
                p[t] = e
            }
            return p
        }
        class _e extends z {
            constructor(t, e) {
                super(),
                this.finished = !1,
                this.destroyed = !1,
                j.hash(t);
                const r = R(e);
                if (this.iHash = t.create(),
                "function" != typeof this.iHash.update)
                    throw new TypeError("Expected instance of class which extends utils.Hash");
                this.blockLen = this.iHash.blockLen,
                this.outputLen = this.iHash.outputLen;
                const n = this.blockLen
                  , o = new Uint8Array(n);
                o.set(r.length > n ? t.create().update(r).digest() : r);
                for (let t = 0; t < o.length; t++)
                    o[t] ^= 54;
                this.iHash.update(o),
                this.oHash = t.create();
                for (let t = 0; t < o.length; t++)
                    o[t] ^= 106;
                this.oHash.update(o),
                o.fill(0)
            }
            update(t) {
                return j.exists(this),
                this.iHash.update(t),
                this
            }
            digestInto(t) {
                j.exists(this),
                j.bytes(t, this.outputLen),
                this.finished = !0,
                this.iHash.digestInto(t),
                this.oHash.update(t),
                this.oHash.digestInto(t),
                this.destroy()
            }
            digest() {
                const t = new Uint8Array(this.oHash.outputLen);
                return this.digestInto(t),
                t
            }
            _cloneInto(t) {
                t || (t = Object.create(Object.getPrototypeOf(this), {}));
                const {oHash: e, iHash: r, finished: n, destroyed: o, blockLen: i, outputLen: s} = this;
                return t.finished = n,
                t.destroyed = o,
                t.blockLen = i,
                t.outputLen = s,
                t.oHash = e._cloneInto(t.oHash),
                t.iHash = r._cloneInto(t.iHash),
                t
            }
            destroy() {
                this.destroyed = !0,
                this.oHash.destroy(),
                this.iHash.destroy()
            }
        }
        const De = (t,e,r)=>new _e(t,e).update(r).digest();
        function Ce(t) {
            return {
                hash: t,
                hmac: (e,...r)=>De(t, e, P(...r)),
                randomBytes: H
            }
        }
        De.create = (t,e)=>new _e(t,e);
        const Re = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")
          , Pe = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141")
          , ze = BigInt(1)
          , $e = BigInt(2)
          , He = (t,e)=>(t + e / $e) / e;
        function Ve(t) {
            const e = Re
              , r = BigInt(3)
              , n = BigInt(6)
              , o = BigInt(11)
              , i = BigInt(22)
              , s = BigInt(23)
              , a = BigInt(44)
              , c = BigInt(88)
              , u = t * t * t % e
              , f = u * u * t % e
              , h = le(f, r, e) * f % e
              , l = le(h, r, e) * f % e
              , d = le(l, $e, e) * u % e
              , p = le(d, o, e) * d % e
              , y = le(p, i, e) * p % e
              , g = le(y, a, e) * y % e
              , w = le(g, c, e) * g % e
              , b = le(w, a, e) * y % e
              , m = le(b, r, e) * f % e
              , v = le(m, s, e) * p % e
              , E = le(v, n, e) * u % e
              , x = le(E, $e, e);
            if (!Fe.eql(Fe.sqr(x), t))
                throw new Error("Cannot find square root");
            return x
        }
        const Fe = function(t, e, r=!1, n={}) {
            if (t <= ne)
                throw new Error(`Expected Fp ORDER > 0, got ${t}`);
            const {nBitLength: o, nByteLength: i} = ge(t, e);
            if (i > 2048)
                throw new Error("Field lengths over 2048 bytes are not supported");
            const s = function(t) {
                if (t % ae === se) {
                    const e = (t + oe) / ae;
                    return function(t, r) {
                        const n = t.pow(r, e);
                        if (!t.eql(t.sqr(n), r))
                            throw new Error("Cannot find square root");
                        return n
                    }
                }
                if (t % ue === ce) {
                    const e = (t - ce) / ue;
                    return function(t, r) {
                        const n = t.mul(r, ie)
                          , o = t.pow(n, e)
                          , i = t.mul(r, o)
                          , s = t.mul(t.mul(i, ie), o)
                          , a = t.mul(i, t.sub(s, t.ONE));
                        if (!t.eql(t.sqr(a), r))
                            throw new Error("Cannot find square root");
                        return a
                    }
                }
                return function(t) {
                    const e = (t - oe) / ie;
                    let r, n, o;
                    for (r = t - oe,
                    n = 0; r % ie === ne; r /= ie,
                    n++)
                        ;
                    for (o = ie; o < t && he(o, e, t) !== t - oe; o++)
                        ;
                    if (1 === n) {
                        const e = (t + oe) / ae;
                        return function(t, r) {
                            const n = t.pow(r, e);
                            if (!t.eql(t.sqr(n), r))
                                throw new Error("Cannot find square root");
                            return n
                        }
                    }
                    const i = (r + oe) / ie;
                    return function(t, s) {
                        if (t.pow(s, e) === t.neg(t.ONE))
                            throw new Error("Cannot find square root");
                        let a = n
                          , c = t.pow(t.mul(t.ONE, o), r)
                          , u = t.pow(s, i)
                          , f = t.pow(s, r);
                        for (; !t.eql(f, t.ONE); ) {
                            if (t.eql(f, t.ZERO))
                                return t.ZERO;
                            let e = 1;
                            for (let r = t.sqr(f); e < a && !t.eql(r, t.ONE); e++)
                                r = t.sqr(r);
                            const r = t.pow(c, oe << BigInt(a - e - 1));
                            c = t.sqr(r),
                            u = t.mul(u, r),
                            f = t.mul(f, c),
                            a = e
                        }
                        return u
                    }
                }(t)
            }(t)
              , a = Object.freeze({
                ORDER: t,
                BITS: o,
                BYTES: i,
                MASK: Zt(o),
                ZERO: ne,
                ONE: oe,
                create: e=>fe(e, t),
                isValid: e=>{
                    if ("bigint" != typeof e)
                        throw new Error("Invalid field element: expected bigint, got " + typeof e);
                    return ne <= e && e < t
                }
                ,
                is0: t=>t === ne,
                isOdd: t=>(t & oe) === oe,
                neg: e=>fe(-e, t),
                eql: (t,e)=>t === e,
                sqr: e=>fe(e * e, t),
                add: (e,r)=>fe(e + r, t),
                sub: (e,r)=>fe(e - r, t),
                mul: (e,r)=>fe(e * r, t),
                pow: (t,e)=>function(t, e, r) {
                    if (r < ne)
                        throw new Error("Expected power > 0");
                    if (r === ne)
                        return t.ONE;
                    if (r === oe)
                        return e;
                    let n = t.ONE
                      , o = e;
                    for (; r > ne; )
                        r & oe && (n = t.mul(n, o)),
                        o = t.sqr(o),
                        r >>= oe;
                    return n
                }(a, t, e),
                div: (e,r)=>fe(e * de(r, t), t),
                sqrN: t=>t * t,
                addN: (t,e)=>t + e,
                subN: (t,e)=>t - e,
                mulN: (t,e)=>t * e,
                inv: e=>de(e, t),
                sqrt: n.sqrt || (t=>s(a, t)),
                invertBatch: t=>function(t, e) {
                    const r = new Array(e.length)
                      , n = e.reduce(((e,n,o)=>t.is0(n) ? e : (r[o] = e,
                    t.mul(e, n))), t.ONE)
                      , o = t.inv(n);
                    return e.reduceRight(((e,n,o)=>t.is0(n) ? e : (r[o] = t.mul(e, r[o]),
                    t.mul(e, n))), o),
                    r
                }(a, t),
                cmov: (t,e,r)=>r ? e : t,
                toBytes: t=>r ? Yt(t, i) : Gt(t, i),
                fromBytes: t=>{
                    if (t.length !== i)
                        throw new Error(`Fp.fromBytes: expected ${i}, got ${t.length}`);
                    return r ? qt(t) : Ft(t)
                }
            });
            return Object.freeze(a)
        }(Re, void 0, void 0, {
            sqrt: Ve
        })
          , qe = function(t, e) {
            const r = e=>Oe({
                ...t,
                ...Ce(e)
            });
            return Object.freeze({
                ...r(e),
                create: r
            })
        }({
            a: BigInt(0),
            b: BigInt(7),
            Fp: Fe,
            n: Pe,
            Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
            Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
            h: BigInt(1),
            lowS: !0,
            endo: {
                beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
                splitScalar: t=>{
                    const e = Pe
                      , r = BigInt("0x3086d221a7d46bcde86c90e49284eb15")
                      , n = -ze * BigInt("0xe4437ed6010e88286f547fa90abfe4c3")
                      , o = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8")
                      , i = r
                      , s = BigInt("0x100000000000000000000000000000000")
                      , a = He(i * t, e)
                      , c = He(-n * t, e);
                    let u = fe(t - a * r - c * o, e)
                      , f = fe(-a * n - c * i, e);
                    const h = u > s
                      , l = f > s;
                    if (h && (u = e - u),
                    l && (f = e - f),
                    u > s || f > s)
                        throw new Error("splitScalar: Endomorphism failed, k=" + t);
                    return {
                        k1neg: h,
                        k1: u,
                        k2neg: l,
                        k2: f
                    }
                }
            }
        }, Q);
        BigInt(0);
        qe.ProjectivePoint;
        qe.utils.randomPrivateKey;
        const Ge = function(t, e) {
            const r = e.map((t=>Array.from(t).reverse()));
            return (e,n)=>{
                const [o,i,s,a] = r.map((r=>r.reduce(((r,n)=>t.add(t.mul(r, e), n)))));
                return e = t.div(o, i),
                n = t.mul(n, t.div(s, a)),
                {
                    x: e,
                    y: n
                }
            }
        }(Fe, [["0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7", "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581", "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262", "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"], ["0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b", "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14", "0x0000000000000000000000000000000000000000000000000000000000000001"], ["0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c", "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3", "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931", "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"], ["0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b", "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573", "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f", "0x0000000000000000000000000000000000000000000000000000000000000001"]].map((t=>t.map((t=>BigInt(t))))))
          , Ye = function(t, e) {
            if (ye(t),
            !t.isValid(e.A) || !t.isValid(e.B) || !t.isValid(e.Z))
                throw new Error("mapToCurveSimpleSWU: invalid opts");
            const r = function(t, e) {
                const r = t.ORDER;
                let n = Ae;
                for (let t = r - Se; t % Te === Ae; t /= Te)
                    n += Se;
                const o = n
                  , i = (r - Se) / Te ** o
                  , s = (i - Se) / Te
                  , a = Te ** o - Se
                  , c = Te ** (o - Se)
                  , u = t.pow(e, i)
                  , f = t.pow(e, (i + Se) / Te);
                let h = (e,r)=>{
                    let n = u
                      , i = t.pow(r, a)
                      , h = t.sqr(i);
                    h = t.mul(h, r);
                    let l = t.mul(e, h);
                    l = t.pow(l, s),
                    l = t.mul(l, i),
                    i = t.mul(l, r),
                    h = t.mul(l, e);
                    let d = t.mul(h, i);
                    l = t.pow(d, c);
                    let p = t.eql(l, t.ONE);
                    i = t.mul(h, f),
                    l = t.mul(d, n),
                    h = t.cmov(i, h, p),
                    d = t.cmov(l, d, p);
                    for (let e = o; e > 1; e--) {
                        let r = Te ** (e - Te)
                          , o = t.pow(d, r);
                        const s = t.eql(o, t.ONE);
                        i = t.mul(h, n),
                        n = t.mul(n, n),
                        o = t.mul(d, n),
                        h = t.cmov(i, h, s),
                        d = t.cmov(o, d, s)
                    }
                    return {
                        isValid: p,
                        value: h
                    }
                }
                ;
                if (t.ORDER % Ie === Be) {
                    const r = (t.ORDER - Be) / Ie
                      , n = t.sqrt(t.neg(e));
                    h = (e,o)=>{
                        let i = t.sqr(o);
                        const s = t.mul(e, o);
                        i = t.mul(i, s);
                        let a = t.pow(i, r);
                        a = t.mul(a, s);
                        const c = t.mul(a, n)
                          , u = t.mul(t.sqr(a), o)
                          , f = t.eql(u, e);
                        return {
                            isValid: f,
                            value: t.cmov(c, a, f)
                        }
                    }
                }
                return h
            }(t, e.Z);
            if (!t.isOdd)
                throw new Error("Fp.isOdd is not implemented!");
            return n=>{
                let o, i, s, a, c, u, f, h;
                o = t.sqr(n),
                o = t.mul(o, e.Z),
                i = t.sqr(o),
                i = t.add(i, o),
                s = t.add(i, t.ONE),
                s = t.mul(s, e.B),
                a = t.cmov(e.Z, t.neg(i), !t.eql(i, t.ZERO)),
                a = t.mul(a, e.A),
                i = t.sqr(s),
                u = t.sqr(a),
                c = t.mul(u, e.A),
                i = t.add(i, c),
                i = t.mul(i, s),
                u = t.mul(u, a),
                c = t.mul(u, e.B),
                i = t.add(i, c),
                f = t.mul(o, s);
                const {isValid: l, value: d} = r(i, u);
                h = t.mul(o, n),
                h = t.mul(h, d),
                f = t.cmov(f, s, l),
                h = t.cmov(h, d, l);
                const p = t.isOdd(n) === t.isOdd(h);
                return h = t.cmov(t.neg(h), h, p),
                f = t.div(f, a),
                {
                    x: f,
                    y: h
                }
            }
        }(Fe, {
            A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
            B: BigInt("1771"),
            Z: Fe.create(BigInt("-11"))
        })
          , {hashToCurve: We, encodeToCurve: Ke} = function(t, e, r) {
            return {
                hashToCurve(n, o) {
                    const i = Le(n, 2, {
                        ...r,
                        DST: r.DST,
                        ...o
                    })
                      , s = t.fromAffine(e(i[0]))
                      , a = t.fromAffine(e(i[1]))
                      , c = s.add(a).clearCofactor();
                    return c.assertValidity(),
                    c
                },
                encodeToCurve(n, o) {
                    const i = Le(n, 1, {
                        ...r,
                        DST: r.encodeDST,
                        ...o
                    })
                      , s = t.fromAffine(e(i[0])).clearCofactor();
                    return s.assertValidity(),
                    s
                }
            }
        }(qe.ProjectivePoint, (t=>{
            const {x: e, y: r} = Ye(Fe.create(t[0]));
            return Ge(e, r)
        }
        ), {
            DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
            encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
            p: Fe.ORDER,
            m: 1,
            k: 128,
            expand: "xmd",
            hash: Q
        });
        r(6587);
        const Qe = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8])
          , Ze = Uint8Array.from({
            length: 16
        }, ((t,e)=>e))
          , Je = Ze.map((t=>(9 * t + 5) % 16));
        let Xe = [Ze]
          , tr = [Je];
        for (let t = 0; t < 4; t++)
            for (let e of [Xe, tr])
                e.push(e[t].map((t=>Qe[t])));
        const er = [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7], [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9], [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6], [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]].map((t=>new Uint8Array(t)))
          , rr = Xe.map(((t,e)=>t.map((t=>er[e][t]))))
          , nr = tr.map(((t,e)=>t.map((t=>er[e][t]))))
          , or = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838])
          , ir = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0])
          , sr = (t,e)=>t << e | t >>> 32 - e;
        function ar(t, e, r, n) {
            return 0 === t ? e ^ r ^ n : 1 === t ? e & r | ~e & n : 2 === t ? (e | ~r) ^ n : 3 === t ? e & n | r & ~n : e ^ (r | ~n)
        }
        const cr = new Uint32Array(16);
        class ur extends V {
            constructor() {
                super(64, 20, 8, !0),
                this.h0 = 1732584193,
                this.h1 = -271733879,
                this.h2 = -1732584194,
                this.h3 = 271733878,
                this.h4 = -1009589776
            }
            get() {
                const {h0: t, h1: e, h2: r, h3: n, h4: o} = this;
                return [t, e, r, n, o]
            }
            set(t, e, r, n, o) {
                this.h0 = 0 | t,
                this.h1 = 0 | e,
                this.h2 = 0 | r,
                this.h3 = 0 | n,
                this.h4 = 0 | o
            }
            process(t, e) {
                for (let r = 0; r < 16; r++,
                e += 4)
                    cr[r] = t.getUint32(e, !0);
                let r = 0 | this.h0
                  , n = r
                  , o = 0 | this.h1
                  , i = o
                  , s = 0 | this.h2
                  , a = s
                  , c = 0 | this.h3
                  , u = c
                  , f = 0 | this.h4
                  , h = f;
                for (let t = 0; t < 5; t++) {
                    const e = 4 - t
                      , l = or[t]
                      , d = ir[t]
                      , p = Xe[t]
                      , y = tr[t]
                      , g = rr[t]
                      , w = nr[t];
                    for (let e = 0; e < 16; e++) {
                        const n = sr(r + ar(t, o, s, c) + cr[p[e]] + l, g[e]) + f | 0;
                        r = f,
                        f = c,
                        c = 0 | sr(s, 10),
                        s = o,
                        o = n
                    }
                    for (let t = 0; t < 16; t++) {
                        const r = sr(n + ar(e, i, a, u) + cr[y[t]] + d, w[t]) + h | 0;
                        n = h,
                        h = u,
                        u = 0 | sr(a, 10),
                        a = i,
                        i = r
                    }
                }
                this.set(this.h1 + s + u | 0, this.h2 + c + h | 0, this.h3 + f + n | 0, this.h4 + r + i | 0, this.h0 + o + a | 0)
            }
            roundClean() {
                cr.fill(0)
            }
            destroy() {
                this.destroyed = !0,
                this.buffer.fill(0),
                this.set(0, 0, 0, 0, 0)
            }
        }
        $((()=>new ur));
        const [fr,hr] = rt.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t=>BigInt(t))))
          , lr = new Uint32Array(80)
          , dr = new Uint32Array(80);
        class pr extends V {
            constructor() {
                super(128, 64, 16, !1),
                this.Ah = 1779033703,
                this.Al = -205731576,
                this.Bh = -1150833019,
                this.Bl = -2067093701,
                this.Ch = 1013904242,
                this.Cl = -23791573,
                this.Dh = -1521486534,
                this.Dl = 1595750129,
                this.Eh = 1359893119,
                this.El = -1377402159,
                this.Fh = -1694144372,
                this.Fl = 725511199,
                this.Gh = 528734635,
                this.Gl = -79577749,
                this.Hh = 1541459225,
                this.Hl = 327033209
            }
            get() {
                const {Ah: t, Al: e, Bh: r, Bl: n, Ch: o, Cl: i, Dh: s, Dl: a, Eh: c, El: u, Fh: f, Fl: h, Gh: l, Gl: d, Hh: p, Hl: y} = this;
                return [t, e, r, n, o, i, s, a, c, u, f, h, l, d, p, y]
            }
            set(t, e, r, n, o, i, s, a, c, u, f, h, l, d, p, y) {
                this.Ah = 0 | t,
                this.Al = 0 | e,
                this.Bh = 0 | r,
                this.Bl = 0 | n,
                this.Ch = 0 | o,
                this.Cl = 0 | i,
                this.Dh = 0 | s,
                this.Dl = 0 | a,
                this.Eh = 0 | c,
                this.El = 0 | u,
                this.Fh = 0 | f,
                this.Fl = 0 | h,
                this.Gh = 0 | l,
                this.Gl = 0 | d,
                this.Hh = 0 | p,
                this.Hl = 0 | y
            }
            process(t, e) {
                for (let r = 0; r < 16; r++,
                e += 4)
                    lr[r] = t.getUint32(e),
                    dr[r] = t.getUint32(e += 4);
                for (let t = 16; t < 80; t++) {
                    const e = 0 | lr[t - 15]
                      , r = 0 | dr[t - 15]
                      , n = rt.rotrSH(e, r, 1) ^ rt.rotrSH(e, r, 8) ^ rt.shrSH(e, r, 7)
                      , o = rt.rotrSL(e, r, 1) ^ rt.rotrSL(e, r, 8) ^ rt.shrSL(e, r, 7)
                      , i = 0 | lr[t - 2]
                      , s = 0 | dr[t - 2]
                      , a = rt.rotrSH(i, s, 19) ^ rt.rotrBH(i, s, 61) ^ rt.shrSH(i, s, 6)
                      , c = rt.rotrSL(i, s, 19) ^ rt.rotrBL(i, s, 61) ^ rt.shrSL(i, s, 6)
                      , u = rt.add4L(o, c, dr[t - 7], dr[t - 16])
                      , f = rt.add4H(u, n, a, lr[t - 7], lr[t - 16]);
                    lr[t] = 0 | f,
                    dr[t] = 0 | u
                }
                let {Ah: r, Al: n, Bh: o, Bl: i, Ch: s, Cl: a, Dh: c, Dl: u, Eh: f, El: h, Fh: l, Fl: d, Gh: p, Gl: y, Hh: g, Hl: w} = this;
                for (let t = 0; t < 80; t++) {
                    const e = rt.rotrSH(f, h, 14) ^ rt.rotrSH(f, h, 18) ^ rt.rotrBH(f, h, 41)
                      , b = rt.rotrSL(f, h, 14) ^ rt.rotrSL(f, h, 18) ^ rt.rotrBL(f, h, 41)
                      , m = f & l ^ ~f & p
                      , v = h & d ^ ~h & y
                      , E = rt.add5L(w, b, v, hr[t], dr[t])
                      , x = rt.add5H(E, g, e, m, fr[t], lr[t])
                      , A = 0 | E
                      , S = rt.rotrSH(r, n, 28) ^ rt.rotrBH(r, n, 34) ^ rt.rotrBH(r, n, 39)
                      , T = rt.rotrSL(r, n, 28) ^ rt.rotrBL(r, n, 34) ^ rt.rotrBL(r, n, 39)
                      , B = r & o ^ r & s ^ o & s
                      , I = n & i ^ n & a ^ i & a;
                    g = 0 | p,
                    w = 0 | y,
                    p = 0 | l,
                    y = 0 | d,
                    l = 0 | f,
                    d = 0 | h,
                    ({h: f, l: h} = rt.add(0 | c, 0 | u, 0 | x, 0 | A)),
                    c = 0 | s,
                    u = 0 | a,
                    s = 0 | o,
                    a = 0 | i,
                    o = 0 | r,
                    i = 0 | n;
                    const O = rt.add3L(A, T, I);
                    r = rt.add3H(O, x, S, B),
                    n = 0 | O
                }
                ({h: r, l: n} = rt.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)),
                ({h: o, l: i} = rt.add(0 | this.Bh, 0 | this.Bl, 0 | o, 0 | i)),
                ({h: s, l: a} = rt.add(0 | this.Ch, 0 | this.Cl, 0 | s, 0 | a)),
                ({h: c, l: u} = rt.add(0 | this.Dh, 0 | this.Dl, 0 | c, 0 | u)),
                ({h: f, l: h} = rt.add(0 | this.Eh, 0 | this.El, 0 | f, 0 | h)),
                ({h: l, l: d} = rt.add(0 | this.Fh, 0 | this.Fl, 0 | l, 0 | d)),
                ({h: p, l: y} = rt.add(0 | this.Gh, 0 | this.Gl, 0 | p, 0 | y)),
                ({h: g, l: w} = rt.add(0 | this.Hh, 0 | this.Hl, 0 | g, 0 | w)),
                this.set(r, n, o, i, s, a, c, u, f, h, l, d, p, y, g, w)
            }
            roundClean() {
                lr.fill(0),
                dr.fill(0)
            }
            destroy() {
                this.buffer.fill(0),
                this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            }
        }
        class yr extends pr {
            constructor() {
                super(),
                this.Ah = -1942145080,
                this.Al = 424955298,
                this.Bh = 1944164710,
                this.Bl = -1982016298,
                this.Ch = 502970286,
                this.Cl = 855612546,
                this.Dh = 1738396948,
                this.Dl = 1479516111,
                this.Eh = 258812777,
                this.El = 2077511080,
                this.Fh = 2011393907,
                this.Fl = 79989058,
                this.Gh = 1067287976,
                this.Gl = 1780299464,
                this.Hh = 286451373,
                this.Hl = -1848208735,
                this.outputLen = 28
            }
        }
        class gr extends pr {
            constructor() {
                super(),
                this.Ah = 573645204,
                this.Al = -64227540,
                this.Bh = -1621794909,
                this.Bl = -934517566,
                this.Ch = 596883563,
                this.Cl = 1867755857,
                this.Dh = -1774684391,
                this.Dl = 1497426621,
                this.Eh = -1775747358,
                this.El = -1467023389,
                this.Fh = -1101128155,
                this.Fl = 1401305490,
                this.Gh = 721525244,
                this.Gl = 746961066,
                this.Hh = 246885852,
                this.Hl = -2117784414,
                this.outputLen = 32
            }
        }
        class wr extends pr {
            constructor() {
                super(),
                this.Ah = -876896931,
                this.Al = -1056596264,
                this.Bh = 1654270250,
                this.Bl = 914150663,
                this.Ch = -1856437926,
                this.Cl = 812702999,
                this.Dh = 355462360,
                this.Dl = -150054599,
                this.Eh = 1731405415,
                this.El = -4191439,
                this.Fh = -1900787065,
                this.Fl = 1750603025,
                this.Gh = -619958771,
                this.Gl = 1694076839,
                this.Hh = 1203062813,
                this.Hl = -1090891868,
                this.outputLen = 48
            }
        }
        $((()=>new pr)),
        $((()=>new yr)),
        $((()=>new gr)),
        $((()=>new wr)),
        BigInt(0);
        const br = BigInt(1)
          , mr = BigInt(2)
          , vr = t=>t instanceof Uint8Array
          , Er = Array.from({
            length: 256
        }, ((t,e)=>e.toString(16).padStart(2, "0")));
        function xr(t) {
            if (!vr(t))
                throw new Error("Uint8Array expected");
            let e = "";
            for (let r = 0; r < t.length; r++)
                e += Er[t[r]];
            return e
        }
        function Ar(t) {
            if ("string" != typeof t)
                throw new Error("hex string expected, got " + typeof t);
            return BigInt("" === t ? "0" : `0x${t}`)
        }
        function Sr(t) {
            if ("string" != typeof t)
                throw new Error("hex string expected, got " + typeof t);
            if (t.length % 2)
                throw new Error("hex string is invalid: unpadded " + t.length);
            const e = new Uint8Array(t.length / 2);
            for (let r = 0; r < e.length; r++) {
                const n = 2 * r
                  , o = t.slice(n, n + 2)
                  , i = Number.parseInt(o, 16);
                if (Number.isNaN(i) || i < 0)
                    throw new Error("invalid byte sequence");
                e[r] = i
            }
            return e
        }
        function Tr(t) {
            return Ar(xr(t))
        }
        function Br(t) {
            if (!vr(t))
                throw new Error("Uint8Array expected");
            return Ar(xr(Uint8Array.from(t).reverse()))
        }
        const Ir = (t,e)=>Sr(t.toString(16).padStart(2 * e, "0"))
          , Or = (t,e)=>Ir(t, e).reverse();
        function Ur(t, e, r) {
            let n;
            if ("string" == typeof e)
                try {
                    n = Sr(e)
                } catch (r) {
                    throw new Error(`${t} must be valid hex string, got "${e}". Cause: ${r}`)
                }
            else {
                if (!vr(e))
                    throw new Error(`${t} must be hex string or Uint8Array`);
                n = Uint8Array.from(e)
            }
            const o = n.length;
            if ("number" == typeof r && o !== r)
                throw new Error(`${t} expected ${r} bytes, got ${o}`);
            return n
        }
        function Mr(...t) {
            const e = new Uint8Array(t.reduce(((t,e)=>t + e.length), 0));
            let r = 0;
            return t.forEach((t=>{
                if (!vr(t))
                    throw new Error("Uint8Array expected");
                e.set(t, r),
                r += t.length
            }
            )),
            e
        }
        function kr(t) {
            if ("string" != typeof t)
                throw new Error("utf8ToBytes expected string, got " + typeof t);
            return (new TextEncoder).encode(t)
        }
        const jr = t=>(mr << BigInt(t - 1)) - br
          , Nr = t=>new Uint8Array(t)
          , Lr = t=>Uint8Array.from(t);
        function _r(t, e, r) {
            if ("number" != typeof t || t < 2)
                throw new Error("hashLen must be a number");
            if ("number" != typeof e || e < 2)
                throw new Error("qByteLen must be a number");
            if ("function" != typeof r)
                throw new Error("hmacFn must be a function");
            let n = Nr(t)
              , o = Nr(t)
              , i = 0;
            const s = ()=>{
                n.fill(1),
                o.fill(0),
                i = 0
            }
              , a = (...t)=>r(o, n, ...t)
              , c = (t=Nr())=>{
                o = a(Lr([0]), t),
                n = a(),
                0 !== t.length && (o = a(Lr([1]), t),
                n = a())
            }
              , u = ()=>{
                if (i++ >= 1e3)
                    throw new Error("drbg: tried 1000 values");
                let t = 0;
                const r = [];
                for (; t < e; ) {
                    n = a();
                    const e = n.slice();
                    r.push(e),
                    t += n.length
                }
                return Mr(...r)
            }
            ;
            return (t,e)=>{
                let r;
                for (s(),
                c(t); !(r = e(u())); )
                    c();
                return s(),
                r
            }
        }
        const Dr = {
            bigint: t=>"bigint" == typeof t,
            function: t=>"function" == typeof t,
            boolean: t=>"boolean" == typeof t,
            string: t=>"string" == typeof t,
            isSafeInteger: t=>Number.isSafeInteger(t),
            array: t=>Array.isArray(t),
            field: (t,e)=>e.Fp.isValid(t),
            hash: t=>"function" == typeof t && Number.isSafeInteger(t.outputLen)
        };
        function Cr(t, e, r={}) {
            const n = (e,r,n)=>{
                const o = Dr[r];
                if ("function" != typeof o)
                    throw new Error(`Invalid validator "${r}", expected function`);
                const i = t[e];
                if (!(n && void 0 === i || o(i, t)))
                    throw new Error(`Invalid param ${String(e)}=${i} (${typeof i}), expected ${r}`)
            }
            ;
            for (const [t,r] of Object.entries(e))
                n(t, r, !1);
            for (const [t,e] of Object.entries(r))
                n(t, e, !0);
            return t
        }
        const Rr = BigInt(0)
          , Pr = BigInt(1)
          , zr = BigInt(2)
          , $r = BigInt(3)
          , Hr = BigInt(4)
          , Vr = BigInt(5)
          , Fr = BigInt(8);
        function qr(t, e) {
            const r = t % e;
            return r >= Rr ? r : e + r
        }
        function Gr(t, e, r) {
            if (r <= Rr || e < Rr)
                throw new Error("Expected power/modulo > 0");
            if (r === Pr)
                return Rr;
            let n = Pr;
            for (; e > Rr; )
                e & Pr && (n = n * t % r),
                t = t * t % r,
                e >>= Pr;
            return n
        }
        function Yr(t, e, r) {
            let n = t;
            for (; e-- > Rr; )
                n *= n,
                n %= r;
            return n
        }
        function Wr(t, e) {
            if (t === Rr || e <= Rr)
                throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);
            let r = qr(t, e)
              , n = e
              , o = Rr
              , i = Pr
              , s = Pr
              , a = Rr;
            for (; r !== Rr; ) {
                const t = n / r
                  , e = n % r
                  , c = o - s * t
                  , u = i - a * t;
                n = r,
                r = e,
                o = s,
                i = a,
                s = c,
                a = u
            }
            if (n !== Pr)
                throw new Error("invert: does not exist");
            return qr(o, e)
        }
        BigInt(9),
        BigInt(16);
        const Kr = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
        function Qr(t) {
            return Cr(t, Kr.reduce(((t,e)=>(t[e] = "function",
            t)), {
                ORDER: "bigint",
                MASK: "bigint",
                BYTES: "isSafeInteger",
                BITS: "isSafeInteger"
            }))
        }
        function Zr(t, e) {
            const r = void 0 !== e ? e : t.toString(2).length;
            return {
                nBitLength: r,
                nByteLength: Math.ceil(r / 8)
            }
        }
        const Jr = BigInt(0)
          , Xr = BigInt(1);
        function tn(t) {
            return Qr(t.Fp),
            Cr(t, {
                n: "bigint",
                h: "bigint",
                Gx: "field",
                Gy: "field"
            }, {
                nBitLength: "isSafeInteger",
                nByteLength: "isSafeInteger"
            }),
            Object.freeze({
                ...Zr(t.n, t.nBitLength),
                ...t
            })
        }
        const {bytesToNumberBE: en, hexToBytes: rn} = e
          , nn = {
            Err: class extends Error {
                constructor(t="") {
                    super(t)
                }
            }
            ,
            _parseInt(t) {
                const {Err: e} = nn;
                if (t.length < 2 || 2 !== t[0])
                    throw new e("Invalid signature integer tag");
                const r = t[1]
                  , n = t.subarray(2, r + 2);
                if (!r || n.length !== r)
                    throw new e("Invalid signature integer: wrong length");
                if (0 === n[0] && n[1] <= 127)
                    throw new e("Invalid signature integer: trailing length");
                return {
                    d: en(n),
                    l: t.subarray(r + 2)
                }
            },
            toSig(t) {
                const {Err: e} = nn
                  , r = "string" == typeof t ? rn(t) : t;
                if (!(r instanceof Uint8Array))
                    throw new Error("ui8a expected");
                let n = r.length;
                if (n < 2 || 48 != r[0])
                    throw new e("Invalid signature tag");
                if (r[1] !== n - 2)
                    throw new e("Invalid signature: incorrect length");
                const {d: o, l: i} = nn._parseInt(r.subarray(2))
                  , {d: s, l: a} = nn._parseInt(i);
                if (a.length)
                    throw new e("Invalid signature: left bytes after parsing");
                return {
                    r: o,
                    s
                }
            },
            hexFromSig(t) {
                const e = t=>Number.parseInt(t[0], 16) >= 8 ? "00" + t : t
                  , r = t=>{
                    const e = t.toString(16);
                    return 1 & e.length ? `0${e}` : e
                }
                  , n = e(r(t.s))
                  , o = e(r(t.r))
                  , i = n.length / 2
                  , s = o.length / 2
                  , a = r(i)
                  , c = r(s);
                return `30${r(s + i + 4)}02${c}${o}02${a}${n}`
            }
        }
          , on = BigInt(0)
          , sn = BigInt(1);
        function an(t) {
            const e = function(t) {
                const e = tn(t);
                return Cr(e, {
                    hash: "hash",
                    hmac: "function",
                    randomBytes: "function"
                }, {
                    bits2int: "function",
                    bits2int_modN: "function",
                    lowS: "boolean"
                }),
                Object.freeze({
                    lowS: !0,
                    ...e
                })
            }(t)
              , r = e.n
              , n = e.Fp
              , o = n.BYTES + 1
              , i = 2 * n.BYTES + 1;
            function s(t) {
                return qr(t, r)
            }
            function a(t) {
                return Wr(t, r)
            }
            const {ProjectivePoint: c, normPrivateKeyToScalar: u, weierstrassEquation: f, isWithinCurveOrder: h} = function(t) {
                const e = function(t) {
                    const e = tn(t);
                    Cr(e, {
                        a: "field",
                        b: "field",
                        fromBytes: "function",
                        toBytes: "function"
                    }, {
                        allowedPrivateKeyLengths: "array",
                        wrapPrivateKey: "boolean",
                        isTorsionFree: "function",
                        clearCofactor: "function",
                        allowInfinityPoint: "boolean"
                    });
                    const {endo: r, Fp: n, a: o} = e;
                    if (r) {
                        if (!n.eql(o, n.ZERO))
                            throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
                        if ("object" != typeof r || "bigint" != typeof r.beta || "function" != typeof r.splitScalar)
                            throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")
                    }
                    return Object.freeze({
                        ...e
                    })
                }(t)
                  , {Fp: r} = e;
                function n(t) {
                    const {a: n, b: o} = e
                      , i = r.sqr(t)
                      , s = r.mul(i, t);
                    return r.add(r.add(s, r.mul(t, n)), o)
                }
                function o(t) {
                    return "bigint" == typeof t && on < t && t < e.n
                }
                function i(t) {
                    if (!o(t))
                        throw new Error("Expected valid bigint: 0 < bigint < curve.n")
                }
                function s(t) {
                    const {allowedPrivateKeyLengths: r, nByteLength: n, wrapPrivateKey: o, n: s} = e;
                    if (r && "bigint" != typeof t) {
                        if (t instanceof Uint8Array && (t = xr(t)),
                        "string" != typeof t || !r.includes(t.length))
                            throw new Error("Invalid key");
                        t = t.padStart(2 * n, "0")
                    }
                    let a;
                    try {
                        a = "bigint" == typeof t ? t : Tr(Ur("private key", t, n))
                    } catch (e) {
                        throw new Error(`private key must be ${n} bytes, hex or bigint, not ${typeof t}`)
                    }
                    return o && (a = qr(a, s)),
                    i(a),
                    a
                }
                const a = new Map;
                function c(t) {
                    if (!(t instanceof u))
                        throw new Error("ProjectivePoint expected")
                }
                class u {
                    constructor(t, e, n) {
                        if (this.px = t,
                        this.py = e,
                        this.pz = n,
                        null == t || !r.isValid(t))
                            throw new Error("x required");
                        if (null == e || !r.isValid(e))
                            throw new Error("y required");
                        if (null == n || !r.isValid(n))
                            throw new Error("z required")
                    }
                    static fromAffine(t) {
                        const {x: e, y: n} = t || {};
                        if (!t || !r.isValid(e) || !r.isValid(n))
                            throw new Error("invalid affine point");
                        if (t instanceof u)
                            throw new Error("projective point not allowed");
                        const o = t=>r.eql(t, r.ZERO);
                        return o(e) && o(n) ? u.ZERO : new u(e,n,r.ONE)
                    }
                    get x() {
                        return this.toAffine().x
                    }
                    get y() {
                        return this.toAffine().y
                    }
                    static normalizeZ(t) {
                        const e = r.invertBatch(t.map((t=>t.pz)));
                        return t.map(((t,r)=>t.toAffine(e[r]))).map(u.fromAffine)
                    }
                    static fromHex(t) {
                        const r = u.fromAffine(e.fromBytes(Ur("pointHex", t)));
                        return r.assertValidity(),
                        r
                    }
                    static fromPrivateKey(t) {
                        return u.BASE.multiply(s(t))
                    }
                    _setWindowSize(t) {
                        this._WINDOW_SIZE = t,
                        a.delete(this)
                    }
                    assertValidity() {
                        if (this.is0()) {
                            if (e.allowInfinityPoint)
                                return;
                            throw new Error("bad point: ZERO")
                        }
                        const {x: t, y: o} = this.toAffine();
                        if (!r.isValid(t) || !r.isValid(o))
                            throw new Error("bad point: x or y not FE");
                        const i = r.sqr(o)
                          , s = n(t);
                        if (!r.eql(i, s))
                            throw new Error("bad point: equation left != right");
                        if (!this.isTorsionFree())
                            throw new Error("bad point: not in prime-order subgroup")
                    }
                    hasEvenY() {
                        const {y: t} = this.toAffine();
                        if (r.isOdd)
                            return !r.isOdd(t);
                        throw new Error("Field doesn't support isOdd")
                    }
                    equals(t) {
                        c(t);
                        const {px: e, py: n, pz: o} = this
                          , {px: i, py: s, pz: a} = t
                          , u = r.eql(r.mul(e, a), r.mul(i, o))
                          , f = r.eql(r.mul(n, a), r.mul(s, o));
                        return u && f
                    }
                    negate() {
                        return new u(this.px,r.neg(this.py),this.pz)
                    }
                    double() {
                        const {a: t, b: n} = e
                          , o = r.mul(n, 3n)
                          , {px: i, py: s, pz: a} = this;
                        let c = r.ZERO
                          , f = r.ZERO
                          , h = r.ZERO
                          , l = r.mul(i, i)
                          , d = r.mul(s, s)
                          , p = r.mul(a, a)
                          , y = r.mul(i, s);
                        return y = r.add(y, y),
                        h = r.mul(i, a),
                        h = r.add(h, h),
                        c = r.mul(t, h),
                        f = r.mul(o, p),
                        f = r.add(c, f),
                        c = r.sub(d, f),
                        f = r.add(d, f),
                        f = r.mul(c, f),
                        c = r.mul(y, c),
                        h = r.mul(o, h),
                        p = r.mul(t, p),
                        y = r.sub(l, p),
                        y = r.mul(t, y),
                        y = r.add(y, h),
                        h = r.add(l, l),
                        l = r.add(h, l),
                        l = r.add(l, p),
                        l = r.mul(l, y),
                        f = r.add(f, l),
                        p = r.mul(s, a),
                        p = r.add(p, p),
                        l = r.mul(p, y),
                        c = r.sub(c, l),
                        h = r.mul(p, d),
                        h = r.add(h, h),
                        h = r.add(h, h),
                        new u(c,f,h)
                    }
                    add(t) {
                        c(t);
                        const {px: n, py: o, pz: i} = this
                          , {px: s, py: a, pz: f} = t;
                        let h = r.ZERO
                          , l = r.ZERO
                          , d = r.ZERO;
                        const p = e.a
                          , y = r.mul(e.b, 3n);
                        let g = r.mul(n, s)
                          , w = r.mul(o, a)
                          , b = r.mul(i, f)
                          , m = r.add(n, o)
                          , v = r.add(s, a);
                        m = r.mul(m, v),
                        v = r.add(g, w),
                        m = r.sub(m, v),
                        v = r.add(n, i);
                        let E = r.add(s, f);
                        return v = r.mul(v, E),
                        E = r.add(g, b),
                        v = r.sub(v, E),
                        E = r.add(o, i),
                        h = r.add(a, f),
                        E = r.mul(E, h),
                        h = r.add(w, b),
                        E = r.sub(E, h),
                        d = r.mul(p, v),
                        h = r.mul(y, b),
                        d = r.add(h, d),
                        h = r.sub(w, d),
                        d = r.add(w, d),
                        l = r.mul(h, d),
                        w = r.add(g, g),
                        w = r.add(w, g),
                        b = r.mul(p, b),
                        v = r.mul(y, v),
                        w = r.add(w, b),
                        b = r.sub(g, b),
                        b = r.mul(p, b),
                        v = r.add(v, b),
                        g = r.mul(w, v),
                        l = r.add(l, g),
                        g = r.mul(E, v),
                        h = r.mul(m, h),
                        h = r.sub(h, g),
                        g = r.mul(m, w),
                        d = r.mul(E, d),
                        d = r.add(d, g),
                        new u(h,l,d)
                    }
                    subtract(t) {
                        return this.add(t.negate())
                    }
                    is0() {
                        return this.equals(u.ZERO)
                    }
                    wNAF(t) {
                        return h.wNAFCached(this, a, t, (t=>{
                            const e = r.invertBatch(t.map((t=>t.pz)));
                            return t.map(((t,r)=>t.toAffine(e[r]))).map(u.fromAffine)
                        }
                        ))
                    }
                    multiplyUnsafe(t) {
                        const n = u.ZERO;
                        if (t === on)
                            return n;
                        if (i(t),
                        t === sn)
                            return this;
                        const {endo: o} = e;
                        if (!o)
                            return h.unsafeLadder(this, t);
                        let {k1neg: s, k1: a, k2neg: c, k2: f} = o.splitScalar(t)
                          , l = n
                          , d = n
                          , p = this;
                        for (; a > on || f > on; )
                            a & sn && (l = l.add(p)),
                            f & sn && (d = d.add(p)),
                            p = p.double(),
                            a >>= sn,
                            f >>= sn;
                        return s && (l = l.negate()),
                        c && (d = d.negate()),
                        d = new u(r.mul(d.px, o.beta),d.py,d.pz),
                        l.add(d)
                    }
                    multiply(t) {
                        i(t);
                        let n, o, s = t;
                        const {endo: a} = e;
                        if (a) {
                            const {k1neg: t, k1: e, k2neg: i, k2: c} = a.splitScalar(s);
                            let {p: f, f: l} = this.wNAF(e)
                              , {p: d, f: p} = this.wNAF(c);
                            f = h.constTimeNegate(t, f),
                            d = h.constTimeNegate(i, d),
                            d = new u(r.mul(d.px, a.beta),d.py,d.pz),
                            n = f.add(d),
                            o = l.add(p)
                        } else {
                            const {p: t, f: e} = this.wNAF(s);
                            n = t,
                            o = e
                        }
                        return u.normalizeZ([n, o])[0]
                    }
                    multiplyAndAddUnsafe(t, e, r) {
                        const n = u.BASE
                          , o = (t,e)=>e !== on && e !== sn && t.equals(n) ? t.multiply(e) : t.multiplyUnsafe(e)
                          , i = o(this, e).add(o(t, r));
                        return i.is0() ? void 0 : i
                    }
                    toAffine(t) {
                        const {px: e, py: n, pz: o} = this
                          , i = this.is0();
                        null == t && (t = i ? r.ONE : r.inv(o));
                        const s = r.mul(e, t)
                          , a = r.mul(n, t)
                          , c = r.mul(o, t);
                        if (i)
                            return {
                                x: r.ZERO,
                                y: r.ZERO
                            };
                        if (!r.eql(c, r.ONE))
                            throw new Error("invZ was invalid");
                        return {
                            x: s,
                            y: a
                        }
                    }
                    isTorsionFree() {
                        const {h: t, isTorsionFree: r} = e;
                        if (t === sn)
                            return !0;
                        if (r)
                            return r(u, this);
                        throw new Error("isTorsionFree() has not been declared for the elliptic curve")
                    }
                    clearCofactor() {
                        const {h: t, clearCofactor: r} = e;
                        return t === sn ? this : r ? r(u, this) : this.multiplyUnsafe(e.h)
                    }
                    toRawBytes(t=!0) {
                        return this.assertValidity(),
                        e.toBytes(u, this, t)
                    }
                    toHex(t=!0) {
                        return xr(this.toRawBytes(t))
                    }
                }
                u.BASE = new u(e.Gx,e.Gy,r.ONE),
                u.ZERO = new u(r.ZERO,r.ONE,r.ZERO);
                const f = e.nBitLength
                  , h = function(t, e) {
                    const r = (t,e)=>{
                        const r = e.negate();
                        return t ? r : e
                    }
                      , n = t=>({
                        windows: Math.ceil(e / t) + 1,
                        windowSize: 2 ** (t - 1)
                    });
                    return {
                        constTimeNegate: r,
                        unsafeLadder(e, r) {
                            let n = t.ZERO
                              , o = e;
                            for (; r > Jr; )
                                r & Xr && (n = n.add(o)),
                                o = o.double(),
                                r >>= Xr;
                            return n
                        },
                        precomputeWindow(t, e) {
                            const {windows: r, windowSize: o} = n(e)
                              , i = [];
                            let s = t
                              , a = s;
                            for (let t = 0; t < r; t++) {
                                a = s,
                                i.push(a);
                                for (let t = 1; t < o; t++)
                                    a = a.add(s),
                                    i.push(a);
                                s = a.double()
                            }
                            return i
                        },
                        wNAF(e, o, i) {
                            const {windows: s, windowSize: a} = n(e);
                            let c = t.ZERO
                              , u = t.BASE;
                            const f = BigInt(2 ** e - 1)
                              , h = 2 ** e
                              , l = BigInt(e);
                            for (let t = 0; t < s; t++) {
                                const e = t * a;
                                let n = Number(i & f);
                                i >>= l,
                                n > a && (n -= h,
                                i += Xr);
                                const s = e
                                  , d = e + Math.abs(n) - 1
                                  , p = t % 2 != 0
                                  , y = n < 0;
                                0 === n ? u = u.add(r(p, o[s])) : c = c.add(r(y, o[d]))
                            }
                            return {
                                p: c,
                                f: u
                            }
                        },
                        wNAFCached(t, e, r, n) {
                            const o = t._WINDOW_SIZE || 1;
                            let i = e.get(t);
                            return i || (i = this.precomputeWindow(t, o),
                            1 !== o && e.set(t, n(i))),
                            this.wNAF(o, i, r)
                        }
                    }
                }(u, e.endo ? Math.ceil(f / 2) : f);
                return {
                    ProjectivePoint: u,
                    normPrivateKeyToScalar: s,
                    weierstrassEquation: n,
                    isWithinCurveOrder: o
                }
            }({
                ...e,
                toBytes(t, e, r) {
                    const o = e.toAffine()
                      , i = n.toBytes(o.x)
                      , s = Mr;
                    return r ? s(Uint8Array.from([e.hasEvenY() ? 2 : 3]), i) : s(Uint8Array.from([4]), i, n.toBytes(o.y))
                },
                fromBytes(t) {
                    const e = t.length
                      , r = t[0]
                      , s = t.subarray(1);
                    if (e !== o || 2 !== r && 3 !== r) {
                        if (e === i && 4 === r)
                            return {
                                x: n.fromBytes(s.subarray(0, n.BYTES)),
                                y: n.fromBytes(s.subarray(n.BYTES, 2 * n.BYTES))
                            };
                        throw new Error(`Point of length ${e} was invalid. Expected ${o} compressed bytes or ${i} uncompressed bytes`)
                    }
                    {
                        const t = Tr(s);
                        if (!(on < (a = t) && a < n.ORDER))
                            throw new Error("Point is not on curve");
                        const e = f(t);
                        let o = n.sqrt(e);
                        return 1 == (1 & r) != ((o & sn) === sn) && (o = n.neg(o)),
                        {
                            x: t,
                            y: o
                        }
                    }
                    var a
                }
            })
              , l = t=>xr(Ir(t, e.nByteLength));
            function d(t) {
                return t > r >> sn
            }
            const p = (t,e,r)=>Tr(t.slice(e, r));
            class y {
                constructor(t, e, r) {
                    this.r = t,
                    this.s = e,
                    this.recovery = r,
                    this.assertValidity()
                }
                static fromCompact(t) {
                    const r = e.nByteLength;
                    return t = Ur("compactSignature", t, 2 * r),
                    new y(p(t, 0, r),p(t, r, 2 * r))
                }
                static fromDER(t) {
                    const {r: e, s: r} = nn.toSig(Ur("DER", t));
                    return new y(e,r)
                }
                assertValidity() {
                    if (!h(this.r))
                        throw new Error("r must be 0 < r < CURVE.n");
                    if (!h(this.s))
                        throw new Error("s must be 0 < s < CURVE.n")
                }
                addRecoveryBit(t) {
                    return new y(this.r,this.s,t)
                }
                recoverPublicKey(t) {
                    const {r, s: o, recovery: i} = this
                      , u = m(Ur("msgHash", t));
                    if (null == i || ![0, 1, 2, 3].includes(i))
                        throw new Error("recovery id invalid");
                    const f = 2 === i || 3 === i ? r + e.n : r;
                    if (f >= n.ORDER)
                        throw new Error("recovery id 2 or 3 invalid");
                    const h = 0 == (1 & i) ? "02" : "03"
                      , d = c.fromHex(h + l(f))
                      , p = a(f)
                      , y = s(-u * p)
                      , g = s(o * p)
                      , w = c.BASE.multiplyAndAddUnsafe(d, y, g);
                    if (!w)
                        throw new Error("point at infinify");
                    return w.assertValidity(),
                    w
                }
                hasHighS() {
                    return d(this.s)
                }
                normalizeS() {
                    return this.hasHighS() ? new y(this.r,s(-this.s),this.recovery) : this
                }
                toDERRawBytes() {
                    return Sr(this.toDERHex())
                }
                toDERHex() {
                    return nn.hexFromSig({
                        r: this.r,
                        s: this.s
                    })
                }
                toCompactRawBytes() {
                    return Sr(this.toCompactHex())
                }
                toCompactHex() {
                    return l(this.r) + l(this.s)
                }
            }
            const g = {
                isValidPrivateKey(t) {
                    try {
                        return u(t),
                        !0
                    } catch (t) {
                        return !1
                    }
                },
                normPrivateKeyToScalar: u,
                randomPrivateKey: ()=>{
                    const t = function(t, e, r=!1) {
                        const n = (t = Ur("privateHash", t)).length
                          , o = Zr(e).nByteLength + 8;
                        if (o < 24 || n < o || n > 1024)
                            throw new Error(`hashToPrivateScalar: expected ${o}-1024 bytes of input, got ${n}`);
                        return qr(r ? Br(t) : Tr(t), e - Pr) + Pr
                    }(e.randomBytes(n.BYTES + 8), r);
                    return Ir(t, e.nByteLength)
                }
                ,
                precompute: (t=8,e=c.BASE)=>(e._setWindowSize(t),
                e.multiply(BigInt(3)),
                e)
            };
            function w(t) {
                const e = t instanceof Uint8Array
                  , r = "string" == typeof t
                  , n = (e || r) && t.length;
                return e ? n === o || n === i : r ? n === 2 * o || n === 2 * i : t instanceof c
            }
            const b = e.bits2int || function(t) {
                const r = Tr(t)
                  , n = 8 * t.length - e.nBitLength;
                return n > 0 ? r >> BigInt(n) : r
            }
              , m = e.bits2int_modN || function(t) {
                return s(b(t))
            }
              , v = jr(e.nBitLength);
            function E(t) {
                if ("bigint" != typeof t)
                    throw new Error("bigint expected");
                if (!(on <= t && t < v))
                    throw new Error(`bigint expected < 2^${e.nBitLength}`);
                return Ir(t, e.nByteLength)
            }
            const x = {
                lowS: e.lowS,
                prehash: !1
            }
              , A = {
                lowS: e.lowS,
                prehash: !1
            };
            return c.BASE._setWindowSize(8),
            {
                CURVE: e,
                getPublicKey: function(t, e=!0) {
                    return c.fromPrivateKey(t).toRawBytes(e)
                },
                getSharedSecret: function(t, e, r=!0) {
                    if (w(t))
                        throw new Error("first arg must be private key");
                    if (!w(e))
                        throw new Error("second arg must be public key");
                    return c.fromHex(e).multiply(u(t)).toRawBytes(r)
                },
                sign: function(t, r, o=x) {
                    const {seed: i, k2sig: f} = function(t, r, o=x) {
                        if (["recovered", "canonical"].some((t=>t in o)))
                            throw new Error("sign() legacy options not supported");
                        const {hash: i, randomBytes: f} = e;
                        let {lowS: l, prehash: p, extraEntropy: g} = o;
                        null == l && (l = !0),
                        t = Ur("msgHash", t),
                        p && (t = Ur("prehashed msgHash", i(t)));
                        const w = m(t)
                          , v = u(r)
                          , A = [E(v), E(w)];
                        if (null != g) {
                            const t = !0 === g ? f(n.BYTES) : g;
                            A.push(Ur("extraEntropy", t, n.BYTES))
                        }
                        const S = Mr(...A)
                          , T = w;
                        return {
                            seed: S,
                            k2sig: function(t) {
                                const e = b(t);
                                if (!h(e))
                                    return;
                                const r = a(e)
                                  , n = c.BASE.multiply(e).toAffine()
                                  , o = s(n.x);
                                if (o === on)
                                    return;
                                const i = s(r * s(T + o * v));
                                if (i === on)
                                    return;
                                let u = (n.x === o ? 0 : 2) | Number(n.y & sn)
                                  , f = i;
                                return l && d(i) && (f = function(t) {
                                    return d(t) ? s(-t) : t
                                }(i),
                                u ^= 1),
                                new y(o,f,u)
                            }
                        }
                    }(t, r, o);
                    return _r(e.hash.outputLen, e.nByteLength, e.hmac)(i, f)
                },
                verify: function(t, r, n, o=A) {
                    const i = t;
                    if (r = Ur("msgHash", r),
                    n = Ur("publicKey", n),
                    "strict"in o)
                        throw new Error("options.strict was renamed to lowS");
                    const {lowS: u, prehash: f} = o;
                    let h, l;
                    try {
                        if ("string" == typeof i || i instanceof Uint8Array)
                            try {
                                h = y.fromDER(i)
                            } catch (t) {
                                if (!(t instanceof nn.Err))
                                    throw t;
                                h = y.fromCompact(i)
                            }
                        else {
                            if ("object" != typeof i || "bigint" != typeof i.r || "bigint" != typeof i.s)
                                throw new Error("PARSE");
                            {
                                const {r: t, s: e} = i;
                                h = new y(t,e)
                            }
                        }
                        l = c.fromHex(n)
                    } catch (t) {
                        if ("PARSE" === t.message)
                            throw new Error("signature must be Signature instance, Uint8Array or hex string");
                        return !1
                    }
                    if (u && h.hasHighS())
                        return !1;
                    f && (r = e.hash(r));
                    const {r: d, s: p} = h
                      , g = m(r)
                      , w = a(p)
                      , b = s(g * w)
                      , v = s(d * w)
                      , E = c.BASE.multiplyAndAddUnsafe(l, b, v)?.toAffine();
                    return !!E && s(E.x) === d
                },
                ProjectivePoint: c,
                Signature: y,
                utils: g
            }
        }
        const cn = Tr;
        function un(t, e) {
            if (t < 0 || t >= 1 << 8 * e)
                throw new Error(`bad I2OSP call: value=${t} length=${e}`);
            const r = Array.from({
                length: e
            }).fill(0);
            for (let n = e - 1; n >= 0; n--)
                r[n] = 255 & t,
                t >>>= 8;
            return new Uint8Array(r)
        }
        function fn(t, e) {
            const r = new Uint8Array(t.length);
            for (let n = 0; n < t.length; n++)
                r[n] = t[n] ^ e[n];
            return r
        }
        function hn(t) {
            if (!(t instanceof Uint8Array))
                throw new Error("Uint8Array expected")
        }
        function ln(t) {
            if (!Number.isSafeInteger(t))
                throw new Error("number expected")
        }
        function dn(t, e, r) {
            Cr(r, {
                DST: "string",
                p: "bigint",
                m: "isSafeInteger",
                k: "isSafeInteger",
                hash: "hash"
            });
            const {p: n, k: o, m: i, hash: s, expand: a, DST: c} = r;
            hn(t),
            ln(e);
            const u = function(t) {
                if (t instanceof Uint8Array)
                    return t;
                if ("string" == typeof t)
                    return kr(t);
                throw new Error("DST must be Uint8Array or string")
            }(c)
              , f = n.toString(2).length
              , h = Math.ceil((f + o) / 8)
              , l = e * i * h;
            let d;
            if ("xmd" === a)
                d = function(t, e, r, n) {
                    hn(t),
                    hn(e),
                    ln(r),
                    e.length > 255 && (e = n(Mr(kr("H2C-OVERSIZE-DST-"), e)));
                    const {outputLen: o, blockLen: i} = n
                      , s = Math.ceil(r / o);
                    if (s > 255)
                        throw new Error("Invalid xmd length");
                    const a = Mr(e, un(e.length, 1))
                      , c = un(0, i)
                      , u = un(r, 2)
                      , f = new Array(s)
                      , h = n(Mr(c, t, u, un(0, 1), a));
                    f[0] = n(Mr(h, un(1, 1), a));
                    for (let t = 1; t <= s; t++) {
                        const e = [fn(h, f[t - 1]), un(t + 1, 1), a];
                        f[t] = n(Mr(...e))
                    }
                    return Mr(...f).slice(0, r)
                }(t, u, l, s);
            else if ("xof" === a)
                d = function(t, e, r, n, o) {
                    if (hn(t),
                    hn(e),
                    ln(r),
                    e.length > 255) {
                        const t = Math.ceil(2 * n / 8);
                        e = o.create({
                            dkLen: t
                        }).update(kr("H2C-OVERSIZE-DST-")).update(e).digest()
                    }
                    if (r > 65535 || e.length > 255)
                        throw new Error("expand_message_xof: invalid lenInBytes");
                    return o.create({
                        dkLen: r
                    }).update(t).update(un(r, 2)).update(e).update(un(e.length, 1)).digest()
                }(t, u, l, o, s);
            else {
                if (void 0 !== a)
                    throw new Error('expand must be "xmd", "xof" or undefined');
                d = t
            }
            const p = new Array(e);
            for (let t = 0; t < e; t++) {
                const e = new Array(i);
                for (let r = 0; r < i; r++) {
                    const o = h * (r + t * i)
                      , s = d.subarray(o, o + h);
                    e[r] = qr(cn(s), n)
                }
                p[t] = e
            }
            return p
        }
        function pn(t) {
            return {
                hash: t,
                hmac: (e,...r)=>De(t, e, P(...r)),
                randomBytes: H
            }
        }
        const yn = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")
          , gn = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141")
          , wn = BigInt(1)
          , bn = BigInt(2)
          , mn = (t,e)=>(t + e / bn) / e;
        function vn(t) {
            const e = yn
              , r = BigInt(3)
              , n = BigInt(6)
              , o = BigInt(11)
              , i = BigInt(22)
              , s = BigInt(23)
              , a = BigInt(44)
              , c = BigInt(88)
              , u = t * t * t % e
              , f = u * u * t % e
              , h = Yr(f, r, e) * f % e
              , l = Yr(h, r, e) * f % e
              , d = Yr(l, bn, e) * u % e
              , p = Yr(d, o, e) * d % e
              , y = Yr(p, i, e) * p % e
              , g = Yr(y, a, e) * y % e
              , w = Yr(g, c, e) * g % e
              , b = Yr(w, a, e) * y % e
              , m = Yr(b, r, e) * f % e
              , v = Yr(m, s, e) * p % e
              , E = Yr(v, n, e) * u % e
              , x = Yr(E, bn, e);
            if (!En.eql(En.sqr(x), t))
                throw new Error("Cannot find square root");
            return x
        }
        const En = function(t, e, r=!1, n={}) {
            if (t <= Rr)
                throw new Error(`Expected Fp ORDER > 0, got ${t}`);
            const {nBitLength: o, nByteLength: i} = Zr(t, e);
            if (i > 2048)
                throw new Error("Field lengths over 2048 bytes are not supported");
            const s = function(t) {
                if (t % Hr === $r) {
                    const e = (t + Pr) / Hr;
                    return function(t, r) {
                        const n = t.pow(r, e);
                        if (!t.eql(t.sqr(n), r))
                            throw new Error("Cannot find square root");
                        return n
                    }
                }
                if (t % Fr === Vr) {
                    const e = (t - Vr) / Fr;
                    return function(t, r) {
                        const n = t.mul(r, zr)
                          , o = t.pow(n, e)
                          , i = t.mul(r, o)
                          , s = t.mul(t.mul(i, zr), o)
                          , a = t.mul(i, t.sub(s, t.ONE));
                        if (!t.eql(t.sqr(a), r))
                            throw new Error("Cannot find square root");
                        return a
                    }
                }
                return function(t) {
                    const e = (t - Pr) / zr;
                    let r, n, o;
                    for (r = t - Pr,
                    n = 0; r % zr === Rr; r /= zr,
                    n++)
                        ;
                    for (o = zr; o < t && Gr(o, e, t) !== t - Pr; o++)
                        ;
                    if (1 === n) {
                        const e = (t + Pr) / Hr;
                        return function(t, r) {
                            const n = t.pow(r, e);
                            if (!t.eql(t.sqr(n), r))
                                throw new Error("Cannot find square root");
                            return n
                        }
                    }
                    const i = (r + Pr) / zr;
                    return function(t, s) {
                        if (t.pow(s, e) === t.neg(t.ONE))
                            throw new Error("Cannot find square root");
                        let a = n
                          , c = t.pow(t.mul(t.ONE, o), r)
                          , u = t.pow(s, i)
                          , f = t.pow(s, r);
                        for (; !t.eql(f, t.ONE); ) {
                            if (t.eql(f, t.ZERO))
                                return t.ZERO;
                            let e = 1;
                            for (let r = t.sqr(f); e < a && !t.eql(r, t.ONE); e++)
                                r = t.sqr(r);
                            const r = t.pow(c, Pr << BigInt(a - e - 1));
                            c = t.sqr(r),
                            u = t.mul(u, r),
                            f = t.mul(f, c),
                            a = e
                        }
                        return u
                    }
                }(t)
            }(t)
              , a = Object.freeze({
                ORDER: t,
                BITS: o,
                BYTES: i,
                MASK: jr(o),
                ZERO: Rr,
                ONE: Pr,
                create: e=>qr(e, t),
                isValid: e=>{
                    if ("bigint" != typeof e)
                        throw new Error("Invalid field element: expected bigint, got " + typeof e);
                    return Rr <= e && e < t
                }
                ,
                is0: t=>t === Rr,
                isOdd: t=>(t & Pr) === Pr,
                neg: e=>qr(-e, t),
                eql: (t,e)=>t === e,
                sqr: e=>qr(e * e, t),
                add: (e,r)=>qr(e + r, t),
                sub: (e,r)=>qr(e - r, t),
                mul: (e,r)=>qr(e * r, t),
                pow: (t,e)=>function(t, e, r) {
                    if (r < Rr)
                        throw new Error("Expected power > 0");
                    if (r === Rr)
                        return t.ONE;
                    if (r === Pr)
                        return e;
                    let n = t.ONE
                      , o = e;
                    for (; r > Rr; )
                        r & Pr && (n = t.mul(n, o)),
                        o = t.sqr(o),
                        r >>= 1n;
                    return n
                }(a, t, e),
                div: (e,r)=>qr(e * Wr(r, t), t),
                sqrN: t=>t * t,
                addN: (t,e)=>t + e,
                subN: (t,e)=>t - e,
                mulN: (t,e)=>t * e,
                inv: e=>Wr(e, t),
                sqrt: n.sqrt || (t=>s(a, t)),
                invertBatch: t=>function(t, e) {
                    const r = new Array(e.length)
                      , n = e.reduce(((e,n,o)=>t.is0(n) ? e : (r[o] = e,
                    t.mul(e, n))), t.ONE)
                      , o = t.inv(n);
                    return e.reduceRight(((e,n,o)=>t.is0(n) ? e : (r[o] = t.mul(e, r[o]),
                    t.mul(e, n))), o),
                    r
                }(a, t),
                cmov: (t,e,r)=>r ? e : t,
                toBytes: t=>r ? Or(t, i) : Ir(t, i),
                fromBytes: t=>{
                    if (t.length !== i)
                        throw new Error(`Fp.fromBytes: expected ${i}, got ${t.length}`);
                    return r ? Br(t) : Tr(t)
                }
            });
            return Object.freeze(a)
        }(yn, void 0, void 0, {
            sqrt: vn
        })
          , xn = function(t, e) {
            const r = e=>an({
                ...t,
                ...pn(e)
            });
            return Object.freeze({
                ...r(e),
                create: r
            })
        }({
            a: BigInt(0),
            b: BigInt(7),
            Fp: En,
            n: gn,
            Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
            Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
            h: BigInt(1),
            lowS: !0,
            endo: {
                beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
                splitScalar: t=>{
                    const e = gn
                      , r = BigInt("0x3086d221a7d46bcde86c90e49284eb15")
                      , n = -wn * BigInt("0xe4437ed6010e88286f547fa90abfe4c3")
                      , o = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8")
                      , i = r
                      , s = BigInt("0x100000000000000000000000000000000")
                      , a = mn(i * t, e)
                      , c = mn(-n * t, e);
                    let u = qr(t - a * r - c * o, e)
                      , f = qr(-a * n - c * i, e);
                    const h = u > s
                      , l = f > s;
                    if (h && (u = e - u),
                    l && (f = e - f),
                    u > s || f > s)
                        throw new Error("splitScalar: Endomorphism failed, k=" + t);
                    return {
                        k1neg: h,
                        k1: u,
                        k2neg: l,
                        k2: f
                    }
                }
            }
        }, Q);
        BigInt(0);
        xn.ProjectivePoint;
        xn.utils.randomPrivateKey;
        const An = function(t, e) {
            const r = e.map((t=>Array.from(t).reverse()));
            return (e,n)=>{
                const [o,i,s,a] = r.map((r=>r.reduce(((r,n)=>t.add(t.mul(r, e), n)))));
                return e = t.div(o, i),
                n = t.mul(n, t.div(s, a)),
                {
                    x: e,
                    y: n
                }
            }
        }(En, [["0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7", "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581", "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262", "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"], ["0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b", "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14", "0x0000000000000000000000000000000000000000000000000000000000000001"], ["0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c", "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3", "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931", "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"], ["0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b", "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573", "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f", "0x0000000000000000000000000000000000000000000000000000000000000001"]].map((t=>t.map((t=>BigInt(t))))))
          , Sn = function(t, e) {
            if (Qr(t),
            !t.isValid(e.A) || !t.isValid(e.B) || !t.isValid(e.Z))
                throw new Error("mapToCurveSimpleSWU: invalid opts");
            const r = function(t, e) {
                const r = t.ORDER;
                let n = 0n;
                for (let t = r - 1n; t % 2n === 0n; t /= 2n)
                    n += 1n;
                const o = n
                  , i = (r - 1n) / 2n ** o
                  , s = (i - 1n) / 2n
                  , a = 2n ** o - 1n
                  , c = 2n ** (o - 1n)
                  , u = t.pow(e, i)
                  , f = t.pow(e, (i + 1n) / 2n);
                let h = (e,r)=>{
                    let n = u
                      , i = t.pow(r, a)
                      , h = t.sqr(i);
                    h = t.mul(h, r);
                    let l = t.mul(e, h);
                    l = t.pow(l, s),
                    l = t.mul(l, i),
                    i = t.mul(l, r),
                    h = t.mul(l, e);
                    let d = t.mul(h, i);
                    l = t.pow(d, c);
                    let p = t.eql(l, t.ONE);
                    i = t.mul(h, f),
                    l = t.mul(d, n),
                    h = t.cmov(i, h, p),
                    d = t.cmov(l, d, p);
                    for (let e = o; e > 1; e--) {
                        let r = 2n ** (e - 2n)
                          , o = t.pow(d, r);
                        const s = t.eql(o, t.ONE);
                        i = t.mul(h, n),
                        n = t.mul(n, n),
                        o = t.mul(d, n),
                        h = t.cmov(i, h, s),
                        d = t.cmov(o, d, s)
                    }
                    return {
                        isValid: p,
                        value: h
                    }
                }
                ;
                if (t.ORDER % 4n === 3n) {
                    const r = (t.ORDER - 3n) / 4n
                      , n = t.sqrt(t.neg(e));
                    h = (e,o)=>{
                        let i = t.sqr(o);
                        const s = t.mul(e, o);
                        i = t.mul(i, s);
                        let a = t.pow(i, r);
                        a = t.mul(a, s);
                        const c = t.mul(a, n)
                          , u = t.mul(t.sqr(a), o)
                          , f = t.eql(u, e);
                        return {
                            isValid: f,
                            value: t.cmov(c, a, f)
                        }
                    }
                }
                return h
            }(t, e.Z);
            if (!t.isOdd)
                throw new Error("Fp.isOdd is not implemented!");
            return n=>{
                let o, i, s, a, c, u, f, h;
                o = t.sqr(n),
                o = t.mul(o, e.Z),
                i = t.sqr(o),
                i = t.add(i, o),
                s = t.add(i, t.ONE),
                s = t.mul(s, e.B),
                a = t.cmov(e.Z, t.neg(i), !t.eql(i, t.ZERO)),
                a = t.mul(a, e.A),
                i = t.sqr(s),
                u = t.sqr(a),
                c = t.mul(u, e.A),
                i = t.add(i, c),
                i = t.mul(i, s),
                u = t.mul(u, a),
                c = t.mul(u, e.B),
                i = t.add(i, c),
                f = t.mul(o, s);
                const {isValid: l, value: d} = r(i, u);
                h = t.mul(o, n),
                h = t.mul(h, d),
                f = t.cmov(f, s, l),
                h = t.cmov(h, d, l);
                const p = t.isOdd(n) === t.isOdd(h);
                return h = t.cmov(t.neg(h), h, p),
                f = t.div(f, a),
                {
                    x: f,
                    y: h
                }
            }
        }(En, {
            A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
            B: BigInt("1771"),
            Z: En.create(BigInt("-11"))
        })
          , {hashToCurve: Tn, encodeToCurve: Bn} = function(t, e, r) {
            return {
                hashToCurve(n, o) {
                    const i = dn(n, 2, {
                        ...r,
                        DST: r.DST,
                        ...o
                    })
                      , s = t.fromAffine(e(i[0]))
                      , a = t.fromAffine(e(i[1]))
                      , c = s.add(a).clearCofactor();
                    return c.assertValidity(),
                    c
                },
                encodeToCurve(n, o) {
                    const i = dn(n, 1, {
                        ...r,
                        DST: r.encodeDST,
                        ...o
                    })
                      , s = t.fromAffine(e(i[0])).clearCofactor();
                    return s.assertValidity(),
                    s
                }
            }
        }(xn.ProjectivePoint, (t=>{
            const {x: e, y: r} = Sn(En.create(t[0]));
            return An(e, r)
        }
        ), {
            DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
            encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
            p: En.ORDER,
            m: 1,
            k: 128,
            expand: "xmd",
            hash: Q
        });
        function In(t) {
            if (!Number.isSafeInteger(t))
                throw new Error(`Wrong integer: ${t}`)
        }
        function On(...t) {
            const e = (t,e)=>r=>t(e(r));
            return {
                encode: Array.from(t).reverse().reduce(((t,r)=>t ? e(t, r.encode) : r.encode), void 0),
                decode: t.reduce(((t,r)=>t ? e(t, r.decode) : r.decode), void 0)
            }
        }
        function Un(t) {
            return {
                encode: e=>{
                    if (!Array.isArray(e) || e.length && "number" != typeof e[0])
                        throw new Error("alphabet.encode input should be an array of numbers");
                    return e.map((e=>{
                        if (In(e),
                        e < 0 || e >= t.length)
                            throw new Error(`Digit index outside alphabet: ${e} (alphabet: ${t.length})`);
                        return t[e]
                    }
                    ))
                }
                ,
                decode: e=>{
                    if (!Array.isArray(e) || e.length && "string" != typeof e[0])
                        throw new Error("alphabet.decode input should be array of strings");
                    return e.map((e=>{
                        if ("string" != typeof e)
                            throw new Error(`alphabet.decode: not string element=${e}`);
                        const r = t.indexOf(e);
                        if (-1 === r)
                            throw new Error(`Unknown letter: "${e}". Allowed: ${t}`);
                        return r
                    }
                    ))
                }
            }
        }
        function Mn(t="") {
            if ("string" != typeof t)
                throw new Error("join separator should be string");
            return {
                encode: e=>{
                    if (!Array.isArray(e) || e.length && "string" != typeof e[0])
                        throw new Error("join.encode input should be array of strings");
                    for (let t of e)
                        if ("string" != typeof t)
                            throw new Error(`join.encode: non-string input=${t}`);
                    return e.join(t)
                }
                ,
                decode: e=>{
                    if ("string" != typeof e)
                        throw new Error("join.decode input should be string");
                    return e.split(t)
                }
            }
        }
        function kn(t, e="=") {
            if (In(t),
            "string" != typeof e)
                throw new Error("padding chr should be string");
            return {
                encode(r) {
                    if (!Array.isArray(r) || r.length && "string" != typeof r[0])
                        throw new Error("padding.encode input should be array of strings");
                    for (let t of r)
                        if ("string" != typeof t)
                            throw new Error(`padding.encode: non-string input=${t}`);
                    for (; r.length * t % 8; )
                        r.push(e);
                    return r
                },
                decode(r) {
                    if (!Array.isArray(r) || r.length && "string" != typeof r[0])
                        throw new Error("padding.encode input should be array of strings");
                    for (let t of r)
                        if ("string" != typeof t)
                            throw new Error(`padding.decode: non-string input=${t}`);
                    let n = r.length;
                    if (n * t % 8)
                        throw new Error("Invalid padding: string should have whole number of bytes");
                    for (; n > 0 && r[n - 1] === e; n--)
                        if (!((n - 1) * t % 8))
                            throw new Error("Invalid padding: string has too much padding");
                    return r.slice(0, n)
                }
            }
        }
        function jn(t) {
            if ("function" != typeof t)
                throw new Error("normalize fn should be function");
            return {
                encode: t=>t,
                decode: e=>t(e)
            }
        }
        function Nn(t, e, r) {
            if (e < 2)
                throw new Error(`convertRadix: wrong from=${e}, base cannot be less than 2`);
            if (r < 2)
                throw new Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
            if (!Array.isArray(t))
                throw new Error("convertRadix: data should be array");
            if (!t.length)
                return [];
            let n = 0;
            const o = []
              , i = Array.from(t);
            for (i.forEach((t=>{
                if (In(t),
                t < 0 || t >= e)
                    throw new Error(`Wrong integer: ${t}`)
            }
            )); ; ) {
                let t = 0
                  , s = !0;
                for (let o = n; o < i.length; o++) {
                    const a = i[o]
                      , c = e * t + a;
                    if (!Number.isSafeInteger(c) || e * t / e !== t || c - a != e * t)
                        throw new Error("convertRadix: carry overflow");
                    if (t = c % r,
                    i[o] = Math.floor(c / r),
                    !Number.isSafeInteger(i[o]) || i[o] * r + t !== c)
                        throw new Error("convertRadix: carry overflow");
                    s && (i[o] ? s = !1 : n = o)
                }
                if (o.push(t),
                s)
                    break
            }
            for (let e = 0; e < t.length - 1 && 0 === t[e]; e++)
                o.push(0);
            return o.reverse()
        }
        const Ln = (t,e)=>e ? Ln(e, t % e) : t
          , _n = (t,e)=>t + (e - Ln(t, e));
        function Dn(t, e, r, n) {
            if (!Array.isArray(t))
                throw new Error("convertRadix2: data should be array");
            if (e <= 0 || e > 32)
                throw new Error(`convertRadix2: wrong from=${e}`);
            if (r <= 0 || r > 32)
                throw new Error(`convertRadix2: wrong to=${r}`);
            if (_n(e, r) > 32)
                throw new Error(`convertRadix2: carry overflow from=${e} to=${r} carryBits=${_n(e, r)}`);
            let o = 0
              , i = 0;
            const s = 2 ** r - 1
              , a = [];
            for (const n of t) {
                if (In(n),
                n >= 2 ** e)
                    throw new Error(`convertRadix2: invalid data word=${n} from=${e}`);
                if (o = o << e | n,
                i + e > 32)
                    throw new Error(`convertRadix2: carry overflow pos=${i} from=${e}`);
                for (i += e; i >= r; i -= r)
                    a.push((o >> i - r & s) >>> 0);
                o &= 2 ** i - 1
            }
            if (o = o << r - i & s,
            !n && i >= e)
                throw new Error("Excess padding");
            if (!n && o)
                throw new Error(`Non-zero padding: ${o}`);
            return n && i > 0 && a.push(o >>> 0),
            a
        }
        function Cn(t, e=!1) {
            if (In(t),
            t <= 0 || t > 32)
                throw new Error("radix2: bits should be in (0..32]");
            if (_n(8, t) > 32 || _n(t, 8) > 32)
                throw new Error("radix2: carry overflow");
            return {
                encode: r=>{
                    if (!(r instanceof Uint8Array))
                        throw new Error("radix2.encode input should be Uint8Array");
                    return Dn(Array.from(r), 8, t, !e)
                }
                ,
                decode: r=>{
                    if (!Array.isArray(r) || r.length && "number" != typeof r[0])
                        throw new Error("radix2.decode input should be array of strings");
                    return Uint8Array.from(Dn(r, t, 8, e))
                }
            }
        }
        function Rn(t) {
            if ("function" != typeof t)
                throw new Error("unsafeWrapper fn should be function");
            return function(...e) {
                try {
                    return t.apply(null, e)
                } catch (t) {}
            }
        }
        const Pn = On(Cn(4), Un("0123456789ABCDEF"), Mn(""))
          , zn = On(Cn(5), Un("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), kn(5), Mn(""))
          , $n = (On(Cn(5), Un("0123456789ABCDEFGHIJKLMNOPQRSTUV"), kn(5), Mn("")),
        On(Cn(5), Un("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), Mn(""), jn((t=>t.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")))),
        On(Cn(6), Un("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), kn(6), Mn("")))
          , Hn = On(Cn(6), Un("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), kn(6), Mn(""))
          , Vn = t=>{
            return On((In(e = 58),
            {
                encode: t=>{
                    if (!(t instanceof Uint8Array))
                        throw new Error("radix.encode input should be Uint8Array");
                    return Nn(Array.from(t), 256, e)
                }
                ,
                decode: t=>{
                    if (!Array.isArray(t) || t.length && "number" != typeof t[0])
                        throw new Error("radix.decode input should be array of strings");
                    return Uint8Array.from(Nn(t, e, 256))
                }
            }), Un(t), Mn(""));
            var e
        }
          , Fn = Vn("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
          , qn = (Vn("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"),
        Vn("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"),
        [0, 2, 3, 5, 6, 7, 9, 10, 11])
          , Gn = {
            encode(t) {
                let e = "";
                for (let r = 0; r < t.length; r += 8) {
                    const n = t.subarray(r, r + 8);
                    e += Fn.encode(n).padStart(qn[n.length], "1")
                }
                return e
            },
            decode(t) {
                let e = [];
                for (let r = 0; r < t.length; r += 11) {
                    const n = t.slice(r, r + 11)
                      , o = qn.indexOf(n.length)
                      , i = Fn.decode(n);
                    for (let t = 0; t < i.length - o; t++)
                        if (0 !== i[t])
                            throw new Error("base58xmr: wrong padding");
                    e = e.concat(Array.from(i.slice(i.length - o)))
                }
                return Uint8Array.from(e)
            }
        }
          , Yn = On(Un("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), Mn(""))
          , Wn = [996825010, 642813549, 513874426, 1027748829, 705979059];
        function Kn(t) {
            const e = t >> 25;
            let r = (33554431 & t) << 5;
            for (let t = 0; t < Wn.length; t++)
                1 == (e >> t & 1) && (r ^= Wn[t]);
            return r
        }
        function Qn(t, e, r=1) {
            const n = t.length;
            let o = 1;
            for (let e = 0; e < n; e++) {
                const r = t.charCodeAt(e);
                if (r < 33 || r > 126)
                    throw new Error(`Invalid prefix (${t})`);
                o = Kn(o) ^ r >> 5
            }
            o = Kn(o);
            for (let e = 0; e < n; e++)
                o = Kn(o) ^ 31 & t.charCodeAt(e);
            for (let t of e)
                o = Kn(o) ^ t;
            for (let t = 0; t < 6; t++)
                o = Kn(o);
            return o ^= r,
            Yn.encode(Dn([o % 2 ** 30], 30, 5, !1))
        }
        function Zn(t) {
            const e = "bech32" === t ? 1 : 734539939
              , r = Cn(5)
              , n = r.decode
              , o = r.encode
              , i = Rn(n);
            function s(t, r=90) {
                if ("string" != typeof t)
                    throw new Error("bech32.decode input should be string, not " + typeof t);
                if (t.length < 8 || !1 !== r && t.length > r)
                    throw new TypeError(`Wrong string length: ${t.length} (${t}). Expected (8..${r})`);
                const n = t.toLowerCase();
                if (t !== n && t !== t.toUpperCase())
                    throw new Error("String must be lowercase or uppercase");
                const o = (t = n).lastIndexOf("1");
                if (0 === o || -1 === o)
                    throw new Error('Letter "1" must be present between prefix and data only');
                const i = t.slice(0, o)
                  , s = t.slice(o + 1);
                if (s.length < 6)
                    throw new Error("Data must be at least 6 characters long");
                const a = Yn.decode(s).slice(0, -6)
                  , c = Qn(i, a, e);
                if (!s.endsWith(c))
                    throw new Error(`Invalid checksum in ${t}: expected "${c}"`);
                return {
                    prefix: i,
                    words: a
                }
            }
            return {
                encode: function(t, r, n=90) {
                    if ("string" != typeof t)
                        throw new Error("bech32.encode prefix should be string, not " + typeof t);
                    if (!Array.isArray(r) || r.length && "number" != typeof r[0])
                        throw new Error("bech32.encode words should be array of numbers, not " + typeof r);
                    const o = t.length + 7 + r.length;
                    if (!1 !== n && o > n)
                        throw new TypeError(`Length ${o} exceeds limit ${n}`);
                    return `${t = t.toLowerCase()}1${Yn.encode(r)}${Qn(t, r, e)}`
                },
                decode: s,
                decodeToBytes: function(t) {
                    const {prefix: e, words: r} = s(t, !1);
                    return {
                        prefix: e,
                        words: r,
                        bytes: n(r)
                    }
                },
                decodeUnsafe: Rn(s),
                fromWords: n,
                fromWordsUnsafe: i,
                toWords: o
            }
        }
        Zn("bech32"),
        Zn("bech32m");
        const Jn = {
            utf8: {
                encode: t=>(new TextDecoder).decode(t),
                decode: t=>(new TextEncoder).encode(t)
            },
            hex: On(Cn(4), Un("0123456789abcdef"), Mn(""), jn((t=>{
                if ("string" != typeof t || t.length % 2)
                    throw new TypeError(`hex.decode: expected string, got ${typeof t} with length ${t.length}`);
                return t.toLowerCase()
            }
            ))),
            base16: Pn,
            base32: zn,
            base64: $n,
            base64url: Hn,
            base58: Fn,
            base58xmr: Gn
        };
        var Xn;
        Object.keys(Jn).join(", "),
        xn.ProjectivePoint,
        Xn = Q,
        On(function(t, e) {
            if (In(t),
            "function" != typeof e)
                throw new Error("checksum fn should be function");
            return {
                encode(r) {
                    if (!(r instanceof Uint8Array))
                        throw new Error("checksum.encode: input should be Uint8Array");
                    const n = e(r).slice(0, t)
                      , o = new Uint8Array(r.length + t);
                    return o.set(r),
                    o.set(n, r.length),
                    o
                },
                decode(r) {
                    if (!(r instanceof Uint8Array))
                        throw new Error("checksum.decode: input should be Uint8Array");
                    const n = r.slice(0, -t)
                      , o = e(n).slice(0, t)
                      , i = r.slice(-t);
                    for (let e = 0; e < t; e++)
                        if (o[e] !== i[e])
                            throw new Error("Invalid checksum");
                    return n
                }
            }
        }(4, (t=>Xn(Xn(t)))), Fn),
        C("Bitcoin seed"),
        r(2463),
        r(6057);
        var to = (t,e,r)=>{
            if (!e.has(t))
                throw TypeError("Cannot " + r)
        }
          , eo = (t,e,r)=>(to(t, e, "read from private field"),
        r ? r.call(t) : e.get(t))
          , ro = (t,e,r)=>{
            if (e.has(t))
                throw TypeError("Cannot add the same private member more than once");
            e instanceof WeakSet ? e.add(t) : e.set(t, r)
        }
          , no = (t,e,r,n)=>(to(t, e, "write to private field"),
        n ? n.call(t, r) : e.set(t, r),
        r)
          , oo = (t,e,r)=>(to(t, e, "access private method"),
        r)
          , io = Lt()
          , so = Lt()
          , ao = Lt()
          , co = Lt()
          , uo = Lt()
          , fo = Lt()
          , ho = Dt([kt({
            AddressOwner: uo
        }), kt({
            ObjectOwner: uo
        }), kt({
            Shared: kt({
                initial_shared_version: Mt()
            })
        }), It("Immutable")])
          , lo = xt("SuiJsonValue", (()=>!0))
          , po = 32;
        function yo(t, e=!1) {
            let r = t.toLowerCase();
            return !e && r.startsWith("0x") && (r = r.slice(2)),
            `0x${r.padStart(2 * po, "0")}`
        }
        function go(t, e=!1) {
            return yo(t, e)
        }
        Dt([Lt(), It("package")]);
        var wo = kt({
            digest: io,
            objectId: Lt(),
            version: Dt([Mt(), Lt()])
        })
          , bo = kt({
            payment: St(wo),
            owner: Lt(),
            price: Lt(),
            budget: Lt()
        })
          , mo = Et(wo, kt({
            type: Lt(),
            owner: ho,
            previousTransaction: io
        }))
          , vo = Nt(Lt(), At())
          , Eo = Nt(Lt(), Lt())
          , xo = kt({
            type: Lt(),
            fields: vo,
            hasPublicTransfer: Tt()
        })
          , Ao = kt({
            disassembled: Eo
        })
          , So = Dt([Et(xo, kt({
            dataType: It("moveObject")
        })), Et(Ao, kt({
            dataType: It("package")
        }))])
          , To = (kt({
            type: Lt(),
            hasPublicTransfer: Tt(),
            version: fo,
            bcsBytes: St(Mt())
        }),
        kt({
            id: co,
            moduleMap: Nt(Lt(), Lt())
        }))
          , Bo = Dt([Et(xo, kt({
            dataType: It("moveObject")
        })), Et(To, kt({
            dataType: It("package")
        }))])
          , Io = (BigInt(1e9),
        Lt())
          , Oo = kt({
            code: Lt(),
            error: jt(Lt()),
            object_id: jt(co),
            version: jt(fo),
            digest: jt(Io)
        })
          , Uo = Dt([kt({
            data: Ut(Nt(Lt(), Lt())),
            error: Ut(Oo)
        }), jt(Nt(Lt(), Lt()))])
          , Mo = kt({
            objectId: co,
            version: fo,
            digest: Io,
            type: jt(Lt()),
            content: jt(So),
            bcs: jt(Bo),
            owner: jt(ho),
            previousTransaction: jt(io),
            storageRebate: jt(Lt()),
            display: jt(Uo)
        })
          , ko = (kt({
            showType: jt(Tt()),
            showContent: jt(Tt()),
            showBcs: jt(Tt()),
            showOwner: jt(Tt()),
            showPreviousTransaction: jt(Tt()),
            showStorageRebate: jt(Tt()),
            showDisplay: jt(Tt())
        }),
        Dt([It("Exists"), It("notExists"), It("Deleted")]),
        St(mo),
        kt({
            data: jt(Mo),
            error: jt(Oo)
        }));
        function jo(t) {
            return t.data
        }
        var No = kt({
            objectId: co,
            atCheckpoint: jt(Mt())
        })
          , Lo = (kt({
            data: St(ko),
            nextCursor: Dt([Ut(co), Ut(No)]),
            hasNextPage: Tt()
        }),
        kt({
            txDigest: io,
            eventSeq: fo
        }))
          , _o = kt({
            id: Lo,
            packageId: co,
            transactionModule: Lt(),
            sender: uo,
            type: Lt(),
            parsedJson: jt(Nt(Lt(), At())),
            bcs: jt(Lt()),
            timestampMs: jt(Lt())
        });
        kt({
            data: St(_o),
            nextCursor: Ut(Lo),
            hasNextPage: Tt()
        }),
        kt({
            subscription: Mt(),
            result: _o
        });
        var Do = Lt()
          , Co = kt({
            epoch: Do,
            storage_charge: Lt(),
            computation_charge: Lt(),
            storage_rebate: Lt(),
            epoch_start_timestamp_ms: jt(Lt())
        })
          , Ro = kt({
            epoch: Do,
            round: Lt(),
            commit_timestamp_ms: Lt()
        })
          , Po = kt({
            objects: St(co)
        })
          , zo = Dt([It("GasCoin"), kt({
            Input: Mt()
        }), kt({
            Result: Mt()
        }), kt({
            NestedResult: _t([Mt(), Mt()])
        })])
          , $o = kt({
            arguments: jt(St(zo)),
            type_arguments: jt(St(Lt())),
            package: co,
            module: Lt(),
            function: Lt()
        })
          , Ho = Dt([kt({
            MoveCall: $o
        }), kt({
            TransferObjects: _t([St(zo), zo])
        }), kt({
            SplitCoins: _t([zo, St(zo)])
        }), kt({
            MergeCoins: _t([zo, St(zo)])
        }), kt({
            Publish: _t([Ao, St(co)])
        }), kt({
            Upgrade: _t([Ao, St(co), co, zo])
        }), kt({
            MakeMoveVec: _t([Ut(Lt()), St(zo)])
        })])
          , Vo = Dt([kt({
            type: It("pure"),
            valueType: jt(Lt()),
            value: lo
        }), kt({
            type: It("object"),
            objectType: It("immOrOwnedObject"),
            objectId: co,
            version: fo,
            digest: Io
        }), kt({
            type: It("object"),
            objectType: It("sharedObject"),
            objectId: co,
            initialSharedVersion: fo,
            mutable: Tt()
        })])
          , Fo = kt({
            transactions: St(Ho),
            inputs: St(Vo)
        })
          , qo = Dt([Et(Co, kt({
            kind: It("ChangeEpoch")
        })), Et(Ro, kt({
            kind: It("ConsensusCommitPrologue")
        })), Et(Po, kt({
            kind: It("Genesis")
        })), Et(Fo, kt({
            kind: It("ProgrammableTransaction")
        }))])
          , Go = kt({
            messageVersion: It("v1"),
            transaction: qo,
            sender: uo,
            gasData: bo
        })
          , Yo = Lt()
          , Wo = (kt({
            epoch: Do,
            signature: Dt([Yo, St(Yo)]),
            signers_map: St(Mt())
        }),
        kt({
            computationCost: Lt(),
            storageCost: Lt(),
            storageRebate: Lt(),
            nonRefundableStorageFee: Lt()
        }))
          , Ko = kt({
            status: Dt([It("success"), It("failure")]),
            error: jt(Lt())
        })
          , Qo = kt({
            owner: ho,
            reference: wo
        })
          , Zo = kt({
            objectId: co,
            sequenceNumber: fo
        })
          , Jo = kt({
            messageVersion: It("v1"),
            status: Ko,
            executedEpoch: Do,
            modifiedAtVersions: jt(St(Zo)),
            gasUsed: Wo,
            sharedObjects: jt(St(wo)),
            transactionDigest: io,
            created: jt(St(Qo)),
            mutated: jt(St(Qo)),
            unwrapped: jt(St(Qo)),
            deleted: jt(St(wo)),
            unwrapped_then_deleted: jt(St(wo)),
            wrapped: jt(St(wo)),
            gasObject: Qo,
            eventsDigest: jt(ao),
            dependencies: jt(St(io))
        })
          , Xo = St(_o)
          , ti = _t([St(Mt()), Lt()])
          , ei = _t([zo, St(Mt()), Lt()])
          , ri = kt({
            mutableReferenceOutputs: jt(St(ei)),
            returnValues: jt(St(ti))
        })
          , ni = (kt({
            effects: Jo,
            events: Xo,
            results: jt(St(ri)),
            error: jt(Lt())
        }),
        Lt())
          , oi = kt({
            data: Go,
            txSignatures: St(Lt())
        })
          , ii = Dt([kt({
            type: It("published"),
            packageId: co,
            version: fo,
            digest: Io,
            modules: St(Lt())
        }), kt({
            type: It("transferred"),
            sender: uo,
            recipient: ho,
            objectType: Lt(),
            objectId: co,
            version: fo,
            digest: Io
        }), kt({
            type: It("mutated"),
            sender: uo,
            owner: ho,
            objectType: Lt(),
            objectId: co,
            version: fo,
            previousVersion: fo,
            digest: Io
        }), kt({
            type: It("deleted"),
            sender: uo,
            objectType: Lt(),
            objectId: co,
            version: fo
        }), kt({
            type: It("wrapped"),
            sender: uo,
            objectType: Lt(),
            objectId: co,
            version: fo
        }), kt({
            type: It("created"),
            sender: uo,
            owner: ho,
            objectType: Lt(),
            objectId: co,
            version: fo,
            digest: Io
        })])
          , si = kt({
            owner: ho,
            coinType: Lt(),
            amount: Lt()
        })
          , ai = kt({
            digest: io,
            transaction: jt(oi),
            effects: jt(Jo),
            events: jt(Xo),
            timestampMs: jt(Lt()),
            checkpoint: jt(Lt()),
            confirmedLocalExecution: jt(Tt()),
            objectChanges: jt(St(ii)),
            balanceChanges: jt(St(si)),
            errors: jt(St(Lt()))
        });
        function ci(t) {
            if ("object" != typeof t || null === t || !("type"in t) || !t.type.startsWith("0x1::option::Option<"))
                return t
        }
        kt({
            showInput: jt(Tt()),
            showEffects: jt(Tt()),
            showEvents: jt(Tt()),
            showObjectChanges: jt(Tt()),
            showBalanceChanges: jt(Tt())
        }),
        kt({
            data: St(ai),
            nextCursor: Ut(io),
            hasNextPage: Tt()
        }),
        kt({
            effects: Jo,
            events: Xo,
            objectChanges: St(ii),
            balanceChanges: St(si),
            input: jt(Go)
        });
        var ui = "0x1";
        go("0x6"),
        kt({
            decimals: Mt(),
            name: Lt(),
            symbol: Lt(),
            description: Lt(),
            iconUrl: Ut(Lt()),
            id: Ut(co)
        });
        var fi = class {
            static isDelegationSuiObject(t) {
                return "type"in t && t.type === fi.SUI_OBJECT_TYPE
            }
            constructor(t) {
                this.suiObject = t
            }
            nextRewardUnclaimedEpoch() {
                return this.suiObject.data.fields.next_reward_unclaimed_epoch
            }
            activeDelegation() {
                return BigInt(ci(this.suiObject.data.fields.active_delegation) || 0)
            }
            delegateAmount() {
                return this.suiObject.data.fields.delegate_amount
            }
            endingEpoch() {
                return ci(this.suiObject.data.fields.ending_epoch)
            }
            validatorAddress() {
                return this.suiObject.data.fields.validator_address
            }
            isActive() {
                return this.activeDelegation() > 0 && !this.endingEpoch()
            }
            hasUnclaimedRewards(t) {
                return this.nextRewardUnclaimedEpoch() <= t && (this.isActive() || (this.endingEpoch() || 0) > t)
            }
        }
        ;
        fi.SUI_OBJECT_TYPE = "0x2::delegation::Delegation";
        var hi = "vector"
          , li = {
            kind: "TransactionKind",
            sender: U.ADDRESS,
            gasData: "GasData",
            expiration: "TransactionExpiration"
        }
          , di = {
            enums: {
                "Option<T>": {
                    None: null,
                    Some: "T"
                },
                ObjectArg: {
                    ImmOrOwned: "SuiObjectRef",
                    Shared: "SharedObjectRef"
                },
                CallArg: {
                    Pure: [hi, U.U8],
                    Object: "ObjectArg",
                    ObjVec: [hi, "ObjectArg"]
                },
                TypeTag: {
                    bool: null,
                    u8: null,
                    u64: null,
                    u128: null,
                    address: null,
                    signer: null,
                    vector: "TypeTag",
                    struct: "StructTag",
                    u16: null,
                    u32: null,
                    u256: null
                },
                TransactionKind: {
                    ProgrammableTransaction: "ProgrammableTransaction",
                    ChangeEpoch: null,
                    Genesis: null,
                    ConsensusCommitPrologue: null
                },
                TransactionExpiration: {
                    None: null,
                    Epoch: U.U64
                },
                TransactionData: {
                    V1: "TransactionDataV1"
                }
            },
            structs: {
                SuiObjectRef: {
                    objectId: U.ADDRESS,
                    version: U.U64,
                    digest: "ObjectDigest"
                },
                SharedObjectRef: {
                    objectId: U.ADDRESS,
                    initialSharedVersion: U.U64,
                    mutable: U.BOOL
                },
                StructTag: {
                    address: U.ADDRESS,
                    module: U.STRING,
                    name: U.STRING,
                    typeParams: [hi, "TypeTag"]
                },
                GasData: {
                    payment: [hi, "SuiObjectRef"],
                    owner: U.ADDRESS,
                    price: U.U64,
                    budget: U.U64
                },
                SenderSignedData: {
                    data: "TransactionData",
                    txSignatures: [hi, [hi, U.U8]]
                },
                TransactionDataV1: li
            },
            aliases: {
                ObjectDigest: U.BASE58
            }
        }
          , pi = new U({
            genericSeparators: ["<", ">"],
            vectorType: "vector",
            addressLength: 32,
            addressEncoding: "hex",
            types: di
        });
        pi.registerType("utf8string", ((t,e)=>{
            const r = Array.from((new TextEncoder).encode(e));
            return t.writeVec(r, ((t,e)=>t.write8(e)))
        }
        ), (t=>{
            let e = t.readVec((t=>t.read8()));
            return (new TextDecoder).decode(new Uint8Array(e))
        }
        ));
        var yi = kt({
            amount: Mt(),
            id: co,
            transferTxDigest: io
        })
          , gi = (kt({
            transferredGasObjects: St(yi),
            error: Ut(Lt())
        }),
        St(Dt([Lt(), kt({
            Object: Lt()
        })])),
        kt({
            address: Lt(),
            name: Lt()
        }))
          , wi = Dt([It("Private"), It("Public"), It("Friend")])
          , bi = kt({
            abilities: St(Lt())
        })
          , mi = kt({
            constraints: bi,
            isPhantom: Tt()
        })
          , vi = kt({
            TypeParameter: Mt()
        });
        function Ei(t) {
            if (!t)
                return !1;
            if ("string" == typeof t)
                return !0;
            if (mt(t, vi))
                return !0;
            if (Ai(t))
                return !0;
            if ("object" != typeof t)
                return !1;
            const e = t;
            return !!mt(e.Reference, xi) || !!mt(e.MutableReference, xi) || !!mt(e.Vector, xi)
        }
        var xi = xt("SuiMoveNormalizedType", Ei);
        function Ai(t) {
            if (!t || "object" != typeof t)
                return !1;
            const e = t;
            if (!e.Struct || "object" != typeof e.Struct)
                return !1;
            const r = e.Struct;
            return !("string" != typeof r.address || "string" != typeof r.module || "string" != typeof r.name || !Array.isArray(r.typeArguments) || !r.typeArguments.every((t=>Ei(t))))
        }
        xt("SuiMoveNormalizedStructType", Ai);
        var Si = kt({
            visibility: wi,
            isEntry: Tt(),
            typeParameters: St(bi),
            parameters: St(xi),
            return: St(xi)
        })
          , Ti = kt({
            name: Lt(),
            type: xi
        })
          , Bi = kt({
            abilities: bi,
            typeParameters: St(mi),
            fields: St(Ti)
        })
          , Ii = kt({
            fileFormatVersion: Mt(),
            address: Lt(),
            name: Lt(),
            friends: St(gi),
            structs: Nt(Lt(), Bi),
            exposedFunctions: Nt(Lt(), Si)
        });
        function Oi(t) {
            return "object" == typeof t && "MutableReference"in t ? t.MutableReference : void 0
        }
        function Ui(t) {
            if ("object" == typeof t && "Struct"in t)
                return t;
            const e = function(t) {
                return "object" == typeof t && "Reference"in t ? t.Reference : void 0
            }(t)
              , r = Oi(t);
            return "object" == typeof e && "Struct"in e ? e : "object" == typeof r && "Struct"in r ? r : void 0
        }
        Nt(Lt(), Ii),
        kt({
            value: Mt()
        });
        var Mi = kt({
            stakedSuiId: co,
            stakeRequestEpoch: Do,
            stakeActiveEpoch: Do,
            principal: Lt(),
            status: Dt([It("Active"), It("Pending"), It("Unstaked")]),
            estimatedReward: jt(Mt())
        })
          , ki = (kt({
            validatorAddress: uo,
            stakingPool: co,
            stakes: St(Mi)
        }),
        kt({
            balance: kt({
                value: Mt()
            }),
            distribution_counter: Mt(),
            current_distribution_amount: Mt(),
            stake_subsidy_period_length: Mt(),
            stake_subsidy_decrease_rate: Mt()
        }))
          , ji = (kt({
            type: Lt(),
            fields: ki
        }),
        kt({
            value: Mt()
        }),
        kt({
            id: Lt(),
            size: Mt(),
            head: kt({
                vec: St()
            }),
            tail: kt({
                vec: St()
            })
        }))
          , Ni = (kt({
            id: Lt(),
            size: Mt()
        }),
        kt({
            type: Lt(),
            fields: ji
        }),
        kt({
            exchangeRates: kt({
                id: Lt(),
                size: Mt()
            }),
            id: Lt(),
            pendingStake: Mt(),
            pendingPoolTokenWithdraw: Mt(),
            pendingTotalSuiWithdraw: Mt(),
            poolTokenBalance: Mt(),
            rewardsPool: kt({
                value: Mt()
            }),
            activationEpoch: kt({
                vec: St()
            }),
            deactivationEpoch: kt({
                vec: St()
            }),
            suiBalance: Mt()
        }))
          , Li = (kt({
            type: Lt(),
            fields: Ni
        }),
        kt({
            epoch: Do,
            validators: St(_t([ni, Lt()]))
        }),
        kt({
            suiAddress: uo,
            protocolPubkeyBytes: Lt(),
            networkPubkeyBytes: Lt(),
            workerPubkeyBytes: Lt(),
            proofOfPossessionBytes: Lt(),
            operationCapId: Lt(),
            name: Lt(),
            description: Lt(),
            imageUrl: Lt(),
            projectUrl: Lt(),
            p2pAddress: Lt(),
            netAddress: Lt(),
            primaryAddress: Lt(),
            workerAddress: Lt(),
            nextEpochProtocolPubkeyBytes: Ut(Lt()),
            nextEpochProofOfPossession: Ut(Lt()),
            nextEpochNetworkPubkeyBytes: Ut(Lt()),
            nextEpochWorkerPubkeyBytes: Ut(Lt()),
            nextEpochNetAddress: Ut(Lt()),
            nextEpochP2pAddress: Ut(Lt()),
            nextEpochPrimaryAddress: Ut(Lt()),
            nextEpochWorkerAddress: Ut(Lt()),
            votingPower: Lt(),
            gasPrice: Lt(),
            commissionRate: Lt(),
            nextEpochStake: Lt(),
            nextEpochGasPrice: Lt(),
            nextEpochCommissionRate: Lt(),
            stakingPoolId: Lt(),
            stakingPoolActivationEpoch: Ut(Lt()),
            stakingPoolDeactivationEpoch: Ut(Lt()),
            stakingPoolSuiBalance: Lt(),
            rewardsPool: Lt(),
            poolTokenBalance: Lt(),
            pendingStake: Lt(),
            pendingPoolTokenWithdraw: Lt(),
            pendingTotalSuiWithdraw: Lt(),
            exchangeRatesId: Lt(),
            exchangeRatesSize: Lt()
        }))
          , _i = (kt({
            epoch: Lt(),
            protocolVersion: Lt(),
            systemStateVersion: Lt(),
            storageFundTotalObjectStorageRebates: Lt(),
            storageFundNonRefundableBalance: Lt(),
            referenceGasPrice: Lt(),
            safeMode: Tt(),
            safeModeStorageRewards: Lt(),
            safeModeComputationRewards: Lt(),
            safeModeStorageRebates: Lt(),
            safeModeNonRefundableStorageFee: Lt(),
            epochStartTimestampMs: Lt(),
            epochDurationMs: Lt(),
            stakeSubsidyStartEpoch: Lt(),
            maxValidatorCount: Lt(),
            minValidatorJoiningStake: Lt(),
            validatorLowStakeThreshold: Lt(),
            validatorVeryLowStakeThreshold: Lt(),
            validatorLowStakeGracePeriod: Lt(),
            stakeSubsidyBalance: Lt(),
            stakeSubsidyDistributionCounter: Lt(),
            stakeSubsidyCurrentDistributionAmount: Lt(),
            stakeSubsidyPeriodLength: Lt(),
            stakeSubsidyDecreaseRate: Mt(),
            totalStake: Lt(),
            activeValidators: St(Li),
            pendingActiveValidatorsId: Lt(),
            pendingActiveValidatorsSize: Lt(),
            pendingRemovals: St(Lt()),
            stakingPoolMappingsId: Lt(),
            stakingPoolMappingsSize: Lt(),
            inactivePoolsId: Lt(),
            inactivePoolsSize: Lt(),
            validatorCandidatesId: Lt(),
            validatorCandidatesSize: Lt(),
            atRiskValidators: St(_t([uo, Lt()])),
            validatorReportRecords: St(_t([uo, St(uo)]))
        }),
        kt({
            coinType: Lt(),
            coinObjectId: co,
            version: Lt(),
            digest: io,
            balance: Lt(),
            lockedUntilEpoch: Ut(Mt()),
            previousTransaction: io
        }))
          , Di = (kt({
            data: St(_i),
            nextCursor: Ut(co),
            hasNextPage: Tt()
        }),
        kt({
            coinType: Lt(),
            coinObjectCount: Mt(),
            totalBalance: Lt(),
            lockedBalance: kt({
                epochId: jt(Mt()),
                number: jt(Mt())
            })
        }),
        kt({
            value: Lt()
        }),
        kt({
            computationCost: Lt(),
            storageCost: Lt(),
            storageRebate: Lt(),
            nonRefundableStorageFee: Lt()
        }))
          , Ci = (Lt(),
        Lt())
          , Ri = (kt({
            digest: St(Mt())
        }),
        At())
          , Pi = Lt()
          , zi = kt({
            nextEpochCommittee: St(_t([Lt(), Lt()])),
            nextEpochProtocolVersion: Lt(),
            epochCommitments: St(Ri)
        })
          , $i = (kt({
            transaction: io,
            effects: so
        }),
        kt({
            epoch: Lt(),
            sequenceNumber: Lt(),
            digest: Ci,
            networkTotalTransactions: Lt(),
            previousDigest: jt(Ci),
            epochRollingGasCostSummary: Di,
            timestampMs: Lt(),
            endOfEpochData: jt(zi),
            validatorSignature: jt(Pi),
            transactions: St(io),
            checkpointCommitments: St(Ri)
        }));
        kt({
            data: St($i),
            nextCursor: Ut(Lt()),
            hasNextPage: Tt()
        });
        Error,
        Error,
        Error,
        kt({
            jsonrpc: It("2.0"),
            id: Lt(),
            result: At()
        }),
        kt({
            jsonrpc: It("2.0"),
            id: Lt(),
            error: kt({
                code: At(),
                message: Lt(),
                data: jt(At())
            })
        });
        var Hi, Vi = Dt([It("DynamicField"), It("DynamicObject")]), Fi = kt({
            type: Lt(),
            value: At()
        }), qi = kt({
            name: Fi,
            bcsName: Lt(),
            type: Vi,
            objectType: Lt(),
            objectId: co,
            version: Mt(),
            digest: Lt()
        });
        kt({
            data: St(qi),
            nextCursor: Ut(co),
            hasNextPage: Tt()
        });
        var Gi = class {
            constructor(t) {
                ro(this, Hi, void 0),
                no(this, Hi, t)
            }
            get fullnode() {
                return eo(this, Hi).fullnode
            }
            get websocket() {
                return eo(this, Hi).websocket || eo(this, Hi).fullnode
            }
            get faucet() {
                return eo(this, Hi).faucet
            }
        }
        ;
        function Yi(t, e) {
            return wt(t, e)
        }
        Hi = new WeakMap,
        new Gi({
            fullnode: "http://127.0.0.1:9000",
            faucet: "http://127.0.0.1:9123/gas"
        }),
        new Gi({
            fullnode: "https://fullnode.devnet.sui.io:443/",
            faucet: "https://faucet.devnet.sui.io/gas"
        }),
        new Gi({
            fullnode: "https://fullnode.testnet.sui.io:443/",
            faucet: "https://faucet.testnet.sui.io/gas"
        });
        var Wi = Symbol("transaction-argument-type")
          , Ki = kt({
            kind: It("Input"),
            index: Bt(),
            value: jt(At()),
            type: jt(Dt([It("pure"), It("object")]))
        })
          , Qi = [Ki, kt({
            kind: It("GasCoin")
        }), kt({
            kind: It("Result"),
            index: Bt()
        }), kt({
            kind: It("NestedResult"),
            index: Bt(),
            resultIndex: Bt()
        })]
          , Zi = Dt([...Qi])
          , Ji = Dt([...Qi]);
        Ji[Wi] = {
            kind: "object"
        };
        var Xi, ts = t=>{
            const e = Dt([...Qi]);
            return e[Wi] = {
                kind: "pure",
                type: t
            },
            e
        }
        , es = kt({
            kind: It("MoveCall"),
            target: xt("target", Lt().validator),
            typeArguments: St(Lt()),
            arguments: St(Zi)
        }), rs = kt({
            kind: It("TransferObjects"),
            objects: St(Ji),
            address: ts(U.ADDRESS)
        }), ns = kt({
            kind: It("SplitCoins"),
            coin: Ji,
            amounts: St(ts("u64"))
        }), os = kt({
            kind: It("MergeCoins"),
            destination: Ji,
            sources: St(Ji)
        }), is = kt({
            kind: It("MakeMoveVec"),
            type: jt((Xi = Lt(),
            Dt([kt({
                None: It(null)
            }), kt({
                Some: Xi
            })]))),
            objects: St(Ji)
        }), ss = kt({
            kind: It("Publish"),
            modules: St(St(Bt())),
            dependencies: St(co)
        }), as = kt({
            kind: It("Upgrade"),
            modules: St(St(Bt())),
            dependencies: St(co),
            packageId: co,
            ticket: Ji
        }), cs = [es, rs, ns, os, ss, as, is], us = Dt([...cs]), fs = {
            MoveCall: t=>Yi({
                kind: "MoveCall",
                target: t.target,
                arguments: t.arguments ?? [],
                typeArguments: t.typeArguments ?? []
            }, es),
            TransferObjects: (t,e)=>Yi({
                kind: "TransferObjects",
                objects: t,
                address: e
            }, rs),
            SplitCoins: (t,e)=>Yi({
                kind: "SplitCoins",
                coin: t,
                amounts: e
            }, ns),
            MergeCoins: (t,e)=>Yi({
                kind: "MergeCoins",
                destination: t,
                sources: e
            }, os),
            Publish: ({modules: t, dependencies: e})=>Yi({
                kind: "Publish",
                modules: t.map((t=>"string" == typeof t ? Array.from(m(t)) : t)),
                dependencies: e.map((t=>go(t)))
            }, ss),
            Upgrade: ({modules: t, dependencies: e, packageId: r, ticket: n})=>Yi({
                kind: "Upgrade",
                modules: t.map((t=>"string" == typeof t ? Array.from(m(t)) : t)),
                dependencies: e.map((t=>go(t))),
                packageId: r,
                ticket: n
            }, as),
            MakeMoveVec: ({type: t, objects: e})=>Yi({
                kind: "MakeMoveVec",
                type: t ? {
                    Some: t
                } : {
                    None: null
                },
                objects: e
            }, is)
        }, hs = /^vector<(.+)>$/, ls = /^([^:]+)::([^:]+)::([^<]+)(<(.+)>)?/, ds = class {
            static parseFromStr(t, e=!1) {
                if ("address" === t)
                    return {
                        address: null
                    };
                if ("bool" === t)
                    return {
                        bool: null
                    };
                if ("u8" === t)
                    return {
                        u8: null
                    };
                if ("u16" === t)
                    return {
                        u16: null
                    };
                if ("u32" === t)
                    return {
                        u32: null
                    };
                if ("u64" === t)
                    return {
                        u64: null
                    };
                if ("u128" === t)
                    return {
                        u128: null
                    };
                if ("u256" === t)
                    return {
                        u256: null
                    };
                if ("signer" === t)
                    return {
                        signer: null
                    };
                const r = t.match(hs);
                if (r)
                    return {
                        vector: ds.parseFromStr(r[1], e)
                    };
                const n = t.match(ls);
                if (n)
                    return {
                        struct: {
                            address: e ? yo(n[1]) : n[1],
                            module: n[2],
                            name: n[3],
                            typeParams: void 0 === n[5] ? [] : ds.parseStructTypeArgs(n[5], e)
                        }
                    };
                throw new Error(`Encountered unexpected token when parsing type args for ${t}`)
            }
            static parseStructTypeArgs(t, e=!1) {
                const r = [];
                let n = ""
                  , o = 0;
                for (let e = 0; e < t.length; e++) {
                    const i = t[e];
                    "<" === i && o++,
                    ">" === i && o--,
                    0 !== o || "," !== i ? n += i : (r.push(n.trim()),
                    n = "")
                }
                return r.push(n.trim()),
                r.map((t=>ds.parseFromStr(t, e)))
            }
            static tagToString(t) {
                if ("bool"in t)
                    return "bool";
                if ("u8"in t)
                    return "u8";
                if ("u16"in t)
                    return "u16";
                if ("u32"in t)
                    return "u32";
                if ("u64"in t)
                    return "u64";
                if ("u128"in t)
                    return "u128";
                if ("u256"in t)
                    return "u256";
                if ("address"in t)
                    return "address";
                if ("signer"in t)
                    return "signer";
                if ("vector"in t)
                    return `vector<${ds.tagToString(t.vector)}>`;
                if ("struct"in t) {
                    const e = t.struct
                      , r = e.typeParams.map(ds.tagToString).join(", ");
                    return `${e.address}::${e.module}::${e.name}${r ? `<${r}>` : ""}`
                }
                throw new Error("Invalid TypeTag")
            }
        }
        , ps = "Argument", ys = "vector", gs = "TypeTag", ws = "ProgrammableMoveCall", bs = "Transaction", ms = "EnumKind", vs = [ms, bs], Es = [ms, ps], xs = "SimpleProgrammableMoveCall", As = new U(pi).registerStructType("ProgrammableTransaction", {
            inputs: [ys, "CallArg"],
            transactions: [ys, vs]
        }).registerEnumType(ps, {
            GasCoin: null,
            Input: {
                index: U.U16
            },
            Result: {
                index: U.U16
            },
            NestedResult: {
                index: U.U16,
                resultIndex: U.U16
            }
        }).registerStructType(ws, {
            package: U.ADDRESS,
            module: U.STRING,
            function: U.STRING,
            type_arguments: [ys, gs],
            arguments: [ys, Es]
        }).registerEnumType(bs, {
            MoveCall: xs,
            TransferObjects: {
                objects: [ys, Es],
                address: Es
            },
            SplitCoins: {
                coin: Es,
                amounts: [ys, Es]
            },
            MergeCoins: {
                destination: Es,
                sources: [ys, Es]
            },
            Publish: {
                modules: [ys, [ys, U.U8]],
                dependencies: [ys, U.ADDRESS]
            },
            MakeMoveVec: {
                type: ["Option", gs],
                objects: [ys, Es]
            },
            Upgrade: {
                modules: [ys, [ys, U.U8]],
                dependencies: [ys, U.ADDRESS],
                packageId: U.ADDRESS,
                ticket: Es
            }
        });
        As.registerType([ms, "T"], (function(t, e, r, n) {
            const o = {
                [e.kind]: e
            }
              , [i] = r;
            return this.getTypeInterface(i)._encodeRaw.call(this, t, o, r, n)
        }
        ), (function(t, e, r) {
            const [n] = e
              , o = this.getTypeInterface(n)._decodeRaw.call(this, t, e, r)
              , i = Object.keys(o)[0];
            return {
                kind: i,
                ...o[i]
            }
        }
        ), (t=>{
            if ("object" != typeof t && !("kind"in t))
                throw new Error(`EnumKind: Missing property "kind" in the input ${JSON.stringify(t)}`);
            return !0
        }
        )),
        As.registerType(xs, (function(t, e, r, n) {
            const [o,i,s] = e.target.split("::")
              , a = e.typeArguments.map((t=>ds.parseFromStr(t, !0)));
            return this.getTypeInterface(ws)._encodeRaw.call(this, t, {
                package: yo(o),
                module: i,
                function: s,
                type_arguments: a,
                arguments: e.arguments
            }, r, n)
        }
        ), (function(t, e, r) {
            let n = As.getTypeInterface(ws)._decodeRaw.call(this, t, e, r);
            return {
                target: [n.package, n.module, n.function].join("::"),
                arguments: n.arguments,
                typeArguments: n.type_arguments.map(ds.tagToString)
            }
        }
        ), (t=>3 === t.target.split("::").length));
        var Ss = Dt([kt({
            ImmOrOwned: wo
        }), kt({
            Shared: kt({
                objectId: Lt(),
                initialSharedVersion: Dt([Bt(), Lt()]),
                mutable: Tt()
            })
        })])
          , Ts = kt({
            Pure: St(Bt())
        })
          , Bs = kt({
            Object: Ss
        })
          , Is = Dt([Ts, Bs])
          , Os = {
            Pure: (t,e)=>({
                Pure: Array.from(t instanceof Uint8Array ? t : As.ser(e, t).toBytes())
            }),
            ObjectRef: ({objectId: t, digest: e, version: r})=>({
                Object: {
                    ImmOrOwned: {
                        digest: e,
                        version: r,
                        objectId: yo(t)
                    }
                }
            }),
            SharedObjectRef: ({objectId: t, mutable: e, initialSharedVersion: r})=>({
                Object: {
                    Shared: {
                        mutable: e,
                        initialSharedVersion: r,
                        objectId: yo(t)
                    }
                }
            })
        };
        function Us(t) {
            return "string" == typeof t ? yo(t) : "ImmOrOwned"in t.Object ? yo(t.Object.ImmOrOwned.objectId) : yo(t.Object.Shared.objectId)
        }
        var Ms = {
            address: "0x2",
            module: "object",
            name: "ID"
        }
          , ks = {
            address: ui,
            module: "ascii",
            name: "String"
        }
          , js = {
            address: ui,
            module: "string",
            name: "String"
        }
          , Ns = {
            address: ui,
            module: "option",
            name: "Option"
        }
          , Ls = (t,e)=>t.address === e.address && t.module === e.module && t.name === e.name;
        function _s(t, e) {
            if (void 0 !== e && typeof e !== t)
                throw new Error(`Expect ${e} to be ${t}, received ${typeof e}`)
        }
        var Ds = ["Address", "Bool", "U8", "U16", "U32", "U64", "U128", "U256"];
        function Cs(t, e) {
            if ("string" == typeof t && Ds.includes(t)) {
                if (t in ["U8", "U16", "U32", "U64", "U128", "U256"])
                    _s("number", e);
                else if ("Bool" === t)
                    _s("boolean", e);
                else if ("Address" === t && (_s("string", e),
                e && (!function(t) {
                    return /^(0x|0X)?[a-fA-F0-9]+$/.test(t) && t.length % 2 == 0
                }(r = e) || function(t) {
                    return /^(0x|0X)/.test(t) ? (t.length - 2) / 2 : t.length / 2
                }(r) !== po)))
                    throw new Error("Invalid Sui Address");
                return t.toLowerCase()
            }
            var r;
            if ("string" == typeof t)
                throw new Error(`Unknown pure normalized type ${JSON.stringify(t, null, 2)}`);
            if ("Vector"in t) {
                if ((void 0 === e || "string" == typeof e) && "U8" === t.Vector)
                    return "string";
                if (void 0 !== e && !Array.isArray(e))
                    throw new Error(`Expect ${e} to be a array, received ${typeof e}`);
                const r = Cs(t.Vector, e ? e[0] : void 0);
                if (void 0 === r)
                    return;
                return `vector<${r}>`
            }
            if ("Struct"in t) {
                if (Ls(t.Struct, ks))
                    return "string";
                if (Ls(t.Struct, js))
                    return "utf8string";
                if (Ls(t.Struct, Ms))
                    return "address";
                if (Ls(t.Struct, Ns))
                    return Cs({
                        Vector: t.Struct.typeArguments[0]
                    }, e)
            }
        }
        var Rs = jt(Ut(Dt([kt({
            Epoch: Bt()
        }), kt({
            None: Dt([It(!0), It(null)])
        })])))
          , Ps = Lt()
          , zs = xt("StringEncodedBigint", (t=>{
            if (!["string", "number", "bigint"].includes(typeof t))
                return !1;
            try {
                return BigInt(t),
                !0
            } catch {
                return !1
            }
        }
        ))
          , $s = kt({
            budget: jt(zs),
            price: jt(zs),
            payment: jt(St(wo)),
            owner: jt(Ps)
        })
          , Hs = kt({
            version: It(1),
            sender: jt(Ps),
            expiration: Rs,
            gasConfig: $s,
            inputs: St(Ki),
            transactions: St(us)
        });
        function Vs(t) {
            return yo(t).replace("0x", "")
        }
        var Fs = 131072
          , qs = class {
            constructor(t) {
                this.version = 1,
                this.sender = t?.sender,
                this.expiration = t?.expiration,
                this.gasConfig = t?.gasConfig ?? {},
                this.inputs = t?.inputs ?? [],
                this.transactions = t?.transactions ?? []
            }
            static fromKindBytes(t) {
                const e = As.de("TransactionKind", t)
                  , r = e?.ProgrammableTransaction;
                if (!r)
                    throw new Error("Unable to deserialize from bytes.");
                const n = Yi({
                    version: 1,
                    gasConfig: {},
                    inputs: r.inputs.map(((t,e)=>Yi({
                        kind: "Input",
                        value: t,
                        index: e,
                        type: mt(t, Ts) ? "pure" : "object"
                    }, Ki))),
                    transactions: r.transactions
                }, Hs);
                return qs.restore(n)
            }
            static fromBytes(t) {
                const e = As.de("TransactionData", t)
                  , r = e?.V1
                  , n = r?.kind?.ProgrammableTransaction;
                if (!r || !n)
                    throw new Error("Unable to deserialize from bytes.");
                const o = Yi({
                    version: 1,
                    sender: r.sender,
                    expiration: r.expiration,
                    gasConfig: r.gasData,
                    inputs: n.inputs.map(((t,e)=>Yi({
                        kind: "Input",
                        value: t,
                        index: e,
                        type: mt(t, Ts) ? "pure" : "object"
                    }, Ki))),
                    transactions: n.transactions
                }, Hs);
                return qs.restore(o)
            }
            static restore(t) {
                gt(t, Hs);
                const e = new qs;
                return Object.assign(e, t),
                e
            }
            static getDigestFromBytes(t) {
                const e = function(t, e) {
                    const r = Array.from("TransactionData::").map((t=>t.charCodeAt(0)))
                      , n = new Uint8Array(r.length + e.length);
                    return n.set(r),
                    n.set(e, r.length),
                    ct(n, {
                        dkLen: 32
                    })
                }(0, t);
                return T(e)
            }
            build({overrides: t, onlyTransactionKind: e}={}) {
                const r = this.inputs.map((t=>(gt(t.value, Is),
                t.value)))
                  , n = {
                    ProgrammableTransaction: {
                        inputs: r,
                        transactions: this.transactions
                    }
                };
                if (e)
                    return As.ser("TransactionKind", n, {
                        maxSize: Fs
                    }).toBytes();
                const o = t?.expiration ?? this.expiration
                  , i = t?.sender ?? this.sender
                  , s = {
                    ...this.gasConfig,
                    ...t?.gasConfig
                };
                if (!i)
                    throw new Error("Missing transaction sender");
                if (!s.budget)
                    throw new Error("Missing gas budget");
                if (!s.payment)
                    throw new Error("Missing gas payment");
                if (!s.price)
                    throw new Error("Missing gas price");
                const a = {
                    sender: Vs(i),
                    expiration: o || {
                        None: !0
                    },
                    gasData: {
                        payment: s.payment,
                        owner: Vs(this.gasConfig.owner ?? i),
                        price: BigInt(s.price),
                        budget: BigInt(s.budget)
                    },
                    kind: {
                        ProgrammableTransaction: {
                            inputs: r,
                            transactions: this.transactions
                        }
                    }
                };
                return As.ser("TransactionData", {
                    V1: a
                }, {
                    maxSize: Fs
                }).toBytes()
            }
            getDigest() {
                const t = this.build({
                    onlyTransactionKind: !1
                });
                return qs.getDigestFromBytes(t)
            }
            snapshot() {
                return Yi(this, Hs)
            }
        }
        ;
        function Gs(t) {
            if (!t)
                throw new Error("No provider passed to Transaction#build, but transaction data was not sufficient to build offline.");
            return t
        }
        var Ys, Ws, Ks, Qs, Zs, Js, Xs, ta = Symbol.for("@mysten/transaction"), ea = 10n, ra = class {
            constructor(t) {
                ro(this, Ws),
                ro(this, Qs),
                ro(this, Js),
                ro(this, Ys, void 0),
                no(this, Ys, new qs(t ? t.blockData : void 0))
            }
            static is(t) {
                return !!t && "object" == typeof t && !0 === t[ta]
            }
            static fromKind(t) {
                const e = new ra;
                return no(e, Ys, qs.fromKindBytes("string" == typeof t ? m(t) : t)),
                e
            }
            static from(t) {
                const e = new ra;
                return "string" == typeof t && t.startsWith("{") ? no(e, Ys, qs.restore(JSON.parse(t))) : no(e, Ys, qs.fromBytes("string" == typeof t ? m(t) : t)),
                e
            }
            static get Transactions() {
                return fs
            }
            static get Inputs() {
                return Os
            }
            setSender(t) {
                eo(this, Ys).sender = t
            }
            setSenderIfNotSet(t) {
                eo(this, Ys).sender || (eo(this, Ys).sender = t)
            }
            setExpiration(t) {
                eo(this, Ys).expiration = t
            }
            setGasPrice(t) {
                eo(this, Ys).gasConfig.price = String(t)
            }
            setGasBudget(t) {
                eo(this, Ys).gasConfig.budget = String(t)
            }
            setGasOwner(t) {
                eo(this, Ys).gasConfig.owner = t
            }
            setGasPayment(t) {
                if (t.length >= 256)
                    throw new Error("Payment objects exceed maximum amount 256");
                eo(this, Ys).gasConfig.payment = t.map((t=>bt(t, wo)))
            }
            get blockData() {
                return eo(this, Ys).snapshot()
            }
            get[ta]() {
                return !0
            }
            get gas() {
                return {
                    kind: "GasCoin"
                }
            }
            object(t) {
                const e = Us(t);
                return eo(this, Ys).inputs.find((t=>"object" === t.type && e === Us(t.value))) ?? oo(this, Ws, Ks).call(this, "object", t)
            }
            objectRef(...t) {
                return this.object(Os.ObjectRef(...t))
            }
            sharedObjectRef(...t) {
                return this.object(Os.SharedObjectRef(...t))
            }
            pure(t, e) {
                return oo(this, Ws, Ks).call(this, "pure", t instanceof Uint8Array ? Os.Pure(t) : e ? Os.Pure(t, e) : t)
            }
            add(t) {
                return function(t) {
                    const e = []
                      , r = r=>e[r] ?? (e[r] = {
                        kind: "NestedResult",
                        index: t,
                        resultIndex: r
                    });
                    return new Proxy({
                        kind: "Result",
                        index: t
                    },{
                        set() {
                            throw new Error("The transaction result is a proxy, and does not support setting properties directly")
                        },
                        get(t, e) {
                            if (e in t)
                                return Reflect.get(t, e);
                            if (e === Symbol.iterator)
                                return function*() {
                                    let t = 0;
                                    for (; ; )
                                        yield r(t),
                                        t++
                                }
                                ;
                            if ("symbol" == typeof e)
                                return;
                            const n = parseInt(e, 10);
                            return Number.isNaN(n) || n < 0 ? void 0 : r(n)
                        }
                    })
                }(eo(this, Ys).transactions.push(t) - 1)
            }
            splitCoins(...t) {
                return this.add(fs.SplitCoins(...t))
            }
            mergeCoins(...t) {
                return this.add(fs.MergeCoins(...t))
            }
            publish(...t) {
                return this.add(fs.Publish(...t))
            }
            upgrade(...t) {
                return this.add(fs.Upgrade(...t))
            }
            moveCall(...t) {
                return this.add(fs.MoveCall(...t))
            }
            transferObjects(...t) {
                return this.add(fs.TransferObjects(...t))
            }
            makeMoveVec(...t) {
                return this.add(fs.MakeMoveVec(...t))
            }
            serialize() {
                return JSON.stringify(eo(this, Ys).snapshot())
            }
            async build({provider: t, onlyTransactionKind: e}={}) {
                return await oo(this, Js, Xs).call(this, {
                    provider: t,
                    onlyTransactionKind: e
                }),
                eo(this, Ys).build({
                    onlyTransactionKind: e
                })
            }
            async getDigest({provider: t}={}) {
                return await oo(this, Js, Xs).call(this, {
                    provider: t
                }),
                eo(this, Ys).getDigest()
            }
        }
        , na = ra;
        Ys = new WeakMap,
        Ws = new WeakSet,
        Ks = function(t, e) {
            const r = eo(this, Ys).inputs.length
              , n = Yi({
                kind: "Input",
                value: "bigint" == typeof e ? String(e) : e,
                index: r,
                type: t
            }, Ki);
            return eo(this, Ys).inputs.push(n),
            n
        }
        ,
        Qs = new WeakSet,
        Zs = async function(t) {
            const e = eo(this, Ys).gasConfig.owner ?? eo(this, Ys).sender
              , r = (await Gs(t).getCoins({
                owner: e,
                coinType: "0x2::sui::SUI"
            })).data.filter((t=>!eo(this, Ys).inputs.find((e=>!!(mt(e.value, Is) && "Object"in e.value && "ImmOrOwned"in e.value.Object) && t.coinObjectId === e.value.Object.ImmOrOwned.objectId)))).slice(0, 255).map((t=>({
                objectId: t.coinObjectId,
                digest: t.digest,
                version: t.version
            })));
            if (!r.length)
                throw new Error("No valid gas coins found for the transaction.");
            return r
        }
        ,
        Js = new WeakSet,
        Xs = async function({provider: t, onlyTransactionKind: e}) {
            if (!e && !eo(this, Ys).sender)
                throw new Error("Missing transaction sender");
            const {inputs: r, transactions: n} = eo(this, Ys)
              , o = []
              , i = [];
            if (n.forEach((t=>{
                if ("MoveCall" === t.kind)
                    return void (t.arguments.some((t=>"Input" === t.kind && !mt(r[t.index].value, Is))) && o.push(t));
                const e = (gt(n = t, us),
                cs.find((t=>mt(n, t))));
                var n;
                e.schema && Object.entries(t).forEach((([t,n])=>{
                    if ("kind" === t)
                        return;
                    const o = e.schema[t]
                      , s = "array" === o.type
                      , a = s ? o.schema[Wi] : o[Wi];
                    if (!a)
                        return;
                    const c = t=>{
                        const e = r[t];
                        if (!e)
                            throw new Error(`Missing input ${n.index}`);
                        if (!mt(e.value, Is))
                            if ("object" === a.kind && "string" == typeof e.value)
                                i.push({
                                    id: e.value,
                                    input: e
                                });
                            else {
                                if ("pure" !== a.kind)
                                    throw new Error("Unexpected input format.");
                                e.value = Os.Pure(e.value, a.type)
                            }
                    }
                    ;
                    if (s)
                        n.forEach((t=>{
                            "Input" === t.kind && c(t.index)
                        }
                        ));
                    else {
                        if ("Input" !== n.kind)
                            return;
                        c(n.index)
                    }
                }
                ))
            }
            )),
            o.length && await Promise.all(o.map((async e=>{
                const [n,o,s] = e.target.split("::")
                  , a = await Gs(t).getNormalizedMoveFunction({
                    package: go(n),
                    module: o,
                    function: s
                })
                  , c = a.parameters.length > 0 && function(t) {
                    const e = Ui(t)?.Struct;
                    return "0x2" === e?.address && "tx_context" === e?.module && "TxContext" === e?.name
                }(a.parameters.at(-1)) ? a.parameters.slice(0, a.parameters.length - 1) : a.parameters;
                if (c.length !== e.arguments.length)
                    throw new Error("Incorrect number of arguments.");
                c.forEach(((t,n)=>{
                    const o = e.arguments[n];
                    if ("Input" !== o.kind)
                        return;
                    const s = r[o.index];
                    if (mt(s.value, Is))
                        return;
                    const a = s.value
                      , c = Cs(t, a);
                    if (c)
                        s.value = Os.Pure(a, c);
                    else {
                        if (!(null != Ui(t) || "object" == typeof t && "TypeParameter"in t))
                            throw new Error(`Unknown call arg type ${JSON.stringify(t, null, 2)} for value ${JSON.stringify(a, null, 2)}`);
                        if ("string" != typeof a)
                            throw new Error(`Expect the argument to be an object id string, got ${JSON.stringify(a, null, 2)}`);
                        i.push({
                            id: a,
                            input: s,
                            normalizedType: t
                        })
                    }
                }
                ))
            }
            ))),
            i.length) {
                const e = [...new Set(i.map((({id: t})=>t)))]
                  , r = await Gs(t).multiGetObjects({
                    ids: e,
                    options: {
                        showOwner: !0
                    }
                });
                let n = new Map(e.map(((t,e)=>[t, r[e]])));
                const o = Array.from(n).filter((([t,e])=>e.error)).map((([t,e])=>t));
                if (o.length)
                    throw new Error(`The following input objects are not invalid: ${o.join(", ")}`);
                i.forEach((({id: t, input: e, normalizedType: r})=>{
                    const o = n.get(t)
                      , i = function(t) {
                        const e = function(t) {
                            return mt(t, ho) ? t : jo(t)?.owner
                        }(t);
                        return "object" == typeof e && "Shared"in e ? e.Shared.initial_shared_version : void 0
                    }(o);
                    if (i) {
                        const n = (s = e.value,
                        (function(t) {
                            return "object" == typeof t && "Object"in t && "Shared"in t.Object ? t.Object.Shared : void 0
                        }(s)?.mutable ?? !1) || null != r && null != Oi(r));
                        e.value = Os.SharedObjectRef({
                            objectId: t,
                            initialSharedVersion: i,
                            mutable: n
                        })
                    } else
                        e.value = Os.ObjectRef(function(t) {
                            if ("reference"in t)
                                return t.reference;
                            const e = jo(t);
                            return e ? {
                                objectId: e.objectId,
                                version: e.version,
                                digest: e.digest
                            } : function(t) {
                                if (t.error && "object_id"in t.error && "version"in t.error && "digest"in t.error) {
                                    const e = t.error;
                                    return {
                                        objectId: e.object_id,
                                        version: e.version,
                                        digest: e.digest
                                    }
                                }
                            }(t)
                        }(o));
                    var s
                }
                ))
            }
            if (!e && (eo(this, Ys).gasConfig.price || this.setGasPrice(await Gs(t).getReferenceGasPrice()),
            eo(this, Ys).gasConfig.payment || (eo(this, Ys).gasConfig.payment = await oo(this, Qs, Zs).call(this, t)),
            !this.blockData.gasConfig.budget)) {
                const e = await Gs(t).dryRunTransactionBlock({
                    transactionBlock: eo(this, Ys).build({
                        overrides: {
                            gasConfig: {
                                budget: String(1e9),
                                payment: []
                            }
                        }
                    })
                });
                if ("success" !== e.effects.status.status)
                    throw new Error(`Dry run failed, could not automatically determine a budget: ${e.effects.status.error}`,{
                        cause: e
                    });
                const r = ea * BigInt(this.blockData.gasConfig.payment?.length || 0n) * BigInt(this.blockData.gasConfig.price || 1n);
                this.setGasBudget(BigInt(e.effects.gasUsed.computationCost) + BigInt(e.effects.gasUsed.storageCost) + r)
            }
        }
        ,
        kt({
            currentTps: Mt(),
            tps30Days: Mt(),
            currentCheckpoint: Lt(),
            currentEpoch: Lt(),
            totalAddresses: Lt(),
            totalObjects: Lt(),
            totalPackages: Lt()
        });
        var oa = kt({
            lastCheckpointId: Lt(),
            epochEndTimestamp: Lt(),
            protocolVersion: Lt(),
            referenceGasPrice: Lt(),
            totalStake: Lt(),
            storageFundReinvestment: Lt(),
            storageCharge: Lt(),
            storageRebate: Lt(),
            storageFundBalance: Lt(),
            stakeSubsidyAmount: Lt(),
            totalGasFees: Lt(),
            totalStakeRewardsDistributed: Lt(),
            leftoverStorageFundInflow: Lt()
        })
          , ia = kt({
            epoch: Lt(),
            validators: St(Li),
            epochTotalTransactions: Lt(),
            firstCheckpointId: Lt(),
            epochStartTimestamp: Lt(),
            endOfEpochInfo: Ut(oa)
        });
        function sa(t) {
            return "function" == typeof t
        }
        function aa(t) {
            return function(e) {
                if (function(t) {
                    return sa(null == t ? void 0 : t.lift)
                }(e))
                    return e.lift((function(e) {
                        try {
                            return t(e, this)
                        } catch (t) {
                            this.error(t)
                        }
                    }
                    ));
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }
        kt({
            data: St(ia),
            nextCursor: Ut(Lt()),
            hasNextPage: Tt()
        }),
        go("0x5");
        var ca = function(t, e) {
            return ca = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(t, e) {
                t.__proto__ = e
            }
            || function(t, e) {
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            ,
            ca(t, e)
        };
        function ua(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
            function r() {
                this.constructor = t
            }
            ca(t, e),
            t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
            new r)
        }
        function fa(t, e) {
            var r, n, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: a(0),
                throw: a(1),
                return: a(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function a(a) {
                return function(c) {
                    return function(a) {
                        if (r)
                            throw new TypeError("Generator is already executing.");
                        for (; i && (i = 0,
                        a[0] && (s = 0)),
                        s; )
                            try {
                                if (r = 1,
                                n && (o = 2 & a[0] ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n),
                                0) : n.next) && !(o = o.call(n, a[1])).done)
                                    return o;
                                switch (n = 0,
                                o && (a = [2 & a[0], o.value]),
                                a[0]) {
                                case 0:
                                case 1:
                                    o = a;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: a[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    n = a[1],
                                    a = [0];
                                    continue;
                                case 7:
                                    a = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                        s.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && s.label < o[1]) {
                                        s.label = o[1],
                                        o = a;
                                        break
                                    }
                                    if (o && s.label < o[2]) {
                                        s.label = o[2],
                                        s.ops.push(a);
                                        break
                                    }
                                    o[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                a = e.call(t, s)
                            } catch (t) {
                                a = [6, t],
                                n = 0
                            } finally {
                                r = o = 0
                            }
                        if (5 & a[0])
                            throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        }
                    }([a, c])
                }
            }
        }
        function ha(t) {
            var e = "function" == typeof Symbol && Symbol.iterator
              , r = e && t[e]
              , n = 0;
            if (r)
                return r.call(t);
            if (t && "number" == typeof t.length)
                return {
                    next: function() {
                        return t && n >= t.length && (t = void 0),
                        {
                            value: t && t[n++],
                            done: !t
                        }
                    }
                };
            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }
        function la(t, e) {
            var r = "function" == typeof Symbol && t[Symbol.iterator];
            if (!r)
                return t;
            var n, o, i = r.call(t), s = [];
            try {
                for (; (void 0 === e || e-- > 0) && !(n = i.next()).done; )
                    s.push(n.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o)
                        throw o.error
                }
            }
            return s
        }
        function da(t, e, r) {
            if (r || 2 === arguments.length)
                for (var n, o = 0, i = e.length; o < i; o++)
                    !n && o in e || (n || (n = Array.prototype.slice.call(e, 0, o)),
                    n[o] = e[o]);
            return t.concat(n || Array.prototype.slice.call(e))
        }
        function pa(t) {
            return this instanceof pa ? (this.v = t,
            this) : new pa(t)
        }
        function ya(t) {
            var e = t((function(t) {
                Error.call(t),
                t.stack = (new Error).stack
            }
            ));
            return e.prototype = Object.create(Error.prototype),
            e.prototype.constructor = e,
            e
        }
        Object.create,
        Object.create;
        var ga = ya((function(t) {
            return function(e) {
                t(this),
                this.message = e ? e.length + " errors occurred during unsubscription:\n" + e.map((function(t, e) {
                    return e + 1 + ") " + t.toString()
                }
                )).join("\n  ") : "",
                this.name = "UnsubscriptionError",
                this.errors = e
            }
        }
        ));
        function wa(t, e) {
            if (t) {
                var r = t.indexOf(e);
                0 <= r && t.splice(r, 1)
            }
        }
        var ba = function() {
            function t(t) {
                this.initialTeardown = t,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
            }
            return t.prototype.unsubscribe = function() {
                var t, e, r, n, o;
                if (!this.closed) {
                    this.closed = !0;
                    var i = this._parentage;
                    if (i)
                        if (this._parentage = null,
                        Array.isArray(i))
                            try {
                                for (var s = ha(i), a = s.next(); !a.done; a = s.next())
                                    a.value.remove(this)
                            } catch (e) {
                                t = {
                                    error: e
                                }
                            } finally {
                                try {
                                    a && !a.done && (e = s.return) && e.call(s)
                                } finally {
                                    if (t)
                                        throw t.error
                                }
                            }
                        else
                            i.remove(this);
                    var c = this.initialTeardown;
                    if (sa(c))
                        try {
                            c()
                        } catch (t) {
                            o = t instanceof ga ? t.errors : [t]
                        }
                    var u = this._finalizers;
                    if (u) {
                        this._finalizers = null;
                        try {
                            for (var f = ha(u), h = f.next(); !h.done; h = f.next()) {
                                var l = h.value;
                                try {
                                    Ea(l)
                                } catch (t) {
                                    o = null != o ? o : [],
                                    t instanceof ga ? o = da(da([], la(o)), la(t.errors)) : o.push(t)
                                }
                            }
                        } catch (t) {
                            r = {
                                error: t
                            }
                        } finally {
                            try {
                                h && !h.done && (n = f.return) && n.call(f)
                            } finally {
                                if (r)
                                    throw r.error
                            }
                        }
                    }
                    if (o)
                        throw new ga(o)
                }
            }
            ,
            t.prototype.add = function(e) {
                var r;
                if (e && e !== this)
                    if (this.closed)
                        Ea(e);
                    else {
                        if (e instanceof t) {
                            if (e.closed || e._hasParent(this))
                                return;
                            e._addParent(this)
                        }
                        (this._finalizers = null !== (r = this._finalizers) && void 0 !== r ? r : []).push(e)
                    }
            }
            ,
            t.prototype._hasParent = function(t) {
                var e = this._parentage;
                return e === t || Array.isArray(e) && e.includes(t)
            }
            ,
            t.prototype._addParent = function(t) {
                var e = this._parentage;
                this._parentage = Array.isArray(e) ? (e.push(t),
                e) : e ? [e, t] : t
            }
            ,
            t.prototype._removeParent = function(t) {
                var e = this._parentage;
                e === t ? this._parentage = null : Array.isArray(e) && wa(e, t)
            }
            ,
            t.prototype.remove = function(e) {
                var r = this._finalizers;
                r && wa(r, e),
                e instanceof t && e._removeParent(this)
            }
            ,
            t.EMPTY = ((e = new t).closed = !0,
            e),
            t;
            var e
        }()
          , ma = ba.EMPTY;
        function va(t) {
            return t instanceof ba || t && "closed"in t && sa(t.remove) && sa(t.add) && sa(t.unsubscribe)
        }
        function Ea(t) {
            sa(t) ? t() : t.unsubscribe()
        }
        var xa = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }
          , Aa = {
            setTimeout: function(t, e) {
                for (var r = [], n = 2; n < arguments.length; n++)
                    r[n - 2] = arguments[n];
                var o = Aa.delegate;
                return (null == o ? void 0 : o.setTimeout) ? o.setTimeout.apply(o, da([t, e], la(r))) : setTimeout.apply(void 0, da([t, e], la(r)))
            },
            clearTimeout: function(t) {
                var e = Aa.delegate;
                return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(t)
            },
            delegate: void 0
        };
        function Sa(t) {
            Aa.setTimeout((function() {
                var e = xa.onUnhandledError;
                if (!e)
                    throw t;
                e(t)
            }
            ))
        }
        function Ta() {}
        var Ba = Ia("C", void 0, void 0);
        function Ia(t, e, r) {
            return {
                kind: t,
                value: e,
                error: r
            }
        }
        var Oa = null;
        function Ua(t) {
            if (xa.useDeprecatedSynchronousErrorHandling) {
                var e = !Oa;
                if (e && (Oa = {
                    errorThrown: !1,
                    error: null
                }),
                t(),
                e) {
                    var r = Oa
                      , n = r.errorThrown
                      , o = r.error;
                    if (Oa = null,
                    n)
                        throw o
                }
            } else
                t()
        }
        var Ma = function(t) {
            function e(e) {
                var r = t.call(this) || this;
                return r.isStopped = !1,
                e ? (r.destination = e,
                va(e) && e.add(r)) : r.destination = Ca,
                r
            }
            return ua(e, t),
            e.create = function(t, e, r) {
                return new La(t,e,r)
            }
            ,
            e.prototype.next = function(t) {
                this.isStopped ? Da(function(t) {
                    return Ia("N", t, void 0)
                }(t), this) : this._next(t)
            }
            ,
            e.prototype.error = function(t) {
                this.isStopped ? Da(Ia("E", void 0, t), this) : (this.isStopped = !0,
                this._error(t))
            }
            ,
            e.prototype.complete = function() {
                this.isStopped ? Da(Ba, this) : (this.isStopped = !0,
                this._complete())
            }
            ,
            e.prototype.unsubscribe = function() {
                this.closed || (this.isStopped = !0,
                t.prototype.unsubscribe.call(this),
                this.destination = null)
            }
            ,
            e.prototype._next = function(t) {
                this.destination.next(t)
            }
            ,
            e.prototype._error = function(t) {
                try {
                    this.destination.error(t)
                } finally {
                    this.unsubscribe()
                }
            }
            ,
            e.prototype._complete = function() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
            ,
            e
        }(ba)
          , ka = Function.prototype.bind;
        function ja(t, e) {
            return ka.call(t, e)
        }
        var Na = function() {
            function t(t) {
                this.partialObserver = t
            }
            return t.prototype.next = function(t) {
                var e = this.partialObserver;
                if (e.next)
                    try {
                        e.next(t)
                    } catch (t) {
                        _a(t)
                    }
            }
            ,
            t.prototype.error = function(t) {
                var e = this.partialObserver;
                if (e.error)
                    try {
                        e.error(t)
                    } catch (t) {
                        _a(t)
                    }
                else
                    _a(t)
            }
            ,
            t.prototype.complete = function() {
                var t = this.partialObserver;
                if (t.complete)
                    try {
                        t.complete()
                    } catch (t) {
                        _a(t)
                    }
            }
            ,
            t
        }()
          , La = function(t) {
            function e(e, r, n) {
                var o, i, s = t.call(this) || this;
                return sa(e) || !e ? o = {
                    next: null != e ? e : void 0,
                    error: null != r ? r : void 0,
                    complete: null != n ? n : void 0
                } : s && xa.useDeprecatedNextContext ? ((i = Object.create(e)).unsubscribe = function() {
                    return s.unsubscribe()
                }
                ,
                o = {
                    next: e.next && ja(e.next, i),
                    error: e.error && ja(e.error, i),
                    complete: e.complete && ja(e.complete, i)
                }) : o = e,
                s.destination = new Na(o),
                s
            }
            return ua(e, t),
            e
        }(Ma);
        function _a(t) {
            var e;
            xa.useDeprecatedSynchronousErrorHandling ? (e = t,
            xa.useDeprecatedSynchronousErrorHandling && Oa && (Oa.errorThrown = !0,
            Oa.error = e)) : Sa(t)
        }
        function Da(t, e) {
            var r = xa.onStoppedNotification;
            r && Aa.setTimeout((function() {
                return r(t, e)
            }
            ))
        }
        var Ca = {
            closed: !0,
            next: Ta,
            error: function(t) {
                throw t
            },
            complete: Ta
        };
        function Ra(t, e, r, n, o) {
            return new Pa(t,e,r,n,o)
        }
        var Pa = function(t) {
            function e(e, r, n, o, i, s) {
                var a = t.call(this, e) || this;
                return a.onFinalize = i,
                a.shouldUnsubscribe = s,
                a._next = r ? function(t) {
                    try {
                        r(t)
                    } catch (t) {
                        e.error(t)
                    }
                }
                : t.prototype._next,
                a._error = o ? function(t) {
                    try {
                        o(t)
                    } catch (t) {
                        e.error(t)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : t.prototype._error,
                a._complete = n ? function() {
                    try {
                        n()
                    } catch (t) {
                        e.error(t)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : t.prototype._complete,
                a
            }
            return ua(e, t),
            e.prototype.unsubscribe = function() {
                var e;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    var r = this.closed;
                    t.prototype.unsubscribe.call(this),
                    !r && (null === (e = this.onFinalize) || void 0 === e || e.call(this))
                }
            }
            ,
            e
        }(Ma);
        function za(t, e) {
            return aa((function(r, n) {
                var o = 0;
                r.subscribe(Ra(n, (function(r) {
                    return t.call(e, r, o++) && n.next(r)
                }
                )))
            }
            ))
        }
        function $a(t, e) {
            return aa((function(r, n) {
                var o = 0;
                r.subscribe(Ra(n, (function(r) {
                    n.next(t.call(e, r, o++))
                }
                )))
            }
            ))
        }
        var Ha = ya((function(t) {
            return function() {
                t(this),
                this.name = "EmptyError",
                this.message = "no elements in sequence"
            }
        }
        ))
          , Va = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function Fa(t) {
            return t
        }
        var qa = function() {
            function t(t) {
                t && (this._subscribe = t)
            }
            return t.prototype.lift = function(e) {
                var r = new t;
                return r.source = this,
                r.operator = e,
                r
            }
            ,
            t.prototype.subscribe = function(t, e, r) {
                var n, o = this, i = (n = t) && n instanceof Ma || function(t) {
                    return t && sa(t.next) && sa(t.error) && sa(t.complete)
                }(n) && va(n) ? t : new La(t,e,r);
                return Ua((function() {
                    var t = o
                      , e = t.operator
                      , r = t.source;
                    i.add(e ? e.call(i, r) : r ? o._subscribe(i) : o._trySubscribe(i))
                }
                )),
                i
            }
            ,
            t.prototype._trySubscribe = function(t) {
                try {
                    return this._subscribe(t)
                } catch (e) {
                    t.error(e)
                }
            }
            ,
            t.prototype.forEach = function(t, e) {
                var r = this;
                return new (e = Ga(e))((function(e, n) {
                    var o = new La({
                        next: function(e) {
                            try {
                                t(e)
                            } catch (t) {
                                n(t),
                                o.unsubscribe()
                            }
                        },
                        error: n,
                        complete: e
                    });
                    r.subscribe(o)
                }
                ))
            }
            ,
            t.prototype._subscribe = function(t) {
                var e;
                return null === (e = this.source) || void 0 === e ? void 0 : e.subscribe(t)
            }
            ,
            t.prototype[Va] = function() {
                return this
            }
            ,
            t.prototype.pipe = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e];
                return (0 === (r = t).length ? Fa : 1 === r.length ? r[0] : function(t) {
                    return r.reduce((function(t, e) {
                        return e(t)
                    }
                    ), t)
                }
                )(this);
                var r
            }
            ,
            t.prototype.toPromise = function(t) {
                var e = this;
                return new (t = Ga(t))((function(t, r) {
                    var n;
                    e.subscribe((function(t) {
                        return n = t
                    }
                    ), (function(t) {
                        return r(t)
                    }
                    ), (function() {
                        return t(n)
                    }
                    ))
                }
                ))
            }
            ,
            t.create = function(e) {
                return new t(e)
            }
            ,
            t
        }();
        function Ga(t) {
            var e;
            return null !== (e = null != t ? t : xa.Promise) && void 0 !== e ? e : Promise
        }
        var Ya = new qa((function(t) {
            return t.complete()
        }
        ));
        function Wa(t, e) {
            return r = t.pipe(1 <= 0 ? function() {
                return Ya
            }
            : aa((function(t, e) {
                var r = 0;
                t.subscribe(Ra(e, (function(t) {
                    ++r <= 1 && (e.next(t),
                    1 <= r && e.complete())
                }
                )))
            }
            )), $a((t=>{
                if ("error"in (r = t) && !0 === r.error)
                    throw new Error(t.message);
                var r;
                return e(t)
            }
            ))),
            new Promise((function(t, e) {
                var n, o = !1;
                r.subscribe({
                    next: function(t) {
                        n = t,
                        o = !0
                    },
                    error: e,
                    complete: function() {
                        o ? t(n) : e(new Ha)
                    }
                })
            }
            ));
            var r
        }
        const Ka = {
            randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
        };
        let Qa;
        const Za = new Uint8Array(16);
        function Ja() {
            if (!Qa && (Qa = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto),
            !Qa))
                throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return Qa(Za)
        }
        const Xa = [];
        for (let t = 0; t < 256; ++t)
            Xa.push((t + 256).toString(16).slice(1));
        const tc = function(t, e, r) {
            if (Ka.randomUUID && !e && !t)
                return Ka.randomUUID();
            const n = (t = t || {}).random || (t.rng || Ja)();
            if (n[6] = 15 & n[6] | 64,
            n[8] = 63 & n[8] | 128,
            e) {
                r = r || 0;
                for (let t = 0; t < 16; ++t)
                    e[r + t] = n[t];
                return e
            }
            return function(t, e=0) {
                return (Xa[t[e + 0]] + Xa[t[e + 1]] + Xa[t[e + 2]] + Xa[t[e + 3]] + "-" + Xa[t[e + 4]] + Xa[t[e + 5]] + "-" + Xa[t[e + 6]] + Xa[t[e + 7]] + "-" + Xa[t[e + 8]] + Xa[t[e + 9]] + "-" + Xa[t[e + 10]] + Xa[t[e + 11]] + Xa[t[e + 12]] + Xa[t[e + 13]] + Xa[t[e + 14]] + Xa[t[e + 15]]).toLowerCase()
            }(n)
        };
        var ec = function(t) {
            return t && "number" == typeof t.length && "function" != typeof t
        }
          , rc = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
        function nc(t) {
            if (t instanceof qa)
                return t;
            if (null != t) {
                if (function(t) {
                    return sa(t[Va])
                }(t))
                    return o = t,
                    new qa((function(t) {
                        var e = o[Va]();
                        if (sa(e.subscribe))
                            return e.subscribe(t);
                        throw new TypeError("Provided object does not correctly implement Symbol.observable")
                    }
                    ));
                if (ec(t))
                    return function(t) {
                        return new qa((function(e) {
                            for (var r = 0; r < t.length && !e.closed; r++)
                                e.next(t[r]);
                            e.complete()
                        }
                        ))
                    }(t);
                if (sa(null == (n = t) ? void 0 : n.then))
                    return r = t,
                    new qa((function(t) {
                        r.then((function(e) {
                            t.closed || (t.next(e),
                            t.complete())
                        }
                        ), (function(e) {
                            return t.error(e)
                        }
                        )).then(null, Sa)
                    }
                    ));
                if (function(t) {
                    return Symbol.asyncIterator && sa(null == t ? void 0 : t[Symbol.asyncIterator])
                }(t))
                    return oc(t);
                if (function(t) {
                    return sa(null == t ? void 0 : t[rc])
                }(t))
                    return e = t,
                    new qa((function(t) {
                        var r, n;
                        try {
                            for (var o = ha(e), i = o.next(); !i.done; i = o.next()) {
                                var s = i.value;
                                if (t.next(s),
                                t.closed)
                                    return
                            }
                        } catch (t) {
                            r = {
                                error: t
                            }
                        } finally {
                            try {
                                i && !i.done && (n = o.return) && n.call(o)
                            } finally {
                                if (r)
                                    throw r.error
                            }
                        }
                        t.complete()
                    }
                    ));
                if (function(t) {
                    return sa(null == t ? void 0 : t.getReader)
                }(t))
                    return oc(function(t) {
                        return function(t, e, r) {
                            if (!Symbol.asyncIterator)
                                throw new TypeError("Symbol.asyncIterator is not defined.");
                            var n, o = r.apply(t, e || []), i = [];
                            return n = {},
                            s("next"),
                            s("throw"),
                            s("return"),
                            n[Symbol.asyncIterator] = function() {
                                return this
                            }
                            ,
                            n;
                            function s(t) {
                                o[t] && (n[t] = function(e) {
                                    return new Promise((function(r, n) {
                                        i.push([t, e, r, n]) > 1 || a(t, e)
                                    }
                                    ))
                                }
                                )
                            }
                            function a(t, e) {
                                try {
                                    (r = o[t](e)).value instanceof pa ? Promise.resolve(r.value.v).then(c, u) : f(i[0][2], r)
                                } catch (t) {
                                    f(i[0][3], t)
                                }
                                var r
                            }
                            function c(t) {
                                a("next", t)
                            }
                            function u(t) {
                                a("throw", t)
                            }
                            function f(t, e) {
                                t(e),
                                i.shift(),
                                i.length && a(i[0][0], i[0][1])
                            }
                        }(this, arguments, (function() {
                            var e, r, n;
                            return fa(this, (function(o) {
                                switch (o.label) {
                                case 0:
                                    e = t.getReader(),
                                    o.label = 1;
                                case 1:
                                    o.trys.push([1, , 9, 10]),
                                    o.label = 2;
                                case 2:
                                    return [4, pa(e.read())];
                                case 3:
                                    return r = o.sent(),
                                    n = r.value,
                                    r.done ? [4, pa(void 0)] : [3, 5];
                                case 4:
                                    return [2, o.sent()];
                                case 5:
                                    return [4, pa(n)];
                                case 6:
                                    return [4, o.sent()];
                                case 7:
                                    return o.sent(),
                                    [3, 2];
                                case 8:
                                    return [3, 10];
                                case 9:
                                    return e.releaseLock(),
                                    [7];
                                case 10:
                                    return [2]
                                }
                            }
                            ))
                        }
                        ))
                    }(t))
            }
            var e, r, n, o;
            throw function(t) {
                return new TypeError("You provided " + (null !== t && "object" == typeof t ? "an invalid object" : "'" + t + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")
            }(t)
        }
        function oc(t) {
            return new qa((function(e) {
                (function(t, e) {
                    var r, n, o, i, s, a, c, u;
                    return s = this,
                    a = void 0,
                    u = function() {
                        var s, a;
                        return fa(this, (function(c) {
                            switch (c.label) {
                            case 0:
                                c.trys.push([0, 5, 6, 11]),
                                r = function(t) {
                                    if (!Symbol.asyncIterator)
                                        throw new TypeError("Symbol.asyncIterator is not defined.");
                                    var e, r = t[Symbol.asyncIterator];
                                    return r ? r.call(t) : (t = ha(t),
                                    e = {},
                                    n("next"),
                                    n("throw"),
                                    n("return"),
                                    e[Symbol.asyncIterator] = function() {
                                        return this
                                    }
                                    ,
                                    e);
                                    function n(r) {
                                        e[r] = t[r] && function(e) {
                                            return new Promise((function(n, o) {
                                                !function(t, e, r, n) {
                                                    Promise.resolve(n).then((function(e) {
                                                        t({
                                                            value: e,
                                                            done: r
                                                        })
                                                    }
                                                    ), e)
                                                }(n, o, (e = t[r](e)).done, e.value)
                                            }
                                            ))
                                        }
                                    }
                                }(t),
                                c.label = 1;
                            case 1:
                                return [4, r.next()];
                            case 2:
                                if ((n = c.sent()).done)
                                    return [3, 4];
                                if (s = n.value,
                                e.next(s),
                                e.closed)
                                    return [2];
                                c.label = 3;
                            case 3:
                                return [3, 1];
                            case 4:
                                return [3, 11];
                            case 5:
                                return a = c.sent(),
                                o = {
                                    error: a
                                },
                                [3, 11];
                            case 6:
                                return c.trys.push([6, , 9, 10]),
                                n && !n.done && (i = r.return) ? [4, i.call(r)] : [3, 8];
                            case 7:
                                c.sent(),
                                c.label = 8;
                            case 8:
                                return [3, 10];
                            case 9:
                                if (o)
                                    throw o.error;
                                return [7];
                            case 10:
                                return [7];
                            case 11:
                                return e.complete(),
                                [2]
                            }
                        }
                        ))
                    }
                    ,
                    new ((c = void 0) || (c = Promise))((function(t, e) {
                        function r(t) {
                            try {
                                o(u.next(t))
                            } catch (t) {
                                e(t)
                            }
                        }
                        function n(t) {
                            try {
                                o(u.throw(t))
                            } catch (t) {
                                e(t)
                            }
                        }
                        function o(e) {
                            var o;
                            e.done ? t(e.value) : (o = e.value,
                            o instanceof c ? o : new c((function(t) {
                                t(o)
                            }
                            ))).then(r, n)
                        }
                        o((u = u.apply(s, a || [])).next())
                    }
                    ))
                }
                )(t, e).catch((function(t) {
                    return e.error(t)
                }
                ))
            }
            ))
        }
        function ic(t, e, r) {
            return void 0 === r && (r = 1 / 0),
            sa(e) ? ic((function(r, n) {
                return $a((function(t, o) {
                    return e(r, t, n, o)
                }
                ))(nc(t(r, n)))
            }
            ), r) : ("number" == typeof e && (r = e),
            aa((function(e, n) {
                return function(t, e, r, n, o, i, s, a) {
                    var c = []
                      , u = 0
                      , f = 0
                      , h = !1
                      , l = function() {
                        !h || c.length || u || e.complete()
                    }
                      , d = function(t) {
                        return u < n ? p(t) : c.push(t)
                    }
                      , p = function(t) {
                        u++;
                        var o = !1;
                        nc(r(t, f++)).subscribe(Ra(e, (function(t) {
                            e.next(t)
                        }
                        ), (function() {
                            o = !0
                        }
                        ), void 0, (function() {
                            if (o)
                                try {
                                    u--;
                                    for (var t = function() {
                                        var t = c.shift();
                                        p(t)
                                    }; c.length && u < n; )
                                        t();
                                    l()
                                } catch (t) {
                                    e.error(t)
                                }
                        }
                        )))
                    };
                    return t.subscribe(Ra(e, d, (function() {
                        h = !0,
                        l()
                    }
                    ))),
                    function() {}
                }(e, n, t, r)
            }
            )))
        }
        var sc = Array.isArray;
        var ac = ["addListener", "removeListener"]
          , cc = ["addEventListener", "removeEventListener"]
          , uc = ["on", "off"];
        function fc(t, e, r, n) {
            if (sa(r) && (n = r,
            r = void 0),
            n)
                return fc(t, e, r).pipe((o = n,
                $a((function(t) {
                    return function(t, e) {
                        return sc(e) ? t.apply(void 0, da([], la(e))) : t(e)
                    }(o, t)
                }
                ))));
            var o, i = la(function(t) {
                return sa(t.addEventListener) && sa(t.removeEventListener)
            }(t) ? cc.map((function(n) {
                return function(o) {
                    return t[n](e, o, r)
                }
            }
            )) : function(t) {
                return sa(t.addListener) && sa(t.removeListener)
            }(t) ? ac.map(hc(t, e)) : function(t) {
                return sa(t.on) && sa(t.off)
            }(t) ? uc.map(hc(t, e)) : [], 2), s = i[0], a = i[1];
            if (!s && ec(t))
                return ic((function(t) {
                    return fc(t, e, r)
                }
                ))(nc(t));
            if (!s)
                throw new TypeError("Invalid event target");
            return new qa((function(t) {
                var e = function() {
                    for (var e = [], r = 0; r < arguments.length; r++)
                        e[r] = arguments[r];
                    return t.next(1 < e.length ? e : e[0])
                };
                return s(e),
                function() {
                    return a(e)
                }
            }
            ))
        }
        function hc(t, e) {
            return function(r) {
                return function(n) {
                    return t[r](e, n)
                }
            }
        }
        var lc = ya((function(t) {
            return function() {
                t(this),
                this.name = "ObjectUnsubscribedError",
                this.message = "object unsubscribed"
            }
        }
        ))
          , dc = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.closed = !1,
                e.currentObservers = null,
                e.observers = [],
                e.isStopped = !1,
                e.hasError = !1,
                e.thrownError = null,
                e
            }
            return ua(e, t),
            e.prototype.lift = function(t) {
                var e = new pc(this,this);
                return e.operator = t,
                e
            }
            ,
            e.prototype._throwIfClosed = function() {
                if (this.closed)
                    throw new lc
            }
            ,
            e.prototype.next = function(t) {
                var e = this;
                Ua((function() {
                    var r, n;
                    if (e._throwIfClosed(),
                    !e.isStopped) {
                        e.currentObservers || (e.currentObservers = Array.from(e.observers));
                        try {
                            for (var o = ha(e.currentObservers), i = o.next(); !i.done; i = o.next())
                                i.value.next(t)
                        } catch (t) {
                            r = {
                                error: t
                            }
                        } finally {
                            try {
                                i && !i.done && (n = o.return) && n.call(o)
                            } finally {
                                if (r)
                                    throw r.error
                            }
                        }
                    }
                }
                ))
            }
            ,
            e.prototype.error = function(t) {
                var e = this;
                Ua((function() {
                    if (e._throwIfClosed(),
                    !e.isStopped) {
                        e.hasError = e.isStopped = !0,
                        e.thrownError = t;
                        for (var r = e.observers; r.length; )
                            r.shift().error(t)
                    }
                }
                ))
            }
            ,
            e.prototype.complete = function() {
                var t = this;
                Ua((function() {
                    if (t._throwIfClosed(),
                    !t.isStopped) {
                        t.isStopped = !0;
                        for (var e = t.observers; e.length; )
                            e.shift().complete()
                    }
                }
                ))
            }
            ,
            e.prototype.unsubscribe = function() {
                this.isStopped = this.closed = !0,
                this.observers = this.currentObservers = null
            }
            ,
            Object.defineProperty(e.prototype, "observed", {
                get: function() {
                    var t;
                    return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype._trySubscribe = function(e) {
                return this._throwIfClosed(),
                t.prototype._trySubscribe.call(this, e)
            }
            ,
            e.prototype._subscribe = function(t) {
                return this._throwIfClosed(),
                this._checkFinalizedStatuses(t),
                this._innerSubscribe(t)
            }
            ,
            e.prototype._innerSubscribe = function(t) {
                var e = this
                  , r = this
                  , n = r.hasError
                  , o = r.isStopped
                  , i = r.observers;
                return n || o ? ma : (this.currentObservers = null,
                i.push(t),
                new ba((function() {
                    e.currentObservers = null,
                    wa(i, t)
                }
                )))
            }
            ,
            e.prototype._checkFinalizedStatuses = function(t) {
                var e = this
                  , r = e.hasError
                  , n = e.thrownError
                  , o = e.isStopped;
                r ? t.error(n) : o && t.complete()
            }
            ,
            e.prototype.asObservable = function() {
                var t = new qa;
                return t.source = this,
                t
            }
            ,
            e.create = function(t, e) {
                return new pc(t,e)
            }
            ,
            e
        }(qa)
          , pc = function(t) {
            function e(e, r) {
                var n = t.call(this) || this;
                return n.destination = e,
                n.source = r,
                n
            }
            return ua(e, t),
            e.prototype.next = function(t) {
                var e, r;
                null === (r = null === (e = this.destination) || void 0 === e ? void 0 : e.next) || void 0 === r || r.call(e, t)
            }
            ,
            e.prototype.error = function(t) {
                var e, r;
                null === (r = null === (e = this.destination) || void 0 === e ? void 0 : e.error) || void 0 === r || r.call(e, t)
            }
            ,
            e.prototype.complete = function() {
                var t, e;
                null === (e = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === e || e.call(t)
            }
            ,
            e.prototype._subscribe = function(t) {
                var e, r;
                return null !== (r = null === (e = this.source) || void 0 === e ? void 0 : e.subscribe(t)) && void 0 !== r ? r : ma
            }
            ,
            e
        }(dc);
        function yc(t, e) {
            for (var r = [], n = 2; n < arguments.length; n++)
                r[n - 2] = arguments[n];
            if (!0 !== e) {
                if (!1 !== e) {
                    var o = new La({
                        next: function() {
                            o.unsubscribe(),
                            t()
                        }
                    });
                    return nc(e.apply(void 0, da([], la(r)))).subscribe(o)
                }
            } else
                t()
        }
        class gc {
            constructor(t, e) {
                if (t === e)
                    throw new Error("[WindowMessageStream] name and target must be different");
                this._name = t,
                this._target = e,
                this.messages = fc(window, "message").pipe(za((t=>t.source === window && t.data.target === this._name)), $a((t=>t.data.payload)), function(t) {
                    void 0 === t && (t = {});
                    var e = t.connector
                      , r = void 0 === e ? function() {
                        return new dc
                    }
                    : e
                      , n = t.resetOnError
                      , o = void 0 === n || n
                      , i = t.resetOnComplete
                      , s = void 0 === i || i
                      , a = t.resetOnRefCountZero
                      , c = void 0 === a || a;
                    return function(t) {
                        var e, n, i, a = 0, u = !1, f = !1, h = function() {
                            null == n || n.unsubscribe(),
                            n = void 0
                        }, l = function() {
                            h(),
                            e = i = void 0,
                            u = f = !1
                        }, d = function() {
                            var t = e;
                            l(),
                            null == t || t.unsubscribe()
                        };
                        return aa((function(t, p) {
                            a++,
                            f || u || h();
                            var y = i = null != i ? i : r();
                            p.add((function() {
                                0 != --a || f || u || (n = yc(d, c))
                            }
                            )),
                            y.subscribe(p),
                            !e && a > 0 && (e = new La({
                                next: function(t) {
                                    return y.next(t)
                                },
                                error: function(t) {
                                    f = !0,
                                    h(),
                                    n = yc(l, o, t),
                                    y.error(t)
                                },
                                complete: function() {
                                    u = !0,
                                    h(),
                                    n = yc(l, s),
                                    y.complete()
                                }
                            }),
                            nc(t).subscribe(e))
                        }
                        ))(t)
                    }
                }())
            }
            send(t) {
                const e = {
                    target: this._target,
                    payload: t
                };
                window.postMessage(e)
            }
        }
        const wc = ["viewAccount", "suggestTransactions"];
        var bc;
        !function(t) {
            t.local = "local",
            t.devNet = "devNet",
            t.testNet = "testNet",
            t.customRPC = "customRPC"
        }(bc || (bc = {}));
        var mc, vc, Ec, xc, Ac, Sc, Tc, Bc, Ic, Oc, Uc, Mc, kc, jc, Nc, Lc, _c, Dc, Cc, Rc = function(t, e, r, n) {
            if ("a" === r && !n)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof e ? t !== e || !n : !e.has(t))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === r ? n : "a" === r ? n.call(t) : n ? n.value : e.get(t)
        }, Pc = function(t, e, r, n, o) {
            if ("m" === n)
                throw new TypeError("Private method is not writable");
            if ("a" === n && !o)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof e ? t !== e || !o : !e.has(t))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === n ? o.call(t, r) : o ? o.value = r : e.set(t, r),
            r
        };
        const zc = {
            [bc.local]: g,
            [bc.devNet]: p,
            [bc.testNet]: y
        };
        vc = new WeakMap,
        Ec = new WeakMap,
        xc = new WeakMap,
        Ac = new WeakMap,
        Sc = new WeakMap,
        Tc = new WeakMap,
        Ic = new WeakMap,
        Oc = new WeakMap,
        Uc = new WeakMap,
        Mc = new WeakMap,
        kc = new WeakMap,
        jc = new WeakMap,
        mc = new WeakSet,
        Bc = function(t) {
            Pc(this, Ac, t.map((t=>new d({
                address: t,
                publicKey: new Uint8Array,
                chains: Rc(this, Tc, "f") ? [Rc(this, Tc, "f")] : [],
                features: ["sui:signAndExecuteTransaction"]
            }))), "f")
        }
        ,
        Nc = function(t) {
            return Wa(Rc(this, mc, "m", Cc).call(this, {
                type: "has-permissions-request",
                permissions: t
            }), (({result: t})=>t))
        }
        ,
        Lc = function() {
            return Wa(Rc(this, mc, "m", Cc).call(this, {
                type: "get-account"
            }), (t=>t.accounts))
        }
        ,
        _c = function() {
            return Wa(Rc(this, mc, "m", Cc).call(this, {
                type: "get-network"
            }), (({network: t})=>t))
        }
        ,
        Dc = function({env: t}) {
            Pc(this, Tc, t === bc.customRPC ? "sui:unknown" : zc[t], "f")
        }
        ,
        Cc = function(t, e) {
            const r = function(t, e) {
                return {
                    id: e || tc(),
                    payload: t
                }
            }(t, e);
            return Rc(this, Sc, "f").send(r),
            Rc(this, Sc, "f").messages.pipe(za((({id: t})=>t === r.id)), $a((t=>t.payload)))
        }
        ,
        function(t) {
            const e = ({register: e})=>e(t);
            try {
                window.dispatchEvent(new o(e))
            } catch (t) {
                console.error("wallet-standard:register-wallet event could not be dispatched\n", t)
            }
            try {
                window.addEventListener("wallet-standard:app-ready", (({detail: t})=>e(t)))
            } catch (t) {
                console.error("wallet-standard:app-ready event listener could not be added\n", t)
            }
        }(new class {
            get version() {
                return Rc(this, Ec, "f")
            }
            get name() {
                return Rc(this, xc, "f")
            }
            get icon() {
                return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNSIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE5LjkzOTggNy4zOTYyM0MxOS45Mzk4IDcuMzU4NDkgMTkuOTI3OCA3LjMzMzMzIDE5LjkyNzggNy4zMjA3NVY3LjMwODE4QzE5LjkxNTcgNy4yODMwMiAxOS45MTU3IDcuMjU3ODYgMTkuOTAzNyA3LjI0NTI4QzE5Ljg5MTYgNy4yMjAxMiAxOS44Nzk2IDcuMjA3NTUgMTkuODY3NiA3LjE4MjM5TDE5Ljg1NTUgNy4xNjk4MUMxOS44NDM1IDcuMTU3MjMgMTkuODE5NCA3LjEzMjA3IDE5LjgwNzQgNy4xMTk1QzE5LjgwNzQgNy4xMTk1IDE5LjgwNzQgNy4xMTk1IDE5Ljc5NTMgNy4xMTk1QzE5Ljc4MzMgNy4xMDY5MiAxOS43NzEzIDcuMTA2OTIgMTkuNzU5MiA3LjA5NDM0TDE0LjcxNDggNC4wNTAzMUgxNC43MDI4QzE0LjY5MDcgNC4wMzc3NCAxNC42Nzg3IDQuMDM3NzMgMTQuNjY2NyA0LjAzNzczQzE0LjY1NDYgNC4wMzc3MyAxNC42NDI2IDQuMDI1MTUgMTQuNjMwNSA0LjAyNTE1QzE0LjYxODUgNC4wMjUxNSAxNC42MDY1IDQuMDEyNTggMTQuNTk0NCA0LjAxMjU4QzE0LjU4MjQgNC4wMTI1OCAxNC41NzA0IDQuMDEyNTggMTQuNTU4MyA0QzE0LjU0NjMgNCAxNC41MzQyIDQgMTQuNTIyMiA0QzE0LjUxMDIgNCAxNC40OTgxIDQgMTQuNDg2MSA0QzE0LjQ3NCA0IDE0LjQ2MiA0IDE0LjQ1IDQuMDEyNThDMTQuNDM3OSA0LjAxMjU4IDE0LjQyNTkgNC4wMTI1OCAxNC40MTM4IDQuMDI1MTVDMTQuNDAxOCA0LjAyNTE1IDE0LjM4OTggNC4wMzc3MyAxNC4zNzc3IDQuMDM3NzNDMTQuMzY1NyA0LjAzNzczIDE0LjM1MzYgNC4wNTAzMSAxNC4zNDE2IDQuMDUwMzFIMTQuMzI5Nkw5LjI4NTE4IDcuMDk0MzRMNC4yMDQ2NiAxMC4xMjU4QzQuMTgwNTkgMTAuMTM4NCA0LjE2ODU1IDEwLjE1MDkgNC4xNDQ0NyAxMC4xNjM1TDQuMTMyNDMgMTAuMTc2MUM0LjEyMDM5IDEwLjE4ODcgNC4wOTYzMSAxMC4yMTM4IDQuMDg0MjcgMTAuMjI2NEM0LjA3MjIzIDEwLjIzOSA0LjA2MDE5IDEwLjI2NDIgNC4wNDgxNiAxMC4yNzY3QzQuMDQ4MTYgMTAuMjc2NyA0LjA0ODE2IDEwLjI4OTMgNC4wMzYxMiAxMC4yODkzQzQuMDI0MDggMTAuMzE0NSA0LjAyNDA4IDEwLjMyNyA0LjAxMjA0IDEwLjM1MjJDNC4wMTIwNCAxMC4zNzc0IDQgMTAuNDAyNSA0IDEwLjQxNTFDNCAxMC40Mjc3IDQgMTAuNDI3NyA0IDEwLjQ0MDNWMTAuNDUyOFYxNi41NDA5QzQgMTYuNjkxOCA0LjA3MjIzIDE2LjgzMDIgNC4yMDQ2NiAxNi45MDU3TDkuMjQ5MDYgMTkuOTQ5N0M5LjMwOTI1IDE5Ljk4NzQgOS4zODE0OSAyMCA5LjQ1MzcyIDIwQzkuNTI1OTYgMjAgOS41ODYxNSAxOS45ODc0IDkuNjU4MzkgMTkuOTQ5N0M5Ljc3ODc4IDE5Ljg3NDIgOS44NjMwNSAxOS43MzU5IDkuODYzMDUgMTkuNTg0OVYxNC4yMTM4TDE0LjMxNzUgMTYuODkzMUMxNC4zNzc3IDE2LjkzMDggMTQuNDUgMTYuOTQzNCAxNC41MjIyIDE2Ljk0MzRDMTQuNTk0NCAxNi45NDM0IDE0LjY1NDYgMTYuOTMwOCAxNC43MjY5IDE2Ljg5MzFDMTQuODQ3MyAxNi44MTc2IDE0LjkzMTUgMTYuNjc5MiAxNC45MzE1IDE2LjUyODNWMTEuMTU3MkwxOS4zODYgMTMuODM2NUMxOS40NDYyIDEzLjg3NDIgMTkuNTE4NCAxMy44ODY4IDE5LjU5MDcgMTMuODg2OEMxOS42NjI5IDEzLjg4NjggMTkuNzIzMSAxMy44NzQyIDE5Ljc5NTMgMTMuODM2NUMxOS45MTU3IDEzLjc2MSAyMCAxMy42MjI2IDIwIDEzLjQ3MTdWNy4zODM2NUMxOS45Mzk4IDcuNDMzOTYgMTkuOTM5OCA3LjQwODgxIDE5LjkzOTggNy4zOTYyM1pNOS40NDE2OCAxMy4wNDRMNS4xOTE4NyAxMC40NzhMOS40NDE2OCA3LjkxMTk1TDEzLjY5MTUgMTAuNDc4TDkuNDQxNjggMTMuMDQ0Wk0xNC40OTgxIDEwTDEwLjI0ODMgNy40MzM5NkwxNC40OTgxIDQuODY3OTJMMTguNzQ3OSA3LjQzMzk2TDE0LjQ5ODEgMTBaTTkuMDQ0NCAxOC44OTMxTDQuNzk0NTggMTYuMzI3VjExLjE5NUw5LjA0NDQgMTMuNzYxVjE4Ljg5MzFaTTEwLjI0ODMgMTMuNTM0NkwxNC4xMDA4IDExLjIwNzVWMTUuODQ5MUwxMC4yNDgzIDEzLjUzNDZaTTE1LjI5MjcgMTAuNDkwNkwxOS4xNDUyIDguMTYzNTJWMTIuODA1TDE1LjI5MjcgMTAuNDkwNloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo="
            }
            get chains() {
                return w
            }
            get features() {
                return {
                    "standard:connect": {
                        version: "1.0.0",
                        connect: Rc(this, Uc, "f")
                    },
                    "standard:events": {
                        version: "1.0.0",
                        on: Rc(this, Ic, "f")
                    },
                    "sui:signTransactionBlock": {
                        version: "1.0.0",
                        signTransactionBlock: Rc(this, Mc, "f")
                    },
                    "sui:signAndExecuteTransactionBlock": {
                        version: "1.0.0",
                        signAndExecuteTransactionBlock: Rc(this, kc, "f")
                    },
                    "sui:signMessage": {
                        version: "1.0.0",
                        signMessage: Rc(this, jc, "f")
                    }
                }
            }
            get accounts() {
                return Rc(this, Ac, "f")
            }
            constructor() {
                var t;
                mc.add(this),
                vc.set(this, void 0),
                Ec.set(this, "1.0.0"),
                xc.set(this, "Morphis Wallet"),
                Ac.set(this, void 0),
                Sc.set(this, void 0),
                Tc.set(this, null),
                Ic.set(this, ((t,e)=>(Rc(this, vc, "f").on(t, e),
                ()=>Rc(this, vc, "f").off(t, e)))),
                Oc.set(this, (async()=>{
                    if (Rc(this, mc, "m", Dc).call(this, await Rc(this, mc, "m", _c).call(this)),
                    !await Rc(this, mc, "m", Nc).call(this, ["viewAccount"]))
                        return;
                    const t = await Rc(this, mc, "m", Lc).call(this);
                    Rc(this, mc, "m", Bc).call(this, t),
                    Rc(this, Ac, "f").length && Rc(this, vc, "f").emit("change", {
                        accounts: this.accounts
                    })
                }
                )),
                Uc.set(this, (async t=>(t?.silent || await Wa(Rc(this, mc, "m", Cc).call(this, {
                    type: "acquire-permissions-request",
                    permissions: wc
                }), (t=>t.result)),
                await Rc(this, Oc, "f").call(this),
                {
                    accounts: this.accounts
                }))),
                Mc.set(this, (async t=>{
                    if (!na.is(t.transactionBlock))
                        throw new Error("Unexpect transaction format found. Ensure that you are using the `Transaction` class.");
                    return Wa(Rc(this, mc, "m", Cc).call(this, {
                        type: "sign-transaction-request",
                        transaction: {
                            ...t,
                            account: t.account?.address || Rc(this, Ac, "f")[0]?.address || "",
                            transaction: t.transactionBlock.serialize()
                        }
                    }), (t=>t.result))
                }
                )),
                kc.set(this, (async t=>{
                    if (!na.is(t.transactionBlock))
                        throw new Error("Unexpect transaction format found. Ensure that you are using the `Transaction` class.");
                    return Wa(Rc(this, mc, "m", Cc).call(this, {
                        type: "execute-transaction-request",
                        transaction: {
                            type: "transaction",
                            data: t.transactionBlock.serialize(),
                            options: t.options,
                            account: t.account?.address || Rc(this, Ac, "f")[0]?.address || ""
                        }
                    }), (t=>t.result))
                }
                )),
                jc.set(this, (async({message: t, account: e})=>Wa(Rc(this, mc, "m", Cc).call(this, {
                    type: "sign-message-request",
                    args: {
                        message: E(t),
                        accountAddress: e.address
                    }
                }), (t=>{
                    if (!t.return)
                        throw new Error("Invalid sign message response");
                    return t.return
                }
                )))),
                Pc(this, vc, {
                    all: t = t || new Map,
                    on: function(e, r) {
                        var n = t.get(e);
                        n ? n.push(r) : t.set(e, [r])
                    },
                    off: function(e, r) {
                        var n = t.get(e);
                        n && (r ? n.splice(n.indexOf(r) >>> 0, 1) : t.set(e, []))
                    },
                    emit: function(e, r) {
                        var n = t.get(e);
                        n && n.slice().map((function(t) {
                            t(r)
                        }
                        )),
                        (n = t.get("*")) && n.slice().map((function(t) {
                            t(e, r)
                        }
                        ))
                    }
                }, "f"),
                Pc(this, Ac, [], "f"),
                Pc(this, Sc, new gc("morphis_in-page","morphis_content-script"), "f"),
                Rc(this, Sc, "f").messages.subscribe((({payload: t})=>{
                    if (function(t) {
                        return function(t) {
                            return "type"in t && void 0 !== t.type
                        }(t) && "wallet-status-changed" === t.type
                    }(t)) {
                        const {network: e, accounts: r} = t;
                        e && (Rc(this, mc, "m", Dc).call(this, e),
                        r || Pc(this, Ac, Rc(this, Ac, "f").map((({address: t, features: e, icon: r, label: n, publicKey: o})=>new d({
                            address: t,
                            publicKey: o,
                            chains: Rc(this, Tc, "f") ? [Rc(this, Tc, "f")] : [],
                            features: e,
                            label: n,
                            icon: r
                        }))), "f")),
                        r && Rc(this, mc, "m", Bc).call(this, r),
                        Rc(this, vc, "f").emit("change", {
                            accounts: this.accounts
                        })
                    }
                }
                )),
                Rc(this, Oc, "f").call(this)
            }
        }
        )
    }
    )()
}
)();
