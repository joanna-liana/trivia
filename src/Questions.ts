enum BaseCategory {
  POP = 'Pop',
  SCIENCE = 'Science',
  SPORTS = 'Sports',
  ROCK = 'Rock',
}

type ExtendedCategories = BaseCategory | string;
type CategorySelector = (magicNumber: number) => boolean
type SelectCategoryRules = Record<ExtendedCategories, CategorySelector>;

type Props = {
  extraCategoryRules?: SelectCategoryRules;
};

export class Questions {
  private DEFAULT_CATEGORY = BaseCategory.ROCK;

  private categorySelectionRules: SelectCategoryRules = {
    [BaseCategory.POP]: (magicNumber) => [0, 4, 8].includes(magicNumber),
    [BaseCategory.SCIENCE]: (magicNumber) => [1, 5, 9].includes(magicNumber),
    [BaseCategory.SPORTS]: (magicNumber) => [2, 6, 10].includes(magicNumber),
  }

  private questions: Record<string, string[]> = {
    Pop: [],
    Rock: [],
    Science: [],
    Sports: []
  }

  constructor({ extraCategoryRules }: Props = {}) {
    if (extraCategoryRules) {
      Object.entries(extraCategoryRules).forEach(([category, selectionRule]) => {
        this.categorySelectionRules[category as ExtendedCategories] = selectionRule;
        this.questions[category as ExtendedCategories] = [];
      })
    }

    for (let i = 0; i < 50; i++) {
      Object.keys(this.questions).forEach((category) => {
        this.questions[category as BaseCategory].push(category + " Question " + i)
      });
    }
  }

  public askOne(magicNumber: number): void {
    const question = this.chooseOne(magicNumber);

    console.log(question);
  }

  public chooseOne(magicNumber: number): string {
    const currentCategoryQuestions = this.currentCategoryQuestions(magicNumber);

    return currentCategoryQuestions.shift()!;
  }

  private currentCategoryQuestions(magicNumber: number): string[] {
    const category = this.currentCategory(magicNumber);

    return this.questions[category];
  }

  public currentCategory(magicNumber: number): ExtendedCategories {
    for (const entries of Object.entries(this.categorySelectionRules)) {
      const [category, shouldBeSelected] = entries;

      if (shouldBeSelected(magicNumber)) {
        return category;
      }
    }

    return this.DEFAULT_CATEGORY;
  }
}
