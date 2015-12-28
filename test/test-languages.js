"use strict";

let illuminate = require("../lib"),
    expect = require("chai").expect,
    requireDir = require("require-dir"),
    transformer = require("./helpers/token-transformer"),
    argv = require("yargs").argv,
    chalk = require("chalk");

let tests = requireDir("./languages", { recurse: true });

function testFeature(lang, key) {
    let test = tests[lang][key],
        input = test.input.trim(),
        comment = test.comment || `should parse ${key} correctly`,
        tokens = illuminate.tokenize(input, illuminate.getLanguage(lang));

    if (test.fails) {
        it(comment, function() {
            expect(transformer(tokens)).not.to.be.eql(test.expected);
        });
    } else {
        it(`[failure] ${comment}`, function() {
            expect(transformer(tokens)).to.be.eql(test.expected);
        });
    }
}

function testLang(lang) {
    describe(`${lang} must parse correctly`, function() {
        Object.keys(tests[lang]).forEach((key) => testFeature(lang, key));
    });
}

if (argv.lang) {
    if (tests[argv.lang]) {
        return testLang(argv.lang);
    }

    console.log("  " + chalk.bgRed(`tests for ${chalk.bold.underline(argv.lang)} not found!`));
} else {
    describe("languages must parse correctly", function() {
        Object.keys(tests).forEach(testLang);
    });
}
