const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityCommittee, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/committee)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/committees'


export type CommitteeListResult = {
    meta: ResponseMeta,
    data: EntityCommittee[]
}

export type CommitteeResult = {
    meta: ResponseEntityMeta,
    data: EntityCommittee
}

/**
 * Possible extra data that you can include on the response for a single item
 */

export type CommitteeRelatedDataParameter = 'show_information' | 'committee_memberships' | 'polls';

export const committeeList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<CommitteeListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as CommitteeListResult)      
};

export const committee = async (id: number, relatedData:CommitteeRelatedDataParameter|null=null): Promise<CommitteeResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as CommitteeResult)      
};
