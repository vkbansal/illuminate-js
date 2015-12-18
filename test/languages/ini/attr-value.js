exports.input = `
foo=Bar Baz
foobar=42
`;

exports.expected = [
    ["constant", "foo"],
    ["attr-value", [
        ["punctuation", "="],
        "Bar Baz"
    ]],
    ["constant", "foobar"],
    ["attr-value", [
        ["punctuation", "="],
        "42"
    ]]
];

exports.comment = "should parse comments";
