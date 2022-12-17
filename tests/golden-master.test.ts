import seedrandom from 'seedrandom';

import { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';

import { AnyGame, GameRunner } from '../src/game-runner-v2';
import { Game as GameV2 } from '../src/game-v2';
import { Game } from '../src/game';

describe("Golden master", () => {
  const NUMBER_OF_CHECKS = 10;

  let generator: seedrandom.PRNG;

  const silentLog = sinon
    .stub(console, 'log')
    .callsFake(() => null);

  function combineLogs() {
    const combinedLogs = silentLog.getCalls().reduce((allLogs, currentCall) => {
      allLogs += '\n' + currentCall.args[0];

      return allLogs;
    }, '');

    silentLog.resetHistory();

    return combinedLogs;
  }

  function getGenerator(seed: number) {
    return seedrandom(String(seed))
  }


  it("compares the logs of two game implemetations", () => {
    // given
    const shouldContinueOnWrongAnswer = () => !!Math.floor(generator() * 2);
    const getNumberToRoll = () => Math.floor(generator() * 7);

    for (let seed = 0; seed < NUMBER_OF_CHECKS; seed += 1) {
      // when
      generator = getGenerator(seed);

      GameRunner.main(undefined, shouldContinueOnWrongAnswer, getNumberToRoll);

      const allLogsOriginal = combineLogs();

      // and when
      generator = getGenerator(seed);

      GameRunner.main(new GameV2(), shouldContinueOnWrongAnswer, getNumberToRoll);

      const allLogsRefactored = combineLogs()

      // then
      expect(allLogsOriginal).to.equal(allLogsRefactored);
    }
  });

  describe('penalty box logic', () => {
    function putInPenaltyBoxAndGetOut(game: AnyGame, seed: number) {
      generator = getGenerator(seed);

      // Not entirely convinced that the randomisation is needed here
      const randomInt = Math.floor(generator() * 100)

      const numberThatGetsOutOfPenaltyBox = randomInt % 2 === 0 ? randomInt + 1 : randomInt;
      const numberThatDoesNotGetOutOfPenaltyBox = numberThatGetsOutOfPenaltyBox + 1;

      game.add("SINGLE PLAYER");
      game.roll(numberThatGetsOutOfPenaltyBox);
      game.wrongAnswer();
      game.roll(numberThatGetsOutOfPenaltyBox);
      game.wasCorrectlyAnswered();
      game.roll(numberThatDoesNotGetOutOfPenaltyBox);
      game.wasCorrectlyAnswered();
    }

    it("compares the logs of two game implementations", () => {
      for (let seed = 0; seed < NUMBER_OF_CHECKS; seed += 1) {
        // when
        putInPenaltyBoxAndGetOut(new Game(), seed);

        const allLogsOriginal = combineLogs();

        // and when
        putInPenaltyBoxAndGetOut(new GameV2(), seed);

        const allLogsRefactored = combineLogs()

        // then
        expect(allLogsOriginal).to.equal(allLogsRefactored);
      }
    })

    it("ensures that a player can successfully get out of the penalty box", () => {
      function expectPlayerToHaveLeftPenaltyBox(gameLogs: string) {
        const correctAnswersCount = gameLogs.match(/Answer was correct!!!!/g)?.length;
        expect(correctAnswersCount).to.equal(2);
      }

      for (let seed = 0; seed < NUMBER_OF_CHECKS; seed += 1) {
        // when
        putInPenaltyBoxAndGetOut(new Game(), seed);

        // then
        const gameLogs = combineLogs();
        expectPlayerToHaveLeftPenaltyBox(gameLogs);
      }
    })
  })

});
