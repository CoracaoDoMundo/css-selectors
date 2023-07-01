import { createElement } from '../service-functions';
import blanket from '../../assets/img/blanket.svg';
import { Level } from '../../types/index';
import { LevelsList } from '../levels/config';

class Blanket {
  public blanket: HTMLDivElement = document.createElement('div');

  draw(container: HTMLDivElement) {
    this.blanket.classList.add('blanket');
    this.blanket.style.backgroundImage = `url(${blanket})`;
    container.append(this.blanket);
  }

  drawLevelItems(levelNum: number) {
    let res = (container: HTMLDivElement, levelPack: Level[]) => {
      for (let el of levelPack) {
        if (!el.child) {
          const pic: HTMLDivElement = createElement(
            'div',
            ['blanketPic'],
            container
          );
          pic.style.backgroundImage = `url(${el.img})`;
        } else if (el.child && el.class === 'blanket') {
          return res(container, el.child);
        } else {
          const pic: HTMLDivElement = createElement(
            'div',
            ['blanketPic'],
            container
          );
          pic.style.backgroundImage = `url(${el.img})`; 
          res(pic, el.child);
        }
      }
    };
    res(this.blanket, LevelsList[levelNum]);
  }
}

export default Blanket;
