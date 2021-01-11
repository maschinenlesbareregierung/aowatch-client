import { expect } from 'chai';
import { listAll } from '../src/list-all'
import { partyList, url } from '../src/entities/entity.party';
import {readFileSync} from 'fs';
import { parse } from 'url';

import  nock from 'nock';

describe("listAll", ()=>{
    before(()=>{
        const baseResult = readFileSync('./__test__/fixtures/list-all/parties.json');
        
        const parsed = parse(url)
        const path = `${parsed.path}`;
        const baseUrl = `${parsed.protocol}//${parsed.host}`;

        nock(baseUrl)
            .get(path)
            .reply(200, baseResult);

        const firstPageresult = readFileSync('./__test__/fixtures/list-all/parties-page-0.json');
        const firstPageurl = 'https://www.abgeordnetenwatch.de/api/v2/parties?page=0&pager_limit=100';

        const parsedFirstPageUrl = parse(firstPageurl)
        const pathFirstPage = `${parsedFirstPageUrl.path}`;
        const baseUrlFirstPage = `${parsedFirstPageUrl.protocol}//${parsedFirstPageUrl.host}`;

        nock(baseUrlFirstPage)
            .get(pathFirstPage)
            .reply(200, firstPageresult);


        const secondPageresult = readFileSync('./__test__/fixtures/list-all/parties-page-1.json');
        const secondPageurl = 'https://www.abgeordnetenwatch.de/api/v2/parties?page=1&pager_limit=100';

        const parsedSecondPageUrl = parse(secondPageurl)
        const pathSecondPage = `${parsedSecondPageUrl.path}`;
        const baseUrlSecondPage = `${parsedSecondPageUrl.protocol}//${parsedSecondPageUrl.host}`;

        nock(baseUrlSecondPage)
            .get(pathSecondPage)
            .reply(200, secondPageresult);
    })
    it.only("lists all parties returns the right amount of results", async ()=>{
        const res = await listAll(partyList);
        expect(res.data.length).eq(199)
    });
})