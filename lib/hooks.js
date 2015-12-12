"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.add = add;
exports.run = run;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var hooks = {};

function add(name, callback) {
    if (typeof name !== "string" || name.length < 1) {
        throw new Error("Name must be string of length > 1");
    }

    if (typeof callback !== "function") {
        throw new Error("hooks.add expects a function to be passed as a callback but " + (typeof callback === "undefined" ? "undefined" : _typeof(callback)) + ":" + callback + " given");
    }

    if (!hooks[name]) hooks[name] = [];

    hooks[name].push(callback);
}

function run(name, env) {
    var callbacks = hooks[name];

    if (!callbacks || !callbacks.length) {
        return;
    }

    callbacks.forEach(function (callback) {
        return callback(env);
    });
}

exports.default = { add: add, run: run };