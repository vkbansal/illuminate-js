import * as React from 'react';

export type SingleOrArray<T> = T | T[];

export interface IlluminateToken {
    type: string;
    content: SingleOrArray<string | IlluminateToken>;
    alias?: SingleOrArray<string>;
}

export interface CustomClasses {
    prefix?: string;
    map?: Record<string, string>;
}

export interface TokenProps {
    token: SingleOrArray<string | IlluminateToken>;
    customClasses?: CustomClasses;
}

export function TokenElement(props: TokenProps): React.ReactElement<TokenProps> {
    const { token } = props;

    if (typeof token === 'string') {
        return <span>{token}</span>;
    }

    if (Array.isArray(token)) {
        return <span>{token.map((t, i) => <TokenElement token={t} key={i} />)}</span>;
    }

    let classes: string[] = ['token', token.type];

    if (token.alias) {
        const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];

        classes.push(...aliases);
    }

    if (props.customClasses) {
        const { customClasses } = props;

        classes = classes.map((c) => {
            return (
                (customClasses.prefix || '') +
                (customClasses.map && Object.prototype.hasOwnProperty.call(customClasses.map, c)
                    ? customClasses.map[c]
                    : c)
            );
        });
    }

    return (
        <span className={classes.join(' ')}>
            <TokenElement token={token.content} />
        </span>
    );
}
