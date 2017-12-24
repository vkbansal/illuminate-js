import { clone, setIn } from '../utils';
import { TokenTypes, TokenObject, Definition } from '../illuminate';
import { add as addHook, TokenEnv } from '../hooks';

import { css } from './css';
import { javascript } from './javascript';

const markup = new Map<string, TokenTypes>([
    ['comment', /<!--[\s\S]*?-->/],
    ['prolog', /<\?[\s\S]+?\?>/],
    ['doctype', /<!DOCTYPE[\s\S]+?>/i],
    ['cdata', /<!\[CDATA\[[\s\S]*?]]>/i],
    [
        'style',
        {
            pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
            lookbehind: true,
            inside: clone(css),
            alias: 'language-css',
            greedy: true
        }
    ],
    [
        'script',
        {
            pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
            lookbehind: true,
            inside: clone(javascript),
            alias: 'language-javascript',
            greedy: true
        }
    ],
    [
        'tag',
        {
            pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
            inside: new Map<string, TokenTypes>([
                [
                    'tag',
                    {
                        pattern: /^<\/?[^\s>\/]+/i,
                        inside: new Map([['punctuation', /^<\/?/], ['namespace', /^[^\s>\/:]+:/]])
                    }
                ],
                [
                    'style-attr',
                    {
                        pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                        inside: new Map<string, TokenTypes>([
                            [
                                'attr-name',
                                {
                                    pattern: /^\s*style/i,
                                    inside: new Map() //languages.markup.tag.inside
                                }
                            ],
                            ['punctuation', /^\s*=\s*['"]|['"]\s*$/],
                            [
                                'attr-value',
                                {
                                    pattern: /.+/i,
                                    inside: clone(css)
                                }
                            ]
                        ]),
                        alias: 'language-css'
                    }
                ],
                [
                    'attr-value',
                    {
                        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                        inside: new Map<string, TokenTypes>([
                            [
                                'punctuation',
                                [
                                    /^=/,
                                    {
                                        pattern: /(^|[^\\])["']/,
                                        lookbehind: true
                                    }
                                ]
                            ],
                            ['entity', /&#?[\da-z]{1,8};/i]
                        ])
                    }
                ],
                ['punctuation', /\/?>/],
                [
                    'attr-name',
                    {
                        pattern: /[^\s>\/]+/,
                        inside: new Map([['namespace', /^[^\s>\/:]+:/]])
                    }
                ]
            ])
        }
    ],
    ['entity', /&#?[\da-z]{1,8};/i]
]);

const tag = markup.get('tag') as TokenObject;
const inside = clone(tag.inside as Definition);
inside.delete('style-attr');

setIn(markup, ['tag', 'inside', 'style-attr', 'inside', 'attr-name', 'inside'], inside);

// Plugin to make entity title show the real entity
addHook('wrap', env => {
    if ((env as TokenEnv).type === 'entity') {
        (env as TokenEnv).attributes.title = ((env as TokenEnv).content as string).replace(
            /&amp;/,
            '&'
        );
    }
});

export { markup };
