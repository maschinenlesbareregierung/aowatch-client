/**
 * Commitee related methods
 * 
 * [Abgeordnetenwatch API Documentation](https://www.abgeordnetenwatch.de/api/entitaeten/commitee)
 */

 /** imports */
const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityCommittee, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/committee)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/committees'

/**
 * List result
 */
export type CommitteeListResult = {
    meta: ResponseMeta,
    data: EntityCommittee[]
}

/**
 * Single item result
 */
export type CommitteeResult = {
    meta: ResponseEntityMeta,
    data: EntityCommittee
}

/**
 * Possible extra data that you can include on the response for a single item
 */

export type CommitteeRelatedDataParameter = 'show_information' | 'committee_memberships' | 'polls';

/**
 * Get a list of Committees
 * ```typescript
 * response = await committeeList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns CommitteeListResult as JSON
 */
export const committeeList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CommitteeListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CommitteeListResult)      
};

/**
 * Get a single Committee
 * ```typescript
 * response = await committee(5);
 * ```
 * @param id  Id of the Committee.
 * @param relatedData Possible related Data you can include in the result
 * @returns CommitteeResult as JSON
 */
export const committee = async (id: number, relatedData:CommitteeRelatedDataParameter|null=null): Promise<CommitteeResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CommitteeResult)      
};
