import { isNil } from 'ramda';
import type { Stages } from '../types';

export function hasStage<T>(stage: T | undefined): stage is T {
  return typeof stage !== 'undefined';
}

export function hasFieldsStage<T, Keys = keyof T>(
  fields?: Keys[]
): fields is Keys[] {
  return hasStage<Keys[]>(fields) && fields.length > 0;
}

export function isValidRecord<U>(
  op?: Partial<Record<string, U>>
): op is Record<string, U> {
  return typeof op !== 'undefined';
}

export function assertValidStages<Item>(
  stages?: Partial<Stages<Item>>
): asserts stages is Partial<Stages<Item>> {
  if (!(!isNil(stages) && stages.constructor === Object))
    throw new TypeError('The stages should be an object');
}

export function assertValidCollection<Item>(
  collection?: Item[]
): asserts collection is Item[] {
  if (!(!isNil(collection) && collection.constructor === Array))
    throw new TypeError('The collection should be an array');
}

export function isArray(obj: unknown): obj is unknown[] {
  return typeof obj === 'object' && obj !== null && obj.constructor === Array;
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.constructor === Object &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

function defaultTyeErrorMessage(
  value: unknown,
  type: 'number' | 'string' | 'object' | 'boolean'
): string {
  return `The value should to be a ${type}! You passed ${typeof value}!`;
}

export function assertIsDefined(
  value: unknown,
  errorMessage = 'The value is undefined!'
): asserts value is
  | number
  | string
  | boolean
  | Record<string, unknown>
  | unknown[] {
  if (typeof value === 'undefined') {
    throw new TypeError(errorMessage);
  }
}

export function assertIsNumber(
  value: unknown,
  errorMessage = defaultTyeErrorMessage(value, 'number')
): asserts value is number {
  if (typeof value !== 'number') {
    throw new TypeError(errorMessage);
  }
}
