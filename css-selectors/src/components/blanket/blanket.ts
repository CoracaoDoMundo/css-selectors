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
        let name = `${el.selector}Img`;
        if (el.id) {
          let nameId = el.id.slice(0, 1).toUpperCase() + el.id.slice(1);
          name = `${el.selector}${nameId}Img`;
        }
        if (!el.child) {
          const pic: HTMLDivElement = createElement(
            'div',
            [`${name}`, 'img'],
            container
          );
          pic.style.backgroundImage = `url(${el.img})`;
          if (el.target) {
            pic.classList.add('targetItem');
          }
        } else if (el.child && el.class === 'blanket') {
          res(container, el.child);
        } else {
          const pic: HTMLDivElement = createElement(
            'div',
            [`${name}`, 'img'],
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
