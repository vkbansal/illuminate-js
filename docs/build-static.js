const fs = require('fs');
const path = require('path');

const MarkdownIt = require('markdown-it');
const docgen = require('react-docgen-typescript');

// const { addLanguage, highlight, getLanguage } = require('../packages/illuminate-js/lib/illuminate');
// const { jsx, bash } = require('../packages/illuminate-js/lib/languages');

const parser = docgen.withDefaultConfig();

// addLanguage('js', jsx);
// addLanguage('bash', bash);

// const md = MarkdownIt({
//     html: true,
//     highlight: function(str, lang) {
//         if (lang && getLanguage(lang)) {
//             return highlight(str, lang);
//         }

//         return str;
//     }
// });

const header = '/* This file is auto generated, do not change anything here */\n';

function getContent(content, name) {
    const html = md.render(content).replace(/`/g, '\\`');
    return header + docTpl.replace('$Content', html).replace('$Name', name);
}

// const docTpl = fs.readFileSync(path.resolve(__dirname, './Docs.tsx.tpl'), 'utf8');
// const mainDoc = fs.readFileSync(
//     path.resolve(__dirname, '../packages/illuminate-js/README.md'),
//     'utf8'
// );
// const reactDoc = fs.readFileSync(
//     path.resolve(__dirname, '../packages/react-illuminate/README.md'),
//     'utf8'
// );

// fs.writeFileSync(path.resolve(__dirname, './Main.tsx'), getContent(mainDoc, 'Main'), 'utf8');

// fs.writeFileSync(
//     path.resolve(__dirname, './ReactApi.tsx'),
//     getContent(reactDoc, 'ReactApi'),
//     'utf8'
// );

console.log(parser.parse(path.resolve(__dirname, '../src/illuminate.ts')));
