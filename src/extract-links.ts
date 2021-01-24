import {EntityPolitician } from './types';
const axios = require('axios').default;
const cheerio = require("cheerio");
/**
 * Extracts external links
 * @param url url at abgeordnetenwatch.de to find external links 
 * @returns Array of URL Strings
 */
export const extractLinks = async (url: string): Promise<string[]> =>{
    const html = await axios.get(url).then((response:any)=>response.data)    
    const selector = cheerio.load(html);
    const searchResults = selector("ul.arrow-list--links > li").find("a");
    const res: any[] = [];
    searchResults.map((index: any, data: any)=>{
        res.push(data.attribs.href)
    })
    return res.filter((url:string)=>url.match('http'));  
};