'use strict';

// @flow

// external imports
const {keys, reduce} = require('ramda');

// local imports
import type {ReactIntlDefinedMessagesType, ReactIntlFormattedMessagesType, ReactIntlFormatMessageFunc} from './../../types/react_intl';

// helpers implementation
export const formatMessages = (formatMessageFunc: ReactIntlFormatMessageFunc, messagesObject: ReactIntlDefinedMessagesType): ReactIntlFormattedMessagesType => {
    const messageKeys: Array<string> = keys(messagesObject);

    return reduce((formattedMessagesObject: ReactIntlFormattedMessagesType, messageKey: string) => {
        formattedMessagesObject[messageKey] = formatMessageFunc(messagesObject[messageKey]);
        return formattedMessagesObject;
    }, {}, messageKeys);
};
