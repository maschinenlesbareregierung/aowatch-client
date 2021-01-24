import { FilterParameters, OperatorFilterParameters } from "./types";
/**
 * 
 * @param filter Checks if Parameters are of type FilterParameters 
 */
export function isFilterParameters(filter: FilterParameters | OperatorFilterParameters[]): filter is FilterParameters {
    return (filter as FilterParameters).length == undefined;
}
