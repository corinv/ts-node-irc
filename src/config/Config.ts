import { IConfig } from './IConfig.js';

const DEVELOPMENT_NODE_ENV = 'development';

class Config implements IConfig {
  readonly serverName = process.env.SERVER_NAME || 'ts-irc-server';
  readonly port = process.env.PORT ? Number(process.env.PORT || 0) : 6667;
  readonly motd =
    process.env.MOTD || `Welcome to the ${this.serverName} server`;
  readonly isDevelopment = process.env.NODE_ENV === DEVELOPMENT_NODE_ENV;
}

export default Config;
