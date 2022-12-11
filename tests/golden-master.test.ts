import seedrandom from 'seedrandom';

import { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';

import { GameRunner } from '../src/game-runner-v2';
import { Game as GameV2 } from '../src/game-v2';

describe("Golden master", () => {
  const NUMBER_OF_CHECKS = 100;

  it("compares two outputs", () => {
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

    const shouldContinueOnWrongAnswer = () => generator() % 2 === 0;
    const getNumberToRoll = () => generator();

    for (let seed = 0; seed < NUMBER_OF_CHECKS; seed += 1) {
      // when
      generator = getGenerator(seed);

      GameRunner.main(undefined, shouldContinueOnWrongAnswer, getNumberToRoll);

      const allLogs1 = combineLogs();

      // and when
      generator = getGenerator(seed);

      GameRunner.main(new GameV2(), shouldContinueOnWrongAnswer, getNumberToRoll);

      const allLogs2 = combineLogs()

      // then
      expect(allLogs1).to.equal(allLogs2);
    }
  });
});
