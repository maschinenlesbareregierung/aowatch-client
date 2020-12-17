import { expect } from 'chai';
import { parliamentList, parliament, url, ParliamentResult } from '../src/entities/entity.parliament';
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
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 5", async ()=>{
                expect(response.meta.result.entity_id).to.eq('5');
            });
            it("result.entity_type is parliament", async ()=>{
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
            
            response = await parliament(5, 'show_information');
        });

        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });

        describe("data", ()=>{ 
            it("related_data exists", async ()=>{
                expect(response.data.related_data).to.be.ok
            });
            it("related_data.legislatures exists", async ()=>{
                expect(response.data.related_data.legislatures).to.be.ok
            });
            it("related_data.elections exists", async ()=>{
                expect(response.data.related_data.elections).to.be.ok
            });
            it("related_data.all_parliament_periods exists", async ()=>{
                expect(response.data.related_data.all_parliament_periods).to.be.ok
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
    describe("list range", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament/parliament-range.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}?range_start=0&range_end=1`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentList({
                range_start: 0,
                range_end: 1
            });
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/parliament';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 18", async ()=>{
                expect(response.meta.result.count).to.eq(1)
            });
            it("result.total is 18", async ()=>{
                expect(response.meta.result.total).to.eq(18)
            });

            it("result.range_start is 0", async ()=>{
                expect(response.meta.result.range_start).to.eq(0)
            });
            it("result.range_end is 0", async ()=>{
                expect(response.meta.result.range_end).to.eq(1)
            });
        });
    });

    describe("list sorted", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament/parliament-sorted.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}?sort_by=id&sort_direction=asc`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentList(null, {
                sort_by: 'id',
                sort_direction: 'asc'
            });
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });

        it("the first element in the result array is the expected one", async ()=>{
            expect(response.data[0].id).to.eq(1)
        });
    });

    describe("list filtered", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament/parliament-filtered.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}?id=1`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentList(null, null, { id: 1});
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("the first element in the result array is the expected one", async ()=>{
            expect(response.data[0].id).to.eq(1)
        });
    });

    describe("list operator filtered", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament/parliament-filtered-operator.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}?id%5Beq%5D=1`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentList(null, null, [
                {
                    field: 'id',
                    operator: 'eq',
                    value: 1
                }
            ]);
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
    });

    describe("list paged", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/parliament/parliament-paged.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}?page=0&pager_limit=10`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await parliamentList({
                page: 0,
                pager_limit: 10
            });
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });

        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(10)
        });

        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/parliament';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 10", async ()=>{
                expect(response.meta.result.count).to.eq(10)
            });
            it("result.total is 18", async ()=>{
                expect(response.meta.result.total).to.eq(18)
            });

            it("result.range_start is not defined", async ()=>{
                expect(response.meta.result.range_start).to.be.not.ok
            });
            it("result.range_end is not defined", async ()=>{
                expect(response.meta.result.range_end).to.be.not.ok
            });
        });

    });
});