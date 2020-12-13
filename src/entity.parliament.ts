const axios = require('axios').default;
import { MetaResult, EntityParliament } from './types';

export const url = 'https://www.abgeordnetenwatch.de/api/v2/parliaments'
type ParliamentResult = {
    meta: MetaResult,
    data: EntityParliament[]
}

export const parliament = async (): Promise<ParliamentResult> =>{
    return axios.get(url)
        .then((response:any)=>response.data)
        .then((response:any)=>response as ParliamentResult)      
};