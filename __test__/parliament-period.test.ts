import { expect } from 'chai';
import { parliamentPeriodList, parliamentPeriod, url, ParliamentPeriodResult } from '../src/entities/entity.parliament-period';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("parliamentPeriod", ()=>{
    describe("entity", ()=>{
        let response: ParliamentPeriodResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/parliament-periods/parliament-periods.id-111.json');
    
            const parsed = parse(url + '/111')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentPeriod(111);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/parliament-period';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.count is 111", async ()=>{
                expect(response.meta.result.entity_id).to.eq('111');
            });
            it("result.entity_type is parliament_period", async ()=>{
                expect(response.meta.result.entity_type).to.eq('parliament_period');
            });
        }); 
    });
    describe("entity with ?show information", ()=>{ 
        let response: ParliamentPeriodResult;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/parliament-periods/parliament-periods.id-111.show_information.json');
    
            const parsed = parse(url + '/111?related_data=show_information')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
            
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentPeriod(111, 'show_information');
        });

        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });

        describe("data", ()=>{ 

            // 'polls' | 'mandates' | 'committees' | 'constituencies';
            it("related_data exists", async ()=>{
                expect(response.data.related_data).to.be.ok
            });
            it("related_data.polls exists", async ()=>{
                expect(response.data.related_data.polls).to.be.ok
            });
            it("related_data.mandates exists", async ()=>{
                expect(response.data.related_data.mandates).to.be.ok
            });
            it("related_data.committees exists", async ()=>{
                expect(response.data.related_data.committees).to.be.ok
            });
            it("related_data.constituencies exists", async ()=>{
                expect(response.data.related_data.constituencies).to.be.ok
            });
        });
    });
    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./__test__/fixtures/parliament-periods/parliament-periods.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentPeriodList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/parliament-period';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 106", async ()=>{
                expect(response.meta.result.total).to.eq(106)
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
