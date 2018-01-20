import { Definition, Tokens } from '../illuminate';

export const ini: Definition = new Map<string, Tokens>([
    ['comment', /^[ \t]*;.*$/m],
    ['selector', /^[ \t]*\[.*?\]/m],
    ['constant', /^[ \t]*[^\s=]+?(?=[ \t]*=)/m],
    [
        'attr-value',
        {
            pattern: /=.*/,
            inside: new Map<string, Tokens>([['punctuation', /^[=]/]])
        }
    ]
]);
