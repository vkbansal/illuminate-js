import Definition from '../Definition';

export default new Definition([
    ['comment', /^[ \t]*;.*$/m],
    ['selector', /^[ \t]*\[.*?\]/m],
    ['constant', /^[ \t]*[^\s=]+?(?=[ \t]*=)/m],
    ['attr-value', {
        'pattern': /=.*/,
        'inside': new Definition([
            ['punctuation', /^[=]/]
        ])
    }]
]);
