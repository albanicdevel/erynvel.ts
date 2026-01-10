export enum OpCode {
    Dispatch = 0, // An event was dispatched.
    Heartbeat = 1, // 	Fired periodically by the client to keep the connection alive.
    Identify = 2, // Starts a new session during the initial handshake.
    Resume = 6, // 	Resume a previous session that was disconnected.
    Reconnect = 7, // You should attempt to reconnect and resume immediately.
    InvalidSession = 9, // The session has been invalidated. You should reconnect and identify/resume accordingly.
    Hello = 10, //    Sent immediately after connecting, contains the heartbeat_interval to use.
    HeartbeatACK = 11 // 	Sent in response to receiving a heartbeat to acknowledge that it has been received. 
}