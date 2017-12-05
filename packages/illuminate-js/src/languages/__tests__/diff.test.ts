import { sql as lang } from '../sql';
import { tokenize } from '../../illuminate';
import { tokenToJson } from './__helpers';

const defInput = `!     qt: core

-    qt: core
+    qt: core gui

< qt: core
> qt: core quick
`;

const coordInput = `
7c7

*** 4,8 ****
--- 4,8 ----

@@ -4,5 +4,5 @@
`;

describe('diff lang test', () => {
    test('snapshot', () => {
        expect(tokenToJson(tokenize(defInput, lang))).toMatchSnapshot();
        expect(tokenToJson(tokenize(coordInput, lang))).toMatchSnapshot();
    });
});
