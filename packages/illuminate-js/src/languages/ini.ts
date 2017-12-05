import { Definition, TokenTypes } from '../illuminate';

export const ini: Definition = new Map<string, TokenTypes>([
    ['comment', /^[ \t]*;.*$/m],
    ['selector', /^[ \t]*\[.*?\]/m],
    ['constant', /^[ \t]*[^\s=]+?(?=[ \t]*=)/m],
    [
        'attr-value',
        {
            pattern: /=.*/,
            inside: new Map<string, TokenTypes>([['punctuation', /^[=]/]])
        }
    ]
]);
