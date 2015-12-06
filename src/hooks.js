"use strict";

let hooks = {};

export function add(name, callback) {
    if (!hooks[name])  hooks[name] = [];

    hooks[name].push(callback);
};

export function run(name, env) {
    let callbacks = hooks[name];

    if (!callbacks || !callbacks.length) {
        return;
    }

    callbacks.forEach((callback) => callback(env));
};
