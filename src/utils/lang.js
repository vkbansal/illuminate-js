"use strict";

export function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === id) return i;
    }

    return -1;
}

export function extend(source, ext) {
    let src = source.slice(0);

    for (let i = 0; i < ext.length; i++) {
        let index = findIndex(src, ext[i][0]);

        if (index < 0) {
            src.push(ext[i]);
            continue;
        }

        src.splice(index, 1, ext[i]);
    }

    return src;
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
