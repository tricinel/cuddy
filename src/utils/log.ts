import { curryN } from 'ramda';
import type { Level, LogMessage } from './errors';

function log(level: Level, logMessage: LogMessage): void {
  // eslint-disable-next-line no-console
  console[level](logMessage.message);
}

export default curryN(2, log);
