import { highlight } from '../illuminate';
import { clike } from '../languages/clike';

describe('illuminate', () => {
    describe('highlight', () => {
        it('should highlight given text', () => {
            expect(highlight('if (a > b)', clike, 'clike')).toMatchSnapshot();
        });
    });
});
