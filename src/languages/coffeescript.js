"use strict";

import { javascript } from "./javascript";
import { lang } from "../utils";
// Ignore comments starting with { to privilege string interpolation highlighting
let comment = /#(?!\{).+/,
    interpolation = {
        pattern: /#\{[^}]+\}/,
        alias: 'variable'
    };

let coffeescript = lang.extend(javascript, {
    comment,
    string: [
        // Strings are multiline
        /'(?:\\?[^\\])*?'/,
        {
            // Strings are multiline
            pattern: /"(?:\\?[^\\])*?"/,
            inside: {
                interpolation,
                _order: ["interpolation"]
            }
        }
    ],
    keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
    "class-member": {
        pattern: /@(?!\d)\w+/,
        alias: 'variable'
    },
    _order: ["string", "keyword", "class-member"]
});

lang.insertBefore(coffeescript, 'comment', {
    "multiline-comment": {
        pattern: /###[\s\S]+?###/,
        alias: 'comment'
    },
    // Block regexp can contain comments and interpolation
    "block-regex": {
        pattern: /\/{3}[\s\S]*?\/{3}/,
        alias: 'regex',
        inside: {
            comment,
            interpolation,
            _order: ["comment", "interpolation"]
        }
    },
    _order: ["multiline-comment", "block-regex"]
});

lang.insertBefore(coffeescript, 'string', {
    "inline-javascript": {
        pattern: /`(?:\\?[\s\S])*?`/,
        inside: {
            delimiter: {
                pattern: /^`|`$/,
                alias: "punctuation"
            },
            _order: ["delimiter"]
        }
    },
    // Block strings
    "multiline-string": [{
        pattern: /'''[\s\S]*?'''/,
        alias: "string"
    }, {
        pattern: /"""[\s\S]*?"""/,
        alias: "string",
        inside: {
            interpolation,
            _order: ["interpolation"]
        }
    }],
    _order: ["inline-javascript", "multiline-string"]
});

lang.insertAfter(
    coffeescript["inline-javascript"].inside,
    "delimiter",
    lang.clone(javascript)
);

lang.insertBefore(coffeescript, "keyword", {
    // Object property
    property: /(?!\d)\w+(?=\s*:(?!:))/,
    _order: ["property"]
});

export { coffeescript as coffee };
export { coffeescript as coffeescript };
