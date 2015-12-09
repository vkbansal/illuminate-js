"use strict";

import * as languages from "./languages";
import * as utils from "./utils";
import Token from "./token";

function tokenize(text, grammar) {
    let start_array = [text],
        grmr = grammar.slice(0),
        restIndex = utils.lang.findIndex(grmr, "rest");

    if (restIndex > -1) {
        grmr = grmr.concat(grmr[restIndex][1]);
        grmr.splice(restIndex, 1);
    }

    tokenloop:
    for (let z = 0; z < grmr.length; z++) {
        let token = grmr[z][0],
            patterns = grmr[z][1];

        patterns = Array.isArray(patterns) ? patterns : [patterns];

        for (let j = 0; j < patterns.length; ++j) {
            let pattern = patterns[j],
                inside = pattern.inside,
                lookbehind = Boolean(pattern.lookbehind),
                lookbehindLength = 0,
                alias = pattern.alias;

            pattern = pattern.pattern || pattern;

            for (let i = 0; i < start_array.length; i++) { // Don’t cache length as it changes during the loop

                let node = start_array[i];

                // Something went terribly wrong, ABORT, ABORT!
                if (start_array.length > text.length) break tokenloop;

                if (node instanceof Token) continue;

                pattern.lastIndex = 0;

                let match = pattern.exec(node);

                if (!match) continue;

                if (lookbehind) {
                    lookbehindLength = match[1].length;
                }


                let string_from = match.index - 1 + lookbehindLength;

                match = match[0].slice(lookbehindLength);

                let string_to = string_from + match.length,
                    before = node.slice(0, string_from + 1),
                    after = node.slice(string_to + 1);

                let args = [i, 1];

                if (before) {
                    args.push(before);
                }

                let wrapped = new Token(token, inside ? tokenize(match, inside) : match, alias);

                args.push(wrapped);

                if (after) {
                    args.push(after);
                }

                start_array.splice(...args);
            }
        }
    }

    return start_array;
}

export function getLanguage(name) {
    return languages[name] || false;
}

export function highlight(text, name) {
    let tokens = tokenize(text, getLanguage(name));

    return Token.stringify(utils.encode(tokens), name);
}

export default { getLanguage, highlight };
