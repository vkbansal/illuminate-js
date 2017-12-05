import { css } from './css';
import { clone, setIn, insertBefore, getIn } from '../utils';
import { Definition, TokenTypes } from '../illuminate';

const atRule = () => ({
    pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
    inside: new Map([['rule', /@[\w-]+/]])
});

const scss: Definition = clone(css);
scss.set('comment', {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
});
// url, compassified
scss.set('url', /(?:[-a-z]+-)*url(?=\()/i);
// CSS selector regex is not appropriate for Sass
// since there can be lot more things (var, @ directive, nesting..)
// a selector must start at the end of a property or after a brace (end of other rules or nesting)
// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
// can "pass" as a selector- e.g: proper#{$erty})
// this one was hard to do, so please be careful if you edit this one :)
scss.set('selector', {
    // Initial look-ahead is used to prevent matching of blank selectors
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
    inside: new Map<string, TokenTypes>([
        [
            'parent',
            {
                pattern: /&/,
                alias: 'important'
            }
        ],
        ['placeholder', /%[-\w]+/],
        ['variable', /\$[-\w]+|#\{\$[-\w]+\}/]
    ])
});
scss.set('property', {
    pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
    inside: new Map([['variable', /\$[-\w]+|#\{\$[-\w]+\}/]])
});

insertBefore(
    scss,
    'atrule',
    new Map([
        [
            'keyword',
            [
                /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
                {
                    pattern: /( +)(?:from|through)(?= )/,
                    lookbehind: true
                }
            ]
        ]
    ])
);

insertBefore(
    scss,
    'property',
    new Map([
        // var and interpolated vars
        ['variable', /\$[-\w]+|#\{\$[-\w]+\}/]
    ])
);

insertBefore(
    scss,
    'function',
    new Map<string, TokenTypes>([
        [
            'placeholder',
            {
                pattern: /%[-\w]+/,
                alias: 'selector'
            }
        ],
        [
            'statement',
            {
                pattern: /\B!(?:default|optional)\b/i,
                alias: 'keyword'
            }
        ],
        ['boolean', /\b(?:true|false)\b/],
        ['null', /\bnull\b/],
        [
            'operator',
            {
                pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
                lookbehind: true
            }
        ]
    ])
);

const rest = clone(scss);

scss.set('atrule', atRule());
setIn(scss, ['atrule', 'inside', 'rest'], rest);
setIn(scss, ['atrule', 'inside', 'rest', 'atrule', 'pattern'], getIn(scss, ['atrule', 'pattern']));
getIn(scss, ['atrule', 'inside', 'rest', 'atrule', 'inside']).delete('rest');

export { scss };
