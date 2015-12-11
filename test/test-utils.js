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
            let src = {a: {b: 0}, c: 3, _order: ["a", "c"]},
                ext = {a: {b: 1, c: 3}, b: {a: 1, c: 2}};

            let def = utils.lang.extend(src, ext);

            it("should extend", function() {
                expect(def).to.eql({a: {b: 1, c: 3}, c: 3, b: {a: 1, c: 2}, _order: ["a", "c", "b"]});
            });
        });

        describe("insertBefore", function() {
            let src, ext;

            beforeEach(function() {
                src = {a: {b: 0}, c: 3, _order: ["a", "c"]};
                ext = {b: {b: 1, c: 2}, _order: ["b"]};
            });

            it("should insert in between", function() {
                utils.lang.insertBefore(src, "c", ext);
                expect(src).to.eql({
                    a: {b: 0},
                    b: {b: 1, c: 2},
                    c: 3,
                    _order: ["a", "b","c"]
                });

                expect(src._order).to.eql(["a", "b","c"]);
            });
        });
    });
});
