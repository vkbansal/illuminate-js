# Illuminate JS

[![NPM Version](https://img.shields.io/npm/v/illuminate-js.svg?style=flat-square)](https://npmjs.org/package/illuminate-js)
[![Dependency Status](https://david-dm.org/vkbansal/illuminate-js/status.svg?style=flat-square&path=packages/illuminate-js)](https://david-dm.org/vkbansal/illuminate-js?path=packages/illuminate-js)
[![Dev Dependency Status](https://david-dm.org/vkbansal/illuminate-js/dev-status.svg?style=flat-square&path=packages/illuminate-js)](https://david-dm.org/vkbansal/illuminate-js?path=packages/illuminate-js&type=dev)

Illuminate is a syntax highlighter, based on the well known [prism.js](http://prismjs.com),
rewritten from the ground up in ES6 to be used with projects like
[markdown-it](https://github.com/markdown-it/markdown-it),
[gatsby](https://github.com/gatsbyjs/gatsby), [react](https://facebook.github.io/react/), etc.

## Install

```bash
npm install --save illuminate-js
```

## Usage

Before you can use the highlighter, you will need to add the languages defintions you want to use,
as shown below. This helps in keeping the bundle size down.

```js
import { addLanguage, highlight } from 'illuminate-js';

// for example, if you want to highlight 'javascript'
import { javascript } from 'illuminate-js/lib/languages/javascript';

addLanguage('javascript', javascript);

// You can alias it too.
addLanguage('js', javascript);

highlight('Your code goes here', 'js');
```

## Theming

You can use any of the pre-existings PrismJS themes from [here](https://github.com/PrismJS/prism/tree/gh-pages/themes) and [here](https://github.com/PrismJS/prism-themes)

## Usage with markdown-it

```js
import MarkdownIt from 'markdown-it';
import { addLanguage, highlight, getLangauge } from 'illuminate-js';
import { javascript } from 'illuminate-js/lib/languages/javascript';

addLanguage('js', javascript);

const md = MarkdownIt({
    highlight: function(str, lang) {
        if (lang && getLanguage(lang)) {
            return highlight(str, lang);
        }

        return str;
    }
});
```

## How is it different from Prism?

* No need of including a client side library, just for highlighting the code snippets (when used
  with markdown-it and gatsby).
* Uses ES6 `Map`s to ensure the order in language definitions.
* `react-illuminate` works in the "react way". No need for `dangerouslySetInnerHTML`.

## License

MIT. Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)
