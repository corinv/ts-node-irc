import { ISendable } from '../interfaces/ISendable.js';
import { IConnection } from '../interfaces/IConnection.js';
import { isConnection } from '../interfaces/utils.js';
import { UnableToParseMessageError } from './errors.js';
import {
  CRLF,
  LAST_TOKEN_WITH_WHITESPACE_INDICATOR,
  MESSAGE_TOKEN_SEPARATOR,
  PREFIX_INDICATOR,
} from '../util/stringConstants.js';

type MaybeString = string | undefined;

export default class Message implements ISendable {
  readonly prefix: MaybeString;
  readonly command: string;
  readonly parameters: string[];
  constructor(str: string);
  constructor(connection: IConnection, command: string, params?: string[]);
  constructor(prefix: string, command: string, params?: string[]);
  constructor(
    strOrConnection: string | IConnection,
    commandStr?: string,
    params: string[] = [],
  ) {
    if (commandStr) {
      this.prefix = isConnection(strOrConnection)
        ? strOrConnection.mask
        : strOrConnection;
      this.command = commandStr;
      this.parameters = params;
    } else {
      const str = strOrConnection as string;
      const [prefix, command, parameters] = this.parse(str);
      this.prefix = prefix;
      this.command = command;
      this.parameters = parameters;
    }
  }

  toString(): string {
    const prefixStr = this.prefix ? `${PREFIX_INDICATOR}${this.prefix}` : '';
    const params = [...this.parameters];
    const lastParam = params[params.length - 1];
    if (params.length) {
      params[params.length - 1] =
        LAST_TOKEN_WITH_WHITESPACE_INDICATOR + lastParam;
    }
    return (
      [prefixStr, this.command, ...params].join(MESSAGE_TOKEN_SEPARATOR) + CRLF
    );
  }

  isEmpty(): boolean {
    return !!this.command.length;
  }

  private parse(msg: string): [MaybeString, string, string[]] {
    let prefix: MaybeString;
    const tokens = msg.split(CRLF)[0].split(MESSAGE_TOKEN_SEPARATOR);
    if (msg[0] === PREFIX_INDICATOR) {
      prefix = tokens[0].slice(1);
      tokens.shift();
    }
    if (!tokens.length) {
      throw new UnableToParseMessageError();
    }
    const command = tokens[0];

    tokens.shift();

    // The final token can contain spaces, if it does it will be prefaced with an indicator

    const finalTokenIdx = tokens.findIndex(
      (t) => t[0] === LAST_TOKEN_WITH_WHITESPACE_INDICATOR,
    );
    let parameters;
    if (finalTokenIdx !== -1) {
      parameters = [
        ...tokens.slice(0, finalTokenIdx),
        tokens.slice(finalTokenIdx).join(MESSAGE_TOKEN_SEPARATOR).substring(1),
      ];
    } else {
      parameters = tokens;
    }

    return [prefix, command, parameters];
  }
}
