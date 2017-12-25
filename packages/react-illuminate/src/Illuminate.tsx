import * as React from 'react';
import { tokenize, getLanguage } from 'illuminate-js';

import { TokenElement, Token, SingleOrArray } from './Token';

export interface IlluminateProps {
    children: string;
    lang?: string;
    lineNumbers?: boolean;
    showLanguage?: boolean;
}

export class Illuminate extends React.Component<IlluminateProps> {
    shouldComponentUpdate(nextProps: IlluminateProps) {
        return this.props.children !== nextProps.children || this.props.lang !== nextProps.lang;
    }

    renderLineNumbers(code: string) {
        const match = code.match(/\n(?!$)/g);
        const linesNum = match ? match.length + 1 : 1;
        let lines = [];

        for (let i = 0; i < linesNum; i++) {
            lines.push(<span key={`line-${i}`} className="line-number" />);
        }

        return <span className="line-number-rows">{lines}</span>;
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
                    {this.props.showLanguage && <span className="show-language">{lang}</span>}
                    <TokenElement token={token} />
                    {this.props.lineNumbers && this.renderLineNumbers(children)}
                </code>
            </pre>
        );
    }
}
