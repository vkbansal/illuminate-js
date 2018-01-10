import * as React from 'react';
import * as cx from 'classnames';
import { tokenize, getLanguage } from 'illuminate-js';

import { TokenElement, Token, SingleOrArray, CustomClasses } from './Token';

export interface IlluminateProps {
    /**
     * The text to be highlighted
     */
    children: string;
    /**
     * The language definition, to be used to highlight the text.
     * This must match with one of the language names, used with `addLanguage`
     */
    lang: string;
    /**
     * Flag to toggle the addition of line-numbers to output.
     * **Note**: You might need to add appropriate styles for this to work.
     * See Illuminate Plugins for more details
     *
     * @default false
     */
    lineNumbers?: boolean;
    /**
     * Flag to toggle the addition of language name to output.
     * **Note**: You might need to add appropriate styles for this to work.
     * See Illuminate Plugins for more details
     *
     * @default false
     */
    showLanguage?: boolean;
    /**
     * By default, Illuminate uses fixed and generic class names.
     * Using this setting, you can cutomize those classes.
     * For example:
     *
     *   * You can namespace classes like `.illuminate--string` to avoid conflicts with existing CSS.
     *   * You can use [CSS Modules](https://github.com/css-modules/css-modules), like `.operator_93jsa`.
     *
     * @example
     *
     * {
     *      prefix: 'prefix-',
     *      map: {
     *          property: 'special-property',
     *          string: 'string_ch29s',
     *          operator: 'operator_93jsa'
     *      }
     * }
     */
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
            'show-language': this.props.showLanguage
        });

        return (
            <pre className={className}>
                <code>
                    {this.props.showLanguage && <span className="show-language--lang">{lang}</span>}
                    <TokenElement customClasses={this.props.customClasses} token={token} />
                    {this.props.lineNumbers && this.renderLineNumbers(children)}
                </code>
            </pre>
        );
    }
}
