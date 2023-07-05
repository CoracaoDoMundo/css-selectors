import { Event } from '../types/index';

class EventEmitter {

  private static instance: EventEmitter;
  public events: Event = {};

  private constructor() {}

  public static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  }

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
  emit(eventName: string, args?: number | HTMLDivElement) {
    if (this.events[eventName] !== undefined) {
      this.events[eventName].forEach((func) => func.call(null, args));
    }
  }
}

export default EventEmitter;
