import './app.css';
import { Icon } from '../../types/index';
import { createElement } from '../service-functions';
import EventEmitter from '../event-emitter';
import Levels from '../levels/levels';
import Blanket from '../blanket/blanket';
import Viewer from '../html-viewer/html-viewer';

class AppLayout {
  public levelHeader: HTMLHeadingElement = document.createElement('h1');
  public levels = new Levels();
  public blanket = new Blanket();
  public viewerBlock = new Viewer();

  draw(emitter: EventEmitter): void {
    emitter.emit('levelNumberChanged', this.levels.activeLevel);
    this.drawGameBlock(emitter);
    const levelsBlock: HTMLDivElement = createElement(
      'div',
      ['levelsBlock'],
      document.body
    );
    this.levels.drawLevelsBlock(levelsBlock, emitter);
  }

  drawGameBlock(emitter:EventEmitter): void {
    const gameBlock: HTMLDivElement = createElement(
      'div',
      ['gameBlock'],
      document.body
    );
    const headerLine: HTMLDivElement = createElement(
      'div',
      ['headerLine'],
      gameBlock
    );
    const header: HTMLHeadingElement = createElement(
      'h1',
      ['header'],
      headerLine,
      'Summer CSS'
    );
    const socialBlock: HTMLDivElement = createElement(
      'div',
      ['socialBlock'],
      headerLine
    );
    const socialBlockText: HTMLSpanElement = createElement(
      'span',
      ['header'],
      socialBlock,
      'Share'
    );
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

    this.blanket.draw(gameBlock, emitter);
    this.blanket.drawLevelItems(this.levels.activeLevel);

    const codeField: HTMLDivElement = createElement(
      'div',
      ['codeField'],
      gameBlock
    );

    const editorHeadingLine: HTMLDivElement = createElement(
      'div',
      ['editorHeaderLine'],
      codeField
    );
    const editorTitle: HTMLSpanElement = createElement(
      'span',
      ['editorTitle'],
      editorHeadingLine,
      'CSS Editor'
    );
    const editorSubtitle: HTMLSpanElement = createElement(
      'span',
      ['subtitle'],
      editorHeadingLine,
      'style.css'
    );
    const codeHeadingLine: HTMLDivElement = createElement(
      'div',
      ['viewerHeaderLine'],
      codeField
    );
    const codeViewerTitle: HTMLSpanElement = createElement(
      'span',
      ['viewerTitle'],
      codeHeadingLine,
      'HTML Viewer'
    );
    const codeViewerSubtitle: HTMLSpanElement = createElement(
      'span',
      ['subtitle'],
      codeHeadingLine,
      'beach.html'
    );

    const editorNumLines: HTMLDivElement = createElement(
      'div',
      ['numbers', 'editorNums'],
      codeField
    );
    for (let i = 0; i < 20; i += 1) {
      const lineNum: HTMLSpanElement = createElement(
        'span',
        ['num'],
        editorNumLines,
        (i + 1).toString(10)
      );
    }
    const codingFieldBlock: HTMLDivElement = createElement(
      'div',
      ['codingFieldBlock'],
      codeField
    );
    const codeViewerNumLines: HTMLDivElement = createElement(
      'div',
      ['numbers', 'viewerNums'],
      codeField
    );
    for (let i = 0; i < 20; i += 1) {
      const lineNum: HTMLSpanElement = createElement(
        'span',
        ['num'],
        codeViewerNumLines,
        (i + 1).toString(10)
      );
    }
    const inputCode: HTMLInputElement = createElement(
      'input',
      ['input'],
      codingFieldBlock
    );
    inputCode.setAttribute('placeholder', 'Type in a CSS selector');
    const enterBtn: HTMLDivElement = createElement(
      'div',
      ['btn'],
      codingFieldBlock
    );
    const enterText: HTMLDivElement = createElement(
      'span',
      ['btnText'],
      enterBtn,
      'Enter'
    );
    const codeText: HTMLPreElement = createElement(
      'pre',
      ['codeText'],
      codingFieldBlock,
      `{\n /* Style would go here. */ \n}`
    );

    this.viewerBlock.draw(codeField, this.levels.activeLevel, emitter);

    const footer: HTMLDivElement = createElement('div', ['footer'], gameBlock);
    const gitHubFooter: HTMLDivElement = createElement(
      'div',
      ['ghContainer'],
      footer
    );
    const ghData = {
      gQuantity: 0,
      color: '#d2922c',
      viewBox: '-2 -2 24 24',
      path: 'M18.88 1.099C18.147.366 17.265 0 16.233 0H3.746C2.714 0 1.832.366 1.099 1.099.366 1.832 0 2.714 0 3.746v12.487c0 1.032.366 1.914 1.099 2.647.733.733 1.615 1.099 2.647 1.099H6.66c.19 0 .333-.007.429-.02a.504.504 0 0 0 .286-.169c.095-.1.143-.245.143-.435l-.007-.885c-.004-.564-.006-1.01-.006-1.34l-.3.052c-.19.035-.43.05-.721.046a5.555 5.555 0 0 1-.904-.091 2.026 2.026 0 0 1-.872-.39 1.651 1.651 0 0 1-.572-.8l-.13-.3a3.25 3.25 0 0 0-.41-.663c-.186-.243-.375-.407-.566-.494l-.09-.065a.956.956 0 0 1-.17-.156.723.723 0 0 1-.117-.182c-.026-.061-.004-.111.065-.15.07-.04.195-.059.378-.059l.26.04c.173.034.388.138.643.311a2.1 2.1 0 0 1 .631.677c.2.355.44.626.722.813.282.186.566.28.852.28.286 0 .533-.022.742-.065a2.59 2.59 0 0 0 .585-.196c.078-.58.29-1.028.637-1.34a8.907 8.907 0 0 1-1.333-.234 5.314 5.314 0 0 1-1.223-.507 3.5 3.5 0 0 1-1.047-.872c-.277-.347-.505-.802-.683-1.365-.177-.564-.266-1.215-.266-1.952 0-1.049.342-1.942 1.027-2.68-.32-.788-.29-1.673.091-2.652.252-.079.625-.02 1.119.175.494.195.856.362 1.086.5.23.14.414.257.553.352a9.233 9.233 0 0 1 2.497-.338c.859 0 1.691.113 2.498.338l.494-.312a6.997 6.997 0 0 1 1.197-.572c.46-.174.81-.221 1.054-.143.39.98.424 1.864.103 2.653.685.737 1.028 1.63 1.028 2.68 0 .737-.089 1.39-.267 1.957-.177.568-.407 1.023-.689 1.366-.282.343-.633.63-1.053.865-.42.234-.828.403-1.223.507a8.9 8.9 0 0 1-1.333.235c.45.39.676 1.005.676 1.846v3.11c0 .147.021.266.065.357a.36.36 0 0 0 .208.189c.096.034.18.056.254.064.074.01.18.013.318.013h2.914c1.032 0 1.914-.366 2.647-1.099.732-.732 1.099-1.615 1.099-2.647V3.746c0-1.032-.367-1.914-1.1-2.647z',
    };
    const ghLogo: SVGSVGElement = this.renderIcon(ghData);
    gitHubFooter.append(ghLogo);
    const ghLink: HTMLAnchorElement = createElement(
      'a',
      ['ghLink'],
      gitHubFooter,
      '@CoracaoDoMundo'
    );
    ghLink.href = 'https://github.com/CoracaoDoMundo';
    const issueYear: HTMLSpanElement = createElement(
      'span',
      ['year'],
      footer,
      '© 2023'
    );
    const rsData = {
      gQuantity: 0,
      color: '#d2922c',
      viewBox: '0 0 552.85 198.67',
      path: 'M275.36 61.37l26.29-1.65q.86 6.41 3.48 9.76 4.28 5.43 12.2 5.43 5.91 0 9.12-2.77a8.34 8.34 0 0 0 3.2-6.44 8.18 8.18 0 0 0-3-6.22q-3-2.74-14.15-5.19-18.18-4.08-25.93-10.86a21.84 21.84 0 0 1-7.81-17.26 23.44 23.44 0 0 1 4-13 26.47 26.47 0 0 1 12-9.64q8-3.51 22-3.51 17.14 0 26.14 6.38t10.71 20.28l-26.05 1.52q-1-6-4.36-8.78t-9.2-2.77c-3.21 0-5.63.69-7.25 2.05a6.25 6.25 0 0 0-2.44 5 5 5 0 0 0 2 3.84q1.95 1.77 9.27 3.3 18.12 3.9 26 7.9t11.4 9.91a25.12 25.12 0 0 1 3.57 13.24 28.37 28.37 0 0 1-4.75 15.86 29.83 29.83 0 0 1-13.3 11q-8.55 3.75-21.54 3.75-22.81 0-31.6-8.78t-10-22.35zM6.27 91V1.53h46.06q12.81 0 19.58 2.19a20.93 20.93 0 0 1 10.92 8.14A24.75 24.75 0 0 1 87 26.35a24.8 24.8 0 0 1-3.2 12.84A24.91 24.91 0 0 1 75.07 48a33.63 33.63 0 0 1-9.7 3.54 27.79 27.79 0 0 1 7.19 3.29A27.79 27.79 0 0 1 77 59.49 35.16 35.16 0 0 1 80.85 65l13.38 26H63L48.24 63.63q-2.81-5.31-5-6.9a11.63 11.63 0 0 0-6.78-2.07H34V91zM34 37.76h11.68A41 41 0 0 0 53 36.54a7.3 7.3 0 0 0 4.48-2.81 8.24 8.24 0 0 0 1.74-5.18 8.23 8.23 0 0 0-2.75-6.65q-2.74-2.32-10.31-2.32H34zM0 167.56l26.29-1.64q.86 6.41 3.48 9.76Q34 181.11 42 181.11q5.91 0 9.12-2.78a8.34 8.34 0 0 0 3.2-6.44 8.2 8.2 0 0 0-3-6.22q-3-2.74-14.15-5.18-18.18-4.1-25.93-10.86a21.87 21.87 0 0 1-7.81-17.27 23.49 23.49 0 0 1 4-13 26.47 26.47 0 0 1 12-9.64q8-3.51 22-3.51 17.14 0 26.14 6.38t10.71 20.28l-26 1.53q-1-6-4.36-8.79t-9.19-2.74q-4.81 0-7.25 2a6.25 6.25 0 0 0-2.44 5 5 5 0 0 0 2 3.85q1.95 1.77 9.27 3.29 18.12 3.9 26 7.9t11.4 9.91a25.15 25.15 0 0 1 3.57 13.24 28.35 28.35 0 0 1-4.75 15.86 29.83 29.83 0 0 1-13.3 11q-8.55 3.75-21.54 3.75-22.81 0-31.6-8.78T0 167.56zm163-7.01l24.22 7.32a44.72 44.72 0 0 1-7.69 17 33.46 33.46 0 0 1-13 10.31q-7.78 3.47-19.8 3.47-14.58 0-23.82-4.23t-16-14.91q-6.72-10.67-6.71-27.31 0-22.18 11.8-34.11t33.4-11.92q16.91 0 26.57 6.84t14.36 21l-24.4 5.43a21 21 0 0 0-2.68-6 16 16 0 0 0-5.67-4.88 16.31 16.31 0 0 0-7.51-1.71q-9.39 0-14.39 7.56-3.8 5.61-3.79 17.61 0 14.86 4.52 20.38t12.69 5.51q7.92 0 12-4.45t5.9-12.91zm45.51-52.83h27.63V139h30.2v-31.28h27.75v89.43h-27.75V161h-30.2v36.18h-27.63zm102.78 44.77q0-21.88 12.2-34.1t34-12.2q22.32 0 34.4 12T404 151.76q0 15.69-5.28 25.72a37.54 37.54 0 0 1-15.25 15.61q-10 5.58-24.86 5.58-15.12 0-25-4.82a37.59 37.59 0 0 1-16.07-15.25q-6.26-10.42-6.25-26.11zm27.63.13q0 13.55 5 19.46t13.7 5.91q8.91 0 13.79-5.79t4.88-20.8q0-12.63-5.1-18.46t-13.82-5.82A16.78 16.78 0 0 0 344 133q-5.07 6-5.08 19.62z',
      pathSecond:
        'M392.28 152.49q0-21.88 12.2-34.1t34-12.2q22.34 0 34.41 12t12.07 33.58q0 15.69-5.27 25.72a37.6 37.6 0 0 1-15.25 15.61q-10 5.58-24.86 5.58-15.13 0-25-4.82a37.67 37.67 0 0 1-16.08-15.25q-6.22-10.43-6.22-26.12zm27.64.13q0 13.55 5 19.46t13.72 5.92q8.91 0 13.79-5.79t4.88-20.8q0-12.63-5.09-18.46t-13.82-5.82A16.77 16.77 0 0 0 425 133q-5.09 6-5.08 19.62z',
      pathThird: 'M482.08 107.72h27.64v67.41h43.13v22h-70.77z',
    };
    const rsLogoLink: HTMLAnchorElement = createElement(
      'a',
      ['rsLogoLink'],
      footer
    );
    rsLogoLink.setAttribute('href', 'https://rs.school');
    const rsLogo: SVGSVGElement = this.renderIcon(rsData);
    rsLogoLink.append(rsLogo);
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
    let thirdPath: SVGPathElement;

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
      if (data.gQuantity === 0) {
        icon.append(secondPath);
      } else {
        container.append(secondPath);
      }
    }
    if (data.pathThird) {
      thirdPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      thirdPath.setAttribute('d', data.pathThird);
      thirdPath.setAttribute('fill', data.color);
      icon.append(thirdPath);
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
