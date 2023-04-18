import Reply from '../../reply/Reply.js';
import Replies from '../../reply/replies/index.js';
import Command from '../Command.js';
import CommandContext from '../CommandContext.js';

export default class User extends Command {
  name = 'USER';
  expectedParams = 4;
  execute(
    { user, server }: CommandContext,
    [username, hostname, servername, realname]: string[],
  ): void {
    if (user.registered) {
      return user.send(new Reply(Replies.Error.ERR_ALREADYREGISTRED));
    }
    user.setUserInfo(username, hostname, servername, realname);
    //motd required for irssi to recognise connection
    const motdStart = new Reply(Replies.Command.RPL_MOTDSTART, {
      server: server.config.serverName,
    });
    const motd = new Reply(Replies.Command.RPL_MOTD, {
      text: server.config.motd,
    });
    const motdEnd = new Reply(Replies.Command.RPL_ENDOFMOTD);

    user.send([motdStart, motd, motdEnd]);
  }
}
