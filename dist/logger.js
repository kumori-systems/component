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
class Logger {
    constructor(rl) {
        this.rl = rl;
    }
    silly(...msgs) {
        this.rl(LogLevel.SILLY, ...msgs);
    }
    debug(...msgs) {
        this.rl(LogLevel.DEBUG, ...msgs);
    }
    info(...msgs) {
        this.rl(LogLevel.INFO, ...msgs);
    }
    error(...msgs) {
        this.rl(LogLevel.ERROR, ...msgs);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map