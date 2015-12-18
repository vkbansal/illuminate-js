exports.input = `
[batman]
[ironman]
`;

exports.expected = [
    ["important", "[batman]"],
    "\n",
    ["important", "[ironman]"]
];

exports.comment = "should parse important";
