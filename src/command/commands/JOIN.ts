import { InvalidChannelNameError } from '../../channel/errors.js';
import Message from '../../message/Message.js';
import Reply from '../../reply/Reply.js';
import Replies from '../../reply/replies/index.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

export default class Join extends Command {
  name = 'JOIN';
  expectedParams = 1;
  execute({ user, server }: CommandContext, [key]: string[]): void {
    let channel = server.getChannel(key);

    if (!channel) {
      try {
        channel = server.createChannel(key, user);
      } catch (err) {
        if (err instanceof InvalidChannelNameError) {
          return user.send(
            new Reply(Replies.Error.ERR_BADCHANNELKEY, {
              channel: key,
            }),
          );
        }
        throw err;
      }
    } else {
      channel.addUser(user);
    }
    const topicReply = new Reply(Replies.Command.RPL_TOPIC, {
      channel: channel.name,
      topic: channel.topic,
    });

    const usersReply = new Reply(Replies.Command.RPL_NAMREPLY, {
      channel: channel.name,
      nicks: channel.users.map((u) => u.nickname).join(' '),
    });

    const usersEndReply = new Reply(Replies.Command.RPL_ENDOFNAMES, {
      channel: channel.name,
    });
    channel.send(new Message(user, this.name, [channel.name]));
    user.send([topicReply, usersReply, usersEndReply]);
  }
}
