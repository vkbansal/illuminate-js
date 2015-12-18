exports.input = `
;
; foobar
`;

exports.expected = [
    ["comment", ";"],
    ["comment", "; foobar"]
];

exports.comment = "should parse comments";
