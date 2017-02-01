import diff from '../../src/languages/diff';
import { tokenize } from '../../src/illuminate';
import tokenToJson from '../helpers/tokenToJson';

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
        expect(tokenToJson(tokenize(defInput, diff))).toMatchSnapshot();
        expect(tokenToJson(tokenize(coordInput, diff))).toMatchSnapshot();
    });
});
