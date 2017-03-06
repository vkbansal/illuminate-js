import json from '../../src/languages/json';
import { tokenize } from '../../src/illuminate';
import tokenToJson from '../helpers/tokenToJson';

const nativeValues = `
{
    "foo": true
    "bar": false
    "baz": null
}
`;

const nestedValues = `
{
    "foo": ["test"],
    "bar": {
        "baz": null
    }
}
`;

const numberValues = `
{
    "foo": 23
    "bar": -456
    "baz": 123.456e-10
}
`;

const stringValues = `
{
    "foo": "bar",
    "bar": "baz"
}
`;

describe('json lang test', () => {
    test('native values', () => {
        expect(tokenToJson(tokenize(nativeValues, json))).toMatchSnapshot();
    });

    test('nested values', () => {
        expect(tokenToJson(tokenize(nestedValues, json))).toMatchSnapshot();
    });

    test('number values', () => {
        expect(tokenToJson(tokenize(numberValues, json))).toMatchSnapshot();
    });

    test('string values', () => {
        expect(tokenToJson(tokenize(stringValues, json))).toMatchSnapshot();
    });
});
