import { expect } from 'chai';
import { AowatchCLient } from '../src/aowatch-client'
import { url } from '../src/entities/entity.candidacy-mandate';
import { readFileSync } from 'fs';
import { parse } from 'url';
import  nock from 'nock';
import { doesNotMatch } from 'assert';

describe("AowatchCLient", ()=>{ 

    describe("constructor and methods", ()=>{ 
        let client: AowatchCLient;

        beforeEach(()=>{
            client = new AowatchCLient();
        });

        it("is a function aka constructor", ()=>{
            expect(typeof AowatchCLient).to.eq('function')
        });
    
        it("new client is a object", ()=>{
            expect(typeof client).to.eq('object')
        });
    
        it("new client is a defines candidacyMandate", ()=>{
            expect(typeof client.candidacyMandate).to.eq('object')
        });
    
        it("new client is a defines candidacyMandate.list", ()=>{
            expect(typeof client.candidacyMandate.list).to.eq('function')
        });
    
        it("is able to listen to events", ()=>{
            expect(typeof client.on).to.eq('function')
        });
    });
    
    describe("events", ()=>{ 
        let client: AowatchCLient;

        beforeEach(()=>{
            const result = readFileSync('./__test__/fixtures/candidacy-mandate/candidacy-mandates.json');
    
            const parsed = parse(url)
            const path = `${parsed.path}`;
            const baseUrl = `${parsed.protocol}//${parsed.host}`;
    
            nock(baseUrl)
                .get(path)
                .reply(200, result);
            
            client = new AowatchCLient();
        });

        it("emits parameters event", async (done)=>{
         
            client.on("parameters", (name: any)=>{
                done()
            })
            const res = await client.candidacyMandate.list();
        });

        it("emits success event", (done)=>{
         
            client.on("success", (name: any)=>{
                done()
            })
            client.candidacyMandate.list();
        });
    });
});