import { map, evolve, add, mapObjIndexed, unary } from 'ramda';
import type { PipelineTransformOnceApplied } from '../types';

export default function increment<T>(
  pairs: Record<string, number>
): PipelineTransformOnceApplied<T> {
  return map(evolve(mapObjIndexed(unary(add), pairs)));
}
