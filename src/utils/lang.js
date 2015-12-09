"use strict";

export function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === id) return i;
    }

    return -1;
}

export function insertBefore(arr, key, ...insert) {
    let index = findIndex(arr, key);

    if (index > -1) {
        arr.splice(index, 0, ...insert);
    }
}

export function insertAfter(arr, key, ...insert) {
    let index = findIndex(arr, key);

    if (index > -1) {
        arr.splice(index + 1, 0, ...insert);
    }
}
