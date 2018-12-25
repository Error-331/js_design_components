'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeHapiBoomError = exports.isHapiBoomError = undefined;

var _ramda = require('ramda');

// functions implementation


// internal imports
var isHapiBoomError = exports.isHapiBoomError = function isHapiBoomError(responseStatus, jsonData) {
    if ((0, _ramda.isNil)(jsonData)) {
        return false;
    }

    var testFunc = (0, _ramda.where)({ statusCode: (0, _ramda.is)(Number), error: (0, _ramda.is)(String), message: (0, _ramda.is)(String) });
    return responseStatus >= 400 && testFunc(jsonData);
};var makeHapiBoomError = exports.makeHapiBoomError = function makeHapiBoomError(error) {
    return {
        statusCode: 500,
        error: 'Bad Request',
        message: error.message
    };
};