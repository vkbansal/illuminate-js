"use strict";

import Immutable from "immutable";

Immutable.OrderedMap.prototype.setBefore = function(beforeKey, newKey, newValue) {
    let omap = Immutable.OrderedMap();

    return omap.withMutations((map) => {
        this.forEach((value, key) => {
            if (key === beforeKey) {
                map.set(newKey, newValue);
            }
            map.set(key, value);
        });
    });
};

Immutable.OrderedMap.prototype.setAfter = function(afterKey, newKey, newValue) {
    let omap = Immutable.OrderedMap();

    return omap.withMutations((map) => {
        this.forEach((value, key) => {
            map.set(key, value);
            if (key === afterKey) {
                map.set(newKey, newValue);
            }
        });
    });
};
