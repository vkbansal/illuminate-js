"use strict";

import { add as addHook} from "../hooks";

let markup = {
    comment: /<!--[\w\W]*?-->/,
	prolog: /<\?[\w\W]+?\?>/,
	doctype: /<!DOCTYPE[\w\W]+?>/,
	cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
	tag: {
		pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/,
                    _order: ["punctuation", "namespace"]
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
                inside: {
                    punctuation: /[=>"']/,
                    _order: ["punctuation"]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    "namespace": /^[^\s>\/:]+:/,
                    _order: ["namespace"]
                }
            },
            _order: ["tag", "attr-value", "punctuation", "attr-name"]
        }
    },
    "entity": /&#?[\da-z]{1,8};/i,
    "_order": [
        "comment",
        "prolog",
        "doctype",
        "cdata",
        "tag",
        "entity"
    ]
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
addHook("wrap", function(env) {
	if (env.type === "entity") {
		env.attributes["title"] = env.content.replace(/&amp;/, "&");
	}
});

export { markup as markup };
export { markup as xml };
export { markup as html };
export { markup as svg };
