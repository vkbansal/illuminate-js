import { css } from 'glamor';

import 'glamor/reset';

css.global('code[class*="language-"],pre[class*="language-"]', {
    color: '#393A34',
    fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    fontSize: '0.95em',
    lineHeight: '1.2em',
    tabSize: 4,
    hyphens: 'none'
});

css.global(
    'pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection',
    {
        background: '#b3d4fc'
    }
);

css.global(
    'pre[class*="language-"]::selection, pre[class*="language-"] ::selection,code[class*="language-"]::selection, code[class*="language-"] ::selection',
    {
        background: '#b3d4fc'
    }
);

css.global('pre[class*="language-"]', {
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    border: '1px solid #dddddd',
    backgroundColor: 'white'
});

css.global(':not(pre) > code[class*="language-"],pre[class*="language-"]', {});

css.global(':not(pre) > code[class*="language-"]', {
    padding: '.2em',
    paddingTop: '1px',
    paddingBottom: '1px',
    background: '#f8f8f8',
    border: '1px solid #dddddd'
});

css.global('.token.comment, .token.prolog, .token.doctype, .token.cdata', {
    color: '#999988',
    fontStyle: 'italic'
});
css.global('.token.namespace', {
    opacity: 0.7
});
css.global('.token.string,.token.attr-value', {
    color: '#e3116c'
});
css.global('.token.punctuation,.token.operator', {
    color: '#393A34' /* no highlight */
});

css.global('.token.tag,.token.selector,.language-autohotkey .token.keyword', {
    color: '#00009f'
});

css.global(
    '.token.entity,.token.url,.token.symbol,.token.number,.token.boolean,.token.variable,.token.constant,.token.property,.token.regex,.token.inserted',
    {
        color: '#36acaa'
    }
);

css.global('.token.atrule,.token.keyword,.token.attr-name,.language-autohotkey .token.selector', {
    color: '#00a4db'
});

css.global('.token.function,.token.deleted,.language-autohotkey .token.tag', {
    color: '#9a050f'
});

css.global('.token.important,.token.function,.token.bold', {
    fontWeight: 'bold'
});

css.global('.token.italic', {
    fontStyle: 'italic'
});

css.global('#app', {
    minHeight: '100vh'
});
