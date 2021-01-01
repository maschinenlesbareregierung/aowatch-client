import { expect } from 'chai';
import { sidejobOrganization, sidejobOrganizationList, url, SidejobOrganizationResult } from '../src/entities/entity.sidejob-organization';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("sidejob-organization", ()=>{
    describe("entity", ()=>{
        let response: SidejobOrganizationResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/sidejob-organization/sidejob-organization.id-1156.json');
    
            const parsed = parse(url + '/1156')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await sidejobOrganization(1156);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/sidejob-organization';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 1156", async ()=>{
                expect(response.meta.result.entity_id).to.eq('1156');
            });
            it("result.entity_type is sidejob_organization", async ()=>{
                expect(response.meta.result.entity_type).to.eq('sidejob_organization');
            });
        }); 

        describe("data", ()=>{ 
            it("field_city is ok", async ()=>{
                expect(response.data.field_city).to.be.ok
            });
            it("field_country is ok", async ()=>{
                expect(response.data.field_country).to.be.ok
            });
            it("field_topics is ok", async ()=>{
                expect(response.data.field_topics).to.be.ok
            });
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/sidejob-organization/sidejob-organizations.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await sidejobOrganizationList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/sidejob-organization';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 3852", async ()=>{
                expect(response.meta.result.total).to.eq(3852)
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