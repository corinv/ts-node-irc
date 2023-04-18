import Channel from '../../channel/Channel.js';
import Message from '../../message/Message.js';
import Reply from '../../reply/Reply.js';
import Replies from '../../reply/replies/index.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

export default class Part extends Command {
  name = 'PART';
  expectedParams = 1;
  execute({ user, server }: CommandContext, [channelKeysStr]: string[]): void {
    const channelKeys = channelKeysStr.split(',');
    if (!channelKeys.length) {
      return user.send(new Reply(Replies.Error.ERR_NEEDMOREPARAMS, {}));
    }
    const channels: Channel[] = [];
    const errors: Reply[] = [];
    for (const key of channelKeys) {
      const channel = server.getChannel(key);
      if (!channel) {
        errors.push(
          new Reply(Replies.Error.ERR_NOSUCHCHANNEL, {
            channel: key,
          }),
        );
      } else {
        if (!user.isOnChannel(channel)) {
          return user.send(new Reply(Replies.Error.ERR_NOTONCHANNEL));
        }
        channels.push(channel);
      }
    }

    if (errors.length) {
      return user.send(errors);
    }

    for (const channel of channels) {
      channel.send(new Message(user, this.name, [channel.name]));
      channel.removeUser(user);
    }
  }
}
