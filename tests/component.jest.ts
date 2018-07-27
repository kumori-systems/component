import { BaseComponent as Component } from '../src/component'
import { Runtime } from '../src/runtime'
import { Server, Reply, Channel } from '../src/channels'

class FakeRuntime implements Runtime {
  deployment: string = 'dep1'
  private _pingCount = 0

  ping (): Promise<void> {
    this._pingCount++
    return Promise.resolve()
  }
  get pings () {
    return this._pingCount
  }
  resetPings () {
    this._pingCount = 0
  }
  timeout (channel: Channel, ...args: any[]): void {
    throw new Error(`Method not implemented: ${channel === null}:${args.length}`)
  }
  createChannel (requestHandler: Server): Reply {
    throw new Error(`Method not implemented. ${requestHandler === null} `)
  }
  configureLogger (cfg: any): Promise<void> {
    // Do nothing - mock
    return Promise.resolve()
  }
}

// TEMPORARY PATCH - TICKET1281
// k-logger is not ready to be used from typescript projects:
// - When the component is used from ECloud, is not a problem (because the
//   component is loaded by runtime-agent - a coffee project).
// - When the component is used in unit tests, its a problem.
// So, a FakeLogger is used
class FakeLogger {
  private _lines: string[]
  private _configured: boolean
  private _iid: string
  private _deployment: string
  constructor () {
    this._lines = []
    this._configured = false
  }
  configure (kloggerCfg) { this._configured = true }
  setContext (deployment) { this._deployment = deployment }
  setOwner (iid) { this._iid = iid }
  debug (message) { this.log(message) }
  info (message) { this.log(message) }
  warn (message) { this.log(message) }
  error (message) { this.log(message) }
  log (message) {
    if (this._configured) {
      this._lines.push(`iid ${this._iid} dep ${this._deployment} ${message}`)
    } else {
      this._lines.push('Not configured!!')
    }
  }
  getLastTrace () {
    if (this._lines.length > 0) {
      return this._lines[this._lines.length - 1]
    } else {
      return ''
    }
  }
}

// Logger injection
function setLogger (clazz, logger) {
  Object.defineProperty(clazz.prototype, 'logger', {
    get: function () {
      if (this['_logger'] === undefined) this['_logger'] = logger
      return this['_logger']
    },
    set: function (value) {
      this['_logger'] = value
    }
  })
}

/**
 * Function returning a Promise resolving to the number of pings
 * performed against the fake runtime.
 *
 * @param it
 *  The time to wait until the promise is resolved with the
 *  value of the number of pings registered.
 */
function pingsAfter (it: number): Promise<number> {
  return new Promise<number>(
    (resolve) => setTimeout(() => resolve(_fakeRuntime.pings), it)
  )
}

/**
 *  Hold a mock runtime and an instance of a component under test.
 */
// tslint:disable-next-line:one-variable-per-declaration
let _fakeRuntime: FakeRuntime
  , _component: Component
  , _fakeLogger: FakeLogger

beforeAll(() => {
  _fakeRuntime = new FakeRuntime()
  _fakeLogger = new FakeLogger()
  setLogger(Component, _fakeLogger)
  _component = new Component(_fakeRuntime, '', 'iid1', 0, '', {},
  { klogger: {} }, {}, {})
})

test('Component does not ping after instantiation', async () => {
  expect(await pingsAfter(2000)).toBe(0)
})

test('Component pings after run call', async () => {
  _fakeRuntime.resetPings()
  _component.run()
  expect(await pingsAfter(2000)).toBeGreaterThan(0)
})

test.skip('Log traces after run method --> Skipped: logs removed from BaseComponent', () => {
  let expectedTrace = 'iid iid1 dep dep1 BaseComponent.run'
  expect(_fakeLogger.getLastTrace()).toBe(expectedTrace)
})

test('Component stops pings after shutdown call', async () => {
  _fakeRuntime.resetPings()
  _component.shutdown()
  expect(await pingsAfter(2000)).toBe(0)
})

test('Component accepts reconfig', () => {
  expect(_component.reconfig({}, {}))
})
