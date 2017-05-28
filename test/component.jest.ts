import { BaseComponent as Component } from '../src/component'
import { Runtime } from '../src/runtime'
import { LogLevel, Logger } from '../src/logger'
import { Duplex, Server, Reply, Channel } from '../src/channels'

class FakeRuntime implements Runtime {
  private _pingCount = 0

  ping (): void {
    this._pingCount++
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
  createReplyChannel (requestHandler: Server): Reply {
    throw new Error(`Method not implemented. ${requestHandler === null} `)
  }
  createDuplexChannel (): Duplex {
    throw new Error('Method not implemented.')
  }
  log (loglevel: LogLevel, message: string): void {
    switch (loglevel) {
      case LogLevel.DEBUG:
        console.debug(message)
        break
      case LogLevel.ERROR:
        console.error(message)
        break
      case LogLevel.INFO:
        console.info(message)
        break
      case LogLevel.WARN:
        console.warn(message)
        break
      case LogLevel.SILLY:
      default:
        console.log(message)
        break
    }
  }

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
let _fakeRuntime: any
  , _component: Component

beforeAll(() => {
  _fakeRuntime = new FakeRuntime()
  _component = new Component
    (_fakeRuntime
    , '', '', 0, '', {}, {}, {}, {}
    )
  _component.logger = new Logger(_fakeRuntime.log)
})

test('Component does not ping after instantiation',
  async () => {
    expect(await pingsAfter(2000))
      .toBe(0)

  })

test('Component pings after run call', async () => {
  _fakeRuntime.resetPings()
  _component.run()

  expect(await pingsAfter(2000))
    .toBeGreaterThan(0)

})

test('Component stops pings after shutdown call', async () => {
  _fakeRuntime.resetPings()
  _component.shutdown()

  expect(await pingsAfter(2000))
    .toBe(0)

})

test('Component accepts reconfig', () => {
  expect(_component.reconfig({}, {}))
})
