"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (add) {
    add("after-highlight", function (env) {
        var str = "<span class=\"show-language\">" + env.language + "</span>";

        env.highlightedCode = str + env.highlightedCode;
    });
};