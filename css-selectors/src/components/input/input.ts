import { createElement } from '../service-functions';
import EventEmitter from '../event-emitter';
import Levels from '../levels/levels';
import Blanket from '../../components/blanket/blanket';
import { RightAnswersList } from '../input/config';

class Input {
  public input: HTMLInputElement = document.createElement('input');
  public enterBtn: HTMLDivElement = document.createElement('div');
  public levels: Levels;
  private emitter: EventEmitter;
  private res: boolean;
  private blanket: Blanket;

  constructor(levels: Levels, blanket: Blanket) {
    this.levels = levels;
    this.emitter = EventEmitter.getInstance();
    this.res = false;
    this.blanket = blanket;
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
      this.blanket.elementsDisappearance();
      this.input.value = '';
      setTimeout(() => {
        this.blanket.blanket.innerHTML = '';
        if (this.levels.activeLevel < 9) {
          this.levels.activeLevel += 1;
        } else if (this.levels.activeLevel === 9) {
          alert('Congrats! You made it till the very end!');
          this.levels.activeLevel = 0;
        }
        this.emitter.emit('levelNumberChanged', this.levels.activeLevel);
      }, 300);
    } else {
      field.classList.add('wrongAnswer');
      setTimeout(() => field.classList.remove('wrongAnswer'), 3000);
    }
  }
}

export default Input;
