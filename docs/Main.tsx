/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<h1>Illuminate JS</h1>
<p><a href="https://npmjs.org/package/illuminate-js"><img src="https://img.shields.io/npm/v/illuminate-js.svg?style=flat-square" alt="NPM Version"></a>
<a href="https://david-dm.org/vkbansal/illuminate-js?path=packages/illuminate-js"><img src="https://david-dm.org/vkbansal/illuminate-js/status.svg?style=flat-square&amp;path=packages/illuminate-js" alt="Dependency Status"></a>
<a href="https://david-dm.org/vkbansal/illuminate-js?path=packages/illuminate-js&amp;type=dev"><img src="https://david-dm.org/vkbansal/illuminate-js/dev-status.svg?style=flat-square&amp;path=packages/illuminate-js" alt="Dev Dependency Status"></a></p>
<p>Illuminate is a syntax highlighter, based on the well known <a href="http://prismjs.com">prism.js</a>,
rewritten from the ground up in ES6 to be used with projects like
<a href="https://github.com/markdown-it/markdown-it">markdown-it</a>,
<a href="https://github.com/gatsbyjs/gatsby">gatsby</a>, <a href="https://facebook.github.io/react/">react</a>, etc.</p>
<h2>Install</h2>
<pre><code class="language-bash"><span class="token function" >npm</span> <span class="token function" >install</span> --save illuminate-js
</code></pre>
<h2>Usage</h2>
<p>Before you can use the highlighter, you will need to add the languages defintions you want to use,
as shown below. This helps in keeping the bundle size down.</p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addLanguage<span class="token punctuation" >,</span> highlight <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>

<span class="token comment" spellcheck="true" >// for example, if you want to highlight 'javascript'</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages/javascript'</span><span class="token punctuation" >;</span>

<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'javascript'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token comment" spellcheck="true" >// You can alias it too.</span>
<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token function" >highlight</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'Your code goes here'</span><span class="token punctuation" >,</span> <span class="token string" >'js'</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
<h2>Theming</h2>
<p>You can use any of the pre-existings PrismJS themes from <a href="https://github.com/PrismJS/prism/tree/gh-pages/themes">here</a> and <a href="https://github.com/PrismJS/prism-themes">here</a></p>
<h2>Usage with markdown-it</h2>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> MarkdownIt <span class="token keyword keyword-from" >from</span> <span class="token string" >'markdown-it'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addLanguage<span class="token punctuation" >,</span> highlight<span class="token punctuation" >,</span> getLangauge <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages/javascript'</span><span class="token punctuation" >;</span>

<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token keyword keyword-const" >const</span> md <span class="token operator" >=</span> <span class="token function" >MarkdownIt</span><span class="token punctuation brackets-parentheses" >(</span><span class="token punctuation brackets-braces" >{</span>
    highlight<span class="token punctuation" >:</span> <span class="token keyword keyword-function" >function</span><span class="token punctuation brackets-parentheses" >(</span>str<span class="token punctuation" >,</span> lang<span class="token punctuation brackets-parentheses" >)</span> <span class="token punctuation brackets-braces" >{</span>
        <span class="token keyword keyword-if" >if</span> <span class="token punctuation brackets-parentheses" >(</span>lang <span class="token operator" >&amp;&amp;</span> <span class="token function" >getLanguage</span><span class="token punctuation brackets-parentheses" >(</span>lang<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation brackets-parentheses" >)</span> <span class="token punctuation brackets-braces" >{</span>
            <span class="token keyword keyword-return" >return</span> <span class="token function" >highlight</span><span class="token punctuation brackets-parentheses" >(</span>str<span class="token punctuation" >,</span> lang<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
        <span class="token punctuation brackets-braces" >}</span>

        <span class="token keyword keyword-return" >return</span> str<span class="token punctuation" >;</span>
    <span class="token punctuation brackets-braces" >}</span>
<span class="token punctuation brackets-braces" >}</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
<h2>How is it different from Prism?</h2>
<ul>
<li>No need of including a client side library, just for highlighting the code snippets (when used
with markdown-it and gatsby).</li>
<li>Uses ES6 <code>Map</code>s to ensure the order in language definitions.</li>
<li><code>react-illuminate</code> works in the &quot;react way&quot;. No need for <code>dangerouslySetInnerHTML</code>.</li>
</ul>
<h2>License</h2>
<p>MIT. Copyright(c) <a href="http://vkbansal.me/">Vivek Kumar Bansal</a></p>
`;

export class Main extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <Container>
                <div dangerouslySetInnerHTML={{__html: content}}/>
            </Container>
        );
    }
}
