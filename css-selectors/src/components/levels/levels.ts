import { createElement } from '../service-functions';
import { levelNames } from '../../types/index';

class Levels {
    public levelsBlock: HTMLDivElement = document.createElement('div');
    public activeLevel: number = 3;
    public levelItems: HTMLDivElement[] = [];
    public levelMarks: HTMLDivElement[] = [];

    drawLevelsBlock(levelsBlock: HTMLDivElement): void {
        const levelsHeader: HTMLHeadingElement = createElement('h1', ['levelHeader'], levelsBlock, 'Levels:');

        if (Number(localStorage.getItem('coracaoLevel')) > 0 && Number(localStorage.getItem('coracaoLevel')) < 11) {
            this.activeLevel = Number(localStorage.getItem('coracaoLevel'));
        }
        for (let i = 0; i < 10; i += 1) {
          const levelItemBlock: HTMLDivElement = createElement('div', ['levelItemBlock'], this.levelsBlock);
          this.levelItems.push(levelItemBlock);
          const levelMark: HTMLDivElement = createElement('div', ['levelMark',`level_${i + 1}`], levelItemBlock);
          this.levelMarks.push(levelMark);
          const lineNum: HTMLSpanElement = createElement('span', ['listItem'], levelItemBlock, `${i + 1}.  ${levelNames[i + 1]}`);
          if (i === this.activeLevel) {
            levelItemBlock.classList.add('activeListItem');
          }
        }
        this.levelsBlock.classList.add('levelsList');
        levelsBlock.append(this.levelsBlock);
      }
}

export default Levels;