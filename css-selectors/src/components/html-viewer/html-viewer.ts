import { createElement } from '../service-functions';
import { LevelsList } from '../levels/config';
import { Level } from '../../types/index';
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

class Viewer {
  public viewer: HTMLDivElement = document.createElement('div');
  public preBlock: HTMLPreElement = document.createElement('pre');
  public elements: HTMLDivElement[] = [];

  draw(container: HTMLDivElement, activeLevel: number): void {
    this.viewer.classList.add('codeViewerBlock');
    container.append(this.viewer);
    this.preBlock.classList.add('codeTextContainer');
    this.viewer.append(this.preBlock);
    this.fillViewerField(activeLevel);
  }

  fillViewerField(activeLevel: number): void {
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
          const elemStart: HTMLDivElement = createElement(
            'div',
            ['codeViewerText', `${el.selector}`],
            container,
            `<${elemName}>`
          );
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
          this.elements.push(elemEnd);
          elemStart.style.paddingLeft = `${el.nesting}rem`;
          elemEnd.style.paddingLeft = `${el.nesting}rem`;
          hljs.highlightBlock(elemStart);
          hljs.highlightBlock(elemEnd);
          res(elemChild, el.child);
        }
      }
    };
    res(this.preBlock, LevelsList[activeLevel]);
    console.log('elements:', this.elements);
  }

      showTheTooltip() {
      this.elements.forEach((item) => {
          item.addEventListener('mouseup', () => {});
      });
    }
}

export default Viewer;
