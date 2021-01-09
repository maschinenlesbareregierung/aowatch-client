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


export type ElectoralListListResult = {
    meta: ResponseMeta,
    data: EntityElectoralList[]
}

export type ElectoralListResult = {
    meta: ResponseEntityMeta,
    data: EntityElectoralList
}

export const electoralListList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ElectoralListListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ElectoralListListResult)      
};

export const electoralList = async (id: number): Promise<ElectoralListResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ElectoralListResult)      
};
