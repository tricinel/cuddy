import { includes, filter, mapObjIndexed, unary, where } from 'ramda';
import type { PipelineReduceOnceApplied } from '../types';

export default function isIn<T>(
  pairs: Record<string, string>
): PipelineReduceOnceApplied<T> {
  return filter<T, 'array'>(where(mapObjIndexed(unary(includes), pairs)));
}
