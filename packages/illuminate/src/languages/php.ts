import { clike } from './clike';
// import { markup } from './markup';
import { Definition, TokenTypes } from '../illuminate';
import { clone, insertBefore } from '../utils';

const php: Definition = clone(clike);
php.set('string', {
    pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
    greedy: true
});
php.set(
    'keyword',
    /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i
);
php.set('constant', /\b[A-Z0-9_]{2,}\b/);
php.set('comment', {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
});

// Shell-like comments are matched after strings, because they are less
// common than strings containing hashes...
insertBefore(
    php,
    'class-name',
    new Map([
        [
            'shell-comment',
            {
                pattern: /(^|[^\\])#.*/,
                lookbehind: true,
                alias: 'comment'
            }
        ]
    ])
);

insertBefore(
    php,
    'keyword',
    new Map<string, TokenTypes>([
        [
            'delimiter',
            {
                pattern: /\?>|<\?(?:php|=)?/i,
                alias: 'important'
            }
        ],
        ['variable', /\$\w+\b/i],
        [
            'package',
            {
                pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
                lookbehind: true,
                inside: new Map([['punctuation', /\\/]])
            }
        ]
    ])
);

// Must be defined after the function pattern
insertBefore(
    php,
    'operator',
    new Map([
        [
            'property',
            {
                pattern: /(->)[\w]+/,
                lookbehind: true
            }
        ]
    ])
);

insertBefore(
    php,
    'variable',
    new Map<string, TokenTypes>([
        ['this', /\$this\b/],
        [
            'global',
            /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/
        ],
        [
            'scope',
            {
                pattern: /\b[\w\\]+::/,
                inside: new Map([['keyword', /static|self|parent/], ['punctuation', /::|\\/]])
            }
        ]
    ])
);

// Add HTML support of the markup language exists
// if (Prism.languages.markup) {
//
//     // Tokenize all inline PHP blocks that are wrapped in <?php ?>
//     // This allows for easy PHP + markup highlighting
//     Prism.hooks.add('before-highlight', function(env) {
//         if (env.language !== 'php') {
//             return;
//         }
//
//         env.tokenStack = [];
//
//         env.backupCode = env.code;
//         env.code = env.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/ig, function(match) {
//             env.tokenStack.push(match);
//
//             return '{{{PHP' + env.tokenStack.length + '}}}';
//         });
//     });
//
//     // Restore env.code for other plugins (e.g. line-numbers)
//     Prism.hooks.add('before-insert', function(env) {
//         if (env.language === 'php') {
//             env.code = env.backupCode;
//             delete env.backupCode;
//         }
//     });
//
//     // Re-insert the tokens after highlighting
//     Prism.hooks.add('after-highlight', function(env) {
//         if (env.language !== 'php') {
//             return;
//         }
//
//         for (var i = 0, t; t = env.tokenStack[i]; i++) {
//             // The replace prevents $$, $&, $`, $', $n, $nn from being interpreted as special patterns
//             env.highlightedCode = env.highlightedCode.replace('{{{PHP' + (i + 1) + '}}}', Prism.highlight(t, env.grammar, 'php').replace(/\$/g, '$$$$'));
//         }
//
//         env.element.innerHTML = env.highlightedCode;
//     });
//
//     // Wrap tokens in classes that are missing them
//     Prism.hooks.add('wrap', function(env) {
//         if (env.language === 'php' && env.type === 'markup') {
//             env.content = env.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, "<span class=\"token php\">$1</span>");
//         }
//     });
//
// Add the rules before all others

export { php };
