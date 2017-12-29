/* This file is auto generated, do not change anything here */
export const API = {
    "displayName": "Illuminate",
    "description": "",
    "props": {
        "children": {
            "required": true,
            "type": {
                "name": "string | (number & string) | (true & string) | (false & string) | (string & {}) | (ReactElement<a..."
            },
            "description": "<p>The text to be highlighted</p>\n",
            "defaultValue": null
        },
        "lang": {
            "required": true,
            "type": {
                "name": "string"
            },
            "description": "<p>The language definition, to be used to highlight the text.\nThis must match with one of the language names, used with <code>addLanguage</code></p>\n",
            "defaultValue": null
        },
        "lineNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "<p>Flag to toggle the addition of line-numbers to output.\n<strong>Note</strong>: You might need to add appropriate styles for this to work.\nSee Illuminate Plugins for more details</p>\n",
            "defaultValue": {
                "value": "false"
            }
        },
        "showLanguage": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "<p>Flag to toggle the addition of language name to output.\n<strong>Note</strong>: You might need to add appropriate styles for this to work.\nSee Illuminate Plugins for more details</p>\n",
            "defaultValue": {
                "value": "false"
            }
        },
        "customClasses": {
            "required": false,
            "type": {
                "name": "CustomClasses"
            },
            "description": "<p>By default, Illuminate uses fixed and generic class names.\nUsing this setting, you can cutomize those classes.\nFor example:</p>\n<ul>\n<li>You can namespace classes like <code>.illuminate--string</code> to avoid conflicts with existing CSS.</li>\n<li>You can use <a href=\"https://github.com/css-modules/css-modules\">CSS Modules</a>, like <code>.operator_93jsa</code>.</li>\n</ul>\n@example\n {\n      prefix: 'prefix-',\n      map: {\n          property: 'special-property',\n          string: 'string_ch29s',\n          operator: 'operator_93jsa'\n      }\n}",
            "defaultValue": null
        }
    }
}