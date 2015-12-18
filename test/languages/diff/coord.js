exports.input = `
7c7

*** 4,8 ****
--- 4,8 ----

@@ -4,5 +4,5 @@
`;

exports.expected = [
	["coord", "7c7"],
	["coord", "*** 4,8 ****"],
	["coord", "--- 4,8 ----"],
	["coord", "@@ -4,5 +4,5 @@"]
];

exports.comment = "should check for coords";
