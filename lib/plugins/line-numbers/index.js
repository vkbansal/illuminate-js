"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (add) {
    add("after-highlight", function (env) {
        var match = env.code.match(/\n(?!$)/g),
            linesNum = match ? match.length + 1 : 1,
            lines = "";

        for (var i = 0; i < linesNum; i++) {
            lines += "<span></span>";
        }

        env.highlightedCode += "<span class=\"line-number-rows\">" + lines + "</span>";
    });
};