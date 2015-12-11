"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLanguage = getLanguage;
exports.highlight = highlight;

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _languages = require("./languages");

var languages = _interopRequireWildcard(_languages);

var _utils = require("./utils");

var utils = _interopRequireWildcard(_utils);

var _token = require("./token");

var _token2 = _interopRequireDefault(_token);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenize(text, grammar) {
    if (!grammar.hasOwnProperty("_order") || !Array.isArray(grammar._order)) {
        throw new Error("A grammar must have an _order array");
    }

    var start_array = [text];
    var order = grammar._order;
    var rest = grammar.rest;

    if (rest) {
        (0, _objectAssign2.default)(grammar, rest);
        delete grammar.rest;
    }

    tokenloop: for (var z = 0; z < order.length; z++) {
        var token = order[z],
            patterns = grammar[token];

        patterns = Array.isArray(patterns) ? patterns : [patterns];

        for (var j = 0; j < patterns.length; ++j) {
            var pattern = patterns[j],
                inside = pattern.inside,
                lookbehind = Boolean(pattern.lookbehind),
                lookbehindLength = 0,
                alias = pattern.alias;

            pattern = pattern.pattern || pattern;

            for (var i = 0; i < start_array.length; i++) {
                // Don’t cache length as it changes during the loop

                var node = start_array[i];

                // Something went terribly wrong, ABORT, ABORT!
                if (start_array.length > text.length) break tokenloop;

                if (node instanceof _token2.default) continue;

                pattern.lastIndex = 0;

                var match = pattern.exec(node);

                if (!match) continue;

                if (lookbehind) {
                    lookbehindLength = match[1].length;
                }

                var string_from = match.index - 1 + lookbehindLength;

                match = match[0].slice(lookbehindLength);

                var string_to = string_from + match.length,
                    before = node.slice(0, string_from + 1),
                    after = node.slice(string_to + 1);

                var args = [i, 1];

                if (before) {
                    args.push(before);
                }

                var wrapped = new _token2.default(token, inside ? tokenize(match, inside) : match, alias);

                args.push(wrapped);

                if (after) {
                    args.push(after);
                }

                start_array.splice.apply(start_array, args);
            }
        }
    }

    return start_array;
}

function getLanguage(name) {
    return languages[name] || false;
}

function highlight(text, name) {
    var tokens = tokenize(text, getLanguage(name));

    return _token2.default.stringify(utils.encode(tokens), name);
}

exports.default = { getLanguage: getLanguage, highlight: highlight };