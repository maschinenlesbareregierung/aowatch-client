import { expect } from 'chai';
import { topicList, topic, url, TopicResult } from '../src/entities/entity.topic';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("topic", ()=>{
    describe("entity", ()=>{
        let response: TopicResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/topic/topic.id-2.json');
    
            const parsed = parse(url + '/2')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await topic(2);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/topic';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 2", async ()=>{
                expect(response.meta.result.entity_id).to.eq('2');
            });
            it("result.entity_type is taxonomy_term", async ()=>{
                expect(response.meta.result.entity_type).to.eq('taxonomy_term');
            });
        }); 

        describe("data", ()=>{ 
            it("first_name is ok", async ()=>{
                expect(response.data.description).to.eq(null)
            });
            it("last_name is ok", async ()=>{
                expect(response.data.parent).to.eq(null)
            });
            it("label is ok", async ()=>{
                expect(response.data.label).to.eq('Arbeit und Beschäftigung')
            });
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/topic/topics.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await topicList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(53)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/topic';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 53", async ()=>{
                expect(response.meta.result.count).to.eq(53)
            });
            it("result.total is 53", async ()=>{
                expect(response.meta.result.total).to.eq(53)
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