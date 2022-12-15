import { Player, PlayerName } from './Player';

export class Players {

  public readonly players: Array<Player> = [];
  private currentPlayerIndex: number = 0;

  public get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  public get howMany(): number {
    return this.players.length;
  }

  public add(name: PlayerName): void {
    this.players.push(new Player(name));
  }

  public selectNext(): void {
    this.currentPlayerIndex += 1;

    if (this.currentPlayerIndex == this.howMany)
      this.currentPlayerIndex = 0;
  }
}
