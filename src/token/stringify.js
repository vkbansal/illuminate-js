import Immutable from "immutable";
import { run } from "../hooks";

export default function stringify(o, language, parent) {
    if (typeof o === "string") {
        return o;
    }

    if (Immutable.List.isList(o)) {
        return o.map((element) => stringify(element, language, o)).toArray().join("");
    }

    let env = Immutable.Map({
        type: o.type,
        content: Token.stringify(o.content, language, parent),
        tag: "span",
        classes: Immutable.List(["token", o.type]),
        attributes: Immutable.Map({}),
        language,
        parent
    });

    switch (env.get("type")) {
        case "comment":
            env = env.setIn(["attributes, spellcheck"], "true");
            break;
        case "keyword":
            env = env.updateIn(["classes"], (list) => list.push(`keyword-${env.content.toLowerCase().trim()}`));
            break;
        case "punctuation":
            if (env.content.match(/\(|\)/g)) {
                env = env.updateIn(["classes"], (list) => list.push(`brackets-parentheses`));
            } else if (env.content.match(/<|>/g)) {
                env = env.updateIn(["classes"], (list) => list.push(`brackets-angle`));
            } else if (env.content.match(/\[|\]>/g)) {
                env = env.updateIn(["classes"], (list) => list.push(`brackets-square`));
            } else if (env.content.match(/\{|\}/g)) {
                env = env.updateIn(["classes"], (list) => list.push(`brackets-braces`));
            }
    }

    let alias = o.get("alias");

    if (alias) {
        let aliases = Immutable.List.isList(alias) ? alias.toArray() : [o.alias];

        env = env.updateIn(["classes"], (list) => list.push(...aliases));
    }

    env = run("wrap", env) || env;

    let attributes = env.get("attributes").reduce(
            (prev, value, key) => `${prev}${key}="${value || ""}" `,
            ""
        ),
        tag = env.get("tag"),
        classes = env.get("classes").toArray.join(" "),
        content = env.get("content");

    return `<${tag} class="${classes}" ${attributes}>${content}</${tag}>`;
}
