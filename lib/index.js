"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLanguage = getLanguage;
exports.highlight = highlight;

var _languages = require("./languages");

var languages = _interopRequireWildcard(_languages);

var _utils = require("./utils");

var utils = _interopRequireWildcard(_utils);

var _token = require("./token");

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function tokenize(text, grammar) {
    var strarr = [text],
        rest = grammar.rest;

    if (rest) {
        for (var token in rest) {
            grammar[token] = rest[token];
        }

        delete grammar.rest;
    }

    tokenloop: for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) continue;

        var patterns = grammar[token];

        patterns = Array.isArray(patterns) ? patterns : [patterns];

        for (var j = 0; j < patterns.length; ++j) {
            var pattern = patterns[j],
                inside = pattern.inside,
                lookbehind = Boolean(pattern.lookbehind),
                lookbehindLength = 0,
                alias = pattern.alias;

            pattern = pattern.pattern || pattern;

            for (var i = 0; i < strarr.length; i++) {
                // Don’t cache length as it changes during the loop

                var str = strarr[i];

                // Something went terribly wrong, ABORT, ABORT!
                if (strarr.length > text.length) break tokenloop;

                if (str instanceof _token2.default) continue;

                pattern.lastIndex = 0;

                var match = pattern.exec(str);

                if (!match) continue;

                if (lookbehind) {
                    lookbehindLength = match[1].length;
                }

                match = match[0].slice(lookbehindLength);

                var strFrom = match.index - 1 + lookbehindLength,
                    len = match.length,
                    strTo = strFrom + len,
                    before = str.slice(0, strFrom + 1),
                    after = str.slice(strTo + 1);

                var args = [i, 1];

                if (before) {
                    args.push(before);
                }

                var wrapped = new _token2.default(token, inside ? tokenize(match, inside) : match, alias);

                args.push(wrapped);

                if (after) {
                    args.push(after);
                }

                strarr.splice.apply(strarr, args);
            }
        }
    }

    return strarr;
}

function getLanguage(name) {
    return languages[name] || false;
}

function highlight(text, name) {
    var tokens = tokenize(text, getLanguage(name));

    return _token2.default.stringify(utils.encode(tokens), name);
}

exports.default = { getLanguage: getLanguage, highlight: highlight };