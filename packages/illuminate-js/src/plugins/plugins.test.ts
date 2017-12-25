import { addPlugin, resetPlugins, addLanguage, highlight } from '../illuminate';
import { json } from '../languages/json';

import { lineNumbers } from './lineNumbers';
import { showLanguage } from './showLanguage';

addLanguage('json', json);

const code = `[
  {
    "id": 1,
    "first_name": "Edan",
    "last_name": "Lauks",
    "email": "elauks0@zimbio.com"
  }, {
    "id": 2,
    "first_name": "Maggi",
    "last_name": "Osipenko",
    "email": "mosipenko1@harvard.edu"
  }
]`;

describe('Plugins Tests', () => {
    afterEach(() => {
        resetPlugins();
    });

    test('`lineNumbers` plugins shows line numbers', () => {
        addPlugin(lineNumbers);
        const hc = highlight(code, 'json');
        const match = hc.match(/<span class="line-number"><\/span>/g) || [];

        expect(match.length).toBe(13);
        expect(hc).toMatchSnapshot();
    });

    test('`showLanguage` plugins the highlighted language', () => {
        addPlugin(showLanguage);
        const hc = highlight(code, 'json');

        expect(hc.includes('<span class="show-language">json</span>')).toBe(true);
        expect(hc).toMatchSnapshot();
    });
});
