"use strict";

import { lang } from "../utils";
import { css } from "./css";

let sass = lang.extend(css, {
    // Sass comments don't need to be closed, only indented
    comment: {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
        lookbehind: true
    },
    _order: ["comment"]
});

lang.insertBefore(sass, "atrule", {
    // We want to consume the whole line
    "atrule-line": {
        // Includes support for = and + shortcuts
        pattern: /^(?:[ \t]*)[@+=].+/m,
        inside: {
            atrule: /(?:@[\w-]+|[+=])/m,
            _order: ["atrule"]
        }
    },
    _order: ["atrule-line"]
});

delete sass.atrule;

let variable = /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i;

let operator = [
    /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
    {
        pattern: /(\s+)-(?=\s)/,
        lookbehind: true
    }
];

lang.insertBefore(sass, "property", {
    // We want to consume the whole line
    "variable-line": {
        pattern: /^[ \t]*\$.+/m,
        inside: {
            punctuation: /:/,
            variable,
            operator,
            _order: ["punctuation", "variable", "operator"]
        }
    },
    // We want to consume the whole line
    "property-line": {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
        inside: {
            property: [
                /[^:\s]+(?=\s*:)/,
                {
                    pattern: /(:)[^:\s]+/,
                    lookbehind: true
                }
            ],
            punctuation: /:/,
            variable,
            operator,
            important: sass.important,
            _order: ["property", "punctuation", "variable", "operator", "important"]
        }
    },
    _order: ["variable-line", "property-line"]
});

delete sass.property;
delete sass.important;

// Now that whole lines for other patterns are consumed,
// what's left should be selectors
delete sass.selector;

lang.insertBefore(sass, "punctuation", {
    selector: {
        pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
        lookbehind: true
    },
    _order: ["selector"]
});
