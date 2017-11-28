import { Token } from '../Token';

describe('Token', () => {
    describe('stringify', () => {
        test('works with string', () => {
            expect(Token.stringify('test')).toBe('test');
        });

        test('works with single token', () => {
            const token = new Token('keyword', 'TESTING');

            expect(Token.stringify(token)).toBe(
                '<span class="token keyword keyword-testing" >TESTING</span>'
            );
        });

        test('works with array of tokens', () => {
            const tokens = [
                new Token('keyword', 'TESTING'),
                new Token('foo', 'TESTING'),
                new Token('bar', 'TESTING')
            ];

            expect(Token.stringify(tokens)).toBe(
                '<span class="token keyword keyword-testing" >TESTING</span><span class="token foo" >TESTING</span><span class="token bar" >TESTING</span>'
            );
        });

        test('works with comment token', () => {
            const string = new Token('comment', 'TESTING');

            expect(Token.stringify(string)).toBe(
                '<span class="token comment" spellcheck="true" >TESTING</span>'
            );
        });

        test('works with token alias', () => {
            const string = new Token('comment', 'TESTING', 'alias');

            expect(Token.stringify(string)).toBe(
                '<span class="token comment alias" spellcheck="true" >TESTING</span>'
            );
        });

        test('works with token alias array', () => {
            const string = new Token('comment', 'TESTING', ['alias1', 'alias2']);

            expect(Token.stringify(string)).toBe(
                '<span class="token comment alias1 alias2" spellcheck="true" >TESTING</span>'
            );
        });

        test('works with punctuation token "( )"', () => {
            const string = new Token('punctuation', '(');

            expect(Token.stringify(string)).toBe(
                '<span class="token punctuation brackets-parentheses" >(</span>'
            );
        });

        test('works with punctuation token "< >"', () => {
            const string = new Token('punctuation', '<');

            expect(Token.stringify(string)).toBe(
                '<span class="token punctuation brackets-angle" ><</span>'
            );
        });

        test('works with punctuation token "[ ]"', () => {
            const string = new Token('punctuation', '[');

            expect(Token.stringify(string)).toBe(
                '<span class="token punctuation brackets-square" >[</span>'
            );
        });

        test('works with punctuation token "{ }"', () => {
            const string = new Token('punctuation', '}');

            expect(Token.stringify(string)).toBe(
                '<span class="token punctuation brackets-braces" >}</span>'
            );
        });

        test('works with punctuation token "{ }"', () => {
            const string = new Token('punctuation', '{');

            expect(Token.stringify(string)).toBe(
                '<span class="token punctuation brackets-braces" >{</span>'
            );
        });
    });
});
