import { describe, it } from 'mocha';
import * as sinon from 'sinon';
import { GameRunner } from '../src/game-runner-v2';
import { Game } from '../src/game';

describe("Game runner", () => {
  it("stops the game on a right answer", () => {
    const game = sinon.createStubInstance(Game);
    game.wrongAnswer.returns(false);
    const shouldContinueOnWrongAnswer = () => true;

    GameRunner.main(game, shouldContinueOnWrongAnswer);

    sinon.assert.calledOnce(game.wrongAnswer);
    sinon.assert.calledOnce(game.roll);
  })

  it("stops the game on a wrong answer", () => {
    const game = sinon.createStubInstance(Game);
    game.wasCorrectlyAnswered.returns(false);
    const shouldContinueOnWrongAnswer = () => false;

    GameRunner.main(game, shouldContinueOnWrongAnswer);

    sinon.assert.calledOnce(game.wasCorrectlyAnswered);
    sinon.assert.calledOnce(game.roll);
  })
});
