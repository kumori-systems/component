import { Channel, Server, Reply, Duplex } from './channels';
import { LogLevel } from './logger';
export declare const PING_INTERVAL = 500;
export interface Runtime {
    ping(): void;
    timeout(channel: Channel, ...args: any[]): void;
    createReplyChannel(requestHandler: Server): Reply;
    createDuplexChannel(): Duplex;
    log(loglevel: LogLevel, message: string): void;
}
