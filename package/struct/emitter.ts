type Listener = (data: any) => void;

export class Emitter {
  private events = new Map<string, Listener[]>();

  on(event: string, fn: Listener) {
    const list = this.events.get(event) ?? [];
    list.push(fn);
    this.events.set(event, list);
  }

  once(event: string, fn: (d: unknown) => void) {
    const wrapper = (data: unknown) => {
      fn(data);
      this.off(event, wrapper);
    }
    this.on(event, wrapper);
  }

  waitFor(event: string, filter?: (d: unknown) => boolean): Promise<unknown> {
    return new Promise(resolve => {
      const fn = (data: unknown) => {
        if(!filter || filter(data)) {
          this.off(event, fn);
          resolve(data)
        }
      }
      this.on(event, fn);
    });
  }

  off(event: string, fn: unknown) {
    const list = this.events.get(event);
    if (!list) return;
    this.events.set(event, list.filter(l => l !== fn));
  }

  emit(event: string, data: any) {
    const list = this.events.get(event);
    if (!list) return;
    for (const fn of list) fn(data);
  }
}
