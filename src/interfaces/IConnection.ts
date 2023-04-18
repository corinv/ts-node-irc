import { ISendable } from './ISendable.js';

export interface IConnection {
  send(reply: ISendable): void;
  send(replies: ISendable[]): void;
  mask: string;
}
