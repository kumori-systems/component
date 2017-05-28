/// <reference types="node" />
import { EventEmitter } from 'events';
export declare type Segment = Buffer;
export declare type Data = Segment[];
export interface ChannelHash {
    [index: string]: Channel;
}
export interface Message {
    msg: Data;
    dyn?: ChannelHash;
}
/** TargetId, used to distinguish channels connected to a
 *  complete connector, identifies a particular role in an instance.
 */
export interface Tid {
    iid: string;
    endpoint: string;
    service: string;
}
export declare type ChannelType = 'Request' | 'Reply' | 'Duplex' | 'Receive' | 'Send';
/**
 * Every channel is an event emitter
 */
export interface Channel extends EventEmitter {
    type: ChannelType;
}
/***********   Server functions  */
export interface Server {
    (msg: Message): Promise<Message>;
}
export interface MessageHandler {
    (msg: Message): void;
}
export interface CompleteMessageHandler {
    (msg: Message, sender: Tid): void;
}
export interface ChangeMembershipHandler {
    (membership: Tid[]): void;
}
/******************************* */
/************** Channel variety */
/**
 * Emits the following event: "destinationUnavailable"
 */
export interface Reply extends Channel {
    type: 'Reply';
    handleRequest: Server;
    readonly handlers: {
        destinationUnavailable: MessageHandler;
    };
}
export interface Request extends Channel {
    type: 'Request';
    sendRequest(msg: Message): Promise<Message>;
}
export interface Receive extends Channel {
    type: 'Receive';
    readonly subscribed: string[];
    readonly handlers: {
        message: MessageHandler;
    };
    subscribe(topic: string): void;
    unsusbscribe(topic: string): void;
}
/**
 *  Note that this is a Datagram semantics
 */
export interface Send extends Channel {
    type: 'Send';
    send(msg: Message, topic?: string): void;
}
export interface Duplex extends Channel {
    type: 'Duplex';
    readonly handlers: {
        message: CompleteMessageHandler;
        destinationUnavailable: CompleteMessageHandler;
        changeMembership: ChangeMembershipHandler;
    };
    send(msg: Message, target: Tid): void;
    getMembership(): Tid[];
}
