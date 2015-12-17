"use strict";

import extendShallow from "extend-shallow";
import cloneDeep from "lodash.clonedeep";
import isObj from "is-plain-object";
import diff from "array-differ";


export function clone(obj) {
    return cloneDeep(obj);
}

export function extend(source, ext) {
    let { _order: srcOrder } = source,
        { _order: extOrder, ...props } = ext,
        extKeys = Object.keys(props);

    let newTokens = diff(extKeys, srcOrder);

    let def = clone(source);

    return extendShallow(def, ext, {
        _order: srcOrder.concat(newTokens)
    });
}

export function insertBefore(source, before, insert) {
    if (!isObj(source) || !source.hasOwnProperty("_order") || !Array.isArray(source._order)) {
        throw new Error("Source does not have required property '_order' as an array.");
    }

    if (!isObj(insert) || !insert.hasOwnProperty("_order") || !Array.isArray(insert._order)) {
        throw new Error("insert does not have required property '_order' as an array");
    }

    source._order = diff(source._order, Object.keys(insert));

    let index = source._order.indexOf(before);

    source._order.splice(index, 0, ...insert._order);

    delete insert._order;

    return extendShallow(source, insert);
}

export function insertAfter(source, after, insert) {
    if (!isObj(source) || !source.hasOwnProperty("_order") || !Array.isArray(source._order)) {
        throw new Error("Source does not have required property '_order' as an array.");
    }

    if (!isObj(insert) || !insert.hasOwnProperty("_order") || !Array.isArray(insert._order)) {
        throw new Error("insert does not have required property '_order' as an array");
    }

    let index = source._order.indexOf(after);

    source._order.splice(index + 1, 0, ...insert._order);

    delete insert._order;

    return extendShallow(source, insert);
}
