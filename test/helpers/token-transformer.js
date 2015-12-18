module.exports = function tokenTransformer(token) {
    if (typeof token === "string") {
        return token;
    }

    if (Array.isArray(token)) {
        return token.map(tokenTransformer);
    }

    return [token.type, tokenTransformer(token.content)];
};
