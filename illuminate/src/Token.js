import { run } from './hooks';

export default class Token {
    constructor(type, content, alias) {
        this.type = type;
        this.content = content;
        this.alias = alias;
    }

    static stringify(token, language, parent) {
        if (typeof token === 'string') {
            return token;
        }

        if (Array.isArray(token)) {
            return token.map((element) => Token.stringify(element, language, token)).join('');
        }

        const env = {
            type: token.type,
            content: Token.stringify(token.content, language, parent),
            tag: 'span',
            classes: ['token', token.type],
            attributes: {},
            language,
            parent
        };

        const types = {
            comment() {
                env.attributes.spellcheck = 'true';
            },
            keyword() {
                env.classes.push(`keyword-${env.content.toLowerCase().trim()}`);
            },
            punctuation(content) {
                switch (content) {
                    case '(':
                    case ')':
                        return env.classes.push('brackets-parentheses');
                    case '[':
                    case ']':
                        return env.classes.push('brackets-square');
                    case '<':
                    case '>':
                        return env.classes.push('brackets-angle');
                    case '{':
                    case '}':
                        return env.classes.push('brackets-braces');
                }
            }
        };

        if (env.type in types) types[env.type](env.content);

        if (token.alias) {
            const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];

            env.classes.push(...aliases);
        }

        run('wrap', env);

        const attributes = Object.keys(env.attributes)
            .reduce(
                (prev, key) => `${prev}${key}="${env.attributes[key]}" `,
                ''
            );

        return `<${env.tag} class="${env.classes.join(' ')}" ${attributes}>${env.content}</${env.tag}>`;
    }
}
