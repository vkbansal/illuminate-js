export let bash: string = `
npm install illuminate-js
`;

export let css: string = `
body {
    background: red;
}
`;

export let markup: string = `
<div>
    Hello world!
</div>
`;

export let javascript: string = `
// es5
var illuminate = require("illuminate-js");
var text = "your code here";
illuminate.highlight(text, "langname");

//es6
import { highlight } from "illuminate";
let text = "your code here";
illuminate.highlight(text, "langname");
`;

export let jsx: string = `
import React from "react";
import Illuminate from "react-illuminate";

class MyApp extends React.Component {
    render() {
        <Illuminate lang="language">
            \`your code here\`
        </Illuminate>
    }
}
`;
