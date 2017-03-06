import sql from '../../src/languages/sql';
import { tokenize } from '../../src/illuminate';
import tokenToJson from '../helpers/tokenToJson';

const strings = `
""
"fo\\"obar"
"foo
bar"
''
'fo\\'obar'
'foo
bar'
`;

const comments = `
/**/
/* foo
bar */
--
-- foo
//
// foo
#
# foo
`;

const variables = `
@foo
@foo_bar_42
@"fo"o-b
ar"
@'fo\'o-b
ar'
@\`fo\`o-b
ar\`
`;

describe('sql lang test', () => {
    test('strings', () => {
        expect(tokenToJson(tokenize(strings, sql))).toMatchSnapshot();
    });

    test('comments', () => {
        expect(tokenToJson(tokenize(comments, sql))).toMatchSnapshot();
    });

    test('variables', () => {
        expect(tokenToJson(tokenize(variables, sql))).toMatchSnapshot();
    });
});
