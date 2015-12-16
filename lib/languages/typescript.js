"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.typescript = undefined;

var _utils = require("../utils");

var _javascript = require("./javascript");

var typescript = _utils.lang.extend(_javascript.javascript, {
    keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield|module|declare|constructor|string|Function|any|number|boolean|Array|enum)\b/,
    _order: ["keyword"]
});

exports.typescript = typescript;