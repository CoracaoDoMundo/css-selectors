import { createElement } from "../service-functions";
import blanket from "../../assets/img/blanket.svg";
import Levels from "../levels/levels";
import { Level, Event } from "../../types/index";
import { LevelsList } from "../levels/config";
import EventEmitter from "../event-emitter";
import { HighlightElement } from "../../types/events/highlight-element";
import { RemoveHighlightElement } from "../../types/events/remove-highlight-element";
import { LevelNumberChanged } from "../../types/events/level-number-changed";
import { HighlightBlanketElement } from "../../types/events/highlight-blanket-element";
import { RemoveHighlightBlanketElement } from "../../types/events/remove-highlight-blanket-element";

class Blanket {
  public blanket: HTMLDivElement = document.createElement("div");

  public items: [HTMLDivElement, string][] = [];

  private emitter: EventEmitter;

  private tooltipVisible = false;

  public levels: Levels;

  constructor(levels: Levels) {
    this.levels = levels;
    this.emitter = EventEmitter.getInstance();
  }

  public draw(container: HTMLDivElement): void {
    this.blanket.classList.add("blanket");
    this.blanket.style.backgroundImage = `url(${blanket})`;
    container.append(this.blanket);
    this.emitter.subscribe("levelNumberChanged", (event) => {
      this.items = [];
      this.subscribeToLevelChangedEvent(event);
    });
  }

  public subscribeToLevelChangedEvent(event: Event): void {
    if (event instanceof LevelNumberChanged) {
      const newLevel = event.getNumber();
      this.drawLevelItems(newLevel);
    }
  }

  public subscribeToHighlightElementEvent(event: Event): void {
    if (event instanceof HighlightElement) {
      const elem = event.getElementIdent();
      this.highlightLinkedElement(elem);
    }
  }

  public subscribeToRemoveHighlightElementEvent(event: Event): void {
    if (event instanceof RemoveHighlightElement) {
      const elem = event.getElementIdent();
      this.removeHighlightFromLinkedElement(elem);
    }
  }

  public drawLevelItems(levelNum: number): void {
    this.blanket.innerHTML = "";
    const res = (container: HTMLDivElement, levelPack: Level[]): void => {
      levelPack.forEach((el) => {
        let name = `${el.selector}Img`;
        let title = `<${el.selector}></${el.selector}>`;
        if (el.id) {
          const nameId = el.id.slice(0, 1).toUpperCase() + el.id.slice(1);
          name = `${el.selector}${nameId}Img`;
          title = `<${el.selector} id="${el.id}"></${el.selector}>`;
        }
        if (el.class) {
          const nameClass =
            el.class.slice(0, 1).toUpperCase() + el.class.slice(1);
          name = `${el.selector}${nameClass}Img`;
          title = `<${el.selector} class="${el.class}"></${el.selector}>`;
          if (el.attribute) {
            const attrName =
              el.attribute.slice(0, 1).toUpperCase() + el.attribute.slice(1);
            name = `${el.selector}${nameClass}${attrName}Img`;
            title = `<${el.selector} class="${el.class}" attr="${el.attribute}"></${el.selector}>`;
          }
        }
        if (!el.child) {
          const pic: HTMLDivElement = createElement(
            "div",
            [`${name}`, "img"],
            container
          );
          pic.style.backgroundImage = `url(${el.img})`;
          this.items.push([pic, title]);
          if (el.target) {
            pic.classList.add("targetItem");
          }
        } else if (el.child && el.class === "blanket") {
          res(container, el.child);
        } else {
          const pic: HTMLDivElement = createElement(
            "div",
            [`${name}`, "img"],
            container
          );
          pic.style.backgroundImage = `url(${el.img})`;
          this.items.push([pic, title]);
          res(pic, el.child);
        }
      });
    };

    res(this.blanket, LevelsList[levelNum]);
    this.personalizeItems();

    this.subscribes();
    this.highlightElement();
    this.addTooltipOnElement();
  }

  public subscribes(): void {
    this.emitter.subscribe("highlightElement", (event) =>
      this.subscribeToHighlightElementEvent(event)
    );
    this.emitter.subscribe("removeHighlightElement", (event) =>
      this.subscribeToRemoveHighlightElementEvent(event)
    );
  }

  public elementsDisappearance(): void {
    this.items.forEach((el) => {
      const elementDiv = el[0];
      elementDiv.classList.add("fly");
    });
  }

  public highlightElement(): void {
    this.items.forEach((item, i) => {
      item[0].addEventListener("mouseover", (e) => {
        item[0].classList.add("shadow");
        const highlightElementEvent = new HighlightBlanketElement(`${i}`);
        this.emitter.emit(highlightElementEvent);
        if (e.relatedTarget instanceof HTMLDivElement) {
          e.relatedTarget.classList.remove("shadow");
        }
      });
    });
    this.items.forEach((item, i) => {
      item[0].addEventListener("mouseout", () => {
        const removeHighlightElementEvent = new RemoveHighlightBlanketElement(
          `${i}`
        );
        this.emitter.emit(removeHighlightElementEvent);

        item[0].classList.remove("shadow");
      });
    });
  }

  public personalizeItems(): void {
    this.items.forEach((el, i) => {
      const elementDiv = el[0];
      elementDiv.setAttribute("item", `${i}`);
    });
  }

  public addTooltipOnElement(): void {
    this.items.forEach((item) => {
      let tooltip: HTMLDivElement;
      let tooltipVisible = false;

      const showTooltip = (): void => {
        if (!tooltipVisible) {
          tooltipVisible = true;
          tooltip = createElement("div", ["tooltip"], item[0], item[1]);
        }
      };

      const hideTooltip = (e: MouseEvent): void => {
        const relatedTarget = e.relatedTarget as Node;
        if (!relatedTarget || !item[0].contains(relatedTarget)) {
          if (tooltip) {
            item[0].removeChild(tooltip);
            tooltipVisible = false;
          }
        }
      };

      item[0].addEventListener("mouseover", showTooltip);
      item[0].addEventListener("mouseout", hideTooltip);
    });
  }

  public highlightLinkedElement(value: string): void {
    let res: number;
    this.items.forEach((el, i) => {
      const elementDiv = el[0];
      const elementTag = el[1];
      if (elementDiv.getAttribute("item") === value) {
        res = i;
        this.items[res][0].classList.add("shadow");
        if (!this.tooltipVisible) {
          this.tooltipVisible = true;
          createElement("div", ["tooltip"], elementDiv, elementTag);
        }
      }
    });
  }

  public removeHighlightFromLinkedElement(value: string): void {
    let res: number;
    let lastChild: HTMLDivElement;
    this.items.forEach((el, i) => {
      const elementDiv = el[0];
      if (elementDiv.getAttribute("item") === value) {
        res = i;
        const selectedElementDiv = this.items[res][0];
        selectedElementDiv.classList.remove("shadow");
        lastChild = this.items[res][0].lastChild as HTMLDivElement;
        if (lastChild && lastChild.className === "tooltip") {
          this.items[res][0].removeChild(lastChild);
          this.tooltipVisible = false;
        }
      }
    });
  }
}

export default Blanket;
