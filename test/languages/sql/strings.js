exports.input = `
""
"fo\\"obar"
"foo
bar"
''
'fo\\'obar'
'foo
bar'
`;

exports.expected = [
    ["string", "\"\""],
	["string", "\"fo\\\"obar\""],
	["string", "\"foo\nbar\""],
	["string", "''"],
	["string", "'fo\\'obar'"],
	["string", "'foo\nbar'"]
];

exports.comment = "should parse strings";
