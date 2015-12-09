"use strict";

let utils = require("../lib/utils"),
    expect = require("chai").expect;

describe("utils", function() {
    describe("encode", function() {
        it("should encode chars", function() {
            expect(utils.encode("<span>Fire & ice</span>")).to.equals("&lt;span&gt;Fire &amp; ice&lt;/span&gt;");
        });
    });

    describe("lang", function() {
        describe("extend", function() {
            let arr = [
                    ["one", "I"],
                    ["two", "2"],
                    ["three", "III"]
                ],
                ext = [
                    ["two", "II"],
                    ["four", "IV"],
                    ["five", "V"]
                ];


            it("should extend", function() {
                expect(utils.lang.extend(arr, ext)).to.eql([
                    ["one", "I"],
                    ["two", "II"],
                    ["three", "III"],
                    ["four", "IV"],
                    ["five", "V"]
                ]);
            });

            it("should not mutate original objects", function() {
                expect(arr).to.eql([
                    ["one", "I"],
                    ["two", "2"],
                    ["three", "III"]
                ]);

                expect(ext).to.eql([
                    ["two", "II"],
                    ["four", "IV"],
                    ["five", "V"]
                ]);
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
                utils.lang.insertBefore(arr, "two", ["test1"], ["test2"]);
                expect(arr).to.eql([
                    ["one"],
                    ["test1"],
                    ["test2"],
                    ["two"],
                    ["three"]
                ]);
            });

            it("should insert in at start", function() {
                utils.lang.insertBefore(arr, "one", ["test1"], ["test2"]);
                expect(arr).to.eql([
                    ["test1"],
                    ["test2"],
                    ["one"],
                    ["two"],
                    ["three"]
                ]);
            });

            it("should do nothing for invalid key", function() {
                utils.lang.insertBefore(arr, "foo", ["test1"], ["test2"]);
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
                utils.lang.insertAfter(arr, "two", ["test1"], ["test2"]);
                expect(arr).to.eql([
                    ["one"],
                    ["two"],
                    ["test1"],
                    ["test2"],
                    ["three"]
                ]);
            });

            it("should insert at end", function() {
                utils.lang.insertAfter(arr, "three", ["test1"], ["test2"]);
                expect(arr).to.eql([
                    ["one"],
                    ["two"],
                    ["three"],
                    ["test1"],
                    ["test2"]
                ]);
            });

            it("should do nothing for invalid key", function() {
                utils.lang.insertAfter(arr, "foo", ["test1"], ["test2"]);
                expect(arr).to.eql([
                    ["one"],
                    ["two"],
                    ["three"]
                ]);
            });
        });
    });
});
