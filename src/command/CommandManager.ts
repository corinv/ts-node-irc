import Reply from '../reply/Reply.js';
import Replies from '../reply/replies/index.js';
import User from '../user/User.js';
import Command from './Command.js';
import CommandContext from './CommandContext.js';
import { ICommandManager } from '../interfaces/ICommandManager.js';
import { IIrcServer } from '../interfaces/IIrcServer.js';

export default class CommandManager implements ICommandManager {
  private commands: Record<string, Command> = {};

  constructor(private server: IIrcServer) {}
  registerCommand(command: Command): void {
    this.commands[command.name.toUpperCase()] = command;
  }

  registerCommands(commands: Record<string, Command>): void;
  registerCommands(commands: Command[]): void;
  registerCommands(commands: Record<string, Command> | Command[]): void {
    if (commands instanceof Array === false) {
      commands = Object.values(commands);
    }
    for (const command of commands as Command[]) {
      this.registerCommand(command);
    }
  }

  execute(name: string, args: string[], user: User): void;
  execute(command: Command, args: string[], user: User): void;
  execute(nameOrCommand: string | Command, args: string[], user: User): void {
    const context: CommandContext = {
      user,
      server: this.server,
    };
    const name =
      nameOrCommand instanceof Command ? nameOrCommand.name : nameOrCommand;
    const nameToUpper = name.toUpperCase();
    const command = this.commands[nameToUpper];
    if (!command) {
      return user?.send(
        new Reply(Replies.Error.ERR_UNKNOWNCOMMAND, {
          command: nameToUpper,
        }),
      );
    }
    args = args.filter((s) => s.length !== 0);
    if (args.length < command.expectedParams) {
      user.send(
        new Reply(Replies.Error.ERR_NEEDMOREPARAMS, {
          command: nameToUpper,
        }),
      );
    }
    command.execute(context, args);
  }
}
