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

/**
 * Service Endpoint
 * 
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/cities)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/cities'

/**
 * List result
 */
export type CityListResult = {
    meta: ResponseMeta,
    data: EntityCity[]
}

/**
 * Single item result
 */
export type CityResult = {
    meta: ResponseEntityMeta,
    data: EntityCity
}

/**
 * Get a list of Cities
 * ```typescript
 * response = await cityList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns CityListResult as JSON
 */
export const cityList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CityListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CityListResult)      
};

/**
 * Get a single City
 * ```typescript
 * response = await city(5);
 * ```
 * @param id  Id of the City.
 * @returns CityResult as JSON
 */
export const city = async (id: number): Promise<CityResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CityResult)      
};
