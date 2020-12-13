import { expect } from 'chai';
import { ResponseMeta } from '../src/types';

const meta: ResponseMeta = {
    abgeordnetenwatch_api: {
      version: "2.0",
      documentation: "https://www.abgeordnetenwatch.de/api"
    },
  
    status: "ok",
    status_message: "",
    result: {
      count: 18,
      total: 18,
      range_start: 0,
      range_end: 100
    }
};

describe("responseMetadata", ()=>{
    it("is ok", ()=>{
        expect(meta).to.be.ok
    });
});