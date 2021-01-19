/**
 * Topic related methods
 * 
 * [Abgeordnetenwatch API Documentation](https://www.abgeordnetenwatch.de/api/entitaeten/topic)
 */

 /** imports */
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

/**
 * Service Endpoint
 * 
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/topic)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/topics'

/**
 * List result
 */
export type TopicListResult = {
    meta: ResponseMeta,
    data: EntityTopic[]
}

/**
 * Single item result
 */
export type TopicResult = {
    meta: ResponseEntityMeta,
    data: EntityTopic
}

/**
 * Get a list of Topics
 * ```typescript
 * response = await topicList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns TopicListResult as JSON
 */
export const topicList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<TopicListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as TopicListResult)      
};

/**
 * Get a single Topic
 * ```typescript
 * response = await candidacyMandate(5);
 * ```
 * @param id  Id of the Topic.
 * @param relatedData Possible related Data you can include in the result
 * @returns TopicResult as JSON
 */
export const topic = async (id: number): Promise<TopicResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as TopicResult)      
};
