import { PagerParameters, MetaResult } from './types'
import {EventEmitter} from "events"
import TypedEmitter from "typed-emitter"

interface MessageEvents {
    error: (error: Error) => void,
    count: (pages: number) => void,
    page: (meta: MetaResult) => void
}

/**
 * Get a Event Emitter to implement logging
 */
export const getEmitter = (): EventEmitter => {
    return new EventEmitter() as TypedEmitter<MessageEvents>
}

/**
 * List all data from the api using the paging mechanic
 * @param listFunction Function from enetities that you want to get all data from 
 * @param emitter Optional event emitter to implement logging
 */
export const listAll = async (listFunction: Function, emitter?:EventEmitter)=>{
    // fetch first dataset 
    const res = await listFunction();
    let {result} = res.meta;

    const { count, total } = result;
    // calculate number of requests
    const pages = Math.ceil(total / count);

    if (emitter) {
      emitter.emit('count', pages)
    }

    const lastPage = Math.ceil(pages);
    // generate parameter sets for paging
    const pageParameters: PagerParameters[] = [...Array(lastPage)].map((_, i) => {
        return {
            page: i,
            pager_limit: count
        }
    });
    const tempResults = [];
    
    for (var i = 0; i<=pageParameters.length-1; i++) {
        const pageresult = await listFunction(pageParameters[i]);
        if (emitter) {
            emitter.emit('page', pageresult.meta)
        }      
        tempResults.push(pageresult)   
    }
    // iterate and get all data
    const resultData: any = [];
    tempResults.map(result => {
        resultData.push(...result.data)
    }); 
    
    const resultMeta = res.meta;
    resultMeta.result.count = resultData.length
    return  {
        meta: resultMeta, 
        data: resultData
    }

}