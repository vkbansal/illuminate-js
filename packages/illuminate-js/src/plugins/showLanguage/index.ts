import { Plugin, HighlightEnv } from '../../illuminate';

export const showLanguage: Plugin = add => {
    add('after-highlight', env => {
        const str = `<span class="show-language--lang">${(<HighlightEnv>env).language}</span>`;

        return <HighlightEnv>Object.assign({}, env, {
            highlightedCode: str + (<HighlightEnv>env).highlightedCode
        });
    });
};
