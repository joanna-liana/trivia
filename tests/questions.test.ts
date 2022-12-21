import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Questions } from '../src/Questions';

describe("Questions", () => {
  describe("Categories", () => {
    let selectedQuestions: string[];

    beforeEach(() => {
      selectedQuestions = [];
    })

    it("have a default set", () => {
      const questions = new Questions();

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
        }
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
