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
        "/": [s, e, "static/chunks/pages/index-101c3d51b7750ac5.js"],
        "/_error": ["static/chunks/pages/_error-8353112a01355ec2.js"],
        "/accounts/[accountId]": [s, c, "static/chunks/pages/accounts/[accountId]-e014ddf0aec1e514.js"],
        "/explore": [s, e, c, "static/chunks/pages/explore-e538b0e09571faa0.js"],
        "/mint": ["static/chunks/610-dd065a6521e4391d.js", "static/chunks/pages/mint-83c7904d5451898e.js"],
        "/predictions/[tokenId]": [a, n, "static/chunks/pages/predictions/[tokenId]-35f3da61e73dac9b.js"],
        "/tokens/[tokenId]": [s, e, a, n, "static/chunks/pages/tokens/[tokenId]-5f2f4c6df146001d.js"],
        sortedPages: ["/", "/_app", "/_error", "/accounts/[accountId]", "/explore", "/mint", "/predictions/[tokenId]", "/tokens/[tokenId]"]
    }
}("static/chunks/664-e432d276bc67604d.js", "static/chunks/675-182ab2d8b63aa1d5.js", "/api/token/:tokenId", "static/chunks/972-00d0635f5e289c55.js", "static/chunks/195-f25e64cdf615679c.js", "static/chunks/451-f173c0e078f7e0c4.js"),
self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
