import { filter, where, mapObjIndexed, unary, gt } from 'ramda';
import type { PipelineReduceOnceApplied } from '../types';

export default function lessThan<T>(
  pairs: Record<string, number>
): PipelineReduceOnceApplied<T> {
  return filter<T, 'array'>(where(mapObjIndexed(unary(gt), pairs)));
}
