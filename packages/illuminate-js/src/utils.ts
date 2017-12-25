import { Token } from './Token';
import { Definition, TokenTypes } from './illuminate';
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

export function clone<T = any>(value: T): T {
    const stringValue = String(value);

    if (stringValue === '[object Map]') {
        const temp = new Map();

        for (let [key, val] of value as any) {
            temp.set(key, clone(val));
        }

        return temp as any;
    } else if (stringValue === '[object Object]') {
        return Object.keys(value as any).reduce(
            (p, c) => Object.assign(p, { [c]: clone((value as any)[c]) }),
            {}
        ) as T;
    } else if (Array.isArray(value)) {
        return value.map(clone) as any;
    }

    return value;
}

export function insertBefore(
    parent: Definition,
    insertBeforeKey: string,
    def: Definition
): Definition {
    const temp = new Map<string, TokenTypes>();

    let removeKeys = false;
    const entries = parent.entries();

    for (const [key, value] of entries) {
        if (key === insertBeforeKey) {
            removeKeys = true;
        }

        if (removeKeys) {
            parent.delete(key);
            temp.set(key, value);
        }
    }

    for (const [key, value] of def) {
        parent.set(key, value);
    }

    for (const [key, value] of temp) {
        parent.set(key, value);
    }

    return parent;
}

export function setIn(def: any, path: Array<string>, value: any): void {
    let val = def;
    let i = 0;

    while (i < path.length - 1) {
        const curr = path[i];

        val = val instanceof Map ? val.get(curr) : val[curr];

        i++;
    }

    if (val instanceof Map) {
        val.set(path[i], value);
    } else {
        val[path[i]] = value;
    }
}

export function getIn<T = any>(def: any, path: Array<string>): T {
    let val = def;
    let i = 0;

    while (i < path.length) {
        const curr = path[i];

        val = val instanceof Map ? val.get(curr) : val[curr];

        i++;
    }

    return val;
}
