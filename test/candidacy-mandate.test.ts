import { expect } from 'chai';
import { candidacyMandate, candidacyMandateList, url, CandidacyMandateResult } from '../src/entities/entity.candidacy-mandate';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("candidacy-mandate", ()=>{
    describe("entity", ()=>{
        let response: CandidacyMandateResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/candidacy-mandate/candidacy-mandate.id-5.json');
    
            const parsed = parse(url + '/5')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await candidacyMandate(5);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/candidacy-mandate';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 5", async ()=>{
                expect(response.meta.result.entity_id).to.eq('5');
            });
            it("result.entity_type is parliament", async ()=>{
                expect(response.meta.result.entity_type).to.eq('candidacy_mandate');
            });
        }); 
    });


    describe("entity with ?show information", ()=>{ 
        let response: CandidacyMandateResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/candidacy-mandate/candidacy-mandate.id-38659.show_information.json');
    
            const parsed = parse(url + '/38659?related_data=show_information')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
            
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await candidacyMandate(38659, 'show_information');
        });

        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });

        describe("data", ()=>{ 
            it("related_data exists", async ()=>{
                expect(response.data.related_data).to.be.ok
            });
            it("related_data.politician exists", async ()=>{
                expect(response.data.related_data.politician).to.be.ok
            });
            it("related_data.votes exists", async ()=>{
                expect(response.data.related_data.votes).to.be.ok
            });
        });
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/candidacy-mandate/candidacy-mandates.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await candidacyMandateList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/candidacy-mandate';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 488", async ()=>{
                expect(response.meta.result.total).to.eq(46441)
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