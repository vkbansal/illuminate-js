/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<h1>Plugins</h1>
<p>Plugins can be used to extend Illuminate's functionality. The following are the official plugins:</p>
<p><strong>Line Numbers Plugin</strong>: Show line-numbers for the highlighted code.</p>
<ol>
<li>
<p>Add the plugin</p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addPlugin <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> lineNumbers <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/plugins/lineNumbers'</span><span class="token punctuation" >;</span>

<span class="token function" >addPlugin</span><span class="token punctuation brackets-parentheses" >(</span>lineNumbers<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
</li>
<li>
<p>Using styles from <a href="https://github.com/vkbansal/illuminate-js/blob/master/packages/illuminate-js/src/plugins/lineNumbers/style.css">here</a> as reference, write your own styles. This file is also available from <code>illuminate-js/lib/plugins/lineNumbers/style.css</code>.</p>
</li>
</ol>
<p><strong>Show Language Plugin</strong>: Show the language of the highlighted code.</p>
<ol>
<li>
<p>Add the plugin</p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addPlugin <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> showLanguage <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/plugins/showLangauage'</span><span class="token punctuation" >;</span>

<span class="token function" >addPlugin</span><span class="token punctuation brackets-parentheses" >(</span>showLanguage<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
</li>
<li>
<p>Using styles from <a href="https://github.com/vkbansal/illuminate-js/blob/master/packages/illuminate-js/src/plugins/showLangauage/style.css">here</a> as reference, write your own styles. This file is also available from <code>illuminate-js/lib/plugins/showLangauage/style.css</code>.</p>
</li>
</ol>
<p><strong>Custom Classes Plugin</strong>: Customize the classes used by highlighter.</p>
<ol>
<li>
<p>Add and use the plugin as follows:</p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addPlugin <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> customClasses <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/plugins/customClasses'</span><span class="token punctuation" >;</span>

<span class="token function" >addPlugin</span><span class="token punctuation brackets-parentheses" >(</span>
    <span class="token function" >showLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token punctuation brackets-braces" >{</span>
        prefix<span class="token punctuation" >:</span> <span class="token string" >'prefix-'</span><span class="token punctuation" >,</span>
        map<span class="token punctuation" >:</span> <span class="token punctuation brackets-braces" >{</span>
            property<span class="token punctuation" >:</span> <span class="token string" >'special-property'</span><span class="token punctuation" >,</span>
            string<span class="token punctuation" >:</span> <span class="token string" >'string_ch29s'</span><span class="token punctuation" >,</span>
            operator<span class="token punctuation" >:</span> <span class="token string" >'operator_93jsa'</span>
        <span class="token punctuation brackets-braces" >}</span>
    <span class="token punctuation brackets-braces" >}</span><span class="token punctuation brackets-parentheses" >)</span>
<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
</li>
</ol>
<h2>How to write a plugin?</h2>
<p>Illuminate's plugins system is simple and work very similar to <a href="https://lodash.com/docs#flow">lodash.flow</a>, .i.e, the output from previous plugin operation is passed onto the next. Illuminate provides different <strong>hooks</strong>, at which point your plugin can run. You can add a plugin using <code>addPlugin(hookName, callback)</code>.</p>
<p><code>callback</code> is a function that accepts one parameter, either a <code>HighlightEnv</code> or <code>TokenEnv</code>. And at the end, plugin must return the same type of value. The parameter passed depends on the hook and is shown below:</p>
<div class='hooks-table'>
<table>
<thead>
<tr>
<th>Hook name</th>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>before-highlight</td>
<td><code>HighlightEnv</code></td>
<td>This hook is called at the start of highlight function, before the string code is tokenized.</td>
</tr>
<tr>
<td>wrap</td>
<td><code>TokenEnv</code></td>
<td>This hook is called on each <code>Token</code>, just before it is converted to a string</td>
</tr>
<tr>
<td>after-highlight</td>
<td><code>HighlightEnv</code></td>
<td>This hook is called at the end of highlight function, after the tokenized code is converted to string.</td>
</tr>
</tbody>
</table>
</div>
<p>The callback parameters are described below:</p>
<pre><code class="language-ts"><span class="token keyword keyword-interface" >interface</span> <span class="token class-name" >HighlightEnv</span> <span class="token punctuation brackets-braces" >{</span>
    code<span class="token punctuation" >:</span> <span class="token keyword keyword-string" >string</span><span class="token punctuation" >;</span>
    highlightedCode<span class="token punctuation" >:</span> <span class="token keyword keyword-string" >string</span><span class="token punctuation" >;</span>
    grammar<span class="token punctuation" >:</span> Definition<span class="token punctuation" >;</span>
    language<span class="token punctuation" >:</span> <span class="token keyword keyword-string" >string</span><span class="token punctuation" >;</span>
<span class="token punctuation brackets-braces" >}</span>

<span class="token keyword keyword-interface" >interface</span> <span class="token class-name" >TokenEnv</span> <span class="token punctuation brackets-braces" >{</span>
    <span class="token keyword keyword-type" >type</span><span class="token punctuation" >:</span> <span class="token keyword keyword-string" >string</span><span class="token punctuation" >;</span>
    content<span class="token punctuation" >:</span> SingleOrArray<span class="token operator" >&lt;</span><span class="token keyword keyword-string" >string</span> <span class="token operator" >|</span> Token<span class="token operator" >&gt;</span><span class="token punctuation" >;</span>
    tag<span class="token punctuation" >:</span> <span class="token keyword keyword-string" >string</span><span class="token punctuation" >;</span>
    classes<span class="token punctuation" >:</span> <span class="token keyword keyword-array" >Array</span><span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>string</span><span class="token punctuation" >&gt;</span></span><span class="token punctuation" >;</span>
    attributes<span class="token punctuation" >:</span> Record<span class="token operator" >&lt;</span><span class="token keyword keyword-string" >string</span><span class="token punctuation" >,</span> <span class="token keyword keyword-string" >string</span><span class="token operator" >&gt;</span><span class="token punctuation" >;</span>
    language<span class="token operator" >?</span><span class="token punctuation" >:</span> <span class="token keyword keyword-string" >string</span><span class="token punctuation" >;</span>
    parent<span class="token operator" >?</span><span class="token punctuation" >:</span> SingleOrArray<span class="token operator" >&lt;</span><span class="token keyword keyword-string" >string</span> <span class="token operator" >|</span> Token<span class="token operator" >&gt;</span><span class="token punctuation" >;</span>
<span class="token punctuation brackets-braces" >}</span>
</code></pre>
<p><strong>Code example:</strong></p>
<p>Here’s a plugin from the Markup language definition that adds a tooltip to entity tokens which shows the actual character encoded:</p>
<pre><code class="language-ts"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addPlugin <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>

<span class="token function" >addPlugin</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'wrap'</span><span class="token punctuation" >,</span> <span class="token keyword keyword-function" >function</span><span class="token punctuation brackets-parentheses" >(</span>env<span class="token punctuation" >:</span> TokenEnv<span class="token punctuation brackets-parentheses" >)</span> <span class="token punctuation brackets-braces" >{</span>
    <span class="token keyword keyword-if" >if</span> <span class="token punctuation brackets-parentheses" >(</span>env<span class="token punctuation" >.</span>token <span class="token operator" >===</span> <span class="token string" >'entity'</span><span class="token punctuation brackets-parentheses" >)</span> <span class="token punctuation brackets-braces" >{</span>
        <span class="token keyword keyword-return" >return</span> <span class="token punctuation brackets-braces" >{</span>
            <span class="token operator" >...</span>env<span class="token punctuation" >,</span>
            attributes<span class="token punctuation" >:</span> <span class="token punctuation brackets-braces" >{</span>
                <span class="token operator" >...</span>env<span class="token punctuation" >.</span>attributes<span class="token punctuation" >,</span>
                title<span class="token punctuation" >:</span> env<span class="token punctuation" >.</span>content<span class="token punctuation" >.</span><span class="token function" >replace</span><span class="token punctuation brackets-parentheses" >(</span><span class="token operator" >/</span><span class="token entity" title="&amp;" >&amp;amp;</span><span class="token operator" >/</span><span class="token punctuation" >,</span> <span class="token string" >'&amp;'</span><span class="token punctuation brackets-parentheses" >)</span>
            <span class="token punctuation brackets-braces" >}</span>
        <span class="token punctuation brackets-braces" >}</span><span class="token punctuation" >;</span>
    <span class="token punctuation brackets-braces" >}</span>

    <span class="token keyword keyword-return" >return</span> env<span class="token punctuation" >;</span>
<span class="token punctuation brackets-braces" >}</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
<br/>
<br/>
<br/>
<br/>
`;

export class Plugins extends React.Component {
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
