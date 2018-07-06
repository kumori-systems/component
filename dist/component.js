"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_1 = require("./runtime");
var errors_1 = require("./errors");
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
        var _this = this;
        this.runtime = runtime;
        this.role = role;
        this.iid = iid;
        this.incnum = incnum;
        this.localData = localData;
        this.resources = resources;
        this.parameters = parameters;
        this.dependencies = dependencies;
        this.offerings = offerings;
        // If a k-logger parameter is defined, use it to inject a logger
        var kloggerCfg = this.parameters.klogger;
        if (!(kloggerCfg === undefined) && !(kloggerCfg === null)) {
            this.logger.configure(kloggerCfg);
            this.logger.setContext(this.runtime.deployment);
            this.logger.setOwner(this.iid);
            if (!(kloggerCfg.runtime === undefined)
                && !(kloggerCfg.runtime === null)) {
                // Apply the same config to runtime
                this.runtime.configureLogger(kloggerCfg);
            }
            if (!(kloggerCfg.handleExceptions === false)) { // Default value: true
                process.on('uncaughtException', function (e) {
                    _this.logger.error("Component. UncaughtException: " + e + ", " + e.message + ",\n" + e.stack);
                    setTimeout(function () {
                        process.exit(1);
                    }, 250);
                });
                process.on('unhandledRejection', function (reason, p) {
                    _this.logger.warn("Component. Possibly Unhandled Rejection:\nPromise " + p + ", Reason " + JSON.stringify(reason));
                });
                process.on('rejectionHandled', function (p) {
                    _this.logger.warn("Component. Rejection Handled: Promise " + p);
                });
            }
        }
    }
    BaseComponent.prototype.run = function () {
        var _this = this;
        this._pid = setInterval(function () { return _this.runtime.ping(); }, runtime_1.PING_INTERVAL);
        this.logger.info('BaseComponent.run');
    };
    BaseComponent.prototype.shutdown = function () {
        this.logger.info('BaseComponent.shutdown');
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