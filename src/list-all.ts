import { PagerParameters} from './types'

export const listAll = async (listFunction: Function)=>{
    // fetch first dataset 
    const res = await listFunction();
    let {result} = res.meta;

    const { count, total } = result;
    // calculate number of requests
    const pages = total / count;
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