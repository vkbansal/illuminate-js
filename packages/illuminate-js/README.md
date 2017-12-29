<div class='doc-header'>

# Illuminate JS

[![NPM Version](https://img.shields.io/npm/v/illuminate-js.svg?style=flat-square)](https://npmjs.org/package/illuminate-js)
[![Dependency Status](https://david-dm.org/vkbansal/illuminate-js/status.svg?style=flat-square&path=packages/illuminate-js)](https://david-dm.org/vkbansal/illuminate-js?path=packages/illuminate-js)
[![Dev Dependency Status](https://david-dm.org/vkbansal/illuminate-js/dev-status.svg?style=flat-square&path=packages/illuminate-js)](https://david-dm.org/vkbansal/illuminate-js?path=packages/illuminate-js&type=dev)

</div>

Illuminate is a syntax highlighter, based on the well known [prism.js](http://prismjs.com),
rewritten from the ground up in ES6 to be used with projects like
[markdown-it](https://github.com/markdown-it/markdown-it),
[gatsby](https://github.com/gatsbyjs/gatsby), [react](https://facebook.github.io/react/), etc.

**How is it different from Prism?**

* No need of including a client side library, just for highlighting the code snippets (when used
  with markdown-it and gatsby).
* Uses ES6 `Map`s to ensure the order in language definitions.
* `react-illuminate` works in the "react way". No need for `dangerouslySetInnerHTML`.

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
import { javascript } from 'illuminate-js/lib/languages';

addLanguage('javascript', javascript);

// You can alias it too.
addLanguage('js', javascript);

highlight('Your code goes here', 'js');
```

**Usage with markdown-it**

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

## Theming

<details>
<summary>
    IlluminateJS comes with two themes just to get you started. You can include <code>illuminate-js/themes/[theme].css</code> according to your build config.
</summary>

* solarized-light
* tomorrow

</details>

You can also use any of the pre-existings PrismJS themes from [here](https://github.com/PrismJS/prism/tree/gh-pages/themes) and [here](https://github.com/PrismJS/prism-themes)

## Plugins

<details>
<summary>
    <b>Line Numbers Plugin</b>: Show line-numbers for the highlighted code.
</summary>

1. Add the plugin

   ```js
   import { addPlugin } from 'illuminate-js';
   import { lineNumbers } from 'illuminate-js/lib/plugins/lineNumbers';

   addPlugin(lineNumbers);
   ```

2. Using styles from [here](https://github.com/vkbansal/illuminate-js/blob/master/packages/illuminate-js/src/plugins/lineNumbers/style.css) as reference, write your own styles. This file is also available from `illuminate-js/lib/plugins/lineNumbers/style.css`.
   </details>

<details>
<summary>
    <b>Show Language Plugin</b>: Show the language of the highlighted code.
</summary>

1. Add the plugin

   ```js
   import { addPlugin } from 'illuminate-js';
   import { showLanguage } from 'illuminate-js/lib/plugins/showLangauage';

   addPlugin(showLanguage);
   ```

2. Using styles from [here](https://github.com/vkbansal/illuminate-js/blob/master/packages/illuminate-js/src/plugins/showLangauage/style.css) as reference, write your own styles. This file is also available from `illuminate-js/lib/plugins/showLangauage/style.css`.
   </details>

## API

**highlight**
**tokenize**
**addPlugin**
**resetPlugins**
**addLanguage**
**getLanguage**

## License

MIT. Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)
