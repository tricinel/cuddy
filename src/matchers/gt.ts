import { filter, where, mapObjIndexed, unary, lt } from 'ramda';
import type { PipelineReduceOnceApplied } from '../types';

export default function greaterThan<T>(
  pairs: Record<string, number>
): PipelineReduceOnceApplied<T> {
  return filter<T, 'array'>(where(mapObjIndexed(unary(lt), pairs)));
}
