enum Category {
  POP = 'Pop',
  SCIENCE = 'Science',
  SPORTS = 'Sports',
  ROCK = 'Rock',
}

export class Questions {
  private questions: Record<Category, Array<string>> = {
    Pop: [],
    Rock: [],
    Science: [],
    Sports: []
  }

  constructor() {
    for (let i = 0; i < 50; i++) {
      Object.keys(this.questions).forEach((category) => {
        this.questions[category as Category].push(category + " Question " + i)
      });
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

    return this.questions[category];
  }

  public currentCategory(magicNumber: number): Category {
    if ([0, 4, 8].includes(magicNumber)) {
      return Category.POP;
    }

    if ([1, 5, 9].includes(magicNumber)) {
      return Category.SCIENCE;
    }

    if ([2, 6, 10].includes(magicNumber)) {
      return Category.SPORTS;
    }

    return Category.ROCK;
  }
}
