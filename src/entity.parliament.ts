const axios = require('axios').default;
import { stringify } from 'qs'

import { EntityParliament, ResponseMeta, ResponseEntityMeta, PagerParameters, RangeParameters, SortParameters, FilterParameters, OperatorFilterParameters, Operator } from './types';
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


function isFilterParameters(filter: FilterParameters | OperatorFilterParameters[]): filter is FilterParameters {
    return (filter as FilterParameters).length == undefined;
}

export const parliamentList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ParliamentListResult> =>{

    type FilterParameterValue = {
        [x: string]: string | number
    }

    type RequestParameters = {
        [x: string]: string | number | any | FilterParameterValue
    }
    
    let requestParameters: RequestParameters = {}
    
    if (!!params) {
        requestParameters = {...requestParameters, ...params}
    }

    if (!!sort) {
        requestParameters = {...requestParameters, ...sort}
    }

    if (!!filter && isFilterParameters(filter)) {
        requestParameters = {...requestParameters, ...filter}
    }

    if (!!filter && !isFilterParameters(filter)) {
        filter.map((f:OperatorFilterParameters)=>{
            if (!requestParameters[f.field]) {
                requestParameters[f.field] = {} as FilterParameterValue
            }
            requestParameters[f.field][f.operator] = f.value
        })
    }


    requestParameters = requestParameters

    const query = stringify(requestParameters);

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
