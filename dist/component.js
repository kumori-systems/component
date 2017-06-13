"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_1 = require("./runtime");
var errors_1 = require("./errors");
/**
 *  This is just an example Base Component. There is no  need to actually extend this class
 * to create a proper component class.
 */
var BaseComponent = (function () {
    function BaseComponent(runtime // TODO: type of RUNTIME instead
        , role // ID of the role as a string.
        , iid, incnum // An integer, also
        , localData // TODO: what is this? a Path?
        , resources // A dictionary of key/value pairs. TODO: revise this definition
        , parameters // Again, an object used as a dictionary
        , dependencies, offerings) {
        this.runtime = runtime; // TODO: type of RUNTIME instead
        this.role = role; // ID of the role as a string.
        this.iid = iid;
        this.incnum = incnum; // An integer, also
        this.localData = localData; // TODO: what is this? a Path?
        this.resources = resources; // A dictionary of key/value pairs. TODO: revise this definition
        this.parameters = parameters; // Again, an object used as a dictionary
        this.dependencies = dependencies;
        this.offerings = offerings;
        runtime.setLogger([BaseComponent]);
    }
    BaseComponent.prototype.run = function () {
        var _this = this;
        this._pid = setInterval(function () { return _this.runtime.ping(); }, runtime_1.PING_INTERVAL);
    };
    BaseComponent.prototype.shutdown = function () {
        try {
            if (this._pid !== undefined) {
                clearInterval(this._pid);
                this._pid = undefined;
            }
        }
        catch (error) {
            this.logger.warn(errors_1.COMPONENT_SHUTDOWN_ERROR, this.iid, error.message);
        }
    };
    BaseComponent.prototype.reconfig = function (resources, parameters) {
        resources = resources;
        parameters = parameters;
        return true;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=component.js.map