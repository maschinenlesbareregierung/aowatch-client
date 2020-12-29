const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityConstituency, 
    ResponseMeta, 
    ResponseEntityMeta, 
    PagerParameters, 
    RangeParameters, 
    SortParameters, 
    FilterParameters, 
    OperatorFilterParameters
} from '../types';
export const url = 'https://www.abgeordnetenwatch.de/api/v2/constituency'


export type ConstituencyListResult = {
    meta: ResponseMeta,
    data: EntityConstituency[]
}

export type ConstituencyResult = {
    meta: ResponseEntityMeta,
    data: EntityConstituency
}

export const constituencyList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ConstituencyListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ConstituencyListResult)      
};

export const constituency = async (id: number): Promise<ConstituencyResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ConstituencyResult)      
};
