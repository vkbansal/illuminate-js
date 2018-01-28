/* This file is auto generated, do not change anything here */
import * as React from 'react';
import glamorous from 'glamorous';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { Illuminate } from 'react-illuminate';

import { Container } from './Common';
import API from './ReactIlluminateAPI.json';

const Heading = glamorous.div({
    fontWeight: 'bold',
    color: '#e94949',
    fontSize: '1.2em'
});

const PropsContainer = glamorous.div({
    marginTop: '1.4em'
});

export class ReactApi extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    renderProps(key: string, i: number) {
        const prop = (API as ComponentDoc).props[key];
        const { description } = prop;
        const [desc, example] = description.split('@example');

        return (
            <PropsContainer key={i}>
                <Heading>
                    props.{key}
                    {prop.required ? '' : '?'}:{' '}
                    {prop.type.name.split(' | ')[0].replace('CustomClasses', 'object')}
                    {prop.defaultValue && <span> (default: {prop.defaultValue.value})</span>}
                </Heading>
                <div dangerouslySetInnerHTML={{ __html: desc }} />
                {example && <Illuminate lang="js">{example.trim()}</Illuminate>}
            </PropsContainer>
        );
    }

    render() {
        return (
            <Container>
                <h1>API</h1>
                <h2>
                    <code>{'<Illuminate />'}</code>
                </h2>
                {Object.keys((API as ComponentDoc).props).map(this.renderProps)}
            </Container>
        );
    }
}
