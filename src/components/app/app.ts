import "./app.css";
import AppLayout from "./app-layout";
import EventEmitter from "../event-emitter";

class App {
  private layout: AppLayout;

  private emitter: EventEmitter;

  constructor() {
    this.layout = new AppLayout();
    this.emitter = EventEmitter.getInstance();
  }

  public start(): void {
    this.layout.draw();
  }
}

export default App;
