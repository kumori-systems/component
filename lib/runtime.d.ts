import { Channel, Server, Reply } from './channels';
export declare const PING_INTERVAL = 500;
export interface Runtime {
    createChannel(requestHandler: Server): Reply;
    timeout(channel: Channel, ...args: any[]): void;
    configureLogger(config: any): Promise<void>;
    ping(): Promise<void>;
}
