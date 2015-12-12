"use strict";

import { lang } from "../utils";
import { javascript } from "./javascript";
import { markup } from "./markup";

let jsx = lang.extend(markup, javascript);

jsx.tag.pattern = /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;
jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

lang.insertBefore(jsx.tag.inside, "attr-value", {
    "script": {
        // Allow for one level of nesting
        pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
        inside: {
            "function": javascript.function,
            punctuation: /[={}[\];(),.:]/,
            keyword: javascript.keyword,
            "boolean": javascript.boolean,
            _order: ["function", "punctuation", "keyword", "boolean"]
        },
        "alias": "language-javascript"
    },
    _order: ["script"]
});

export { jsx as jsx };
export { jsx as babel };
