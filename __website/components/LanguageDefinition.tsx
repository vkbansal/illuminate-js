/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<h1>Language Definitions</h1>
<p>The following languages are included with <code>illuminate-js</code> :</p>
<div class='langauge-list'>
<ul>
<li>apacheconf</li>
<li>bash</li>
<li>clike</li>
<li>css</li>
<li>diff</li>
<li>haskell</li>
<li>http</li>
<li>index</li>
<li>ini</li>
<li>javascript</li>
<li>json</li>
<li>jsx</li>
<li>less</li>
<li>makefile</li>
<li>markdown</li>
<li>markup</li>
<li>matlab</li>
<li>php</li>
<li>python</li>
<li>ruby</li>
<li>scss</li>
<li>sql</li>
<li>tsx</li>
<li>typescript</li>
<li>yaml</li>
</ul>
</div>
<h2>How to write a language definition?</h2>
<p>Every language is defined as an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map">ES6 Map</a>
of <code>Tokens</code>, as shown below:</p>
<pre><code class="language-ts"><span class="token keyword keyword-interface" >interface</span> <span class="token class-name" >TokenObject</span> <span class="token punctuation brackets-braces" >{</span>
    pattern<span class="token punctuation" >:</span> RegExp<span class="token punctuation" >;</span>
    inside<span class="token operator" >?</span><span class="token punctuation" >:</span> Definition<span class="token punctuation" >;</span>
    lookbehind<span class="token operator" >?</span><span class="token punctuation" >:</span> <span class="token keyword keyword-boolean" >boolean</span><span class="token punctuation" >;</span>
    greedy<span class="token operator" >?</span><span class="token punctuation" >:</span> <span class="token keyword keyword-boolean" >boolean</span><span class="token punctuation" >;</span>
    alias<span class="token operator" >?</span><span class="token punctuation" >:</span> <span class="token keyword keyword-string" >string</span><span class="token punctuation" >;</span>
<span class="token punctuation brackets-braces" >}</span>

<span class="token keyword keyword-type" >type</span> Tokens <span class="token operator" >=</span> RegExp <span class="token operator" >|</span> TokenObject <span class="token operator" >|</span> <span class="token keyword keyword-array" >Array</span><span class="token operator" >&lt;</span>RegExp <span class="token operator" >|</span> TokenObject<span class="token operator" >&gt;</span><span class="token punctuation" >;</span>

<span class="token keyword keyword-type" >type</span> Definition <span class="token operator" >=</span> Map<span class="token operator" >&lt;</span><span class="token keyword keyword-string" >string</span><span class="token punctuation" >,</span> Tokens <span class="token operator" >|</span> Map<span class="token operator" >&lt;</span><span class="token keyword keyword-string" >string</span><span class="token punctuation" >,</span> Tokens<span class="token operator" >&gt;&gt;</span><span class="token punctuation" >;</span>
</code></pre>
<p><strong>Note</strong>: Since, there is non-zero probability that a given <code>RegExp</code> can match some unintended string, the order of <code>Tokens</code> is important, hence we use <code>Map</code>.</p>
<p>Using a <code>RegExp</code>, is the simplest way to express a token. Alternatively, you can use <code>TokenObject</code>,
where the <code>RegExp</code> describing the token would be <code>pattern</code> attribute.</p>
<pre><code class="language-ts"><span class="token punctuation brackets-braces" >{</span>
    tokenname<span class="token punctuation" >:</span> <span class="token regex" >/regexp/</span><span class="token punctuation" >;</span>
<span class="token punctuation brackets-braces" >}</span>
<span class="token comment" spellcheck="true" >// is same as</span>
<span class="token punctuation brackets-braces" >{</span>
    tokenname<span class="token punctuation" >:</span> <span class="token punctuation brackets-braces" >{</span>
        pattern<span class="token punctuation" >:</span> <span class="token regex" >/regexp/</span><span class="token punctuation" >;</span>
    <span class="token punctuation brackets-braces" >}</span>
<span class="token punctuation brackets-braces" >}</span>
</code></pre>
<p>But, the <code>TokenObject</code> notation allows for additional options to be specified:</p>
<ul>
<li><strong>inside</strong>: This property takes another <code>Definition</code>. It is useful when you want to highlight the nested content. This is useful for certain languages, but they are slower and if are not coded properly, can even lead to infinite recursion. For example, this can be used highlight JS within <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">JS template literals</a>, or highlight CSS and JS within HTML <code>style</code> and <code>script</code> tags respectively.</li>
<li><strong>lookbehind</strong>: This option mitigates JavaScript’s lack of lookbehind. When set to true, the first capturing group in the regex pattern is discarded when matching this token, so it effectively behaves as if it was lookbehind. For an example of this, check out the C-like language definition, in particular the comment and class-name tokens:</li>
<li><strong>rest</strong>: Accepts an object literal with tokens and appends them to the end of the current object literal. Useful for referring to tokens defined elsewhere. For an example where rest is useful, check the Markup definitions above.</li>
<li><strong>alias</strong>: This option can be used to define one or more aliases for the matched token. The result will be, that the styles of the token and its aliases are combined. This can be useful, to combine the styling of a well known token, which is already supported by most of the themes, with a semantically correct token name. The option can be set to a string literal or an array of string literals. In the following example the token name latex-equation is not supported by any theme, but it will be highlighted the same as a string.</li>
<li><strong>greedy</strong>: This is a boolean attribute. It is intended to solve a common problem with patterns that match long strings like comments, regex or string literals. For example, comments are parsed first, but if the string /_ foo _/ appears inside a string, you would not want it to be highlighted as a comment. The greedy-property allows a pattern to ignore previous matches of other patterns, and overwrite them when necessary. Use this flag with restraint, as it incurs a small performance overhead. The following example demonstrates its usage:</li>
</ul>
<p>In most languages there are multiple different ways of declaring the same constructs (e.g. comments, strings, ...) and sometimes it is difficult or unpractical to match all of them with one single regular expression. To add multiple regular expressions for one token name an <code>Array&lt;Regexp | TokenObject&gt;</code> can be used:</p>
`;

export class LanguageDefinition extends React.Component {
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
