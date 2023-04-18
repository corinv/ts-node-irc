import { Server, ServerOpts } from 'net';
import crypto from 'crypto';
import CommandManager from '../command/CommandManager.js';
import Commands from '../command/commands/index.js';
import User from '../user/User.js';
import Replies from '../reply/replies/index.js';
import Reply from '../reply/Reply.js';
import Channel from '../channel/Channel.js';
import { IConfig } from '../config/IConfig.js';
import { IIrcServer } from '../interfaces/IIrcServer.js';

export default class IrcServer extends Server implements IIrcServer {
  private users: Map<string, User> = new Map<string, User>();
  private _channels: Map<string, Channel> = new Map<string, Channel>();
  readonly commandManager: CommandManager;
  constructor(readonly config: IConfig, options?: ServerOpts) {
    super(options);
    this.commandManager = new CommandManager(this);
    this.commandManager.registerCommands(Commands);

    this.on('connection', (socket) => {
      const userId = crypto.randomUUID();
      const user = new User(userId, socket, this);
      this.users.set(userId, user);
      socket.on('end', () => this.onSocketEnd(user));
    });
  }

  onSocketEnd(user: User): void {
    user.release();
    this.users.delete(user.id);
  }

  createChannel(key: string, user: User): Channel {
    if (this._channels.get(key)) {
      const CHANNEL_ALREADY_EXISTS_STR = 'channel already exists';
      user.send(
        new Reply(Replies.Error.ERR_INTERNALSERVER, {
          message: CHANNEL_ALREADY_EXISTS_STR,
        }),
      );
    }
    const channel = new Channel(key, user);
    this._channels.set(channel.name, channel);
    user.joinChannel(channel);
    return channel;
  }

  private nicknameExists(nickname: string): boolean {
    return Object.values(this.users).some((u) => u.nickname === nickname);
  }

  setNickname(user: User, nickname: string): void {
    if (!nickname) {
      return user.send(new Reply(Replies.Error.ERR_NONICKNAMEGIVEN, {}));
    }
    if (this.nicknameExists(nickname)) {
      return user.send(
        new Reply(Replies.Error.ERR_NICKNAMEINUSE, {
          nick: nickname,
        }),
      );
    }
    user.setNickname(nickname);
  }

  onUserLeftChannel(channel: Channel): void {
    if (channel.getUsersCount() === 0) {
      channel.release();
      this._channels.delete(channel.name);
    }
  }

  getChannel(key: string): Channel | undefined {
    return this._channels.get(key);
  }

  getUser(nick: string): User | undefined {
    return Array.from(this.users.values()).find((u) => u.nickname === nick);
  }

  get channels(): Channel[] {
    return Array.from(this._channels.values());
  }
}
