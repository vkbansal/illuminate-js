export default function (add) {
    add('after-highlight', (env) => {
        const str = `<span class="show-language">${env.language}</span>`;

        env.highlightedCode = str + env.highlightedCode;
    });
}
