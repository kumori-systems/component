/// <reference types="node" />
import { Runtime } from './runtime';
import { ChannelHash } from './channels';
export declare type Resource = any;
export declare type ConfParam = any;
export interface ResourceHash {
    [index: string]: Resource;
}
export interface ConfigurationHash {
    [index: string]: ConfParam;
}
export interface Component {
    run(): void;
    shutdown(): void;
    reconfig(resources: ResourceHash, parameters: ConfigurationHash): boolean;
}
/**
 *  Note that the following declaration simply represents the signature of the
 *  constructor that a component class must present. As long as the Kumori runtime
 *  gets a function which is newable in this way, the runtime will be able to launch
 *  the component.
 *
 *  To be compatible with original runtime versions, an instance of this interface
 *  is what must be exported from the main module of the component with export = <...>
 */
export declare var Component: {
    new (runtime: Runtime, role: string, iid: string, incnum: number, localData: string, resources: Object, parameters: Object, dependencies: ChannelHash, offerings: ChannelHash): Component;
};
/**
 *  This is just an example Base Component. There is no  need to actually extend this class
 * to create a proper component class.
 */
export declare class BaseComponent implements Component {
    runtime: Runtime;
    role: string;
    iid: string;
    incnum: number;
    localData: string;
    resources: Object;
    parameters: Object;
    dependencies: ChannelHash;
    offerings: ChannelHash;
    logger: any;
    _pid?: NodeJS.Timer;
    constructor(runtime: Runtime, role: string, iid: string, incnum: number, localData: string, resources: Object, parameters: Object, dependencies: ChannelHash, offerings: ChannelHash);
    run(): void;
    shutdown(): void;
    reconfig(resources: ResourceHash, parameters: ConfigurationHash): boolean;
}
