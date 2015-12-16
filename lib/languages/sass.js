"use strict";

var _utils = require("../utils");

var _css = require("./css");

var sass = _utils.lang.extend(_css.css, {
    // Sass comments don't need to be closed, only indented
    comment: {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
        lookbehind: true
    },
    _order: ["comment"]
});

_utils.lang.insertBefore(sass, "atrule", {
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

var variable = /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i;

var operator = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
    pattern: /(\s+)-(?=\s)/,
    lookbehind: true
}];

_utils.lang.insertBefore(sass, "property", {
    // We want to consume the whole line
    "variable-line": {
        pattern: /^[ \t]*\$.+/m,
        inside: {
            punctuation: /:/,
            variable: variable,
            operator: operator,
            _order: ["punctuation", "variable", "operator"]
        }
    },
    // We want to consume the whole line
    "property-line": {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
        inside: {
            property: [/[^:\s]+(?=\s*:)/, {
                pattern: /(:)[^:\s]+/,
                lookbehind: true
            }],
            punctuation: /:/,
            variable: variable,
            operator: operator,
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

_utils.lang.insertBefore(sass, "punctuation", {
    selector: {
        pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
        lookbehind: true
    },
    _order: ["selector"]
});