"use strict";

import { run } from "./hooks";
import reduce from "lodash/collection/reduce";

class Token {
    constructor(type, content, alias) {
        this.type = type;
        this.content = content;
        this.alias = alias;
    }

    static stringify(o, language, parent) {
        if (typeof o === "string") {
            return o;
        }

        if (Array.isArray(o)) {
            o.map((element) => Token.stringify(element, language, o)).join("");
        }

        let env = {
            type: o.type,
            content: Token.stringify(o.content, language, parent),
            tag: "span",
            classes: ["token", o.type],
            attributes: {},
            language,
            parent
        };

        if (env.type === "comment") {
            env.attributes.spellcheck = "true";
        }

        if (o.alias) {
            let aliases = Array.isArray(o.alias) ? o.alias : [o.alias];

            env.classes.push(aliases);
        }

        run("wrap", env);

        let attributes = reduce(
            env.attributes,
            (prev, val, key) => `${prev}${key}="${val || ""}" `,
            ""
        );

        // for (let name in env.attributes) {
        //     if (!env.attributes.hasOwnProperty)
        // }

        return `<${env.tag} class="${env.classes.join(" ")}" ${attributes}>${env.content}</${env.tag}>`;
    }
}

export default Token;
