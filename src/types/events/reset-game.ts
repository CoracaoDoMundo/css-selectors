import { Event } from "../index";

export class ResetGame implements Event {
  public newCurrentLevel = 0;

  public solvedLevels = 0;

  public name = "resetGame";

  public getLevelNumber(): number {
    return this.newCurrentLevel;
  }

  public getSolvedLevelsNum(): number {
    return this.solvedLevels;
  }
}
