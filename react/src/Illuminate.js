import React, { Component, PropTypes } from 'react';
import illuminate from 'illuminate-js';

import Token from './Token';

const { tokenize, getLanguage } = illuminate;

export default class Illuminate extends Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired
    }

    shouldComponentUpdate(nextProps) {
        return this.props.children !== nextProps.children || this.props.lang !== nextProps.lang;
    }

    render() {
        const { lang, children } = this.props;
        let token = children;

        const grammar = getLanguage(lang);

        if (grammar) {
            token = tokenize(children, grammar);
        }

        return <pre className={`language-${lang}`}><code><Token token={token} /></code></pre>;
    }
}
