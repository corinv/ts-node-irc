export class NicknameAccessedBeforeBeingSetError extends Error {
  constructor() {
    super(`Attempt to access user nickname before it was set`);
  }

  get name(): string {
    return this.constructor.name;
  }
}
