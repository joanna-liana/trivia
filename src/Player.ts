declare const _type: unique symbol;

type Opaque<A, B> = A & {
  readonly [_type]: B
}

export type PlayerName = Opaque<string, "PlayerName">;

export class Player {
  place: number = 0;
  purse: number = 0;

  isInPenaltyBox: boolean = false;

  constructor(public readonly name: PlayerName) {
  }
}
