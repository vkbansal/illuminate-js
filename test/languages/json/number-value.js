exports.input = `
"foo": 23
"bar": -456
"baz": 123.456e-10
`;

exports.expected = [
    ["property", "\"foo\""],
    ["operator", ":"],
    ["number", "23"],
    ["property", "\"bar\""],
    ["operator", ":"],
    ["number", "-456"],
    ["property", "\"baz\""],
    ["operator", ":"],
    ["number", "123.456e-10"]
];

exports.comment = "should parse number value";
