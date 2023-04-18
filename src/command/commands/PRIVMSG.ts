import Reply from '../../reply/Reply.js';
import Replies from '../../reply/replies/index.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';
import User from '../../user/User.js';
import Message from '../../message/Message.js';
import Channel from '../../channel/Channel.js';

export default class PrivMsg extends Command {
  name = 'PRIVMSG';
  expectedParams = 2;
  execute(
    { server, user }: CommandContext,
    [recieverKeysStr, text]: string[],
  ): void {
    const recieverKeys = recieverKeysStr.split(',');

    if (!text) {
      return user.send(new Reply(Replies.Error.ERR_NOTEXTTOSEND, {}));
    }

    const channels: Channel[] = [];
    const users: User[] = [];
    const errors: Reply[] = [];

    for (const key of recieverKeys) {
      if (Channel.isValidChannelName(key)) {
        const channel = server.getChannel(key);
        if (!channel) {
          errors.push(
            new Reply(Replies.Error.ERR_NORECIPIENT, {
              command: this.name,
            }),
          );
        } else {
          channels.push(channel);
          if (!user.isOnChannel(channel)) {
            errors.push(
              new Reply(Replies.Error.ERR_CANNOTSENDTOCHAN, {
                channel: channel.name,
              }),
            );
          }
        }
      } else {
        // is user, todo add mask matching
        const targetUser = server.getUser(key);
        if (!targetUser) {
          errors.push(
            new Reply(Replies.Error.ERR_NORECIPIENT, {
              command: this.name,
            }),
          );
        } else {
          users.push(targetUser);
        }
      }
    }

    if (errors.length) {
      throw errors;
    }

    for (const channel of channels) {
      channel.send(new Message(user, this.name, [channel.name, text]), user);
    }
    for (const targetUser of users) {
      targetUser.send(new Message(user, this.name, [user.nickname, text]));
    }
  }
}
