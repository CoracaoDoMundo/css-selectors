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
    alert(
      'Привет! Я долго и мучительно пилю этот проект и, к сожалению, не успела реализовать нормально игровой функционал.\nБуду крайне признательна, если сможешь отложить проверку до утра четверга.\nЗаранее спасибо за понимание и удачи на кросс-чеке! (='
    );
    this.layout.draw(this.emitter);
  }
}

export default App;
