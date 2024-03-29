import { Event } from "../index";

export class LevelNumberChanged implements Event {
  public newNumber: number;

  public name = "levelNumberChanged";

  constructor(newNumber: number) {
    this.newNumber = newNumber;
  }

  public getNumber(): number {
    return this.newNumber;
  }
}
