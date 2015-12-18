module.exports = function tokenTransformer(token) {
    if (typeof token === "string") {
        return token.trim();
    }

    if (Array.isArray(token)) {
        return token.map(tokenTransformer).filter(f => Boolean(f));
    }

    return [token.type, tokenTransformer(token.content)];
};
