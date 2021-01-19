/**
 * Party related methods
 * 
 * [Abgeordnetenwatch API Documentation](https://www.abgeordnetenwatch.de/api/entitaeten/party)
 */

 /** imports */
const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityParty, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/party)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/parties'

/**
 * List result
 */
export type PartyListResult = {
    meta: ResponseMeta,
    data: EntityParty[]
}

/**
 * Single item result
 */
export type PartyResult = {
    meta: ResponseEntityMeta,
    data: EntityParty
}

/**
 * Possible extra data that you can include on the response for a single item
 */
export type PartyRelatedDataParameter = 'show_information' | 'members';

/**
 * Get a list of Parties
 * ```typescript
 * response = await partyList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns PartyListResult as JSON
 */
export const partyList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<PartyListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as PartyListResult)      
};

/**
 * Get a single Party
 * ```typescript
 * response = await party(5);
 * ```
 * @param id  Id of the Party.
 * @param relatedData Possible related Data you can include in the result
 * @returns PartyResult as JSON
 */
export const party = async (id: number, relatedData:PartyRelatedDataParameter|null=null): Promise<PartyResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as PartyResult)      
};
