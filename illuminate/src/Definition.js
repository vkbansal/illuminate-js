/* eslint-disable no-use-before-define */
function invalidParams(def) {
    return !(def instanceof Definition) && !(def instanceof Map) && (!Array.isArray(def) || !def.length || !def.every((value) => value.length === 2));
}

function clone(val, key) {
    if (val.inside) {
        return Object.assign({}, val, {
            inside: val.inside.clone()
        });
    } else if (key === 'rest' || (val instanceof Definition)) {
        return val.clone();
    } else if (Array.isArray(val)) {
        return val.map(clone);
    }

    return val;
}

export default class Definition {
    constructor(def) {
        if (invalidParams(def)) {
            throw new Error('Invalid arguments provided to Definition constructor');
        }

        this.__def = def instanceof Map ? def : new Map(def);
    }

    clone = () => {
        const temp = new Map();

        for (const [key, value] of this.__def) {
            temp.set(key, clone(value));
        }

        return new Definition(temp);
    };

    extend = (def) => {
        if (invalidParams(def)) {
            throw new Error(`Invalid arguments provided to extend`);
        }

        const extendedLang = new Map(this.__def);

        for (const [key, value] of def) {
            extendedLang.set(key, value);
        }

        return new Definition(extendedLang);
    }

    insertBefore = (insertKey, def) => {
        if (invalidParams(def)) {
            throw new Error(`Invalid arguments provided to insertBefore`);
        }

        const temp = new Map();

        for (const [key, value] of this.__def) {
            if (key === insertKey) {
                for (const [key2, value2] of def) {
                    temp.set(key2, value2);
                }
            }

            temp.set(key, value);
        }

        this.__def = temp;
    };

    * [Symbol.iterator]() {
        for (const entry of this.__def) {
            yield entry;
        }
    }

    set = (key, value) => this.__def.set(key, value);

    get = (key) => this.__def.get(key);

    delete = (key) => this.__def.delete(key);

    setIn = (keys, value) => {
        if (!Array.isArray(keys) || !keys.length) {
            throw new Error('setIn requires an non-empty array as first parameter');
        }

        if (keys.length === 1) {
            return this.set(keys[0], value);
        }

        let val = this.__def;
        let i = 0;

        while (i < keys.length - 1) {
            if (typeof val === 'undefined' || val === null) {
                throw new Error(`Cannot resolve the path [${keys.join(', ')}]`);
            }

            val = isDefLike(val) ? val.get(keys[i]) : val[keys[i]];

            i++;
        }

        if (isDefLike(val)) {
            val.set(keys[i], value);
        } else {
            val[keys[i]] = value;
        }
    };

    getIn = (keys) => {
        if (!Array.isArray(keys) || !keys.length) {
            throw new Error('getIn requires an non-empty array as first parameter');
        }

        let val = this.__def;
        let i = 0;

        while (i < keys.length) {
            if (typeof val === 'undefined' || val === null) {
                throw new Error(`Cannot resolve the path [${keys.join(', ')}]`);
            }

            val = (val instanceof Definition || val instanceof Map)
                    ? val.get(keys[i])
                    : val[keys[i]];
            i++;
        }

        return val;
    };
}

export function isDefLike(val) {
    return val instanceof Definition || val instanceof Map;
}

