const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityVote, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/vote)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/votes'

/**
 * List result
 */
export type VoteListResult = {
    meta: ResponseMeta,
    data: EntityVote[]
}
/**
 * Single item result
 */
export type VoteResult = {
    meta: ResponseEntityMeta,
    data: EntityVote
}

/**
 * Get a list of Votes
 * ```typescript
 * response = await voteList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns VoteListResult as JSON
 */
export const voteList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<VoteListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as VoteListResult)      
};

/**
 * Get a single Vote
 * ```typescript
 * response = await vote(5);
 * ```
 * @param id  Id of the CandidacyMandate.
 * @returns VoteResult as JSON
 */
export const vote = async (id: number): Promise<VoteResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as VoteResult)      
};
