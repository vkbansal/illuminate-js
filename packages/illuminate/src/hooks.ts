interface Hooks {
    [key: string]: Set<(...args: any[]) => void>
}

const hooks: Hooks = {};

export function add(name: string, callback: (...args: any[]) => void) {
    if (typeof name !== 'string' || name.length < 1) {
        throw new Error('Name must be string of length > 1');
    }

    if (typeof callback !== 'function') {
        throw new Error(`hooks.add expects a function to be passed as a callback but ${typeof callback}:${callback} given`);
    }

    if (!hooks[name]) hooks[name] = new Set();

    hooks[name].add(callback);
}

export function run(name: string, env: object) {
    const callbacks = hooks[name];

    if (!callbacks || !callbacks.size) {
        return;
    }

    callbacks.forEach((callback) => callback(env));
}

export default { add, run };
