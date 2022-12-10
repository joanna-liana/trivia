import { Game } from './game';

export class GameRunner {
  public static main(game = new Game(), isWrongAnswer = () => Math.floor(Math.random() * 10) == 7): void {
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let notAWinner;
    do {

      game.roll(Math.floor(Math.random() * 6) + 1);

      if (isWrongAnswer()) {
        notAWinner = game.wrongAnswer();
      } else {
        notAWinner = game.wasCorrectlyAnswered();
      }

    } while (notAWinner);
  }
}
