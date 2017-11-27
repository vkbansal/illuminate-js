import { Token } from './Token';

export type SingleOrArray<T> = T | Array<T>;

export function encode(tokens: SingleOrArray<Token | string>): SingleOrArray<Token | string> {
    if (tokens instanceof Token) {
        return new Token(tokens.type, <string>encode(tokens.content), tokens.alias);
    } else if (Array.isArray(tokens)) {
        return <Array<Token | string>>tokens.map(encode);
    }

    return tokens
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\u00a0/g, ' ');
}
