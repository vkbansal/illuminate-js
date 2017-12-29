/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<div class='doc-header'>
<h1>React Illuminate</h1>
<p><a href="https://npmjs.org/package/react-illuminate"><img src="https://img.shields.io/npm/v/react-illuminate.svg?style=flat-square" alt="NPM Version"></a>
<a href="https://david-dm.org/vkbansal/illuminate-js?path=packages/react-illuminate"><img src="https://david-dm.org/vkbansal/illuminate-js/status.svg?style=flat-square&amp;path=packages/react-illuminate" alt="Dependency Status"></a>
<a href="https://david-dm.org/vkbansal/illuminate-js?type=peer&amp;path=packages/react-illuminate"><img src="https://david-dm.org/vkbansal/illuminate-js/peer-status.svg?style=flat-square&amp;path=packages/react-illuminate" alt="Peer Dependency Status"></a>
<a href="https://david-dm.org/vkbansal/illuminate-js?type=dev&amp;path=packages/react-illuminate"><img src="https://david-dm.org/vkbansal/illuminate-js/dev-status.svg?style=flat-square&amp;path=packages/react-illuminate" alt="Dev Dependency Status"></a></p>
</div>
<h2>Install</h2>
<pre><code class="language-bash"><span class="token function" >npm</span> <span class="token function" >install</span> --save illuminate-js react-illuminate
</code></pre>
<h2>Usage</h2>
<pre><code class="language-js"><span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> addLanguage <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages'</span><span class="token punctuation" >;</span>
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> Illuminate <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'react-Illuminate'</span><span class="token punctuation" >;</span>

<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Illuminate</span> <span class="token attr-name" >lang</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>js<span class="token punctuation" >"</span></span><span class="token punctuation" >&gt;</span></span>
    <span class="token punctuation brackets-braces" >{</span>\`
      <span class="token comment" spellcheck="true" >/** Your Code Sample here **/</span>
      <span class="token keyword keyword-var" >var</span> foo <span class="token operator" >=</span> <span class="token number" >123</span><span class="token punctuation" >;</span>
    \`<span class="token punctuation brackets-braces" >}</span>
<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>Illuminate</span><span class="token punctuation" >&gt;</span></span><span class="token punctuation" >;</span>
</code></pre>
<h2>Theming</h2>
<p>You can use any of the pre-existings PrismJS themes from <a href="https://github.com/PrismJS/prism/tree/gh-pages/themes">here</a> and <a href="https://github.com/PrismJS/prism-themes">here</a></p>
<h2>License</h2>
<p>MIT. Copyright(c) <a href="http://vkbansal.me/">Vivek Kumar Bansal</a></p>
`;

export class ReactApi extends React.Component {
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
