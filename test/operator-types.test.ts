import { expect } from 'chai';
import { Operator } from '../src/types';

describe("Operator", ()=>{
    it("eq", ()=>{
        const o:Operator = "eq";
        expect(o).to.be.ok
    });
    it("gt", ()=>{
        const o:Operator = "gt";
        expect(o).to.be.ok
    });
    it("gte", ()=>{
        const o:Operator = "gte";
        expect(o).to.be.ok
    });
    it("lt", ()=>{
        const o:Operator = "lt";
        expect(o).to.be.ok
    });
    it("lte", ()=>{
        const o:Operator = "lte";
        expect(o).to.be.ok
    });
    it("ne", ()=>{
        const o:Operator = "ne";
        expect(o).to.be.ok
    });
    it("sw", ()=>{
        const o:Operator = "sw";
        expect(o).to.be.ok
    });
    it("cn", ()=>{
        const o:Operator = "cn";
        expect(o).to.be.ok
    });
    it("ew", ()=>{
        const o:Operator = "ew";
        expect(o).to.be.ok
    });
});