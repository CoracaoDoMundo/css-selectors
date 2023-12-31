import { createElement } from '../service-functions';
import { LevelsList } from '../levels/config';
import { Level } from '../../types/index';
import EventEmitter from '../event-emitter';
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

class Viewer {
  public viewer: HTMLDivElement = document.createElement('div');
  public preBlock: HTMLPreElement = document.createElement('pre');
  public elements: HTMLDivElement[] = [];
  public elemSet: HTMLDivElement[] = [];
  private emitter: EventEmitter;

  constructor() {
    this.emitter = EventEmitter.getInstance();
  }

  draw(container: HTMLDivElement, activeLevel: number): void {
    this.viewer.classList.add('codeViewerBlock');
    container.append(this.viewer);
    this.preBlock.classList.add('codeTextContainer');
    this.viewer.append(this.preBlock);
    this.highlightElement();
    this.fillViewerField(activeLevel);
    this.emitter.subscribe('levelNumberChanged', () => {
      this.elements = [];
      this.elemSet = [];
    });
    this.emitter.subscribe(
      'levelNumberChanged',
      this.fillViewerField.bind(this)
    );
  }

  fillViewerField(activeLevel: number): void {
    this.preBlock.innerHTML = '';
    let randomArr: string[] = [];
    let res = (
      container: HTMLPreElement | HTMLDivElement,
      element: Level[]
    ) => {
      for (let el of element) {
        let elemName = `${el.selector}`;
        let tag = `${el.selector}`;
        if (el.class) {
          const className = `class="${el.class}"`;
          elemName += ` ${className}`;
          let nameClass =
            el.class.slice(0, 1).toUpperCase() + el.class.slice(1);
          tag += ` ${nameClass}`;
        }
        if (el.attribute) {
          const attr = `attr="${el.attribute}"`;
          elemName += attr;
          let attrName =
            el.attribute.slice(0, 1).toUpperCase() + el.attribute.slice(1);
          tag += ` ${attrName}`;
        }
        if (el.id) {
          const idName = ` id="${el.id}"`;
          elemName += idName;
          let nameId = el.id.slice(0, 1).toUpperCase() + el.id.slice(1);
          tag += `${nameId}`;
        }
        if (!el.child) {
          const elem: HTMLDivElement = createElement(
            'div',
            ['codeViewerText'],
            container,
            `<${elemName} />`
          );
          elem.setAttribute('tag', tag);
          this.elements.push(elem);
          this.elemSet.push(elem);
          elem.style.paddingLeft = `${el.nesting}rem`;
          hljs.highlightBlock(elem);
        } else {
          let random = Math.floor(Math.random() * 100).toString();
          if (randomArr.includes(random)) {
            random = Math.floor(Math.random() * 100).toString();
          } else {
            randomArr.push(random);
          }
          const elemStart: HTMLDivElement = createElement(
            'div',
            ['codeViewerText'],
            container,
            `<${elemName}>`
          );
          elemStart.setAttribute('tag', tag);
          elemStart.setAttribute('link', random);
          this.elements.push(elemStart);
          this.elemSet.push(elemStart);
          const elemChild: HTMLDivElement = createElement(
            'div',
            ['childrenContainer'],
            container
          );
          const elemEnd: HTMLDivElement = createElement(
            'div',
            ['codeViewerText'],
            container,
            `</${el.selector}>`
          );
          elemEnd.setAttribute('tag', tag);
          elemEnd.setAttribute('link', random);
          this.elements.push(elemEnd);
          elemStart.style.paddingLeft = `${el.nesting}rem`;
          elemEnd.style.paddingLeft = `${el.nesting}rem`;
          hljs.highlightBlock(elemStart);
          hljs.highlightBlock(elemEnd);
          res(elemChild, el.child);
        }
        randomArr = [];
      }
    };
    res(this.preBlock, LevelsList[activeLevel]);
    this.highlightElement();
    this.highlightLinkedElement();
    this.removeHighlightLinkedElement();
    this.emitter.subscribe(
      'highlightElementInViewer',
      this.highlightElementFromBlanketHover.bind(this)
    );
    this.emitter.subscribe('removeHighlightElementFromViewer', this.removeHighlightElementFromBlanketHover.bind(this));
  }

  personalizeElemSet() {
    this.elemSet = this.elemSet.splice(1);
    this.elemSet.map((el, i) => el.setAttribute('item', `${i}`));
  }

  highlightElement() {
    this.elements.forEach((item) => {
      item.addEventListener('mouseover', () => {
        if (item.getAttribute('tag') !== 'div Blanket') {
          this.emitter.emit('highlightElement', item);
          item.classList.add('highlight');
          this.elements.forEach((elem) => {
            if (
              item.getAttribute('link') !== null &&
              item.getAttribute('link') === elem.getAttribute('link')
            ) {
              elem.classList.add('highlight');
            }
            if (
              item.nextSibling instanceof HTMLDivElement &&
              item.nextSibling.classList.contains('childrenContainer')
            ) {
              item.nextSibling.classList.add('highlight');
            }
            if (
              item.previousSibling instanceof HTMLDivElement &&
              item.previousSibling.classList.contains('childrenContainer')
            ) {
              item.previousSibling.classList.add('highlight');
            }
          });
        }
      });
    });
    this.elements.forEach((item) => {
      item.addEventListener('mouseout', () => {
        this.emitter.emit('removeHighlightElement', item);
        item.classList.remove('highlight');
        this.elements.forEach((elem) => {
          if (
            item.getAttribute('link') !== null &&
            item.getAttribute('link') === elem.getAttribute('link')
          ) {
            elem.classList.remove('highlight');
          }
          if (
            item.nextSibling instanceof HTMLDivElement &&
            item.nextSibling.classList.contains('childrenContainer')
          ) {
            item.nextSibling.classList.remove('highlight');
          }
          if (
            item.previousSibling instanceof HTMLDivElement &&
            item.previousSibling.classList.contains('childrenContainer')
          ) {
            item.previousSibling.classList.remove('highlight');
          }
        });
      });
    });
  }

  highlightLinkedElement() {
    this.personalizeElemSet();
    this.elemSet.forEach((el) => {
      el.addEventListener('mouseover', () => {
        const ident = el.getAttribute('item');
        if (typeof ident === 'string') {
          this.emitter.emit('highlightElement', ident);
        }
      });
    });
  }

  removeHighlightLinkedElement() {
    this.elemSet.forEach((el) => {
      el.addEventListener('mouseout', () => {
        const ident = el.getAttribute('item');
        if (typeof ident === 'string') {
          this.emitter.emit('removeHighlightElement', ident);
        }
      });
    });
  }

  highlightElementFromBlanketHover(item: string) {
    let link: string | null;
    this.elemSet.forEach((el) => {
      if (el.getAttribute('item') === item) {
        el.classList.add('highlight');
        if (el.getAttribute('link')) {
          link = el.getAttribute('link');
        }
        this.elements.forEach((elem) => {
          if (elem.getAttribute('link') === link) {
            elem.classList.add('highlight');
          }
        });
      }
    });
  }

  removeHighlightElementFromBlanketHover(item: string) {
    let link: string | null;
    this.elemSet.forEach((el) => {
      if (el.getAttribute('item') === item) {
        el.classList.remove('highlight');
        if (el.getAttribute('link')) {
          link = el.getAttribute('link');
        }
        this.elements.forEach((elem) => {
          if (elem.getAttribute('link') === link) {
            elem.classList.remove('highlight');
          }
        });
      }
    });
  }
}

export default Viewer;
