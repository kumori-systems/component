export interface Logger {
  silly (...msgs: any[]): void
  info (...msgs: any[]): void
  error (...msgs: any[]): void
  warn (...msgs: any[]): void
}

export enum LogLevel {
  SILLY
  , DEBUG
  , INFO
  , WARN
  , ERROR
}

export interface RawLogger {
  (level: LogLevel, ...msgs: any[]): void
}

export class Logger {
  constructor (private rl: RawLogger) {
  }

  silly (...msgs: any[]) {
    this.rl(LogLevel.SILLY, ...msgs)
  }

  debug (...msgs: any[]) {
    this.rl(LogLevel.DEBUG, ...msgs)
  }

  info (...msgs: any[]) {
    this.rl(LogLevel.INFO, ...msgs)
  }

  error (...msgs: any[]) {
    this.rl(LogLevel.ERROR, ...msgs)
  }
}
