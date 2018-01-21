/* This file is auto generated, do not change anything here */
import * as React from 'react';
import { Container } from './Common';

const content = `<h1>API</h1>
<h2>Public API</h2>
<p>The following methods must be sufficient for most of the typical use cases.</p>
<div class='docs'>
<h3>addLanguage(name: string, def: Definition): void</h3>
<p>Add language definition to a illuminate.</p>
<h4>name: string</h4>
<p>The name of the language</p>
<h4>def: Definition</h4>
<p>Th</p>
<h3>highlight</h3>
<h3>addPlugin</h3>
<h3>resetPlugins</h3>
</div>
<h2>Developer API</h2>
<p>The following methods are meant to be used by developers to write illuminate addons/renderers.</p>
<div class='docs'>
<h3>getLanguage()</h3>
<h3>tokenize</h3>
</div>
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
