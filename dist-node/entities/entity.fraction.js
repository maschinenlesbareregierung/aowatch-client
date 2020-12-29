"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fraction = exports.fractionList = exports.url = void 0;
const axios = require('axios').default;
const create_request_query_1 = require("../create-request-query");
exports.url = 'https://www.abgeordnetenwatch.de/api/v2/fraction';
const fractionList = async (params, sort, filter) => {
    const query = create_request_query_1.createRequestQuery(params, sort, filter);
    const requesturl = !!query ? `${exports.url}?${query}` : exports.url;
    return axios.get(requesturl)
        .then((response) => response.data)
        .then((response) => response);
};
exports.fractionList = fractionList;
const fraction = async (id) => {
    let requestUrl = new URL(`${exports.url}/${id}`);
    return axios.get(requestUrl.toString())
        .then((response) => response.data)
        .then((response) => response);
};
exports.fraction = fraction;
