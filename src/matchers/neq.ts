import { complement, whereEq, filter } from 'ramda';
import type { PipelineReduceOnceApplied } from '../types';

export default function neq<T>(
  pairs: Record<string, unknown>
): PipelineReduceOnceApplied<T> {
  return filter<T, 'array'>(complement(whereEq(pairs)));
}
