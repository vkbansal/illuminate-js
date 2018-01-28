import { Token } from './Token';
import { add as addHook, run as runHook, reset as resetHooks } from './hooks';
import { encode } from './utils';

export interface TokenObject {
    pattern: RegExp;
    inside?: Definition;
    lookbehind?: boolean;
    greedy?: boolean;
    alias?: string;
}

export type Tokens = RegExp | TokenObject | Array<RegExp | TokenObject>;

export type Definition = Map<string, Tokens | Map<string, Tokens>>;

export type Plugin = (a: typeof addHook) => void;

export const languages = new Map<string, Definition>();

/**
 * Converts the code to an `Array<string | Token>`, which can be used to write a render.
 * For example, `react-illuminate` uses this to tokenize the code string and render it using react components.
 *
 * @param text    The code to be tokenized
 * @param grammar The definition to be used for tokenizing
 *
 * @private
 *
 * @example
 * import { tokenize } from 'illuminate-js';
 * import { javascript } from 'illuminate-js/lib/languages';
 *
 * const code = `
 * ...
 * `;
 *
 * tokenize(code, javascript); // returns Array<string | Token>
 */
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
            let lookbehindLength: number = 0;

            let regex = pattern instanceof RegExp ? pattern : (pattern as TokenObject).pattern;

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

                const stringFrom: number = match.index - 1 + lookbehindLength;

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

/**
 * Highlights the given code. Returns the highlighted code in `string` format.
 *
 * @param text      The code string that is to be highlighted.
 * @param language  Name of the definition to be used. This name corresponds to
 *                  the name given to the definition using `addLanguage`.
 *
 * @example
 * import { addLanguage, highlight } from 'illuminate-js';
 * import { javascript } from 'illuminate-js/lib/languages';
 *
 * addLanguage('javascript', javascript);
 * addLanguage('js', javascript);
 *
 * const code = `
 * ...
 * `;
 *
 * highlight(code, 'js');
 */
export function highlight(text: string, language: string): string {
    const grammar = languages.get(language);

    if (!grammar) {
        throw new Error(
            `Your are trying to use ${language} language but its definition could not be found. Please make sure to use "addLanguage" to add your definition`
        );
    }

    let env: HighlightEnv = {
        grammar,
        language,
        code: text,
        highlightedCode: ''
    };

    env = <HighlightEnv>runHook('before-highlight', env) || env;

    const tokens = tokenize(env.code, env.grammar); // Specific for plugins
    const highlightedCode = Token.stringify(encode(tokens), language);

    env = Object.assign({}, env, { highlightedCode: highlightedCode }) || env;
    env = <HighlightEnv>runHook('after-highlight', env) || env;

    return env.highlightedCode; // Specific for plugins
}

/**
 * Helper to add a plugin.
 *
 * @param plugin The plugin to be added.
 *               See [Plugins](./#/plugins/) for more details.
 *
 * @example
 * import { addPlugin } from 'illuminate-js';
 * import { showLanguage } from 'illuminate-js/lib/plugins/showLanguage';
 *
 * addPlugin(showLanguage);
 */
export function addPlugin(plugin: Plugin) {
    if (typeof plugin !== 'function') {
        throw new Error('Given Plugin must be a function');
    }

    plugin(addHook);
}

/**
 * Removes all the plugins.
 *
 * @example
 * import { resetPlugins } from 'illuminate-js';
 *
 * resetPlugins();
 */
export function resetPlugins() {
    resetHooks();
}

/**
 * Add a language definition to a illuminate.
 * You can add same definition multiple times with different names
 *
 * @param name  The name of the language being added.
 *              This name will be used by `highlight` function.
 * @param def   The language `Definition` to be added.
 *
 * @example
 * import { addLanguage } from 'illuminate-js';
 * import { javascript } from 'illuminate-js/lib/languages';
 *
 * addLanguage('javascript', javascript);
 * addLanguage('js', javascript);
 */
export function addLanguage(name: string, def: Definition) {
    languages.set(name, def);
}

/**
 * Returns the language definition which was added using `addLanguage`.
 * Returns the `Definition` if found, else returns `undefined`.
 *
 * @param name The name of the language definition
 *
 * @private
 *
 * @example
 * import { addLanguage, getLanguage } from 'illuminate-js';
 * import { javascript } from 'illuminate-js/lib/languages';
 *
 * addLanguage('javascript', javascript);
 * addLanguage('js', javascript);
 *
 * getLanguage('js'); // returns javascript definition
 */
export function getLanguage(name: string): Definition | undefined {
    return languages.get(name);
}
