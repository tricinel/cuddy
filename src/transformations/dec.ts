import { flip, map, evolve, subtract, mapObjIndexed, unary } from 'ramda';
import type { PipelineTransformOnceApplied } from '../types';

export default function decrement<T>(
  pairs: Record<string, number>
): PipelineTransformOnceApplied<T> {
  return map(evolve(mapObjIndexed(unary(flip(subtract)), pairs)));
}
