import { candidacyMandate, candidacyMandateList } from './entities/entity.candidacy-mandate';
import { city, cityList } from './entities/entity.city';
import { committeeMembership, committeeMembershipList } from './entities/entity.committee-membership';
import { committee, committeeList } from './entities/entity.committee';
import { constituency, constituencyList } from './entities/entity.constituency';
import { country, countryList } from './entities/entity.country';
import { electionProgram, electionProgramList } from './entities/entity.election-program';
import { electoralList, electoralListList } from './entities/entity.electoral-list';
import { fraction, fractionList } from './entities/entity.fraction';
import { parliamentPeriod, parliamentPeriodList } from './entities/entity.parliament-period';
import { parliament, parliamentList } from './entities/entity.parliament';
import { party, partyList } from './entities/entity.party';
import { politician, politicianList } from './entities/entity.politician';
import { poll, pollList } from './entities/entity.poll';
import { sidejobOrganization, sidejobOrganizationList } from './entities/entity.sidejob-organization';
import { sidejob, sidejobList } from './entities/entity.sidejob';
import { topic, topicList } from './entities/entity.topic';
import { vote, voteList } from './entities/entity.vote';

import { PagerParameters, RangeParameters, SortParameters, FilterParameters, OperatorFilterParameters } from './types';
import {EventEmitter} from "events"
import TypedEmitter from "typed-emitter"

interface MessageEvents {
    error: (error: Error) => void,
    parameters: (methodName: string, params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[]) => void
    item_parameters: (methodname: string, id: number, relatedDataParameter: string) => void
    success: (methodName: string, meta: any) => void
}

export class AowatchCLient extends (EventEmitter as new () => TypedEmitter<MessageEvents>) {
    candidacyMandate: any;
    city: any;
    committeeMembership: any;
    committee: any;
    constituency: any;
    country: any;
    electionProgram: any;
    electoralList: any;
    fraction: any;
    parliamentPeriod: any;
    parliament: any;
    party: any;
    politician: any;
    poll: any;
    sidejobOrganization: any;
    sidejob: any;
    topic: any;
    vote: any;

    constructor() {
        super()
        const messageEmitter = new EventEmitter() as TypedEmitter<MessageEvents>
        this.candidacyMandate = {
            list: this.wrapListCall(candidacyMandateList),
            item: this.wrapCall(candidacyMandate)
        }
        this.city = {
            list: this.wrapListCall(cityList),
            item: this.wrapCall(city)
        }
        this.committeeMembership = {
            list: this.wrapListCall(committeeMembershipList),
            item: this.wrapCall(committeeMembership)
        }
        this.committee = {
            list: this.wrapListCall(committeeList),
            item: this.wrapCall(committee)
        }
        this.constituency = {
            list: this.wrapListCall(constituencyList),
            item: this.wrapCall(constituency)
        }
        this.country = {
            list: this.wrapListCall(countryList),
            item: this.wrapCall(country)
        }
        this.electionProgram = {
            list: this.wrapListCall(electionProgramList),
            item: this.wrapCall(electionProgram)
        }
        this.electoralList = {
            list: this.wrapListCall(electoralListList),
            item: this.wrapCall(electoralList)
        }
        this.fraction = {
            list: this.wrapListCall(fractionList),
            item: this.wrapCall(fraction)
        }
        this.parliamentPeriod = {
            list: this.wrapListCall(parliamentPeriodList),
            item: this.wrapCall(parliamentPeriod)
        }
        this.parliamentPeriod = {
            list: this.wrapListCall(parliamentList),
            item: this.wrapCall(parliament)
        }
        this.party = {
            list: this.wrapListCall(partyList),
            item: this.wrapCall(party)
        }
        this.politician = {
            list: this.wrapListCall(politicianList),
            item: this.wrapCall(politician)
        }
        this.poll = {
            list: this.wrapListCall(pollList),
            item: this.wrapCall(poll)
        }
        this.sidejobOrganization = {
            list: this.wrapListCall(sidejobOrganizationList),
            item: this.wrapCall(sidejobOrganization)
        }
        this.sidejob = {
            list: this.wrapListCall(sidejobList),
            item: this.wrapCall(sidejob)
        }
        this.topic = {
            list: this.wrapListCall(topicList),
            item: this.wrapCall(topic)
        }
        this.vote = {
            list: this.wrapListCall(voteList),
            item: this.wrapCall(vote)
        }
    }

    private  wrapListCall(method: Function): Function {
        return async (params?: PagerParameters|RangeParameters|null, sort?: SortParameters | null, filter?: FilterParameters | OperatorFilterParameters[])=>{
            this.emit("parameters", method.name, params, sort, filter);
            return method(params, sort, filter)
                .then((result: any)=>{
                    this.emit("success", method.name, result.meta);
                    return result;
                });

        }
    }

    private wrapCall(method: Function): Function {
        
        return async (id: number, relatedData: string) => {
            this.emit("item_parameters", method.name, id, relatedData);
            return method(id, relatedData)
                .then((result: any)=>{
                    this.emit("success", method.name, result.meta);
                    return result;
                });
        }
    }

}