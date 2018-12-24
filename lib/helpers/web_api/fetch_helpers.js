'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendPostRequestToHapiAPICors = exports.sendGetRequestToHapiAPICors = exports.sendPostRequestToHapiAPI = exports.sendGetRequestToHapiAPI = exports.sendPostRequestToAPICors = exports.sendGetRequestToAPICors = exports.sendPostRequestToAPI = exports.sendGetRequestToAPI = exports.sendRequestToHapi = exports.sendRequest = undefined;

var _ramda = require('ramda');

var _general_register = require('./../../registers/general_register');

var _request_response = require('./../hapi/request_response');

// types definition

// functions implementation


// internal imports
var prepareHeaders = function prepareHeaders() {
    var headersArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var requestHeaders = new Headers();

    return (0, _ramda.reduce)(function (requestHeaders, _ref) {
        var headerName = _ref.headerName,
            headerValue = _ref.headerValue;

        requestHeaders.append(headerName, headerValue);
        return requestHeaders;
    }, requestHeaders, headersArray);
};var sendRequest = exports.sendRequest = function sendRequest(method, mode, path, headers, body) {
    var requestInitData = {
        method: method,
        headers: prepareHeaders(headers),
        mode: mode,
        body: (0, _ramda.is)(Object, body) ? JSON.stringify(body) : body
    };

    var apiEndpoint = (0, _general_register.getValue)('apiEndpoint');
    apiEndpoint = (0, _ramda.defaultTo)('')(apiEndpoint);

    var fetchRequest = new Request('' + apiEndpoint + path, requestInitData);

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

var sendRequestToHapi = exports.sendRequestToHapi = function sendRequestToHapi(method, mode, path, headers, body) {
    return new Promise(function (resolve, reject) {
        sendRequest(method, mode, path, headers, body).then(function (_ref2) {
            var response = _ref2.response,
                data = _ref2.data;
            return (0, _request_response.isHapiBoomError)(response.status, data) ? reject(data) : resolve({ response: response, data: data });
        }).catch(function (error) {
            return reject((0, _request_response.makeHapiBoomError)(error));
        });
    });
};

var sendGetRequestToAPI = exports.sendGetRequestToAPI = (0, _ramda.curry)(sendRequest)('GET', 'no-cors');
var sendPostRequestToAPI = exports.sendPostRequestToAPI = (0, _ramda.curry)(sendRequest)('POST', 'no-cors');

var sendGetRequestToAPICors = exports.sendGetRequestToAPICors = (0, _ramda.curry)(sendRequest)('GET', 'cors');
var sendPostRequestToAPICors = exports.sendPostRequestToAPICors = (0, _ramda.curry)(sendRequest)('POST', 'cors');

var sendGetRequestToHapiAPI = exports.sendGetRequestToHapiAPI = (0, _ramda.curry)(sendRequestToHapi)('GET', 'no-cors');
var sendPostRequestToHapiAPI = exports.sendPostRequestToHapiAPI = (0, _ramda.curry)(sendRequestToHapi)('POST', 'no-cors');

var sendGetRequestToHapiAPICors = exports.sendGetRequestToHapiAPICors = (0, _ramda.curry)(sendRequestToHapi)('GET', 'cors');
var sendPostRequestToHapiAPICors = exports.sendPostRequestToHapiAPICors = (0, _ramda.curry)(sendRequestToHapi)('POST', 'cors');