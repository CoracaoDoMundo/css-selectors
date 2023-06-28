import { createElement } from '../service-functions';

class Viewer {
    public viewer: HTMLDivElement = document.createElement('div');

    draw(container:HTMLDivElement) {
        this.viewer.classList.add('codeViewerBlock');
        container.append(this.viewer);
    }

}

export default Viewer;
