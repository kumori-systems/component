errors = require "./errors"
slaputils = require "slaputils"

class Component

    PING_INTERVAL = 500

    # Creates a new component instance.
    #
    # Parameters:
    # * `runtime`: reference to the SLAP runtime agent for this instance.
    # * `role`: id of this instance role in this deployment.
    # * `iid`: instance id.
    # * `incnum`: instance incarnation number.
    # * `parameters`: key-value parameters set.
    # * `dependencies`: array of dependent channels references.
    # * `offerings`: array of offered channels references.
    constructor: (@runtime, @role, @iid, @incnum, @localData, @parameters, @dependencies, @offerings) ->
        # TODO

    # Starts the execution.
    run: ->
        @pid = setInterval =>
            @runtime.ping()
        ,PING_INTERVAL
    
    # Saves the state and stops the execution.
    shutdown: ->
        try
            if @pid then clearInterval @pid
        catch error
            @logger.warn errors.COMPONENT_SHUTDOWN_ERROR, @iid, error.message

    # Changes the component instance parameters
    # 
    # Parameters:
    # * `parameters`: the new parameters.
    # 
    # Returns: `true` if the reconfig can be take and `false` otherwise.
    reconfig: (parameters) ->
        return true

slaputils.setLogger [Component]

module.exports = Component