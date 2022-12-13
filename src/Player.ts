declare const _type: unique symbol;

type Opaque<A, B> = A & {
  readonly [_type]: B
}

type PlayerName = Opaque<string, "PlayerName">;

export class Player {
  currentPlayerPlace: number = 0;
  currentPlayerPurse: number = 0;

  isCurrentPlayerInPenaltyBox: boolean = false;
  isCurrentPlayerGettingOutOfPenaltyBox: boolean = false;

  constructor(currentPlayerName: PlayerName) {
  }
}
