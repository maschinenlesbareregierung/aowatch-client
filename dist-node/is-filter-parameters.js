"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFilterParameters = void 0;
/**
 *
 * @param filter Checks if Parameters are of type FilterParameters
 */
function isFilterParameters(filter) {
    return filter.length == undefined;
}
exports.isFilterParameters = isFilterParameters;
