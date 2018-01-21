import { Definition, Tokens } from '../illuminate';

export const clike: Definition = new Map<string, Tokens>([
    [
        'comment',
        [
            {
                pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                lookbehind: true
            },
            {
                pattern: /(^|[^\\:])\/\/.*/,
                lookbehind: true
            }
        ]
    ],
    [
        'string',
        {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: true
        }
    ],
    [
        'class-name',
        {
            pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
            lookbehind: true,
            inside: new Map([['punctuation', /[.\\]/]])
        }
    ],
    [
        'keyword',
        /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/
    ],
    ['boolean', /\b(?:true|false)\b/],
    ['function', /[a-z0-9_]+(?=\()/i],
    ['number', /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i],
    ['operator', /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/],
    ['punctuation', /[{}[\];(),.:]/]
]);
