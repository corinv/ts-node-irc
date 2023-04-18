export class IncorrectNumberOfReplyValuesError extends Error {
  constructor(name: string, expected: number, received: number) {
    super(
      `Incorrect number of values provided to reply ${name}, expected: ${expected} - received: ${received}`,
    );
  }

  get name(): string {
    return this.constructor.name;
  }
}

export class MissingReplyValuesError extends Error {
  constructor(name: string, missing: string[]) {
    super(
      `Expected values missing for reply ${name}: ${missing
        .map((s) => `"${s}"`)
        .join(', ')}`,
    );
  }

  get name(): string {
    return this.constructor.name;
  }
}
