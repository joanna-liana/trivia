export class Questions {
  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push("Rock Question " + i);
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

    if (category == 'Pop') {
      return this.popQuestions;
    }

    if (category == 'Science') {
      return this.scienceQuestions!;
    }

    if (category == 'Sports') {
      return this.sportsQuestions;
    }

    return this.rockQuestions;
  }

  public currentCategory(magicNumber: number): string {
    if ([0, 4, 8].includes(magicNumber)) {
      return 'Pop';
    }

    if ([1, 5, 9].includes(magicNumber)) {
      return 'Science';
    }

    if ([2, 6, 10].includes(magicNumber)) {
      return 'Sports';
    }

    return 'Rock';
  }
}
