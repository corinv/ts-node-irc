import { IConnection } from './IConnection.js';
// Could be a prettier way to write this guard?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isConnection = (input: any): input is IConnection =>
  typeof input === 'object' && 'mask' in input;
