import './app.css';
import AppLayout from './app-layout';

class App {
  private layout: AppLayout;

  constructor() {
    this.layout = new AppLayout();
  }

  start() {
    this.layout.draw();
  }
}

export default App;
