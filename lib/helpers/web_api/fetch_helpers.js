'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendPostRequestToAPINoAuth = exports.sendPostRequestToAPI = exports.sendGetRequestToAPI = exports.sendRequestToHapi = exports.sendRequest = undefined;

var _ramda = require('ramda');

var _request_response = require('./../hapi/request_response');

/*
    if (isAuth) {
        const authenticationToken = authenticationTokenSelector(store.getState());
        requestHeaders.append('Authorization', authenticationToken);
    }

    ${frontendConfig[endpointName]}


 */

// types definition

// functions implementation
var prepareHeaders = function prepareHeaders() {
    var headersArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var requestHeaders = new Headers();

    return (0, _ramda.reduce)(function (requestHeaders, _ref) {
        var headerName = _ref.headerName,
            headerValue = _ref.headerValue;

        requestHeaders.append(headerName, headerValue);
        return requestHeaders;
    }, requestHeaders, headersArray);
};

// internal imports
var sendRequest = exports.sendRequest = function sendRequest(method, endpointName, mode, path, headers, body) {
    var requestInitData = {
        method: method,
        headers: prepareHeaders(headers),
        mode: mode,
        body: (0, _ramda.is)(Object, body) ? JSON.stringify(body) : body
    };

    var fetchRequest = new Request(path, requestInitData);

    return new Promise(function (resolve, reject) {
        fetch(fetchRequest).then(function (response) {
            if (!response.headers.has('content-type')) {
                return resolve({ response: response });
            }

            var contentType = response.headers.get('content-type');

            // TODO: add means for working with blob
            if (contentType.indexOf('application/json') !== -1) {
                response.json().then(function (jsonData) {
                    return resolve({ response: response, data: jsonData });
                }).catch(function (error) {
                    return reject(error);
                });
            } else {
                resolve({ response: response });
            }
        }).catch(function (error) {
            return reject(error);
        });
    });
};

var sendRequestToHapi = exports.sendRequestToHapi = function sendRequestToHapi(method, endpointName, mode, path, headers, body) {
    return new Promise(function (resolve, reject) {
        sendRequest(method, endpointName, mode, path, headers, body).then(function (_ref2) {
            var response = _ref2.response,
                data = _ref2.data;
            return (0, _request_response.isHapiBoomError)(response.status, data) ? reject(data) : resolve({ response: response, data: data });
        }).catch(function (error) {
            return reject((0, _request_response.makeHapiBoomError)(error));
        });
    });
};

var sendGetRequestToAPI = exports.sendGetRequestToAPI = (0, _ramda.curry)(sendRequest)('GET', 'apiEndpoint', 'cors');
var sendPostRequestToAPI = exports.sendPostRequestToAPI = (0, _ramda.curry)(sendRequest)('POST', 'apiEndpoint', 'cors');
var sendPostRequestToAPINoAuth = exports.sendPostRequestToAPINoAuth = (0, _ramda.curry)(sendRequest)('POST', 'apiEndpoint', 'cors');