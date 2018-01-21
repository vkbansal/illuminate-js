import { javascript } from './javascript';
import { markup } from './markup';
import { Definition, Tokens, TokenObject } from '../illuminate';
import { insertBefore } from '../utils';

const http: Definition = new Map<string, Tokens>([
    [
        'request-line',
        {
            pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
            inside: new Map([
                // HTTP Verb
                ['property', /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/],
                // Path or query argument
                ['attr-name', /:\w+/]
            ])
        }
    ],
    [
        'response-status',
        {
            pattern: /^HTTP\/1.[01] \d+.*/m,
            inside: new Map([
                // Status, e.g. 200 OK
                [
                    'property',
                    {
                        pattern: /(^HTTP\/1.[01] )\d+.*/i,
                        lookbehind: true
                    }
                ]
            ])
        }
    ],
    // HTTP header name
    [
        'header-name',
        {
            pattern: /^[\w-]+:(?=.)/m,
            alias: 'keyword'
        }
    ]
]);

// Create a mapping of Content-Type headers to language definitions
const httpLanguages: Record<string, Definition> = {
    'application/json': javascript,
    'application/xml': markup,
    'text/xml': markup,
    'text/html': markup
};

// Insert each content type parser that has its associated language
// currently loaded.

const options = new Map<string, TokenObject>();

for (const contentType in httpLanguages) {
    if (!httpLanguages.hasOwnProperty(contentType)) continue;

    options.set(contentType, {
        pattern: new RegExp(
            `(content-type:\\s*${contentType}[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*`,
            'i'
        ),
        lookbehind: true,
        inside: new Map<string, Definition>([['rest', httpLanguages[contentType]]])
    } as TokenObject);
}

insertBefore(http, 'header-name', options);

export { http };
