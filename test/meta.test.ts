import { expect } from 'chai';
import { responseMeta } from '../src/types';

const meta: responseMeta = {
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