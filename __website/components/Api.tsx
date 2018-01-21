/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<h1>Public API</h1>
<p>The following methods must be sufficient for most of the typical use cases.</p>
<div class='docs'>
<h2>addLanguage(name: string, def: Definition): void</h2>
<p>Add a language definition to a illuminate. You can add same definition multiple times with different names.</p>
<h3>name: string</h3>
<p>The name of the language being added. This name will be used by <code>highlight</code> function.</p>
<h3>def: Definition</h3>
<p>The language <code>Definition</code> to be added.</p>
<p><strong>Code Example</strong></p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addLanguage <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages'</span><span class="token punctuation" >;</span>

<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'javascript'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
<h2>highlight(code: string, lang: string): string</h2>
<p>Highlights the given code. Returns the highlighted code in <code>string</code> format.</p>
<h3>code: string</h3>
<p>The code string that is to be highlighted.</p>
<h3>lang: string</h3>
<p>Name of the definition to be used. This name corresponds to the name given to the definition using <code>addLanguage</code>.</p>
<p><strong>Code Example</strong></p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addLanguage<span class="token punctuation" >,</span> highlight <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages'</span><span class="token punctuation" >;</span>

<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'javascript'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token keyword keyword-const" >const</span> code <span class="token operator" >=</span> <span class="token template-string" ><span class="token string" >\`
...
\`</span></span><span class="token punctuation" >;</span>

<span class="token function" >highlight</span><span class="token punctuation brackets-parentheses" >(</span>code<span class="token punctuation" >,</span> <span class="token string" >'js'</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
<h2>addPlugin(plugin: Plugin): void</h2>
<p>Helper to add a plugin.</p>
<h3>plugin: Plugin</h3>
<p>The plugin to be added. See <a href="./#/plugins/">Plugins</a> for more details.</p>
<p><strong>Code Example</strong></p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addPlugin <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> showLanguage <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/plugins/showLanguage'</span><span class="token punctuation" >;</span>

<span class="token function" >addPlugin</span><span class="token punctuation brackets-parentheses" >(</span>showLanguage<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
<h2>resetPlugins(): void</h2>
<p>Removes all the plugins.</p>
<p><strong>Code Example</strong></p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> resetPlugins <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>

<span class="token function" >resetPlugins</span><span class="token punctuation brackets-parentheses" >(</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
</div>
<h1>Developer API</h1>
<p>The following methods are meant to be used by developers for writing illuminate addons/renderers.</p>
<div class='docs'>
<h2>getLanguage(name: string): Definition | undefined</h2>
<p>Returns the language definition which was added using <code>addLanguage</code>. Returns the <code>Definition</code> if found, else returns <code>undefined</code>.</p>
<p><strong>Code Example</strong></p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addLanguage<span class="token punctuation" >,</span> getLanguage <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages'</span><span class="token punctuation" >;</span>

<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'javascript'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token function" >getLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span> <span class="token comment" spellcheck="true" >// returns javascript definition</span>
</code></pre>
<h2>tokenize(code: string, def: Definition): Array&lt;string | Token&gt;</h2>
<p>Converts the code to an <code>Array&lt;string | Token&gt;</code>, which can be used to write a render. For example, <code>react-illuminate</code> uses this to tokenize the code string and render it using react components.</p>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> tokenize <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages'</span><span class="token punctuation" >;</span>

<span class="token keyword keyword-const" >const</span> code <span class="token operator" >=</span> <span class="token template-string" ><span class="token string" >\`
...
\`</span></span><span class="token punctuation" >;</span>

<span class="token function" >tokenize</span><span class="token punctuation brackets-parentheses" >(</span>code<span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span> <span class="token comment" spellcheck="true" >// returns Array&lt;string | Token&gt;</span>
</code></pre>
</div>
<br/>
<br/>
<br/>
<br/>
`;

export class Api extends React.Component {
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
