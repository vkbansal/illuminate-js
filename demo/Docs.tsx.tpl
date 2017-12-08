import * as React from 'react';
import { Container } from './Common';

const content = `$Content`;

export class $Name extends React.Component {
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
