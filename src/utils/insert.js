"use strict";

import findIndex from "lodash/array/findIndex";

export function before(arr, key, ...insert) {
    let index = findIndex(arr, (p) => key === p[0]);

    if (index > -1) {
        arr.splice(index, 0, ...insert);
    }
}

export function after(arr, key, ...insert) {
    let index = findIndex(arr, (p) => key === p[0]);

    if (index > -1) {
        arr.splice(index + 1, 0, ...insert);
    }
}
