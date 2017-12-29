# React Illuminate

[![NPM Version](https://img.shields.io/npm/v/react-illuminate.svg?style=flat-square)](https://npmjs.org/package/react-illuminate)
[![Dependency Status](https://david-dm.org/vkbansal/illuminate-js/status.svg?style=flat-square&path=packages/react-illuminate)](https://david-dm.org/vkbansal/illuminate-js?path=packages/react-illuminate)
[![Peer Dependency Status](https://david-dm.org/vkbansal/illuminate-js/peer-status.svg?style=flat-square&path=packages/react-illuminate)](https://david-dm.org/vkbansal/illuminate-js?type=peer&path=packages/react-illuminate)
[![Dev Dependency Status](https://david-dm.org/vkbansal/illuminate-js/dev-status.svg?style=flat-square&path=packages/react-illuminate)](https://david-dm.org/vkbansal/illuminate-js?type=dev&path=packages/react-illuminate)

## Install

```bash
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

## License

MIT. Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)
