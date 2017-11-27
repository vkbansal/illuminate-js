import { highlight, getLanguage } from '../src/illuminate';
import Definition from '../src/Definition';

describe('illuminate', () => {
    describe('getLanguage', () => {
        it('should return a language', () => {
            expect(getLanguage('clike')).toBeInstanceOf(Definition);
        });

        it('should return false when language not found', () => {
            expect(getLanguage('foo')).toBe(false);
        });
    });

    describe('highlight', () => {
        it('should highlight given text', () => {
            expect(highlight('if (a > b)', 'clike')).toMatchSnapshot();
        });
    });
});
