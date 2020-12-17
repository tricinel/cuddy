import { is, slice } from 'ramda';
import type { InferRecord, PipelineReduceOnceApplied } from '../types';
import { invalidValue } from '../utils/errors';
import type { LogMessage } from '../utils/errors';
import toStringIfNeeded from '../utils/toString';

interface Pager {
  limit: number;
  skip: number;
}

export function validate(
  skipOrLimit: unknown,
  prop: keyof Pager
): [boolean, LogMessage] {
  const isValid = is(Number, skipOrLimit);

  return [
    !isValid,
    invalidValue({
      propPath: prop,
      expected: 'Number',
      actual: toStringIfNeeded(skipOrLimit)
    })
  ];
}

export default function segment<Item extends InferRecord<Item>>({
  limit = Infinity,
  skip = 0
}: Pager): PipelineReduceOnceApplied<Item> {
  return slice(skip, limit);
}
