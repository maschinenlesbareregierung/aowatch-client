import { expect } from 'chai';
import { countryList, country, url, CountryResult } from '../src/entities/entity.country';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("vote", ()=>{
    describe("entity", ()=>{
        let response: CountryResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/country/country.id-61.json');
    
            const parsed = parse(url + '/61')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await country(61);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/country';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 61", async ()=>{
                expect(response.meta.result.entity_id).to.eq('61');
            });
            it("result.entity_type is taxonomy_term", async ()=>{
                expect(response.meta.result.entity_type).to.eq('taxonomy_term');
            });
        }); 

        describe("data", ()=>{ 
            it("leabel is ok", async ()=>{
                expect(response.data.label).to.be.ok
            });
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/country/countries.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await countryList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(25)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/country';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 25", async ()=>{
                expect(response.meta.result.count).to.eq(25)
            });
            it("result.total is 25", async ()=>{
                expect(response.meta.result.total).to.eq(25)
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