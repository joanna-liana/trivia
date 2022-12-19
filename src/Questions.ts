enum Category {
  POP = 'Pop',
  SCIENCE = 'Science',
  SPORTS = 'Sports',
  ROCK = 'Rock',
}

type RawCategory = string;
type SelectCategoryRules = Record<RawCategory, (magicNumber: number) => boolean>;

export class Questions {
  private DEFAULT_CATEGORY = Category.ROCK;

  private categorySelectionRules: SelectCategoryRules = {
    [Category.POP]: (magicNumber) => [0, 4, 8].includes(magicNumber),
    [Category.SCIENCE]: (magicNumber) => [1, 5, 9].includes(magicNumber),
    [Category.SPORTS]: (magicNumber) => [2, 6, 10].includes(magicNumber),
  }

  private questions: Record<Category | string, Array<string>> = {
    Pop: [],
    Rock: [],
    Science: [],
    // TODO: not all enum values are required
    Sports: []
  }

  constructor({ extraCategoryRules }: { extraCategoryRules?: SelectCategoryRules } = {}) {
    if (extraCategoryRules) {
      Object.entries(extraCategoryRules).forEach(([category, selectionRule]) => {
        this.questions[category] = [];
        this.categorySelectionRules[category] = selectionRule;
      })
    }


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

  // TODO: use generic Category type if possible
  public currentCategory(magicNumber: number): RawCategory {
    for (const entries of Object.entries(this.categorySelectionRules)) {
      const [category, shouldBeSelected] = entries;

      if (shouldBeSelected(magicNumber)) {
        return category;
      }
    }

    return this.DEFAULT_CATEGORY;
  }
}
