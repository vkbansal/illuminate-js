"use strict";

let utils = require("../lib/utils"),
    expect = require("chai").expect;

describe("utils", function() {
    describe("encode", function() {
        it("should encode chars", function() {
            expect(utils.encode("<span>Fire & ice</span>")).to.equals("&lt;span&gt;Fire &amp; ice&lt;/span&gt;");
        });
    });

    describe("insertBefore", function() {
        let arr;

        beforeEach(function() {
            arr = [
                ["one"],
                ["two"],
                ["three"]
            ];
        });

        it("should insert in between", function() {
            utils.insertBefore(arr, "two", ["test1"], ["test2"]);
            expect(arr).to.eql([
                ["one"],
                ["test1"],
                ["test2"],
                ["two"],
                ["three"]
            ]);
        });

        it("should insert in at start", function() {
            utils.insertBefore(arr, "one", ["test1"], ["test2"]);
            expect(arr).to.eql([
                ["test1"],
                ["test2"],
                ["one"],
                ["two"],
                ["three"]
            ]);
        });

        it("should do nothing for invalid key", function() {
            utils.insertBefore(arr, "foo", ["test1"], ["test2"]);
            expect(arr).to.eql([
                ["one"],
                ["two"],
                ["three"]
            ]);
        });
    });

    describe("insertAfter", function() {
        let arr;

        beforeEach(function() {
            arr = [
                ["one"],
                ["two"],
                ["three"]
            ];
        });

        it("should insert in between", function() {
            utils.insertAfter(arr, "two", ["test1"], ["test2"]);
            expect(arr).to.eql([
                ["one"],
                ["two"],
                ["test1"],
                ["test2"],
                ["three"]
            ]);
        });

        it("should insert at end", function() {
            utils.insertAfter(arr, "three", ["test1"], ["test2"]);
            expect(arr).to.eql([
                ["one"],
                ["two"],
                ["three"],
                ["test1"],
                ["test2"]
            ]);
        });

        it("should do nothing for invalid key", function() {
            utils.insertAfter(arr, "foo", ["test1"], ["test2"]);
            expect(arr).to.eql([
                ["one"],
                ["two"],
                ["three"]
            ]);
        });
    });
});
