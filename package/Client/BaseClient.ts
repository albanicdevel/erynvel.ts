import { WebSocket as WS, RawData } from "ws";
import { pino as pino, Logger } from "pino"
import { IncomingGatewayPayload } from "../types/basic";

export class BaseClient {
    public token: string;
    public api: WS;
    public logger: Logger;

    private heartbeatInterval?: NodeJS.Timeout;
    private lastSequence?: number | null;

    constructor(token: string) {
        this.token = token;
        this.logger = pino({
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true
                }
            }
        });
        this.api = new WS("wss://gateway.discord.gg/?v=10&encoding=json");

        this.api.on("open", () => {
            this.logger.info("[api]: gateway opened!");
        });
    }

    public login() {
        // We connect to the gateway and create the corresponding constants
        this.api.on("message", (data: RawData) => {
            const payload = JSON.parse(data.toString()) as IncomingGatewayPayload;
            const { d, op, t, s} = payload;
            if(s !== null) this.lastSequence = s;
            
        });
    }
}