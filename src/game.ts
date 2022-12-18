import { AnyGame } from './game-runner';
import { Player, PlayerName } from './Player';
import { Players } from './Players';
import { Questions } from './Questions';

type ShouldProceed = boolean;

export class Game implements AnyGame {

  private players: Players = new Players();
  private questions = new Questions();

  private get currentPlayer(): Player {
    return this.players.currentPlayer;
  }

  public add(name: PlayerName): boolean {
    this.players.add(name);

    console.log(name + " was added");
    console.log("They are player number " + this.players.howMany);

    return true;
  }

  public roll(roll: number) {
    console.log(this.currentPlayer.name + " is the current player");
    console.log("They have rolled a " + roll);

    const shouldProceed = this.handlePenaltyBox(roll);

    if (!shouldProceed) {
      return;
    }

    this.proceedOnRoll(roll);
  }

  public wrongAnswer(): boolean {
    console.log('Question was incorrectly answered');
    console.log(this.currentPlayer.name + " was sent to the penalty box");

    this.currentPlayer.isInPenaltyBox = true;

    this.players.selectNext();

    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    const isCorrect = this.handleCorrectAnswer();

    this.players.selectNext();

    return isCorrect;
  }

  private handlePenaltyBox(roll: number): ShouldProceed {
    if (!this.currentPlayer.isInPenaltyBox) {
      return true;
    }

    this.currentPlayer.isInPenaltyBox = roll % 2 === 0;

    const notification = this.currentPlayer.isInPenaltyBox ?
      "is not getting out of the penalty box" :
      "is getting out of the penalty box";

    console.log(`${this.currentPlayer.name} ${notification}`);

    return !this.currentPlayer.isInPenaltyBox;

  }

  private proceedOnRoll(roll: number) {
    this.currentPlayer.move(roll);

    console.log(this.currentPlayer.name + "'s new location is " + this.currentPlayer.place);
    console.log("The category is " + this.questions.currentCategory(this.currentPlayer.place));

    this.questions.askOne(this.currentPlayer.place);
  }

  private handleCorrectAnswer(): boolean {
    if (this.currentPlayer.isInPenaltyBox) {
      return true;
    }

    console.log('Answer was correct!!!!');

    this.currentPlayer.purse += 1;

    console.log(this.currentPlayer.name + " now has " +
      this.currentPlayer.purse + " Gold Coins.");

    return !(this.currentPlayer.purse == 6);
  }
}
