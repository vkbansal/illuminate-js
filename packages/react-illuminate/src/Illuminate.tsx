import * as React from 'react';
import * as cx from 'classnames';
import { tokenize, getLanguage } from 'illuminate-js';

import { TokenElement, Token, SingleOrArray, CustomClasses } from './Token';

export interface IlluminateProps {
    children: string;
    lang?: string;
    lineNumbers?: boolean;
    showLanguage?: boolean;
    customClasses?: CustomClasses;
}

export class Illuminate extends React.PureComponent<IlluminateProps> {
    renderLineNumbers(code: string) {
        const match = code.match(/\n(?!$)/g);
        const linesNum = match ? match.length + 1 : 1;
        let lines = [];

        for (let i = 0; i < linesNum; i++) {
            lines.push(<span key={`line-${i}`} className="line-number" />);
        }

        return <span className="line-numbers-rows">{lines}</span>;
    }

    render() {
        const { lang, children } = this.props;
        let token: string | SingleOrArray<string | Token> = children;

        const grammar = getLanguage(lang || '');

        if (!grammar) {
            return children;
        }

        token = tokenize(children, grammar);

        const className = cx(`language-${lang}`, {
            'line-numbers': this.props.lineNumbers,
            'show-langauage': this.props.showLanguage
        });

        return (
            <pre className={className}>
                <code>
                    {this.props.showLanguage && <span className="show-language">{lang}</span>}
                    <TokenElement customClasses={this.props.customClasses} token={token} />
                    {this.props.lineNumbers && this.renderLineNumbers(children)}
                </code>
            </pre>
        );
    }
}
