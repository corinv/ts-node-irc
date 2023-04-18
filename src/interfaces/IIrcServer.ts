import Channel from '../channel/Channel.js';
import { IConfig } from '../config/IConfig.js';
import User from '../user/User.js';
import { ICommandManager } from './ICommandManager.js';

export interface IIrcServer {
  channels: Channel[];
  commandManager: ICommandManager;
  config: IConfig;
  getChannel: (str: string) => Channel | undefined;
  createChannel: (str: string, user: User) => Channel;
  setNickname: (user: User, str: string) => void;
  getUser: (str: string) => User | undefined;
}
