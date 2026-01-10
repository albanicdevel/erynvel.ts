import { Gateway } from "../gateway/ws";
export declare class Client {
    private token;
    private intents;
    private rest;
    gateway: Gateway;
    constructor(token: string, intents: number);
    login(): void;
}
