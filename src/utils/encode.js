"use strict";

import Token from "../token";

export default function encode(tokens) {
    if (tokens instanceof Token) {
        return new Token(tokens.type, encode(tokens.content), tokens.alias);
    } else if (Array.isArray(tokens)) {
        return tokens.map(encode);
    }
    return tokens
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\u00a0/g, " ");
}
