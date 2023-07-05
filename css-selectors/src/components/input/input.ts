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
  private solved: number;
  private hint: boolean;

  constructor(levels: Levels, blanket: Blanket) {
    this.levels = levels;
    this.emitter = EventEmitter.getInstance();
    this.res = false;
    this.blanket = blanket;
    this.solved = 0;
    this.hint = false;
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
    this.emitter.subscribe('levelNumberChanged', () => {
      this.input.value = '';
    });
    this.emitter.subscribe('resetGame', this.resetProgress.bind(this));
    this.emitter.subscribe('giveHint', this.outputHint.bind(this));

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

  resultAnnouncement(field: HTMLDivElement): void {
    this.checkOfAnswer();
    if (this.res === true) {
      this.solved += 1;
      this.blanket.elementsDisappearance();
      this.input.value = '';
      if (
        this.levels.levelMarks[this.levels.activeLevel].childNodes.length === 0 && this.hint === false
      ) {
        this.levels.levelMarks[this.levels.activeLevel].append(
          this.levels.createCheckMark('#96d35f')
        );
      } else if (this.levels.levelMarks[this.levels.activeLevel].childNodes.length === 0 && this.hint === true) {
        this.levels.levelMarks[this.levels.activeLevel].append(this.levels.createCheckMark('#ff0000'));
        this.hint = false;
      }
      setTimeout(() => {
        this.blanket.blanket.innerHTML = '';
        if (this.solved === 10) {
          alert('Congrats! You made it till the very end!');
          this.levels.activeLevel = 0;
        } else if (this.levels.activeLevel < 9) {
          this.levels.activeLevel += 1;
        } else if (this.levels.activeLevel === 9) {
          this.levels.activeLevel = 0;
        }
        this.emitter.emit('levelNumberChanged', this.levels.activeLevel);
      }, 300);
      this.res = false;
    } else {
      field.classList.add('wrongAnswer');
      setTimeout(() => field.classList.remove('wrongAnswer'), 3000);
    }
  }

  resetProgress(): void {
    this.solved = 0;
    this.levels.activeLevel = 0;
    this.emitter.emit('levelNumberChanged', this.levels.activeLevel);
  }

  outputHint() {
    this.hint = true;
    const answer: string[] =
      RightAnswersList[this.levels.activeLevel][0].split('');
    let i: number = 0;
    const show = () => {
      this.input.value += answer[i];
      if (i < answer.length - 1) {
        i += 1;
        setTimeout(() => show(), 300);
      } else {
        this.input.setAttribute('value', this.input.value);
      }
    };
    setTimeout(() => show(), 300);
  }
}

export default Input;
