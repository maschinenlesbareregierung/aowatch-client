import { expect } from 'chai';
import { constituencyList, constituency, url, ConstituencyResult } from '../src/entities/entity.constituency';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("constituency", ()=>{
    describe("entity", ()=>{
        let response: ConstituencyResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/constituency/constituency.id-4125.json');
    
            const parsed = parse(url + '/4125')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await constituency(4125);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/constituency';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 2", async ()=>{
                expect(response.meta.result.entity_id).to.eq('4125');
            });
            it("result.entity_type is taxonomy_term", async ()=>{
                expect(response.meta.result.entity_type).to.eq('constituency');
            });
        }); 

        describe("data", ()=>{ 
            it("name is ok", async ()=>{
                expect(response.data.name).to.be.ok
            });
            it("number is ok", async ()=>{
                expect(response.data.number).to.be.ok
            });
            it("parliament_period is ok", async ()=>{
                expect(response.data.parliament_period).to.be.ok
            });
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/constituency/constituencies.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await constituencyList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/constituency';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 9042", async ()=>{
                expect(response.meta.result.total).to.eq(9042)
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