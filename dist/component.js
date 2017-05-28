"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("./runtime");
const errors_1 = require("./errors");
/**
 *  This is just an example Base Component. There is no  need to actually extend this class
 * to create a proper component class.
 */
class BaseComponent {
    constructor(runtime // TODO: type of RUNTIME instead
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
    }
    run() {
        this._pid = setInterval(() => this.runtime.ping(), runtime_1.PING_INTERVAL);
    }
    shutdown() {
        try {
            if (this._pid !== undefined) {
                clearInterval(this._pid);
                this._pid = undefined;
            }
        }
        catch (error) {
            this.logger.warn(errors_1.COMPONENT_SHUTDOWN_ERROR, this.iid, error.message);
        }
    }
    reconfig(resources, parameters) {
        resources = resources;
        parameters = parameters;
        return true;
    }
}
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=component.js.map