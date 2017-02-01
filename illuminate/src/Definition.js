/* eslint-disable no-use-before-define */
import cloneDeep from 'lodash/cloneDeep';

function invalidParams(def) {
    return !(def instanceof Map) && (!Array.isArray(def) || !def.length || !def.every((value) => value.length === 2))
}

export default class Definition {
    constructor(def) {
        if (invalidParams(def)) {
            throw new Error('Invalid arguments provided to Lang constructor');
        }

        this.__def = def instanceof Map ? def : new Map(def);
    }

    clone = () => new Definition(cloneDeep(this.__def));

    extend = (def) => {
        if (invalidParams(def)) {
            throw new Error(`extend requires Map`);
        }

        const extendedLang = cloneDeep(this.__def);

        for (const [key, value] of def) {
            extendedLang.set(key, value);
        }

        return new Definition(extendedLang);
    }

    insertBefore = (insertKey, def) => {
        if (invalidParams(def)) {
            throw new Error(`insertBefore requires Map`);
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

