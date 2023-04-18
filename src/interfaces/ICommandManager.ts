import User from '../user/User.js';
import Command from '../command/Command.js';

export interface ICommandManager {
  registerCommand(command: Command): void;
  registerCommands(commands: Record<string, Command>): void;
  registerCommands(commands: Command[]): void;
  registerCommands(commands: Record<string, Command> | Command[]): void;

  execute(name: string, args: string[], user: User): void;
  execute(command: Command, args: string[], user: User): void;
}
