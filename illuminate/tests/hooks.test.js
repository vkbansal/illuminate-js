import { add, run } from '../src/hooks';

const noop = () => null;

describe('hooks', () => {
    let i = 0;

    describe('add', () => {
        it('should accept nonempty string', () => {
            expect(() => add()).toThrow();
            expect(() => add('', noop)).toThrow();
            expect(() => add({foo: 'bar'}, noop)).toThrow();
            expect(() => add(['bar'], noop)).toThrow();
            expect(() => add(/foo/, noop)).toThrow();
            expect(() => add(noop, noop)).toThrow();
            expect(() => add('foo', () => i++)).not.toThrow();
        });

        it('should accept only a function as callback', () => {
            expect(() => add('foo', {})).toThrow();
            expect(() => add('foo', [])).toThrow();
            expect(() => add('foo', 'bar')).toThrow();
            expect(() => add('foo', /foo/)).toThrow();
            expect(() => add('foo', () => i++)).not.toThrow();
        });
    });

    describe('run', () => {
        it('should run callbacks', () => {
            run('foo');
            expect(i).toBe(2);
        });
    });
});
