import Definition from '../Definition';

import css from './css';

const atRule = () => ({
    pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
    inside: new Definition([
        ['rule', /@[\w-]+/]
    ])
});

const scss = css.extend([
    ['comment', {
        pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
        lookbehind: true
    }],
    // url, compassified
    ['url', /(?:[-a-z]+-)*url(?=\()/i],
    // CSS selector regex is not appropriate for Sass
    // since there can be lot more things (var, @ directive, nesting..)
    // a selector must start at the end of a property or after a brace (end of other rules or nesting)
    // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
    // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
    // can "pass" as a selector- e.g: proper#{$erty})
    // this one was hard to do, so please be careful if you edit this one :)
    ['selector', {
        // Initial look-ahead is used to prevent matching of blank selectors
        pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
        inside: new Definition([
            ['parent', {
                pattern: /&/,
                alias: 'important'
            }],
            ['placeholder', /%[-_\w]+/],
            ['variable', /\$[-_\w]+|#\{\$[-_\w]+\}/]
        ])
    }],
    ['property', {
        pattern: /(?:[\w-]|\$[-_\w]+|#\{\$[-_\w]+\})+(?=\s*:)/i,
        inside: new Definition([
            ['variable', /\$[-_\w]+|#\{\$[-_\w]+\}/]
        ])
    }]
]);

scss.insertBefore('atrule', [
    ['keyword', [
        /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
        {
            pattern: /( +)(?:from|through)(?= )/,
            lookbehind: true
        }
    ]]
]);

scss.insertBefore('property', [
    // var and interpolated vars
    ['variable', /\$[-_\w]+|#\{\$[-_\w]+\}/]
]);

scss.insertBefore('function', [
    ['placeholder', {
        pattern: /%[-_\w]+/,
        alias: 'selector'
    }],
    ['statement', {
        pattern: /\B!(?:default|optional)\b/i,
        alias: 'keyword'
    }],
    ['boolean', /\b(?:true|false)\b/],
    ['null', /\bnull\b/],
    ['operator', {
        pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
        lookbehind: true
    }]
]);


const clone = scss.clone();

scss.set('atrule', atRule());
scss.setIn(['atrule', 'inside', 'rest'], clone);
scss.setIn(['atrule', 'inside', 'rest', 'atrule', 'pattern'], scss.getIn(['atrule', 'pattern']));
scss.getIn(['atrule', 'inside', 'rest', 'atrule', 'inside']).delete('rest');

export default scss;
