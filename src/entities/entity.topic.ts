const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityTopic, 
    ResponseMeta, 
    ResponseEntityMeta, 
    PagerParameters, 
    RangeParameters, 
    SortParameters, 
    FilterParameters, 
    OperatorFilterParameters
} from '../types';
export const url = 'https://www.abgeordnetenwatch.de/api/v2/topics'


export type TopicListResult = {
    meta: ResponseMeta,
    data: EntityTopic[]
}

export type TopicResult = {
    meta: ResponseEntityMeta,
    data: EntityTopic
}

export type CommitteeRelatedDataParameter = 'show_information';

export const topicList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<TopicListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as TopicListResult)      
};

export const topic = async (id: number, relatedData:CommitteeRelatedDataParameter|null=null): Promise<TopicResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);
    if (!!relatedData) {
        requestUrl.search = 'related_data=' + relatedData;
    }

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as TopicResult)      
};
