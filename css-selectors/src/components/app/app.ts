import './app.css';
import AppLayout from './app-layout';
import EventEmitter from '../event-emitter';

class App {
  private layout: AppLayout;
  public emitter: EventEmitter;

  constructor() {
    this.layout = new AppLayout();
    this.emitter = new EventEmitter();
  }

  start() {
    this.layout.draw(this.emitter);
  }
}

export default App;
