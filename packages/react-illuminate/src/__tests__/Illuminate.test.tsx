import * as React from 'react';
import { addLanguage } from 'illuminate-js';
import { clike } from 'illuminate-js/lib/languages/clike';
import { shallow } from 'enzyme';

import { Illuminate } from '../Illuminate';

describe('<Illuminate /> test', () => {
    beforeAll(() => {
        addLanguage('clike', clike);
    });

    it('should highlight given text', () => {
        const component = shallow(<Illuminate lang="clike">if (a > b)</Illuminate>);
        expect(component).toMatchSnapshot();
    });
});
