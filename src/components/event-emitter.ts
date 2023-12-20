import {
  CallbackEvent,
  Cb,
  CbCheckOfAnswer,
  CbDrawOrChangeLevel,
  CbFillViewerField,
  CbHighlightOrRemoveLinkedElement,
} from "../types/index";

class EventEmitter {
  private static instance: EventEmitter;

  public events: CallbackEvent = {};

  public static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  }

  public subscribe(
    eventName: string,
    cb:
      | Cb
      | CbDrawOrChangeLevel
      | CbHighlightOrRemoveLinkedElement
      | CbFillViewerField
      | CbCheckOfAnswer
  ): void {
    if (this.events[eventName] === undefined) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(cb);
  }

  public unsubscribe(
    eventName: string,
    cb:
      | Cb
      | CbDrawOrChangeLevel
      | CbHighlightOrRemoveLinkedElement
      | CbFillViewerField
      | CbCheckOfAnswer
  ): void {
    this.events[eventName] = this.events[eventName].filter(
      (func) => cb !== func
    );
  }

  public emit(
    eventName: string,
    args?: number | HTMLDivElement | string
  ): void {
    if (this.events[eventName] !== undefined) {
      this.events[eventName].forEach((func) => {
        // console.log("func:", func);
        // console.log("args:", args);
        // func.call(null, args);
        //@ts-ignore
        func(args);
      });
    }
  }
}

export default EventEmitter;
