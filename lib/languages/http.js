"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.http = undefined;

var _utils = require("../utils");

var _javascript = require("./javascript");

var _markup = require("./markup");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var http = {
    "request-line": {
        pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
        inside: {
            // HTTP Verb
            property: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
            // Path or query argument
            "attr-name": /:\w+/,
            _order: ["property", "attr-name"]
        }
    },
    "response-status": {
        pattern: /^HTTP\/1.[01] [0-9]+.*/m,
        inside: {
            // Status, e.g. 200 OK
            property: {
                pattern: /(^HTTP\/1.[01] )[0-9]+.*/i,
                lookbehind: true
            },
            _order: ["property"]
        }
    },
    // HTTP header name
    "header-name": {
        pattern: /^[\w-]+:(?=.)/m,
        alias: "keyword"
    },
    _order: ["request-line", "request-status", "header-name"]
};

// Create a mapping of Content-Type headers to language definitions
var httpLanguages = {
    "application/json": _javascript.javascript,
    "application/xml": _markup.markup,
    "text/xml": _markup.markup,
    "text/html": _markup.markup
};

// Insert each content type parser that has its associated language
// currently loaded.
Object.keys(httpLanguages).forEach(function (contentType) {
    var _options;

    var options = (_options = {}, _defineProperty(_options, contentType, {
        pattern: new RegExp("(content-type:\\s*\"" + contentType + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
        lookbehind: true,
        inside: httpLanguages[contentType]
    }), _defineProperty(_options, "_order", [contentType]), _options);

    _utils.lang.insertBefore(http, "header-name", options);
});

exports.http = http;