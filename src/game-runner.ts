import { Game } from './game';

export interface AnyGame {
  add(name: string): boolean;
  roll(number: number): void;
  wrongAnswer(): boolean;
  wasCorrectlyAnswered(): boolean;
}

export class GameRunner {
  public static main(
    game: AnyGame = new Game(),
    shouldContinueOnWrongAnswer = () => Math.floor(Math.random() * 10) == 7,
    getNumberToRoll = () => Math.floor(Math.random() * 6) + 1
  ): void {
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let isGameOn: boolean;

    do {

      game.roll(getNumberToRoll());

      if (shouldContinueOnWrongAnswer()) {
        isGameOn = game.wrongAnswer();
      } else {
        isGameOn = game.wasCorrectlyAnswered();
      }

    } while (isGameOn);
  }
}
