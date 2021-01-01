import { expect } from 'chai';
import { electionProgramList, electionProgram, url, ElectionProgramResult } from '../src/entities/entity.election-program';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("election-program", ()=>{
    describe("entity", ()=>{
        let response: ElectionProgramResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/election-program/election-program.id-140.json');
    
            const parsed = parse(url + '/140')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await electionProgram(140);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/election-program';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 140", async ()=>{
                expect(response.meta.result.entity_id).to.eq('140');
            });
            it("result.entity_type is election_program", async ()=>{
                expect(response.meta.result.entity_type).to.eq('election_program');
            });
        }); 

        describe("data", ()=>{ 
            it("parliament_period is ok", async ()=>{
                expect(response.data.parliament_period).to.be.ok
            });
            it("party is ok", async ()=>{
                expect(response.data.party).to.be.ok
            });
            it("link is ok", async ()=>{
                expect(response.data.link).to.be.ok
            });
            it("file is ok", async ()=>{
                expect(response.data.file).to.be.ok
            });
        });        
    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/election-program/election-programs.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await electionProgramList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/election-program';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 317", async ()=>{
                expect(response.meta.result.total).to.eq(317)
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