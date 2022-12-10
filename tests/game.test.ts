import * as sinon from 'sinon';
import { describe, it } from 'mocha';
import { GameRunner } from '../src/game-runner-v2';
import { Game } from '../src/game';

describe('The test environment', () => {
  it("characterises the current behaviour - 1", () => {
    const game = sinon.createStubInstance(Game);
    const shouldContinueOnWrongAnswer = () => true;

    GameRunner.main(game, shouldContinueOnWrongAnswer);

    sinon.assert.calledOnce(game.wrongAnswer);
    sinon.assert.calledOnce(game.roll);
  })

  it("characterises the current behaviour - 2", () => {
    const game = sinon.createStubInstance(Game);
    const shouldContinueOnWrongAnswer = () => false;

    GameRunner.main(game, shouldContinueOnWrongAnswer);

    sinon.assert.calledOnce(game.wasCorrectlyAnswered);
    sinon.assert.calledOnce(game.roll);
  })
});
