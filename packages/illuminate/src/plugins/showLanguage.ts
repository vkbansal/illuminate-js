import { Plugin, HighlightEnv } from '../illuminate';

export const showLanguage: Plugin = add => {
    add('after-highlight', env => {
        const str = `<span class="show-language">${(env as HighlightEnv).language}</span>`;

        (env as HighlightEnv).highlightedCode = str + (env as HighlightEnv).highlightedCode;
    });
};
