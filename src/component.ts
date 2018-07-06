import { Runtime, PING_INTERVAL } from './runtime'
import { ChannelHash } from './channels'
import { COMPONENT_SHUTDOWN_ERROR } from './errors'

export type Resource = any
export type ConfParam = any

export interface ResourceHash {
  [index: string]: Resource
}

export interface ConfigurationHash {
  [index: string]: ConfParam
}

export interface Component {
  run (): void
  // Saves the state and stops the execution.
  shutdown (): void

  // Changes the component instance parameters
  //
  // Parameters:
  // * `parameters`: the new parameters.
  //
  // Returns: `true` if the reconfig can be taken and `false` otherwise.
  reconfig (resources: ResourceHash, parameters: ConfigurationHash): boolean
}

/**
 *  Note that the following declaration simply represents the signature of the
 *  constructor that a component class must present. As long as the Kumori runtime
 *  gets a function which is newable in this way, the runtime will be able to launch
 *  the component.
 *
 *  To be compatible with original runtime versions, an instance of this interface
 *  is what must be exported from the main module of the component with export = <...>
 */
export declare var Component: {
  new
  (runtime: Runtime     // TODO: type of RUNTIME instead
    , role: string         // ID of the role as a string.
    , iid: string
    , incnum: number       // An integer, also
    , localData: string    // TODO: what is this? a Path?
    , resources: Object   // A dictionary of key/value pairs. TODO: revise this definition
    , parameters: Object  // Again, an object used as a dictionary
    , dependencies: ChannelHash
    , offerings: ChannelHash
  ): Component;
}

/**
 *  This is just an example Base Component. There is no  need to actually extend this class
 * to create a proper component class.
 */
export class BaseComponent implements Component {
  logger: any
  _pid?: NodeJS.Timer

  constructor
    (public runtime: Runtime     // TODO: type of RUNTIME instead
    , public role: string         // ID of the role as a string.
    , public iid: string
    , public incnum: number       // An integer, also
    , public localData: string    // TODO: what is this? a Path?
    , public resources: Object   // A dictionary of key/value pairs. TODO: revise this definition
    , public parameters: Object  // Again, an object used as a dictionary
    , public dependencies: ChannelHash
    , public offerings: ChannelHash
    ) {

    // If a k-logger parameter is defined, use it to inject a logger
    let kloggerCfg: any = this.parameters.klogger
    if ( !(kloggerCfg === undefined) && !(kloggerCfg === null) ) {
      this.logger.configure(kloggerCfg)
      this.logger.setContext(this.runtime.deployment)
      this.logger.setOwner(this.iid)
      if ( !(kloggerCfg.runtime === undefined)
      && !(kloggerCfg.runtime === null) ) {
        // Apply the same config to runtime
        this.runtime.configureLogger(kloggerCfg)
      }
      if (!(kloggerCfg.handleExceptions === false)) { // Default value: true
        process.on('uncaughtException', (e: Error) => {
          this.logger.error(`Component. UncaughtException: ${e}, ${e.message},
${e.stack}`)
          setTimeout(() => {
            process.exit(1)
          }, 250)
        })
        process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
          this.logger.warn(`Component. Possibly Unhandled Rejection:
Promise ${p}, Reason ${JSON.stringify(reason)}`)
        })
        process.on('rejectionHandled', (p: Promise<any>) => {
          this.logger.warn(`Component. Rejection Handled: Promise ${p}`)
        })
      }
    }
  }

  run (): void {
    this._pid = setInterval(() => this.runtime.ping(), PING_INTERVAL)
    this.logger.info('BaseComponent.run')
  }

  shutdown (): void {
    this.logger.info('BaseComponent.shutdown')
    try {
      if (this._pid !== undefined) {
        clearInterval(this._pid)
        this._pid = undefined
      }
    } catch (error) {
      this.logger.warn(COMPONENT_SHUTDOWN_ERROR, this.iid, error.message)
    }
  }

  reconfig (resources: ResourceHash, parameters: ConfigurationHash): boolean {
    resources = resources
    parameters = parameters
    return true
  }
}
