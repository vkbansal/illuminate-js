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
<div class='docs'>
<h3>inside</h3>
<p>This property takes another <code>Definition</code>. It is useful when you want to highlight the nested content. This is useful for certain languages, but they are slower and if are not coded properly, can even lead to infinite recursion. For example, this can be used highlight JS within <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">JS template literals</a>, or highlight CSS and JS within HTML <code>style</code> and <code>script</code> tags respectively.</p>
<h3>lookbehind</h3>
<p>This option mitigates JavaScript’s lack of lookbehind. When set to <code>true</code>, the first capturing group in the regex pattern is discarded, so it effectively behaves as if it was lookbehind. For an example of this, check out the <code>comment</code> token from C-like language definition:</p>
<pre><code class="language-ts"><span class="token punctuation brackets-square" >[</span>
    <span class="token string" >'comment'</span><span class="token punctuation" >,</span>
    <span class="token punctuation brackets-square" >[</span>
        <span class="token punctuation brackets-braces" >{</span>
            pattern<span class="token punctuation" >:</span> \<span class="token operator" >/</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >^</span><span class="token operator" >|</span><span class="token punctuation brackets-square" >[</span><span class="token operator" >^</span>\\\\<span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span>\\\<span class="token operator" >/</span>\\<span class="token operator" >*</span><span class="token punctuation brackets-square" >[</span>\\s\\S<span class="token punctuation brackets-square" >]</span><span class="token operator" >*</span><span class="token operator" >?</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >?</span><span class="token punctuation" >:</span>\\<span class="token operator" >*</span>\\\<span class="token operator" >/</span><span class="token operator" >|</span>$<span class="token punctuation brackets-parentheses" >)</span>\<span class="token operator" >/</span><span class="token punctuation" >,</span>
            lookbehind<span class="token punctuation" >:</span> <span class="token keyword keyword-true" >true</span>
        <span class="token punctuation brackets-braces" >}</span><span class="token punctuation" >,</span>
        <span class="token punctuation brackets-braces" >{</span>
            pattern<span class="token punctuation" >:</span> \<span class="token operator" >/</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >^</span><span class="token operator" >|</span><span class="token punctuation brackets-square" >[</span><span class="token operator" >^</span>\\\\<span class="token punctuation" >:</span><span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span>\\\<span class="token operator" >/</span>\\\<span class="token operator" >/</span><span class="token punctuation" >.</span><span class="token operator" >*</span>\<span class="token operator" >/</span><span class="token punctuation" >,</span>
            lookbehind<span class="token punctuation" >:</span> <span class="token keyword keyword-true" >true</span>
        <span class="token punctuation brackets-braces" >}</span>
    <span class="token punctuation brackets-square" >]</span>
<span class="token punctuation brackets-square" >]</span><span class="token punctuation" >;</span>
</code></pre>
<h3>alias</h3>
<p>This option can be used to define one or more aliases for the matched token. The result will be, that the classnames of the token and its aliases are combined. This can be useful, to combine the styling of a well known token, which is already supported by most of the themes, with a semantically correct token name. The option can be set to a <code>string</code> or an <code>Array&lt;string&gt;</code>. In the following example the token name <code>scalar</code> is not supported by any theme, but it will be highlighted the same as a <code>string</code>.</p>
<pre><code class="language-ts"><span class="token punctuation brackets-square" >[</span>
    <span class="token string" >'scalar'</span><span class="token punctuation" >,</span>
    <span class="token punctuation brackets-braces" >{</span>
        pattern<span class="token punctuation" >:</span> \<span class="token operator" >/</span><span class="token punctuation brackets-parentheses" >(</span><span class="token punctuation brackets-square" >[</span>\\<span class="token operator" >-</span><span class="token punctuation" >:</span><span class="token punctuation brackets-square" >]</span>\\s<span class="token operator" >*</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >?</span><span class="token punctuation" >:</span><span class="token operator" >!</span><span class="token punctuation brackets-square" >[</span><span class="token operator" >^</span>\\s<span class="token punctuation brackets-square" >]</span><span class="token operator" >+</span><span class="token punctuation brackets-parentheses" >)</span><span class="token operator" >?</span><span class="token punctuation brackets-square" >[</span> \\t<span class="token punctuation brackets-square" >]</span><span class="token operator" >*</span><span class="token punctuation brackets-square" >[</span><span class="token operator" >|</span><span class="token operator" >&gt;</span><span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation brackets-square" >[</span> \\t<span class="token punctuation brackets-square" >]</span><span class="token operator" >*</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >?</span><span class="token punctuation" >:</span><span class="token punctuation brackets-parentheses" >(</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >?</span><span class="token punctuation" >:</span>\\r<span class="token operator" >?</span>\\n<span class="token operator" >|</span>\\r<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation brackets-square" >[</span> \\t<span class="token punctuation brackets-square" >]</span><span class="token operator" >+</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation brackets-square" >[</span><span class="token operator" >^</span>\\r\\n<span class="token punctuation brackets-square" >]</span><span class="token operator" >+</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >?</span><span class="token punctuation" >:</span>\\<span class="token number" >2</span><span class="token punctuation brackets-square" >[</span><span class="token operator" >^</span>\\r\\n<span class="token punctuation brackets-square" >]</span><span class="token operator" >+</span><span class="token punctuation brackets-parentheses" >)</span><span class="token operator" >*</span><span class="token punctuation brackets-parentheses" >)</span>\<span class="token operator" >/</span><span class="token punctuation" >,</span>
        lookbehind<span class="token punctuation" >:</span> <span class="token keyword keyword-true" >true</span><span class="token punctuation" >,</span>
        alias<span class="token punctuation" >:</span> <span class="token string" >'string'</span>
    <span class="token punctuation brackets-braces" >}</span>
<span class="token punctuation brackets-square" >]</span><span class="token punctuation" >;</span>
</code></pre>
<h3>greedy</h3>
<p>This is a <code>boolean</code> attribute. It is intended to solve a common problem with patterns that match long strings like comments, regex or string literals. For example, comments are parsed first, but if the string <code>/* foo */</code> appears inside a string, you would not want it to be highlighted as a comment. The <code>greedy</code>-property allows a pattern to ignore previous matches of other patterns, and overwrite them when necessary. Use this flag with restraint, as it incurs a small performance overhead. The following example demonstrates its usage:</p>
<pre><code class="language-ts"><span class="token punctuation brackets-square" >[</span>
    <span class="token string" >'string'</span><span class="token punctuation" >,</span>
    <span class="token punctuation brackets-braces" >{</span>
        pattern<span class="token punctuation" >:</span> \<span class="token operator" >/</span><span class="token punctuation brackets-parentheses" >(</span><span class="token punctuation brackets-square" >[</span>"'<span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation brackets-parentheses" >(</span>\\\\<span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >?</span><span class="token punctuation" >:</span>\\r\\n<span class="token operator" >|</span><span class="token punctuation brackets-square" >[</span>\\s\\S<span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span><span class="token operator" >|</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >?</span><span class="token operator" >!</span>\\<span class="token number" >1</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation brackets-square" >[</span><span class="token operator" >^</span>\\\\\\r\\n<span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span><span class="token operator" >*</span>\\<span class="token number" >1</span>\<span class="token operator" >/</span><span class="token punctuation" >,</span>
        greedy<span class="token punctuation" >:</span> <span class="token keyword keyword-true" >true</span>
    <span class="token punctuation brackets-braces" >}</span>
<span class="token punctuation brackets-square" >]</span><span class="token punctuation" >;</span>
</code></pre>
<br/>
<p>In most languages there are multiple different ways of declaring the same constructs (e.g. comments, strings, ...) and sometimes it is difficult or unpractical to match all of them with one single regular expression. To add multiple regular expressions for one token name an <code>Array&lt;Regexp | TokenObject&gt;</code> can be used:</p>
<pre><code class="language-ts"><span class="token string" >'tokenname'</span><span class="token punctuation" >:</span> <span class="token punctuation brackets-square" >[</span> \<span class="token operator" >/</span>regex0\<span class="token operator" >/</span><span class="token punctuation" >,</span> \<span class="token operator" >/</span>regex1\<span class="token operator" >/</span><span class="token punctuation" >,</span> <span class="token punctuation brackets-braces" >{</span> pattern<span class="token punctuation" >:</span> \<span class="token operator" >/</span>regex2\<span class="token operator" >/</span> <span class="token punctuation brackets-braces" >}</span> <span class="token punctuation brackets-square" >]</span>
</code></pre>
<p>A <code>Definition</code> has a reserved key <code>rest</code>, that accepts another <code>Definition</code>. This will merge this <code>Definition</code> to the end of the current <code>Definition</code>. This is useful for referring to tokens defined elsewhere. For an example where <code>rest</code> is useful, for using JavaScript tokens inside <code>template-string</code>:</p>
<pre><code class="language-ts"><span class="token punctuation brackets-square" >[</span>
    <span class="token string" >'template-string'</span><span class="token punctuation" >,</span>
    <span class="token punctuation brackets-braces" >{</span>
        pattern<span class="token punctuation" >:</span> \<span class="token operator" >/</span><span class="token template-string" ><span class="token string" >\`(?:\\\\[\\s\\S]|[^\\\`</span></span><span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span><span class="token operator" >*</span>\`\<span class="token operator" >/</span><span class="token punctuation" >,</span>
        greedy<span class="token punctuation" >:</span> <span class="token keyword keyword-true" >true</span><span class="token punctuation" >,</span>
        inside<span class="token punctuation" >:</span> <span class="token keyword keyword-new" >new</span> <span class="token class-name" >Map</span><span class="token operator" >&lt;</span><span class="token keyword keyword-string" >string</span><span class="token punctuation" >,</span> Tokens<span class="token operator" >&gt;</span><span class="token punctuation brackets-parentheses" >(</span><span class="token punctuation brackets-square" >[</span>
            <span class="token punctuation brackets-square" >[</span>
                <span class="token string" >'interpolation'</span><span class="token punctuation" >,</span>
                <span class="token punctuation brackets-braces" >{</span>
                    pattern<span class="token punctuation" >:</span> \<span class="token operator" >/</span>\\$\\<span class="token punctuation brackets-braces" >{</span><span class="token punctuation brackets-square" >[</span><span class="token operator" >^</span><span class="token punctuation brackets-braces" >}</span><span class="token punctuation brackets-square" >]</span><span class="token operator" >+</span>\\<span class="token punctuation brackets-braces" >}</span>\<span class="token operator" >/</span><span class="token punctuation" >,</span>
                    inside<span class="token punctuation" >:</span> <span class="token keyword keyword-new" >new</span> <span class="token class-name" >Map</span><span class="token operator" >&lt;</span><span class="token keyword keyword-string" >string</span><span class="token punctuation" >,</span> Tokens <span class="token operator" >|</span> Map<span class="token operator" >&lt;</span><span class="token keyword keyword-string" >string</span><span class="token punctuation" >,</span> Tokens<span class="token operator" >&gt;&gt;</span><span class="token punctuation brackets-parentheses" >(</span><span class="token punctuation brackets-square" >[</span>
                        <span class="token punctuation brackets-square" >[</span>
                            <span class="token string" >'interpolation-punctuation'</span><span class="token punctuation" >,</span>
                            <span class="token punctuation brackets-braces" >{</span>
                                pattern<span class="token punctuation" >:</span> \<span class="token operator" >/</span><span class="token operator" >^</span>\\$\\<span class="token punctuation brackets-braces" >{</span><span class="token operator" >|</span>\\<span class="token punctuation brackets-braces" >}</span>$\<span class="token operator" >/</span><span class="token punctuation" >,</span>
                                alias<span class="token punctuation" >:</span> <span class="token string" >'punctuation'</span>
                            <span class="token punctuation brackets-braces" >}</span>
                        <span class="token punctuation brackets-square" >]</span><span class="token punctuation" >,</span>
                        <span class="token punctuation brackets-square" >[</span><span class="token string" >'rest'</span><span class="token punctuation" >,</span> <span class="token function" >clone</span><span class="token punctuation brackets-parentheses" >(</span>javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation brackets-square" >]</span>
                    <span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span>
                <span class="token punctuation brackets-braces" >}</span>
            <span class="token punctuation brackets-square" >]</span><span class="token punctuation" >,</span>
            <span class="token punctuation brackets-square" >[</span><span class="token string" >'string'</span><span class="token punctuation" >,</span> \<span class="token operator" >/</span><span class="token punctuation brackets-square" >[</span>\\s\\S<span class="token punctuation brackets-square" >]</span><span class="token operator" >+</span>\<span class="token operator" >/</span><span class="token punctuation brackets-square" >]</span>
        <span class="token punctuation brackets-square" >]</span><span class="token punctuation brackets-parentheses" >)</span>
    <span class="token punctuation brackets-braces" >}</span>
<span class="token punctuation brackets-square" >]</span><span class="token punctuation" >;</span>
</code></pre>
</div>
<h2>Helper utils for writing language definitions</h2>
<p>TODO</p>
<div class='docs'>
<h3>clone(def: Definition): Definition</h3>
<h3>insertBefore(parent: Definition, insertBeforeKey: string, def: Definition): Definition</h3>
<h3>setIn(def: any, path: Array<string>, value: any): void</h3>
<h3>getIn(def: any, path: Array<string>): any</h3>
</div>
<br/>
<br/>
<br/>
<br/>
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
