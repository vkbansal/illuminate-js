import javascript from './javascript';
import markup from './markup';

const jsx = markup.extend(javascript.clone());

jsx.setIn(['tag', 'pattern'], /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i);
jsx.setIn(['tag', 'inside', 'attr-value', 'pattern'], /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i);

const jsxExpression = jsx.clone();

jsxExpression.delete('punctuation');

jsxExpression.insertBefore('operator', [
    ['punctuation', /=(?={)|[{}[\];(),.:]/]
]);


jsx.getIn(['tag', 'inside']).insertBefore('attr-value', [
    ['script', {
        // Allow for one level of nesting
        pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
        inside: jsxExpression,
        'alias': 'language-javascript'
    }]
]);

export default jsx;
