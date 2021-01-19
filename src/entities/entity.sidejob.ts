/**
 * Sidejob related methods
 * 
 * [Abgeordnetenwatch API Documentation](https://www.abgeordnetenwatch.de/api/entitaeten/sidejob)
 */

 /** imports */
const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntitySidejob, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/politician)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/sidejobs'

/**
 * List result
 */
export type SidejobListResult = {
    meta: ResponseMeta,
    data: EntitySidejob[]
}

/**
 * Single item result
 */
export type SidejobResult = {
    meta: ResponseEntityMeta,
    data: EntitySidejob
}

/**
 * Get a list of Sidejobs
 * ```typescript
 * response = await sidejobList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns SidejobListResult as JSON
 */
export const sidejobList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<SidejobListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as SidejobListResult)      
};
/**
 * Get a single Sidejob
 * ```typescript
 * response = await sidejob(5);
 * ```
 * @param id  Id of the Sidejob.
 * @returns SidejobResult as JSON
 */
export const sidejob = async (id: number): Promise<SidejobResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as SidejobResult)      
};
