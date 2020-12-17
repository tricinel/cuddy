import { map, evolve, mapObjIndexed, always } from 'ramda';
import type { PipelineTransformOnceApplied } from '../types';

export default function set<T>(
  pairs: Record<string, unknown>
): PipelineTransformOnceApplied<T> {
  return map(evolve(mapObjIndexed(always, pairs)));
}
