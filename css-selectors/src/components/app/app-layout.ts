import './app.css';
import { Icon } from '../../types/index';
import blanket from '../../assets/img/blanket.svg';

class AppLayout {
  draw() {
    this.drawGameBlock();
    const levelsBlock: HTMLDivElement = document.createElement('div');
    levelsBlock.classList.add('levelsBlock');
    document.body.append(levelsBlock);
  }

  drawGameBlock() {
    const gameBlock: HTMLDivElement = document.createElement('div');
    gameBlock.classList.add('gameBlock');
    document.body.append(gameBlock);
    const headerLine: HTMLDivElement = document.createElement('div');
    headerLine.classList.add('headerLine');
    gameBlock.append(headerLine);
    const header: HTMLHeadingElement = document.createElement('h1');
    header.classList.add('header');
    header.textContent = 'Summer CSS';
    headerLine.append(header);
    const socialBlock: HTMLDivElement = document.createElement('div');
    socialBlock.classList.add('socialBlock');
    headerLine.append(socialBlock);
    const socialBlockText: HTMLSpanElement = document.createElement('span');
    socialBlockText.textContent = 'Share';
    socialBlockText.classList.add('header');
    socialBlock.append(socialBlockText);
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

    const levelHeader: HTMLHeadingElement = document.createElement('h1');
    levelHeader.classList.add('levelHeader');
    levelHeader.textContent = 'Select the slates';
    gameBlock.append(levelHeader);

    const blanketImg: HTMLDivElement = document.createElement('div');
    blanketImg.classList.add('blanket');
    blanketImg.style.backgroundImage = `url(${blanket})`;
    gameBlock.append(blanketImg);
  }

  renderIcon(data: Icon) {
    const icon: SVGSVGElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );

    icon.setAttribute('viewBox', data.viewBox);
    icon.setAttribute('enable-background', 'new 0 0 64 64');
    icon.classList.add('icon');
    let container: SVGGraphicsElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    let containerSecond: SVGGraphicsElement = document.createElementNS(
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
