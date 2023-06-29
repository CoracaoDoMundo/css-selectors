import './app.css';
import { Icon } from '../../types/index';
import { createElement } from '../service-functions';
import Levels from '../levels/levels';
import Blanket from '../blanket/blanket';
import Viewer from '../html-viewer/html-viewer';

class AppLayout {
  public levelHeader: HTMLHeadingElement = document.createElement('h1');
  public levels = new Levels();
  public blanket = new Blanket();
  public viewerBlock = new Viewer();

  draw(): void {
    this.drawGameBlock();
    const levelsBlock: HTMLDivElement = createElement('div', ['levelsBlock'], document.body);
    this.levels.drawLevelsBlock(levelsBlock);
  }

  drawGameBlock(): void {
    const gameBlock: HTMLDivElement = createElement('div', ['gameBlock'], document.body);
    const headerLine: HTMLDivElement = createElement('div', ['headerLine'], gameBlock);
    const header: HTMLHeadingElement = createElement('h1', ['header'], headerLine, 'Summer CSS');
    const socialBlock: HTMLDivElement = createElement('div', ['socialBlock'], headerLine);
    const socialBlockText: HTMLSpanElement = createElement('span', ['header'], socialBlock, 'Share');
    const mailData = {
      gQuantity: 1,
      color: '#d2922c',
      viewBox: '0 0 64 64',
      path: 'M32,34.934L63.617,10.34C62.984,8.965,61.613,8,60,8H4c-1.613,0-2.984,0.965-3.617,2.34L32,34.934z',
      pathSecond:
        'M34.457,43.156C33.734,43.719,32.867,44,32,44s-1.734-0.281-2.457-0.844L0,20.18V52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V20.18L34.457,43.156z',
    };
    const mailIcon: SVGSVGElement = this.renderIcon(mailData);
    socialBlock.append(mailIcon);
    const fbData = {
      gQuantity: 0,
      color: '#d2922c',
      viewBox: '0 0 24 24',
      path: 'M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z',
    };
    const fbIcon: SVGSVGElement = this.renderIcon(fbData);
    socialBlock.append(fbIcon);
    const twitterData = {
      gQuantity: 2,
      color: '#d2922c',
      viewBox: '0 -2 20 20',
      path: 'M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705',
    };
    const twitterIcon: SVGSVGElement = this.renderIcon(twitterData);
    socialBlock.append(twitterIcon);

    this.levelHeader.classList.add('levelHeader');
    this.levelHeader.textContent = 'Select the slates';
    gameBlock.append(this.levelHeader);

    this.blanket.draw(gameBlock);
    this.blanket.drawLevelItems(this.levels.activeLevel);

    const codeField: HTMLDivElement = createElement('div', ['codeField'], gameBlock);

    const editorHeadingLine: HTMLDivElement = createElement('div', ['editorHeaderLine'], codeField);
    const editorTitle: HTMLSpanElement = createElement('span', ['editorTitle'], editorHeadingLine, 'CSS Editor');
    const editorSubtitle: HTMLSpanElement = createElement('span', ['subtitle'], editorHeadingLine, 'style.css');
    const codeHeadingLine: HTMLDivElement = createElement('div', ['viewerHeaderLine'], codeField);
    const codeViewerTitle: HTMLSpanElement = createElement('span', ['viewerTitle'], codeHeadingLine, 'HTML Viewer');
    const codeViewerSubtitle: HTMLSpanElement = createElement('span', ['subtitle'], codeHeadingLine, 'beach.html');

    const editorNumLines: HTMLDivElement = createElement('div', ['numbers', 'editorNums'], codeField);
    for (let i = 0; i < 20; i += 1) {
      const lineNum: HTMLSpanElement = createElement('span', ['num'], editorNumLines, (i + 1).toString(10));
    }
    const codingFieldBlock: HTMLDivElement = createElement('div', ['codingFieldBlock'], codeField);
    const codeViewerNumLines: HTMLDivElement = createElement('div', ['numbers', 'viewerNums'], codeField);
    for (let i = 0; i < 20; i += 1) {
      const lineNum: HTMLSpanElement = createElement('span', ['num'], codeViewerNumLines, (i + 1).toString(10));
    }
    const inputCode: HTMLInputElement = createElement('input', ['input'], codingFieldBlock);
    inputCode.setAttribute('placeholder', 'Type in a CSS selector');
    const enterBtn: HTMLDivElement = createElement('div', ['btn'], codingFieldBlock);
    const enterText: HTMLDivElement = createElement('span', ['btnText'], enterBtn, 'Enter');
    const codeText: HTMLPreElement = createElement('pre', ['codeText'], codingFieldBlock, `{\n /* Style would go here. */ \n}`);

    this.viewerBlock.draw(codeField, this.levels.activeLevel);
  }

  renderIcon(data: Icon): SVGSVGElement {
    const icon: SVGSVGElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );

    icon.setAttribute('viewBox', data.viewBox);
    icon.setAttribute('enable-background', 'new 0 0 64 64');
    icon.classList.add('icon');
    const container: SVGGraphicsElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    const containerSecond: SVGGraphicsElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    let firstPath: SVGPathElement;
    let secondPath: SVGPathElement;

    firstPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    firstPath.setAttribute('d', data.path);
    firstPath.setAttribute('fill', data.color);

    if (data.pathSecond) {
      secondPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      secondPath.setAttribute('d', data.pathSecond);
      secondPath.setAttribute('fill', data.color);
      container.append(secondPath);
    }
    if (data.gQuantity === 0) {
      icon.append(firstPath);
    } else if (data.gQuantity === 1) {
      icon.append(container);
      container.append(firstPath);
    }
    if (data.gQuantity === 2) {
      container.setAttribute(
        'transform',
        'translate(-60.000000, -7521.000000)'
      );
      container.setAttribute('fill', data.color);
      containerSecond.setAttribute(
        'transform',
        'translate(56.000000, 160.000000)'
      );
      icon.append(container);
      container.append(containerSecond);
      containerSecond.append(firstPath);
    }

    return icon;
  }
}

export default AppLayout;
