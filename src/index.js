"use strict";

import Immutable from "immutable";
import "./utils/immutable";

import encode from "./utils/encode";
import * as languages from "./languages";
import hooks from "./hooks";
import Token from "./token";


export function getLanguage(name) {
    return languages[name] || false;
}

export function highlight(text, language) {
    let grammar = getLanguage(language),
        env = Immutable.Map({
            grammar,
            language,
            code: text
        });

    env = hooks.run("before-highlight", env) || env;

    let tokens = Token.tokenize(env.get("code"), env.get("grammar")), // Specific for plugins
        highlightedCode = Token.stringify(encode(tokens), language);

    env = env.set("highlightedCode", highlightedCode);
    env = hooks.run("after-highlight", env) || env;

    return env.get("highlightedCode"); // Specific for plugins
}

export function addPlugin(plugin) {
    if (typeof plugin !== "function") {
        throw new Error("Given Plugin must be a function");
    }

    plugin(hooks.add);
}
