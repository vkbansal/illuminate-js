import { Definition, Tokens } from '../illuminate';
import { css } from './css';
import { clone, insertBefore } from '../utils';
/* FIXME :
 :extend() is not handled specifically : its highlighting is buggy.
 Mixin usage must be inside a ruleset to be highlighted.
 At-rules (e.g. import) containing interpolations are buggy.
 Detached rulesets are highlighted as at-rules.
 A comment before a mixin usage prevents the latter to be properly highlighted.
 */

const less: Definition = clone(css);
less.set('comment', [
    /\/\*[\s\S]*?\*\//,
    {
        pattern: /(^|[^\\])\/\/.*/,
        lookbehind: true
    }
]);
less.set('atrule', {
    pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
    inside: new Map([['punctuation', /[:()]/]])
});
// selectors and mixins are considered the same
less.set('selector', {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
    inside: new Map([
        // mixin parameters
        ['variable', /@+[\w-]+/]
    ])
});
less.set('property', /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i);
less.set('punctuation', /[{}();:,]/);
less.set('operator', /[+\-*\/]/);

// // Invert function and punctuation positions
insertBefore(less, 'punctuation', new Map([['function', less.get('function') as RegExp]]));

insertBefore(
    less,
    'property',
    new Map<string, Tokens>([
        [
            'variable',
            [
                // Variable declaration (the colon must be consumed!)
                {
                    pattern: /@[\w-]+\s*:/,
                    inside: new Map([['punctuation', /:/]])
                },

                // Variable usage
                /@@?[\w-]+/
            ]
        ],
        [
            'mixin-usage',
            {
                pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
                lookbehind: true,
                alias: 'function'
            }
        ]
    ])
);

export { less };
