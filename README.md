# Illuminate (WIP)

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][dev-deps-image]][dev-deps-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Code Climate][climate-image]][climate-url]

Illuminate is a syntax highlighter based on [prism.js](http://prismjs.com), rewritten in `ES6` specifically for `node.js`.

It can also be used with [markdow-it](https://github.com/markdown-it/markdown-it) and [react](http://facebook.github.io/react/) !

## Install

```bash
npm install illuminate-js
```

## Usage

```js
// es5
var illuminate = require("illuminate-js");

var text = "your code here";

illuminate.highlight(text, "langname");


//es6
import { highlight } from "illuminate";

let text = "your code here";

illuminate.highlight(text, "langname");
```

**Usage with `markdown-it`**

```js
var illuminate = require('illuminate-js')

var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && illuminate.getLanguage(lang)) {
        return illuminate.highlight(str, lang);
    }

    return '';
  }
});
```

## Related Projects
 - [react-illuminate](https://github.com/vkbansal/react-illuminate) - Syntax highlighting in React.

## License

MIT. Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)

[npm-url]: https://npmjs.org/package/illuminate-js
[npm-image]: http://img.shields.io/npm/v/illuminate-js.svg?style=flat-square

[travis-url]: https://travis-ci.org/vkbansal/illuminate-js
[travis-image]: http://img.shields.io/travis/vkbansal/illuminate-js/master.svg?style=flat-square

[deps-url]: https://david-dm.org/vkbansal/illuminate-js
[deps-image]: https://img.shields.io/david/vkbansal/illuminate-js.svg?style=flat-square

[dev-deps-url]: https://david-dm.org/vkbansal/illuminate-js
[dev-deps-image]: https://img.shields.io/david/dev/vkbansal/illuminate-js.svg?style=flat-square

[coverage-url]: https://coveralls.io/r/vkbansal/illuminate-js?branch=master
[coverage-image]: http://img.shields.io/coveralls/vkbansal/illuminate-js/master.svg?style=flat-square

[climate-url]: https://codeclimate.com/github/vkbansal/illuminate-js
[climate-image]: http://img.shields.io/codeclimate/github/vkbansal/illuminate-js.svg?style=flat-square
