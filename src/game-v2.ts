import { AnyGame } from './game-runner-v2';
import { Player, PlayerName } from './Player';

export class Game implements AnyGame {

  private players: Array<Player> = [];
  private currentPlayerIndex: number = 0;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  private isCurrentPlayerGettingOutOfPenaltyBox: boolean = false;

  private get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  private get currentPlayerPurse(): number {
    return this.currentPlayer.purse
  }

  private set currentPlayerPurse(purseState: number) {
    this.currentPlayer.purse = purseState
  }

  private get isCurrentPlayerInPenaltyBox(): boolean {
    return this.currentPlayer.isInPenaltyBox;
  }

  private set isCurrentPlayerInPenaltyBox(isIn: boolean) {
    this.currentPlayer.isInPenaltyBox = isIn;
  }
  constructor() {

    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  private createRockQuestion(index: number): string {
    return "Rock Question " + index;
  }

  public add(name: PlayerName): boolean {
    this.players.push(new Player(name));

    console.log(name + " was added");
    console.log("They are player number " + this.howManyPlayers());

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(this.currentPlayer.name + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.isCurrentPlayerInPenaltyBox) {
      this.isCurrentPlayerGettingOutOfPenaltyBox = roll % 2 != 0;

      if (this.isCurrentPlayerGettingOutOfPenaltyBox) {
        console.log(this.currentPlayer.name + " is getting out of the penalty box");
      } else {
        console.log(this.currentPlayer.name + " is not getting out of the penalty box");

        return;
      }
    }

    this.proceedOnRoll(roll);
  }

  private proceedOnRoll(roll: number) {
    this.currentPlayer.place = this.currentPlayer.place + roll;

    if (this.currentPlayer.place > 11) {
      this.currentPlayer.place = this.currentPlayer.place - 12;
    }

    console.log(this.currentPlayer.name + "'s new location is " + this.currentPlayer.place);
    console.log("The category is " + this.currentCategory());

    this.askQuestion();
  }

  private askQuestion(): void {
    if (this.currentCategory() == 'Pop')
      console.log(this.popQuestions.shift());
    if (this.currentCategory() == 'Science')
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == 'Sports')
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == 'Rock')
      console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    if (this.currentPlayer.place == 0)
      return 'Pop';
    if (this.currentPlayer.place == 4)
      return 'Pop';
    if (this.currentPlayer.place == 8)
      return 'Pop';
    if (this.currentPlayer.place == 1)
      return 'Science';
    if (this.currentPlayer.place == 5)
      return 'Science';
    if (this.currentPlayer.place == 9)
      return 'Science';
    if (this.currentPlayer.place == 2)
      return 'Sports';
    if (this.currentPlayer.place == 6)
      return 'Sports';
    if (this.currentPlayer.place == 10)
      return 'Sports';
    return 'Rock';
  }

  private didPlayerWin(): boolean {
    return !(this.currentPlayerPurse == 6)
  }

  public wrongAnswer(): boolean {
    console.log('Question was incorrectly answered');
    console.log(this.currentPlayer.name + " was sent to the penalty box");

    this.isCurrentPlayerInPenaltyBox = true;

    this.selectNextPlayer();

    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.isCurrentPlayerInPenaltyBox && !this.isCurrentPlayerGettingOutOfPenaltyBox) {
      this.selectNextPlayer();

      return true;
    }

    this.logCorrectAnswer();

    this.currentPlayerPurse += 1;

    console.log(this.currentPlayer.name + " now has " +
      this.currentPlayerPurse + " Gold Coins.");

    var isWinner = this.didPlayerWin();

    this.selectNextPlayer();

    return isWinner;
  }

  private logCorrectAnswer() {
    if (this.isCurrentPlayerInPenaltyBox) {
      console.log('Answer was correct!!!!');
    } else {
      console.log("Answer was corrent!!!!");
    }
  }

  private selectNextPlayer() {
    this.currentPlayerIndex += 1;

    if (this.currentPlayerIndex == this.howManyPlayers())
      this.currentPlayerIndex = 0;
  }
}
