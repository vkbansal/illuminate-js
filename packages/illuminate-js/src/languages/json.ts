import { Definition, TokenTypes } from '../illuminate';

export const json: Definition = new Map<string, TokenTypes>([
    ['property', /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i],
    [
        'string',
        {
            pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
            greedy: true
        }
    ],
    ['number', /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][+-]?\d+)?)\b/],
    ['punctuation', /[{}[\]);,]/],
    ['operator', /:/g],
    ['boolean', /\b(?:true|false)\b/i],
    ['null', /\bnull\b/i]
]);
