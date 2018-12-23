'use strict';

// @flow

// external imports
import {isNil} from 'ramda';

// helpers implementation
export const getLocalStorageObject = (): Storage => {
    if (isNil(window.localStorage)) {
        throw new Error('Browser local storage is unavailable');
    }

    return window.localStorage;
};

export const removeLocalStorageKey = (keyName: string): ?string => {
    const localStorage: Storage = getLocalStorageObject();
    return localStorage.removeItem(keyName);
};

export const getLocalStorageKey = (keyName: string): ?string => {
    const localStorage: Storage = getLocalStorageObject();
    return localStorage.getItem(keyName);
};

export const setLocalStorageKey = (keyName: string, keyValue: mixed): void => {
    const localStorage: Storage = getLocalStorageObject();
    localStorage.setItem(keyName, String(keyValue));
};