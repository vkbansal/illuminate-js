# Illuminate

[![Build Status](http://img.shields.io/travis/vkbansal/illuminate-js/master.svg?style=flat-square)](https://travis-ci.org/vkbansal/illuminate-js)

[![NPM version](http://img.shields.io/npm/v/illuminate-js.svg?style=flat-square)](https://npmjs.org/package/illuminate-js)
[![Dependency Status](https://david-dm.org/vkbansal/illuminate-js/status.svg?style=flat-square)](https://david-dm.org/vkbansal/illuminate-js?path=packages/illuminate-js)
[![Dev Dependency Status](https://david-dm.org/vkbansal/illuminate-js/dev-status.svg?style=flat-square&path=packages/illuminate-js)](https://david-dm.org/vkbansal/illuminate-js?type=dev&path=packages/illuminate-js)

[![NPM version](http://img.shields.io/npm/v/react-illuminate.svg?style=flat-square)](https://npmjs.org/package/illuminate-js)
[![Dependency Status](https://david-dm.org/vkbansal/illuminate-js/status.svg?style=flat-square&path=packages/react-illuminate)](https://david-dm.org/vkbansal/react-illuminate?path=packages/react-illuminate)
[![Dev Dependency Status](https://david-dm.org/vkbansal/illuminate-js/dev-status.svg?style=flat-square&path=packages/react-illuminate)](https://david-dm.org/vkbansal/react-illuminate?type=dev&path=packages/react-illuminate)

Illuminate, a syntax highlighter inspired from [prism.js](http://prismjs.com), written in `ES6`
specifically to be used with node.js, [markdown-it](https://github.com/markdown-it/markdown-it) and
[react](http://facebook.github.io/react/)

## Install

```bash
# to use with node/markdown-it
npm install --save illuminate-js

# to use with react
npm install --save illuminate-js react-illuminate
```

## Usage

```js
import { addLanguage, highlight } from 'illuminate-js';
// import only the language definitions you want to use
import { javascript } from 'illuminate-js/lib/language/javascript';

// Add languages and also alias them
addLanguage('javascript', javascript);
addLanguage('js', javascript);

let text = 'let foo = 123;';

// use it!
illuminate.highlight(text, 'js');
```

**Usage with `markdown-it`**

```js
import { addLanguage, highlight, getLangauge } from 'illuminate-js';
import { javascript } from 'illuminate-js/lib/language/javascript';

addLanguage('js', javascript);

var md = require('markdown-it')({
    highlight: function(str, lang) {
        if (lang && getLanguage(lang)) {
            return highlight(str, lang);
        }

        return '';
    }
});
```

**Usage with `react`**

```js
import { addLanguage } from 'illuminate-js';
import { javascript } from 'illuminate-js/lib/language/javascript';
import { Illuminate } from 'react-Illuminate';

addLanguage('js', javascript);

<Illuminate lang="js">
    {`
      /** Your Code Sample here **/
      var foo = 123;
    `}
</Illuminate>;
```

## Why?

* Can be used with static-site generators like [gatsby](https://github.com/gatsbyjs/gatsby), no need
  of including a client side library just for highlighting the code snippets.
* Uses ES6 `Map`s to ensure the order in language definitions.
* `react-illuminate` works in the "react way". No need for `dangerouslySetInnerHTML`.

## License

MIT. Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)
