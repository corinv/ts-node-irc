import Channel from '../../channel/Channel.js';
import { ISendable } from '../../interfaces/ISendable.js';
import Reply from '../../reply/Reply.js';
import Replies from '../../reply/replies/index.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

export default class Who extends Command {
  name = 'WHO';
  expectedParams = 1;
  execute({ user, server }: CommandContext, [name]: string[]): void {
    const replies: ISendable[] = [];
    if (Channel.isValidChannelName(name)) {
      const channel = server.getChannel(name);
      if (channel) {
        for (const cu of channel.users) {
          replies.push(
            new Reply(Replies.Command.RPL_WHOREPLY, {
              channel: channel.name,
              user: cu.username,
              host: cu.hostname,
              server: server.config.serverName,
              nick: cu.nickname,
              hopcount: '0', //server is not networked, hopcount is always 0,
              real: cu.realname,
            }),
          );
        }
      }
    } else {
      //todo, add mask matching for non channel matching names
      replies.push(
        new Reply(Replies.Command.RPL_ENDOFWHO, {
          name,
        }),
      );
      user.send(replies);
    }
  }
}
