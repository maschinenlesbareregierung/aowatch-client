const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityFraction, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/fraction)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/fractions'


export type FractionListResult = {
    meta: ResponseMeta,
    data: EntityFraction[]
}

export type FractionResult = {
    meta: ResponseEntityMeta,
    data: EntityFraction
}

export const fractionList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<FractionListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as FractionListResult)      
};

export const fraction = async (id: number): Promise<FractionResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as FractionResult)      
};
