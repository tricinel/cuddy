import { filter, where, unary, lte, mapObjIndexed } from 'ramda';
import type { PipelineReduceOnceApplied } from '../types';

export default function greaterThanOrEqual<T>(
  pairs: Record<string, number>
): PipelineReduceOnceApplied<T> {
  return filter<T, 'array'>(where(mapObjIndexed(unary(lte), pairs)));
}
