/**
 * Parliament related methods
 * 
 * [Abgeordnetenwatch API Documentation](https://www.abgeordnetenwatch.de/api/entitaeten/parliament)
 */

 /** imports */
const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityParliament, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/parliament)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/parliaments'

/**
 * List result
 */
export type ParliamentListResult = {
    meta: ResponseMeta,
    data: EntityParliament[]
}

/**
 * Single item result
 */
export type ParliamentResult = {
    meta: ResponseEntityMeta,
    data: EntityParliament
}

/**
 * Possible extra data that you can include on the response for a single item
 */
export type ParliamentRelatedDataParameter = 'show_information' | 'legislatures' | 'elections' | 'all_parliament_periods';

/**
 * Get a list of Parliaments
 * ```typescript
 * response = await parliamentList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns ParliamentListResult as JSON
 */
export const parliamentList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ParliamentListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentListResult)      
};

/**
 * Get a single Parliament
 * ```typescript
 * response = await parliament(5);
 * ```
 * @param id  Id of the Parliament.
 * @param relatedData Possible related Data you can include in the result
 * @returns ParliamentResult as JSON
 */
export const parliament = async (id: number, relatedData:ParliamentRelatedDataParameter|null=null): Promise<ParliamentResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentResult)      
};
