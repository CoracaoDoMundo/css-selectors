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
    // console.log(
    //   "EVENT NAME:",
    //   eventName
    //   "HANDLERS QUANTITY:",
    //   this.eventHandlers.get(eventName)!.length
    // );
    // console.log("added handler:", eventHandler);
    // console.log("the handlers:", this.eventHandlers.get(eventName));
  }

  // public unsubscribe(
  //   eventName: string,
  //   eventHandler: (event: Event) => void
  // ): void {
  //   this.eventHandlers.delete(eventHandler.name);
  // }

  public unsubscribeForEvent(eventName: string): void {
    this.eventHandlers.delete(eventName);
  }

  public emit(event: Event): void {
    const newStartLetter = event.constructor.name.split("")[0].toLowerCase();
    const eventName = event.constructor.name
      .split("")
      .map((char, index) => (index === 0 ? newStartLetter : char))
      .join("");
    const handlersToCall = this.eventHandlers.get(eventName);
    // console.log("EVENT NAME:", eventName, "HANDLERS:", handlersToCall);
    if (handlersToCall) {
      handlersToCall.forEach((handler) => handler(event));
    }
  }
}

export default EventEmitter;
