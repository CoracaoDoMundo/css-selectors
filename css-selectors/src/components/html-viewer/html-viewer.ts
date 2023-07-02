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
    this.fillViewerField(activeLevel);
    emitter.subscribe('levelNumberChanged', this.fillViewerField.bind(this));
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
        if (el.class) {
          const className = ` class='${el.class}'`;
          elemName += className;
        }
        if (el.id) {
          const idName = ` id='${el.id}'`;
          elemName += idName;
        }
        if (!el.child) {
          const elem: HTMLDivElement = createElement(
            'div',
            ['codeViewerText', `${el.selector}`],
            container,
            `<${elemName} />`
          );
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
            ['codeViewerText', `${el.selector}`],
            container,
            `<${elemName}>`
          );
          elemStart.setAttribute('link', random);
          this.elements.push(elemStart);
          const elemChild: HTMLDivElement = createElement(
            'div',
            ['childrenContainer'],
            container
          );
          const elemEnd: HTMLDivElement = createElement(
            'div',
            ['codeViewerText', `${el.selector}`],
            container,
            `</${el.selector}>`
          );
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
  }

  highlightElement() {
    this.elements.forEach((item) => {
      item.addEventListener('mouseover', (e: MouseEvent) => {
        if (!item.classList.contains('div')) {
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
    this.elements.forEach((item, i) => {
      item.addEventListener('mouseout', (e: MouseEvent) => {
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
