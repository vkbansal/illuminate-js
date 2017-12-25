import { Plugin, HighlightEnv } from '../../illuminate';

export const lineNumbers: Plugin = add => {
    add('after-highlight', env => {
        const match = (env as HighlightEnv).code.match(/\n(?!$)/g);
        const linesNum = match ? match.length + 1 : 1;
        let lines = '';

        for (let i = 0; i < linesNum; i++) {
            lines += `<span class="line-number"></span>\n`;
        }

        (env as HighlightEnv).highlightedCode += `\n<span class="line-number-rows">\n${lines}</span>`;
    });
};
