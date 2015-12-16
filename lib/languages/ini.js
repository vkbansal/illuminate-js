"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ini = {
    comment: /^[ \t]*;.*$/m,
    important: /\[.*?\]/,
    constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
    "attr-value": {
        pattern: /=.*/,
        inside: {
            punctuation: /^[=]/,
            _order: ["punctuation"]
        }
    },
    _order: ["comment", "important", "constant", "attr-value"]
};

exports.ini = ini;