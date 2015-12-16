"use strict";

import { lang } from "../utils";
import { css } from "./css";

/* FIXME :
 :extend() is not handled specifically : its highlighting is buggy.
 Mixin usage must be inside a ruleset to be highlighted.
 At-rules (e.g. import) containing interpolations are buggy.
 Detached rulesets are highlighted as at-rules.
 A comment before a mixin usage prevents the latter to be properly highlighted.
 */

let less = lang.extend(css, {
    comment: [
        /\/\*[\w\W]*?\*\//,
        {
            pattern: /(^|[^\\])\/\/.*/,
            lookbehind: true
        }
    ],
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

lang.insertBefore(less, "property", {
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
        /@@?[\w-]+/
    ],
    "mixin-usage": {
        pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
        lookbehind: true,
        alias: "function"
    },
    _order: ["variable", "mixin-usage"]
});

export { less as less };
