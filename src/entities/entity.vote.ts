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


export type VoteListResult = {
    meta: ResponseMeta,
    data: EntityVote[]
}

export type VoteResult = {
    meta: ResponseEntityMeta,
    data: EntityVote
}

export const voteList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<VoteListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as VoteListResult)      
};

export const vote = async (id: number): Promise<VoteResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as VoteResult)      
};
