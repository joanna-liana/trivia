import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Game } from '../src/game-v2';
import { PlayerName } from '../src/Player';
import { PlayerLimitReached } from '../src/errors/PlayerLimitReached';

describe("Game", () => {
  describe("The maximum number of players", () => {
    it("can be limited", () => {
      const MAX_PLAYERS = 6;

      const game = new Game({ maxPlayers: MAX_PLAYERS });

      for (let i = 0; i < MAX_PLAYERS; i++) {
        game.add(<PlayerName>`PLAYER ${i}`);
      }

      expect(() => game.add(<PlayerName>'EXTRA PLAYER')).to.throw(PlayerLimitReached);
    })

    it("can be unlimited", () => {
      const game = new Game();

      for (let i = 0; i < 1000; i++) {
        expect(() => game.add(<PlayerName>`PLAYER ${i}`)).not.to.throw();
      }
    })
  })
});
