import { DispatchMap } from "../struct/dispatchMap";
import { Emitter } from "../struct/emitter";
import { OpCode } from "./types/opcode";
/**
 * opening a gateway from our host to Discord, sending it a payload see https://discord.com/developers/docs/events/gateway#gateway
 */
export class Gateway extends Emitter {
    token;
    intents;
    ws;
    seq = null;
    timer = null;
    lastAck = true;
    sessionId = null;
    /**
     *
     * @param token Authorization token
     * @param intents Intents https://discord.com/developers/docs/events/gateway#gateway-intents
     */
    constructor(token, intents) {
        super();
        this.token = token;
        this.intents = intents;
    }
    /**
     * attempting to establish a connection to the gateway
     */
    connect() {
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        this.ws.onmessage = (ev) => this.onMessage(ev.data);
        this.ws.onclose = () => this.reconnect();
        this.ws.onerror = () => this.reconnect();
    }
    onMessage(data) {
        const text = typeof data === "string" ? data : Buffer.from(data).toString();
        const payload = JSON.parse(text);
        if (payload.s !== null)
            this.seq = payload.s;
        switch (payload.op) {
            case OpCode.Hello:
                this.sendHeartbeat(payload.d.heartbeat_interval);
                if (this.sessionId)
                    this.resume();
                else
                    this.identify();
                break;
            case OpCode.Heartbeat:
                this.send(OpCode.Heartbeat, this.seq); // so as not to catch a reconnection
                break;
            case OpCode.Dispatch:
                if (DispatchMap[payload.t]) {
                    this.emit(DispatchMap[payload.t], payload.d);
                }
                if (payload.t === "READY") {
                    this.sessionId = payload.d.session_id;
                    this.reconnectAttemps = 0;
                }
                break;
            case OpCode.HeartbeatACK:
                this.lastAck = true;
                break;
            case OpCode.Reconnect:
                this.reconnect();
                break;
            case OpCode.InvalidSession:
                this.sessionId = null;
                setTimeout(() => this.identify(), 1000 + Math.random() * 4000);
                break;
        }
    }
    sendHeartbeat(timer) {
        if (this.timer)
            clearInterval(this.timer);
        const jitter = Math.random() * timer; // Clients should send their first heartbeat after a random delay less than the heartbeat interval.
        setTimeout(() => {
            this.send(OpCode.Heartbeat, this.seq); // send heartbeat with jitter once
            this.timer = setInterval(() => {
                if (!this.lastAck) {
                    this.reconnect();
                    return;
                }
                this.lastAck = false;
                this.send(OpCode.Heartbeat, this.seq); // first by jitter and then regularly by interval
            }, timer);
        }, jitter);
    }
    lastIdentify = 0;
    identify() {
        const now = Date.now();
        if (now - this.lastIdentify < 5000)
            return;
        this.lastIdentify = now;
        this.send(OpCode.Identify, {
            "token": this.token,
            "intents": this.intents,
            "properties": {
                "os": "erynvel",
                "browser": "erynvel",
                "device": "erynvel"
            }
        });
    }
    resume() {
        if (!this.sessionId)
            return this.identify();
        this.send(OpCode.Resume, {
            "token": this.token,
            "session_id": this.sessionId,
            "seq": this.seq
        });
    }
    reconnectAttemps = 0;
    reconnect() {
        this.close();
        const delay = Math.min(30000, 1000 * 2 ** this.reconnectAttemps++);
        setTimeout(() => this.connect(), delay);
    }
    send(op, d) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ op, d }));
        }
    }
    close() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.close(1000, "reconnect");
        }
    }
}
