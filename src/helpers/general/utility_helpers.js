'use strict';

// @flow

// external imports
import {is, isEmpty, complement} from 'ramda';

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

export const isNullOrUndefined = (value: ?mixed): boolean  => {
    return value === null || value === undefined;
};

export const isNotNullOrUndefined = (value: ?mixed): boolean  => {
    return value !== null && value !== undefined;
};

export const isNotNil = (value: mixed): boolean %checks => {
    return value !== undefined && value !== null;
};

export const isNotEmpty = (value: ?Array<any> | Object | string): boolean => {
    return complement(isEmpty)(value);
};
