import CommandContext from './CommandContext.js';

export default abstract class Command {
  abstract name: string;
  abstract expectedParams: number;
  abstract execute(context: CommandContext, args: string[]): void;
}
