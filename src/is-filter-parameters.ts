import { FilterParameters, OperatorFilterParameters } from "./types";

export function isFilterParameters(filter: FilterParameters | OperatorFilterParameters[]): filter is FilterParameters {
    return (filter as FilterParameters).length == undefined;
}
