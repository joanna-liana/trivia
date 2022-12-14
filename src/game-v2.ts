import { AnyGame } from './game-runner-v2';
import { Player, PlayerName } from './Player';

export class Game implements AnyGame {

  private playersV2: Array<Player> = [];
  private currentPlayerIndex: number = 0;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  private isCurrentPlayerGettingOutOfPenaltyBox: boolean = false;

  private get currentPlayerName(): PlayerName {
    return this.playersV2[this.currentPlayerIndex].name;
  }

  private get currentPlayerPlace(): number {
    return this.playersV2[this.currentPlayerIndex].place;
  }

  private set currentPlayerPlace(newPlace: number) {
    this.playersV2[this.currentPlayerIndex].place = newPlace;
  }

  private get currentPlayerPurse(): number {
    return this.playersV2[this.currentPlayerIndex].purse
  }

  private set currentPlayerPurse(purseState: number) {
    this.playersV2[this.currentPlayerIndex].purse = purseState
  }

  private get isCurrentPlayerInPenaltyBox(): boolean {
    return this.playersV2[this.currentPlayerIndex].isInPenaltyBox;
  }

  private set isCurrentPlayerInPenaltyBox(isIn: boolean) {
    this.playersV2[this.currentPlayerIndex].isInPenaltyBox = isIn;
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
    this.playersV2.push(new Player(name));

    console.log(name + " was added");
    console.log("They are player number " + this.howManyPlayers());

    return true;
  }

  private howManyPlayers(): number {
    return this.playersV2.length;
  }

  public roll(roll: number) {
    console.log(this.currentPlayerName + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.isCurrentPlayerInPenaltyBox) {
      this.isCurrentPlayerGettingOutOfPenaltyBox = roll % 2 != 0;

      if (this.isCurrentPlayerGettingOutOfPenaltyBox) {
        console.log(this.currentPlayerName + " is getting out of the penalty box");
      } else {
        console.log(this.currentPlayerName + " is not getting out of the penalty box");

        return;
      }
    }

    this.proceedOnRoll(roll);
  }

  private proceedOnRoll(roll: number) {
    this.currentPlayerPlace = this.currentPlayerPlace + roll;

    if (this.currentPlayerPlace > 11) {
      this.currentPlayerPlace = this.currentPlayerPlace - 12;
    }

    console.log(this.currentPlayerName + "'s new location is " + this.currentPlayerPlace);
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
    if (this.currentPlayerPlace == 0)
      return 'Pop';
    if (this.currentPlayerPlace == 4)
      return 'Pop';
    if (this.currentPlayerPlace == 8)
      return 'Pop';
    if (this.currentPlayerPlace == 1)
      return 'Science';
    if (this.currentPlayerPlace == 5)
      return 'Science';
    if (this.currentPlayerPlace == 9)
      return 'Science';
    if (this.currentPlayerPlace == 2)
      return 'Sports';
    if (this.currentPlayerPlace == 6)
      return 'Sports';
    if (this.currentPlayerPlace == 10)
      return 'Sports';
    return 'Rock';
  }

  private didPlayerWin(): boolean {
    return !(this.currentPlayerPurse == 6)
  }

  public wrongAnswer(): boolean {
    console.log('Question was incorrectly answered');
    console.log(this.currentPlayerName + " was sent to the penalty box");

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

    console.log(this.currentPlayerName + " now has " +
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
