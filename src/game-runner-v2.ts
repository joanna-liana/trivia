import { Game } from './game';

export class GameRunner {
  public static main(game = new Game(), shouldContinueOnWrongAnswer = () => Math.floor(Math.random() * 10) == 7): void {
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let isGameOn: boolean;

    do {

      game.roll(Math.floor(Math.random() * 6) + 1);

      if (shouldContinueOnWrongAnswer()) {
        isGameOn = game.wrongAnswer();
      } else {
        isGameOn = game.wasCorrectlyAnswered();
      }

    } while (isGameOn);
  }
}
