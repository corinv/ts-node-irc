import Message from '../../message/Message.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

const PONG_COMMAND = 'PONG';

export default class Ping extends Command {
  name = 'PING';
  expectedParams = 1;
  execute({ user, server }: CommandContext, params: string[]): void {
    const pong = new Message(server.config.serverName, PONG_COMMAND, [
      server.config.serverName,
      ...params,
    ]);
    user.send(pong);
  }
}
