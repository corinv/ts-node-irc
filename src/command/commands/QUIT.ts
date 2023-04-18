import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

export default class Quit extends Command {
  name = 'QUIT';
  expectedParams = 0;
  execute({ user }: CommandContext): void {
    if (user) {
      user.release();
    }
  }
}
