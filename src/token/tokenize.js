"use strict";

import Immutable from "immutable";
import Token from "./";

export default function tokenize(text, grammar) {
    if (!Immutable.OrderedMap.isOrderedMap(grammar)) {
        throw new Error("A grammar must have be an OrderedMap");
    }

    let start_array = Immutable.List([text]);

    grammar.forEach((patterns, token) => {
        if (!Immutable.List.isList(patterns)) {
            patterns = Immutable.List([patterns]);
        }

        patterns.forEach((p) => {
            let isRegExp = p instanceof RegExp,
                pattern = isRegExp ? p : p.get("pattern"),
                inside = isRegExp ? undefined : pattern.get("inside"),
                lookbehind = isRegExp ? false : Boolean(pattern.get("lookbehind")),
                lookbehindLength = 0,
                alias = isRegExp ? undefined : pattern.get("alias");

            for (let i = 0; i < start_array.size; i++) { // Don’t cache length as it changes during the loop

                // Something went terribly wrong, ABORT, ABORT!
                if (start_array.size > text.length) {
                    throw new Error ("Something went terribly wrong while tokenizing code");
                }

                let node = start_array.get(i);

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

                start_array = start_array.splice(...args);
            }
        });
    });

    return start_array;
}
