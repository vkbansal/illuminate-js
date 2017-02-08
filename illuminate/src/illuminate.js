import Definition from './Definition';
import Token from './Token';
import { add as addHook, run as runHook } from './hooks';
import { encode } from './utils';
import * as languages from './languages';

export function tokenize(text, grammar) {
    if (!(grammar instanceof Definition)) {
        throw new Error('A grammar must have an instance of Language class');
    }

    const startArray = [text];

    if (grammar.get('rest') instanceof Definition) {
        for (const [token, def] of grammar.get('rest')) {
            grammar.set(token, def);
        }

        grammar.delete('rest');
    }

    tokenloop:
    for (const [token, def] of grammar) {
        const patterns = Array.isArray(def) ? def : [def];

        for (let j = 0; j < patterns.length; ++j) {
            let pattern = patterns[j];
            let lookbehindLength = 0;
            const { inside, lookbehind, alias, greedy } = pattern;

            if (greedy && !pattern.pattern.global) {
                const flags = pattern.pattern.toString().match(/[imuy]*$/)[0];

                pattern.pattern = RegExp(pattern.pattern.source, `${flags}g`);
            }

            pattern = pattern.pattern || pattern;

            for (let i = 0; i < startArray.length; i++) { // Don’t cache length as it changes during the loop
                const node = startArray[i];

                // Something went terribly wrong, ABORT, ABORT!
                if (startArray.length > text.length) {
                    break tokenloop;
                }

                if (node instanceof Token) {
                    continue;
                }

                pattern.lastIndex = 0;

                let match = pattern.exec(node);

                if (!match) {
                    continue;
                }

                if (lookbehind) {
                    lookbehindLength = match[1].length;
                }


                const stringFrom = match.index - 1 + lookbehindLength;

                match = match[0].slice(lookbehindLength);

                const stringTo = stringFrom + match.length;
                const before = node.slice(0, stringFrom + 1);
                const after = node.slice(stringTo + 1);

                const args = [i, 1];

                if (before) {
                    args.push(before);
                }

                const wrapped = new Token(token, inside ? tokenize(match, inside) : match, alias);

                args.push(wrapped);

                if (after) {
                    args.push(after);
                }

                startArray.splice(...args);
            }
        }
    }

    return startArray;
}

export function getLanguage(name) {
    if (name in languages) return languages[name];

    return false;
}

export function highlight(text, language) {
    const grammar = getLanguage(language);
    const env = {
        grammar,
        language,
        code: text
    };

    runHook('before-highlight', env);

    const tokens = tokenize(env.code, env.grammar); // Specific for plugins
    const highlightedCode = Token.stringify(encode(tokens), language);

    env.highlightedCode = highlightedCode;
    runHook('after-highlight', env);

    return env.highlightedCode; // Specific for plugins
}

export function addPlugin(plugin) {
    if (typeof plugin !== 'function') {
        throw new Error('Given Plugin must be a function');
    }

    plugin(addHook);
}
