import Message from '../../message/Message.js';
import Reply from '../../reply/Reply.js';
import Replies from '../../reply/replies/index.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

// TODO handle permissions, once implemented

export default class Topic extends Command {
  name = 'TOPIC';
  expectedParams = 1;
  execute(
    { user, server }: CommandContext,
    [channelKey, topic]: string[],
  ): void {
    const channel = server.getChannel(channelKey);

    if (!channel || !user.isOnChannel(channel)) {
      return user.send(
        new Reply(Replies.Error.ERR_NOTONCHANNEL, {
          channel: channelKey,
        }),
      );
    }

    if (topic) {
      channel.setTopic(topic);
      channel.send(new Message(user, this.name, [channel.name, channel.topic]));
    } else {
      user.send(
        new Reply(Replies.Command.RPL_TOPIC, {
          channel: channel.name,
          topic: channel.topic,
        }),
      );
    }
  }
}
