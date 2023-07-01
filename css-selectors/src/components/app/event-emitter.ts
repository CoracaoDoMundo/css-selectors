import { Event } from '../../types/index';

class EventEmitter {
  public events: Event = {};

  subscribe(eventName: string, cb: Function) {
    if (this.events[eventName] === undefined) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(cb);
  }
  unsubscribe(eventName: string, cb: Function) {
    this.events[eventName] = this.events[eventName].filter(
      (func) => cb !== func
    );
  }
  emit(eventName: string, args: number) {
    if (this.events[eventName] !== undefined) {
      this.events[eventName].forEach((func) => func.call(null, args));
    }
  }
}

export default EventEmitter;
