/* eslint-disable import/prefer-default-export */
import Token from './Token';

export function encode(tokens) {
    if (tokens instanceof Token) {
        return new Token(tokens.type, encode(tokens.content), tokens.alias);
    } else if (Array.isArray(tokens)) {
        return tokens.map(encode);
    }

    return tokens
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\u00a0/g, ' ');
}
