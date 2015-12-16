"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clone = clone;
exports.extend = extend;
exports.insertBefore = insertBefore;
exports.insertAfter = insertAfter;

var _extendShallow = require("extend-shallow");

var _extendShallow2 = _interopRequireDefault(_extendShallow);

var _cloneDeep = require("clone-deep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isPlainObject = require("is-plain-object");

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _arrayDiffer = require("array-differ");

var _arrayDiffer2 = _interopRequireDefault(_arrayDiffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function clone(obj) {
    return (0, _cloneDeep2.default)(obj);
}

function extend(source, ext) {
    var srcOrder = source._order;
    var extOrder = ext._order;
    var props = _objectWithoutProperties(ext, ["_order"]);
    var extKeys = Object.keys(props);

    var newTokens = (0, _arrayDiffer2.default)(extKeys, srcOrder);

    var def = clone(source);

    return (0, _extendShallow2.default)(def, ext, {
        _order: srcOrder.concat(newTokens)
    });
}

function insertBefore(source, before, insert) {
    var _source$_order;

    if (!(0, _isPlainObject2.default)(source) || !source.hasOwnProperty("_order") || !Array.isArray(source._order)) {
        throw new Error("Source does not have required property '_order' as an array.");
    }

    if (!(0, _isPlainObject2.default)(insert) || !insert.hasOwnProperty("_order") || !Array.isArray(insert._order)) {
        throw new Error("insert does not have required property '_order' as an array");
    }

    source._order = (0, _arrayDiffer2.default)(source._order, Object.keys(insert));

    var index = source._order.indexOf(before);

    (_source$_order = source._order).splice.apply(_source$_order, [index, 0].concat(_toConsumableArray(insert._order)));

    delete insert._order;

    return (0, _extendShallow2.default)(source, insert);
}

function insertAfter(source, after, insert) {
    var _source$_order2;

    if (!(0, _isPlainObject2.default)(source) || !source.hasOwnProperty("_order") || !Array.isArray(source._order)) {
        throw new Error("Source does not have required property '_order' as an array.");
    }

    if (!(0, _isPlainObject2.default)(insert) || !insert.hasOwnProperty("_order") || !Array.isArray(insert._order)) {
        throw new Error("insert does not have required property '_order' as an array");
    }

    var index = source._order.indexOf(after);

    (_source$_order2 = source._order).splice.apply(_source$_order2, [index + 1, 0].concat(_toConsumableArray(insert._order)));

    delete insert._order;

    return (0, _extendShallow2.default)(source, insert);
}