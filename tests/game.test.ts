import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Game } from '../src/game-v2';

describe("Game", () => {
  it("The maximum number of player can be limited", () => {
    const MAX_PLAYERS = 6;

    const game = new Game({ maxPlayers: MAX_PLAYERS });

    for (let i = 0; i < 6; i++) {
      game.add(`PLAYER ${i}`);
    }

    expect(() => game.add('EXTRA PLAYER')).to.throw(PlayerLimitReached)
  })
});
