self.__BUILD_MANIFEST = function(s, e, t, c, a, n) {
    return {
        __rewrites: {
            beforeFiles: [],
            afterFiles: [{
                source: "/graph/:tokenId",
                destination: t
            }, {
                source: "/token/:tokenId",
                destination: t
            }],
            fallback: []
        },
        "/": [s, e, "static/chunks/pages/index-2b6e5d7cf83782d1.js"],
        "/_error": ["static/chunks/pages/_error-8353112a01355ec2.js"],
        "/accounts/[accountId]": [s, c, "static/chunks/pages/accounts/[accountId]-8ddfe841e325ee92.js"],
        "/explore": [s, e, c, "static/chunks/pages/explore-2510dfa5dd4e0db0.js"],
        "/mint": ["static/chunks/610-dd065a6521e4391d.js", "static/chunks/pages/mint-f417d28a47b68c04.js"],
        "/predictions/[tokenId]": [a, n, "static/chunks/pages/predictions/[tokenId]-77c6a5ac6f6c8d1f.js"],
        "/tokens/[tokenId]": [s, e, a, n, "static/chunks/pages/tokens/[tokenId]-19cfab720f3d5648.js"],
        sortedPages: ["/", "/_app", "/_error", "/accounts/[accountId]", "/explore", "/mint", "/predictions/[tokenId]", "/tokens/[tokenId]"]
    }
}("static/chunks/664-e432d276bc67604d.js", "static/chunks/675-182ab2d8b63aa1d5.js", "/api/token/:tokenId", "static/chunks/972-00d0635f5e289c55.js", "static/chunks/195-f25e64cdf615679c.js", "static/chunks/451-f3252c2a8ecfa026.js"),
self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
