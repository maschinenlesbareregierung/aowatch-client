"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestQuery = void 0;
var qs_1 = require("qs");
var is_filter_parameters_1 = require("./is-filter-parameters");
/**
 * Creates a querystring for a request to the list functions of the API
 * @param params Paging or Range Parameters
 * @param sort Sort parameters
 * @param filter Filtering Parameters
 */
var createRequestQuery = function (params, sort, filter) {
    var requestParameters = {};
    // apply range or pager
    if (!!params) {
        requestParameters = __assign(__assign({}, requestParameters), params);
    }
    // apply sorting
    if (!!sort) {
        requestParameters = __assign(__assign({}, requestParameters), sort);
    }
    // apply a simple filter
    if (!!filter && is_filter_parameters_1.isFilterParameters(filter)) {
        requestParameters = __assign(__assign({}, requestParameters), filter);
    }
    // apply a complex filter
    if (!!filter && !is_filter_parameters_1.isFilterParameters(filter)) {
        filter.map(function (f) {
            if (!requestParameters[f.field]) {
                requestParameters[f.field] = {};
            }
            requestParameters[f.field][f.operator] = f.value;
        });
    }
    var query = qs_1.stringify(requestParameters);
    return query;
};
exports.createRequestQuery = createRequestQuery;
