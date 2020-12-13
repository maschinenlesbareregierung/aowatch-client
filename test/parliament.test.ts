import { expect } from 'chai';
import { parliamentList, parliament, url, ParliamentResult } from '../src/entity.parliament';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("parliament", ()=>{
    describe("entity", ()=>{
        let response: ParliamentResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament/parliament.id-5.json');
    
            const parsed = parse(url + '/5')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliament(5);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/parliament';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status ios ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.count is 18", async ()=>{
                expect(response.meta.result.entity_id).to.eq('5');
            });
            it("result.count is 18", async ()=>{
                expect(response.meta.result.entity_type).to.eq('parliament');
            });
        }); 
    });

    describe("entity with ?show information", ()=>{ 
        let response: ParliamentResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament/parliament.id-5.show_information.json');
    
            const parsed = parse(url + '/5?related_data=show_information')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
            
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliament(5, true);
        });

        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });

        describe("data", ()=>{ 
            it("related_data exists", async ()=>{
                expect(response.data.related_data).to.be.ok
            });
        });

    });

    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament/parliament.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(18)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/parliament';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 18", async ()=>{
                expect(response.meta.result.count).to.eq(18)
            });
            it("result.total is 18", async ()=>{
                expect(response.meta.result.total).to.eq(18)
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