'use strict';

// @flow

// external imports
const { is, isEmpty, complement } = require('ramda');

// local imports

// helpers implementation
const isCanBeEmpty = (value: ?any): boolean => {
    if (isNullOrUndefined(value)) {
        return false;
    } else if (is(Array, value) || is(Object, value) || is(String, value)) {
        return true;
    } else {
        return false;
    }
};

const isNullOrUndefined = (value: ?mixed): boolean  => {
    return value === null || value === undefined;
};

const isNotNullOrUndefined = (value: ?mixed): boolean  => {
    return value !== null && value !== undefined;
};

const isNotNil = (value: mixed): boolean %checks => {
    return value !== undefined && value !== null;
};

const isNotEmpty = (value: ?Array<any> | Object | string): boolean => {
    return complement(isEmpty)(value);
};


// exports
module.exports.isCanBeEmpty = isCanBeEmpty;
module.exports.isNullOrUndefined = isNullOrUndefined;
module.exports.isNotNullOrUndefined = isNotNullOrUndefined;
module.exports.isNotNil = isNotNil;
module.exports.isNotEmpty = isNotEmpty;