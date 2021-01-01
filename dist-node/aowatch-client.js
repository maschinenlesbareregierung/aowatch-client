"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AowatchCLient = void 0;
var entity_candidacy_mandate_1 = require("./entities/entity.candidacy-mandate");
var entity_city_1 = require("./entities/entity.city");
var entity_committee_membership_1 = require("./entities/entity.committee-membership");
var entity_committee_1 = require("./entities/entity.committee");
var entity_constituency_1 = require("./entities/entity.constituency");
var entity_country_1 = require("./entities/entity.country");
var entity_election_program_1 = require("./entities/entity.election-program");
var entity_electoral_list_1 = require("./entities/entity.electoral-list");
var entity_fraction_1 = require("./entities/entity.fraction");
var entity_parliament_period_1 = require("./entities/entity.parliament-period");
var entity_parliament_1 = require("./entities/entity.parliament");
var entity_party_1 = require("./entities/entity.party");
var entity_politician_1 = require("./entities/entity.politician");
var entity_poll_1 = require("./entities/entity.poll");
var entity_sidejob_organization_1 = require("./entities/entity.sidejob-organization");
var entity_sidejob_1 = require("./entities/entity.sidejob");
var entity_topic_1 = require("./entities/entity.topic");
var entity_vote_1 = require("./entities/entity.vote");
var events_1 = require("events");
var AowatchCLient = /** @class */ (function (_super) {
    __extends(AowatchCLient, _super);
    function AowatchCLient() {
        var _this = _super.call(this) || this;
        var messageEmitter = new events_1.EventEmitter();
        _this.candidacyMandate = {
            list: _this.wrapListCall(entity_candidacy_mandate_1.candidacyMandateList),
            item: _this.wrapCall(entity_candidacy_mandate_1.candidacyMandate)
        };
        _this.city = {
            list: _this.wrapListCall(entity_city_1.cityList),
            item: _this.wrapCall(entity_city_1.city)
        };
        _this.committeeMembership = {
            list: _this.wrapListCall(entity_committee_membership_1.committeeMembershipList),
            item: _this.wrapCall(entity_committee_membership_1.committeeMembership)
        };
        _this.committee = {
            list: _this.wrapListCall(entity_committee_1.committeeList),
            item: _this.wrapCall(entity_committee_1.committee)
        };
        _this.constituency = {
            list: _this.wrapListCall(entity_constituency_1.constituencyList),
            item: _this.wrapCall(entity_constituency_1.constituency)
        };
        _this.country = {
            list: _this.wrapListCall(entity_country_1.countryList),
            item: _this.wrapCall(entity_country_1.country)
        };
        _this.electionProgram = {
            list: _this.wrapListCall(entity_election_program_1.electionProgramList),
            item: _this.wrapCall(entity_election_program_1.electionProgram)
        };
        _this.electoralList = {
            list: _this.wrapListCall(entity_electoral_list_1.electoralListList),
            item: _this.wrapCall(entity_electoral_list_1.electoralList)
        };
        _this.fraction = {
            list: _this.wrapListCall(entity_fraction_1.fractionList),
            item: _this.wrapCall(entity_fraction_1.fraction)
        };
        _this.parliamentPeriod = {
            list: _this.wrapListCall(entity_parliament_period_1.parliamentPeriodList),
            item: _this.wrapCall(entity_parliament_period_1.parliamentPeriod)
        };
        _this.parliamentPeriod = {
            list: _this.wrapListCall(entity_parliament_1.parliamentList),
            item: _this.wrapCall(entity_parliament_1.parliament)
        };
        _this.party = {
            list: _this.wrapListCall(entity_party_1.partyList),
            item: _this.wrapCall(entity_party_1.party)
        };
        _this.politician = {
            list: _this.wrapListCall(entity_politician_1.politicianList),
            item: _this.wrapCall(entity_politician_1.politician)
        };
        _this.poll = {
            list: _this.wrapListCall(entity_poll_1.pollList),
            item: _this.wrapCall(entity_poll_1.poll)
        };
        _this.sidejobOrganization = {
            list: _this.wrapListCall(entity_sidejob_organization_1.sidejobOrganizationList),
            item: _this.wrapCall(entity_sidejob_organization_1.sidejobOrganization)
        };
        _this.sidejob = {
            list: _this.wrapListCall(entity_sidejob_1.sidejobList),
            item: _this.wrapCall(entity_sidejob_1.sidejob)
        };
        _this.topic = {
            list: _this.wrapListCall(entity_topic_1.topicList),
            item: _this.wrapCall(entity_topic_1.topic)
        };
        _this.vote = {
            list: _this.wrapListCall(entity_vote_1.voteList),
            item: _this.wrapCall(entity_vote_1.vote)
        };
        return _this;
    }
    AowatchCLient.prototype.wrapListCall = function (method) {
        var _this = this;
        return function (params, sort, filter) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.emit("parameters", method.name, params, sort, filter);
                return [2 /*return*/, method(params, sort, filter)
                        .then(function (result) {
                        _this.emit("success", method.name, result.meta);
                        return result;
                    })];
            });
        }); };
    };
    AowatchCLient.prototype.wrapCall = function (method) {
        var _this = this;
        return function (id, relatedData) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.emit("item_parameters", method.name, id, relatedData);
                return [2 /*return*/, method(id, relatedData)
                        .then(function (result) {
                        _this.emit("success", method.name, result.meta);
                        return result;
                    })];
            });
        }); };
    };
    return AowatchCLient;
}(events_1.EventEmitter));
exports.AowatchCLient = AowatchCLient;
