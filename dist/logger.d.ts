export interface Logger {
    silly(...msgs: any[]): void;
    info(...msgs: any[]): void;
    error(...msgs: any[]): void;
    warn(...msgs: any[]): void;
}
export declare enum LogLevel {
    SILLY = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
}
export interface RawLogger {
    (level: LogLevel, ...msgs: any[]): void;
}
export declare class Logger {
    private rl;
    constructor(rl: RawLogger);
    debug(...msgs: any[]): void;
}
