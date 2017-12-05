import { highlight, addLanguage } from '../illuminate';
import { clike } from '../languages/clike';

describe('illuminate', () => {
    beforeAll(() => {
        addLanguage('clike', clike);
    });

    describe('highlight', () => {
        it('should highlight given text', () => {
            expect(highlight('if (a > b)', 'clike')).toMatchSnapshot();
        });
    });
});
