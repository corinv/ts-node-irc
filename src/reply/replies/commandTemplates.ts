import ReplyTemplate from '../ReplyTemplate.js';

const RPL_USERHOST: ReplyTemplate = {
  name: 'RPL_USERHOST',
  code: 302,
  templateString: ':[<reply>{<space><reply>}]',
  symbols: ['reply', 'space', 'reply'],
};

const RPL_ISON: ReplyTemplate = {
  name: 'RPL_ISON',
  code: 303,
  templateString: ':[<nick> {<space><nick>}]',
  symbols: ['nick', 'space', 'nick'],
};

const RPL_AWAY: ReplyTemplate = {
  name: 'RPL_AWAY',
  code: 301,
  templateString: '<nick> :<away message>',
  symbols: ['nick', 'away message'],
};

const RPL_UNAWAY: ReplyTemplate = {
  name: 'RPL_UNAWAY',
  code: 305,
  templateString: ':You are no longer marked as being away',
  symbols: [],
};

const RPL_NOWAWAY: ReplyTemplate = {
  name: 'RPL_NOWAWAY',
  code: 306,
  templateString: ':You have been marked as being away',
  symbols: [],
};

const RPL_WHOISUSER: ReplyTemplate = {
  name: 'RPL_WHOISUSER',
  code: 311,
  templateString: '<nick> <user> <host> * :<real name>',
  symbols: ['nick', 'user', 'host', 'real name'],
};

const RPL_WHOISSERVER: ReplyTemplate = {
  name: 'RPL_WHOISSERVER',
  code: 312,
  templateString: '<nick> <server> :<server info>',
  symbols: ['nick', 'server', 'server info'],
};

const RPL_WHOISOPERATOR: ReplyTemplate = {
  name: 'RPL_WHOISOPERATOR',
  code: 313,
  templateString: '<nick> :is an IRC operator',
  symbols: ['nick'],
};

const RPL_WHOISIDLE: ReplyTemplate = {
  name: 'RPL_WHOISIDLE',
  code: 317,
  templateString: '<nick> <integer> :seconds idle',
  symbols: ['nick', 'integer'],
};

const RPL_ENDOFWHOIS: ReplyTemplate = {
  name: 'RPL_ENDOFWHOIS',
  code: 318,
  templateString: '<nick> :End of /WHOIS list',
  symbols: ['nick'],
};

const RPL_WHOISCHANNELS: ReplyTemplate = {
  name: 'RPL_WHOISCHANNELS',
  code: 319,
  templateString: '<nick> :{[@|+]<channel><space>}',
  symbols: ['nick', 'channel', 'space'],
};

const RPL_WHOWASUSER: ReplyTemplate = {
  name: 'RPL_WHOWASUSER',
  code: 314,
  templateString: '<nick> <user> <host> * :<real name>',
  symbols: ['nick', 'user', 'host', 'real name'],
};

const RPL_ENDOFWHOWAS: ReplyTemplate = {
  name: 'RPL_ENDOFWHOWAS',
  code: 369,
  templateString: '<nick> :End of WHOWAS',
  symbols: ['nick'],
};

const RPL_LISTSTART: ReplyTemplate = {
  name: 'RPL_LISTSTART',
  code: 321,
  templateString: 'Channel :Users  Name',
  symbols: [],
};

const RPL_LIST: ReplyTemplate = {
  name: 'RPL_LIST',
  code: 322,
  templateString: '<channel> <count> :<topic>',
  symbols: ['channel', 'count', 'topic'],
};

const RPL_LISTEND: ReplyTemplate = {
  name: 'RPL_LISTEND',
  code: 323,
  templateString: ':End of /LIST',
  symbols: [],
};

const RPL_CHANNELMODEIS: ReplyTemplate = {
  name: 'RPL_CHANNELMODEIS',
  code: 324,
  templateString: '<channel> <mode> <modeparams>',
  symbols: ['channel', 'mode', 'modeparams'],
};

const RPL_NOTOPIC: ReplyTemplate = {
  name: 'RPL_NOTOPIC',
  code: 331,
  templateString: '<channel> :No topic is set',
  symbols: ['channel'],
};

const RPL_TOPIC: ReplyTemplate = {
  name: 'RPL_TOPIC',
  code: 332,
  templateString: '<channel> :<topic>',
  symbols: ['channel', 'topic'],
};

const RPL_INVITING: ReplyTemplate = {
  name: 'RPL_INVITING',
  code: 341,
  templateString: '<channel> <nick>',
  symbols: ['channel', 'nick'],
};

const RPL_SUMMONING: ReplyTemplate = {
  name: 'RPL_SUMMONING',
  code: 342,
  templateString: '<user> :Summoning user to IRC',
  symbols: ['user'],
};

const RPL_VERSION: ReplyTemplate = {
  name: 'RPL_VERSION',
  code: 351,
  templateString: '<version>.<debuglevel> <server> :<comments>',
  symbols: ['version', 'debuglevel', 'server', 'comments'],
};

const RPL_WHOREPLY: ReplyTemplate = {
  name: 'RPL_WHOREPLY',
  code: 352,
  // unsure what H|G does in this template, cannot find explanation
  templateString:
    //    '<channel> <user> <host> <server> <nick> <H|G>[*][@|+] :<hopcount> <real name>',
    '<channel> <user> <host> <server> <nick> H :<hopcount> <real>',
  symbols: ['channel', 'user', 'host', 'server', 'nick', 'hopcount', 'real'],
};

const RPL_ENDOFWHO: ReplyTemplate = {
  name: 'RPL_ENDOFWHO',
  code: 315,
  templateString: '<name> :End of /WHO list',
  symbols: ['name'],
};

const RPL_NAMREPLY: ReplyTemplate = {
  name: 'RPL_NAMREPLY',
  code: 353,
  templateString: '= <channel> :<nicks>', // '=' is from RFC2812, hexchat doesn't parse this correctly otherwise - will enquire
  symbols: ['channel', 'nicks'],
  // todo figure out better engine for the templating, to on these complex templates
  // templateString: '<channel> :[[@|+]<nick> [[@|+]<nick> [...]]]',
  // symbols: ['channel', 'nick1', 'nick'],
};

const RPL_ENDOFNAMES: ReplyTemplate = {
  name: 'RPL_ENDOFNAMES',
  code: 366,
  templateString: '<channel> :End of /NAMES list',
  symbols: ['channel'],
};

const RPL_LINKS: ReplyTemplate = {
  name: 'RPL_LINKS',
  code: 364,
  templateString: '<mask> <server> :<hopcount> <server info>',
  symbols: ['mask', 'server', 'hopcount', 'server info'],
};

const RPL_ENDOFLINKS: ReplyTemplate = {
  name: 'RPL_ENDOFLINKS',
  code: 365,
  templateString: '<mask> :End of /LINKS list',
  symbols: ['mask'],
};

const RPL_BANLIST: ReplyTemplate = {
  name: 'RPL_BANLIST',
  code: 367,
  templateString: '<channel> <banid>',
  symbols: ['channel', 'banid'],
};

const RPL_INFO: ReplyTemplate = {
  name: 'RPL_INFO',
  code: 371,
  templateString: ':<string>',
  symbols: ['string'],
};

const RPL_ENDOFINFO: ReplyTemplate = {
  name: 'RPL_ENDOFINFO',
  code: 374,
  templateString: ':End of /INFO list',
  symbols: [],
};

const RPL_MOTDSTART: ReplyTemplate = {
  name: 'RPL_MOTDSTART',
  code: 375,
  templateString: ':- <server> Message of the day - ',
  symbols: ['server'],
};

const RPL_MOTD: ReplyTemplate = {
  name: 'RPL_MOTD',
  code: 372,
  templateString: ':- <text>',
  symbols: ['text'],
};

const RPL_ENDOFMOTD: ReplyTemplate = {
  name: 'RPL_ENDOFMOTD',
  code: 376,
  templateString: ':End of /MOTD command',
  symbols: [],
};

const RPL_YOUREOPER: ReplyTemplate = {
  name: 'RPL_YOUREOPER',
  code: 381,
  templateString: ':You are now an IRC operator',
  symbols: [],
};

const RPL_REHASHING: ReplyTemplate = {
  name: 'RPL_REHASHING',
  code: 382,
  templateString: '<config file> :Rehashing',
  symbols: ['config file'],
};

const RPL_USERSSTART: ReplyTemplate = {
  name: 'RPL_USERSSTART',
  code: 392,
  templateString: ':UserID   Terminal  Host',
  symbols: [],
};

const RPL_USERS: ReplyTemplate = {
  name: 'RPL_USERS',
  code: 393,
  templateString: ':%-8s %-9s %-8s',
  symbols: [],
};

const RPL_ENDOFUSERS: ReplyTemplate = {
  name: 'RPL_ENDOFUSERS',
  code: 394,
  templateString: ':End of users',
  symbols: [],
};

const RPL_NOUSERS: ReplyTemplate = {
  name: 'RPL_NOUSERS',
  code: 395,
  templateString: ':Nobody logged in',
  symbols: [],
};

const RPL_TRACELINK: ReplyTemplate = {
  name: 'RPL_TRACELINK',
  code: 200,
  templateString: 'Link <version & debug level> <destination> <next server>',
  symbols: ['version & debug level', 'destination', 'next server'],
};

const RPL_TRACECONNECTING: ReplyTemplate = {
  name: 'RPL_TRACECONNECTING',
  code: 201,
  templateString: 'Try. <class> <server>',
  symbols: ['class', 'server'],
};

const RPL_TRACEHANDSHAKE: ReplyTemplate = {
  name: 'RPL_TRACEHANDSHAKE',
  code: 202,
  templateString: 'H.S. <class> <server>',
  symbols: ['class', 'server'],
};

const RPL_TRACEUNKNOWN: ReplyTemplate = {
  name: 'RPL_TRACEUNKNOWN',
  code: 203,
  templateString: '???? <class> [<client IP address in dot form>]',
  symbols: ['class', 'client IP address in dot form'],
};

const RPL_TRACEOPERATOR: ReplyTemplate = {
  name: 'RPL_TRACEOPERATOR',
  code: 204,
  templateString: 'Oper <class> <nick>',
  symbols: ['class', 'nick'],
};

const RPL_TRACEUSER: ReplyTemplate = {
  name: 'RPL_TRACEUSER',
  code: 205,
  templateString: 'User <class> <nick>',
  symbols: ['class', 'nick'],
};

const RPL_TRACESERVER: ReplyTemplate = {
  name: 'RPL_TRACESERVER',
  code: 206,
  templateString:
    'Serv <class> <int>S <int>C <server> <nick!user|*!*>@<host|server>',
  symbols: ['class', 'int', 'int', 'server', 'nick!user|*!*', 'host|server'],
};

const RPL_TRACENEWTYPE: ReplyTemplate = {
  name: 'RPL_TRACENEWTYPE',
  code: 208,
  templateString: '<newtype> 0 <client name>',
  symbols: ['newtype', 'client name'],
};

const RPL_TRACELOG: ReplyTemplate = {
  name: 'RPL_TRACELOG',
  code: 261,
  templateString: 'File <logfile> <debug level>',
  symbols: ['logfile', 'debug level'],
};

const RPL_STATSLINKINFO: ReplyTemplate = {
  name: 'RPL_STATSLINKINFO',
  code: 211,
  templateString:
    '<linkname> <sendq> <sent messages> <sent bytes> <received messages> <received bytes> <time open>',
  symbols: [
    'linkname',
    'sendq',
    'sent messages',
    'sent bytes',
    'received messages',
    'received bytes',
    'time open',
  ],
};

const RPL_STATSCOMMANDS: ReplyTemplate = {
  name: 'RPL_STATSCOMMANDS',
  code: 212,
  templateString: '<command> <count>',
  symbols: ['command', 'count'],
};

const RPL_STATSCLINE: ReplyTemplate = {
  name: 'RPL_STATSCLINE',
  code: 213,
  templateString: 'C <host> * <name> <port> <class>',
  symbols: ['host', 'name', 'port', 'class'],
};

const RPL_STATSNLINE: ReplyTemplate = {
  name: 'RPL_STATSNLINE',
  code: 214,
  templateString: 'N <host> * <name> <port> <class>',
  symbols: ['host', 'name', 'port', 'class'],
};

const RPL_STATSILINE: ReplyTemplate = {
  name: 'RPL_STATSILINE',
  code: 215,
  templateString: 'I <host> * <host> <port> <class>',
  symbols: ['host', 'host', 'port', 'class'],
};

const RPL_STATSKLINE: ReplyTemplate = {
  name: 'RPL_STATSKLINE',
  code: 216,
  templateString: 'K <host> * <username> <port> <class>',
  symbols: ['host', 'username', 'port', 'class'],
};

const RPL_STATSYLINE: ReplyTemplate = {
  name: 'RPL_STATSYLINE',
  code: 218,
  templateString: 'Y <class> <ping frequency> <connect frequency> <max sendq>',
  symbols: ['class', 'ping frequency', 'connect frequency', 'max sendq'],
};

const RPL_ENDOFSTATS: ReplyTemplate = {
  name: 'RPL_ENDOFSTATS',
  code: 219,
  templateString: '<stats letter> :End of /STATS report',
  symbols: ['stats letter'],
};

const RPL_STATSLLINE: ReplyTemplate = {
  name: 'RPL_STATSLLINE',
  code: 241,
  templateString: 'L <hostmask> * <servername> <maxdepth>',
  symbols: ['hostmask', 'servername', 'maxdepth'],
};

const RPL_STATSUPTIME: ReplyTemplate = {
  name: 'RPL_STATSUPTIME',
  code: 242,
  templateString: ':Server Up %d days %d:%02d:%02d',
  symbols: [],
};

const RPL_STATSOLINE: ReplyTemplate = {
  name: 'RPL_STATSOLINE',
  code: 243,
  templateString: 'O <hostmask> * <name>',
  symbols: ['hostmask', 'name'],
};

const RPL_STATSHLINE: ReplyTemplate = {
  name: 'RPL_STATSHLINE',
  code: 244,
  templateString: 'H <hostmask> * <servername>',
  symbols: ['hostmask', 'servername'],
};

const RPL_UMODEIS: ReplyTemplate = {
  name: 'RPL_UMODEIS',
  code: 221,
  templateString: 'modestring',
  symbols: ['modestring'],
};

const RPL_LUSERCLIENT: ReplyTemplate = {
  name: 'RPL_LUSERCLIENT',
  code: 251,
  templateString:
    ':There are <integer> users and <integer> invisible on <integer> servers',
  symbols: ['integer', 'integer', 'integer'],
};

const RPL_LUSEROP: ReplyTemplate = {
  name: 'RPL_LUSEROP',
  code: 252,
  templateString: '<integer> :operator(s) online',
  symbols: ['integer'],
};

const RPL_LUSERUNKNOWN: ReplyTemplate = {
  name: 'RPL_LUSERUNKNOWN',
  code: 253,
  templateString: '<integer> :unknown connection(s)',
  symbols: ['integer'],
};

const RPL_LUSERCHANNELS: ReplyTemplate = {
  name: 'RPL_LUSERCHANNELS',
  code: 254,
  templateString: '<integer> :channels formed',
  symbols: ['integer'],
};

const RPL_LUSERME: ReplyTemplate = {
  name: 'RPL_LUSERME',
  code: 255,
  templateString: ':I have <integer> clients and <integer> servers',
  symbols: ['integer', 'integer'],
};

const RPL_ADMINME: ReplyTemplate = {
  name: 'RPL_ADMINME',
  code: 256,
  templateString: '<server> :Administrative info',
  symbols: ['server'],
};

const RPL_ADMINEMAIL: ReplyTemplate = {
  name: 'RPL_ADMINEMAIL',
  code: 259,
  templateString: ':<admin info>',
  symbols: ['admin info'],
};

export default {
  RPL_USERHOST,
  RPL_ISON,
  RPL_AWAY,
  RPL_UNAWAY,
  RPL_NOWAWAY,
  RPL_WHOISUSER,
  RPL_WHOISSERVER,
  RPL_WHOISOPERATOR,
  RPL_WHOISIDLE,
  RPL_ENDOFWHOIS,
  RPL_WHOISCHANNELS,
  RPL_WHOWASUSER,
  RPL_ENDOFWHOWAS,
  RPL_LISTSTART,
  RPL_LIST,
  RPL_LISTEND,
  RPL_CHANNELMODEIS,
  RPL_NOTOPIC,
  RPL_TOPIC,
  RPL_INVITING,
  RPL_SUMMONING,
  RPL_VERSION,
  RPL_WHOREPLY,
  RPL_ENDOFWHO,
  RPL_NAMREPLY,
  RPL_ENDOFNAMES,
  RPL_LINKS,
  RPL_ENDOFLINKS,
  RPL_BANLIST,
  RPL_INFO,
  RPL_ENDOFINFO,
  RPL_MOTDSTART,
  RPL_MOTD,
  RPL_ENDOFMOTD,
  RPL_YOUREOPER,
  RPL_REHASHING,
  RPL_USERSSTART,
  RPL_USERS,
  RPL_ENDOFUSERS,
  RPL_NOUSERS,
  RPL_TRACELINK,
  RPL_TRACECONNECTING,
  RPL_TRACEHANDSHAKE,
  RPL_TRACEUNKNOWN,
  RPL_TRACEOPERATOR,
  RPL_TRACEUSER,
  RPL_TRACESERVER,
  RPL_TRACENEWTYPE,
  RPL_TRACELOG,
  RPL_STATSLINKINFO,
  RPL_STATSCOMMANDS,
  RPL_STATSCLINE,
  RPL_STATSNLINE,
  RPL_STATSILINE,
  RPL_STATSKLINE,
  RPL_STATSYLINE,
  RPL_ENDOFSTATS,
  RPL_STATSLLINE,
  RPL_STATSUPTIME,
  RPL_STATSOLINE,
  RPL_STATSHLINE,
  RPL_UMODEIS,
  RPL_LUSERCLIENT,
  RPL_LUSEROP,
  RPL_LUSERUNKNOWN,
  RPL_LUSERCHANNELS,
  RPL_LUSERME,
  RPL_ADMINME,
  RPL_ADMINEMAIL,
};
