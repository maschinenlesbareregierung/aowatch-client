const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityCountry, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/country)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/countries'


export type CountryListResult = {
    meta: ResponseMeta,
    data: EntityCountry[]
}

export type CountryResult = {
    meta: ResponseEntityMeta,
    data: EntityCountry
}

export const countryList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CountryListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CountryListResult)      
};

export const country = async (id: number): Promise<CountryResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CountryResult)      
};
