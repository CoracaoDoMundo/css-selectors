import { createElement } from '../service-functions';
import blanket from '../../assets/img/blanket.svg';
import slates from '../../assets/img/slates.svg';
import levelsList from '../levels/levels.json';

class Blanket {
    public blanket: HTMLDivElement = document.createElement('div');

    draw(container:HTMLDivElement) {
        this.blanket.classList.add('blanket');
        this.blanket.style.backgroundImage = `url(${blanket})`;
        container.append(this.blanket);
    }

    drawLevelItems(levelNum:number) {
        const img:HTMLDivElement = createElement('div', ['img'], this.blanket);
        img.style.backgroundImage = `url(${slates})`;
        const img2:HTMLDivElement = createElement('div', ['img'], this.blanket);
        img2.style.backgroundImage = `url(${slates})`;
    }
}

export default Blanket;