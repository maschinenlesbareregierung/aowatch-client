import { expect } from 'chai';
import { extractLinks } from '../src/extract-links';
import { readFileSync } from 'fs';
import { parse } from 'url';

import  nock from 'nock';

const testPage = 'https://www.abgeordnetenwatch.de/profile/angela-merkel'
describe("extract links", ()=>{
    before(async ()=>{
        const result = readFileSync('./__test__/fixtures/pages/angela-merkel.html');

        const parsed = parse(testPage)
        const path = `${parsed.path}`;
        const baseUrl = `${parsed.protocol}//${parsed.host}`;

        nock(baseUrl)
            .get(path)
            .reply(200, result);
        
    });
    it("extract links", async ()=>{
        const res = await extractLinks(testPage);
        expect(res.length).to.eq(5)
    });
});