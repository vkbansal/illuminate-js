"use strict";

let illuminate = require("../lib"),
    expect = require("chai").expect;

describe("illuminate", function() {
    describe("getLanguage", function() {
        it("should return a language", function() {
            expect(illuminate.getLanguage("clike")).to.be.an.instanceOf(Object);
        });

        it("should return false when language not found", function() {
            expect(illuminate.getLanguage("foo")).to.be.false;
        });
    });
});
