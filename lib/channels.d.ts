/// <reference types="node" />
import { EventEmitter } from "events";
export declare type Segment = Buffer | String;
export declare type Message = Segment[];
export interface ChannelHash {
    [index: string]: Channel;
}
export declare type Channels = Channel[];
export declare type MessageAsArray = [Message, Channels] | [Message];
export interface MessageAsObject {
    message: Message;
    dynamicChannels: Channels;
}
/** TargetId, used to distinguish channels connected to a
 *  complete connector, identifies a particular role in an instance.
 */
export interface Tid {
    iid: string;
    endpoint: string;
    service: string;
}
/**
 * Every channel is an event emitter
 */
export interface Channel extends EventEmitter {
    name: string;
    on(event: "error", listener: (error: Error) => void): this;
}
/***********   Server functions  */
export interface Server {
    (message: Message, channels?: Channels): Promise<MessageAsArray>;
}
export interface RequestConfig {
    timeout?: number;
    key?: number;
}
/******************************* */
/************** Channel variety */
/**
 * Emits the following event: "destinationUnavailable"
 */
export interface Reply extends Channel {
    handleRequest: Server;
}
export interface Request extends Channel {
    sendRequest(message: Message, channels?: Channels, config?: RequestConfig): Promise<MessageAsArray> | Promise<MessageAsObject>;
    on(event: 'invalidated', listener: (reason: string) => void): this;
    on(event: string, listener: Function): this;
}
export interface Receive extends Channel {
    readonly topics: string[];
    subscribe(topic: string): void;
    unsusbscribe(topic: string): void;
    on(event: "message", listener: (message: Message, sender: Tid, channels?: Channels) => void): this;
    on(event: string, listener: Function): this;
}
/**
 *  Note that this is a Datagram semantics
 */
export interface Send extends Channel {
    send(message: Message, channels?: Channels, topic?: string): void;
}
export interface Duplex extends Channel {
    send(message: Message, target: Tid, channels?: Channels): void;
    getMembership(): Tid[];
    on(event: "message", listener: (message: Message, sender: Tid, channels?: Channels) => void): this;
    on(event: "changeMembership", listener: (membership: Tid[]) => void): this;
    on(event: string, listener: Function): this;
}
