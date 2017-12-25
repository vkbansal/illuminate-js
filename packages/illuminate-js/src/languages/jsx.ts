import { javascript } from './javascript';
import { markup } from './markup';
import { clone, setIn, getIn, insertBefore } from '../utils';
import { Definition } from '../illuminate';

let jsx: Definition = clone(markup);

javascript.forEach((value, key) => jsx.set(key, value));

setIn(
    jsx,
    ['tag', 'pattern'],
    /<\/?[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+|(?:\{\{?[^}]*\}?\})))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?>/i
);
setIn(
    jsx,
    ['tag', 'inside', 'attr-value', 'pattern'],
    /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i
);

insertBefore(
    getIn<Definition>(jsx, ['tag', 'inside']),
    'attr-name',
    new Map([
        [
            'spread',
            {
                pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
                inside: new Map([['punctuation', /\.{3}|[{}.]/], ['attr-value', /\w+/]])
            }
        ]
    ])
);

let jsxExpression = clone(jsx);
jsxExpression.delete('punctuation');

jsxExpression = insertBefore(
    jsxExpression,
    'operator',
    new Map([['punctuation', /=(?={)|[{}[\];(),.:]/]])
);

insertBefore(
    getIn(jsx, ['tag', 'inside']),
    'attr-value',
    new Map([
        [
            'script',
            {
                // Allow for one level of nesting
                pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
                inside: jsxExpression,
                alias: 'language-javascript'
            }
        ]
    ])
);

export { jsx };
