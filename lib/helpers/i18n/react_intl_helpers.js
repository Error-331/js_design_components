'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _require = require('ramda'),
    keys = _require.keys,
    reduce = _require.reduce;

// local imports


// helpers implementation
var formatMessages = exports.formatMessages = function formatMessages(formatMessageFunc, messagesObject) {
    var messageKeys = keys(messagesObject);

    return reduce(function (formattedMessagesObject, messageKey) {
        formattedMessagesObject[messageKey] = formatMessageFunc(messagesObject[messageKey]);
        return formattedMessagesObject;
    }, {}, messageKeys);
};