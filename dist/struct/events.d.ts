import { Message } from "./Message";
import { Ready } from "./Ready";
export declare const Events: {
    readonly ready: "READY";
    readonly messageCreate: "MESSAGE_CREATE";
};
export type EventName = typeof Events[keyof typeof Events];
export type EventPayloads = {
    ready: Ready;
    messageCreate: Message;
};
