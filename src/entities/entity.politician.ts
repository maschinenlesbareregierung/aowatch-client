const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityPolitician, 
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
export const url = 'https://www.abgeordnetenwatch.de/api/v2/politicians'

/**
 * List result
 */
export type PoliticianListResult = {
    meta: ResponseMeta,
    data: EntityPolitician[]
}

/**
 * Single item result
 */
export type PoliticianResult = {
    meta: ResponseEntityMeta,
    data: EntityPolitician
}

/**
 * Possible extra data that you can include on the response for a single item
 */
export type PoliticanRelatedDataParameter = 'show_information' | 'mandates' | 'candidacies' | 'all_candidacies_mandates' | 'votes';

/**
 * Get a list of Politicians
 * ```typescript
 * response = await politicianList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns PoliticianListResult as JSON
 */
export const politicianList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<PoliticianListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as PoliticianListResult)      
};

/**
 * Get a single Politician
 * ```typescript
 * response = await politician(5);
 * ```
 * @param id  Id of the Politician.
 * @param relatedData Possible related Data you can include in the result
 * @returns PoliticianResult as JSON
 */
export const politician = async (id: number, relatedData:PoliticanRelatedDataParameter|null=null): Promise<PoliticianResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as PoliticianResult)      
};
