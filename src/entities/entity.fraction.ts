/**
 * Fraction related methods
 * 
 * [Abgeordnetenwatch API Documentation](https://www.abgeordnetenwatch.de/api/entitaeten/fraction)
 */

 /** imports */
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

/**
 * List result
 */
export type FractionListResult = {
    meta: ResponseMeta,
    data: EntityFraction[]
}

/**
 * Single item result
 */
export type FractionResult = {
    meta: ResponseEntityMeta,
    data: EntityFraction
}

/**
 * Get a list of Fractions
 * ```typescript
 * response = await fractionList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns FractionListResult as JSON
 */
export const fractionList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<FractionListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as FractionListResult)      
};

/**
 * Get a single Fraction
 * ```typescript
 * response = await candidacyMandate(5);
 * ```
 * @param id  Id of the Fraction.
 * @returns FractionResult as JSON
 */
export const fraction = async (id: number): Promise<FractionResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as FractionResult)      
};
