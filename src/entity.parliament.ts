const axios = require('axios').default;
import { stringify } from 'qs'
import { isFilterParameters } from './is-filter-parameters';
import { 
    EntityParliament, 
    ResponseMeta, 
    ResponseEntityMeta, 
    PagerParameters, 
    RangeParameters, 
    SortParameters, 
    FilterParameters, 
    OperatorFilterParameters,
    RequestParameters,
    FilterParameterValue 
} from './types';
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

export const parliamentList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ParliamentListResult> =>{

    let requestParameters: RequestParameters = {}
    // apply range or pager
    if (!!params) {
        requestParameters = {...requestParameters, ...params}
    }
    // apply sorting
    if (!!sort) {
        requestParameters = {...requestParameters, ...sort}
    }
    // apply a simple filter
    if (!!filter && isFilterParameters(filter)) {
        requestParameters = {...requestParameters, ...filter}
    }
    // apply a complex filter
    if (!!filter && !isFilterParameters(filter)) {
        filter.map((f:OperatorFilterParameters)=>{
            if (!requestParameters[f.field]) {
                requestParameters[f.field] = {} as FilterParameterValue
            }
            requestParameters[f.field][f.operator] = f.value
        })
    }
    
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
