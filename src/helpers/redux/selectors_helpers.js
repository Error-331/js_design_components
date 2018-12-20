'use strict';

// @flow

// external imports
import {map, values, pickAll} from 'ramda';
import {Map} from 'immutable';

// selectors implementation
export const convertCollectionItemsToArray = (itemsMap: Map): Array<any> => {
    const itemsArray: Array<any> = itemsMap.toArray();

    return map(recordItem => {
        const itemObj = recordItem.toObject();
        return values(itemObj);
    }, itemsArray);
};

export const convertCollectionItemsToArrayByFieldNames = (itemsMap, fieldNames): Array<any> => {
    const recordsArray: Array<any> = itemsMap.toArray();

    return map(recordItem => {
        const itemObject = recordItem.toObject();
        return values(pickAll(fieldNames, itemObject));
    }, recordsArray);
};