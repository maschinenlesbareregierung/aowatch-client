import { expect } from 'chai';
import { voteList, vote, url, VoteResult } from '../src/entities/entity.vote';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("vote", ()=>{
    describe("entity", ()=>{
        let response: VoteResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/vote/vote.id-365049.json');
    
            const parsed = parse(url + '/365049')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await vote(365049);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/vote';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 2", async ()=>{
                expect(response.meta.result.entity_id).to.eq('365049');
            });
            it("result.entity_type is taxonomy_term", async ()=>{
                expect(response.meta.result.entity_type).to.eq('vote');
            });
        }); 

        describe("data", ()=>{ 
            it("mandate is ok", async ()=>{
                expect(response.data.mandate).to.be.ok
            });
            it("poll is ok", async ()=>{
                expect(response.data.poll).to.be.ok
            });
            it("vote is ok", async ()=>{
                expect(response.data.vote).to.be.ok
            });
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/vote/votes.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await voteList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/vote';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 373139", async ()=>{
                expect(response.meta.result.total).to.eq(373139)
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