"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.javascript = exports.js = undefined;

var _clike = require("./clike");

var _utils = require("../utils");

var _markup = require("./markup");

var js = _utils.lang.extend(_clike.clike, {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
});

_utils.lang.insertBefore(js, "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: true
    },
    _order: ["regex"]
});

_utils.lang.insertBefore(js, "class-name", {
    "template-string": {
        pattern: /`(?:\\`|\\?[^`])*`/,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: "js"
                }
            },
            string: /[\s\S]+/,
            _order: ["interpolation", "string"]
        }
    },
    _order: ["template-string"]
});

_utils.lang.insertBefore(_markup.markup, "tag", {
    "script": {
        pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: true,
        inside: _utils.lang.clone(js),
        alias: "language-javascript"
    },
    _order: ["script"]
});

exports.js = js;
exports.javascript = js;