import { expect } from 'chai';
import { operator } from '../src/types';

describe("operator", ()=>{
    it("eq", ()=>{
        const o:operator = "eq";
        expect(o).to.be.ok
    });
    it("gt", ()=>{
        const o:operator = "gt";
        expect(o).to.be.ok
    });
    it("gte", ()=>{
        const o:operator = "gte";
        expect(o).to.be.ok
    });
    it("lt", ()=>{
        const o:operator = "lt";
        expect(o).to.be.ok
    });
    it("lte", ()=>{
        const o:operator = "lte";
        expect(o).to.be.ok
    });
    it("ne", ()=>{
        const o:operator = "ne";
        expect(o).to.be.ok
    });
    it("sw", ()=>{
        const o:operator = "sw";
        expect(o).to.be.ok
    });
    it("cn", ()=>{
        const o:operator = "cn";
        expect(o).to.be.ok
    });
    it("ew", ()=>{
        const o:operator = "ew";
        expect(o).to.be.ok
    });
});