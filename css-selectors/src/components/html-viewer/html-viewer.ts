import { createElement } from '../service-functions';
import levelsList from '../levels/levels.json';
import { Level } from '../../types/index';
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

class Viewer {
  public viewer: HTMLDivElement = document.createElement('div');
  public preBlock: HTMLPreElement = document.createElement('pre');

  draw(container: HTMLDivElement, activeLevel: number) {
    this.viewer.classList.add('codeViewerBlock');
    container.append(this.viewer);
    this.preBlock.classList.add('codeTextContainer');
    this.viewer.append(this.preBlock);
    this.fillViewerField(activeLevel);
  }

  fillViewerField(activeLevel: number) {
    let nesting: number = 0;
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
          elem.style.paddingLeft = `${nesting}rem`;
          hljs.highlightBlock(elem);
        } else {
          const elemStart: HTMLDivElement = createElement(
            'div',
            ['codeViewerText', `${el.selector}`],
            container,
            `<${elemName}>`
          );
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
          elemStart.style.paddingLeft = `${nesting}rem`;
          elemEnd.style.paddingLeft = `${nesting}rem`;
          nesting += 1;
          hljs.highlightBlock(elemStart);
          hljs.highlightBlock(elemEnd);
          return res(elemChild, el.child);
        }
      }
    };
    res(this.preBlock, levelsList[activeLevel]);
  }
}

export default Viewer;
