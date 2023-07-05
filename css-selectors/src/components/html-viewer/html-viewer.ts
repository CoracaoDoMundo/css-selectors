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

  draw(
    container: HTMLDivElement,
    activeLevel: number,
    emitter: EventEmitter
  ): void {
    this.viewer.classList.add('codeViewerBlock');
    container.append(this.viewer);
    this.preBlock.classList.add('codeTextContainer');
    this.viewer.append(this.preBlock);
    this.highlightElement(emitter);
    this.fillViewerField(activeLevel, emitter);
    emitter.subscribe('levelNumberChanged', () => {
      this.elements = [];
    });
    emitter.subscribe('levelNumberChanged', this.fillViewerField.bind(this));
  }

  fillViewerField(activeLevel: number, emitter: EventEmitter): void {
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
          let attrName = el.attribute.slice(0, 1).toUpperCase() + el.attribute.slice(1);
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
    this.highlightElement(emitter);
  }

  highlightElement(emitter: EventEmitter) {
    this.elements.forEach((item) => {
      item.addEventListener('mouseover', () => {
        if (item.getAttribute('tag') !== 'div Blanket') {
          if (emitter) {
            emitter.emit('highlightElement', item);
          }
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
        if (emitter) {
          emitter.emit('removeHighlightElement', item);
        }
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

  showTheTooltip() {
    this.elements.forEach((item) => {
      item.addEventListener('mouseup', () => {});
    });
  }
}

export default Viewer;
