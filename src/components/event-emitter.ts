import { Event, Cb } from "../types/index";

class EventEmitter {
  private static instance: EventEmitter;

  private eventHandlers: Map<string, Cb[]>;

  constructor() {
    this.eventHandlers = new Map();
  }

  public static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  }

  public subscribe(
    eventName: string,
    eventHandler: (event: Event) => void
  ): void {
    const existingHandlers = this.eventHandlers.get(eventName) || [];
    this.eventHandlers.set(eventName, [...existingHandlers, eventHandler]);
  }

  public unsubscribeForEvent(eventName: string): void {
    this.eventHandlers.delete(eventName);
  }

  public emit(event: Event): void {
    const handlersToCall = this.eventHandlers.get(event.name);
    if (handlersToCall) {
      handlersToCall.forEach((handler) => handler(event));
    }
  }
}

export default EventEmitter;
