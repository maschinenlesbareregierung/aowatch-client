import { expect } from 'chai';
import { pollList, poll, url, PollResult } from '../src/entities/entity.poll';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("poll", ()=>{
    describe("entity", ()=>{
        let response: PollResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/poll/poll.id-3602.json');
    
            const parsed = parse(url + '/3602')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await poll(3602);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/poll';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 3602", async ()=>{
                expect(response.meta.result.entity_id).to.eq('3602');
            });
            it("result.entity_type is node", async ()=>{
                expect(response.meta.result.entity_type).to.eq('node');
            });
        }); 
    });
    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/poll/polls.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await pollList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/poll';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 1166", async ()=>{
                expect(response.meta.result.total).to.eq(1166)
            });

            it("result.range_start is 0", async ()=>{
                expect(response.meta.result.range_start).to.eq(0)
            });
            it("result.range_end is 0", async ()=>{
                expect(response.meta.result.range_end).to.eq(100)
            });
        });

    });

    describe("entity with ?show information", ()=>{ 
        let response: PollResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/poll/poll.id-3602.show_information.json');
    
            const parsed = parse(url + '/3602?related_data=show_information')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
            
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await poll(3602, 'show_information');
        });

        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });

        describe("data", ()=>{ 
            it("related_data exists", async ()=>{
                expect(response.data.related_data).to.be.ok
            });
            it("related_data.votes exists", async ()=>{
                expect(response.data.related_data.votes).to.be.ok
            });
        });
    });
});
