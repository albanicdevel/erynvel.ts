export interface User {
    id: string;
    username: string;
    bot?: boolean;
}

export interface ReadyEvent {
    v: number;
    user: User;
    session_id: string;
}

export interface MessageCreateEvent {
    id: string;
    channel_id: string;
    content: string;
    author: User;
}

export interface DispatchEvents {
    READY: ReadyEvent;
    MESSAGE_CREATE: MessageCreateEvent;
}
