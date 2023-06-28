import blanket from '../../assets/img/blanket.svg';
import slates from '../../assets/img/slates.svg'

class Blanket {
    public blanket: HTMLDivElement = document.createElement('div');

    draw(container:HTMLDivElement) {
        this.blanket.classList.add('blanket');
        this.blanket.style.backgroundImage = `url(${blanket})`;
        container.append(this.blanket);
    }

    drawLevelItems(levelNum:number) {

    }
}

export default Blanket;