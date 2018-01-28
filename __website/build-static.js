const fs = require('fs');
const path = require('path');

const MarkdownIt = require('markdown-it');
const docgen = require('react-docgen-typescript');
const glob = require('glob');
const camelcase = require('lodash.camelcase');

const { addLanguage, highlight, getLanguage } = require('../packages/illuminate-js/lib/illuminate');
const { jsx, bash, tsx } = require('../packages/illuminate-js/lib/languages');

const parser = docgen.withDefaultConfig();

addLanguage('js', jsx);
addLanguage('ts', tsx);
addLanguage('bash', bash);

const md = MarkdownIt({
    html: true,
    highlight: function(str, lang) {
        if (lang && getLanguage(lang)) {
            return highlight(str, lang);
        }

        return str;
    }
});

const header = '/* This file is auto generated, do not change anything here */\n';

const docTpl = fs.readFileSync(path.resolve(__dirname, './templates/Docs.tsx.tpl'), 'utf8');

let languages = glob.sync(path.resolve(__dirname, '../packages/illuminate-js/src/languages/*.ts'));

languages = languages.reduce((p, c) => {
    return `${p}\n- ${path.basename(c, '.ts')}`;
}, '');

fs.writeFileSync(path.join(__dirname, 'pages', `languages.md`), languages, 'utf8');

const pages = glob.sync(path.join(__dirname, 'pages', '[0-9][0-9].*.md'));

pages.forEach((page) => {
    let content = fs.readFileSync(page, 'utf8');

    /**
     * Include content from given files
     * Look for "!!!include(path/to/file.ext)!!!" and include its contents
     */
    content = content.replace(/!{3}include\((.*)\)!{3}/, (match, p1) => {
        const replacement = fs.readFileSync(path.resolve(__dirname, p1), 'utf8');

        return replacement;
    });

    let html = md.render(content).replace(/`/g, '\\`');

    let fileName = path.basename(page, '.md'); // 01.getting-started
    fileName = fileName.replace(/^\d{2}\./, ''); // getting-started
    fileName = camelcase(fileName); // gettingStarted
    fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1); // GettingStarted

    html = header + docTpl.replace('$Content', html).replace('$Name', fileName);

    fs.writeFileSync(path.join(__dirname, 'components', `${fileName}.tsx`), html, 'utf8');
});

let ReactIlluminateAPI = parser.parse(
    path.resolve(__dirname, '../packages/react-illuminate/src/Illuminate.tsx')
);

ReactIlluminateAPI = Object.assign({}, ReactIlluminateAPI[0], {
    props: Object.keys(ReactIlluminateAPI[0].props).reduce((p, c) => {
        const prop = ReactIlluminateAPI[0].props[c];

        const [description, example] = prop.description.split('@example');

        return Object.assign(p, {
            [c]: Object.assign({}, prop, {
                description: md.render(description) + (example ? `@example\n${example}` : '')
            })
        });
    }, {})
});

fs.writeFileSync(
    path.join(__dirname, 'components', `ReactIlluminateAPI.json`),
    JSON.stringify(ReactIlluminateAPI, null, 4),
    'utf8'
);
