import './app.css';
import AppLayout from './app-layout';
import EventEmitter from '../event-emitter';

class App {
  private layout: AppLayout;
  private emitter: EventEmitter;

  constructor() {
    this.layout = new AppLayout();
    this.emitter = EventEmitter.getInstance();
  }

  start() {
    // alert('Привет! Я долго и мучительно пилю этот проект и, к сожалению, не успела реализовать нормально игровой функционал. Буду крайне признательна, если сможешь отложить проверку до утра четверга. Заранее спасибо за понимание и удачи на кросс-чеке! (=')
    this.layout.draw();
  }
}

export default App;
