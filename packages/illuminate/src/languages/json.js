import Definition from '../Definition';

export default new Definition([
    ['property', /"(?:\\.|[^\\"])*"(?=\s*:)/ig],
    ['string', /"(?!:)(?:\\.|[^\\"])*"(?!:)/g],
    ['number', /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?)\b/g],
    ['punctuation', /[{}[\]);,]/g],
    ['operator', /:/g],
    ['boolean', /\b(true|false)\b/gi],
    ['null', /\bnull\b/gi]
]);
