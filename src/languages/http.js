"use strict";

import { lang } from "../utils";
import { javascript } from "./javascript";
import { markup } from "./markup";

let http = {
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
let httpLanguages = {
    "application/json": javascript,
    "application/xml": markup,
    "text/xml": markup,
    "text/html": markup
};

// Insert each content type parser that has its associated language
// currently loaded.
Object.keys(httpLanguages).forEach((contentType) => {
    let options = {
        [contentType]: {
            pattern: new RegExp(`(content-type:\\s*"${contentType}[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*`, "i"),
            lookbehind: true,
            inside: httpLanguages[contentType]
        },
        _order: [contentType]
    };

    lang.insertBefore(http, "header-name", options);
});

export { http as http };
