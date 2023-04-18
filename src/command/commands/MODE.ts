import Channel from '../../channel/Channel.js';
import Reply from '../../reply/Reply.js';
import Replies from '../../reply/replies/index.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

export default class Mode extends Command {
  name = 'MODE';
  expectedParams = 1;
  execute({ user, server }: CommandContext, [name]: string[]): void {
    if (Channel.isValidChannelName(name)) {
      const channel = server.getChannel(name);
      if (channel) {
        user.send(
          new Reply(Replies.Command.RPL_CHANNELMODEIS, {
            mode: '+',
            channel: channel.name,
            modeparams: '',
          }),
        );
      }
    }
  }
}
