"use strict";

import Immutable from "immutable";

let clike = Immutable.OrderedMap(),
    className = Immutable.Map({
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: true,
        inside: Immutable.OrderedMap({
            punctuation: /(\.|\\)/
        })
    }),
    func = Immutable.Map({
        pattern: /[a-z0-9_]+\(/i,
        inside: Immutable.OrderedMap({
            punctuation: /\(/
        })
    });

clike.withMutations((map) => {
    map.set(
        "comment",
        Immutable.fromJS([
            {
                pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
                lookbehind: true
            }, {
                pattern: /(^|[^\\:])\/\/.*/,
                lookbehind: true
            }
        ])
    )
    .set("string", /("|')(\\\n|\\?.)*?\1/)
    .set("class-name", className)
    .set("keyword", /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/)
    .set("boolean", /\b(true|false)\b/)
    .set("function", func)
    .set("number", /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/)
    .set("operator", /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/)
    .set("ignore", /&(lt|gt|amp);/i)
    .set("punctuation", /[{}[\];(),.:]/)
});

export { clike as clike };
