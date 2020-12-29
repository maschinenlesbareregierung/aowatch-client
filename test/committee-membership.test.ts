import { expect } from 'chai';
import { committeeMembership, committeeMembershipList, url, CommitteeMembershipResult } from '../src/entities/entity.committee-membership';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("committee-membership", ()=>{
    describe("entity", ()=>{
        let response: CommitteeMembershipResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/committee-membership/committee-membership.id-3542.json');
    
            const parsed = parse(url + '/3452')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await committeeMembership(3452);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/committee-membership';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 3542", async ()=>{
                expect(response.meta.result.entity_id).to.eq('3542');
            });
            it("result.entity_type is committee_membership", async ()=>{
                expect(response.meta.result.entity_type).to.eq('committee_membership');
            });
        }); 

        describe("list", ()=>{
            let response: any;
            before(async ()=>{
                const result = readFileSync('./test/fixtures/committee-membership/committee-memberships.json');
        
                const parsed = parse(url)
                const path = `${parsed.path}`;
                const baseUrl = `${parsed.protocol}//${parsed.host}`;
        
                nock(baseUrl)
                    .get(path)
                    .reply(200, result);
                
                response = await committeeMembershipList();
                
            });
            it("delivers a response", async ()=>{
                expect(response).to.be.ok
            });
            it("has the the expected amount of results", async ()=>{
                expect(response.data.length).to.eq(100)
            });
            
            describe("meta", ()=>{ 
                it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                    const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/committee-membership';
                    expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
                });
                
                it("result.count is 100", async ()=>{
                    expect(response.meta.result.count).to.eq(100)
                });
                it("result.total is 13119", async ()=>{
                    expect(response.meta.result.total).to.eq(13119)
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



});