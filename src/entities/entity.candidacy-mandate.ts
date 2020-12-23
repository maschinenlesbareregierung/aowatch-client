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
export const url = 'https://www.abgeordnetenwatch.de/api/v2/candidacies-mandates'


export type CandidacyMandateListResult = {
    meta: ResponseMeta,
    data: EntityCandidacyMandate[]
}

export type CandidacyMandateResult = {
    meta: ResponseEntityMeta,
    data: EntityCandidacyMandate
}

export type CandidacyMandateRelatedDataParameter = 'show_information' | 'politician' | 'votes';

export const candidacyMandateList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CandidacyMandateListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CandidacyMandateListResult)      
};

export const candidacyMandate = async (id: number, relatedData:CandidacyMandateRelatedDataParameter|null=null): Promise<CandidacyMandateResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CandidacyMandateResult)      
};
