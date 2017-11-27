import { Plugin, HighlightEnv } from '../illuminate';

export const showLanguage: Plugin = add => {
    add('after-highlight', (env: HighlightEnv) => {
        const str = `<span class="show-language">${env.language}</span>`;

        env.highlightedCode = str + env.highlightedCode;
    });
};
