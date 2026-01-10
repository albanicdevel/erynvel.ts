/**
 * opening a gateway from our host to Discord, sending it a payload see https://discord.com/developers/docs/events/gateway#gateway
 */
export declare class Gateway {
    private token;
    private intents;
    private ws;
    private seq;
    private timer;
    private lastAck;
    private sessionId;
    /**
     *
     * @param token Authorization token
     * @param intents Intents https://discord.com/developers/docs/events/gateway#gateway-intents
     */
    constructor(token: string, intents: number);
    /**
     * attempting to establish a connection to the gateway
     */
    connect(): void;
    private onMessage;
    private sendHeartbeat;
    private lastIdentify;
    private identify;
    private resume;
    private reconnectAttemps;
    private reconnect;
    private send;
    private close;
}
