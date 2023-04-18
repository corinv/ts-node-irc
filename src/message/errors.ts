export class UnableToParseMessageError extends Error {
  constructor() {
    super(`Unable to parse recieved message`);
  }

  get name(): string {
    return this.constructor.name;
  }
}
