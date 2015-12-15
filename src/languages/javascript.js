"use strict";

import { clike } from "./clike";
import { lang } from "../utils";
import { markup } from "./markup";

let js = lang.extend(clike, {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
});

lang.insertBefore(js, "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: true
    },
    _order: ["regex"]
});

lang.insertBefore(js, "class-name", {
    "template-string": {
        pattern: /`(?:\\`|\\?[^`])*`/,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    _order: ["interpolation-punctuation"]
                }
            },
            string: /[\s\S]+/,
            _order: ["interpolation", "string"]
        }
    },
    _order: ["template-string"]
});

lang.insertAfter(
    js["template-string"].inside.interpolation.inside,
    "interpolation-punctuation",
    lang.clone(js)
);

lang.insertBefore(markup, "tag", {
    "script": {
        pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: true,
        inside: lang.clone(js),
        alias: "language-javascript"
    },
    _order: ["script"]
});

export { js as js };
export { js as javascript };
