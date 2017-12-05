const path = require('path');
const fs = require('fs');

const diff = require('deep-diff');
const chalk = require('chalk').default;

const Prism = require('prismjs/components/prism-core');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-css');
require('prismjs/components/prism-css-extras');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-php');
require('prismjs/components/prism-php-extras');

const [lang] = process.argv.slice(2);

function assign(val, key) {
    if (val.inside) {
        return Object.assign({}, val, {
            inside: toObject(val.inside)
        });
    } else if (key === 'rest' || val instanceof Map) {
        return toObject(val);
    } else if (Array.isArray(val)) {
        return val.map(assign);
    } else {
        return val;
    }
}

function toObject(def) {
    const obj = {};

    for (const [key, val] of def) {
        obj[key] = assign(val, key);
    }

    return obj;
}

console.log(chalk.bold('--- Starting new test ---'));

if (!lang || lang === 'all') {
} else {
    require(`prismjs/components/prism-${lang}`);
    const def = require(`./lib/languages/${lang}`);

    if (!Prism.languages[lang]) {
        throw new Error(`${lang} not found in "Prism.languages"`);
    }

    const result = diff.diff(toObject(def[lang]), Prism.languages[lang]);

    if (result === undefined) {
        console.log(chalk.green(' Definitions Match!!! '));
        return;
    }

    result.forEach(r => {
        switch (r.kind) {
            case 'D':
                console.log(chalk.bgRed.black(' D '), chalk.red(`=> ${r.path.join('.')}`));
                break;
            case 'N':
                console.log(chalk.bgGreen.black(' A '), chalk.green(`=> ${r.path.join('.')}`));
                console.log('Value: ');
                console.log(JSON.stringify(r.rhs, null, 2));
                break;
            case 'E':
                console.log(chalk.bgYellow.black(' E '), chalk.yellow(`=> ${r.path.join('.')}`));
                console.log(chalk.red('Old value: '));
                console.log(JSON.stringify(r.lhs, null, 2));
                console.log(' ');
                console.log(chalk.green('New value: '));
                console.log(JSON.stringify(r.rhs, null, 2));
                break;
            default:
                console.log(JSON.stringify(r));
        }
        console.log(' ');
    });
}
