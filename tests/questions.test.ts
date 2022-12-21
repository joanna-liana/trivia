import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Questions } from '../src/Questions';
import { Logger } from '../src/Logger';

describe("Questions", () => {
  describe("Categories", () => {
    let selectedQuestions: string[];

    class TestLogger implements Logger {
      loggedQuestions: string[] = [];

      log(message: string) {
        this.loggedQuestions.push(message)
      }
    }

    let logger: TestLogger;

    beforeEach(() => {
      logger = new TestLogger();
      selectedQuestions = [];
    })

    it("have a default set", () => {
      const questions = new Questions({ logger });

      selectedQuestions.push(questions.chooseOne(0));
      selectedQuestions.push(questions.chooseOne(1));
      selectedQuestions.push(questions.chooseOne(2));
      selectedQuestions.push(questions.chooseOne(3));

      expect(selectedQuestions.join('')).to.equal(
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

      selectedQuestions.push(questions.chooseOne(0));
      selectedQuestions.push(questions.chooseOne(1));
      selectedQuestions.push(questions.chooseOne(2));
      selectedQuestions.push(questions.chooseOne(3));
      selectedQuestions.push(questions.chooseOne(123));

      expect(selectedQuestions.join('')).to.equal(
        'Pop Question 0' +
        'Science Question 0' +
        'Sports Question 0' +
        'Geography Question 0' +
        'Rock Question 0'
      );
    })
  })
});
