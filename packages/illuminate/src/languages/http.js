import Definition from '../Definition';

import javascript from './javascript';
import markup from './markup';

const http = new Definition([
    ['request-line', {
        pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
        inside: new Definition([
            // HTTP Verb
            ['property', /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/],
            // Path or query argument
            ['attr-name', /:\w+/]
        ])
    }],
    ['response-status', {
        pattern: /^HTTP\/1.[01] [0-9]+.*/m,
        inside: new Definition([
            // Status, e.g. 200 OK
            ['property', {
                pattern: /(^HTTP\/1.[01] )[0-9]+.*/i,
                lookbehind: true
            }]
        ])
    }],
    // HTTP header name
    ['header-name', {
        pattern: /^[\w-]+:(?=.)/m,
        alias: 'keyword'
    }]
]);

// Create a mapping of Content-Type headers to language definitions
const httpLanguages = {
    'application/json': javascript,
    'application/xml': markup,
    'text/xml': markup,
    'text/html': markup
};

// Insert each content type parser that has its associated language
// currently loaded.

const options = [];

for (const contentType in httpLanguages) {
    if (!httpLanguages.hasOwnProperty(contentType)) continue;

    options.push(
        [contentType, {
            pattern: new RegExp(`(content-type:\\s*${contentType}[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*`, 'i'),
            lookbehind: true,
            inside: new Definition([
                ['rest', httpLanguages[contentType]]
            ])
        }]
    );
}

http.insertBefore('header-name', options);

export default http;
