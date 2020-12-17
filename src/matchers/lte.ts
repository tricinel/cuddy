import { filter, where, mapObjIndexed, unary, gte } from 'ramda';
import type { PipelineReduceOnceApplied } from '../types';

export default function lessThanOrEqual<T>(
  pairs: Record<string, number>
): PipelineReduceOnceApplied<T> {
  return filter<T, 'array'>(where(mapObjIndexed(unary(gte), pairs)));
}
