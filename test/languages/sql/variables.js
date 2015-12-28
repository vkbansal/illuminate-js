exports.input = `
@foo
@foo_bar_42
@"fo"o-b
ar"
@'fo\'o-b
ar'
@\`fo\`o-b
ar\`
`;

exports.expected = [
    ["variable", "@foo"],
	["variable", "@foo_bar_42"],
	["variable", "@\"fo\\\"o-b\nar\""],
	["variable", "@'fo\\'o-b\nar'"],
	["variable", "@`fo\\`o-b\nar`"]
];

exports.comment = "should parse variables";

exports.fails = true;
