import { add, run } from '../hooks';

const noop = () => null;

describe('hooks', () => {
    let i = 0;

    describe('add', () => {
        it('should accept nonempty string', () => {
            expect(() => add()).toThrow();
            expect(() => add('', noop)).toThrow();
            expect(() => add({ foo: 'bar' }, noop)).toThrow();
            expect(() => add(['bar'], noop)).toThrow();
            expect(() => add(/foo/, noop)).toThrow();
            expect(() => add(noop, noop)).toThrow();
            expect(() => add('after-highlight', () => i++)).not.toThrow();
        });

        it('should accept only a function as callback', () => {
            expect(() => add('after-highlight', {})).toThrow();
            expect(() => add('after-highlight', [])).toThrow();
            expect(() => add('after-highlight', 'bar')).toThrow();
            expect(() => add('after-highlight', /foo/)).toThrow();
            expect(() => add('after-highlight', () => i++)).not.toThrow();
        });
    });

    describe('run', () => {
        it('should run callbacks', () => {
            run('after-highlight');
            expect(i).toBe(2);
        });
    });
});
