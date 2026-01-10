import { Gateway } from "../gateway/ws";
import { Rest } from "../rest/rest"

export class Client {
    private rest: Rest;
    gateway: Gateway;
    constructor(private token: string, private intents: number) {
        this.rest = new Rest(token);
        this.gateway = new Gateway(this.token, this.intents);
    }

    public login() {
        this.gateway.connect();
    }
}