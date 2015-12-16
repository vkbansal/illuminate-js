"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var diff = {
    coord: [
    // Match all kinds of coord lines (prefixed by "+++", "---" or "***").
    /^(?:\*{3}|-{3}|\+{3}).*$/m,
    // Match "@@ ... @@" coord lines in unified diff.
    /^@@.*@@$/m,
    // Match coord lines in normal diff (starts with a number).
    /^\d+.*$/m],

    // Match inserted and deleted lines. Support both +/- and >/< styles.
    deleted: /^[-<].+$/m,
    inserted: /^[+>].+$/m,

    // Match "different" lines (prefixed with "!") in context diff.
    diff: {
        pattern: /^!(?!!).+$/m,
        alias: "important"
    },
    _order: ["coord", "deleted", "inserted", "diff"]
};

exports.diff = diff;