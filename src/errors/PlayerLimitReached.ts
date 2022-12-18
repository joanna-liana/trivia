export class PlayerLimitReached extends Error {
  constructor() {
    super('The maximum number of players has been reached');
  }
}
