"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.css = undefined;

var _utils = require("../utils");

var _markup = require("./markup");

var css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
        inside: {
            rule: /@[\w-]+/,
            _order: ["rule"]
        }
    },
    url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: {
        pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
        inside: {
            "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
            "pseudo-class": /:[-\w]+(?:\(.*\))?/,
            "class": /\.[-:\.\w]+/,
            id: /#[-:\.\w]+/
        }
    },
    string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    hexcode: /#[\da-f]{3,6}/i,
    entity: /\\[\da-f]{1,8}/i,
    number: /[\d%\.]+/,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/,
    _order: ["comment", "atrule", "url", "selector", "string", "property", "important", "hexcode", "entity", "number", "function", "punctuation"]
};
// import hooks from "../hooks";

_utils.lang.insertAfter(css.atrule.inside, "rule", _utils.lang.clone(css));

_utils.lang.insertBefore(_markup.markup, "tag", {
    "style": {
        pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
        lookbehind: true,
        inside: _utils.lang.clone(css),
        alias: "language-css"
    },
    _order: ["style"]
});

_utils.lang.insertBefore(_markup.markup.tag.inside, "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|").*?\1/i,
        inside: {
            "attr-name": {
                pattern: /^\s*style/i,
                inside: _utils.lang.clone(_markup.markup.tag.inside)
            },
            "punctuation": /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/i,
                inside: _utils.lang.clone(css)
            },
            _order: ["attr-name", "punctuation", "attr-value"]
        },
        alias: "language-css"
    },
    _order: ["style-attr"]
});

exports.css = css;