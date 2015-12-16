"use strict";

import { lang } from "../utils";
import { javascript } from "./javascript";
import { markup } from "./markup";

let jsx = lang.extend(markup, javascript);

jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i;
jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

let jsxExpression = lang.clone(jsx);

delete jsxExpression.punctuation;

lang.insertBefore(jsxExpression, "operator", {
    punctuation: /=(?={)|[{}[\];(),.:]/,
    _order: ["punctuation"]
});

lang.insertBefore(jsx.tag.inside, "attr-value", {
    "script": {
        // Allow for one level of nesting
        pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
        inside: jsxExpression,
        "alias": "language-javascript"
    },
    _order: ["script"]
});

export { jsx as jsx };
