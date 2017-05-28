"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../src/component");
const logger_1 = require("../src/logger");
class FakeRuntime {
    constructor() {
        this._pingCount = 0;
    }
    ping() {
        this._pingCount++;
    }
    get pings() {
        return this._pingCount;
    }
    resetPings() {
        this._pingCount = 0;
    }
    timeout(channel, ...args) {
        throw new Error(`Method not implemented: ${channel === null}:${args.length}`);
    }
    createReplyChannel(requestHandler) {
        throw new Error(`Method not implemented. ${requestHandler === null} `);
    }
    createDuplexChannel() {
        throw new Error('Method not implemented.');
    }
    log(loglevel, message) {
        switch (loglevel) {
            case logger_1.LogLevel.DEBUG:
                console.debug(message);
                break;
            case logger_1.LogLevel.ERROR:
                console.error(message);
                break;
            case logger_1.LogLevel.INFO:
                console.info(message);
                break;
            case logger_1.LogLevel.WARN:
                console.warn(message);
                break;
            case logger_1.LogLevel.SILLY:
            default:
                console.log(message);
                break;
        }
    }
}
/**
 * Function returning a Promise resolving to the number of pings
 * performed against the fake runtime.
 *
 * @param it
 *  The time to wait until the promise is resolved with the
 *  value of the number of pings registered.
 */
function pingsAfter(it) {
    return new Promise((resolve) => setTimeout(() => resolve(_fakeRuntime.pings), it));
}
/**
 *  Hold a mock runtime and an instance of a component under test.
 */
// tslint:disable-next-line:one-variable-per-declaration
let _fakeRuntime, _component;
beforeAll(() => {
    _fakeRuntime = new FakeRuntime();
    _component = new component_1.BaseComponent(_fakeRuntime, '', '', 0, '', {}, {}, {}, {});
    _component.logger = new logger_1.Logger(_fakeRuntime.log);
});
test('Component does not ping after instantiation', () => __awaiter(this, void 0, void 0, function* () {
    expect(yield pingsAfter(2000))
        .toBe(0);
}));
test('Component pings after run call', () => __awaiter(this, void 0, void 0, function* () {
    _fakeRuntime.resetPings();
    _component.run();
    expect(yield pingsAfter(2000))
        .toBeGreaterThan(0);
}));
test('Component stops pings after shutdown call', () => __awaiter(this, void 0, void 0, function* () {
    _fakeRuntime.resetPings();
    _component.shutdown();
    expect(yield pingsAfter(2000))
        .toBe(0);
}));
test('Component accepts reconfig', () => {
    expect(_component.reconfig({}, {}));
});
//# sourceMappingURL=component.jest.js.map