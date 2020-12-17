import {
  compose,
  difference,
  flatten,
  map,
  toPairs,
  fromPairs,
  apply,
  filter,
  unnest
} from 'ramda';
import { isObject } from './guards';

export function keyDiff<T extends Record<string, unknown>>(
  checkAgainst: string[],
  checkFor: T
): string[] {
  const pickKey = ([key, value]: [string, unknown]): string[] =>
    isObject(value) ? keyDiff(checkAgainst, value) : [key];
  const duplicates = (xs: string[]): string[] => difference(xs, checkAgainst);

  const deepDiff: (obj: T) => string[] = compose(
    duplicates, // => string[]
    flatten, // => string[]
    map(pickKey), // => string[][]
    toPairs // => [string, unknown][]
  );

  return deepDiff(checkFor);
}

export function diff<O extends Record<string, unknown>>(
  pred: (key: keyof O, value: never) => boolean,
  obj: O
): Record<string, unknown> {
  type KeyValueOrObjectPair = [string, Record<string, unknown> | unknown];
  type KeyValuePair = [string, unknown];
  const unfoldObj: (o: Record<string, unknown>) => KeyValuePair[] = compose(
    filter(apply(pred)),
    unnest,
    map(pickPair),
    toPairs
  );

  function pickPair([key, value]: KeyValueOrObjectPair): KeyValuePair[] {
    return isObject(value) ? unfoldObj(value) : [[key, value]];
  }

  const toKeyValue = (pairs: KeyValuePair[]): Record<string, unknown> =>
    fromPairs(pairs);

  return compose(toKeyValue, unfoldObj)(obj);
}
