/**
 * Constituency related methods
 * 
 * [Abgeordnetenwatch API Documentation](https://www.abgeordnetenwatch.de/api/entitaeten/constituency)
 */

 /** imports */
const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityConstituency, 
    ResponseMeta, 
    ResponseEntityMeta, 
    PagerParameters, 
    RangeParameters, 
    SortParameters, 
    FilterParameters, 
    OperatorFilterParameters
} from '../types';

/**
 * Service Endpoint
 * 
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/constituency)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/constituencies'

/**
 * List result
 */
export type ConstituencyListResult = {
    meta: ResponseMeta,
    data: EntityConstituency[]
}

/**
 * Single item result
 */
export type ConstituencyResult = {
    meta: ResponseEntityMeta,
    data: EntityConstituency
}

/**
 * Get a list of Constituencies
 * ```typescript
 * response = await constituencyList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns ConstituencyListResult as JSON
 */
export const constituencyList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ConstituencyListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ConstituencyListResult)      
};

/**
 * Get a single Constituency
 * ```typescript
 * response = await constituency(5);
 * ```
 * @param id  Id of the Constituency.
 * @returns ConstituencyResult as JSON
 */
export const constituency = async (id: number): Promise<ConstituencyResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ConstituencyResult)      
};
