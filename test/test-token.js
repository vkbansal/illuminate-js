/* eslint-disable */
"use strict";

let Token = require("../lib/token").default,
    expect = require("chai").expect;

describe("Token", function() {
    describe("stringify", function() {
        it("should work with string", function() {
            expect(Token.stringify("test")).to.equal("test");
        });

        it("should work with single token", function() {
            let token = new Token("keyword", "TESTING", "");

            expect(Token.stringify(token)).to.equal("<span class=\"token keyword\" >TESTING</span>");
        });

        it("should work with array of tokens", function() {
            let tokens = [
                new Token("keyword", "TESTING", ""),
                new Token("keyword", "TESTING", ""),
                new Token("keyword", "TESTING", "")
            ];

            expect(Token.stringify(tokens)).to.equal("<span class=\"token keyword\" >TESTING</span><span class=\"token keyword\" >TESTING</span><span class=\"token keyword\" >TESTING</span>");
        });

    });
});
