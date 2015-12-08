"use strict";

let hooks = require("../lib/hooks"),
    expect = require("chai").expect;

describe("hooks", function() {
    let i = 0;

    describe("add", function() {
        it("should accept nonempty string", function() {
            expect(function() { hooks.add(); }).to.throw(Error);
            expect(function() { hooks.add("", function() {}); }).to.throw(Error);
            expect(function() { hooks.add({foo: "bar"}, function() {}); }).to.throw(Error);
            expect(function() { hooks.add(["bar"], function() {}); }).to.throw(Error);
            expect(function() { hooks.add(/foo/, function() {}); }).to.throw(Error);
            expect(function() { hooks.add(function() {}, function() {}); }).to.throw(Error);
            expect(function() { hooks.add("foo", function() { i++; }); }).to.not.throw(Error);
        });

        it("should accept only a function as callback", function() {
            expect(function() { hooks.add("foo", {}); }).to.throw(Error);
            expect(function() { hooks.add("foo", []); }).to.throw(Error);
            expect(function() { hooks.add("foo", "bar"); }).to.throw(Error);
            expect(function() { hooks.add("foo", /foo/); }).to.throw(Error);
            expect(function() { hooks.add("foo", function() { i++; }); }).to.not.throw(Error);
        });
    });

    describe("run", function() {
        it("should run callbacks", function() {
            hooks.run("foo");
            expect(i).to.equals(2);
        });
    });
});
