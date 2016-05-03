"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.add = add;
exports.run = run;
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