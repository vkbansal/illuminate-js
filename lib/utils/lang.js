"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findIndex = findIndex;
exports.extend = extend;
exports.insertBefore = insertBefore;
exports.insertAfter = insertAfter;
function findIndex(arr, id) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][0] === id) return i;
    }

    return -1;
}

function extend(source, ext) {
    var src = source.slice(0);

    for (var i = 0; i < ext.length; i++) {
        var index = findIndex(src, ext[i][0]);

        if (index < 0) {
            src.push(ext[i]);
            continue;
        }

        src.splice(index, 1, ext[i]);
    }

    return src;
}

function insertBefore(arr, key) {
    var index = findIndex(arr, key);

    if (index > -1) {
        for (var _len = arguments.length, insert = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            insert[_key - 2] = arguments[_key];
        }

        arr.splice.apply(arr, [index, 0].concat(insert));
    }
}

function insertAfter(arr, key) {
    var index = findIndex(arr, key);

    if (index > -1) {
        for (var _len2 = arguments.length, insert = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            insert[_key2 - 2] = arguments[_key2];
        }

        arr.splice.apply(arr, [index + 1, 0].concat(insert));
    }
}