import { run } from './hooks';
import { SingleOrArray } from './utils';

export interface TokenEnv {
    type: string;
    content: SingleOrArray<string | Token>;
    tag: string;
    classes: Array<string>;
    attributes: Record<string, string>;
    language?: string;
    parent?: SingleOrArray<string | Token>;
}

const tokenTypes: Record<string, (e: TokenEnv) => void> = {
    comment(env: TokenEnv) {
        env.attributes.spellcheck = 'true';
    },
    keyword(env: TokenEnv) {
        env.classes.push(`keyword-${(env.content as string).toLowerCase().trim()}`);
    },
    punctuation(env: TokenEnv): void {
        switch (env.content) {
            case '(':
            case ')':
                env.classes.push('brackets-parentheses');
                return;
            case '[':
            case ']':
                env.classes.push('brackets-square');
                return;
            case '<':
            case '>':
                env.classes.push('brackets-angle');
                return;
            case '{':
            case '}':
                env.classes.push('brackets-braces');
                return;
        }
    }
};

export class Token {
    type: string;
    content: SingleOrArray<string | Token>;
    alias?: SingleOrArray<string>;

    constructor(
        type: string,
        content: SingleOrArray<string | Token>,
        alias?: SingleOrArray<string>
    ) {
        this.type = type;
        this.content = content;
        this.alias = alias;
    }

    static stringify(
        token: SingleOrArray<string | Token>,
        language?: string,
        parent?: SingleOrArray<string | Token>
    ): string {
        if (typeof token === 'string') {
            return token;
        }

        if (Array.isArray(token)) {
            return token.map(element => Token.stringify(element, language, token)).join('');
        }

        const env: TokenEnv = {
            type: token.type,
            content: Token.stringify(<Token>token.content, language, parent),
            tag: 'span',
            classes: ['token', token.type],
            attributes: {},
            language,
            parent
        };

        if (env.type in tokenTypes) tokenTypes[env.type](env);

        if (token.alias) {
            const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];

            env.classes.push(...aliases);
        }

        const newEnv = <TokenEnv>run('wrap', env) || env;

        const attributes = Object.keys(newEnv.attributes).reduce(
            (prev, key) => `${prev}${key}="${newEnv.attributes[key]}" `,
            ''
        );

        return `<${newEnv.tag} class="${newEnv.classes.join(' ')}" ${attributes}>${
            newEnv.content
        }</${newEnv.tag}>`;
    }
}
