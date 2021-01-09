const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityCandidacyMandate, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/candidacy-mandate)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/candidacies-mandates'

/**
 * List result
 */
export type CandidacyMandateListResult = {
    meta: ResponseMeta,
    data: EntityCandidacyMandate[]
}

/**
 * Single item result
 */
export type CandidacyMandateResult = {
    meta: ResponseEntityMeta,
    data: EntityCandidacyMandate
}

/**
 * Possible extra data that you can include on the response for a single item
 */
export type CandidacyMandateRelatedDataParameter = 'show_information' | 'politician' | 'votes';

/**
 * Get a list of CandidacyMandates
 * ```typescript
 * response = await candidacyMandateList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns CandidacyMandateResult as JSON
 */
export const candidacyMandateList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CandidacyMandateListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CandidacyMandateListResult)      
};
/**
 * Get a single CandidacyMandate
 * ```typescript
 * response = await candidacyMandate(5);
 * ```
 * @param id  Id of the CandidacyMandate.
 * @param relatedData Possible related Data you can include in the result
 * @returns CandidacyMandateResult as JSON
 */
export const candidacyMandate = async (id: number, relatedData:CandidacyMandateRelatedDataParameter|null=null): Promise<CandidacyMandateResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CandidacyMandateResult)      
};
