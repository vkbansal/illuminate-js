"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = encode;

var _token = require("../token");

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function encode(tokens) {
    if (tokens instanceof _token2.default) {
        return new _token2.default(tokens.type, encode(tokens.content), tokens.alias);
    } else if (Array.isArray(tokens)) {
        return tokens.map(encode);
    } else {
        return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00a0/g, " ");
    }
}