import { Definition, TokenTypes, TokenObject, Tokenz } from '../illuminate';
import { clone } from '../utils';

export const css: Definition = new Map<string, TokenTypes>([
    ['comment', /\/\*[\s\S]*?\*\//],
    [
        'atrule',
        {
            pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
            inside: new Map([['rule', /@[\w-]+/]])
        }
    ],
    ['url', /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i],
    [
        'selector',
        {
            pattern: /[^{}\s][^{}]*(?=\s*\{)/,
            inside: new Map([
                ['pseudo-element', /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/],
                ['pseudo-class', /:[-\w]+(?:\(.*\))?/],
                ['class', /\.[-:.\w]+/],
                ['id', /#[-:.\w]+/],
                ['attribute', /\[[^\]]+\]/]
            ])
        }
    ],
    [
        'string',
        {
            pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: true
        }
    ],
    ['property', /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i],
    ['important', /\B!important\b/i],
    ['hexcode', /#[\da-f]{3,8}/i],
    ['entity', /\\[\da-f]{1,8}/i],
    ['number', /[\d%.]+/],
    ['function', /[-a-z0-9]+(?=\()/i],
    ['punctuation', /[(){};:]/]
]);

const atrule = css.get('atrule') as TokenObject;
const rest = clone(css) as Map<string, Tokenz>;
rest.set('selector', /[^{}\s][^{};]*?(?=\s*\{)/);
(atrule.inside as Definition).set('rest', rest);

export default css;
