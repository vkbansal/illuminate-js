"use strict";

import Token from "../token";
import Immutable from "immutable";

export default function encode(tokens) {
    if (tokens instanceof Token) {
        return new Token(tokens.type, encode(tokens.content), tokens.alias);
    } else if (Immutable.List.isList(tokens)) {
        return tokens.map(encode);
    }
    return tokens
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\u00a0/g, " ");
}
