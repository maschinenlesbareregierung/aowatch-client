const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityCity, 
    ResponseMeta, 
    ResponseEntityMeta, 
    PagerParameters, 
    RangeParameters, 
    SortParameters, 
    FilterParameters, 
    OperatorFilterParameters
} from '../types';
export const url = 'https://www.abgeordnetenwatch.de/api/v2/cities'


export type CityListResult = {
    meta: ResponseMeta,
    data: EntityCity[]
}

export type CityResult = {
    meta: ResponseEntityMeta,
    data: EntityCity
}

export const cityList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CityListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CityListResult)      
};

export const city = async (id: number): Promise<CityResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CityResult)      
};
