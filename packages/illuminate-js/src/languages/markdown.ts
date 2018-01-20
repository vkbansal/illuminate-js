import { insertBefore, clone, setIn } from '../utils';
import { markup } from './markup';
import { Tokens, TokenObject } from '../illuminate';

let markdown = clone(markup);

insertBefore(
    markdown,
    'prolog',
    new Map<string, Tokens>([
        [
            'blockquote',
            {
                // > ...
                pattern: /^>(?:[\t ]*>)*/m,
                alias: 'punctuation'
            }
        ],
        [
            'code',
            [
                {
                    // Prefixed by 4 spaces or 1 tab
                    pattern: /^(?: {4}|\t).+/m,
                    alias: 'keyword'
                },
                {
                    // `code`
                    // ``code``
                    pattern: /``.+?``|`[^`\n]+`/,
                    alias: 'keyword'
                }
            ]
        ],
        [
            'title',
            [
                {
                    // title 1
                    // =======

                    // title 2
                    // -------
                    pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
                    alias: 'important',
                    inside: new Map([['punctuation', /==+$|--+$/]])
                },
                {
                    // # title 1
                    // ###### title 6
                    pattern: /(^\s*)#+.+/m,
                    lookbehind: true,
                    alias: 'important',
                    inside: new Map([['punctuation', /^#+|#+$/]])
                }
            ]
        ],
        [
            'hr',
            {
                // ***
                // ---
                // * * *
                // -----------
                pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
                lookbehind: true,
                alias: 'punctuation'
            }
        ],
        [
            'list',
            {
                // * item
                // + item
                // - item
                // 1. item
                pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
                lookbehind: true,
                alias: 'punctuation'
            }
        ],
        [
            'url-reference',
            {
                // [id]: http://example.com "Optional title"
                // [id]: http://example.com 'Optional title'
                // [id]: http://example.com (Optional title)
                // [id]: <http://example.com> "Optional title"
                pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
                inside: new Map<string, Tokens>([
                    [
                        'variable',
                        {
                            pattern: /^(!?\[)[^\]]+/,
                            lookbehind: true
                        }
                    ],
                    ['string', /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/],
                    ['punctuation', /^[\[\]!:]|[<>]/]
                ]),
                alias: 'url'
            }
        ],
        [
            'bold',
            {
                // **strong**
                // __strong__

                // Allow only one line break
                pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
                lookbehind: true,
                inside: new Map([['punctuation', /^\*\*|^__|\*\*$|__$/]])
            }
        ],
        [
            'italic',
            {
                // *em*
                // _em_

                // Allow only one line break
                pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
                lookbehind: true,
                inside: new Map([['punctuation', /^[*_]|[*_]$/]])
            }
        ],
        [
            'url',
            {
                // [example](http://example.com "Optional title")
                // [example] [id]
                pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
                inside: new Map<string, Tokens>([
                    [
                        'variable',
                        {
                            pattern: /(!?\[)[^\]]+(?=\]$)/,
                            lookbehind: true
                        }
                    ],
                    [
                        'string',
                        {
                            pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
                        }
                    ]
                ])
            }
        ]
    ])
);

setIn(markdown, ['bold', 'inside', 'url'], clone(markdown.get('url')));
setIn(markdown, ['italic', 'inside', 'url'], clone(markdown.get('url')));
setIn(markdown, ['bold', 'inside', 'italic'], clone(markdown.get('italic')));
setIn(markdown, ['italic', 'inside', 'bold'], clone(markdown.get('bold')));

export { markdown, TokenObject };
