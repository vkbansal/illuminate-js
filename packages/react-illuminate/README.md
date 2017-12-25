# React Illuminate

[![NPM Version](https://img.shields.io/npm/v/react-illuminate.svg?style=flat-square)](https://npmjs.org/package/react-illuminate)
[![Dependency Status](https://david-dm.org/vkbansal/illuminate-js/status.svg?style=flat-square&path=packages/react-illuminate)](https://david-dm.org/vkbansal/illuminate-js?path=packages/react-illuminate)
[![Peer Dependency Status](https://david-dm.org/vkbansal/illuminate-js/peer-status.svg?style=flat-square&path=packages/react-illuminate)](https://david-dm.org/vkbansal/illuminate-js?type=peer&path=packages/react-illuminate)
[![Dev Dependency Status](https://david-dm.org/vkbansal/illuminate-js/dev-status.svg?style=flat-square&path=packages/react-illuminate)](https://david-dm.org/vkbansal/illuminate-js?type=dev&path=packages/react-illuminate)

## Install

```bash
# to use with node/markdown-it
npm install --save illuminate-js

# to use with react
npm install --save illuminate-js react-illuminate
```

## Usage

```js
import { addLanguage } from 'illuminate-js';
import { javascript } from 'illuminate-js/lib/languages';
import { Illuminate } from 'react-Illuminate';

addLanguage('js', javascript);

<Illuminate lang="js">
    {`
      /** Your Code Sample here **/
      var foo = 123;
    `}
</Illuminate>;
```

## Theming

You can use any of the pre-existings PrismJS themes from [here](https://github.com/PrismJS/prism/tree/gh-pages/themes) and [here](https://github.com/PrismJS/prism-themes)

## License

MIT. Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)
