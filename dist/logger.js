"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["SILLY"] = 0] = "SILLY";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = (function () {
    function Logger(rl) {
        this.rl = rl;
    }
    Logger.prototype.silly = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        this.rl.apply(this, [LogLevel.SILLY].concat(msgs));
    };
    Logger.prototype.debug = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        this.rl.apply(this, [LogLevel.DEBUG].concat(msgs));
    };
    Logger.prototype.info = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        this.rl.apply(this, [LogLevel.INFO].concat(msgs));
    };
    Logger.prototype.error = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        this.rl.apply(this, [LogLevel.ERROR].concat(msgs));
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map