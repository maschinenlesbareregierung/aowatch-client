const axios = require('axios').default;
import { EntityParliament, ResponseMeta, ResponseEntityMeta } from './types';
export const url = 'https://www.abgeordnetenwatch.de/api/v2/parliaments'
export type ParliamentListResult = {
    meta: ResponseMeta,
    data: EntityParliament[]
}

export type ParliamentResult = {
    meta: ResponseEntityMeta,
    data: EntityParliament
}

export type RelatedDataParameter = 'show_information' | 'legislatures' | 'elections' | 'all_parliament_periods';

export const parliamentList = async (): Promise<ParliamentListResult> =>{
    return axios.get(url)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentListResult)      
};

export const parliament = async (id: number, relatedData:RelatedDataParameter|null=null): Promise<ParliamentResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=show_information';
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentResult)      
};
