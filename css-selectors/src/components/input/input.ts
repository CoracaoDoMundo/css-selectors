import { createElement } from '../service-functions';
import EventEmitter from '../event-emitter';
import Levels from '../levels/levels';
import { RightAnswersList } from '../input/config';

class Input {
  public input: HTMLInputElement = document.createElement('input');
  public enterBtn: HTMLDivElement = document.createElement('div');
  public levels: Levels;
  private emitter: EventEmitter;
  private res: boolean;

  constructor(levels: Levels) {
    this.levels = levels;
    this.emitter = EventEmitter.getInstance();
    this.res = false;
  }

  draw(container: HTMLDivElement, field: HTMLDivElement): void {
    this.input.classList.add('input');
    this.input.setAttribute('placeholder', 'Type in a CSS selector');
    container.append(this.input);
    this.enterBtn.classList.add('btn');
    container.append(this.enterBtn);
    const enterText: HTMLDivElement = createElement(
      'span',
      ['btnText'],
      this.enterBtn,
      'Enter'
    );
    this.input.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        this.resultAnnouncement(field);
      }
    });

    this.emitter.subscribe('levelNumberChanged', this.checkOfAnswer.bind(this));

    this.enterBtn.addEventListener('click', () =>
      this.resultAnnouncement(field)
    );
  }

  checkOfAnswer(): boolean {
    const res = RightAnswersList[this.levels.activeLevel].filter(
      (el) => el === this.input.value
    );
    if (res.length === 1) {
      this.res = true;
    }
    return this.res;
  }

  resultAnnouncement(field: HTMLDivElement) {
    this.checkOfAnswer();
    if (this.res === true) {
      if (this.levels.activeLevel < 9) {
        this.input.value = '';
        this.levels.activeLevel += 1;
        this.emitter.emit('levelNumberChanged', this.levels.activeLevel);
      } else if (this.levels.activeLevel === 9) {
        alert('Полная победа!');
      }
    } else {
      field.classList.add('wrongAnswer');
      setTimeout(() => field.classList.remove('wrongAnswer'), 3000);
    }
  }
}

export default Input;
