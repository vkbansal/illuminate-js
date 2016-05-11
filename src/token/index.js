"use strict";

import stringify from "./stringify";

class Token {
    constructor(type, content, alias) {
        this.type = type;
        this.content = content;
        this.alias = alias;
    }

    static stringify() {
        return stringify(...arguments);
    }
}

export default Token;
