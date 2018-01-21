import { Plugin, HighlightEnv } from '../../illuminate';

export const lineNumbers: Plugin = add => {
    add('after-highlight', env => {
        const match = (<HighlightEnv>env).code.match(/\n(?!$)/g);
        const linesNum = match ? match.length + 1 : 1;
        let lines = '';

        for (let i = 0; i < linesNum; i++) {
            lines += `<span class="line-number"></span>\n`;
        }

        return <HighlightEnv>Object.assign({}, env, {
            highlightedCode:
                (<HighlightEnv>env).highlightedCode +
                `\n<span class="line-number-rows">\n${lines}</span>`
        });
    });
};
