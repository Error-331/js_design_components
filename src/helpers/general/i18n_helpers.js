'use strict';

// external imports
const {keys, reduce} = require('ramda');

// local imports

// helpers implementation
// TODO: types
export const formatMessages = (formatMessageFunc, messagesObject) => {
    const messageKeys = keys(messagesObject);

    return reduce((formattedMessagesObject, messageKey) => {
        formattedMessagesObject[messageKey] = formatMessageFunc(messagesObject[messageKey]);
        return formattedMessagesObject;
    }, {}, messageKeys);
};
