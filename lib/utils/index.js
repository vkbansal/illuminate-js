"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _encode = require("./encode");

Object.defineProperty(exports, "encode", {
  enumerable: true,
  get: function get() {
    return _encode.default;
  }
});

var _insert = require("./insert");

Object.defineProperty(exports, "insertBefore", {
  enumerable: true,
  get: function get() {
    return _insert.before;
  }
});
Object.defineProperty(exports, "insertAfter", {
  enumerable: true,
  get: function get() {
    return _insert.after;
  }
});