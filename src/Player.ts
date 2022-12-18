declare const _type: unique symbol;

type Opaque<A, B> = A & {
  readonly [_type]: B
}

export type PlayerName = Opaque<string, "PlayerName">;

export class Player {
  place: number = 0;
  purse: number = 0;

  isInPenaltyBox: boolean = false;

  constructor(public readonly name: PlayerName, private readonly maxPlace = 12) {
  }

  move(places: number) {
    this.place += places;

    if (this.place >= this.maxPlace) {
      this.place -= this.maxPlace;
    }
  }
}
