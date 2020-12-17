import { filter, whereEq } from 'ramda';
import type { PipelineReduceOnceApplied } from '../types';

export default function eq<T>(
  pairs: Record<string, unknown>
): PipelineReduceOnceApplied<T> {
  return filter<T, 'array'>(whereEq(pairs));
}
