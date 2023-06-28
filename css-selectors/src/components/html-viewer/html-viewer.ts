import { createElement } from '../service-functions';
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

class Viewer {
  public viewer: HTMLDivElement = document.createElement('div');
  public preBlock: HTMLPreElement = document.createElement('pre');

  draw(container: HTMLDivElement) {
    this.viewer.classList.add('codeViewerBlock');
    container.append(this.viewer);
    this.preBlock.classList.add('codeTextContainer');
    this.viewer.append(this.preBlock);
    this.fillViewerField();
  }

  fillViewerField() {
    const code:HTMLSpanElement = createElement('code', ['codeViewerText'], this.preBlock);
    code.textContent = '<div class="blanket"><slates /><slates /></div>';
    hljs.highlightBlock(this.preBlock);
  }
}

export default Viewer;
