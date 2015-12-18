exports.input = `
;
; foobar
`;

exports.expected = [
    ["comment", ";"],
    "\n",
    ["comment", "; foobar"]
];

exports.comment = "should parse comments";
