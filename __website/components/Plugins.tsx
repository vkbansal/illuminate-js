/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<h1>Plugins</h1>
<p>Plugins can be used to extend Illuminate's functionality. The following are the official plugins:</p>
<details>
<summary>
    <b>Line Numbers Plugin</b>: Show line-numbers for the highlighted code.
</summary>
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
</details>
</li>
</ol>
<details>
<summary>
    <b>Show Language Plugin</b>: Show the language of the highlighted code.
</summary>
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
</details>
</li>
</ol>
<details>
<summary>
    <b>Custom Classes Plugin</b>: Customize the classes used by highlighter.
</summary>
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
</details>
</li>
</ol>
<h2>How to write a plugin?</h2>
<p>Illuminate's plugins system is simple and work very similar to <a href="https://lodash.com/docs#flow">lodash.flow</a>, .i.e, the output from previous plugin operation is passed onto the next. Illuminate provides different <strong>hooks</strong>, at which point your plugin can run.</p>
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
