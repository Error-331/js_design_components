'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLocalStorageKey = exports.getLocalStorageKey = exports.removeLocalStorageKey = exports.getLocalStorageObject = undefined;

var _ramda = require('ramda');

// helpers implementation
var getLocalStorageObject = exports.getLocalStorageObject = function getLocalStorageObject() {
    if ((0, _ramda.isNil)(window.localStorage)) {
        throw new Error('Browser local storage is unavailable');
    }

    return window.localStorage;
};var removeLocalStorageKey = exports.removeLocalStorageKey = function removeLocalStorageKey(keyName) {
    var localStorage = getLocalStorageObject();
    return localStorage.removeItem(keyName);
};

var getLocalStorageKey = exports.getLocalStorageKey = function getLocalStorageKey(keyName) {
    var localStorage = getLocalStorageObject();
    return localStorage.getItem(keyName);
};

var setLocalStorageKey = exports.setLocalStorageKey = function setLocalStorageKey(keyName, keyValue) {
    var localStorage = getLocalStorageObject();
    localStorage.setItem(keyName, String(keyValue));
};