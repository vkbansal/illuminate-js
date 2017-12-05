import { ini as lang } from '../ini';
import { tokenize } from '../../illuminate';
import { tokenToJson } from './__helpers';

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
        expect(tokenToJson(tokenize(attrInput, lang))).toMatchSnapshot();
    });

    test('comments', () => {
        expect(tokenToJson(tokenize(commentInput, lang))).toMatchSnapshot();
    });

    test('important', () => {
        expect(tokenToJson(tokenize(importantInput, lang))).toMatchSnapshot();
    });
});
