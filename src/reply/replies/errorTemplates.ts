import ReplyTemplate from '../ReplyTemplate.js';

const ERR_NOSUCHNICK: ReplyTemplate = {
  name: 'ERR_NOSUCHNICK',
  code: 401,
  templateString: '<nickname> :No such nick/channel',
  symbols: ['nickname'],
};

const ERR_NOSUCHSERVER: ReplyTemplate = {
  name: 'ERR_NOSUCHSERVER',
  code: 402,
  templateString: '<server> :No such server',
  symbols: ['server'],
};

const ERR_NOSUCHCHANNEL: ReplyTemplate = {
  name: 'ERR_NOSUCHCHANNEL',
  code: 403,
  templateString: '<channel> :No such channel',
  symbols: ['channel'],
};

const ERR_CANNOTSENDTOCHAN: ReplyTemplate = {
  name: 'ERR_CANNOTSENDTOCHAN',
  code: 404,
  templateString: '<channel> :Cannot send to channel',
  symbols: ['channel'],
};

const ERR_TOOMANYCHANNELS: ReplyTemplate = {
  name: 'ERR_TOOMANYCHANNELS',
  code: 405,
  templateString: '<channel> :You have joined too many channels',
  symbols: ['channel'],
};

const ERR_WASNOSUCHNICK: ReplyTemplate = {
  name: 'ERR_WASNOSUCHNICK',
  code: 406,
  templateString: '<nickname> :There was no such nickname',
  symbols: ['nickname'],
};

const ERR_NOORIGIN: ReplyTemplate = {
  name: 'ERR_NOORIGIN',
  code: 409,
  templateString: ':No origin specified',
  symbols: [],
};

const ERR_NORECIPIENT: ReplyTemplate = {
  name: 'ERR_NORECIPIENT',
  code: 411,
  templateString: ':No recipient given (<command>)',
  symbols: ['command'],
};

const ERR_NOTEXTTOSEND: ReplyTemplate = {
  name: 'ERR_NOTEXTTOSEND',
  code: 412,
  templateString: ':No text to send',
  symbols: [],
};

const ERR_NOTOPLEVEL: ReplyTemplate = {
  name: 'ERR_NOTOPLEVEL',
  code: 413,
  templateString: '<mask> :No toplevel domain specified',
  symbols: ['mask'],
};

const ERR_WILDTOPLEVEL: ReplyTemplate = {
  name: 'ERR_WILDTOPLEVEL',
  code: 414,
  templateString: '<mask> :Wildcard in toplevel domain',
  symbols: ['mask'],
};

const ERR_UNKNOWNCOMMAND: ReplyTemplate = {
  name: 'ERR_UNKNOWNCOMMAND',
  code: 421,
  templateString: '<command> :Unknown command',
  symbols: ['command'],
};

const ERR_NOMOTD: ReplyTemplate = {
  name: 'ERR_NOMOTD',
  code: 422,
  templateString: ':MOTD File is missing',
  symbols: [],
};

const ERR_NOADMININFO: ReplyTemplate = {
  name: 'ERR_NOADMININFO',
  code: 423,
  templateString: '<server> :No administrative info available',
  symbols: ['server'],
};

const ERR_FILEERROR: ReplyTemplate = {
  name: 'ERR_FILEERROR',
  code: 424,
  templateString: ':File error doing <file op> on <file>',
  symbols: ['file op', 'file'],
};

const ERR_NONICKNAMEGIVEN: ReplyTemplate = {
  name: 'ERR_NONICKNAMEGIVEN',
  code: 431,
  templateString: ':No nickname given',
  symbols: [],
};

const ERR_ERRONEUSNICKNAME: ReplyTemplate = {
  name: 'ERR_ERRONEUSNICKNAME',
  code: 432,
  templateString: '<nick> :Erroneus nickname',
  symbols: ['nick'],
};

const ERR_NICKNAMEINUSE: ReplyTemplate = {
  name: 'ERR_NICKNAMEINUSE',
  code: 433,
  templateString: '<nick> :Nickname is already in use',
  symbols: ['nick'],
};

const ERR_NICKCOLLISION: ReplyTemplate = {
  name: 'ERR_NICKCOLLISION',
  code: 436,
  templateString: '<nick> :Nickname collision KILL',
  symbols: ['nick'],
};

const ERR_USERNOTINCHANNEL: ReplyTemplate = {
  name: 'ERR_USERNOTINCHANNEL',
  code: 441,
  templateString: "<nick> <channel> :They aren't on that channel",
  symbols: ['nick', 'channel'],
};

const ERR_NOTONCHANNEL: ReplyTemplate = {
  name: 'ERR_NOTONCHANNEL',
  code: 442,
  templateString: "<channel> :you're not on that channel",
  symbols: ['channel'],
};

const ERR_USERONCHANNEL: ReplyTemplate = {
  name: 'ERR_USERONCHANNEL',
  code: 443,
  templateString: '<user> <channel> :is already on channel',
  symbols: ['user', 'channel'],
};

const ERR_NOLOGIN: ReplyTemplate = {
  name: 'ERR_NOLOGIN',
  code: 444,
  templateString: '<user> :User not logged in',
  symbols: ['user'],
};

const ERR_SUMMONDISABLED: ReplyTemplate = {
  name: 'ERR_SUMMONDISABLED',
  code: 445,
  templateString: ':SUMMON has been disabled',
  symbols: [],
};

const ERR_USERSDISABLED: ReplyTemplate = {
  name: 'ERR_USERSDISABLED',
  code: 446,
  templateString: ':USERS has been disabled',
  symbols: [],
};

const ERR_NOTREGISTERED: ReplyTemplate = {
  name: 'ERR_NOTREGISTERED',
  code: 451,
  templateString: ':You have not registered',
  symbols: [],
};

const ERR_NEEDMOREPARAMS: ReplyTemplate = {
  name: 'ERR_NEEDMOREPARAMS',
  code: 461,
  templateString: '<command> :Not enough parameters',
  symbols: ['command'],
};

const ERR_ALREADYREGISTRED: ReplyTemplate = {
  name: 'ERR_ALREADYREGISTRED',
  code: 462,
  templateString: ':You may not reregister',
  symbols: [],
};

const ERR_NOPERMFORHOST: ReplyTemplate = {
  name: 'ERR_NOPERMFORHOST',
  code: 463,
  templateString: ":Your host isn't among the privileged",
  symbols: [],
};

const ERR_PASSWDMISMATCH: ReplyTemplate = {
  name: 'ERR_PASSWDMISMATCH',
  code: 464,
  templateString: ':Password incorrect',
  symbols: [],
};

const ERR_YOUREBANNEDCREEP: ReplyTemplate = {
  name: 'ERR_YOUREBANNEDCREEP',
  code: 465,
  templateString: ':You are banned from this server',
  symbols: [],
};

const ERR_KEYSET: ReplyTemplate = {
  name: 'ERR_KEYSET',
  code: 467,
  templateString: '<channel> :Channel key already set',
  symbols: ['channel'],
};

const ERR_CHANNELISFULL: ReplyTemplate = {
  name: 'ERR_CHANNELISFULL',
  code: 471,
  templateString: '<channel> :Cannot join channel (+l)',
  symbols: ['channel'],
};

const ERR_UNKNOWNMODE: ReplyTemplate = {
  name: 'ERR_UNKNOWNMODE',
  code: 472,
  templateString: '<char> :is unknown mode char to me',
  symbols: ['char'],
};

const ERR_INVITEONLYCHAN: ReplyTemplate = {
  name: 'ERR_INVITEONLYCHAN',
  code: 473,
  templateString: '<channel> :Cannot join channel (+i)',
  symbols: ['channel'],
};

const ERR_BANNEDFROMCHAN: ReplyTemplate = {
  name: 'ERR_BANNEDFROMCHAN',
  code: 474,
  templateString: '<channel> :Cannot join channel (+b)',
  symbols: ['channel'],
};

const ERR_BADCHANNELKEY: ReplyTemplate = {
  name: 'ERR_BADCHANNELKEY',
  code: 475,
  templateString: '<channel> :Cannot join channel (+k)',
  symbols: ['channel'],
};

const ERR_NOPRIVILEGES: ReplyTemplate = {
  name: 'ERR_NOPRIVILEGES',
  code: 481,
  templateString: ":Permission Denied- you're not an IRC operator",
  symbols: [],
};

const ERR_CHANOPRIVSNEEDED: ReplyTemplate = {
  name: 'ERR_CHANOPRIVSNEEDED',
  code: 482,
  templateString: "<channel> :you're not channel operator",
  symbols: ['channel'],
};

const ERR_CANTKILLSERVER: ReplyTemplate = {
  name: 'ERR_CANTKILLSERVER',
  code: 483,
  templateString: ':You cant kill a server!',
  symbols: [],
};

const ERR_NOOPERHOST: ReplyTemplate = {
  name: 'ERR_NOOPERHOST',
  code: 491,
  templateString: ':No O-lines for your host',
  symbols: [],
};

const ERR_UMODEUNKNOWNFLAG: ReplyTemplate = {
  name: 'ERR_UMODEUNKNOWNFLAG',
  code: 501,
  templateString: ':Unknown MODE flag',
  symbols: [],
};

const ERR_USERSDONTMATCH: ReplyTemplate = {
  name: 'ERR_USERSDONTMATCH',
  code: 502,
  templateString: ':Cant change mode for other users',
  symbols: [],
};

// Not in specification, but will be thrown in case bug occurs and a
// non Reply error is thrown
const ERR_INTERNALSERVER: ReplyTemplate = {
  name: 'ERR_INTERNALSERVER',
  code: 500,
  templateString: ':Internal Server Error - <message>',
  symbols: ['message'],
};

export default {
  ERR_NOSUCHNICK,
  ERR_NOSUCHSERVER,
  ERR_NOSUCHCHANNEL,
  ERR_CANNOTSENDTOCHAN,
  ERR_TOOMANYCHANNELS,
  ERR_WASNOSUCHNICK,
  ERR_NOORIGIN,
  ERR_NORECIPIENT,
  ERR_NOTEXTTOSEND,
  ERR_NOTOPLEVEL,
  ERR_WILDTOPLEVEL,
  ERR_UNKNOWNCOMMAND,
  ERR_NOMOTD,
  ERR_NOADMININFO,
  ERR_FILEERROR,
  ERR_NONICKNAMEGIVEN,
  ERR_ERRONEUSNICKNAME,
  ERR_NICKNAMEINUSE,
  ERR_NICKCOLLISION,
  ERR_USERNOTINCHANNEL,
  ERR_NOTONCHANNEL,
  ERR_USERONCHANNEL,
  ERR_NOLOGIN,
  ERR_SUMMONDISABLED,
  ERR_USERSDISABLED,
  ERR_NOTREGISTERED,
  ERR_NEEDMOREPARAMS,
  ERR_ALREADYREGISTRED,
  ERR_NOPERMFORHOST,
  ERR_PASSWDMISMATCH,
  ERR_YOUREBANNEDCREEP,
  ERR_KEYSET,
  ERR_CHANNELISFULL,
  ERR_UNKNOWNMODE,
  ERR_INVITEONLYCHAN,
  ERR_BANNEDFROMCHAN,
  ERR_BADCHANNELKEY,
  ERR_NOPRIVILEGES,
  ERR_CHANOPRIVSNEEDED,
  ERR_CANTKILLSERVER,
  ERR_NOOPERHOST,
  ERR_UMODEUNKNOWNFLAG,
  ERR_USERSDONTMATCH,
  ERR_INTERNALSERVER,
};
