import EventEmitter from 'events';
import User from '../user/User.js';
import ChannelEvents from './events.js';
import UserEvents from '../user/events.js';
import Message from '../message/Message.js';
import { InvalidChannelNameError } from './errors.js';

// Server channels can only be joined by clients directly connected to the server
const SERVER_CHANNEL_PREFIX = '&';
const NETWORK_CHANNEL_PREFIX = '#';

export type ChannelPrefix =
  | typeof SERVER_CHANNEL_PREFIX
  | typeof NETWORK_CHANNEL_PREFIX;

export default class Channel extends EventEmitter {
  private prefix: ChannelPrefix;
  private _name: string;
  private _users: User[];
  private _topic = '';
  constructor(key: string, user: User, private _private: boolean = false) {
    super();
    const prefix = key[0];
    const name = key.substring(1);

    if (!this.isValidChannelName(name) || !this.isValidPrefix(prefix)) {
      throw new InvalidChannelNameError(name);
    }
    this._name = name;
    this.prefix = prefix;
    this._users = [user];
  }

  private isValidPrefix(str: string): str is ChannelPrefix {
    return (
      str.length === 1 &&
      (str === SERVER_CHANNEL_PREFIX || str === NETWORK_CHANNEL_PREFIX)
    );
  }

  private isValidChannelName(str: string): boolean {
    // eslint-disable-next-line no-control-regex
    const VALID_CHANNEL_NAME_REGEX = /^[^(\u0007|,| )]+$/;
    const MAX_CHANNEL_NAME_LENGTH = 200;

    return (
      str.length > 0 ||
      str.length <= MAX_CHANNEL_NAME_LENGTH - 1 || // -1 for the separate prefix
      VALID_CHANNEL_NAME_REGEX.test(str)
    );
  }

  get name(): string {
    return `${this.prefix}${this._name}`;
  }

  get topic(): string {
    return this._topic;
  }

  get private(): boolean {
    return this._private;
  }

  get users(): User[] {
    return [...this._users];
  }

  setTopic(topic: string): void {
    this._topic = topic;
  }

  send(response: Message, sender?: User): void {
    for (const user of this._users) {
      if (sender && user === sender) continue;
      user.send(response);
    }
  }

  addUser(user: User): void {
    if (this._users.indexOf(user) !== -1) {
      return; // user already in channel
    }
    this._users.push(user);
    user.joinChannel(this);
    user.on(UserEvents.Delete, () => this.removeUser(user));
  }

  removeUser(user: User): void {
    const idx = this._users.indexOf(user);

    if (idx === -1) {
      return;
    } else {
      this._users.splice(idx, 1);
      user.leaveChannel(this);
    }
    this.emit(ChannelEvents.UserLeft);
  }

  getUsersCount(): number {
    return this._users.length;
  }

  release(): void {
    this.emit(ChannelEvents.Delete);
  }

  static isValidChannelName(str: string): boolean {
    return (
      str[0] === SERVER_CHANNEL_PREFIX || str[0] === NETWORK_CHANNEL_PREFIX
    );
  }
}
