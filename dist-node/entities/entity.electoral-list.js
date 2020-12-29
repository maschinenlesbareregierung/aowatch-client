"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.electoralList = exports.electoralListList = exports.url = void 0;
const axios = require('axios').default;
const create_request_query_1 = require("../create-request-query");
exports.url = 'https://www.abgeordnetenwatch.de/api/v2/electoral-list';
const electoralListList = async (params, sort, filter) => {
    const query = create_request_query_1.createRequestQuery(params, sort, filter);
    const requesturl = !!query ? `${exports.url}?${query}` : exports.url;
    return axios.get(requesturl)
        .then((response) => response.data)
        .then((response) => response);
};
exports.electoralListList = electoralListList;
const electoralList = async (id) => {
    let requestUrl = new URL(`${exports.url}/${id}`);
    return axios.get(requestUrl.toString())
        .then((response) => response.data)
        .then((response) => response);
};
exports.electoralList = electoralList;
