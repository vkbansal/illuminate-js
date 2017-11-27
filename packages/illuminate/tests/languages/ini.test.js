import json from '../../src/languages/ini';
import { tokenize } from '../../src/illuminate';
import tokenToJson from '../helpers/tokenToJson';

const attrInput = `
foo=Bar Baz
foobar=42
`;

const commentInput = `
;
; foobar
`;

const importantInput = `
[batman]
[ironman]
`;

describe('ini lang test', () => {
    test('attributes', () => {
        expect(tokenToJson(tokenize(attrInput, json))).toMatchSnapshot();
    });

    test('comments', () => {
        expect(tokenToJson(tokenize(commentInput, json))).toMatchSnapshot();
    });

    test('important', () => {
        expect(tokenToJson(tokenize(importantInput, json))).toMatchSnapshot();
    });
});
