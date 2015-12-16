"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.less = undefined;

var _utils = require("../utils");

var _css = require("./css");

/* FIXME :
 :extend() is not handled specifically : its highlighting is buggy.
 Mixin usage must be inside a ruleset to be highlighted.
 At-rules (e.g. import) containing interpolations are buggy.
 Detached rulesets are highlighted as at-rules.
 A comment before a mixin usage prevents the latter to be properly highlighted.
 */

var less = _utils.lang.extend(_css.css, {
    comment: [/\/\*[\w\W]*?\*\//, {
        pattern: /(^|[^\\])\/\/.*/,
        lookbehind: true
    }],
    atrule: {
        pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
        inside: {
            punctuation: /[:()]/,
            _order: ["punctuation"]
        }
    },
    // selectors and mixins are considered the same
    selector: {
        pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
        inside: {
            // mixin parameters
            variable: /@+[\w-]+/,
            _order: ["variable"]
        }
    },

    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    punctuation: /[{}();:,]/,
    operator: /[+\-*\/]/,
    _order: ["comment", "atrule", "selector", "property", "punctuation", "operator"]
});

// // Invert function and punctuation positions
// lang.insertBefore(less, "punctuation", {
//     "function": less.function,
//     _order: ["function"]
// });

_utils.lang.insertBefore(less, "property", {
    variable: [
    // Variable declaration (the colon must be consumed!)
    {
        pattern: /@[\w-]+\s*:/,
        inside: {
            punctuation: /:/,
            _order: ["punctuation"]
        }
    },

    // Variable usage
    /@@?[\w-]+/],
    "mixin-usage": {
        pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
        lookbehind: true,
        alias: "function"
    },
    _order: ["variable", "mixin-usage"]
});

exports.less = less;