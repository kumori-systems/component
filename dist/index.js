"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// TEMPORARY PATCH - TICKET1281
// Usually, k-logger would be injected from BaseComponent itself.
// But k-logger is not ready to be used from typescript projects:
// - When the component is used from ECloud, is not a problem (because the
//   component is loaded by runtime-agent - a coffee project).
// - When the component is used in unit tests, its a problem.
// Solution: inject the logger here
var klogger = require("k-logger");
var component_1 = require("./component");
klogger.setLogger([component_1.BaseComponent]);
__export(require("./component"));
__export(require("./errors"));
__export(require("./runtime"));
//# sourceMappingURL=index.js.map