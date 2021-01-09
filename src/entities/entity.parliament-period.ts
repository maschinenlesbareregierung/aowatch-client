const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityParliamentPeriod, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/parliament-period)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/parliament-periods'

/**
 * List result
 */
export type ParliamentPeriodListResult = {
    meta: ResponseMeta,
    data: EntityParliamentPeriod[]
}

export type ParliamentPeriodResult = {
    meta: ResponseEntityMeta,
    data: EntityParliamentPeriod
}

/**
 * Possible extra data that you can include on the response for a single item
 */
export type ParliamentPeriodRelatedDataParameter = 'show_information' | 'polls' | 'mandates' | 'committees' | 'constituencies';


export const parliamentPeriodList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ParliamentPeriodResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentPeriodListResult)      
};

export const parliamentPeriod = async (id: number, relatedData:ParliamentPeriodRelatedDataParameter|null=null): Promise<ParliamentPeriodResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentPeriodResult)      
};
