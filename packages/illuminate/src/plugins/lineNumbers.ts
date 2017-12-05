import { Plugin, HighlightEnv } from '../illuminate';

export const lineNumber: Plugin = add => {
    add('after-highlight', env => {
        const match = (env as HighlightEnv).code.match(/\n(?!$)/g);
        const linesNum = match ? match.length + 1 : 1;
        let lines = '';

        for (let i = 0; i < linesNum; i++) {
            lines += `<span class="line-number"></span>`;
        }

        (env as HighlightEnv).highlightedCode += `<span class="line-number-rows">${lines}</span>`;
    });
};
