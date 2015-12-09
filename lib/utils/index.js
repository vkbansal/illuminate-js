"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lang = exports.encode = undefined;

var _encode = require("./encode");

Object.defineProperty(exports, "encode", {
  enumerable: true,
  get: function get() {
    return _encode.default;
  }
});

var _lang2 = require("./lang");

var _lang = _interopRequireWildcard(_lang2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.lang = _lang;