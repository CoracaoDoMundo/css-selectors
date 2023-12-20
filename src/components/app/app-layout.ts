import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import "./app.css";
import { Icon } from "../../types/index";
import { mailData, fbData, twitterData, ghData, rsData } from "../../types/svg";
import { createElement } from "../service-functions";
import Levels from "../levels/levels";
import Blanket from "../blanket/blanket";
import Viewer from "../html-viewer/html-viewer";
import Input from "../input/input";

hljs.registerLanguage("css", css);

class AppLayout {
  public levelHeader: HTMLHeadingElement = document.createElement("h1");

  public levelsBlock: HTMLDivElement = document.createElement("div");

  public body: HTMLElement = document.body;

  public levels = new Levels();

  public blanket = new Blanket();

  public viewerBlock = new Viewer();

  private containerTransformCoordinates = "translate(-60.000000, -7521.000000)";

  private secondContainerTransformCoordinates =
    "translate(56.000000, 160.000000)";

  public draw(): void {
    this.drawGameBlock();
    this.levelsBlock.classList.add("levelsBlock");
    this.levels.drawLevelsBlock(this.levelsBlock);
    document.body.append(this.levelsBlock);
  }

  public drawHeader(gameBlock: HTMLDivElement): HTMLDivElement {
    const headerLine: HTMLDivElement = createElement(
      "div",
      ["headerLine"],
      gameBlock
    );
    createElement("h1", ["header"], headerLine, "Summer CSS");
    const socialBlock: HTMLDivElement = createElement(
      "div",
      ["socialBlock"],
      headerLine
    );
    createElement("span", ["header"], socialBlock, "Share");
    const mailIcon: SVGSVGElement = this.renderIcon(mailData);
    socialBlock.append(mailIcon);
    const fbIcon: SVGSVGElement = this.renderIcon(fbData);
    socialBlock.append(fbIcon);
    const twitterIcon: SVGSVGElement = this.renderIcon(twitterData);
    socialBlock.append(twitterIcon);
    const burgerIcon: HTMLDivElement = createElement(
      "div",
      ["burgerIcon"],
      socialBlock
    );
    let i = 0;
    while (i < 3) {
      createElement("span", ["burgerIconLine"], burgerIcon);
      i += 1;
    }
    return burgerIcon;
  }

  public drawCodeField(gameBlock: HTMLDivElement): void {
    this.levelHeader.classList.add("levelHeader");
    this.levelHeader.textContent = "Select the slates";
    gameBlock.append(this.levelHeader);
    this.blanket.draw(gameBlock);
    this.blanket.drawLevelItems(this.levels.activeLevel);
    const codeField: HTMLDivElement = createElement(
      "div",
      ["codeField"],
      gameBlock
    );
    const editorHeadingLine: HTMLDivElement = createElement(
      "div",
      ["editorHeaderLine"],
      codeField
    );
    createElement("span", ["editorTitle"], editorHeadingLine, "CSS Editor");
    createElement("span", ["subtitle"], editorHeadingLine, "style.css");
    const codeHeadingLine: HTMLDivElement = createElement(
      "div",
      ["viewerHeaderLine"],
      codeField
    );
    createElement("span", ["viewerTitle"], codeHeadingLine, "HTML Viewer");
    createElement("span", ["subtitle"], codeHeadingLine, "beach.html");
    const editorNumLines: HTMLDivElement = createElement(
      "div",
      ["numbers", "editorNums"],
      codeField
    );
    for (let i = 0; i < 20; i += 1) {
      createElement("span", ["num"], editorNumLines, (i + 1).toString(10));
    }
    const codingFieldBlock: HTMLDivElement = createElement(
      "div",
      ["codingFieldBlock"],
      codeField
    );
    const codeViewerNumLines: HTMLDivElement = createElement(
      "div",
      ["numbers", "viewerNums"],
      codeField
    );
    for (let i = 0; i < 20; i += 1) {
      createElement("span", ["num"], codeViewerNumLines, (i + 1).toString(10));
    }
    const input = new Input(this.levels, this.blanket);
    input.draw(codingFieldBlock, codeField);
    const codeText: HTMLPreElement = createElement(
      "pre",
      ["codeText"],
      codingFieldBlock,
      `{\n /* Style would go here. */ \n}`
    );
    hljs.highlightBlock(codeText);
    this.viewerBlock.draw(codeField, this.levels.activeLevel);
  }

  public drawFooter(gameBlock: HTMLDivElement): void {
    const footer: HTMLDivElement = createElement("div", ["footer"], gameBlock);
    const gitHubFooter: HTMLDivElement = createElement(
      "div",
      ["ghContainer"],
      footer
    );
    const ghLogo: SVGSVGElement = this.renderIcon(ghData);
    gitHubFooter.append(ghLogo);
    const ghLink: HTMLAnchorElement = createElement(
      "a",
      ["ghLink"],
      gitHubFooter,
      "@CoracaoDoMundo"
    );
    ghLink.href = "https://github.com/CoracaoDoMundo";
    createElement("span", ["year"], footer, "© 2023");
    const rsLogoLink: HTMLAnchorElement = createElement(
      "a",
      ["rsLogoLink"],
      footer
    );
    rsLogoLink.setAttribute("href", "https://rs.school");
    const rsLogo: SVGSVGElement = this.renderIcon(rsData);
    rsLogoLink.append(rsLogo);
  }

  public drawGameBlock(): void {
    const gameBlock: HTMLDivElement = createElement(
      "div",
      ["gameBlock"],
      document.body
    );
    const shadow: HTMLDivElement = createElement(
      "div",
      ["burgerShadow"],
      gameBlock
    );
    const burgerIcon = this.drawHeader(gameBlock);
    this.drawCodeField(gameBlock);
    this.drawFooter(gameBlock);
    this.openMenuByBurgerIcon(burgerIcon, this.levelsBlock, shadow);
  }

  private placeIcon(
    icon: SVGSVGElement,
    data: Icon,
    container: SVGGraphicsElement,
    containerSecond: SVGGraphicsElement,
    firstPath: SVGPathElement
  ): void {
    if (data.gQuantity === 0) {
      icon.append(firstPath);
    } else if (data.gQuantity === 1) {
      icon.append(container);
      container.append(firstPath);
    }
    if (data.gQuantity === 2) {
      container.setAttribute("transform", this.containerTransformCoordinates);
      container.setAttribute("fill", data.color);
      containerSecond.setAttribute(
        "transform",
        this.secondContainerTransformCoordinates
      );
      icon.append(container);
      container.append(containerSecond);
      containerSecond.append(firstPath);
    }
  }

  private renderIcon(data: Icon): SVGSVGElement {
    const icon: SVGSVGElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    icon.setAttribute("viewBox", data.viewBox);
    icon.setAttribute("enable-background", "new 0 0 64 64");
    icon.classList.add("icon");
    const container: SVGGraphicsElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    const containerSecond: SVGGraphicsElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    const firstPath: SVGPathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    firstPath.setAttribute("d", data.path);
    firstPath.setAttribute("fill", data.color);
    if (data.pathSecond) {
      const secondPath: SVGPathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      secondPath.setAttribute("d", data.pathSecond);
      secondPath.setAttribute("fill", data.color);
      if (data.gQuantity === 0) {
        icon.append(secondPath);
      } else {
        container.append(secondPath);
      }
    }
    if (data.pathThird) {
      const thirdPath: SVGPathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      thirdPath.setAttribute("d", data.pathThird);
      thirdPath.setAttribute("fill", data.color);
      icon.append(thirdPath);
    }
    this.placeIcon(icon, data, container, containerSecond, firstPath);

    return icon;
  }

  public openMenuByBurgerIcon(
    icon: HTMLDivElement,
    menu: HTMLDivElement,
    shadow: HTMLDivElement
  ): void {
    icon.addEventListener("click", () => {
      menu.classList.add("menuActive");
      shadow.classList.add("shadowActive");
      this.body.classList.add("noScroll");
    });
    menu.addEventListener("click", (e) => {
      if (e.target instanceof HTMLDivElement) {
        if (!e.target.classList.contains("levelItemBlock")) {
          menu.classList.remove("menuActive");
          shadow.classList.remove("shadowActive");
          this.body.classList.remove("noScroll");
        }
      }
    });
    shadow.addEventListener("click", () => {
      menu.classList.remove("menuActive");
      shadow.classList.remove("shadowActive");
      this.body.classList.remove("noScroll");
    });
  }
}

export default AppLayout;
