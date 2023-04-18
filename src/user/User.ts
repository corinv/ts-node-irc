import { Socket } from 'net';
import { IConnection } from '../interfaces/IConnection.js';
import { ISendable } from '../interfaces/ISendable.js';
import Reply from '../reply/Reply.js';
import Replies from '../reply/replies/index.js';
import Channel from '../channel/Channel.js';
import { splitIncomingData } from './utils.js';
import Message from '../message/Message.js';
import Commands, { UnregisteredCommands } from '../command/commands/index.js';
import EventEmitter from 'events';
import UserEvents from './events.js';
import { IIrcServer } from '../interfaces/IIrcServer.js';
import { UnableToParseMessageError } from '../message/errors.js';

export default class User extends EventEmitter implements IConnection {
  private _channels: Channel[] = [];
  private _operator = false;
  private _registered = false;
  private _nickname?: string;
  private _username?: string;
  private _hostname?: string;
  private _realname?: string;
  private _servername?: string;

  constructor(
    readonly id: string,
    private socket: Socket,
    private server: IIrcServer,
  ) {
    super();
    socket.on('data', (data) => this.onMessages(data));
    socket.on('close', () => this.onDisconnect());
    socket.on('error', (err) => this.onError(err));
  }

  private onMessages(data: Buffer): void {
    const lines = splitIncomingData(data.toString());
    const messages: Message[] = [];
    for (const line of lines) {
      try {
        messages.push(new Message(line));
      } catch (err) {
        if (err instanceof UnableToParseMessageError) {
          this.send(
            new Reply(Replies.Error.ERR_UNKNOWNCOMMAND, {
              command: '',
            }),
          );
        } else {
          this.send(this.errorToReply(err as Error));
        }
      }
    }

    for (const message of messages) {
      if (
        !this._registered &&
        !UnregisteredCommands.includes(message.command)
      ) {
        this.send(new Reply(Replies.Error.ERR_NOTREGISTERED, {}));
        continue;
      }

      try {
        this.server.commandManager.execute(
          message.command,
          message.parameters,
          this,
        );
      } catch (err) {
        if (err instanceof Error) {
          this.send(this.errorToReply(err));
        }
      }
    }
  }

  private onDisconnect(): void {
    const DISCONNECT_QUIT_STR = 'user disconnected';
    this.server.commandManager.execute(
      Commands.Quit,
      [DISCONNECT_QUIT_STR],
      this,
    );
  }

  private onError(err: Error): void {
    console.error(err); // todo logging
  }

  private errorToReply(err: Error): Reply[];
  private errorToReply(errs: Error[]): Reply[];
  private errorToReply(errOrErrs: Error | Error[]): Reply[] {
    if (errOrErrs instanceof Array<Error>) {
      const replies: Reply[] = [];
      for (const e of errOrErrs) {
        replies.push(...this.errorToReply(e));
      }
      return replies;
    } else {
      if (errOrErrs instanceof Reply) {
        return [errOrErrs];
      } // if all else fails, and is an internal error
      const PROD_INTERNAL_ERROR_STR = 'please contact the system administrator';
      const message = this.server.config.isDevelopment
        ? errOrErrs.message
        : PROD_INTERNAL_ERROR_STR;

      const reply = new Reply(Replies.Error.ERR_INTERNALSERVER, {
        message,
      });
      return [reply];
    }
  }

  send(replyOrReplies: ISendable | ISendable[]): void {
    const replies: ISendable[] = !(replyOrReplies instanceof Array<ISendable>)
      ? [replyOrReplies]
      : replyOrReplies;
    for (const reply of replies) {
      const str = reply.toString(this.server.config.serverName, this.mask);
      this.socket.write(str);
    }
  }

  get operator(): boolean {
    return this._operator;
  }

  get nickname(): string {
    if (this._nickname === undefined) {
      const UNREGISTERED_NICKNAME = 'unregistered';
      return UNREGISTERED_NICKNAME;
    }
    return this._nickname;
  }

  get username(): string {
    return this._username || '';
  }
  get hostname(): string {
    return this._hostname || '';
  }
  get servername(): string {
    return this._servername || '';
  }
  get realname(): string {
    return this._realname || '';
  }

  get mask(): string {
    if (this._registered) {
      return `${this._nickname}!${this._username}@${this._hostname}`;
    } else if (this._nickname) {
      return this.nickname;
    } else {
      return '';
    }
  }
  setNickname(str: string): void {
    const NICKNAME_MAX_LENGTH = 9;
    if (str.length > NICKNAME_MAX_LENGTH) {
      return this.send(
        new Reply(Replies.Error.ERR_ERRONEUSNICKNAME, {
          nick: str,
        }),
      );
    }
    if (!this._nickname) this._nickname = str;
  }

  joinChannel(channel: Channel): void {
    if (this._channels.indexOf(channel) !== -1) {
      return this.send(
        new Reply(Replies.Error.ERR_USERONCHANNEL, {
          user: this.nickname,
          channel: channel.name,
        }),
      );
    }
    channel.on('delete', () => this.leaveChannel(channel));
    this._channels.push(channel);
  }

  leaveChannel(channel: Channel): void {
    const idx = this._channels.indexOf(channel);
    if (idx === -1) {
      return this.send(
        new Reply(Replies.Error.ERR_NOTONCHANNEL, {
          channel: channel.name,
        }),
      );
    }
    this._channels.splice(idx, 1);
  }

  setUserInfo(
    username: string,
    hostname: string,
    servername: string,
    realname: string,
  ): void {
    this._username = username;
    this._hostname = hostname;
    this._servername = servername;
    this._realname = realname;
    this.updateRegistration();
  }

  updateRegistration(): void {
    if (this.nickname !== undefined && this.username !== undefined) {
      this._registered = true;
    }
  }
  get registered(): boolean {
    return this._registered;
  }

  get channels(): Channel[] {
    return this._channels;
  }

  isOnChannel(channel: Channel): boolean {
    return this._channels.indexOf(channel) !== -1;
  }

  release(): void {
    this.socket.end();
    this.emit(UserEvents.Delete);
  }
}
