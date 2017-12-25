import * as utils from '../utils';
import { Definition, TokenTypes, Tokenz } from '../illuminate';
import { Token } from '../Token';

describe('utils', () => {
    describe('encode', () => {
        test('works with string', () => {
            expect(utils.encode('<span>Fire & ice</span>')).toBe(
                '&lt;span&gt;Fire &amp; ice&lt;/span&gt;'
            );
        });

        test('works with Token', () => {
            const t = utils.encode(new Token('type', 'Fire & ice')) as Token;
            expect(t.content).toBe('Fire &amp; ice');
        });

        test('works with Array<string | Token>', () => {
            const t = utils.encode(['<span>Fire & ice</span>', new Token('type', 'Fire & ice')]);
            expect(t[0]).toBe('&lt;span&gt;Fire &amp; ice&lt;/span&gt;');
            expect(t[1].content).toBe('Fire &amp; ice');
        });
    });

    describe('clone', () => {
        test('works with Object', () => {
            const a = { foo: 'bar', _boo: 'baz' };
            const b = utils.clone(a);

            b.foo = '123';

            expect(a.foo).toBe('bar');
            expect(b.foo).not.toBe('bar');
        });

        test('works with Map', () => {
            const a = new Map([['foo', 'bar'], ['_boo', 'baz']]);
            const b = utils.clone(a);

            b.set('foo', '123');

            expect(a.get('foo')).toBe('bar');
            expect(b.get('foo')).not.toBe('bar');
        });

        test('works with Array', () => {
            const a = [new Map([['foo', 'bar'], ['_boo', 'baz']]), { foo: 'bar', _boo: 'baz' }];
            const b = utils.clone(a);

            (b[0] as Map<string, string>).set('foo', '123');
            (b[1] as Record<string, string>).foo = '123';

            expect((a[0] as Map<string, string>).get('foo')).toBe('bar');
            expect((b[0] as Map<string, string>).get('foo')).not.toBe('bar');
            expect((a[1] as Record<string, string>).foo).toBe('bar');
            expect((b[1] as Record<string, string>).foo).not.toBe('bar');
        });
    });

    test('insertBefore works', () => {
        let testLang = new Map<string, TokenTypes>([['foo', /1/], ['bar', /2/], ['baz', /3/]]);

        utils.insertBefore(testLang, 'bar', new Map<string, TokenTypes>([['bam', /4/]]));

        expect([...testLang.keys()]).toEqual(['foo', 'bam', 'bar', 'baz']);
        expect(testLang.get('bam')).toEqual(/4/);
    });

    test('setIn returns correct value', () => {
        let testLang = new Map<string, TokenTypes>([
            ['foo', /1/],
            ['bar', /2/],
            [
                'baz',
                new Map<string, Tokenz>([
                    ['foo', /4/],
                    ['bar', /5/],
                    ['baz', [/6/, /7/, { pattern: /8/ }]]
                ])
            ]
        ]);

        utils.setIn(testLang, ['baz', 'baz', '2', 'pattern'], /123/);
        utils.setIn(testLang, ['foo'], /23/);
        expect((testLang.get('baz') as Map<string, Tokenz>).get('baz')[2].pattern).toEqual(/123/);
        expect(testLang.get('foo')).toEqual(/23/);
    });

    test('getIn returns correct value', () => {
        let testLang = new Map<string, TokenTypes>([
            ['foo', /1/],
            ['bar', /2/],
            [
                'baz',
                new Map<string, Tokenz>([
                    ['foo', /4/],
                    ['bar', /5/],
                    ['baz', [/6/, /7/, { pattern: /8/ }]]
                ])
            ]
        ]);

        expect(utils.getIn(testLang, ['baz', 'baz', '2', 'pattern'])).toEqual(/8/);
    });
});
