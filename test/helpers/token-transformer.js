let Immutable = require("immutable");

module.exports = function tokenTransformer(token) {
    if (typeof token === "string") {
        return token.trim();
    }

    if (Immutable.List.isList(token)) {
        return token.map(tokenTransformer).filter(f => Boolean(f)).toArray();
    }

    return [token.type, tokenTransformer(token.content)];
};
