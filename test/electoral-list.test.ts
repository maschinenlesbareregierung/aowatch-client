import { expect } from 'chai';
import { electoralList, electoralListList, url, ElectoralListResult } from '../src/entities/entity.electoral-list';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("electoral-list", ()=>{
    describe("entity", ()=>{
        let response: ElectoralListResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/electoral-list/electoral-list.id-108.json');
    
            const parsed = parse(url + '/108')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await electoralList(108);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/electoral-list';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 108", async ()=>{
                expect(response.meta.result.entity_id).to.eq('108');
            });
            it("result.entity_type is taxonomy_term", async ()=>{
                expect(response.meta.result.entity_type).to.eq('electoral_list');
            });
        }); 

        describe("data", ()=>{ 
            it("name is ok", async ()=>{
                expect(response.data.name).to.be.ok
            });
            it("parliament_period is ok", async ()=>{
                expect(response.data.parliament_period).to.be.ok
            });
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/electoral-list/electoral-lists.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await electoralListList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/electoral-list';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 310", async ()=>{
                expect(response.meta.result.total).to.eq(310)
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