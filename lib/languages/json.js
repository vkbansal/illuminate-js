"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var json = {
    property: /"(\b|\B)[\w-]+"(?=\s*:)/ig,
    string: /"(?!:)(\\?[^'"])*?"(?!:)/g,
    number: /-?\d*\.?\d+([Ee]-?\d+)?/g,
    punctuation: /[{}[\]);,]/g,
    operator: /:/g,
    "boolean": /\b(true|false)\b/gi,
    "null": /\bnull\b/gi,
    _order: ["property", "string", "number", "punctuation", "operator", "boolean", "null"]
};

exports.json = json;