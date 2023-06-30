import { createElement } from '../service-functions';
import blanket from '../../assets/img/blanket.svg';
import slates from '../../assets/img/slates.svg';
import ring from '../../assets/img/ring.svg';
import ringRopes from '../../assets/img/ring_ropes.svg';
import levelsList from '../levels/levels.json';
import { Level } from '../../types/index';

class Blanket {
  public blanket: HTMLDivElement = document.createElement('div');

  draw(container: HTMLDivElement) {
    this.blanket.classList.add('blanket');
    this.blanket.style.backgroundImage = `url(${blanket})`;
    container.append(this.blanket);
  }

  drawLevelItems(levelNum: number) {
    const img: HTMLDivElement = createElement('div', ['blanketPic'], this.blanket);
    img.style.backgroundImage = `url(${slates})`;
    // const img2: HTMLDivElement = createElement('div', ['img'], this.blanket);
    // img2.style.backgroundImage = `url(${slates})`;
    let res = (container: HTMLDivElement, levelPack: Level[]) => {
      console.log(levelPack);
      for (let el of levelPack) {
        if (!el.child) {
          console.log('el1:', el);
          const pic: HTMLDivElement = createElement(
            'div',
            ['blanketPic'],
            container
          );
          pic.style.backgroundImage = `url(${el.img})`;
        } else if (el.child && el.img === 'blanket') {
          console.log('el2:', el);
          return res(container, el.child);
        } else {
          console.log('el3:', el);
          const pic: HTMLDivElement = createElement(
            'div',
            ['blanketPic'],
            container
          );
          console.log('el.selector:', el.selector);
          pic.style.backgroundImage = `url(${el.img})`; 
          return res(pic, el.child);
        }
      }
    };
    res(this.blanket, levelsList[levelNum]);
  }
}

export default Blanket;
