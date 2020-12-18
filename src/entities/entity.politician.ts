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
export const url = 'https://www.abgeordnetenwatch.de/api/v2/politicians'


export type PoliticianListResult = {
    meta: ResponseMeta,
    data: EntityPolitician[]
}

export type PoliticianResult = {
    meta: ResponseEntityMeta,
    data: EntityPolitician
}

export type PoliticanRelatedDataParameter = 'show_information' | 'mandates' | 'candidacies' | 'all_candidacies_mandates' | 'votes';

export const politicianList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<PoliticianListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as PoliticianListResult)      
};

export const politician = async (id: number, relatedData:PoliticanRelatedDataParameter|null=null): Promise<PoliticianResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as PoliticianResult)      
};
