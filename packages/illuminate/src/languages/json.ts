import { Definition, TokenTypes } from '../illuminate';

export const json: Definition = new Map<string, TokenTypes>([
    ['property', /"(?:\\.|[^\\"])*"(?=\s*:)/gi],
    ['string', /"(?!:)(?:\\.|[^\\"])*"(?!:)/g],
    ['number', /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?)\b/g],
    ['punctuation', /[{}[\]);,]/g],
    ['operator', /:/g],
    ['boolean', /\b(true|false)\b/gi],
    ['null', /\bnull\b/gi]
]);
