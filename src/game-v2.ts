import { AnyGame } from './game-runner-v2';

declare const _type: unique symbol;

type Opaque<A, B> = A & {
  readonly [_type]: B
}

type PlayerName = Opaque<string, "PlayerName">;

export class Game implements AnyGame {

  private players: Array<PlayerName> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayerIndex: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  private get currentPlayerName(): PlayerName {
    return this.players[this.currentPlayerIndex];
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
    this.players.push(name);
    this.places[this.howManyPlayers()] = 0;
    this.purses[this.howManyPlayers()] = 0;
    this.inPenaltyBox[this.howManyPlayers()] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(this.currentPlayerName + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayerIndex]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(this.currentPlayerName + " is getting out of the penalty box");
        this.places[this.currentPlayerIndex] = this.places[this.currentPlayerIndex] + roll;
        if (this.places[this.currentPlayerIndex] > 11) {
          this.places[this.currentPlayerIndex] = this.places[this.currentPlayerIndex] - 12;
        }

        console.log(this.currentPlayerName + "'s new location is " + this.places[this.currentPlayerIndex]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(this.currentPlayerName + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {

      this.places[this.currentPlayerIndex] = this.places[this.currentPlayerIndex] + roll;
      if (this.places[this.currentPlayerIndex] > 11) {
        this.places[this.currentPlayerIndex] = this.places[this.currentPlayerIndex] - 12;
      }

      console.log(this.currentPlayerName + "'s new location is " + this.places[this.currentPlayerIndex]);
      console.log("The category is " + this.currentCategory());
      this.askQuestion();
    }
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
    if (this.places[this.currentPlayerIndex] == 0)
      return 'Pop';
    if (this.places[this.currentPlayerIndex] == 4)
      return 'Pop';
    if (this.places[this.currentPlayerIndex] == 8)
      return 'Pop';
    if (this.places[this.currentPlayerIndex] == 1)
      return 'Science';
    if (this.places[this.currentPlayerIndex] == 5)
      return 'Science';
    if (this.places[this.currentPlayerIndex] == 9)
      return 'Science';
    if (this.places[this.currentPlayerIndex] == 2)
      return 'Sports';
    if (this.places[this.currentPlayerIndex] == 6)
      return 'Sports';
    if (this.places[this.currentPlayerIndex] == 10)
      return 'Sports';
    return 'Rock';
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayerIndex] == 6)
  }

  public wrongAnswer(): boolean {
    console.log('Question was incorrectly answered');
    console.log(this.currentPlayerName + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayerIndex] = true;

    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex == this.players.length)
      this.currentPlayerIndex = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayerIndex]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        this.purses[this.currentPlayerIndex] += 1;
        console.log(this.currentPlayerName + " now has " +
          this.purses[this.currentPlayerIndex] + " Gold Coins.");

        var winner = this.didPlayerWin();
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length)
          this.currentPlayerIndex = 0;

        return winner;
      } else {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length)
          this.currentPlayerIndex = 0;
        return true;
      }


    } else {

      console.log("Answer was corrent!!!!");

      this.purses[this.currentPlayerIndex] += 1;
      console.log(this.currentPlayerName + " now has " +
        this.purses[this.currentPlayerIndex] + " Gold Coins.");

      var winner = this.didPlayerWin();

      this.currentPlayerIndex += 1;
      if (this.currentPlayerIndex == this.players.length)
        this.currentPlayerIndex = 0;

      return winner;
    }
  }

}
