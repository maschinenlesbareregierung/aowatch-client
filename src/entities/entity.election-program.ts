const axios = require('axios').default;
import { createRequestQuery } from '../create-request-query';
import { 
    EntityElectionProgram, 
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
 * [Abgeordnetenwatch API documentation](https://www.abgeordnetenwatch.de/api/entitaeten/election-program)
 */
export const url = 'https://www.abgeordnetenwatch.de/api/v2/election-program'

/**
 * List result
 */
export type ElectionProgramListResult = {
    meta: ResponseMeta,
    data: EntityElectionProgram[]
}

/**
 * Single item result
 */
export type ElectionProgramResult = {
    meta: ResponseEntityMeta,
    data: EntityElectionProgram
}

/**
 * Get a list of ElectionPrograms
 * ```typescript
 * response = await electionProgramList();
 * ```
 * @param params  PagerParameters for Paging, RangeParameters for  limiting the results or null
 * @param sort  Sort simply by a property or more complex by a list of properties
 * @returns ElectionProgramListResult as JSON
 */
export const electionProgramList = async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]): Promise<ElectionProgramListResult> =>{

    const query = createRequestQuery(params, sort, filter);    
    const requesturl = !!query ? `${url}?${query}` : url;

    return axios.get(requesturl)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ElectionProgramListResult)      
};

/**
 * Get a single ElectionProgram
 * ```typescript
 * response = response = await electionProgram(5);
 * ```
 * @param id  Id of the ElectionProgram.
 * @returns ElectionProgramResult as JSON
 */
export const electionProgram = async (id: number): Promise<ElectionProgramResult> =>{
    
    let requestUrl = new URL(`${url}/${id}`);

    return axios.get(requestUrl.toString())
        .then((response:any)=>response.data)
        .then((response:any)=>response as ElectionProgramResult)      
};
