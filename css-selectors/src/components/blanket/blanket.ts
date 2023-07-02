import { createElement } from '../service-functions';
import blanket from '../../assets/img/blanket.svg';
import { Level } from '../../types/index';
import { LevelsList } from '../levels/config';

class Blanket {
  public blanket: HTMLDivElement = document.createElement('div');
  public items: HTMLDivElement[] = [];

  draw(container: HTMLDivElement) {
    this.blanket.classList.add('blanket');
    this.blanket.style.backgroundImage = `url(${blanket})`;
    container.append(this.blanket);
  }

  drawLevelItems(levelNum: number) {
    let res = (container: HTMLDivElement, levelPack: Level[]) => {
      for (let el of levelPack) {
        let name = `${el.selector}Img`;
        let title = `<${el.selector}></${el.selector}>`;
        if (el.id) {
          let nameId = el.id.slice(0, 1).toUpperCase() + el.id.slice(1);
          name = `${el.selector}${nameId}Img`;
          title = `<${el.selector} id="${el.id}"></${el.selector}>`;
        }
        if (el.class) {
          title = `<${el.selector} class="${el.class}"></${el.selector}>`;
        }
        if (!el.child) {
          const pic: HTMLDivElement = createElement(
            'div',
            [`${name}`, 'img'],
            container
          );
          this.items.push(pic);
          pic.style.backgroundImage = `url(${el.img})`;
          pic.title = title;
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
          this.items.push(pic);
          pic.style.backgroundImage = `url(${el.img})`;
          pic.title = title;
          res(pic, el.child);
        }
      }
    };
    res(this.blanket, LevelsList[levelNum]);
    this.highlightElement();
  }

  highlightElement() {
    this.items.forEach((item) => {
      item.addEventListener('mouseover', (e) => {
        item.classList.add('shadow');
        if (e.relatedTarget instanceof HTMLDivElement) {
          e.relatedTarget.classList.remove('shadow');
        }
      });
    });
    this.items.forEach((item) => {
      item.addEventListener('mouseout', () => {
        item.classList.remove('shadow');
      });
    });
  }
}

export default Blanket;
