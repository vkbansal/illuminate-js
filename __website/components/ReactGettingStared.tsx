/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<h1>React Illuminate</h1>
<h2>Install</h2>
<pre><code class="language-bash"><span class="token function" >npm</span> <span class="token function" >install</span> --save illuminate-js react-illuminate
</code></pre>
<h2>Usage</h2>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> Illuminate <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'react-Illuminate'</span><span class="token punctuation" >;</span>

Illuminate<span class="token punctuation" >.</span><span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Illuminate</span> <span class="token attr-name" >lang</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>js<span class="token punctuation" >"</span></span><span class="token punctuation" >&gt;</span></span>
    <span class="token punctuation brackets-braces" >{</span>\`
      <span class="token comment" spellcheck="true" >/** Your Code Sample here **/</span>
      <span class="token keyword keyword-var" >var</span> foo <span class="token operator" >=</span> <span class="token number" >123</span><span class="token punctuation" >;</span>
    \`<span class="token punctuation brackets-braces" >}</span>
<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>Illuminate</span><span class="token punctuation" >&gt;</span></span><span class="token punctuation" >;</span>
</code></pre>
<p><strong>Note</strong>: IlluminateJS comes with two themes just to get you started. You can include <code>illuminate-js/themes/[theme].css</code> according to your build config.</p>
<p>The included themes are:</p>
<ul>
<li>solarized-light</li>
<li>tomorrow</li>
</ul>
<p>You can also use any of the pre-existings PrismJS themes from <a href="https://github.com/PrismJS/prism/tree/gh-pages/themes">here</a> and <a href="https://github.com/PrismJS/prism-themes">here</a></p>
`;

export class ReactGettingStared extends React.Component {
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
