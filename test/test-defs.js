"use strict";

// require("babel-register");

let languages = require("../lib/languages"),
    expect = require("chai").expect,
    isObj = require("is-plain-object");


function test(def, description) {
    let keys = Object.keys(def);

    it(description, () => {
        expect(def).to.include.keys("_order");
        expect(def._order).to.be.instanceOf(Array);
        expect(keys.length).to.equal(def._order.length + 1);
    });

    keys.forEach(function(key) {
        if (isObj(def[key]) && def[key].inside) {
            test(def[key].inside, `${key}.inside must contain proper _order array`);
        }
    });
}

function testLang(lang) {
    describe(`${lang} should have proper definition`, () => {
        let def = languages[lang];

        test(def, "root should contain proper _order array");
    });
}


describe("languages must have proper definition", function() {
    Object.keys(languages).forEach(testLang);
});
