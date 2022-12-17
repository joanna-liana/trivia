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
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  public askOne(magicNumber: number): void {
    if (this.currentCategory(magicNumber) == 'Pop')
      console.log(this.popQuestions.shift());
    if (this.currentCategory(magicNumber) == 'Science')
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory(magicNumber) == 'Sports')
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory(magicNumber) == 'Rock')
      console.log(this.rockQuestions.shift());
  }

  private createRockQuestion(index: number): string {
    return "Rock Question " + index;
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
