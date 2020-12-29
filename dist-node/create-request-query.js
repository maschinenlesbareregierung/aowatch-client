"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestQuery = void 0;
const qs_1 = require("qs");
const is_filter_parameters_1 = require("./is-filter-parameters");
const createRequestQuery = (params, sort, filter) => {
    let requestParameters = {};
    // apply range or pager
    if (!!params) {
        requestParameters = { ...requestParameters, ...params };
    }
    // apply sorting
    if (!!sort) {
        requestParameters = { ...requestParameters, ...sort };
    }
    // apply a simple filter
    if (!!filter && is_filter_parameters_1.isFilterParameters(filter)) {
        requestParameters = { ...requestParameters, ...filter };
    }
    // apply a complex filter
    if (!!filter && !is_filter_parameters_1.isFilterParameters(filter)) {
        filter.map((f) => {
            if (!requestParameters[f.field]) {
                requestParameters[f.field] = {};
            }
            requestParameters[f.field][f.operator] = f.value;
        });
    }
    const query = qs_1.stringify(requestParameters);
    return query;
};
exports.createRequestQuery = createRequestQuery;
