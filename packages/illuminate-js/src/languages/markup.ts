import { clone, setIn } from '../utils';
import { Tokens, TokenObject, Definition } from '../illuminate';
import { add as addHook, TokenEnv } from '../hooks';

import { css } from './css';
import { javascript } from './javascript';

const markup = new Map<string, Tokens>([
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
            inside: new Map<string, Tokens>([
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
                        inside: new Map<string, Tokens>([
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
                        inside: new Map<string, Tokens>([
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
addHook('wrap', (env) => {
    if ((<TokenEnv>env).type === 'entity') {
        return Object.assign({}, env, {
            attributes: Object.assign({}, (<TokenEnv>env).attributes, {
                title: (<string>(<TokenEnv>env).content).replace(/&amp;/, '&')
            })
        });
    }

    return env;
});

export { markup };
