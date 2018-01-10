/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<h1>Illuminate JS</h1>
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
<span class="token keyword keyword-import" >import</span> <span class="token punctuation brackets-braces" >{</span> javascript <span class="token punctuation brackets-braces" >}</span> <span class="token keyword keyword-from" >from</span> <span class="token string" >'illuminate-js/lib/languages'</span><span class="token punctuation" >;</span>

<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'javascript'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token comment" spellcheck="true" >// You can alias it too.</span>
<span class="token function" >addLanguage</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'js'</span><span class="token punctuation" >,</span> javascript<span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>

<span class="token function" >highlight</span><span class="token punctuation brackets-parentheses" >(</span><span class="token string" >'Your code goes here'</span><span class="token punctuation" >,</span> <span class="token string" >'js'</span><span class="token punctuation brackets-parentheses" >)</span><span class="token punctuation" >;</span>
</code></pre>
<p><strong>Note</strong>: IlluminateJS comes with two themes just to get you started. You can include <code>illuminate-js/themes/[theme].css</code> according to your build config.</p>
<p>The included themes are:</p>
<ul>
<li>solarized-light</li>
<li>tomorrow</li>
</ul>
<p>You can also use any of the pre-existings PrismJS themes from <a href="https://github.com/PrismJS/prism/tree/gh-pages/themes">here</a> and <a href="https://github.com/PrismJS/prism-themes">here</a></p>
`;

export class GettingStarted extends React.Component {
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
