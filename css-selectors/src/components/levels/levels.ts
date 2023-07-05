import { createElement } from '../service-functions';
import { levelNames } from '../../types/index';
import EventEmitter from '../event-emitter';

class Levels {
  public levelsBlock: HTMLDivElement = document.createElement('div');
  public activeLevel: number;
  public levelItems: HTMLDivElement[] = [];
  public levelMarks: HTMLDivElement[] = [];
  private emitter: EventEmitter;
  public resetBtn: HTMLDivElement;
  public helpBtn: HTMLDivElement;

  constructor() {
    this.emitter = EventEmitter.getInstance();
    this.resetBtn = document.createElement('div');
    this.helpBtn = document.createElement('div');
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

    this.resetBtn.classList.add('btn', 'btnLevelsBlock');
    levelsBlock.append(this.resetBtn);
    const enterText: HTMLDivElement = createElement(
      'span',
      ['btnText'],
      this.resetBtn,
      'Reset'
    );

    this.resetBtn.addEventListener('click', () => {
      this.levelMarks.map((el) => el.innerHTML = '');
      this.emitter.emit('resetGame');
    });

    this.helpBtn.classList.add('btn', 'btnLevelsBlock');
    levelsBlock.append(this.helpBtn);
    const helpText: HTMLDivElement = createElement(
      'span',
      ['btnText'],
      this.helpBtn,
      'Help'
    );

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

  createCheckMark(): SVGSVGElement {
    const mark: SVGSVGElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    mark.setAttribute('viewBox', '0 0 1920 1920');
    mark.setAttribute('fill', '#96d35f');
    mark.classList.add('mark');
    const container: SVGGraphicsElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    container.setAttribute('id', 'SVGRepo_bgCarrier');
    container.setAttribute('stroke-width', '0');
    const secondContainer: SVGGraphicsElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    secondContainer.setAttribute('id', 'SVGRepo_bgCarrier');
    const path: SVGPathElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    path.setAttribute(
      'd',
      'M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z'
    );
    path.setAttribute('fill-rule', 'evenodd');
    secondContainer.append(path);
    mark.append(container);
    mark.append(secondContainer);

    return mark;
  }
}

export default Levels;
