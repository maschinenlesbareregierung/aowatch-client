const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityPoll, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/poll)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/polls'

/**
 * List result
 */
export type PollListResult = {
    meta: ResponseMeta,
    data: EntityPoll[]
}

export type PollResult = {
    meta: ResponseEntityMeta,
    data: EntityPoll
}

/**
 * Possible extra data that you can include on the response for a single item
 */
export type PollRelatedDataParameter = 'show_information' | 'votes';

export const pollList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<PollListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as PollListResult)      
};

export const poll = async (id: number, relatedData:PollRelatedDataParameter|null=null): Promise<PollResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as PollResult)      
};
