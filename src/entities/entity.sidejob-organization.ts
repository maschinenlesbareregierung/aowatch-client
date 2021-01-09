const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntitySidejobOrganization, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/sidejob-organization)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/sidejob-organizations'

/**
 * List result
 */
export type SidejobOrganizationListResult = {
    meta: ResponseMeta,
    data: EntitySidejobOrganization[]
}

/**
 * Single item result
 */
export type SidejobOrganizationResult = {
    meta: ResponseEntityMeta,
    data: EntitySidejobOrganization
}

export const sidejobOrganizationList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<SidejobOrganizationListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as SidejobOrganizationListResult)      
};

export const sidejobOrganization = async (id: number): Promise<SidejobOrganizationResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
   
    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as SidejobOrganizationResult)      
};
