import Command from '../Command.js';
import Join from './JOIN.js';
import List from './LIST.js';
import Mode from './MODE.js';
import Nick from './NICK.js';
import Part from './PART.js';
import Ping from './PING.js';
import PrivMsg from './PRIVMSG.js';
import Quit from './QUIT.js';
import Topic from './TOPIC.js';
import User from './USER.js';
import Who from './WHO.js';

const Commands: Record<string, Command> = {
  Join: new Join(),
  Quit: new Quit(),
  Nick: new Nick(),
  List: new List(),
  Part: new Part(),
  PrivMsg: new PrivMsg(),
  User: new User(),
  Topic: new Topic(),
  Who: new Who(),
  Mode: new Mode(),
  Ping: new Ping(),
};

// Optional, or specified in a later spec, these should be gracefully ignored
const UnimplementedRegistrationCommands = ['CAP', 'PASS'];

export const UnregisteredCommands: string[] = [
  ...UnimplementedRegistrationCommands,
  Commands.Nick.name,
  Commands.User.name,
];

export default Commands;
