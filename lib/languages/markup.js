"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.svg = exports.html = exports.xml = exports.markup = undefined;

var _hooks = require("../hooks");

var _hooks2 = _interopRequireDefault(_hooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var markup = [["comment", /<!--[\w\W]*?-->/], ["prolog", /<\?[\w\W]+?\?>/], ["doctype", /<!DOCTYPE[\w\W]+?>/], ["cdata", /<!\[CDATA\[[\w\W]*?]]>/i], ["tag", {
    pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: [["tag", {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: [["punctuation", /^<\/?/], ["namespace", /^[^\s>\/:]+:/]]
    }], ["attr-value", {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
        inside: [["punctuation", /[=>"']/]]
    }], ["punctuation", /\/?>/], ["attr-name", {
        pattern: /[^\s>\/]+/,
        inside: [["namespace", /^[^\s>\/:]+:/]]
    }]]
}], ["entity", /&#?[\da-z]{1,8};/i]];

// Plugin to make entity title show the real entity, idea by Roman Komarov
_hooks2.default.add("wrap", function (env) {

    if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
    }
});

exports.markup = markup;
exports.xml = markup;
exports.html = markup;
exports.svg = markup;