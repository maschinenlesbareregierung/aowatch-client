import { expect } from 'chai';
import { politicianList, politician, url, PoliticianResult } from '../src/entities/entity.politician';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("parliament", ()=>{
    describe("entity", ()=>{
        let response: PoliticianResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/politician/politicians.id-79137.json');
    
            const parsed = parse(url + '/79137')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await politician(79137);
            
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
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/politician';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl);
            });
            it("status is ok", async ()=>{
                expect(response.meta.status).to.eq('ok');
            });
            it("result.entity_id is 5", async ()=>{
                expect(response.meta.result.entity_id).to.eq('79137');
            });
            it("result.entity_type is parliament", async ()=>{
                expect(response.meta.result.entity_type).to.eq('politician');
            });
        }); 

        describe("data", ()=>{ 
            it("first_name is ok", async ()=>{
                expect(response.data.first_name).to.eq('Angela')
            });
            it("last_name is ok", async ()=>{
                expect(response.data.last_name).to.eq('Merkel')
            });
            it("sex is ok", async ()=>{
                expect(response.data.sex).to.eq('f')
            });
            it("year_of_birth is ok", async ()=>{
                expect(response.data.year_of_birth).to.eq(1954)
            });
            it("party is ok", async ()=>{
                expect(typeof response.data.party).to.eq('object')
            });
            it("party_past is ok", async ()=>{
                expect(response.data.party_past).to.eq(null)
            });

            it("party_past is ok", async ()=>{
                expect(response.data.party_past).to.eq(null)
            });

            it("deceased is ok", async ()=>{
                expect(response.data.deceased).to.eq(null)
            });

            it("deceased_date is ok", async ()=>{
                expect(response.data.deceased_date).to.eq(null)
            });

            it("education is ok", async ()=>{
                expect(response.data.education).to.eq('Promovierte Physikerin')
            });


            it("residence is ok", async ()=>{
                expect(response.data.residence).to.eq(null)
            });

            it("occupation is ok", async ()=>{
                expect(response.data.occupation).to.eq('Bundeskanzlerin')
            });

            it("statistic_questions is ok", async ()=>{
                expect(response.data.statistic_questions).to.eq(238)
            });
            
            it("statistic_questions_answered is ok", async ()=>{
                expect(response.data.statistic_questions_answered).to.eq(null)
            });

            it("qid_wikidata is ok", async ()=>{
                expect(response.data.qid_wikidata).to.eq(null)
            });

            it("field_title is ok", async ()=>{
                expect(response.data.field_title).to.eq(null)
            });
        }); 
    });
    describe("entity with ?show information", ()=>{ 
        let response: PoliticianResult;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/politician/politicians.id-79137.show_information.json');
    
            const parsed = parse(url + '/79137?related_data=show_information')
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
            
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await politician(79137, 'show_information');
        });

        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        
        describe("related_data", ()=>{ 

            // 'mandates' | 'candidacies' | 'all_candidacies_mandates' | 'votes';
            it("related_data exists", async ()=>{
                expect(response.data.related_data).to.be.ok
            });
            it("related_data.mandates exists", async ()=>{
                expect(response.data.related_data.mandates).to.be.ok
            });
            it("related_data.candidacies exists", async ()=>{
                expect(response.data.related_data.candidacies).to.be.ok
            });
            it("related_data.all_candidacies_mandates exists", async ()=>{
                expect(response.data.related_data.all_candidacies_mandates).to.be.ok
            });
            it("related_data.votes exists", async ()=>{
                expect(response.data.related_data.votes).to.be.ok
            });     
        });
    });
    describe("list", ()=>{
        let response: any;
        before(async ()=>{
            const result = readFileSync('./test/fixtures/politician/politicians.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            response = await politicianList();
            
        });
        it("delivers a response", async ()=>{
            expect(response).to.be.ok
        });
        it("has the the expected amount of results", async ()=>{
            expect(response.data.length).to.eq(100)
        });
        
        describe("meta", ()=>{ 
            it("abgeordnetenwatch_api.documentation is correct", async ()=>{
                const docUrl = 'https://www.abgeordnetenwatch.de/api/entitaeten/politician';
                expect(response.meta.abgeordnetenwatch_api.documentation).to.eq(docUrl)
            });
            
            it("result.count is 100", async ()=>{
                expect(response.meta.result.count).to.eq(100)
            });
            it("result.total is 25771", async ()=>{
                expect(response.meta.result.total).to.eq(25771)
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