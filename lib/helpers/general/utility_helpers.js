'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNotEmpty = exports.isNotNil = exports.isNotNullOrUndefined = exports.isNullOrUndefined = undefined;

var _ramda = require('ramda');

// local imports

// helpers implementation
var isCanBeEmpty = function isCanBeEmpty(value) {
    if (isNullOrUndefined(value)) {
        return false;
    } else if ((0, _ramda.is)(Array, value) || (0, _ramda.is)(Object, value) || (0, _ramda.is)(String, value)) {
        return true;
    } else {
        return false;
    }
};var isNullOrUndefined = exports.isNullOrUndefined = function isNullOrUndefined(value) {
    return value === null || value === undefined;
};

var isNotNullOrUndefined = exports.isNotNullOrUndefined = function isNotNullOrUndefined(value) {
    return value !== null && value !== undefined;
};

var isNotNil = exports.isNotNil = function isNotNil(value) {
    return value !== undefined && value !== null;
};

var isNotEmpty = exports.isNotEmpty = function isNotEmpty(value) {
    return (0, _ramda.complement)(_ramda.isEmpty)(value);
};