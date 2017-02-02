import React, { Component, PropTypes } from 'react';
import { Token as TokenClass } from 'illuminate-js';

export default class Token extends Component {
    static propTypes = {
        token: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.instanceOf(TokenClass)
        ]).isRequired
    }

    render() {
        const { token } = this.props;

        if (typeof token === 'string') {
            return <span>{token}</span>;
        }

        if (Array.isArray(token)) {
            return (
                <span>
                    {token.map((t, i) => (
                        <Token token={t} key={i}/>
                    ))}
                </span>
            );
        }

        const classes = ['token', token.type];

        if (token.alias) {
            const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];

            classes.push(...aliases);
        }

        return (
            <span className={classes.join(' ')}>
                <Token token={token.content}/>
            </span>
        );
    }
}
