import { stringify } from "qs"
import { isFilterParameters } from "./is-filter-parameters"
import { PagerParameters, RangeParameters, SortParameters, FilterParameters, OperatorFilterParameters, RequestParameters, FilterParameterValue } from "./types"
/**
 * Creates a querystring for a request to the list functions of the API 
 * @param params Paging or Range Parameters
 * @param sort Sort parameters
 * @param filter Filtering Parameters
 */
export const createRequestQuery = (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): string=>{
    let requestParameters: RequestParameters = {}
    // apply range or pager
    if (!!params) {
        requestParameters = {...requestParameters, ...params}
    }
    // apply sorting
    if (!!sort) {
        requestParameters = {...requestParameters, ...sort}
    }
    // apply a simple filter
    if (!!filter && isFilterParameters(filter)) {
        requestParameters = {...requestParameters, ...filter}
    }
    // apply a complex filter
    if (!!filter && !isFilterParameters(filter)) {
        filter.map((f:OperatorFilterParameters)=>{
            if (!requestParameters[f.field]) {
                requestParameters[f.field] = {} as FilterParameterValue
            }
            requestParameters[f.field][f.operator] = f.value
        })
    }
    
    const query = stringify(requestParameters);
    return query;
}
