Component = require '../src/index'

describe 'Component', ->

  class FakeRuntime
    constructor: () ->
      @pingCount = 0

    ping: () ->
      @pingCount++

    getPings: () ->
      return @pingCount

    resetPings: () ->
      @pingCount = 0

    setLogger: () ->


  fakeRuntime = null
  component = null

  before (done) ->
    fakeRuntime = new FakeRuntime()
    component =
      new Component fakeRuntime, null, null, null, null, null, null, null, null
    component.logger =
      messages: []
      warn: (msg) ->
        @messages.push msg
    done()

  after (done) ->
    done()


  it "Component doesn't ping after constructor", (done) ->
    @timeout 10000
    setTimeout () ->
      if fakeRuntime.getPings() is 0
        done()
      else
        done new Error 'Component should not be pinging before run()'
    , 2000


  it 'Component pings after run call', (done) ->
    @timeout 10000
    fakeRuntime.resetPings()
    component.run()
    setTimeout () ->
      if fakeRuntime.getPings() > 0
        done()
      else
        done new Error 'Component should be pinging after run()'
    , 2000


  it 'Component stops pings after shutdown call', (done) ->
    @timeout 10000
    component.shutdown()
    fakeRuntime.resetPings()
    setTimeout () ->
      if fakeRuntime.getPings() is 0
        done()
      else
        done new Error 'Component should not be pinging after shutdown()'
    , 2000


  it 'Component reconfig', (done) ->
    component.reconfig()
    done()
