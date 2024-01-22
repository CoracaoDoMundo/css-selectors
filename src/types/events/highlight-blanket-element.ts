import { Event } from "../index";

export class HighlightBlanketElement implements Event {
  public elementIdent: string;

  public name = "highlightBlanketElement";

  constructor(elementIdent: string) {
    this.elementIdent = elementIdent;
  }

  public getElementIdent(): string {
    return this.elementIdent;
  }
}
