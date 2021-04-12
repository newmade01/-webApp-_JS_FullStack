(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-57d2dbe2"], {
        "8e36": function(t, n, o) {},
        dcd9: function(t, n, o) {
            "use strict";
            o("8e36")
        },
        e605: function(t, n, o) {
            "use strict";
            o.r(n);
            var i = function() {
                    var t = this,
                        n = t.$createElement,
                        o = t._self._c || n;
                    return o("div", { attrs: { id: "app" } }, [o("div", { staticClass: "container" }, [o("div", { staticClass: "row" }, [o("div", { staticClass: "col-12 mt-2" }, [o("VueSignaturePad", { ref: "signaturePad", attrs: { id: "signature", width: "100%", height: "500px", options: t.options } })], 1)]), o("div", { staticClass: "row" }, [o("div", { staticClass: "col-3 mt-2" }), o("div", { staticClass: "col-3 mt-2" }, [o("button", { staticClass: "btn btn-outline-primary", staticStyle: { "background-color": "orange", position: "relative", height: "70px", width: "150px", padding: "15px 30px", margin: "10px", border: "none", "text-align": "center", "text-decoration": "none", "font-size": "22px", cursor: "pointer", overflow: "hidden", "-webkit-transition-duration": "0.4s", "transition-duration": "0.4s" }, on: { click: t.save } }, [t._v("\n          \n             \n                  Save\n            \n          ")])]), o("div", { staticClass: "col-3 mt-2" }), o("div", { staticClass: "col-3 mt-2" })])])])
                },
                a = [],
                e = (o("75ab"), o("bc3a")),
                s = o.n(e);

            function r(t) { return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" === typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, r(t) }
            var c = {
                    name: "App",
                    data: function() { return { options: { penColor: "#c0f" }, data: "", isEmpty: "" } },
                    methods: {
                        undo: function() { this.$refs.signaturePad.undoSignature() },
                        save: function() {
                            var t = this.$refs.signaturePad.saveSignature(),
                                n = t.isEmpty,
                                o = t.data;
                            console.log(n), console.log(r(o)), console.log(o);
                            var i = new URLSearchParams;
                            i.append("data", o), i.append("isEmpty", n), s.a.post("http://192.1.1.30:3000/ind/canvas", i).then((function(t, n) { alert("서명 보내기 성공"), console.log(n) })).catch((function(t) { alert("실패") }))
                        },
                        change: function() { this.options = { penColor: "#00f" } },
                        resume: function() { this.options = { penColor: "#c0f" } }
                    }
                },
                l = c,
                u = (o("dcd9"), o("2877")),
                d = Object(u["a"])(l, i, a, !1, null, null, null);
            n["default"] = d.exports
        }
    }
]);
//# sourceMappingURL=chunk-57d2dbe2.f9b3a7c9.js.map