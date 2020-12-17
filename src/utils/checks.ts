import {
  is,
  complement,
  isEmpty,
  compose,
  keys,
  invertObj,
  omit,
  map,
  concat
} from 'ramda';
import { diff } from './diff';
import { toInvalidValues, invalidProp } from './errors';
import type { LogMessage } from './errors';
import flattenObjWithKeyPaths from './flattenObjectWithKeyPaths';

function valueIsNumber(_key: string, value: unknown): value is number {
  return is(Number, value);
}

export function checkForNumbersOnly(
  prefix: string,
  obj: Record<string, unknown>
): LogMessage[] {
  const invalid = diff(complement(valueIsNumber), obj);

  return isEmpty(invalid)
    ? []
    : toInvalidValues(`${prefix}.`, 'Number', invalid);
}

export function checkKeys(
  prefix: string,
  stage: Record<string, unknown>,
  itemKeys: string[]
): LogMessage[] {
  const invalidPaths = compose(keys, invertObj, omit(itemKeys));

  return compose(
    map((key: string) => invalidProp({ propPath: key })),
    map(concat(`${prefix}.`)),
    invalidPaths,
    flattenObjWithKeyPaths
  )(stage);
}
