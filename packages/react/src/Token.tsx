import * as React from 'react';

export type SingleOrArray<T> = T | T[];

export interface Token {
    type: string;
    content: SingleOrArray<string | Token>;
    alias?: SingleOrArray<string>;
}

export interface TokenProps {
    token: SingleOrArray<string | Token>;
}

export function TokenElement(props: TokenProps): React.ReactElement<TokenProps> {
    const { token } = props;

    if (typeof token === 'string') {
        return <span>{token}</span>;
    }

    if (Array.isArray(token)) {
        return <span>{token.map((t, i) => <TokenElement token={t} key={i} />)}</span>;
    }

    const classes: string[] = ['token', token.type];

    if (token.alias) {
        const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];

        classes.push(...aliases);
    }

    return (
        <span className={classes.join(' ')}>
            <TokenElement token={token.content} />
        </span>
    );
}
