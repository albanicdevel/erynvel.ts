import { DispatchEvents } from "./extends";

export interface GatewayPayload<T = unknown> {
    d: T;
    op: number | OpCode;
    t?: string | null;
    s?: number | null;
}

export enum OpCode {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    RESUME = 6,
    RECONNECT = 7,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11,
}

export interface HelloPayload {
    heartbeat_interval: number;
}

export type HeartbeatPayload = number | null;

export interface IdentifyPayload {
    token: string;
    intents: number;
    properties: {
        os: string;
        browser: string;
        device: string;
    };
}

type HelloGatewayPayload =
    GatewayPayload<HelloPayload> & { op: OpCode.HELLO };

type HeartbeatAckPayload =
    GatewayPayload<null> & { op: OpCode.HEARTBEAT_ACK };

type ReconnectPayload =
    GatewayPayload<null> & { op: OpCode.RECONNECT };

type InvalidSessionPayload =
    GatewayPayload<boolean> & { op: OpCode.INVALID_SESSION };

export type IncomingGatewayPayload =
    | HelloGatewayPayload
    | HeartbeatAckPayload
    | ReconnectPayload
    | InvalidSessionPayload
    | DispatchEvents;

// There is a rather useless typeless interface and enum..