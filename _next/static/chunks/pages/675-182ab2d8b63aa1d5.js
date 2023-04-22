(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[675], {
    9749: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        Object.defineProperty(t, "ImageLoaderProps", {
            enumerable: !0,
            get: function() {
                return u.ImageLoaderProps
            }
        }),
        t.default = function(e) {
            let t, r;
            var n, {src: a, sizes: p, unoptimized: b=!1, priority: w=!1, loading: y, className: E, quality: S, width: C, height: _, fill: j, style: z, onLoad: x, onLoadingComplete: k, placeholder: I="empty", blurDataURL: O} = e, P = o(e, ["src", "sizes", "unoptimized", "priority", "loading", "className", "quality", "width", "height", "fill", "style", "onLoad", "onLoadingComplete", "placeholder", "blurDataURL"]);
            let R = l.useContext(d.ImageConfigContext)
              , L = l.useMemo(()=>{
                let e = g || R || u.imageConfigDefault
                  , t = [...e.deviceSizes, ...e.imageSizes].sort((e,t)=>e - t)
                  , r = e.deviceSizes.sort((e,t)=>e - t);
                return i({}, e, {
                    allSizes: t,
                    deviceSizes: r
                })
            }
            , [R])
              , A = P
              , N = A.loader || f.default;
            if (delete A.loader,
            "__next_img_default"in N) {
                if ("custom" === L.loader)
                    throw Error('Image with src "'.concat(a, '" is missing "loader" prop.') + "\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")
            } else {
                let M = N;
                N = e=>{
                    let {config: t} = e
                      , r = o(e, ["config"]);
                    return M(r)
                }
            }
            let D = ""
              , B = h(C)
              , T = h(_);
            if ("object" == typeof (n = a) && (m(n) || void 0 !== n.src)) {
                let W = m(a) ? a.default : a;
                if (!W.src)
                    throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(W)));
                if (!W.height || !W.width)
                    throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(W)));
                if (t = W.blurWidth,
                r = W.blurHeight,
                O = O || W.blurDataURL,
                D = W.src,
                !j) {
                    if (B || T) {
                        if (B && !T) {
                            let q = B / W.width;
                            T = Math.round(W.height * q)
                        } else if (!B && T) {
                            let F = T / W.height;
                            B = Math.round(W.width * F)
                        }
                    } else
                        B = W.width,
                        T = W.height
                }
            }
            let G = !w && ("lazy" === y || void 0 === y);
            ((a = "string" == typeof a ? a : D).startsWith("data:") || a.startsWith("blob:")) && (b = !0,
            G = !1),
            L.unoptimized && (b = !0);
            let[Z,U] = l.useState(!1)
              , [V,J] = l.useState(!1)
              , H = h(S)
              , $ = Object.assign(j ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            } : {}, V ? {} : {
                color: "transparent"
            }, z)
              , K = "blur" === I && O && !Z ? {
                backgroundSize: $.objectFit || "cover",
                backgroundPosition: $.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage: 'url("data:image/svg+xml;charset=utf-8,'.concat(c.getImageBlurSvg({
                    widthInt: B,
                    heightInt: T,
                    blurWidth: t,
                    blurHeight: r,
                    blurDataURL: O
                }), '")')
            } : {}
              , Q = function(e) {
                let {config: t, src: r, unoptimized: i, width: n, quality: a, sizes: o, loader: l} = e;
                if (i)
                    return {
                        src: r,
                        srcSet: void 0,
                        sizes: void 0
                    };
                let {widths: s, kind: c} = function(e, t, r) {
                    let {deviceSizes: i, allSizes: n} = e;
                    if (r) {
                        let a = /(^|\s)(1?\d?\d)vw/g
                          , o = [];
                        for (let l; l = a.exec(r); l)
                            o.push(parseInt(l[2]));
                        if (o.length) {
                            let s = .01 * Math.min(...o);
                            return {
                                widths: n.filter(e=>e >= i[0] * s),
                                kind: "w"
                            }
                        }
                        return {
                            widths: n,
                            kind: "w"
                        }
                    }
                    if ("number" != typeof t)
                        return {
                            widths: i,
                            kind: "w"
                        };
                    let c = [...new Set([t, 2 * t].map(e=>n.find(t=>t >= e) || n[n.length - 1]))];
                    return {
                        widths: c,
                        kind: "x"
                    }
                }(t, n, o)
                  , u = s.length - 1;
                return {
                    sizes: o || "w" !== c ? o : "100vw",
                    srcSet: s.map((e,i)=>"".concat(l({
                        config: t,
                        src: r,
                        quality: a,
                        width: e
                    }), " ").concat("w" === c ? e : i + 1).concat(c)).join(", "),
                    src: l({
                        config: t,
                        src: r,
                        quality: a,
                        width: s[u]
                    })
                }
            }({
                config: L,
                src: a,
                unoptimized: b,
                width: B,
                quality: H,
                sizes: p,
                loader: N
            })
              , X = a
              , Y = "imagesrcset"
              , ee = "imagesizes";
            Y = "imageSrcSet",
            ee = "imageSizes";
            let et = {
                [Y]: Q.srcSet,
                [ee]: Q.sizes,
                crossOrigin: A.crossOrigin
            }
              , er = l.useRef(x);
            l.useEffect(()=>{
                er.current = x
            }
            , [x]);
            let ei = l.useRef(k);
            l.useEffect(()=>{
                ei.current = k
            }
            , [k]);
            let en = i({
                isLazy: G,
                imgAttributes: Q,
                heightInt: T,
                widthInt: B,
                qualityInt: H,
                className: E,
                imgStyle: $,
                blurStyle: K,
                loading: y,
                config: L,
                fill: j,
                unoptimized: b,
                placeholder: I,
                loader: N,
                srcString: X,
                onLoadRef: er,
                onLoadingCompleteRef: ei,
                setBlurComplete: U,
                setShowAltText: J
            }, A);
            return l.default.createElement(l.default.Fragment, null, l.default.createElement(v, Object.assign({}, en)), w ? l.default.createElement(s.default, null, l.default.createElement("link", Object.assign({
                key: "__nimg-" + Q.src + Q.srcSet + Q.sizes,
                rel: "preload",
                as: "image",
                href: Q.srcSet ? void 0 : Q.src
            }, et))) : null)
        }
        ;
        var i = r(6495).Z
          , n = r(2648).Z
          , a = r(1598).Z
          , o = r(7273).Z
          , l = a(r(7294))
          , s = n(r(3121))
          , c = r(2675)
          , u = r(139)
          , d = r(8730);
        r(670);
        var f = n(r(9824));
        let g = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !1
        };
        function m(e) {
            return void 0 !== e.default
        }
        function h(e) {
            return "number" == typeof e || void 0 === e ? e : "string" == typeof e && /^[0-9]+$/.test(e) ? parseInt(e, 10) : NaN
        }
        function p(e, t, r, n, a, o) {
            if (!e || e["data-loaded-src"] === t)
                return;
            e["data-loaded-src"] = t;
            let l = "decode"in e ? e.decode() : Promise.resolve();
            l.catch(()=>{}
            ).then(()=>{
                if (e.parentNode) {
                    if ("blur" === r && o(!0),
                    null == n ? void 0 : n.current) {
                        let t = new Event("load");
                        Object.defineProperty(t, "target", {
                            writable: !1,
                            value: e
                        });
                        let l = !1
                          , s = !1;
                        n.current(i({}, t, {
                            nativeEvent: t,
                            currentTarget: e,
                            target: e,
                            isDefaultPrevented: ()=>l,
                            isPropagationStopped: ()=>s,
                            persist() {},
                            preventDefault() {
                                l = !0,
                                t.preventDefault()
                            },
                            stopPropagation() {
                                s = !0,
                                t.stopPropagation()
                            }
                        }))
                    }
                    (null == a ? void 0 : a.current) && a.current(e)
                }
            }
            )
        }
        let v = e=>{
            var {imgAttributes: t, heightInt: r, widthInt: n, qualityInt: a, className: s, imgStyle: c, blurStyle: u, isLazy: d, fill: f, placeholder: g, loading: m, srcString: h, config: v, unoptimized: b, loader: w, onLoadRef: y, onLoadingCompleteRef: E, setBlurComplete: S, setShowAltText: C, onLoad: _, onError: j} = e
              , z = o(e, ["imgAttributes", "heightInt", "widthInt", "qualityInt", "className", "imgStyle", "blurStyle", "isLazy", "fill", "placeholder", "loading", "srcString", "config", "unoptimized", "loader", "onLoadRef", "onLoadingCompleteRef", "setBlurComplete", "setShowAltText", "onLoad", "onError"]);
            return m = d ? "lazy" : m,
            l.default.createElement(l.default.Fragment, null, l.default.createElement("img", Object.assign({}, z, t, {
                width: n,
                height: r,
                decoding: "async",
                "data-nimg": f ? "fill" : "1",
                className: s,
                loading: m,
                style: i({}, c, u),
                ref: l.useCallback(e=>{
                    e && (j && (e.src = e.src),
                    e.complete && p(e, h, g, y, E, S))
                }
                , [h, g, y, E, S, j]),
                onLoad(e) {
                    let t = e.currentTarget;
                    p(t, h, g, y, E, S)
                },
                onError(e) {
                    C(!0),
                    "blur" === g && S(!0),
                    j && j(e)
                }
            })))
        }
        ;
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
        Object.assign(t.default, t),
        e.exports = t.default)
    },
    2675: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getImageBlurSvg = function(e) {
            let {widthInt: t, heightInt: r, blurWidth: i, blurHeight: n, blurDataURL: a} = e
              , o = i || t
              , l = n || r
              , s = a.startsWith("data:image/jpeg") ? "%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%" : "";
            return o && l ? "%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ".concat(o, " ").concat(l, "'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(i && n ? "1" : "20", "'/%3E").concat(s, "%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='").concat(a, "'/%3E%3C/svg%3E") : "%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' x='0' y='0' height='100%25' width='100%25' href='".concat(a, "'/%3E%3C/svg%3E")
        }
    },
    9824: function(e, t) {
        "use strict";
        function r(e) {
            let {config: t, src: r, width: i, quality: n} = e;
            return r.endsWith(".svg") && !t.dangerouslyAllowSVG ? r : "".concat(t.path, "?url=").concat(encodeURIComponent(r), "&w=").concat(i, "&q=").concat(n || 75)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0,
        r.__next_img_default = !0,
        t.default = r
    },
    5675: function(e, t, r) {
        e.exports = r(9749)
    }
}]);
