const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityParty, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/party)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/parties'


export type PartyListResult = {
    meta: ResponseMeta,
    data: EntityParty[]
}

export type PartyResult = {
    meta: ResponseEntityMeta,
    data: EntityParty
}

/**
 * Possible extra data that you can include on the response for a single item
 */
export type PartyRelatedDataParameter = 'show_information' | 'members';

export const partyList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<PartyListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as PartyListResult)      
};

export const party = async (id: number, relatedData:PartyRelatedDataParameter|null=null): Promise<PartyResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as PartyResult)      
};
