exports.input = `
"foo": true
"bar": false
"baz": null
`;

exports.expected = [
    ["property", "\"foo\""],
    ["operator", ":"],
    ["boolean", "true"],
    ["property", "\"bar\""],
    ["operator", ":"],
    ["boolean", "false"],
    ["property", "\"baz\""],
    ["operator", ":"],
    ["null", "null"]
];

exports.comment = "should parse boolean, null values";
