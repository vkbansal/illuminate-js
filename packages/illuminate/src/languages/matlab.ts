import { Definition, TokenTypes } from '../illuminate';

export const matlab: Definition = new Map<string, TokenTypes>([
    // We put string before comment, because of printf() patterns that contain "%"
    [
        'string',
        {
            pattern: /\B'(?:''|[^'\r\n])*'/,
            greedy: true
        }
    ],
    ['comment', [/%\{[\s\S]*?\}%/, /%.+/]],
    // FIXME We could handle imaginary numbers as a whole
    ['number', /\b-?(?:\d*\.?\d+(?:[eE][+-]?\d+)?(?:[ij])?|[ij])\b/],
    [
        'keyword',
        /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/
    ],
    ['function', /(?!\d)\w+(?=\s*\()/],
    ['operator', /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/],
    ['punctuation', /\.{3}|[.,;\[\](){}!]/]
]);
