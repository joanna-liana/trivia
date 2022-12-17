import { AnyGame } from './game-runner-v2';
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
    this.currentPlayer.place = this.currentPlayer.place + roll;

    if (this.currentPlayer.place > 11) {
      this.currentPlayer.place = this.currentPlayer.place - 12;
    }

    console.log(this.currentPlayer.name + "'s new location is " + this.currentPlayer.place);
    console.log("The category is " + this.questions.currentCategory(this.currentPlayer.place));

    this.questions.askQuestion(this.currentPlayer.place);
  }

  private didPlayerWin(): boolean {
    return !(this.currentPlayer.purse == 6)
  }

  public wrongAnswer(): boolean {
    console.log('Question was incorrectly answered');
    console.log(this.currentPlayer.name + " was sent to the penalty box");

    this.currentPlayer.isInPenaltyBox = true;

    this.players.selectNext();

    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.currentPlayer.isInPenaltyBox) {
      this.players.selectNext();

      return true;
    }

    console.log('Answer was correct!!!!');

    this.currentPlayer.purse += 1;

    console.log(this.currentPlayer.name + " now has " +
      this.currentPlayer.purse + " Gold Coins.");

    var isWinner = this.didPlayerWin();

    this.players.selectNext();

    return isWinner;
  }
}
