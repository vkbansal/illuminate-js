import Definition from '../Definition';

import javascript from './javascript';

// Ignore comments starting with { to privilege string interpolation highlighting
const comment = /#(?!\{).+/;
const interpolation = {
    pattern: /#\{[^}]+\}/,
    alias: 'variable'
};

const coffeescript = javascript.extend([
    ['comment', comment],
    ['string', [
        // Strings are multiline
        {
            pattern: /'(?:\\?[^\\])*?'/,
            greedy: true
        }, {
            // Strings are multiline
            pattern: /"(?:\\?[^\\])*?"/,
            greedy: true,
            inside: new Definition([['interpolation', interpolation]])
        }
    ]],
    ['keyword', /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/],
    ['class-member', {
        pattern: /@(?!\d)\w+/,
        alias: 'variable'
    }]
]);

coffeescript.insertBefore('comment', [
    ['multiline-comment', {
        pattern: /###[\s\S]+?###/,
        alias: 'comment'
    }],
    // Block regexp can contain comments and interpolation
    ['block-regex', {
        pattern: /\/{3}[\s\S]*?\/{3}/,
        alias: 'regex',
        inside: new Definition([
            ['comment', comment],
            ['interpolation', interpolation]
        ])
    }]
]);

coffeescript.insertBefore('string', [
    ['inline-javascript', {
        pattern: /`(?:\\?[\s\S])*?`/,
        inside: new Definition([
            ['delimiter', {
                pattern: /^`|`$/,
                alias: 'punctuation'
            }],
            ['rest', javascript.clone()]
        ])
    }],
    // Block strings
    ['multiline-string', [
        {
            pattern: /'''[\s\S]*?'''/,
            greedy: true,
            alias: 'string'
        }, {
            pattern: /"""[\s\S]*?"""/,
            greedy: true,
            alias: 'string',
            inside: new Definition([['interpolation', interpolation]])
        }
    ]]
]);

// lang.insertAfter(
//     coffeescript["inline-javascript"].inside,
//     "delimiter",
//     lang.clone(javascript)
// );

coffeescript.insertBefore('keyword', [
    // Object property
    ['property', /(?!\d)\w+(?=\s*:(?!:))/]
]);

coffeescript.delete('template-string');

export default coffeescript;
