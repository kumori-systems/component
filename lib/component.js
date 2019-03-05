"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_1 = require("./runtime");
/**
 *  This is just an example Base Component. There is no  need to actually extend this class
 * to create a proper component class.
 */
var BaseComponent = /** @class */ (function () {
    function BaseComponent(runtime // TODO: type of RUNTIME instead
    , role // ID of the role as a string.
    , iid, incnum // An integer, also
    , localData // TODO: what is this? a Path?
    , resources // A dictionary of key/value pairs. TODO: revise this definition
    , parameters // Again, an object used as a dictionary
    , dependencies, offerings) {
        this.runtime = runtime;
        this.role = role;
        this.iid = iid;
        this.incnum = incnum;
        this.localData = localData;
        this.resources = resources;
        this.parameters = parameters;
        this.dependencies = dependencies;
        this.offerings = offerings;
    }
    BaseComponent.prototype.run = function () {
        var _this = this;
        this.runtime.ping();
        this._pid = setInterval(function () { return _this.runtime.ping(); }, runtime_1.PING_INTERVAL);
    };
    BaseComponent.prototype.shutdown = function () {
        if (this._pid !== undefined) {
            clearInterval(this._pid);
            this._pid = undefined;
        }
    };
    BaseComponent.prototype.reconfig = function (resources, parameters) {
        this.resources = resources;
        this.parameters = parameters;
        return true;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=component.js.map