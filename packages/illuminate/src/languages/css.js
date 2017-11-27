import Definition from '../Definition';

const css = new Definition([
    ['comment', /\/\*[\w\W]*?\*\//],
    ['url', /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i],
    ['selector', {
        pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
        inside: new Definition([
            ['pseudo-element', /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/],
            ['pseudo-class', /:[-\w]+(?:\(.*\))?/],
            ['class', /\.[-:\.\w]+/],
            ['id', /#[-:\.\w]+/],
            ['attribute', /\[[^\]]+\]/]
        ])
    }],
    ['string', {
        pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
    }],
    ['property', /(\b|\B)[\w-]+(?=\s*:)/i],
    ['important', /\B!important\b/i],
    ['hexcode', /#[\da-f]{3,6}/i],
    ['entity', /\\[\da-f]{1,8}/i],
    ['number', /[\d%\.]+/],
    ['function', /[-a-z0-9]+(?=\()/i],
    ['punctuation', /[(){};:]/]
]);

const atrule = () => ['atrule', {
    pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
    inside: new Definition([['rule', /@[\w-]+/]])
}];


const clone = css.extend([
    ['selector', /[^\{\}\s][^\{\};]*?(?=\s*\{)/]
]);

clone.delete('hexcode');
clone.delete('entity');
clone.delete('number');
clone.insertBefore('url', [atrule()]);

css.insertBefore('url', [atrule()]);
css.setIn(['atrule', 'inside', 'rest'], clone);

export default css;
