"use strict";

import Immutable from "immutable";

let json = Immutable.OrderedMap();

json = json.withMutations((map) => {
    map.set("property", /"(\b|\B)[\w-]+"(?=\s*:)/ig)
        .set("string", /"(?!:)(\\?[^'"])*?"(?!:)/g)
        .set("number", /-?\d*\.?\d+([Ee]-?\d+)?/g)
        .set("punctuation", /[{}[\]);,]/g)
        .set("operator", /:/g)
        .set("boolean", /\b(true|false)\b/gi)
        .set("null", /\bnull\b/gi);
});

export { json as json };
