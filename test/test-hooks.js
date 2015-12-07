"use strict";

let hooks = require("../lib/hooks"),
    expect = require("chai").expect;

describe("hooks", function() {
    let i = 0;

    describe("add", function() {
        hooks.add();
    });
});
