"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.babel = exports.jsx = undefined;

var _utils = require("../utils");

var _javascript = require("./javascript");

var _markup = require("./markup");

var jsx = _utils.lang.extend(_markup.markup, _javascript.javascript);

jsx.tag.pattern = /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;
jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

_utils.lang.insertBefore(jsx.tag.inside, "attr-value", {
    "script": {
        // Allow for one level of nesting
        pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
        inside: {
            "function": _javascript.javascript.function,
            punctuation: /[={}[\];(),.:]/,
            keyword: _javascript.javascript.keyword,
            "boolean": _javascript.javascript.boolean,
            _order: ["function", "punctuation", "keyword", "boolean"]
        },
        "alias": "language-javascript"
    },
    _order: ["script"]
});

exports.jsx = jsx;
exports.babel = jsx;