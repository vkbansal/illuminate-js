"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.coffeescript = exports.coffee = undefined;

var _javascript = require("./javascript");

var _utils = require("../utils");

// Ignore comments starting with { to privilege string interpolation highlighting
var comment = /#(?!\{).+/,
    interpolation = {
    pattern: /#\{[^}]+\}/,
    alias: 'variable'
};

var coffeescript = _utils.lang.extend(_javascript.javascript, {
    comment: comment,
    string: [
    // Strings are multiline
    /'(?:\\?[^\\])*?'/, {
        // Strings are multiline
        pattern: /"(?:\\?[^\\])*?"/,
        inside: {
            interpolation: interpolation,
            _order: ["interpolation"]
        }
    }],
    keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
    "class-member": {
        pattern: /@(?!\d)\w+/,
        alias: 'variable'
    },
    _order: ["string", "keyword", "class-member"]
});

_utils.lang.insertBefore(coffeescript, 'comment', {
    "multiline-comment": {
        pattern: /###[\s\S]+?###/,
        alias: 'comment'
    },
    // Block regexp can contain comments and interpolation
    "block-regex": {
        pattern: /\/{3}[\s\S]*?\/{3}/,
        alias: 'regex',
        inside: {
            comment: comment,
            interpolation: interpolation,
            _order: ["comment", "interpolation"]
        }
    },
    _order: ["multiline-comment", "block-regex"]
});

_utils.lang.insertBefore(coffeescript, 'string', {
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
            interpolation: interpolation,
            _order: ["interpolation"]
        }
    }],
    _order: ["inline-javascript", "multiline-string"]
});

_utils.lang.insertAfter(coffeescript["inline-javascript"].inside, "delimiter", _utils.lang.clone(_javascript.javascript));

_utils.lang.insertBefore(coffeescript, "keyword", {
    // Object property
    property: /(?!\d)\w+(?=\s*:(?!:))/,
    _order: ["property"]
});

exports.coffee = coffeescript;
exports.coffeescript = coffeescript;