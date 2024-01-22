import { Event } from "../index";

export class GiveHint implements Event {
  public hint = true;

  public name = "giveHint";

  public getHintStatus(): boolean {
    return this.hint;
  }
}
