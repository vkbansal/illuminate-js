import Definition from '../Definition';

import clike from './clike';

const js = clike.extend([
    ['keyword', /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/],
    ['number', /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    ['function', /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i],
    ['operator', /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/]
]);

js.insertBefore('keyword', [
    ['regex', {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: true,
        greedy: true
    }]
]);

const extendDef = js.clone();

js.insertBefore('class-name', [
    ['template-string', {
        pattern: /`(?:\\\\|\\?[^\\])*?`/,
        greedy: true,
        inside: new Definition([
            ['interpolation', {
                pattern: /\$\{[^}]+\}/,
                inside: new Definition([
                    ['interpolation-punctuation', {
                        pattern: /^\$\{|\}$/,
                        alias: 'punctuation'
                    }],
                    ['rest', extendDef]
                ])
            }],
            ['string', /[\s\S]+/]
        ])
    }]
]);

export default js;
