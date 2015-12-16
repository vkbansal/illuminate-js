"use strict";

// require("babel-register");

let languages = require("../lib/languages"),
    expect = require("chai").expect,
    isObj = require("is-plain-object"),
    diffArr = require("array-differ");


function test(def, path) {
    let keys = Object.keys(def);

    path = path || ["root"];

    it(`${path.join(".")} must contain proper _order array`, () => {
        expect(def).to.include.keys("_order");
        expect(def._order).to.be.instanceOf(Array);
        expect(diffArr(keys, def._order)).to.eql(["_order"]);
        expect(keys.length).to.equal(def._order.length + 1);
    });

    keys.forEach(function(key) {
        if (isObj(def[key]) && def[key].inside) {
            test(def[key].inside, path.concat(`${key}.inside`));
        }
    });
}

function testLang(lang) {
    describe(`${lang} should have proper definition`, () => {
        test(languages[lang]);
    });
}


describe("languages must have proper definition", function() {
    Object.keys(languages).forEach(testLang);
});
