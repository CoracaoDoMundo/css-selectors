import { createElement } from "../service-functions";
import { LevelNames, Event } from "../../types/index";
import EventEmitter from "../event-emitter";
import { ResetGame } from "../../types/events/reset-game";
import { LevelNumberChanged } from "../../types/events/level-number-changed";
import { GiveHint } from "../../types/events/give-hint";

class Levels {
  public levelsBlock: HTMLDivElement = document.createElement("div");

  public activeLevel: number;

  public levelItems: HTMLDivElement[] = [];

  public levelMarks: HTMLDivElement[] = [];

  private emitter: EventEmitter;

  public resetBtn: HTMLDivElement;

  public helpBtn: HTMLDivElement;

  public markClassName = "mark";

  constructor() {
    this.emitter = EventEmitter.getInstance();
    this.resetBtn = document.createElement("div");
    this.helpBtn = document.createElement("div");
    if (
      localStorage.getItem("coracaoLevel") === null ||
      localStorage.getItem("coracaoLevel") === undefined
    ) {
      this.activeLevel = 0;
    } else {
      this.activeLevel = Number(localStorage.getItem("coracaoLevel"));
    }
  }

  public subscribeToLevelChangedEvent(event: Event): void {
    if (event instanceof LevelNumberChanged) {
      this.changeLevel(event);
    }
  }

  public restoreLocalStorage(): void {
    if (
      Number(localStorage.getItem("coracaoLevel")) > 0 &&
      Number(localStorage.getItem("coracaoLevel")) < 11
    ) {
      this.activeLevel = Number(localStorage.getItem("coracaoLevel"));
    }
  }

  public addListenersAndEmitter(): void {
    this.helpBtn.addEventListener("click", () => {
      const giveHintEvent = new GiveHint();
      this.emitter.emit(giveHintEvent);
    });
    this.addListenerOnLevelsList();
    this.emitter.subscribe("levelNumberChanged", (event) => {
      this.subscribeToLevelChangedEvent(event);
      this.setLocalStorage.bind(this);
    });
  }

  public drawLevelsBlock(levelsBlock: HTMLDivElement): void {
    createElement(
      "h1",
      ["levelHeader", "levelBlockHeader"],
      levelsBlock,
      "Levels:"
    );
    const burgerCloseIcon: HTMLDivElement = createElement(
      "div",
      ["burgerIconClose"],
      levelsBlock
    );
    createElement("div", ["burgerIconCloseLine", "firstLine"], burgerCloseIcon);
    createElement(
      "div",
      ["burgerIconCloseLine", "secondLine"],
      burgerCloseIcon
    );
    this.restoreLocalStorage();
    for (let i = 0; i < 10; i += 1) {
      const levelItemBlock: HTMLDivElement = createElement(
        "div",
        ["levelItemBlock"],
        this.levelsBlock
      );
      this.levelItems.push(levelItemBlock);
      const levelMark: HTMLDivElement = createElement(
        "div",
        ["levelMark", `level_${i + 1}`],
        levelItemBlock
      );
      this.levelMarks.push(levelMark);
      createElement(
        "span",
        ["listItem"],
        levelItemBlock,
        `${i + 1}.  ${LevelNames[i + 1]}`
      );
      if (i === this.activeLevel) {
        levelItemBlock.classList.add("activeListItem");
      }
    }
    this.levelsBlock.classList.add("levelsList");
    levelsBlock.append(this.levelsBlock);
    this.resetBtn.classList.add("btn", "btnLevelsBlock");
    levelsBlock.append(this.resetBtn);
    createElement("span", ["btnText"], this.resetBtn, "Reset");
    this.resetBtn.addEventListener("click", () => {
      this.levelMarks.forEach((el) => {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
      });
      this.emitter.emit(new ResetGame());
    });
    this.helpBtn.classList.add("btn", "btnLevelsBlock");
    levelsBlock.append(this.helpBtn);
    createElement("span", ["btnText"], this.helpBtn, "Help");
    this.addListenersAndEmitter();
  }

  public addListenerOnLevelsList(): void {
    this.levelItems.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.levelItems.map((item) => item.classList.remove("activeListItem"));
        el.classList.add("activeListItem");
        this.activeLevel = i;
        this.setLocalStorage();
        const levelNumberChangedEvent = new LevelNumberChanged(
          this.activeLevel
        );
        this.emitter.unsubscribeForEvent("highlightElement");
        this.emitter.unsubscribeForEvent("removeHighlightElement");
        this.emitter.unsubscribeForEvent("highlightElementInViewer");
        this.emitter.unsubscribeForEvent("removeHighlightElementInViewer");
        this.emitter.emit(levelNumberChangedEvent);
      });
    });
  }

  public changeLevel(event: LevelNumberChanged): void {
    this.levelItems.map((item) => item.classList.remove("activeListItem"));
    this.levelItems[event.getNumber()].classList.add("activeListItem");
  }

  public setLocalStorage(): void {
    localStorage.setItem("coracaoLevel", this.activeLevel.toString(10));
  }

  public createCheckMark(color: string): SVGSVGElement {
    const mark: SVGSVGElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    mark.setAttribute("viewBox", "0 0 1920 1920");
    mark.setAttribute("fill", color);
    mark.classList.add(this.markClassName);
    const container: SVGGraphicsElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    container.setAttribute("id", "SVGRepo_bgCarrier");
    container.setAttribute("stroke-width", "0");
    const secondContainer: SVGGraphicsElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    secondContainer.setAttribute("id", "SVGRepo_bgCarrier");
    const path: SVGPathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path.setAttribute(
      "d",
      "M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z"
    );
    path.setAttribute("fill-rule", "evenodd");
    secondContainer.append(path);
    mark.append(container);
    mark.append(secondContainer);

    return mark;
  }
}

export default Levels;
