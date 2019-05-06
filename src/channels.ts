import { EventEmitter } from "events";

export type Segment = Buffer | String;
export type Message = Segment[];

export interface ChannelHash {
  [index: string]: Channel;
}
export type Channels = Channel[];

export type MessageAsArray = Promise<[Message, Channels] | [Message]>;
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

// A server handler for request/reply interactions
export interface Server {
  (message: Message, channels?: Channels): Promise<MessageAsArray>;
}

// Configuration when a request message is sent
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
  sendRequest(
    message: Message,
    channels?: Channels,
    config?: RequestConfig
  ): MessageAsArray | MessageAsObject; // Promise fails if undeliverable
}

export interface Receive extends Channel {
  readonly topics: string[];

  subscribe(topic: string): void;
  unsusbscribe(topic: string): void;
  on(
    event: "message",
    listener: (message: Message, sender: Tid, channels?: Channels) => void
  ): this;
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
  on(
    event: "message",
    listener: (message: Message, sender: Tid, channels?: Channels) => void
  ): this;
  on(event: "changeMembership", listener: (membership: Tid[]) => void): this;
  on(event: string, listener: Function): this;
}
