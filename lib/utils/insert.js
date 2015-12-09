"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.before = before;
exports.after = after;

var _findIndex = require("lodash/array/findIndex");

var _findIndex2 = _interopRequireDefault(_findIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function before(arr, key) {
    var index = (0, _findIndex2.default)(arr, function (p) {
        return key === p[0];
    });

    if (index > -1) {
        for (var _len = arguments.length, insert = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            insert[_key - 2] = arguments[_key];
        }

        arr.splice.apply(arr, [index, 0].concat(insert));
    }
}

function after(arr, key) {
    var index = (0, _findIndex2.default)(arr, function (p) {
        return key === p[0];
    });

    if (index > -1) {
        for (var _len2 = arguments.length, insert = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            insert[_key2 - 2] = arguments[_key2];
        }

        arr.splice.apply(arr, [index + 1, 0].concat(insert));
    }
}