import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Questions } from '../src/Questions';
import { Logger } from '../src/Logger';

describe("Questions", () => {
  describe("Categories", () => {
    class TestLogger implements Logger {
      loggedQuestions: string[] = [];

      log(message: string) {
        this.loggedQuestions.push(message)
      }
    }

    let logger: TestLogger;

    beforeEach(() => {
      logger = new TestLogger();
    })

    it("have a default set", () => {
      const questions = new Questions({ logger });

      questions.askOne(0);
      questions.askOne(1);
      questions.askOne(2);
      questions.askOne(3);

      expect(logger.loggedQuestions.join('')).to.equal(
        'Pop Question 0' +
        'Science Question 0' +
        'Sports Question 0' +
        'Rock Question 0'
      );
    })

    it("can be extended", () => {
      const questions = new Questions({
        extraCategoryRules: {
          Geography: (magicNumber: number) => [3, 7].includes(magicNumber)
        },
        logger
      });

      questions.askOne(0);
      questions.askOne(1);
      questions.askOne(2);
      questions.askOne(3);
      questions.askOne(123);

      expect(logger.loggedQuestions.join('')).to.equal(
        'Pop Question 0' +
        'Science Question 0' +
        'Sports Question 0' +
        'Geography Question 0' +
        'Rock Question 0'
      );
    })
  })
});
