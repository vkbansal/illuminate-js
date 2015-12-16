"use strict";

let json = {
    property: /"(\b|\B)[\w-]+"(?=\s*:)/ig,
    string: /"(?!:)(\\?[^'"])*?"(?!:)/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    "function": {
        pattern: /[a-z0-9_]+\(/ig,
        inside: {
            punctuation: /\(/,
            _order: ["punctuation"]
        }
    },
    punctuation: /[{}[\]);,]/g,
    operator: /:/g,
    "boolean": /\b(true|false)\b/gi,
    "null": /\bnull\b/gi,
    _order: [
        "property",
        "string",
        "number",
        "function",
        "punctuation",
        "operator",
        "boolean",
        "null"
    ]
};

export { json as json };
