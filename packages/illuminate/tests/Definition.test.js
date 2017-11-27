import Definition from '../src/Definition';

describe('Lang test', () => {
    let testLang;

    beforeEach(() => {
        testLang = new Definition([
            ['foo', 1],
            ['bar', 2],
            ['baz', new Definition([
                ['foo', 4],
                ['bar', 5],
                ['baz', [6, 7, 8]]
            ])]
        ]);
    });

    test('requires \'List of pairs\' as a constructor argument', () => {
        expect(() => new Definition()).toThrow();
        expect(() => new Definition([])).toThrow();
        expect(() => new Definition([[]])).toThrow();
        expect(() => new Definition([['foo']])).toThrow();
        expect(() => new Definition([['foo', 'bar']])).not.toThrow();
    });

    test('should be iterable', () => {
        const dump = [];
        const test = () => {
            for (const [key, value] of testLang) {
                dump.push([key, value]);
            }
        };

        expect(test).not.toThrow();
        expect(dump.length).toBe(3);
        expect(dump.map((e) => e[0])).toEqual(['foo', 'bar', 'baz']);
    });

    test('set/get(s) the correct value', () => {
        const testValue = 2;
        const testKey = 'foo';

        testLang.set(testKey, testValue);
        expect(testLang.__def.get(testKey)).toBe(testValue);
        expect(testLang.get(testKey)).toBe(testValue);
    });

    test('getIn works', () => {
        expect(testLang.getIn(['foo'])).toBe(1);
        expect(testLang.getIn(['baz', 'foo'])).toBe(4);
        expect(testLang.getIn(['baz', 'baz', 2])).toBe(8);
        expect(() => testLang.getIn(['foo', 'baz', 2])).toThrow();
    });

    test('setIn works', () => {
        testLang.setIn(['foo'], 2);
        expect(testLang.__def.get('foo')).toBe(2);
        testLang.setIn(['baz', 'foo'], 8);
        expect(testLang.getIn(['baz', 'foo'])).toBe(8);
        testLang.setIn(['baz', 'baz', 1], 32);
        expect(testLang.getIn(['baz', 'baz', 1])).toBe(32);
    });

    test('delete works', () => {
        testLang.delete('baz');
        expect(testLang.__def.get('baz')).toBeUndefined();
    });

    test('clone works', () => {
        const clone = testLang.clone();

        clone.setIn(['baz', 'baz', 2], 100);
        clone.set('foo', 10);
        testLang.set('foo', 100);

        expect(testLang.getIn(['baz', 'baz', 2])).toBe(8);
        expect(testLang.getIn(['foo'])).toBe(100);

        expect(clone.getIn(['baz', 'baz', 2])).toBe(100);
        expect(clone.getIn(['foo'])).toBe(10);
    });
});
