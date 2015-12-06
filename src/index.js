"use strict";

import * as languages from "./languages";
import * as utils from "./utils";
import Token from "./token";

function tokenize(text, grammar) {
    let strarr = [text],
        rest = grammar.rest;

    if (rest) {
        for (let token in rest) {
            grammar[token] = rest[token];
        }

        delete grammar.rest;
    }

    tokenloop:
    for (let token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) continue;

        let patterns = grammar[token];

        patterns = Array.isArray(patterns) ? patterns : [patterns];

        for (let j = 0; j < patterns.length; ++j) {
            let pattern = patterns[j],
                inside = pattern.inside,
                lookbehind = Boolean(pattern.lookbehind),
                lookbehindLength = 0,
                alias = pattern.alias;

            pattern = pattern.pattern || pattern;

            for (let i = 0; i < strarr.length; i++) { // Don’t cache length as it changes during the loop

                let str = strarr[i];

                // Something went terribly wrong, ABORT, ABORT!
                if (strarr.length > text.length) break tokenloop;

                if (str instanceof Token) continue;

                pattern.lastIndex = 0;

                let match = pattern.exec(str);

                if (!match) continue;

                if (lookbehind) {
                    lookbehindLength = match[1].length;
                }

                match = match[0].slice(lookbehindLength);

                let strFrom = match.index - 1 + lookbehindLength,
                    len = match.length,
                    strTo = strFrom + len,
                    before = str.slice(0, strFrom + 1),
                    after = str.slice(strTo + 1);

                let args = [i, 1];

                if (before) {
                    args.push(before);
                }

                let wrapped = new Token(token, inside ? tokenize(match, inside) : match, alias);

                args.push(wrapped);

                if (after) {
                    args.push(after);
                }

                strarr.splice(...args);
            }
        }
    }

    return strarr;
}

export function getLanguage(name) {
    return languages[name] || false;
}

export function highlight(text, name) {
    let tokens = tokenize(text, getLanguage(name));

    return Token.stringify(utils.encode(tokens), name);
}

export default { getLanguage, highlight };
