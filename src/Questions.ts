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

  public askQuestion(magicNumber: number): void {
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
    if (magicNumber == 0)
      return 'Pop';
    if (magicNumber == 4)
      return 'Pop';
    if (magicNumber == 8)
      return 'Pop';
    if (magicNumber == 1)
      return 'Science';
    if (magicNumber == 5)
      return 'Science';
    if (magicNumber == 9)
      return 'Science';
    if (magicNumber == 2)
      return 'Sports';
    if (magicNumber == 6)
      return 'Sports';
    if (magicNumber == 10)
      return 'Sports';
    return 'Rock';
  }
}
