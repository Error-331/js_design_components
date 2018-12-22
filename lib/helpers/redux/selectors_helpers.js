'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertCollectionItemsToArrayByFieldNames = exports.convertCollectionItemsToArray = undefined;

var _ramda = require('ramda');

var _immutable = require('immutable');

// selectors implementation
var convertCollectionItemsToArray = exports.convertCollectionItemsToArray = function convertCollectionItemsToArray(itemsMap) {
    var itemsArray = itemsMap.toArray();

    return (0, _ramda.map)(function (recordItem) {
        var itemObj = recordItem.toObject();
        return (0, _ramda.values)(itemObj);
    }, itemsArray);
};

var convertCollectionItemsToArrayByFieldNames = exports.convertCollectionItemsToArrayByFieldNames = function convertCollectionItemsToArrayByFieldNames(itemsMap, fieldNames) {
    var recordsArray = itemsMap.toArray();

    return (0, _ramda.map)(function (recordItem) {
        var itemObject = recordItem.toObject();
        return (0, _ramda.values)((0, _ramda.pickAll)(fieldNames, itemObject));
    }, recordsArray);
};