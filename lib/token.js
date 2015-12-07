"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hooks = require("./hooks");

var _reduce = require("lodash/collection/reduce");

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = (function () {
    function Token(type, content, alias) {
        _classCallCheck(this, Token);

        this.type = type;
        this.content = content;
        this.alias = alias;
    }

    _createClass(Token, null, [{
        key: "stringify",
        value: function stringify(o, language, parent) {
            if (typeof o === "string") {
                return o;
            }

            if (Array.isArray(o)) {
                return o.map(function (element) {
                    return Token.stringify(element, language, o);
                }).join("");
            }

            var env = {
                type: o.type,
                content: Token.stringify(o.content, language, parent),
                tag: "span",
                classes: ["token", o.type],
                attributes: {},
                language: language,
                parent: parent
            };

            if (env.type === "comment") {
                env.attributes.spellcheck = "true";
            }

            if (o.alias) {
                var _env$classes;

                var aliases = Array.isArray(o.alias) ? o.alias : [o.alias];

                (_env$classes = env.classes).push.apply(_env$classes, _toConsumableArray(aliases));
            }

            (0, _hooks.run)("wrap", env);

            var attributes = (0, _reduce2.default)(env.attributes, function (prev, val, key) {
                return "" + prev + key + "=\"" + (val || "") + "\" ";
            }, "");

            return "<" + env.tag + " class=\"" + env.classes.join(" ") + "\" " + attributes + ">" + env.content + "</" + env.tag + ">";
        }
    }]);

    return Token;
})();

exports.default = Token;