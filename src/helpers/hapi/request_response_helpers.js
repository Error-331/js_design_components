'use strict';

// @flow

// external imports
import {isNil, is, where} from 'ramda';

// internal imports
import type {JSONDataType} from './../../types/general';

// functions implementation
export const isHapiBoomError = (responseStatus: number, jsonData?: JSONDataType): boolean => {
    if (isNil(jsonData)) {
        return false;
    }

    const testFunc: (jsonData: {[string]: mixed}) => boolean = where({statusCode: is(Number), error: is(String), message: is(String)});
    return responseStatus >= 400 && testFunc(jsonData);
};

export const makeHapiBoomError = (error: Error): {statusCode: number, error: string, message: string} => {
    return {
        statusCode: 500,
        error: 'Bad Request',
        message: error.message
    };
};