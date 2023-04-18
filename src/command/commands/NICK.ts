import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

export default class Nick extends Command {
  name = 'NICK';
  expectedParams = 1;
  execute({ user, server }: CommandContext, [nickname]: string[]): void {
    server.setNickname(user, nickname);
  }
}
