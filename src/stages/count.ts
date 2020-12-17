import { prop, countBy, compose, includes } from 'ramda';
import toStringIfNeeded from '../utils/toString';
import type { InferRecord, PipelineCountOnceApplied } from '../types';
import { invalidValue } from '../utils/errors';
import type { LogMessage } from '../utils/errors';

export function validate(
  key: string,
  itemKeys: string[]
): [boolean, LogMessage] {
  const isValid = includes(key, itemKeys);

  return [
    !isValid,
    invalidValue({
      propPath: 'countBy',
      expected: itemKeys,
      actual: key
    })
  ];
}

export default function count<Item extends InferRecord<Item>>(
  field: string
): PipelineCountOnceApplied<Item> {
  return countBy(compose(toStringIfNeeded, prop(field)));
}
