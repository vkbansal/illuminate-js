"use strict";

import { lang } from "../utils";
import { clike } from "./clike";

let ruby = lang.extend(clike, {
    comment: /#(?!\{[^\r\n]*?\}).*/,
    keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
});

let stringInterpolation = {
    interpolation: {
        pattern: /#\{[^}]+\}/,
        inside: {
            delimiter: {
                pattern: /^#\{|\}$/,
                alias: 'tag'
            },
            _order: ["delimiter"]
        }
    },
    _order: ["interpolation"]
};

lang.insertAfter(
    stringInterpolation.interpolation.inside,
    "delimiter",
    lang.clone(ruby)
);

lang.insertBefore(ruby, 'keyword', {
    regex: [
        {
            pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
            inside: stringInterpolation
        },
        {
            pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
            inside: stringInterpolation
        },
        {
            // Here we need to specifically allow interpolation
            pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
            inside: stringInterpolation
        },
        {
            pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
            inside: stringInterpolation
        },
        {
            pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
            inside: stringInterpolation
        },
        {
            pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
            lookbehind: true
        }
    ],
    variable: /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
    symbol: /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
    _order: ["regex", "variable", "symbol"]
});

lang.insertBefore(ruby, 'number', {
    builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    constant: /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/,
    _order: ["builtin", "constant"]
});

ruby.string = [
    {
        pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
        inside: stringInterpolation
    },
    {
        pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
        inside: stringInterpolation
    },
    {
        // Here we need to specifically allow interpolation
        pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
        inside: stringInterpolation
    },
    {
        pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
        inside: stringInterpolation
    },
    {
        pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
        inside: stringInterpolation
    },
    {
        pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
        inside: stringInterpolation
    }
];

export { ruby as ruby };
