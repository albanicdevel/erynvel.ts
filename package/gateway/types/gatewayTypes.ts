import { OpCode } from "./opcode";

export interface GatewayBase {
  op: OpCode;
  s: number | null;
  t?: string;
  d: unknown;
}

export interface ReadyEvent {
  v: number;
  session_id: string;
  resume_gateway_url: string;
  user: {
    id: string;
    username: string;
  };
}

export interface ResumedEvent {}

export type HelloPayload = {
  op: OpCode.Hello;
  d: { heartbeat_interval: number };
  s: null;
};

export type HeartbeatAckPayload = {
  op: OpCode.HeartbeatACK;
  d: null;
  s: null;
};

export type DispatchPayload =
  | {
      op: OpCode.Dispatch;
      t: "READY";
      s: number;
      d: ReadyEvent;
    }
  | {
      op: OpCode.Dispatch;
      t: "RESUMED";
      s: number;
      d: ResumedEvent;
    };

export type GatewayPayload =
  | HelloPayload
  | DispatchPayload
  | HeartbeatAckPayload
  | {
      op: OpCode.Reconnect | OpCode.InvalidSession | OpCode.Heartbeat;
      d: any;
      s: number | null;
    };

export type Snowflake = string;