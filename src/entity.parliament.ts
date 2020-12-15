const axios = require('axios').default;
import { encode } from 'querystring'
import { EntityParliament, ResponseMeta, ResponseEntityMeta, PagerParameters, RangeParameters, SortParameters } from './types';
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

export const parliamentList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters): Promise<ParliamentListResult> =>{
    
    type RequestParameters = {
        [x: string]: string | number
    }
    
    let requestParameters: RequestParameters = {}
    
    if (!!params) {
        requestParameters = {...requestParameters, ...params}
    }

    if (!!sort) {
        requestParameters = {...requestParameters, ...sort}
    }

    const query = encode(requestParameters);

    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentListResult)      
};

export const parliament = async (id: number, relatedData:RelatedDataParameter|null=null): Promise<ParliamentResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentResult)      
};
