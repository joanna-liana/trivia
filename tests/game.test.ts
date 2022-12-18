import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Game } from '../src/game-v2';
import { PlayerName } from '../src/Player';

class PlayerLimitReached extends Error {
  constructor() {
    super('The maximum number of players has been reached')
  }
}

describe("Game", () => {
  it("The maximum number of player can be limited", () => {
    const MAX_PLAYERS = 6;

    const game = new Game({ maxPlayers: MAX_PLAYERS });

    for (let i = 0; i < MAX_PLAYERS; i++) {
      game.add(<PlayerName>`PLAYER ${i}`);
    }

    expect(() => game.add(<PlayerName>'EXTRA PLAYER')).to.throw(PlayerLimitReached)
  })
});
