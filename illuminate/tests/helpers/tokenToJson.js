export default function tokenToJson(token) {
    if (typeof token === 'string') {
        return token.trim();
    }

    if (Array.isArray(token)) {
        return token.map(tokenToJson).filter((f) => Boolean(f));
    }

    return [token.type, tokenToJson(token.content)];
}
