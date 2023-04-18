import Config from './config/Config.js';
import IrcServer from './server/IrcServer.js';

const config = new Config();
const server = new IrcServer(config);
server.listen(config.port);
