import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Questions } from '../src/Questions';

describe("Questions", () => {
  describe("Categories", () => {
    it("have a default set", () => {
      const questions = new Questions();

      expect(questions.currentCategory(0)).to.equal("Pop");
      expect(questions.currentCategory(1)).to.equal("Science");
      expect(questions.currentCategory(2)).to.equal("Sports");
      expect(questions.currentCategory(3)).to.equal("Rock");
    })

    it("can be extended", () => {
      const questions = new Questions({
        extraCategoryRules: {
          Geography: (magicNumber) => [3, 7].includes(magicNumber)
        }
      });

      expect(questions.currentCategory(0)).to.equal("Pop");
      expect(questions.currentCategory(1)).to.equal("Science");
      expect(questions.currentCategory(2)).to.equal("Sports");
      expect(questions.currentCategory(3)).to.equal("Geography");
      expect(questions.currentCategory(123)).to.equal("Rock");
    })
  })
});
