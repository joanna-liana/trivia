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

  private currentCategory(randomNumber: number): string {
    if (randomNumber == 0)
      return 'Pop';
    if (randomNumber == 4)
      return 'Pop';
    if (randomNumber == 8)
      return 'Pop';
    if (randomNumber == 1)
      return 'Science';
    if (randomNumber == 5)
      return 'Science';
    if (randomNumber == 9)
      return 'Science';
    if (randomNumber == 2)
      return 'Sports';
    if (randomNumber == 6)
      return 'Sports';
    if (randomNumber == 10)
      return 'Sports';
    return 'Rock';
  }
}
