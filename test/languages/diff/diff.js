exports.input = `!     qt: core

-    qt: core
+    qt: core gui

< qt: core
> qt: core quick
`;

exports.expected = [
	["diff", "!     qt: core"],
	["deleted", "-    qt: core"],
	["inserted", "+    qt: core gui"],
	["deleted", "< qt: core"],
	["inserted", "> qt: core quick"]
];

exports.comment = "should check for deleted, inserted and different lines";
