// TEMPORARY PATCH - TICKET1281
// Usually, k-logger would be injected from BaseComponent itself.
// But k-logger is not ready to be used from typescript projects:
// - When the component is used from ECloud, is not a problem (because the
//   component is loaded by runtime-agent - a coffee project).
// - When the component is used in unit tests, its a problem.
// Solution: inject the logger here
import klogger = require('k-logger')
import { BaseComponent } from './component'
klogger.setLogger([BaseComponent])

export * from './channels'
export * from './component'
export * from './errors'
export * from './runtime'
