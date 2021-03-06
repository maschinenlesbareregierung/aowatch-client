"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAll = exports.getEmitter = void 0;
var events_1 = require("events");
var PromisePool = require('promise-pool-executor');
/**
 * Get a Event Emitter to implement logging
 */
var getEmitter = function () {
    return new events_1.EventEmitter();
};
exports.getEmitter = getEmitter;
var countPages = function (listFunction) { return __awaiter(void 0, void 0, void 0, function () {
    var res, result, count, total, pages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, listFunction()];
            case 1:
                res = _a.sent();
                result = res.meta.result;
                count = result.count, total = result.total;
                pages = Math.ceil(total / count);
                return [2 /*return*/, {
                        count: count, pages: pages
                    }];
        }
    });
}); };
/**
 * List all data from the api using the paging mechanic
 * @param listFunction Function from enetities that you want to get all data from
 * @param emitter Optional event emitter to implement logging
 */
var listAll = function (listFunction, concurrency, emitter) {
    if (concurrency === void 0) { concurrency = 2; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, count, pages, pool, lastPage, pageParameters, results, resultData, resultMeta;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, countPages(listFunction)];
                case 1:
                    _a = _b.sent(), count = _a.count, pages = _a.pages;
                    if (emitter) {
                        emitter.emit('count', pages);
                    }
                    pool = new PromisePool.PromisePoolExecutor({
                        concurrencyLimit: concurrency
                    });
                    lastPage = Math.ceil(pages);
                    pageParameters = __spreadArrays(Array(lastPage)).map(function (_, i) {
                        return {
                            page: i,
                            pager_limit: count
                        };
                    });
                    return [4 /*yield*/, pool.addEachTask({
                            data: pageParameters,
                            generator: function (pagingParameters, i) { return __awaiter(void 0, void 0, void 0, function () {
                                var pageresult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, listFunction(pageParameters[i])];
                                        case 1:
                                            pageresult = _a.sent();
                                            if (emitter) {
                                                emitter.emit('page', pageresult.meta);
                                            }
                                            return [2 /*return*/, pageresult];
                                    }
                                });
                            }); }
                        }).promise()
                        // iterate and get all data
                    ];
                case 2:
                    results = _b.sent();
                    resultData = [];
                    results.map(function (result) {
                        resultData.push.apply(resultData, result.data);
                        resultMeta = result.meta;
                    });
                    resultMeta.result.count = resultData.length;
                    return [2 /*return*/, {
                            meta: resultMeta,
                            data: resultData
                        }];
            }
        });
    });
};
exports.listAll = listAll;
