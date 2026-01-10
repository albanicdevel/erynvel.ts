import { Message } from "./Message";
import { Ready } from "./Ready";

export const Events = {
    ready: "READY",
    messageCreate: "MESSAGE_CREATE"
} as const;

export type EventName = typeof Events[keyof typeof Events];

export type EventPayloads = {
    ready: Ready,
    messageCreate: Message
}