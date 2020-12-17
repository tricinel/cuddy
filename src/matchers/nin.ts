import {
  includes,
  filter,
  where,
  complement,
  compose,
  unary,
  mapObjIndexed
} from 'ramda';
import type { PipelineReduceOnceApplied } from '../types';

export default function nIn<T>(
  pairs: Record<string, string>
): PipelineReduceOnceApplied<T> {
  const notIncludes = compose(complement, unary(includes));
  return filter<T, 'array'>(where(mapObjIndexed(notIncludes, pairs)));
}
