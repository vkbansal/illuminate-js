import { encode } from '../src/utils';

describe('utils', () => {
    test('encode special chars', () => {
        expect(encode('<span>Fire & ice</span>')).toBe('&lt;span&gt;Fire &amp; ice&lt;/span&gt;');
    });
});
