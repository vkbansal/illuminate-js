"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: true
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true
    }],
    string: /("|')(\\\n|\\?.)*?\1/,
    "class-name": {
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: true,
        inside: {
            punctuation: /(\.|\\)/,
            _order: ["punctuation"]
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(true|false)\b/,
    "function": {
        pattern: /[a-z0-9_]+\(/i,
        inside: {
            punctuation: /\(/,
            _order: ["punctuation"]
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
    operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,
    ignore: /&(lt|gt|amp);/i,
    punctuation: /[{}[\];(),.:]/,
    _order: ["comment", "string", "class-name", "keyword", "boolean", "function", "number", "operator", "ignore", "punctuation"]
};

exports.clike = clike;