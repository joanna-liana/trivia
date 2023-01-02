import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Game } from '../src/game';
import { PlayerName } from '../src/Player';
import { PlayerLimitReached } from '../src/errors/PlayerLimitReached';
import { NotEnoughPlayers } from '../src/errors/NotEnoughPlayers';

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

  describe("The required number of players", () => {
    let game: Game;

    beforeEach(() => {
      game = new Game();
    })

    function beginGame() {
      return game.roll(1);
    }

    function addPlayers(playerCount: number) {
      for (let i = 0; i < playerCount; i++) {
        game.add(<PlayerName>`PLAYER ${i}`);
      }
    }

    describe("cannot be fewer than 2", () => {
      [2, 3, 10].forEach(playerCount => {
        it(`${playerCount}`, () => {
          addPlayers(playerCount);

          expect(() => beginGame()).to.throw(NotEnoughPlayers);
        })
      })
    })

    describe("can be 2 or more", () => {
      [2, 3, 10].forEach(playerCount => {
        it(`${playerCount}`, () => {
          addPlayers(playerCount);

          expect(() => beginGame()).not.to.throw(NotEnoughPlayers);
        })
      })
    })
  })
});
