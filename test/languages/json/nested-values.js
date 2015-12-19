exports.input = `
{
    "foo": ["test"],
    "bar": {
        "baz": null
    }
}
`;

exports.expected = [
    ["punctuation", "{"],
    ["property", "\"foo\""],
    ["operator", ":"],
    ["punctuation", "["],
    ["string", "\"test\""],
    ["punctuation", "]"],
    ["punctuation", ","],
    ["property", "\"bar\""],
    ["operator", ":"],
    ["punctuation", "{"],
    ["property", "\"baz\""],
    ["operator", ":"],
    ["null", "null"],
    ["punctuation", "}"],
    ["punctuation", "}"]
];

exports.comment = "should parse nested values";
