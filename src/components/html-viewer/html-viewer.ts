import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import { createElement } from "../service-functions";
import { LevelsList } from "../levels/config";
import { Level } from "../../types/index";
import EventEmitter from "../event-emitter";

hljs.registerLanguage("xml", xml);

class Viewer {
  public viewer: HTMLDivElement = document.createElement("div");

  public preBlock: HTMLPreElement = document.createElement("pre");

  public elements: HTMLDivElement[] = [];

  public elemSet: HTMLDivElement[] = [];

  private random = "";

  private emitter: EventEmitter;

  constructor() {
    this.emitter = EventEmitter.getInstance();
  }

  public draw(container: HTMLDivElement, activeLevel: number): void {
    this.viewer.classList.add("codeViewerBlock");
    container.append(this.viewer);
    this.preBlock.classList.add("codeTextContainer");
    this.viewer.append(this.preBlock);
    this.highlightElement();
    this.fillViewerField(activeLevel);
    this.emitter.subscribe("levelNumberChanged", () => {
      this.elements = [];
      this.elemSet = [];
    });
    this.emitter.subscribe(
      "levelNumberChanged",
      this.fillViewerField.bind(this)
    );
  }

  public createStartElement(
    container: HTMLPreElement | HTMLDivElement,
    elemName: string,
    tag: string,
    random: string
  ): HTMLDivElement {
    const elemStart: HTMLDivElement = createElement(
      "div",
      ["codeViewerText"],
      container,
      `<${elemName}>`
    );
    elemStart.setAttribute("tag", tag);
    elemStart.setAttribute("link", random);
    this.elements.push(elemStart);
    this.elemSet.push(elemStart);
    return elemStart;
  }

  public createEndElement(
    container: HTMLPreElement | HTMLDivElement,
    el: Level,
    tag: string,
    random: string
  ): HTMLDivElement {
    const elemEnd: HTMLDivElement = createElement(
      "div",
      ["codeViewerText"],
      container,
      `</${el.selector}>`
    );
    elemEnd.setAttribute("tag", tag);
    elemEnd.setAttribute("link", random);
    this.elements.push(elemEnd);
    return elemEnd;
  }

  public formRandomNum(randomArr: string[]): void {
    this.random = Math.floor(Math.random() * 100).toString();
    if (randomArr.includes(this.random)) {
      this.random = Math.floor(Math.random() * 100).toString();
    } else {
      randomArr.push(this.random);
    }
  }

  public styleElements(
    el: Level,
    elemStart: HTMLDivElement,
    elemEnd: HTMLDivElement,
    elemChild: HTMLDivElement
  ): void {
    hljs.highlightBlock(elemStart);
    hljs.highlightBlock(elemEnd);
    if (el.child) {
      this.drawActiveLevel(elemChild, el.child);
    }
  }

  public drawActiveLevel(
    container: HTMLPreElement | HTMLDivElement,
    element: Level[]
  ): void {
    const randomArr: string[] = [];
    element.forEach((el) => {
      let elemName = `${el.selector}`;
      let tag = `${el.selector}`;
      if (el.class) {
        const className = `class="${el.class}"`;
        elemName += ` ${className}`;
        const nameClass =
          el.class.slice(0, 1).toUpperCase() + el.class.slice(1);
        tag += ` ${nameClass}`;
      }
      if (el.attribute) {
        const attr = `attr="${el.attribute}"`;
        elemName += attr;
        const attrName =
          el.attribute.slice(0, 1).toUpperCase() + el.attribute.slice(1);
        tag += ` ${attrName}`;
      }
      if (el.id) {
        const idName = ` id="${el.id}"`;
        elemName += idName;
        const nameId = el.id.slice(0, 1).toUpperCase() + el.id.slice(1);
        tag += `${nameId}`;
      }
      if (!el.child) {
        const elem: HTMLDivElement = createElement(
          "div",
          ["codeViewerText"],
          container,
          `<${elemName} />`
        );
        elem.setAttribute("tag", tag);
        this.elements.push(elem);
        this.elemSet.push(elem);
        elem.style.paddingLeft = `${el.nesting}rem`;
        hljs.highlightBlock(elem);
      } else {
        this.formRandomNum(randomArr);
        const elemStart = this.createStartElement(
          container,
          elemName,
          tag,
          this.random
        );
        const elemChild: HTMLDivElement = createElement(
          "div",
          ["childrenContainer"],
          container
        );
        const elemEnd = this.createEndElement(container, el, tag, this.random);
        elemStart.style.paddingLeft = `${el.nesting}rem`;
        elemEnd.style.paddingLeft = `${el.nesting}rem`;
        this.styleElements(el, elemStart, elemEnd, elemChild);
      }
    });
  }

  public fillViewerField(activeLevel: number): void {
    this.preBlock.innerHTML = "";
    this.drawActiveLevel(this.preBlock, LevelsList[activeLevel]);
    this.highlightElement();
    this.highlightLinkedElement();
    this.removeHighlightLinkedElement();
    this.emitter.subscribe(
      "highlightElementInViewer",
      this.highlightElementFromBlanketHover.bind(this)
    );
    this.emitter.subscribe(
      "removeHighlightElementFromViewer",
      this.removeHighlightElementFromBlanketHover.bind(this)
    );
  }

  public personalizeElemSet(): void {
    this.elemSet = this.elemSet.splice(1);
    this.elemSet.map((el, i) => el.setAttribute("item", `${i}`));
  }

  public highlightElement(): void {
    this.elements.forEach((item) => {
      item.addEventListener("mouseover", () => {
        if (item.getAttribute("tag") !== "div Blanket") {
          this.emitter.emit("highlightElement", item);
          item.classList.add("highlight");
          this.elements.forEach((elem) => {
            if (
              item.getAttribute("link") !== null &&
              item.getAttribute("link") === elem.getAttribute("link")
            ) {
              elem.classList.add("highlight");
            }
            if (
              item.nextSibling instanceof HTMLDivElement &&
              item.nextSibling.classList.contains("childrenContainer")
            ) {
              item.nextSibling.classList.add("highlight");
            }
            if (
              item.previousSibling instanceof HTMLDivElement &&
              item.previousSibling.classList.contains("childrenContainer")
            ) {
              item.previousSibling.classList.add("highlight");
            }
          });
        }
      });
    });
    this.elements.forEach((item) => {
      item.addEventListener("mouseout", () => {
        this.emitter.emit("removeHighlightElement", item);
        item.classList.remove("highlight");
        this.elements.forEach((elem) => {
          if (
            item.getAttribute("link") !== null &&
            item.getAttribute("link") === elem.getAttribute("link")
          ) {
            elem.classList.remove("highlight");
          }
          if (
            item.nextSibling instanceof HTMLDivElement &&
            item.nextSibling.classList.contains("childrenContainer")
          ) {
            item.nextSibling.classList.remove("highlight");
          }
          if (
            item.previousSibling instanceof HTMLDivElement &&
            item.previousSibling.classList.contains("childrenContainer")
          ) {
            item.previousSibling.classList.remove("highlight");
          }
        });
      });
    });
  }

  public highlightLinkedElement(): void {
    this.personalizeElemSet();
    this.elemSet.forEach((el) => {
      el.addEventListener("mouseover", () => {
        const ident = el.getAttribute("item");
        if (typeof ident === "string") {
          this.emitter.emit("highlightElement", ident);
        }
      });
    });
  }

  public removeHighlightLinkedElement(): void {
    this.elemSet.forEach((el) => {
      el.addEventListener("mouseout", () => {
        const ident = el.getAttribute("item");
        if (typeof ident === "string") {
          this.emitter.emit("removeHighlightElement", ident);
        }
      });
    });
  }

  public highlightElementFromBlanketHover(item: string): void {
    let link: string | null;
    this.elemSet.forEach((el) => {
      if (el.getAttribute("item") === item) {
        el.classList.add("highlight");
        if (el.getAttribute("link")) {
          link = el.getAttribute("link");
        }
        this.elements.forEach((elem) => {
          if (elem.getAttribute("link") === link) {
            elem.classList.add("highlight");
          }
        });
      }
    });
  }

  public removeHighlightElementFromBlanketHover(item: string): void {
    let link: string | null;
    this.elemSet.forEach((el) => {
      if (el.getAttribute("item") === item) {
        el.classList.remove("highlight");
        if (el.getAttribute("link")) {
          link = el.getAttribute("link");
        }
        this.elements.forEach((elem) => {
          if (elem.getAttribute("link") === link) {
            elem.classList.remove("highlight");
          }
        });
      }
    });
  }
}

export default Viewer;
