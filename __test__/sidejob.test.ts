import { expect } from 'chai';
import { sidejobList, sidejob, url, SidejobResult } from '../src/entities/entity.sidejob';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("sidejob", ()=>{
    describe("entity", ()=>{
        let response: SidejobResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/sidejob/sidejob.id-8663.json');
    
            const parsed = parse(url + '/8663')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await sidejob(8663);
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has meta", async ()=>{
            expect(response.meta).to.be.ok
        });
        it("has data", async ()=>{
            expect(response.data).to.be.ok
        });
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/sidejob';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 8663", async ()=>{
                expect(response.meta.result.entity_id).to.eq('8663');
            });
            it("result.entity_type is sidejob", async ()=>{
                expect(response.meta.result.entity_type).to.eq('sidejob');
            });
        }); 

        describe("data", ()=>{ 
            it("category is ok", async ()=>{
                expect(response.data.category).to.be.ok
            });
            it("data_change_date is ok", async ()=>{
                expect(response.data.data_change_date).to.be.ok
            });
            it("field_city is ok", async ()=>{
                expect(response.data.field_city).to.be.ok
            });
            it("field_country is ok", async ()=>{
                expect(response.data.field_country).to.be.ok
            });   
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/sidejob/sidejobs.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await sidejobList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/sidejob';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 9641", async ()=>{
                expect(response.meta.result.total).to.eq(9641)
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