import Reply from '../../reply/Reply.js';
import Replies from '../../reply/replies/index.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

const PRIVATE_SYMBOL = 'Prv'; // as per specification

export default class List extends Command {
  name = 'LIST';
  expectedParams = 0;
  execute({ user, server }: CommandContext): void {
    const startReply = new Reply(Replies.Command.RPL_LISTSTART, {});

    const replies = [startReply];
    for (const channel of server.channels) {
      replies.push(
        new Reply(Replies.Command.RPL_LIST, {
          channel: channel.private ? PRIVATE_SYMBOL : channel.name,
          count: channel.private ? '' : String(channel.getUsersCount()),
          topic: channel.private ? '' : channel.topic,
        }),
      );
    }
    const endReply = new Reply(Replies.Command.RPL_LISTEND, {});
    replies.push(endReply);
    user.send(replies);
  }
}
