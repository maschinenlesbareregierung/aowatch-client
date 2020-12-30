import { candidacyMandate, candidacyMandateList } from './entities/entity.candidacy-mandate';
import { PagerParameters, RangeParameters, SortParameters, FilterParameters, OperatorFilterParameters } from './types';
import {EventEmitter} from "events"
import TypedEmitter from "typed-emitter"

interface MessageEvents {
    error: (error: Error) => void,
    parameters: (methodName: string, params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]) => void
    success: (methodName: string, meta: any) => void
}

export class AowatchCLient extends (EventEmitter as new () => TypedEmitter<MessageEvents>) {
    candidacyMandate: any;

    constructor() {
        super()
        const messageEmitter = new EventEmitter() as TypedEmitter<MessageEvents>
        this.candidacyMandate = {
            list: this.wrapListRemoteCall(candidacyMandateList) 
        }
    }

    private  wrapListRemoteCall(method: Function): Function {
        return async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[])=>{
            this.emit("parameters", method.name, params, sort, filter);
            return method(params, sort, filter)
                .then((result: any)=>{
                    this.emit("success", method.name, result.meta);
                    return result;
                });

        }
    }
}