exports.input = `
[batman]
[ironman]
`;

exports.expected = [
    ["important", "[batman]"],
    ["important", "[ironman]"]
];

exports.comment = "should parse important";
