"use strict";

export default function(add) {
    add("after-highlight", (env) => {
        let match = env.code.match(/\n(?!$)/g),
            linesNum = match ? match.length + 1 : 1,
            lines;

        for (let i = 0; i <= linesNum; i++) {
            lines += `<span></span>`;
        }

        env.highlightedCode += `<span class="line-munber-rows">${lines}<span>`;
    });
}
