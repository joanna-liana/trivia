import { AnyGame } from './game-runner';
import { Player, PlayerName } from './Player';
import { Players } from './Players';
import { Questions } from './Questions';
import { NotEnoughPlayers } from './errors/NotEnoughPlayers';

type ShouldProceed = boolean;

interface GameRules {
  maxPlayers?: number;
}

export class GameInProgress {
  private get currentPlayer(): Player {
    return this.players.currentPlayer;
  }

  constructor(private players: Players, private questions: Questions = new Questions()) {
    if (players.howMany < 2) {
      throw new NotEnoughPlayers();
    }
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

    this.askQuestion();
  }

  private askQuestion() {
    const question = this.questions.chooseOne(this.currentPlayer.place);

    console.log(question);
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

export class Game implements AnyGame {

  private gameInProgress?: GameInProgress;
  private rules: GameRules;
  private players: Players = new Players();

  constructor(rules?: Partial<GameRules>) {
    this.rules = {
      ...rules,
    };

    this.players = new Players(this.rules.maxPlayers);
  }

  public add(name: PlayerName): boolean {
    this.players.add(name);

    console.log(name + " was added");
    console.log("They are player number " + this.players.howMany);

    return true;
  }

  public roll(roll: number) {
    if (!this.gameInProgress) {
      this.gameInProgress = new GameInProgress(this.players);
    }

    this.gameInProgress.roll(roll);
  }

  public wrongAnswer(): boolean {
    return this.gameInProgress!.wrongAnswer();
  }

  public wasCorrectlyAnswered(): boolean {
    return this.gameInProgress!.wasCorrectlyAnswered();
  }
}
