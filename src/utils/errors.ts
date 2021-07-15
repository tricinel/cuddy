import {
  compose,
  join,
  map,
  concat,
  keys,
  mapObjIndexed,
  values,
  groupBy,
  prop,
  mergeRight
} from 'ramda';
import toStringIfNeeded from './toString';

// eslint-disable-next-line import/no-unused-modules
export type Level = 'error' | 'warn' | 'info';
export type PropType =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Object'
  | 'Array'
  | 'Function';

// eslint-disable-next-line import/no-unused-modules
export interface LogMessage {
  level: Level;
  message: string;
}

interface WrongType {
  level?: Level;
  propPath: string;
  expected: PropType | string[];
  actual: string;
}

export function invalidValue({
  level = 'error',
  propPath,
  expected,
  actual
}: WrongType): LogMessage {
  const expectedStr =
    typeof expected === 'string'
      ? `a '${expected}'`
      : `one of '${join(', ', expected)}'`;
  return {
    level,
    message: `'${propPath}' should be ${expectedStr}. You passed '${actual}'.`
  };
}

export function invalidProp({
  propPath,
  level = 'warn'
}: Pick<WrongType, 'propPath' | 'level'>): LogMessage {
  return {
    level,
    message: `'${propPath}' may not exist on the items in your collection.`
  };
}

export function toInvalidValues(
  prefix: string,
  expected: PropType | string[],
  obj: Record<string, unknown>
): LogMessage[] {
  const formatValueObj = (value: unknown, key: string): WrongType => ({
    propPath: `${prefix}${key}`,
    expected,
    actual: toStringIfNeeded(value)
  });

  return compose(map(invalidValue), values, mapObjIndexed(formatValueObj))(obj);
}

export function toInvalidProps(
  prefix: string,
  obj: Record<string, unknown>
): LogMessage[] {
  const formatPropPathObj = (propPath: string): Record<'propPath', string> => ({
    propPath
  });

  return compose(
    map(invalidProp),
    map(formatPropPathObj),
    map(concat(prefix)),
    keys
  )(obj);
}

export function groupByLevel(
  messages: LogMessage[]
): Record<Level, LogMessage[]> {
  const defaultGrouped = { info: [], error: [], warn: [] };
  return mergeRight(defaultGrouped, groupBy(prop('level'), messages));
}

export function joinErrorMessages(messages: LogMessage[]): string {
  return compose(join('\n'), map(prop('message')))(messages);
}
