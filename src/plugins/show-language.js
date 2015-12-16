"use strict";

export default function(add) {
    add("after-highlight", (env) => {
        let str = `<span class="show-language">${env.language}</span>`;

        env.highlightedCode = str + env.highlightedCode;
    });
}
