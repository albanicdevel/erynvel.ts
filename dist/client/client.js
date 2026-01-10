import { Gateway } from "../gateway/ws";
import { Rest } from "../rest/rest";
export class Client {
    token;
    intents;
    rest;
    gateway;
    constructor(token, intents) {
        this.token = token;
        this.intents = intents;
        this.rest = new Rest(token);
        this.gateway = new Gateway(this.token, this.intents);
    }
    login() {
        this.gateway.connect();
    }
}
