import { Event } from "../index";

export class RemoveHighlightElement implements Event {
  public elementIdent: string;

  constructor(elementIdent: string) {
    this.elementIdent = elementIdent;
  }

  public getElementIdent(): string {
    return this.elementIdent;
  }
}
