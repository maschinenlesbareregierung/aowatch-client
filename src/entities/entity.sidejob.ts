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

export type SidejobResult = {
    meta: ResponseEntityMeta,
    data: EntitySidejob
}

export const sidejobList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<SidejobListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as SidejobListResult)      
};

export const sidejob = async (id: number): Promise<SidejobResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as SidejobResult)      
};
