import { expect } from 'chai';
import { fractionList, fraction, url, FractionResult } from '../src/entities/entity.fraction';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("fraction", ()=>{
    describe("entity", ()=>{
        let response: FractionResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/fraction/fraction.id-81.json');
    
            const parsed = parse(url + '/81')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await fraction(81);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/fraction';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 81", async ()=>{
                expect(response.meta.result.entity_id).to.eq('81');
            });
            it("result.entity_type is fraction", async ()=>{
                expect(response.meta.result.entity_type).to.eq('fraction');
            });
        }); 

        describe("data", ()=>{ 
            it("full_name is ok", async ()=>{
                expect(response.data.full_name).to.be.ok
            });
            it("short_name is ok", async ()=>{
                expect(response.data.short_name).to.be.ok
            });
            it("legislature is ok", async ()=>{
                expect(response.data.legislature).to.be.ok
            });
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/fraction/fractions.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await fractionList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/fraction';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 298", async ()=>{
                expect(response.meta.result.total).to.eq(298)
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