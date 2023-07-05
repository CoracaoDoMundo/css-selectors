import { createElement } from '../service-functions';
import { levelNames } from '../../types/index';
import EventEmitter from '../event-emitter';

class Levels {
  public levelsBlock: HTMLDivElement = document.createElement('div');
  public activeLevel: number;
  public levelItems: HTMLDivElement[] = [];
  public levelMarks: HTMLDivElement[] = [];
  private emitter: EventEmitter;

  constructor() {
    this.emitter = EventEmitter.getInstance();
    if (
      localStorage.getItem('coracaoLevel') === null ||
      localStorage.getItem('coracaoLevel') === undefined
    ) {
      this.activeLevel = 0;
    } else {
      this.activeLevel = Number(localStorage.getItem('coracaoLevel'));
    }
  }

  drawLevelsBlock(levelsBlock: HTMLDivElement): void {
    const levelsHeader: HTMLHeadingElement = createElement(
      'h1',
      ['levelHeader'],
      levelsBlock,
      'Levels:'
    );

    if (
      Number(localStorage.getItem('coracaoLevel')) > 0 &&
      Number(localStorage.getItem('coracaoLevel')) < 11
    ) {
      this.activeLevel = Number(localStorage.getItem('coracaoLevel'));
    }
    for (let i = 0; i < 10; i += 1) {
      const levelItemBlock: HTMLDivElement = createElement(
        'div',
        ['levelItemBlock'],
        this.levelsBlock
      );
      this.levelItems.push(levelItemBlock);
      const levelMark: HTMLDivElement = createElement(
        'div',
        ['levelMark', `level_${i + 1}`],
        levelItemBlock
      );
      this.levelMarks.push(levelMark);
      const lineNum: HTMLSpanElement = createElement(
        'span',
        ['listItem'],
        levelItemBlock,
        `${i + 1}.  ${levelNames[i + 1]}`
      );
      if (i === this.activeLevel) {
        levelItemBlock.classList.add('activeListItem');
      }
    }
    this.levelsBlock.classList.add('levelsList');
    levelsBlock.append(this.levelsBlock);
    this.addListenerOnLevelsList();
    this.emitter.subscribe('levelNumberChanged', this.changeLevel.bind(this));
    this.emitter.subscribe(
      'levelNumberChanged',
      this.setLocalStorage.bind(this)
    );
  }

  addListenerOnLevelsList() {
    this.levelItems.map((el, i) => {
      el.addEventListener('click', () => {
        this.levelItems.map((item) => item.classList.remove('activeListItem'));
        el.classList.add('activeListItem');
        this.activeLevel = i;
        this.emitter.emit('levelNumberChanged', this.activeLevel);
      });
    });
  }

  changeLevel(activeLevel: number) {
    this.levelItems.map((item) => item.classList.remove('activeListItem'));
    this.levelItems[activeLevel].classList.add('activeListItem');
  }

  setLocalStorage() {
    localStorage.setItem('coracaoLevel', this.activeLevel.toString(10));
  }
}

export default Levels;
