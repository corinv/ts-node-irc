import { IIrcServer } from '../interfaces/IIrcServer.js';
import User from '../user/User.js';
type CommandContext = {
  user: User;
  server: IIrcServer;
};
export default CommandContext;
