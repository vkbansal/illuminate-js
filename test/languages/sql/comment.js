exports.input = `
/**/
/* foo
bar */
--
-- foo
//
// foo
#
# foo
`;

exports.expected = [
    ["comment", "/**/"],
	["comment", "/* foo\nbar */"],
	["comment", "--"],
	["comment", "-- foo"],
	["comment", "//"],
	["comment", "// foo"],
	["comment", "#"],
	["comment", "# foo"]
];

exports.comment = "should parse single/multiline comments";
