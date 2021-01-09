const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityElectoralList, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/electoral-list)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/electoral-lists'

/**
 * List result
 */
export type ElectoralListListResult = {
    meta: ResponseMeta,
    data: EntityElectoralList[]
}

/**
 * Single item result
 */
export type ElectoralListResult = {
    meta: ResponseEntityMeta,
    data: EntityElectoralList
}

/**
 * Get a list of ElectoralLists
 * ```typescript
 * response = await electoralListList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns ElectoralListListResult as JSON
 */
export const electoralListList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ElectoralListListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ElectoralListListResult)      
};

/**
 * Get a single ElectoralList
 * ```typescript
 * response = await electoralList(5);
 * ```
 * @param id  Id of the ElectoralList
 * @param relatedData Possible related Data you can include in the result
 * @returns ElectoralListResult as JSON
 */
export const electoralList = async (id: number): Promise<ElectoralListResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ElectoralListResult)      
};
