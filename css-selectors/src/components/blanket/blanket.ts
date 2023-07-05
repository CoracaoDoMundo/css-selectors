import { createElement } from '../service-functions';
import blanket from '../../assets/img/blanket.svg';
import { Level } from '../../types/index';
import { LevelsList } from '../levels/config';
import EventEmitter from '../event-emitter';

class Blanket {
  public blanket: HTMLDivElement = document.createElement('div');
  public items: [HTMLDivElement, string][] = [];
  //   private activeTooltip: HTMLDivElement | null = null;
  private emitter: EventEmitter;

  constructor() {
    this.emitter = EventEmitter.getInstance();
  }

  draw(container: HTMLDivElement) {
    this.blanket.classList.add('blanket');
    this.blanket.style.backgroundImage = `url(${blanket})`;
    container.append(this.blanket);
  }

  drawLevelItems(levelNum: number) {
    this.blanket.innerHTML = '';
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
          let nameClass =
            el.class.slice(0, 1).toUpperCase() + el.class.slice(1);
          name = `${el.selector}${nameClass}Img`;
          title = `<${el.selector} class="${el.class}"></${el.selector}>`;
          if (el.attribute) {
            let attrName =
              el.attribute.slice(0, 1).toUpperCase() + el.attribute.slice(1);
            name = `${el.selector}${nameClass}${attrName}Img`;
            title = `<${el.selector} class="${el.class}" attr="${el.attribute}"></${el.selector}>`;
          }
        }
        if (!el.child) {
          const pic: HTMLDivElement = createElement(
            'div',
            [`${name}`, 'img'],
            container
          );
          pic.style.backgroundImage = `url(${el.img})`;
          this.items.push([pic, title]);
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
          this.items.push([pic, title]);
          res(pic, el.child);
        }
      }
    };

    res(this.blanket, LevelsList[levelNum]);

    this.subscribes();
    this.highlightElement();
    this.addTooltipOnElement();
  }

  subscribes() {
    this.emitter.subscribe('levelNumberChanged', () => {
      this.items = [];
    });
    this.emitter.subscribe(
      'levelNumberChanged',
      this.drawLevelItems.bind(this)
    );
    this.emitter.subscribe(
      'highlightElement',
      this.highlightElementFromDom.bind(this)
    );
    this.emitter.subscribe(
      'removeHighlightElement',
      this.removeHighlightElementFromDom.bind(this)
    );
  }

  elementsDisappearance() {
    this.items.map((el) => {
      el[0].classList.add('fly');
    });
  }

  highlightElement() {
    this.items.forEach((item) => {
      item[0].addEventListener('mouseover', (e) => {
        item[0].classList.add('shadow');
        if (e.relatedTarget instanceof HTMLDivElement) {
          e.relatedTarget.classList.remove('shadow');
        }
      });
    });
    this.items.forEach((item) => {
      item[0].addEventListener('mouseout', () => {
        item[0].classList.remove('shadow');
      });
    });
  }

  highlightElementFromDom(elem: HTMLDivElement) {
    const value: string = (elem.getAttribute('tag') ?? '').replace(/ /g, '') + 'Img';
    this.items.forEach((item) => {
      if (item[0].classList.contains(value)) {
        item[0].classList.add('shadow');
      }
    });
  }

  removeHighlightElementFromDom(elem: HTMLDivElement) {
    const value: string = (elem.getAttribute('tag') ?? '').replace(/ /g, '') + 'Img';
    this.items.forEach((item) => {
      if (item[0].classList.contains(value)) {
        item[0].classList.remove('shadow');
      }
    });
  }

  addTooltipOnElement() {
    this.items.forEach((item) => {
      let tooltip: HTMLDivElement;
      let tooltipVisible: boolean = false;

      const showTooltip = (e: MouseEvent) => {
        if (!tooltipVisible) {
          tooltipVisible = true;
          tooltip = createElement('div', ['tooltip'], item[0], item[1]);
          //   this.activeTooltip = tooltip;
        }
      };

      const hideTooltip = (e: MouseEvent) => {
        const relatedTarget = e.relatedTarget as Node;
        if (!relatedTarget || !item[0].contains(relatedTarget)) {
          if (tooltip) {
            item[0].removeChild(tooltip);
            // this.activeTooltip = null;
            tooltipVisible = false;
          }
        }
      };

      item[0].addEventListener('mouseover', showTooltip);
      item[0].addEventListener('mouseout', hideTooltip);
    });
  }
}

export default Blanket;
