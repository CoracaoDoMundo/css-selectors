import { Event } from "../index";

export class RemoveHighlightBlanketElement implements Event {
  public elementIdent: string;

  public name = "removeHighlightBlanketElement";

  constructor(elementIdent: string) {
    this.elementIdent = elementIdent;
  }

  public getElementIdent(): string {
    return this.elementIdent;
  }
}
