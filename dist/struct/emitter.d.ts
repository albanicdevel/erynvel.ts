type Listener = (data: any) => void;
export declare class Emitter {
    private events;
    on(event: string, fn: Listener): void;
    once(event: string, fn: (d: unknown) => void): void;
    waitFor(event: string, filter?: (d: unknown) => boolean): Promise<unknown>;
    off(event: string, fn: unknown): void;
    emit(event: string, data: any): void;
}
export {};
