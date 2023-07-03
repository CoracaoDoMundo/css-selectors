import { createElement } from '../service-functions';
import EventEmitter from '../event-emitter';
import { RightAnswersList } from '../input/config';

class Input {
  public input: HTMLInputElement = document.createElement('input');
  public enterBtn: HTMLDivElement = document.createElement('div');

  draw(
    container: HTMLDivElement,
    emitter: EventEmitter,
    activeLevel: number,
    field: HTMLDivElement
  ): void {
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
    this.input.addEventListener('input', () => {
      this.checkOfAnswer(this.enterBtn, activeLevel);
    });
  }

  addListener(
    enterBtn: HTMLDivElement,
    activeLevel: number,
    field: HTMLDivElement
  ) {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Enter') {
        this.resultAnnouncement(enterBtn, activeLevel, field);
      }
    });
  }

  checkOfAnswer(enterBtn: HTMLDivElement, activeLevel: number): boolean {
    const res = RightAnswersList[activeLevel].filter(
      (el) => el === this.input.value
    );
    if (res.length === 1) {
      return true;
    }
    return false;
  }

  resultAnnouncement(
    enterBtn: HTMLDivElement,
    activeLevel: number,
    field: HTMLDivElement
  ) {
    const res = this.checkOfAnswer(enterBtn, activeLevel);
    if (res === true) {
      alert('Победа!');
    } else {
      field.classList.add('wrongAnswer');
    }
  }
}

export default Input;
