export class NotEnoughPlayers extends Error {
  constructor() {
    super('There are not enough players to start the game');
  }
}
