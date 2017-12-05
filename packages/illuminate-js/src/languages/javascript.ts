import { insertBefore, clone } from '../utils';
import { clike } from './clike';
import { TokenTypes, Tokenz, TokenObject } from '../illuminate';

let javascript = clone(clike);
javascript.set(
    'keyword',
    /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/
);
javascript.set(
    'number',
    /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/
);
// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
javascript.set('function', /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i);
javascript.set(
    'operator',
    /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
);

insertBefore(
    javascript,
    'keyword',
    new Map([
        [
            'regex',
            {
                pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
                lookbehind: true,
                greedy: true
            }
        ],
        [
            'function-variable',
            {
                pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
                alias: 'function'
            } as TokenObject
        ]
    ])
);

const extendDef = clone(javascript);

insertBefore(
    javascript,
    'class-name',
    new Map([
        [
            'template-string',
            {
                pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                greedy: true,
                inside: new Map<string, TokenTypes>([
                    [
                        'interpolation',
                        {
                            pattern: /\$\{[^}]+\}/,
                            inside: new Map<string, TokenTypes>([
                                [
                                    'interpolation-punctuation',
                                    {
                                        pattern: /^\$\{|\}$/,
                                        alias: 'punctuation'
                                    }
                                ],
                                ['rest', extendDef as Map<string, Tokenz>]
                            ])
                        }
                    ],
                    ['string', /[\s\S]+/]
                ])
            }
        ]
    ])
);

export { javascript };
