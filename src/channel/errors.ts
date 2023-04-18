export class InvalidChannelNameError extends Error {
  constructor(name: string) {
    super(`Provided channel name ${name} is not valid`);
  }

  get name(): string {
    return this.constructor.name;
  }
}
