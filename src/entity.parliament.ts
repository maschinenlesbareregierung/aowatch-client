const axios = require('axios').default;
import { metaResult, entityParliament } from './types';

export const url = 'https://www.abgeordnetenwatch.de/api/v2/parliaments'
type parliamentResult = {
    meta: metaResult,
    data: entityParliament[]
}

export const parliament = async (): Promise<parliamentResult> =>{
    return axios.get(url)
        .then((response:any)=>response.data)
        .then((response:any)=>response as parliamentResult)      
};