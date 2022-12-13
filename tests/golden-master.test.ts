import seedrandom from 'seedrandom';

import { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';

import { GameRunner } from '../src/game-runner-v2';
import { Game as GameV2 } from '../src/game-v2';

describe("Golden master", () => {
  const NUMBER_OF_CHECKS = 10;

  it("compares the logs of two game implemetations", () => {
    // given
    let generator: seedrandom.PRNG;

    const silentLog = sinon
      .stub(console, 'log')
      .callsFake(() => null);

    function combineLogs() {
      const combinedLogs = silentLog.getCalls().reduce((allLogs, currentCall) => {
        allLogs += currentCall.args[0];

        return allLogs;
      }, '');

      silentLog.resetHistory();

      return combinedLogs;
    }

    function getGenerator(seed: number) {
      return seedrandom(String(seed))
    }

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
});
