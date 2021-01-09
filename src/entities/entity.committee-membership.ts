const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityCommitteeMembership, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/committee-membership)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/committee-memberships'

/**
 * List result
 */
export type CommitteeMembershipListResult = {
    meta: ResponseMeta,
    data: EntityCommitteeMembership[]
}

/**
 * Single item result
 */
export type CommitteeMembershipResult = {
    meta: ResponseEntityMeta,
    data: EntityCommitteeMembership
}

/**
 * Get a list of CommitteeMemberships
 * ```typescript
 * response = await committeeMembershipList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns CommitteeMembershipListResult as JSON
 */
export const committeeMembershipList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CommitteeMembershipListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CommitteeMembershipListResult)      
};

/**
 * Get a single CommitteeMembership
 * ```typescript
 * response = response = await committeeMembership(5);
 * ```
 * @param id  Id of the CommitteeMembership
 * @returns CommitteeMembershipResult as JSON
 */
export const committeeMembership = async (id: number): Promise<CommitteeMembershipResult> => {
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CommitteeMembershipResult)      
};
