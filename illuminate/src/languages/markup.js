import Definition from '../Definition';
import { add as addHook } from '../hooks';

import css from './css';
import javascript from './javascript';

const tagInside = () => new Definition([
    ['tag', {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: new Definition([
            ['punctuation', /^<\/?/],
            ['namespace', /^[^\s>\/:]+:/]
        ])
    }],
    ['style-attr', {
        pattern: /\s*style=("|').*?\1/i,
        inside: new Definition([
            ['attr-name', {
                pattern: /^\s*style/i,
                inside: null // Prism.languages.markup.tag.inside
            }],
            ['punctuation', /^\s*=\s*['"]|['"]\s*$/],
            ['attr-value', {
                pattern: /.+/i,
                inside: css
            }]
        ]),
        alias: 'language-css'
    }],
    ['attr-value', {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
        'inside': new Definition([['punctuation', /[=>"']/]])
    }],
    ['punctuation', /\/?>/],
    ['attr-name', {
        pattern: /[^\s>\/]+/,
        'inside': new Definition([['namespace', /^[^\s>\/:]+:/]])
    }]
]);

const markup = new Definition([
    ['comment', /<!--[\w\W]*?-->/],
    ['prolog', /<\?[\w\W]+?\?>/],
    ['doctype', /<!DOCTYPE[\w\W]+?>/i],
    ['cdata', /<!\[CDATA\[[\w\W]*?]]>/i],
    ['style', {
        pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
        lookbehind: true,
        inside: css,
        alias: 'language-css'
    }],
    ['script', {
        pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: true,
        inside: javascript,
        alias: 'language-javascript'
    }],
    ['tag', {
        pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        inside: tagInside()
    }],
    ['entity', /&#?[\da-z]{1,8};/i]
]);

const inside = tagInside();

inside.delete('style-attr');
markup.setIn(['tag', 'inside', 'style-attr', 'inside', 'attr-name', 'inside'], inside);

// Plugin to make entity title show the real entity, idea by Roman Komarov
// addHook('wrap', (env) => {
//     if (env.type === 'entity') {
//         env.attributes.title = env.content.replace(/&amp;/, '&');
//     }
// });

markup.name = 'markup';

export default markup;
