exports.input = `
"foo": "bar"
`;

exports.expected = [
    ["property", "\"foo\""],
    ["operator", ":"],
    ["string", "\"bar\""]
];

exports.comment = "should parse string value";
