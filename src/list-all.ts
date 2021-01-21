import { PagerParameters, MetaResult } from './types'
import {EventEmitter} from "events"
import TypedEmitter from "typed-emitter"
const PromisePool = require('promise-pool-executor');

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

const countPages = async (listFunction: Function) => {
    const res = await listFunction();
    let {result} = res.meta;
    const { count, total } = result;
    // calculate number of requests
    const pages = Math.ceil(total / count);
    return {
        count, pages
    }
}

/**
 * List all data from the api using the paging mechanic
 * @param listFunction Function from enetities that you want to get all data from 
 * @param emitter Optional event emitter to implement logging
 */
export const listAll = async (listFunction: Function, concurrency:number = 2, emitter?:EventEmitter)=>{
    // fetch first dataset 
    const  { count, pages } = await countPages(listFunction)

    if (emitter) {
      emitter.emit('count', pages)
    }

    const pool = new PromisePool.PromisePoolExecutor({
        concurrencyLimit: concurrency
    });

    const lastPage = Math.ceil(pages);
    // generate parameter sets for paging
    const pageParameters: PagerParameters[] = [...Array(lastPage)].map((_, i) => {
        return {
            page: i,
            pager_limit: count
        }
    });
    
    const results = await pool.addEachTask({
        data: pageParameters,
        generator: async (pagingParameters: PagerParameters, i: number) => {
            const pageresult = await listFunction(pageParameters[i]);
            if (emitter) {
                emitter.emit('page', pageresult.meta)
            }
            return pageresult;
        }
    }).promise()

    // iterate and get all data
    const resultData: any = [];
    let resultMeta: any;

    results.map((result: any) => {
        resultData.push(...result.data)
        resultMeta = result.meta;
    }); 
    
    resultMeta.result.count = resultData.length
    return  {
        meta: resultMeta, 
        data: resultData
    }

}
