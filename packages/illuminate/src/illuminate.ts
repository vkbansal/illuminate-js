import { Token } from './Token';
import { add as addHook, run as runHook } from './hooks';
import { encode } from './utils';

export interface TokenObject {
    pattern: RegExp;
    inside?: Map<string, TokenTypes>;
    lookbehind?: boolean;
    greedy?: boolean;
    alias?: string;
}

export type TokenTypes = RegExp | TokenObject | Array<RegExp | TokenObject>;

export type Definition = Map<string, TokenTypes>;

export type Plugin = (a: typeof addHook) => void;

export function tokenize(text: string, grammar: Definition): Array<string | Token> {
    if (!(grammar instanceof Map)) {
        throw new Error('A grammar must be a Map');
    }

    const startArray: Array<string | Token> = [text];

    const rest = grammar.get('rest');

    if (rest instanceof Map) {
        for (const [token, def] of rest as Definition) {
            grammar.set(token, def);
        }

        //TODO: check if we need to shallow copy the grammar
        grammar.delete('rest');
    }

    tokenloop: for (const [token, def] of grammar) {
        const patterns = Array.isArray(def) ? def : [def];

        for (let j = 0; j < patterns.length; ++j) {
            const pattern = patterns[j];
            let lookbehindLength = 0;

            let regex = pattern instanceof RegExp ? pattern : pattern.pattern;

            const { inside, lookbehind, alias, greedy } = <TokenObject>pattern;

            if (greedy && !regex.global) {
                const flags = (regex.toString().match(/[imuy]*$/) || [''])[0];

                regex = RegExp(regex.source, `${flags}g`);
            }

            for (let i = 0; i < startArray.length; i++) {
                // Don’t cache length as it changes during the loop
                const node = startArray[i];

                // Something went terribly wrong, ABORT, ABORT!
                if (startArray.length > text.length) {
                    break tokenloop;
                }

                if (node instanceof Token) {
                    continue;
                }

                regex.lastIndex = 0;

                let match: RegExpExecArray | string | null = regex.exec(node);

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

                const inserts = [];

                if (before) {
                    inserts.push(before);
                }

                const wrapped = new Token(token, inside ? tokenize(match, inside) : match, alias);

                inserts.push(wrapped);

                if (after) {
                    inserts.push(after);
                }

                startArray.splice(i, 1, ...inserts);
            }
        }
    }

    return startArray;
}

export interface HighlightEnv {
    code: string;
    highlightedCode: string;
    grammar: Definition;
    language: string;
}

export function highlight(text: string, grammar: Definition, language: string): string {
    const env: HighlightEnv = {
        grammar,
        language,
        code: text,
        highlightedCode: ''
    };

    runHook('before-highlight', env);

    const tokens = tokenize(env.code, env.grammar); // Specific for plugins
    const highlightedCode = Token.stringify(encode(tokens), language);

    env.highlightedCode = highlightedCode;
    runHook('after-highlight', env);

    return env.highlightedCode; // Specific for plugins
}

export function addPlugin(plugin: Plugin) {
    if (typeof plugin !== 'function') {
        throw new Error('Given Plugin must be a function');
    }

    plugin(addHook);
}
