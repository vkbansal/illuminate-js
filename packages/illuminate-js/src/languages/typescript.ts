import { Definition } from '../illuminate';
import { javascript } from './javascript';
import { clone } from '../utils';

const typescript: Definition = clone(javascript);

typescript.set(
    'keyword',
    /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|false|true|module|declare|constructor|string|Function|any|number|boolean|Array|symbol|namespace|abstract|require|type|Map|Set|WeakMap|WeakSet)\b/
);

export { typescript };
