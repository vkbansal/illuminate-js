"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.babel = exports.jsx = undefined;

var _utils = require("../utils");

var _javascript = require("./javascript");

var _markup = require("./markup");

var jsx = _utils.lang.extend(_markup.markup, _javascript.javascript);

var tagIndex = _utils.lang.findIndex(jsx, "tag");

jsx[tagIndex][2].pattern = /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;

var attrIndex = _utils.lang.find(jsx[tagIndex][2].inside, "attr-value");

jsx[tagIndex][2].inside[attrIndex][2].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

var funcIndex = _utils.lang.findIndex(_javascript.javascript, "function"),
    keywordIndex = _utils.lang.findIndex(_javascript.javascript, "keyword"),
    boolIndex = _utils.lang.findIndex(_javascript.javascript, "boolean");

_utils.lang.insertBefore(jsx[tagIndex][2].inside, "attr-value", ['script', {
    // Allow for one level of nesting
    pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
    inside: [['function', _javascript.javascript[funcIndex].slice(0)], ['punctuation', /[={}[\];(),.:]/], ['keyword', _javascript.javascript[keywordIndex].slice(0)], ['boolean', _javascript.javascript[boolIndex].slice(0)]],
    'alias': 'language-javascript'
}]);

exports.jsx = jsx;
exports.babel = jsx;