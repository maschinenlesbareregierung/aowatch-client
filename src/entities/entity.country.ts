/**
 * Country related methods
 * 
 * [Abgeordnetenwatch API Documentation](https://www.abgeordnetenwatch.de/api/entitaeten/country)
 */

 /** imports */
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

/**
 * List result
 */
export type CountryListResult = {
    meta: ResponseMeta,
    data: EntityCountry[]
}

/**
 * Single item result
 */
export type CountryResult = {
    meta: ResponseEntityMeta,
    data: EntityCountry
}

/**
 * Get a list of Countries
 * ```typescript
 * response = await countryList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns CountryListResult as JSON
 */
export const countryList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CountryListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CountryListResult)      
};

/**
 * Get a single Country
 * ```typescript
 * response = await country(5);
 * ```
 * @param id  Id of the Country.
 * @returns CountryResult as JSON
 */
export const country = async (id: number): Promise<CountryResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CountryResult)      
};
