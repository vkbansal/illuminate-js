import * as React from 'react';
import { tokenize, getLanguage } from 'illuminate-js';

import { TokenElement, Token, SingleOrArray } from './Token';

export interface IlluminateProps {
    children: string;
    lang?: string;
}

export default class Illuminate extends React.Component<IlluminateProps> {
    shouldComponentUpdate(nextProps: IlluminateProps) {
        return this.props.children !== nextProps.children || this.props.lang !== nextProps.lang;
    }

    render() {
        const { lang, children } = this.props;
        let token: string | SingleOrArray<string | Token> = children;

        const grammar = getLanguage(lang || '');

        if (!grammar) {
            return children;
        }

        token = tokenize(children, grammar);

        return (
            <pre className={`language-${lang}`}>
                <code>
                    <TokenElement token={token} />
                </code>
            </pre>
        );
    }
}
