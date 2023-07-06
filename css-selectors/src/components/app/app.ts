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
    // alert('Привет! Я реализовала большую часть функционала, но есть еще пара моментов, которые хотела бы доделать. Если сможешь проверить работу во второй половине дня в четверг, буду невероятно признательна.\nЗаранее спасибо за понимание и удачи на кросс-чеке! (=')
    this.layout.draw();
  }
}

export default App;
