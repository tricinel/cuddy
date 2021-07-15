import { prop, groupBy, compose, includes } from 'ramda';
import toStringIfNeeded from '../utils/toString';
import type { ShapeOf, PipelineGroupOnceApplied } from '../types';
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
      propPath: 'groupBy',
      expected: itemKeys,
      actual: key
    })
  ];
}

export default function group<Item extends ShapeOf<Item>>(
  field: string
): PipelineGroupOnceApplied<Item> {
  return groupBy(compose(toStringIfNeeded, prop(field)));
}
