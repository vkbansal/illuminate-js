"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.add = add;
exports.run = run;
var hooks = {};

function add(name, callback) {
    if (!hooks[name]) hooks[name] = [];

    hooks[name].push(callback);
};

function run(name, env) {
    var callbacks = hooks[name];

    if (!callbacks || !callbacks.length) {
        return;
    }

    callbacks.forEach(function (callback) {
        return callback(env);
    });
};