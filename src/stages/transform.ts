import { compose, keys, invertObj, omit, map, concat } from 'ramda';
import alias from '../transformations/alias';
import dec from '../transformations/dec';
import inc from '../transformations/inc';
import set from '../transformations/set';
import { isValidRecord } from '../utils/guards';
import type {
  InferRecord,
  Transformations,
  PipelineTransformOnceApplied
} from '../types';
import { invalidProp } from '../utils/errors';
import type { LogMessage } from '../utils/errors';
import flattenObjWithKeyPaths from '../utils/flattenObjectWithKeyPaths';
import { checkForNumbersOnly } from '../utils/checks';

function checkKeys<Item>(
  transformations: Partial<Transformations<keyof Item>>,
  itemKeys: string[]
): LogMessage[] {
  const invalidPaths = compose(keys, invertObj, omit(itemKeys));

  return compose(
    map((key: string) => invalidProp({ propPath: key })),
    map(concat('transform.')),
    invalidPaths,
    flattenObjWithKeyPaths
  )(transformations);
}

function checkValues<Item>(
  transformations: Partial<Transformations<keyof Item>>
): LogMessage[] {
  const messages: LogMessage[] = [];

  transformations.inc &&
    messages.push(...checkForNumbersOnly('transform.inc', transformations.inc));
  transformations.dec &&
    messages.push(...checkForNumbersOnly('transform.dec', transformations.dec));

  return messages;
}

export function validate<Item>(
  transformations: Partial<Transformations<keyof Item>>,
  itemKeys: string[]
): [boolean, LogMessage[]] {
  const invalidKeys = checkKeys(transformations, itemKeys);
  const invalidValues = checkValues(transformations);
  const messages = [...invalidKeys, ...invalidValues];

  return [messages.length > 0, messages];
}

export default function transform<
  T extends InferRecord<T>,
  Keys extends string = keyof T
>(
  transformations: Partial<Transformations<Keys>>
): PipelineTransformOnceApplied<T>[] {
  const fns: PipelineTransformOnceApplied<T>[] = [];

  if (isValidRecord<string>(transformations.alias)) {
    fns.push(alias<T>(transformations.alias));
  }

  if (isValidRecord<number>(transformations.inc)) {
    fns.push(inc<T>(transformations.inc));
  }

  if (isValidRecord<number>(transformations.dec)) {
    fns.push(dec<T>(transformations.dec));
  }

  if (isValidRecord<unknown>(transformations.set)) {
    fns.push(set<T>(transformations.set));
  }

  return fns;
}
