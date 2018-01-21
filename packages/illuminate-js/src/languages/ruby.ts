import { clike } from './clike';
import { Definition, Tokens } from '../illuminate';
import { clone, insertBefore } from '../utils';

let ruby: Definition = clone(clike);
ruby.set('comment', [/#(?!\{[^\r\n]*?\}).*/, /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m]);
ruby.set(
    'keyword',
    /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
);

const rest: Definition = clone(ruby);

const stringInterpolation: Definition = new Map([
    [
        'interpolation',
        {
            pattern: /#\{[^}]+\}/,
            inside: new Map<string, Tokens | Map<string, Tokens>>([
                [
                    'delimiter',
                    {
                        pattern: /^#\{|\}$/,
                        alias: 'tag'
                    }
                ],
                ['rest', rest as Map<string, Tokens>]
            ])
        }
    ]
]);

insertBefore(
    ruby,
    'keyword',
    new Map<string, Tokens>([
        [
            'regex',
            [
                {
                    pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
                    inside: stringInterpolation,
                    greedy: true
                },
                {
                    pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
                    inside: stringInterpolation,
                    greedy: true
                },
                {
                    // Here we need to specifically allow interpolation
                    pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
                    inside: stringInterpolation,
                    greedy: true
                },
                {
                    pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
                    inside: stringInterpolation,
                    greedy: true
                },
                {
                    pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
                    inside: stringInterpolation,
                    greedy: true
                },
                {
                    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
                    lookbehind: true,
                    greedy: true
                }
            ]
        ],
        ['variable', /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/],
        ['symbol', /:[a-zA-Z_]\w*(?:[?!]|\b)/]
    ])
);

insertBefore(
    ruby,
    'number',
    new Map([
        [
            'builtin',
            /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/
        ],
        ['constant', /\b[A-Z]\w*(?:[?!]|\b)/]
    ])
);

ruby.set('string', [
    {
        pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: true,
        inside: stringInterpolation
    },
    {
        pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
        greedy: true,
        inside: stringInterpolation
    },
    {
        // Here we need to specifically allow interpolation
        pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
        greedy: true,
        inside: stringInterpolation
    },
    {
        pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
        greedy: true,
        inside: stringInterpolation
    },
    {
        pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
        greedy: true,
        inside: stringInterpolation
    },
    {
        pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true,
        inside: stringInterpolation
    }
]);

export { ruby };
