exports.input = `
;
; foobar
`;

exports.expected = [
    ["comment", ";"],
    "\n",
    ["comment", "; foobar"]
];

exports.comment = "Checks for comments";
