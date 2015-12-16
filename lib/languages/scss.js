"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scss = undefined;

var _utils = require("../utils");

var _css = require("./css");

var scss = _utils.lang.extend(_css.css, {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
        lookbehind: true
    },
    atrule: {
        pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
        inside: {
            rule: /@[\w-]+/,
            _order: ["rule"]
        }
    },
    // url, compassified
    url: /(?:[-a-z]+-)*url(?=\()/i,
    // CSS selector regex is not appropriate for Sass
    // since there can be lot more things (var, @ directive, nesting..)
    // a selector must start at the end of a property or after a brace (end of other rules or nesting)
    // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
    // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
    // can "pass" as a selector- e.g: proper#{$erty})
    // this one was hard to do, so please be careful if you edit this one :)
    selector: {
        // Initial look-ahead is used to prevent matching of blank selectors
        pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
        inside: {
            placeholder: /%[-_\w]+/,
            _order: ["placeholder"]
        }
    },
    _order: ["comment", "atrule", "url", "selector"]
});

_utils.lang.insertBefore(scss, "atrule", {
    keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
        pattern: /( +)(?:from|through)(?= )/,
        lookbehind: true
    }],
    _order: ["keyword"]
});

_utils.lang.insertBefore(scss, "property", {
    // var and interpolated vars
    variable: /\$[-_\w]+|#\{\$[-_\w]+\}/,
    _order: ["variable"]
});

_utils.lang.insertBefore(scss, "function", {
    placeholder: {
        pattern: /%[-_\w]+/,
        alias: "selector"
    },
    statement: /\B!(?:default|optional)\b/i,
    "boolean": /\b(?:true|false)\b/,
    "null": /\bnull\b/,
    operator: {
        pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
        lookbehind: true
    },
    _order: ["placeholder", "statement", "boolean", "null", "operator"]
});

_utils.lang.insertAfter(scss.atrule.inside, "rule", _utils.lang.clone(scss));

exports.scss = scss;