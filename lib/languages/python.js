"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var python = {
    "triple-quoted-string": {
        pattern: /"""[\s\S]+?"""|'''[\s\S]+?'''/,
        alias: 'string'
    },
    comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: true
    },
    string: /("|')(?:\\?.)*?\1/,
    "function": {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
        lookbehind: true
    },
    "class-name": {
        pattern: /(\bclass\s+)[a-z0-9_]+/i,
        lookbehind: true
    },
    keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
    "boolean": /\b(?:True|False)\b/,
    number: /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
    punctuation: /[{}[\];(),.:]/,
    _order: ["triple-quoted-string", "comment", "string", "function", "class-name", "keyword", "boolean", "number", "operator", "punctuation"]
};

exports.python = python;