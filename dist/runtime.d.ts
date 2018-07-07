import { Channel, Server, Reply, Duplex } from './channels';
export declare const PING_INTERVAL = 500;
export interface Runtime {
    deployment: string;
    ping(): void;
    timeout(channel: Channel, ...args: any[]): void;
    createReplyChannel(requestHandler: Server): Reply;
    createDuplexChannel(): Duplex;
    configureLogger(config: any): void;
}
