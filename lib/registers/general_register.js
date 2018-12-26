'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasKey = hasKey;
exports.deleteKey = deleteKey;
exports.merge = merge;
exports.getValue = getValue;
exports.getRegister = getRegister;
exports.setValue = setValue;

var _immutable = require('immutable');

// register implementation

/*
 * Possible register key/values
 *
 * apiEndpoint: string - used when sending requests to server
 *
 * authenticationReducerName: string - key for authentication reducer
 *
 * entityCollectionItemsCountFieldName: string - new name for 'itemsCount' field of entity collection meta
 * entityCollectionTotalItemCountFieldName: string - new name for 'totalItemCount' field of entity collection meta
 *
 */

// local imports

// type definitions
var registerInstance = (0, _immutable.Map)();function hasKey(key) {
    return registerInstance.has(key);
}

function deleteKey(key) {
    if (!hasKey(key)) {
        throw new Error('Key "' + key + '" does not exist it registry');
    }

    registerInstance = registerInstance.delete(key);
}

function merge(newMap) {
    registerInstance = registerInstance.merge(newMap);
}

function getValue(key) {
    if (!hasKey(key)) {
        throw new Error('Key "' + key + '" does not exist it registry');
    }

    return registerInstance.get(key);
}

function getRegister() {
    return registerInstance;
}

function setValue(key, value) {
    registerInstance = registerInstance.set(key, value);
}