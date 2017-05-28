import { EventEmitter } from 'events'

export type Segment = Buffer
export type Data = Segment[]

export interface ChannelHash {
  [index: string]: Channel
}

export interface Message {
  msg: Data
  dyn?: ChannelHash
}

/** TargetId, used to distinguish channels connected to a
 *  complete connector, identifies a particular role in an instance.
 */
export interface Tid {
  iid: string
  endpoint: string
  service: string
}

export type ChannelType =
  'Request'
  | 'Reply'
  | 'Duplex'
  | 'Receive'
  | 'Send'

/**
 * Every channel is an event emitter
 */
export interface Channel extends EventEmitter {
  type: ChannelType
}

/***********   Server functions  */

// A server handler for request/reply interactions
export interface Server {
  (msg: Message): Promise<Message>
}

// A handler for receiving simple "message" events
export interface MessageHandler {
  (msg: Message): void
}

// A handler to receive message events carrying the identity of a member of a complete connector
// through a duplex channel.
export interface CompleteMessageHandler {
  (msg: Message, sender: Tid): void
}

// A handler to process membership changes through a duplex connector
export interface ChangeMembershipHandler {
  (membership: Tid[]): void
}

/******************************* */

/************** Channel variety */

/**
 * Emits the following event: "destinationUnavailable"
 */
export interface Reply extends Channel {
  type: 'Reply'

  handleRequest: Server

  readonly handlers: {
    destinationUnavailable: MessageHandler;  // will receive "destinationUnavailable" events
  }
}

export interface Request extends Channel {
  type: 'Request'

  sendRequest (msg: Message): Promise<Message>  // Promise fails if undeliverable
}

export interface Receive extends Channel {
  type: 'Receive'

  readonly subscribed: string[]
  readonly handlers: {
    message: MessageHandler
  }

  subscribe (topic: string): void
  unsusbscribe (topic: string): void

}

/**
 *  Note that this is a Datagram semantics
 */
export interface Send extends Channel {
  type: 'Send'

  send (msg: Message, topic?: string): void
}

export interface Duplex extends Channel {
  type: 'Duplex'
  readonly handlers: {
    message: CompleteMessageHandler;  // Handler of "message" events
    destinationUnavailable: CompleteMessageHandler;  // Handler for the "destinationUnavailable" events
    changeMembership: ChangeMembershipHandler; // Handler for membership change notifications
  }

  send (msg: Message, target: Tid): void
  getMembership (): Tid[]
}
