const API = "https://discord.com/api/v10";
/**
 * Rest-api for making requests to IP-HTTP Discord
 */
export class Rest {
    token;
    /**
     * Rest is needed to send requests to Discord, right? And I don't know
     * @param token it is necessary to somehow authorize with each request, so we accept the token
     */
    constructor(token) {
        this.token = token;
    }
    /**
     * Sending a request directly to version 10 of the discord api, like doing dirty things with channels or whatever we intend to do
     * @param method POST, GET, PUT, etc
     * @param path The path to the desired api center
     * @param body Options (optional)
     */
    async request(method, path, body) {
        const res = await fetch(API + path, {
            method,
            headers: {
                "Authorization": `Bot ${this.token}`,
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : undefined
        });
        if (!res.ok)
            throw new Error(`${res.status} = ${res.text}`);
        if (res.status === 204)
            return null;
        return res.json();
    }
    /**
     * get "something"
     * @param path The path to the desired api center
     */
    get(path) {
        this.request("GET", path);
    }
    /**
     * put "something"
     * @param path The path to the desired api center
     */
    post(path) {
        this.request("POST", path);
    }
}
