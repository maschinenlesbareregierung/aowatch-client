import { expect } from 'chai';
import { partyList, party, url, PartyResult } from '../src/entities/entity.party';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("party", ()=>{
    describe("entity", ()=>{
        let response: PartyResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/party/party.id-2.json');
    
            const parsed = parse(url + '/2')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await party(2);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/party';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 2", async ()=>{
                expect(response.meta.result.entity_id).to.eq('2');
            });
            it("result.entity_type is party", async ()=>{
                expect(response.meta.result.entity_type).to.eq('party');
            });
        });

        describe("data", ()=>{ 
            it("full_name is ok", async ()=>{
                expect(response.data.full_name).to.eq('CDU')
            });
            
        }); 
    });

    describe("entity with ?show information", ()=>{ 
        let response: PartyResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/party/party.id-2.show_information.json');
    
            const parsed = parse(url + '/2?related_data=show_information')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
            
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await party(2, 'show_information');
        });

        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        
        describe("related_data", ()=>{ 

            // 'mandates' | 'candidacies' | 'all_candidacies_mandates' | 'votes';
            it("related_data exists", async ()=>{
                expect(response.data.related_data).to.be.ok
            });
            it("related_data.members exists", async ()=>{
                expect(response.data.related_data.members).to.be.ok
            });      
        });
    });
    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/party/parties.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await partyList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/party';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 199", async ()=>{
                expect(response.meta.result.total).to.eq(199)
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