import { json as lang } from '../json';
import { tokenize } from '../../illuminate';
import { tokenToJson } from './__helpers';

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
        expect(tokenToJson(tokenize(nativeValues, lang))).toMatchSnapshot();
    });

    test('nested values', () => {
        expect(tokenToJson(tokenize(nestedValues, lang))).toMatchSnapshot();
    });

    test('number values', () => {
        expect(tokenToJson(tokenize(numberValues, lang))).toMatchSnapshot();
    });

    test('string values', () => {
        expect(tokenToJson(tokenize(stringValues, lang))).toMatchSnapshot();
    });
});
