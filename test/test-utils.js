"use strict";

let utils = require("../lib/utils"),
    expect = require("chai").expect;

describe("utils", function() {
    it("should encode chars", function() {
        expect(utils.encode("<span>Fire & ice</span>")).to.equals("&lt;span&gt;Fire &amp; ice&lt;/span&gt;");
    });
});
