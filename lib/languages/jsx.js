"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsx = undefined;

var _utils = require("../utils");

var _javascript = require("./javascript");

var _markup = require("./markup");

var jsx = _utils.lang.extend(_markup.markup, _javascript.javascript);

jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;
jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

var jsxExpression = _utils.lang.clone(jsx);

delete jsxExpression.punctuation;

_utils.lang.insertBefore(jsxExpression, "operator", {
    punctuation: /=(?={)|[{}[\];(),.:]/,
    _order: ["punctuation"]
});

_utils.lang.insertBefore(jsx.tag.inside, "attr-value", {
    "script": {
        // Allow for one level of nesting
        pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
        inside: jsxExpression,
        "alias": "language-javascript"
    },
    _order: ["script"]
});

exports.jsx = jsx;