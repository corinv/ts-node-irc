import { ISendable } from '../interfaces/ISendable.js';
import {
  CRLF,
  PREFIX_INDICATOR,
  SYMBOL_END,
  SYMBOL_START,
} from '../util/stringConstants.js';
import ReplyTemplate from './ReplyTemplate.js';
import {
  IncorrectNumberOfReplyValuesError,
  MissingReplyValuesError,
} from './errors.js';

export default class Reply implements ISendable {
  // TODO: can we do better by somehow typing values, based on the template?
  constructor(
    private template: ReplyTemplate,
    private values: Record<string, string> = {},
  ) {
    this.validateTemplateValues(template, values);
  }

  validateTemplateValues = (
    template: ReplyTemplate,
    values: Record<string, string>,
  ): void => {
    const providedSymbols = Object.keys(values);
    const expectedCount = template.symbols.length;
    const receivedCount = providedSymbols.length;
    if (expectedCount !== receivedCount) {
      throw new IncorrectNumberOfReplyValuesError(
        template.name,
        expectedCount,
        receivedCount,
      );
    }

    const sortedExpected = [...template.symbols].sort();
    const sortedReceived = providedSymbols.sort();
    const missing = [];
    for (let i = 0; i < expectedCount; i++) {
      const e = sortedExpected[i];
      const r = sortedReceived[i];
      if (e !== r) {
        missing.push(e);
      }
    }

    if (missing.length) {
      throw new MissingReplyValuesError(template.name, missing);
    }
  };

  toString(prefix: string, target: string): string {
    let str = this.template.templateString;
    for (const sym of this.template.symbols) {
      str = str.replace(`${SYMBOL_START}${sym}${SYMBOL_END}`, this.values[sym]);
    }
    str = `${PREFIX_INDICATOR}${prefix || ''} ${String(this.template.code)}${
      target ? ' ' + target : ''
    } ${str}${CRLF}`;
    return str;
  }
}
