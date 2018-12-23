'use strict';

// @flow

// external imports
import {is, defaultTo, reduce, curry} from 'ramda';

// internal imports
import type {RequestHeaderType, RequestHeadersType} from './../../types/request_response';
import type {WFFetchReturnType} from './../../types/web_futuristics';

import {getValue} from './../../registers/general_register'

import type {PromiseResolveCallback, PromiseRejectCallback} from './../../types/promise';
import {isHapiBoomError, makeHapiBoomError} from './../hapi/request_response';

// types definition

// functions implementation
const prepareHeaders = (headersArray:  RequestHeadersType = []): Headers => {
    const requestHeaders: Headers = new Headers();

    return reduce((requestHeaders: Headers, {headerName, headerValue}: RequestHeaderType) => {
        requestHeaders.append(headerName, headerValue);
        return requestHeaders;
    }, requestHeaders, headersArray);
};

export const sendRequest = (
    method: string,
    mode: 'cors' | 'no-cors',
    path: string,
    headers: RequestHeadersType,
    body: any
): WFFetchReturnType => {
    const requestInitData: RequestOptions  = {
        method,
        headers: prepareHeaders(headers),
        mode,
        body: is(Object, body) ? JSON.stringify(body) : body
    };

    let apiEndpoint: string = getValue('apiEndpoint');
    apiEndpoint = defaultTo('')(apiEndpoint);

    const fetchRequest: Request = new Request(`${apiEndpoint}${path}`, requestInitData);

    return new Promise((resolve: PromiseResolveCallback, reject: PromiseRejectCallback) => {
        fetch(fetchRequest)
            .then((response: Response) => {
                if (!response.headers.has('content-type')) {
                    return resolve({response});
                }

                const contentType: string = response.headers.get('content-type');

                // TODO: add means for working with blob
                if (contentType.indexOf('application/json') !== -1) {
                    response.json()
                        .then(jsonData => resolve({response, data: jsonData}))
                        .catch(error => reject(error));
                } else {
                    resolve({response});
                }
            })
            .catch((error: Error) => reject(error));
    });
};

export const sendRequestToHapi = (
    method: string,
    mode: 'cors' | 'no-cors',
    path: string,
    headers: RequestHeadersType,
    body: any
): WFFetchReturnType => {
    return new Promise((resolve: PromiseResolveCallback, reject: PromiseRejectCallback) => {
        sendRequest(method, mode, path, headers, body)
            .then(({response, data}) => isHapiBoomError(response.status, data) ? reject(data) : resolve({response, data}))
            .catch(error => reject(makeHapiBoomError(error)))
    });
};

export const sendGetRequestToAPI = curry(sendRequest)('GET', 'no-cors');
export const sendPostRequestToAPI = curry(sendRequest)('POST', 'no-cors');

export const sendGetRequestToAPICors = curry(sendRequest)('GET', 'cors');
export const sendPostRequestToAPICors = curry(sendRequest)('POST', 'cors');

export const sendGetRequestToHapiAPI = curry(sendRequestToHapi)('GET', 'no-cors');
export const sendPostRequestToHapiAPI = curry(sendRequestToHapi)('POST', 'no-cors');

export const sendGetRequestToHapiAPICors = curry(sendRequestToHapi)('GET', 'cors');
export const sendPostRequestToHapiAPICors = curry(sendRequestToHapi)('POST', 'cors');
