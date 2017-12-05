import { SingleOrArray } from '../../utils';
import { Token } from '../../Token';

export function tokenToJson(token: SingleOrArray<string | Token>) {
    if (typeof token === 'string') {
        return token.trim();
    }

    if (Array.isArray(token)) {
        return token.map(tokenToJson).filter(f => Boolean(f));
    }

    return [token.type, tokenToJson(token.content)];
}
