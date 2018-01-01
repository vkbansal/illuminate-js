import { HighlightEnv } from './illuminate';
import { TokenEnv } from './Token';

export { TokenEnv };

const hooks: Record<string, Set<(...args: any[]) => HighlightEnv | TokenEnv>> = {};

export function add(
    name: 'after-highlight' | 'before-highlight' | 'wrap',
    callback: (env: HighlightEnv | TokenEnv) => HighlightEnv | TokenEnv
): void {
    if (typeof name !== 'string' || name.length < 1) {
        throw new Error('Name must be string of length > 1');
    }

    if (typeof callback !== 'function') {
        throw new Error(
            `hooks.add expects a function to be passed as a callback but ${typeof callback}:${callback} given`
        );
    }

    if (!hooks[name]) hooks[name] = new Set();

    hooks[name].add(callback);
}

export function run(name: string, env: HighlightEnv | TokenEnv): HighlightEnv | TokenEnv | void {
    const callbacks = hooks[name];

    if (!callbacks || !callbacks.size) {
        return;
    }

    return [...callbacks].reduce<HighlightEnv | TokenEnv>((p, callback) => callback(p), env);
}

export function reset() {
    for (let key in hooks) {
        delete hooks[key];
    }
}
