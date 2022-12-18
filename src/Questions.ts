const POP = 'Pop';
const SCIENCE = 'Science';
const SPORTS = 'Sports';
const ROCK = 'Rock';

export class Questions {
  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push(POP + " Question " + i);
      this.scienceQuestions.push(SCIENCE + " Question " + i);
      this.sportsQuestions.push(SPORTS + " Question " + i);
      this.rockQuestions.push(ROCK + " Question " + i);
    }
  }

  public askOne(magicNumber: number): void {
    const question = this.chooseOne(magicNumber);

    console.log(question);
  }

  private chooseOne(magicNumber: number): string {
    const currentCategoryQuestions = this.currentCategoryQuestions(magicNumber);

    return currentCategoryQuestions.shift()!;
  }

  private currentCategoryQuestions(magicNumber: number): string[] {
    const category = this.currentCategory(magicNumber);

    if (category == POP) {
      return this.popQuestions;
    }

    if (category == SCIENCE) {
      return this.scienceQuestions!;
    }

    if (category == SPORTS) {
      return this.sportsQuestions;
    }

    return this.rockQuestions;
  }

  public currentCategory(magicNumber: number): string {
    if ([0, 4, 8].includes(magicNumber)) {
      return POP;
    }

    if ([1, 5, 9].includes(magicNumber)) {
      return SCIENCE;
    }

    if ([2, 6, 10].includes(magicNumber)) {
      return SPORTS;
    }

    return ROCK;
  }
}
