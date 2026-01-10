/**
 * Rest-api for making requests to IP-HTTP Discord
 */
export declare class Rest {
    private token;
    /**
     * Rest is needed to send requests to Discord, right? And I don't know
     * @param token it is necessary to somehow authorize with each request, so we accept the token
     */
    constructor(token: string);
    /**
     * Sending a request directly to version 10 of the discord api, like doing dirty things with channels or whatever we intend to do
     * @param method POST, GET, PUT, etc
     * @param path The path to the desired api center
     * @param body Options (optional)
     */
    request(method: string, path: string, body?: unknown): Promise<unknown>;
    /**
     * get "something"
     * @param path The path to the desired api center
     */
    get(path: string): void;
    /**
     * put "something"
     * @param path The path to the desired api center
     */
    post(path: string): void;
}
