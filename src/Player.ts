declare const _type: unique symbol;

type Opaque<A, B> = A & {
  readonly [_type]: B
}

type PlayerName = Opaque<string, "PlayerName">;

export class Player {
  isCurrentPlayerGettingOutOfPenaltyBox: boolean = false;
  currentPlayerPlace: number = 0;
  currentPlayerPurse: number = 0;
  isCurrentPlayerInPenaltyBox: boolean = false;

  constructor(currentPlayerName: PlayerName) {
  }
}
