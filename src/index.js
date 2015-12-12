"use strict";

import * as languages from "./languages";
import * as utils from "./utils";
import hooks from "./hooks";
import Token from "./token";

function tokenize(text, grammar) {
    if (!grammar.hasOwnProperty("_order") || !Array.isArray(grammar._order)) {
        throw new Error("A grammar must have an _order array");
    }

    let start_array = [text],
        { _order: order, rest } = grammar;

    if (rest && languages[rest]) {
        Object.assign(grammar, languages[rest]);
        delete grammar.rest;
    }

    tokenloop:
    for (let z = 0; z < order.length; z++) {
        let token = order[z],
            patterns = grammar[token];

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

export function highlight(text, language) {
    let grammar = getLanguage(language),
        env = {
            grammar,
            language,
            code: text
        };

    hooks.run("before-highlight", env);

    let tokens = tokenize(text, grammar),
        highlightedCode = Token.stringify(utils.encode(tokens), language);

    env.highlightedCode = highlightedCode;
    hooks.run("after-highlight", env);

    return highlightedCode;
}

export default { getLanguage, highlight };
