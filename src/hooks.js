"use strict";

let hooks = {};

export function add(name, callback) {
    if (typeof name !== "string" || name.length < 1) {
        throw new Error("Name must be string of length > 1");
    }

    if (typeof callback !== "function") {
        throw new Error(`hooks.add expects a function to be passed as a callback but ${typeof callback}:${callback} given`);
    }

    if (!hooks[name]) hooks[name] = [];

    hooks[name].push(callback);
}

export function run(name, env) {
    let callbacks = hooks[name];

    if (!callbacks || !callbacks.length) {
        return;
    }

    callbacks.forEach((callback) => callback(env));
}

export default { add, run };
