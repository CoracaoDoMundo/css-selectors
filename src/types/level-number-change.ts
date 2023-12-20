import { Event } from "./index";

export class LevelNumberChange implements Event {
  public newNumber: number;

  constructor(newNumber: number) {
    this.newNumber = newNumber;
  }

  public getNumber(): number {
    return this.newNumber;
  }
}
