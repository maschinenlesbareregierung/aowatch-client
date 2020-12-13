import { expect } from 'chai';
import { parliament, url } from '../src/entity.parliament';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("parliament", ()=>{
    describe("all", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliament();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/parliament';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 18", async ()=>{
                expect(response.meta.result.count).to.eq(18)
            });
            it("result.total is 18", async ()=>{
                expect(response.meta.result.total).to.eq(18)
            });

            it("result.range_start is 0", async ()=>{
                expect(response.meta.result.range_start).to.eq(0)
            });
            it("result.range_end is 0", async ()=>{
                expect(response.meta.result.range_end).to.eq(100)
            });
        });

    });
});