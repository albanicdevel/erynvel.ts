export class Emitter {
    events = new Map();
    on(event, fn) {
        const list = this.events.get(event) ?? [];
        list.push(fn);
        this.events.set(event, list);
    }
    once(event, fn) {
        const wrapper = (data) => {
            fn(data);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
    waitFor(event, filter) {
        return new Promise(resolve => {
            const fn = (data) => {
                if (!filter || filter(data)) {
                    this.off(event, fn);
                    resolve(data);
                }
            };
            this.on(event, fn);
        });
    }
    off(event, fn) {
        const list = this.events.get(event);
        if (!list)
            return;
        this.events.set(event, list.filter(l => l !== fn));
    }
    emit(event, data) {
        const list = this.events.get(event);
        if (!list)
            return;
        for (const fn of list)
            fn(data);
    }
}
