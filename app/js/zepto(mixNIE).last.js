; /*!src/zepto.before.js*/
var BJ_REPORT = function(n) {
    if (n.BJ_REPORT) return n.BJ_REPORT;
    var r = [],
        e = {
            id: 0,
            uin: 0,
            url: "",
            combo: 1,
            ext: {},
            level: 4,
            ignore: [],
            random: 1,
            delay: 1e3,
            submit: null
        },
        t = function(n, r) {
            return Object.prototype.toString.call(n) === "[object " + (r || "Object") + "]"
        },
        o = function(n) {
            var r = typeof n;
            return "object" === r && !!n
        },
        u = function(n) {
            return null === n ? !0 : t(n, "Number") ? !1 : !n
        },
        i = (n.onerror, function(n) {
            try {
                if (n.stack) {
                    var r = n.stack.match("https?://[^\n]+");
                    r = r ? r[0] : "";
                    var e = r.match(":(\\d+):(\\d+)");
                    e || (e = [0, 0, 0]);
                    var t = a(n);
                    return {
                        msg: t,
                        rowNum: e[1],
                        colNum: e[2],
                        target: r.replace(e[0], "")
                    }
                }
                return n.name && n.message && n.description ? {
                    msg: JSON.stringify(n)
                } : n
            } catch (o) {
                return n
            }
        }),
        a = function(n) {
            var r = n.stack.replace(/\n/gi, "").split(/\bat\b/).slice(0, 5).join("@").replace(/\?[^:]+/gi, ""),
                e = n.toString();
            return r.indexOf(e) < 0 && (r = e + "@" + r), r
        },
        s = function(n, r) {
            var t = [],
                i = [],
                a = [];
            if (o(n)) {
                n.level = n.level || e.level;
                for (var s in n) {
                    var c = n[s];
                    if (!u(c)) {
                        if (o(c)) try {
                            c = JSON.stringify(c)
                        } catch (f) {
                            c = "[BJ_REPORT detect value stringify error] " + f.toString()
                        }
                        a.push(s + ":" + c), t.push(s + "=" + encodeURIComponent(c)), i.push(s + "[" + r + "]=" + encodeURIComponent(c))
                    }
                }
            }
            return [i.join("&"), a.join(","), t.join("&")]
        },
        c = [],
        f = function(n) {
            if (e.submit) e.submit(n);
            else {
                var r = new Image;
                c.push(r), r.src = n
            }
        },
        l = [],
        p = 0,
        m = function(n) {
            if (e.report) {
                for (; r.length;) {
                    var o = !1,
                        u = r.shift(),
                        i = s(u, l.length);
                    if (t(e.ignore, "Array"))
                        for (var a = 0, c = e.ignore.length; c > a; a++) {
                            var m = e.ignore[a];
                            if (t(m, "RegExp") && m.test(i[1]) || t(m, "Function") && m(u, i[1])) {
                                o = !0;
                                break
                            }
                        }
                    o || (e.combo ? l.push(i[0]) : f(e.report + i[2] + "&_t=" + +new Date), e.onReport && e.onReport(e.id, u))
                }
                var d = l.length;
                if (d) {
                    var g = function() {
                        clearTimeout(p), f(e.report + l.join("&") + "&count=" + d + "&_t=" + +new Date), p = 0, l = []
                    };
                    n ? g() : p || (p = setTimeout(g, e.delay))
                }
            }
        },
        d = {
            push: function(n) {
                return Math.random() >= e.random ? d : (r.push(o(n) ? i(n) : {
                    msg: n
                }), m(), d)
            },
            report: function(n) {
                return n && d.push(n), m(!0), d
            },
            info: function(n) {
                return n ? (o(n) ? n.level = 2 : n = {
                    msg: n,
                    level: 2
                }, d.push(n), d) : d
            },
            debug: function(n) {
                return n ? (o(n) ? n.level = 1 : n = {
                    msg: n,
                    level: 1
                }, d.push(n), d) : d
            },
            init: function(n) {
                if (o(n))
                    for (var r in n) e[r] = n[r];
                var t = parseInt(e.id, 10);
                return t && (/qq\.com$/gi.test(window.location.hostname) && (e.url || (e.url = "//badjs2.qq.com/badjs"), e.uin || (e.uin = parseInt((document.cookie.match(/\buin=\D+(\d+)/) || [])[1], 10))), e.report = e.url + "?id=" + t + "&uin=" + e.uin + "&from=" + encodeURIComponent(location.href) + "&ext=" + JSON.stringify(e.ext) + "&"), d
            },
            __onerror__: n.onerror
        };
    return "undefined" != typeof console && console.error && setTimeout(function() {
        var n = ((location.hash || "").match(/([#&])BJ_ERROR=([^&$]+)/) || [])[2];
        n && console.error("BJ_ERROR", decodeURIComponent(n).replace(/(:\d+:\d+)\s*/g, "$1\n"))
    }, 0), d
}(window);
"undefined" != typeof exports && ("undefined" != typeof module && module.exports && (exports = module.exports = BJ_REPORT), exports.BJ_REPORT = BJ_REPORT),
    function(n) {
        if (n.BJ_REPORT) {
            var r, e = function(r) {
                    n.BJ_REPORT.report(r)
                },
                t = n.BJ_REPORT.tryJs = function(n) {
                    return n && (e = n), t
                },
                o = function(n, r) {
                    var e;
                    for (e in r) n[e] = r[e]
                },
                u = function(n) {
                    return "function" == typeof n
                },
                i = function(t, o) {
                    return function() {
                        try {
                            return t.apply(this, o || arguments)
                        } catch (u) {
                            if (e(u), u.stack && console && console.error && console.error("[BJ-REPORT]", u.stack), !r) {
                                var i = n.onerror;
                                n.onerror = function() {}, r = setTimeout(function() {
                                    n.onerror = i, r = null
                                }, 50)
                            }
                            throw u
                        }
                    }
                },
                a = function(n) {
                    return function() {
                        for (var r, e = [], t = 0, o = arguments.length; o > t; t++) r = arguments[t], u(r) && (r = i(r)), e.push(r);
                        return n.apply(this, e)
                    }
                },
                s = function(n) {
                    return function(r, e) {
                        if ("string" == typeof r) try {
                            r = new Function(r)
                        } catch (t) {
                            throw t
                        }
                        var o = [].slice.call(arguments, 2);
                        return r = i(r, o.length && o), n(r, e)
                    }
                },
                c = function(n, r) {
                    return function() {
                        for (var e, t, o = [], a = 0, s = arguments.length; s > a; a++) e = arguments[a], u(e) && (t = i(e)) && (e.tryWrap = t) && (e = t), o.push(e);
                        return n.apply(r || this, o)
                    }
                },
                f = function(n) {
                    var r, e;
                    for (r in n) e = n[r], u(e) && (n[r] = i(e));
                    return n
                };
            t.spyJquery = function() {
                var r = n.$;
                if (!r || !r.event) return t;
                var e, o;
                r.zepto ? (e = r.fn.on, o = r.fn.off, r.fn.on = c(e), r.fn.off = function() {
                    for (var n, r = [], e = 0, t = arguments.length; t > e; e++) n = arguments[e], u(n) && n.tryWrap && (n = n.tryWrap), r.push(n);
                    return o.apply(this, r)
                }) : window.jQuery && (e = r.event.add, o = r.event.remove, r.event.add = c(e), r.event.remove = function() {
                    for (var n, r = [], e = 0, t = arguments.length; t > e; e++) n = arguments[e], u(n) && n.tryWrap && (n = n.tryWrap), r.push(n);
                    return o.apply(this, r)
                });
                var i = r.ajax;
                return i && (r.ajax = function(n, e) {
                    return e || (e = n, n = void 0), f(e), n ? i.call(r, n, e) : i.call(r, e)
                }), t
            }, t.spyModules = function() {
                var r = n.require,
                    e = n.define;
                return e && e.amd && r && (n.require = a(r), o(n.require, r), n.define = a(e), o(n.define, e)), n.seajs && e && (n.define = function() {
                    for (var n, r = [], t = 0, o = arguments.length; o > t; t++) n = arguments[t], u(n) && (n = i(n), n.toString = function(n) {
                        return function() {
                            return n.toString()
                        }
                    }(arguments[t])), r.push(n);
                    return e.apply(this, r)
                }, n.seajs.use = a(n.seajs.use), o(n.define, e)), t
            }, t.spySystem = function() {
                return n.setTimeout = s(n.setTimeout), n.setInterval = s(n.setInterval), t
            }, t.spyCustom = function(n) {
                return u(n) ? i(n) : f(n)
            }, t.spyAll = function() {
                return t.spyJquery().spyModules().spySystem(), t
            }
        }
    }(window), BJ_REPORT.init({
        id: 1,
        combo: 1,
        delay: 1e3,
        url: "https://webbad.nie.netease.com/badjs",
        ignore: [/Script error/i]
    });; /*!src/lib/zepto.min.js*/
var Zepto = function() {
    function t(t) {
        return null == t ? String(t) : U[J.call(t)] || "object"
    }

    function e(e) {
        return "function" == t(e)
    }

    function n(t) {
        return null != t && t == t.window
    }

    function r(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }

    function i(e) {
        return "object" == t(e)
    }

    function o(t) {
        return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function a(t) {
        return "number" == typeof t.length
    }

    function s(t) {
        return P.call(t, function(t) {
            return null != t
        })
    }

    function u(t) {
        return t.length > 0 ? j.fn.concat.apply([], t) : t
    }

    function c(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function l(t) {
        return t in Z ? Z[t] : Z[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }

    function f(t, e) {
        return "number" != typeof e || $[c(t)] ? e : e + "px"
    }

    function h(t) {
        var e, n;
        return L[t] || (e = A.createElement(t), A.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), L[t] = n), L[t]
    }

    function p(t) {
        return "children" in t ? O.call(t.children) : j.map(t.childNodes, function(t) {
            return 1 == t.nodeType ? t : void 0
        })
    }

    function d(t, e, n) {
        for (E in e) n && (o(e[E]) || G(e[E])) ? (o(e[E]) && !o(t[E]) && (t[E] = {}), G(e[E]) && !G(t[E]) && (t[E] = []), d(t[E], e[E], n)) : e[E] !== w && (t[E] = e[E])
    }

    function m(t, e) {
        return null == e ? j(t) : j(t).filter(e)
    }

    function v(t, n, r, i) {
        return e(n) ? n.call(t, r, i) : n
    }

    function g(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }

    function y(t, e) {
        var n = t.className,
            r = n && n.baseVal !== w;
        return e === w ? r ? n.baseVal : n : void(r ? n.baseVal = e : t.className = e)
    }

    function x(t) {
        var e;
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? j.parseJSON(t) : t : e) : t
        } catch (n) {
            return t
        }
    }

    function b(t, e) {
        e(t);
        for (var n = 0, r = t.childNodes.length; r > n; n++) b(t.childNodes[n], e)
    }
    var w, E, j, S, T, C, N = [],
        O = N.slice,
        P = N.filter,
        A = window.document,
        L = {},
        Z = {},
        $ = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        _ = /^\s*<(\w+|!)[^>]*>/,
        D = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        M = /^(?:body|html)$/i,
        k = /([A-Z])/g,
        z = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        F = ["after", "prepend", "before", "append"],
        q = A.createElement("table"),
        H = A.createElement("tr"),
        I = {
            tr: A.createElement("tbody"),
            tbody: q,
            thead: q,
            tfoot: q,
            td: H,
            th: H,
            "*": A.createElement("div")
        },
        V = /complete|loaded|interactive/,
        B = /^[\w-]*$/,
        U = {},
        J = U.toString,
        X = {},
        W = A.createElement("div"),
        Y = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        G = Array.isArray || function(t) {
            return t instanceof Array
        };
    return X.matches = function(t, e) {
        if (!e || !t || 1 !== t.nodeType) return !1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n) return n.call(t, e);
        var r, i = t.parentNode,
            o = !i;
        return o && (i = W).appendChild(t), r = ~X.qsa(i, e).indexOf(t), o && W.removeChild(t), r
    }, T = function(t) {
        return t.replace(/-+(.)?/g, function(t, e) {
            return e ? e.toUpperCase() : ""
        })
    }, C = function(t) {
        return P.call(t, function(e, n) {
            return t.indexOf(e) == n
        })
    }, X.fragment = function(t, e, n) {
        var r, i, a;
        return D.test(t) && (r = j(A.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(R, "<$1></$2>")), e === w && (e = _.test(t) && RegExp.$1), e in I || (e = "*"), a = I[e], a.innerHTML = "" + t, r = j.each(O.call(a.childNodes), function() {
            a.removeChild(this)
        })), o(n) && (i = j(r), j.each(n, function(t, e) {
            z.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
        })), r
    }, X.Z = function(t, e) {
        return t = t || [], t.__proto__ = j.fn, t.selector = e || "", t
    }, X.isZ = function(t) {
        return t instanceof X.Z
    }, X.init = function(t, n) {
        var r;
        if (!t) return X.Z();
        if ("string" == typeof t)
            if (t = t.trim(), "<" == t[0] && _.test(t)) r = X.fragment(t, RegExp.$1, n), t = null;
            else {
                if (n !== w) return j(n).find(t);
                r = X.qsa(A, t)
            }
        else {
            if (e(t)) return j(A).ready(t);
            if (X.isZ(t)) return t;
            if (G(t)) r = s(t);
            else if (i(t)) r = [t], t = null;
            else if (_.test(t)) r = X.fragment(t.trim(), RegExp.$1, n), t = null;
            else {
                if (n !== w) return j(n).find(t);
                r = X.qsa(A, t)
            }
        }
        return X.Z(r, t)
    }, j = function(t, e) {
        return X.init(t, e)
    }, j.extend = function(t) {
        var e, n = O.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) {
            d(t, n, e)
        }), t
    }, X.qsa = function(t, e) {
        var n, i = "#" == e[0],
            o = !i && "." == e[0],
            a = i || o ? e.slice(1) : e,
            s = B.test(a);
        return r(t) && s && i ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : O.call(s && !i ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    }, j.contains = A.documentElement.contains ? function(t, e) {
        return t !== e && t.contains(e)
    } : function(t, e) {
        for (; e && (e = e.parentNode);)
            if (e === t) return !0;
        return !1
    }, j.type = t, j.isFunction = e, j.isWindow = n, j.isArray = G, j.isPlainObject = o, j.isEmptyObject = function(t) {
        var e;
        for (e in t) return !1;
        return !0
    }, j.inArray = function(t, e, n) {
        return N.indexOf.call(e, t, n)
    }, j.camelCase = T, j.trim = function(t) {
        return null == t ? "" : String.prototype.trim.call(t)
    }, j.uuid = 0, j.support = {}, j.expr = {}, j.map = function(t, e) {
        var n, r, i, o = [];
        if (a(t))
            for (r = 0; r < t.length; r++) n = e(t[r], r), null != n && o.push(n);
        else
            for (i in t) n = e(t[i], i), null != n && o.push(n);
        return u(o)
    }, j.each = function(t, e) {
        var n, r;
        if (a(t)) {
            for (n = 0; n < t.length; n++)
                if (e.call(t[n], n, t[n]) === !1) return t
        } else
            for (r in t)
                if (e.call(t[r], r, t[r]) === !1) return t;
        return t
    }, j.grep = function(t, e) {
        return P.call(t, e)
    }, window.JSON && (j.parseJSON = JSON.parse), j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        U["[object " + e + "]"] = e.toLowerCase()
    }), j.fn = {
        forEach: N.forEach,
        reduce: N.reduce,
        push: N.push,
        sort: N.sort,
        indexOf: N.indexOf,
        concat: N.concat,
        map: function(t) {
            return j(j.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return j(O.apply(this, arguments))
        },
        ready: function(t) {
            return V.test(A.readyState) && A.body ? t(j) : A.addEventListener("DOMContentLoaded", function() {
                t(j)
            }, !1), this
        },
        get: function(t) {
            return t === w ? O.call(this) : this[t >= 0 ? t : t + this.length]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(t) {
            return N.every.call(this, function(e, n) {
                return t.call(e, n, e) !== !1
            }), this
        },
        filter: function(t) {
            return e(t) ? this.not(this.not(t)) : j(P.call(this, function(e) {
                return X.matches(e, t)
            }))
        },
        add: function(t, e) {
            return j(C(this.concat(j(t, e))))
        },
        is: function(t) {
            return this.length > 0 && X.matches(this[0], t)
        },
        not: function(t) {
            var n = [];
            if (e(t) && t.call !== w) this.each(function(e) {
                t.call(this, e) || n.push(this)
            });
            else {
                var r = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? O.call(t) : j(t);
                this.forEach(function(t) {
                    r.indexOf(t) < 0 && n.push(t)
                })
            }
            return j(n)
        },
        has: function(t) {
            return this.filter(function() {
                return i(t) ? j.contains(this, t) : j(this).find(t).size()
            })
        },
        eq: function(t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function() {
            var t = this[0];
            return t && !i(t) ? t : j(t)
        },
        last: function() {
            var t = this[this.length - 1];
            return t && !i(t) ? t : j(t)
        },
        find: function(t) {
            var e, n = this;
            return e = t ? "object" == typeof t ? j(t).filter(function() {
                var t = this;
                return N.some.call(n, function(e) {
                    return j.contains(e, t)
                })
            }) : 1 == this.length ? j(X.qsa(this[0], t)) : this.map(function() {
                return X.qsa(this, t)
            }) : []
        },
        closest: function(t, e) {
            var n = this[0],
                i = !1;
            for ("object" == typeof t && (i = j(t)); n && !(i ? i.indexOf(n) >= 0 : X.matches(n, t));) n = n !== e && !r(n) && n.parentNode;
            return j(n)
        },
        parents: function(t) {
            for (var e = [], n = this; n.length > 0;) n = j.map(n, function(t) {
                return (t = t.parentNode) && !r(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
            });
            return m(e, t)
        },
        parent: function(t) {
            return m(C(this.pluck("parentNode")), t)
        },
        children: function(t) {
            return m(this.map(function() {
                return p(this)
            }), t)
        },
        contents: function() {
            return this.map(function() {
                return O.call(this.childNodes)
            })
        },
        siblings: function(t) {
            return m(this.map(function(t, e) {
                return P.call(p(e.parentNode), function(t) {
                    return t !== e
                })
            }), t)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(t) {
            return j.map(this, function(e) {
                return e[t]
            })
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
            })
        },
        replaceWith: function(t) {
            return this.before(t).remove()
        },
        wrap: function(t) {
            var n = e(t);
            if (this[0] && !n) var r = j(t).get(0),
                i = r.parentNode || this.length > 1;
            return this.each(function(e) {
                j(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r)
            })
        },
        wrapAll: function(t) {
            if (this[0]) {
                j(this[0]).before(t = j(t));
                for (var e;
                    (e = t.children()).length;) t = e.first();
                j(t).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            var n = e(t);
            return this.each(function(e) {
                var r = j(this),
                    i = r.contents(),
                    o = n ? t.call(this, e) : t;
                i.length ? i.wrapAll(o) : r.append(o)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                j(this).replaceWith(j(this).children())
            }), this
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0)
            })
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(t) {
            return this.each(function() {
                var e = j(this);
                (t === w ? "none" == e.css("display") : t) ? e.show(): e.hide()
            })
        },
        prev: function(t) {
            return j(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function(t) {
            return j(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function(t) {
            return 0 in arguments ? this.each(function(e) {
                var n = this.innerHTML;
                j(this).empty().append(v(this, t, e, n))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function(t) {
            return 0 in arguments ? this.each(function(e) {
                var n = v(this, t, e, this.textContent);
                this.textContent = null == n ? "" : "" + n
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function(t, e) {
            var n;
            return "string" != typeof t || 1 in arguments ? this.each(function(n) {
                if (1 === this.nodeType)
                    if (i(t))
                        for (E in t) g(this, E, t[E]);
                    else g(this, t, v(this, e, n, this.getAttribute(t)))
            }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : w
        },
        removeAttr: function(t) {
            return this.each(function() {
                1 === this.nodeType && g(this, t)
            })
        },
        prop: function(t, e) {
            return t = Y[t] || t, 1 in arguments ? this.each(function(n) {
                this[t] = v(this, e, n, this[t])
            }) : this[0] && this[0][t]
        },
        data: function(t, e) {
            var n = "data-" + t.replace(k, "-$1").toLowerCase(),
                r = 1 in arguments ? this.attr(n, e) : this.attr(n);
            return null !== r ? x(r) : w
        },
        val: function(t) {
            return 0 in arguments ? this.each(function(e) {
                this.value = v(this, t, e, this.value)
            }) : this[0] && (this[0].multiple ? j(this[0]).find("option").filter(function() {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function(t) {
            if (t) return this.each(function(e) {
                var n = j(this),
                    r = v(this, t, e, n.offset()),
                    i = n.offsetParent().offset(),
                    o = {
                        top: r.top - i.top,
                        left: r.left - i.left
                    };
                "static" == n.css("position") && (o.position = "relative"), n.css(o)
            });
            if (!this.length) return null;
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            }
        },
        css: function(e, n) {
            if (arguments.length < 2) {
                var r = this[0],
                    i = getComputedStyle(r, "");
                if (!r) return;
                if ("string" == typeof e) return r.style[T(e)] || i.getPropertyValue(e);
                if (G(e)) {
                    var o = {};
                    return j.each(G(e) ? e : [e], function(t, e) {
                        o[e] = r.style[T(e)] || i.getPropertyValue(e)
                    }), o
                }
            }
            var a = "";
            if ("string" == t(e)) n || 0 === n ? a = c(e) + ":" + f(e, n) : this.each(function() {
                this.style.removeProperty(c(e))
            });
            else
                for (E in e) e[E] || 0 === e[E] ? a += c(E) + ":" + f(E, e[E]) + ";" : this.each(function() {
                    this.style.removeProperty(c(E))
                });
            return this.each(function() {
                this.style.cssText += ";" + a
            })
        },
        index: function(t) {
            return t ? this.indexOf(j(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(t) {
            return t ? N.some.call(this, function(t) {
                return this.test(y(t))
            }, l(t)) : !1
        },
        addClass: function(t) {
            return t ? this.each(function(e) {
                S = [];
                var n = y(this),
                    r = v(this, t, e, n);
                r.split(/\s+/g).forEach(function(t) {
                    j(this).hasClass(t) || S.push(t)
                }, this), S.length && y(this, n + (n ? " " : "") + S.join(" "))
            }) : this
        },
        removeClass: function(t) {
            return this.each(function(e) {
                return t === w ? y(this, "") : (S = y(this), v(this, t, e, S).split(/\s+/g).forEach(function(t) {
                    S = S.replace(l(t), " ")
                }), void y(this, S.trim()))
            })
        },
        toggleClass: function(t, e) {
            return t ? this.each(function(n) {
                var r = j(this),
                    i = v(this, t, n, y(this));
                i.split(/\s+/g).forEach(function(t) {
                    (e === w ? !r.hasClass(t) : e) ? r.addClass(t): r.removeClass(t)
                })
            }) : this
        },
        scrollTop: function(t) {
            if (this.length) {
                var e = "scrollTop" in this[0];
                return t === w ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                    this.scrollTop = t
                } : function() {
                    this.scrollTo(this.scrollX, t)
                })
            }
        },
        scrollLeft: function(t) {
            if (this.length) {
                var e = "scrollLeft" in this[0];
                return t === w ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                    this.scrollLeft = t
                } : function() {
                    this.scrollTo(t, this.scrollY)
                })
            }
        },
        position: function() {
            if (this.length) {
                var t = this[0],
                    e = this.offsetParent(),
                    n = this.offset(),
                    r = M.test(e[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : e.offset();
                return n.top -= parseFloat(j(t).css("margin-top")) || 0, n.left -= parseFloat(j(t).css("margin-left")) || 0, r.top += parseFloat(j(e[0]).css("border-top-width")) || 0, r.left += parseFloat(j(e[0]).css("border-left-width")) || 0, {
                    top: n.top - r.top,
                    left: n.left - r.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || A.body; t && !M.test(t.nodeName) && "static" == j(t).css("position");) t = t.offsetParent;
                return t
            })
        }
    }, j.fn.detach = j.fn.remove, ["width", "height"].forEach(function(t) {
        var e = t.replace(/./, function(t) {
            return t[0].toUpperCase()
        });
        j.fn[t] = function(i) {
            var o, a = this[0];
            return i === w ? n(a) ? a["inner" + e] : r(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function(e) {
                a = j(this), a.css(t, v(this, i, e, a[t]()))
            })
        }
    }), F.forEach(function(e, n) {
        var r = n % 2;
        j.fn[e] = function() {
            var e, i, o = j.map(arguments, function(n) {
                    return e = t(n), "object" == e || "array" == e || null == n ? n : X.fragment(n)
                }),
                a = this.length > 1;
            return o.length < 1 ? this : this.each(function(t, e) {
                i = r ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                var s = j.contains(A.documentElement, i);
                o.forEach(function(t) {
                    if (a) t = t.cloneNode(!0);
                    else if (!i) return j(t).remove();
                    i.insertBefore(t, e), s && b(t, function(t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        }, j.fn[r ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
            return j(t)[e](this), this
        }
    }), X.Z.prototype = j.fn, X.uniq = C, X.deserializeValue = x, j.zepto = X, j
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto),
    function(t) {
        function e(t) {
            return t._zid || (t._zid = h++)
        }

        function n(t, n, o, a) {
            if (n = r(n), n.ns) var s = i(n.ns);
            return (v[e(t)] || []).filter(function(t) {
                return !(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || o && e(t.fn) !== e(o) || a && t.sel != a)
            })
        }

        function r(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }

        function i(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }

        function o(t, e) {
            return t.del && !y && t.e in x || !!e
        }

        function a(t) {
            return b[t] || y && x[t] || t
        }

        function s(n, i, s, u, l, h, p) {
            var d = e(n),
                m = v[d] || (v[d] = []);
            i.split(/\s/).forEach(function(e) {
                if ("ready" == e) return t(document).ready(s);
                var i = r(e);
                i.fn = s, i.sel = l, i.e in b && (s = function(e) {
                    var n = e.relatedTarget;
                    return !n || n !== this && !t.contains(this, n) ? i.fn.apply(this, arguments) : void 0
                }), i.del = h;
                var d = h || s;
                i.proxy = function(t) {
                    if (t = c(t), !t.isImmediatePropagationStopped()) {
                        t.data = u;
                        var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                        return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                    }
                }, i.i = m.length, m.push(i), "addEventListener" in n && n.addEventListener(a(i.e), i.proxy, o(i, p))
            })
        }

        function u(t, r, i, s, u) {
            var c = e(t);
            (r || "").split(/\s/).forEach(function(e) {
                n(t, e, i, s).forEach(function(e) {
                    delete v[c][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, o(e, u))
                })
            })
        }

        function c(e, n) {
            return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(S, function(t, r) {
                var i = n[t];
                e[t] = function() {
                    return this[r] = w, i && i.apply(n, arguments)
                }, e[r] = E
            }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = w)), e
        }

        function l(t) {
            var e, n = {
                originalEvent: t
            };
            for (e in t) j.test(e) || t[e] === f || (n[e] = t[e]);
            return c(n, t)
        }
        var f, h = 1,
            p = Array.prototype.slice,
            d = t.isFunction,
            m = function(t) {
                return "string" == typeof t
            },
            v = {},
            g = {},
            y = "onfocusin" in window,
            x = {
                focus: "focusin",
                blur: "focusout"
            },
            b = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            };
        g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", t.event = {
            add: s,
            remove: u
        }, t.proxy = function(n, r) {
            var i = 2 in arguments && p.call(arguments, 2);
            if (d(n)) {
                var o = function() {
                    return n.apply(r, i ? i.concat(p.call(arguments)) : arguments)
                };
                return o._zid = e(n), o
            }
            if (m(r)) return i ? (i.unshift(n[r], n), t.proxy.apply(null, i)) : t.proxy(n[r], n);
            throw new TypeError("expected function")
        }, t.fn.bind = function(t, e, n) {
            return this.on(t, e, n)
        }, t.fn.unbind = function(t, e) {
            return this.off(t, e)
        }, t.fn.one = function(t, e, n, r) {
            return this.on(t, e, n, r, 1)
        };
        var w = function() {
                return !0
            },
            E = function() {
                return !1
            },
            j = /^([A-Z]|returnValue$|layer[XY]$)/,
            S = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
        t.fn.delegate = function(t, e, n) {
            return this.on(e, t, n)
        }, t.fn.undelegate = function(t, e, n) {
            return this.off(e, t, n)
        }, t.fn.live = function(e, n) {
            return t(document.body).delegate(this.selector, e, n), this
        }, t.fn.die = function(e, n) {
            return t(document.body).undelegate(this.selector, e, n), this
        }, t.fn.on = function(e, n, r, i, o) {
            var a, c, h = this;
            return e && !m(e) ? (t.each(e, function(t, e) {
                h.on(t, n, r, e, o)
            }), h) : (m(n) || d(i) || i === !1 || (i = r, r = n, n = f), (d(r) || r === !1) && (i = r, r = f), i === !1 && (i = E), h.each(function(f, h) {
                o && (a = function(t) {
                    return u(h, t.type, i), i.apply(this, arguments)
                }), n && (c = function(e) {
                    var r, o = t(e.target).closest(n, h).get(0);
                    return o && o !== h ? (r = t.extend(l(e), {
                        currentTarget: o,
                        liveFired: h
                    }), (a || i).apply(o, [r].concat(p.call(arguments, 1)))) : void 0
                }), s(h, e, i, r, n, c || a)
            }))
        }, t.fn.off = function(e, n, r) {
            var i = this;
            return e && !m(e) ? (t.each(e, function(t, e) {
                i.off(t, n, e)
            }), i) : (m(n) || d(r) || r === !1 || (r = n, n = f), r === !1 && (r = E), i.each(function() {
                u(this, e, r, n)
            }))
        }, t.fn.trigger = function(e, n) {
            return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e), e._args = n, this.each(function() {
                "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
            })
        }, t.fn.triggerHandler = function(e, r) {
            var i, o;
            return this.each(function(a, s) {
                i = l(m(e) ? t.Event(e) : e), i._args = r, i.target = s, t.each(n(s, e.type || e), function(t, e) {
                    return o = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
                })
            }), o
        }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
            t.fn[e] = function(t) {
                return t ? this.bind(e, t) : this.trigger(e)
            }
        }), ["focus", "blur"].forEach(function(e) {
            t.fn[e] = function(t) {
                return t ? this.bind(e, t) : this.each(function() {
                    try {
                        this[e]()
                    } catch (t) {}
                }), this
            }
        }), t.Event = function(t, e) {
            m(t) || (e = t, t = e.type);
            var n = document.createEvent(g[t] || "Events"),
                r = !0;
            if (e)
                for (var i in e) "bubbles" == i ? r = !!e[i] : n[i] = e[i];
            return n.initEvent(t, r, !0), c(n)
        }
    }(Zepto),
    function(t) {
        function e(e, n, r) {
            var i = t.Event(n);
            return t(e).trigger(i, r), !i.isDefaultPrevented()
        }

        function n(t, n, r, i) {
            return t.global ? e(n || y, r, i) : void 0
        }

        function r(e) {
            e.global && 0 === t.active++ && n(e, null, "ajaxStart")
        }

        function i(e) {
            e.global && !--t.active && n(e, null, "ajaxStop")
        }

        function o(t, e) {
            var r = e.context;
            return e.beforeSend.call(r, t, e) === !1 || n(e, r, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, r, "ajaxSend", [t, e])
        }

        function a(t, e, r, i) {
            var o = r.context,
                a = "success";
            r.success.call(o, t, a, e), i && i.resolveWith(o, [t, a, e]), n(r, o, "ajaxSuccess", [e, r, t]), u(a, e, r)
        }

        function s(t, e, r, i, o) {
            var a = i.context;
            i.error.call(a, r, e, t), o && o.rejectWith(a, [r, e, t]), n(i, a, "ajaxError", [r, i, t || e]), u(e, r, i)
        }

        function u(t, e, r) {
            var o = r.context;
            r.complete.call(o, e, t), n(r, o, "ajaxComplete", [e, r]), i(r)
        }

        function c() {}

        function l(t) {
            return t && (t = t.split(";", 2)[0]), t && (t == j ? "html" : t == E ? "json" : b.test(t) ? "script" : w.test(t) && "xml") || "text"
        }

        function f(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }

        function h(e) {
            e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
        }

        function p(e, n, r, i) {
            return t.isFunction(n) && (i = r, r = n, n = void 0), t.isFunction(r) || (i = r, r = void 0), {
                url: e,
                data: n,
                success: r,
                dataType: i
            }
        }

        function d(e, n, r, i) {
            var o, a = t.isArray(n),
                s = t.isPlainObject(n);
            t.each(n, function(n, u) {
                o = t.type(u), i && (n = r ? i : i + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !i && a ? e.add(u.name, u.value) : "array" == o || !r && "object" == o ? d(e, u, r, n) : e.add(n, u)
            })
        }
        var m, v, g = 0,
            y = window.document,
            x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            b = /^(?:text|application)\/javascript/i,
            w = /^(?:text|application)\/xml/i,
            E = "application/json",
            j = "text/html",
            S = /^\s*$/;
        t.active = 0, t.ajaxJSONP = function(e, n) {
            if (!("type" in e)) return t.ajax(e);
            var r, i, u = e.jsonpCallback,
                c = (t.isFunction(u) ? u() : u) || "jsonp" + ++g,
                l = y.createElement("script"),
                f = window[c],
                h = function(e) {
                    t(l).triggerHandler("error", e || "abort")
                },
                p = {
                    abort: h
                };
            return n && n.promise(p), t(l).on("load error", function(o, u) {
                clearTimeout(i), t(l).off().remove(), "error" != o.type && r ? a(r[0], p, e, n) : s(null, u || "error", p, e, n), window[c] = f, r && t.isFunction(f) && f(r[0]), f = r = void 0
            }), o(p, e) === !1 ? (h("abort"), p) : (window[c] = function() {
                r = arguments
            }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(l), e.timeout > 0 && (i = setTimeout(function() {
                h("timeout")
            }, e.timeout)), p)
        }, t.ajaxSettings = {
            type: "GET",
            beforeSend: c,
            success: c,
            error: c,
            complete: c,
            context: null,
            global: !0,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: E,
                xml: "application/xml, text/xml",
                html: j,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        }, t.ajax = function(e) {
            var n = t.extend({}, e || {}),
                i = t.Deferred && t.Deferred();
            for (m in t.ajaxSettings) void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
            r(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), h(n);
            var u = n.dataType,
                p = /\?.+=\?/.test(n.url);
            if (p && (u = "jsonp"), n.cache !== !1 && (e && e.cache === !0 || "script" != u && "jsonp" != u) || (n.url = f(n.url, "_=" + Date.now())), "jsonp" == u) return p || (n.url = f(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, i);
            var d, g = n.accepts[u],
                y = {},
                x = function(t, e) {
                    y[t.toLowerCase()] = [t, e]
                },
                b = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol,
                w = n.xhr(),
                E = w.setRequestHeader;
            if (i && i.promise(w), n.crossDomain || x("X-Requested-With", "XMLHttpRequest"), x("Accept", g || "*/*"), (g = n.mimeType || g) && (g.indexOf(",") > -1 && (g = g.split(",", 2)[0]), w.overrideMimeType && w.overrideMimeType(g)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && x("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers)
                for (v in n.headers) x(v, n.headers[v]);
            if (w.setRequestHeader = x, w.onreadystatechange = function() {
                    if (4 == w.readyState) {
                        w.onreadystatechange = c, clearTimeout(d);
                        var e, r = !1;
                        if (w.status >= 200 && w.status < 300 || 304 == w.status || 0 == w.status && "file:" == b) {
                            u = u || l(n.mimeType || w.getResponseHeader("content-type")), e = w.responseText;
                            try {
                                "script" == u ? (1, eval)(e) : "xml" == u ? e = w.responseXML : "json" == u && (e = S.test(e) ? null : t.parseJSON(e))
                            } catch (o) {
                                r = o
                            }
                            r ? s(r, "parsererror", w, n, i) : a(e, w, n, i)
                        } else s(w.statusText || null, w.status ? "error" : "abort", w, n, i)
                    }
                }, o(w, n) === !1) return w.abort(), s(null, "abort", w, n, i), w;
            if (n.xhrFields)
                for (v in n.xhrFields) w[v] = n.xhrFields[v];
            var j = "async" in n ? n.async : !0;
            w.open(n.type, n.url, j, n.username, n.password);
            for (v in y) E.apply(w, y[v]);
            return n.timeout > 0 && (d = setTimeout(function() {
                w.onreadystatechange = c, w.abort(), s(null, "timeout", w, n, i)
            }, n.timeout)), w.send(n.data ? n.data : null), w
        }, t.get = function() {
            return t.ajax(p.apply(null, arguments))
        }, t.post = function() {
            var e = p.apply(null, arguments);
            return e.type = "POST", t.ajax(e)
        }, t.getJSON = function() {
            var e = p.apply(null, arguments);
            return e.dataType = "json", t.ajax(e)
        }, t.fn.load = function(e, n, r) {
            if (!this.length) return this;
            var i, o = this,
                a = e.split(/\s/),
                s = p(e, n, r),
                u = s.success;
            return a.length > 1 && (s.url = a[0], i = a[1]), s.success = function(e) {
                o.html(i ? t("<div>").html(e.replace(x, "")).find(i) : e), u && u.apply(o, arguments)
            }, t.ajax(s), this
        };
        var T = encodeURIComponent;
        t.param = function(t, e) {
            var n = [];
            return n.add = function(t, e) {
                this.push(T(t) + "=" + T(e))
            }, d(n, t, e), n.join("&").replace(/%20/g, "+")
        }
    }(Zepto),
    function(t) {
        t.fn.serializeArray = function() {
            var e, n = [];
            return t([].slice.call(this.get(0).elements)).each(function() {
                e = t(this);
                var r = e.attr("type");
                "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != r && "reset" != r && "button" != r && ("radio" != r && "checkbox" != r || this.checked) && n.push({
                    name: e.attr("name"),
                    value: e.val()
                })
            }), n
        }, t.fn.serialize = function() {
            var t = [];
            return this.serializeArray().forEach(function(e) {
                t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
            }), t.join("&")
        }, t.fn.submit = function(e) {
            if (e) this.bind("submit", e);
            else if (this.length) {
                var n = t.Event("submit");
                this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    }(Zepto),
    function(t) {
        "__proto__" in {} || t.extend(t.zepto, {
            Z: function(e, n) {
                return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e
            },
            isZ: function(e) {
                return "array" === t.type(e) && "__Z" in e
            }
        });
        try {
            getComputedStyle(void 0)
        } catch (e) {
            var n = getComputedStyle;
            window.getComputedStyle = function(t) {
                try {
                    return n(t)
                } catch (e) {
                    return null
                }
            }
        }
    }(Zepto);; /*!src/mobi.js*/
window.jQuery = window.Zepto, $.browser = {
        msie: !1
    },
    function(e) {
        e.extend(e, {
            makeArray: function(n, r) {
                var u, i = r || [];
                return null != n && (u = jQuery.type(n), null == n.length || "string" === u || "function" === u || "regexp" === u || jQuery.isWindow(n) ? i.push(n) : e.merge(i, n)), i
            }
        })
    }(jQuery);; /*!src/zepto.pack.js*/
var nie = nie || {};
! function(e) {
    e.host = function() {
        var e = window.location.protocol,
            t = "";
        return t = e.indexOf("https") > -1 || window.location.hostname.indexOf("163") < 0 ? "https://nie.res.netease.com" : "http://res.nie.netease.com"
    }()
}(jQuery), ! function(e) {
    var t = function(e, t) {
            return e << t | e >>> 32 - t
        },
        n = function(e, t) {
            var n, i, o, r, a;
            return o = 2147483648 & e, r = 2147483648 & t, n = 1073741824 & e, i = 1073741824 & t, a = (1073741823 & e) + (1073741823 & t), n & i ? 2147483648 ^ a ^ o ^ r : n | i ? 1073741824 & a ? 3221225472 ^ a ^ o ^ r : 1073741824 ^ a ^ o ^ r : a ^ o ^ r
        },
        i = function(e, t, n) {
            return e & t | ~e & n
        },
        o = function(e, t, n) {
            return e & n | t & ~n
        },
        r = function(e, t, n) {
            return e ^ t ^ n
        },
        a = function(e, t, n) {
            return t ^ (e | ~n)
        },
        u = function(e, o, r, a, u, s, c) {
            return e = n(e, n(n(i(o, r, a), u), c)), n(t(e, s), o)
        },
        s = function(e, i, r, a, u, s, c) {
            return e = n(e, n(n(o(i, r, a), u), c)), n(t(e, s), i)
        },
        c = function(e, i, o, a, u, s, c) {
            return e = n(e, n(n(r(i, o, a), u), c)), n(t(e, s), i)
        },
        l = function(e, i, o, r, u, s, c) {
            return e = n(e, n(n(a(i, o, r), u), c)), n(t(e, s), i)
        },
        f = function(e) {
            for (var t, n = e.length, i = n + 8, o = (i - i % 64) / 64, r = 16 * (o + 1), a = Array(r - 1), u = 0, s = 0; n > s;) t = (s - s % 4) / 4, u = s % 4 * 8, a[t] = a[t] | e.charCodeAt(s) << u, s++;
            return t = (s - s % 4) / 4, u = s % 4 * 8, a[t] = a[t] | 128 << u, a[r - 2] = n << 3, a[r - 1] = n >>> 29, a
        },
        m = function(e) {
            var t, n, i = "",
                o = "";
            for (n = 0; 3 >= n; n++) t = e >>> 8 * n & 255, o = "0" + t.toString(16), i += o.substr(o.length - 2, 2);
            return i
        },
        d = function(e) {
            e = e.replace(/\x0d\x0a/g, "\n");
            for (var t = "", n = 0; n < e.length; n++) {
                var i = e.charCodeAt(n);
                128 > i ? t += String.fromCharCode(i) : i > 127 && 2048 > i ? (t += String.fromCharCode(i >> 6 | 192), t += String.fromCharCode(63 & i | 128)) : (t += String.fromCharCode(i >> 12 | 224), t += String.fromCharCode(i >> 6 & 63 | 128), t += String.fromCharCode(63 & i | 128))
            }
            return t
        };
    e.extend(e, {
        md5: function(e) {
            var t, i, o, r, a, h, g, p, w, y = Array(),
                v = 7,
                x = 12,
                b = 17,
                _ = 22,
                j = 5,
                k = 9,
                S = 14,
                L = 20,
                q = 4,
                C = 11,
                z = 16,
                D = 23,
                T = 6,
                P = 10,
                E = 15,
                R = 21;
            for (e = d(e), y = f(e), h = 1732584193, g = 4023233417, p = 2562383102, w = 271733878, t = 0; t < y.length; t += 16) i = h, o = g, r = p, a = w, h = u(h, g, p, w, y[t + 0], v, 3614090360), w = u(w, h, g, p, y[t + 1], x, 3905402710), p = u(p, w, h, g, y[t + 2], b, 606105819), g = u(g, p, w, h, y[t + 3], _, 3250441966), h = u(h, g, p, w, y[t + 4], v, 4118548399), w = u(w, h, g, p, y[t + 5], x, 1200080426), p = u(p, w, h, g, y[t + 6], b, 2821735955), g = u(g, p, w, h, y[t + 7], _, 4249261313), h = u(h, g, p, w, y[t + 8], v, 1770035416), w = u(w, h, g, p, y[t + 9], x, 2336552879), p = u(p, w, h, g, y[t + 10], b, 4294925233), g = u(g, p, w, h, y[t + 11], _, 2304563134), h = u(h, g, p, w, y[t + 12], v, 1804603682), w = u(w, h, g, p, y[t + 13], x, 4254626195), p = u(p, w, h, g, y[t + 14], b, 2792965006), g = u(g, p, w, h, y[t + 15], _, 1236535329), h = s(h, g, p, w, y[t + 1], j, 4129170786), w = s(w, h, g, p, y[t + 6], k, 3225465664), p = s(p, w, h, g, y[t + 11], S, 643717713), g = s(g, p, w, h, y[t + 0], L, 3921069994), h = s(h, g, p, w, y[t + 5], j, 3593408605), w = s(w, h, g, p, y[t + 10], k, 38016083), p = s(p, w, h, g, y[t + 15], S, 3634488961), g = s(g, p, w, h, y[t + 4], L, 3889429448), h = s(h, g, p, w, y[t + 9], j, 568446438), w = s(w, h, g, p, y[t + 14], k, 3275163606), p = s(p, w, h, g, y[t + 3], S, 4107603335), g = s(g, p, w, h, y[t + 8], L, 1163531501), h = s(h, g, p, w, y[t + 13], j, 2850285829), w = s(w, h, g, p, y[t + 2], k, 4243563512), p = s(p, w, h, g, y[t + 7], S, 1735328473), g = s(g, p, w, h, y[t + 12], L, 2368359562), h = c(h, g, p, w, y[t + 5], q, 4294588738), w = c(w, h, g, p, y[t + 8], C, 2272392833), p = c(p, w, h, g, y[t + 11], z, 1839030562), g = c(g, p, w, h, y[t + 14], D, 4259657740), h = c(h, g, p, w, y[t + 1], q, 2763975236), w = c(w, h, g, p, y[t + 4], C, 1272893353), p = c(p, w, h, g, y[t + 7], z, 4139469664), g = c(g, p, w, h, y[t + 10], D, 3200236656), h = c(h, g, p, w, y[t + 13], q, 681279174), w = c(w, h, g, p, y[t + 0], C, 3936430074), p = c(p, w, h, g, y[t + 3], z, 3572445317), g = c(g, p, w, h, y[t + 6], D, 76029189), h = c(h, g, p, w, y[t + 9], q, 3654602809), w = c(w, h, g, p, y[t + 12], C, 3873151461), p = c(p, w, h, g, y[t + 15], z, 530742520), g = c(g, p, w, h, y[t + 2], D, 3299628645), h = l(h, g, p, w, y[t + 0], T, 4096336452), w = l(w, h, g, p, y[t + 7], P, 1126891415), p = l(p, w, h, g, y[t + 14], E, 2878612391), g = l(g, p, w, h, y[t + 5], R, 4237533241), h = l(h, g, p, w, y[t + 12], T, 1700485571), w = l(w, h, g, p, y[t + 3], P, 2399980690), p = l(p, w, h, g, y[t + 10], E, 4293915773), g = l(g, p, w, h, y[t + 1], R, 2240044497), h = l(h, g, p, w, y[t + 8], T, 1873313359), w = l(w, h, g, p, y[t + 15], P, 4264355552), p = l(p, w, h, g, y[t + 6], E, 2734768916), g = l(g, p, w, h, y[t + 13], R, 1309151649), h = l(h, g, p, w, y[t + 4], T, 4149444226), w = l(w, h, g, p, y[t + 11], P, 3174756917), p = l(p, w, h, g, y[t + 2], E, 718787259), g = l(g, p, w, h, y[t + 9], R, 3951481745), h = n(h, i), g = n(g, o), p = n(p, r), w = n(w, a);
            var U = m(h) + m(g) + m(p) + m(w);
            return U.toLowerCase()
        }
    })
}(jQuery), ! function() {
    jQuery.cookie = function(e, t, n) {
        if ("undefined" == typeof t) {
            var i = null;
            if (document.cookie && "" != document.cookie)
                for (var o = document.cookie.split(";"), r = 0; r < o.length; r++) {
                    var a = jQuery.trim(o[r]);
                    if (a.substring(0, e.length + 1) == e + "=") {
                        i = decodeURIComponent(a.substring(e.length + 1));
                        break
                    }
                }
            return i
        }
        n = n || {}, null === t && (t = "", n.expires = -1);
        var u = "";
        if (n.expires && ("number" == typeof n.expires || n.expires.toUTCString)) {
            var s;
            "number" == typeof n.expires ? (s = new Date, s.setTime(s.getTime() + 24 * n.expires * 60 * 60 * 1e3)) : s = n.expires, u = "; expires=" + s.toUTCString()
        }
        var c = n.path ? "; path=" + n.path : "",
            l = n.domain ? "; domain=" + n.domain : "",
            f = n.secure ? "; secure" : "";
        document.cookie = [e, "=", encodeURIComponent(t), u, c, l, f].join("")
    }
}(jQuery), ! function(e) {
    e.chainclude = function(t, n) {
        var i = function(o, r) {
            if ("undefined" != typeof t.length) return 0 == t.length ? e.isFunction(n) ? n(r) : null : (t.shift(), e.chainclude.load(t, i));
            for (var a in t) {
                t[a](r), delete t[a];
                var u = 0;
                for (var s in t) u++;
                return 0 == u ? e.isFunction(n) ? n(r) : null : e.chainclude.load(t, i)
            }
        };
        e.chainclude.load(t, i)
    }, e.chainclude.load = function(t, n) {
        if ("object" == typeof t && "undefined" == typeof t.length)
            for (var i in t) return e.include.load(i, n, t[i].callback);
        t = e.makeArray(t), e.include.load(t[0], n, null)
    }, e.include = function(t, n) {
        var i = e.include.luid++,
            o = function(t, o) {
                e.isFunction(t) && t(o), 0 == --e.include.counter[i] && e.isFunction(n) && n()
            };
        if ("object" == typeof t && "undefined" == typeof t.length) {
            e.include.counter[i] = 0;
            for (var r in t) e.include.counter[i]++;
            return e.each(t, function(t, n) {
                e.include.load(t, o, n)
            })
        }
        t = "object" == typeof t ? t : [t], e.include.counter[i] = t.length, e.each(t, function() {
            e.include.load(this, o, null)
        })
    }, e.extend(e.include, {
        luid: 0,
        counter: [],
        load: function(t, n, i) {
            if (e.include.exist(t)) return n(i);
            var o = t.match(/\.([^\.]+)$/);
            if (o) switch (o[1]) {
                case "css":
                    e.include.loadCSS(t, n, i);
                    break;
                case "js":
                    e.include.loadJS(t, n, i);
                    break;
                default:
                    e.get(t, function(e) {
                        n(i, e)
                    })
            }
        },
        loadCSS: function(t, n, i) {
            var o = document.createElement("link");
            o.setAttribute("type", "text/css"), o.setAttribute("rel", "stylesheet"), o.setAttribute("href", t.toString()), e("head").get(0).appendChild(o), e.browser.msie ? e.include.IEonload(o, n, i) : n(i)
        },
        loadJS: function(t, n, i) {
            var o = document.createElement("script"),
                r = /charset=([^&]+)/i.exec(t);
            o.setAttribute("defer", !0), o.setAttribute("charset", r && r[1] ? r[1] : "gbk"), o.src = t;
            var a = function() {
                "function" == typeof i && i(), e(o).remove()
            };
            "onload" in o ? o.onload = function() {
                n(a)
            } : e.include.IEonload(o, n, a), e("head").get(0).appendChild(o)
        },
        IEonload: function(e, t, n) {
            e.onreadystatechange = function() {
                ("loaded" == this.readyState || "complete" == this.readyState) && t(n)
            }
        },
        exist: function(t) {
            var n = !1;
            return e("head script").each(function() {
                return /.css$/.test(t) && this.href == t ? n = !0 : /.js$/.test(t) && this.src == t ? n = !0 : void 0
            }), n
        }
    })
}(jQuery), ! function() {
    nie.site = nie.site || function() {
        var e = window.self.location.hostname,
            t = /^((?:[^\.]+\.)+)163\.com$/i.exec(e),
            n = {
                immortalconquest: 1,
                onmyojigame: 1,
                rulesofsurvivalgame: 1,
                fortcraft: 1,
                kingofhunters: 1,
                roverrage: 1,
                magesupremegame: 1
            },
            i = {
                "en.onmyojigame.com": "en.onmyojigame",
                "www.knives-out.com": "knivesouttw",
                "www.knivesout.jp": "knivesoutjp",
                "www.onmyojiarena.jp": "onmyojiarenajp",
                "www.onmyojiarena.tw": "onmyojiarenatw",
                "www.onmyojiarena.us": "onmyojiarenaus",
                "www.onmyojiarena.com": "onmyojiarena",
                "www.cyberhunter.game": "cyberhunter",
                "www.stormarenagame.com": "stormarenagame",
                "www.sywmsg.com": "sywmsg",
                "www.hellothreekingdoms.com": "hellothreekingdoms",
                "www.cdgame.com": "cdgame",
                "www.playdisorder.com": "playdisorder",
                "www.mumuglobal.com": "mumuglobal",
                "www.eclipse-isle.com": "eclipseisle",
                "www.neteasegames.com": "neteasegames"
            },
            o = {
                "test.nie": 1,
                "yixiu.game": 1
            };
        if (t) return /^\w+\.gm\.163\.com$/i.exec(e) ? null : o[t[1].substring(0, t[1].length - 1)] ? null : t[1].substring(0, t[1].length - 1).toLowerCase();
        if (/^(www\.)?(\u68a6\u5e7b\u897f\u6e38|xn--owt49tjseb46a)\.(com|cn|net|\u4e2d\u56fd|xn--fiqs8s)$/i.test(e)) return "xyq";
        if (/^(www\.)?(\u98de\u98de|xn--q35aa)\.(com|cn|net|\u4e2d\u56fd|xn--fiqs8s)$/i.test(e)) return "ff";
        if (/^(www\.)?(\u5927\u8bdd\u897f\u6e38|xn--pss230cs2tifc)\.(com|cn|net|\u4e2d\u56fd|xn--fiqs8s)$/i.test(e)) return "xy2";
        if (i[e]) return i[e];
        var r = /^((?:[^\.]+\.)+)([^\.]+)\.\w+/i.exec(e);
        if (r && n[r[r.length - 1]]) return r[r.length - 1].toLowerCase();
        var a = /^((?:[^\.]+\.)+)leihuo\.net(\.cn)?$/i.exec(e);
        return a ? a[1].substring(0, a[1].length - 1).toLowerCase() : null
    }()
}(jQuery), ! function(e) {
    nie.useJsURL = "", nie.use = function(t, n) {
        var i = t.sort().toString(),
            o = e.host + "/comm/js/" + (0 != window.self.location.href.indexOf("http") ? "use.php?p=" + i + "&" : "cache/" + e.md5(i)) + ".js";
        nie.useJsURL = o, e.include(o, n)
    }
}(jQuery), ! function(e, t) {
    var n = function(e, n) {
            var i, o, r = this;
            "PENDING" === r._status && setTimeout(function() {
                for (r._status = e, o = "FULFILLED" === r._status, queue = r[o ? "_resolves" : "_rejects"]; i = queue.shift();) n = i.call(r, n) || n;
                r[o ? "_value" : "_reason"] = n, r._resolves = r._rejects = t
            })
        },
        i = function(e) {
            if ("function" != typeof e) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
            if (!(this instanceof i)) return new i(e);
            var t = this;
            t._value, t._reason, t._status = "PENDING", t._resolves = [], t._rejects = [];
            var o = function(e) {
                    n.apply(t, ["FULFILLED"].concat([e]))
                },
                r = function(e) {
                    n.apply(t, ["REJECTED"].concat([e]))
                };
            e(o, r)
        };
    i.prototype.then = function(e, t) {
        var n = this;
        return new i(function(i, o) {
            function r(t) {
                var n = "function" == typeof e && e(t) || t;
                n && "function" == typeof n.then ? n.then(function(e) {
                    i(e)
                }, function(e) {
                    o(e)
                }) : i(n)
            }

            function a(e) {
                e = "function" == typeof t && t(e) || e, o(e)
            }
            "PENDING" === n._status ? (n._resolves.push(r), n._rejects.push(a)) : n._status === FULFILLED ? callback(n._value) : n._status === REJECTED && a(n._reason)
        })
    }, i.prototype["catch"] = function(e) {
        return this.then(t, e)
    }, i.prototype.delay = function(e, t) {
        return this.then(function(n) {
            return i.delay(e, t || n)
        })
    }, i.delay = function(e, t) {
        return new i(function(n) {
            setTimeout(function() {
                n(t), console.log("1")
            }, e)
        })
    }, i.resolve = function(e) {
        return new i(function(t) {
            t(e)
        })
    }, i.reject = function(e) {
        return i(function(t, n) {
            n(e)
        })
    }, i.all = function(e) {
        if (!Array.isArray(e)) throw new TypeError("You must pass an array to all.");
        return i(function(t, n) {
            function i(e) {
                return function(t) {
                    r(e, t)
                }
            }

            function o(e) {
                n(e)
            }

            function r(e, n) {
                u[e] = n, 0 == --c && t(u)
            }
            for (var a = 0, u = [], s = e.length, c = s; s > a; a++) e[a].then(i(a), o)
        })
    }, i.race = function(e) {
        if (!Array.isArray(e)) throw new TypeError("You must pass an array to race.");
        return i(function(t, n) {
            function i(e) {
                t(e)
            }

            function o(e) {
                n(e)
            }
            for (var r = 0, a = e.length; a > r; r++) e[r].then(i, o)
        })
    }, "undefined" == typeof e.Promise && (e.Promise = i)
}(window), ! function($) {
    function unique(e) {
        for (var t, n = [], i = {}, o = 0; null != (t = e[o]); o++) i[t] || (n.push(t), i[t] = !0);
        return n
    }

    function filter(e, t) {
        for (var n = [], i = 0; i < e.length; i++) 1 == t(e[i], i) && n.push(e[i]);
        return n
    }

    function factoryProcess(e) {
        function t(e) {
            _factoryList[e].canProcess = !0, _factoryList[e].did = !0, _factoryList[e].name ? window[_factoryList[e].name] = _defineList[_factoryList[e].name] = _factoryList[e].factory() || _factoryList[e].name : _factoryList[e].factory(), _factoryList[e + 1] && _factoryList[e + 1].canProcess && t(e + 1)
        }
        return 0 >= e ? (t(e), !0) : _factoryList[e - 1].did ? (t(e), !0) : (_factoryList[e].canProcess = !0, !1)
    }

    function packProcess(storeList) {
        for (var keyVal = {}, i = 0; i < storeList.length; i++) {
            var name = _defineList[storeList[i]] || storeList[i],
                lastName = storeList[i].split(".");
            keyVal[lastName[lastName.length - 1]] = eval("(" + name + ")")
        }
        return keyVal
    }
    var _defineList = {},
        _host = $.host + "/comm/js/",
        _nameHash = {
            "ui.tab": " $.tab",
            "ui.Switch": "$.Switch",
            "nie.util.copytext": "nie.util.copyText",
            "nie.util.audio": "audio",
            "util.swfobject": "$.flash",
            "nie.util.pager": "Pager",
            "ui.marquee2": "$.marquee2",
            "nie.util.Lottery": "Lottery",
            "util.bjTime": "$",
            "nie.util.mobiShare": "MobileShare",
            "nie.util.mobiShare2": "MobileShare",
            "nie.util.shareV5": "nie.util.share",
            "nie.util.shareV4": "nie.util.share",
            "nie.util.shareV3": "nie.util.share",
            "nie.util.videoV2": "nie.util.video",
            "ui.lightBox": "$",
            "nie.util.login": "Login",
            "nie.util.login2": "Login",
            "nie.util.fur3": "fur3",
            "nie.util.frame": "Frame",
            "nie.util.Comment": "Comment",
            "nie.util.CommentV2": "Comment",
            "nie.util.barrage": "Barrage",
            "nie.util.niedownload": "NieDownload",
            "nie.util.shake": "Shake",
            "nie.util.gallery": "Gallery",
            "nie.util.galleryV2": "Gallery",
            "nie.util.imageshow": "ImageShow",
            "nie.util.GamePackage": "GamePackage",
            "nie.util.PopDialog": "PopDialog",
            "nie.util.imageUploader": "ImageUploader",
            "nie.util.imageCropper": "ImageCropper",
            "nie.util.FormCheck": "FormCheck",
            "nie.util.nosUploader": "nosUploader",
            "nie.util.nosUploaderV2": "NosUploader",
            "nie.util.gamestart": "GameStart",
            "nie.util.bullet": "BulletUtil",
            "nie.util.indexorder": "IndexOrder",
            "nie.util.wxauth": "WxAuth",
            "nie.util.gameorder": "GameOrder",
            "nie.util.gameorder_m": "GameOrder",
            "nie.util.map3d": "Map3D",
            "nie.util.metro": "ImageTextMetro",
            "nie.util.moretips": "moreTips",
            "nie.util.barrage2": "BarrageFC"
        },
        _verHash = {
            "nie.util.pager": 2,
            "nie.util.copytext": 6,
            "nie.util.videoV2": 14,
            "nie.util.audio": 6,
            "ui.lightBox": 5,
            "nie.util.mobiShare2": 15,
            "nie.util.login": 19,
            "nie.util.login2": 56,
            "nie.util.Lottery": 6,
            "nie.util.fur2": 6,
            "nie.util.fur3": 44,
            "util.bjTime": 4,
            "nie.util.Comment": 25,
            "nie.util.frame": 5,
            "nie.util.shareV5": 6,
            "nie.util.niedownload": 5,
            "nie.util.GamePackage": 5,
            "nie.util.imageUploader": 17,
            "nie.util.imageCropper": 9,
            "nie.util.PopDialog": 2,
            "nie.util.FormCheck": 5,
            "nie.util.imageshow": 6,
            "nie.util.galleryV2": 6,
            "nie.util.bullet": 15,
            "nie.util.indexorder": 9,
            "nie.util.gamestart": 21,
            "nie.util.wxauth": 3,
            "nie.util.nosUploaderV2": 1,
            "nie.util.gameorder_m": 28,
            "nie.util.gameorder": 29,
            "nie.util.map3d": 5,
            "nie.util.metro": 0,
            "nie.util.moretips": 18
        },
        _factoryList = [],
        _factoryIndex = 0;
    nie.define = function(e, t) {
        "string" != typeof e && (t = e, e = null), t.__nieIndex = _factoryIndex, _factoryIndex += 1, _factoryList.push({
            factory: t,
            name: e
        });
        var n = t.toString().match(/nie\.require\([^\)]+\)/g),
            i = "",
            o = 0;
        if (e && (_defineList[e] = !0), !n || !n.length) return factoryProcess(t.__nieIndex);
        for (var r = 0; r < n.length; r++) n[r] = n[r].match(/\(([^\)]+)\)/i)[1].replace(/'|"/g, "");
        if (n = unique(n), n = filter(n, function(e) {
                return _defineList[e] ? !1 : !0
            }), !n || !n.length) return factoryProcess(t.__nieIndex);
        for (n = n.sort(function(e, t) {
                return e > t
            }), r = 0; r < n.length; r++) i += n[r].replace(/\./g, "/") + ".js,", _verHash[n[r]] && (o += _verHash[n[r]]);
        i = _host + "??" + i + "v=" + o + ".js", $.include(i, function() {
            for (var e = 0; e < n.length; e++) {
                var i = n[e];
                _defineList[i] = _nameHash[i] || i
            }
            factoryProcess(t.__nieIndex)
        })
    }, nie.require = function(name) {
        return name = _defineList[name] || name, "string" != (typeof name).toLowerCase() ? name : eval("(" + name + ")")
    }, nie.pack = function(e) {
        var t = "",
            n = 0,
            o = e;
        if (e = "string" == typeof e ? [e] : e, e = unique(e), e = filter(e, function(e) {
                return _defineList[e] ? !1 : !0
            }), !e || !e.length) return packProcess(o);
        for (e = e.sort(function(e, t) {
                return e > t
            }), i = 0; i < e.length; i++) t += e[i].replace(/\./g, "/") + ".js,", _verHash[e[i]] && (n += _verHash[e[i]]);
        return t = _host + "??" + t + "v=" + n + ".js", new Promise(function(n) {
            $.include(t, function() {
                for (var t = 0; t < e.length; t++) {
                    var i = e[t];
                    _defineList[i] = _nameHash[i] || i
                }
                var r = packProcess(o);
                n(r)
            })
        })
    }, nie.require = BJ_REPORT.tryJs().spyCustom(nie.require), nie.define = BJ_REPORT.tryJs().spyCustom(nie.define), nie.pack = BJ_REPORT.tryJs().spyCustom(nie.pack)
}(window.jQuery || window.Zepto), ! function(e) {
    nie.config = nie.config || {
        site: nie.site,
        stats: {
            loaded: !1,
            defaultRun: function() {
                try {
                    return window.top != window.self || window.top.location.hostname != window.self.location.hostname ? !1 : !0
                } catch (e) {
                    return !1
                }
            }(),
            name: "Devilfish",
            clickStats: !1,
            clickStatsPrecent: null,
            id: null,
            url: {
                _data: [],
                add: function(e, t) {
                    var n = "http://clickgame.163.com/" + nie.config.site + "/" + e,
                        i = t || null;
                    nie.config.stats.url._data.push({
                        url: n,
                        title: i
                    }), nie.config.stats.loaded && nie.config.stats.url._run(n, i)
                },
                addto: function(e, t, n) {
                    var i = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "?" + e,
                        o = t || null;
                    n = n || window._ntes_nacc, nie.config.stats.url._data.push({
                        url: i,
                        title: o,
                        site: n
                    }), nie.config.stats.loaded && nie.config.stats.url._run(i, o, n)
                },
                _cb: function() {
                    for (var e = nie.config.stats.url._data, t = 0, n = e.length; n > t; t++) nie.config.stats.url._run(e[t].url, e[t].title, e[t].site)
                },
                _run: function(t, n, i) {
                    e.isFunction(neteaseTracker) && neteaseTracker(!0, t, n, i ? i : "clickgame")
                }
            }
        },
        topBar: {
            hasRun: !1,
            time: 2e3
        },
        copyRight: new function() {
            var e = 1,
                t = !1,
                n = function(n, i) {
                    (i || !t) && (e = n, t = !0)
                };
            this.domain = "", this.showmore = 0, this.product = nie.site, this.getStyle = function() {
                return e
            }, this.setSiteDefaultStyle = function(e) {
                t || ("white" == e ? n(2, !0) : (e = "gray") && n(3, !0))
            }, this.setGray = function() {
                n(3)
            }, this.setWhite = function() {
                n(2)
            }, this.setNormal = function() {
                n(1)
            }
        }
    }
}(jQuery), nie.util = nie.util || {}, nie.util.addStyle = function(e) {
    var t;
    document.all ? (t = document.createStyleSheet(), t.cssText = e) : (t = document.createElement("style"), t.type = "text/css", t.textContent = e);
    try {
        document.getElementsByTagName("head")[0].appendChild(t)
    } catch (n) {}
    t = null
}, nie.util.ajax = function(e) {
    var t = window.location.hostname;
    return "127.0.0.1" != t && "locahost" != t && "test.nie.163.com" != t && 0 != t.indexOf("10.") && 0 != t.indexOf("192.") && t.indexOf("test.nie.163.com") < 0 ? $.ajax(e) : (url = e.url.replace(/#\S*/gi, ""), void $.ajax({
        type: "get",
        url: "//webpub.nie.netease.com/home/tool/proxy",
        dataType: "jsonp",
        data: "url=" + url,
        success: function(t) {
            e.success && e.success(t.data)
        },
        error: function() {
            e.error && e.error("\u8bf7\u6c42\u5931\u8d25")
        }
    }))
}, ! function(e) {
    nie.util.stats = function() {
        var t = {
                nb: "vipnb",
                gs: "gssumr",
                "wy.xy3": "xy3",
                pk: "xyw",
                xdw: "xyw",
                xc: "itown",
                jl: "mc",
                jlcs: "mc",
                pet: "petkingdom",
                sg: "sgtx",
                zg: "zgfy",
                qn: "qnyh",
                qn2: "qnyh",
                "v.cc": "cc",
                yx: "ipush",
                tx3: "tx2",
                "game.campus": "gamecampus",
                y3: "dota",
                lj: "gamex",
                "bang.tx3": "tx2",
                f: "f4",
                gamef: "f4",
                dtws2: "dt2",
                dtws: "dt2",
                zd: "zdcq",
                zmq: "zdcq",
                yxsg: "dota",
                dj: "esports",
                "xyq.baike": "xyq",
                "xy3.baike": "xy3",
                "y3.baike": "dota",
                "xy2.baike": "xy2",
                "xdw.baike": "xyw",
                "my.baike": "my",
                "tx3.baike": "tx2",
                "x3.baike": "x3",
                kyx: "kanyouxi",
                "wst.webapp": "xyq",
                wj: "f4",
                newwar: "xxx",
                "tuku.xyq": "xyq",
                "so.xyq": "xyq",
                story: "xy2",
                "zgmh.baike": "zgmh",
                "daren.nie": "daren",
                "game.academy": "gameacademy",
                wh2: "wh",
                "b2c.nb": "vipnb",
                fire: "xcbw",
                bw: "xcbw",
                xcbw: "xcbwsy",
                qnyh: "qnyhc",
                game: "nie",
                "mall.gs": "gssumr",
                "pm.gs": "gssumr",
                ma: "ma2",
                z: "z1",
                cssg: "blcx",
                gzbnl: "yszj",
                xn: "mxxc",
                xqn: "qnyh",
                ldz: "raven",
                n: "nsh",
                "tuku.tx": "tx",
                mc: "mc163",
                dt: "dtm",
                "wx.game": "wx",
                "new.hi": "hi",
                au: "dance",
                "en.onmyojigame": "onmyojigame",
                rulesofsurvivalgame: "ros"
            },
            n = null,
            i = function(e) {
                return t[e] || e
            };
        if (null == nie.config.stats.id) {
            if (null != nie.config.site)
                if ("undefined" != typeof t[nie.config.site]) n = i(nie.config.site);
                else {
                    var o = nie.config.site.match(/([^.]+)\.webapp/);
                    if (o && o.length > 1 && (n = i(o[1].split("-")[0])), "v" == nie.config.site) {
                        var r = window.location.pathname.split("/");
                        r = "paike" == r[1] ? r[2] : r[1], n = i(r)
                    }
                    o = nie.config.site.match(/([^.]+)\.baike/), o && o.length > 1 && (n = i(o[1].split("-")[0])), o = nie.config.site.match(/tuku\.([^.]+)/), o && o.length > 1 && (n = i(o[1].split("-")[0])), o = nie.config.site.match(/([^.]+)\.tuku/), o && o.length > 1 && (n = i(o[1].split("-")[0])), null == n && nie.config.site.split(".").length < 3 && (n = i(nie.config.site))
                }
        } else n = i(nie.config.stats.id);
        null != n && e.include("//analytics.163.com/ntes.js", function() {
            nie.config.stats.loaded = !0, _ntes_nacc = n, e.isFunction(neteaseTracker) && neteaseTracker(), nie.config.stats.clickStats && (nie.config.stats.clickStatsPrecent ? neteaseClickStat(nie.config.stats.clickStatsPrecent) : neteaseClickStat()), nie.config.stats.url._cb()
        })
    }
}(jQuery);
var LocalData = {
        hname: location.hostname ? location.hostname : "localStatus",
        dataDom: null,
        isLocalStorage: function() {
            try {
                return window.localStorage ? !0 : !1
            } catch (e) {
                return !1
            }
        },
        initDom: function() {
            if (!this.dataDom) try {
                this.dataDom = document.body, this.dataDom.addBehavior("#default#userData");
                var e = new Date;
                e = e.getDate() + 30, this.dataDom.expires = e.toUTCString()
            } catch (t) {
                return !1
            }
            return !0
        },
        set: function(e, t) {
            if (this.isLocalStorage()) try {
                window.localStorage.setItem(e, t)
            } catch (n) {} else if (this.initDom()) try {
                this.dataDom.load(this.hname), this.dataDom.setAttribute(e, t), this.dataDom.save(this.hname)
            } catch (n) {}
        },
        get: function(e) {
            if (this.isLocalStorage()) try {
                return window.localStorage.getItem(e)
            } catch (t) {
                return null
            } else if (this.initDom()) try {
                return this.dataDom.load(this.hname), this.dataDom.getAttribute(e)
            } catch (t) {
                return null
            }
        },
        remove: function(e) {
            this.isLocalStorage ? localStorage.removeItem(e) : this.initDom() && (this.dataDom.load(this.hname), this.dataDom.removeAttribute(e), this.dataDom.save(this.hname))
        }
    },
    __GetScript = function(e) {
        function t(e) {
            if (1 == /iphone|ios|android|ipod/i.test(navigator.userAgent.toLowerCase()) || 0 == /msie/i.test(navigator.userAgent)) return n(e);
            var t = "script" + Math.floor(1e5 * Math.random() + 1e5),
                i = 0,
                o = (new Date, document.createElement("script"));
            o.type = "text/javascript";
            var r = o.onerror = function(t) {
                return i ? (clearTimeout(i), e.error(), document.body.removeChild(o), window.random = null, void("undefined" != typeof BJ_REPORT && BJ_REPORT.report(1 == t ? "[" + nie.site + "][adconfig_error][timeout][data:" + e.data + "]" : "[" + nie.site + "][adconfig_error][interface_error][data:" + e.data + "]"))) : !1
            };
            window[t] = function() {
                if (!i) return !1;
                clearTimeout(i);
                try {
                    e.success.apply(null, arguments)
                } catch (t) {
                    e.error()
                }
                document.body.removeChild(o), window.random = null
            }, i = setTimeout(function() {
                r(!0), i = 0
            }, e.time || 3e3), o.src = e.url + "?" + e.data + "&callback=" + t, document.body.appendChild(o)
        }

        function n(t) {
            new Date, e.ajax({
                url: t.url + "?" + t.data,
                dataType: "json",
                timeout: t.time || 3e3,
                type: "POST",
                success: function(e) {
                    try {
                        t.success(e)
                    } catch (n) {
                        t.error()
                    }
                },
                error: function(n, i, o) {
                    return "yys" != nie.site ? t.error() : (BJ_REPORT.report("[" + nie.site + "][adconfig_ajax_error][data:" + t.data + "][status:" + i + "][error:" + o + "][msg:" + n.responseText + "]"), void(("abort" == i || "timeout" == i) && e.ajax({
                        url: "http://106.2.69.124/fz/interface/frontend/fz.do?" + t.data,
                        dataType: "json",
                        timeout: 1e4,
                        type: "GET",
                        success: function(e) {
                            t.success(e), BJ_REPORT.report("[" + nie.site + "][adconfig_ip_success][repeat_" + nie.site + "][data:" + t.data + "]")
                        },
                        error: function(e, n, i) {
                            t.error(), BJ_REPORT.report("[" + nie.site + "][adconfig_ip_error][repeat_" + nie.site + "][status:" + n + "][error:" + i + "][msg:" + e.responseText + "]")
                        }
                    })))
                }
            })
        }
        return t
    }(window.jQuery || window.Zepto),
    ADBase = function(e) {
        function t(e) {
            e = e || {}, e = e instanceof Array ? e : [e], n(e)
        }

        function n(e) {
            for (var t = [], n = [], o = !!e[0].noCache, r = e[0].time || 15e3, u = (new Date, 0); u < e.length; u++) t.push(e[u].pos), n.push(e[u].callback);
            t = t.join(","), f({
                url: g.getData,
                data: "pos=" + t,
                time: r,
                success: function(e) {
                    if (e.succ && "00" == e.result.code) {
                        var r = e.result.content;
                        i(r, t, n, o), setTimeout(function() {
                            s(t)
                        }, 1e3)
                    } else a(t, n), "undefined" != typeof BJ_REPORT && BJ_REPORT.report("[" + l.site + "][adconfig_error][interface_fail][data:" + m.stringify(e) + "]")
                },
                error: function() {
                    a(t, n)
                }
            })
        }

        function i(e, t, n, i) {
            c(".adbase-ctn").css("background", "none");
            var a = i ? {} : o(t);
            a = r(a, e), i || d.set(t, m.stringify(a));
            for (var s = 0; s < n.length; s++) n[s](!0, a);
            u()
        }

        function o(e) {
            var t = d.get(e);
            return t ? m.parse(t) : {}
        }

        function r(e, t) {
            for (var n in t) !e[n] || e[n].length < 1 ? e[n] = t[n] : e[n] && e[n].length && t[n] && t[n].length ? e[n] = t[n] : e[n] && e[n].length && (!t[n] || t[n].length < 1) ? e[n] = [] : (!t[n] || t[n].length < 1) && (!e[n] || e[n].length < 1) && (e[n] = []);
            return e
        }

        function a(e, t) {
            var n = d.get(e);
            if (n) {
                n = m.parse(n), c(".adbase-ctn").css("background", "none");
                for (var i = 0; i < t.length; i++) t[i](!0, n);
                u()
            } else {
                c(".adbase-ctn").css("background", "url(" + c.host + "/comm/js/nie/util/img/error.png) center center no-repeat");
                for (var i = 0; i < t.length; i++) t[i](!1, {})
            }
        }

        function u() {
            c(".adbase-ctn").each(function(e, t) {
                c(t).contents().length < 1 && c(t).css("background", "url(" + c.host + "/comm/js/nie/util/img/error.png) center center no-repeat")
            })
        }

        function s(e) {
            var t = new Image;
            t.src = [g.report, "?pos=", e].join("")
        }
        var c = e.jQuery || e.Zepto,
            l = e.nie,
            f = e.__GetScript,
            m = e.JSON,
            d = e.LocalData,
            h = (e.ADData, "//a.game.163.com"),
            g = {
                getData: h + "/fz/interface/frontend/fz.do",
                report: h + "/fz/interface/frontend/viewstatics.do"
            },
            p = {
                config: t,
                flag: !0
            };
        return p
    }(window, document);
! function(e) {
    nie.util.copyRight = nie.util.copyRight || function() {
        function t() {
            var t = "",
                r = e(window).width(),
                u = function(e) {
                    "m" == t ? i.html(e) : n.html(e)
                };
            0 == n.length && i.length > 0 && (t = "m"), e.ajax({
                url: "https://websource.nie.netease.com/copyright/get/byreferer",
                dataType: "jsonp",
                data: {
                    type: t,
                    browserversion: a,
                    domain: nie.config.copyRight.domain || "",
                    showmore: nie.config.copyRight.showmore || 0
                },
                success: function(n) {
                    if (n.success) e(function() {
                        2 == nie.config.copyRight.getStyle() && (n.result.copyright = n.result.copyright.replace(/(\/images\/([^\.\/]*)\.)\d{1}(\.png)/gi, "$12$3")), u(n.result.copyright)
                    }), n.result.browsertips && 0 == o.length && r > 1e3 && !s && e("body").prepend(n.result.browsertips);
                    else {
                        var i = n.msg || n.errmsg;
                        u(t, "\u7248\u6743\u52a0\u8f7d\u5931\u8d25\uff1a" + i)
                    }
                },
                error: function(e) {
                    u(t, "\u7248\u6743\u52a0\u8f7d\u5931\u8d25\uff1a" + JSON.stringify(e))
                }
            })
        }
        var n = e("#NIE-copyRight"),
            i = e(".NIE-copyRight_m"),
            o = e("#NIE-warning-tips"),
            r = navigator.userAgent,
            a = +(r.match(/MSIE (\d+)/) && RegExp.$1),
            u = /cbg.163.com|gift.163.com/,
            s = u.test(window.location.host);
        (n.length > 0 || i.length > 0 || 0 != a) && t()
    }
}(jQuery), ! function(e) {
    nie.util.union = nie.util.union || {
        unionFabUrlList: ["http://dh2.163.com/biz/wm/", "http://x3.163.com/biz/wm/", "http://x3.163.com/biz/wm01/", "http://x3.163.com/biz/wm2/", "http://y3.163.com/biz/wm/", "http://y3.163.com/biz/wm3/", "http://wh.163.com/wm/", "http://wh.163.com/biz/wm1/", "http://wh.163.com/wm1/", "http://wh.163.com/biz/wm3/", "http://wh2.163.com/biz/wm/", "http://zh.163.com/fab/wm1/", "http://xy2.163.com/biz/wm1/", "http://xy2.163.com/", "http://xy2.163.com/biz/wm2/", "http://x3.163.com/biz/wm2/", "http://dtws2.163.com/biz/wm01/", "http://dtws2.163.com/biz/wm02/", "http://dtws2.163.com/biz/wm1/", "http://dtws.163.com/biz/wm/", "http://dtws2.163.com/biz/wm/", "http://qn2.163.com/biz/wm1/?id=01/", "http://qn2.163.com/biz/wm2/", "http://qn2.163.com/biz/wm/", "http://qn2.163.com/biz/wm3/", "http://qn2.163.com/biz/wm1/", "http://qn2.163.com/biz/wm01/", "http://tx3.163.com/biz/wm2/", "http://tx3.163.com/biz/wm3/", "http://tx3.163.com/biz/wm/", "http://tx3.163.com/biz/wm1/", "http://xyq.163.com/fab3/", "http://xyq.163.com/biz/wm/", "http://xyq.163.com/wmc/", "http://xyq.163.com/biz/wm1407/", "http://xdw.163.com/biz/wm2/", "http://xdw.163.com/biz/wm1/", "http://dh2.163.com/biz/wm1/"],
        unionApi: "http://union.gad.netease.com/union2/monitor/point_code",
        url: {},
        qUrsUnion: {},
        init: function() {
            this.url.raw = window.location.href, this.url.isUnion = !1
        },
        processUrl: function() {
            function t(e, t) {
                var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
                    i = t.match(n);
                return null !== i ? unescape(i[2]) : null
            }

            function n(n) {
                var i = n.indexOf("?"),
                    o = {};
                if (i > 0) {
                    o.req = n.substring(0, i);
                    var r = n.substring(i + 1),
                        a = ["login", "username", "product"];
                    e.each(a, function(e, n) {
                        var i = t(n, r);
                        i && (o[n] = i)
                    })
                } else o.req = n;
                return "/" != o.req.charAt(o.req.length - 1) && (o.req += "/"), o
            }
            if (e.inArray(this.url.raw, this.unionFabUrlList) >= 0) this.url.isUnion = !0, this.url.req = this.url.raw;
            else {
                var i = n(this.url.raw);
                this.url.req = i.req, i.hasOwnProperty("login") && (this.url.isUnion = !0, this.url.urs = i.login), i.hasOwnProperty("username") && (this.url.isUnion = !0, this.url.urs = i.username), i.hasOwnProperty("product") && (this.url.isUnion = !0, this.url.product = i.product)
            }
        },
        setupUnion: function(t) {
            function n(t) {
                e.getScript(t)
            }

            function i(e, t) {
                (new Image).src = e + "&urs=" + t
            }
            t.hasOwnProperty("0") && n(t[0]), t.hasOwnProperty("1") && (this.qUrsUnion.url = t[1]), t.hasOwnProperty("2") && i(t[2], this.url.urs), t.hasOwnProperty("3") && i(t[3], this.url.urs)
        },
        getUnionCode: function() {
            var t = this;
            e.ajax({
                type: "get",
                url: t.unionApi,
                data: {
                    url: t.url.req,
                    product: t.url.product
                },
                dataType: "jsonp",
                success: function(e) {
                    t.setupUnion(e)
                }
            })
        },
        run: function() {}
    }
}(jQuery);; /*!src/app.mobi.js*/
BJ_REPORT.tryJs().spyAll(), $(function() {
    window.onerror = function() {}, nie.config.stats.defaultRun && setTimeout(function() {
        nie.util.stats()
    }, 0), setTimeout(function() {
        nie.util.copyRight();
        var t = (document.documentElement || document.body).innerHTML;
        t.match(/\[an\serror\soccurred\swhile\sprocessing\sthis\sdirective\]/i) && BJ_REPORT.report("include_error")
    }, 0)
});