import { expect } from 'chai';
import { committeeList, committee, url, CommitteeResult } from '../src/entities/entity.committee';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("committee", ()=>{
    describe("entity", ()=>{
        let response: CommitteeResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/committee/committee.id-518.json');
    
            const parsed = parse(url + '/518')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await committee(518);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/committee';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 5", async ()=>{
                expect(response.meta.result.entity_id).to.eq('518');
            });
            it("result.entity_type is parliament", async ()=>{
                expect(response.meta.result.entity_type).to.eq('node');
            });
        }); 

    });

    describe("entity with ?show information", ()=>{ 
        let response: CommitteeResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/committee/committee.id-518.show_information.json');
    
            const parsed = parse(url + '/518?related_data=show_information')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
            
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await committee(518, 'show_information');
        });

        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });

        describe("data", ()=>{ 
            it("related_data exists", async ()=>{
                expect(response.data.related_data).to.be.ok
            });
            it("related_data.committee_memberships exists", async ()=>{
                expect(response.data.related_data.committee_memberships).to.be.ok
            });
            it("related_data.polls exists", async ()=>{
                expect(response.data.related_data.polls).to.be.ok
            });
        });
    });
    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/committee/committees.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await committeeList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/committee';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 488", async ()=>{
                expect(response.meta.result.total).to.eq(488)
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